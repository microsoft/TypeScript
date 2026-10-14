package checker

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
)

func (c *Checker) checkUnmatchedJSDocParameters(node *ast.Node) {
	var jsdocParameters []*ast.Node
	for _, tag := range getAllJSDocTags(node) {
		if tag.Kind == ast.KindJSDocParameterTag {
			name := tag.AsJSDocParameterOrPropertyTag().Name()
			if ast.IsIdentifier(name) && len(name.Text()) == 0 {
				continue
			}
			jsdocParameters = append(jsdocParameters, tag)
		}
	}

	if len(jsdocParameters) == 0 {
		return
	}

	isJs := ast.IsInJSFile(node)
	parameters := collections.Set[string]{}
	excludedParameters := collections.Set[int]{}

	for i, param := range node.Parameters() {
		name := param.AsParameterDeclaration().Name()
		if ast.IsIdentifier(name) {
			parameters.Add(name.Text())
		}
		if ast.IsBindingPattern(name) {
			excludedParameters.Add(i)
		}
	}
	if c.containsArgumentsReference(node) {
		if isJs {
			lastJSDocParamIndex := len(jsdocParameters) - 1
			lastJSDocParam := jsdocParameters[lastJSDocParamIndex].AsJSDocParameterOrPropertyTag()
			if lastJSDocParam == nil || !ast.IsIdentifier(lastJSDocParam.Name()) {
				return
			}
			if excludedParameters.Has(lastJSDocParamIndex) || parameters.Has(lastJSDocParam.Name().Text()) {
				return
			}
			if lastJSDocParam.TypeExpression == nil || lastJSDocParam.TypeExpression.Type() == nil {
				return
			}
			if c.isArrayType(c.getTypeFromTypeNode(lastJSDocParam.TypeExpression.Type())) {
				return
			}
			c.error(lastJSDocParam.Name(), diagnostics.JSDoc_param_tag_has_name_0_but_there_is_no_parameter_with_that_name_It_would_match_arguments_if_it_had_an_array_type, lastJSDocParam.Name().Text())
		}
	} else {
		for index, tag := range jsdocParameters {
			name := tag.AsJSDocParameterOrPropertyTag().Name()
			isNameFirst := tag.AsJSDocParameterOrPropertyTag().IsNameFirst

			if excludedParameters.Has(index) || (ast.IsIdentifier(name) && parameters.Has(name.Text())) {
				continue
			}

			if ast.IsQualifiedName(name) {
				if isJs {
					c.error(
						name, diagnostics.Qualified_name_0_is_not_allowed_without_a_leading_param_object_1,
						entityNameToString(name),
						entityNameToString(name.AsQualifiedName().Left),
					)
				}
			} else {
				if !isNameFirst {
					c.errorOrSuggestion(
						isJs, name,
						diagnostics.JSDoc_param_tag_has_name_0_but_there_is_no_parameter_with_that_name,
						name.Text(),
					)
				}
			}
		}
	}
}

func getAllJSDocTags(node *ast.Node) []*ast.Node {
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

func (c *Checker) checkJSDocAugmentsTagMatchesExtends(node *ast.Node, baseTypeNode *ast.ExpressionWithTypeArgumentsNode, baseType *Type) {
	if !ast.IsInJSFile(node) {
		return
	}
	file := ast.GetSourceFileOfNode(node)
	for _, j := range node.EagerJSDoc(file) {
		if j.AsJSDoc().Tags == nil {
			continue
		}
		for _, tag := range j.AsJSDoc().Tags.Nodes {
			if tag.Kind != ast.KindJSDocAugmentsTag {
				continue
			}
			sourceTypeNode := tag.ClassName()
			sourceType := c.getTypeFromTypeNode(sourceTypeNode)
			sourceName := getIdentifierFromEntityNameExpression(sourceTypeNode.Expression())
			if ast.IsEntityNameExpression(baseTypeNode.Expression()) {
				if c.isTypeIdenticalTo(sourceType, baseType) {
					continue
				}
				targetName := getIdentifierFromEntityNameExpression(baseTypeNode.Expression())
				if targetName != nil && sourceName != nil {
					c.error(sourceName, diagnostics.JSDoc_0_1_does_not_match_the_extends_2_clause, tag.TagName().Text(), sourceName.Text(), targetName.Text())
				}
			} else if sourceName != nil && !c.isTypeAssignableTo(baseType, sourceType) {
				c.error(sourceName, diagnostics.JSDoc_0_1_does_not_match_the_extends_2_clause, tag.TagName().Text(), sourceName.Text(), scanner.GetTextOfNode(baseTypeNode.Expression()))
			}
		}
	}
}
