package format

import (
	"iter"
	"slices"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

func GetIndentationForNode(n *ast.Node, ignoreActualIndentationRange *core.TextRange, sourceFile *ast.SourceFile, options *lsutil.FormatCodeSettings) int {
	startline, startpos := scanner.GetECMALineAndByteOffsetOfPosition(sourceFile, scanner.GetTokenPosOfNode(n, sourceFile, false))
	return getIndentationForNodeWorker(n, startline, startpos, ignoreActualIndentationRange /*indentationDelta*/, 0, sourceFile /*isNextChild*/, false, options)
}

// GetIndentation computes the expected indentation for a position in a source file.
// This is the Go port of SmartIndenter.getIndentation from TypeScript.
func GetIndentation(position int, sourceFile *ast.SourceFile, options *lsutil.FormatCodeSettings, assumeNewLineBeforeCloseBrace bool) int {
	if position > len(sourceFile.Text()) {
		return options.BaseIndentSize // past EOF
	}

	// no indentation when the indent style is set to none,
	// so we can return fast
	if options.IndentStyle == lsutil.IndentStyleNone {
		return 0
	}

	precedingToken := astnav.FindPrecedingTokenEx(sourceFile, position, nil /*startNode*/, true /*excludeJSDoc*/)

	enclosingCommentRange := getRangeOfEnclosingComment(sourceFile, position, precedingToken)
	if enclosingCommentRange != nil && enclosingCommentRange.Kind == ast.KindMultiLineCommentTrivia {
		return getCommentIndent(sourceFile, position, options, enclosingCommentRange)
	}

	if precedingToken == nil {
		return options.BaseIndentSize
	}

	// no indentation in string/regex/template literals
	if isStringOrRegularExpressionOrTemplateLiteral(precedingToken.Kind) {
		tokenStart := scanner.GetTokenPosOfNode(precedingToken, sourceFile, false)
		if tokenStart <= position && position < precedingToken.End() {
			return 0
		}
	}

	lineAtPosition := scanner.GetECMALineOfPosition(sourceFile, position)

	// indentation is first non-whitespace character in a previous line
	// for block indentation, we should look for a line which contains something that's not
	// whitespace.
	currentToken := astnav.GetTokenAtPosition(sourceFile, position)
	// For object literals, we want indentation to work just like with blocks.
	// If the `{` starts in any position (even in the middle of a line), then
	// the following indentation should treat `{` as the start of that line (including leading whitespace).
	// ```
	//     const a: { x: undefined, y: undefined } = {}       // leading 4 whitespaces and { starts in the middle of line
	// ->
	//     const a: { x: undefined, y: undefined } = {
	//         x: undefined,
	//         y: undefined,
	//     }
	// ---------------------
	//     const a: {x : undefined, y: undefined } =
	//      {}
	// ->
	//     const a: { x: undefined, y: undefined } =
	//      {                                                  // leading 5 whitespaces and { starts at 6 column
	//          x: undefined,
	//          y: undefined,
	//      }
	// ```
	isObjectLiteral := currentToken.Kind == ast.KindOpenBraceToken && currentToken.Parent != nil && currentToken.Parent.Kind == ast.KindObjectLiteralExpression
	if options.IndentStyle == lsutil.IndentStyleBlock || isObjectLiteral {
		return getBlockIndent(sourceFile, position, options)
	}

	if precedingToken.Kind == ast.KindCommaToken && precedingToken.Parent != nil && precedingToken.Parent.Kind != ast.KindBinaryExpression {
		// previous token is comma that separates items in list - find the previous item and try to derive indentation from it
		actualIndentation := getActualIndentationForListItemBeforeComma(precedingToken, sourceFile, options)
		if actualIndentation != -1 {
			return actualIndentation
		}
	}

	containerList := getListByPosition(position, precedingToken.Parent, sourceFile)
	// use list position if the preceding token is before any list items
	if containerList != nil && !precedingToken.Loc.ContainedBy(containerList.Loc) {
		useTheSameBaseIndentation := currentToken.Parent != nil && (currentToken.Parent.Kind == ast.KindFunctionExpression || currentToken.Parent.Kind == ast.KindArrowFunction)
		indentSize := 0
		if !useTheSameBaseIndentation {
			indentSize = options.IndentSize
		}
		res := getActualIndentationForListStartLine(containerList, sourceFile, options)
		if res == -1 {
			return indentSize
		}
		return res + indentSize
	}

	return getSmartIndent(sourceFile, position, precedingToken, lineAtPosition, assumeNewLineBeforeCloseBrace, options)
}

func getCommentIndent(sourceFile *ast.SourceFile, position int, options *lsutil.FormatCodeSettings, enclosingCommentRange *ast.CommentRange) int {
	previousLine := scanner.GetECMALineOfPosition(sourceFile, position) - 1
	commentStartLine := scanner.GetECMALineOfPosition(sourceFile, enclosingCommentRange.Pos())

	debug.Assert(commentStartLine >= 0, "commentStartLine >= 0")

	if previousLine <= commentStartLine {
		lineStarts := scanner.GetECMALineStarts(sourceFile)
		return FindFirstNonWhitespaceColumn(int(lineStarts[commentStartLine]), position, sourceFile, options)
	}

	lineStarts := scanner.GetECMALineStarts(sourceFile)
	startPositionOfLine := int(lineStarts[previousLine])
	character, column := findFirstNonWhitespaceCharacterAndColumn(startPositionOfLine, position, sourceFile, options)

	if column == 0 {
		return column
	}

	firstNonWhitespaceCharacterCode := sourceFile.Text()[startPositionOfLine+character]
	if firstNonWhitespaceCharacterCode == '*' {
		return column - 1
	}
	return column
}

func getLeadingCommentRangesOfNode(node *ast.Node, file *ast.SourceFile) iter.Seq[ast.CommentRange] {
	if node.Kind == ast.KindJsxText {
		return nil
	}
	return scanner.GetLeadingCommentRanges(&ast.NodeFactory{}, file.Text(), node.Pos())
}

func getRangeOfEnclosingComment(
	sourceFile *ast.SourceFile,
	position int,
	precedingToken *ast.Node,
) *ast.CommentRange {
	tokenAtPosition := astnav.GetTokenAtPosition(sourceFile, position)
	jsdoc := ast.FindAncestor(tokenAtPosition, (*ast.Node).IsJSDoc)
	if jsdoc != nil {
		tokenAtPosition = jsdoc.Parent
	}
	tokenStart := astnav.GetStartOfNode(tokenAtPosition, sourceFile, false /*includeJSDoc*/)
	if tokenStart <= position && position < tokenAtPosition.End() {
		return nil
	}

	// Between two consecutive tokens, all comments are either trailing on the former
	// or leading on the latter (and none are in both lists).
	var trailingRangesOfPreviousToken iter.Seq[ast.CommentRange]
	if precedingToken != nil {
		trailingRangesOfPreviousToken = scanner.GetTrailingCommentRanges(&ast.NodeFactory{}, sourceFile.Text(), precedingToken.End())
	}
	leadingRangesOfNextToken := getLeadingCommentRangesOfNode(tokenAtPosition, sourceFile)
	commentRanges := core.ConcatenateSeq(trailingRangesOfPreviousToken, leadingRangesOfNextToken)
	for commentRange := range commentRanges {
		if commentRange.ContainsExclusive(position) ||
			position == commentRange.End() &&
				(commentRange.Kind == ast.KindSingleLineCommentTrivia || position == len(sourceFile.Text())) {
			return &commentRange
		}
	}
	return nil
}

func getBlockIndent(sourceFile *ast.SourceFile, position int, options *lsutil.FormatCodeSettings) int {
	// move backwards until we find a line with a non-whitespace character,
	// then find the first non-whitespace character for that line.
	current := position
	for current > 0 {
		ch, size := utf8.DecodeRuneInString(sourceFile.Text()[current:])
		if !stringutil.IsWhiteSpaceLike(ch) {
			break
		}
		current -= size
	}

	lineStart := GetLineStartPositionForPosition(current, sourceFile)
	return FindFirstNonWhitespaceColumn(lineStart, current, sourceFile, options)
}

func getActualIndentationForListItemBeforeComma(commaToken *ast.Node, sourceFile *ast.SourceFile, options *lsutil.FormatCodeSettings) int {
	// previous token is comma that separates items in list - find the previous item and try to derive indentation from it
	if commaToken.Parent == nil {
		return -1
	}
	containingList := GetContainingList(commaToken, sourceFile)
	if containingList == nil {
		return -1
	}
	commaIndex := core.FindIndex(containingList.Nodes, func(n *ast.Node) bool { return n == commaToken })
	if commaIndex > 0 {
		return deriveActualIndentationFromList(containingList, commaIndex-1, sourceFile, options)
	}
	return -1
}

type nextTokenKind int

const (
	nextTokenKindUnknown    nextTokenKind = 0
	nextTokenKindOpenBrace  nextTokenKind = 1
	nextTokenKindCloseBrace nextTokenKind = 2
)

func nextTokenIsCurlyBraceOnSameLineAsCursor(precedingToken *ast.Node, current *ast.Node, lineAtPosition int, sourceFile *ast.SourceFile) nextTokenKind {
	nextToken := astnav.FindNextToken(precedingToken, current, sourceFile)
	if nextToken == nil {
		return nextTokenKindUnknown
	}

	if nextToken.Kind == ast.KindOpenBraceToken {
		// open braces are always indented at the parent level
		return nextTokenKindOpenBrace
	} else if nextToken.Kind == ast.KindCloseBraceToken {
		// close braces are indented at the parent level if they are located on the same line with cursor
		nextTokenStartLine := getStartLineForNode(nextToken, sourceFile)
		if lineAtPosition == nextTokenStartLine {
			return nextTokenKindCloseBrace
		}
		return nextTokenKindUnknown
	}

	return nextTokenKindUnknown
}

func getSmartIndent(sourceFile *ast.SourceFile, position int, precedingToken *ast.Node, lineAtPosition int, assumeNewLineBeforeCloseBrace bool, options *lsutil.FormatCodeSettings) int {
	// try to find node that can contribute to indentation and includes 'position' starting from 'precedingToken'
	// if such node is found - compute initial indentation for 'position' inside this node
	var previous *ast.Node
	current := precedingToken

	for current != nil {
		if lsutil.PositionBelongsToNode(current, position, sourceFile) && ShouldIndentChildNode(options, current, previous, sourceFile, true) {
			currentStartLine, currentStartChar := getStartLineAndCharacterForNode(current, sourceFile)
			ntk := nextTokenIsCurlyBraceOnSameLineAsCursor(precedingToken, current, lineAtPosition, sourceFile)
			var indentationDelta int
			if ntk != nextTokenKindUnknown {
				// handle cases when codefix is about to be inserted before the close brace
				if assumeNewLineBeforeCloseBrace && ntk == nextTokenKindCloseBrace {
					indentationDelta = options.IndentSize
				}
				// else 0
			} else {
				if lineAtPosition != currentStartLine {
					indentationDelta = options.IndentSize
				}
			}
			return getIndentationForNodeWorker(current, currentStartLine, currentStartChar, nil, indentationDelta, sourceFile, true, options)
		}

		// check if current node is a list item - if yes, take indentation from it
		// do not consider parent-child line sharing yet:
		// function foo(a
		//    | preceding node 'a' does share line with its parent but indentation is expected
		actualIndentation := getActualIndentationForListItem(current, sourceFile, options, true /*listIndentsChild*/)
		if actualIndentation != -1 {
			return actualIndentation
		}

		previous = current
		current = current.Parent
	}
	// no parent was found - return the base indentation of the SourceFile
	return options.BaseIndentSize
}

func getIndentationForNodeWorker(
	current *ast.Node,
	currentStartLine int,
	currentStartCharacter int,
	ignoreActualIndentationRange *core.TextRange,
	indentationDelta int,
	sourceFile *ast.SourceFile,
	isNextChild bool,
	options *lsutil.FormatCodeSettings,
) int {
	parent := current.Parent

	// Walk up the tree and collect indentation for parent-child node pairs. Indentation is not added if
	// * parent and child nodes start on the same line, or
	// * parent is an IfStatement and child starts on the same line as an 'else clause'.
	for parent != nil {
		useActualIndentation := true
		if ignoreActualIndentationRange != nil {
			start := scanner.GetTokenPosOfNode(current, sourceFile, false)
			useActualIndentation = start < ignoreActualIndentationRange.Pos() || start > ignoreActualIndentationRange.End()
		}

		containingListOrParentStartLine, containingListOrParentStartCharacter := getContainingListOrParentStart(parent, current, sourceFile)
		parentAndChildShareLine := containingListOrParentStartLine == currentStartLine ||
			childStartsOnTheSameLineWithElseInIfStatement(parent, current, currentStartLine, sourceFile)

		if useActualIndentation {
			// check if current node is a list item - if yes, take indentation from it
			var firstListChild *ast.Node
			containerList := GetContainingList(current, sourceFile)
			if containerList != nil {
				firstListChild = core.FirstOrNil(containerList.Nodes)
			}
			// A list indents its children if the children begin on a later line than the list itself:
			//
			// f1(               L0 - List start
			//   {               L1 - First child start: indented, along with all other children
			//     prop: 0
			//   },
			//   {
			//     prop: 1
			//   }
			// )
			//
			// f2({             L0 - List start and first child start: children are not indented.
			//   prop: 0             Object properties are indented only one level, because the list
			// }, {                  itself contributes nothing.
			//   prop: 1        L3 - The indentation of the second object literal is best understood by
			// })                    looking at the relationship between the list and *first* list item.
			var listIndentsChild bool
			if firstListChild != nil {
				listLine := getStartLineForNode(firstListChild, sourceFile)
				listIndentsChild = listLine > containingListOrParentStartLine
			}
			actualIndentation := getActualIndentationForListItem(current, sourceFile, options, listIndentsChild)
			if actualIndentation != -1 {
				return actualIndentation + indentationDelta
			}

			// try to fetch actual indentation for current node from source text
			actualIndentation = getActualIndentationForNode(current, parent, currentStartLine, currentStartCharacter, parentAndChildShareLine, sourceFile, options)
			if actualIndentation != -1 {
				return actualIndentation + indentationDelta
			}
		}

		// increase indentation if parent node wants its content to be indented and parent and child nodes don't start on the same line
		if ShouldIndentChildNode(options, parent, current, sourceFile, isNextChild) && !parentAndChildShareLine {
			indentationDelta += options.IndentSize
		}

		// In our AST, a call argument's `parent` is the call-expression, not the argument list.
		// We would like to increase indentation based on the relationship between an argument and its argument-list,
		// so we spoof the starting position of the (parent) call-expression to match the (non-parent) argument-list.
		// But, the spoofed start-value could then cause a problem when comparing the start position of the call-expression
		// to *its* parent (in the case of an iife, an expression statement), adding an extra level of indentation.
		//
		// Instead, when at an argument, we unspoof the starting position of the enclosing call expression
		// *after* applying indentation for the argument.

		useTrueStart := isArgumentAndStartLineOverlapsExpressionBeingCalled(parent, current, currentStartLine, sourceFile)

		current = parent
		parent = current.Parent

		if useTrueStart {
			currentStartLine, currentStartCharacter = scanner.GetECMALineAndByteOffsetOfPosition(sourceFile, scanner.GetTokenPosOfNode(current, sourceFile, false))
		} else {
			currentStartLine = containingListOrParentStartLine
			currentStartCharacter = containingListOrParentStartCharacter
		}
	}

	return indentationDelta + options.BaseIndentSize
}

/*
* Function returns -1 if actual indentation for node should not be used (i.e because node is nested expression)
 */
func getActualIndentationForNode(current *ast.Node, parent *ast.Node, cuurentLine int, currentChar int, parentAndChildShareLine bool, sourceFile *ast.SourceFile, options *lsutil.FormatCodeSettings) int {
	// actual indentation is used for statements\declarations if one of cases below is true:
	// - parent is SourceFile - by default immediate children of SourceFile are not indented except when user indents them manually
	// - parent and child are not on the same line
	useActualIndentation := (ast.IsDeclaration(current) || ast.IsStatementButNotDeclaration(current)) && (parent.Kind == ast.KindSourceFile || !parentAndChildShareLine)

	if !useActualIndentation {
		return -1
	}

	return findColumnForFirstNonWhitespaceCharacterInLine(cuurentLine, currentChar, sourceFile, options)
}

func isArgumentAndStartLineOverlapsExpressionBeingCalled(parent *ast.Node, child *ast.Node, childStartLine int, sourceFile *ast.SourceFile) bool {
	if !(ast.IsCallExpression(parent) && slices.Contains(parent.Arguments(), child)) {
		return false
	}
	expressionOfCallExpressionEnd := parent.Expression().End()
	expressionOfCallExpressionEndLine := scanner.GetECMALineOfPosition(sourceFile, expressionOfCallExpressionEnd)
	return expressionOfCallExpressionEndLine == childStartLine
}

func getActualIndentationForListItem(node *ast.Node, sourceFile *ast.SourceFile, options *lsutil.FormatCodeSettings, listIndentsChild bool) int {
	if node.Parent != nil && node.Parent.Kind == ast.KindVariableDeclarationList {
		// VariableDeclarationList has no wrapping tokens
		return -1
	}
	containingList := GetContainingList(node, sourceFile)
	if containingList != nil {
		index := core.FindIndex(containingList.Nodes, func(e *ast.Node) bool { return e == node })
		if index != -1 {
			result := deriveActualIndentationFromList(containingList, index, sourceFile, options)
			if result != -1 {
				return result
			}
		}
		delta := 0
		if listIndentsChild {
			delta = options.IndentSize
		}
		res := getActualIndentationForListStartLine(containingList, sourceFile, options)
		if res == -1 {
			return delta
		}
		return res + delta
	}
	return -1
}

func getActualIndentationForListStartLine(list *ast.NodeList, sourceFile *ast.SourceFile, options *lsutil.FormatCodeSettings) int {
	if list == nil {
		return -1
	}
	line, char := scanner.GetECMALineAndByteOffsetOfPosition(sourceFile, list.Loc.Pos())
	return findColumnForFirstNonWhitespaceCharacterInLine(line, char, sourceFile, options)
}

func deriveActualIndentationFromList(list *ast.NodeList, index int, sourceFile *ast.SourceFile, options *lsutil.FormatCodeSettings) int {
	debug.Assert(list != nil && index >= 0 && index < len(list.Nodes))

	node := list.Nodes[index]

	// walk toward the start of the list starting from current node and check if the line is the same for all items.
	// if end line for item [i - 1] differs from the start line for item [i] - find column of the first non-whitespace character on the line of item [i]

	line, char := getStartLineAndCharacterForNode(node, sourceFile)

	for i := index; i >= 0; i-- {
		if list.Nodes[i].Kind == ast.KindCommaToken {
			continue
		}
		// skip list items that ends on the same line with the current list element
		prevEndLine := scanner.GetECMALineOfPosition(sourceFile, list.Nodes[i].End())
		if prevEndLine != line {
			return findColumnForFirstNonWhitespaceCharacterInLine(line, char, sourceFile, options)
		}

		line, char = getStartLineAndCharacterForNode(list.Nodes[i], sourceFile)
	}
	return -1
}

func findColumnForFirstNonWhitespaceCharacterInLine(line int, char int, sourceFile *ast.SourceFile, options *lsutil.FormatCodeSettings) int {
	lineStart := scanner.GetECMAPositionOfLineAndByteOffset(sourceFile, line, 0)
	return FindFirstNonWhitespaceColumn(lineStart, lineStart+char, sourceFile, options)
}

func FindFirstNonWhitespaceColumn(startPos int, endPos int, sourceFile *ast.SourceFile, options *lsutil.FormatCodeSettings) int {
	_, col := findFirstNonWhitespaceCharacterAndColumn(startPos, endPos, sourceFile, options)
	return col
}

/**
* Character is the actual index of the character since the beginning of the line.
* Column - position of the character after expanding tabs to spaces.
* "0\t2$"
* value of 'character' for '$' is 3
* value of 'column' for '$' is 6 (assuming that tab size is 4)
 */
func findFirstNonWhitespaceCharacterAndColumn(startPos int, endPos int, sourceFile *ast.SourceFile, options *lsutil.FormatCodeSettings) (character int, column int) {
	column = 0
	text := sourceFile.Text()
	pos := startPos
	for pos < endPos {
		ch, size := utf8.DecodeRuneInString(text[pos:])
		if !stringutil.IsWhiteSpaceSingleLine(ch) {
			break
		}

		if ch == '\t' {
			if options.TabSize > 0 {
				column += options.TabSize + (column % options.TabSize)
			}
		} else {
			column++
		}

		pos += size
	}
	return pos - startPos, column
}

func childStartsOnTheSameLineWithElseInIfStatement(parent *ast.Node, child *ast.Node, childStartLine int, sourceFile *ast.SourceFile) bool {
	if parent.Kind == ast.KindIfStatement && parent.AsIfStatement().ElseStatement == child {
		elseKeyword := astnav.FindPrecedingToken(sourceFile, child.Pos())
		debug.Assert(elseKeyword != nil)
		elseKeywordStartLine := getStartLineForNode(elseKeyword, sourceFile)
		return elseKeywordStartLine == childStartLine
	}
	return false
}

func getStartLineAndCharacterForNode(n *ast.Node, sourceFile *ast.SourceFile) (line int, character int) {
	return scanner.GetECMALineAndByteOffsetOfPosition(sourceFile, scanner.GetTokenPosOfNode(n, sourceFile, false))
}

func getStartLineForNode(n *ast.Node, sourceFile *ast.SourceFile) int {
	return scanner.GetECMALineOfPosition(sourceFile, scanner.GetTokenPosOfNode(n, sourceFile, false))
}

func GetContainingList(node *ast.Node, sourceFile *ast.SourceFile) *ast.NodeList {
	if node.Parent == nil {
		return nil
	}
	return getListByRange(scanner.GetTokenPosOfNode(node, sourceFile, false), node.End(), node.Parent, sourceFile)
}

func getListByPosition(pos int, node *ast.Node, sourceFile *ast.SourceFile) *ast.NodeList {
	if node == nil {
		return nil
	}
	return getListByRange(pos, pos, node, sourceFile)
}

func getListByRange(start int, end int, node *ast.Node, sourceFile *ast.SourceFile) *ast.NodeList {
	r := core.NewTextRange(start, end)
	switch node.Kind {
	case ast.KindTypeReference:
		return getList(node.TypeArgumentList(), r, node, sourceFile)
	case ast.KindObjectLiteralExpression:
		return getList(node.PropertyList(), r, node, sourceFile)
	case ast.KindArrayLiteralExpression:
		return getList(node.ElementList(), r, node, sourceFile)
	case ast.KindTypeLiteral:
		return getList(node.MemberList(), r, node, sourceFile)
	case ast.KindFunctionDeclaration,
		ast.KindFunctionExpression,
		ast.KindArrowFunction,
		ast.KindMethodDeclaration,
		ast.KindMethodSignature,
		ast.KindCallSignature,
		ast.KindConstructor,
		ast.KindConstructorType,
		ast.KindConstructSignature:
		tpl := getList(node.TypeParameterList(), r, node, sourceFile)
		if tpl != nil {
			return tpl
		}
		return getList(node.ParameterList(), r, node, sourceFile)
	case ast.KindGetAccessor:
		return getList(node.ParameterList(), r, node, sourceFile)
	case ast.KindClassDeclaration,
		ast.KindClassExpression,
		ast.KindInterfaceDeclaration,
		ast.KindTypeAliasDeclaration,
		ast.KindJSDocTemplateTag:
		return getList(node.TypeParameterList(), r, node, sourceFile)
	case ast.KindNewExpression, ast.KindCallExpression:
		l := getList(node.TypeArgumentList(), r, node, sourceFile)
		if l != nil {
			return l
		}
		return getList(node.ArgumentList(), r, node, sourceFile)
	case ast.KindVariableDeclarationList:
		return getList(node.AsVariableDeclarationList().Declarations, r, node, sourceFile)
	case ast.KindObjectBindingPattern, ast.KindArrayBindingPattern, ast.KindNamedImports, ast.KindNamedExports:
		return getList(node.ElementList(), r, node, sourceFile)
	}
	return nil // TODO: should this be a panic? It isn't in strada.
}

func getList(list *ast.NodeList, r core.TextRange, node *ast.Node, sourceFile *ast.SourceFile) *ast.NodeList {
	if list == nil {
		return nil
	}
	if r.ContainedBy(getVisualListRange(node, list.Loc, sourceFile)) {
		return list
	}
	return nil
}

func getVisualListRange(node *ast.Node, list core.TextRange, sourceFile *ast.SourceFile) core.TextRange {
	// In strada, this relied on the services .getChildren method, which manifested synthetic token nodes
	// _however_, the logic boils down to "find the child with the matching span and adjust its start to the
	// previous (possibly token) child's end and its end to the token start of the following element" - basically
	// expanding the range to encompass all the neighboring non-token trivia
	// Now, we perform that logic with the scanner instead
	prior := astnav.FindPrecedingToken(sourceFile, list.Pos())
	var priorEnd int
	if prior == nil {
		priorEnd = list.Pos()
	} else {
		priorEnd = prior.End()
	}
	// Find the token that starts at or after list.End() using the scanner
	scan := scanner.GetScannerForSourceFile(sourceFile, list.End())
	var nextStart int
	if scan.Token() == ast.KindEndOfFile {
		nextStart = list.End()
	} else {
		nextStart = scan.TokenStart()
	}
	return core.NewTextRange(priorEnd, nextStart)
}

func getContainingListOrParentStart(parent *ast.Node, child *ast.Node, sourceFile *ast.SourceFile) (line int, character int) {
	containingList := GetContainingList(child, sourceFile)
	var startPos int
	if containingList != nil {
		startPos = containingList.Loc.Pos()
	} else {
		startPos = scanner.GetTokenPosOfNode(parent, sourceFile, false)
	}
	return scanner.GetECMALineAndByteOffsetOfPosition(sourceFile, startPos)
}

func isControlFlowEndingStatement(kind ast.Kind, parentKind ast.Kind) bool {
	switch kind {
	case ast.KindReturnStatement, ast.KindThrowStatement, ast.KindContinueStatement, ast.KindBreakStatement:
		return parentKind != ast.KindBlock
	default:
		return false
	}
}

/**
* True when the parent node should indent the given child by an explicit rule.
* @param isNextChild If true, we are judging indent of a hypothetical child *after* this one, not the current child.
 */
func ShouldIndentChildNode(settings *lsutil.FormatCodeSettings, parent *ast.Node, child *ast.Node, sourceFile *ast.SourceFile, isNextChildArg ...bool) bool {
	isNextChild := false
	if len(isNextChildArg) > 0 {
		isNextChild = isNextChildArg[0]
	}

	return NodeWillIndentChild(settings, parent, child, sourceFile, false) && !(isNextChild && child != nil && isControlFlowEndingStatement(child.Kind, parent.Kind))
}

func NodeWillIndentChild(settings *lsutil.FormatCodeSettings, parent *ast.Node, child *ast.Node, sourceFile *ast.SourceFile, indentByDefault bool) bool {
	childKind := ast.KindUnknown
	if child != nil {
		childKind = child.Kind
	}

	switch parent.Kind {
	case ast.KindExpressionStatement,
		ast.KindClassDeclaration,
		ast.KindClassExpression,
		ast.KindInterfaceDeclaration,
		ast.KindEnumDeclaration,
		ast.KindTypeAliasDeclaration,
		ast.KindArrayLiteralExpression,
		ast.KindBlock,
		ast.KindModuleBlock,
		ast.KindObjectLiteralExpression,
		ast.KindTypeLiteral,
		ast.KindMappedType,
		ast.KindTupleType,
		ast.KindParenthesizedExpression,
		ast.KindPropertyAccessExpression,
		ast.KindCallExpression,
		ast.KindNewExpression,
		ast.KindVariableStatement,
		ast.KindExportAssignment,
		ast.KindReturnStatement,
		ast.KindConditionalExpression,
		ast.KindArrayBindingPattern,
		ast.KindObjectBindingPattern,
		ast.KindJsxOpeningElement,
		ast.KindJsxOpeningFragment,
		ast.KindJsxSelfClosingElement,
		ast.KindJsxExpression,
		ast.KindMethodSignature,
		ast.KindCallSignature,
		ast.KindConstructSignature,
		ast.KindParameter,
		ast.KindFunctionType,
		ast.KindConstructorType,
		ast.KindParenthesizedType,
		ast.KindTaggedTemplateExpression,
		ast.KindAwaitExpression,
		ast.KindNamedExports,
		ast.KindNamedImports,
		ast.KindExportSpecifier,
		ast.KindImportSpecifier,
		ast.KindPropertyDeclaration,
		ast.KindCaseClause,
		ast.KindDefaultClause:
		return true
	case ast.KindCaseBlock:
		return settings.IndentSwitchCase.IsTrueOrUnknown()
	case ast.KindVariableDeclaration, ast.KindPropertyAssignment, ast.KindBinaryExpression:
		if settings.IndentMultiLineObjectLiteralBeginningOnBlankLine.IsFalseOrUnknown() && sourceFile != nil && childKind == ast.KindObjectLiteralExpression {
			return rangeIsOnOneLine(child.Loc, sourceFile)
		}
		if parent.Kind == ast.KindBinaryExpression && sourceFile != nil && childKind == ast.KindJsxElement {
			parentStartLine := scanner.GetECMALineOfPosition(sourceFile, scanner.SkipTrivia(sourceFile.Text(), parent.Pos()))
			childStartLine := scanner.GetECMALineOfPosition(sourceFile, scanner.SkipTrivia(sourceFile.Text(), child.Pos()))
			return parentStartLine != childStartLine
		}
		if parent.Kind != ast.KindBinaryExpression {
			return true
		}
		return indentByDefault
	case ast.KindDoStatement,
		ast.KindWhileStatement,
		ast.KindForInStatement,
		ast.KindForOfStatement,
		ast.KindForStatement,
		ast.KindIfStatement,
		ast.KindFunctionDeclaration,
		ast.KindFunctionExpression,
		ast.KindMethodDeclaration,
		ast.KindConstructor,
		ast.KindGetAccessor,
		ast.KindSetAccessor:
		return childKind != ast.KindBlock
	case ast.KindArrowFunction:
		if sourceFile != nil && childKind == ast.KindParenthesizedExpression {
			return rangeIsOnOneLine(child.Loc, sourceFile)
		}
		return childKind != ast.KindBlock
	case ast.KindExportDeclaration:
		return childKind != ast.KindNamedExports
	case ast.KindImportDeclaration:
		return childKind != ast.KindImportClause || (child.AsImportClause().NamedBindings != nil && child.AsImportClause().NamedBindings.Kind != ast.KindNamedImports)
	case ast.KindJsxElement:
		return childKind != ast.KindJsxClosingElement
	case ast.KindJsxFragment:
		return childKind != ast.KindJsxClosingFragment
	case ast.KindIntersectionType, ast.KindUnionType, ast.KindSatisfiesExpression:
		if childKind == ast.KindTypeLiteral || childKind == ast.KindTupleType || childKind == ast.KindMappedType {
			return false
		}
		return indentByDefault
	case ast.KindTryStatement:
		if childKind == ast.KindBlock {
			return false
		}
		return indentByDefault
	}

	// No explicit rule for given nodes so the result will follow the default value argument
	return indentByDefault
}

// A multiline conditional typically increases the indentation of its whenTrue and whenFalse children:
//
// condition
//
//	? whenTrue
//	: whenFalse;
//
// However, that indentation does not apply if the subexpressions themselves span multiple lines,
// applying their own indentation:
//
//	(() => {
//	  return complexCalculationForCondition();
//	})() ? {
//
//	  whenTrue: 'multiline object literal'
//	} : (
//
//	whenFalse('multiline parenthesized expression')
//
// );
//
// In these cases, we must discard the indentation increase that would otherwise be applied to the
// whenTrue and whenFalse children to avoid double-indenting their contents. To identify this scenario,
// we check for the whenTrue branch beginning on the line that the condition ends, and the whenFalse
// branch beginning on the line that the whenTrue branch ends.
func childIsUnindentedBranchOfConditionalExpression(parent *ast.Node, child *ast.Node, childStartLine int, sourceFile *ast.SourceFile) bool {
	if parent.Kind == ast.KindConditionalExpression && (child == parent.AsConditionalExpression().WhenTrue || child == parent.AsConditionalExpression().WhenFalse) {
		conditionEndLine := scanner.GetECMALineOfPosition(sourceFile, parent.AsConditionalExpression().Condition.End())
		if child == parent.AsConditionalExpression().WhenTrue {
			return childStartLine == conditionEndLine
		} else {
			// On the whenFalse side, we have to look at the whenTrue side, because if that one was
			// indented, whenFalse must also be indented:
			//
			// const y = true
			//   ? 1 : (          L1: whenTrue indented because it's on a new line
			//     0              L2: indented two stops, one because whenTrue was indented
			//   );                   and one because of the parentheses spanning multiple lines
			trueStartLine := getStartLineForNode(parent.AsConditionalExpression().WhenTrue, sourceFile)
			trueEndLine := scanner.GetECMALineOfPosition(sourceFile, parent.AsConditionalExpression().WhenTrue.End())
			return conditionEndLine == trueStartLine && trueEndLine == childStartLine
		}
	}
	return false
}

func argumentStartsOnSameLineAsPreviousArgument(parent *ast.Node, child *ast.Node, childStartLine int, sourceFile *ast.SourceFile) bool {
	if ast.IsCallExpression(parent) || ast.IsNewExpression(parent) {
		if len(parent.Arguments()) == 0 {
			return false
		}
		currentIndex := core.FindIndex(parent.Arguments(), func(n *ast.Node) bool { return n == child })
		if currentIndex == -1 {
			// If it's not one of the arguments, don't look past this
			return false
		}
		if currentIndex == 0 {
			return false // Can't look at previous node if first
		}

		previousNode := parent.Arguments()[currentIndex-1]
		lineOfPreviousNode := scanner.GetECMALineOfPosition(sourceFile, previousNode.End())
		if childStartLine == lineOfPreviousNode {
			return true
		}
	}
	return false
}
