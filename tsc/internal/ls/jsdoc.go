package ls

import (
	"slices"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
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
	addPart := func(doc string) {
		if doc != "" && !slices.Contains(parts, doc) {
			parts = append(parts, doc)
		}
	}
	for _, decl := range symbol.Declarations() {
		if decl == nil {
			continue
		}
		if !seen.AddIfAbsent(decl) {
			continue
		}
		if ast.IsParameterDeclaration(decl) {
			// Strada collects every comment-having node of a parameter: its own JSDoc
			// and each matching `@param` tag of the hosting declaration (nearest first),
			// deduplicating identical comments.
			seenSymbols := &collections.Set[*ast.Symbol]{}
			seenSymbols.Add(symbol)
			for _, node := range parameterDocumentationNodes(c, decl, seenSymbols) {
				if node.Kind == ast.KindJSDoc && containsTypedefTag(node) {
					continue
				}
				var b strings.Builder
				writeComments(noMappedLocation, &b, c, node.Comments(), false /*isMarkdown*/)
				addPart(b.String())
			}
			continue
		}
		addPart(getDocumentationFromDeclaration(noMappedLocation, c, symbol, decl, decl, lsproto.MarkupKindPlainText, true /*commentOnly*/))
	}
	return strings.Join(parts, "\n")
}

// GetSymbolJSDocTags collects a symbol's JSDoc tags. It backs the API's Symbol.getJsDocTags
// and mirrors Strada's getJsDocTagsFromDeclarations, except each tag's text is rendered as a
// plain string rather than SymbolDisplayPart[]. Tags with no text have an empty Text field.
func GetSymbolJSDocTags(c *checker.Checker, symbol *ast.Symbol) []JSDocTagInfo {
	if symbol == nil {
		return nil
	}
	// The guard is shared across the whole lookup, including the base-property
	// fallback for constructor parameters: `class C implements C { constructor(public x: number) {} }`
	// resolves the implemented type's `x` back to the very parameter property being queried.
	seenSymbols := &collections.Set[*ast.Symbol]{}
	seenSymbols.Add(symbol)
	return getSymbolJSDocTagsWorker(c, symbol, seenSymbols)
}

func getSymbolJSDocTagsWorker(c *checker.Checker, symbol *ast.Symbol, seenSymbols *collections.Set[*ast.Symbol]) []JSDocTagInfo {
	var infos []JSDocTagInfo
	var seen collections.Set[*ast.Node]
	for _, decl := range symbol.Declarations() {
		if decl == nil {
			continue
		}
		if !seen.AddIfAbsent(decl) {
			continue
		}
		if ast.IsParameterDeclaration(decl) {
			// Strada (getJSDocCommentsAndTags for a parameter): the tags of the
			// parameter's own JSDoc first, then the hosting declaration's matching
			// `@param` tags (getJSDocParameterTags: by name for identifiers, by
			// position for binding patterns; nearest comment location first). Only
			// when that yields nothing does a CONSTRUCTOR parameter inherit the tags
			// of a same-named property on the class's super types (findBaseOfDeclaration).
			var tags []*ast.Node
			if jsdoc := getJSDoc(decl); jsdoc != nil && jsdoc.Kind == ast.KindJSDoc && jsdoc.AsJSDoc().Tags != nil {
				tags = append(tags, jsdoc.AsJSDoc().Tags.Nodes...)
			}
			tags = append(tags, ownParameterTags(decl)...)
			if len(tags) == 0 {
				if prop := findConstructorParamBaseProperty(c, decl, seenSymbols); prop != nil {
					infos = append(infos, getSymbolJSDocTagsWorker(c, prop, seenSymbols)...)
				}
				continue
			}
			for _, tag := range tags {
				infos = append(infos, JSDocTagInfo{Name: tag.TagName().Text(), Text: getJSDocTagText(tag)})
			}
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
	if ast.IsParameterDeclaration(node) {
		// Single-node consumers (hover) get the nearest documentation node a
		// parameter has; see parameterDocumentationNodes for the Strada rules.
		return core.FirstOrNil(parameterDocumentationNodes(c, node, seenSymbols))
	}
	if jsdoc := getJSDoc(node); jsdoc != nil {
		return jsdoc
	}
	switch {
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
					for _, d := range prop.Declarations() {
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
			firstSignature := core.Find(symbol.Declarations(), ast.IsFunctionLike)
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
				if prop := c.GetPropertyOfType(staticBaseType, symbol.Name()); prop != nil && prop.ValueDeclaration() != nil && seenSymbols.AddIfAbsent(prop) {
					if jsDoc := getJSDocOrTag(c, prop.ValueDeclaration(), seenSymbols); jsDoc != nil {
						return jsDoc
					}
				}
			} else {
				for _, baseType := range c.GetBaseTypes(classType) {
					if prop := c.GetPropertyOfType(baseType, symbol.Name()); prop != nil && prop.ValueDeclaration() != nil && seenSymbols.AddIfAbsent(prop) {
						if jsDoc := getJSDocOrTag(c, prop.ValueDeclaration(), seenSymbols); jsDoc != nil {
							return jsDoc
						}
					}
				}
			}
		}
	}
	return nil
}

// parameterDocumentationNodes returns the comment-having nodes Strada's
// getDocumentationComment consults for a parameter (getJSDocCommentsAndTags):
// the parameter's own JSDoc when it carries a comment, followed by every matching
// `@param` tag of the hosting declaration, nearest comment location first. Only
// when there is none does a CONSTRUCTOR parameter fall back to the documentation
// of a same-named property on the class's super types (findBaseOfDeclaration).
// Parameters of an overriding method never inherit `@param` docs from base
// signatures, even when the override has no JSDoc at all.
func parameterDocumentationNodes(c *checker.Checker, param *ast.Node, seenSymbols *collections.Set[*ast.Symbol]) []*ast.Node {
	var nodes []*ast.Node
	if jsdoc := getJSDoc(param); jsdoc != nil && len(jsdoc.Comments()) > 0 {
		nodes = append(nodes, jsdoc)
	}
	nodes = append(nodes, ownParameterTags(param)...)
	if len(nodes) > 0 {
		return nodes
	}
	if prop := findConstructorParamBaseProperty(c, param, seenSymbols); prop != nil && prop.ValueDeclaration() != nil {
		if jsdoc := getJSDocOrTag(c, prop.ValueDeclaration(), seenSymbols); jsdoc != nil {
			return []*ast.Node{jsdoc}
		}
	}
	return nil
}

// ownParameterTags implements Strada's getJSDocParameterTags: the `@param` tags
// that the hosting declaration's own JSDoc comment chain attributes to `param`,
// nearest comment location first. Each location contributes the tags of its last
// JSDoc block (filterOwnedJSDocTags). Identifier parameters match by name and may
// yield several tags; binding patterns are matched by position among the `@param`
// tags, so out-of-order or missing tags yield nothing.
func ownParameterTags(param *ast.Node) []*ast.Node {
	host := param.Parent
	name := param.Name()
	if host == nil || name == nil {
		return nil
	}
	var paramTags []*ast.Node
	for current := host; current != nil; current = ast.GetNextJSDocCommentLocation(current) {
		if jsdoc := getJSDoc(current); jsdoc != nil && jsdoc.Kind == ast.KindJSDoc && jsdoc.AsJSDoc().Tags != nil {
			for _, tag := range jsdoc.AsJSDoc().Tags.Nodes {
				if tag.Kind == ast.KindJSDocParameterTag {
					paramTags = append(paramTags, tag)
				}
			}
		}
	}
	if ast.IsIdentifier(name) {
		return core.Filter(paramTags, func(tag *ast.Node) bool { return isMatchingParameterTag(tag, name.Text()) })
	}
	if i := slices.Index(host.Parameters(), param); i >= 0 && i < len(paramTags) {
		return paramTags[i : i+1]
	}
	return nil
}

// findConstructorParamBaseProperty implements Strada's findBaseOfDeclaration for
// constructor parameters: the first super type (extends and implements clauses,
// in source order) that has a property named like the parameter contributes that
// property — even when its documentation turns out to be empty, the search stops
// there. Returns nil for non-constructor hosts (method parameters never inherit)
// and for properties already visited by this lookup, which also covers a class
// that implements itself resolving back to the queried parameter property.
func findConstructorParamBaseProperty(c *checker.Checker, param *ast.Node, seenSymbols *collections.Set[*ast.Symbol]) *ast.Symbol {
	host := param.Parent
	name := param.Name()
	if host == nil || name == nil || !ast.IsIdentifier(name) || !ast.IsConstructorDeclaration(host) || host.Parent == nil || !ast.IsClassLike(host.Parent) {
		return nil
	}
	superTypeNodes := append(
		append([]*ast.Node{}, ast.GetHeritageElements(host.Parent, ast.KindExtendsKeyword)...),
		ast.GetHeritageElements(host.Parent, ast.KindImplementsKeyword)...,
	)
	for _, superTypeNode := range superTypeNodes {
		baseType := c.GetTypeAtLocation(superTypeNode)
		if baseType == nil {
			continue
		}
		if prop := c.GetPropertyOfType(baseType, name.Text()); prop != nil && seenSymbols.AddIfAbsent(prop) {
			return prop
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
