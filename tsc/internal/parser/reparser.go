package parser

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
)

func (p *Parser) finishReparsedNode(node *ast.Node) {
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
		export = p.factory.NewJSExportAssignment(nil, bin.Right)
	case ast.JSDeclarationKindExportsProperty:
		mod := p.factory.NewModifier(ast.KindExportKeyword)
		mod.Flags = p.contextFlags | ast.NodeFlagsReparsed
		mod.Loc = bin.Loc
		// TODO: Name can sometimes be a string literal, so downstream code needs to handle this
		export = p.factory.NewCommonJSExport(p.newModifierList(bin.Loc, p.nodeSlicePool.NewSlice1(mod)), ast.GetElementOrPropertyAccessName(bin.Left), nil /*typeNode*/, bin.Right)
	}
	if export != nil {
		export.Flags = ast.NodeFlagsReparsed
		export.Loc = bin.Loc
		p.reparseList = append(p.reparseList, export)
		p.commonJSModuleIndicator = export
		p.reparseTags(export, jsdoc)
		p.finishReparsedNode(export)
		p.finishReparsedNode(bin.AsNode()) // TODO: the same node appears in both the new export declaration and the original binary expression - both locations cannot have correct `.Parent` pointers. For now, the binary expression being correctly parented is baselined behavior, since it appears first in the AST.
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

		typeAlias := p.factory.NewJSTypeAliasDeclaration(modifiers, tag.AsJSDocTypedefTag().Name(), nil, nil)
		typeAlias.AsTypeAliasDeclaration().TypeParameters = p.gatherTypeParameters(jsDoc, tag, typeAlias)
		var t *ast.Node
		switch typeExpression.Kind {
		case ast.KindJSDocTypeExpression:
			t = setHost(typeExpression, typeAlias)
		case ast.KindJSDocTypeLiteral:
			t = p.reparseJSDocTypeLiteral(typeExpression)
		default:
			panic("typedef tag type expression should be a name reference or a type expression" + typeExpression.Kind.String())
		}
		typeAlias.AsTypeAliasDeclaration().Type = t
		typeAlias.Loc = tag.Loc
		typeAlias.Flags = p.contextFlags | ast.NodeFlagsReparsed
		p.finishReparsedNode(typeAlias)
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
		functionType := p.reparseJSDocSignature(callbackTag.TypeExpression, tag, jsDoc, tag)

		typeAlias := p.factory.NewJSTypeAliasDeclaration(modifiers, callbackTag.FullName, nil, functionType)
		typeAlias.AsTypeAliasDeclaration().TypeParameters = p.gatherTypeParameters(jsDoc, tag, typeAlias)
		typeAlias.Loc = tag.Loc
		typeAlias.Flags = p.contextFlags | ast.NodeFlagsReparsed
		p.finishReparsedNode(typeAlias)
		p.reparseList = append(p.reparseList, typeAlias)
	case ast.KindJSDocImportTag:
		importTag := tag.AsJSDocImportTag()
		importClause := importTag.ImportClause
		importClause.Flags |= ast.NodeFlagsReparsed
		importClause.AsImportClause().IsTypeOnly = true
		p.finishReparsedNode(importClause)
		importDeclaration := p.factory.NewJSImportDeclaration(importTag.Modifiers(), importClause, importTag.ModuleSpecifier, importTag.Attributes)
		importDeclaration.Loc = tag.Loc
		importDeclaration.Flags = p.contextFlags | ast.NodeFlagsReparsed
		importTag.JSImportDeclaration = importDeclaration.AsImportDeclaration()
		p.finishReparsedNode(importDeclaration)
		p.reparseList = append(p.reparseList, importDeclaration)
	case ast.KindJSDocOverloadTag:
		if fun, ok := getFunctionLikeHost(parent); ok {
			p.reparseList = append(p.reparseList, p.reparseJSDocSignature(tag.AsJSDocOverloadTag().TypeExpression, fun, jsDoc, tag))
			p.finishReparsedNode(fun)
		}
	}
}

func (p *Parser) reparseJSDocSignature(jsSignature *ast.Node, fun *ast.Node, jsDoc *ast.Node, tag *ast.Node) *ast.Node {
	var signature *ast.Node
	switch fun.Kind {
	case ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindArrowFunction:
		signature = p.factory.NewFunctionDeclaration(nil, nil, fun.Name(), nil, nil, nil, nil)
	case ast.KindMethodDeclaration, ast.KindMethodSignature:
		signature = p.factory.NewMethodDeclaration(nil, nil, fun.Name(), nil, nil, nil, nil, nil)
	case ast.KindConstructor:
		signature = p.factory.NewConstructorDeclaration(nil, nil, nil, nil, nil)
	case ast.KindJSDocCallbackTag:
		signature = p.factory.NewFunctionTypeNode(nil, nil, nil)
	default:
		panic("Unexpected kind " + fun.Kind.String())
	}

	if tag.Kind != ast.KindJSDocCallbackTag {
		signature.FunctionLikeData().TypeParameters = p.gatherTypeParameters(jsDoc, tag, signature)
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
			parameter.AsParameterDeclaration().Type = setHost(thisTag.TypeExpression, parameter)
		} else {
			jsparam := param.AsJSDocParameterOrPropertyTag()
			parameter = p.factory.NewParameterDeclaration(nil, nil, jsparam.Name(), p.makeQuestionIfOptional(jsparam), nil, nil)
			if jsparam.TypeExpression != nil {
				parameter.AsParameterDeclaration().Type = p.reparseJSDocTypeLiteral(setHost(jsparam.TypeExpression, parameter))
			}
		}
		parameter.Loc = param.Loc
		parameter.Flags = p.contextFlags | ast.NodeFlagsReparsed
		p.finishReparsedNode(parameter)
		parameters = append(parameters, parameter)
	}
	signature.FunctionLikeData().Parameters = p.newNodeList(jsSignature.AsJSDocSignature().Parameters.Loc, parameters)

	if jsSignature.Type() != nil {
		signature.FunctionLikeData().Type = setHost(jsSignature.Type().AsJSDocReturnTag().TypeExpression, signature)
	}
	signature.Loc = tag.Loc
	if tag.Kind == ast.KindJSDocOverloadTag {
		signature.Loc = tag.AsJSDocOverloadTag().TagName.Loc
	}
	signature.Flags = p.contextFlags | ast.NodeFlagsReparsed
	p.finishReparsedNode(signature)
	return signature
}

func (p *Parser) reparseJSDocTypeLiteral(t *ast.TypeNode) *ast.Node {
	if t == nil {
		return nil
	}
	if t.Kind == ast.KindJSDocTypeLiteral {
		isArrayType := t.AsJSDocTypeLiteral().IsArrayType
		properties := p.nodeSlicePool.NewSlice(0)
		for _, prop := range t.AsJSDocTypeLiteral().JSDocPropertyTags {
			jsprop := prop.AsJSDocParameterOrPropertyTag()
			name := prop.Name()
			if name.Kind == ast.KindQualifiedName {
				name = name.AsQualifiedName().Right
			}
			property := p.factory.NewPropertySignatureDeclaration(nil, name, p.makeQuestionIfOptional(jsprop), nil, nil)
			if jsprop.TypeExpression != nil {
				property.AsPropertySignatureDeclaration().Type = p.reparseJSDocTypeLiteral(jsprop.TypeExpression.Type())
			}
			property.Loc = prop.Loc
			property.Flags = p.contextFlags | ast.NodeFlagsReparsed
			p.finishReparsedNode(property)
			properties = append(properties, property)
		}
		loc := t.Loc
		t = p.factory.NewTypeLiteralNode(p.newNodeList(loc, properties))
		t.Loc = loc
		t.Flags = p.contextFlags | ast.NodeFlagsReparsed
		if isArrayType {
			p.finishReparsedNode(t)
			t = p.factory.NewArrayTypeNode(t)
			t.Flags = p.contextFlags | ast.NodeFlagsReparsed
			t.Loc = loc
		}
		p.finishReparsedNode(t)
	}
	return t
}

func (p *Parser) gatherTypeParameters(j *ast.Node, tagWithTypeParameters *ast.Node, host *ast.Node) *ast.NodeList {
	typeParameters := p.nodeSlicePool.NewSlice(0)
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
			reparse := tp
			if constraint != nil && firstTypeParameter {
				reparse = p.factory.NewTypeParameterDeclaration(tp.Modifiers(), tp.Name(), nil, tp.AsTypeParameter().DefaultType)
				reparse.AsTypeParameter().Constraint = setHost(constraint, reparse)
				reparse.Loc = tp.Loc
			}
			if tag.AsJSDocTemplateTag().Host == nil {
				tag.AsJSDocTemplateTag().Host = host
			} else if firstTypeParameter {
				// don't panic for non-first type parameters like U,V in `@template T,U,V`; they share a host with the first one
				panic("JSDoc type parameter already has a host: " + tag.AsJSDocTemplateTag().Host.Kind.String())
			}
			reparse.Flags |= ast.NodeFlagsReparsed
			p.finishReparsedNode(reparse)
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
					if declaration.AsVariableDeclaration().Type == nil {
						declaration.AsVariableDeclaration().Type = setHost(tag.AsJSDocTypeTag().TypeExpression, declaration)
						p.finishReparsedNode(declaration)
						break
					}
				}
			}
		case ast.KindVariableDeclaration:
			if parent.AsVariableDeclaration().Type == nil {
				parent.AsVariableDeclaration().Type = setHost(tag.AsJSDocTypeTag().TypeExpression, parent)
				p.finishReparsedNode(parent)
			}
		case ast.KindCommonJSExport:
			export := parent.AsCommonJSExport()
			if export.Type == nil {
				export.Type = setHost(tag.AsJSDocTypeTag().TypeExpression, parent)
				p.finishReparsedNode(parent)
			}
		case ast.KindPropertyDeclaration:
			declaration := parent.AsPropertyDeclaration()
			if declaration.Type == nil {
				declaration.Type = setHost(tag.AsJSDocTypeTag().TypeExpression, parent)
				p.finishReparsedNode(parent)
			}
		case ast.KindPropertyAssignment:
			prop := parent.AsPropertyAssignment()
			if prop.Type == nil {
				prop.Type = setHost(tag.AsJSDocTypeTag().TypeExpression, parent)
				p.finishReparsedNode(parent)
			}
		case ast.KindShorthandPropertyAssignment:
			prop := parent.AsShorthandPropertyAssignment()
			if prop.Type == nil {
				prop.Type = setHost(tag.AsJSDocTypeTag().TypeExpression, parent)
				p.finishReparsedNode(parent)
			}
		case ast.KindExportAssignment, ast.KindJSExportAssignment:
			export := parent.AsExportAssignment()
			if export.Type == nil {
				export.Type = setHost(tag.AsJSDocTypeTag().TypeExpression, parent)
				p.finishReparsedNode(parent)
			}
		case ast.KindReturnStatement:
			ret := parent.AsReturnStatement()
			ret.Expression = p.makeNewCast(setHost(tag.AsJSDocTypeTag().TypeExpression, nil), ret.Expression, true /*isAssertion*/)
			p.finishReparsedNode(parent)
		case ast.KindParenthesizedExpression:
			paren := parent.AsParenthesizedExpression()
			paren.Expression = p.makeNewCast(setHost(tag.AsJSDocTypeTag().TypeExpression, nil), paren.Expression, true /*isAssertion*/)
			p.finishReparsedNode(parent)
		case ast.KindExpressionStatement:
			if parent.AsExpressionStatement().Expression.Kind == ast.KindBinaryExpression {
				bin := parent.AsExpressionStatement().Expression.AsBinaryExpression()
				if kind := ast.GetAssignmentDeclarationKind(bin); kind != ast.JSDeclarationKindNone {
					bin.Type = setHost(tag.AsJSDocTypeTag().TypeExpression, parent.AsExpressionStatement().Expression)
					p.finishReparsedNode(bin.AsNode())
				}
			}
		}
	case ast.KindJSDocSatisfiesTag:
		if parent.Kind == ast.KindParenthesizedExpression {
			paren := parent.AsParenthesizedExpression()
			paren.Expression = p.makeNewCast(setHost(tag.AsJSDocSatisfiesTag().TypeExpression, nil), paren.Expression, false /*isAssertion*/)
			p.finishReparsedNode(parent)
		}
	case ast.KindJSDocTemplateTag:
		if fun, ok := getFunctionLikeHost(parent); ok {
			if fun.TypeParameters() == nil {
				fun.FunctionLikeData().TypeParameters = p.gatherTypeParameters(jsDoc, nil /*tagWithTypeParameters*/, fun)
				p.finishReparsedNode(fun)
			}
		} else if parent.Kind == ast.KindClassDeclaration {
			class := parent.AsClassDeclaration()
			if class.TypeParameters == nil {
				class.TypeParameters = p.gatherTypeParameters(jsDoc, nil /*tagWithTypeParameters*/, parent)
				p.finishReparsedNode(parent)
			}
		} else if parent.Kind == ast.KindClassExpression {
			class := parent.AsClassExpression()
			if class.TypeParameters == nil {
				class.TypeParameters = p.gatherTypeParameters(jsDoc, nil /*tagWithTypeParameters*/, parent)
				p.finishReparsedNode(parent)
			}
		}
	case ast.KindJSDocParameterTag:
		if fun, ok := getFunctionLikeHost(parent); ok {
			parameterTag := tag.AsJSDocParameterOrPropertyTag()
			if param, ok := findMatchingParameter(fun, parameterTag, jsDoc); ok {
				if param.Type == nil {
					param.AsParameterDeclaration().Type = p.reparseJSDocTypeLiteral(setHost(p.reparseJSDocTypeLiteral(parameterTag.TypeExpression), param.AsNode()))
				}
				if param.QuestionToken == nil && param.Initializer == nil {
					if question := p.makeQuestionIfOptional(parameterTag); question != nil {
						param.QuestionToken = question
					}
				}
				p.finishReparsedNode(param.AsNode())
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
				thisParam.AsParameterDeclaration().Type = setHost(tag.AsJSDocThisTag().TypeExpression, thisParam)
				thisParam.Loc = tag.AsJSDocThisTag().TagName.Loc
				thisParam.Flags = p.contextFlags | ast.NodeFlagsReparsed
				p.finishReparsedNode(thisParam)

				newParams := p.nodeSlicePool.NewSlice(len(params) + 1)
				newParams[0] = thisParam
				for i, param := range params {
					newParams[i+1] = param
				}

				fun.FunctionLikeData().Parameters = p.newNodeList(thisParam.Loc, newParams)
				p.finishReparsedNode(fun)
			}
		}
	case ast.KindJSDocReturnTag:
		if fun, ok := getFunctionLikeHost(parent); ok {
			if fun.Type() == nil {
				fun.FunctionLikeData().Type = setHost(tag.AsJSDocReturnTag().TypeExpression, fun)
				p.finishReparsedNode(fun)
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
			p.finishReparsedNode(parent)
		}
	case ast.KindJSDocImplementsTag:
		if class := getClassLikeData(parent); class != nil {
			implementsTag := tag.AsJSDocImplementsTag()

			if class.HeritageClauses != nil {
				if implementsClause := core.Find(class.HeritageClauses.Nodes, func(node *ast.Node) bool {
					return node.AsHeritageClause().Token == ast.KindImplementsKeyword
				}); implementsClause != nil {
					implementsClause.AsHeritageClause().Types.Nodes = append(implementsClause.AsHeritageClause().Types.Nodes, implementsTag.ClassName)
					p.finishReparsedNode(implementsClause)
					return
				}
			}
			implementsTag.ClassName.Flags |= ast.NodeFlagsReparsed
			typesList := p.newNodeList(implementsTag.ClassName.Loc, p.nodeSlicePool.NewSlice1(implementsTag.ClassName))

			heritageClause := p.factory.NewHeritageClause(ast.KindImplementsKeyword, typesList)
			heritageClause.Loc = implementsTag.ClassName.Loc
			heritageClause.Flags = p.contextFlags | ast.NodeFlagsReparsed
			p.finishReparsedNode(heritageClause)

			if class.HeritageClauses == nil {
				heritageClauses := p.newNodeList(implementsTag.ClassName.Loc, p.nodeSlicePool.NewSlice1(heritageClause))
				class.HeritageClauses = heritageClauses
			} else {
				class.HeritageClauses.Nodes = append(class.HeritageClauses.Nodes, heritageClause)
			}
			p.finishReparsedNode(parent)
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
						target.TypeArguments = source.TypeArguments
						for _, typeArg := range source.TypeArguments.Nodes {
							typeArg.Flags |= ast.NodeFlagsReparsed
						}
						p.finishReparsedNode(target.AsNode())
					}
					return
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

func findMatchingParameter(fun *ast.Node, tag *ast.JSDocParameterTag, jsDoc *ast.Node) (*ast.ParameterDeclaration, bool) {
	tagIndex := core.FindIndex(jsDoc.AsJSDoc().Tags.Nodes, func(n *ast.Node) bool {
		return n.Kind == ast.KindJSDocParameterTag && n.AsJSDocParameterOrPropertyTag() == tag
	})
	for parameterIndex, parameter := range fun.Parameters() {
		if parameter.Name().Kind == ast.KindIdentifier {
			if tag.Name().Kind == ast.KindIdentifier && parameter.Name().Text() == tag.Name().Text() {
				return parameter.AsParameterDeclaration(), true
			}
		} else {
			if parameterIndex == tagIndex {
				return parameter.AsParameterDeclaration(), true
			}
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
	assert.Flags = p.contextFlags | ast.NodeFlagsReparsed
	assert.Loc = core.NewTextRange(e.Pos(), e.End())
	p.finishReparsedNode(assert)
	return assert
}

func setHost(typeExpression *ast.TypeNode, host *ast.Node) *ast.Node {
	if typeExpression == nil || typeExpression.Type() == nil {
		return nil
	}
	if typeExpression.AsJSDocTypeExpression().Host == nil {
		typeExpression.AsJSDocTypeExpression().Host = host
	} else if host.Kind != ast.KindJSExportAssignment && host.Kind != ast.KindCommonJSExport {
		panic("JSDoc type expression already has a host: " + typeExpression.AsJSDocTypeExpression().Host.Kind.String())
	}
	t := typeExpression.Type()
	t.Flags |= ast.NodeFlagsReparsed
	return t
}

func getClassLikeData(parent *ast.Node) *ast.ClassLikeBase {
	var class *ast.ClassLikeBase
	if parent.Kind == ast.KindClassDeclaration {
		class = parent.AsClassDeclaration().ClassLikeData()
	} else if parent.Kind == ast.KindClassExpression {
		class = parent.AsClassExpression().ClassLikeData()
	}
	return class
}
