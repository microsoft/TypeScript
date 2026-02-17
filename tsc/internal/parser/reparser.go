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

// Deep-clone the given node and add the clone to the reparsed clone list. The list is used by ast.GetReparsedNodeForNode
// to locate reparsed clones of JSDoc nodes. Since the binder attaches symbols to reparsed nodes and not to JSDoc nodes, we
// need the mapping when obtaining symbols and types from JSDoc nodes.
func (p *Parser) addDeepCloneReparse(node *ast.Node) *ast.Node {
	clone := p.factory.DeepCloneReparse(node)
	if clone != nil {
		p.reparsedClones = append(p.reparsedClones, clone)
	}
	return clone
}

func (p *Parser) reparseCommonJS(node *ast.Node, jsdoc []*ast.Node) {
	if !p.isJavaScript() || node.Kind != ast.KindExpressionStatement {
		return
	}
	// Loop here to support chained assignments, e.g. exports.a = exports.b = exports.c = 42
	expr := node.Expression()
	for {
		var export *ast.Node
		switch ast.GetAssignmentDeclarationKind(expr) {
		case ast.JSDeclarationKindModuleExports:
			export = p.factory.NewJSExportAssignment(nil, p.factory.DeepCloneReparse(expr.AsBinaryExpression().Right))
		case ast.JSDeclarationKindExportsProperty:
			// TODO: Name can sometimes be a string literal, so downstream code needs to handle this
			export = p.factory.NewCommonJSExport(
				nil,
				p.factory.DeepCloneReparse(ast.GetElementOrPropertyAccessName(expr.AsBinaryExpression().Left)),
				nil, /*typeNode*/
				p.factory.DeepCloneReparse(expr.AsBinaryExpression().Right))
		}
		if export == nil {
			break
		}
		p.reparseList = append(p.reparseList, export)
		p.commonJSModuleIndicator = export
		p.reparseTags(export, jsdoc)
		p.finishReparsedNode(export, expr)
		expr = expr.AsBinaryExpression().Right
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
		typeExpression := tag.TypeExpression()
		if typeExpression == nil {
			break
		}
		typeAlias := p.factory.NewJSTypeAliasDeclaration(nil, p.addDeepCloneReparse(tag.AsJSDocTypedefTag().Name()), nil, nil)
		typeAlias.AsTypeAliasDeclaration().TypeParameters = p.gatherTypeParameters(jsDoc, tag)
		var t *ast.Node
		switch typeExpression.Kind {
		case ast.KindJSDocTypeExpression:
			t = p.addDeepCloneReparse(typeExpression.Type())
		case ast.KindJSDocTypeLiteral:
			t = p.reparseJSDocTypeLiteral(typeExpression)
		default:
			panic("typedef tag type expression should be a name reference or a type expression" + typeExpression.Kind.String())
		}
		typeAlias.AsTypeAliasDeclaration().Type = t
		p.finishReparsedNode(typeAlias, tag)
		p.jsdocInfos = append(p.jsdocInfos, JSDocInfo{parent: typeAlias, jsDocs: []*ast.Node{jsDoc}})
		typeAlias.Flags |= ast.NodeFlagsHasJSDoc
		p.reparseList = append(p.reparseList, typeAlias)
	case ast.KindJSDocCallbackTag:
		callbackTag := tag.AsJSDocCallbackTag()
		if callbackTag.TypeExpression == nil {
			break
		}
		functionType := p.reparseJSDocSignature(callbackTag.TypeExpression, tag, jsDoc, tag, nil)
		typeAlias := p.factory.NewJSTypeAliasDeclaration(nil, p.addDeepCloneReparse(callbackTag.FullName), nil, functionType)
		typeAlias.AsTypeAliasDeclaration().TypeParameters = p.gatherTypeParameters(jsDoc, tag)
		p.finishReparsedNode(typeAlias, tag)
		p.jsdocInfos = append(p.jsdocInfos, JSDocInfo{parent: typeAlias, jsDocs: []*ast.Node{jsDoc}})
		typeAlias.Flags |= ast.NodeFlagsHasJSDoc
		p.reparseList = append(p.reparseList, typeAlias)
	case ast.KindJSDocImportTag:
		importTag := tag.AsJSDocImportTag()
		if importTag.ImportClause == nil {
			break
		}
		importClause := p.addDeepCloneReparse(importTag.ImportClause)
		importClause.AsImportClause().PhaseModifier = ast.KindTypeKeyword
		importDeclaration := p.factory.NewJSImportDeclaration(
			p.factory.DeepCloneReparseModifiers(importTag.Modifiers()),
			importClause,
			p.addDeepCloneReparse(importTag.ModuleSpecifier),
			p.addDeepCloneReparse(importTag.Attributes),
		)
		p.finishReparsedNode(importDeclaration, tag)
		p.reparseList = append(p.reparseList, importDeclaration)
	case ast.KindJSDocOverloadTag:
		// Create overload signatures only for function, method, and constructor declarations outside object literals
		if (ast.IsFunctionDeclaration(parent) || ast.IsMethodDeclaration(parent) || ast.IsConstructorDeclaration(parent)) && p.parsingContexts&(1<<PCObjectLiteralMembers) == 0 {
			p.reparseList = append(p.reparseList, p.reparseJSDocSignature(tag.AsJSDocOverloadTag().TypeExpression, parent, jsDoc, tag, parent.Modifiers()))
		}
	}
}

func (p *Parser) reparseJSDocSignature(jsSignature *ast.Node, fun *ast.Node, jsDoc *ast.Node, tag *ast.Node, modifiers *ast.ModifierList) *ast.Node {
	var signature *ast.Node
	clonedModifiers := p.factory.DeepCloneReparseModifiers(modifiers)
	switch fun.Kind {
	case ast.KindFunctionDeclaration:
		signature = p.factory.NewFunctionDeclaration(clonedModifiers, nil, p.factory.DeepCloneReparse(fun.Name()), nil, nil, nil, nil, nil)
	case ast.KindMethodDeclaration:
		signature = p.factory.NewMethodDeclaration(clonedModifiers, nil, p.factory.DeepCloneReparse(fun.Name()), nil, nil, nil, nil, nil, nil)
	case ast.KindConstructor:
		signature = p.factory.NewConstructorDeclaration(clonedModifiers, nil, nil, nil, nil, nil)
	case ast.KindJSDocCallbackTag:
		signature = p.factory.NewFunctionTypeNode(nil, nil, p.factory.NewKeywordTypeNode(ast.KindAnyKeyword))
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
				parameter.AsParameterDeclaration().Type = p.addDeepCloneReparse(thisTag.TypeExpression.Type())
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

			parameter = p.factory.NewParameterDeclaration(nil, dotDotDotToken, p.addDeepCloneReparse(jsparam.Name()), p.makeQuestionIfOptional(jsparam), paramType, nil)
		}
		p.finishReparsedNode(parameter, param)
		parameters = append(parameters, parameter)
		p.reparseJSDocComment(parameter, param)
	}
	signature.FunctionLikeData().Parameters = p.newNodeList(jsSignature.AsJSDocSignature().Parameters.Loc, parameters)

	if jsSignature.Type() != nil && jsSignature.Type().TypeExpression() != nil {
		signature.FunctionLikeData().Type = p.addDeepCloneReparse(jsSignature.Type().TypeExpression().Type())
	}
	loc := jsSignature
	if tag.Kind == ast.KindJSDocOverloadTag {
		loc = tag.TagName()
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
			property := p.factory.NewPropertySignatureDeclaration(nil, p.addDeepCloneReparse(name), p.makeQuestionIfOptional(jsprop), nil, nil)
			if jsprop.TypeExpression != nil {
				property.AsPropertySignatureDeclaration().Type = p.reparseJSDocTypeLiteral(jsprop.TypeExpression.Type())
			}
			p.finishReparsedNode(property, prop)
			properties = append(properties, property)
			p.reparseJSDocComment(property, prop)
		}
		t = p.factory.NewTypeLiteralNode(p.newNodeList(jstypeliteral.Loc, properties))
		if isArrayType {
			p.finishReparsedNode(t, jstypeliteral.AsNode())
			t = p.factory.NewArrayTypeNode(t)
		}
		p.finishReparsedNode(t, jstypeliteral.AsNode())
		return t
	}
	return p.addDeepCloneReparse(t)
}

func (p *Parser) reparseJSDocComment(node *ast.Node, tag *ast.Node) {
	if comment := tag.CommentList(); comment != nil {
		propJSDoc := p.factory.NewJSDoc(comment, nil)
		p.finishReparsedNode(propJSDoc, tag)
		p.jsdocInfos = append(p.jsdocInfos, JSDocInfo{parent: node, jsDocs: []*ast.Node{propJSDoc}})
		node.Flags |= ast.NodeFlagsHasJSDoc
	}
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
					p.addDeepCloneReparse(tp.Name()),
					p.addDeepCloneReparse(constraint.Type()),
					p.addDeepCloneReparse(tp.AsTypeParameter().DefaultType),
				)
				p.finishReparsedNode(reparse, tp)
			} else {
				reparse = p.addDeepCloneReparse(tp)
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
					if declaration.Type() == nil && tag.TypeExpression() != nil {
						declaration.AsMutable().SetType(p.addDeepCloneReparse(tag.TypeExpression().Type()))
						p.finishMutatedNode(declaration)
						return
					}
				}
			}
		case ast.KindVariableDeclaration,
			ast.KindCommonJSExport, ast.KindExportAssignment, ast.KindJSExportAssignment,
			ast.KindPropertyDeclaration, ast.KindPropertyAssignment, ast.KindShorthandPropertyAssignment:
			if parent.Type() == nil && tag.TypeExpression() != nil {
				parent.AsMutable().SetType(p.addDeepCloneReparse(tag.TypeExpression().Type()))
				p.finishMutatedNode(parent)
				return
			}
		case ast.KindParameter:
			if parent.Type() == nil && tag.TypeExpression() != nil {
				parent.AsMutable().SetType(p.reparseJSDocTypeLiteral(tag.TypeExpression().Type()))
				p.finishMutatedNode(parent)
				return
			}
		case ast.KindExpressionStatement:
			if parent.Expression().Kind == ast.KindBinaryExpression {
				bin := parent.Expression().AsBinaryExpression()
				if kind := ast.GetAssignmentDeclarationKind(bin.AsNode()); kind != ast.JSDeclarationKindNone && tag.TypeExpression() != nil {
					bin.AsMutable().SetType(p.addDeepCloneReparse(tag.TypeExpression().Type()))
					p.finishMutatedNode(bin.AsNode())
					return
				}
			}
		case ast.KindReturnStatement, ast.KindParenthesizedExpression:
			if parent.Expression() != nil && tag.TypeExpression() != nil {
				parent.AsMutable().SetExpression(p.makeNewCast(
					p.addDeepCloneReparse(tag.TypeExpression().Type()),
					parent.Expression(),
					true /*isAssertion*/))
				p.finishMutatedNode(parent)
				return
			}
		}
		if fun := getFunctionLikeHost(parent); fun != nil {
			noTypedParams := core.Every(fun.Parameters(), func(param *ast.Node) bool { return param.Type() == nil })
			if fun.TypeParameterList() == nil && fun.Type() == nil && noTypedParams && tag.TypeExpression() != nil {
				fun.FunctionLikeData().FullSignature = p.addDeepCloneReparse(tag.TypeExpression().Type())
				p.finishMutatedNode(fun)
			}
		}
	case ast.KindJSDocSatisfiesTag:
		switch parent.Kind {
		case ast.KindVariableStatement:
			if parent.AsVariableStatement().DeclarationList != nil {
				for _, declaration := range parent.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes {
					if declaration.Initializer() != nil && tag.TypeExpression() != nil {
						declaration.AsMutable().SetInitializer(p.makeNewCast(
							p.addDeepCloneReparse(tag.TypeExpression().Type()),
							declaration.Initializer(),
							false /*isAssertion*/))
						p.finishMutatedNode(declaration)
						break
					}
				}
			}
		case ast.KindVariableDeclaration,
			ast.KindCommonJSExport,
			ast.KindPropertyDeclaration, ast.KindPropertyAssignment:
			if parent.Initializer() != nil && tag.TypeExpression() != nil {
				parent.AsMutable().SetInitializer(p.makeNewCast(
					p.addDeepCloneReparse(tag.TypeExpression().Type()),
					parent.Initializer(),
					false /*isAssertion*/))
				p.finishMutatedNode(parent)
			}
		case ast.KindShorthandPropertyAssignment:
			shorthand := parent.AsShorthandPropertyAssignment()
			if shorthand.ObjectAssignmentInitializer != nil && tag.AsJSDocSatisfiesTag().TypeExpression != nil {
				shorthand.ObjectAssignmentInitializer = p.makeNewCast(
					p.addDeepCloneReparse(tag.AsJSDocSatisfiesTag().TypeExpression.Type()),
					shorthand.ObjectAssignmentInitializer,
					false /*isAssertion*/)
				p.finishMutatedNode(parent)
			}
		case ast.KindReturnStatement, ast.KindParenthesizedExpression,
			ast.KindExportAssignment, ast.KindJSExportAssignment:
			if parent.Expression() != nil && tag.TypeExpression() != nil {
				parent.AsMutable().SetExpression(p.makeNewCast(
					p.addDeepCloneReparse(tag.TypeExpression().Type()),
					parent.Expression(),
					false /*isAssertion*/))
				p.finishMutatedNode(parent)
			}
		case ast.KindExpressionStatement:
			if parent.Expression().Kind == ast.KindBinaryExpression {
				bin := parent.Expression().AsBinaryExpression()
				if kind := ast.GetAssignmentDeclarationKind(bin.AsNode()); kind != ast.JSDeclarationKindNone && tag.TypeExpression() != nil {
					bin.Right = p.makeNewCast(
						p.addDeepCloneReparse(tag.TypeExpression().Type()),
						bin.Right,
						false /*isAssertion*/)
					p.finishMutatedNode(bin.AsNode())
				}
			}
		}
	case ast.KindJSDocTemplateTag:
		if fun := getFunctionLikeHost(parent); fun != nil {
			if fun.TypeParameters() == nil && fun.FunctionLikeData().FullSignature == nil {
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
		if fun := getFunctionLikeHost(parent); fun != nil && fun.FunctionLikeData().FullSignature == nil {
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
		if fun := getFunctionLikeHost(parent); fun != nil {
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
					thisParam.AsParameterDeclaration().Type = p.addDeepCloneReparse(tag.AsJSDocThisTag().TypeExpression.Type())
				}
				p.finishReparsedNode(thisParam, tag.TagName())

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
		if fun := getFunctionLikeHost(parent); fun != nil && fun.FunctionLikeData().FullSignature == nil {
			if fun.Type() == nil && tag.TypeExpression() != nil {
				fun.FunctionLikeData().Type = p.addDeepCloneReparse(tag.TypeExpression().Type())
				p.finishMutatedNode(fun)
			}
		}
	case ast.KindJSDocReadonlyTag, ast.KindJSDocPrivateTag, ast.KindJSDocPublicTag, ast.KindJSDocProtectedTag, ast.KindJSDocOverrideTag:
		if parent.Kind == ast.KindExpressionStatement {
			parent = parent.Expression()
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
				nodes = append(parent.ModifierNodes(), modifier)
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
					implementsClause.AsHeritageClause().Types.Nodes = append(implementsClause.AsHeritageClause().Types.Nodes, p.addDeepCloneReparse(implementsTag.ClassName))
					p.finishMutatedNode(implementsClause)
					return
				}
			}
			typesList := p.newNodeList(implementsTag.ClassName.Loc, p.nodeSlicePool.NewSlice1(p.addDeepCloneReparse(implementsTag.ClassName)))

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
				source := tag.ClassName().AsExpressionWithTypeArguments()
				if ast.HasSamePropertyAccessName(target.Expression, source.Expression) {
					if target.TypeArguments == nil && source.TypeArguments != nil {
						newArguments := p.nodeSlicePool.NewSlice(len(source.TypeArguments.Nodes))
						for i, arg := range source.TypeArguments.Nodes {
							newArguments[i] = p.addDeepCloneReparse(arg)
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

func getFunctionLikeHost(host *ast.Node) *ast.Node {
	fun := host
	if host.Kind == ast.KindVariableStatement && host.AsVariableStatement().DeclarationList != nil {
		for _, declaration := range host.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes {
			if ast.IsFunctionLike(declaration.Initializer()) {
				fun = declaration.Initializer()
				break
			}
		}
	} else if host.Kind == ast.KindPropertyAssignment {
		fun = host.Initializer()
	} else if host.Kind == ast.KindPropertyDeclaration {
		fun = host.Initializer()
	} else if host.Kind == ast.KindExportAssignment {
		fun = host.Expression()
	} else if host.Kind == ast.KindReturnStatement {
		fun = host.Expression()
	} else if host.Kind == ast.KindExpressionStatement {
		fun = ast.GetRightMostAssignedExpression(host.Expression())
	} else if host.Kind == ast.KindCommonJSExport {
		fun = ast.GetRightMostAssignedExpression(host.Initializer())
	}
	if ast.IsFunctionLike(fun) {
		return fun
	}
	return nil
}

func (p *Parser) makeNewCast(t *ast.TypeNode, e *ast.Node, isAssertion bool) *ast.Node {
	var assert *ast.Node
	if isAssertion {
		assert = p.factory.NewAsExpression(e, t)
	} else {
		assert = p.factory.NewSatisfiesExpression(e, t)
	}
	p.finishNodeWithEnd(assert, e.Pos(), e.End())
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
