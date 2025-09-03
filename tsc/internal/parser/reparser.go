package parser

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
)

func (p *Parser) finishReparsedNode(node *ast.Node, locationNode *ast.Node) {
	node.Flags = p.contextFlags | ast.NodeFlagsReparsed
	node.Loc = locationNode.Loc
	p.overrideParentInImmediateChildren(node)
}

func (p *Parser) finishMutatedNode(node *ast.Node) {
	p.overrideParentInImmediateChildren(node)
}

func (p *Parser) reparseCommonJS(node *ast.Node, jsdoc []*ast.Node) {
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
		export = p.factory.NewJSExportAssignment(nil, p.factory.DeepCloneReparse(bin.Right))
	case ast.JSDeclarationKindExportsProperty:
		mod := p.factory.NewModifier(ast.KindExportKeyword)
		mod.Flags = p.contextFlags | ast.NodeFlagsReparsed
		mod.Loc = bin.Loc
		// TODO: Name can sometimes be a string literal, so downstream code needs to handle this
		export = p.factory.NewCommonJSExport(
			p.newModifierList(bin.Loc, p.nodeSlicePool.NewSlice1(mod)),
			p.factory.DeepCloneReparse(ast.GetElementOrPropertyAccessName(bin.Left)),
			nil, /*typeNode*/
			p.factory.DeepCloneReparse(bin.Right))
	}
	if export != nil {
		p.reparseList = append(p.reparseList, export)
		p.commonJSModuleIndicator = export
		p.reparseTags(export, jsdoc)
		p.finishReparsedNode(export, bin.AsNode())
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
			if parent.Kind != ast.KindCommonJSExport && parent.Kind != ast.KindJSExportAssignment {
				p.reparseUnhosted(tag, parent, j)
			}
			if isLast {
				p.reparseHosted(tag, parent, j)
			}
		}
	}
}

func (p *Parser) reparseUnhosted(tag *ast.Node, parent *ast.Node, jsDoc *ast.Node) {
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
		modifiers := p.newModifierList(export.Loc, p.nodeSlicePool.NewSlice1(export))

		typeAlias := p.factory.NewJSTypeAliasDeclaration(modifiers, p.factory.DeepCloneReparse(tag.AsJSDocTypedefTag().Name()), nil, nil)
		typeAlias.AsTypeAliasDeclaration().TypeParameters = p.gatherTypeParameters(jsDoc, tag)
		var t *ast.Node
		switch typeExpression.Kind {
		case ast.KindJSDocTypeExpression:
			t = p.factory.DeepCloneReparse(typeExpression.Type())
		case ast.KindJSDocTypeLiteral:
			t = p.reparseJSDocTypeLiteral(typeExpression)
		default:
			panic("typedef tag type expression should be a name reference or a type expression" + typeExpression.Kind.String())
		}
		typeAlias.AsTypeAliasDeclaration().Type = t
		p.finishReparsedNode(typeAlias, tag)
		p.reparseList = append(p.reparseList, typeAlias)
	case ast.KindJSDocCallbackTag:
		callbackTag := tag.AsJSDocCallbackTag()
		if callbackTag.TypeExpression == nil {
			break
		}

		export := p.factory.NewModifier(ast.KindExportKeyword)
		export.Loc = tag.Loc
		export.Flags = p.contextFlags | ast.NodeFlagsReparsed
		modifiers := p.newModifierList(export.Loc, p.nodeSlicePool.NewSlice1(export))
		functionType := p.reparseJSDocSignature(callbackTag.TypeExpression, tag, jsDoc, tag, nil)

		typeAlias := p.factory.NewJSTypeAliasDeclaration(modifiers, p.factory.DeepCloneReparse(callbackTag.FullName), nil, functionType)
		typeAlias.AsTypeAliasDeclaration().TypeParameters = p.gatherTypeParameters(jsDoc, tag)
		p.finishReparsedNode(typeAlias, tag)
		p.reparseList = append(p.reparseList, typeAlias)
	case ast.KindJSDocImportTag:
		importTag := tag.AsJSDocImportTag()
		if importTag.ImportClause == nil {
			break
		}
		importClause := p.factory.DeepCloneReparse(importTag.ImportClause)
		importClause.AsImportClause().IsTypeOnly = true
		importDeclaration := p.factory.NewJSImportDeclaration(
			p.factory.DeepCloneReparseModifiers(importTag.Modifiers()),
			importClause,
			p.factory.DeepCloneReparse(importTag.ModuleSpecifier),
			p.factory.DeepCloneReparse(importTag.Attributes),
		)
		p.finishReparsedNode(importDeclaration, tag)
		p.reparseList = append(p.reparseList, importDeclaration)
	case ast.KindJSDocOverloadTag:
		if fun, ok := getFunctionLikeHost(parent); ok {
			p.reparseList = append(p.reparseList, p.reparseJSDocSignature(tag.AsJSDocOverloadTag().TypeExpression, fun, jsDoc, tag, fun.Modifiers()))
		}
	}
}

func (p *Parser) reparseJSDocSignature(jsSignature *ast.Node, fun *ast.Node, jsDoc *ast.Node, tag *ast.Node, modifiers *ast.ModifierList) *ast.Node {
	var signature *ast.Node
	clonedModifiers := p.factory.DeepCloneReparseModifiers(modifiers)
	switch fun.Kind {
	case ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindArrowFunction:
		signature = p.factory.NewFunctionDeclaration(clonedModifiers, nil, p.factory.DeepCloneReparse(fun.Name()), nil, nil, nil, nil, nil)
	case ast.KindMethodDeclaration, ast.KindMethodSignature:
		signature = p.factory.NewMethodDeclaration(clonedModifiers, nil, p.factory.DeepCloneReparse(fun.Name()), nil, nil, nil, nil, nil, nil)
	case ast.KindConstructor:
		signature = p.factory.NewConstructorDeclaration(clonedModifiers, nil, nil, nil, nil, nil)
	case ast.KindJSDocCallbackTag:
		signature = p.factory.NewFunctionTypeNode(nil, nil, nil)
	default:
		panic("Unexpected kind " + fun.Kind.String())
	}

	if tag.Kind != ast.KindJSDocCallbackTag {
		signature.FunctionLikeData().TypeParameters = p.gatherTypeParameters(jsDoc, tag)
	}
	parameters := p.nodeSlicePool.NewSlice(0)
	for _, param := range jsSignature.Parameters() {
		var parameter *ast.Node
		if param.Kind == ast.KindJSDocThisTag {
			thisTag := param.AsJSDocThisTag()
			thisIdent := p.factory.NewIdentifier("this")
			thisIdent.Loc = thisTag.Loc
			thisIdent.Flags = p.contextFlags | ast.NodeFlagsReparsed
			parameter = p.factory.NewParameterDeclaration(nil, nil, thisIdent, nil, nil, nil)
			if thisTag.TypeExpression != nil {
				parameter.AsParameterDeclaration().Type = p.factory.DeepCloneReparse(thisTag.TypeExpression.Type())
			}
		} else {
			jsparam := param.AsJSDocParameterOrPropertyTag()
			var dotDotDotToken *ast.Node
			var paramType *ast.TypeNode

			if jsparam.TypeExpression != nil {
				if jsparam.TypeExpression.Type().Kind == ast.KindJSDocVariadicType {
					dotDotDotToken = p.factory.NewToken(ast.KindDotDotDotToken)
					dotDotDotToken.Loc = jsparam.Loc
					dotDotDotToken.Flags = p.contextFlags | ast.NodeFlagsReparsed

					variadicType := jsparam.TypeExpression.Type().AsJSDocVariadicType()
					paramType = p.reparseJSDocTypeLiteral(variadicType.Type)
				} else {
					paramType = p.reparseJSDocTypeLiteral(jsparam.TypeExpression.Type())
				}
			}

			parameter = p.factory.NewParameterDeclaration(nil, dotDotDotToken, p.factory.DeepCloneReparse(jsparam.Name()), p.makeQuestionIfOptional(jsparam), paramType, nil)
		}
		p.finishReparsedNode(parameter, param)
		parameters = append(parameters, parameter)
	}
	signature.FunctionLikeData().Parameters = p.newNodeList(jsSignature.AsJSDocSignature().Parameters.Loc, parameters)

	if jsSignature.Type() != nil && jsSignature.Type().AsJSDocReturnTag().TypeExpression != nil {
		signature.FunctionLikeData().Type = p.factory.DeepCloneReparse(jsSignature.Type().AsJSDocReturnTag().TypeExpression.Type())
	}
	loc := tag
	if tag.Kind == ast.KindJSDocOverloadTag {
		loc = tag.AsJSDocOverloadTag().TagName
	}
	p.finishReparsedNode(signature, loc)
	return signature
}

func (p *Parser) reparseJSDocTypeLiteral(t *ast.TypeNode) *ast.Node {
	if t == nil {
		return nil
	}
	if t.Kind == ast.KindJSDocTypeLiteral {
		jstypeliteral := t.AsJSDocTypeLiteral()
		isArrayType := jstypeliteral.IsArrayType
		properties := p.nodeSlicePool.NewSlice(0)
		for _, prop := range jstypeliteral.JSDocPropertyTags {
			jsprop := prop.AsJSDocParameterOrPropertyTag()
			name := prop.Name()
			if name.Kind == ast.KindQualifiedName {
				name = name.AsQualifiedName().Right
			}
			property := p.factory.NewPropertySignatureDeclaration(nil, name, p.makeQuestionIfOptional(jsprop), nil, nil)
			if jsprop.TypeExpression != nil {
				property.AsPropertySignatureDeclaration().Type = p.reparseJSDocTypeLiteral(jsprop.TypeExpression.Type())
			}
			p.finishReparsedNode(property, prop)
			properties = append(properties, property)
		}
		t = p.factory.NewTypeLiteralNode(p.newNodeList(jstypeliteral.Loc, properties))
		if isArrayType {
			p.finishReparsedNode(t, jstypeliteral.AsNode())
			t = p.factory.NewArrayTypeNode(t)
		}
		p.finishReparsedNode(t, jstypeliteral.AsNode())
	}
	return p.factory.DeepCloneReparse(t)
}

func (p *Parser) gatherTypeParameters(j *ast.Node, tagWithTypeParameters *ast.Node) *ast.NodeList {
	var typeParameters []*ast.Node
	pos := -1
	endPos := -1
	firstTemplate := true
	// type parameters only apply to the tag or node they occur before, so record a place to stop
	start := 0
	for i, other := range j.AsJSDoc().Tags.Nodes {
		if other == tagWithTypeParameters {
			break
		}
		if other.Kind == ast.KindJSDocTypedefTag || other.Kind == ast.KindJSDocCallbackTag || other.Kind == ast.KindJSDocOverloadTag {
			start = i + 1
		}
	}
	for i, tag := range j.AsJSDoc().Tags.Nodes {
		if tag == tagWithTypeParameters {
			break
		}
		if i < start || tag.Kind != ast.KindJSDocTemplateTag {
			continue
		}
		if firstTemplate {
			pos = tag.Pos()
			firstTemplate = false
		}
		endPos = tag.End()

		constraint := tag.AsJSDocTemplateTag().Constraint
		firstTypeParameter := true
		for _, tp := range tag.TypeParameters() {
			var reparse *ast.Node
			if constraint != nil && firstTypeParameter {
				reparse = p.factory.NewTypeParameterDeclaration(
					p.factory.DeepCloneReparseModifiers(tp.Modifiers()),
					p.factory.DeepCloneReparse(tp.Name()),
					p.factory.DeepCloneReparse(constraint.Type()),
					p.factory.DeepCloneReparse(tp.AsTypeParameter().DefaultType),
				)
				p.finishReparsedNode(reparse, tp)
			} else {
				reparse = p.factory.DeepCloneReparse(tp)
			}
			if typeParameters == nil {
				typeParameters = p.nodeSlicePool.NewSlice(0)
			}
			typeParameters = append(typeParameters, reparse)
			firstTypeParameter = false
		}
	}
	if len(typeParameters) == 0 {
		return nil
	} else {
		return p.newNodeList(core.NewTextRange(pos, endPos), typeParameters)
	}
}

func (p *Parser) reparseHosted(tag *ast.Node, parent *ast.Node, jsDoc *ast.Node) {
	switch tag.Kind {
	case ast.KindJSDocTypeTag:
		switch parent.Kind {
		case ast.KindVariableStatement:
			if parent.AsVariableStatement().DeclarationList != nil {
				for _, declaration := range parent.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes {
					if declaration.Type() == nil && tag.AsJSDocTypeTag().TypeExpression != nil {
						declaration.AsMutable().SetType(p.factory.DeepCloneReparse(tag.AsJSDocTypeTag().TypeExpression.Type()))
						p.finishMutatedNode(declaration)
						return
					}
				}
			}
		case ast.KindVariableDeclaration,
			ast.KindCommonJSExport, ast.KindExportAssignment, ast.KindJSExportAssignment,
			ast.KindPropertyDeclaration, ast.KindPropertyAssignment, ast.KindShorthandPropertyAssignment:
			if parent.Type() == nil && tag.AsJSDocTypeTag().TypeExpression != nil {
				parent.AsMutable().SetType(p.factory.DeepCloneReparse(tag.AsJSDocTypeTag().TypeExpression.Type()))
				p.finishMutatedNode(parent)
				return
			}
		case ast.KindParameter:
			if parent.Type() == nil && tag.AsJSDocTypeTag().TypeExpression != nil {
				parent.AsMutable().SetType(p.reparseJSDocTypeLiteral(tag.AsJSDocTypeTag().TypeExpression.Type()))
				p.finishMutatedNode(parent)
				return
			}
		case ast.KindExpressionStatement:
			if parent.AsExpressionStatement().Expression.Kind == ast.KindBinaryExpression {
				bin := parent.AsExpressionStatement().Expression.AsBinaryExpression()
				if kind := ast.GetAssignmentDeclarationKind(bin); kind != ast.JSDeclarationKindNone && tag.AsJSDocTypeTag().TypeExpression != nil {
					bin.AsMutable().SetType(p.factory.DeepCloneReparse(tag.AsJSDocTypeTag().TypeExpression.Type()))
					p.finishMutatedNode(bin.AsNode())
					return
				}
			}
		case ast.KindReturnStatement, ast.KindParenthesizedExpression:
			if tag.AsJSDocTypeTag().TypeExpression != nil {
				parent.AsMutable().SetExpression(p.makeNewCast(
					p.factory.DeepCloneReparse(tag.AsJSDocTypeTag().TypeExpression.Type()),
					p.factory.DeepCloneReparse(parent.Expression()),
					true /*isAssertion*/))
				p.finishMutatedNode(parent)
				return
			}
		}
		if fun, ok := getFunctionLikeHost(parent); ok {
			noTypedParams := core.Every(fun.Parameters(), func(param *ast.Node) bool { return param.Type() == nil })
			if fun.Type() == nil && noTypedParams && tag.AsJSDocTypeTag().TypeExpression != nil {
				fun.FunctionLikeData().FullSignature = p.factory.DeepCloneReparse(tag.AsJSDocTypeTag().TypeExpression.Type())
				p.finishMutatedNode(fun)
			}
		}
	case ast.KindJSDocSatisfiesTag:
		switch parent.Kind {
		case ast.KindVariableStatement:
			if parent.AsVariableStatement().DeclarationList != nil {
				for _, declaration := range parent.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes {
					if declaration.Initializer() != nil && tag.AsJSDocSatisfiesTag().TypeExpression != nil {
						declaration.AsMutable().SetInitializer(p.makeNewCast(
							p.factory.DeepCloneReparse(tag.AsJSDocSatisfiesTag().TypeExpression.Type()),
							p.factory.DeepCloneReparse(declaration.Initializer()),
							false /*isAssertion*/))
						p.finishMutatedNode(declaration)
						break
					}
				}
			}
		case ast.KindVariableDeclaration,
			ast.KindCommonJSExport,
			ast.KindPropertyDeclaration, ast.KindPropertyAssignment, ast.KindShorthandPropertyAssignment:
			if parent.Initializer() != nil && tag.AsJSDocSatisfiesTag().TypeExpression != nil {
				parent.AsMutable().SetInitializer(p.makeNewCast(
					p.factory.DeepCloneReparse(tag.AsJSDocSatisfiesTag().TypeExpression.Type()),
					p.factory.DeepCloneReparse(parent.Initializer()),
					false /*isAssertion*/))
				p.finishMutatedNode(parent)
			}
		case ast.KindReturnStatement, ast.KindParenthesizedExpression,
			ast.KindExportAssignment, ast.KindJSExportAssignment:
			if parent.Expression() != nil && tag.AsJSDocSatisfiesTag().TypeExpression != nil {
				parent.AsMutable().SetExpression(p.makeNewCast(
					p.factory.DeepCloneReparse(tag.AsJSDocSatisfiesTag().TypeExpression.Type()),
					p.factory.DeepCloneReparse(parent.Expression()),
					false /*isAssertion*/))
				p.finishMutatedNode(parent)
			}
		case ast.KindExpressionStatement:
			if parent.AsExpressionStatement().Expression.Kind == ast.KindBinaryExpression {
				bin := parent.AsExpressionStatement().Expression.AsBinaryExpression()
				if kind := ast.GetAssignmentDeclarationKind(bin); kind != ast.JSDeclarationKindNone && tag.AsJSDocSatisfiesTag().TypeExpression != nil {
					bin.Right = p.makeNewCast(
						p.factory.DeepCloneReparse(tag.AsJSDocSatisfiesTag().TypeExpression.Type()),
						p.factory.DeepCloneReparse(bin.Right),
						false /*isAssertion*/)
					p.finishMutatedNode(bin.AsNode())
				}
			}
		}
	case ast.KindJSDocTemplateTag:
		if fun, ok := getFunctionLikeHost(parent); ok {
			if fun.TypeParameters() == nil {
				fun.FunctionLikeData().TypeParameters = p.gatherTypeParameters(jsDoc, nil /*tagWithTypeParameters*/)
				p.finishMutatedNode(fun)
			}
		} else if parent.Kind == ast.KindClassDeclaration {
			class := parent.AsClassDeclaration()
			if class.TypeParameters == nil {
				class.TypeParameters = p.gatherTypeParameters(jsDoc, nil /*tagWithTypeParameters*/)
				p.finishMutatedNode(parent)
			}
		} else if parent.Kind == ast.KindClassExpression {
			class := parent.AsClassExpression()
			if class.TypeParameters == nil {
				class.TypeParameters = p.gatherTypeParameters(jsDoc, nil /*tagWithTypeParameters*/)
				p.finishMutatedNode(parent)
			}
		}
	case ast.KindJSDocParameterTag:
		if fun, ok := getFunctionLikeHost(parent); ok {
			parameterTag := tag.AsJSDocParameterOrPropertyTag()
			if param, ok := findMatchingParameter(fun, parameterTag, jsDoc); ok {
				if param.Type == nil && parameterTag.TypeExpression != nil {
					param.AsParameterDeclaration().Type = p.reparseJSDocTypeLiteral(parameterTag.TypeExpression.Type())
				}
				if param.QuestionToken == nil && param.Initializer == nil {
					if question := p.makeQuestionIfOptional(parameterTag); question != nil {
						param.QuestionToken = question
					}
				}
				p.finishMutatedNode(param.AsNode())
			}
		}
	case ast.KindJSDocThisTag:
		if fun, ok := getFunctionLikeHost(parent); ok {
			params := fun.Parameters()
			if len(params) == 0 || params[0].Name().Kind != ast.KindThisKeyword {
				thisParam := p.factory.NewParameterDeclaration(
					nil, /* decorators */
					nil, /* modifiers */
					p.factory.NewIdentifier("this"),
					nil, /* questionToken */
					nil, /* type */
					nil, /* initializer */
				)
				if tag.AsJSDocThisTag().TypeExpression != nil {
					thisParam.AsParameterDeclaration().Type = p.factory.DeepCloneReparse(tag.AsJSDocThisTag().TypeExpression.Type())
				}
				p.finishReparsedNode(thisParam, tag.AsJSDocThisTag().TagName)

				newParams := p.nodeSlicePool.NewSlice(len(params) + 1)
				newParams[0] = thisParam
				for i, param := range params {
					newParams[i+1] = param
				}

				fun.FunctionLikeData().Parameters = p.newNodeList(thisParam.Loc, newParams)
				p.finishMutatedNode(fun)
			}
		}
	case ast.KindJSDocReturnTag:
		if fun, ok := getFunctionLikeHost(parent); ok {
			if fun.Type() == nil && tag.AsJSDocReturnTag().TypeExpression != nil {
				fun.FunctionLikeData().Type = p.factory.DeepCloneReparse(tag.AsJSDocReturnTag().TypeExpression.Type())
				p.finishMutatedNode(fun)
			}
		}
	case ast.KindJSDocReadonlyTag, ast.KindJSDocPrivateTag, ast.KindJSDocPublicTag, ast.KindJSDocProtectedTag, ast.KindJSDocOverrideTag:
		if parent.Kind == ast.KindExpressionStatement {
			parent = parent.AsExpressionStatement().Expression
		}
		switch parent.Kind {
		case ast.KindPropertyDeclaration, ast.KindMethodDeclaration, ast.KindGetAccessor, ast.KindSetAccessor, ast.KindBinaryExpression:
			var keyword ast.Kind
			switch tag.Kind {
			case ast.KindJSDocReadonlyTag:
				keyword = ast.KindReadonlyKeyword
			case ast.KindJSDocPrivateTag:
				keyword = ast.KindPrivateKeyword
			case ast.KindJSDocPublicTag:
				keyword = ast.KindPublicKeyword
			case ast.KindJSDocProtectedTag:
				keyword = ast.KindProtectedKeyword
			case ast.KindJSDocOverrideTag:
				keyword = ast.KindOverrideKeyword
			}
			modifier := p.factory.NewModifier(keyword)
			modifier.Loc = tag.Loc
			modifier.Flags = p.contextFlags | ast.NodeFlagsReparsed
			var nodes []*ast.Node
			var loc core.TextRange
			if parent.Modifiers() == nil {
				nodes = p.nodeSlicePool.NewSlice(1)
				nodes[0] = modifier
				loc = tag.Loc
			} else {
				nodes = append(parent.Modifiers().Nodes, modifier)
				loc = parent.Modifiers().Loc
			}
			parent.AsMutable().SetModifiers(p.newModifierList(loc, nodes))
			p.finishMutatedNode(parent)
		}
	case ast.KindJSDocImplementsTag:
		if class := getClassLikeData(parent); class != nil {
			implementsTag := tag.AsJSDocImplementsTag()

			if class.HeritageClauses != nil {
				if implementsClause := core.Find(class.HeritageClauses.Nodes, func(node *ast.Node) bool {
					return node.AsHeritageClause().Token == ast.KindImplementsKeyword
				}); implementsClause != nil {
					implementsClause.AsHeritageClause().Types.Nodes = append(implementsClause.AsHeritageClause().Types.Nodes, p.factory.DeepCloneReparse(implementsTag.ClassName))
					p.finishMutatedNode(implementsClause)
					return
				}
			}
			typesList := p.newNodeList(implementsTag.ClassName.Loc, p.nodeSlicePool.NewSlice1(p.factory.DeepCloneReparse(implementsTag.ClassName)))

			heritageClause := p.factory.NewHeritageClause(ast.KindImplementsKeyword, typesList)
			p.finishReparsedNode(heritageClause, implementsTag.ClassName)

			if class.HeritageClauses == nil {
				heritageClauses := p.newNodeList(implementsTag.ClassName.Loc, p.nodeSlicePool.NewSlice1(heritageClause))
				class.HeritageClauses = heritageClauses
			} else {
				class.HeritageClauses.Nodes = append(class.HeritageClauses.Nodes, heritageClause)
			}
			p.finishMutatedNode(parent)
		}
	case ast.KindJSDocAugmentsTag:
		if class := getClassLikeData(parent); class != nil && class.HeritageClauses != nil {
			if extendsClause := core.Find(class.HeritageClauses.Nodes, func(node *ast.Node) bool {
				return node.AsHeritageClause().Token == ast.KindExtendsKeyword
			}); extendsClause != nil && len(extendsClause.AsHeritageClause().Types.Nodes) == 1 {
				target := extendsClause.AsHeritageClause().Types.Nodes[0].AsExpressionWithTypeArguments()
				source := tag.AsJSDocAugmentsTag().ClassName.AsExpressionWithTypeArguments()
				if ast.HasSamePropertyAccessName(target.Expression, source.Expression) {
					if target.TypeArguments == nil && source.TypeArguments != nil {
						newArguments := p.nodeSlicePool.NewSlice(len(source.TypeArguments.Nodes))
						for i, arg := range source.TypeArguments.Nodes {
							newArguments[i] = p.factory.DeepCloneReparse(arg)
						}
						target.TypeArguments = p.newNodeList(source.TypeArguments.Loc, newArguments)
						p.finishMutatedNode(target.AsNode())
					}
				}
			}
		}
	}
}

func (p *Parser) makeQuestionIfOptional(parameter *ast.JSDocParameterTag) *ast.Node {
	var questionToken *ast.Node
	if parameter.IsBracketed || parameter.TypeExpression != nil && parameter.TypeExpression.Type().Kind == ast.KindJSDocOptionalType {
		questionToken = p.factory.NewToken(ast.KindQuestionToken)
		questionToken.Loc = parameter.Loc
		questionToken.Flags = p.contextFlags | ast.NodeFlagsReparsed
	}
	return questionToken
}

func findMatchingParameter(fun *ast.Node, parameterTag *ast.JSDocParameterTag, jsDoc *ast.Node) (*ast.ParameterDeclaration, bool) {
	tagIndex := -1
	paramCount := -1
	for _, tag := range jsDoc.AsJSDoc().Tags.Nodes {
		if tag.Kind == ast.KindJSDocParameterTag {
			paramCount++
			if tag.AsJSDocParameterOrPropertyTag() == parameterTag {
				tagIndex = paramCount
				break
			}
		}
	}
	for parameterIndex, parameter := range fun.Parameters() {
		if parameter.Name().Kind == ast.KindIdentifier {
			if parameterTag.Name().Kind == ast.KindIdentifier && parameter.Name().Text() == parameterTag.Name().Text() {
				return parameter.AsParameterDeclaration(), true
			}
		} else if parameterIndex == tagIndex {
			return parameter.AsParameterDeclaration(), true
		}
	}
	return nil, false
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

func (p *Parser) makeNewCast(t *ast.TypeNode, e *ast.Node, isAssertion bool) *ast.Node {
	var assert *ast.Node
	if isAssertion {
		assert = p.factory.NewAsExpression(e, t)
	} else {
		assert = p.factory.NewSatisfiesExpression(e, t)
	}
	p.finishReparsedNode(assert, e)
	return assert
}

func getClassLikeData(parent *ast.Node) *ast.ClassLikeBase {
	var class *ast.ClassLikeBase
	switch parent.Kind {
	case ast.KindClassDeclaration:
		class = parent.AsClassDeclaration().ClassLikeData()
	case ast.KindClassExpression:
		class = parent.AsClassExpression().ClassLikeData()
	}
	return class
}
