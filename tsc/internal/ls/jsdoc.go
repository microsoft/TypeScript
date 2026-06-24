package ls

import (
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/scanner"
)

// JSDocTagInfo mirrors Strada's `JSDocTagInfo`, but renders the tag's text as a
// plain string instead of `SymbolDisplayPart[]`.
type JSDocTagInfo struct {
	Name string
	Text string
}

// GetSymbolDocumentationComment renders a symbol's documentation comment as plain text.
// It backs the API's Symbol.getDocumentationComment and mirrors Strada's
// getJsDocCommentsFromDeclarations: comments are gathered from each unique declaration,
// deduplicated, and joined with line breaks. Like Strada, it does not resolve aliases —
// consumers resolve aliases themselves (via getAliasedSymbol) and re-query if desired.
func (l *LanguageService) GetSymbolDocumentationComment(c *checker.Checker, symbol *ast.Symbol) string {
	if symbol == nil {
		return ""
	}
	var parts []string
	var seen collections.Set[*ast.Node]
	for _, decl := range symbol.Declarations {
		if decl == nil {
			continue
		}
		if !seen.AddIfAbsent(decl) {
			continue
		}
		if doc := l.getDocumentationFromDeclaration(c, symbol, decl, decl, lsproto.MarkupKindPlainText, true /*commentOnly*/); doc != "" && !slices.Contains(parts, doc) {
			parts = append(parts, doc)
		}
	}
	return strings.Join(parts, "\n")
}

// GetSymbolJSDocTags collects a symbol's JSDoc tags. It backs the API's Symbol.getJsDocTags
// and mirrors Strada's getJsDocTagsFromDeclarations, except each tag's text is rendered as a
// plain string rather than SymbolDisplayPart[]. Tags with no text have an empty Text field.
func (l *LanguageService) GetSymbolJSDocTags(symbol *ast.Symbol) []JSDocTagInfo {
	if symbol == nil {
		return nil
	}
	var infos []JSDocTagInfo
	var seen collections.Set[*ast.Node]
	for _, decl := range symbol.Declarations {
		if decl == nil {
			continue
		}
		if !seen.AddIfAbsent(decl) {
			continue
		}
		tags := declarationJSDocTags(decl)
		// Skip comments containing @typedef/@callback since they're not associated with a
		// particular declaration, unless they also carry @param/@return (treated as local docs).
		hasTypedef := core.Some(tags, func(t *ast.Node) bool {
			return t.Kind == ast.KindJSDocTypedefTag || t.Kind == ast.KindJSDocCallbackTag
		})
		hasParamOrReturn := core.Some(tags, func(t *ast.Node) bool {
			return t.Kind == ast.KindJSDocParameterTag || t.Kind == ast.KindJSDocReturnTag
		})
		if hasTypedef && !hasParamOrReturn {
			continue
		}
		for _, tag := range tags {
			infos = append(infos, JSDocTagInfo{Name: tag.TagName().Text(), Text: getJSDocTagText(tag)})
		}
	}
	return infos
}

// declarationJSDocTags returns the JSDoc tags associated with a declaration, walking the
// JSDoc comment location chain like the checker's getAllJSDocTags.
func declarationJSDocTags(node *ast.Node) []*ast.Node {
	if node.Flags&ast.NodeFlagsJSDoc == 0 {
		for current := node; current != nil; current = ast.GetNextJSDocCommentLocation(current) {
			jsdocs := current.JSDoc(nil)
			if len(jsdocs) == 0 {
				continue
			}
			lastJSDoc := jsdocs[len(jsdocs)-1].AsJSDoc()
			if lastJSDoc.Tags != nil {
				return lastJSDoc.Tags.Nodes
			}
		}
	}
	return nil
}

// getJSDocTagText renders the text of a single JSDoc tag as a plain string, mirroring
// Strada's getCommentDisplayParts collapsed from SymbolDisplayPart[] to a string.
func getJSDocTagText(tag *ast.Node) string {
	comment := scanner.GetTextOfJSDocComment(tag.CommentList())
	addComment := func(s string) string {
		if comment == "" {
			return s
		}
		return s + " " + comment
	}
	switch tag.Kind {
	case ast.KindJSDocThrowsTag:
		if te := tag.AsJSDocThrowsTag().TypeExpression; te != nil {
			return addComment(scanner.GetTextOfNode(te))
		}
		return comment
	case ast.KindJSDocImplementsTag:
		return addComment(scanner.GetTextOfNode(tag.AsJSDocImplementsTag().ClassName))
	case ast.KindJSDocAugmentsTag:
		return addComment(scanner.GetTextOfNode(tag.AsJSDocAugmentsTag().ClassName))
	case ast.KindJSDocTemplateTag:
		templateTag := tag.AsJSDocTemplateTag()
		var b strings.Builder
		if templateTag.Constraint != nil {
			b.WriteString(scanner.GetTextOfNode(templateTag.Constraint))
		}
		if templateTag.TypeParameters != nil {
			for i, tp := range templateTag.TypeParameters.Nodes {
				if i == 0 && b.Len() != 0 {
					b.WriteString(" ")
				}
				if i != 0 {
					b.WriteString(", ")
				}
				b.WriteString(scanner.GetTextOfNode(tp))
			}
		}
		if comment != "" {
			if b.Len() != 0 {
				b.WriteString(" ")
			}
			b.WriteString(comment)
		}
		return b.String()
	case ast.KindJSDocTypeTag:
		return addComment(scanner.GetTextOfNode(tag.AsJSDocTypeTag().TypeExpression))
	case ast.KindJSDocSatisfiesTag:
		return addComment(scanner.GetTextOfNode(tag.AsJSDocSatisfiesTag().TypeExpression))
	case ast.KindJSDocSeeTag:
		if ne := tag.AsJSDocSeeTag().NameExpression; ne != nil {
			return addComment(scanner.GetTextOfNode(ne))
		}
		return comment
	case ast.KindJSDocParameterTag, ast.KindJSDocPropertyTag:
		if name := tag.Name(); name != nil {
			return addComment(scanner.GetTextOfNode(name))
		}
		return comment
	default:
		return comment
	}
}
