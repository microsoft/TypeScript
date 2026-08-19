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
	"github.com/microsoft/typescript-go/internal/spanmap"
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
func GetSymbolDocumentationComment(c *checker.Checker, symbol *ast.Symbol) string {
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
		if doc := getDocumentationFromDeclaration(noMappedLocation, c, symbol, decl, decl, lsproto.MarkupKindPlainText, true /*commentOnly*/); doc != "" && !slices.Contains(parts, doc) {
			parts = append(parts, doc)
		}
	}
	return strings.Join(parts, "\n")
}

// GetSymbolJSDocTags collects a symbol's JSDoc tags. It backs the API's Symbol.getJsDocTags
// and mirrors Strada's getJsDocTagsFromDeclarations, except each tag's text is rendered as a
// plain string rather than SymbolDisplayPart[]. Tags with no text have an empty Text field.
func GetSymbolJSDocTags(symbol *ast.Symbol) []JSDocTagInfo {
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

func getJSDoc(node *ast.Node) *ast.Node {
	return core.LastOrNil(node.JSDoc(nil))
}

func getJSDocOrTag(c *checker.Checker, node *ast.Node, seenSymbols *collections.Set[*ast.Symbol]) *ast.Node {
	if node == nil {
		return nil
	}
	if jsdoc := getJSDoc(node); jsdoc != nil {
		return jsdoc
	}
	switch {
	case ast.IsParameterDeclaration(node):
		name := node.Name()
		if ast.IsBindingPattern(name) {
			// For binding patterns, match JSDoc @param tags by position rather than by name
			return getJSDocParameterTagByPosition(c, node)
		}
		return getMatchingJSDocTag(c, node.Parent, name.Text(), isMatchingParameterTag, seenSymbols)
	case ast.IsTypeParameterDeclaration(node):
		return getMatchingJSDocTag(c, node.Parent, node.Name().Text(), isMatchingTemplateTag, seenSymbols)
	case ast.IsVariableDeclaration(node) && ast.IsVariableDeclarationList(node.Parent) && core.FirstOrNil(node.Parent.AsVariableDeclarationList().Declarations.Nodes) == node:
		return getJSDocOrTag(c, node.Parent.Parent, seenSymbols)
	case (ast.IsFunctionExpressionOrArrowFunction(node) || ast.IsClassExpression(node)) &&
		(ast.IsVariableDeclaration(node.Parent) || ast.IsPropertyDeclaration(node.Parent) || ast.IsPropertyAssignment(node.Parent)) && node.Parent.Initializer() == node:
		return getJSDocOrTag(c, node.Parent, seenSymbols)
	case ast.IsBindingElement(node) && ast.IsObjectBindingPattern(node.Parent):
		if name := node.PropertyNameOrName(); ast.IsIdentifier(name) {
			if objectType := c.GetTypeAtLocation(node.Parent); objectType != nil {
				if prop := c.GetPropertyOfType(objectType, name.Text()); prop != nil {
					for _, d := range prop.Declarations {
						if jsdoc := getJSDoc(d); jsdoc != nil {
							return jsdoc
						}
					}
				}
			}
		}
	}
	if symbol := node.Symbol(); symbol != nil && node.Parent != nil {
		if ast.IsFunctionDeclaration(node) || ast.IsMethodDeclaration(node) || ast.IsMethodSignatureDeclaration(node) || ast.IsConstructorDeclaration(node) || ast.IsConstructSignatureDeclaration(node) {
			firstSignature := core.Find(symbol.Declarations, ast.IsFunctionLike)
			if firstSignature != nil && node != firstSignature {
				if jsDoc := getJSDocOrTag(c, firstSignature, seenSymbols); jsDoc != nil {
					return jsDoc
				}
			}
		}
		if ast.IsClassOrInterfaceLike(node.Parent) {
			isStatic := ast.HasStaticModifier(node)
			classType := c.GetDeclaredTypeOfSymbol(node.Parent.Symbol())
			if isStatic {
				// For static members, use the checker's base constructor type resolution.
				// This correctly handles intersection constructor types from mixins
				// (e.g., typeof MixinClass & T) by preserving the full intersection.
				staticBaseType := c.GetApparentType(c.GetBaseConstructorTypeOfClass(classType))
				if prop := c.GetPropertyOfType(staticBaseType, symbol.Name); prop != nil && prop.ValueDeclaration != nil && seenSymbols.AddIfAbsent(prop) {
					if jsDoc := getJSDocOrTag(c, prop.ValueDeclaration, seenSymbols); jsDoc != nil {
						return jsDoc
					}
				}
			} else {
				for _, baseType := range c.GetBaseTypes(classType) {
					if prop := c.GetPropertyOfType(baseType, symbol.Name); prop != nil && prop.ValueDeclaration != nil && seenSymbols.AddIfAbsent(prop) {
						if jsDoc := getJSDocOrTag(c, prop.ValueDeclaration, seenSymbols); jsDoc != nil {
							return jsDoc
						}
					}
				}
			}
		}
	}
	return nil
}

func getMatchingJSDocTag(c *checker.Checker, node *ast.Node, name string, match func(*ast.Node, string) bool, seenSymbols *collections.Set[*ast.Symbol]) *ast.Node {
	if jsdoc := getJSDocOrTag(c, node, seenSymbols); jsdoc != nil && jsdoc.Kind == ast.KindJSDoc {
		if tags := jsdoc.AsJSDoc().Tags; tags != nil {
			for _, tag := range tags.Nodes {
				if match(tag, name) {
					return tag
				}
			}
		}
	}
	return nil
}

// getJSDocParameterTagByPosition finds a JSDoc @param tag for a binding pattern parameter by position.
// Since binding patterns don't have a simple name, we match the @param tag at the same index as the parameter.
func getJSDocParameterTagByPosition(c *checker.Checker, param *ast.Node) *ast.Node {
	parent := param.Parent
	if parent == nil {
		return nil
	}

	// Find the parameter's index in the parent's parameters list
	params := parent.Parameters()
	paramIndex := -1
	for i, p := range params {
		if p.AsNode() == param {
			paramIndex = i
			break
		}
	}
	if paramIndex < 0 {
		return nil
	}

	// Get the JSDoc for the parent function/method
	jsdoc := getJSDocOrTag(c, parent, &collections.Set[*ast.Symbol]{})
	if jsdoc == nil || jsdoc.Kind != ast.KindJSDoc {
		return nil
	}

	// Collect all @param tags in order
	tags := jsdoc.AsJSDoc().Tags
	if tags == nil {
		return nil
	}

	paramTagIndex := 0
	for _, tag := range tags.Nodes {
		if tag.Kind == ast.KindJSDocParameterTag {
			if paramTagIndex == paramIndex {
				return tag
			}
			paramTagIndex++
		}
	}
	return nil
}

func isMatchingParameterTag(tag *ast.Node, name string) bool {
	return tag.Kind == ast.KindJSDocParameterTag && isNodeWithName(tag, name)
}

func isMatchingTemplateTag(tag *ast.Node, name string) bool {
	return tag.Kind == ast.KindJSDocTemplateTag && core.Some(tag.TypeParameters(), func(tp *ast.Node) bool { return isNodeWithName(tp, name) })
}

func isNodeWithName(node *ast.Node, name string) bool {
	nodeName := node.Name()
	return ast.IsIdentifier(nodeName) && nodeName.Text() == name
}

func noMappedLocation(*ast.SourceFile, core.TextRange) (lsproto.Location, spanmap.Fidelity) {
	return lsproto.Location{}, spanmap.FidelityNone
}
