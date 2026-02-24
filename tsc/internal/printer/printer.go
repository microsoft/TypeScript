// Package printer exports a Printer for pretty-printing TS ASTs and writer interfaces and implementations for using them
// Intended ultimate usage:
//
//	func nodeToInlineStr(node *ast.Node) {
//		// Reuse singleton single-line writer (TODO: thread safety?)
//		p = printer.NewPrinter(printer.PrinterOptions{ RemoveComments: true }, printer.PrintHandlers{})
//		p.Write(node, nil /*sourceFile*/, printer.SingleLineTextWriter)
//		return printer.SingleLineTextWriter.getText()
//	}
//
// // or
//
//	func nodeToStr(node *ast.Node, options CompilerOptions) {
//		// Use own writer
//		p := printer.NewPrinter(printer.PrinterOptions{ NewLine: options.NewLine}, printer.PrintHandlers{})
//		return p.Emit(node, nil /*sourceFile*/)
//	}
package printer

import (
	"fmt"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/sourcemap"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type PrinterOptions struct {
	RemoveComments bool
	NewLine        core.NewLineKind
	// OmitTrailingSemicolon         bool
	NoEmitHelpers bool
	// Module                        core.ModuleKind
	// ModuleResolution              core.ModuleResolutionKind
	Target                      core.ScriptTarget
	SourceMap                   bool
	InlineSourceMap             bool
	InlineSources               bool
	OmitBraceSourceMapPositions bool
	// ExtendedDiagnostics           bool
	OnlyPrintJSDocStyle bool
	NeverAsciiEscape    bool
	// StripInternal                 bool
	PreserveSourceNewlines        bool
	TerminateUnterminatedLiterals bool // !!!
}

type PrintHandlers struct {
	// A hook used by the Printer when generating unique names to avoid collisions with
	// globally defined names that exist outside of the current source file.
	HasGlobalName func(name string) bool

	// !!!
	////// A hook used by the Printer to provide notifications prior to emitting a node. A
	////// compatible implementation **must** invoke `emitCallback` with the provided `hint` and
	////// `node` values.
	////// @param hint A hint indicating the intended purpose of the node.
	////// @param node The node to emit.
	////// @param emitCallback A callback that, when invoked, will emit the node.
	////// @example
	////// ```ts
	////// var printer = createPrinter(printerOptions, {
	//////   onEmitNode(hint, node, emitCallback) {
	//////     // set up or track state prior to emitting the node...
	//////     emitCallback(hint, node);
	//////     // restore state after emitting the node...
	//////   }
	////// });
	////// ```
	////OnEmitNode func(hint EmitHint, node *ast.Node, emitCallback func(hint EmitHint, node *ast.Node))

	// !!!
	////// A hook used to check if an emit notification is required for a node.
	////// @param node The node to emit.
	////IsEmitNotificationEnabled func(node *ast.Node) bool

	// !!!
	////// A hook used by the Printer to perform just-in-time substitution of a node. This is
	////// primarily used by node transformations that need to substitute one node for another,
	////// such as replacing `myExportedVar` with `exports.myExportedVar`.
	////// @param hint A hint indicating the intended purpose of the node.
	////// @param node The node to emit.
	////// @example
	////// ```ts
	////// var printer = createPrinter(printerOptions, {
	//////   substituteNode(hint, node) {
	//////     // perform substitution if necessary...
	//////     return node;
	//////   }
	////// });
	////// ```
	////SubstituteNode func(hint EmitHint, node *ast.Node) *ast.Node

	// !!!
	////OnEmitSourceMapOfNode func(hint EmitHint, node *ast.Node, emitCallback func(hint EmitHint, node *ast.Node))
	////OnEmitSourceMapOfToken func(nodeOpt *ast.Node | undefined, token: ast.Kind, writeKind WriteKind, pos int, emitCallback func(token ast.Kind, writeKind WriteKind, pos int) int) int
	////OnEmitSourceMapOfPosition func(pos int)

	OnBeforeEmitNode     func(nodeOpt *ast.Node)
	OnAfterEmitNode      func(nodeOpt *ast.Node)
	OnBeforeEmitNodeList func(nodesOpt *ast.NodeList)
	OnAfterEmitNodeList  func(nodesOpt *ast.NodeList)
	OnBeforeEmitToken    func(nodeOpt *ast.TokenNode)
	OnAfterEmitToken     func(nodeOpt *ast.TokenNode)
}

type Printer struct {
	PrintHandlers
	Options                           PrinterOptions
	emitContext                       *EmitContext
	currentSourceFile                 *ast.SourceFile
	uniqueHelperNames                 map[string]*ast.IdentifierNode
	externalHelpersModuleName         *ast.IdentifierNode
	nextListElementPos                int
	writer                            EmitTextWriter
	ownWriter                         EmitTextWriter
	writeKind                         WriteKind
	sourceMapsDisabled                bool
	sourceMapGenerator                *sourcemap.Generator
	sourceMapSource                   sourcemap.Source
	sourceMapSourceIndex              sourcemap.SourceIndex
	sourceMapSourceIsJson             bool
	sourceMapLineCharCache            *lineCharacterCache
	mostRecentSourceMapSource         sourcemap.Source
	mostRecentSourceMapSourceIndex    sourcemap.SourceIndex
	containerPos                      int
	containerEnd                      int
	declarationListContainerEnd       int
	detachedCommentsInfo              core.Stack[detachedCommentsInfo]
	commentsDisabled                  bool
	inExtends                         bool // whether we are emitting the `extends` clause of a ConditionalType or InferType
	nameGenerator                     NameGenerator
	makeFileLevelOptimisticUniqueName func(string) string
	commentStatePool                  core.Pool[commentState]
	sourceMapStatePool                core.Pool[sourceMapState]
}

type detachedCommentsInfo struct {
	nodePos               int
	detachedCommentEndPos int
}

type commentState struct {
	emitFlags                   EmitFlags      // holds the emit flags for the current node
	commentRange                core.TextRange // holds the comment range calculated for the current node
	containerPos                int            // captures the value of containerPos prior to entering an node
	containerEnd                int            // captures the value of containerEnd prior to entering an node
	declarationListContainerEnd int            // captures the value of declarationListContainerEnd prior to entering an node
}

type sourceMapState struct {
	emitFlags              EmitFlags      // holds the emit flags for the current node
	sourceMapRange         core.TextRange // holds the source map range calculated for the current node
	hasTokenSourceMapRange bool           // captures whether the source map range was set for the current node
}

type printerState struct {
	commentState   *commentState
	sourceMapState *sourceMapState
}

func NewPrinter(options PrinterOptions, handlers PrintHandlers, emitContext *EmitContext) *Printer {
	printer := &Printer{
		PrintHandlers: handlers,
		Options:       options,
		emitContext:   emitContext,
	}
	// wire up name generator
	if printer.emitContext == nil {
		printer.emitContext = NewEmitContext()
	}
	printer.nameGenerator.Context = printer.emitContext
	printer.nameGenerator.GetTextOfNode = func(node *ast.Node) string { return printer.getTextOfNode(node, false) }
	printer.nameGenerator.IsFileLevelUniqueNameInCurrentFile = printer.isFileLevelUniqueNameInCurrentFile
	printer.containerPos = -1
	printer.containerEnd = -1
	printer.declarationListContainerEnd = -1
	printer.commentsDisabled = options.RemoveComments
	return printer
}

func (p *Printer) getLiteralTextOfNode(node *ast.LiteralLikeNode, sourceFile *ast.SourceFile, flags getLiteralTextFlags) string {
	if ast.IsStringLiteral(node) {
		if textSourceNode, ok := p.emitContext.textSource[node]; ok && textSourceNode != nil {
			var text string
			switch textSourceNode.Kind {
			default:
				return p.getLiteralTextOfNode(textSourceNode, ast.GetSourceFileOfNode(textSourceNode), flags)
			case ast.KindNumericLiteral:
				text = textSourceNode.Text()
			case ast.KindIdentifier, ast.KindPrivateIdentifier, ast.KindJsxNamespacedName:
				text = p.getTextOfNode(textSourceNode, false)
			}

			switch {
			case flags&getLiteralTextFlagsJsxAttributeEscape != 0:
				return "\"" + escapeJsxAttributeString(text, QuoteCharDoubleQuote) + "\""
			case flags&getLiteralTextFlagsNeverAsciiEscape != 0 || p.emitContext.EmitFlags(node)&EFNoAsciiEscaping != 0:
				return "\"" + EscapeString(text, QuoteCharDoubleQuote) + "\""
			default:
				return "\"" + escapeNonAsciiString(text, QuoteCharDoubleQuote) + "\""
			}
		}
	}
	// !!! Printer option to control whether to terminate unterminated literals
	if p.emitContext.EmitFlags(node)&EFNoAsciiEscaping != 0 {
		flags |= getLiteralTextFlagsNeverAsciiEscape
	}
	if p.Options.Target >= core.ScriptTargetES2021 {
		flags |= getLiteralTextFlagsAllowNumericSeparator
	}
	return getLiteralText(node, core.Coalesce(sourceFile, p.currentSourceFile), flags)
}

// `node` must be one of Identifier | PrivateIdentifier | LiteralExpression | JsxNamespacedName
func (p *Printer) getTextOfNode(node *ast.Node, includeTrivia bool) string {
	if ast.IsMemberName(node) && p.emitContext.autoGenerate[node] != nil {
		return p.nameGenerator.GenerateName(node)
	}

	if ast.IsStringLiteral(node) {
		if textSourceNode := p.emitContext.textSource[node]; textSourceNode != nil {
			return p.getTextOfNode(textSourceNode, includeTrivia)
		}
	}

	switch node.Kind {
	case ast.KindIdentifier,
		ast.KindPrivateIdentifier,
		ast.KindJsxNamespacedName:
		// !!! If `node` is not a parse tree node, verify its original node comes from the same source file
		if p.currentSourceFile == nil || node.Parent == nil || ast.NodeIsSynthesized(node) {
			return node.Text()
		}
	case ast.KindStringLiteral,
		ast.KindNumericLiteral,
		ast.KindBigIntLiteral,
		ast.KindNoSubstitutionTemplateLiteral,
		ast.KindTemplateHead,
		ast.KindTemplateMiddle,
		ast.KindTemplateTail:
		return p.getLiteralTextOfNode(node, nil /*sourceFile*/, getLiteralTextFlagsNone)
	default:
		panic(fmt.Sprintf("unexpected node: %v", node.Kind))
	}
	return scanner.GetSourceTextOfNodeFromSourceFile(p.currentSourceFile, node, includeTrivia)
}

//
// Low-level writing
//

type WriteKind int

const (
	WriteKindNone WriteKind = iota
	WriteKindKeyword
	WriteKindOperator
	WriteKindPunctuation
	WriteKindStringLiteral
	WriteKindParameter
	WriteKindProperty
	WriteKindComment
	WriteKindLiteral
)

func (p *Printer) writeAs(text string, writeKind WriteKind) {
	switch writeKind {
	case WriteKindNone:
		p.writer.Write(text)
	case WriteKindParameter:
		p.writeParameter(text)
	case WriteKindKeyword:
		p.writeKeyword(text)
	case WriteKindOperator:
		p.writeOperator(text)
	case WriteKindProperty:
		p.writeProperty(text)
	case WriteKindPunctuation:
		p.writePunctuation(text)
	case WriteKindStringLiteral:
		p.writer.WriteStringLiteral(text)
	case WriteKindComment:
		p.writeComment(text)
	case WriteKindLiteral:
		p.writeLiteral(text)
	default:
		panic(fmt.Sprintf("unexpected printer.WriteKind: %v", writeKind))
	}
}

func (p *Printer) write(text string) {
	p.writeAs(text, p.writeKind)
}

func (p *Printer) setWriteKind(kind WriteKind) WriteKind {
	previous := p.writeKind
	p.writeKind = kind
	return previous
}

func (p *Printer) writeSymbol(text string, optSymbol *ast.Symbol) {
	if optSymbol == nil {
		p.write(text)
	} else {
		p.writer.WriteSymbol(text, optSymbol)
	}
}

func (p *Printer) writeLiteral(text string) {
	p.writer.WriteLiteral(text)
}

func (p *Printer) writePunctuation(text string) {
	p.writer.WritePunctuation(text)
}

func (p *Printer) writeOperator(text string) {
	p.writer.WriteOperator(text)
}

func (p *Printer) writeKeyword(text string) {
	p.writer.WriteKeyword(text)
}

func (p *Printer) writeProperty(text string) {
	p.writer.WriteProperty(text)
}

func (p *Printer) writeParameter(text string) {
	p.writer.WriteParameter(text)
}

func (p *Printer) writeComment(text string) {
	p.writer.WriteComment(text)
}

func (p *Printer) writeSpace() {
	p.writer.WriteSpace(" ")
}

func (p *Printer) writeLine() {
	p.writer.WriteLine()
}

func (p *Printer) writeLineRepeat(count int) {
	for range count {
		p.writeLine()
	}
}

func (p *Printer) writeLines(text string) {
	lines := stringutil.SplitLines(text)
	indentation := stringutil.GuessIndentation(lines)
	for _, line := range lines {
		if indentation > 0 {
			line = line[indentation:]
		}
		if len(line) > 0 {
			p.writeLine()
			p.write(line)
		}
	}
}

func (p *Printer) writeTrailingSemicolon() {
	p.writer.WriteTrailingSemicolon(";")
}

func (p *Printer) increaseIndent() {
	p.writer.IncreaseIndent()
}

func (p *Printer) decreaseIndent() {
	p.writer.DecreaseIndent()
}

func (p *Printer) increaseIndentIf(indentRequested bool) {
	if indentRequested {
		p.increaseIndent()
	}
}

func (p *Printer) decreaseIndentIf(indentRequested bool) {
	if indentRequested {
		p.decreaseIndent()
	}
}

func (p *Printer) writeLineOrSpace(parentNode *ast.Node, prevChildNode *ast.Node, nextChildNode *ast.Node) {
	if p.shouldEmitOnSingleLine(parentNode) {
		p.writeSpace()
	} else if p.Options.PreserveSourceNewlines {
		lines := p.getLinesBetweenNodes(parentNode, prevChildNode, nextChildNode)
		if lines > 0 {
			p.writeLineRepeat(lines)
		} else {
			p.writeSpace()
		}
	} else {
		p.writeLine()
	}
}

func (p *Printer) writeLinesAndIndent(lineCount int, writeSpaceIfNotIndenting bool) {
	if lineCount > 0 {
		p.increaseIndent()
		p.writeLineRepeat(lineCount)
	} else if writeSpaceIfNotIndenting {
		p.writeSpace()
	}
}

func (p *Printer) writeLineSeparatorsAndIndentBefore(node *ast.Node, parent *ast.Node) bool {
	if p.Options.PreserveSourceNewlines {
		leadingNewlines := p.getLeadingLineTerminatorCount(parent, node, LFNone)
		if leadingNewlines > 0 {
			p.writeLinesAndIndent(leadingNewlines /*writeSpaceIfNotIndenting*/, false)
			return true
		}
	}
	return false
}

func (p *Printer) writeLineSeparatorsAfter(node *ast.Node, parent *ast.Node) {
	if p.Options.PreserveSourceNewlines {
		trailingNewlines := p.getClosingLineTerminatorCount(parent, node, LFNone, core.NewTextRange(-1, -1) /*childrenTextRange*/)
		if trailingNewlines > 0 {
			p.writeLineRepeat(trailingNewlines)
		}
	}
}

func (p *Printer) getLinesBetweenNodes(parent *ast.Node, node1 *ast.Node, node2 *ast.Node) int {
	if p.shouldElideIndentation(parent) {
		return 0
	}

	parent = skipSynthesizedParentheses(parent)
	node1 = skipSynthesizedParentheses(node1)
	node2 = skipSynthesizedParentheses(node2)

	// Always use a newline for synthesized code if the synthesizer desires it.
	if p.shouldEmitOnNewLine(node2, LFNone) {
		return 1
	}

	if p.currentSourceFile != nil && !ast.NodeIsSynthesized(parent) && !ast.NodeIsSynthesized(node1) && !ast.NodeIsSynthesized(node2) {
		if p.Options.PreserveSourceNewlines {
			return p.getEffectiveLines(
				func(includeComments bool) int {
					return getLinesBetweenRangeEndAndRangeStart(
						node1.Loc,
						node2.Loc,
						p.currentSourceFile,
						includeComments,
					)
				},
			)
		}
		return core.IfElse(rangeEndIsOnSameLineAsRangeStart(node1.Loc, node2.Loc, p.currentSourceFile), 0, 1)
	}

	return 0
}

func (p *Printer) getEffectiveLines(getLineDifference func(includeComments bool) int) int {
	// If 'preserveSourceNewlines' is disabled, we should never call this function
	// because it could be more expensive than alternative approximations.
	if !p.Options.PreserveSourceNewlines {
		panic("Should not be called when preserveSourceNewlines is false")
	}
	// We start by measuring the line difference from a position to its adjacent comments,
	// so that this is counted as a one-line difference, not two:
	//
	//   node1;
	//   // NODE2 COMMENT
	//   node2;
	lines := getLineDifference( /*includeComments*/ true)
	if lines == 0 {
		// However, if the line difference considering comments was 0, we might have this:
		//
		//   node1; // NODE2 COMMENT
		//   node2;
		//
		// in which case we should be ignoring node2's comment, so this too is counted as
		// a one-line difference, not zero.
		return getLineDifference( /*includeComments*/ false)
	}
	return lines
}

func (p *Printer) getLeadingLineTerminatorCount(parentNode *ast.Node, firstChild *ast.Node, format ListFormat) int {
	if format&LFPreserveLines != 0 || p.Options.PreserveSourceNewlines {
		if format&LFPreferNewLine != 0 {
			return 1
		}

		if firstChild == nil {
			return core.IfElse(parentNode == nil || p.currentSourceFile != nil && RangeIsOnSingleLine(parentNode.Loc, p.currentSourceFile), 0, 1)
		}
		if p.nextListElementPos > 0 && firstChild.Pos() == p.nextListElementPos {
			// If this child starts at the beginning of a list item in a parent list, its leading
			// line terminators have already been written as the separating line terminators of the
			// parent list. Example:
			//
			// class Foo {
			//   constructor() {}
			//   public foo() {}
			// }
			//
			// The outer list is the list of class members, with one line terminator between the
			// constructor and the method. The constructor is written, the separating line terminator
			// is written, and then we start emitting the method. Its modifiers ([public]) constitute an inner
			// list, so we look for its leading line terminators. If we didn't know that we had already
			// written a newline as part of the parent list, it would appear that we need to write a
			// leading newline to start the modifiers.
			return 0
		}
		if firstChild.Kind == ast.KindJsxText {
			// JsxText will be written with its leading whitespace, so don't add more manually.
			return 0
		}
		if p.currentSourceFile != nil && parentNode != nil &&
			!ast.PositionIsSynthesized(parentNode.Pos()) &&
			!ast.NodeIsSynthesized(firstChild) &&
			(firstChild.Parent == nil /*|| getOriginalNode(firstChild.Parent) == getOriginalNode(parentNode)*/) {
			if p.Options.PreserveSourceNewlines {
				return p.getEffectiveLines(
					func(includeComments bool) int {
						return getLinesBetweenPositionAndPrecedingNonWhitespaceCharacter(
							firstChild.Pos(),
							parentNode.Pos(),
							p.currentSourceFile,
							includeComments,
						)
					},
				)
			}
			return core.IfElse(rangeStartPositionsAreOnSameLine(parentNode.Loc, firstChild.Loc, p.currentSourceFile), 0, 1)
		}
		if p.shouldEmitOnNewLine(firstChild, format) {
			return 1
		}
	}
	return core.IfElse(format&LFMultiLine != 0, 1, 0)
}

func (p *Printer) getSeparatingLineTerminatorCount(previousNode *ast.Node, nextNode *ast.Node, format ListFormat) int {
	if format&LFPreserveLines != 0 || p.Options.PreserveSourceNewlines {
		if previousNode == nil || nextNode == nil {
			return 0
		}
		if nextNode.Kind == ast.KindJsxText {
			// JsxText will be written with its leading whitespace, so don't add more manually.
			return 0
		} else if p.currentSourceFile != nil && !ast.NodeIsSynthesized(previousNode) && !ast.NodeIsSynthesized(nextNode) {
			if p.Options.PreserveSourceNewlines && siblingNodePositionsAreComparable(previousNode, nextNode) {
				return p.getEffectiveLines(
					func(includeComments bool) int {
						return getLinesBetweenRangeEndAndRangeStart(
							previousNode.Loc,
							nextNode.Loc,
							p.currentSourceFile,
							includeComments,
						)
					},
				)
			} else if !p.Options.PreserveSourceNewlines && originalNodesHaveSameParent(previousNode, nextNode) {
				// If `preserveSourceNewlines` is `false` we do not intend to preserve the effective lines between the
				// previous and next node. Instead we naively check whether nodes are on separate lines within the
				// same node parent. If so, we intend to preserve a single line terminator. This is less precise and
				// expensive than checking with `preserveSourceNewlines` as above, but the goal is not to preserve the
				// effective source lines between two sibling nodes.
				return core.IfElse(rangeEndIsOnSameLineAsRangeStart(previousNode.Loc, nextNode.Loc, p.currentSourceFile), 0, 1)
			}
			// If the two nodes are not comparable, add a line terminator based on the format that can indicate
			// whether new lines are preferred or not.
			return core.IfElse(format&LFPreferNewLine != 0, 1, 0)
		} else if p.shouldEmitOnNewLine(previousNode, format) || p.shouldEmitOnNewLine(nextNode, format) {
			return 1
		}
	} else if p.shouldEmitOnNewLine(nextNode, LFNone) {
		return 1
	}
	return core.IfElse(format&LFMultiLine != 0, 1, 0)
}

func (p *Printer) getClosingLineTerminatorCount(parentNode *ast.Node, lastChild *ast.Node, format ListFormat, childrenTextRange core.TextRange) int {
	if format&LFPreserveLines != 0 || p.Options.PreserveSourceNewlines {
		if format&LFPreferNewLine != 0 {
			return 1
		}
		if lastChild == nil {
			return core.IfElse(parentNode == nil || p.currentSourceFile != nil && RangeIsOnSingleLine(parentNode.Loc, p.currentSourceFile), 0, 1)
		}
		if p.currentSourceFile != nil && parentNode != nil && !ast.PositionIsSynthesized(parentNode.Pos()) && !ast.NodeIsSynthesized(lastChild) && (lastChild.Parent == nil || lastChild.Parent == parentNode) {
			if p.Options.PreserveSourceNewlines {
				end := greatestEnd(lastChild.End(), childrenTextRange)
				return p.getEffectiveLines(
					func(includeComments bool) int {
						return getLinesBetweenPositionAndNextNonWhitespaceCharacter(
							end,
							parentNode.End(),
							p.currentSourceFile,
							includeComments,
						)
					},
				)
			}
			return core.IfElse(rangeEndPositionsAreOnSameLine(parentNode.Loc, lastChild.Loc, p.currentSourceFile), 0, 1)
		}
		if p.shouldEmitOnNewLine(lastChild, format) {
			return 1
		}
	}
	if format&LFMultiLine != 0 && format&LFNoTrailingNewLine == 0 {
		return 1
	}
	return 0
}

func (p *Printer) writeCommentRange(comment ast.CommentRange) {
	if p.currentSourceFile == nil {
		return
	}

	text := p.currentSourceFile.Text()
	lineMap := p.currentSourceFile.ECMALineMap()
	p.writeCommentRangeWorker(text, lineMap, comment.Kind, comment.TextRange)
}

func (p *Printer) writeCommentRangeWorker(text string, lineMap []core.TextPos, kind ast.Kind, loc core.TextRange) {
	if kind == ast.KindMultiLineCommentTrivia {
		indentSize := GetDefaultIndentSize()
		firstLine := scanner.ComputeLineOfPosition(lineMap, loc.Pos())
		lineCount := len(lineMap)
		firstCommentLineIndent := -1
		pos := loc.Pos()
		currentLine := firstLine
		for ; pos < loc.End(); currentLine++ {
			var nextLineStart int
			if currentLine+1 == lineCount {
				nextLineStart = len(text) + 1
			} else {
				nextLineStart = int(lineMap[currentLine+1])
			}

			if pos != loc.Pos() {
				// If we are not emitting first line, we need to write the spaces to adjust the alignment
				if firstCommentLineIndent == -1 {
					firstCommentLineIndent = calculateIndent(text, int(lineMap[firstLine]), loc.Pos())
				}

				// These are number of spaces writer is going to write at current indent
				currentWriterIndentSpacing := p.writer.GetIndent() * indentSize

				// Number of spaces we want to be writing
				// eg: Assume writer indent
				// module m {
				//         /* starts at character 9 this is line 1
				//    * starts at character pos 4 line                        --1  = 8 - 8 + 3
				//   More left indented comment */                            --2  = 8 - 8 + 2
				//     class c { }
				// }
				// module m {
				//     /* this is line 1 -- Assume current writer indent 8
				//      * line                                                --3 = 8 - 4 + 5
				//            More right indented comment */                  --4 = 8 - 4 + 11
				//     class c { }
				// }
				spacesToEmit := currentWriterIndentSpacing - firstCommentLineIndent + calculateIndent(text, pos, nextLineStart)
				if spacesToEmit > 0 {
					numberOfSingleSpacesToEmit := spacesToEmit % indentSize
					indentSizeSpaceString := getIndentString((spacesToEmit-numberOfSingleSpacesToEmit)/indentSize, indentSize)

					// Write indent size string ( in eg 1: = "", 2: "" , 3: string with 8 spaces 4: string with 12 spaces
					p.writer.RawWrite(indentSizeSpaceString)

					// Emit the single spaces (in eg: 1: 3 spaces, 2: 2 spaces, 3: 1 space, 4: 3 spaces)
					for numberOfSingleSpacesToEmit > 0 {
						p.writer.RawWrite(" ")
						numberOfSingleSpacesToEmit--
					}
				} else {
					// No spaces to emit write empty string
					p.writer.RawWrite("")
				}
			}

			// Write the comment line text
			end := min(loc.End(), nextLineStart-1)
			currentLineText := strings.TrimSpace(text[pos:end])
			if len(currentLineText) > 0 {
				p.writeComment(currentLineText)
				if end != loc.End() {
					p.writeLine()
				}
			} else {
				// Empty string - make sure we write empty line
				p.writer.WriteLineForce(true)
			}

			pos = nextLineStart
		}
	} else {
		// Single line comment of style //....
		p.writeComment(text[loc.Pos():loc.End()])
	}
}

//
// Custom emit behavior stubs (i.e., from `EmitNode`, `EmitFlags`, etc.)
//

func (p *Printer) shouldEmitComments(node *ast.Node) bool {
	return !p.commentsDisabled &&
		p.currentSourceFile != nil &&
		!ast.IsSourceFile(node)
}

func (p *Printer) shouldWriteComment(comment ast.CommentRange) bool {
	return !p.Options.OnlyPrintJSDocStyle ||
		p.currentSourceFile != nil && isJSDocLikeText(p.currentSourceFile.Text(), comment) ||
		p.currentSourceFile != nil && IsPinnedComment(p.currentSourceFile.Text(), comment)
}

func (p *Printer) shouldEmitIndented(node *ast.Node) bool {
	return p.emitContext.EmitFlags(node)&EFIndented != 0
}

func (p *Printer) shouldElideIndentation(node *ast.Node) bool {
	return p.emitContext.EmitFlags(node)&EFNoIndentation != 0
}

func (p *Printer) shouldEmitOnSingleLine(node *ast.Node) bool {
	return p.emitContext.EmitFlags(node)&EFSingleLine != 0
}

func (p *Printer) shouldEmitOnMultipleLines(node *ast.Node) bool {
	return p.emitContext.EmitFlags(node)&EFMultiLine != 0
}

func (p *Printer) shouldEmitBlockFunctionBodyOnSingleLine(body *ast.Block) bool {
	// We must emit a function body as a single-line body in the following case:
	// * The body has NodeEmitFlags.SingleLine specified.

	// We must emit a function body as a multi-line body in the following cases:
	// * The body is explicitly marked as multi-line.
	// * A non-synthesized body's start and end position are on different lines.
	// * Any statement in the body starts on a new line.

	if p.shouldEmitOnSingleLine(body.AsNode()) {
		return true
	}

	if body.Multiline {
		return false
	}

	if !ast.NodeIsSynthesized(body.AsNode()) && p.currentSourceFile != nil && !RangeIsOnSingleLine(body.Loc, p.currentSourceFile) {
		return false
	}

	if p.getLeadingLineTerminatorCount(body.AsNode(), core.FirstOrNil(body.Statements.Nodes), LFPreserveLines) > 0 ||
		p.getClosingLineTerminatorCount(body.AsNode(), core.LastOrNil(body.Statements.Nodes), LFPreserveLines, body.Statements.Loc) > 0 {
		return false
	}

	var previousStatement *ast.Statement
	for _, statement := range body.Statements.Nodes {
		if p.getSeparatingLineTerminatorCount(previousStatement, statement, LFPreserveLines) > 0 {
			return false
		}

		previousStatement = statement
	}

	return true
}

func (p *Printer) shouldEmitOnNewLine(node *ast.Node, format ListFormat) bool {
	if p.emitContext.EmitFlags(node)&EFStartOnNewLine != 0 {
		return true
	}
	return format&LFPreferNewLine != 0
}

func (p *Printer) shouldEmitSourceMaps(node *ast.Node) bool {
	return !p.sourceMapsDisabled &&
		p.sourceMapSource != nil &&
		!ast.IsSourceFile(node) &&
		!ast.IsInJsonFile(node)
}

func (p *Printer) shouldEmitTokenSourceMaps(token ast.Kind, pos int, contextNode *ast.Node, flags tokenEmitFlags) bool {
	// We don't emit source positions for most tokens as it tends to be quite noisy, however
	// we need to emit source positions for open and close braces so that tools like istanbul
	// can map branches for code coverage. However, we still omit brace source positions when
	// the output is a declaration file.
	return flags&tefNoSourceMaps == 0 &&
		p.shouldEmitSourceMaps(contextNode) &&
		!p.Options.OmitBraceSourceMapPositions && (token == ast.KindOpenBraceToken || token == ast.KindCloseBraceToken)
}

func (p *Printer) shouldEmitLeadingComments(node *ast.Node) bool {
	return p.emitContext.EmitFlags(node)&EFNoLeadingComments == 0
}

func (p *Printer) shouldEmitTrailingComments(node *ast.Node) bool {
	return p.emitContext.EmitFlags(node)&EFNoTrailingComments == 0
}

func (p *Printer) shouldEmitNestedComments(node *ast.Node) bool {
	return p.emitContext.EmitFlags(node)&EFNoNestedComments == 0
}

func (p *Printer) shouldEmitDetachedComments(node *ast.Node) bool {
	if !ast.IsSourceFile(node) {
		return true
	}

	file := node.AsSourceFile()

	// Emit detached comment if there are no prologue directives or if the first node is synthesized.
	// The synthesized node will have no leading comment so some comments may be missed.
	return len(file.Statements.Nodes) == 0 ||
		!ast.IsPrologueDirective(file.Statements.Nodes[0]) ||
		ast.NodeIsSynthesized(file.Statements.Nodes[0])
}

func (p *Printer) hasCommentsAtPosition(pos int) bool {
	// !!!
	return false
}

func (p *Printer) shouldEmitIndirectCall(node *ast.Node) bool {
	return p.emitContext.EmitFlags(node)&EFIndirectCall != 0
}

func (p *Printer) shouldAllowTrailingComma(node *ast.Node, list *ast.NodeList) bool {
	if p.currentSourceFile == nil || p.currentSourceFile.ScriptKind == core.ScriptKindJSON {
		return false
	}

	switch node.Kind {
	case ast.KindObjectLiteralExpression:
		return true
	case ast.KindArrayLiteralExpression,
		ast.KindArrowFunction,
		ast.KindConstructor,
		ast.KindGetAccessor,
		ast.KindSetAccessor,
		ast.KindTypeAliasDeclaration,
		ast.KindJSTypeAliasDeclaration,
		ast.KindFunctionType,
		ast.KindConstructorType,
		ast.KindCallSignature,
		ast.KindConstructSignature,
		ast.KindTaggedTemplateExpression,
		ast.KindObjectBindingPattern,
		ast.KindArrayBindingPattern,
		ast.KindNamedImports,
		ast.KindNamedExports,
		ast.KindImportAttributes:
		return true
	case ast.KindClassExpression,
		ast.KindClassDeclaration,
		ast.KindInterfaceDeclaration:
		return list == node.TypeParameterList()
	case ast.KindFunctionDeclaration,
		ast.KindFunctionExpression,
		ast.KindMethodDeclaration:
		return true
	case ast.KindCallExpression:
		return true
	case ast.KindNewExpression:
		return true
	}

	return false
}

//
// Tokens/Keywords
//

func (p *Printer) writeTokenText(token ast.Kind, writeKind WriteKind, pos int) int {
	// !!! emit leading and trailing comments
	// !!! emit leading and trailing source maps
	tokenString := scanner.TokenToString(token)
	p.writeAs(tokenString, writeKind)
	if ast.PositionIsSynthesized(pos) {
		return pos
	} else {
		return pos + len(tokenString)
	}
}

func (p *Printer) emitToken(token ast.Kind, pos int, writeKind WriteKind, contextNode *ast.Node) int {
	return p.emitTokenEx(token, pos, writeKind, contextNode, tefNone)
}

func (p *Printer) emitTokenEx(token ast.Kind, pos int, writeKind WriteKind, contextNode *ast.Node, flags tokenEmitFlags) int {
	state, pos := p.enterToken(token, pos, contextNode, flags)
	pos = p.writeTokenText(token, writeKind, pos)
	p.exitToken(token, pos, contextNode, state)
	return pos
}

func (p *Printer) emitKeywordNode(node *ast.TokenNode) {
	p.emitKeywordNodeEx(node, tefNone)
}

func (p *Printer) emitKeywordNodeEx(node *ast.TokenNode, flags tokenEmitFlags) {
	if node == nil {
		return
	}

	state := p.enterTokenNode(node, flags)
	p.writeTokenText(node.Kind, WriteKindKeyword, node.Pos())
	p.exitTokenNode(node, state)
}

func (p *Printer) emitPunctuationNode(node *ast.TokenNode) {
	p.emitPunctuationNodeEx(node, tefNone)
}

func (p *Printer) emitPunctuationNodeEx(node *ast.TokenNode, flags tokenEmitFlags) {
	if node == nil {
		return
	}

	state := p.enterTokenNode(node, flags)
	p.writeTokenText(node.Kind, WriteKindPunctuation, node.Pos())
	p.exitTokenNode(node, state)
}

func (p *Printer) emitTokenNode(node *ast.TokenNode) {
	p.emitTokenNodeEx(node, tefNone)
}

func (p *Printer) emitTokenNodeEx(node *ast.TokenNode, flags tokenEmitFlags) {
	if node == nil {
		return
	}

	switch {
	case ast.IsKeywordKind(node.Kind):
		p.emitKeywordNodeEx(node, flags)
	case ast.IsPunctuationKind(node.Kind):
		p.emitPunctuationNodeEx(node, flags)
	default:
		panic(fmt.Sprintf("unexpected TokenNode: %v", node.Kind))
	}
}

//
// Literals
//

// Emits literals of the following kinds
//
//	SyntaxKindNumericLiteral
//	SyntaxKindBigIntLiteral
//	SyntaxKindStringLiteral
//	SyntaxKindNoSubstitutionTemplateLiteral
//	SyntaxKindRegularExpressionLiteral
//	SyntaxKindTemplateHead
//	SyntaxKindTemplateMiddle
//	SyntaxKindTemplateTail
func (p *Printer) emitLiteral(node *ast.LiteralLikeNode, flags getLiteralTextFlags) {
	// Add NeverAsciiEscape flag if the printer option is set
	if p.Options.NeverAsciiEscape {
		flags |= getLiteralTextFlagsNeverAsciiEscape
	}

	text := p.getLiteralTextOfNode(node, nil /*sourceFile*/, flags)

	// !!! Printer option to control source map emit, which causes us to use a different write method on the
	// emit text writer:

	////if (
	////	(printerOptions.sourceMap || printerOptions.inlineSourceMap)
	////	&& (node.kind === SyntaxKindStringLiteral || isTemplateLiteralKind(node.kind))
	////) {
	////	writeLiteral(text);
	////} else {

	// Quick info expects all literals to be called with writeStringLiteral, as there's no specific type for
	// numberLiterals
	p.writer.WriteStringLiteral(text)

	// }
}

func (p *Printer) emitNumericLiteral(node *ast.NumericLiteral) {
	state := p.enterNode(node.AsNode())
	p.emitLiteral(node.AsNode(), getLiteralTextFlagsNone)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitBigIntLiteral(node *ast.BigIntLiteral) {
	state := p.enterNode(node.AsNode())
	p.emitLiteral(node.AsNode(), getLiteralTextFlagsNone) // TODO: Preserve numeric literal separators after Strada migration
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitStringLiteral(node *ast.StringLiteral) {
	state := p.enterNode(node.AsNode())
	p.emitLiteral(node.AsNode(), getLiteralTextFlagsNone)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitNoSubstitutionTemplateLiteral(node *ast.NoSubstitutionTemplateLiteral) {
	state := p.enterNode(node.AsNode())
	p.emitLiteral(node.AsNode(), getLiteralTextFlagsNone)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitRegularExpressionLiteral(node *ast.RegularExpressionLiteral) {
	state := p.enterNode(node.AsNode())
	p.emitLiteral(node.AsNode(), getLiteralTextFlagsNone)
	p.exitNode(node.AsNode(), state)
}

//
// Pseudo-literals
//

func (p *Printer) emitTemplateHead(node *ast.TemplateHead) {
	state := p.enterNode(node.AsNode())
	p.emitLiteral(node.AsNode(), getLiteralTextFlagsNone)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitTemplateMiddle(node *ast.TemplateMiddle) {
	state := p.enterNode(node.AsNode())
	p.emitLiteral(node.AsNode(), getLiteralTextFlagsNone)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitTemplateTail(node *ast.TemplateTail) {
	state := p.enterNode(node.AsNode())
	p.emitLiteral(node.AsNode(), getLiteralTextFlagsNone)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitTemplateMiddleTail(node *ast.TemplateMiddleOrTail) {
	switch node.Kind {
	case ast.KindTemplateMiddle:
		p.emitTemplateMiddle(node.AsTemplateMiddle())
	case ast.KindTemplateTail:
		p.emitTemplateTail(node.AsTemplateTail())
	}
}

//
// Snippet Elements
//

// !!! Snippet elements

//
// Names
//

func (p *Printer) emitIdentifierText(node *ast.Identifier) {
	text := p.getTextOfNode(node.AsNode(), false /*includeTrivia*/)

	// !!! In the old emitter, an Identifier could have a Symbol associated with it. That
	// doesn't seem to be the case in the new emitter. Do we need to get the symbol from somewhere else?
	////p.writeSymbol(text, node.Symbol())
	p.write(text)

	// !!! In the old emitter, an Identifier could have type arguments for use with quickinfo:
	////p.emitList(node, getIdentifierTypeArguments(node), LFTypeParameters); // Call emitList directly since it could be an array of TypeParameterDeclarations _or_ type arguments
}

func (p *Printer) emitIdentifierName(node *ast.Identifier) {
	state := p.enterNode(node.AsNode())
	p.emitIdentifierText(node)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitIdentifierNameNode(node *ast.IdentifierNode) {
	if node == nil {
		return
	}
	p.emitIdentifierName(node.AsIdentifier())
}

func (p *Printer) getUniqueHelperName(name string) *ast.IdentifierNode {
	helperName := p.uniqueHelperNames[name]
	if helperName == nil {
		helperName := p.emitContext.Factory.NewUniqueNameEx(name, AutoGenerateOptions{Flags: GeneratedIdentifierFlagsFileLevel | GeneratedIdentifierFlagsOptimistic})
		p.generateName(helperName)
		p.uniqueHelperNames[name] = helperName
		return helperName
	}
	return helperName.Clone(p.emitContext.Factory)
}

func (p *Printer) emitIdentifierReference(node *ast.Identifier) {
	if (p.externalHelpersModuleName != nil || p.uniqueHelperNames != nil) &&
		p.emitContext.EmitFlags(node.AsNode())&EFHelperName != 0 {
		if p.externalHelpersModuleName != nil {
			// Substitute `__helper` with `tslib_1.__helper`
			helper := p.emitContext.Factory.NewPropertyAccessExpression(
				p.externalHelpersModuleName.Clone(p.emitContext.Factory),
				nil, /*questionDotToken*/
				node.Clone(p.emitContext.Factory),
				ast.NodeFlagsNone,
			)
			p.emitContext.AssignCommentAndSourceMapRanges(helper, node.AsNode())
			p.emitPropertyAccessExpression(helper.AsPropertyAccessExpression())
			return
		}
		if p.uniqueHelperNames != nil {
			// Substitute `__helper` with `__helper_1` if there is a conflict in an ES module.
			helperName := p.getUniqueHelperName(node.Text)
			p.emitContext.AssignCommentAndSourceMapRanges(helperName, node.AsNode())
			node = helperName.AsIdentifier()
		}
	}

	state := p.enterNode(node.AsNode())
	p.emitIdentifierText(node)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitBindingIdentifier(node *ast.Identifier) {
	if p.uniqueHelperNames != nil &&
		p.emitContext.EmitFlags(node.AsNode())&EFHelperName != 0 {
		// Substitute `__helper` with `__helper_1` if there is a conflict in an ES module.
		helperName := p.getUniqueHelperName(node.Text)
		p.emitContext.AssignCommentAndSourceMapRanges(helperName, node.AsNode())
		node = helperName.AsIdentifier()
	}

	state := p.enterNode(node.AsNode())
	p.emitIdentifierText(node)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitLabelIdentifier(node *ast.Identifier) {
	state := p.enterNode(node.AsNode())
	p.emitIdentifierText(node)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitPrivateIdentifier(node *ast.PrivateIdentifier) {
	state := p.enterNode(node.AsNode())
	p.write(p.getTextOfNode(node.AsNode(), false /*includeTrivia*/))
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitQualifiedName(node *ast.QualifiedName) {
	state := p.enterNode(node.AsNode())
	p.emitEntityName(node.Left)
	p.writePunctuation(".")
	p.emitIdentifierName(node.Right.AsIdentifier())
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitComputedPropertyName(node *ast.ComputedPropertyName) {
	state := p.enterNode(node.AsNode())
	p.writePunctuation("[")
	p.emitExpression(node.Expression, ast.OperatorPrecedenceDisallowComma)
	p.writePunctuation("]")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitEntityName(node *ast.EntityName) {
	switch node.Kind {
	case ast.KindIdentifier:
		p.emitIdentifierReference(node.AsIdentifier())
	case ast.KindQualifiedName:
		p.emitQualifiedName(node.AsQualifiedName())
	default:
		panic(fmt.Sprintf("unexpected EntityName: %v", node.Kind))
	}
}

func (p *Printer) emitBindingName(node *ast.BindingName) {
	if node == nil {
		return
	}

	switch node.Kind {
	case ast.KindIdentifier:
		p.emitBindingIdentifier(node.AsIdentifier())
	case ast.KindObjectBindingPattern:
		p.emitObjectBindingPattern(node.AsBindingPattern())
	case ast.KindArrayBindingPattern:
		p.emitArrayBindingPattern(node.AsBindingPattern())
	default:
		panic(fmt.Sprintf("unexpected BindingName: %v", node.Kind))
	}
}

func (p *Printer) emitPropertyName(node *ast.PropertyName) {
	if node == nil {
		return
	}

	savedWriteKind := p.writeKind
	p.writeKind = WriteKindProperty

	switch node.Kind {
	case ast.KindIdentifier:
		p.emitIdentifierName(node.AsIdentifier())
	case ast.KindPrivateIdentifier:
		p.emitPrivateIdentifier(node.AsPrivateIdentifier())
	case ast.KindStringLiteral:
		p.emitStringLiteral(node.AsStringLiteral())
	case ast.KindNoSubstitutionTemplateLiteral:
		p.emitNoSubstitutionTemplateLiteral(node.AsNoSubstitutionTemplateLiteral())
	case ast.KindNumericLiteral:
		p.emitNumericLiteral(node.AsNumericLiteral())
	case ast.KindBigIntLiteral:
		p.emitBigIntLiteral(node.AsBigIntLiteral())
	case ast.KindComputedPropertyName:
		p.emitComputedPropertyName(node.AsComputedPropertyName())
	default:
		panic(fmt.Sprintf("unexpected PropertyName: %v", node.Kind))
	}

	p.writeKind = savedWriteKind
}

func (p *Printer) emitMemberName(node *ast.MemberName) {
	if node == nil {
		return
	}

	switch node.Kind {
	case ast.KindIdentifier:
		p.emitIdentifierName(node.AsIdentifier())
	case ast.KindPrivateIdentifier:
		p.emitPrivateIdentifier(node.AsPrivateIdentifier())
	default:
		panic(fmt.Sprintf("unexpected MemberName: %v", node.Kind))
	}
}

func (p *Printer) emitModuleName(node *ast.ModuleName) {
	if node == nil {
		return
	}

	switch node.Kind {
	case ast.KindIdentifier:
		p.emitBindingIdentifier(node.AsIdentifier())
	case ast.KindStringLiteral:
		p.emitStringLiteral(node.AsStringLiteral())
	default:
		panic(fmt.Sprintf("unexpected ModuleName: %v", node.Kind))
	}
}

func (p *Printer) emitModuleExportName(node *ast.ModuleExportName) {
	if node == nil {
		return
	}

	switch node.Kind {
	case ast.KindIdentifier:
		p.emitIdentifierName(node.AsIdentifier())
	case ast.KindStringLiteral:
		p.emitStringLiteral(node.AsStringLiteral())
	default:
		panic(fmt.Sprintf("unexpected ModuleExportName: %v", node.Kind))
	}
}

func (p *Printer) emitImportAttributeName(node *ast.ImportAttributeName) {
	switch node.Kind {
	case ast.KindIdentifier:
		p.emitIdentifierName(node.AsIdentifier())
	case ast.KindStringLiteral:
		p.emitStringLiteral(node.AsStringLiteral())
	default:
		panic(fmt.Sprintf("unexpected ImportAttributeName: %v", node.Kind))
	}
}

func (p *Printer) emitNestedModuleName(node *ast.ModuleName) {
	if node == nil {
		return
	}

	switch node.Kind {
	case ast.KindIdentifier:
		p.emitIdentifierName(node.AsIdentifier())
	case ast.KindStringLiteral:
		p.emitStringLiteral(node.AsStringLiteral())
	default:
		panic(fmt.Sprintf("unexpected ModuleName: %v", node.Kind))
	}
}

//
// Signature elements
//

func (p *Printer) emitModifierList(parentNode *ast.Node, modifiers *ast.ModifierList, allowDecorators bool) int {
	if modifiers == nil || len(modifiers.Nodes) == 0 {
		return parentNode.Pos()
	}

	if core.Every(modifiers.Nodes, ast.IsModifier) {
		// if all modifier-likes are `Modifier`, simply emit the list as modifiers.
		p.emitList((*Printer).emitKeywordNode, parentNode, &modifiers.NodeList, LFModifiers)
	} else if core.Every(modifiers.Nodes, ast.IsDecorator) {
		if !allowDecorators {
			return parentNode.Pos()
		}

		// if all modifier-likes are `Decorator`, simply emit the list as decorators.
		p.emitList((*Printer).emitModifierLike, parentNode, &modifiers.NodeList, LFDecorators)
	} else {
		if p.OnBeforeEmitNodeList != nil {
			p.OnBeforeEmitNodeList(&modifiers.NodeList)
		}

		// partition modifiers into contiguous chunks of `Modifier` or `Decorator` so as to
		// use consistent formatting for each chunk
		type Mode int
		const (
			ModeNone Mode = iota
			ModeModifiers
			ModeDecorators
		)

		lastMode := ModeNone
		mode := ModeNone
		start := 0
		pos := 0

		var lastModifier *ast.ModifierLike
		for start < len(modifiers.Nodes) {
			for pos < len(modifiers.Nodes) {
				lastModifier = modifiers.Nodes[pos]
				if ast.IsDecorator(lastModifier) {
					mode = ModeDecorators
				} else {
					mode = ModeModifiers
				}
				if lastMode == ModeNone {
					lastMode = mode
				} else if mode != lastMode {
					break
				}
				pos++
			}

			textRange := core.NewTextRange(-1, -1)
			if start == 0 {
				textRange = core.NewTextRange(modifiers.Pos(), textRange.End())
			}
			if pos == len(modifiers.Nodes)-1 {
				textRange = core.NewTextRange(textRange.Pos(), modifiers.End())
			}
			if allowDecorators || lastMode == ModeModifiers {
				p.emitListItems(
					(*Printer).emitModifierLike,
					parentNode,
					modifiers.Nodes[start:pos],
					core.IfElse(lastMode == ModeModifiers, LFModifiers, LFDecorators),
					false, /*hasTrailingComma*/
					textRange,
				)
			}
			start = pos
			lastMode = mode
			pos++
		}

		if p.OnAfterEmitNodeList != nil {
			p.OnAfterEmitNodeList(&modifiers.NodeList)
		}
	}

	return greatestEnd(parentNode.Pos(), modifiers, core.LastOrNil(modifiers.Nodes))
}

func (p *Printer) emitTypeParameter(node *ast.TypeParameterDeclaration) {
	state := p.enterNode(node.AsNode())
	p.emitModifierList(node.AsNode(), node.Modifiers(), false /*allowDecorators*/)
	p.emitBindingIdentifier(node.Name().AsIdentifier())
	if node.Constraint != nil {
		p.writeSpace()
		p.writeKeyword("extends")
		p.writeSpace()
		p.emitTypeNodeOutsideExtends(node.Constraint)
	}
	if node.DefaultType != nil {
		p.writeSpace()
		p.writeOperator("=")
		p.writeSpace()
		p.emitTypeNodeOutsideExtends(node.DefaultType)
	}
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitTypeParameterNode(node *ast.TypeParameterDeclarationNode) {
	// NOTE: QuickInfo uses TypeFormatFlagsWriteTypeArgumentsOfSignature to instruct the NodeBuilder to store type arguments
	// (i.e. type nodes) instead of type parameter declarations in the type parameter list.
	if ast.IsTypeParameterDeclaration(node) {
		p.emitTypeParameter(node.AsTypeParameter())
	} else {
		p.emitTypeArgument(node)
	}
}

func (p *Printer) emitParameterName(node *ast.BindingName) {
	savedWriteKind := p.writeKind
	p.writeKind = WriteKindParameter
	p.emitBindingName(node)
	p.writeKind = savedWriteKind
}

func (p *Printer) emitParameter(node *ast.ParameterDeclaration) {
	state := p.enterNode(node.AsNode())
	p.emitModifierList(node.AsNode(), node.Modifiers(), true /*allowDecorators*/)
	p.emitTokenNode(node.DotDotDotToken)
	p.emitParameterName(node.Name())
	p.emitTokenNode(node.QuestionToken)

	p.emitTypeAnnotation(node.Type)

	// The comment position has to fallback to any present node within the parameter declaration because as it turns
	// out, the parser can make parameter declarations with _just_ an initializer.
	p.emitInitializer(node.Initializer, greatestEnd(node.Pos(), node.Type, node.QuestionToken, node.Name(), node.Modifiers()), node.AsNode())
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitParameterNode(node *ast.ParameterDeclarationNode) {
	p.emitParameter(node.AsParameterDeclaration())
}

func (p *Printer) emitDecorator(node *ast.Decorator) {
	p.writePunctuation("@")
	p.emitExpression(node.Expression, ast.OperatorPrecedenceMember)
}

func (p *Printer) emitModifierLike(node *ast.ModifierLike) {
	switch {
	case ast.IsDecorator(node):
		p.emitDecorator(node.AsDecorator())
	case ast.IsModifier(node):
		p.emitKeywordNode(node)
	default:
		panic(fmt.Sprintf("unhandled ModifierLike: %v", node.Kind))
	}
}

func (p *Printer) emitTypeParameters(parentNode *ast.Node, nodes *ast.TypeParameterList) {
	if nodes == nil {
		return
	}
	p.emitList((*Printer).emitTypeParameterNode, parentNode, nodes, LFTypeParameters|core.IfElse(ast.IsArrowFunction(parentNode) /*p.shouldAllowTrailingComma(parentNode, nodes)*/, LFAllowTrailingComma, LFNone)) // TODO: preserve trailing comma after Strada migration
}

func (p *Printer) emitTypeAnnotation(node *ast.TypeNode) {
	if node == nil {
		return
	}

	p.writePunctuation(":")
	p.writeSpace()
	p.emitTypeNodeOutsideExtends(node)
}

func (p *Printer) emitInitializer(node *ast.Expression, equalTokenPos int, contextNode *ast.Node) {
	if node == nil {
		return
	}

	p.writeSpace()
	p.emitToken(ast.KindEqualsToken, equalTokenPos, WriteKindOperator, contextNode)
	p.writeSpace()
	p.emitExpression(node, ast.OperatorPrecedenceDisallowComma)
}

func (p *Printer) emitParameters(parentNode *ast.Node, parameters *ast.ParameterList) {
	p.generateAllNames(parameters)
	p.emitList((*Printer).emitParameterNode, parentNode, parameters, LFParameters /*|core.IfElse(p.shouldAllowTrailingComma(parentNode, parameters), LFAllowTrailingComma, LFNone)*/) // TODO: preserve trailing comma after Strada migration
}

func canEmitSimpleArrowHead(parentNode *ast.Node, parameters *ast.ParameterList) bool {
	// only arrow functions with a single parameter may have simple arrow head
	if !ast.IsArrowFunction(parentNode) || len(parameters.Nodes) != 1 {
		return false
	}

	parent := parentNode.AsArrowFunction()
	parameter := parameters.Nodes[0].AsParameterDeclaration()

	return parameter.Pos() == greatestEnd(parent.Pos(), parent.Modifiers()) && // may not have parsed tokens between modifiers/start of parent and parameter
		parent.TypeParameters == nil && // parent may not have type parameters
		parent.Type == nil && // parent may not have return type annotation
		!parameters.HasTrailingComma() && // parameters may not have a trailing comma
		parameter.Modifiers() == nil && // parameter may not have decorators or modifiers
		parameter.DotDotDotToken == nil && // parameter may not be rest
		parameter.QuestionToken == nil && // parameter may not be optional
		parameter.Type == nil && // parameter may not have a type annotation
		parameter.Initializer == nil && // parameter may not have an initializer
		ast.IsIdentifier(parameter.Name()) // parameter name must be identifier
}

func (p *Printer) emitParametersForArrow(parentNode *ast.Node /*FunctionTypeNode | ConstructorTypeNode | ArrowFunction*/, parameters *ast.ParameterList) {
	if canEmitSimpleArrowHead(parentNode, parameters) {
		p.generateAllNames(parameters)
		p.emitList((*Printer).emitParameterNode, parentNode, parameters, LFSingleArrowParameter)
	} else {
		p.emitParameters(parentNode, parameters)
	}
}

func (p *Printer) emitParametersForIndexSignature(parentNode *ast.Node, parameters *ast.ParameterList) {
	p.generateAllNames(parameters)
	p.emitList((*Printer).emitParameterNode, parentNode, parameters, LFIndexSignatureParameters)
}

func (p *Printer) emitSignature(node *ast.Node) {
	n := node.FunctionLikeData()

	// !!! In old emitter, quickinfo used type arguments in place of type parameters on instantiated signatures
	////if n.TypeArguments != nil {
	////	p.emitTypeArguments(node, n.TypeArguments)
	////} else {
	p.emitTypeParameters(node, n.TypeParameters)
	////}

	p.emitParameters(node, n.Parameters)
	p.emitTypeAnnotation(n.Type)
}

func (p *Printer) emitFunctionBody(body *ast.Block) {
	state := p.enterNode(body.AsNode())
	p.generateNames(body.AsNode())

	// !!! Emit with comment after Strada migration
	////p.emitTokenWithComment(ast.KindOpenBraceToken, body.Pos(), WriteKindPunctuation, body.AsNode())
	p.writePunctuation("{")

	p.increaseIndent()
	detachedState := p.emitDetachedCommentsBeforeStatementList(body.AsNode(), body.Statements.Loc)
	statementOffset := p.emitPrologueDirectives(body.Statements)
	pos := p.writer.GetTextPos()
	p.emitHelpers(body.AsNode())

	if p.shouldEmitBlockFunctionBodyOnSingleLine(body) && statementOffset == 0 && pos == p.writer.GetTextPos() {
		p.decreaseIndent()
		p.emitListRange((*Printer).emitStatement, body.AsNode(), body.Statements, LFSingleLineFunctionBodyStatements, statementOffset, -1)
		p.increaseIndent()
	} else {
		p.emitListRange((*Printer).emitStatement, body.AsNode(), body.Statements, LFMultiLineFunctionBodyStatements, statementOffset, -1)
	}

	p.emitDetachedCommentsAfterStatementList(body.AsNode(), body.Statements.Loc, detachedState)
	p.decreaseIndent()

	// !!! Emit comment after Strada migration
	////p.emitTokenEx(ast.KindCloseBraceToken, body.Statements.End(), WriteKindPunctuation, body.AsNode(), tefNone)
	p.emitTokenEx(ast.KindCloseBraceToken, body.Statements.End(), WriteKindPunctuation, body.AsNode(), tefNoComments)

	p.exitNode(body.AsNode(), state)
}

func (p *Printer) emitFunctionBodyNode(node *ast.BlockNode) {
	if node == nil {
		p.writeTrailingSemicolon()
		return
	}

	p.writeSpace()
	p.emitFunctionBody(node.AsBlock())
}

//
// Type Members
//

func (p *Printer) emitPropertySignature(node *ast.PropertySignatureDeclaration) {
	state := p.enterNode(node.AsNode())
	p.emitModifierList(node.AsNode(), node.Modifiers(), false /*allowDecorators*/)
	p.emitPropertyName(node.Name())
	p.emitTokenNode(node.PostfixToken)
	p.emitTypeAnnotation(node.Type)
	p.writeTrailingSemicolon()
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitPropertyDeclaration(node *ast.PropertyDeclaration) {
	state := p.enterNode(node.AsNode())
	p.emitModifierList(node.AsNode(), node.Modifiers(), true /*allowDecorators*/)
	p.emitPropertyName(node.Name())
	p.emitTokenNode(node.PostfixToken)
	p.emitTypeAnnotation(node.Type)
	p.emitInitializer(node.Initializer, greatestEnd(node.Name().End(), node.Type, node.PostfixToken), node.AsNode())
	p.writeTrailingSemicolon()
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitMethodSignature(node *ast.MethodSignatureDeclaration) {
	state := p.enterNode(node.AsNode())
	p.emitModifierList(node.AsNode(), node.Modifiers(), false /*allowDecorators*/)
	p.emitPropertyName(node.Name())
	p.emitTokenNode(node.PostfixToken)
	indented := p.shouldEmitIndented(node.AsNode())
	p.increaseIndentIf(indented)
	p.pushNameGenerationScope(node.AsNode())
	p.emitSignature(node.AsNode())
	p.writeTrailingSemicolon()
	p.popNameGenerationScope(node.AsNode())
	p.decreaseIndentIf(indented)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitMethodDeclaration(node *ast.MethodDeclaration) {
	state := p.enterNode(node.AsNode())
	p.emitModifierList(node.AsNode(), node.Modifiers(), true /*allowDecorators*/)
	p.emitTokenNode(node.AsteriskToken)
	p.emitPropertyName(node.Name())
	p.emitTokenNode(node.PostfixToken)
	indented := p.shouldEmitIndented(node.AsNode())
	p.increaseIndentIf(indented)
	p.pushNameGenerationScope(node.AsNode())
	p.emitSignature(node.AsNode())
	p.emitFunctionBodyNode(node.Body)
	p.popNameGenerationScope(node.AsNode())
	p.decreaseIndentIf(indented)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitClassStaticBlockDeclaration(node *ast.ClassStaticBlockDeclaration) {
	state := p.enterNode(node.AsNode())
	p.writeKeyword("static")
	p.pushNameGenerationScope(node.AsNode())
	p.emitFunctionBodyNode(node.Body)
	p.popNameGenerationScope(node.AsNode())
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitConstructor(node *ast.ConstructorDeclaration) {
	state := p.enterNode(node.AsNode())
	p.emitModifierList(node.AsNode(), node.Modifiers(), false /*allowDecorators*/)
	p.writeKeyword("constructor")
	indented := p.shouldEmitIndented(node.AsNode())
	p.increaseIndentIf(indented)
	p.pushNameGenerationScope(node.AsNode())
	p.emitSignature(node.AsNode())
	p.emitFunctionBodyNode(node.Body)
	p.popNameGenerationScope(node.AsNode())
	p.decreaseIndentIf(indented)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitAccessorDeclaration(token ast.Kind, node *ast.AccessorDeclarationBase) {
	state := p.enterNode(node.AsNode())
	pos := p.emitModifierList(node.AsNode(), node.Modifiers(), true /*allowDecorators*/)
	p.emitToken(token, pos, WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitPropertyName(node.Name())
	indented := p.shouldEmitIndented(node.AsNode())
	p.increaseIndentIf(indented)
	p.pushNameGenerationScope(node.AsNode())
	p.emitSignature(node.AsNode())
	p.emitFunctionBodyNode(node.Body)
	p.popNameGenerationScope(node.AsNode())
	p.decreaseIndentIf(indented)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitGetAccessorDeclaration(node *ast.GetAccessorDeclaration) {
	p.emitAccessorDeclaration(ast.KindGetKeyword, &node.AccessorDeclarationBase)
}

func (p *Printer) emitSetAccessorDeclaration(node *ast.SetAccessorDeclaration) {
	p.emitAccessorDeclaration(ast.KindSetKeyword, &node.AccessorDeclarationBase)
}

func (p *Printer) emitCallSignature(node *ast.CallSignatureDeclaration) {
	state := p.enterNode(node.AsNode())
	indented := p.shouldEmitIndented(node.AsNode())
	p.increaseIndentIf(indented)
	p.pushNameGenerationScope(node.AsNode())
	p.emitSignature(node.AsNode())
	p.writeTrailingSemicolon()
	p.popNameGenerationScope(node.AsNode())
	p.decreaseIndentIf(indented)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitConstructSignature(node *ast.ConstructSignatureDeclaration) {
	state := p.enterNode(node.AsNode())
	p.writeKeyword("new")
	p.writeSpace()
	indented := p.shouldEmitIndented(node.AsNode())
	p.increaseIndentIf(indented)
	p.pushNameGenerationScope(node.AsNode())
	p.emitSignature(node.AsNode())
	p.writeTrailingSemicolon()
	p.popNameGenerationScope(node.AsNode())
	p.decreaseIndentIf(indented)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitIndexSignature(node *ast.IndexSignatureDeclaration) {
	state := p.enterNode(node.AsNode())
	p.emitModifierList(node.AsNode(), node.Modifiers(), false /*allowDecorators*/)
	indented := p.shouldEmitIndented(node.AsNode())
	p.increaseIndentIf(indented)
	p.pushNameGenerationScope(node.AsNode())
	p.emitParametersForIndexSignature(node.AsNode(), node.Parameters)
	p.emitTypeAnnotation(node.Type)
	p.writeTrailingSemicolon()
	p.popNameGenerationScope(node.AsNode())
	p.decreaseIndentIf(indented)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitClassElement(node *ast.ClassElement) {
	switch node.Kind {
	case ast.KindPropertyDeclaration:
		p.emitPropertyDeclaration(node.AsPropertyDeclaration())
	case ast.KindMethodDeclaration:
		p.emitMethodDeclaration(node.AsMethodDeclaration())
	case ast.KindClassStaticBlockDeclaration:
		p.emitClassStaticBlockDeclaration(node.AsClassStaticBlockDeclaration())
	case ast.KindConstructor:
		p.emitConstructor(node.AsConstructorDeclaration())
	case ast.KindGetAccessor:
		p.emitGetAccessorDeclaration(node.AsGetAccessorDeclaration())
	case ast.KindSetAccessor:
		p.emitSetAccessorDeclaration(node.AsSetAccessorDeclaration())
	case ast.KindIndexSignature:
		p.emitIndexSignature(node.AsIndexSignatureDeclaration())
	case ast.KindSemicolonClassElement:
		p.emitSemicolonClassElement(node.AsSemicolonClassElement())
	case ast.KindNotEmittedStatement:
		p.emitNotEmittedStatement(node.AsNotEmittedStatement())
	case ast.KindJSTypeAliasDeclaration:
		p.emitTypeAliasDeclaration(node.AsTypeAliasDeclaration())
	default:
		panic(fmt.Sprintf("unexpected ClassElement: %v", node.Kind))
	}
}

func (p *Printer) emitTypeElement(node *ast.TypeElement) {
	switch node.Kind {
	case ast.KindPropertySignature:
		p.emitPropertySignature(node.AsPropertySignatureDeclaration())
	case ast.KindMethodSignature:
		p.emitMethodSignature(node.AsMethodSignatureDeclaration())
	case ast.KindCallSignature:
		p.emitCallSignature(node.AsCallSignatureDeclaration())
	case ast.KindConstructSignature:
		p.emitConstructSignature(node.AsConstructSignatureDeclaration())
	case ast.KindGetAccessor:
		p.emitGetAccessorDeclaration(node.AsGetAccessorDeclaration())
	case ast.KindSetAccessor:
		p.emitSetAccessorDeclaration(node.AsSetAccessorDeclaration())
	case ast.KindIndexSignature:
		p.emitIndexSignature(node.AsIndexSignatureDeclaration())
	case ast.KindNotEmittedTypeElement:
		p.emitNotEmittedTypeElement(node.AsNotEmittedTypeElement())
	default:
		panic(fmt.Sprintf("unexpected TypeElement: %v", node.Kind))
	}
}

func (p *Printer) emitObjectLiteralElement(node *ast.ObjectLiteralElement) {
	switch node.Kind {
	case ast.KindPropertyAssignment:
		p.emitPropertyAssignment(node.AsPropertyAssignment())
	case ast.KindShorthandPropertyAssignment:
		p.emitShorthandPropertyAssignment(node.AsShorthandPropertyAssignment())
	case ast.KindSpreadAssignment:
		p.emitSpreadAssignment(node.AsSpreadAssignment())
	case ast.KindMethodDeclaration:
		p.emitMethodDeclaration(node.AsMethodDeclaration())
	case ast.KindGetAccessor:
		p.emitGetAccessorDeclaration(node.AsGetAccessorDeclaration())
	case ast.KindSetAccessor:
		p.emitSetAccessorDeclaration(node.AsSetAccessorDeclaration())
	default:
		panic(fmt.Sprintf("unhandled ObjectLiteralElement: %v", node.Kind))
	}
}

//
// Types
//

func (p *Printer) emitKeywordTypeNode(node *ast.KeywordTypeNode) {
	p.emitKeywordNode(node.AsNode())
}

func (p *Printer) emitTypePredicateParameterName(node *ast.TypePredicateParameterName) {
	switch node.Kind {
	case ast.KindIdentifier:
		p.emitIdentifierReference(node.AsIdentifier())
	case ast.KindThisType:
		p.emitThisType(node.AsThisTypeNode())
	default:
		panic(fmt.Sprintf("unexpected TypePredicateParameterName: %v", node.Kind))
	}
}

func (p *Printer) emitTypePredicate(node *ast.TypePredicateNode) {
	state := p.enterNode(node.AsNode())
	if node.AssertsModifier != nil {
		p.emitTokenNode(node.AssertsModifier)
		p.writeSpace()
	}
	p.emitTypePredicateParameterName(node.ParameterName)
	if node.Type != nil {
		p.writeSpace()
		p.writeKeyword("is")
		p.writeSpace()
		p.emitTypeNodeOutsideExtends(node.Type)
	}
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitTypeArgument(node *ast.TypeNode) {
	p.emitTypeNodeOutsideExtends(node)
}

func (p *Printer) emitTypeArguments(parentNode *ast.Node, nodes *ast.TypeArgumentList) {
	if nodes == nil {
		return
	}
	p.emitList((*Printer).emitTypeArgument, parentNode, nodes, LFTypeArguments /*|core.IfElse(p.shouldAllowTrailingComma(parentNode, nodes), LFAllowTrailingComma, LFNone)*/) // TODO: preserve trailing comma after Strada migration
}

func (p *Printer) emitTypeReference(node *ast.TypeReferenceNode) {
	state := p.enterNode(node.AsNode())
	p.emitEntityName(node.TypeName)
	p.emitTypeArguments(node.AsNode(), node.TypeArguments)
	p.exitNode(node.AsNode(), state)
}

// Emits the return type of a FunctionTypeNode or ConstructorTypeNode, including the arrow (`=>`)
func (p *Printer) emitReturnType(node *ast.TypeNode) {
	if node == nil {
		return
	}
	p.writePunctuation("=>")
	p.writeSpace()
	if p.inExtends && node.Kind == ast.KindInferType && node.AsInferTypeNode().TypeParameter.AsTypeParameter().Constraint != nil {
		// if the parent FunctionTypeNode or ConstructorTypeNode is in the `extends` clause of a ConditionalTypeNode,
		// we must parenthesize `infer ... extends ...` so as not to result in an ambiguous parse.
		//
		// `T extends () => infer U extends V ? W : X` would parse the `? W : X` as part of a ConditionalTypeNode in the
		// return type of the FunctionTypeNode, thus we must emit as `T extends () => (infer U extends V) ? W : X`
		p.emitTypeNodePreservingExtends(node, ast.TypePrecedenceHighest)
	} else {
		p.emitTypeNodePreservingExtends(node, ast.TypePrecedenceLowest)
	}
}

func (p *Printer) emitFunctionType(node *ast.FunctionTypeNode) {
	state := p.enterNode(node.AsNode())
	indented := p.shouldEmitIndented(node.AsNode())
	p.increaseIndentIf(indented)
	p.pushNameGenerationScope(node.AsNode())
	// !!! in the old emitter, quickinfo uses type arguments in place of type parameters for instantiated signatures
	p.emitTypeParameters(node.AsNode(), node.TypeParameters)
	p.emitParameters(node.AsNode(), node.Parameters)
	p.writeSpace()
	p.emitReturnType(node.Type)
	p.popNameGenerationScope(node.AsNode())
	p.decreaseIndentIf(indented)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitConstructorType(node *ast.ConstructorTypeNode) {
	state := p.enterNode(node.AsNode())
	p.emitModifierList(node.AsNode(), node.Modifiers(), false /*allowDecorators*/)
	p.writeKeyword("new")
	p.writeSpace()
	indented := p.shouldEmitIndented(node.AsNode())
	p.increaseIndentIf(indented)
	p.pushNameGenerationScope(node.AsNode())
	// !!! in the old emitter, quickinfo uses type arguments in place of type parameters for instantiated signatures
	p.emitTypeParameters(node.AsNode(), node.TypeParameters)
	p.emitParameters(node.AsNode(), node.Parameters)
	p.writeSpace()
	p.emitReturnType(node.Type)
	p.popNameGenerationScope(node.AsNode())
	p.decreaseIndentIf(indented)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitTypeQuery(node *ast.TypeQueryNode) {
	state := p.enterNode(node.AsNode())
	p.writeKeyword("typeof")
	p.writeSpace()
	p.emitEntityName(node.ExprName)
	p.emitTypeArguments(node.AsNode(), node.TypeArguments)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitTypeLiteral(node *ast.TypeLiteralNode) {
	state := p.enterNode(node.AsNode())
	p.pushNameGenerationScope(node.AsNode())
	p.generateAllMemberNames(node.Members)
	p.writePunctuation("{")
	flags := core.IfElse(p.shouldEmitOnSingleLine(node.AsNode()), LFSingleLineTypeLiteralMembers, LFMultiLineTypeLiteralMembers)
	p.emitList((*Printer).emitTypeElement, node.AsNode(), node.Members, flags|LFNoSpaceIfEmpty)
	p.writePunctuation("}")
	p.popNameGenerationScope(node.AsNode())
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitArrayType(node *ast.ArrayTypeNode) {
	state := p.enterNode(node.AsNode())
	p.emitTypeNode(node.ElementType, ast.TypePrecedencePostfix)
	p.writePunctuation("[")
	p.writePunctuation("]")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitTupleElementType(node *ast.Node) {
	p.emitTypeNodeOutsideExtends(node)
}

func (p *Printer) emitTupleType(node *ast.TupleTypeNode) {
	state := p.enterNode(node.AsNode())
	p.emitToken(ast.KindOpenBracketToken, node.Pos(), WriteKindPunctuation, node.AsNode())
	flags := core.IfElse(p.shouldEmitOnSingleLine(node.AsNode()), LFSingleLineTupleTypeElements, LFMultiLineTupleTypeElements)
	p.emitList((*Printer).emitTupleElementType, node.AsNode(), node.Elements, flags|LFNoSpaceIfEmpty)
	p.emitToken(ast.KindCloseBracketToken, node.Elements.End(), WriteKindPunctuation, node.AsNode())
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitRestType(node *ast.RestTypeNode) {
	state := p.enterNode(node.AsNode())
	p.writePunctuation("...")
	p.emitTypeNodeOutsideExtends(node.Type)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitOptionalType(node *ast.OptionalTypeNode) {
	state := p.enterNode(node.AsNode())
	// !!! May need extra parenthesization if we also have JSDocNullableType
	p.emitTypeNode(node.Type, ast.TypePrecedencePostfix)
	p.writePunctuation("?")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitNamedTupleMember(node *ast.NamedTupleMember) {
	state := p.enterNode(node.AsNode())
	p.emitPunctuationNode(node.DotDotDotToken)
	p.emitIdentifierName(node.Name().AsIdentifier())
	p.emitPunctuationNode(node.QuestionToken)
	p.emitToken(ast.KindColonToken, greatestEnd(node.Name().End(), node.QuestionToken), WriteKindPunctuation, node.AsNode())
	p.writeSpace()
	p.emitTypeNodeOutsideExtends(node.Type)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitUnionTypeConstituent(node *ast.TypeNode) {
	p.emitTypeNode(node, ast.TypePrecedenceTypeOperator)
}

func (p *Printer) emitUnionType(node *ast.UnionTypeNode) {
	state := p.enterNode(node.AsNode())
	p.emitList((*Printer).emitUnionTypeConstituent, node.AsNode(), node.Types, LFUnionTypeConstituents)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitIntersectionTypeConstituent(node *ast.TypeNode) {
	p.emitTypeNode(node, ast.TypePrecedenceTypeOperator)
}

func (p *Printer) emitIntersectionType(node *ast.IntersectionTypeNode) {
	state := p.enterNode(node.AsNode())
	p.emitList((*Printer).emitIntersectionTypeConstituent, node.AsNode(), node.Types, LFIntersectionTypeConstituents /*, parenthesizer.parenthesizeConstituentTypeOfIntersectionType*/) // !!!
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitConditionalType(node *ast.ConditionalTypeNode) {
	state := p.enterNode(node.AsNode())
	p.emitTypeNode(node.CheckType, ast.TypePrecedenceUnion)
	p.writeSpace()
	p.writeKeyword("extends")
	p.writeSpace()
	p.emitTypeNodeInExtends(node.ExtendsType)
	p.writeSpace()
	p.writePunctuation("?")
	p.writeSpace()
	p.emitTypeNodeOutsideExtends(node.TrueType)
	p.writeSpace()
	p.writePunctuation(":")
	p.writeSpace()
	p.emitTypeNodeOutsideExtends(node.FalseType)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitInferTypeParameter(node *ast.TypeParameterDeclaration) {
	state := p.enterNode(node.AsNode())
	p.emitBindingIdentifier(node.Name().AsIdentifier())
	if node.Constraint != nil {
		p.writeSpace()
		p.writeKeyword("extends")
		p.writeSpace()
		p.emitTypeNodeInExtends(node.Constraint)
	}
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitInferType(node *ast.InferTypeNode) {
	state := p.enterNode(node.AsNode())
	p.writeKeyword("infer")
	p.writeSpace()
	p.emitInferTypeParameter(node.TypeParameter.AsTypeParameter())
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitParenthesizedType(node *ast.ParenthesizedTypeNode) {
	state := p.enterNode(node.AsNode())
	p.writePunctuation("(")
	p.emitTypeNodeOutsideExtends(node.Type)
	p.writePunctuation(")")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitThisType(node *ast.ThisTypeNode) {
	state := p.enterNode(node.AsNode())
	p.writeKeyword("this")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitTypeOperator(node *ast.TypeOperatorNode) {
	state := p.enterNode(node.AsNode())
	p.emitToken(node.Operator, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitTypeNode(node.Type, core.IfElse(node.Operator == ast.KindReadonlyKeyword, ast.TypePrecedencePostfix, ast.TypePrecedenceTypeOperator))
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitIndexedAccessType(node *ast.IndexedAccessTypeNode) {
	state := p.enterNode(node.AsNode())
	p.emitTypeNode(node.ObjectType, ast.TypePrecedencePostfix)
	p.writePunctuation("[")
	p.emitTypeNodeOutsideExtends(node.IndexType)
	p.writePunctuation("]")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitMappedTypeParameter(node *ast.TypeParameterDeclaration) {
	state := p.enterNode(node.AsNode())
	p.emitBindingIdentifier(node.Name().AsIdentifier())
	p.writeSpace()
	p.writeKeyword("in")
	p.writeSpace()
	p.emitTypeNodeOutsideExtends(node.Constraint)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitMappedType(node *ast.MappedTypeNode) {
	state := p.enterNode(node.AsNode())
	singleLine := p.shouldEmitOnSingleLine(node.AsNode())
	p.writePunctuation("{")
	if singleLine {
		p.writeSpace()
	} else {
		p.writeLine()
		p.increaseIndent()
	}
	if node.ReadonlyToken != nil {
		p.emitTokenNode(node.ReadonlyToken)
		if node.ReadonlyToken.Kind != ast.KindReadonlyKeyword {
			p.writeKeyword("readonly")
		}
		p.writeSpace()
	}
	p.writePunctuation("[")
	p.emitMappedTypeParameter(node.TypeParameter.AsTypeParameter())
	if node.NameType != nil {
		p.writeSpace()
		p.writeKeyword("as")
		p.writeSpace()
		p.emitTypeNodeOutsideExtends(node.NameType)
	}
	p.writePunctuation("]")
	if node.QuestionToken != nil {
		p.emitPunctuationNode(node.QuestionToken)
		if node.QuestionToken.Kind != ast.KindQuestionToken {
			p.writePunctuation("?")
		}
	}
	p.writePunctuation(":")
	p.writeSpace()
	p.emitTypeNodeOutsideExtends(node.Type)
	p.writeTrailingSemicolon()
	if node.Members != nil {
		if singleLine {
			p.writeSpace()
		} else {
			p.writeLine()
		}
		p.emitList((*Printer).emitTypeElement, node.AsNode(), node.Members, LFPreserveLines)
	}
	if singleLine {
		p.writeSpace()
	} else {
		p.writeLine()
		p.decreaseIndent()
	}
	p.writePunctuation("}")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitLiteralType(node *ast.LiteralTypeNode) {
	state := p.enterNode(node.AsNode())
	p.emitExpression(node.Literal, ast.OperatorPrecedenceComma)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitTemplateTypeSpan(node *ast.TemplateLiteralTypeSpan) {
	state := p.enterNode(node.AsNode())
	p.emitTypeNodeOutsideExtends(node.Type)
	p.emitTemplateMiddleTail(node.Literal)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitTemplateTypeSpanNode(node *ast.TemplateLiteralTypeSpanNode) {
	p.emitTemplateTypeSpan(node.AsTemplateLiteralTypeSpan())
}

func (p *Printer) emitTemplateType(node *ast.TemplateLiteralTypeNode) {
	state := p.enterNode(node.AsNode())
	p.emitTemplateHead(node.Head.AsTemplateHead())
	p.emitList((*Printer).emitTemplateTypeSpanNode, node.AsNode(), node.TemplateSpans, LFTemplateExpressionSpans)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitImportTypeNodeAttributes(node *ast.ImportAttributes) {
	state := p.enterNode(node.AsNode())
	p.writePunctuation("{")
	p.writeSpace()
	p.writeKeyword(core.IfElse(node.Token == ast.KindAssertKeyword, "assert", "with"))
	p.writePunctuation(":")
	p.writeSpace()
	p.emitList((*Printer).emitImportAttributeNode, node.AsNode(), node.Attributes, LFImportAttributes)
	p.writeSpace()
	p.writePunctuation("}")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitImportTypeNode(node *ast.ImportTypeNode) {
	state := p.enterNode(node.AsNode())
	if node.IsTypeOf {
		p.writeKeyword("typeof")
		p.writeSpace()
	}
	p.writeKeyword("import")
	p.writePunctuation("(")
	p.emitTypeNodeOutsideExtends(node.Argument)
	if node.Attributes != nil {
		p.writePunctuation(",")
		p.writeSpace()
		p.emitImportTypeNodeAttributes(node.Attributes.AsImportAttributes())
	}
	p.writePunctuation(")")
	if node.Qualifier != nil {
		p.writePunctuation(".")
		p.emitEntityName(node.Qualifier)
	}
	p.emitTypeArguments(node.AsNode(), node.TypeArguments)
	p.exitNode(node.AsNode(), state)
}

// emits a Type node in the `extends` clause of a ConditionalType
func (p *Printer) emitTypeNodeInExtends(node *ast.TypeNode) {
	savedInExtends := p.inExtends
	p.inExtends = true
	p.emitTypeNodePreservingExtends(node, ast.TypePrecedenceLowest)
	p.inExtends = savedInExtends
}

// emits a Type node not in the `extends` clause of a ConditionalType or InferType
func (p *Printer) emitTypeNodeOutsideExtends(node *ast.TypeNode) {
	savedInExtends := p.inExtends
	p.inExtends = false
	p.emitTypeNodePreservingExtends(node, ast.TypePrecedenceLowest)
	p.inExtends = savedInExtends
}

// emits a Type node preserving whether or not we are currently in the `extends` clause of a ConditionalType or InferType
func (p *Printer) emitTypeNodePreservingExtends(node *ast.TypeNode, precedence ast.TypePrecedence) {
	p.emitTypeNode(node, precedence)
}

func (p *Printer) emitTypeNode(node *ast.TypeNode, precedence ast.TypePrecedence) {
	if p.inExtends && precedence <= ast.TypePrecedenceConditional {
		// in the `extends` clause of a ConditionalType or InferType, a ConditionalType must be parenthesized
		precedence = ast.TypePrecedenceFunction
	}

	savedInExtends := p.inExtends
	parens := ast.GetTypeNodePrecedence(node) < precedence
	if parens {
		p.inExtends = false
		p.writePunctuation("(")
	}

	switch node.Kind {
	// Keyword Types
	case ast.KindAnyKeyword,
		ast.KindUnknownKeyword,
		ast.KindNumberKeyword,
		ast.KindBigIntKeyword,
		ast.KindObjectKeyword,
		ast.KindBooleanKeyword,
		ast.KindStringKeyword,
		ast.KindSymbolKeyword,
		ast.KindVoidKeyword,
		ast.KindUndefinedKeyword,
		ast.KindNeverKeyword,
		ast.KindIntrinsicKeyword:
		p.emitKeywordTypeNode(node.AsKeywordTypeNode())

	// Types
	case ast.KindTypePredicate:
		p.emitTypePredicate(node.AsTypePredicateNode())
	case ast.KindTypeReference:
		p.emitTypeReference(node.AsTypeReferenceNode())
	case ast.KindFunctionType:
		p.emitFunctionType(node.AsFunctionTypeNode())
	case ast.KindConstructorType:
		p.emitConstructorType(node.AsConstructorTypeNode())
	case ast.KindTypeQuery:
		p.emitTypeQuery(node.AsTypeQueryNode())
	case ast.KindTypeLiteral:
		p.emitTypeLiteral(node.AsTypeLiteralNode())
	case ast.KindArrayType:
		p.emitArrayType(node.AsArrayTypeNode())
	case ast.KindTupleType:
		p.emitTupleType(node.AsTupleTypeNode())
	case ast.KindOptionalType:
		p.emitOptionalType(node.AsOptionalTypeNode())
	case ast.KindRestType:
		p.emitRestType(node.AsRestTypeNode())
	case ast.KindUnionType:
		p.emitUnionType(node.AsUnionTypeNode())
	case ast.KindIntersectionType:
		p.emitIntersectionType(node.AsIntersectionTypeNode())
	case ast.KindConditionalType:
		p.emitConditionalType(node.AsConditionalTypeNode())
	case ast.KindInferType:
		p.emitInferType(node.AsInferTypeNode())
	case ast.KindParenthesizedType:
		p.emitParenthesizedType(node.AsParenthesizedTypeNode())
	case ast.KindThisType:
		p.emitThisType(node.AsThisTypeNode())
	case ast.KindTypeOperator:
		p.emitTypeOperator(node.AsTypeOperatorNode())
	case ast.KindIndexedAccessType:
		p.emitIndexedAccessType(node.AsIndexedAccessTypeNode())
	case ast.KindMappedType:
		p.emitMappedType(node.AsMappedTypeNode())
	case ast.KindLiteralType:
		p.emitLiteralType(node.AsLiteralTypeNode())
	case ast.KindNamedTupleMember:
		p.emitNamedTupleMember(node.AsNamedTupleMember())
	case ast.KindTemplateLiteralType:
		p.emitTemplateType(node.AsTemplateLiteralTypeNode())
	case ast.KindTemplateLiteralTypeSpan:
		p.emitTemplateTypeSpan(node.AsTemplateLiteralTypeSpan())
	case ast.KindImportType:
		p.emitImportTypeNode(node.AsImportTypeNode())

	case ast.KindExpressionWithTypeArguments:
		// !!! Should this actually be considered a type?
		p.emitExpressionWithTypeArguments(node.AsExpressionWithTypeArguments())

	case ast.KindJSDocAllType:
		p.emitJSDocAllType(node)
	case ast.KindJSDocNonNullableType:
		p.emitJSDocNonNullableType(node.AsJSDocNonNullableType())
	case ast.KindJSDocNullableType:
		p.emitJSDocNullableType(node.AsJSDocNullableType())
	case ast.KindJSDocOptionalType:
		p.emitJSDocOptionalType(node.AsJSDocOptionalType())
	case ast.KindJSDocVariadicType:
		p.emitJSDocVariadicType(node.AsJSDocVariadicType())

	default:
		panic(fmt.Sprintf("unhandled TypeNode: %v", node.Kind))
	}

	if parens {
		p.writePunctuation(")")
	}

	p.inExtends = savedInExtends
}

//
// Binding patterns
//

func (p *Printer) emitObjectBindingPattern(node *ast.BindingPattern) {
	state := p.enterNode(node.AsNode())
	p.writePunctuation("{")
	p.emitList((*Printer).emitBindingElementNode, node.AsNode(), node.Elements, LFObjectBindingPatternElements)
	p.writePunctuation("}")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitArrayBindingPattern(node *ast.BindingPattern) {
	state := p.enterNode(node.AsNode())
	p.writePunctuation("[")
	p.emitList((*Printer).emitBindingElementNode, node.AsNode(), node.Elements, LFArrayBindingPatternElements)
	p.writePunctuation("]")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitBindingElement(node *ast.BindingElement) {
	state := p.enterNode(node.AsNode())
	p.emitTokenNode(node.DotDotDotToken)
	if node.PropertyName != nil {
		p.emitPropertyName(node.PropertyName)
		p.writePunctuation(":")
		p.writeSpace()
	}
	// Old parser used `OmittedExpression` as a substitute for `Elision`. New parser uses a `BindingElement` with nil members
	if name := node.Name(); name != nil {
		p.emitBindingName(name)
		p.emitInitializer(node.Initializer, node.Name().End(), node.AsNode())
	}
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitBindingElementNode(node *ast.BindingElementNode) {
	p.emitBindingElement(node.AsBindingElement())
}

func (p *Printer) emitJSDocAllType(node *ast.Node) {
	p.emitKeywordNode(node)
}

func (p *Printer) emitJSDocNonNullableType(node *ast.JSDocNonNullableType) {
	state := p.enterNode(node.AsNode())
	p.writePunctuation("!")
	p.emitTypeNode(node.Type, ast.TypePrecedenceNonArray)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitJSDocNullableType(node *ast.JSDocNullableType) {
	state := p.enterNode(node.AsNode())
	p.writePunctuation("?")
	p.emitTypeNode(node.Type, ast.TypePrecedenceNonArray)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitJSDocOptionalType(node *ast.JSDocOptionalType) {
	state := p.enterNode(node.AsNode())
	p.emitTypeNode(node.Type, ast.TypePrecedenceJSDoc)
	p.writePunctuation("=")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitJSDocVariadicType(node *ast.JSDocVariadicType) {
	state := p.enterNode(node.AsNode())
	p.writePunctuation("...")
	p.emitTypeNode(node.Type, ast.TypePrecedenceJSDoc)
	p.exitNode(node.AsNode(), state)
}

//
// Expressions
//

func (p *Printer) emitKeywordExpression(node *ast.KeywordExpression) {
	p.emitKeywordNode(node.AsNode())
}

func (p *Printer) emitArrayLiteralExpressionElement(node *ast.Expression) {
	p.emitExpression(node, ast.OperatorPrecedenceSpread)
}

func (p *Printer) emitArrayLiteralExpression(node *ast.ArrayLiteralExpression) {
	state := p.enterNode(node.AsNode())
	p.emitList((*Printer).emitArrayLiteralExpressionElement, node.AsNode(), node.Elements, LFArrayLiteralExpressionElements|core.IfElse(node.MultiLine, LFPreferNewLine, LFNone))
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitObjectLiteralExpression(node *ast.ObjectLiteralExpression) {
	state := p.enterNode(node.AsNode())
	indented := p.shouldEmitIndented(node.AsNode())
	p.increaseIndentIf(indented)
	p.pushNameGenerationScope(node.AsNode())
	p.generateAllMemberNames(node.Properties)
	p.emitList((*Printer).emitObjectLiteralElement, node.AsNode(), node.Properties, LFObjectLiteralExpressionProperties|
		core.IfElse(node.MultiLine, LFPreferNewLine, LFNone)|
		core.IfElse(p.shouldAllowTrailingComma(node.AsNode(), node.Properties), LFAllowTrailingComma, LFNone))
	p.popNameGenerationScope(node.AsNode())
	p.decreaseIndentIf(indented)
	p.exitNode(node.AsNode(), state)
}

// 1..toString is a valid property access, emit a dot after the literal
// Also emit a dot if expression is a integer const enum value - it will appear in generated code as numeric literal
func (p *Printer) mayNeedDotDotForPropertyAccess(expression *ast.Expression) bool {
	expression = ast.SkipPartiallyEmittedExpressions(expression)
	if ast.IsNumericLiteral(expression) {
		// check if numeric literal is a decimal literal that was originally written with a dot
		text := p.getLiteralTextOfNode(expression /*sourceFile*/, nil, getLiteralTextFlagsNeverAsciiEscape)
		// If the number will be printed verbatim and it doesn't already contain a dot or an exponent indicator, add one
		// if the expression doesn't have any comments that will be emitted.
		return expression.AsNumericLiteral().TokenFlags&ast.TokenFlagsWithSpecifier == 0 &&
			!strings.Contains(text, scanner.TokenToString(ast.KindDotToken)) &&
			!strings.Contains(text, "E") &&
			!strings.Contains(text, "e")
	}
	return false
}

func (p *Printer) emitPropertyAccessExpression(node *ast.PropertyAccessExpression) {
	state := p.enterNode(node.AsNode())
	p.emitExpression(node.Expression, core.IfElse(ast.IsOptionalChain(node.AsNode()), ast.OperatorPrecedenceOptionalChain, ast.OperatorPrecedenceMember))
	token := node.QuestionDotToken
	if token == nil {
		token = p.emitContext.Factory.NewToken(ast.KindDotToken)
		token.Loc = core.NewTextRange(node.Expression.End(), node.Name().Pos())
		p.emitContext.AddEmitFlags(token, EFNoSourceMap)
	}
	linesBeforeDot := p.getLinesBetweenNodes(node.AsNode(), node.Expression, token)
	p.writeLineRepeat(linesBeforeDot)
	p.increaseIndentIf(linesBeforeDot > 0)
	shouldEmitDotDot := token.Kind != ast.KindQuestionDotToken &&
		p.mayNeedDotDotForPropertyAccess(node.Expression) &&
		!p.writer.HasTrailingComment() &&
		!p.writer.HasTrailingWhitespace()
	if shouldEmitDotDot {
		p.writePunctuation(".")
	}
	p.emitTokenNode(token)
	linesAfterDot := p.getLinesBetweenNodes(node.AsNode(), token, node.Name())
	p.writeLineRepeat(linesAfterDot)
	p.increaseIndentIf(linesAfterDot > 0)
	p.emitMemberName(node.Name())
	p.decreaseIndentIf(linesAfterDot > 0)
	p.decreaseIndentIf(linesBeforeDot > 0)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitElementAccessExpression(node *ast.ElementAccessExpression) {
	state := p.enterNode(node.AsNode())
	p.emitExpression(node.Expression, core.IfElse(ast.IsOptionalChain(node.AsNode()), ast.OperatorPrecedenceOptionalChain, ast.OperatorPrecedenceMember))
	p.emitTokenNode(node.QuestionDotToken)
	p.emitToken(ast.KindOpenBracketToken, greatestEnd(-1, node.Expression, node.QuestionDotToken), WriteKindPunctuation, node.AsNode())
	p.emitExpression(node.ArgumentExpression, ast.OperatorPrecedenceComma)
	p.emitToken(ast.KindCloseBracketToken, node.ArgumentExpression.End(), WriteKindPunctuation, node.AsNode())
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitArgument(node *ast.Expression) {
	p.emitExpression(node, ast.OperatorPrecedenceSpread)
}

func (p *Printer) emitCallee(callee *ast.Expression, parentNode *ast.Node) {
	if p.shouldEmitIndirectCall(parentNode) {
		p.writePunctuation("(")
		p.writeLiteral("0")
		p.writePunctuation(",")
		p.writeSpace()
		p.emitExpression(callee, ast.OperatorPrecedenceComma)
		p.writePunctuation(")")
	} else if parentNode.Kind == ast.KindCallExpression && isNewExpressionWithoutArguments(ast.SkipPartiallyEmittedExpressions(callee)) {
		// Parenthesize `new C` inside of a CallExpression so it is treated as `(new C)()` and not `new C()`
		p.emitExpression(callee, ast.OperatorPrecedenceParentheses)
	} else {
		p.emitExpression(callee, core.IfElse(ast.IsOptionalChain(parentNode), ast.OperatorPrecedenceOptionalChain, ast.OperatorPrecedenceMember))
	}
}

func (p *Printer) emitCallExpression(node *ast.CallExpression) {
	state := p.enterNode(node.AsNode())
	p.emitCallee(node.Expression, node.AsNode())
	p.emitTokenNode(node.QuestionDotToken)
	p.emitTypeArguments(node.AsNode(), node.TypeArguments)
	p.emitList((*Printer).emitArgument, node.AsNode(), node.Arguments, LFCallExpressionArguments)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitNewExpression(node *ast.NewExpression) {
	state := p.enterNode(node.AsNode())
	p.emitToken(ast.KindNewKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	if ast.SkipPartiallyEmittedExpressions(node.Expression).Kind == ast.KindCallExpression {
		// Parenthesize `C()` inside of a NewExpression so it is treated as `new (C())` and not `new C()`
		p.emitExpression(node.Expression, ast.OperatorPrecedenceParentheses)
	} else {
		p.emitExpression(node.Expression, ast.OperatorPrecedenceMember)
	}
	p.emitTypeArguments(node.AsNode(), node.TypeArguments)
	p.emitList((*Printer).emitArgument, node.AsNode(), node.Arguments, LFNewExpressionArguments)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitTemplateLiteral(node *ast.TemplateLiteral) {
	switch node.Kind {
	case ast.KindNoSubstitutionTemplateLiteral:
		p.emitNoSubstitutionTemplateLiteral(node.AsNoSubstitutionTemplateLiteral())
	case ast.KindTemplateExpression:
		p.emitTemplateExpression(node.AsTemplateExpression())
	default:
		panic(fmt.Sprintf("unhandled TemplateLiteral: %v", node.Kind))
	}
}

func (p *Printer) emitTaggedTemplateExpression(node *ast.TaggedTemplateExpression) {
	state := p.enterNode(node.AsNode())
	p.emitCallee(node.Tag, node.AsNode())
	p.emitTypeArguments(node.AsNode(), node.TypeArguments)
	p.writeSpace()
	p.emitTemplateLiteral(node.Template)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitTypeAssertionExpression(node *ast.TypeAssertion) {
	state := p.enterNode(node.AsNode())
	p.writePunctuation("<")
	p.emitTypeNodeOutsideExtends(node.Type)
	p.writePunctuation(">")
	p.emitExpression(node.Expression, ast.OperatorPrecedenceUpdate)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitParenthesizedExpression(node *ast.ParenthesizedExpression) {
	state := p.enterNode(node.AsNode())
	openParenPos := p.emitToken(ast.KindOpenParenToken, node.Pos(), WriteKindPunctuation, node.AsNode())
	indented := p.writeLineSeparatorsAndIndentBefore(node.Expression, node.AsNode())
	p.emitExpression(node.Expression, ast.OperatorPrecedenceComma)
	p.writeLineSeparatorsAfter(node.Expression, node.AsNode())
	p.decreaseIndentIf(indented)
	p.emitToken(ast.KindCloseParenToken, greatestEnd(openParenPos, node.Expression), WriteKindPunctuation, node.AsNode())
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitFunctionExpression(node *ast.FunctionExpression) {
	state := p.enterNode(node.AsNode())
	p.generateNameIfNeeded(node.Name())
	p.emitModifierList(node.AsNode(), node.Modifiers(), false /*allowDecorators*/)
	p.writeKeyword("function")
	p.emitTokenNode(node.AsteriskToken)
	p.writeSpace()
	p.emitIdentifierNameNode(node.Name())
	indented := p.shouldEmitIndented(node.AsNode())
	p.increaseIndentIf(indented)
	p.pushNameGenerationScope(node.AsNode())
	p.emitSignature(node.AsNode())
	p.emitFunctionBodyNode(node.Body)
	p.popNameGenerationScope(node.AsNode())
	p.decreaseIndentIf(indented)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitConciseBody(node *ast.BlockOrExpression) {
	switch {
	case ast.IsBlock(node):
		p.emitFunctionBody(node.AsBlock())
	case ast.IsObjectLiteralExpression(ast.GetLeftmostExpression(node, false /*stopAtCallExpressions*/)):
		p.emitExpression(node, ast.OperatorPrecedenceParentheses)
	case ast.IsExpression(node):
		p.emitExpression(node, ast.OperatorPrecedenceYield)
	default:
		panic(fmt.Sprintf("unexpected ConciseBody: %v", node.Kind))
	}
}

func (p *Printer) emitArrowFunction(node *ast.ArrowFunction) {
	state := p.enterNode(node.AsNode())
	p.emitModifierList(node.AsNode(), node.Modifiers(), false /*allowDecorators*/)
	indented := p.shouldEmitIndented(node.AsNode())
	p.increaseIndentIf(indented)
	p.pushNameGenerationScope(node.AsNode())
	p.emitTypeParameters(node.AsNode(), node.TypeParameters)
	p.emitParametersForArrow(node.AsNode(), node.Parameters)
	p.emitTypeAnnotation(node.Type)
	p.writeSpace()
	p.emitTokenNode(node.EqualsGreaterThanToken)
	p.writeSpace()
	p.emitConciseBody(node.Body)
	p.popNameGenerationScope(node.AsNode())
	p.decreaseIndentIf(indented)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitDeleteExpression(node *ast.DeleteExpression) {
	state := p.enterNode(node.AsNode())
	p.emitToken(ast.KindDeleteKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitExpression(node.Expression, ast.OperatorPrecedenceUnary)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitTypeOfExpression(node *ast.TypeOfExpression) {
	state := p.enterNode(node.AsNode())
	p.emitToken(ast.KindTypeOfKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitExpression(node.Expression, ast.OperatorPrecedenceUnary)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitVoidExpression(node *ast.VoidExpression) {
	state := p.enterNode(node.AsNode())
	p.emitToken(ast.KindVoidKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitExpression(node.Expression, ast.OperatorPrecedenceUnary)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitAwaitExpression(node *ast.AwaitExpression) {
	state := p.enterNode(node.AsNode())
	p.emitToken(ast.KindAwaitKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitExpression(node.Expression, ast.OperatorPrecedenceUnary)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitPrefixUnaryExpression(node *ast.PrefixUnaryExpression) {
	state := p.enterNode(node.AsNode())
	operator := node.Operator
	operand := node.Operand
	p.emitToken(operator, node.Pos(), WriteKindOperator, node.AsNode())

	// In some cases, we need to emit a space between the operator and the operand. One obvious case
	// is when the operator is an identifier, like delete or typeof. We also need to do this for plus
	// and minus expressions in certain cases. Specifically, consider the following two cases (parens
	// are just for clarity of exposition, and not part of the source code):
	//
	//  (+(+1))
	//  (+(++1))
	//
	// We need to emit a space in both cases. In the first case, the absence of a space will make
	// the resulting expression a prefix increment operation. And in the second, it will make the resulting
	// expression a prefix increment whose operand is a plus expression - (++(+x))
	// The same is true of minus of course.
	if operand.Kind == ast.KindPrefixUnaryExpression {
		inner := operand.AsPrefixUnaryExpression().Operator
		if (operator == ast.KindPlusToken && (inner == ast.KindPlusToken || inner == ast.KindPlusPlusToken)) ||
			(operator == ast.KindMinusToken && (inner == ast.KindMinusToken || inner == ast.KindMinusMinusToken)) {
			p.writeSpace()
		}
	}

	p.emitExpression(node.Operand, ast.OperatorPrecedenceUnary)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitPostfixUnaryExpression(node *ast.PostfixUnaryExpression) {
	state := p.enterNode(node.AsNode())
	p.emitExpression(node.Operand, ast.OperatorPrecedenceLeftHandSide)
	p.emitToken(node.Operator, node.Operand.End(), WriteKindOperator, node.AsNode())
	p.exitNode(node.AsNode(), state)
}

// This function determines whether an expression consists of a homogeneous set of
// literal expressions or binary plus expressions that all share the same literal kind.
// It is used to determine whether the right-hand operand of a binary plus expression can be
// emitted without parentheses.
func (p *Printer) getLiteralKindOfBinaryPlusOperand(node *ast.Expression) ast.Kind {
	node = ast.SkipPartiallyEmittedExpressions(node)

	if ast.IsLiteralKind(node.Kind) {
		return node.Kind
	}

	if node.Kind == ast.KindBinaryExpression {
		if n := node.AsBinaryExpression(); n.OperatorToken.Kind == ast.KindPlusToken {
			// !!! Determine if caching this is worthwhile over recomputing
			////if n.cachedLiteralKind != KindUnknown {
			////	return n.cachedLiteralKind;
			////}

			leftKind := p.getLiteralKindOfBinaryPlusOperand(n.Left)
			literalKind := ast.KindUnknown
			if ast.IsLiteralKind(leftKind) && leftKind == p.getLiteralKindOfBinaryPlusOperand(n.Right) {
				literalKind = leftKind
			}

			////n.cachedLiteralKind = literalKind;
			return literalKind
		}
	}

	return ast.KindUnknown
}

func (p *Printer) getBinaryExpressionPrecedence(node *ast.BinaryExpression) (leftPrec ast.OperatorPrecedence, rightPrec ast.OperatorPrecedence) {
	precedence := ast.GetExpressionPrecedence(node.AsNode())
	leftPrec = precedence
	rightPrec = precedence
	switch precedence {
	case ast.OperatorPrecedenceComma:
		// No need to parenthesize the right operand when the binary operator and
		// operand are both ,:
		//  x,(a,b)     => x,a,b
		break
	case ast.OperatorPrecedenceAssignment:
		// assignment is right-associative
		leftPrec = ast.OperatorPrecedenceLeftHandSide
	case ast.OperatorPrecedenceLogicalOR:
		rightPrec = ast.OperatorPrecedenceLogicalAND
	case ast.OperatorPrecedenceLogicalAND:
		rightPrec = ast.OperatorPrecedenceBitwiseOR
	case ast.OperatorPrecedenceBitwiseOR:
		// No need to parenthesize the right operand when the binary operator and
		// operand are both | due to the associative property of mathematics:
		//  x|(a|b)     => x|a|b
		break
	case ast.OperatorPrecedenceBitwiseXOR:
		// No need to parenthesize the right operand when the binary operator and
		// operand are both ^ due to the associative property of mathematics:
		//  x^(a^b)     => x^a^b
		break
	case ast.OperatorPrecedenceBitwiseAND:
		// No need to parenthesize the right operand when the binary operator and
		// operand are both & due to the associative property of mathematics:
		//  x&(a&b)     => x&a&b
		break
	case ast.OperatorPrecedenceEquality:
		rightPrec = ast.OperatorPrecedenceRelational
	case ast.OperatorPrecedenceRelational:
		rightPrec = ast.OperatorPrecedenceShift
	case ast.OperatorPrecedenceShift:
		rightPrec = ast.OperatorPrecedenceAdditive
	case ast.OperatorPrecedenceAdditive:
		if node.OperatorToken.Kind == ast.KindPlusToken && isBinaryOperation(node.Right, ast.KindPlusToken) {
			leftKind := p.getLiteralKindOfBinaryPlusOperand(node.Left)
			if ast.IsLiteralKind(leftKind) && leftKind == p.getLiteralKindOfBinaryPlusOperand(node.Right) {
				// No need to parenthesize the right operand when the binary operator
				// is plus (+) if both the left and right operands consist solely of either
				// literals of the same kind or binary plus (+) expressions for literals of
				// the same kind (recursively).
				//  "a"+(1+2)       => "a"+(1+2)
				//  "a"+("b"+"c")   => "a"+"b"+"c"
				break
			}
		}
		rightPrec = ast.OperatorPrecedenceMultiplicative
	case ast.OperatorPrecedenceMultiplicative:
		if node.OperatorToken.Kind == ast.KindAsteriskToken && isBinaryOperation(node.Right, ast.KindAsteriskToken) {
			// No need to parenthesize the right operand when the binary operator and
			// operand are both * due to the associative property of mathematics:
			//  x*(a*b)     => x*a*b
			break
		}
		rightPrec = ast.OperatorPrecedenceExponentiation
	case ast.OperatorPrecedenceExponentiation:
		// exponentiation is right-associative
		leftPrec = ast.OperatorPrecedenceUpdate
	default:
		panic(fmt.Sprintf("unhandled precedence: %v", precedence))
	}
	return leftPrec, rightPrec
}

func (p *Printer) emitBinaryExpression(node *ast.BinaryExpression) {
	leftPrec, rightPrec := p.getBinaryExpressionPrecedence(node)
	if emittedLeft := ast.SkipPartiallyEmittedExpressions(node.Left); ast.NodeIsSynthesized(emittedLeft) && emittedLeft.Kind == ast.KindBinaryExpression && mixingBinaryOperatorsRequiresParentheses(node.OperatorToken.Kind, emittedLeft.AsBinaryExpression().OperatorToken.Kind) {
		leftPrec = ast.OperatorPrecedenceHighest
	}
	if emittedRight := ast.SkipPartiallyEmittedExpressions(node.Right); ast.NodeIsSynthesized(emittedRight) && emittedRight.Kind == ast.KindBinaryExpression && mixingBinaryOperatorsRequiresParentheses(node.OperatorToken.Kind, emittedRight.AsBinaryExpression().OperatorToken.Kind) {
		rightPrec = ast.OperatorPrecedenceHighest
	}
	state := p.enterNode(node.AsNode())
	p.emitExpression(node.Left, leftPrec)
	linesBeforeOperator := p.getLinesBetweenNodes(node.AsNode(), node.Left, node.OperatorToken)
	linesAfterOperator := p.getLinesBetweenNodes(node.AsNode(), node.OperatorToken, node.Right)
	p.writeLinesAndIndent(linesBeforeOperator, node.OperatorToken.Kind != ast.KindCommaToken /*writeSpaceIfNotIndenting*/)
	p.emitTokenNodeEx(node.OperatorToken, tefNoSourceMaps)
	p.writeLinesAndIndent(linesAfterOperator, true /*writeSpaceIfNotIndenting*/) // Binary operators should have a space before the comment starts
	p.emitExpression(node.Right, rightPrec)
	p.decreaseIndentIf(linesAfterOperator > 0)
	p.decreaseIndentIf(linesBeforeOperator > 0)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitShortCircuitExpression(node *ast.Expression) {
	if isBinaryOperation(ast.SkipPartiallyEmittedExpressions(node), ast.KindQuestionQuestionToken) {
		p.emitExpression(node, ast.OperatorPrecedenceCoalesce)
	} else {
		p.emitExpression(node, ast.OperatorPrecedenceLogicalOR)
	}
}

func (p *Printer) emitConditionalExpression(node *ast.ConditionalExpression) {
	state := p.enterNode(node.AsNode())
	linesBeforeQuestion := p.getLinesBetweenNodes(node.AsNode(), node.Condition, node.QuestionToken)
	linesAfterQuestion := p.getLinesBetweenNodes(node.AsNode(), node.QuestionToken, node.WhenTrue)
	linesBeforeColon := p.getLinesBetweenNodes(node.AsNode(), node.WhenTrue, node.ColonToken)
	linesAfterColon := p.getLinesBetweenNodes(node.AsNode(), node.ColonToken, node.WhenFalse)
	p.emitShortCircuitExpression(node.Condition)
	p.writeLinesAndIndent(linesBeforeQuestion /*writeSpaceIfNotIndenting*/, true)
	p.emitPunctuationNode(node.QuestionToken)
	p.writeLinesAndIndent(linesAfterQuestion /*writeSpaceIfNotIndenting*/, true)
	p.emitExpression(node.WhenTrue, ast.OperatorPrecedenceYield)
	p.decreaseIndentIf(linesAfterQuestion > 0)
	p.decreaseIndentIf(linesBeforeQuestion > 0)
	p.writeLinesAndIndent(linesBeforeColon /*writeSpaceIfNotIndenting*/, true)
	p.emitPunctuationNode(node.ColonToken)
	p.writeLinesAndIndent(linesAfterColon /*writeSpaceIfNotIndenting*/, true)
	p.emitExpression(node.WhenFalse, ast.OperatorPrecedenceYield)
	p.decreaseIndentIf(linesAfterColon > 0)
	p.decreaseIndentIf(linesBeforeColon > 0)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitTemplateExpression(node *ast.TemplateExpression) {
	state := p.enterNode(node.AsNode())
	p.emitTemplateHead(node.Head.AsTemplateHead())
	p.emitList((*Printer).emitTemplateSpanNode, node.AsNode(), node.TemplateSpans, LFTemplateExpressionSpans)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitYieldExpression(node *ast.YieldExpression) {
	state := p.enterNode(node.AsNode())
	p.emitToken(ast.KindYieldKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.emitPunctuationNode(node.AsteriskToken)
	if node.Expression != nil {
		p.writeSpace()
		p.emitExpressionNoASI(node.Expression, ast.OperatorPrecedenceDisallowComma)
	}
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitSpreadElement(node *ast.SpreadElement) {
	state := p.enterNode(node.AsNode())
	p.emitToken(ast.KindDotDotDotToken, node.Pos(), WriteKindPunctuation, node.AsNode())
	p.emitExpression(node.Expression, ast.OperatorPrecedenceDisallowComma)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitClassExpression(node *ast.ClassExpression) {
	state := p.enterNode(node.AsNode())
	p.generateNameIfNeeded(node.Name())

	p.emitModifierList(node.AsNode(), node.Modifiers(), true /*allowDecorators*/)
	p.emitToken(ast.KindClassKeyword, greatestEnd(node.Pos(), node.Modifiers()), WriteKindKeyword, node.AsNode())

	if node.Name() != nil {
		p.writeSpace()
		p.emitIdentifierName(node.Name().AsIdentifier())
	}

	indented := p.shouldEmitIndented(node.AsNode())
	p.increaseIndentIf(indented)

	p.emitTypeParameters(node.AsNode(), node.TypeParameters)
	p.emitList((*Printer).emitHeritageClauseNode, node.AsNode(), node.HeritageClauses, LFClassHeritageClauses)
	p.writeSpace()
	p.writePunctuation("{")
	p.pushNameGenerationScope(node.AsNode())
	p.generateAllMemberNames(node.Members)
	p.emitList((*Printer).emitClassElement, node.AsNode(), node.Members, LFClassMembers)
	p.popNameGenerationScope(node.AsNode())
	p.writePunctuation("}")

	p.decreaseIndentIf(indented)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitOmittedExpression(node *ast.Node) {
	p.exitNode(node, p.enterNode(node))
}

func (p *Printer) emitExpressionWithTypeArguments(node *ast.ExpressionWithTypeArguments) {
	state := p.enterNode(node.AsNode())
	p.emitExpression(node.Expression, ast.OperatorPrecedenceMember)
	p.emitTypeArguments(node.AsNode(), node.TypeArguments)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitExpressionWithTypeArgumentsNode(node *ast.ExpressionWithTypeArgumentsNode) {
	p.emitExpressionWithTypeArguments(node.AsExpressionWithTypeArguments())
}

func (p *Printer) emitAsExpression(node *ast.AsExpression) {
	state := p.enterNode(node.AsNode())
	p.emitExpression(node.Expression, ast.OperatorPrecedenceRelational)
	p.writeSpace()
	p.writeKeyword("as")
	p.writeSpace()
	p.emitTypeNodeOutsideExtends(node.Type)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitSatisfiesExpression(node *ast.SatisfiesExpression) {
	state := p.enterNode(node.AsNode())
	p.emitExpression(node.Expression, ast.OperatorPrecedenceRelational)
	p.writeSpace()
	p.writeKeyword("satisfies")
	p.writeSpace()
	p.emitTypeNodeOutsideExtends(node.Type)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitNonNullExpression(node *ast.NonNullExpression) {
	state := p.enterNode(node.AsNode())
	p.emitExpression(node.Expression, ast.OperatorPrecedenceMember)
	p.writeOperator("!")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitMetaProperty(node *ast.MetaProperty) {
	state := p.enterNode(node.AsNode())
	p.emitToken(node.KeywordToken, node.Pos(), WriteKindPunctuation, node.AsNode())
	p.writePunctuation(".")
	p.emitIdentifierName(node.Name().AsIdentifier())
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitPartiallyEmittedExpression(node *ast.PartiallyEmittedExpression) {
	// avoid reprinting parens for nested partially emitted expressions
	type entry struct {
		node  *ast.PartiallyEmittedExpression
		state printerState
	}
	var stack core.Stack[entry]
	for {
		state := p.enterNode(node.AsNode())
		stack.Push(entry{node, state})
		if !ast.IsPartiallyEmittedExpression(node.Expression) {
			break
		}
		node = node.Expression.AsPartiallyEmittedExpression()
	}

	p.emitExpression(node.Expression, ast.OperatorPrecedenceLowest)

	// unwind stack
	for stack.Len() > 0 {
		entry := stack.Pop()
		p.exitNode(node.AsNode(), entry.state)
		node = entry.node
	}
}

func (p *Printer) commentWillEmitNewLine(comment ast.CommentRange) bool {
	return comment.Kind == ast.KindSingleLineCommentTrivia || comment.HasTrailingNewLine
}

func (p *Printer) syntheticCommentWillEmitNewLine(comment SynthesizedComment) bool {
	return comment.Kind == ast.KindSingleLineCommentTrivia || comment.HasTrailingNewLine
}

func (p *Printer) willEmitLeadingNewLine(node *ast.Expression) bool {
	if p.currentSourceFile == nil {
		return false
	}
	hasLeadingCommentRanges := false
	hasNewLineComment := false
	for comment := range scanner.GetLeadingCommentRanges(p.emitContext.Factory.AsNodeFactory(), p.currentSourceFile.Text(), node.Pos()) {
		hasLeadingCommentRanges = true
		if p.commentWillEmitNewLine(comment) {
			hasNewLineComment = true
		}
	}
	if hasLeadingCommentRanges {
		parseNode := p.emitContext.ParseNode(node)
		if parseNode != nil && ast.IsParenthesizedExpression(parseNode.Parent) {
			return true
		}
	}
	if hasNewLineComment {
		return true
	}
	if slices.ContainsFunc(p.emitContext.GetSyntheticLeadingComments(node), p.syntheticCommentWillEmitNewLine) {
		return true
	}
	if ast.IsPartiallyEmittedExpression(node) {
		pee := node.AsPartiallyEmittedExpression()
		if node.Pos() != pee.Expression.Pos() {
			for comment := range scanner.GetTrailingCommentRanges(p.emitContext.Factory.AsNodeFactory(), p.currentSourceFile.Text(), pee.Expression.Pos()) {
				if p.commentWillEmitNewLine(comment) {
					return true
				}
			}
		}
		return p.willEmitLeadingNewLine(pee.Expression)
	}
	return false
}

// parenthesizeExpressionForNoAsi wraps an expression in parens if we would emit a leading comment
// that would introduce a line separator between the node and its parent.
func (p *Printer) parenthesizeExpressionForNoAsi(node *ast.Expression) *ast.Expression {
	if !p.commentsDisabled {
		switch node.Kind {
		case ast.KindPartiallyEmittedExpression:
			if p.willEmitLeadingNewLine(node) {
				pee := node.AsPartiallyEmittedExpression()
				parseNode := p.emitContext.ParseNode(node)
				if parseNode != nil && ast.IsParenthesizedExpression(parseNode) {
					// If the original node was a parenthesized expression, restore it to preserve comment and source map emit
					parens := p.emitContext.Factory.NewParenthesizedExpression(pee.Expression)
					p.emitContext.SetOriginal(parens, node)
					parens.Loc = parseNode.Loc
					return parens
				}
				return p.emitContext.Factory.NewParenthesizedExpression(node)
			}
			pee := node.AsPartiallyEmittedExpression()
			return p.emitContext.Factory.UpdatePartiallyEmittedExpression(
				pee,
				p.parenthesizeExpressionForNoAsi(pee.Expression),
			)
		case ast.KindPropertyAccessExpression:
			pae := node.AsPropertyAccessExpression()
			return p.emitContext.Factory.UpdatePropertyAccessExpression(
				pae,
				p.parenthesizeExpressionForNoAsi(pae.Expression),
				pae.QuestionDotToken,
				pae.Name(),
			)
		case ast.KindElementAccessExpression:
			eae := node.AsElementAccessExpression()
			return p.emitContext.Factory.UpdateElementAccessExpression(
				eae,
				p.parenthesizeExpressionForNoAsi(eae.Expression),
				eae.QuestionDotToken,
				eae.ArgumentExpression,
			)
		case ast.KindCallExpression:
			ce := node.AsCallExpression()
			return p.emitContext.Factory.UpdateCallExpression(
				ce,
				p.parenthesizeExpressionForNoAsi(ce.Expression),
				ce.QuestionDotToken,
				ce.TypeArguments,
				ce.Arguments,
			)
		case ast.KindTaggedTemplateExpression:
			tte := node.AsTaggedTemplateExpression()
			return p.emitContext.Factory.UpdateTaggedTemplateExpression(
				tte,
				p.parenthesizeExpressionForNoAsi(tte.Tag),
				tte.QuestionDotToken,
				tte.TypeArguments,
				tte.Template,
			)
		case ast.KindPostfixUnaryExpression:
			pue := node.AsPostfixUnaryExpression()
			return p.emitContext.Factory.UpdatePostfixUnaryExpression(
				pue,
				p.parenthesizeExpressionForNoAsi(pue.Operand),
			)
		case ast.KindBinaryExpression:
			be := node.AsBinaryExpression()
			return p.emitContext.Factory.UpdateBinaryExpression(
				be,
				be.Modifiers(),
				p.parenthesizeExpressionForNoAsi(be.Left),
				be.Type,
				be.OperatorToken,
				be.Right,
			)
		case ast.KindConditionalExpression:
			ce := node.AsConditionalExpression()
			return p.emitContext.Factory.UpdateConditionalExpression(
				ce,
				p.parenthesizeExpressionForNoAsi(ce.Condition),
				ce.QuestionToken,
				ce.WhenTrue,
				ce.ColonToken,
				ce.WhenFalse,
			)
		case ast.KindAsExpression:
			ae := node.AsAsExpression()
			return p.emitContext.Factory.UpdateAsExpression(
				ae,
				p.parenthesizeExpressionForNoAsi(ae.Expression),
				ae.Type,
			)
		case ast.KindSatisfiesExpression:
			se := node.AsSatisfiesExpression()
			return p.emitContext.Factory.UpdateSatisfiesExpression(
				se,
				p.parenthesizeExpressionForNoAsi(se.Expression),
				se.Type,
			)
		case ast.KindNonNullExpression:
			nne := node.AsNonNullExpression()
			return p.emitContext.Factory.UpdateNonNullExpression(
				nne,
				p.parenthesizeExpressionForNoAsi(nne.Expression),
			)
		}
	}
	return node
}

func (p *Printer) emitExpressionNoASI(node *ast.Expression, precedence ast.OperatorPrecedence) {
	node = p.parenthesizeExpressionForNoAsi(node)
	p.emitExpression(node, precedence)
}

func (p *Printer) emitExpression(node *ast.Expression, precedence ast.OperatorPrecedence) {
	parens := ast.GetExpressionPrecedence(ast.SkipPartiallyEmittedExpressions(node)) < precedence
	if parens {
		p.writePunctuation("(")
	}

	switch node.Kind {
	// Keywords
	case ast.KindTrueKeyword, ast.KindFalseKeyword, ast.KindNullKeyword:
		p.emitTokenNode(node)
	case ast.KindThisKeyword, ast.KindSuperKeyword, ast.KindImportKeyword:
		p.emitKeywordExpression(node.AsKeywordExpression())

	// Literals
	case ast.KindNumericLiteral:
		p.emitNumericLiteral(node.AsNumericLiteral())
	case ast.KindBigIntLiteral:
		p.emitBigIntLiteral(node.AsBigIntLiteral())
	case ast.KindStringLiteral:
		p.emitStringLiteral(node.AsStringLiteral())
	case ast.KindRegularExpressionLiteral:
		p.emitRegularExpressionLiteral(node.AsRegularExpressionLiteral())
	case ast.KindNoSubstitutionTemplateLiteral:
		p.emitNoSubstitutionTemplateLiteral(node.AsNoSubstitutionTemplateLiteral())

	// Identifiers
	case ast.KindIdentifier:
		p.emitIdentifierReference(node.AsIdentifier())
	case ast.KindPrivateIdentifier:
		p.emitPrivateIdentifier(node.AsPrivateIdentifier())

	// Expressions
	case ast.KindArrayLiteralExpression:
		p.emitArrayLiteralExpression(node.AsArrayLiteralExpression())
	case ast.KindObjectLiteralExpression:
		p.emitObjectLiteralExpression(node.AsObjectLiteralExpression())
	case ast.KindPropertyAccessExpression:
		p.emitPropertyAccessExpression(node.AsPropertyAccessExpression())
	case ast.KindElementAccessExpression:
		p.emitElementAccessExpression(node.AsElementAccessExpression())
	case ast.KindCallExpression:
		p.emitCallExpression(node.AsCallExpression())
	case ast.KindNewExpression:
		p.emitNewExpression(node.AsNewExpression())
	case ast.KindTaggedTemplateExpression:
		p.emitTaggedTemplateExpression(node.AsTaggedTemplateExpression())
	case ast.KindTypeAssertionExpression:
		p.emitTypeAssertionExpression(node.AsTypeAssertion())
	case ast.KindParenthesizedExpression:
		p.emitParenthesizedExpression(node.AsParenthesizedExpression())
	case ast.KindFunctionExpression:
		p.emitFunctionExpression(node.AsFunctionExpression())
	case ast.KindArrowFunction:
		p.emitArrowFunction(node.AsArrowFunction())
	case ast.KindDeleteExpression:
		p.emitDeleteExpression(node.AsDeleteExpression())
	case ast.KindTypeOfExpression:
		p.emitTypeOfExpression(node.AsTypeOfExpression())
	case ast.KindVoidExpression:
		p.emitVoidExpression(node.AsVoidExpression())
	case ast.KindAwaitExpression:
		p.emitAwaitExpression(node.AsAwaitExpression())
	case ast.KindPrefixUnaryExpression:
		p.emitPrefixUnaryExpression(node.AsPrefixUnaryExpression())
	case ast.KindPostfixUnaryExpression:
		p.emitPostfixUnaryExpression(node.AsPostfixUnaryExpression())
	case ast.KindBinaryExpression:
		p.emitBinaryExpression(node.AsBinaryExpression())
	case ast.KindConditionalExpression:
		p.emitConditionalExpression(node.AsConditionalExpression())
	case ast.KindTemplateExpression:
		p.emitTemplateExpression(node.AsTemplateExpression())
	case ast.KindYieldExpression:
		p.emitYieldExpression(node.AsYieldExpression())
	case ast.KindSpreadElement:
		p.emitSpreadElement(node.AsSpreadElement())
	case ast.KindClassExpression:
		p.emitClassExpression(node.AsClassExpression())
	case ast.KindOmittedExpression:
		p.emitOmittedExpression(node)
	case ast.KindAsExpression:
		p.emitAsExpression(node.AsAsExpression())
	case ast.KindNonNullExpression:
		p.emitNonNullExpression(node.AsNonNullExpression())
	case ast.KindExpressionWithTypeArguments:
		p.emitExpressionWithTypeArguments(node.AsExpressionWithTypeArguments())
	case ast.KindSatisfiesExpression:
		p.emitSatisfiesExpression(node.AsSatisfiesExpression())
	case ast.KindMetaProperty:
		p.emitMetaProperty(node.AsMetaProperty())
	case ast.KindSyntheticExpression:
		panic("SyntheticExpression should never be printed.")
	case ast.KindMissingDeclaration:
		break

	// JSX
	case ast.KindJsxElement:
		p.emitJsxElement(node.AsJsxElement())
	case ast.KindJsxSelfClosingElement:
		p.emitJsxSelfClosingElement(node.AsJsxSelfClosingElement())
	case ast.KindJsxFragment:
		p.emitJsxFragment(node.AsJsxFragment())

	// Synthesized list
	case ast.KindSyntaxList:
		panic("SyntaxList should not be printed")

	// Transformation nodes
	case ast.KindNotEmittedStatement:
		return
	case ast.KindPartiallyEmittedExpression:
		p.emitPartiallyEmittedExpression(node.AsPartiallyEmittedExpression())
	case ast.KindSyntheticReferenceExpression:
		panic("SyntheticReferenceExpression should not be printed")

	// !!!
	////case ast.KindCommaListExpression:
	////	p.emitCommaList(node.AsCommaListExpression())

	default:
		panic(fmt.Sprintf("unexpected Expression: %v", node.Kind))
	}

	if parens {
		p.writePunctuation(")")
	}
}

//
// Misc
//

func (p *Printer) emitTemplateSpan(node *ast.TemplateSpan) {
	state := p.enterNode(node.AsNode())
	p.emitExpression(node.Expression, ast.OperatorPrecedenceComma)
	p.emitTemplateMiddleTail(node.Literal)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitTemplateSpanNode(node *ast.TemplateSpanNode) {
	p.emitTemplateSpan(node.AsTemplateSpan())
}

func (p *Printer) emitSemicolonClassElement(node *ast.SemicolonClassElement) {
	state := p.enterNode(node.AsNode())
	p.writeTrailingSemicolon()
	p.exitNode(node.AsNode(), state)
}

//
// Statements
//

func (p *Printer) isEmptyBlock(block *ast.Node, statements *ast.StatementList) bool {
	return len(statements.Nodes) == 0 &&
		(p.currentSourceFile == nil || rangeEndIsOnSameLineAsRangeStart(block.Loc, block.Loc, p.currentSourceFile))
}

func (p *Printer) emitBlock(node *ast.Block) {
	state := p.enterNode(node.AsNode())
	p.generateNames(node.AsNode())
	p.emitToken(ast.KindOpenBraceToken, node.Pos(), WriteKindPunctuation, node.AsNode())

	format := core.IfElse(!node.Multiline && p.isEmptyBlock(node.AsNode(), node.Statements) || p.shouldEmitOnSingleLine(node.AsNode()),
		LFSingleLineBlockStatements,
		LFMultiLineBlockStatements)
	p.emitList((*Printer).emitStatement, node.AsNode(), node.Statements, format)

	p.emitTokenEx(ast.KindCloseBraceToken, node.Statements.End(), WriteKindPunctuation, node.AsNode(), core.IfElse(format&LFMultiLine != 0, tefIndentLeadingComments, tefNone))
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitVariableStatement(node *ast.VariableStatement) {
	state := p.enterNode(node.AsNode())
	p.emitModifierList(node.AsNode(), node.Modifiers(), false /*allowDecorators*/)
	p.emitVariableDeclarationList(node.DeclarationList.AsVariableDeclarationList())
	p.writeTrailingSemicolon()
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitEmptyStatement(node *ast.EmptyStatement, isEmbeddedStatement bool) {
	state := p.enterNode(node.AsNode())

	// While most trailing semicolons are possibly insignificant, an embedded "empty"
	// statement is significant and cannot be elided by a trailing-semicolon-omitting writer.
	if isEmbeddedStatement {
		p.writePunctuation(";")
	} else {
		p.writeTrailingSemicolon()
	}
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitExpressionStatement(node *ast.ExpressionStatement) {
	state := p.enterNode(node.AsNode())

	if p.currentSourceFile != nil && p.currentSourceFile.ScriptKind == core.ScriptKindJSON {
		// !!! In strada, this was handled by an undefined parenthesizerRule, so this is a hack.
		p.emitExpression(node.Expression, ast.OperatorPrecedenceComma)
	} else if isImmediatelyInvokedFunctionExpressionOrArrowFunction(node.Expression) {
		// !!! introduce parentheses around callee
		p.emitExpression(node.Expression, ast.OperatorPrecedenceParentheses)
	} else {
		switch ast.GetLeftmostExpression(node.Expression, false /*stopAtCallExpression*/).Kind {
		case ast.KindFunctionExpression, ast.KindClassExpression, ast.KindObjectLiteralExpression:
			p.emitExpression(node.Expression, ast.OperatorPrecedenceParentheses)
		default:
			p.emitExpression(node.Expression, ast.OperatorPrecedenceComma)
		}
	}

	// Emit semicolon in non json files
	// or if json file that created synthesized expression(eg.define expression statement when --out and amd code generation)
	if p.currentSourceFile == nil ||
		p.currentSourceFile.ScriptKind != core.ScriptKindJSON ||
		ast.NodeIsSynthesized(node.Expression) {
		p.writeTrailingSemicolon()
	}

	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitIfStatement(node *ast.IfStatement) {
	state := p.enterNode(node.AsNode())
	pos := p.emitToken(ast.KindIfKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitToken(ast.KindOpenParenToken, pos, WriteKindPunctuation, node.AsNode())
	p.emitExpression(node.Expression, ast.OperatorPrecedenceLowest)
	p.emitToken(ast.KindCloseParenToken, node.Expression.End(), WriteKindPunctuation, node.AsNode())
	p.emitEmbeddedStatement(node.AsNode(), node.ThenStatement)
	if node.ElseStatement != nil {
		p.writeLineOrSpace(node.AsNode(), node.ThenStatement, node.ElseStatement)
		p.emitToken(ast.KindElseKeyword, node.ThenStatement.End(), WriteKindKeyword, node.AsNode())
		if node.ElseStatement.Kind == ast.KindIfStatement {
			p.writeSpace()
			p.emitIfStatement(node.ElseStatement.AsIfStatement())
		} else {
			p.emitEmbeddedStatement(node.AsNode(), node.ElseStatement)
		}
	}
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitWhileClause(node *ast.Node, expression *ast.Expression, startPos int) {
	pos := p.emitToken(ast.KindWhileKeyword, startPos, WriteKindKeyword, node)
	p.writeSpace()
	p.emitToken(ast.KindOpenParenToken, pos, WriteKindPunctuation, node)
	p.emitExpression(expression, ast.OperatorPrecedenceLowest)
	p.emitToken(ast.KindCloseParenToken, expression.End(), WriteKindPunctuation, node)
}

func (p *Printer) emitDoStatement(node *ast.DoStatement) {
	state := p.enterNode(node.AsNode())
	p.emitToken(ast.KindDoKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.emitEmbeddedStatement(node.AsNode(), node.Statement)
	if ast.IsBlock(node.Statement) && !p.Options.PreserveSourceNewlines {
		p.writeSpace()
	} else {
		p.writeLineOrSpace(node.AsNode(), node.Statement, node.Expression)
	}

	p.emitWhileClause(node.AsNode(), node.Expression, node.Statement.End())
	p.writeTrailingSemicolon()
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitWhileStatement(node *ast.WhileStatement) {
	state := p.enterNode(node.AsNode())
	p.emitWhileClause(node.AsNode(), node.Expression, node.Pos())
	p.emitEmbeddedStatement(node.AsNode(), node.Statement)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitForInitializer(node *ast.ForInitializer) {
	if node.Kind == ast.KindVariableDeclarationList {
		p.emitVariableDeclarationList(node.AsVariableDeclarationList())
	} else {
		p.emitExpression(node, ast.OperatorPrecedenceLowest)
	}
}

func (p *Printer) emitForStatement(node *ast.ForStatement) {
	state := p.enterNode(node.AsNode())
	pos := p.emitToken(ast.KindForKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	pos = p.emitToken(ast.KindOpenParenToken, pos, WriteKindPunctuation, node.AsNode())
	if node.Initializer != nil {
		p.emitForInitializer(node.Initializer)
		pos = node.Initializer.End()
	}
	pos = p.emitToken(ast.KindSemicolonToken, pos, WriteKindPunctuation, node.AsNode())
	if node.Condition != nil {
		p.writeSpace()
		p.emitExpression(node.Condition, ast.OperatorPrecedenceLowest)
		pos = node.Condition.End()
	}
	pos = p.emitToken(ast.KindSemicolonToken, pos, WriteKindPunctuation, node.AsNode())
	if node.Incrementor != nil {
		p.writeSpace()
		p.emitExpression(node.Incrementor, ast.OperatorPrecedenceLowest)
		pos = node.Incrementor.End()
	}
	p.emitToken(ast.KindCloseParenToken, pos, WriteKindPunctuation, node.AsNode())
	p.emitEmbeddedStatement(node.AsNode(), node.Statement)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitForInStatement(node *ast.ForInOrOfStatement) {
	state := p.enterNode(node.AsNode())
	pos := p.emitToken(ast.KindForKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitToken(ast.KindOpenParenToken, pos, WriteKindPunctuation, node.AsNode())
	p.emitForInitializer(node.Initializer)
	p.writeSpace()
	p.emitToken(ast.KindInKeyword, node.Initializer.End(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitExpression(node.Expression, ast.OperatorPrecedenceLowest)
	p.emitToken(ast.KindCloseParenToken, node.Expression.End(), WriteKindPunctuation, node.AsNode())
	p.emitEmbeddedStatement(node.AsNode(), node.Statement)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitForOfStatement(node *ast.ForInOrOfStatement) {
	state := p.enterNode(node.AsNode())
	openParenPos := p.emitToken(ast.KindForKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	if node.AwaitModifier != nil {
		p.emitKeywordNode(node.AwaitModifier)
		p.writeSpace()
	}
	p.emitToken(ast.KindOpenParenToken, openParenPos, WriteKindPunctuation, node.AsNode())
	p.emitForInitializer(node.Initializer)
	p.writeSpace()
	p.emitToken(ast.KindOfKeyword, node.Initializer.End(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitExpression(node.Expression, ast.OperatorPrecedenceLowest)
	p.emitToken(ast.KindCloseParenToken, node.Expression.End(), WriteKindPunctuation, node.AsNode())
	p.emitEmbeddedStatement(node.AsNode(), node.Statement)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitContinueStatement(node *ast.ContinueStatement) {
	state := p.enterNode(node.AsNode())
	p.emitToken(ast.KindContinueKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	if node.Label != nil {
		p.writeSpace()
		p.emitLabelIdentifier(node.Label.AsIdentifier())
	}
	p.writeTrailingSemicolon()
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitBreakStatement(node *ast.BreakStatement) {
	state := p.enterNode(node.AsNode())
	p.emitToken(ast.KindBreakKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	if node.Label != nil {
		p.writeSpace()
		p.emitLabelIdentifier(node.Label.AsIdentifier())
	}
	p.writeTrailingSemicolon()
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitReturnStatement(node *ast.ReturnStatement) {
	state := p.enterNode(node.AsNode())
	p.emitToken(ast.KindReturnKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	if node.Expression != nil {
		p.writeSpace()
		p.emitExpressionNoASI(node.Expression, ast.OperatorPrecedenceLowest)
	}
	p.writeTrailingSemicolon()
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitWithStatement(node *ast.WithStatement) {
	state := p.enterNode(node.AsNode())
	pos := p.emitToken(ast.KindWithKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitToken(ast.KindOpenParenToken, pos, WriteKindPunctuation, node.AsNode())
	p.emitExpression(node.Expression, ast.OperatorPrecedenceLowest)
	p.emitToken(ast.KindCloseParenToken, node.Expression.End(), WriteKindPunctuation, node.AsNode())
	p.emitEmbeddedStatement(node.AsNode(), node.Statement)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitSwitchStatement(node *ast.SwitchStatement) {
	state := p.enterNode(node.AsNode())
	pos := p.emitToken(ast.KindSwitchKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitToken(ast.KindOpenParenToken, pos, WriteKindPunctuation, node.AsNode())
	p.emitExpression(node.Expression, ast.OperatorPrecedenceLowest)
	p.emitToken(ast.KindCloseParenToken, node.Expression.End(), WriteKindPunctuation, node.AsNode())
	p.writeSpace()
	p.emitCaseBlock(node.CaseBlock.AsCaseBlock())
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitLabeledStatement(node *ast.LabeledStatement) {
	state := p.enterNode(node.AsNode())
	p.emitLabelIdentifier(node.Label.AsIdentifier())
	p.emitToken(ast.KindColonToken, node.Label.End(), WriteKindPunctuation, node.AsNode())

	// TODO: use emitEmbeddedStatement rather than writeSpace/emitStatement here after Strada migration as it is
	//       more consistent with similar emit elsewhere. writeSpace/emitStatement is used here to reduce spurious
	//       diffs when testing the Strada migration.
	////p.emitEmbeddedStatement(node.AsNode(), node.Statement)

	p.writeSpace()
	p.emitStatement(node.Statement)

	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitThrowStatement(node *ast.ThrowStatement) {
	state := p.enterNode(node.AsNode())
	p.emitToken(ast.KindThrowKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitExpressionNoASI(node.Expression, ast.OperatorPrecedenceLowest)
	p.writeTrailingSemicolon()
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitTryStatement(node *ast.TryStatement) {
	state := p.enterNode(node.AsNode())
	p.emitToken(ast.KindTryKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitBlock(node.TryBlock.AsBlock())
	if node.CatchClause != nil {
		p.writeLineOrSpace(node.AsNode(), node.TryBlock, node.CatchClause)
		p.emitCatchClause(node.CatchClause.AsCatchClause())
	}
	if node.FinallyBlock != nil {
		p.writeLineOrSpace(node.AsNode(), core.Coalesce(node.CatchClause, node.TryBlock), node.FinallyBlock)
		p.emitToken(ast.KindFinallyKeyword, core.Coalesce(node.CatchClause, node.TryBlock).End(), WriteKindKeyword, node.AsNode())
		p.writeSpace()
		p.emitBlock(node.FinallyBlock.AsBlock())
	}
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitDebuggerStatement(node *ast.DebuggerStatement) {
	state := p.enterNode(node.AsNode())
	p.emitToken(ast.KindDebuggerKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeTrailingSemicolon()
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitNotEmittedStatement(node *ast.NotEmittedStatement) {
	p.exitNode(node.AsNode(), p.enterNode(node.AsNode()))
}

func (p *Printer) emitNotEmittedTypeElement(node *ast.NotEmittedTypeElement) {
	p.exitNode(node.AsNode(), p.enterNode(node.AsNode()))
}

//
// Declarations
//

func (p *Printer) emitVariableDeclaration(node *ast.VariableDeclaration) {
	state := p.enterNode(node.AsNode())
	p.emitBindingName(node.Name())
	p.emitPunctuationNode(node.ExclamationToken)
	p.emitTypeAnnotation(node.Type)
	// !!! old compiler can set a type node purely for emit. Is this necessary?
	p.emitInitializer(node.Initializer, greatestEnd(node.Name().End(), node.Type /*, node.Name().emitNode?.typeNode*/), node.AsNode())
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitVariableDeclarationNode(node *ast.VariableDeclarationNode) {
	p.emitVariableDeclaration(node.AsVariableDeclaration())
}

func (p *Printer) emitVariableDeclarationList(node *ast.VariableDeclarationList) {
	state := p.enterNode(node.AsNode())
	switch {
	case ast.IsVarLet(node.AsNode()):
		p.writeKeyword("let")
	case ast.IsVarConst(node.AsNode()):
		p.writeKeyword("const")
	case ast.IsVarUsing(node.AsNode()):
		p.writeKeyword("using")
	case ast.IsVarAwaitUsing(node.AsNode()):
		p.writeKeyword("await")
		p.writeSpace()
		p.writeKeyword("using")
	default:
		p.writeKeyword("var")
	}
	p.writeSpace()
	p.emitList((*Printer).emitVariableDeclarationNode, node.AsNode(), node.Declarations, LFVariableDeclarationList)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitFunctionDeclaration(node *ast.FunctionDeclaration) {
	state := p.enterNode(node.AsNode())
	p.generateNameIfNeeded(node.Name())
	p.emitModifierList(node.AsNode(), node.Modifiers(), false /*allowDecorators*/)
	p.writeKeyword("function")
	p.emitTokenNode(node.AsteriskToken)
	p.writeSpace()
	if name := node.Name(); name != nil {
		p.emitIdentifierName(name.AsIdentifier())
	}
	indented := p.shouldEmitIndented(node.AsNode())
	p.increaseIndentIf(indented)
	p.pushNameGenerationScope(node.AsNode())
	p.emitSignature(node.AsNode())
	p.emitFunctionBodyNode(node.Body)
	p.popNameGenerationScope(node.AsNode())
	p.decreaseIndentIf(indented)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitClassDeclaration(node *ast.ClassDeclaration) {
	state := p.enterNode(node.AsNode())
	p.generateNameIfNeeded(node.Name())
	p.emitModifierList(node.AsNode(), node.Modifiers(), true /*allowDecorators*/)
	p.emitToken(ast.KindClassKeyword, greatestEnd(node.Pos(), node.Modifiers()), WriteKindKeyword, node.AsNode())
	if node.Name() != nil {
		p.writeSpace()
		p.emitIdentifierName(node.Name().AsIdentifier())
	}
	indented := p.shouldEmitIndented(node.AsNode())
	p.increaseIndentIf(indented)
	p.emitTypeParameters(node.AsNode(), node.TypeParameters)
	p.emitList((*Printer).emitHeritageClauseNode, node.AsNode(), node.HeritageClauses, LFClassHeritageClauses)
	p.writeSpace()
	p.writePunctuation("{")
	p.pushNameGenerationScope(node.AsNode())
	p.generateAllMemberNames(node.Members)
	p.emitList((*Printer).emitClassElement, node.AsNode(), node.Members, LFClassMembers)
	p.popNameGenerationScope(node.AsNode())
	p.writePunctuation("}")
	p.decreaseIndentIf(indented)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitInterfaceDeclaration(node *ast.InterfaceDeclaration) {
	state := p.enterNode(node.AsNode())
	p.emitModifierList(node.AsNode(), node.Modifiers(), false /*allowDecorators*/)
	p.writeKeyword("interface")
	p.writeSpace()
	p.emitBindingIdentifier(node.Name().AsIdentifier())
	p.emitTypeParameters(node.AsNode(), node.TypeParameters)
	p.emitList((*Printer).emitHeritageClauseNode, node.AsNode(), node.HeritageClauses, LFHeritageClauses)
	p.writeSpace()
	p.writePunctuation("{")
	p.pushNameGenerationScope(node.AsNode())
	p.generateAllMemberNames(node.Members)
	p.emitList((*Printer).emitTypeElement, node.AsNode(), node.Members, LFInterfaceMembers)
	p.popNameGenerationScope(node.AsNode())
	p.writePunctuation("}")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitTypeAliasDeclaration(node *ast.TypeAliasDeclaration) {
	state := p.enterNode(node.AsNode())
	p.emitModifierList(node.AsNode(), node.Modifiers(), false /*allowDecorators*/)
	p.writeKeyword("type")
	p.writeSpace()
	p.emitBindingIdentifier(node.Name().AsIdentifier())
	p.emitTypeParameters(node.AsNode(), node.TypeParameters)
	p.writeSpace()
	p.writePunctuation("=")
	p.writeSpace()
	p.emitTypeNodeOutsideExtends(node.Type)
	p.writeTrailingSemicolon()
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitEnumDeclaration(node *ast.EnumDeclaration) {
	state := p.enterNode(node.AsNode())
	p.emitModifierList(node.AsNode(), node.Modifiers(), false /*allowDecorators*/)
	p.writeKeyword("enum")
	p.writeSpace()
	p.emitBindingIdentifier(node.Name().AsIdentifier())
	p.writeSpace()
	p.writePunctuation("{")
	p.emitList((*Printer).emitEnumMemberNode, node.AsNode(), node.Members, LFEnumMembers)
	p.writePunctuation("}")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitModuleDeclaration(node *ast.ModuleDeclaration) {
	state := p.enterNode(node.AsNode())
	p.emitModifierList(node.AsNode(), node.Modifiers(), false /*allowDecorators*/)
	if node.Keyword != ast.KindGlobalKeyword {
		p.writeKeyword(core.IfElse(node.Keyword == ast.KindNamespaceKeyword, "namespace", "module"))
		p.writeSpace()
	}
	p.emitModuleName(node.Name())
	body := node.Body
	for body != nil && ast.IsModuleDeclaration(body) {
		module := body.AsModuleDeclaration()
		p.writePunctuation(".")
		p.emitNestedModuleName(module.Name())
		body = module.Body
	}
	if body == nil {
		p.writeTrailingSemicolon()
	} else {
		p.writeSpace()
		p.emitModuleBlock(body.AsModuleBlock())
	}
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitModuleBlock(node *ast.ModuleBlock) {
	state := p.enterNode(node.AsNode())
	p.generateNames(node.AsNode())
	p.emitToken(ast.KindOpenBraceToken, node.Pos(), WriteKindPunctuation, node.AsNode())
	format := core.IfElse(p.isEmptyBlock(node.AsNode(), node.Statements) || p.shouldEmitOnSingleLine(node.AsNode()),
		LFSingleLineBlockStatements,
		LFMultiLineBlockStatements)
	p.emitList((*Printer).emitStatement, node.AsNode(), node.Statements, format)
	p.emitTokenEx(ast.KindCloseBraceToken, node.Statements.End(), WriteKindPunctuation, node.AsNode(), core.IfElse(format&LFMultiLine != 0, tefIndentLeadingComments, tefNone))
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitCaseBlock(node *ast.CaseBlock) {
	state := p.enterNode(node.AsNode())
	p.emitToken(ast.KindOpenBraceToken, node.Pos(), WriteKindPunctuation, node.AsNode())
	p.emitList((*Printer).emitCaseOrDefaultClauseNode, node.AsNode(), node.Clauses, LFCaseBlockClauses)
	p.emitTokenEx(ast.KindCloseBraceToken, node.Clauses.End(), WriteKindPunctuation, node.AsNode(), tefIndentLeadingComments)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitImportEqualsDeclaration(node *ast.ImportEqualsDeclaration) {
	state := p.enterNode(node.AsNode())
	p.emitModifierList(node.AsNode(), node.Modifiers(), false /*allowDecorators*/)
	pos := p.emitToken(ast.KindImportKeyword, greatestEnd(node.Pos(), node.Modifiers()), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	if node.IsTypeOnly {
		p.emitToken(ast.KindTypeKeyword, pos, WriteKindKeyword, node.AsNode())
		p.writeSpace()
	}
	p.emitBindingIdentifier(node.Name().AsIdentifier())
	p.writeSpace()
	p.emitToken(ast.KindEqualsToken, node.Name().End(), WriteKindPunctuation, node.AsNode())
	p.writeSpace()
	p.emitModuleReference(node.ModuleReference)
	p.writeTrailingSemicolon()
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitModuleReference(node *ast.ModuleReference) {
	switch node.Kind {
	case ast.KindIdentifier:
		p.emitIdentifierReference(node.AsIdentifier())
	case ast.KindQualifiedName:
		p.emitQualifiedName(node.AsQualifiedName())
	case ast.KindExternalModuleReference:
		p.emitExternalModuleReference(node.AsExternalModuleReference())
	default:
		panic(fmt.Sprintf("unhandled ModuleReference: %v", node.Kind))
	}
}

func (p *Printer) emitImportDeclaration(node *ast.ImportDeclaration) {
	state := p.enterNode(node.AsNode())
	p.emitModifierList(node.AsNode(), node.Modifiers(), false /*allowDecorators*/)
	p.emitToken(ast.KindImportKeyword, greatestEnd(node.Pos(), node.Modifiers()), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	if node.ImportClause != nil {
		p.emitImportClause(node.ImportClause.AsImportClause())
		p.writeSpace()
		p.emitToken(ast.KindFromKeyword, node.ImportClause.End(), WriteKindKeyword, node.AsNode())
		p.writeSpace()
	}
	p.emitExpression(node.ModuleSpecifier, ast.OperatorPrecedenceLowest)
	if node.Attributes != nil {
		p.writeSpace()
		p.emitImportAttributes(node.Attributes.AsImportAttributes())
	}
	p.writeTrailingSemicolon()
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitImportClause(node *ast.ImportClause) {
	state := p.enterNode(node.AsNode())
	if node.PhaseModifier != ast.KindUnknown {
		p.emitToken(node.PhaseModifier, node.Pos(), WriteKindKeyword, node.AsNode())
		p.writeSpace()
	}
	if name := node.Name(); name != nil {
		p.emitBindingIdentifier(node.Name().AsIdentifier())
		if node.NamedBindings != nil {
			p.emitToken(ast.KindCommaToken, name.End(), WriteKindPunctuation, node.AsNode())
			p.writeSpace()
		}
	}
	p.emitNamedImportBindings(node.NamedBindings)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitNamespaceImport(node *ast.NamespaceImport) {
	state := p.enterNode(node.AsNode())
	pos := p.emitToken(ast.KindAsteriskToken, node.Pos(), WriteKindPunctuation, node.AsNode())
	p.writeSpace()
	p.emitToken(ast.KindAsKeyword, pos, WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitBindingIdentifier(node.Name().AsIdentifier())
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitNamedImports(node *ast.NamedImports) {
	state := p.enterNode(node.AsNode())
	p.writePunctuation("{")
	p.emitList((*Printer).emitImportSpecifierNode, node.AsNode(), node.Elements, LFNamedImportsOrExportsElements)
	p.writePunctuation("}")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitNamedImportBindings(node *ast.NamedImportBindings) {
	if node == nil {
		return
	}
	switch node.Kind {
	case ast.KindNamespaceImport:
		p.emitNamespaceImport(node.AsNamespaceImport())
	case ast.KindNamedImports:
		p.emitNamedImports(node.AsNamedImports())
	default:
		panic(fmt.Sprintf("unhandled NamedImportBindings: %v", node.Kind))
	}
}

func (p *Printer) emitImportSpecifier(node *ast.ImportSpecifier) {
	state := p.enterNode(node.AsNode())
	if node.IsTypeOnly {
		p.writeKeyword("type")
		p.writeSpace()
	}
	if node.PropertyName != nil {
		p.emitModuleExportName(node.PropertyName)
		p.writeSpace()
		p.emitToken(ast.KindAsKeyword, node.PropertyName.End(), WriteKindKeyword, node.AsNode())
		p.writeSpace()
	}
	p.emitBindingIdentifier(node.Name().AsIdentifier())
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitImportSpecifierNode(node *ast.ImportSpecifierNode) {
	p.emitImportSpecifier(node.AsImportSpecifier())
}

func (p *Printer) emitExportAssignment(node *ast.ExportAssignment) {
	state := p.enterNode(node.AsNode())
	nextPos := p.emitToken(ast.KindExportKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	if node.IsExportEquals {
		p.emitToken(ast.KindEqualsToken, nextPos, WriteKindOperator, node.AsNode())
	} else {
		p.emitToken(ast.KindDefaultKeyword, nextPos, WriteKindKeyword, node.AsNode())
	}
	p.writeSpace()
	if node.IsExportEquals {
		p.emitExpression(node.Expression, ast.OperatorPrecedenceAssignment)
	} else {
		// parenthesize `class` and `function` expressions so as not to conflict with exported `class` and `function` declarations
		expr := ast.GetLeftmostExpression(node.Expression, false /*stopAtCallExpressions*/)
		if ast.IsClassExpression(expr) || ast.IsFunctionExpression(expr) {
			p.emitExpression(node.Expression, ast.OperatorPrecedenceParentheses)
		} else {
			p.emitExpression(node.Expression, ast.OperatorPrecedenceAssignment)
		}
	}
	p.writeTrailingSemicolon()
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitExportDeclaration(node *ast.ExportDeclaration) {
	state := p.enterNode(node.AsNode())
	p.emitModifierList(node.AsNode(), node.Modifiers(), false /*allowDecorators*/)
	pos := p.emitToken(ast.KindExportKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	if node.IsTypeOnly {
		pos = p.emitToken(ast.KindTypeKeyword, pos, WriteKindKeyword, node.AsNode())
		p.writeSpace()
	}
	if node.ExportClause != nil {
		p.emitNamedExportBindings(node.ExportClause)
	} else {
		pos = p.emitToken(ast.KindAsteriskToken, pos, WriteKindPunctuation, node.AsNode())
	}
	if node.ModuleSpecifier != nil {
		p.writeSpace()
		p.emitToken(ast.KindFromKeyword, greatestEnd(pos, node.ExportClause), WriteKindKeyword, node.AsNode())
		p.writeSpace()
		p.emitExpression(node.ModuleSpecifier, ast.OperatorPrecedenceLowest)
	}
	if node.Attributes != nil {
		p.writeSpace()
		p.emitImportAttributes(node.Attributes.AsImportAttributes())
	}
	p.writeTrailingSemicolon()
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitImportAttributes(node *ast.ImportAttributes) {
	state := p.enterNode(node.AsNode())
	p.emitToken(node.Token, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitList((*Printer).emitImportAttributeNode, node.AsNode(), node.Attributes, LFImportAttributes)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitImportAttribute(node *ast.ImportAttribute) {
	state := p.enterNode(node.AsNode())
	p.emitImportAttributeName(node.Name())
	p.writePunctuation(":")
	p.writeSpace()
	value := node.Value
	if p.emitContext.EmitFlags(node.Value)&EFNoLeadingComments == 0 {
		commentRange := getCommentRange(value)
		p.emitTrailingComments(commentRange.Pos(), commentSeparatorAfter)
	}
	p.emitExpression(value, ast.OperatorPrecedenceDisallowComma)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitImportAttributeNode(node *ast.ImportAttributeNode) {
	p.emitImportAttribute(node.AsImportAttribute())
}

func (p *Printer) emitNamespaceExportDeclaration(node *ast.NamespaceExportDeclaration) {
	state := p.enterNode(node.AsNode())
	pos := p.emitToken(ast.KindExportKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	pos = p.emitToken(ast.KindAsKeyword, pos, WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitToken(ast.KindNamespaceKeyword, pos, WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitBindingIdentifier(node.Name().AsIdentifier())
	p.writeTrailingSemicolon()
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitNamespaceExport(node *ast.NamespaceExport) {
	state := p.enterNode(node.AsNode())
	pos := p.emitToken(ast.KindAsteriskToken, node.Pos(), WriteKindPunctuation, node.AsNode())
	p.writeSpace()
	p.emitToken(ast.KindAsKeyword, pos, WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitModuleExportName(node.Name())
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitNamedExports(node *ast.NamedExports) {
	state := p.enterNode(node.AsNode())
	p.writePunctuation("{")
	p.emitList((*Printer).emitExportSpecifierNode, node.AsNode(), node.Elements, LFNamedImportsOrExportsElements)
	p.writePunctuation("}")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitNamedExportBindings(node *ast.NamedExportBindings) {
	switch node.Kind {
	case ast.KindNamespaceExport:
		p.emitNamespaceExport(node.AsNamespaceExport())
	case ast.KindNamedExports:
		p.emitNamedExports(node.AsNamedExports())
	default:
		panic(fmt.Sprintf("unhandled NamedExportBindings: %v", node.Kind))
	}
}

func (p *Printer) emitExportSpecifier(node *ast.ExportSpecifier) {
	state := p.enterNode(node.AsNode())
	if node.IsTypeOnly {
		p.writeKeyword("type")
		p.writeSpace()
	}
	if node.PropertyName != nil {
		p.emitModuleExportName(node.PropertyName)
		p.writeSpace()
		p.emitToken(ast.KindAsKeyword, node.PropertyName.End(), WriteKindKeyword, node.AsNode())
		p.writeSpace()
	}
	p.emitModuleExportName(node.Name())
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitExportSpecifierNode(node *ast.ExportSpecifierNode) {
	p.emitExportSpecifier(node.AsExportSpecifier())
}

func (p *Printer) emitEmbeddedStatement(parentNode *ast.Node, node *ast.Statement) {
	if ast.IsBlock(node) ||
		p.shouldEmitOnSingleLine(parentNode) ||
		p.Options.PreserveSourceNewlines && p.getLeadingLineTerminatorCount(parentNode, node, LFNone) == 0 {
		p.writeSpace()
		p.emitStatement(node)
	} else {
		p.writeLine()
		p.increaseIndent()
		if node.Kind == ast.KindEmptyStatement {
			p.emitEmptyStatement(node.AsEmptyStatement(), true /*isEmbeddedStatement*/)
		} else {
			p.emitStatement(node)
		}
		p.decreaseIndent()
	}
}

func (p *Printer) emitStatement(node *ast.Statement) {
	switch node.Kind {
	// Statements
	case ast.KindBlock:
		p.emitBlock(node.AsBlock())
	case ast.KindEmptyStatement:
		p.emitEmptyStatement(node.AsEmptyStatement(), false /*isEmbeddedStatement*/)
	case ast.KindVariableStatement:
		p.emitVariableStatement(node.AsVariableStatement())
	case ast.KindExpressionStatement:
		p.emitExpressionStatement(node.AsExpressionStatement())
	case ast.KindIfStatement:
		p.emitIfStatement(node.AsIfStatement())
	case ast.KindDoStatement:
		p.emitDoStatement(node.AsDoStatement())
	case ast.KindWhileStatement:
		p.emitWhileStatement(node.AsWhileStatement())
	case ast.KindForStatement:
		p.emitForStatement(node.AsForStatement())
	case ast.KindForInStatement:
		p.emitForInStatement(node.AsForInOrOfStatement())
	case ast.KindForOfStatement:
		p.emitForOfStatement(node.AsForInOrOfStatement())
	case ast.KindContinueStatement:
		p.emitContinueStatement(node.AsContinueStatement())
	case ast.KindBreakStatement:
		p.emitBreakStatement(node.AsBreakStatement())
	case ast.KindReturnStatement:
		p.emitReturnStatement(node.AsReturnStatement())
	case ast.KindWithStatement:
		p.emitWithStatement(node.AsWithStatement())
	case ast.KindSwitchStatement:
		p.emitSwitchStatement(node.AsSwitchStatement())
	case ast.KindLabeledStatement:
		p.emitLabeledStatement(node.AsLabeledStatement())
	case ast.KindThrowStatement:
		p.emitThrowStatement(node.AsThrowStatement())
	case ast.KindTryStatement:
		p.emitTryStatement(node.AsTryStatement())
	case ast.KindDebuggerStatement:
		p.emitDebuggerStatement(node.AsDebuggerStatement())
	case ast.KindNotEmittedStatement:
		p.emitNotEmittedStatement(node.AsNotEmittedStatement())

	// Declaration Statements
	case ast.KindFunctionDeclaration:
		p.emitFunctionDeclaration(node.AsFunctionDeclaration())
	case ast.KindClassDeclaration:
		p.emitClassDeclaration(node.AsClassDeclaration())
	case ast.KindInterfaceDeclaration:
		p.emitInterfaceDeclaration(node.AsInterfaceDeclaration())
	case ast.KindTypeAliasDeclaration, ast.KindJSTypeAliasDeclaration:
		p.emitTypeAliasDeclaration(node.AsTypeAliasDeclaration())
	case ast.KindEnumDeclaration:
		p.emitEnumDeclaration(node.AsEnumDeclaration())
	case ast.KindModuleDeclaration:
		p.emitModuleDeclaration(node.AsModuleDeclaration())
	case ast.KindMissingDeclaration:
		break

	// Import/Export Statements
	case ast.KindNamespaceExportDeclaration:
		p.emitNamespaceExportDeclaration(node.AsNamespaceExportDeclaration())
	case ast.KindImportEqualsDeclaration:
		p.emitImportEqualsDeclaration(node.AsImportEqualsDeclaration())
	case ast.KindImportDeclaration:
		p.emitImportDeclaration(node.AsImportDeclaration())
	case ast.KindExportAssignment, ast.KindJSExportAssignment:
		p.emitExportAssignment(node.AsExportAssignment())
	case ast.KindExportDeclaration:
		p.emitExportDeclaration(node.AsExportDeclaration())
	case ast.KindCommonJSExport:
		break

	default:
		panic(fmt.Sprintf("unhandled statement: %v", node.Kind))
	}
}

//
// Module references
//

func (p *Printer) emitExternalModuleReference(node *ast.ExternalModuleReference) {
	state := p.enterNode(node.AsNode())
	p.writeKeyword("require")
	p.writePunctuation("(")
	p.emitExpression(node.Expression, ast.OperatorPrecedenceDisallowComma)
	p.writePunctuation(")")
	p.exitNode(node.AsNode(), state)
}

//
// JSX
//

func (p *Printer) emitJsxElement(node *ast.JsxElement) {
	state := p.enterNode(node.AsNode())
	p.emitJsxOpeningElement(node.OpeningElement.AsJsxOpeningElement())
	p.emitList((*Printer).emitJsxChild, node.AsNode(), node.Children, LFJsxElementOrFragmentChildren)
	p.emitJsxClosingElement(node.ClosingElement.AsJsxClosingElement())
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitJsxSelfClosingElement(node *ast.JsxSelfClosingElement) {
	state := p.enterNode(node.AsNode())
	p.writePunctuation("<")
	p.emitJsxTagName(node.TagName)
	p.emitTypeArguments(node.AsNode(), node.TypeArguments)
	p.writeSpace()
	p.emitJsxAttributes(node.Attributes.AsJsxAttributes())
	p.writePunctuation("/>")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitJsxFragment(node *ast.JsxFragment) {
	state := p.enterNode(node.AsNode())
	p.emitJsxOpeningFragment(node.OpeningFragment.AsJsxOpeningFragment())
	p.emitList((*Printer).emitJsxChild, node.AsNode(), node.Children, LFJsxElementOrFragmentChildren)
	p.emitJsxClosingFragment(node.ClosingFragment.AsJsxClosingFragment())
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitJsxOpeningElement(node *ast.JsxOpeningElement) {
	state := p.enterNode(node.AsNode())
	p.writePunctuation("<")
	indented := p.writeLineSeparatorsAndIndentBefore(node.TagName, node.AsNode())
	p.emitJsxTagName(node.TagName)
	p.emitTypeArguments(node.AsNode(), node.TypeArguments)
	if len(node.Attributes.Properties()) > 0 {
		p.writeSpace()
	}
	p.emitJsxAttributes(node.Attributes.AsJsxAttributes())
	p.writeLineSeparatorsAfter(node.Attributes, node.AsNode())
	p.decreaseIndentIf(indented)
	p.writePunctuation(">")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitJsxClosingElement(node *ast.JsxClosingElement) {
	state := p.enterNode(node.AsNode())
	p.writePunctuation("</")
	p.emitJsxTagName(node.TagName)
	p.writePunctuation(">")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitJsxOpeningFragment(node *ast.JsxOpeningFragment) {
	state := p.enterNode(node.AsNode())
	p.writePunctuation("<")
	p.writePunctuation(">")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitJsxClosingFragment(node *ast.JsxClosingFragment) {
	state := p.enterNode(node.AsNode())
	p.writePunctuation("</")
	p.writePunctuation(">")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitJsxText(node *ast.JsxText) {
	state := p.enterNode(node.AsNode())
	// TODO(rbuckton): Should this be using `getLiteralTextOfNode` instead?
	p.writeLiteral(node.Text)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitJsxAttributes(node *ast.JsxAttributes) {
	state := p.enterNode(node.AsNode())
	p.emitList((*Printer).emitJsxAttributeLike, node.AsNode(), node.Properties, LFJsxElementAttributes)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitJsxAttribute(node *ast.JsxAttribute) {
	state := p.enterNode(node.AsNode())
	p.emitJsxAttributeName(node.Name())
	if node.Initializer != nil {
		p.writePunctuation("=")
		p.emitJsxAttributeValue(node.Initializer)
	}
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitJsxSpreadAttribute(node *ast.JsxSpreadAttribute) {
	state := p.enterNode(node.AsNode())
	p.writePunctuation("{...")
	p.emitExpression(node.Expression, ast.OperatorPrecedenceLowest)
	p.writePunctuation("}")
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitJsxAttributeLike(node *ast.JsxAttributeLike) {
	switch node.Kind {
	case ast.KindJsxAttribute:
		p.emitJsxAttribute(node.AsJsxAttribute())
	case ast.KindJsxSpreadAttribute:
		p.emitJsxSpreadAttribute(node.AsJsxSpreadAttribute())
	default:
		panic(fmt.Sprintf("unhandled JsxAttributeLike: %v", node.Kind))
	}
}

func (p *Printer) emitJsxExpression(node *ast.JsxExpression) {
	state := p.enterNode(node.AsNode())
	if node.Expression != nil || !p.commentsDisabled && !ast.NodeIsSynthesized(node.AsNode()) && p.hasCommentsAtPosition(node.Pos()) { // preserve empty expressions if they contain comments!
		indented := p.currentSourceFile != nil && !ast.NodeIsSynthesized(node.AsNode()) && GetLinesBetweenPositions(p.currentSourceFile, node.Pos(), node.End()) != 0
		p.increaseIndentIf(indented)
		end := p.emitToken(ast.KindOpenBraceToken, node.Pos(), WriteKindPunctuation, node.AsNode())
		p.emitTokenNode(node.DotDotDotToken)
		p.emitExpression(node.Expression, ast.OperatorPrecedenceDisallowComma)
		p.emitToken(ast.KindCloseBraceToken, greatestEnd(end, node.Expression, node.DotDotDotToken), WriteKindPunctuation, node.AsNode())
		p.decreaseIndentIf(indented)
	}
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitJsxNamespacedName(node *ast.JsxNamespacedName) {
	state := p.enterNode(node.AsNode())
	p.emitIdentifierName(node.Namespace.AsIdentifier())
	p.writePunctuation(":")
	p.emitIdentifierName(node.Name().AsIdentifier())
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitJsxChild(node *ast.JsxChild) {
	switch node.Kind {
	case ast.KindJsxText:
		p.emitJsxText(node.AsJsxText())
	case ast.KindJsxExpression:
		p.emitJsxExpression(node.AsJsxExpression())
	case ast.KindJsxElement:
		p.emitJsxElement(node.AsJsxElement())
	case ast.KindJsxSelfClosingElement:
		p.emitJsxSelfClosingElement(node.AsJsxSelfClosingElement())
	case ast.KindJsxFragment:
		p.emitJsxFragment(node.AsJsxFragment())
	default:
		panic(fmt.Sprintf("unhandled JsxChild: %v", node.Kind))
	}
}

func (p *Printer) emitJsxTagName(node *ast.JsxTagNameExpression) {
	switch node.Kind {
	case ast.KindIdentifier:
		p.emitIdentifierReference(node.AsIdentifier())
	case ast.KindThisKeyword:
		p.emitKeywordExpression(node.AsKeywordExpression())
	case ast.KindJsxNamespacedName:
		p.emitJsxNamespacedName(node.AsJsxNamespacedName())
	case ast.KindPropertyAccessExpression:
		p.emitPropertyAccessExpression(node.AsPropertyAccessExpression())
	default:
		panic(fmt.Sprintf("unhandled JsxTagName: %v", node.Kind))
	}
}

func (p *Printer) emitJsxAttributeName(node *ast.JsxAttributeName) {
	switch node.Kind {
	case ast.KindIdentifier:
		p.emitIdentifierName(node.AsIdentifier())
	case ast.KindJsxNamespacedName:
		p.emitJsxNamespacedName(node.AsJsxNamespacedName())
	default:
		panic(fmt.Sprintf("unhandled JsxAttributeName: %v", node.Kind))
	}
}

func (p *Printer) emitJsxAttributeValue(node *ast.JsxAttributeValue) {
	switch node.Kind {
	case ast.KindStringLiteral:
		p.emitStringLiteral(node.AsStringLiteral())
	case ast.KindJsxExpression:
		p.emitJsxExpression(node.AsJsxExpression())
	case ast.KindJsxElement:
		p.emitJsxElement(node.AsJsxElement())
	case ast.KindJsxSelfClosingElement:
		p.emitJsxSelfClosingElement(node.AsJsxSelfClosingElement())
	case ast.KindJsxFragment:
		p.emitJsxFragment(node.AsJsxFragment())
	default:
		panic(fmt.Sprintf("unhandled JsxAttributeValue: %v", node.Kind))
	}
}

//
// Clauses
//

func (p *Printer) emitCaseOrDefaultClauseStatements(node *ast.CaseOrDefaultClause) {
	emitAsSingleStatement := len(node.Statements.Nodes) == 1 &&
		// treat synthesized nodes as located on the same line for emit purposes
		(p.currentSourceFile == nil ||
			ast.NodeIsSynthesized(node.AsNode()) ||
			ast.NodeIsSynthesized(node.Statements.Nodes[0]) ||
			rangeStartPositionsAreOnSameLine(node.Loc, node.Statements.Nodes[0].Loc, p.currentSourceFile))

	format := LFCaseOrDefaultClauseStatements
	if emitAsSingleStatement {
		p.writeSpace()
		format &= ^(LFMultiLine | LFIndented)
	}

	p.emitList((*Printer).emitStatement, node.AsNode(), node.Statements, format)
}

func (p *Printer) emitCaseClause(node *ast.CaseOrDefaultClause) {
	state := p.enterNode(node.AsNode())
	p.emitToken(ast.KindCaseKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitExpression(node.Expression, ast.OperatorPrecedenceLowest)
	p.emitToken(ast.KindColonToken, node.Expression.End(), WriteKindPunctuation, node.AsNode())
	p.emitCaseOrDefaultClauseStatements(node)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitDefaultClause(node *ast.CaseOrDefaultClause) {
	state := p.enterNode(node.AsNode())
	pos := p.emitToken(ast.KindDefaultKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.emitToken(ast.KindColonToken, pos, WriteKindPunctuation, node.AsNode())
	p.emitCaseOrDefaultClauseStatements(node)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitCaseOrDefaultClauseNode(node *ast.CaseOrDefaultClauseNode) {
	switch node.Kind {
	case ast.KindCaseClause:
		p.emitCaseClause(node.AsCaseOrDefaultClause())
	case ast.KindDefaultClause:
		p.emitDefaultClause(node.AsCaseOrDefaultClause())
	default:
		panic(fmt.Sprintf("unhandled CaseOrDefaultClause: %v", node.Kind))
	}
}

func (p *Printer) emitHeritageClause(node *ast.HeritageClause) {
	state := p.enterNode(node.AsNode())
	p.writeSpace()
	p.emitToken(node.Token, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()
	p.emitList((*Printer).emitExpressionWithTypeArgumentsNode, node.AsNode(), node.Types, LFHeritageClauseTypes)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitHeritageClauseNode(node *ast.HeritageClauseNode) {
	p.emitHeritageClause(node.AsHeritageClause())
}

func (p *Printer) emitCatchClause(node *ast.CatchClause) {
	state := p.enterNode(node.AsNode())
	openParenPos := p.emitToken(ast.KindCatchKeyword, node.Pos(), WriteKindKeyword, node.AsNode())
	p.writeSpace()

	if node.VariableDeclaration != nil {
		p.emitToken(ast.KindOpenParenToken, openParenPos, WriteKindPunctuation, node.AsNode())
		p.emitVariableDeclaration(node.VariableDeclaration.AsVariableDeclaration())
		p.emitToken(ast.KindCloseParenToken, node.VariableDeclaration.End(), WriteKindPunctuation, node.AsNode())
		p.writeSpace()
	}

	p.emitBlock(node.Block.AsBlock())
	p.exitNode(node.AsNode(), state)
}

//
// Property assignments
//

func (p *Printer) emitPropertyAssignment(node *ast.PropertyAssignment) {
	state := p.enterNode(node.AsNode())
	p.emitPropertyName(node.Name())
	p.writePunctuation(":")
	p.writeSpace()
	// This is to ensure that we emit comment in the following case:
	//      For example:
	//          obj = {
	//              id: /*comment1*/ ()=>void
	//          }
	// "comment1" is not considered to be leading comment for node.initializer
	// but rather a trailing comment on the previous node.
	initializer := node.Initializer
	if p.emitContext.EmitFlags(initializer)&EFNoLeadingComments == 0 {
		commentRange := getCommentRange(initializer)
		p.emitTrailingComments(commentRange.Pos(), commentSeparatorAfter)
	}
	p.emitExpression(initializer, ast.OperatorPrecedenceDisallowComma)
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitShorthandPropertyAssignment(node *ast.ShorthandPropertyAssignment) {
	state := p.enterNode(node.AsNode())
	p.emitPropertyName(node.Name())
	if node.ObjectAssignmentInitializer != nil {
		p.writeSpace()
		p.writePunctuation("=")
		p.writeSpace()
		p.emitExpression(node.ObjectAssignmentInitializer, ast.OperatorPrecedenceDisallowComma)
	}
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitSpreadAssignment(node *ast.SpreadAssignment) {
	state := p.enterNode(node.AsNode())
	if node.Expression != nil {
		p.emitToken(ast.KindDotDotDotToken, node.Pos(), WriteKindPunctuation, node.AsNode())
		p.emitExpression(node.Expression, ast.OperatorPrecedenceDisallowComma)
	}
	p.exitNode(node.AsNode(), state)
}

//
// Enum
//

func (p *Printer) emitEnumMember(node *ast.EnumMember) {
	state := p.enterNode(node.AsNode())
	p.emitPropertyName(node.Name())
	p.emitInitializer(node.Initializer, node.Name().End(), node.AsNode())
	p.exitNode(node.AsNode(), state)
}

func (p *Printer) emitEnumMemberNode(node *ast.EnumMemberNode) {
	p.emitEnumMember(node.AsEnumMember())
}

//
// JSDoc
//

func (p *Printer) emitJSDocNode(node *ast.Node) {
	// !!!
	panic("not implemented")
}

//
// Top-level nodes
//

func (p *Printer) emitShebangIfNeeded(node *ast.SourceFile) {
	if ast.NodeIsSynthesized(node.AsNode()) {
		return
	}
	shebang := scanner.GetShebang(node.Text())
	if shebang != "" {
		p.writeComment(shebang)
		p.writeLine()
	}
}

func (p *Printer) emitPrologueDirectives(statements *ast.StatementList) int {
	for i, statement := range statements.Nodes {
		if ast.IsPrologueDirective(statement) {
			p.writeLine()
			p.emitStatement(statement)
		} else {
			return i
		}
	}
	return len(statements.Nodes)
}

func (p *Printer) emitHelpers(node *ast.Node) bool {
	helpersEmitted := false
	sourceFile := p.currentSourceFile
	shouldSkip := p.Options.NoEmitHelpers || (sourceFile != nil && p.emitContext.HasRecordedExternalHelpers(sourceFile))
	helpers := slices.Clone(p.emitContext.GetEmitHelpers(node))
	if len(helpers) > 0 {
		slices.SortStableFunc(helpers, compareEmitHelpers)
		for _, helper := range helpers {
			if !helper.Scoped {
				// Skip the helper if it can be skipped and the noEmitHelpers compiler
				// option is set, or if it can be imported and the importHelpers compiler
				// option is set.
				if shouldSkip {
					continue
				}
			}
			if helper.TextCallback != nil {
				p.writeLines(helper.TextCallback(p.makeFileLevelOptimisticUniqueName))
			} else {
				p.writeLines(helper.Text)
			}
			helpersEmitted = true
		}
	}

	return helpersEmitted
}

func (p *Printer) emitSourceFile(node *ast.SourceFile) {
	savedCurrentSourceFile := p.currentSourceFile
	savedCommentsDisabled := p.commentsDisabled
	p.currentSourceFile = node

	p.writeLine()

	p.pushNameGenerationScope(node.AsNode())
	p.generateAllNames(node.Statements)

	index := 0
	var state *commentState
	if node.ScriptKind != core.ScriptKindJSON {
		p.emitShebangIfNeeded(node)
		index = p.emitPrologueDirectives(node.Statements)
		if !p.writer.IsAtStartOfLine() {
			p.writeLine()
		}
		state = p.emitDetachedCommentsBeforeStatementList(node.AsNode(), node.Statements.Loc)
		p.emitHelpers(node.AsNode())
		if node.IsDeclarationFile {
			p.emitTripleSlashDirectives(node)
		}
	} else {
		state = p.emitDetachedCommentsBeforeStatementList(node.AsNode(), node.Statements.Loc)
	}

	// !!! Emit triple-slash directives
	p.emitListRange(
		(*Printer).emitStatement,
		node.AsNode(),
		node.Statements,
		LFMultiLine,
		index,
		-1, /*count*/
	)
	p.popNameGenerationScope(node.AsNode())
	p.emitDetachedCommentsAfterStatementList(node.AsNode(), node.Statements.Loc, state)
	p.currentSourceFile = savedCurrentSourceFile
	p.commentsDisabled = savedCommentsDisabled
}

func (p *Printer) emitTripleSlashDirectives(node *ast.SourceFile) {
	p.emitDirective("path", node.ReferencedFiles)
	p.emitDirective("types", node.TypeReferenceDirectives)
	p.emitDirective("lib", node.LibReferenceDirectives)
}

func (p *Printer) emitDirective(kind string, refs []*ast.FileReference) {
	for _, ref := range refs {
		var resolutionMode string
		if ref.ResolutionMode != core.ResolutionModeNone {
			resolutionMode = fmt.Sprintf(`resolution-mode="%s" `, core.IfElse(ref.ResolutionMode == core.ResolutionModeESM, "import", "require"))
		}
		p.writeComment(fmt.Sprintf("/// <reference %s=\"%s\" %s%s/>", kind, ref.FileName, resolutionMode, core.IfElse(ref.Preserve, `preserve="true" `, "")))
		p.writeLine()
	}
}

//
// Lists
//

func (p *Printer) emitList(emit func(p *Printer, node *ast.Node), parentNode *ast.Node, children *ast.NodeList, format ListFormat) {
	if p.shouldEmitOnMultipleLines(parentNode) {
		format |= LFPreferNewLine | LFIndented
	}

	p.emitListRange(emit, parentNode, children, format, -1 /*start*/, -1 /*count*/)
}

func (p *Printer) emitListRange(emit func(p *Printer, node *ast.Node), parentNode *ast.Node, children *ast.NodeList, format ListFormat, start int, count int) {
	isNil := children == nil

	length := 0
	if !isNil {
		length = len(children.Nodes)
	}

	if start < 0 {
		start = 0
	}

	if count < 0 {
		count = length - start
	}

	if isNil && format&LFOptionalIfNil != 0 {
		return
	}

	isEmpty := isNil || start >= length || count <= 0
	if isEmpty && format&LFOptionalIfEmpty != 0 {
		if p.OnBeforeEmitNodeList != nil {
			p.OnBeforeEmitNodeList(children)
		}
		if p.OnAfterEmitNodeList != nil {
			p.OnAfterEmitNodeList(children)
		}
		return
	}

	if format&LFBracketsMask != 0 {
		p.writePunctuation(getOpeningBracket(format))
		if isEmpty && !isNil {
			p.emitTrailingComments(children.Pos(), commentSeparatorBefore) // Emit comments within empty lists
		}
	}

	if p.OnBeforeEmitNodeList != nil {
		p.OnBeforeEmitNodeList(children)
	}

	if isEmpty {
		// Write a line terminator if the parent node was multi-line
		if format&LFMultiLine != 0 && !(p.Options.PreserveSourceNewlines && (parentNode == nil || p.currentSourceFile != nil && RangeIsOnSingleLine(parentNode.Loc, p.currentSourceFile))) {
			p.writeLine()
		} else if format&LFSpaceBetweenBraces != 0 && format&LFNoSpaceIfEmpty == 0 {
			p.writeSpace()
		}
	} else {
		end := min(start+count, length)

		p.emitListItems(emit, parentNode, children.Nodes[start:end], format, p.hasTrailingComma(parentNode, children), children.Loc)
	}

	if p.OnAfterEmitNodeList != nil {
		p.OnAfterEmitNodeList(children)
	}

	if format&LFBracketsMask != 0 {
		if isEmpty && !isNil {
			p.emitTrailingComments(children.Pos(), commentSeparatorBefore) // Emit comments within empty lists
		}
		p.writePunctuation(getClosingBracket(format))
	}
}

func (p *Printer) hasTrailingComma(parentNode *ast.Node, children *ast.NodeList) bool {
	// NodeList.HasTrailingComma() is unreliable on transformed nodes as some nodes may have been removed. In the event
	// we believe we may need to emit a trailing comma, we must first look to the respective node list on the original
	// node first.
	if !children.HasTrailingComma() {
		return false
	}

	originalParent := p.emitContext.MostOriginal(parentNode)
	if originalParent == parentNode {
		// if this node is the original node, we can trust the result
		return true
	}

	if originalParent.Kind != parentNode.Kind {
		// if the original node is some other kind of node, we cannot correlate the list
		return false
	}

	// find the respective node list on the original parent
	originalList := children
	switch originalParent.Kind {
	case ast.KindObjectLiteralExpression:
		originalList = originalParent.PropertyList()
	case ast.KindArrayLiteralExpression:
		originalList = originalParent.ElementList()
	case ast.KindCallExpression, ast.KindNewExpression:
		switch children {
		case parentNode.TypeArgumentList():
			originalList = originalParent.TypeArgumentList()
		case parentNode.ArgumentList():
			originalList = originalParent.ArgumentList()
		}
	case ast.KindConstructor,
		ast.KindMethodDeclaration,
		ast.KindGetAccessor,
		ast.KindSetAccessor,
		ast.KindFunctionDeclaration,
		ast.KindFunctionExpression,
		ast.KindArrowFunction,
		ast.KindFunctionType,
		ast.KindConstructorType,
		ast.KindCallSignature,
		ast.KindConstructSignature:
		switch children {
		case parentNode.TypeParameterList():
			originalList = originalParent.TypeParameterList()
		case parentNode.ParameterList():
			originalList = originalParent.ParameterList()
		}
	case ast.KindClassDeclaration, ast.KindClassExpression, ast.KindInterfaceDeclaration, ast.KindTypeAliasDeclaration, ast.KindJSTypeAliasDeclaration:
		switch children {
		case parentNode.TypeParameterList():
			originalList = originalParent.TypeParameterList()
		}
	case ast.KindObjectBindingPattern, ast.KindArrayBindingPattern:
		switch children {
		case parentNode.ElementList():
			originalList = originalParent.ElementList()
		}
	case ast.KindNamedImports, ast.KindNamedExports:
		originalList = originalParent.ElementList()
	case ast.KindImportAttributes:
		originalList = originalParent.AsImportAttributes().Attributes
	}

	// if we have the original list, we can use it's result.
	if originalList != nil {
		return originalList.HasTrailingComma()
	}

	return false
}

func (p *Printer) writeDelimiter(format ListFormat) {
	switch format & LFDelimitersMask {
	case LFNone:
		break
	case LFCommaDelimited:
		p.writePunctuation(",")
	case LFBarDelimited:
		p.writeSpace()
		p.writePunctuation("|")
	case LFAsteriskDelimited:
		p.writeSpace()
		p.writePunctuation("*")
		p.writeSpace()
	case LFAmpersandDelimited:
		p.writeSpace()
		p.writePunctuation("&")
	}
}

// Emits a list without brackets or raising events.
//
// NOTE: You probably don't want to call this directly and should be using `emitList` instead.
func (p *Printer) emitListItems(
	emit func(p *Printer, node *ast.Node),
	parentNode *ast.Node,
	children []*ast.Node,
	format ListFormat,
	hasTrailingComma bool,
	childrenTextRange core.TextRange,
) {
	// Write the opening line terminator or leading whitespace.
	mayEmitInterveningComments := format&LFNoInterveningComments == 0
	shouldEmitInterveningComments := mayEmitInterveningComments

	leadingLineTerminatorCount := 0
	if len(children) > 0 {
		leadingLineTerminatorCount = p.getLeadingLineTerminatorCount(parentNode, children[0], format)
	}
	if leadingLineTerminatorCount > 0 {
		for range leadingLineTerminatorCount {
			p.writeLine()
		}
		shouldEmitInterveningComments = false
	} else if format&LFSpaceBetweenBraces != 0 {
		p.writeSpace()
	}

	// Increase the indent, if requested.
	if format&LFIndented != 0 {
		p.increaseIndent()
	}

	parentEnd := greatestEnd(-1, parentNode)

	// Emit each child.
	var previousSibling *ast.Node
	shouldDecreaseIndentAfterEmit := false
	for _, child := range children {
		// Write the delimiter if this is not the first node.
		if format&LFAsteriskDelimited != 0 {
			// always write JSDoc in the format "\n *"
			p.writeLine()
			p.writeDelimiter(format)
		} else if previousSibling != nil {
			// i.e
			//      function commentedParameters(
			//          /* Parameter a */
			//          a
			//          /* End of parameter a */ -> this comment isn't considered to be trailing comment of parameter "a" due to newline
			//          ,
			if format&LFDelimitersMask != 0 && previousSibling.End() != parentEnd {
				if !p.commentsDisabled && p.shouldEmitTrailingComments(previousSibling) {
					p.emitLeadingComments(previousSibling.End(), false /*elided*/)
				}
			}

			p.writeDelimiter(format)

			// Write either a line terminator or whitespace to separate the elements.
			separatingLineTerminatorCount := p.getSeparatingLineTerminatorCount(previousSibling, child, format)
			if separatingLineTerminatorCount > 0 {
				// If a synthesized node in a single-line list starts on a new
				// line, we should increase the indent.
				if format&(LFLinesMask|LFIndented) == LFSingleLine {
					p.increaseIndent()
					shouldDecreaseIndentAfterEmit = true
				}

				if shouldEmitInterveningComments && format&LFDelimitersMask != 0 && !ast.PositionIsSynthesized(child.Pos()) {
					commentRange := getCommentRange(child)
					p.emitTrailingComments(commentRange.Pos(), core.IfElse(format&LFSpaceBetweenSiblings != 0, commentSeparatorBefore, commentSeparatorNone))
				}

				for range separatingLineTerminatorCount {
					p.writeLine()
				}

				shouldEmitInterveningComments = false
			} else if format&LFSpaceBetweenSiblings != 0 {
				p.writeSpace()
			}
		}

		// Emit this child.
		if shouldEmitInterveningComments {
			commentRange := getCommentRange(child)
			p.emitTrailingComments(commentRange.Pos(), commentSeparatorAfter)
		} else {
			shouldEmitInterveningComments = mayEmitInterveningComments
		}

		p.nextListElementPos = child.Pos()
		emit(p, child)

		if shouldDecreaseIndentAfterEmit {
			p.decreaseIndent()
			shouldDecreaseIndentAfterEmit = false
		}

		previousSibling = child
	}

	// Write a trailing comma, if requested.
	skipTrailingComments := p.commentsDisabled || !p.shouldEmitTrailingComments(previousSibling)
	emitTrailingComma := hasTrailingComma && format&LFAllowTrailingComma != 0 && format&LFCommaDelimited != 0
	if emitTrailingComma {
		if previousSibling != nil && !skipTrailingComments {
			p.emitToken(ast.KindCommaToken, previousSibling.End(), WriteKindPunctuation, previousSibling)
		} else {
			p.writePunctuation(",")
		}
	}

	// Emit any trailing comment of the last element in the list
	// i.e
	//       var array = [...
	//          2
	//          /* end of element 2 */
	//       ];
	if previousSibling != nil && parentEnd != previousSibling.End() && format&LFDelimitersMask != 0 && !skipTrailingComments {
		p.emitLeadingComments(greatestEnd(previousSibling.End(), childrenTextRange), false /*elided*/)
	}

	// Decrease the indent, if requested.
	if format&LFIndented != 0 {
		p.decreaseIndent()
	}

	// Write the closing line terminator or closing whitespace.
	closingLineTerminatorCount := p.getClosingLineTerminatorCount(parentNode, core.LastOrNil(children), format, childrenTextRange)
	if closingLineTerminatorCount > 0 {
		for range closingLineTerminatorCount {
			p.writeLine()
		}
	} else if format&(LFSpaceAfterList|LFSpaceBetweenBraces) != 0 {
		p.writeSpace()
	}
}

//
// General
//

func (p *Printer) Emit(node *ast.Node, sourceFile *ast.SourceFile) string {
	// ensure a reusable writer
	if p.ownWriter == nil {
		p.ownWriter = NewTextWriter(p.Options.NewLine.GetNewLineCharacter(), 0)
	}

	p.Write(node, sourceFile, p.ownWriter, nil /*sourceMapGenerator*/)
	text := p.ownWriter.String()

	p.ownWriter.Clear()
	return text
}

func (p *Printer) EmitSourceFile(sourceFile *ast.SourceFile) string {
	return p.Emit(sourceFile.AsNode(), sourceFile)
}

func (p *Printer) setSourceFile(sourceFile *ast.SourceFile) {
	p.currentSourceFile = sourceFile
	p.uniqueHelperNames = nil
	p.externalHelpersModuleName = nil
	if sourceFile != nil {
		if p.emitContext.EmitFlags(p.emitContext.MostOriginal(sourceFile.AsNode()))&EFExternalHelpers != 0 {
			p.uniqueHelperNames = make(map[string]*ast.IdentifierNode)
		}
		p.externalHelpersModuleName = p.emitContext.GetExternalHelpersModuleName(sourceFile)
		p.setSourceMapSource(sourceFile)
	}

	// !!!
}

func (p *Printer) Write(node *ast.Node, sourceFile *ast.SourceFile, writer EmitTextWriter, sourceMapGenerator *sourcemap.Generator) {
	savedCurrentSourceFile := p.currentSourceFile
	savedWriter := p.writer
	savedUniqueHelperNames := p.uniqueHelperNames
	savedSourceMapsDisabled := p.sourceMapsDisabled
	savedSourceMapGenerator := p.sourceMapGenerator
	savedSourceMapSource := p.sourceMapSource
	savedSourceMapSourceIndex := p.sourceMapSourceIndex
	savedSourceMapLineCharCache := p.sourceMapLineCharCache

	p.sourceMapsDisabled = sourceMapGenerator == nil
	p.sourceMapGenerator = sourceMapGenerator
	p.sourceMapSource = nil
	p.sourceMapSourceIndex = -1
	p.sourceMapLineCharCache = nil

	p.setSourceFile(sourceFile)
	p.writer = writer
	p.writer.Clear()
	if sourceFile != nil {
		if grower, ok := p.writer.(interface{ Grow(n int) }); ok {
			grower.Grow(len(sourceFile.Text()))
		}
	}

	switch node.Kind {
	// Pseudo-literals
	case ast.KindTemplateHead:
		p.emitTemplateHead(node.AsTemplateHead())
	case ast.KindTemplateMiddle:
		p.emitTemplateMiddle(node.AsTemplateMiddle())
	case ast.KindTemplateTail:
		p.emitTemplateTail(node.AsTemplateTail())

	// Identifiers
	case ast.KindIdentifier:
		p.emitIdentifierName(node.AsIdentifier())

	// PrivateIdentifiers
	case ast.KindPrivateIdentifier:
		p.emitPrivateIdentifier(node.AsPrivateIdentifier())

	// Parse tree nodes
	// Names
	case ast.KindQualifiedName:
		p.emitQualifiedName(node.AsQualifiedName())
	case ast.KindComputedPropertyName:
		p.emitComputedPropertyName(node.AsComputedPropertyName())

	// Signature elements
	case ast.KindTypeParameter:
		p.emitTypeParameter(node.AsTypeParameter())
	case ast.KindParameter:
		p.emitParameter(node.AsParameterDeclaration())
	case ast.KindDecorator:
		p.emitDecorator(node.AsDecorator())

	// Type members
	case ast.KindPropertySignature:
		p.emitPropertySignature(node.AsPropertySignatureDeclaration())
	case ast.KindPropertyDeclaration:
		p.emitPropertyDeclaration(node.AsPropertyDeclaration())
	case ast.KindMethodSignature:
		p.emitMethodSignature(node.AsMethodSignatureDeclaration())
	case ast.KindMethodDeclaration:
		p.emitMethodDeclaration(node.AsMethodDeclaration())
	case ast.KindClassStaticBlockDeclaration:
		p.emitClassStaticBlockDeclaration(node.AsClassStaticBlockDeclaration())
	case ast.KindConstructor:
		p.emitConstructor(node.AsConstructorDeclaration())
	case ast.KindGetAccessor:
		p.emitGetAccessorDeclaration(node.AsGetAccessorDeclaration())
	case ast.KindSetAccessor:
		p.emitSetAccessorDeclaration(node.AsSetAccessorDeclaration())
	case ast.KindCallSignature:
		p.emitCallSignature(node.AsCallSignatureDeclaration())
	case ast.KindConstructSignature:
		p.emitConstructSignature(node.AsConstructSignatureDeclaration())
	case ast.KindIndexSignature:
		p.emitIndexSignature(node.AsIndexSignatureDeclaration())

	// Binding patterns
	case ast.KindObjectBindingPattern:
		p.emitObjectBindingPattern(node.AsBindingPattern())
	case ast.KindArrayBindingPattern:
		p.emitArrayBindingPattern(node.AsBindingPattern())
	case ast.KindBindingElement:
		p.emitBindingElement(node.AsBindingElement())

	// Misc
	case ast.KindTemplateSpan:
		p.emitTemplateSpan(node.AsTemplateSpan())
	case ast.KindSemicolonClassElement:
		p.emitSemicolonClassElement(node.AsSemicolonClassElement())

	// Declarations (non-statement)
	case ast.KindVariableDeclaration:
		p.emitVariableDeclaration(node.AsVariableDeclaration())
	case ast.KindVariableDeclarationList:
		p.emitVariableDeclarationList(node.AsVariableDeclarationList())
	case ast.KindModuleBlock:
		p.emitModuleBlock(node.AsModuleBlock())
	case ast.KindCaseBlock:
		p.emitCaseBlock(node.AsCaseBlock())
	case ast.KindImportClause:
		p.emitImportClause(node.AsImportClause())
	case ast.KindNamespaceImport:
		p.emitNamespaceImport(node.AsNamespaceImport())
	case ast.KindNamespaceExport:
		p.emitNamespaceExport(node.AsNamespaceExport())
	case ast.KindNamedImports:
		p.emitNamedImports(node.AsNamedImports())
	case ast.KindImportSpecifier:
		p.emitImportSpecifier(node.AsImportSpecifier())
	case ast.KindNamedExports:
		p.emitNamedExports(node.AsNamedExports())
	case ast.KindExportSpecifier:
		p.emitExportSpecifier(node.AsExportSpecifier())
	case ast.KindImportAttributes:
		p.emitImportAttributes(node.AsImportAttributes())
	case ast.KindImportAttribute:
		p.emitImportAttribute(node.AsImportAttribute())

	// Module references
	case ast.KindExternalModuleReference:
		p.emitExternalModuleReference(node.AsExternalModuleReference())

	// JSX (non-expression)
	case ast.KindJsxText:
		p.emitJsxText(node.AsJsxText())
	case ast.KindJsxOpeningElement:
		p.emitJsxOpeningElement(node.AsJsxOpeningElement())
	case ast.KindJsxOpeningFragment:
		p.emitJsxOpeningFragment(node.AsJsxOpeningFragment())
	case ast.KindJsxClosingElement:
		p.emitJsxClosingElement(node.AsJsxClosingElement())
	case ast.KindJsxClosingFragment:
		p.emitJsxClosingFragment(node.AsJsxClosingFragment())
	case ast.KindJsxAttribute:
		p.emitJsxAttribute(node.AsJsxAttribute())
	case ast.KindJsxAttributes:
		p.emitJsxAttributes(node.AsJsxAttributes())
	case ast.KindJsxSpreadAttribute:
		p.emitJsxSpreadAttribute(node.AsJsxSpreadAttribute())
	case ast.KindJsxExpression:
		p.emitJsxExpression(node.AsJsxExpression())
	case ast.KindJsxNamespacedName:
		p.emitJsxNamespacedName(node.AsJsxNamespacedName())

	// Clauses
	case ast.KindCaseClause:
		p.emitCaseClause(node.AsCaseOrDefaultClause())
	case ast.KindDefaultClause:
		p.emitDefaultClause(node.AsCaseOrDefaultClause())
	case ast.KindHeritageClause:
		p.emitHeritageClause(node.AsHeritageClause())
	case ast.KindCatchClause:
		p.emitCatchClause(node.AsCatchClause())

	// Property assignments
	case ast.KindPropertyAssignment:
		p.emitPropertyAssignment(node.AsPropertyAssignment())
	case ast.KindShorthandPropertyAssignment:
		p.emitShorthandPropertyAssignment(node.AsShorthandPropertyAssignment())
	case ast.KindSpreadAssignment:
		p.emitSpreadAssignment(node.AsSpreadAssignment())

	// Enum
	case ast.KindEnumMember:
		p.emitEnumMember(node.AsEnumMember())

		// Top-level nodes
	case ast.KindSourceFile:
		p.emitSourceFile(node.AsSourceFile())

	// Transformation nodes
	case ast.KindNotEmittedTypeElement:
		p.emitNotEmittedTypeElement(node.AsNotEmittedTypeElement())

	default:
		switch {
		case ast.IsTypeNode(node):
			p.emitTypeNodeOutsideExtends(node)
		case ast.IsStatement(node):
			p.emitStatement(node)
		case ast.IsExpression(node):
			p.emitExpression(node, ast.OperatorPrecedenceLowest)
		case ast.IsKeywordKind(node.Kind):
			p.emitKeywordNode(node)
		case ast.IsPunctuationKind(node.Kind):
			p.emitPunctuationNode(node)
		case ast.IsJSDocKind(node.Kind):
			p.emitJSDocNode(node)
		default:
			panic(fmt.Sprintf("unhandled Node: %v", node.Kind))
		}
	}

	p.currentSourceFile = savedCurrentSourceFile
	p.writer = savedWriter
	p.uniqueHelperNames = savedUniqueHelperNames
	p.sourceMapsDisabled = savedSourceMapsDisabled
	p.sourceMapGenerator = savedSourceMapGenerator
	p.sourceMapSource = savedSourceMapSource
	p.sourceMapSourceIndex = savedSourceMapSourceIndex
	p.sourceMapLineCharCache = savedSourceMapLineCharCache
}

//
// Comments
//

func (p *Printer) emitCommentsBeforeNode(node *ast.Node) *commentState {
	if !p.shouldEmitComments(node) {
		return nil
	}

	emitFlags := p.emitContext.EmitFlags(node)
	commentRange := p.emitContext.CommentRange(node)
	containerPos := p.containerPos
	containerEnd := p.containerEnd
	declarationListContainerEnd := p.declarationListContainerEnd

	// Emit leading comments
	p.emitLeadingCommentsOfNode(node, emitFlags, commentRange)
	p.emitLeadingSyntheticCommentsOfNode(node, emitFlags)
	if emitFlags&EFNoNestedComments != 0 {
		p.commentsDisabled = true
	}

	c := p.commentStatePool.New()
	*c = commentState{emitFlags, commentRange, containerPos, containerEnd, declarationListContainerEnd}
	return c
}

func (p *Printer) emitCommentsAfterNode(node *ast.Node, state *commentState) {
	if state == nil {
		return
	}

	emitFlags := state.emitFlags
	commentRange := state.commentRange
	containerPos := state.containerPos
	containerEnd := state.containerEnd
	declarationListContainerEnd := state.declarationListContainerEnd

	// Emit trailing comments
	if emitFlags&EFNoNestedComments != 0 {
		p.commentsDisabled = false
	}

	p.emitTrailingSyntheticCommentsOfNode(node, emitFlags)
	p.emitTrailingCommentsOfNode(node, emitFlags, commentRange, containerPos, containerEnd, declarationListContainerEnd)

	// !!! Preserve comments from type annotation:
	// typeNode := node.Type()
	// if typeNode != nil {
	// 	p.emitTrailingCommentsOfNode(node, typeNode.Pos(), typeNode.End(), state)
	// }
}

func (p *Printer) emitCommentsBeforeToken(token ast.Kind, pos int, contextNode *ast.Node, flags tokenEmitFlags) (*commentState, int) {
	if flags&tefNoComments != 0 {
		return nil, pos
	}

	startPos := pos
	if p.currentSourceFile != nil {
		pos = scanner.SkipTrivia(p.currentSourceFile.Text(), startPos)
	}

	node := p.emitContext.ParseNode(contextNode)
	isSimilarNode := node != nil && node.Kind == contextNode.Kind
	if !isSimilarNode {
		return nil, pos
	}

	if contextNode.Pos() != startPos {
		indentLeading := flags&tefIndentLeadingComments != 0
		needsIndent := indentLeading && p.currentSourceFile != nil && !PositionsAreOnSameLine(startPos, pos, p.currentSourceFile)
		p.increaseIndentIf(needsIndent)
		p.emitLeadingComments(startPos, false /*elided*/)
		p.decreaseIndentIf(needsIndent)
	}

	return p.commentStatePool.New(), pos
}

func (p *Printer) emitCommentsAfterToken(token ast.Kind, pos int, contextNode *ast.Node, state *commentState) {
	if state == nil {
		return
	}

	if contextNode.End() != pos {
		isJsxExprContext := contextNode.Kind == ast.KindJsxExpression
		p.emitTrailingComments(pos, core.IfElse(isJsxExprContext, commentSeparatorNone, commentSeparatorBefore))
	}
}

func (p *Printer) emitDetachedCommentsBeforeStatementList(node *ast.Node, detachedRange core.TextRange) *commentState {
	if !p.shouldEmitDetachedComments(node) {
		return nil
	}

	emitFlags := p.emitContext.EmitFlags(node)
	containerPos := p.containerPos
	containerEnd := p.containerEnd
	declarationListContainerEnd := p.declarationListContainerEnd
	skipLeadingComments := ast.PositionIsSynthesized(detachedRange.Pos()) || emitFlags&EFNoLeadingComments != 0

	if !skipLeadingComments {
		p.emitDetachedCommentsAndUpdateCommentsInfo(detachedRange)
	}

	if emitFlags&EFNoNestedComments != 0 {
		p.commentsDisabled = true
	}

	return &commentState{emitFlags, detachedRange, containerPos, containerEnd, declarationListContainerEnd}
}

func (p *Printer) emitDetachedCommentsAfterStatementList(node *ast.Node, detachedRange core.TextRange, state *commentState) {
	if state == nil {
		return
	}

	emitFlags := state.emitFlags
	skipTrailingComments := p.commentsDisabled || ast.PositionIsSynthesized(detachedRange.End()) || emitFlags&EFNoTrailingComments != 0

	if !skipTrailingComments {
		hasWrittenComment := p.emitLeadingComments(detachedRange.End(), false /*elided*/)
		if hasWrittenComment && !p.writer.IsAtStartOfLine() {
			p.writeLine()
		}
	}
}

func (p *Printer) emitLeadingCommentsOfNode(node *ast.Node, emitFlags EmitFlags, commentRange core.TextRange) {
	pos := commentRange.Pos()
	end := commentRange.End()

	// Save current container state on the stack.
	if (!ast.PositionIsSynthesized(pos) || !ast.PositionIsSynthesized(end)) && pos != end {
		// We have to explicitly check that the node is JsxText because if the compilerOptions.jsx is "preserve" we will not do any transformation.
		// It is expensive to walk entire tree just to set one kind of node to have no comments.
		skipLeadingComments := ast.PositionIsSynthesized(pos) || emitFlags&EFNoLeadingComments != 0 || node.Kind == ast.KindJsxText
		skipTrailingComments := ast.PositionIsSynthesized(pos) || emitFlags&EFNoTrailingComments != 0 || node.Kind == ast.KindJsxText

		// Emit leading comments if the position is not synthesized and the node
		// has not opted out from emitting leading comments.
		if !skipLeadingComments {
			p.emitLeadingComments(pos, node.Kind == ast.KindNotEmittedStatement /*elided*/)
		}

		if !skipLeadingComments || (pos >= 0 && (emitFlags&EFNoLeadingComments) != 0) {
			// Advance the container position if comments get emitted or if they've been disabled explicitly using NoLeadingComments.
			p.containerPos = pos
		}

		if !skipTrailingComments || (end >= 0 && (emitFlags&EFNoTrailingComments) != 0) {
			// Advance the container end if comments get emitted or if they've been disabled explicitly using NoTrailingComments.
			p.containerEnd = end

			// To avoid invalid comment emit in a down-level binding pattern, we
			// keep track of the last declaration list container's end
			if node.Kind == ast.KindVariableDeclarationList {
				p.declarationListContainerEnd = end
			}
		}
	}
}

func (p *Printer) emitTrailingCommentsOfNode(node *ast.Node, emitFlags EmitFlags, commentRange core.TextRange, containerPos int, containerEnd int, declarationListContainerEnd int) {
	pos := commentRange.Pos()
	end := commentRange.End()
	skipTrailingComments := end < 0 || (emitFlags&EFNoTrailingComments) != 0 || node.Kind == ast.KindJsxText
	if (!ast.PositionIsSynthesized(pos) || !ast.PositionIsSynthesized(end)) && pos != end {
		// Restore previous container state.
		p.containerPos = containerPos
		p.containerEnd = containerEnd
		p.declarationListContainerEnd = declarationListContainerEnd

		// Emit trailing comments if the position is not synthesized and the node
		// has not opted out from emitting leading comments and is an emitted node.
		if !skipTrailingComments && node.Kind != ast.KindNotEmittedStatement {
			p.emitTrailingComments(end, commentSeparatorBefore)
		}
	}
}

func (p *Printer) emitLeadingSyntheticCommentsOfNode(node *ast.Node, emitFlags EmitFlags) {
	if emitFlags&EFNoLeadingComments != 0 {
		return
	}
	synth := p.emitContext.GetSyntheticLeadingComments(node)
	for _, c := range synth {
		p.emitLeadingSynthesizedComment(c)
	}
}

func (p *Printer) emitLeadingSynthesizedComment(comment SynthesizedComment) {
	if comment.HasLeadingNewLine || comment.Kind == ast.KindSingleLineCommentTrivia {
		p.writer.WriteLine()
	}
	p.writeSynthesizedComment(comment)
	if comment.HasTrailingNewLine || comment.Kind == ast.KindSingleLineCommentTrivia {
		p.writer.WriteLine()
	} else {
		p.writer.WriteSpace(" ")
	}
}

func (p *Printer) emitTrailingSyntheticCommentsOfNode(node *ast.Node, emitFlags EmitFlags) {
	if emitFlags&EFNoTrailingComments != 0 {
		return
	}
	synth := p.emitContext.GetSyntheticTrailingComments(node)
	for _, c := range synth {
		p.emitTrailingSynthesizedComment(c)
	}
}

func (p *Printer) emitTrailingSynthesizedComment(comment SynthesizedComment) {
	if !p.writer.IsAtStartOfLine() {
		p.writer.WriteSpace(" ")
	}
	p.writeSynthesizedComment(comment)
	if comment.HasTrailingNewLine {
		p.writer.WriteLine()
	}
}

func formatSynthesizedComment(comment SynthesizedComment) string {
	if comment.Kind == ast.KindMultiLineCommentTrivia {
		return "/*" + comment.Text + "*/"
	}
	return "//" + comment.Text
}

func (p *Printer) writeSynthesizedComment(comment SynthesizedComment) {
	text := formatSynthesizedComment(comment)
	var lineMap []core.TextPos
	if comment.Kind == ast.KindMultiLineCommentTrivia {
		lineMap = core.ComputeECMALineStarts(text)
	}
	p.writeCommentRangeWorker(text, lineMap, comment.Kind, core.NewTextRange(0, len(text)))
}

func (p *Printer) emitLeadingComments(pos int, elided bool) bool {
	// Emit the leading comments only if the container's pos doesn't match because the container should take care of emitting these comments
	if p.currentSourceFile == nil || ast.PositionIsSynthesized(pos) || pos == p.containerPos {
		return false
	}

	tripleSlash := core.TSUnknown
	if !elided {
		if pos == 0 && p.currentSourceFile != nil && p.currentSourceFile.IsDeclarationFile {
			tripleSlash = core.TSFalse
		}
	} else if pos == 0 {
		// If the node will not be emitted in JS, remove all the comments(normal, pinned and ///) associated with the node,
		// unless it is a triple slash comment at the top of the file.
		// For Example:
		//      /// <reference-path ...>
		//      declare var x;
		//      /// <reference-path ...>
		//      interface F {}
		//  The first /// will NOT be removed while the second one will be removed even though both node will not be emitted
		tripleSlash = core.TSTrue
	} else {
		return false
	}

	// skip detached comments
	if p.detachedCommentsInfo.Len() > 0 {
		if info := p.detachedCommentsInfo.Peek(); info.nodePos == pos {
			pos = p.detachedCommentsInfo.Pop().detachedCommentEndPos
		}
	}

	var comments []ast.CommentRange
	for comment := range scanner.GetLeadingCommentRanges(p.emitContext.Factory.AsNodeFactory(), p.currentSourceFile.Text(), pos) {
		if p.shouldWriteComment(comment) && p.shouldEmitCommentIfTripleSlash(comment, tripleSlash) {
			comments = append(comments, comment)
		}
	}

	if len(comments) > 0 && p.shouldEmitNewLineBeforeLeadingCommentOfPosition(pos, comments[0].Pos()) {
		p.writeLine()
	}

	// Leading comments are emitted as /*leading comment1*/space/*leading comment*/space
	return p.emitComments(comments, commentSeparatorAfter)
}

func (p *Printer) shouldEmitCommentIfTripleSlash(comment ast.CommentRange, tripleSlash core.Tristate) bool {
	switch tripleSlash {
	case core.TSTrue:
		return p.isTripleSlashComment(comment)
	case core.TSFalse:
		return !p.isTripleSlashComment(comment)
	default:
		return true
	}
}

func (p *Printer) shouldEmitNewLineBeforeLeadingCommentOfPosition(pos int, commentPos int) bool {
	// If the leading comments start on different line than the start of node, write new line
	return p.currentSourceFile != nil &&
		pos != commentPos &&
		scanner.ComputeLineOfPosition(p.currentSourceFile.ECMALineMap(), pos) != scanner.ComputeLineOfPosition(p.currentSourceFile.ECMALineMap(), commentPos)
}

func (p *Printer) emitTrailingComments(pos int, commentSeparator commentSeparator) {
	// Emit the trailing comments only if the container's end doesn't match because the container should take care of emitting these comments
	if p.currentSourceFile == nil || p.containerEnd != -1 && (pos == p.containerEnd || pos == p.declarationListContainerEnd) {
		return
	}

	var comments []ast.CommentRange
	for comment := range scanner.GetTrailingCommentRanges(p.emitContext.Factory.AsNodeFactory(), p.currentSourceFile.Text(), pos) {
		if p.shouldWriteComment(comment) {
			comments = append(comments, comment)
		}
	}

	// trailing comments are normally emitted as space/*trailing comment1*/space/*trailing comment2*/
	p.emitComments(comments, commentSeparator)
}

func (p *Printer) emitDetachedCommentsAndUpdateCommentsInfo(textRange core.TextRange) {
	if p.currentSourceFile == nil {
		return
	}
	if currentDetachedCommentInfo, ok := p.emitDetachedComments(textRange); ok {
		p.detachedCommentsInfo.Push(currentDetachedCommentInfo)
	}
}

func (p *Printer) emitDetachedComments(textRange core.TextRange) (result detachedCommentsInfo, hasResult bool) {
	if p.currentSourceFile == nil {
		return result, hasResult
	}

	text := p.currentSourceFile.Text()
	lineMap := p.currentSourceFile.ECMALineMap()

	var leadingComments []ast.CommentRange
	if p.commentsDisabled {
		// removeComments is true, only reserve pinned comment at the top of file
		// For example:
		//      /*! Pinned Comment */
		//
		//      var x = 10;
		if textRange.Pos() == 0 {
			for comment := range scanner.GetLeadingCommentRanges(p.emitContext.Factory.AsNodeFactory(), text, textRange.Pos()) {
				if IsPinnedComment(text, comment) {
					leadingComments = append(leadingComments, comment)
				}
			}
		}
	} else {
		// removeComments is false, just get detached as normal and bypass the process to filter comment
		leadingComments = slices.Collect(scanner.GetLeadingCommentRanges(p.emitContext.Factory.AsNodeFactory(), text, textRange.Pos()))
	}

	if len(leadingComments) > 0 {
		var detachedComments []ast.CommentRange
		var lastComment ast.CommentRange
		for i, comment := range leadingComments {
			if i > 0 {
				lastCommentLine := scanner.ComputeLineOfPosition(lineMap, lastComment.End())
				commentLine := scanner.ComputeLineOfPosition(lineMap, comment.Pos())

				if commentLine >= lastCommentLine+2 {
					// There was a blank line between the last comment and this comment.  This
					// comment is not part of the copyright comments.  Return what we have so
					// far.
					break
				}
			}

			if p.shouldWriteComment(comment) {
				detachedComments = append(detachedComments, comment)
			}

			lastComment = comment
		}

		if len(detachedComments) > 0 {
			// All comments look like they could have been part of the copyright header.  Make
			// sure there is at least one blank line between it and the node.  If not, it's not
			// a copyright header.
			lastCommentLine := scanner.ComputeLineOfPosition(lineMap, core.LastOrNil(detachedComments).End())
			nodeLine := scanner.ComputeLineOfPosition(lineMap, scanner.SkipTrivia(text, textRange.Pos()))
			if nodeLine >= lastCommentLine+2 {
				// Valid detachedComments

				if len(leadingComments) > 0 && p.shouldEmitNewLineBeforeLeadingCommentOfPosition(textRange.Pos(), leadingComments[0].Pos()) {
					p.writeLine()
				}

				p.emitComments(detachedComments, commentSeparatorAfter)
				result = detachedCommentsInfo{nodePos: textRange.Pos(), detachedCommentEndPos: core.LastOrNil(detachedComments).End()}
				hasResult = true
			}
		}
	}
	return result, hasResult
}

type commentSeparator uint32

const (
	commentSeparatorNone commentSeparator = iota
	commentSeparatorBefore
	commentSeparatorAfter
)

func (p *Printer) emitComments(comments []ast.CommentRange, commentSeparator commentSeparator) bool {
	interveningSeparator := false
	if len(comments) == 0 {
		return false
	}

	if commentSeparator == commentSeparatorBefore && !p.writer.IsAtStartOfLine() {
		p.writeSpace()
	}

	for _, comment := range comments {
		if interveningSeparator {
			p.writeSpace()
			interveningSeparator = false
		}

		p.emitComment(comment)

		if comment.Kind == ast.KindSingleLineCommentTrivia || comment.HasTrailingNewLine && commentSeparator != commentSeparatorNone {
			p.writeLine()
		} else {
			interveningSeparator = commentSeparator != commentSeparatorNone
		}
	}

	if interveningSeparator && commentSeparator == commentSeparatorAfter && !p.writer.IsAtStartOfLine() {
		p.writeSpace()
	}

	return true
}

func (p *Printer) emitComment(comment ast.CommentRange) {
	p.emitPos(comment.Pos())
	p.writeCommentRange(comment)
	p.emitPos(comment.End())
}

func (p *Printer) isTripleSlashComment(comment ast.CommentRange) bool {
	return p.currentSourceFile != nil &&
		IsRecognizedTripleSlashComment(p.currentSourceFile.Text(), comment)
}

//
// Source Maps
//

func (p *Printer) setSourceMapSource(source sourcemap.Source) {
	if p.sourceMapsDisabled {
		return
	}

	p.sourceMapSource = source
	p.sourceMapLineCharCache = newLineCharacterCache(source)
	if p.mostRecentSourceMapSource == source {
		p.sourceMapSourceIndex = p.mostRecentSourceMapSourceIndex
		return
	}

	p.sourceMapSourceIsJson = tspath.FileExtensionIs(source.FileName(), tspath.ExtensionJson)
	if p.sourceMapSourceIsJson {
		return
	}

	p.sourceMapSourceIndex = p.sourceMapGenerator.AddSource(source.FileName())
	if p.Options.InlineSources {
		if err := p.sourceMapGenerator.SetSourceContent(p.sourceMapSourceIndex, source.Text()); err != nil {
			panic(err)
		}
	}

	p.mostRecentSourceMapSource = source
	p.mostRecentSourceMapSourceIndex = p.sourceMapSourceIndex
}

func (p *Printer) emitPos(pos int) {
	if p.sourceMapsDisabled || p.sourceMapSource == nil || p.sourceMapGenerator == nil || p.sourceMapSourceIsJson || ast.PositionIsSynthesized(pos) {
		return
	}

	sourceLine, sourceCharacter := p.sourceMapLineCharCache.getLineAndCharacter(pos)
	if err := p.sourceMapGenerator.AddSourceMapping(
		p.writer.GetLine(),
		p.writer.GetColumn(),
		p.sourceMapSourceIndex,
		sourceLine,
		sourceCharacter,
	); err != nil {
		panic(err)
	}
}

// TODO: Support emitting nameIndex for source maps
////func (p *Printer) emitPosName(pos int, name string) {
////	if p.sourceMapsDisabled || p.sourceMapSource == nil || p.sourceMapGenerator == nil || p.sourceMapSourceIsJson || ast.PositionIsSynthesized(pos) {
////		return
////	}
////
////	sourceLine, sourceCharacter := scanner.GetLineAndCharacterOfPosition(p.sourceMapSource, pos)
////	nameIndex := p.sourceMapGenerator.AddName(name)
////	if err := p.sourceMapGenerator.AddNamedSourceMapping(
////		p.writer.GetLine(),
////		p.writer.GetColumn(),
////		p.sourceMapSourceIndex,
////		sourceLine,
////		sourceCharacter,
////		nameIndex,
////	); err != nil {
////		panic(err)
////	}
////}

func (p *Printer) emitSourcePos(source sourcemap.Source, pos int) {
	if source != p.sourceMapSource {
		savedSourceMapSource := p.sourceMapSource
		savedSourceMapSourceIndex := p.sourceMapSourceIndex
		savedSourceMapLineCharCache := p.sourceMapLineCharCache
		p.setSourceMapSource(source)
		p.emitPos(pos)
		p.sourceMapSource = savedSourceMapSource
		p.sourceMapSourceIndex = savedSourceMapSourceIndex
		p.sourceMapLineCharCache = savedSourceMapLineCharCache
	} else {
		p.emitPos(pos)
	}
}

// TODO: Support emitting nameIndex for source maps
////func (p *Printer) emitSourcePosName(source sourcemap.Source, pos int, name string) {
////	if source != p.sourceMapSource {
////		savedSourceMapSource := p.sourceMapSource
////		savedSourceMapSourceIndex := p.sourceMapSourceIndex
////		p.setSourceMapSource(source)
////		p.emitPosName(pos, name)
////		p.sourceMapSource = savedSourceMapSource
////		p.sourceMapSourceIndex = savedSourceMapSourceIndex
////	} else {
////		p.emitPosName(pos, name)
////	}
////}

func (p *Printer) emitSourceMapsBeforeNode(node *ast.Node) *sourceMapState {
	if !p.shouldEmitSourceMaps(node) {
		return nil
	}

	emitFlags := p.emitContext.EmitFlags(node)
	loc := p.emitContext.SourceMapRange(node)

	if !ast.IsNotEmittedStatement(node) &&
		emitFlags&EFNoLeadingSourceMap == 0 &&
		!ast.PositionIsSynthesized(loc.Pos()) {
		p.emitSourcePos(p.sourceMapSource, scanner.SkipTrivia(p.currentSourceFile.Text(), loc.Pos())) // !!! support SourceMapRange from Strada?
	}

	if emitFlags&EFNoNestedSourceMaps != 0 {
		p.sourceMapsDisabled = true
	}

	state := p.sourceMapStatePool.New()
	*state = sourceMapState{emitFlags, loc, false}
	return state
}

func (p *Printer) emitSourceMapsAfterNode(node *ast.Node, previousState *sourceMapState) {
	if previousState == nil {
		return
	}

	emitFlags := previousState.emitFlags
	loc := previousState.sourceMapRange

	if emitFlags&EFNoNestedSourceMaps != 0 {
		p.sourceMapsDisabled = false
	}

	if !ast.IsNotEmittedStatement(node) &&
		emitFlags&EFNoTrailingSourceMap == 0 &&
		!ast.PositionIsSynthesized(loc.End()) {
		p.emitSourcePos(p.sourceMapSource, loc.End()) // !!! support SourceMapRange from Strada?
	}
}

func (p *Printer) emitSourceMapsBeforeToken(token ast.Kind, pos int, contextNode *ast.Node, flags tokenEmitFlags) *sourceMapState {
	if !p.shouldEmitTokenSourceMaps(token, pos, contextNode, flags) {
		return nil
	}

	emitFlags := p.emitContext.EmitFlags(contextNode)
	loc, hasLoc := p.emitContext.TokenSourceMapRange(contextNode, token)
	if emitFlags&EFNoTokenLeadingSourceMaps == 0 {
		if hasLoc {
			pos = loc.Pos()
		}
		if pos >= 0 {
			p.emitSourcePos(p.sourceMapSource, pos) // !!! support SourceMapRange from Strada?
		}
	}

	state := p.sourceMapStatePool.New()
	*state = sourceMapState{emitFlags, loc, hasLoc}
	return state
}

func (p *Printer) emitSourceMapsAfterToken(token ast.Kind, pos int, contextNode *ast.Node, previousState *sourceMapState) {
	if previousState == nil {
		return
	}

	emitFlags := previousState.emitFlags
	loc := previousState.sourceMapRange
	hasLoc := previousState.hasTokenSourceMapRange
	if emitFlags&EFNoTokenTrailingSourceMaps == 0 {
		if hasLoc {
			pos = loc.End()
		}
		if pos >= 0 {
			p.emitSourcePos(p.sourceMapSource, pos) // !!! support SourceMapRange from Strada?
		}
	}
}

//
// Name Generation
//

func (p *Printer) shouldReuseTempVariableScope(node *ast.Node) bool {
	return node != nil && p.emitContext.EmitFlags(node)&EFReuseTempVariableScope != 0
}

func (p *Printer) pushNameGenerationScope(node *ast.Node) {
	p.nameGenerator.PushScope(p.shouldReuseTempVariableScope(node))
}

func (p *Printer) popNameGenerationScope(node *ast.Node) {
	p.nameGenerator.PopScope(p.shouldReuseTempVariableScope(node))
}

func (p *Printer) generateAllNames(nodes *ast.NodeList) {
	if nodes == nil {
		return
	}
	for _, node := range nodes.Nodes {
		p.generateNames(node)
	}
}

func (p *Printer) generateNames(node *ast.Node) {
	if node == nil {
		return
	}

	switch node.Kind {
	case ast.KindBlock, ast.KindCaseClause, ast.KindDefaultClause:
		p.generateAllNames(node.StatementList())
	case ast.KindLabeledStatement, ast.KindWithStatement, ast.KindDoStatement, ast.KindWhileStatement:
		p.generateNames(node.Statement())
	case ast.KindIfStatement:
		p.generateNames(node.AsIfStatement().ThenStatement)
		p.generateNames(node.AsIfStatement().ElseStatement)
	case ast.KindForStatement, ast.KindForOfStatement, ast.KindForInStatement:
		p.generateNames(node.Initializer())
		p.generateNames(node.Statement())
	case ast.KindSwitchStatement:
		p.generateNames(node.AsSwitchStatement().CaseBlock)
	case ast.KindCaseBlock:
		p.generateAllNames(node.AsCaseBlock().Clauses)
	case ast.KindTryStatement:
		p.generateNames(node.AsTryStatement().TryBlock)
		p.generateNames(node.AsTryStatement().CatchClause)
		p.generateNames(node.AsTryStatement().FinallyBlock)
	case ast.KindCatchClause:
		p.generateNames(node.AsCatchClause().VariableDeclaration)
		p.generateNames(node.AsCatchClause().Block)
	case ast.KindVariableStatement:
		p.generateNames(node.AsVariableStatement().DeclarationList)
	case ast.KindVariableDeclarationList:
		p.generateAllNames(node.AsVariableDeclarationList().Declarations)
	case ast.KindVariableDeclaration, ast.KindParameter, ast.KindBindingElement, ast.KindClassDeclaration:
		p.generateNameIfNeeded(node.Name())
	case ast.KindFunctionDeclaration:
		p.generateNameIfNeeded(node.Name())
		if p.shouldReuseTempVariableScope(node) {
			p.generateAllNames(node.AsFunctionDeclaration().Parameters)
			p.generateNames(node.AsFunctionDeclaration().Body)
		}
	case ast.KindObjectBindingPattern, ast.KindArrayBindingPattern:
		p.generateAllNames(node.ElementList())
	case ast.KindImportDeclaration, ast.KindJSImportDeclaration:
		p.generateNames(node.AsImportDeclaration().ImportClause)
	case ast.KindImportClause:
		p.generateNameIfNeeded(node.AsImportClause().Name())
		p.generateNames(node.AsImportClause().NamedBindings)
	case ast.KindNamespaceImport, ast.KindNamespaceExport:
		p.generateNameIfNeeded(node.Name())
	case ast.KindNamedImports:
		p.generateAllNames(node.ElementList())
	case ast.KindImportSpecifier:
		n := node.AsImportSpecifier()
		if n.PropertyName != nil {
			p.generateNameIfNeeded(n.PropertyName)
		} else {
			p.generateNameIfNeeded(n.Name())
		}
	}
}

func (p *Printer) generateAllMemberNames(nodes *ast.NodeList) {
	if nodes == nil {
		return
	}
	for _, node := range nodes.Nodes {
		p.generateMemberNames(node)
	}
}

func (p *Printer) generateMemberNames(node *ast.Node) {
	if node == nil {
		return
	}
	switch node.Kind {
	case ast.KindPropertyAssignment,
		ast.KindShorthandPropertyAssignment,
		ast.KindPropertyDeclaration,
		ast.KindPropertySignature,
		ast.KindMethodDeclaration,
		ast.KindMethodSignature,
		ast.KindGetAccessor,
		ast.KindSetAccessor:
		p.generateNameIfNeeded(node.Name())
	}
}

func (p *Printer) generateNameIfNeeded(name *ast.DeclarationName) {
	if name != nil {
		if ast.IsMemberName(name) {
			p.generateName(name)
		} else if ast.IsBindingPattern(name) {
			p.generateNames(name)
		}
	}
}

// Generate the text for a generated identifier or private identifier
func (p *Printer) generateName(name *ast.MemberName) {
	_ = p.nameGenerator.GenerateName(name)
}

// Returns a value indicating whether a name is unique globally or within the current file.
func (p *Printer) isFileLevelUniqueNameInCurrentFile(name string, _ bool) bool {
	if p.currentSourceFile != nil {
		return IsFileLevelUniqueName(p.currentSourceFile, name, p.HasGlobalName)
	} else {
		return true
	}
}

//
// Scoped operations
//

func (p *Printer) enterNode(node *ast.Node) printerState {
	state := printerState{}

	if p.OnBeforeEmitNode != nil {
		p.OnBeforeEmitNode(node)
	}

	state.commentState = p.emitCommentsBeforeNode(node)
	state.sourceMapState = p.emitSourceMapsBeforeNode(node)
	return state
}

func (p *Printer) exitNode(node *ast.Node, previousState printerState) {
	p.emitSourceMapsAfterNode(node, previousState.sourceMapState)
	p.emitCommentsAfterNode(node, previousState.commentState)

	if p.OnAfterEmitNode != nil {
		p.OnAfterEmitNode(node)
	}
}

func (p *Printer) enterTokenNode(node *ast.Node, flags tokenEmitFlags) printerState {
	state := printerState{}

	if p.OnBeforeEmitToken != nil {
		p.OnBeforeEmitToken(node)
	}

	if flags&tefNoComments == 0 {
		state.commentState = p.emitCommentsBeforeNode(node)
	}
	if flags&tefNoSourceMaps == 0 {
		state.sourceMapState = p.emitSourceMapsBeforeNode(node)
	}
	return state
}

func (p *Printer) exitTokenNode(node *ast.Node, previousState printerState) {
	p.emitSourceMapsAfterNode(node, previousState.sourceMapState)
	p.emitCommentsAfterNode(node, previousState.commentState)

	if p.OnAfterEmitToken != nil {
		p.OnAfterEmitToken(node)
	}
}

type tokenEmitFlags uint32

const (
	tefNoComments tokenEmitFlags = 1 << iota
	tefIndentLeadingComments
	tefNoSourceMaps

	tefNone tokenEmitFlags = 0
)

func (p *Printer) enterToken(token ast.Kind, pos int, contextNode *ast.Node, flags tokenEmitFlags) (printerState, int) {
	state := printerState{}
	state.commentState, pos = p.emitCommentsBeforeToken(token, pos, contextNode, flags)
	state.sourceMapState = p.emitSourceMapsBeforeToken(token, pos, contextNode, flags)
	return state, pos
}

func (p *Printer) exitToken(token ast.Kind, pos int, contextNode *ast.Node, previousState printerState) {
	p.emitSourceMapsAfterToken(token, pos, contextNode, previousState.sourceMapState)
	p.emitCommentsAfterToken(token, pos, contextNode, previousState.commentState)
}

type ListFormat int

const (
	LFNone ListFormat = 0

	// Line separators
	LFSingleLine    ListFormat = 0      // Prints the list on a single line (default).
	LFMultiLine     ListFormat = 1 << 0 // Prints the list on multiple lines.
	LFPreserveLines ListFormat = 1 << 1 // Prints the list using line preservation if possible.
	LFLinesMask     ListFormat = LFSingleLine | LFMultiLine | LFPreserveLines

	// Delimiters
	LFNotDelimited       ListFormat = 0      // There is no delimiter between list items (default).
	LFBarDelimited       ListFormat = 1 << 2 // Each list item is space-and-bar (" |") delimited.
	LFAmpersandDelimited ListFormat = 1 << 3 // Each list item is space-and-ampersand (" &") delimited.
	LFCommaDelimited     ListFormat = 1 << 4 // Each list item is comma (",") delimited.
	LFAsteriskDelimited  ListFormat = 1 << 5 // Each list item is asterisk ("\n *") delimited, used with JSDoc.
	LFDelimitersMask     ListFormat = LFBarDelimited | LFAmpersandDelimited | LFCommaDelimited | LFAsteriskDelimited

	LFAllowTrailingComma ListFormat = 1 << 6 // Write a trailing comma (",") if present.

	// Whitespace
	LFIndented             ListFormat = 1 << 7 // The list should be indented.
	LFSpaceBetweenBraces   ListFormat = 1 << 8 // Inserts a space after the opening brace and before the closing brace.
	LFSpaceBetweenSiblings ListFormat = 1 << 9 // Inserts a space between each sibling node.

	// Brackets/Braces
	LFBraces         ListFormat = 1 << 10 // The list is surrounded by "{" and "}".
	LFParenthesis    ListFormat = 1 << 11 // The list is surrounded by "(" and ")".
	LFAngleBrackets  ListFormat = 1 << 12 // The list is surrounded by "<" and ">".
	LFSquareBrackets ListFormat = 1 << 13 // The list is surrounded by "[" and "]".
	LFBracketsMask   ListFormat = LFBraces | LFParenthesis | LFAngleBrackets | LFSquareBrackets

	LFOptionalIfNil   ListFormat = 1 << 14 // Do not emit brackets if the list is nil.
	LFOptionalIfEmpty ListFormat = 1 << 15 // Do not emit brackets if the list is empty.
	LFOptional        ListFormat = LFOptionalIfNil | LFOptionalIfEmpty

	// Other
	LFPreferNewLine         ListFormat = 1 << 16 // Prefer adding a LineTerminator between synthesized nodes.
	LFNoTrailingNewLine     ListFormat = 1 << 17 // Do not emit a trailing NewLine for a MultiLine list.
	LFNoInterveningComments ListFormat = 1 << 18 // Do not emit comments between each node
	LFNoSpaceIfEmpty        ListFormat = 1 << 19 // If the literal is empty, do not add spaces between braces.
	LFSingleElement         ListFormat = 1 << 20
	LFSpaceAfterList        ListFormat = 1 << 21 // Add space after list

	// Precomputed Formats
	LFModifiers                    ListFormat = LFSingleLine | LFSpaceBetweenSiblings | LFNoInterveningComments | LFSpaceAfterList
	LFHeritageClauses              ListFormat = LFSingleLine | LFSpaceBetweenSiblings
	LFSingleLineTypeLiteralMembers ListFormat = LFSingleLine | LFSpaceBetweenBraces | LFSpaceBetweenSiblings
	LFMultiLineTypeLiteralMembers  ListFormat = LFMultiLine | LFIndented | LFOptionalIfEmpty

	LFSingleLineTupleTypeElements       ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine
	LFMultiLineTupleTypeElements        ListFormat = LFCommaDelimited | LFIndented | LFSpaceBetweenSiblings | LFMultiLine
	LFUnionTypeConstituents             ListFormat = LFBarDelimited | LFSpaceBetweenSiblings | LFSingleLine
	LFIntersectionTypeConstituents      ListFormat = LFAmpersandDelimited | LFSpaceBetweenSiblings | LFSingleLine
	LFObjectBindingPatternElements      ListFormat = LFSingleLine | LFAllowTrailingComma | LFSpaceBetweenBraces | LFCommaDelimited | LFSpaceBetweenSiblings | LFNoSpaceIfEmpty
	LFArrayBindingPatternElements       ListFormat = LFSingleLine | LFAllowTrailingComma | LFCommaDelimited | LFSpaceBetweenSiblings | LFNoSpaceIfEmpty
	LFObjectLiteralExpressionProperties ListFormat = LFPreserveLines | LFCommaDelimited | LFSpaceBetweenSiblings | LFSpaceBetweenBraces | LFIndented | LFBraces | LFNoSpaceIfEmpty
	LFImportAttributes                  ListFormat = LFPreserveLines | LFCommaDelimited | LFSpaceBetweenSiblings | LFSpaceBetweenBraces | LFIndented | LFBraces | LFNoSpaceIfEmpty
	LFArrayLiteralExpressionElements    ListFormat = LFPreserveLines | LFCommaDelimited | LFSpaceBetweenSiblings | LFAllowTrailingComma | LFIndented | LFSquareBrackets
	LFCommaListElements                 ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine
	LFCallExpressionArguments           ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFParenthesis
	LFNewExpressionArguments            ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFParenthesis | LFOptionalIfNil
	LFTemplateExpressionSpans           ListFormat = LFSingleLine | LFNoInterveningComments
	LFSingleLineBlockStatements         ListFormat = LFSpaceBetweenBraces | LFSpaceBetweenSiblings | LFSingleLine
	LFMultiLineBlockStatements          ListFormat = LFIndented | LFMultiLine
	LFVariableDeclarationList           ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine
	LFSingleLineFunctionBodyStatements  ListFormat = LFSingleLine | LFSpaceBetweenSiblings | LFSpaceBetweenBraces
	LFMultiLineFunctionBodyStatements   ListFormat = LFMultiLine
	LFClassHeritageClauses              ListFormat = LFSingleLine
	LFClassMembers                      ListFormat = LFIndented | LFMultiLine
	LFInterfaceMembers                  ListFormat = LFIndented | LFMultiLine
	LFEnumMembers                       ListFormat = LFCommaDelimited | LFIndented | LFMultiLine
	LFCaseBlockClauses                  ListFormat = LFIndented | LFMultiLine
	LFNamedImportsOrExportsElements     ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFAllowTrailingComma | LFSingleLine | LFSpaceBetweenBraces | LFNoSpaceIfEmpty
	LFJsxElementOrFragmentChildren      ListFormat = LFSingleLine | LFNoInterveningComments
	LFJsxElementAttributes              ListFormat = LFSingleLine | LFSpaceBetweenSiblings | LFNoInterveningComments
	LFCaseOrDefaultClauseStatements     ListFormat = LFIndented | LFMultiLine | LFNoTrailingNewLine | LFOptionalIfEmpty
	LFHeritageClauseTypes               ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine
	LFSourceFileStatements              ListFormat = LFMultiLine | LFNoTrailingNewLine
	LFDecorators                        ListFormat = LFMultiLine | LFOptional | LFSpaceAfterList
	LFTypeArguments                     ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFAngleBrackets | LFOptional
	LFTypeParameters                    ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFAngleBrackets | LFOptional
	LFParameters                        ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFParenthesis
	LFSingleArrowParameter              ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine
	LFIndexSignatureParameters          ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFIndented | LFSquareBrackets
	LFJSDocComment                      ListFormat = LFMultiLine | LFAsteriskDelimited
	LFImportClauseEntries               ListFormat = LFImportAttributes // Deprecated: Use LFImportAttributes
)

func getOpeningBracket(format ListFormat) string {
	switch format & LFBracketsMask {
	case LFBraces:
		return "{"
	case LFParenthesis:
		return "("
	case LFAngleBrackets:
		return "<"
	case LFSquareBrackets:
		return "["
	default:
		panic(fmt.Sprintf("Unexpected bracket: %v", format&LFBracketsMask))
	}
}

func getClosingBracket(format ListFormat) string {
	switch format & LFBracketsMask {
	case LFBraces:
		return "}"
	case LFParenthesis:
		return ")"
	case LFAngleBrackets:
		return ">"
	case LFSquareBrackets:
		return "]"
	default:
		panic(fmt.Sprintf("Unexpected bracket: %v", format&LFBracketsMask))
	}
}
