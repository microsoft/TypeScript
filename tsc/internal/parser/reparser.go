package parser

import (
	"strconv"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
)

func (p *Parser) finishReparsedNode(node ast.Node, locationNode ast.Node) {
	node.SetFlags(p.contextFlags | ast.NodeFlagsReparsed)
	node.SetLoc(locationNode.Loc())
	p.overrideParentInImmediateChildren(node)
}

func (p *Parser) finishMutatedNode(node ast.Node) {
	p.overrideParentInImmediateChildren(node)
}

// Deep-clone the given node and add the clone to the reparsed clone list. The list is used by ast.GetReparsedNodeForNode
// to locate reparsed clones of JSDoc nodes. Since the binder attaches symbols to reparsed nodes and not to JSDoc nodes, we
// need the mapping when obtaining symbols and types from JSDoc nodes.
func (p *Parser) addDeepCloneReparse(node ast.Node) ast.Node {
	clone := p.factory.DeepCloneReparse(node)
	if !clone.IsNil() {
		p.reparsedClones = append(p.reparsedClones, clone)
	}
	return clone
}

func (p *Parser) addTransformedReparse(newNode ast.Node, old ast.Node) ast.Node {
	p.finishReparsedNode(newNode, old)
	newNode.SetFlags(newNode.Flags() | ast.NodeFlagsReparserTransformedLiteral)
	p.reparsedClones = append(p.reparsedClones, newNode)
	return newNode
}

func (p *Parser) checkNonIdentifierName(name ast.Node) ast.Node {
	// Handles the case of anonymous functions
	if name.IsNil() {
		return ast.Node{}
	}
	if ast.IsIdentifier(name) && !scanner.IsValidIdentifier(name.AsIdentifier().Text()) {
		errLoc := name.Loc()
		if errLoc.Len() == 0 { // missing name, emit error on the character before the missing name node
			errLoc = core.NewTextRange(name.Loc().Pos()-1, name.Loc().Pos())
		}
		p.parseErrorAtRange(errLoc, diagnostics.Identifier_expected)
	}
	return name
}

// Hosted tags find a host and add their children to the correct location under the host.
// Unhosted tags add synthetic nodes to the reparse list.
func (p *Parser) reparseTags(parent ast.Node, jsDoc []ast.Node) {
	for _, j := range jsDoc {
		isLast := j == jsDoc[len(jsDoc)-1]
		tags := j.AsJSDoc().Tags()
		if tags == nil {
			continue
		}
		for _, tag := range tags.Nodes {
			p.reparseUnhosted(tag, parent, j)
			if isLast {
				p.reparseHosted(tag, parent, j)
			}
		}
	}
}

func (p *Parser) reparseUnhosted(tag ast.Node, parent ast.Node, jsDoc ast.Node) {
	switch tag.Kind() {
	case ast.KindJSDocTypedefTag:
		typeExpression := tag.TypeExpression()
		if typeExpression.IsNil() {
			break
		}
		fullName := tag.Name()
		isNamespace := !fullName.IsNil() && ast.IsModuleDeclaration(fullName)
		var modifiers *ast.ModifierList
		if isNamespace {
			modifiers = p.createExportModifier(tag)
		}
		typeAlias := p.factory.NewJSTypeAliasDeclaration(modifiers, p.addDeepCloneReparse(p.checkNonIdentifierName(p.getInnermostNameOfJSDocNamespace(fullName))), nil, ast.Node{})
		typeAlias.AsTypeAliasDeclaration().SetTypeParameters(p.gatherTypeParameters(jsDoc, true /*typedefOrCallback*/))
		var t ast.Node
		switch typeExpression.Kind() {
		case ast.KindJSDocTypeExpression:
			t = p.addDeepCloneReparse(typeExpression.Type())
		case ast.KindJSDocTypeLiteral:
			t = p.reparseJSDocTypeLiteral(typeExpression)
		default:
			panic("typedef tag type expression should be a name reference or a type expression" + typeExpression.Kind().String())
		}
		typeAlias.AsTypeAliasDeclaration().SetType(t)
		p.finishReparsedNode(typeAlias, tag)
		p.jsdocInfos = append(p.jsdocInfos, JSDocInfo{parent: typeAlias, jsDocs: []ast.Node{jsDoc}})
		typeAlias.SetFlags(typeAlias.Flags() | ast.NodeFlagsHasJSDoc)
		result := p.wrapInJSDocNamespace(fullName, typeAlias, false /*nested*/)
		p.reparseList = append(p.reparseList, result)
	case ast.KindJSDocCallbackTag:
		typeExpression := tag.TypeExpression()
		if typeExpression.IsNil() {
			break
		}
		fullName := tag.Name()
		isNamespace := !fullName.IsNil() && ast.IsModuleDeclaration(fullName)
		var modifiers *ast.ModifierList
		if isNamespace {
			modifiers = p.createExportModifier(tag)
		}
		functionType := p.reparseJSDocSignature(typeExpression, tag, jsDoc, tag, nil)
		typeAlias := p.factory.NewJSTypeAliasDeclaration(modifiers, p.addDeepCloneReparse(p.getInnermostNameOfJSDocNamespace(fullName)), nil, functionType)
		typeAlias.AsTypeAliasDeclaration().SetTypeParameters(p.gatherTypeParameters(jsDoc, true /*typedefOrCallback*/))
		p.finishReparsedNode(typeAlias, tag)
		p.jsdocInfos = append(p.jsdocInfos, JSDocInfo{parent: typeAlias, jsDocs: []ast.Node{jsDoc}})
		typeAlias.SetFlags(typeAlias.Flags() | ast.NodeFlagsHasJSDoc)
		result := p.wrapInJSDocNamespace(fullName, typeAlias, false /*nested*/)
		p.reparseList = append(p.reparseList, result)
	case ast.KindJSDocImportTag:
		importTag := tag.AsJSDocImportTag()
		if importTag.ImportClause().IsNil() {
			break
		}
		importClause := p.addDeepCloneReparse(importTag.ImportClause())
		importClause.AsImportClause().SetPhaseModifier(ast.KindTypeKeyword)
		importDeclaration := p.factory.NewJSImportDeclaration(
			p.factory.DeepCloneReparseModifiers(importTag.Modifiers()),
			importClause,
			p.addDeepCloneReparse(importTag.ModuleSpecifier()),
			p.addDeepCloneReparse(importTag.Attributes()),
		)
		p.finishReparsedNode(importDeclaration, tag)
		p.reparseList = append(p.reparseList, importDeclaration)
	case ast.KindJSDocOverloadTag:
		// Create overload signatures only for function, method, and constructor declarations outside object literals
		if (ast.IsFunctionDeclaration(parent) || ast.IsMethodDeclaration(parent) || ast.IsConstructorDeclaration(parent)) && p.parsingContexts&(1<<PCObjectLiteralMembers) == 0 {
			p.reparseList = append(p.reparseList, p.reparseJSDocSignature(tag.AsJSDocOverloadTag().TypeExpression(), parent, jsDoc, tag, parent.Modifiers()))
		}
	}
}

func (p *Parser) reparseJSDocSignature(jsSignature ast.Node, fun ast.Node, jsDoc ast.Node, tag ast.Node, modifiers *ast.ModifierList) ast.Node {
	var signature ast.Node
	clonedModifiers := p.factory.DeepCloneReparseModifiers(modifiers)
	switch fun.Kind() {
	case ast.KindFunctionDeclaration:
		signature = p.factory.NewFunctionDeclaration(clonedModifiers, ast.Node{}, p.factory.DeepCloneReparse(p.checkNonIdentifierName(fun.Name())), nil, nil, ast.Node{}, ast.Node{}, ast.Node{})
	case ast.KindMethodDeclaration:
		signature = p.factory.NewMethodDeclaration(clonedModifiers, ast.Node{}, p.factory.DeepCloneReparse(p.checkNonIdentifierName(fun.Name())), ast.Node{}, nil, nil, ast.Node{}, ast.Node{}, ast.Node{})
	case ast.KindConstructor:
		signature = p.factory.NewConstructorDeclaration(clonedModifiers, nil, nil, ast.Node{}, ast.Node{}, ast.Node{})
	case ast.KindJSDocCallbackTag:
		signature = p.factory.NewFunctionTypeNode(nil, nil, p.factory.NewKeywordTypeNode(ast.KindAnyKeyword))
	default:
		panic("Unexpected kind " + fun.Kind().String())
	}

	if tag.Kind() != ast.KindJSDocCallbackTag {
		signature.FunctionLikeData().SetTypeParameters(p.gatherTypeParameters(jsDoc, false /*typedefOrCallback*/))
	}
	parameters := p.nodeSliceArena.NewSlice(0)
	for pi, param := range jsSignature.Parameters() {
		var parameter ast.Node
		if param.Kind() == ast.KindJSDocThisTag {
			thisTag := param.AsJSDocThisTag()
			thisIdent := p.factory.NewIdentifier("this")
			thisIdent.SetLoc(thisTag.Loc())
			thisIdent.SetFlags(p.contextFlags | ast.NodeFlagsReparsed)
			parameter = p.factory.NewParameterDeclaration(nil, ast.Node{}, thisIdent, ast.Node{}, ast.Node{}, ast.Node{})
			if !thisTag.TypeExpression().IsNil() {
				parameter.AsParameterDeclaration().SetType(p.addDeepCloneReparse(thisTag.TypeExpression().Type()))
			}
		} else if param.Kind() == ast.KindJSDocParameterTag || param.Kind() == ast.KindJSDocPropertyTag {
			jsparam := param.AsJSDocParameterOrPropertyTag()
			// Skip sub-property parameters (e.g., @param x.y) - these have QualifiedNames
			// and describe properties of a parent parameter, not standalone parameters.
			if ast.IsQualifiedName(jsparam.Name()) {
				continue
			}
			var dotDotDotToken ast.Node
			var paramType ast.TypeNode

			if !jsparam.TypeExpression().IsNil() {
				if jsparam.TypeExpression().Type().Kind() == ast.KindJSDocVariadicType {
					dotDotDotToken = p.factory.NewToken(ast.KindDotDotDotToken)
					dotDotDotToken.SetLoc(jsparam.Loc())
					dotDotDotToken.SetFlags(p.contextFlags | ast.NodeFlagsReparsed)

					variadicType := jsparam.TypeExpression().Type().AsJSDocVariadicType()
					paramType = p.reparseJSDocTypeLiteral(variadicType.Type())
				} else {
					paramType = p.reparseJSDocTypeLiteral(jsparam.TypeExpression().Type())
				}
			}
			name := jsparam.Name()
			if ast.IsIdentifier(name) && !scanner.IsValidIdentifier(name.AsIdentifier().Text()) {
				// drop invalid chars for _, if empty, write _0, etc., so we have a valid param name to emit later
				result := strings.Builder{}
				for i, ch := range name.AsIdentifier().Text() {
					if i == 0 {
						if !scanner.IsIdentifierStart(ch) {
							result.WriteRune('_')
						} else {
							result.WriteRune(ch)
						}
						continue
					} else if !scanner.IsIdentifierPart(ch) {
						result.WriteRune('_')
					} else {
						result.WriteRune(ch)
					}
				}
				if result.Len() == 0 {
					result.WriteRune('_')
					result.WriteString(strconv.Itoa(pi))
				}
				name = p.addTransformedReparse(p.factory.NewIdentifier(result.String()), name)
			} else {
				name = p.addDeepCloneReparse(name)
			}
			parameter = p.factory.NewParameterDeclaration(nil, dotDotDotToken, name, p.makeQuestionIfOptional(jsparam), paramType, ast.Node{})
		}
		p.finishReparsedNode(parameter, param)
		parameters = append(parameters, parameter)
		p.reparseJSDocComment(parameter, param)
	}
	signature.FunctionLikeData().SetParameters(p.newNodeList(jsSignature.AsJSDocSignature().Parameters().Loc, parameters))

	if !jsSignature.Type().IsNil() && !jsSignature.Type().TypeExpression().IsNil() {
		signature.FunctionLikeData().SetType(p.addDeepCloneReparse(jsSignature.Type().TypeExpression().Type()))
	}
	loc := jsSignature
	if tag.Kind() == ast.KindJSDocOverloadTag {
		loc = tag.TagName()
	}
	p.finishReparsedNode(signature, loc)
	return signature
}

func (p *Parser) reparseJSDocTypeLiteral(t ast.TypeNode) ast.Node {
	if t.IsNil() {
		return ast.Node{}
	}
	if t.Kind() == ast.KindJSDocTypeLiteral {
		jstypeliteral := t.AsJSDocTypeLiteral()
		isArrayType := jstypeliteral.IsArrayType()
		properties := p.nodeSliceArena.NewSlice(0)
		for _, prop := range jstypeliteral.JSDocPropertyTags() {
			if prop.Kind() != ast.KindJSDocPropertyTag && prop.Kind() != ast.KindJSDocParameterTag {
				continue
			}
			jsprop := prop.AsJSDocParameterOrPropertyTag()
			name := prop.Name()
			if name.Kind() == ast.KindQualifiedName {
				name = name.AsQualifiedName().Right()
			}
			if ast.IsIdentifier(name) && !scanner.IsValidIdentifier(name.AsIdentifier().Text()) {
				name = p.addTransformedReparse(p.factory.NewStringLiteral(name.AsIdentifier().Text(), ast.TokenFlagsNone), name)
			} else {
				name = p.addDeepCloneReparse(name)
			}
			property := p.factory.NewPropertySignatureDeclaration(nil, name, p.makeQuestionIfOptional(jsprop), ast.Node{}, ast.Node{})
			if !jsprop.TypeExpression().IsNil() {
				property.AsPropertySignatureDeclaration().SetType(p.reparseJSDocTypeLiteral(jsprop.TypeExpression().Type()))
			}
			p.finishReparsedNode(property, prop)
			properties = append(properties, property)
			p.reparseJSDocComment(property, prop)
		}
		t = p.factory.NewTypeLiteralNode(p.newNodeList(jstypeliteral.Loc(), properties))
		if isArrayType {
			p.finishReparsedNode(t, jstypeliteral.AsNode())
			t = p.factory.NewArrayTypeNode(t)
		}
		p.finishReparsedNode(t, jstypeliteral.AsNode())
		return t
	}
	return p.addDeepCloneReparse(t)
}

func (p *Parser) reparseJSDocComment(node ast.Node, tag ast.Node) {
	if comment := tag.CommentList(); comment != nil {
		newComment := p.factory.NewNodeList(core.Map(comment.Nodes, p.factory.DeepCloneReparse))
		newComment.Loc = comment.Loc
		propJSDoc := p.factory.NewJSDoc(newComment, nil)
		p.finishReparsedNode(propJSDoc, tag)
		propJSDoc.SetParent(node)
		p.jsdocInfos = append(p.jsdocInfos, JSDocInfo{parent: node, jsDocs: []ast.Node{propJSDoc}})
		node.SetFlags(node.Flags() | ast.NodeFlagsHasJSDoc)
	}
}

func (p *Parser) gatherTypeParameters(j ast.Node, typedefOrCallback bool) *ast.NodeList {
	var typeParameters []ast.Node
	pos := -1
	endPos := -1
	firstTemplate := true
	for _, tag := range j.AsJSDoc().Tags().Nodes {
		// When a JSDoc comment contains an `@typedef` or `@callback` tag, `@template` type parameter
		// declarations apply to the type being defined.
		if !typedefOrCallback && (ast.IsJSDocTypedefTag(tag) || ast.IsJSDocCallbackTag(tag)) {
			return nil
		}
		if !ast.IsJSDocTemplateTag(tag) {
			continue
		}
		if firstTemplate {
			pos = tag.Pos()
			firstTemplate = false
		}
		endPos = tag.End()
		constraint := tag.AsJSDocTemplateTag().Constraint()
		firstTypeParameter := true
		for _, tp := range tag.TypeParameters() {
			var reparse ast.Node
			if !constraint.IsNil() && firstTypeParameter {
				reparse = p.factory.NewTypeParameterDeclaration(
					p.factory.DeepCloneReparseModifiers(tp.Modifiers()),
					p.addDeepCloneReparse(p.checkNonIdentifierName(tp.Name())),
					p.addDeepCloneReparse(constraint.Type()),
					ast.Node{}, // expression
					p.addDeepCloneReparse(tp.AsTypeParameterDeclaration().DefaultType()),
				)
				p.finishReparsedNode(reparse, tp)
			} else {
				reparse = p.addDeepCloneReparse(tp)
			}
			if typeParameters == nil {
				typeParameters = p.nodeSliceArena.NewSlice(0)
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

func (p *Parser) reparseHosted(tag ast.Node, parent ast.Node, jsDoc ast.Node) {
	switch tag.Kind() {
	case ast.KindJSDocTypeTag:
		switch parent.Kind() {
		case ast.KindVariableStatement:
			if !parent.AsVariableStatement().DeclarationList().IsNil() {
				for _, declaration := range parent.AsVariableStatement().DeclarationList().AsVariableDeclarationList().Declarations().Nodes {
					if declaration.Type().IsNil() && !tag.TypeExpression().IsNil() {
						declaration.AsMutable().SetType(p.addDeepCloneReparse(tag.TypeExpression().Type()))
						p.finishMutatedNode(declaration)
						return
					}
				}
			}
		case ast.KindVariableDeclaration, ast.KindExportAssignment, ast.KindPropertyDeclaration, ast.KindPropertyAssignment,
			ast.KindShorthandPropertyAssignment, ast.KindGetAccessor:
			if parent.Type().IsNil() && !tag.TypeExpression().IsNil() {
				parent.AsMutable().SetType(p.addDeepCloneReparse(tag.TypeExpression().Type()))
				p.finishMutatedNode(parent)
				return
			}
		case ast.KindParameter:
			if parent.Type().IsNil() && !tag.TypeExpression().IsNil() {
				parent.AsMutable().SetType(p.reparseJSDocTypeLiteral(tag.TypeExpression().Type()))
				p.finishMutatedNode(parent)
				return
			}
		case ast.KindExpressionStatement:
			if parent.Expression().Kind() == ast.KindBinaryExpression {
				bin := parent.Expression().AsBinaryExpression()
				if kind := ast.GetAssignmentDeclarationKind(bin.AsNode()); kind != ast.JSDeclarationKindNone && !tag.TypeExpression().IsNil() {
					bin.AsMutable().SetType(p.addDeepCloneReparse(tag.TypeExpression().Type()))
					p.finishMutatedNode(bin.AsNode())
					return
				}
			}
		case ast.KindReturnStatement, ast.KindParenthesizedExpression:
			if !parent.Expression().IsNil() && !tag.TypeExpression().IsNil() {
				parent.AsMutable().SetExpression(p.makeNewCast(
					p.addDeepCloneReparse(tag.TypeExpression().Type()),
					parent.Expression(),
					true, /*isAssertion*/
				))
				p.finishMutatedNode(parent)
				return
			}
		}
		if fun := getFunctionLikeHost(parent); !fun.IsNil() {
			noTypedParams := core.Every(fun.Parameters(), func(param ast.Node) bool { return param.Type().IsNil() })
			if fun.TypeParameterList() == nil && fun.Type().IsNil() && noTypedParams && !tag.TypeExpression().IsNil() {
				fun.FunctionLikeData().SetFullSignature(p.addDeepCloneReparse(tag.TypeExpression().Type()))
				p.finishMutatedNode(fun)
			}
		}
	case ast.KindJSDocSatisfiesTag:
		switch parent.Kind() {
		case ast.KindVariableStatement:
			if !parent.AsVariableStatement().DeclarationList().IsNil() {
				for _, declaration := range parent.AsVariableStatement().DeclarationList().AsVariableDeclarationList().Declarations().Nodes {
					if !declaration.Initializer().IsNil() && !tag.TypeExpression().IsNil() {
						declaration.AsMutable().SetInitializer(p.makeNewCast(
							p.addDeepCloneReparse(tag.TypeExpression().Type()),
							declaration.Initializer(),
							false, /*isAssertion*/
						))
						p.finishMutatedNode(declaration)
						break
					}
				}
			}
		case ast.KindVariableDeclaration, ast.KindPropertyDeclaration, ast.KindPropertyAssignment:
			if !parent.Initializer().IsNil() && !tag.TypeExpression().IsNil() {
				parent.AsMutable().SetInitializer(p.makeNewCast(
					p.addDeepCloneReparse(tag.TypeExpression().Type()),
					parent.Initializer(),
					false, /*isAssertion*/
				))
				p.finishMutatedNode(parent)
			}
		case ast.KindShorthandPropertyAssignment:
			shorthand := parent.AsShorthandPropertyAssignment()
			if !shorthand.ObjectAssignmentInitializer().IsNil() && !tag.AsJSDocSatisfiesTag().TypeExpression().IsNil() {
				shorthand.SetObjectAssignmentInitializer(p.makeNewCast(
					p.addDeepCloneReparse(tag.AsJSDocSatisfiesTag().TypeExpression().Type()),
					shorthand.ObjectAssignmentInitializer(),
					false, /*isAssertion*/
				))
				p.finishMutatedNode(parent)
			}
		case ast.KindReturnStatement, ast.KindParenthesizedExpression, ast.KindExportAssignment:
			if !parent.Expression().IsNil() && !tag.TypeExpression().IsNil() {
				parent.AsMutable().SetExpression(p.makeNewCast(
					p.addDeepCloneReparse(tag.TypeExpression().Type()),
					parent.Expression(),
					false, /*isAssertion*/
				))
				p.finishMutatedNode(parent)
			}
		case ast.KindExpressionStatement:
			if parent.Expression().Kind() == ast.KindBinaryExpression {
				bin := parent.Expression().AsBinaryExpression()
				if kind := ast.GetAssignmentDeclarationKind(bin.AsNode()); kind != ast.JSDeclarationKindNone && !tag.TypeExpression().IsNil() {
					bin.SetRight(p.makeNewCast(
						p.addDeepCloneReparse(tag.TypeExpression().Type()),
						bin.Right(),
						false, /*isAssertion*/
					))
					p.finishMutatedNode(bin.AsNode())
				}
			}
		}
	case ast.KindJSDocTemplateTag:
		if fun := getFunctionLikeHost(parent); !fun.IsNil() {
			if fun.TypeParameters() == nil && fun.FunctionLikeData().FullSignature().IsNil() {
				fun.FunctionLikeData().SetTypeParameters(p.gatherTypeParameters(jsDoc, false /*typedefOrCallback*/))
				p.finishMutatedNode(fun)
			}
		} else if parent.Kind() == ast.KindClassDeclaration {
			class := parent.AsClassDeclaration()
			if class.TypeParameters() == nil {
				class.SetTypeParameters(p.gatherTypeParameters(jsDoc, false /*typedefOrCallback*/))
				p.finishMutatedNode(parent)
			}
		} else if parent.Kind() == ast.KindClassExpression {
			class := parent.AsClassExpression()
			if class.TypeParameters() == nil {
				class.SetTypeParameters(p.gatherTypeParameters(jsDoc, false /*typedefOrCallback*/))
				p.finishMutatedNode(parent)
			}
		}
	case ast.KindJSDocParameterTag:
		if fun := getFunctionLikeHost(parent); !fun.IsNil() && fun.FunctionLikeData().FullSignature().IsNil() {
			parameterTag := tag.AsJSDocParameterOrPropertyTag()
			if param, ok := findMatchingParameter(fun, parameterTag, jsDoc); ok {
				if param.Type().IsNil() && !parameterTag.TypeExpression().IsNil() {
					param.AsParameterDeclaration().SetType(p.reparseJSDocTypeLiteral(parameterTag.TypeExpression().Type()))
				}
				if param.QuestionToken().IsNil() {
					if question := p.makeQuestionIfOptional(parameterTag); !question.IsNil() {
						param.SetQuestionToken(question)
					}
				}
				p.finishMutatedNode(param.AsNode())
			}
		}
	case ast.KindJSDocThisTag:
		if fun := getFunctionLikeHost(parent); !fun.IsNil() {
			params := fun.Parameters()
			if len(params) == 0 || (params[0].Name().Kind() != ast.KindThisKeyword && !ast.IsThisIdentifier(params[0].Name())) {
				thisParam := p.factory.NewParameterDeclaration(
					nil,        /* decorators */
					ast.Node{}, /* modifiers */
					p.factory.NewIdentifier("this"),
					ast.Node{}, /* questionToken */
					ast.Node{}, /* type */
					ast.Node{}, /* initializer */
				)
				if !tag.AsJSDocThisTag().TypeExpression().IsNil() {
					thisParam.AsParameterDeclaration().SetType(p.addDeepCloneReparse(tag.AsJSDocThisTag().TypeExpression().Type()))
				}
				p.finishReparsedNode(thisParam, tag.TagName())

				newParams := p.nodeSliceArena.NewSlice(len(params) + 1)
				newParams[0] = thisParam
				for i, param := range params {
					newParams[i+1] = param
				}

				fun.FunctionLikeData().SetParameters(p.newNodeList(fun.ParameterList().Loc, newParams))
				p.finishMutatedNode(fun)
			}
		}
	case ast.KindJSDocReturnTag:
		if fun := getFunctionLikeHost(parent); !fun.IsNil() && fun.FunctionLikeData().FullSignature().IsNil() {
			if fun.Type().IsNil() && !tag.TypeExpression().IsNil() {
				fun.FunctionLikeData().SetType(p.addDeepCloneReparse(tag.TypeExpression().Type()))
				p.finishMutatedNode(fun)
			}
		}
	case ast.KindJSDocReadonlyTag, ast.KindJSDocPrivateTag, ast.KindJSDocPublicTag, ast.KindJSDocProtectedTag, ast.KindJSDocOverrideTag:
		if parent.Kind() == ast.KindExpressionStatement {
			parent = parent.Expression()
		}
		switch parent.Kind() {
		case ast.KindMethodDeclaration, ast.KindGetAccessor, ast.KindSetAccessor:
			// In object literals these aren't class-like members, so JSDoc modifiers like @override
			// or @readonly aren't real modifiers there; reparsing them produces spurious grammar errors (#4437).
			if p.parsingContexts&(1<<PCObjectLiteralMembers) != 0 {
				return
			}
			fallthrough
		case ast.KindPropertyDeclaration, ast.KindConstructor, ast.KindBinaryExpression:
			var keyword ast.Kind
			switch tag.Kind() {
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
			modifier.SetLoc(tag.Loc())
			modifier.SetFlags(p.contextFlags | ast.NodeFlagsReparsed)
			var nodes []ast.Node
			var loc core.TextRange
			if parent.Modifiers() == nil {
				nodes = p.nodeSliceArena.NewSlice(1)
				nodes[0] = modifier
				loc = tag.Loc()
			} else {
				nodes = append(parent.ModifierNodes(), modifier)
				loc = parent.Modifiers().Loc
			}
			parent.AsMutable().SetModifiers(p.newModifierList(loc, nodes))
			p.finishMutatedNode(parent)
		}
	case ast.KindJSDocImplementsTag:
		if class := getClassLikeData(parent); !class.IsNil() {
			implementsTag := tag.AsJSDocImplementsTag()

			if class.HeritageClauses() != nil {
				if implementsClause := core.Find(class.HeritageClauses().Nodes, func(node ast.Node) bool {
					return node.AsHeritageClause().Token() == ast.KindImplementsKeyword
				}); !implementsClause.IsNil() {
					implementsClause.AsHeritageClause().Types().Nodes = append(implementsClause.AsHeritageClause().Types().Nodes, p.addDeepCloneReparse(implementsTag.ClassName()))
					p.finishMutatedNode(implementsClause)
					return
				}
			}
			typesList := p.newNodeList(implementsTag.ClassName().Loc(), p.nodeSliceArena.NewSlice1(p.addDeepCloneReparse(implementsTag.ClassName())))

			heritageClause := p.factory.NewHeritageClause(ast.KindImplementsKeyword, typesList)
			p.finishReparsedNode(heritageClause, implementsTag.ClassName())

			if class.HeritageClauses() == nil {
				heritageClauses := p.newNodeList(implementsTag.ClassName().Loc(), p.nodeSliceArena.NewSlice1(heritageClause))
				class.SetHeritageClauses(heritageClauses)
			} else {
				class.HeritageClauses().Nodes = append(class.HeritageClauses().Nodes, heritageClause)
			}
			p.finishMutatedNode(parent)
		}
	case ast.KindJSDocAugmentsTag:
		if class := getClassLikeData(parent); !class.IsNil() && class.HeritageClauses() != nil {
			if extendsClause := core.Find(class.HeritageClauses().Nodes, func(node ast.Node) bool {
				return node.AsHeritageClause().Token() == ast.KindExtendsKeyword
			}); !extendsClause.IsNil() && len(extendsClause.AsHeritageClause().Types().Nodes) == 1 {
				target := extendsClause.AsHeritageClause().Types().Nodes[0].AsExpressionWithTypeArguments()
				source := tag.ClassName().AsExpressionWithTypeArguments()
				if ast.HasSamePropertyAccessName(target.Expression(), source.Expression()) {
					if target.TypeArguments() == nil && source.TypeArguments() != nil {
						newArguments := p.nodeSliceArena.NewSlice(len(source.TypeArguments().Nodes))
						for i, arg := range source.TypeArguments().Nodes {
							newArguments[i] = p.addDeepCloneReparse(arg)
						}
						target.SetTypeArguments(p.newNodeList(source.TypeArguments().Loc, newArguments))
						p.finishMutatedNode(target.AsNode())
					}
				}
			}
		}
	}
}

func (p *Parser) makeQuestionIfOptional(parameter ast.JSDocParameterOrPropertyTag) ast.Node {
	var questionToken ast.Node
	if parameter.IsBracketed() || !parameter.TypeExpression().IsNil() && parameter.TypeExpression().Type().Kind() == ast.KindJSDocOptionalType {
		questionToken = p.factory.NewToken(ast.KindQuestionToken)
		questionToken.SetLoc(parameter.Loc())
		questionToken.SetFlags(p.contextFlags | ast.NodeFlagsReparsed)
	}
	return questionToken
}

func findMatchingParameter(fun ast.Node, parameterTag ast.JSDocParameterOrPropertyTag, jsDoc ast.Node) (ast.ParameterDeclaration, bool) {
	tagIndex := -1
	paramCount := -1
	for _, tag := range jsDoc.AsJSDoc().Tags().Nodes {
		if tag.Kind() == ast.KindJSDocParameterTag {
			paramCount++
			if tag.AsJSDocParameterOrPropertyTag() == parameterTag {
				tagIndex = paramCount
				break
			}
		}
	}
	for parameterIndex, parameter := range fun.Parameters() {
		if parameter.Name().Kind() == ast.KindIdentifier {
			if parameterTag.Name().Kind() == ast.KindIdentifier &&
				((parameter.Name().Text() == parameterTag.Name().Text()) || (parameterIndex == tagIndex && len(parameterTag.Name().Text()) == 0)) {
				return parameter.AsParameterDeclaration(), true
			}
		} else if parameterIndex == tagIndex {
			return parameter.AsParameterDeclaration(), true
		}
	}
	return ast.ParameterDeclaration{}, false
}

func skipSatisfiesExpressions(node ast.Node) ast.Node {
	for !node.IsNil() && node.Kind() == ast.KindSatisfiesExpression {
		node = node.Expression()
	}
	return node
}

func getFunctionLikeHost(host ast.Node) ast.Node {
	fun := host
	switch host.Kind() {
	case ast.KindVariableStatement:
		if nodes := host.AsVariableStatement().DeclarationList().AsVariableDeclarationList().Declarations().Nodes; len(nodes) != 0 {
			fun = nodes[0].Initializer()
		}
	case ast.KindPropertyAssignment, ast.KindPropertyDeclaration:
		fun = host.Initializer()
	case ast.KindExportAssignment, ast.KindReturnStatement:
		fun = host.Expression()
	case ast.KindExpressionStatement:
		fun = ast.GetRightMostAssignedExpression(host.Expression())
	}
	fun = skipSatisfiesExpressions(fun)
	if ast.IsFunctionLike(fun) {
		return fun
	}
	return ast.Node{}
}

func (p *Parser) makeNewCast(t ast.TypeNode, e ast.Node, isAssertion bool) ast.Node {
	var assert ast.Node
	if isAssertion {
		assert = p.factory.NewAsExpression(e, t)
	} else {
		assert = p.factory.NewSatisfiesExpression(e, t)
	}
	p.finishNodeWithEnd(assert, e.Pos(), e.End())
	return assert
}

func getClassLikeData(parent ast.Node) ast.ClassLikeBase {
	var class ast.ClassLikeBase
	switch parent.Kind() {
	case ast.KindClassDeclaration:
		class = parent.AsClassDeclaration().ClassLikeData()
	case ast.KindClassExpression:
		class = parent.AsClassExpression().ClassLikeData()
	}
	return class
}

func (p *Parser) createExportModifier(locationNode ast.Node) *ast.ModifierList {
	exportModifier := p.factory.NewModifier(ast.KindExportKeyword)
	exportModifier.SetLoc(locationNode.Loc())
	exportModifier.SetFlags(p.contextFlags | ast.NodeFlagsReparsed)
	nodes := p.nodeSliceArena.NewSlice1(exportModifier)
	return p.newModifierList(locationNode.Loc(), nodes)
}

// getInnermostNameOfJSDocNamespace returns the innermost identifier from a
// JSDoc namespace chain (ModuleDeclaration). For a simple identifier, it returns
// the identifier itself. For "A.B.C", it returns the identifier "C".
func (p *Parser) getInnermostNameOfJSDocNamespace(fullName ast.Node) ast.Node {
	if fullName.IsNil() {
		return ast.Node{}
	}
	for fullName.Kind() == ast.KindModuleDeclaration {
		body := fullName.AsModuleDeclaration().Body()
		if body.IsNil() {
			return fullName.Name()
		}
		fullName = body
	}
	return fullName
}

// wrapInJSDocNamespace wraps a statement (typically a type alias) in namespace
// declarations corresponding to a JSDoc dotted name. For example, given name
// "A.B.C" and a type alias for C, this produces:
//
//	namespace A { namespace B { type C = ... } }
//
// If the name is a simple identifier (not a ModuleDeclaration), it returns the
// statement as-is.
func (p *Parser) wrapInJSDocNamespace(fullName ast.Node, statement ast.Node, nested bool) ast.Node {
	if fullName.IsNil() || !ast.IsModuleDeclaration(fullName) {
		return statement
	}
	// Recursively wrap from outermost to innermost. Inner namespaces always get an export modifier
	// so members are accessible via dotted access from outside. The outermost namespace is treated as
	// exported only in module files via IsImplicitlyExportedJSDocDeclaration (in the binder), so it
	// does not get an explicit export modifier here.
	wrapped := p.wrapInJSDocNamespace(fullName.Body(), statement, true /*nested*/)
	block := p.factory.NewModuleBlock(p.newNodeList(fullName.Loc(), p.nodeSliceArena.NewSlice1(wrapped)))
	p.finishReparsedNode(block, fullName)
	var modifiers *ast.ModifierList
	if nested {
		modifiers = p.createExportModifier(fullName)
	}
	result := p.factory.NewModuleDeclaration(modifiers, ast.KindNamespaceKeyword, p.addDeepCloneReparse(fullName.Name()), ast.Node{}, block)
	p.finishReparsedNode(result, fullName)
	p.reparsedClones = append(p.reparsedClones, result)
	return result
}
