package ls

import (
	"context"
	"fmt"
	"slices"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/astnav"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/nodebuilder"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
)

const (
	symbolFormatFlags = checker.SymbolFormatFlagsWriteTypeParametersOrArguments | checker.SymbolFormatFlagsUseOnlyExternalAliasing | checker.SymbolFormatFlagsAllowAnyNodeKind | checker.SymbolFormatFlagsUseAliasDefinedOutsideCurrentScope
	typeFormatFlags   = checker.TypeFormatFlagsUseAliasDefinedOutsideCurrentScope | checker.TypeFormatFlagsUseInstantiationExpressions
)

func (l *LanguageService) ProvideHover(ctx context.Context, params *lsproto.HoverParams) (lsproto.HoverResponse, error) {
	caps := lsproto.GetClientCapabilities(ctx)
	contentFormat := lsproto.PreferredMarkupKind(caps.TextDocument.Hover.ContentFormat)

	verbosityLevel := 0
	if params.VerbosityLevel != nil {
		verbosityLevel = int(*params.VerbosityLevel)
	}

	program, file := l.getProgramAndFile(params.TextDocument.Uri)
	positions := lsconv.FromLSPPositionForSourceFile(l.converters, file, params.Position, spanmap.FeatureHover)
	var hovers []*lsproto.Hover
	for _, projection := range positions {
		if !projection.Fidelity.IsSingleSegment() {
			continue
		}
		file = projection.Script
		position := int(projection.Position)
		node := astnav.GetTouchingPropertyName(file, position)
		if ast.IsSourceFile(node) || ast.IsPropertyAccessOrQualifiedName(node) && isInComment(file, position, node) == nil {
			// Avoid giving quickInfo for the sourceFile as a whole or inside the comment of a/**/.b
			continue
		}
		c, done := program.GetTypeCheckerForFile(ctx, file)
		rangeNode := getNodeForQuickInfo(node)
		symbol := getSymbolAtLocationForQuickInfo(c, rangeNode)

		// Always create VerbosityContext for hover so that canExpandSymbol can signal
		// canIncreaseVerbosity even at Level 0. The nodebuilder also detects expandable
		// types at Level 0 via shouldExpandType (maxExpansionDepth = 0).
		maxTruncLen := l.UserPreferences().MaximumHoverLength
		if maxTruncLen <= 0 {
			maxTruncLen = 500
		}
		vc := &checker.VerbosityContext{
			Level:               verbosityLevel,
			MaxTruncationLength: maxTruncLen,
		}

		vsCapability := caps.VSSupportsVisualStudioExtensions
		quickInfo, documentation, vsDocumentation, quickInfoRuns := l.getQuickInfoAndDocumentationForSymbol(c, symbol, rangeNode, contentFormat, vc, vsCapability)
		if quickInfo == "" {
			done()
			continue
		}
		rangeFile := ast.GetSourceFileOfNode(rangeNode)
		textRange := getRangeOfNode(rangeNode, rangeFile, nil /*endNode*/)
		hoverRange, hoverFidelity := l.converters.ToLSPRangeForFeature(rangeFile, textRange, spanmap.FeatureHover)

		var content string
		if contentFormat == lsproto.MarkupKindMarkdown {
			content = formatQuickInfo(quickInfo) + documentation
		} else {
			content = quickInfo + documentation
		}

		hover := &lsproto.Hover{
			Contents: lsproto.MarkupContentOrStringOrMarkedStringWithLanguageOrMarkedStrings{
				MarkupContent: &lsproto.MarkupContent{
					Kind:  contentFormat,
					Value: content,
				},
			},
		}
		if hoverFidelity.IsSingleSegment() {
			hover.Range = &hoverRange
		}

		if caps.Experimental.HoverVerbosityLevel {
			hover.CanIncreaseVerbosity = vc.CanIncreaseVerbosity && !vc.Truncated
		}

		// Clients that support Visual Studio extensions (e.g. VS itself, when Corsa/Native TS Preview is
		// enabled) render `_vs_rawContent` in place of `contents`. Without it, VS shows plain markdown
		// with no symbol icon and no syntax coloring, unlike the legacy TSServer-backed hover path.
		if vsCapability && len(quickInfoRuns) > 0 {
			kind := lsutil.ScriptElementKindKeyword
			var modifiers lsutil.ScriptElementKindModifier
			if symbol != nil {
				// Resolve aliases to their target before computing the icon kind, so e.g. `import { x }`
				// shows the icon for whatever `x` actually is (const, function, ...) rather than a
				// generic alias icon. GetSymbolModifiers already accounts for the alias target itself.
				iconSymbol := symbol
				if symbol.Flags&ast.SymbolFlagsAlias != 0 {
					if resolved := c.GetAliasedSymbol(symbol); resolved != nil && resolved != symbol {
						iconSymbol = resolved
					}
				}
				kind = lsutil.GetSymbolKind(c, iconSymbol, rangeNode)
				modifiers = lsutil.GetSymbolModifiers(c, symbol)
			}
			imageId := getVSHoverImageId(kind, modifiers)
			var documentationRuns []*lsproto.VSClassifiedTextRun
			if docText := strings.TrimLeft(vsDocumentation, "\n"); docText != "" {
				documentationRuns = []*lsproto.VSClassifiedTextRun{{ClassificationTypeName: string(lsproto.ClassificationTypeNameText), Text: docText}}
			}
			hover.VSRawContent = buildVSHoverRawContent(imageId, quickInfoRuns, documentationRuns)
		}

		done()
		hovers = append(hovers, hover)
	}
	if len(hovers) == 0 {
		return lsproto.HoverOrNull{}, nil
	}
	if len(hovers) == 1 {
		return lsproto.HoverOrNull{Hover: hovers[0]}, nil
	}

	combined := hovers[0]
	contents := make([]string, 0, len(hovers))
	seenContents := collections.Set[string]{}
	var rawContents []lsproto.VSImageElementOrClassifiedTextElementOrContainerElement
	commonRange := combined.Range
	for _, hover := range hovers {
		content := strings.TrimRight(hover.Contents.MarkupContent.Value, "\n")
		if seenContents.AddIfAbsent(content) {
			contents = append(contents, content)
			if hover.VSRawContent != nil {
				rawContents = append(rawContents, lsproto.VSImageElementOrClassifiedTextElementOrContainerElement{ContainerElement: hover.VSRawContent})
			}
		}
		combined.CanIncreaseVerbosity = combined.CanIncreaseVerbosity || hover.CanIncreaseVerbosity
		if commonRange == nil || hover.Range == nil || *commonRange != *hover.Range {
			commonRange = nil
		}
	}
	separator := "\n\n"
	if contentFormat == lsproto.MarkupKindMarkdown {
		separator = "\n\n---\n\n"
	}
	combined.Contents.MarkupContent.Value = strings.Join(contents, separator)
	combined.Range = commonRange
	switch len(rawContents) {
	case 0:
		combined.VSRawContent = nil
	case 1:
		combined.VSRawContent = rawContents[0].ContainerElement
	default:
		combined.VSRawContent = &lsproto.VSContainerElement{
			Style:    lsproto.VSContainerElementStyleStacked,
			Elements: rawContents,
		}
	}
	return lsproto.HoverOrNull{Hover: combined}, nil
}

func (l *LanguageService) getQuickInfoAndDocumentationForSymbol(c *checker.Checker, symbol *ast.Symbol, node *ast.Node, contentFormat lsproto.MarkupKind, vc *checker.VerbosityContext, vsCapability bool) (string, string, string, []*lsproto.VSClassifiedTextRun) {
	info := getQuickInfoAndDeclarationAtLocation(c, symbol, node, vc, vsCapability, getMeaningFromLocation(node))
	quickInfo := info.displayParts.String()
	if quickInfo == "" {
		return "", "", "", nil
	}
	quickInfoRuns := info.displayParts.GetRuns()

	documentation := getDocumentationForSymbol(l.documentationLocationMapper(spanmap.FeatureHover), c, symbol, node, info.declaration, contentFormat, false /*commentOnly*/)

	// VS's rich hover (_vs_rawContent) renders documentation as plain colorized text with no Markdown
	// parser, so it can't use the tag section (@param/@returns/@example/@see, etc.) that
	// getDocumentationFromDeclaration renders with '*@tag*' bolding and ```-fenced @example blocks --
	// those would show up as literal asterisks/backticks. This also matches the legacy TSServer-backed
	// VS hover (TypeScript-VS's HoverService.cs), which only ever surfaced the JSDoc summary
	// (TSServer's quickinfo `documentation`) and never included the tag section at all (TSServer
	// exposes tags via a separate `tags` field that legacy VS hover never read). So request
	// comment-only, plain-text documentation for the VS path instead of reusing `documentation`.
	var vsDocumentation string
	if vsCapability {
		vsDocumentation = getDocumentationForSymbol(l.documentationLocationMapper(spanmap.FeatureHover), c, symbol, node, info.declaration, lsproto.MarkupKindPlainText, true /*commentOnly*/)
	}

	return quickInfo, documentation, vsDocumentation, quickInfoRuns
}

// getDocumentationForSymbol tries each documentation source in turn (call-signature documentation,
// declaration JSDoc, root-symbol JSDoc, alias target JSDoc) and returns the first non-empty result,
// formatted for contentFormat. commentOnly restricts the result to the JSDoc summary, excluding the
// @tag section.
type documentationLocationMapper func(*ast.SourceFile, core.TextRange) (lsproto.Location, spanmap.Fidelity)

func (l *LanguageService) documentationLocationMapper(feature spanmap.Feature) documentationLocationMapper {
	return func(file *ast.SourceFile, fileRange core.TextRange) (lsproto.Location, spanmap.Fidelity) {
		return l.sourceFileRangeToLSPLocationForFeature(file, fileRange, feature)
	}
}

func getDocumentationForSymbol(getMappedLocation documentationLocationMapper, c *checker.Checker, symbol *ast.Symbol, node *ast.Node, declaration *ast.Node, contentFormat lsproto.MarkupKind, commentOnly bool) string {
	documentation := documentationFromSignature(getMappedLocation, c, symbol, getCallOrNewExpression(node), node, contentFormat, commentOnly)
	if documentation != "" {
		return documentation
	}

	documentation = documentationFromRootSymbols(getMappedLocation, c, symbol, node, contentFormat, commentOnly)
	if documentation != "" {
		return documentation
	}

	documentation = getDocumentationFromDeclaration(getMappedLocation, c, symbol, declaration, node, contentFormat, commentOnly)
	if documentation != "" {
		return documentation
	}

	return documentationFromAlias(getMappedLocation, c, symbol, node, contentFormat, commentOnly)
}

func documentationFromSignature(getMappedLocation documentationLocationMapper, c *checker.Checker, symbol *ast.Symbol, node *ast.Node, location *ast.Node, contentFormat lsproto.MarkupKind, commentOnly bool) string {
	if node == nil {
		return ""
	}
	signature := c.GetResolvedSignature(node)
	if signature == nil {
		return ""
	}
	declaration := signature.Declaration()
	if declaration == nil {
		return ""
	}
	if ast.IsCallSignatureDeclaration(declaration) || ast.IsConstructSignatureDeclaration(declaration) {
		return getDocumentationFromDeclaration(getMappedLocation, c, symbol, declaration, location, contentFormat, commentOnly)
	}
	return ""
}

func documentationFromAlias(getMappedLocation documentationLocationMapper, c *checker.Checker, symbol *ast.Symbol, node *ast.Node, contentFormat lsproto.MarkupKind, commentOnly bool) string {
	if symbol == nil || symbol.Flags&ast.SymbolFlagsAlias == 0 {
		return ""
	}

	aliasedSymbol := c.GetAliasedSymbol(symbol)
	if aliasedSymbol == nil || aliasedSymbol == c.GetUnknownSymbol() {
		return ""
	}

	candidates := []*ast.Symbol{aliasedSymbol}
	if aliasedSymbol.ExportSymbol != nil {
		candidates = append(candidates, aliasedSymbol.ExportSymbol)
	}

	for _, candidate := range candidates {
		aliasedDeclaration := core.OrElse(candidate.ValueDeclaration, core.FirstOrNil(candidate.Declarations))
		if aliasedDeclaration == nil {
			continue
		}

		if documentation := getDocumentationFromDeclaration(getMappedLocation, c, candidate, aliasedDeclaration, node, contentFormat, commentOnly); documentation != "" {
			return documentation
		}
	}

	return ""
}

func documentationFromRootSymbols(getMappedLocation documentationLocationMapper, c *checker.Checker, symbol *ast.Symbol, node *ast.Node, contentFormat lsproto.MarkupKind, commentOnly bool) string {
	if symbol == nil {
		return ""
	}

	rootSymbols := c.GetRootSymbols(symbol)
	if len(rootSymbols) <= 1 {
		return ""
	}

	var docs []string
	for _, rootSymbol := range rootSymbols {
		if rootSymbol == nil {
			continue
		}
		declarations := rootSymbol.Declarations
		if len(declarations) == 0 && rootSymbol.ValueDeclaration != nil {
			declarations = []*ast.Node{rootSymbol.ValueDeclaration}
		}
		for _, declaration := range declarations {
			if documentation := getDocumentationFromDeclaration(getMappedLocation, c, rootSymbol, declaration, node, contentFormat, commentOnly); documentation != "" {
				docs = core.AppendIfUnique(docs, documentation)
			}
		}
	}
	return strings.Join(docs, "\n")
}

func getDocumentationFromDeclaration(getMappedLocation documentationLocationMapper, c *checker.Checker, symbol *ast.Symbol, declaration *ast.Node, location *ast.Node, contentFormat lsproto.MarkupKind, commentOnly bool) string {
	if declaration == nil {
		return ""
	}
	isMarkdown := contentFormat == lsproto.MarkupKindMarkdown
	var b strings.Builder
	if jsdoc := getJSDocOrTag(c, declaration, &collections.Set[*ast.Symbol]{}); jsdoc != nil && !(declaration.Flags&ast.NodeFlagsReparsed == 0 && containsTypedefTag(jsdoc)) {
		writeComments(getMappedLocation, &b, c, jsdoc.Comments(), isMarkdown)
		if jsdoc.Kind == ast.KindJSDoc && !commentOnly {
			if tags := jsdoc.AsJSDoc().Tags; tags != nil {
				for _, tag := range tags.Nodes {
					if tag.Kind == ast.KindJSDocTypeTag || tag.Kind == ast.KindJSDocTypedefTag || tag.Kind == ast.KindJSDocCallbackTag {
						continue
					}
					b.WriteString("\n\n")
					if isMarkdown {
						b.WriteString("*@")
						b.WriteString(tag.TagName().Text())
						b.WriteString("*")
					} else {
						b.WriteString("@")
						b.WriteString(tag.TagName().Text())
					}
					switch tag.Kind {
					case ast.KindJSDocParameterTag, ast.KindJSDocPropertyTag:
						writeOptionalEntityName(&b, tag.Name())
					case ast.KindJSDocAugmentsTag:
						writeOptionalEntityName(&b, tag.ClassName())
					case ast.KindJSDocTemplateTag:
						for i, tp := range tag.TypeParameters() {
							if i != 0 {
								b.WriteString(",")
							}
							writeOptionalEntityName(&b, tp.Name())
						}
					}
					comments := tag.Comments()
					if tag.Kind == ast.KindJSDocUnknownTag && tag.TagName().Text() == "example" {
						commentText := scanner.GetTextOfJSDocComment(tag.CommentList())
						if strings.HasPrefix(commentText, "<caption>") {
							if captionEnd := strings.Index(commentText, "</caption>"); captionEnd > 0 {
								b.WriteString(" — ")
								b.WriteString(commentText[len("<caption>"):captionEnd])
								commentText = commentText[captionEnd+len("</caption>"):]
								// Trim leading blank lines from commentText
								for {
									s1 := strings.TrimLeft(commentText, " \t")
									s2 := strings.TrimLeft(s1, "\r\n")
									if len(s1) == len(s2) {
										break
									}
									commentText = s2
								}
							}
						}
						b.WriteString("\n")
						if len(commentText) > 6 && strings.HasPrefix(commentText, "```") && strings.HasSuffix(commentText, "```") && strings.Contains(commentText, "\n") {
							b.WriteString(commentText)
							b.WriteString("\n")
						} else {
							writeCode(&b, "tsx", commentText)
						}
					} else if tag.Kind == ast.KindJSDocSeeTag && tag.AsJSDocSeeTag().NameExpression != nil {
						b.WriteString(" — ")
						writeNameLink(getMappedLocation, &b, c, tag.AsJSDocSeeTag().NameExpression.Name(), "", false /*quote*/, isMarkdown)
						if len(comments) != 0 {
							b.WriteString(" ")
							writeComments(getMappedLocation, &b, c, comments, isMarkdown)
						}
					} else if tag.Kind == ast.KindJSDocThrowsTag && tag.AsJSDocThrowsTag().TypeExpression != nil {
						b.WriteString(" — ")
						b.WriteString(scanner.GetTextOfNode(tag.AsJSDocThrowsTag().TypeExpression))
						if len(comments) != 0 {
							b.WriteString(" ")
							writeComments(getMappedLocation, &b, c, comments, isMarkdown)
						}
					} else if len(comments) != 0 {
						b.WriteString(" ")
						if comments[0].Kind != ast.KindJSDocText || !strings.HasPrefix(comments[0].Text(), "-") {
							b.WriteString("— ")
						}
						writeComments(getMappedLocation, &b, c, comments, isMarkdown)
					}
				}
			}
		}
	}
	return b.String()
}

func formatQuickInfo(quickInfo string) string {
	var b strings.Builder
	b.Grow(32)
	writeCode(&b, "typescript", quickInfo)
	return b.String()
}

func shouldGetType(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindIdentifier:
		// If we're in a JSDoc node with no associated symbol, no binding has taken place for the node and
		// we can't answer questions about types of declaration nodes (such as property declarations).
		return !(node.Flags&ast.NodeFlagsJSDoc != 0 && ast.IsDeclarationName(node)) && !ast.IsLabelName(node) && !ast.IsTagName(node) && !ast.IsConstTypeReference(node.Parent)
	case ast.KindThisKeyword, ast.KindThisType, ast.KindSuperKeyword, ast.KindNamedTupleMember:
		return true
	case ast.KindMetaProperty:
		return ast.IsImportMeta(node)
	default:
		return false
	}
}

// symbolDisplayInfo holds the result of getSymbolDisplayPartsDocumentationAndSymbolKind.
type symbolDisplayInfo struct {
	displayParts *displayPartsWriter
	declaration  *ast.Node
}

// getQuickInfoAndDeclarationAtLocation builds classified display parts using displayPartsWriter when vsCapability is true.
// When vsCapability is false, it still builds the plain text string but skips classification runs.
func getQuickInfoAndDeclarationAtLocation(c *checker.Checker, symbol *ast.Symbol, node *ast.Node, vc *checker.VerbosityContext, vsCapability bool, meaning ast.SemanticMeaning) symbolDisplayInfo {
	container := getContainerNode(node)
	if vc == nil {
		vc = &checker.VerbosityContext{}
	}
	dpw := newDisplayPartsWriter(vsCapability)

	// Source file for printer context
	var sourceFile *ast.SourceFile
	if node != nil {
		sourceFile = ast.GetSourceFileOfNode(node)
	}

	// nodeBuilderFlags for classified output (same as signatureHelpNodeBuilderFlags)
	const classifiedNodeBuilderFlags = nodebuilder.FlagsIgnoreErrors | nodebuilder.FlagsUseAliasDefinedOutsideCurrentScope | nodebuilder.FlagsWriteTypeParametersInQualifiedName

	// writeTypeClassified writes a type to dpw with proper classification (punctuation, symbols, keywords).
	// Falls back to flat text when vsCapability is false or when TypeToTypeNode fails.
	writeTypeClassified := func(t *checker.Type, enclosing *ast.Node, flags checker.TypeFormatFlags) {
		flags |= checker.TypeFormatFlagsMultilineObjectLiterals
		if !vsCapability {
			dpw.Write(c.TypeToStringEx(t, enclosing, flags, vc))
			return
		}
		emitContext := printer.NewEmitContext()
		idToSymbol := make(map[*ast.IdentifierNode]*ast.Symbol)
		nb := checker.NewNodeBuilderEx(c, emitContext, idToSymbol)
		combinedFlags := nodebuilder.Flags(flags&checker.TypeFormatFlagsNodeBuilderFlagsMask) | classifiedNodeBuilderFlags
		typeNode := nb.TypeToTypeNode(t, enclosing, combinedFlags, nodebuilder.InternalFlagsNone, nil)
		if typeNode == nil {
			dpw.Write(c.TypeToStringEx(t, enclosing, flags, vc))
			return
		}
		p := printer.NewPrinter(printer.PrinterOptions{NewLine: core.NewLineKindLF}, printer.PrintHandlers{}, emitContext)
		p.IdToSymbol = idToSymbol
		tempDpw := newDisplayPartsWriter(true)
		p.Write(typeNode, sourceFile, tempDpw, nil)
		dpw.WriteFrom(tempDpw)
	}

	// writeSignatureClassified writes a signature to dpw with proper classification.
	writeSignatureClassified := func(sig *checker.Signature, enclosing *ast.Node, flags checker.TypeFormatFlags) {
		flags |= checker.TypeFormatFlagsMultilineObjectLiterals
		if !vsCapability {
			dpw.Write(c.SignatureToStringEx(sig, enclosing, flags, vc))
			return
		}
		isConstructor := sig.Flags()&checker.SignatureFlagsConstruct != 0 && flags&checker.TypeFormatFlagsWriteCallStyleSignature == 0
		var sigOutput ast.Kind
		if flags&checker.TypeFormatFlagsWriteArrowStyleSignature != 0 {
			if isConstructor {
				sigOutput = ast.KindConstructorType
			} else {
				sigOutput = ast.KindFunctionType
			}
		} else {
			if isConstructor {
				sigOutput = ast.KindConstructSignature
			} else {
				sigOutput = ast.KindCallSignature
			}
		}
		emitContext := printer.NewEmitContext()
		idToSymbol := make(map[*ast.IdentifierNode]*ast.Symbol)
		nb := checker.NewNodeBuilderEx(c, emitContext, idToSymbol)
		combinedFlags := nodebuilder.Flags(flags&checker.TypeFormatFlagsNodeBuilderFlagsMask) | classifiedNodeBuilderFlags
		sigNode := nb.SignatureToSignatureDeclaration(sig, sigOutput, enclosing, combinedFlags, nodebuilder.InternalFlagsNone, nil)
		if sigNode == nil {
			dpw.Write(c.SignatureToStringEx(sig, enclosing, flags, vc))
			return
		}
		p := printer.NewPrinter(printer.PrinterOptions{NewLine: core.NewLineKindLF}, printer.PrintHandlers{}, emitContext)
		p.IdToSymbol = idToSymbol
		tempDpw := newDisplayPartsWriter(true)
		p.Write(sigNode, sourceFile, tempDpw, nil)
		dpw.WriteFrom(tempDpw)
	}

	// writeSymbolClassified writes a symbol name to dpw with proper classification based on symbol flags.
	writeSymbolClassified := func(symbol *ast.Symbol, enclosing *ast.Node, meaning ast.SymbolFlags, flags checker.SymbolFormatFlags) {
		if !vsCapability {
			dpw.Write(c.SymbolToStringEx(symbol, enclosing, meaning, flags))
			return
		}
		// Use WriteSymbol which calls classificationForSymbol to determine the correct classification
		text := c.SymbolToStringEx(symbol, enclosing, meaning, flags)
		dpw.WriteSymbol(text, symbol)
	}
	writeModuleImportAttributes := func(symbol *ast.Symbol) {
		declaration := core.Find(symbol.Declarations, func(declaration *ast.Node) bool {
			return ast.IsModuleDeclaration(declaration) && declaration.AsModuleDeclaration().Attributes != nil
		})
		if declaration == nil {
			return
		}
		attributes := declaration.AsModuleDeclaration().Attributes
		emitContext := printer.NewEmitContext()
		emitContext.SetEmitFlags(attributes, printer.EFSingleLine)
		p := printer.NewPrinter(printer.PrinterOptions{NewLine: core.NewLineKindLF}, printer.PrintHandlers{}, emitContext)
		tempDpw := newDisplayPartsWriter(vsCapability)
		p.Write(attributes, ast.GetSourceFileOfNode(declaration), tempDpw, nil)
		dpw.WriteKeyword(" with ")
		dpw.WriteFrom(tempDpw)
	}
	if node.Kind == ast.KindThisKeyword && ast.IsInExpressionContext(node) || ast.IsThisInTypeQuery(node) {
		dpw.WriteKeyword("this")
		dpw.WritePunctuation(": ")
		writeTypeClassified(c.GetTypeAtLocation(node), container, typeFormatFlags)
		return symbolDisplayInfo{displayParts: dpw}
	}
	if symbol == nil {
		if shouldGetType(node) {
			writeTypeClassified(c.GetTypeAtLocation(node), container, typeFormatFlags)
		}
		return symbolDisplayInfo{displayParts: dpw}
	}
	var visitedAliases collections.Set[*ast.Symbol]
	var aliasLevel int
	var firstDeclaration *ast.Node
	setDeclaration := func(declaration *ast.Node) {
		if firstDeclaration == nil {
			firstDeclaration = declaration
		}
	}
	writeNewLine := func() {
		if dpw.String() != "" {
			dpw.Write("\n")
		}
		if aliasLevel != 0 {
			dpw.WritePunctuation("(")
			dpw.Write("alias")
			dpw.WritePunctuation(") ")
		}
	}
	writeSignatures := func(signatures []*checker.Signature, prefix string, parenthesized bool, symbol *ast.Symbol) {
		for i, sig := range signatures {
			writeNewLine()
			if i == 3 && len(signatures) >= 5 {
				dpw.WriteComment(fmt.Sprintf("// +%v more overloads", len(signatures)-3))
				break
			}
			if parenthesized {
				dpw.WritePunctuation("(")
				dpw.Write(prefix)
				dpw.WritePunctuation(") ")
			} else {
				dpw.WriteKeyword(prefix)
			}
			writeSymbolClassified(symbol, container, ast.SymbolFlagsNone, symbolFormatFlags)
			if symbol.Flags&ast.SymbolFlagsOptional != 0 {
				dpw.WritePunctuation("?")
			}
			writeSignatureClassified(sig, container, typeFormatFlags|checker.TypeFormatFlagsWriteCallStyleSignature|checker.TypeFormatFlagsWriteTypeArgumentsOfSignature)
		}
	}
	writeTypeParams := func(params []*checker.Type) {
		if len(params) > 0 {
			dpw.WritePunctuation("<")
			for i, tp := range params {
				if i != 0 {
					dpw.WritePunctuation(", ")
				}
				writeSymbolClassified(tp.Symbol(), nil, ast.SymbolFlagsNone, symbolFormatFlags)
				cons := c.GetConstraintOfTypeParameter(tp)
				if cons != nil {
					dpw.WriteKeyword(" extends ")
					writeTypeClassified(cons, nil, typeFormatFlags)
				}
				def := c.GetDefaultFromTypeParameter(tp)
				if def != nil {
					dpw.WriteOperator(" = ")
					writeTypeClassified(def, nil, typeFormatFlags)
				}
			}
			dpw.WritePunctuation(">")
		}
	}
	symbolWasExpanded := false
	canExpandSymbol := func(symbol *ast.Symbol) bool {
		if vc == nil {
			return false
		}
		// Only offer symbol-level expansion for types that tryExpandSymbol handles:
		// class, interface, enum, namespace/module. For functions/variables/properties,
		// the node builder's probeTypeExpandability detects expandable type components.
		if symbol.Flags&(ast.SymbolFlagsClass|ast.SymbolFlagsInterface|ast.SymbolFlagsNamespace) == 0 {
			return false
		}
		var t *checker.Type
		if symbol.Flags&(ast.SymbolFlagsClass|ast.SymbolFlagsInterface) != 0 {
			t = c.GetDeclaredTypeOfSymbol(symbol)
		} else {
			t = c.GetTypeOfSymbolAtLocation(symbol, node)
		}
		if t == nil || c.IsLibTypeForHoverVerbosity(t) {
			return false
		}
		if vc.Level > 0 {
			return true
		}
		// At level 0, signal that expansion is possible but don't expand
		vc.CanIncreaseVerbosity = true
		return false
	}
	// tryExpandSymbol checks if a symbol can be expanded at the current verbosity level.
	tryExpandSymbol := func(symbol *ast.Symbol, meaning ast.SymbolFlags) bool {
		if symbolWasExpanded {
			return true
		}
		if canExpandSymbol(symbol) {
			expandVC := &checker.VerbosityContext{
				Level:               vc.Level - 1,
				MaxTruncationLength: vc.MaxTruncationLength,
			}
			expanded := c.ExpandSymbolForHover(symbol, meaning, expandVC)
			if expanded != "" {
				vc.CanIncreaseVerbosity = vc.CanIncreaseVerbosity || expandVC.CanIncreaseVerbosity
				vc.Truncated = vc.Truncated || expandVC.Truncated
				dpw.Write(expanded)
				symbolWasExpanded = true
				return true
			}
		}
		return false
	}
	var writeSymbol func(*ast.Symbol)
	writeSymbol = func(symbol *ast.Symbol) {
		// Recursively write all meanings of alias
		if symbol.Flags&ast.SymbolFlagsAlias != 0 && visitedAliases.AddIfAbsent(symbol) {
			if aliasedSymbol := c.GetAliasedSymbol(symbol); aliasedSymbol != c.GetUnknownSymbol() {
				aliasLevel++
				writeSymbol(aliasedSymbol)
				aliasLevel--
			}
		}
		var flags ast.SymbolFlags
		switch meaning {
		case ast.SemanticMeaningValue:
			flags = symbol.Flags & (ast.SymbolFlagsValue | ast.SymbolFlagsSignature)
		case ast.SemanticMeaningType:
			flags = symbol.Flags & ast.SymbolFlagsType
		case ast.SemanticMeaningNamespace:
			flags = symbol.Flags & ast.SymbolFlagsNamespace
		default:
			flags = symbol.Flags & (ast.SymbolFlagsValue | ast.SymbolFlagsSignature | ast.SymbolFlagsType | ast.SymbolFlagsNamespace)
		}
		if flags == 0 {
			if aliasLevel != 0 || dpw.String() != "" {
				return
			}
			flags = symbol.Flags & (ast.SymbolFlagsValue | ast.SymbolFlagsSignature | ast.SymbolFlagsType | ast.SymbolFlagsNamespace)
			if flags == 0 {
				return
			}
		}
		if flags&ast.SymbolFlagsProperty != 0 && symbol.ValueDeclaration != nil && ast.IsMethodDeclaration(symbol.ValueDeclaration) {
			flags = ast.SymbolFlagsMethod
		}
		if flags&(ast.SymbolFlagsVariable|ast.SymbolFlagsProperty|ast.SymbolFlagsAccessor) != 0 {
			writeNewLine()
			if symbol.CheckFlags&ast.CheckFlagsIndexSymbol == 0 {
				switch {
				case flags&ast.SymbolFlagsProperty != 0:
					dpw.WritePunctuation("(")
					dpw.Write("property")
					dpw.WritePunctuation(") ")
				case flags&ast.SymbolFlagsAccessor != 0:
					dpw.WritePunctuation("(")
					dpw.Write("accessor")
					dpw.WritePunctuation(") ")
				default:
					decl := symbol.ValueDeclaration
					if decl != nil {
						decl = ast.GetRootDeclaration(decl)
						switch {
						case ast.IsParameterDeclaration(decl):
							dpw.WritePunctuation("(")
							dpw.Write("parameter")
							dpw.WritePunctuation(") ")
						case ast.IsVarLet(decl):
							dpw.WriteKeyword("let ")
						case ast.IsVarConst(decl):
							dpw.WriteKeyword("const ")
						case ast.IsVarUsing(decl):
							dpw.WriteKeyword("using ")
						case ast.IsVarAwaitUsing(decl):
							dpw.WriteKeyword("await ")
							dpw.WriteKeyword("using ")
						default:
							dpw.WriteKeyword("var ")
						}
					}
				}
				if symbol.Name == ast.InternalSymbolNameExportEquals && symbol.Parent != nil && symbol.Parent.Flags&ast.SymbolFlagsModule != 0 {
					dpw.Write("exports")
				} else {
					writeSymbolClassified(symbol, container, ast.SymbolFlagsNone, symbolFormatFlags)
				}
				if symbol.Flags&ast.SymbolFlagsOptional != 0 {
					dpw.WritePunctuation("?")
				}
				dpw.WritePunctuation(": ")
			}
			if callNode := getCallOrNewExpression(node); callNode != nil {
				flags := typeFormatFlags | checker.TypeFormatFlagsWriteTypeArgumentsOfSignature | checker.TypeFormatFlagsWriteArrowStyleSignature
				if ast.IsCallExpression(callNode) {
					flags |= checker.TypeFormatFlagsWriteCallStyleSignature
				}
				writeSignatureClassified(c.GetResolvedSignature(callNode), container, flags)
			} else {
				t := c.GetTypeOfSymbolAtLocation(symbol, node)
				// If the type is a constrained type parameter, support expansion:
				// Level 0: show just "T", signal canIncreaseVerbosity
				// Level 1+: show "T extends Constraint" with the constraint expanded at level-1
				if vc != nil && t.Symbol() != nil && t.Symbol().Flags&ast.SymbolFlagsTypeParameter != 0 && c.GetConstraintOfTypeParameter(t) != nil {
					if vc.Level > 0 {
						expandVC := &checker.VerbosityContext{
							Level:               vc.Level - 1,
							MaxTruncationLength: vc.MaxTruncationLength,
						}
						dpw.Write(typeParameterToString(c, t, container, expandVC))
						vc.CanIncreaseVerbosity = vc.CanIncreaseVerbosity || expandVC.CanIncreaseVerbosity
						vc.Truncated = vc.Truncated || expandVC.Truncated
					} else {
						writeTypeClassified(t, container, typeFormatFlags)
						vc.CanIncreaseVerbosity = true
					}
				} else {
					writeTypeClassified(t, container, typeFormatFlags)
				}
			}
			setDeclaration(core.OrElse(symbol.ValueDeclaration, core.FirstOrNil(symbol.Declarations)))
		}
		if flags&ast.SymbolFlagsEnumMember != 0 {
			writeNewLine()
			dpw.WritePunctuation("(")
			dpw.Write("enum member")
			dpw.WritePunctuation(") ")
			t := c.GetTypeOfSymbol(symbol)
			writeTypeClassified(t, container, typeFormatFlags)
			if t.Flags()&checker.TypeFlagsLiteral != 0 {
				dpw.WriteOperator(" = ")
				dpw.WriteLiteral(t.AsLiteralType().String())
			}
			setDeclaration(symbol.ValueDeclaration)
		}
		if flags&(ast.SymbolFlagsFunction|ast.SymbolFlagsMethod) != 0 {
			isMethod := flags&ast.SymbolFlagsMethod != 0
			prefix := core.IfElse(isMethod, "method", "function ")
			if ast.IsIdentifier(node) && (ast.IsFunctionLikeDeclaration(node.Parent) || ast.IsMethodSignatureDeclaration(node.Parent)) && node.Parent.Name() == node && slices.Contains(symbol.Declarations, node.Parent) {
				setDeclaration(node.Parent)
				signatures := []*checker.Signature{c.GetSignatureFromDeclaration(node.Parent)}
				writeSignatures(signatures, prefix, isMethod, symbol)
			} else {
				signatures := getSignaturesAtLocation(c, symbol, checker.SignatureKindCall, node)
				if len(signatures) == 1 {
					if d := signatures[0].Declaration(); d != nil && d.Flags&ast.NodeFlagsJSDoc == 0 {
						setDeclaration(d)
					}
				}
				writeSignatures(signatures, prefix, isMethod, symbol)
			}
			setDeclaration(symbol.ValueDeclaration)
		}
		if flags&(ast.SymbolFlagsClass|ast.SymbolFlagsInterface) != 0 {
			if node.Kind == ast.KindThisKeyword || ast.IsThisInTypeQuery(node) {
				writeNewLine()
				dpw.WriteKeyword("this")
			} else if node.Kind == ast.KindConstructorKeyword && (ast.IsConstructorDeclaration(node.Parent) || ast.IsConstructSignatureDeclaration(node.Parent)) {
				setDeclaration(node.Parent)
				signatures := []*checker.Signature{c.GetSignatureFromDeclaration(node.Parent)}
				writeSignatures(signatures, "constructor ", false, symbol)
			} else {
				var signatures []*checker.Signature
				if flags&ast.SymbolFlagsClass != 0 && getCallOrNewExpression(node) != nil {
					signatures = getSignaturesAtLocation(c, symbol, checker.SignatureKindConstruct, node)
				}
				if len(signatures) == 1 {
					if d := signatures[0].Declaration(); d != nil && d.Flags&ast.NodeFlagsJSDoc == 0 {
						setDeclaration(d)
					}
					writeSignatures(signatures, "constructor ", false, symbol)
				} else {
					writeNewLine()
					if flags&ast.SymbolFlagsClass != 0 {
						classExpression := ast.GetDeclarationOfKind(symbol, ast.KindClassExpression)
						if classExpression != nil {
							// Local class expression: show "(local class)" prefix
							dpw.WritePunctuation("(")
							dpw.Write("local class")
							dpw.WritePunctuation(") ")
						}
						if !tryExpandSymbol(symbol, flags) {
							if classExpression == nil {
								if core.Some(symbol.Declarations, func(d *ast.Node) bool {
									return ast.IsClassDeclaration(d) && ast.HasAbstractModifier(d)
								}) {
									dpw.WriteKeyword("abstract ")
								}
								dpw.WriteKeyword("class ")
							}
							writeSymbolClassified(symbol, container, ast.SymbolFlagsNone, symbolFormatFlags)
							params := c.GetDeclaredTypeOfSymbol(symbol).AsInterfaceType().LocalTypeParameters()
							writeTypeParams(params)
						}
					} else {
						if !tryExpandSymbol(symbol, flags) {
							dpw.WriteKeyword("interface ")
							writeSymbolClassified(symbol, container, ast.SymbolFlagsNone, symbolFormatFlags)
							params := c.GetDeclaredTypeOfSymbol(symbol).AsInterfaceType().LocalTypeParameters()
							writeTypeParams(params)
						}
					}
				}
			}
			if flags&ast.SymbolFlagsClass != 0 {
				setDeclaration(symbol.ValueDeclaration)
			} else {
				setDeclaration(core.Find(symbol.Declarations, ast.IsInterfaceDeclaration))
			}
		}
		if flags&ast.SymbolFlagsEnum != 0 {
			writeNewLine()
			if !tryExpandSymbol(symbol, flags) {
				if core.Some(symbol.Declarations, func(d *ast.Node) bool {
					return ast.IsEnumDeclaration(d) && ast.IsEnumConst(d)
				}) {
					dpw.WriteKeyword("const ")
				}
				dpw.WriteKeyword("enum ")
				writeSymbolClassified(symbol, container, ast.SymbolFlagsNone, symbolFormatFlags)
			}
			setDeclaration(core.Find(symbol.Declarations, ast.IsEnumDeclaration))
		}
		if flags&ast.SymbolFlagsModule != 0 {
			writeNewLine()
			if !tryExpandSymbol(symbol, flags) {
				isModule := symbol.ValueDeclaration != nil && (ast.IsSourceFile(symbol.ValueDeclaration) || ast.IsAmbientModule(symbol.ValueDeclaration))
				dpw.WriteKeyword(core.IfElse(isModule, "module ", "namespace "))
				writeSymbolClassified(symbol, container, ast.SymbolFlagsNone, symbolFormatFlags)
				writeModuleImportAttributes(symbol)
			}
			setDeclaration(core.Find(symbol.Declarations, ast.IsModuleDeclaration))
		}
		if flags&ast.SymbolFlagsTypeParameter != 0 {
			writeNewLine()
			dpw.WritePunctuation("(")
			dpw.Write("type parameter")
			dpw.WritePunctuation(") ")
			tp := c.GetDeclaredTypeOfSymbol(symbol)
			writeSymbolClassified(symbol, container, ast.SymbolFlagsNone, symbolFormatFlags)
			cons := c.GetConstraintOfTypeParameter(tp)
			if cons != nil {
				dpw.WriteKeyword(" extends ")
				writeTypeClassified(cons, container, typeFormatFlags)
			}
			// Show context: "in ClassName<T>" or "in funcName<T>(...)"
			if symbol.Parent != nil {
				// Class/Interface type parameter
				dpw.WriteKeyword(" in ")
				writeSymbolClassified(symbol.Parent, container, ast.SymbolFlagsNone, symbolFormatFlags)
				if parentType := c.GetDeclaredTypeOfSymbol(symbol.Parent); parentType.AsInterfaceType() != nil {
					parentParams := parentType.AsInterfaceType().LocalTypeParameters()
					writeTypeParams(parentParams)
				}
			} else {
				// Method/function type parameter
				decl := ast.GetDeclarationOfKind(symbol, ast.KindTypeParameter)
				if decl != nil && decl.Parent != nil {
					declaration := decl.Parent
					if ast.IsFunctionLike(declaration) {
						dpw.WriteKeyword(" in ")
						if declaration.Kind == ast.KindConstructSignature {
							dpw.WriteKeyword("new ")
						} else if declaration.Kind != ast.KindCallSignature && declaration.Name() != nil {
							writeSymbolClassified(declaration.Symbol(), container, ast.SymbolFlagsNone, symbolFormatFlags)
						}
						sig := c.GetSignatureFromDeclaration(declaration)
						if sig != nil {
							writeSignatureClassified(sig, container, typeFormatFlags|checker.TypeFormatFlagsWriteTypeArgumentsOfSignature)
						}
					} else if ast.IsTypeAliasDeclaration(declaration) {
						dpw.WriteKeyword(" in ")
						dpw.WriteKeyword("type ")
						writeSymbolClassified(declaration.Symbol(), container, ast.SymbolFlagsNone, symbolFormatFlags)
						if declSymbol := declaration.Symbol(); declSymbol != nil {
							taParams := c.GetTypeAliasTypeParameters(declSymbol)
							writeTypeParams(taParams)
						}
					}
				}
			}
			setDeclaration(core.Find(symbol.Declarations, ast.IsTypeParameterDeclaration))
		}
		if flags&ast.SymbolFlagsTypeAlias != 0 {
			writeNewLine()
			dpw.WriteKeyword("type ")
			writeSymbolClassified(symbol, container, ast.SymbolFlagsNone, symbolFormatFlags)
			writeTypeParams(c.GetTypeAliasTypeParameters(symbol))
			dpw.WriteOperator(" = ")
			var typeAliasType *checker.Type
			if node.Parent != nil && ast.IsConstTypeReference(node.Parent) {
				typeAliasType = c.GetTypeAtLocation(node.Parent)
			} else {
				typeAliasType = c.GetDeclaredTypeOfSymbol(symbol)
			}
			writeTypeClassified(typeAliasType, container, typeFormatFlags|checker.TypeFormatFlagsInTypeAlias)
			setDeclaration(core.Find(symbol.Declarations, ast.IsTypeOrJSTypeAliasDeclaration))
		}
		if flags&ast.SymbolFlagsSignature != 0 {
			writeNewLine()
			writeTypeClassified(c.GetTypeOfSymbol(symbol), container, typeFormatFlags)
		}
	}
	writeSymbol(symbol)

	return symbolDisplayInfo{displayParts: dpw, declaration: firstDeclaration}
}

// typeParameterToString renders a type parameter declaration (e.g., "T extends FooType").
func typeParameterToString(c *checker.Checker, t *checker.Type, enclosingDeclaration *ast.Node, vc *checker.VerbosityContext) string {
	return c.TypeParameterToStringEx(t, enclosingDeclaration, vc)
}

func getNodeForQuickInfo(node *ast.Node) *ast.Node {
	if node.Parent == nil {
		return node
	}
	if ast.IsNewExpression(node.Parent) && node.Pos() == node.Parent.Pos() {
		return node.Parent.Expression()
	}
	if ast.IsNamedTupleMember(node.Parent) && node.Pos() == node.Parent.Pos() {
		return node.Parent
	}
	if ast.IsImportMeta(node.Parent) && node.Parent.Name() == node {
		return node.Parent
	}
	if ast.IsJsxNamespacedName(node.Parent) {
		return node.Parent
	}
	return node
}

func getSymbolAtLocationForQuickInfo(c *checker.Checker, node *ast.Node) *ast.Symbol {
	if objectElement := getContainingObjectLiteralElement(node); objectElement != nil {
		if contextualType := c.GetContextualType(objectElement.Parent, checker.ContextFlagsNone); contextualType != nil {
			if properties := c.GetPropertySymbolsFromContextualType(objectElement, contextualType, false /*unionSymbolOk*/); len(properties) == 1 {
				return properties[0]
			}
		}
	}
	return c.GetSymbolAtLocation(node)
}

func getSignaturesAtLocation(c *checker.Checker, symbol *ast.Symbol, kind checker.SignatureKind, node *ast.Node) []*checker.Signature {
	signatures := c.GetSignaturesOfType(c.RemoveMissingOrUndefinedType(c.GetTypeOfSymbol(symbol)), kind)
	if len(signatures) > 1 || len(signatures) == 1 && len(signatures[0].TypeParameters()) != 0 {
		if callNode := getCallOrNewExpression(node); callNode != nil {
			// We have a call or new expression, return the resolved signature
			return []*checker.Signature{c.GetResolvedSignature(callNode)}
		}
	}
	return signatures
}

func getCallOrNewExpression(node *ast.Node) *ast.Node {
	if ast.IsSourceFile(node) {
		return nil
	}
	if ast.IsPropertyAccessExpression(node.Parent) && node.Parent.Name() == node {
		node = node.Parent
	}
	if (ast.IsCallExpression(node.Parent) || ast.IsNewExpression(node.Parent)) && node.Parent.Expression() == node {
		return node.Parent
	}
	return nil
}

func containsTypedefTag(jsdoc *ast.Node) bool {
	if jsdoc.Kind == ast.KindJSDoc {
		if tags := jsdoc.AsJSDoc().Tags; tags != nil {
			for _, tag := range tags.Nodes {
				if tag.Kind == ast.KindJSDocTypedefTag || tag.Kind == ast.KindJSDocCallbackTag {
					return true
				}
			}
		}
	}
	return false
}

func writeCode(b *strings.Builder, lang string, code string) {
	if code == "" {
		return
	}
	ticks := 3
	for strings.Contains(code, strings.Repeat("`", ticks)) {
		ticks++
	}
	for range ticks {
		b.WriteByte('`')
	}
	b.WriteString(lang)
	b.WriteByte('\n')
	b.WriteString(code)
	b.WriteByte('\n')
	for range ticks {
		b.WriteByte('`')
	}
	b.WriteByte('\n')
}

func writeComments(getMappedLocation documentationLocationMapper, b *strings.Builder, c *checker.Checker, comments []*ast.Node, isMarkdown bool) {
	for _, comment := range comments {
		switch comment.Kind {
		case ast.KindJSDocText:
			b.WriteString(comment.Text())
		case ast.KindJSDocLink, ast.KindJSDocLinkPlain:
			writeJSDocLink(getMappedLocation, b, c, comment, false /*quote*/, isMarkdown)
		case ast.KindJSDocLinkCode:
			writeJSDocLink(getMappedLocation, b, c, comment, true /*quote*/, isMarkdown)
		}
	}
}

func writeJSDocLink(getMappedLocation documentationLocationMapper, b *strings.Builder, c *checker.Checker, link *ast.Node, quote bool, isMarkdown bool) {
	name := link.Name()
	text := strings.Trim(link.Text(), " ")
	if name == nil {
		writeQuotedString(b, text, quote && isMarkdown)
		return
	}
	if ast.IsIdentifier(name) && (name.Text() == "http" || name.Text() == "https") && strings.HasPrefix(text, "://") {
		linkText := name.Text() + text
		linkUri := linkText
		if commentPos := strings.IndexFunc(linkText, func(ch rune) bool { return ch == ' ' || ch == '|' }); commentPos >= 0 {
			linkUri = linkText[:commentPos]
			linkText = trimCommentPrefix(linkText[commentPos:])
			if linkText == "" {
				linkText = linkUri
			}
		}
		if isMarkdown {
			writeMarkdownLink(b, linkText, linkUri, quote)
		} else {
			writeQuotedString(b, linkText, false)
			if linkText != linkUri {
				b.WriteString(" (")
				b.WriteString(linkUri)
				b.WriteString(")")
			}
		}
		return
	}
	writeNameLink(getMappedLocation, b, c, name, text, quote, isMarkdown)
}

func writeNameLink(getMappedLocation documentationLocationMapper, b *strings.Builder, c *checker.Checker, name *ast.Node, text string, quote bool, isMarkdown bool) {
	declarations := getDeclarationsFromLocation(c, name)
	if len(declarations) != 0 {
		declaration := declarations[0]
		file := ast.GetSourceFileOfNode(declaration)
		node := core.OrElse(ast.GetNameOfDeclaration(declaration), declaration)
		loc, fidelity := getMappedLocation(file, createRangeFromNode(node, file))
		prefixLen := core.IfElse(strings.HasPrefix(text, "()"), 2, 0)
		linkText := trimCommentPrefix(text[prefixLen:])
		if linkText == "" {
			linkText = getEntityNameString(name) + text[:prefixLen]
		}
		if isMarkdown && fidelity.IsSingleSegment() {
			linkUri := fmt.Sprintf("%s#%d,%d-%d,%d", loc.Uri, loc.Range.Start.Line+1, loc.Range.Start.Character+1, loc.Range.End.Line+1, loc.Range.End.Character+1)
			writeMarkdownLink(b, linkText, linkUri, quote)
		} else {
			writeQuotedString(b, linkText, false)
		}
		return
	}
	writeQuotedString(b, getEntityNameString(name)+core.IfElse(len(text) != 0, " ", "")+text, quote && isMarkdown)
}

func trimCommentPrefix(text string) string {
	return strings.TrimLeft(strings.TrimPrefix(strings.TrimLeft(text, " "), "|"), " ")
}

func writeMarkdownLink(b *strings.Builder, text string, uri string, quote bool) {
	b.WriteString("[")
	writeQuotedString(b, text, quote)
	b.WriteString("](")
	b.WriteString(uri)
	b.WriteString(")")
}

func writeOptionalEntityName(b *strings.Builder, name *ast.Node) {
	if name != nil {
		b.WriteString(" ")
		writeQuotedString(b, getEntityNameString(name), true /*quote*/)
	}
}

func writeQuotedString(b *strings.Builder, str string, quote bool) {
	if quote && !strings.Contains(str, "`") {
		b.WriteString("`")
		b.WriteString(str)
		b.WriteString("`")
	} else {
		b.WriteString(str)
	}
}

func getEntityNameString(name *ast.Node) string {
	var b strings.Builder
	writeEntityNameParts(&b, name)
	return b.String()
}

func writeEntityNameParts(b *strings.Builder, node *ast.Node) {
	switch node.Kind {
	case ast.KindIdentifier:
		b.WriteString(node.Text())
	case ast.KindQualifiedName:
		writeEntityNameParts(b, node.AsQualifiedName().Left)
		b.WriteByte('.')
		writeEntityNameParts(b, node.AsQualifiedName().Right)
	case ast.KindPropertyAccessExpression:
		writeEntityNameParts(b, node.Expression())
		b.WriteByte('.')
		writeEntityNameParts(b, node.Name())
	case ast.KindParenthesizedExpression, ast.KindExpressionWithTypeArguments:
		writeEntityNameParts(b, node.Expression())
	case ast.KindJSDocNameReference:
		writeEntityNameParts(b, node.Name())
	}
}
