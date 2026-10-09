package ls

import (
	"slices"
	"strconv"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/jsnum"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/ls/autoimport"
	"github.com/microsoft/TypeScript/tsc/internal/ls/change"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/nodebuilder"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
)

type preserveOptionalFlags int

const (
	preserveOptionalFlagsMethod preserveOptionalFlags = 1 << iota
	preserveOptionalFlagsProperty
	preserveOptionalFlagsAll = preserveOptionalFlagsMethod | preserveOptionalFlagsProperty
)

type missingMemberFixer struct {
	changeTracker    *change.Tracker
	typeChecker      *checker.Checker
	program          *compiler.Program
	preferences      lsutil.UserPreferences
	importAdder      autoimport.ImportAdder
	locale           locale.Locale
	symbolsToImport  map[*ast.Symbol]bool
	importsToPromote collections.Set[*ast.Node]
}

func newMissingMemberFixer(changeTracker *change.Tracker, program *compiler.Program, typeChecker *checker.Checker, preferences lsutil.UserPreferences, importAdder autoimport.ImportAdder, locale locale.Locale) *missingMemberFixer {
	return &missingMemberFixer{
		changeTracker: changeTracker,
		typeChecker:   typeChecker,
		program:       program,
		preferences:   preferences,
		importAdder:   importAdder,
		locale:        locale,
	}
}

func (f *missingMemberFixer) createNodeBuilder() (*checker.NodeBuilder, map[*ast.IdentifierNode]*ast.Symbol) {
	idToSymbol := make(map[*ast.IdentifierNode]*ast.Symbol)
	nodeBuilder := checker.NewNodeBuilderEx(f.typeChecker, f.changeTracker.EmitContext, idToSymbol)
	return nodeBuilder, idToSymbol
}

func (f *missingMemberFixer) createMemberFromSymbol(symbol *ast.Symbol, enclosingDeclaration *ast.Node, sourceFile *ast.SourceFile, body *ast.FunctionBody, preserveOptional preserveOptionalFlags, abstract bool) []*ast.Node {
	declarations := symbol.Declarations()
	declaration := core.FirstOrNil(declarations)

	quotePreference := lsutil.GetQuotePreference(sourceFile, f.preferences)
	ambient := enclosingDeclaration.Flags&ast.NodeFlagsAmbient != 0
	signatureOnly := ambient || abstract
	optional := symbol.Flags()&ast.SymbolFlagsOptional != 0
	kind := ast.KindPropertySignature
	if declaration != nil {
		kind = declaration.Kind
	}
	declarationName := createDeclarationName(f.changeTracker.NodeFactory, f.typeChecker, symbol, declaration)
	modifiers := f.createModifiers(symbol, declaration)

	flags := nodebuilder.FlagsNoTruncation
	if quotePreference == lsutil.QuotePreferenceSingle {
		flags |= nodebuilder.FlagsUseSingleQuotesForStringLiteralType
	}

	t := f.typeChecker.GetWidenedType(f.typeChecker.GetTypeOfSymbolAtLocation(symbol, enclosingDeclaration))
	var nodes []*ast.Node

	switch kind {
	case ast.KindPropertySignature, ast.KindPropertyDeclaration:
		nodeBuilder, idToSymbol := f.createNodeBuilder()
		typeNode := f.createTypeNode(t, enclosingDeclaration, flags, nodeBuilder, idToSymbol)
		var questionToken *ast.TokenNode
		if optional && preserveOptional&preserveOptionalFlagsProperty != 0 {
			questionToken = f.changeTracker.NodeFactory.NewToken(ast.KindQuestionToken)
		}
		return append(nodes, f.changeTracker.NodeFactory.NewPropertyDeclaration(modifiers, createPropertyName(f.changeTracker.NodeFactory, declarationName, quotePreference), questionToken, typeNode, nil /*initializer*/))

	case ast.KindGetAccessor, ast.KindSetAccessor:
		nodeBuilder, idToSymbol := f.createNodeBuilder()
		accessors := ast.GetAllAccessorDeclarations(symbol.Declarations(), declaration)
		var orderedAccessors []*ast.Node
		if accessors.SecondAccessor == nil {
			orderedAccessors = append(orderedAccessors, accessors.FirstAccessor)
		} else {
			orderedAccessors = append(orderedAccessors, accessors.FirstAccessor, accessors.SecondAccessor)
		}

		for _, accessor := range orderedAccessors {
			if ast.IsGetAccessorDeclaration(accessor) {
				nodes = append(
					nodes,
					f.changeTracker.NodeFactory.NewGetAccessorDeclaration(
						modifiers, createPropertyName(f.changeTracker.NodeFactory, declarationName, quotePreference),
						nil /*typeParameters*/, nil /*parameters*/, f.createTypeNode(t, enclosingDeclaration, flags, nodeBuilder, idToSymbol), nil /*fullSignature*/, f.createBody(body, quotePreference, signatureOnly),
					),
				)
			}

			if ast.IsSetAccessorDeclaration(accessor) {
				parameter := checker.GetSetAccessorValueParameter(accessor)
				if parameter == nil {
					panic("Expected set accessor to have a parameter.")
				}

				nodes = append(nodes, f.changeTracker.NodeFactory.NewSetAccessorDeclaration(
					modifiers, createPropertyName(f.changeTracker.NodeFactory, declarationName, quotePreference),
					nil /*typeParameters*/, createDummyParameters(f.changeTracker.NodeFactory, 1, []string{parameter.Name().Text()}, []*ast.TypeNode{f.createTypeNode(t, enclosingDeclaration, flags, nodeBuilder, idToSymbol)}, 1, ast.IsInJSFile(enclosingDeclaration)),
					nil /*type*/, nil /*fullSignature*/, f.createBody(body, quotePreference, signatureOnly),
				),
				)
			}
		}
		return nodes

	case ast.KindMethodSignature, ast.KindMethodDeclaration:
		signatures := f.getCallSignatures(t)
		preserveOptional := optional && preserveOptional&preserveOptionalFlagsMethod != 0
		if len(signatures) == 0 {
			return nil
		}

		if len(declarations) == 1 {
			method := f.createSignatureDeclarationFromSignature(core.FirstOrNil(signatures), ast.KindMethodDeclaration, sourceFile, enclosingDeclaration, f.createBody(body, quotePreference, signatureOnly), modifiers, declarationName, preserveOptional)
			if method != nil {
				nodes = append(nodes, method)
			}
			return nodes
		}

		for _, signature := range signatures {
			if signature.Declaration() != nil && signature.Declaration().Flags&ast.NodeFlagsAmbient != 0 {
				continue
			}

			method := f.createSignatureDeclarationFromSignature(signature, ast.KindMethodDeclaration, sourceFile, enclosingDeclaration, nil /*body*/, modifiers, declarationName, preserveOptional)
			if method != nil {
				nodes = append(nodes, method)
			}
		}

		if signatureOnly {
			return nodes
		}

		if len(declarations) > len(signatures) {
			signature := f.typeChecker.GetSignatureFromDeclaration(core.LastOrNil(declarations))
			method := f.createSignatureDeclarationFromSignature(signature, ast.KindMethodDeclaration, sourceFile, enclosingDeclaration, f.createBody(body, quotePreference, false /*signatureOnly*/), modifiers, declarationName, preserveOptional)
			if method != nil {
				nodes = append(nodes, method)
			}
		} else {
			method := f.createSignatureDeclarationFromSignatures(signatures, declarationName, preserveOptional, modifiers, quotePreference, body, enclosingDeclaration)
			if method != nil {
				nodes = append(nodes, method)
			}
		}

		return nodes
	}
	return nil
}

func (f *missingMemberFixer) getCallSignatures(t *checker.Type) []*checker.Signature {
	if t.IsUnion() {
		return core.FlatMap(t.Types(), f.typeChecker.GetCallSignatures)
	}
	return f.typeChecker.GetCallSignatures(t)
}

func (f *missingMemberFixer) createTypeNode(t *checker.Type, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, nodeBuilder *checker.NodeBuilder, idToSymbol map[*ast.IdentifierNode]*ast.Symbol) *ast.TypeNode {
	return f.importTypeNode(nodeBuilder.TypeToTypeNode(t, enclosingDeclaration, flags, nodebuilder.InternalFlagsNone, nil /*tracker*/), idToSymbol)
}

func (f *missingMemberFixer) createModifiers(symbol *ast.Symbol, declaration *ast.Node) *ast.ModifierList {
	modifierFlags := ast.ModifierFlagsNone
	if declaration != nil {
		effective := checker.GetDeclarationModifierFlagsFromSymbol(symbol)
		modifierFlags = effective & ast.ModifierFlagsStatic
		if effective&ast.ModifierFlagsPublic != 0 {
			modifierFlags |= ast.ModifierFlagsPublic
		} else if effective&ast.ModifierFlagsProtected != 0 {
			modifierFlags |= ast.ModifierFlagsProtected
		}
		if ast.IsAutoAccessorPropertyDeclaration(declaration) {
			modifierFlags |= ast.ModifierFlagsAccessor
		}
	}
	if f.shouldAddOverrideKeyword(declaration) {
		modifierFlags |= ast.ModifierFlagsOverride
	}
	if modifierFlags == ast.ModifierFlagsNone {
		return nil
	}
	return f.changeTracker.NodeFactory.NewModifierList(ast.CreateModifiersFromModifierFlags(modifierFlags, f.changeTracker.NodeFactory.NewModifier))
}

func (f *missingMemberFixer) shouldAddOverrideKeyword(declaration *ast.Node) bool {
	return declaration != nil && f.program.Options().NoImplicitOverride.IsTrue() && ast.HasAbstractModifier(declaration)
}

func (f *missingMemberFixer) createSignatureDeclarationFromSignature(signature *checker.Signature, kind ast.Kind, sourceFile *ast.SourceFile, enclosingDeclaration *ast.Node, body *ast.FunctionBody, modifiers *ast.ModifierList, name *ast.PropertyName, optional bool) *ast.Node {
	quotePreference := lsutil.GetQuotePreference(sourceFile, f.preferences)
	flags := nodebuilder.FlagsNoTruncation | nodebuilder.FlagsSuppressAnyReturnType | nodebuilder.FlagsAllowEmptyTuple
	if quotePreference == lsutil.QuotePreferenceSingle {
		flags |= nodebuilder.FlagsUseSingleQuotesForStringLiteralType
	}

	nodeBuilder, idToSymbol := f.createNodeBuilder()
	signatureDeclaration := nodeBuilder.SignatureToSignatureDeclaration(signature, kind, enclosingDeclaration, flags, nodebuilder.InternalFlagsAllowUnresolvedNames, nil /*tracker*/)
	if signatureDeclaration == nil {
		return nil
	}

	isJS := ast.IsInJSFile(enclosingDeclaration)
	parameters := signatureDeclaration.ParameterList()
	typeParameters := core.IfElse(isJS, nil, signatureDeclaration.TypeParameterList())
	typeNode := core.IfElse(isJS, nil, signatureDeclaration.Type())

	if typeParameters != nil && len(typeParameters.Nodes) > 0 {
		nodes := make([]*ast.Node, 0, len(typeParameters.Nodes))
		for _, tp := range typeParameters.Nodes {
			if tp == nil {
				continue
			}

			if ast.IsTypeParameterDeclaration(tp) {
				typeParameter := tp.AsTypeParameterDeclaration()

				constraint := typeParameter.Constraint
				if constraint != nil {
					constraint = f.importTypeNode(constraint, idToSymbol)
				}

				defaultType := typeParameter.DefaultType
				if defaultType != nil {
					defaultType = f.importTypeNode(defaultType, idToSymbol)
				}

				nodes = append(nodes,
					f.changeTracker.NodeFactory.UpdateTypeParameterDeclaration(typeParameter, typeParameter.Modifiers(), typeParameter.Name(), constraint, typeParameter.Expression, defaultType))
			} else {
				nodes = append(nodes, tp)
			}
		}
		typeParameters = f.changeTracker.NodeFactory.NewNodeList(nodes)
	}

	if parameters != nil {
		nodes := make([]*ast.Node, 0, len(parameters.Nodes))
		for _, p := range parameters.Nodes {
			if p == nil {
				continue
			}

			parameter := p.AsParameterDeclaration()
			parameterTypeNode := core.IfElse(isJS, nil /*parameterTypeNode*/, parameter.Type)
			if parameterTypeNode != nil {
				parameterTypeNode = f.importTypeNode(parameterTypeNode, idToSymbol)
			}

			nodes = append(nodes,
				f.changeTracker.NodeFactory.UpdateParameterDeclaration(parameter, parameter.Modifiers(), parameter.DotDotDotToken, parameter.Name(), core.IfElse(isJS, nil, parameter.QuestionToken), parameterTypeNode, parameter.Initializer))
		}
		parameters = f.changeTracker.NodeFactory.NewNodeList(nodes)
	}

	if typeNode != nil {
		typeNode = f.importTypeNode(typeNode, idToSymbol)
	}

	var questionToken *ast.TokenNode
	if optional {
		questionToken = f.changeTracker.NodeFactory.NewToken(ast.KindQuestionToken)
	}

	switch kind {
	case ast.KindFunctionExpression:
		fn := signatureDeclaration.AsFunctionExpression()
		return f.changeTracker.NodeFactory.UpdateFunctionExpression(fn, modifiers, fn.AsteriskToken, core.IfElse(name != nil && ast.IsIdentifier(name), name, nil), typeParameters, parameters, typeNode, fn.FullSignature, core.OrElse(body, fn.Body))

	case ast.KindArrowFunction:
		fn := signatureDeclaration.AsArrowFunction()
		return f.changeTracker.NodeFactory.UpdateArrowFunction(fn, modifiers, typeParameters, parameters, typeNode, fn.FullSignature, fn.EqualsGreaterThanToken, core.OrElse(body, fn.Body))

	case ast.KindMethodDeclaration:
		method := signatureDeclaration.AsMethodDeclaration()
		methodName := core.IfElse(name == nil, f.changeTracker.NodeFactory.NewIdentifier(""), createPropertyName(f.changeTracker.NodeFactory, name, quotePreference))
		return f.changeTracker.NodeFactory.UpdateMethodDeclaration(method, modifiers, method.AsteriskToken, methodName, questionToken, typeParameters, parameters, typeNode, method.FullSignature, body)

	case ast.KindFunctionDeclaration:
		fn := signatureDeclaration.AsFunctionDeclaration()
		return f.changeTracker.NodeFactory.UpdateFunctionDeclaration(fn, modifiers, fn.AsteriskToken, core.IfElse(name != nil && ast.IsIdentifier(name), name, nil), typeParameters, parameters, typeNode, fn.FullSignature, core.OrElse(body, fn.Body))
	}

	return nil
}

func (f *missingMemberFixer) createSignatureDeclarationFromSignatures(signatures []*checker.Signature, name *ast.PropertyName, optional bool, modifiers *ast.ModifierList, quotePreference lsutil.QuotePreference, body *ast.FunctionBody, enclosingDeclaration *ast.Node) *ast.Node {
	if len(signatures) == 0 {
		return nil
	}

	nodeBuilder, idToSymbol := f.createNodeBuilder()
	maxArgsSignature := signatures[0]
	minArgumentCount := signatures[0].MinArgumentCount()

	hasRestParameter := false
	for _, signature := range signatures {
		minArgumentCount = min(minArgumentCount, signature.MinArgumentCount())
		if signature.HasRestParameter() {
			hasRestParameter = true
		}
		if len(signature.Parameters()) >= len(maxArgsSignature.Parameters()) && (!signature.HasRestParameter() || maxArgsSignature.HasRestParameter()) {
			maxArgsSignature = signature
		}
	}

	maxNonRestArgs := len(maxArgsSignature.Parameters()) - core.IfElse(maxArgsSignature.HasRestParameter(), 1, 0)
	parameterNames := make([]string, 0, len(maxArgsSignature.Parameters()))
	for _, symbol := range maxArgsSignature.Parameters() {
		parameterNames = append(parameterNames, symbol.Name())
	}
	parameters := createDummyParameters(f.changeTracker.NodeFactory, maxNonRestArgs, parameterNames, nil /*types*/, minArgumentCount, ast.IsInJSFile(enclosingDeclaration))

	if hasRestParameter {
		restParameterName := "rest"
		if maxNonRestArgs < len(parameterNames) && parameterNames[maxNonRestArgs] != "" {
			restParameterName = parameterNames[maxNonRestArgs]
		}

		var questionToken *ast.QuestionToken
		if maxNonRestArgs >= minArgumentCount {
			questionToken = f.changeTracker.NodeFactory.NewToken(ast.KindQuestionToken)
		}

		parameters.Nodes = append(parameters.Nodes, f.changeTracker.NodeFactory.NewParameterDeclaration(
			nil /*modifiers*/, f.changeTracker.NodeFactory.NewToken(ast.KindDotDotDotToken),
			f.changeTracker.NodeFactory.NewIdentifier(restParameterName), questionToken,
			f.changeTracker.NodeFactory.NewArrayTypeNode(f.changeTracker.NodeFactory.NewKeywordTypeNode(ast.KindUnknownKeyword)), nil, /*initializer*/
		))
	}

	methodName := core.IfElse(name == nil, f.changeTracker.NodeFactory.NewIdentifier(""), createPropertyName(f.changeTracker.NodeFactory, name, quotePreference))

	return f.changeTracker.NodeFactory.NewMethodDeclaration(
		modifiers, nil /*asteriskToken*/, methodName, core.IfElse(optional, f.changeTracker.NodeFactory.NewToken(ast.KindQuestionToken), nil),
		nil /*typeParameters*/, parameters, f.getReturnTypeFromSignatures(signatures, enclosingDeclaration, nodeBuilder, idToSymbol),
		nil /*fullSignature*/, f.createBody(body, quotePreference, false /*signatureOnly*/),
	)
}

func (f *missingMemberFixer) getReturnTypeFromSignatures(signatures []*checker.Signature, enclosingDeclaration *ast.Node, nodeBuilder *checker.NodeBuilder, idToSymbol map[*ast.IdentifierNode]*ast.Symbol) *ast.TypeNode {
	if len(signatures) == 0 {
		return nil
	}

	returnTypes := make([]*checker.Type, 0, len(signatures))
	for _, signature := range signatures {
		returnTypes = append(returnTypes, f.typeChecker.GetReturnTypeOfSignature(signature))
	}

	unionType := f.typeChecker.GetUnionType(returnTypes)
	return f.importTypeNode(nodeBuilder.TypeToTypeNode(unionType, enclosingDeclaration, nodebuilder.FlagsNoTruncation, nodebuilder.InternalFlagsAllowUnresolvedNames, nil /*typeArguments*/), idToSymbol)
}

func (f *missingMemberFixer) importTypeNode(typeNode *ast.TypeNode, idToSymbol map[*ast.IdentifierNode]*ast.Symbol) *ast.TypeNode {
	if typeNode == nil || f.importAdder == nil {
		return typeNode
	}

	importedTypeNode, symbols := autoimport.TryGetAutoImportableReferenceFromTypeNode(typeNode, idToSymbol)
	if importedTypeNode != nil {
		for _, symbol := range symbols {
			exportSymbol := f.getExportedSymbol(symbol)
			if exportSymbol == nil {
				continue
			}
			f.addSymbolToImport(exportSymbol, true /*isValidTypeOnlyUseSite*/)
		}
		return importedTypeNode
	}

	seen := make(map[*ast.Symbol]bool)
	for _, symbol := range idToSymbol {
		if symbol == nil || seen[symbol] {
			continue
		}
		seen[symbol] = true
		exportSymbol := f.getExportedSymbol(symbol)
		if exportSymbol == nil {
			continue
		}
		f.addSymbolToImport(exportSymbol, true /*isValidTypeOnlyUseSite*/)
	}
	return typeNode
}

func (f *missingMemberFixer) addSymbolToImport(symbol *ast.Symbol, isValidTypeOnlyUseSite bool) {
	if f.symbolsToImport == nil {
		f.symbolsToImport = make(map[*ast.Symbol]bool)
	}
	previous, exists := f.symbolsToImport[symbol]
	f.symbolsToImport[symbol] = isValidTypeOnlyUseSite && (!exists || previous)
}

func (f *missingMemberFixer) addImports() {
	if f.importAdder == nil {
		return
	}
	for symbol, isValidTypeOnlyUseSite := range f.symbolsToImport {
		f.importAdder.AddImportFromExportedSymbol(symbol, isValidTypeOnlyUseSite)
	}
	for declaration := range f.importsToPromote.Keys() {
		f.importAdder.AddImportFix(&autoimport.Fix{
			AutoImportFix:            &lsproto.AutoImportFix{Kind: lsproto.AutoImportFixKindPromoteTypeOnly},
			TypeOnlyAliasDeclaration: declaration,
		})
	}
}

func (f *missingMemberFixer) getExportedSymbol(symbol *ast.Symbol) *ast.Symbol {
	symbol = f.typeChecker.GetExportSymbolOfSymbol(symbol)
	if symbol == nil || symbol.Parent() == nil {
		return nil
	}
	return symbol
}

func (f *missingMemberFixer) createIndexSignatureDeclarationFromType(classDeclaration *ast.Node, implementedType *checker.Type, keyType *checker.Type) *ast.Node {
	indexInfo := f.typeChecker.GetIndexInfoOfType(implementedType, keyType)
	if indexInfo == nil {
		return nil
	}

	builder := checker.NewNodeBuilder(f.typeChecker, f.changeTracker.EmitContext)
	return builder.IndexInfoToIndexSignatureDeclaration(indexInfo, classDeclaration, nodebuilder.FlagsNone, nodebuilder.InternalFlagsNone, nil)
}

func (f *missingMemberFixer) createBody(body *ast.FunctionBody, quotePreference lsutil.QuotePreference, signatureOnly bool) *ast.FunctionBody {
	if signatureOnly {
		return nil
	}
	body = f.changeTracker.NodeFactory.DeepCloneNode(body)
	if body == nil {
		return f.createStubbedMethodBody(quotePreference)
	}
	return body
}

func (f *missingMemberFixer) createStubbedMethodBody(quotePreference lsutil.QuotePreference) *ast.FunctionBody {
	return f.createStubbedBody(quotePreference, diagnostics.Method_not_implemented.Localize(f.locale))
}

func (f *missingMemberFixer) createStubbedBody(quotePreference lsutil.QuotePreference, message string) *ast.FunctionBody {
	tokenFlags := ast.TokenFlagsNone
	if quotePreference == lsutil.QuotePreferenceSingle {
		tokenFlags = ast.TokenFlagsSingleQuote
	}

	return f.changeTracker.NodeFactory.NewBlock(f.changeTracker.NodeFactory.NewNodeList([]*ast.Node{
		f.changeTracker.NodeFactory.NewThrowStatement(
			f.changeTracker.NodeFactory.NewNewExpression(
				f.changeTracker.NodeFactory.NewIdentifier("Error"), nil /*typeArguments*/, f.changeTracker.NodeFactory.NewNodeList([]*ast.Node{
					f.changeTracker.NodeFactory.NewStringLiteral(message, tokenFlags),
				}),
			),
		),
	}), true /*multiLine*/)
}

func (f *missingMemberFixer) createPropertyNameFromSymbol(symbol *ast.Symbol, enclosingDeclaration *ast.Node, quotePreference lsutil.QuotePreference) *ast.Node {
	factory := f.changeTracker.NodeFactory
	if symbol.Flags()&ast.SymbolFlagsTransient != 0 {
		nameType := f.typeChecker.GetNameTypeOfSymbol(symbol)
		if nameType != nil && nameType.Flags()&(checker.TypeFlagsEnumLiteral|checker.TypeFlagsUniqueESSymbol) != 0 {
			expression := f.createExpressionFromSymbol(nameType.Symbol(), enclosingDeclaration)
			if expression != nil {
				return factory.NewComputedPropertyName(expression)
			}
		}
		builder := checker.NewNodeBuilder(f.typeChecker, f.changeTracker.EmitContext)
		name := builder.SymbolToNode(symbol, ast.SymbolFlagsValue, enclosingDeclaration, nodebuilder.FlagsNone, nodebuilder.InternalFlagsWriteComputedProps, nil /*tracker*/)
		if name != nil && ast.IsComputedPropertyName(name) {
			nameSymbol := f.typeChecker.GetSymbolAtLocation(name.Expression())
			if nameSymbol != nil {
				expression := f.createExpressionFromSymbol(nameSymbol, enclosingDeclaration)
				if expression != nil {
					return factory.NewComputedPropertyName(expression)
				}
			}
			return factory.DeepCloneNode(name)
		}
	}
	if scanner.IsIdentifierText(symbol.Name(), core.LanguageVariantStandard) {
		return factory.NewIdentifier(symbol.Name())
	}
	value := jsnum.FromString(symbol.Name())
	if value >= 0 && value.String() == symbol.Name() {
		return factory.NewNumericLiteral(symbol.Name(), ast.TokenFlagsNone)
	}
	return factory.NewStringLiteral(symbol.Name(), core.IfElse(quotePreference == lsutil.QuotePreferenceSingle, ast.TokenFlagsSingleQuote, ast.TokenFlagsNone))
}

func (f *missingMemberFixer) createExpressionFromSymbol(symbol *ast.Symbol, enclosingDeclaration *ast.Node) *ast.Node {
	builder, idToSymbol := f.createNodeBuilder()
	expression := builder.SymbolToExpression(symbol, ast.SymbolFlagsValue, enclosingDeclaration, nodebuilder.FlagsUseFullyQualifiedType, nodebuilder.InternalFlagsNone, nil /*tracker*/)
	if expression == nil || f.importAdder == nil {
		return expression
	}

	identifier := ast.GetLeftmostExpression(expression, true /*stopAtCallExpressions*/)
	rootSymbol := idToSymbol[identifier]
	if rootSymbol == nil {
		return expression
	}
	declaration := f.typeChecker.GetTypeOnlyAliasDeclaration(rootSymbol)
	if declaration != nil && ast.GetSourceFileOfNode(declaration) == ast.GetSourceFileOfNode(enclosingDeclaration) {
		f.importsToPromote.Add(declaration)
	} else {
		resolvedSymbol := f.typeChecker.ResolveName(identifier.Text(), enclosingDeclaration, ast.SymbolFlagsValue, false /*excludeGlobals*/)
		if resolvedSymbol != nil && f.typeChecker.GetMergedSymbol(f.typeChecker.SkipAlias(resolvedSymbol)) == f.typeChecker.GetMergedSymbol(f.typeChecker.SkipAlias(rootSymbol)) {
			return expression
		}
		exportSymbol := f.getExportedSymbol(rootSymbol)
		if exportSymbol != nil {
			f.addSymbolToImport(exportSymbol, false /*isValidTypeOnlyUseSite*/)
		}
	}
	return expression
}

func (f *missingMemberFixer) tryGetValueFromType(t *checker.Type, enclosingDeclaration *ast.Node, sourceFile *ast.SourceFile, quotePreference lsutil.QuotePreference, typeStack []*checker.Type) *ast.Node {
	factory := f.changeTracker.NodeFactory
	if slices.Contains(typeStack, t) || f.typeChecker.IsDeeplyNestedType(t, typeStack, 3 /*maxDepth*/) {
		return factory.NewIdentifier("undefined")
	}
	typeStack = append(typeStack, t)
	tokenFlags := core.IfElse(quotePreference == lsutil.QuotePreferenceSingle, ast.TokenFlagsSingleQuote, ast.TokenFlagsNone)
	flags := t.Flags()
	switch {
	case flags&checker.TypeFlagsAnyOrUnknown != 0:
		return factory.NewIdentifier("undefined")
	case flags&(checker.TypeFlagsString|checker.TypeFlagsTemplateLiteral) != 0:
		return factory.NewStringLiteral("", tokenFlags)
	case flags&checker.TypeFlagsNumber != 0:
		return factory.NewNumericLiteral("0", ast.TokenFlagsNone)
	case flags&checker.TypeFlagsBigInt != 0:
		return factory.NewBigIntLiteral("0n", ast.TokenFlagsNone)
	case flags&checker.TypeFlagsBoolean != 0:
		return factory.NewKeywordExpression(ast.KindFalseKeyword)
	case flags&checker.TypeFlagsEnumLike != 0:
		member := t.Symbol()
		if member.Flags()&ast.SymbolFlagsEnum != 0 {
			member = nil
			for _, declaration := range t.Symbol().Declarations() {
				if ast.IsEnumDeclaration(declaration) && len(declaration.AsEnumDeclaration().Members.Nodes) > 0 {
					member = f.typeChecker.GetSymbolOfDeclaration(declaration.AsEnumDeclaration().Members.Nodes[0])
					break
				}
			}
		}
		if member != nil {
			expression := f.createExpressionFromSymbol(member, enclosingDeclaration)
			if expression != nil {
				return expression
			}
		}
		return factory.NewNumericLiteral("0", ast.TokenFlagsNone)
	case flags&checker.TypeFlagsStringLiteral != 0:
		return factory.NewStringLiteral(t.AsLiteralType().Value().(string), tokenFlags)
	case flags&(checker.TypeFlagsNumberLiteral|checker.TypeFlagsBigIntLiteral) != 0:
		text := t.AsLiteralType().String()
		negative := strings.HasPrefix(text, "-")
		text = strings.TrimPrefix(text, "-")
		var literal *ast.Node
		if flags&checker.TypeFlagsBigIntLiteral != 0 {
			literal = factory.NewBigIntLiteral(text, ast.TokenFlagsNone)
		} else {
			literal = factory.NewNumericLiteral(text, ast.TokenFlagsNone)
		}
		if negative {
			return factory.NewPrefixUnaryExpression(ast.KindMinusToken, literal)
		}
		return literal
	case flags&checker.TypeFlagsBooleanLiteral != 0:
		return factory.NewKeywordExpression(core.IfElse(t.AsLiteralType().Value().(bool), ast.KindTrueKeyword, ast.KindFalseKeyword))
	case flags&checker.TypeFlagsNull != 0:
		return factory.NewKeywordExpression(ast.KindNullKeyword)
	case t.IsUnion():
		return f.tryGetValueFromType(t.Types()[0], enclosingDeclaration, sourceFile, quotePreference, typeStack)
	case f.typeChecker.IsArrayLikeType(t):
		return factory.NewArrayLiteralExpression(nil /*elements*/, false /*multiLine*/)
	}

	symbol := t.Symbol()
	if flags&checker.TypeFlagsObject != 0 && (t.ObjectFlags()&checker.ObjectFlagsObjectLiteral != 0 || symbol != nil && len(symbol.Declarations()) == 1 && ast.IsTypeLiteralNode(symbol.Declarations()[0])) {
		var properties []*ast.Node
		for _, property := range f.typeChecker.GetPropertiesOfType(t) {
			initializer := f.tryGetValueFromType(f.typeChecker.GetTypeOfSymbol(property), enclosingDeclaration, sourceFile, quotePreference, typeStack)
			properties = append(properties, factory.NewPropertyAssignment(nil /*modifiers*/, f.createPropertyNameFromSymbol(property, enclosingDeclaration, quotePreference), nil /*postfixToken*/, nil /*typeNode*/, initializer))
		}
		return factory.NewObjectLiteralExpression(factory.NewNodeList(properties), true /*multiLine*/)
	}
	if t.ObjectFlags()&checker.ObjectFlagsAnonymous != 0 && symbol != nil {
		for _, declaration := range symbol.Declarations() {
			if ast.IsFunctionTypeNode(declaration) || declaration.Kind == ast.KindMethodSignature || ast.IsMethodDeclaration(declaration) {
				signature := core.FirstOrNil(f.typeChecker.GetCallSignatures(t))
				if signature != nil {
					body := f.createStubbedBody(quotePreference, diagnostics.Function_not_implemented.Localize(f.locale))
					function := f.createSignatureDeclarationFromSignature(signature, ast.KindFunctionExpression, sourceFile, enclosingDeclaration, body, nil /*modifiers*/, nil /*name*/, false /*optional*/)
					if function != nil {
						return function
					}
				}
				break
			}
		}
	}
	if t.IsClass() {
		declaration := ast.GetClassLikeDeclarationOfSymbol(symbol)
		if declaration != nil && !ast.HasAbstractModifier(declaration) {
			constructorType := f.typeChecker.GetTypeOfSymbol(symbol)
			signatures := f.typeChecker.GetSignaturesOfType(constructorType, checker.SignatureKindConstruct)
			if f.typeChecker.IsConstructorAccessible(enclosingDeclaration, signatures) && core.Some(signatures, func(signature *checker.Signature) bool {
				return f.typeChecker.GetMinArgumentCount(signature) == 0
			}) {
				expression := f.createExpressionFromSymbol(symbol, enclosingDeclaration)
				if expression != nil {
					return factory.NewNewExpression(expression, nil /*typeArguments*/, nil /*arguments*/)
				}
			}
		}
	}
	return factory.NewIdentifier("undefined")
}

func createDummyParameters(factory *ast.NodeFactory, argCount int, names []string, types []*ast.TypeNode, minArgumentCount int, inJS bool) *ast.ParameterList {
	parameters := make([]*ast.Node, 0, argCount)
	parameterNameCounts := make(map[string]int)

	for i := range argCount {
		parameterName := ""
		if i < len(names) && names[i] != "" {
			parameterName = names[i]
		} else {
			parameterName = "arg" + strconv.Itoa(i)
		}

		count := parameterNameCounts[parameterName]
		parameterNameCounts[parameterName] = count + 1

		if count > 0 {
			parameterName += strconv.Itoa(count)
		}

		var questionToken *ast.QuestionToken
		if i >= minArgumentCount {
			questionToken = factory.NewToken(ast.KindQuestionToken)
		}

		var typeNode *ast.TypeNode
		if inJS {
			typeNode = nil
		} else if i < len(types) && types[i] != nil {
			typeNode = types[i]
		} else {
			typeNode = factory.NewKeywordTypeNode(ast.KindUnknownKeyword)
		}
		parameters = append(parameters,
			factory.NewParameterDeclaration(nil /*modifiers*/, nil /*dotDotDotToken*/, factory.NewIdentifier(parameterName), questionToken, typeNode, nil /*initializer*/))
	}
	return factory.NewNodeList(parameters)
}

func createDeclarationName(factory *ast.NodeFactory, typeChecker *checker.Checker, symbol *ast.Symbol, declaration *ast.Node) *ast.PropertyName {
	if symbol != nil && symbol.CheckFlags()&ast.CheckFlagsMapped != 0 {
		nameType := typeChecker.GetNameTypeOfSymbol(symbol)
		if nameType != nil && checker.IsTypeUsableAsPropertyName(nameType) {
			return factory.NewIdentifier(checker.GetPropertyNameFromType(nameType))
		}
	}
	if declaration != nil && declaration.Name() != nil {
		return declaration.Name().Clone(factory)
	}
	if symbol != nil {
		return factory.NewIdentifier(symbol.Name())
	}
	return nil
}

func createPropertyName(factory *ast.NodeFactory, node *ast.Node, quotePreference lsutil.QuotePreference) *ast.PropertyName {
	if ast.IsIdentifier(node) && node.Text() == "constructor" {
		tokenFlags := ast.TokenFlagsNone
		if quotePreference == lsutil.QuotePreferenceSingle {
			tokenFlags = ast.TokenFlagsSingleQuote
		}
		return factory.NewComputedPropertyName(factory.NewStringLiteral(node.Text(), tokenFlags))
	}
	return factory.DeepCloneNode(node)
}
