package parser

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
)

func (p *Parser) reparseCommonJS(node *ast.Node) {
	if p.scriptKind != core.ScriptKindJS && p.scriptKind != core.ScriptKindJSX {
		return
	}
	if node.Kind != ast.KindExpressionStatement || node.AsExpressionStatement().Expression.Kind != ast.KindBinaryExpression {
		return
	}
	bin := node.AsExpressionStatement().Expression.AsBinaryExpression()
	kind := ast.GetAssignmentDeclarationKind(bin)
	var export *ast.Node
	switch kind {
	case ast.JSDeclarationKindModuleExports:
		export = p.factory.NewJSExportAssignment(bin.Right)
	case ast.JSDeclarationKindExportsProperty:
		nodes := p.nodeSlicePool.NewSlice(1)
		nodes[0] = p.factory.NewModifier(ast.KindExportKeyword)
		nodes[0].Flags = ast.NodeFlagsReparsed
		nodes[0].Loc = bin.Loc
		// TODO: Name can sometimes be a string literal, so downstream code needs to handle this
		export = p.factory.NewCommonJSExport(p.newModifierList(bin.Loc, nodes), ast.GetElementOrPropertyAccessName(bin.Left), bin.Right)
	}
	if export != nil {
		export.Flags = ast.NodeFlagsReparsed
		export.Loc = bin.Loc
		p.reparseList = append(p.reparseList, export)
		p.commonJSModuleIndicator = export
	}
}

// Hosted tags find a host and add their children to the correct location under the host.
// Unhosted tags add synthetic nodes to the reparse list.
func (p *Parser) reparseTags(parent *ast.Node, jsDoc []*ast.Node) {
	for _, j := range jsDoc {
		isLast := j == jsDoc[len(jsDoc)-1]
		tags := j.AsJSDoc().Tags
		if tags == nil {
			continue
		}
		for _, tag := range tags.Nodes {
			switch tag.Kind {
			case ast.KindJSDocTypedefTag:
				// !!! Don't mark typedefs as exported if they are not in a module
				typeExpression := tag.AsJSDocTypedefTag().TypeExpression
				if typeExpression == nil {
					break
				}
				export := p.factory.NewModifier(ast.KindExportKeyword)
				export.Loc = tag.Loc
				export.Flags = p.contextFlags | ast.NodeFlagsReparsed
				nodes := p.nodeSlicePool.NewSlice(1)
				nodes[0] = export
				modifiers := p.newModifierList(export.Loc, nodes)

				typeParameters := p.gatherTypeParameters(j)

				var t *ast.Node
				switch typeExpression.Kind {
				case ast.KindJSDocTypeExpression:
					t = typeExpression.Type()
				case ast.KindJSDocTypeLiteral:
					members := p.nodeSlicePool.NewSlice(0)
					for _, member := range typeExpression.AsJSDocTypeLiteral().JSDocPropertyTags {
						var questionToken *ast.TokenNode
						if member.AsJSDocPropertyTag().IsBracketed ||
							member.AsJSDocPropertyTag().TypeExpression != nil && member.AsJSDocPropertyTag().TypeExpression.Type().Kind == ast.KindJSDocOptionalType {
							questionToken = p.factory.NewToken(ast.KindQuestionToken)
							questionToken.Loc = core.NewTextRange(member.Pos(), member.End())
							questionToken.Flags = p.contextFlags | ast.NodeFlagsReparsed
						}
						prop := p.factory.NewPropertySignatureDeclaration(nil, member.Name(), questionToken, member.Type(), nil /*initializer*/)
						prop.Loc = member.Loc
						prop.Flags = p.contextFlags | ast.NodeFlagsReparsed
						members = append(members, prop)
					}
					t = p.factory.NewTypeLiteralNode(p.newNodeList(typeExpression.Loc, members))
					t.Loc = typeExpression.Loc
					t.Flags = p.contextFlags | ast.NodeFlagsReparsed
				default:
					panic("typedef tag type expression should be a name reference or a type expression" + typeExpression.Kind.String())
				}
				typeAlias := p.factory.NewJSTypeAliasDeclaration(modifiers, tag.AsJSDocTypedefTag().Name(), typeParameters, t)
				typeAlias.Loc = core.NewTextRange(tag.Pos(), tag.End())
				typeAlias.Flags = p.contextFlags | ast.NodeFlagsReparsed
				p.reparseList = append(p.reparseList, typeAlias)
			case ast.KindJSDocImportTag:
				importTag := tag.AsJSDocImportTag()
				importClause := importTag.ImportClause.Clone(&p.factory)
				importClause.Flags |= ast.NodeFlagsReparsed
				importClause.AsImportClause().IsTypeOnly = true
				importDeclaration := p.factory.NewJSImportDeclaration(importTag.Modifiers(), importClause, importTag.ModuleSpecifier, importTag.Attributes)
				importDeclaration.Loc = core.NewTextRange(tag.Pos(), tag.End())
				importDeclaration.Flags = p.contextFlags | ast.NodeFlagsReparsed
				p.reparseList = append(p.reparseList, importDeclaration)
				// !!! @overload and other unattached tags (@callback et al) support goes here
			}
			if !isLast {
				continue
			}
			switch tag.Kind {
			case ast.KindJSDocTypeTag:
				if parent.Kind == ast.KindVariableStatement && parent.AsVariableStatement().DeclarationList != nil {
					for _, declaration := range parent.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes {
						if declaration.AsVariableDeclaration().Type == nil {
							declaration.AsVariableDeclaration().Type = p.makeNewType(tag.AsJSDocTypeTag().TypeExpression, declaration)
							break
						}
					}
				} else if parent.Kind == ast.KindVariableDeclaration {
					if parent.AsVariableDeclaration().Type == nil {
						parent.AsVariableDeclaration().Type = p.makeNewType(tag.AsJSDocTypeTag().TypeExpression, parent)
					}
				} else if parent.Kind == ast.KindPropertyDeclaration {
					declaration := parent.AsPropertyDeclaration()
					if declaration.Type == nil {
						declaration.Type = p.makeNewType(tag.AsJSDocTypeTag().TypeExpression, parent)
					}
				} else if parent.Kind == ast.KindPropertyAssignment {
					prop := parent.AsPropertyAssignment()
					prop.Initializer = p.makeNewTypeAssertion(p.makeNewType(tag.AsJSDocTypeTag().TypeExpression, nil), prop.Initializer)
				} else if parent.Kind == ast.KindExportAssignment {
					export := parent.AsExportAssignment()
					export.Expression = p.makeNewTypeAssertion(p.makeNewType(tag.AsJSDocTypeTag().TypeExpression, nil), export.Expression)
				} else if parent.Kind == ast.KindReturnStatement {
					ret := parent.AsReturnStatement()
					ret.Expression = p.makeNewTypeAssertion(p.makeNewType(tag.AsJSDocTypeTag().TypeExpression, nil), ret.Expression)
				} else if parent.Kind == ast.KindParenthesizedExpression {
					paren := parent.AsParenthesizedExpression()
					paren.Expression = p.makeNewTypeAssertion(p.makeNewType(tag.AsJSDocTypeTag().TypeExpression, nil), paren.Expression)
				} else if parent.Kind == ast.KindExpressionStatement &&
					parent.AsExpressionStatement().Expression.Kind == ast.KindBinaryExpression {
					bin := parent.AsExpressionStatement().Expression.AsBinaryExpression()
					if ast.GetAssignmentDeclarationKind(bin) != ast.JSDeclarationKindNone {
						bin.Right = p.makeNewTypeAssertion(p.makeNewType(tag.AsJSDocTypeTag().TypeExpression, nil), bin.Right)
					}
				}
			case ast.KindJSDocTemplateTag:
				if fun, ok := getFunctionLikeHost(parent); ok {
					if fun.TypeParameters() == nil {
						fun.FunctionLikeData().TypeParameters = p.gatherTypeParameters(j)
					}
				} else if parent.Kind == ast.KindClassDeclaration {
					class := parent.AsClassDeclaration()
					if class.TypeParameters == nil {
						class.TypeParameters = p.gatherTypeParameters(j)
					}
				} else if parent.Kind == ast.KindClassExpression {
					class := parent.AsClassExpression()
					if class.TypeParameters == nil {
						class.TypeParameters = p.gatherTypeParameters(j)
					}
				}
			case ast.KindJSDocParameterTag:
				if fun, ok := getFunctionLikeHost(parent); ok {
					jsparam := tag.AsJSDocParameterTag()
					if param, ok := findMatchingParameter(fun, jsparam); ok {
						if param.Type() == nil {
							param.AsParameterDeclaration().Type = p.makeNewType(jsparam.TypeExpression, param)
							if param.AsParameterDeclaration().QuestionToken == nil &&
								param.AsParameterDeclaration().Initializer == nil &&
								(jsparam.IsBracketed || jsparam.TypeExpression != nil && jsparam.TypeExpression.Type().Kind == ast.KindJSDocOptionalType) {
								param.AsParameterDeclaration().QuestionToken = p.factory.NewToken(ast.KindQuestionToken)
								param.AsParameterDeclaration().QuestionToken.Loc = core.NewTextRange(param.End(), param.End())
								param.AsParameterDeclaration().QuestionToken.Flags = p.contextFlags | ast.NodeFlagsReparsed
							}
						}
					}
				}
			case ast.KindJSDocReturnTag:
				if fun, ok := getFunctionLikeHost(parent); ok {
					if fun.Type() == nil {
						fun.FunctionLikeData().Type = p.makeNewType(tag.AsJSDocReturnTag().TypeExpression, fun)
					}
				}
			}
		}
	}
}

func findMatchingParameter(fun *ast.Node, tag *ast.JSDocParameterTag) (*ast.Node, bool) {
	for _, parameter := range fun.Parameters() {
		if parameter.Name().Kind == ast.KindIdentifier && tag.Name().Kind == ast.KindIdentifier &&
			parameter.Name().Text() == tag.Name().Text() {
			return parameter, true
		}
	}
	return nil, false
}

func (p *Parser) gatherTypeParameters(j *ast.Node) *ast.NodeList {
	typeParameters := p.nodeSlicePool.NewSlice(0)
	pos := -1
	end := -1
	first := true
	for _, tag := range j.AsJSDoc().Tags.Nodes {
		if tag.Kind == ast.KindJSDocTemplateTag {
			if first {
				pos = tag.Pos()
				first = false
			}
			end = tag.End()

			constraint := tag.AsJSDocTemplateTag().Constraint
			for _, tp := range tag.AsJSDocTemplateTag().TypeParameters().Nodes {
				typeParameter := tp.AsTypeParameter()
				var reparse *ast.Node
				if constraint == nil {
					reparse = typeParameter.Clone(&p.factory)
				} else {
					clone := constraint.Type().Clone(&p.factory)
					clone.Flags |= ast.NodeFlagsReparsed
					reparse = p.factory.NewTypeParameterDeclaration(typeParameter.Modifiers(), typeParameter.Name(), clone, typeParameter.DefaultType)
					reparse.Loc = typeParameter.Loc
				}
				reparse.Flags |= ast.NodeFlagsReparsed
				typeParameters = append(typeParameters, reparse)
			}
		}
	}
	if len(typeParameters) == 0 {
		return nil
	} else {
		return p.newNodeList(core.NewTextRange(pos, end), typeParameters)
	}
}

func getFunctionLikeHost(host *ast.Node) (*ast.Node, bool) {
	fun := host
	if host.Kind == ast.KindVariableStatement && host.AsVariableStatement().DeclarationList != nil {
		for _, declaration := range host.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes {
			if ast.IsFunctionLike(declaration.Initializer()) {
				fun = declaration.Initializer()
				break
			}
		}
	} else if host.Kind == ast.KindPropertyAssignment {
		fun = host.AsPropertyAssignment().Initializer
	} else if host.Kind == ast.KindPropertyDeclaration {
		fun = host.AsPropertyDeclaration().Initializer
	} else if host.Kind == ast.KindExportAssignment {
		fun = host.AsExportAssignment().Expression
	} else if host.Kind == ast.KindReturnStatement {
		fun = host.AsReturnStatement().Expression
	}
	if ast.IsFunctionLike(fun) {
		return fun, true
	}
	return nil, false
}

func (p *Parser) makeNewTypeAssertion(t *ast.TypeNode, e *ast.Node) *ast.Node {
	assert := p.factory.NewTypeAssertion(t, e)
	assert.Flags = p.contextFlags | ast.NodeFlagsReparsed
	assert.Loc = core.NewTextRange(e.Pos(), e.End())
	return assert
}

func (p *Parser) makeNewType(typeExpression *ast.TypeNode, host *ast.Node) *ast.Node {
	if typeExpression == nil || typeExpression.Type() == nil {
		return nil
	}
	if typeExpression.AsJSDocTypeExpression().Host == nil {
		typeExpression.AsJSDocTypeExpression().Host = host
	} else {
		panic("JSDoc type expression already has a host: " + typeExpression.AsJSDocTypeExpression().Host.Kind.String())
	}
	t := typeExpression.Type().Clone(&p.factory)
	t.Flags |= ast.NodeFlagsReparsed
	if host != nil {
		t.Parent = host
	}
	return t
}
