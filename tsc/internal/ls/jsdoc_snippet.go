package ls

import (
	"context"
	"fmt"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/format"
	"github.com/microsoft/typescript-go/internal/locale"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

type docCommentTemplate struct {
	newText string
}

type commentOwnerInfo struct {
	commentOwner *ast.Node
	parameters   []*ast.ParameterDeclarationNode
	hasReturn    bool
}

func (l *LanguageService) getJSDocSnippetCompletion(ctx context.Context, file *ast.SourceFile, position int) *CompletionList {
	if l.UserPreferences().EnableJSDocCompletions.IsFalse() {
		return nil
	}
	if !isPotentiallyValidJSDocSnippetCompletionPosition(file, position) {
		return nil
	}
	newLine := l.FormatOptions().NewLineCharacter
	if newLine == "" {
		newLine = "\n"
	}
	template := getDocCommentTemplateAtPosition(file, position, l.UserPreferences().GenerateReturnInDocTemplate.IsTrue(), newLine)
	if template == nil {
		return nil
	}

	insertText := template.newText
	var insertTextFormat *lsproto.InsertTextFormat
	if clientSupportsItemSnippet(ctx) {
		insertText = templateToSnippet(insertText, newLine)
		insertTextFormat = new(lsproto.InsertTextFormatSnippet)
	}

	editRange := l.getJSDocSnippetCompletionRange(ctx, file, position, insertText)
	var commitCharacters *[]string
	if clientSupportsItemCommitCharacters(ctx) {
		commitCharacters = &[]string{}
	}
	item := &CompletionItem{
		CompletionItem: &lsproto.CompletionItem{
			Label:            "/** */",
			Kind:             new(lsproto.CompletionItemKindText),
			Detail:           new(diagnostics.JSDoc_comment.Localize(locale.FromContext(ctx))),
			SortText:         new("\x00"),
			InsertTextFormat: insertTextFormat,
			TextEdit:         editRange,
			CommitCharacters: commitCharacters,
		},
	}
	return &CompletionList{
		IsIncomplete: false,
		Items:        []*CompletionItem{item},
	}
}

func isPotentiallyValidJSDocSnippetCompletionPosition(file *ast.SourceFile, position int) bool {
	text := file.Text()
	lineStart := format.GetLineStartPositionForPosition(position, file)
	prefix := text[lineStart:position]
	if !isJSDocSnippetPrefix(prefix) {
		return false
	}

	lineEnd := getLineEndOfPosition(file, position)
	suffix := text[position:lineEnd]
	return isJSDocSnippetSuffix(suffix)
}

func (l *LanguageService) getJSDocSnippetCompletionRange(ctx context.Context, file *ast.SourceFile, position int, newText string) *lsproto.TextEditOrInsertReplaceEdit {
	text := file.Text()
	lineStart := format.GetLineStartPositionForPosition(position, file)
	prefix := text[lineStart:position]
	start := position
	if prefixStart, ok := getJSDocSnippetPrefixStart(prefix); ok {
		start = lineStart + prefixStart
	}

	lineEnd := getLineEndOfPosition(file, position)
	suffix := text[position:lineEnd]
	end := position
	if suffixEnd, ok := getJSDocSnippetSuffixEnd(suffix); ok {
		end += suffixEnd
	}

	replacementRange := l.createLspRangeFromBounds(start, end, file)
	if clientSupportsItemInsertReplace(ctx) {
		return &lsproto.TextEditOrInsertReplaceEdit{
			InsertReplaceEdit: &lsproto.InsertReplaceEdit{
				NewText: newText,
				Insert:  replacementRange,
				Replace: replacementRange,
			},
		}
	}
	return &lsproto.TextEditOrInsertReplaceEdit{
		TextEdit: &lsproto.TextEdit{
			NewText: newText,
			Range:   replacementRange,
		},
	}
}

func getDocCommentTemplateAtPosition(sourceFile *ast.SourceFile, position int, generateReturnInDocTemplate bool, newLine string) *docCommentTemplate {
	tokenAtPos := astnav.GetTokenAtPosition(sourceFile, position)
	if tokenAtPos == nil {
		return nil
	}

	existingDocComment := ast.FindAncestor(tokenAtPos, ast.IsJSDoc)
	docCommentEnd, hasDocCommentAtPosition, hasClosingDocCommentAtPosition := getDocCommentEndAtPosition(sourceFile, position)
	isInEmptyDocComment := existingDocComment != nil || hasDocCommentAtPosition
	if isNonEmptyJSDoc(existingDocComment) && hasDocCommentAtPosition && !hasClosingDocCommentAtPosition {
		reparseText := sourceFile.Text()[:position] + " */" + sourceFile.Text()[position:]
		reparse := parser.ParseSourceFile(sourceFile.ParseOptions(), reparseText, sourceFile.ScriptKind)
		return getDocCommentTemplateAtPosition(reparse, position, generateReturnInDocTemplate, newLine)
	}
	if isNonEmptyJSDoc(existingDocComment) {
		return nil
	}
	if existingDocComment == nil && hasDocCommentAtPosition {
		tokenAtPos = astnav.GetTokenAtPosition(sourceFile, skipWhitespace(sourceFile.Text(), docCommentEnd))
		if tokenAtPos == nil {
			return nil
		}
	}
	tokenStart := astnav.GetStartOfNode(tokenAtPos, sourceFile, false /*includeJSDoc*/)
	if !isInEmptyDocComment && tokenStart < position {
		return nil
	}

	commentOwnerInfo := getCommentOwnerInfo(tokenAtPos, generateReturnInDocTemplate)
	if commentOwnerInfo == nil {
		return nil
	}

	commentOwner := commentOwnerInfo.commentOwner
	lastJSDoc := core.LastOrNil(commentOwner.JSDoc(sourceFile))
	if commentOwnerStart := astnav.GetStartOfNode(commentOwner, sourceFile, false /*includeJSDoc*/); commentOwnerStart < position ||
		lastJSDoc != nil && existingDocComment != nil && lastJSDoc != existingDocComment {
		return nil
	}

	indentation := getIndentationStringAtPosition(sourceFile, position)
	tags := parameterDocComments(commentOwnerInfo.parameters, ast.IsSourceFileJS(sourceFile), indentation, newLine)
	if commentOwnerInfo.hasReturn {
		tags += returnsDocComment(indentation, newLine)
	}

	if tags != "" && !hasJSDocTags(commentOwner, sourceFile) {
		preamble := "/**" + newLine + indentation + " * "
		endLine := ""
		if tokenStart == position {
			endLine = newLine + indentation
		}
		return &docCommentTemplate{newText: preamble + newLine + tags + indentation + " */" + endLine}
	}
	return &docCommentTemplate{newText: "/** */"}
}

func getDocCommentEndAtPosition(file *ast.SourceFile, position int) (end int, ok bool, hasClosing bool) {
	text := file.Text()
	lineStart := format.GetLineStartPositionForPosition(position, file)
	lineEnd := getLineEndOfPosition(file, position)
	prefix := text[lineStart:position]
	suffix := text[position:lineEnd]
	if !strings.HasSuffix(trimRightSingleLineWhitespace(prefix), "/**") {
		return 0, false, false
	}
	suffixEnd, hasClosing := getJSDocSnippetSuffixEnd(suffix)
	return position + suffixEnd, true, hasClosing
}

func skipWhitespace(text string, position int) int {
	for position < len(text) {
		ch, size := stringutil.DecodeJSStringRune(text[position:])
		if size == 0 {
			break
		}
		if !stringutil.IsWhiteSpaceLike(ch) {
			break
		}
		position += size
	}
	return position
}

func getCommentOwnerInfo(tokenAtPos *ast.Node, generateReturnInDocTemplate bool) *commentOwnerInfo {
	for node := tokenAtPos; node != nil; node = node.Parent {
		info, quit := getCommentOwnerInfoWorker(node, generateReturnInDocTemplate)
		if info != nil || quit {
			return info
		}
	}
	return nil
}

func getCommentOwnerInfoWorker(commentOwner *ast.Node, generateReturnInDocTemplate bool) (*commentOwnerInfo, bool) {
	if commentOwner == nil {
		return nil, false
	}
	switch commentOwner.Kind {
	case ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindMethodDeclaration, ast.KindConstructor, ast.KindMethodSignature, ast.KindArrowFunction:
		return &commentOwnerInfo{commentOwner: commentOwner, parameters: commentOwner.Parameters(), hasReturn: hasReturn(commentOwner, generateReturnInDocTemplate)}, false
	case ast.KindPropertyAssignment:
		return getCommentOwnerInfoWorker(commentOwner.AsPropertyAssignment().Initializer, generateReturnInDocTemplate)
	case ast.KindClassDeclaration, ast.KindInterfaceDeclaration, ast.KindEnumDeclaration, ast.KindEnumMember, ast.KindTypeAliasDeclaration:
		return &commentOwnerInfo{commentOwner: commentOwner}, false
	case ast.KindPropertySignature:
		if typeNode := commentOwner.AsPropertySignatureDeclaration().Type; typeNode != nil && ast.IsFunctionTypeNode(typeNode) {
			return &commentOwnerInfo{commentOwner: commentOwner, parameters: typeNode.Parameters(), hasReturn: hasReturn(typeNode, generateReturnInDocTemplate)}, false
		}
		return &commentOwnerInfo{commentOwner: commentOwner}, false
	case ast.KindVariableStatement:
		declarations := commentOwner.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes
		if len(declarations) == 1 {
			if initializer := declarations[0].AsVariableDeclaration().Initializer; initializer != nil {
				if host := getRightHandSideOfAssignment(initializer); host != nil {
					return &commentOwnerInfo{commentOwner: commentOwner, parameters: host.Parameters(), hasReturn: hasReturn(host, generateReturnInDocTemplate)}, false
				}
			}
		}
		return &commentOwnerInfo{commentOwner: commentOwner}, false
	case ast.KindSourceFile:
		return nil, true
	case ast.KindModuleDeclaration:
		if commentOwner.Parent.Kind == ast.KindModuleDeclaration {
			return nil, false
		}
		return &commentOwnerInfo{commentOwner: commentOwner}, false
	case ast.KindExpressionStatement:
		return getCommentOwnerInfoWorker(commentOwner.AsExpressionStatement().Expression, generateReturnInDocTemplate)
	case ast.KindBinaryExpression:
		binaryExpression := commentOwner.AsBinaryExpression()
		if ast.GetAssignmentDeclarationKind(commentOwner) == ast.JSDeclarationKindNone {
			return nil, true
		}
		if ast.IsFunctionLike(binaryExpression.Right) {
			return &commentOwnerInfo{commentOwner: commentOwner, parameters: binaryExpression.Right.Parameters(), hasReturn: hasReturn(binaryExpression.Right, generateReturnInDocTemplate)}, false
		}
		return &commentOwnerInfo{commentOwner: commentOwner}, false
	case ast.KindPropertyDeclaration:
		if initializer := commentOwner.AsPropertyDeclaration().Initializer; initializer != nil && ast.IsFunctionExpressionOrArrowFunction(initializer) {
			return &commentOwnerInfo{commentOwner: commentOwner, parameters: initializer.Parameters(), hasReturn: hasReturn(initializer, generateReturnInDocTemplate)}, false
		}
	}
	return nil, false
}

func hasReturn(node *ast.Node, generateReturnInDocTemplate bool) bool {
	if !generateReturnInDocTemplate {
		return false
	}
	if ast.IsFunctionTypeNode(node) {
		return true
	}
	if ast.IsArrowFunction(node) {
		if body := node.Body(); body != nil && ast.IsExpression(body) {
			return true
		}
	}
	return ast.IsFunctionLikeDeclaration(node) && node.Body() != nil && ast.IsBlock(node.Body()) && ast.ForEachReturnStatement(node.Body(), func(*ast.Node) bool {
		return true
	})
}

func getRightHandSideOfAssignment(rightHandSide *ast.Node) *ast.Node {
	if rightHandSide == nil {
		return nil
	}
	for rightHandSide.Kind == ast.KindParenthesizedExpression {
		rightHandSide = rightHandSide.AsParenthesizedExpression().Expression
	}
	switch rightHandSide.Kind {
	case ast.KindFunctionExpression, ast.KindArrowFunction:
		return rightHandSide
	case ast.KindClassExpression:
		return core.Find(rightHandSide.Members(), ast.IsConstructorDeclaration)
	default:
		return nil
	}
}

func parameterDocComments(parameters []*ast.ParameterDeclarationNode, isJavaScriptFile bool, indentation, newLine string) string {
	var b strings.Builder
	for i, parameter := range parameters {
		paramName := fmt.Sprintf("param%d", i)
		if ast.IsIdentifier(parameter.Name()) {
			paramName = parameter.Name().Text()
		}
		paramType := ""
		if isJavaScriptFile {
			if parameter.AsParameterDeclaration().DotDotDotToken != nil {
				paramType = "{...any} "
			} else {
				paramType = "{any} "
			}
		}
		b.WriteString(indentation)
		b.WriteString(" * @param ")
		b.WriteString(paramType)
		b.WriteString(paramName)
		b.WriteString(newLine)
	}
	return b.String()
}

func returnsDocComment(indentation, newLine string) string {
	return indentation + " * @returns" + newLine
}

func getIndentationStringAtPosition(sourceFile *ast.SourceFile, position int) string {
	text := sourceFile.Text()
	lineStart := format.GetLineStartPositionForPosition(position, sourceFile)
	pos := lineStart
	for pos < position {
		ch, size := stringutil.DecodeJSStringRune(text[pos:])
		if size == 0 {
			break
		}
		if !stringutil.IsWhiteSpaceSingleLine(ch) {
			break
		}
		pos += size
	}
	return text[lineStart:pos]
}

func isNonEmptyJSDoc(jsdoc *ast.Node) bool {
	if jsdoc == nil {
		return false
	}
	data := jsdoc.AsJSDoc()
	return data.Comment != nil && len(data.Comment.Nodes) > 0 || data.Tags != nil && len(data.Tags.Nodes) > 0
}

func hasJSDocTags(node *ast.Node, file *ast.SourceFile) bool {
	jsdocs := node.JSDoc(file)
	if len(jsdocs) == 0 {
		return false
	}
	tags := jsdocs[len(jsdocs)-1].AsJSDoc().Tags
	return tags != nil && len(tags.Nodes) > 0
}

func templateToSnippet(template string, newLine string) string {
	if template == "/** */" {
		return "/**" + newLine + " * $0" + newLine + " */"
	}

	snippetIndex := 1
	template = escapeSnippetText(template)
	template = stripJSDocTemplateIndentation(template, newLine)
	return transformJSDocTemplateLines(template, newLine, &snippetIndex)
}

func stripJSDocTemplateIndentation(template string, newLine string) string {
	lines := strings.Split(template, newLine)
	for i, line := range lines {
		trimmed := strings.TrimLeft(line, " \t")
		if strings.HasPrefix(trimmed, "/") {
			lines[i] = trimmed
		} else if strings.HasPrefix(trimmed, "*") {
			lines[i] = " " + trimmed
		}
	}
	return strings.Join(lines, newLine)
}

func transformJSDocTemplateLines(template string, newLine string, snippetIndex *int) string {
	lines := strings.Split(template, newLine)
	for i, line := range lines {
		if i > 0 && strings.HasPrefix(lines[i-1], "/**") && lineHasOnlyJSDocAsterisk(line) {
			lines[i] = line + "$0"
			continue
		}
		if transformed, ok := transformJSDocParamLine(line, snippetIndex); ok {
			lines[i] = transformed
			continue
		}
		if transformed, ok := transformJSDocReturnsLine(line, snippetIndex); ok {
			lines[i] = transformed
		}
	}
	return strings.Join(lines, newLine)
}

func lineHasOnlyJSDocAsterisk(line string) bool {
	line = strings.TrimLeft(line, " \t")
	return strings.HasPrefix(line, "*") && isOnlySpacesOrTabs(line[1:])
}

func transformJSDocParamLine(line string, snippetIndex *int) (string, bool) {
	prefix := ""
	rest := line
	if strings.HasPrefix(rest, " ") {
		prefix = " "
		rest = rest[1:]
	}
	if !strings.HasPrefix(rest, "* @param") {
		return "", false
	}
	rest = rest[len("* @param"):]
	if !startsWithSingleLineWhitespace(rest) {
		return "", false
	}
	rest = strings.TrimLeft(rest, " \t")

	var typeText string
	if strings.HasPrefix(rest, "{") {
		closeBrace := strings.IndexByte(rest, '}')
		if closeBrace < 0 {
			return "", false
		}
		typeText = " " + rest[:closeBrace+1]
		rest = rest[closeBrace+1:]
		if !startsWithSingleLineWhitespace(rest) {
			return "", false
		}
		rest = strings.TrimLeft(rest, " \t")
	}

	paramName, rest, ok := scanNonWhitespace(rest)
	if !ok || !isOnlySpacesOrTabs(rest) {
		return "", false
	}

	out := prefix + "* @param "
	if typeText == " {any}" || typeText == " {*}" {
		out += fmt.Sprintf("{${%d:*}} ", *snippetIndex)
		*snippetIndex++
	} else if typeText != "" {
		out += typeText + " "
	}
	out += fmt.Sprintf("%s ${%d}", paramName, *snippetIndex)
	*snippetIndex++
	return out, true
}

func transformJSDocReturnsLine(line string, snippetIndex *int) (string, bool) {
	prefix := ""
	rest := line
	if strings.HasPrefix(rest, " ") {
		prefix = " "
		rest = rest[1:]
	}
	if !strings.HasPrefix(rest, "* @returns") || !isOnlySpacesOrTabs(rest[len("* @returns"):]) {
		return "", false
	}
	text := fmt.Sprintf("%s* @returns ${%d}", prefix, *snippetIndex)
	*snippetIndex++
	return text, true
}

func scanNonWhitespace(text string) (word string, rest string, ok bool) {
	if text == "" {
		return "", "", false
	}
	for i := 0; i < len(text); {
		ch, size := stringutil.DecodeJSStringRune(text[i:])
		if size == 0 || stringutil.IsWhiteSpaceLike(ch) {
			if i == 0 {
				return "", "", false
			}
			return text[:i], text[i:], true
		}
		i += size
	}
	return text, "", true
}

func isJSDocSnippetPrefix(prefix string) bool {
	trimmed := trimRightSingleLineWhitespace(prefix)
	if strings.HasSuffix(trimmed, "/**") {
		return true
	}
	start := skipSingleLineWhitespace(prefix, 0)
	if start >= len(trimmed) || trimmed[start] != '/' {
		return false
	}
	if start+3 > len(trimmed) {
		return false
	}
	for i := start + 1; i < len(trimmed); i++ {
		if trimmed[i] != '*' {
			return false
		}
	}
	return len(trimmed)-start >= 3
}

func getJSDocSnippetPrefixStart(prefix string) (int, bool) {
	trimmed := trimRightSingleLineWhitespace(prefix)
	for i := len(trimmed) - 1; i >= 0 && trimmed[i] == '*'; i-- {
		if i > 0 && trimmed[i-1] == '/' {
			return i - 1, true
		}
	}
	if strings.HasSuffix(trimmed, "/") {
		return len(trimmed) - 1, true
	}
	return 0, false
}

func isJSDocSnippetSuffix(suffix string) bool {
	trimmed := trimRightSingleLineWhitespace(suffix[skipSingleLineWhitespace(suffix, 0):])
	if trimmed == "" {
		return true
	}
	if !strings.HasSuffix(trimmed, "/") {
		return false
	}
	for i := range len(trimmed) - 1 {
		if trimmed[i] != '*' {
			return false
		}
	}
	return true
}

func getJSDocSnippetSuffixEnd(suffix string) (int, bool) {
	pos := skipSingleLineWhitespace(suffix, 0)
	for pos < len(suffix) && suffix[pos] == '*' {
		pos++
	}
	if pos < len(suffix) && suffix[pos] == '/' {
		return pos + 1, true
	}
	return 0, false
}

func trimRightSingleLineWhitespace(text string) string {
	end := 0
	for pos := 0; pos < len(text); {
		ch, size := stringutil.DecodeJSStringRune(text[pos:])
		if size == 0 {
			break
		}
		pos += size
		if !stringutil.IsWhiteSpaceSingleLine(ch) {
			end = pos
		}
	}
	return text[:end]
}

func skipSingleLineWhitespace(text string, pos int) int {
	for pos < len(text) {
		ch, size := stringutil.DecodeJSStringRune(text[pos:])
		if size == 0 || !stringutil.IsWhiteSpaceSingleLine(ch) {
			break
		}
		pos += size
	}
	return pos
}

func isOnlySingleLineWhitespace(text string) bool {
	return skipSingleLineWhitespace(text, 0) == len(text)
}

func startsWithSingleLineWhitespace(text string) bool {
	if text == "" {
		return false
	}
	ch, size := stringutil.DecodeJSStringRune(text)
	return size != 0 && stringutil.IsWhiteSpaceSingleLine(ch)
}

func isOnlySpacesOrTabs(text string) bool {
	for i := range len(text) {
		if text[i] != ' ' && text[i] != '\t' {
			return false
		}
	}
	return true
}
