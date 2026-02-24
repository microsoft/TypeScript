package ls

import (
	"context"
	"slices"
	"strings"
	"unicode"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/evaluator"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/nodebuilder"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

func (l *LanguageService) ProvideInlayHint(
	ctx context.Context,
	params *lsproto.InlayHintParams,
) (lsproto.InlayHintResponse, error) {
	userPreferences := l.UserPreferences()
	inlayHintPreferences := &userPreferences.InlayHints
	if !isAnyInlayHintEnabled(inlayHintPreferences) {
		return lsproto.InlayHintsOrNull{InlayHints: nil}, nil
	}

	program, file := l.getProgramAndFile(params.TextDocument.Uri)
	quotePreference := lsutil.GetQuotePreference(file, userPreferences)

	checker, done := program.GetTypeCheckerForFile(ctx, file)
	defer done()
	inlayHintState := &inlayHintState{
		ctx:             ctx,
		span:            l.converters.FromLSPRange(file, params.Range),
		preferences:     inlayHintPreferences,
		quotePreference: quotePreference,
		file:            file,
		checker:         checker,
		converters:      l.converters,
	}
	inlayHintState.visit(file.AsNode())
	return lsproto.InlayHintsOrNull{InlayHints: &inlayHintState.result}, nil
}

type inlayHintState struct {
	ctx             context.Context
	span            core.TextRange
	preferences     *lsutil.InlayHintsPreferences
	quotePreference lsutil.QuotePreference
	file            *ast.SourceFile
	checker         *checker.Checker
	converters      *lsconv.Converters
	result          []*lsproto.InlayHint
}

func (s *inlayHintState) visit(node *ast.Node) bool {
	if node == nil || node.End()-node.Pos() == 0 || node.Flags&ast.NodeFlagsReparsed != 0 {
		return false
	}

	switch node.Kind {
	case ast.KindModuleDeclaration, ast.KindClassDeclaration, ast.KindInterfaceDeclaration,
		ast.KindFunctionDeclaration, ast.KindClassExpression, ast.KindFunctionExpression,
		ast.KindMethodDeclaration, ast.KindArrowFunction:
		if s.ctx.Err() != nil {
			return true
		}
	}

	if !s.span.Intersects(node.Loc) {
		return false
	}

	if ast.IsTypeNode(node) && !ast.IsExpressionWithTypeArguments(node) {
		return false
	}

	if s.preferences.IncludeInlayVariableTypeHints && ast.IsVariableDeclaration(node) {
		s.visitVariableLikeDeclaration(node)
	} else if s.preferences.IncludeInlayPropertyDeclarationTypeHints && ast.IsPropertyDeclaration(node) {
		s.visitVariableLikeDeclaration(node)
	} else if s.preferences.IncludeInlayEnumMemberValueHints && ast.IsEnumMember(node) {
		s.visitEnumMember(node)
	} else if shouldShowParameterNameHints(s.preferences) && (ast.IsCallExpression(node) || ast.IsNewExpression(node)) {
		s.visitCallOrNewExpression(node)
	} else {
		if s.preferences.IncludeInlayFunctionParameterTypeHints &&
			ast.IsFunctionLikeDeclaration(node) &&
			ast.HasContextSensitiveParameters(node) {
			s.visitFunctionLikeForParameterType(node)
		}
		if s.preferences.IncludeInlayFunctionLikeReturnTypeHints &&
			isSignatureSupportingReturnAnnotation(node) {
			s.visitFunctionDeclarationLikeForReturnType(node)
		}
	}
	return node.ForEachChild(s.visit)
}

// FunctionDeclaration | MethodDeclaration | GetAccessorDeclaration | FunctionExpression | ArrowFunction
func (s *inlayHintState) visitFunctionDeclarationLikeForReturnType(decl *ast.FunctionLikeDeclaration) {
	if ast.IsArrowFunction(decl) {
		if astnav.FindChildOfKind(decl, ast.KindOpenParenToken, s.file) == nil {
			return
		}
	}

	typeAnnotation := decl.Type()
	if typeAnnotation != nil || decl.Body() == nil {
		return
	}

	signature := s.checker.GetSignatureFromDeclaration(decl)
	if signature == nil {
		return
	}

	typePredicate := s.checker.GetTypePredicateOfSignature(signature)

	if typePredicate != nil && typePredicate.Type() != nil {
		hintParts := s.typePredicateToInlayHintParts(typePredicate)
		s.addTypeHints(hintParts, s.getTypeAnnotationPosition(decl))
		return
	}

	returnType := s.checker.GetReturnTypeOfSignature(signature)
	if isModuleReferenceType(returnType) {
		return
	}

	hintParts := s.typeToInlayHintParts(returnType)
	s.addTypeHints(hintParts, s.getTypeAnnotationPosition(decl))
}

func (s *inlayHintState) visitCallOrNewExpression(expr *ast.CallOrNewExpression) {
	args := expr.Arguments()
	if len(args) == 0 {
		return
	}

	signature := s.checker.GetResolvedSignature(expr)
	if signature == nil {
		return
	}

	signatureParamPos := 0
	for _, originalArg := range args {
		arg := ast.SkipParentheses(originalArg)
		if shouldShowLiteralParameterNameHintsOnly(s.preferences) && !isHintableLiteral(arg) {
			signatureParamPos++
			continue
		}

		spreadArgs := 0
		if ast.IsSpreadElement(arg) {
			spreadType := s.checker.GetTypeAtLocation(arg.Expression())
			if spreadType.IsTupleType() {
				elementFlags := spreadType.Target().AsTupleType().ElementFlags()
				fixedLength := spreadType.Target().AsTupleType().FixedLength()
				if fixedLength == 0 {
					continue
				}
				firstOptionalIndex := slices.IndexFunc(elementFlags, func(f checker.ElementFlags) bool {
					return f&checker.ElementFlagsRequired == 0
				})
				requiredArgs := core.IfElse(firstOptionalIndex < 0, fixedLength, firstOptionalIndex)
				if requiredArgs > 0 {
					spreadArgs = requiredArgs
				}
			}
		}

		identifierInfo := s.getParameterIdentifierInfoAtPosition(signature, signatureParamPos)
		signatureParamPos = signatureParamPos + core.IfElse(spreadArgs > 0, spreadArgs, 1)
		if identifierInfo == nil {
			return
		}

		parameter := identifierInfo.parameter
		parameterName := identifierInfo.name
		isFirstVariadicArgument := identifierInfo.isRestParameter
		parameterNameNotSameAsArgument := s.preferences.IncludeInlayParameterNameHintsWhenArgumentMatchesName ||
			!identifierOrAccessExpressionPostfixMatchesParameterName(arg, parameterName)
		if !parameterNameNotSameAsArgument && !isFirstVariadicArgument {
			continue
		}

		if s.leadingCommentsContainsParameterName(arg, parameterName) {
			continue
		}

		s.addParameterHints(
			parameterName,
			parameter,
			astnav.GetStartOfNode(originalArg, s.file, false /*includeJSDoc*/),
			isFirstVariadicArgument,
		)
	}
}

func (s *inlayHintState) visitEnumMember(member *ast.EnumMemberNode) {
	if member.Initializer() != nil {
		return
	}

	enumValue := s.checker.GetConstantValue(member)
	if enumValue != nil {
		s.addEnumMemberValueHints(evaluator.AnyToString(enumValue), member.End())
	}
}

func (s *inlayHintState) visitVariableLikeDeclaration(decl *ast.VariableOrPropertyDeclaration) {
	if decl.Initializer() == nil &&
		!(ast.IsPropertyDeclaration(decl) && s.checker.GetTypeAtLocation(decl).Flags()&checker.TypeFlagsAny == 0) ||
		ast.IsBindingPattern(decl.Name()) || (ast.IsVariableDeclaration(decl) && !isHintableDeclaration(decl)) {
		return
	}

	typeAnnotation := decl.Type()
	if typeAnnotation != nil {
		return
	}

	declarationType := s.checker.GetTypeAtLocation(decl)
	if isModuleReferenceType(declarationType) {
		return
	}

	hintParts := s.typeToInlayHintParts(declarationType)
	var hintText string
	if hintParts.String != nil {
		hintText = *hintParts.String
	} else if hintParts.InlayHintLabelParts != nil {
		var b strings.Builder
		for _, part := range *hintParts.InlayHintLabelParts {
			b.WriteString(part.Value)
		}
		hintText = b.String()
	}
	if !s.preferences.IncludeInlayVariableTypeHintsWhenTypeMatchesName &&
		!ast.IsComputedPropertyName(decl.Name()) &&
		stringutil.EquateStringCaseInsensitive(decl.Name().Text(), hintText) {
		return
	}
	s.addTypeHints(hintParts, decl.Name().End())
}

func (s *inlayHintState) visitFunctionLikeForParameterType(node *ast.FunctionLikeDeclaration) {
	signature := s.checker.GetSignatureFromDeclaration(node)
	if signature == nil {
		return
	}

	pos := 0
	for _, param := range node.Parameters() {
		if isHintableDeclaration(param) {
			var symbol *ast.Symbol
			if ast.IsThisParameter(param) {
				symbol = signature.ThisParameter()
			} else {
				symbol = signature.Parameters()[pos]
			}
			s.addParameterTypeHint(param, symbol)
		}
		if ast.IsThisParameter(param) {
			continue
		}
		pos++
	}
}

func (s *inlayHintState) addParameterTypeHint(node *ast.ParameterDeclarationNode, symbol *ast.Symbol) {
	typeAnnotation := node.Type()
	if typeAnnotation != nil || symbol == nil {
		return
	}
	typeHints := s.getParameterDeclarationTypeHints(symbol)
	if typeHints == nil {
		return
	}
	var pos int
	if node.QuestionToken() != nil {
		pos = node.QuestionToken().End()
	} else {
		pos = node.Name().End()
	}
	s.addTypeHints(*typeHints, pos)
}

func (s *inlayHintState) getParameterDeclarationTypeHints(symbol *ast.Symbol) *lsproto.StringOrInlayHintLabelParts {
	valueDeclaration := symbol.ValueDeclaration
	if valueDeclaration == nil || !ast.IsParameter(valueDeclaration) {
		return nil
	}

	signatureParamType := s.checker.GetTypeOfSymbolAtLocation(symbol, valueDeclaration)
	if isModuleReferenceType(signatureParamType) {
		return nil
	}

	return new(s.typeToInlayHintParts(signatureParamType))
}

func (s *inlayHintState) typeToInlayHintParts(t *checker.Type) lsproto.StringOrInlayHintLabelParts {
	flags := nodebuilder.FlagsIgnoreErrors | nodebuilder.FlagsAllowUniqueESSymbolType |
		nodebuilder.FlagsUseAliasDefinedOutsideCurrentScope
	idToSymbol := make(map[*ast.IdentifierNode]*ast.Symbol)
	// !!! Avoid type node reuse so we collect identifier symbols.
	typeNode := s.checker.TypeToTypeNode(t, nil /*enclosingDeclaration*/, flags, idToSymbol)
	debug.AssertIsDefined(typeNode, "should always get typenode")
	return lsproto.StringOrInlayHintLabelParts{
		InlayHintLabelParts: new(s.getInlayHintLabelParts(typeNode, idToSymbol)),
	}
}

func (s *inlayHintState) typePredicateToInlayHintParts(typePredicate *checker.TypePredicate) lsproto.StringOrInlayHintLabelParts {
	flags := nodebuilder.FlagsIgnoreErrors | nodebuilder.FlagsAllowUniqueESSymbolType |
		nodebuilder.FlagsUseAliasDefinedOutsideCurrentScope
	idToSymbol := make(map[*ast.IdentifierNode]*ast.Symbol)
	// !!! Avoid type node reuse so we collect identifier symbols.
	typeNode := s.checker.TypePredicateToTypePredicateNode(typePredicate, nil /*enclosingDeclaration*/, flags, idToSymbol)
	debug.AssertIsDefined(typeNode, "should always get typePredicateNode")
	return lsproto.StringOrInlayHintLabelParts{
		InlayHintLabelParts: new(s.getInlayHintLabelParts(typeNode, idToSymbol)),
	}
}

func (s *inlayHintState) addTypeHints(hint lsproto.StringOrInlayHintLabelParts, position int) {
	if hint.String != nil {
		hint.String = new(": " + *hint.String)
	} else {
		hint.InlayHintLabelParts = new(append([]*lsproto.InlayHintLabelPart{{Value: ": "}}, *hint.InlayHintLabelParts...))
	}
	s.result = append(s.result, &lsproto.InlayHint{
		Label:       hint,
		Position:    s.converters.PositionToLineAndCharacter(s.file, core.TextPos(position)),
		Kind:        new(lsproto.InlayHintKindType),
		PaddingLeft: new(true),
	})
}

func (s *inlayHintState) addEnumMemberValueHints(text string, position int) {
	s.result = append(s.result, &lsproto.InlayHint{
		Label: lsproto.StringOrInlayHintLabelParts{
			String: new("= " + text),
		},
		Position:    s.converters.PositionToLineAndCharacter(s.file, core.TextPos(position)),
		PaddingLeft: new(true),
	})
}

func (s *inlayHintState) addParameterHints(text string, parameter *ast.IdentifierNode, position int, isFirstVariadicArgument bool) {
	hintText := core.IfElse(isFirstVariadicArgument, "...", "") + text
	displayParts := []*lsproto.InlayHintLabelPart{
		s.getNodeDisplayPart(hintText, parameter),
		{
			Value: ":",
		},
	}
	labelParts := lsproto.StringOrInlayHintLabelParts{InlayHintLabelParts: &displayParts}

	s.result = append(s.result, &lsproto.InlayHint{
		Label:        labelParts,
		Position:     s.converters.PositionToLineAndCharacter(s.file, core.TextPos(position)),
		Kind:         new(lsproto.InlayHintKindParameter),
		PaddingRight: new(true),
	})
}

func shouldShowParameterNameHints(preferences *lsutil.InlayHintsPreferences) bool {
	return (preferences.IncludeInlayParameterNameHints == lsutil.IncludeInlayParameterNameHintsLiterals ||
		preferences.IncludeInlayParameterNameHints == lsutil.IncludeInlayParameterNameHintsAll)
}

func shouldShowLiteralParameterNameHintsOnly(preferences *lsutil.InlayHintsPreferences) bool {
	return preferences.IncludeInlayParameterNameHints == lsutil.IncludeInlayParameterNameHintsLiterals
}

// node is FunctionDeclaration | ArrowFunction | FunctionExpression | MethodDeclaration | GetAccessorDeclaration
func isSignatureSupportingReturnAnnotation(node *ast.Node) bool {
	return ast.IsArrowFunction(node) || ast.IsFunctionExpression(node) || ast.IsFunctionDeclaration(node) ||
		ast.IsMethodDeclaration(node) || ast.IsGetAccessorDeclaration(node)
}

func isHintableDeclaration(node *ast.VariableOrParameterDeclaration) bool {
	if (ast.IsPartOfParameterDeclaration(node) || ast.IsVariableDeclaration(node) && ast.IsVarConst(node)) &&
		node.Initializer() != nil {
		initializer := ast.SkipParentheses(node.Initializer())
		return !(isHintableLiteral(initializer) || ast.IsNewExpression(initializer) ||
			ast.IsObjectLiteralExpression(initializer) || ast.IsAssertionExpression(initializer))
	}
	return true
}

func isHintableLiteral(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindPrefixUnaryExpression:
		operand := node.AsPrefixUnaryExpression().Operand
		return ast.IsLiteralExpression(operand) || ast.IsIdentifier(operand) && ast.IsInfinityOrNaNString(operand.Text())
	case ast.KindTrueKeyword, ast.KindFalseKeyword, ast.KindNullKeyword,
		ast.KindNoSubstitutionTemplateLiteral, ast.KindTemplateExpression:
		return true
	case ast.KindIdentifier:
		name := node.Text()
		return name == "undefined" || ast.IsInfinityOrNaNString(name)
	}
	return ast.IsLiteralExpression(node)
}

func isModuleReferenceType(t *checker.Type) bool {
	symbol := t.Symbol()
	return symbol != nil && symbol.Flags&ast.SymbolFlagsModule != 0
}

func (s *inlayHintState) getInlayHintLabelParts(node *ast.Node, idToSymbol map[*ast.IdentifierNode]*ast.Symbol) []*lsproto.InlayHintLabelPart {
	var parts []*lsproto.InlayHintLabelPart

	var visitForDisplayParts func(node *ast.Node)
	var visitDisplayPartList func(nodes []*ast.Node, separator string)
	var visitParametersAndTypeParameters func(node *ast.SignatureDeclaration)

	visitForDisplayParts = func(node *ast.Node) {
		if node == nil {
			return
		}

		tokenString := scanner.TokenToString(node.Kind)
		if tokenString != "" {
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: tokenString})
			return
		}

		if ast.IsLiteralExpression(node) {
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: s.getLiteralText(node)})
			return
		}

		switch node.Kind {
		case ast.KindIdentifier:
			identifierText := node.Text()
			var name *ast.Node
			if symbol := idToSymbol[node]; symbol != nil && len(symbol.Declarations) != 0 {
				name = ast.GetNameOfDeclaration(symbol.Declarations[0])
			}
			if name != nil {
				parts = append(parts, s.getNodeDisplayPart(identifierText, name))
			} else {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: identifierText})
			}
		case ast.KindQualifiedName:
			visitForDisplayParts(node.AsQualifiedName().Left)
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "."})
			visitForDisplayParts(node.AsQualifiedName().Right)
		case ast.KindTypePredicate:
			if node.AsTypePredicateNode().AssertsModifier != nil {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: "asserts "})
			}
			visitForDisplayParts(node.AsTypePredicateNode().ParameterName)
			if node.Type() != nil {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: " is "})
				visitForDisplayParts(node.Type())
			}
		case ast.KindTypeReference:
			visitForDisplayParts(node.AsTypeReferenceNode().TypeName)
			if len(node.TypeArguments()) > 0 {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: "<"})
				visitDisplayPartList(node.TypeArguments(), ",")
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: ">"})
			}
		case ast.KindTypeParameter:
			if len(node.ModifierNodes()) > 0 {
				visitDisplayPartList(node.ModifierNodes(), "")
			}
			visitForDisplayParts(node.Name())
			if node.AsTypeParameter().Constraint != nil {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: " extends "})
				visitForDisplayParts(node.AsTypeParameter().Constraint)
			}
			if node.AsTypeParameter().DefaultType != nil {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: " = "})
				visitForDisplayParts(node.AsTypeParameter().DefaultType)
			}
		case ast.KindParameter:
			if len(node.ModifierNodes()) > 0 {
				visitDisplayPartList(node.ModifierNodes(), " ")
			}
			if node.AsParameterDeclaration().DotDotDotToken != nil {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: "..."})
			}
			visitForDisplayParts(node.Name())
			if node.QuestionToken() != nil {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: "?"})
			}
			if node.Type() != nil {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: ": "})
				visitForDisplayParts(node.Type())
			}
		case ast.KindConstructorType:
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "new "})
			visitParametersAndTypeParameters(node)
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: " => "})
			visitForDisplayParts(node.Type())
		case ast.KindTypeQuery:
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "typeof "})
			visitForDisplayParts(node.AsTypeQueryNode().ExprName)
			if len(node.TypeArguments()) > 0 {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: "<"})
				visitDisplayPartList(node.TypeArguments(), ", ")
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: ">"})
			}
		case ast.KindTypeLiteral:
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "{"})
			if len(node.Members()) > 0 {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: " "})
				visitDisplayPartList(node.Members(), "; ")
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: " "})
			}
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "}"})
		case ast.KindArrayType:
			visitForDisplayParts(node.AsArrayTypeNode().ElementType)
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "[]"})
		case ast.KindTupleType:
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "["})
			visitDisplayPartList(node.Elements(), ", ")
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "]"})
		case ast.KindNamedTupleMember:
			if node.AsNamedTupleMember().DotDotDotToken != nil {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: "..."})
			}
			visitForDisplayParts(node.Name())
			if node.QuestionToken() != nil {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: "?"})
			}
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: ": "})
			visitForDisplayParts(node.Type())
		case ast.KindOptionalType:
			visitForDisplayParts(node.Type())
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "?"})
		case ast.KindRestType:
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "..."})
			visitForDisplayParts(node.Type())
		case ast.KindUnionType:
			if node.AsUnionTypeNode().Types != nil {
				visitDisplayPartList(node.AsUnionTypeNode().Types.Nodes, " | ")
			}
		case ast.KindIntersectionType:
			if node.AsIntersectionTypeNode().Types != nil {
				visitDisplayPartList(node.AsIntersectionTypeNode().Types.Nodes, " & ")
			}
		case ast.KindConditionalType:
			visitForDisplayParts(node.AsConditionalTypeNode().CheckType)
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: " extends "})
			visitForDisplayParts(node.AsConditionalTypeNode().ExtendsType)
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: " ? "})
			visitForDisplayParts(node.AsConditionalTypeNode().TrueType)
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: " : "})
			visitForDisplayParts(node.AsConditionalTypeNode().FalseType)
		case ast.KindInferType:
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "infer "})
			visitForDisplayParts(node.AsInferTypeNode().TypeParameter)
		case ast.KindParenthesizedType:
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "("})
			visitForDisplayParts(node.Type())
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: ")"})
		case ast.KindTypeOperator:
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: scanner.TokenToString(node.AsTypeOperatorNode().Operator)})
			visitForDisplayParts(node.Type())
		case ast.KindIndexedAccessType:
			visitForDisplayParts(node.AsIndexedAccessTypeNode().ObjectType)
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "["})
			visitForDisplayParts(node.AsIndexedAccessTypeNode().IndexType)
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "]"})
		case ast.KindMappedType:
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "{ "})
			if node.AsMappedTypeNode().ReadonlyToken != nil {
				if node.AsMappedTypeNode().ReadonlyToken.Kind == ast.KindPlusToken {
					parts = append(parts, &lsproto.InlayHintLabelPart{Value: "+"})
				} else if node.AsMappedTypeNode().ReadonlyToken.Kind == ast.KindMinusToken {
					parts = append(parts, &lsproto.InlayHintLabelPart{Value: "-"})
				}
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: "readonly "})
			}
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "["})
			visitForDisplayParts(node.AsMappedTypeNode().TypeParameter)
			if node.AsMappedTypeNode().NameType != nil {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: " as "})
				visitForDisplayParts(node.AsMappedTypeNode().NameType)
			}
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "]"})
			if node.QuestionToken() != nil {
				if node.QuestionToken().Kind == ast.KindPlusToken {
					parts = append(parts, &lsproto.InlayHintLabelPart{Value: "+"})
				} else if node.QuestionToken().Kind == ast.KindMinusToken {
					parts = append(parts, &lsproto.InlayHintLabelPart{Value: "-"})
				}
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: "?"})
			}
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: ": "})
			if node.Type() != nil {
				visitForDisplayParts(node.Type())
			}
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "; }"})
		case ast.KindLiteralType:
			visitForDisplayParts(node.AsLiteralTypeNode().Literal)
		case ast.KindFunctionType:
			visitParametersAndTypeParameters(node)
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: " => "})
			visitForDisplayParts(node.Type())
		case ast.KindImportType:
			if node.AsImportTypeNode().IsTypeOf {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: "typeof "})
			}
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "import("})
			visitForDisplayParts(node.AsImportTypeNode().Argument)
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: ")"})
			if node.AsImportTypeNode().Qualifier != nil {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: "."})
				visitForDisplayParts(node.AsImportTypeNode().Qualifier)
			}
			if len(node.TypeArguments()) > 0 {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: "<"})
				visitDisplayPartList(node.TypeArguments(), ", ")
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: ">"})
			}
		case ast.KindPropertySignature:
			if len(node.ModifierNodes()) > 0 {
				visitDisplayPartList(node.ModifierNodes(), " ")
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: " "})
			}
			visitForDisplayParts(node.Name())
			if node.PostfixToken() != nil {
				parts = append(
					parts,
					&lsproto.InlayHintLabelPart{
						Value: scanner.TokenToString(node.PostfixToken().Kind),
					})
			}
			if node.Type() != nil {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: ": "})
				visitForDisplayParts(node.Type())
			}
		case ast.KindIndexSignature:
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "["})
			visitDisplayPartList(node.Parameters(), ", ")
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "]"})
			if node.Type() != nil {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: ": "})
				visitForDisplayParts(node.Type())
			}
		case ast.KindMethodSignature:
			if len(node.ModifierNodes()) > 0 {
				visitDisplayPartList(node.ModifierNodes(), " ")
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: " "})
			}
			visitForDisplayParts(node.Name())
			if node.PostfixToken() != nil {
				parts = append(
					parts,
					&lsproto.InlayHintLabelPart{
						Value: scanner.TokenToString(node.PostfixToken().Kind),
					})
			}
			visitParametersAndTypeParameters(node)
			if node.Type() != nil {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: ": "})
				visitForDisplayParts(node.Type())
			}
		case ast.KindCallSignature:
			visitParametersAndTypeParameters(node)
			if node.Type() != nil {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: ": "})
				visitForDisplayParts(node.Type())
			}
		case ast.KindConstructSignature:
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "new "})
			visitParametersAndTypeParameters(node)
			if node.Type() != nil {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: ": "})
				visitForDisplayParts(node.Type())
			}
		case ast.KindArrayBindingPattern:
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "["})
			visitDisplayPartList(node.Elements(), ", ")
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "]"})
		case ast.KindObjectBindingPattern:
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "{"})
			if len(node.Elements()) > 0 {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: " "})
				visitDisplayPartList(node.Elements(), ", ")
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: " "})
			}
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "}"})
		case ast.KindBindingElement:
			visitForDisplayParts(node.Name())
		case ast.KindPrefixUnaryExpression:
			parts = append(
				parts,
				&lsproto.InlayHintLabelPart{
					Value: scanner.TokenToString(node.AsPrefixUnaryExpression().Operator),
				})
			visitForDisplayParts(node.AsPrefixUnaryExpression().Operand)
		case ast.KindTemplateLiteralType:
			visitForDisplayParts(node.AsTemplateLiteralTypeNode().Head)
			for _, span := range node.AsTemplateLiteralTypeNode().TemplateSpans.Nodes {
				visitForDisplayParts(span)
			}
		case ast.KindTemplateHead:
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: s.getLiteralText(node)})
		case ast.KindTemplateLiteralTypeSpan:
			visitForDisplayParts(node.Type())
			visitForDisplayParts(node.AsTemplateLiteralTypeSpan().Literal)
		case ast.KindTemplateMiddle, ast.KindTemplateTail:
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: s.getLiteralText(node)})
		case ast.KindThisType:
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "this"})
		case ast.KindComputedPropertyName:
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "["})
			visitForDisplayParts(node.Expression())
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "]"})
		case ast.KindPropertyAccessExpression:
			visitForDisplayParts(node.Expression())
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "."})
			visitForDisplayParts(node.Name())
		case ast.KindElementAccessExpression:
			visitForDisplayParts(node.Expression())
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "["})
			visitForDisplayParts(node.AsElementAccessExpression().ArgumentExpression)
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "]"})
		default:
			debug.FailBadSyntaxKind(node)
		}
	}

	visitDisplayPartList = func(nodes []*ast.Node, separator string) {
		for i, n := range nodes {
			if i > 0 {
				parts = append(parts, &lsproto.InlayHintLabelPart{Value: separator})
			}
			visitForDisplayParts(n)
		}
	}

	visitParametersAndTypeParameters = func(node *ast.SignatureDeclaration) {
		if len(node.TypeParameters()) > 0 {
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: "<"})
			visitDisplayPartList(node.TypeParameters(), ", ")
			parts = append(parts, &lsproto.InlayHintLabelPart{Value: ">"})
		}
		parts = append(parts, &lsproto.InlayHintLabelPart{Value: "("})
		visitDisplayPartList(node.Parameters(), ", ")
		parts = append(parts, &lsproto.InlayHintLabelPart{Value: ")"})
	}

	visitForDisplayParts(node)
	return parts
}

func (s *inlayHintState) getNodeDisplayPart(text string, node *ast.Node) *lsproto.InlayHintLabelPart {
	file := ast.GetSourceFileOfNode(node)
	pos := astnav.GetStartOfNode(node, file, false /*includeJSDoc*/)
	end := node.End()
	return &lsproto.InlayHintLabelPart{
		Value: text,
		Location: &lsproto.Location{
			Uri:   lsconv.FileNameToDocumentURI(file.FileName()),
			Range: s.converters.ToLSPRange(file, core.NewTextRange(pos, end)),
		},
	}
}

func (s *inlayHintState) getLiteralText(node *ast.LiteralLikeNode) string {
	switch node.Kind {
	case ast.KindStringLiteral:
		if s.quotePreference == lsutil.QuotePreferenceSingle {
			return `'` + printer.EscapeString(node.Text(), printer.QuoteCharSingleQuote) + `'`
		}
		return `"` + printer.EscapeString(node.Text(), printer.QuoteCharDoubleQuote) + `"`
	case ast.KindTemplateHead, ast.KindTemplateMiddle, ast.KindTemplateTail:
		rawText := node.RawText()
		if rawText == "" {
			rawText = printer.EscapeString(node.Text(), printer.QuoteCharBacktick)
		}
		switch node.Kind {
		case ast.KindTemplateHead:
			return "`" + rawText + "${"
		case ast.KindTemplateMiddle:
			return "}" + rawText + "${"
		case ast.KindTemplateTail:
			return "}" + rawText + "`"
		}
	}
	return node.Text()
}

type parameterInfo struct {
	parameter       *ast.IdentifierNode
	name            string
	isRestParameter bool
}

func (s *inlayHintState) getParameterIdentifierInfoAtPosition(signature *checker.Signature, pos int) *parameterInfo {
	parameters := signature.Parameters()
	paramCount := len(parameters) - core.IfElse(signature.HasRestParameter(), 1, 0)
	if pos < paramCount {
		param := parameters[pos]
		paramId := getParameterDeclarationIdentifier(param)
		if paramId == nil {
			return nil
		}
		return &parameterInfo{
			parameter:       paramId,
			name:            paramId.Text(),
			isRestParameter: false,
		}
	}

	var restParameter *ast.Symbol
	var restId *ast.IdentifierNode
	if paramCount < len(parameters) {
		restParameter = parameters[paramCount]
		restId = getParameterDeclarationIdentifier(restParameter)
	}
	if restId == nil {
		return nil
	}

	restType := s.checker.GetTypeOfSymbol(restParameter)
	if restType.IsTupleType() {
		associatedNames := make([]*ast.Node, 0, len(restType.Target().AsTupleType().ElementInfos()))
		for _, elementInfo := range restType.Target().AsTupleType().ElementInfos() {
			labeledElement := elementInfo.LabeledDeclaration()
			associatedNames = append(associatedNames, labeledElement)
		}
		index := pos - paramCount
		if index < len(associatedNames) {
			associatedName := associatedNames[index]
			if associatedName != nil {
				debug.Assert(ast.IsIdentifier(associatedName.Name()))
				var isRestTupleElement bool
				if ast.IsNamedTupleMember(associatedName) {
					isRestTupleElement = associatedName.AsNamedTupleMember().DotDotDotToken != nil
				} else {
					isRestTupleElement = associatedName.AsParameterDeclaration().DotDotDotToken != nil
				}
				return &parameterInfo{
					parameter:       associatedName.Name(),
					name:            associatedName.Name().Text(),
					isRestParameter: isRestTupleElement,
				}
			}
		}

		return nil
	}

	if pos == paramCount {
		return &parameterInfo{
			parameter:       restId,
			name:            restParameter.Name,
			isRestParameter: true,
		}
	}
	return nil
}

func getParameterDeclarationIdentifier(symbol *ast.Symbol) *ast.IdentifierNode {
	if symbol.ValueDeclaration != nil && ast.IsParameter(symbol.ValueDeclaration) && ast.IsIdentifier(symbol.ValueDeclaration.Name()) {
		return symbol.ValueDeclaration.Name()
	}
	return nil
}

func identifierOrAccessExpressionPostfixMatchesParameterName(expr *ast.Expression, parameterName string) bool {
	if ast.IsIdentifier(expr) {
		return expr.Text() == parameterName
	}
	if ast.IsPropertyAccessExpression(expr) {
		return expr.Name().Text() == parameterName
	}
	return false
}

func (s *inlayHintState) leadingCommentsContainsParameterName(node *ast.Node, name string) bool {
	if !scanner.IsIdentifierText(name, s.file.LanguageVariant) {
		return false
	}

	ranges := getLeadingCommentRangesOfNode(node, s.file)
	fileText := s.file.Text()
	for r := range ranges {
		commentText := strings.TrimFunc(fileText[r.Pos():r.End()], func(r rune) bool {
			return unicode.IsSpace(r) || r == '/' || r == '*'
		})
		if commentText == name {
			return true
		}
	}

	return false
}

func (s *inlayHintState) getTypeAnnotationPosition(decl *ast.FunctionLikeDeclaration) int {
	closeParenToken := astnav.FindChildOfKind(decl, ast.KindCloseParenToken, s.file)
	if closeParenToken != nil {
		return closeParenToken.End()
	}
	return decl.ParameterList().End()
}

func isAnyInlayHintEnabled(preferences *lsutil.InlayHintsPreferences) bool {
	return *preferences != lsutil.InlayHintsPreferences{}
}
