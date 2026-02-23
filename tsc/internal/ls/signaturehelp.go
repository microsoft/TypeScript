package ls

import (
	"context"
	"fmt"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/nodebuilder"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
)

type callInvocation struct {
	node *ast.Node
}

type typeArgsInvocation struct {
	called *ast.Identifier
}

type contextualInvocation struct {
	signature *checker.Signature
	node      *ast.Node // Just for enclosingDeclaration for printing types
	symbol    *ast.Symbol
}

type invocation struct {
	callInvocation       *callInvocation
	typeArgsInvocation   *typeArgsInvocation
	contextualInvocation *contextualInvocation
}

func (l *LanguageService) ProvideSignatureHelp(
	ctx context.Context,
	documentURI lsproto.DocumentUri,
	position lsproto.Position,
	context *lsproto.SignatureHelpContext,
) (lsproto.SignatureHelpResponse, error) {
	program, sourceFile := l.getProgramAndFile(documentURI)
	items := l.GetSignatureHelpItems(
		ctx,
		int(l.converters.LineAndCharacterToPosition(sourceFile, position)),
		program,
		sourceFile,
		context)
	return lsproto.SignatureHelpOrNull{SignatureHelp: items}, nil
}

func (l *LanguageService) GetSignatureHelpItems(
	ctx context.Context,
	position int,
	program *compiler.Program,
	sourceFile *ast.SourceFile,
	context *lsproto.SignatureHelpContext,
) *lsproto.SignatureHelp {
	typeChecker, done := program.GetTypeCheckerForFile(ctx, sourceFile)
	defer done()

	// Decide whether to show signature help
	startingToken := astnav.FindPrecedingToken(sourceFile, position)
	if startingToken == nil {
		// We are at the beginning of the file
		return nil
	}

	type signatureHelpTriggerReasonKind int32

	const (
		signatureHelpTriggerReasonKindNone           signatureHelpTriggerReasonKind = 0    // was undefined
		signatureHelpTriggerReasonKindInvoked        signatureHelpTriggerReasonKind = iota // was "invoked"
		signatureHelpTriggerReasonKindCharacterTyped                                       // was "characterTyped"
		signatureHelpTriggerReasonKindRetriggered                                          // was "retrigger"
	)

	// Emulate VS Code's toTsTriggerReason.
	triggerReasonKind := signatureHelpTriggerReasonKindNone
	if context != nil {
		switch context.TriggerKind {
		case lsproto.SignatureHelpTriggerKindTriggerCharacter:
			if context.TriggerCharacter != nil {
				if context.IsRetrigger {
					triggerReasonKind = signatureHelpTriggerReasonKindRetriggered
				} else {
					triggerReasonKind = signatureHelpTriggerReasonKindCharacterTyped
				}
			} else {
				triggerReasonKind = signatureHelpTriggerReasonKindInvoked
			}
		case lsproto.SignatureHelpTriggerKindContentChange:
			if context.IsRetrigger {
				triggerReasonKind = signatureHelpTriggerReasonKindRetriggered
			} else {
				triggerReasonKind = signatureHelpTriggerReasonKindCharacterTyped
			}
		case lsproto.SignatureHelpTriggerKindInvoked:
			triggerReasonKind = signatureHelpTriggerReasonKindInvoked
		default:
			triggerReasonKind = signatureHelpTriggerReasonKindInvoked
		}
	}

	// Only need to be careful if the user typed a character and signature help wasn't showing.
	onlyUseSyntacticOwners := triggerReasonKind == signatureHelpTriggerReasonKindCharacterTyped

	// Bail out quickly in the middle of a string or comment, don't provide signature help unless the user explicitly requested it.
	if onlyUseSyntacticOwners && (IsInString(sourceFile, position, startingToken) || isInComment(sourceFile, position, startingToken) != nil) {
		return nil
	}

	isManuallyInvoked := triggerReasonKind == signatureHelpTriggerReasonKindInvoked
	argumentInfo := getContainingArgumentInfo(startingToken, sourceFile, typeChecker, isManuallyInvoked, position)
	if argumentInfo == nil {
		return nil
	}

	if ctx.Err() != nil {
		return nil
	}

	// Extra syntactic and semantic filtering of signature help
	candidateInfo := getCandidateOrTypeInfo(argumentInfo, typeChecker, sourceFile, startingToken, onlyUseSyntacticOwners)

	if ctx.Err() != nil {
		return nil
	}

	if candidateInfo == nil {
		// For JS files, try a fallback that searches all source files for declarations
		// with matching names that have call signatures. This is a heuristic for untyped JS code.
		if ast.IsSourceFileJS(sourceFile) {
			return l.createJSSignatureHelpItems(ctx, argumentInfo, program, typeChecker)
		}
		return nil
	}

	// return typeChecker.runWithCancellationToken(cancellationToken, typeChecker =>
	if candidateInfo.candidateInfo != nil {
		return l.createSignatureHelpItems(ctx, candidateInfo.candidateInfo.candidates, candidateInfo.candidateInfo.resolvedSignature, argumentInfo, sourceFile, typeChecker, onlyUseSyntacticOwners)
	}
	return createTypeHelpItems(ctx, candidateInfo.typeInfo, argumentInfo, sourceFile, typeChecker)
}

func createTypeHelpItems(ctx context.Context, symbol *ast.Symbol, argumentInfo *argumentListInfo, sourceFile *ast.SourceFile, c *checker.Checker) *lsproto.SignatureHelp {
	typeParameters := c.GetLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol)
	if typeParameters == nil {
		return nil
	}
	item := getTypeHelpItem(symbol, typeParameters, getEnclosingDeclarationFromInvocation(argumentInfo.invocation), sourceFile, c)

	// Check client capabilities for activeParameter handling
	caps := lsproto.GetClientCapabilities(ctx)
	sigInfoCaps := caps.TextDocument.SignatureHelp.SignatureInformation
	supportsPerSignatureActiveParam := sigInfoCaps.ActiveParameterSupport

	// Converting signatureHelpParameter to *lsproto.ParameterInformation
	parameters := make([]*lsproto.ParameterInformation, len(item.Parameters))
	for i, param := range item.Parameters {
		parameters[i] = param.parameterInfo
	}

	sigInfo := &lsproto.SignatureInformation{
		Label:         item.Label,
		Documentation: nil,
		Parameters:    &parameters,
	}

	// If client supports per-signature activeParameter, set it on SignatureInformation
	if supportsPerSignatureActiveParam && len(item.Parameters) > 0 {
		sigInfo.ActiveParameter = &lsproto.UintegerOrNull{Uinteger: new(uint32(argumentInfo.argumentIndex))}
	}

	help := &lsproto.SignatureHelp{
		Signatures:      []*lsproto.SignatureInformation{sigInfo},
		ActiveSignature: new(uint32(0)),
	}

	// If client doesn't support per-signature activeParameter, set it on the top-level SignatureHelp
	if !supportsPerSignatureActiveParam && len(item.Parameters) > 0 {
		help.ActiveParameter = &lsproto.UintegerOrNull{Uinteger: new(uint32(argumentInfo.argumentIndex))}
	}

	return help
}

func getTypeHelpItem(symbol *ast.Symbol, typeParameter []*checker.Type, enclosingDeclaration *ast.Node, sourceFile *ast.SourceFile, c *checker.Checker) signatureInformation {
	printer := printer.NewPrinter(printer.PrinterOptions{NewLine: core.NewLineKindLF}, printer.PrintHandlers{}, nil)

	parameters := make([]signatureHelpParameter, len(typeParameter))
	for i, typeParam := range typeParameter {
		parameters[i] = createSignatureHelpParameterForTypeParameter(typeParam, sourceFile, enclosingDeclaration, c, printer)
	}

	// Creating display label
	var displayParts strings.Builder
	displayParts.WriteString(c.SymbolToString(symbol))
	if len(parameters) != 0 {
		displayParts.WriteString(scanner.TokenToString(ast.KindLessThanToken))
		for i, typeParameter := range parameters {
			if i > 0 {
				displayParts.WriteString(", ")
			}
			displayParts.WriteString(*typeParameter.parameterInfo.Label.String)
		}
		displayParts.WriteString(scanner.TokenToString(ast.KindGreaterThanToken))
	}

	return signatureInformation{
		Label:         displayParts.String(),
		Documentation: nil,
		Parameters:    parameters,
		IsVariadic:    false,
	}
}

// createJSSignatureHelpItems is a fallback for JavaScript files when normal signature help
// doesn't produce results. It searches all source files for declarations with matching names
// that have call signatures.
func (l *LanguageService) createJSSignatureHelpItems(ctx context.Context, argumentInfo *argumentListInfo, program *compiler.Program, c *checker.Checker) *lsproto.SignatureHelp {
	if argumentInfo.invocation.contextualInvocation != nil {
		return nil
	}
	// See if we can find some symbol with the call expression name that has call signatures.
	expression := getExpressionFromInvocation(argumentInfo)
	if !ast.IsPropertyAccessExpression(expression) {
		return nil
	}
	name := expression.AsPropertyAccessExpression().Name().Text()
	if name == "" {
		return nil
	}

	for _, sf := range program.GetSourceFiles() {
		result := l.findSignatureHelpFromNamedDeclarations(ctx, sf, name, argumentInfo, c)
		if result != nil {
			return result
		}
	}
	return nil
}

func (l *LanguageService) findSignatureHelpFromNamedDeclarations(ctx context.Context, sourceFile *ast.SourceFile, name string, argumentInfo *argumentListInfo, c *checker.Checker) *lsproto.SignatureHelp {
	var result *lsproto.SignatureHelp
	var visit func(node *ast.Node) bool
	visit = func(node *ast.Node) bool {
		if result != nil {
			return true
		}
		if ast.GetDeclarationName(node) == name {
			if symbol := node.Symbol(); symbol != nil {
				if t := c.GetTypeOfSymbolAtLocation(symbol, node); t != nil {
					if callSignatures := c.GetCallSignatures(t); len(callSignatures) > 0 {
						result = l.createSignatureHelpItems(ctx, callSignatures, callSignatures[0], argumentInfo, sourceFile, c, true /*useFullPrefix*/)
						if result != nil {
							return true
						}
					}
				}
			}
		}
		node.ForEachChild(func(child *ast.Node) bool {
			return visit(child)
		})
		return result != nil
	}
	visit(sourceFile.AsNode())
	return result
}

func (l *LanguageService) createSignatureHelpItems(ctx context.Context, candidates []*checker.Signature, resolvedSignature *checker.Signature, argumentInfo *argumentListInfo, sourceFile *ast.SourceFile, c *checker.Checker, useFullPrefix bool) *lsproto.SignatureHelp {
	caps := lsproto.GetClientCapabilities(ctx)
	docFormat := lsproto.PreferredMarkupKind(caps.TextDocument.SignatureHelp.SignatureInformation.DocumentationFormat)

	enclosingDeclaration := getEnclosingDeclarationFromInvocation(argumentInfo.invocation)
	if enclosingDeclaration == nil {
		return nil
	}
	var callTargetSymbol *ast.Symbol
	if argumentInfo.invocation.contextualInvocation != nil {
		callTargetSymbol = argumentInfo.invocation.contextualInvocation.symbol
	} else {
		callTargetSymbol = c.GetSymbolAtLocation(getExpressionFromInvocation(argumentInfo))
		if callTargetSymbol == nil && useFullPrefix && resolvedSignature.Declaration() != nil {
			callTargetSymbol = resolvedSignature.Declaration().Symbol()
		}
	}

	var callTargetDisplayParts strings.Builder
	if callTargetSymbol != nil {
		if useFullPrefix {
			callTargetDisplayParts.WriteString(c.SymbolToStringEx(callTargetSymbol, sourceFile.AsNode(), ast.SymbolFlagsNone, checker.SymbolFormatFlagsUseAliasDefinedOutsideCurrentScope))
		} else {
			callTargetDisplayParts.WriteString(c.SymbolToString(callTargetSymbol))
		}
	}
	items := make([][]signatureInformation, len(candidates))
	for i, candidateSignature := range candidates {
		items[i] = l.getSignatureHelpItem(candidateSignature, argumentInfo.isTypeParameterList, callTargetDisplayParts.String(), enclosingDeclaration, sourceFile, c, docFormat)
	}

	selectedItemIndex := 0
	itemSeen := 0
	for i := range items {
		item := items[i]
		if (candidates)[i] == resolvedSignature {
			selectedItemIndex = itemSeen
			if len(item) > 1 {
				count := 0
				for _, j := range item {
					if j.IsVariadic || len(j.Parameters) >= argumentInfo.argumentCount {
						selectedItemIndex = itemSeen + count
						break
					}
					count++
				}
			}
		}
		itemSeen = itemSeen + len(item)
	}

	debug.Assert(selectedItemIndex != -1)
	flattenedSignatures := []signatureInformation{}
	for _, item := range items {
		flattenedSignatures = append(flattenedSignatures, item...)
	}
	if len(flattenedSignatures) == 0 {
		return nil
	}

	// Check client capabilities for activeParameter handling
	sigInfoCaps := caps.TextDocument.SignatureHelp.SignatureInformation
	supportsPerSignatureActiveParam := sigInfoCaps.ActiveParameterSupport
	supportsNullActiveParam := sigInfoCaps.NoActiveParameterSupport

	// Converting []signatureInformation to []*lsproto.SignatureInformation
	signatureInformation := make([]*lsproto.SignatureInformation, len(flattenedSignatures))
	for i, item := range flattenedSignatures {
		parameters := make([]*lsproto.ParameterInformation, len(item.Parameters))
		for j, param := range item.Parameters {
			parameters[j] = param.parameterInfo
		}
		var documentation *lsproto.StringOrMarkupContent
		if item.Documentation != nil {
			documentation = &lsproto.StringOrMarkupContent{
				MarkupContent: &lsproto.MarkupContent{
					Kind:  docFormat,
					Value: *item.Documentation,
				},
			}
		}
		sigInfo := &lsproto.SignatureInformation{
			Label:         item.Label,
			Documentation: documentation,
			Parameters:    &parameters,
		}

		// If client supports per-signature activeParameter, set it on each SignatureInformation
		if supportsPerSignatureActiveParam {
			sigInfo.ActiveParameter = l.computeActiveParameter(item, argumentInfo.argumentIndex, supportsNullActiveParam)
		}

		signatureInformation[i] = sigInfo
	}

	help := &lsproto.SignatureHelp{
		Signatures:      signatureInformation,
		ActiveSignature: new(uint32(selectedItemIndex)),
	}

	// If client doesn't support per-signature activeParameter, set it on the top-level SignatureHelp
	if !supportsPerSignatureActiveParam {
		activeSignature := flattenedSignatures[selectedItemIndex]
		help.ActiveParameter = l.computeActiveParameter(activeSignature, argumentInfo.argumentIndex, supportsNullActiveParam)
	}

	return help
}

// computeActiveParameter calculates the active parameter index for a signature,
// handling variadic signatures and null support appropriately.
func (l *LanguageService) computeActiveParameter(sig signatureInformation, argumentIndex int, supportsNull bool) *lsproto.UintegerOrNull {
	paramCount := len(sig.Parameters)
	if paramCount == 0 {
		// No parameters, return nil (omit the field)
		return nil
	}

	activeParam := uint32(argumentIndex)

	if sig.IsVariadic {
		firstRest := core.FindIndex(sig.Parameters, func(p signatureHelpParameter) bool {
			return p.isRest
		})
		if -1 < firstRest && firstRest < paramCount-1 {
			// Middle rest parameter - we can't accurately highlight, so indicate "no active parameter"
			if supportsNull {
				return &lsproto.UintegerOrNull{} // null means "no parameter is active"
			}
			// Client doesn't support null, use out-of-range index (defaults to 0 per LSP spec)
			return &lsproto.UintegerOrNull{Uinteger: new(uint32(paramCount))}
		}
		// Clamp to last parameter for trailing rest parameters
		if activeParam > uint32(paramCount-1) {
			activeParam = uint32(paramCount - 1)
		}
	}

	return &lsproto.UintegerOrNull{Uinteger: new(activeParam)}
}

func (l *LanguageService) getSignatureHelpItem(candidate *checker.Signature, isTypeParameterList bool, callTargetSymbol string, enclosingDeclaration *ast.Node, sourceFile *ast.SourceFile, c *checker.Checker, docFormat lsproto.MarkupKind) []signatureInformation {
	var infos []*signatureHelpItemInfo
	if isTypeParameterList {
		infos = l.itemInfoForTypeParameters(candidate, c, enclosingDeclaration, sourceFile, docFormat)
	} else {
		infos = l.itemInfoForParameters(candidate, c, enclosingDeclaration, sourceFile, docFormat)
	}

	suffixDisplayParts := returnTypeToDisplayParts(candidate, c)

	// Generate documentation from the signature's declaration
	var documentation *string
	if declaration := candidate.Declaration(); declaration != nil {
		doc := l.getDocumentationFromDeclaration(c, nil, declaration, nil, docFormat, true /*commentOnly*/)
		if doc != "" {
			documentation = &doc
		}
	}

	result := make([]signatureInformation, len(infos))
	for i, info := range infos {
		var display strings.Builder
		display.WriteString(callTargetSymbol)
		display.WriteString(info.displayParts)
		display.WriteString(suffixDisplayParts)
		result[i] = signatureInformation{
			Label:         display.String(),
			Documentation: documentation,
			Parameters:    info.parameters,
			IsVariadic:    info.isVariadic,
		}
	}
	return result
}

func returnTypeToDisplayParts(candidateSignature *checker.Signature, c *checker.Checker) string {
	var returnType strings.Builder
	returnType.WriteString(": ")
	predicate := c.GetTypePredicateOfSignature(candidateSignature)
	if predicate != nil {
		returnType.WriteString(c.TypePredicateToString(predicate))
	} else {
		returnType.WriteString(c.TypeToString(c.GetReturnTypeOfSignature(candidateSignature)))
	}
	return returnType.String()
}

func (l *LanguageService) itemInfoForTypeParameters(candidateSignature *checker.Signature, c *checker.Checker, enclosingDeclaration *ast.Node, sourceFile *ast.SourceFile, docFormat lsproto.MarkupKind) []*signatureHelpItemInfo {
	printer := printer.NewPrinter(printer.PrinterOptions{NewLine: core.NewLineKindLF}, printer.PrintHandlers{}, nil)

	var typeParameters []*checker.Type
	if candidateSignature.Target() != nil {
		typeParameters = candidateSignature.Target().TypeParameters()
	} else {
		typeParameters = candidateSignature.TypeParameters()
	}
	signatureHelpTypeParameters := make([]signatureHelpParameter, len(typeParameters))
	for i, typeParameter := range typeParameters {
		signatureHelpTypeParameters[i] = createSignatureHelpParameterForTypeParameter(typeParameter, sourceFile, enclosingDeclaration, c, printer)
	}

	thisParameter := []signatureHelpParameter{}
	if candidateSignature.ThisParameter() != nil {
		thisParameter = []signatureHelpParameter{l.createSignatureHelpParameterForParameter(candidateSignature.ThisParameter(), enclosingDeclaration, printer, sourceFile, c, docFormat)}
	}

	// Creating type parameter display label
	var displayParts strings.Builder
	displayParts.WriteString(scanner.TokenToString(ast.KindLessThanToken))
	for i, typeParameter := range signatureHelpTypeParameters {
		if i > 0 {
			displayParts.WriteString(", ")
		}
		displayParts.WriteString(*typeParameter.parameterInfo.Label.String)
	}
	displayParts.WriteString(scanner.TokenToString(ast.KindGreaterThanToken))

	// Creating display label for parameters like, (a: string, b: number)
	lists := c.GetExpandedParameters(candidateSignature, false)
	if len(lists) != 0 {
		displayParts.WriteString(scanner.TokenToString(ast.KindOpenParenToken))
	}

	result := make([]*signatureHelpItemInfo, len(lists))
	for i, parameterList := range lists {
		var displayParameters strings.Builder
		displayParameters.WriteString(displayParts.String())
		parameters := thisParameter
		for j, param := range parameterList {
			parameter := l.createSignatureHelpParameterForParameter(param, enclosingDeclaration, printer, sourceFile, c, docFormat)
			parameters = append(parameters, parameter)
			if j > 0 {
				displayParameters.WriteString(", ")
			}
			displayParameters.WriteString(*parameter.parameterInfo.Label.String)
		}
		displayParameters.WriteString(scanner.TokenToString(ast.KindCloseParenToken))

		result[i] = &signatureHelpItemInfo{
			isVariadic:   false,
			parameters:   signatureHelpTypeParameters,
			displayParts: displayParameters.String(),
		}
	}
	return result
}

func (l *LanguageService) itemInfoForParameters(candidateSignature *checker.Signature, c *checker.Checker, enclosingDeclaratipn *ast.Node, sourceFile *ast.SourceFile, docFormat lsproto.MarkupKind) []*signatureHelpItemInfo {
	printer := printer.NewPrinter(printer.PrinterOptions{NewLine: core.NewLineKindLF}, printer.PrintHandlers{}, nil)

	signatureHelpTypeParameters := make([]signatureHelpParameter, len(candidateSignature.TypeParameters()))
	if len(candidateSignature.TypeParameters()) != 0 {
		for i, typeParameter := range candidateSignature.TypeParameters() {
			signatureHelpTypeParameters[i] = createSignatureHelpParameterForTypeParameter(typeParameter, sourceFile, enclosingDeclaratipn, c, printer)
		}
	}

	// Creating display label for type parameters like, <T, U>
	var displayParts strings.Builder
	if len(signatureHelpTypeParameters) != 0 {
		displayParts.WriteString(scanner.TokenToString(ast.KindLessThanToken))
		for _, typeParameter := range signatureHelpTypeParameters {
			displayParts.WriteString(*typeParameter.parameterInfo.Label.String)
		}
		displayParts.WriteString(scanner.TokenToString(ast.KindGreaterThanToken))
	}

	// Creating display parts for parameters. For example, (a: string, b: number)
	lists := c.GetExpandedParameters(candidateSignature, false)
	if len(lists) != 0 {
		displayParts.WriteString(scanner.TokenToString(ast.KindOpenParenToken))
	}

	isVariadic := func(parameterList []*ast.Symbol) bool {
		if !c.HasEffectiveRestParameter(candidateSignature) {
			return false
		}
		if len(lists) == 1 {
			return true
		}
		return len(parameterList) != 0 && parameterList[len(parameterList)-1] != nil && (parameterList[len(parameterList)-1].CheckFlags&ast.CheckFlagsRestParameter != 0)
	}

	result := make([]*signatureHelpItemInfo, len(lists))
	for i, parameterList := range lists {
		parameters := make([]signatureHelpParameter, len(parameterList))
		var displayParameters strings.Builder
		displayParameters.WriteString(displayParts.String())
		for j, param := range parameterList {
			parameter := l.createSignatureHelpParameterForParameter(param, enclosingDeclaratipn, printer, sourceFile, c, docFormat)
			parameters[j] = parameter
			if j > 0 {
				displayParameters.WriteString(", ")
			}
			displayParameters.WriteString(*parameter.parameterInfo.Label.String)
		}
		displayParameters.WriteString(scanner.TokenToString(ast.KindCloseParenToken))

		result[i] = &signatureHelpItemInfo{
			isVariadic:   isVariadic(parameterList),
			parameters:   parameters,
			displayParts: displayParameters.String(),
		}

	}
	return result
}

const signatureHelpNodeBuilderFlags = nodebuilder.FlagsOmitParameterModifiers | nodebuilder.FlagsIgnoreErrors | nodebuilder.FlagsUseAliasDefinedOutsideCurrentScope

func (l *LanguageService) createSignatureHelpParameterForParameter(parameter *ast.Symbol, enclosingDeclaratipn *ast.Node, p *printer.Printer, sourceFile *ast.SourceFile, c *checker.Checker, docFormat lsproto.MarkupKind) signatureHelpParameter {
	display := p.Emit(checker.NewNodeBuilder(c, printer.NewEmitContext()).SymbolToParameterDeclaration(parameter, enclosingDeclaratipn, signatureHelpNodeBuilderFlags, nodebuilder.InternalFlagsNone, nil), sourceFile)
	isOptional := parameter.CheckFlags&ast.CheckFlagsOptionalParameter != 0
	isRest := parameter.CheckFlags&ast.CheckFlagsRestParameter != 0
	var documentation *lsproto.StringOrMarkupContent
	if parameter.ValueDeclaration != nil {
		doc := l.getDocumentationFromDeclaration(c, nil, parameter.ValueDeclaration, nil, docFormat, true /*commentOnly*/)
		if doc != "" {
			documentation = &lsproto.StringOrMarkupContent{
				MarkupContent: &lsproto.MarkupContent{
					Kind:  docFormat,
					Value: doc,
				},
			}
		}
	}
	return signatureHelpParameter{
		parameterInfo: &lsproto.ParameterInformation{
			Label:         lsproto.StringOrTuple{String: &display},
			Documentation: documentation,
		},
		isRest:     isRest,
		isOptional: isOptional,
	}
}

func createSignatureHelpParameterForTypeParameter(t *checker.Type, sourceFile *ast.SourceFile, enclosingDeclaration *ast.Node, c *checker.Checker, p *printer.Printer) signatureHelpParameter {
	display := p.Emit(checker.NewNodeBuilder(c, printer.NewEmitContext()).TypeParameterToDeclaration(t, enclosingDeclaration, signatureHelpNodeBuilderFlags, nodebuilder.InternalFlagsNone, nil), sourceFile)
	return signatureHelpParameter{
		parameterInfo: &lsproto.ParameterInformation{
			Label: lsproto.StringOrTuple{String: &display},
		},
		isRest:     false,
		isOptional: false,
	}
}

// Represents the signature of something callable. A signature
// can have a label, like a function-name, a doc-comment, and
// a set of parameters.
type signatureInformation struct {
	// The Label of this signature. Will be shown in
	// the UI.
	Label string
	// The human-readable doc-comment of this signature. Will be shown
	// in the UI but can be omitted.
	Documentation *string
	// The Parameters of this signature.
	Parameters []signatureHelpParameter
	// Needed only here, not in lsp
	IsVariadic bool
}

type signatureHelpItemInfo struct {
	isVariadic   bool
	parameters   []signatureHelpParameter
	displayParts string
}

type signatureHelpParameter struct {
	parameterInfo *lsproto.ParameterInformation
	isRest        bool
	isOptional    bool
}

func getEnclosingDeclarationFromInvocation(invocation *invocation) *ast.Node {
	if invocation.callInvocation != nil {
		return invocation.callInvocation.node
	} else if invocation.typeArgsInvocation != nil {
		return invocation.typeArgsInvocation.called.AsNode()
	} else {
		return invocation.contextualInvocation.node
	}
}

func getExpressionFromInvocation(argumentInfo *argumentListInfo) *ast.Node {
	if argumentInfo.invocation.callInvocation != nil {
		return ast.GetInvokedExpression(argumentInfo.invocation.callInvocation.node)
	}
	return argumentInfo.invocation.typeArgsInvocation.called.AsNode()
}

type candidateInfo struct {
	candidates        []*checker.Signature
	resolvedSignature *checker.Signature
}

type CandidateOrTypeInfo struct {
	candidateInfo *candidateInfo
	typeInfo      *ast.Symbol
}

func getCandidateOrTypeInfo(info *argumentListInfo, c *checker.Checker, sourceFile *ast.SourceFile, startingToken *ast.Node, onlyUseSyntacticOwners bool) *CandidateOrTypeInfo {
	if info.invocation.callInvocation != nil {
		if onlyUseSyntacticOwners && !isSyntacticOwner(startingToken, info.invocation.callInvocation.node, sourceFile) {
			return nil
		}

		resolvedSignature, candidates := checker.GetResolvedSignatureForSignatureHelp(info.invocation.callInvocation.node, info.argumentCount, c)
		if len(candidates) == 0 {
			return nil
		}

		return &CandidateOrTypeInfo{
			candidateInfo: &candidateInfo{
				candidates:        candidates,
				resolvedSignature: resolvedSignature,
			},
		}
	}
	if info.invocation.typeArgsInvocation != nil {
		called := info.invocation.typeArgsInvocation.called.AsNode()
		container := called
		if ast.IsIdentifier(called) {
			container = called.Parent
		}

		if onlyUseSyntacticOwners && !containsPrecedingToken(startingToken, sourceFile, container) {
			return nil
		}

		candidates := getPossibleGenericSignatures(called, info.argumentCount, c)
		if len(candidates) != 0 {
			return &CandidateOrTypeInfo{
				candidateInfo: &candidateInfo{
					candidates:        candidates,
					resolvedSignature: candidates[0],
				},
			}
		}

		if symbol := c.GetSymbolAtLocation(called); symbol != nil {
			return &CandidateOrTypeInfo{
				typeInfo: symbol,
			}
		}

		// This can happen in the case of an unresolved symbol.
		return nil
	}

	if info.invocation.contextualInvocation != nil {
		return &CandidateOrTypeInfo{
			candidateInfo: &candidateInfo{
				candidates:        []*checker.Signature{info.invocation.contextualInvocation.signature},
				resolvedSignature: info.invocation.contextualInvocation.signature,
			},
		}
	}
	debug.AssertNever(info.invocation)
	return nil
}

func isSyntacticOwner(startingToken *ast.Node, node *ast.CallLikeExpression, sourceFile *ast.SourceFile) bool {
	if !ast.IsCallOrNewExpression(node) {
		return false
	}
	invocationChildren := getChildrenFromNonJSDocNode(node, sourceFile)
	switch startingToken.Kind {
	case ast.KindOpenParenToken, ast.KindCommaToken:
		return slices.Contains(invocationChildren, startingToken)
	case ast.KindLessThanToken:
		return containsPrecedingToken(startingToken, sourceFile, node.Expression())
	default:
		return false
	}
}

func containsPrecedingToken(startingToken *ast.Node, sourceFile *ast.SourceFile, container *ast.Node) bool {
	pos := startingToken.Pos()
	// There's a possibility that `startingToken.parent` contains only `startingToken` and
	// missing nodes, none of which are valid to be returned by `findPrecedingToken`. In that
	// case, the preceding token we want is actually higher up the tree—almost definitely the
	// next parent, but theoretically the situation with missing nodes might be happening on
	// multiple nested levels.
	currentParent := startingToken.Parent
	for currentParent != nil {
		precedingToken := astnav.FindPrecedingTokenEx(sourceFile, pos, currentParent, true /*excludeJSDoc*/)
		if precedingToken != nil {
			return RangeContainsRange(container.Loc, precedingToken.Loc)
		}
		currentParent = currentParent.Parent
	}
	return false
}

func getContainingArgumentInfo(node *ast.Node, sourceFile *ast.SourceFile, checker *checker.Checker, isManuallyInvoked bool, position int) *argumentListInfo {
	for n := node; !ast.IsSourceFile(n) && (isManuallyInvoked || !ast.IsBlock(n)); n = n.Parent {
		// If the node is not a subspan of its parent, this is a big problem.
		// There have been crashes that might be caused by this violation.
		debug.Assert(RangeContainsRange(n.Parent.Loc, n.Loc), fmt.Sprintf("Not a subspan. Child: %s, parent: %s", n.KindString(), n.Parent.KindString()))
		argumentInfo := getImmediatelyContainingArgumentOrContextualParameterInfo(n, position, sourceFile, checker)
		if argumentInfo != nil {
			return argumentInfo
		}
	}
	return nil
}

func getImmediatelyContainingArgumentOrContextualParameterInfo(node *ast.Node, position int, sourceFile *ast.SourceFile, checker *checker.Checker) *argumentListInfo {
	result := tryGetParameterInfo(node, sourceFile, checker)
	if result == nil {
		return getImmediatelyContainingArgumentInfo(node, position, sourceFile, checker)
	}
	return result
}

type argumentListInfo struct {
	isTypeParameterList bool
	invocation          *invocation
	argumentsSpan       core.TextRange
	argumentIndex       int
	/** argumentCount is the *apparent* number of arguments. */
	argumentCount int
}

// Returns relevant information for the argument list and the current argument if we are
// in the argument of an invocation; returns undefined otherwise.
func getImmediatelyContainingArgumentInfo(node *ast.Node, position int, sourceFile *ast.SourceFile, c *checker.Checker) *argumentListInfo {
	parent := node.Parent
	if ast.IsCallOrNewExpression(parent) {
		// There are 3 cases to handle:
		//   1. The token introduces a list, and should begin a signature help session
		//   2. The token is either not associated with a list, or ends a list, so the session should end
		//   3. The token is buried inside a list, and should give signature help
		//
		// The following are examples of each:
		//
		//    Case 1:
		//          foo<#T, U>(#a, b)    -> The token introduces a list, and should begin a signature help session
		//    Case 2:
		//          fo#o<T, U>#(a, b)#   -> The token is either not associated with a list, or ends a list, so the session should end
		//    Case 3:
		//          foo<T#, U#>(a#, #b#) -> The token is buried inside a list, and should give signature help
		// Find out if 'node' is an argument, a type argument, or neither
		info := getArgumentOrParameterListInfo(node, sourceFile, c)
		if info == nil {
			return nil
		}
		list := info.list
		argumentIndex := info.argumentIndex
		argumentCount := info.argumentCount
		argumentsSpan := info.argumentsSpan
		isTypeParameterList := false
		parentTypeArgumentList := parent.TypeArgumentList()
		if parentTypeArgumentList != nil {
			if parentTypeArgumentList.Pos() == list.Pos() {
				isTypeParameterList = true
			}
		}
		return &argumentListInfo{
			isTypeParameterList: isTypeParameterList,
			invocation:          &invocation{callInvocation: &callInvocation{node: parent}},
			argumentsSpan:       argumentsSpan,
			argumentIndex:       argumentIndex,
			argumentCount:       argumentCount,
		}
	} else if isNoSubstitutionTemplateLiteral(node) && isTaggedTemplateExpression(parent) {
		// Check if we're actually inside the template;
		// otherwise we'll fall out and return undefined.
		if isInsideTemplateLiteral(node, position, sourceFile) {
			return getArgumentListInfoForTemplate(parent.AsTaggedTemplateExpression(), 0, sourceFile)
		}
		return nil
	} else if isTemplateHead(node) && parent.Parent.Kind == ast.KindTaggedTemplateExpression {
		templateExpression := parent.AsTemplateExpression()
		tagExpression := templateExpression.Parent.AsTaggedTemplateExpression()

		argumentIndex := 1
		if isInsideTemplateLiteral(node, position, sourceFile) {
			argumentIndex = 0
		}
		return getArgumentListInfoForTemplate(tagExpression, argumentIndex, sourceFile)
	} else if ast.IsTemplateSpan(parent) && isTaggedTemplateExpression(parent.Parent.Parent) {
		templateSpan := parent
		tagExpression := parent.Parent.Parent

		// If we're just after a template tail, don't show signature help.
		if isTemplateTail(node) && !isInsideTemplateLiteral(node, position, sourceFile) {
			return nil
		}

		spanIndex := ast.IndexOfNode(templateSpan.Parent.AsTemplateExpression().TemplateSpans.Nodes, templateSpan)
		argumentIndex := getArgumentIndexForTemplatePiece(spanIndex, templateSpan, position, sourceFile)

		return getArgumentListInfoForTemplate(tagExpression.AsTaggedTemplateExpression(), argumentIndex, sourceFile)
	} else if ast.IsJsxOpeningLikeElement(parent) {
		// Provide a signature help for JSX opening element or JSX self-closing element.
		// This is not guarantee that JSX tag-name is resolved into stateless function component. (that is done in "getSignatureHelpItems")
		// i.e
		//      export function MainButton(props: ButtonProps, context: any): JSX.Element { ... }
		//      <MainButton /*signatureHelp*/
		attributeSpanStart := parent.Attributes().Loc.Pos()
		attributeSpanEnd := scanner.SkipTrivia(sourceFile.Text(), parent.Attributes().End())
		return &argumentListInfo{
			isTypeParameterList: false,
			invocation:          &invocation{callInvocation: &callInvocation{node: parent}},
			argumentsSpan:       core.NewTextRange(attributeSpanStart, attributeSpanEnd-attributeSpanStart),
			argumentIndex:       0,
			argumentCount:       1,
		}
	} else {
		typeArgInfo := getPossibleTypeArgumentsInfo(node, sourceFile)
		if typeArgInfo != nil {
			called := typeArgInfo.called
			nTypeArguments := typeArgInfo.nTypeArguments
			invoc := &typeArgsInvocation{called: called.AsIdentifier()}
			argumentRange := core.NewTextRange(called.Loc.Pos(), node.End())
			return &argumentListInfo{
				isTypeParameterList: true,
				invocation: &invocation{
					typeArgsInvocation: invoc,
				},
				argumentsSpan: argumentRange,
				argumentIndex: nTypeArguments,
				argumentCount: nTypeArguments + 1,
			}
		}
	}
	return nil
}

// spanIndex is either the index for a given template span.
// This does not give appropriate results for a NoSubstitutionTemplateLiteral
func getArgumentIndexForTemplatePiece(spanIndex int, node *ast.Node, position int, sourceFile *ast.SourceFile) int {
	// Because the TemplateStringsArray is the first argument, we have to offset each substitution expression by 1.
	// There are three cases we can encounter:
	//      1. We are precisely in the template literal (argIndex = 0).
	//      2. We are in or to the right of the substitution expression (argIndex = spanIndex + 1).
	//      3. We are directly to the right of the template literal, but because we look for the token on the left,
	//          not enough to put us in the substitution expression; we should consider ourselves part of
	//          the *next* span's expression by offsetting the index (argIndex = (spanIndex + 1) + 1).
	//
	// Example: f  `# abcd $#{#  1 + 1#  }# efghi ${ #"#hello"#  }  #  `
	//              ^       ^ ^       ^   ^          ^ ^      ^     ^
	// Case:        1       1 3       2   1          3 2      2     1
	debug.Assert(position >= node.Loc.Pos(), "Assumed 'position' could not occur before node.")
	if ast.IsTemplateLiteralToken(node) {
		if isInsideTemplateLiteral(node, position, sourceFile) {
			return 0
		}
		return spanIndex + 2
	}
	return spanIndex + 1
}

func getAdjustedNode(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindOpenParenToken, ast.KindCommaToken:
		return node
	default:
		return ast.FindAncestor(node.Parent, func(n *ast.Node) bool {
			if ast.IsParameter(n) {
				return true
			} else if ast.IsBindingElement(n) || ast.IsObjectBindingPattern(n) || ast.IsArrayBindingPattern(n) {
				return false
			}
			return false
		})
	}
}

type contextualSignatureLocationInfo struct {
	contextualType *checker.Type
	argumentIndex  int
	argumentCount  int
	argumentsSpan  core.TextRange
}

func getSpreadElementCount(node *ast.SpreadElement, c *checker.Checker) int {
	spreadType := c.GetTypeAtLocation(node.Expression)
	if checker.IsTupleType(spreadType) {
		tupleType := spreadType.Target().AsTupleType()
		if tupleType == nil {
			return 0
		}
		elementFlags := tupleType.ElementFlags()
		fixedLength := tupleType.FixedLength()
		if fixedLength == 0 {
			return 0
		}

		firstOptionalIndex := core.FindIndex(elementFlags, func(f checker.ElementFlags) bool {
			return (f&checker.ElementFlagsRequired == 0)
		})
		if firstOptionalIndex < 0 {
			return fixedLength
		}
		return firstOptionalIndex
	}
	return 0
}

func getArgumentIndex(node *ast.Node, arguments *ast.NodeList, sourceFile *ast.SourceFile, c *checker.Checker) int {
	return getArgumentIndexOrCount(getTokenFromNodeList(arguments, node.Parent, sourceFile), node, c)
}

func getArgumentCount(node *ast.Node, arguments *ast.NodeList, sourceFile *ast.SourceFile, c *checker.Checker) int {
	return getArgumentIndexOrCount(getTokenFromNodeList(arguments, node.Parent, sourceFile), nil, c)
}

func getArgumentIndexOrCount(arguments []*ast.Node, node *ast.Node, c *checker.Checker) int {
	argumentIndex := 0
	skipComma := false
	for _, arg := range arguments {
		if node != nil && arg == node {
			if !skipComma && arg.Kind == ast.KindCommaToken {
				argumentIndex++
			}
			return argumentIndex
		}
		if ast.IsSpreadElement(arg) {
			argumentIndex += getSpreadElementCount(arg.AsSpreadElement(), c)
			skipComma = true
			continue
		}
		if arg.Kind != ast.KindCommaToken {
			argumentIndex++
			skipComma = true
			continue
		}
		if skipComma {
			skipComma = false
			continue
		}
		argumentIndex++
	}
	if node != nil {
		return argumentIndex
	}
	// The argument count for a list is normally the number of non-comma children it has.
	// For example, if you have "Foo(a,b)" then there will be three children of the arg
	// list 'a' '<comma>' 'b'. So, in this case the arg count will be 2. However, there
	// is a small subtlety. If you have "Foo(a,)", then the child list will just have
	// 'a' '<comma>'. So, in the case where the last child is a comma, we increase the
	// arg count by one to compensate.
	argumentCount := argumentIndex
	if len(arguments) > 0 && arguments[len(arguments)-1].Kind == ast.KindCommaToken {
		argumentCount = argumentIndex + 1
	}
	return argumentCount
}

type argumentOrParameterListInfo struct {
	list          *ast.NodeList
	argumentIndex int
	argumentCount int
	argumentsSpan core.TextRange
}

func getArgumentOrParameterListInfo(node *ast.Node, sourceFile *ast.SourceFile, c *checker.Checker) *argumentOrParameterListInfo {
	info := getArgumentOrParameterListAndIndex(node, sourceFile, c)
	if info == nil {
		return nil
	}
	list := info.list
	argumentIndex := info.argumentIndex
	argumentCount := getArgumentCount(node, list, sourceFile, c)
	argumentsSpan := getApplicableSpanForArguments(list, node, sourceFile)
	return &argumentOrParameterListInfo{
		list:          list,
		argumentIndex: argumentIndex,
		argumentCount: argumentCount,
		argumentsSpan: argumentsSpan,
	}
}

func getApplicableSpanForArguments(argumentList *ast.NodeList, node *ast.Node, sourceFile *ast.SourceFile) core.TextRange {
	// We use full start and skip trivia on the end because we want to include trivia on
	// both sides. For example,
	//
	//    foo(   /*comment */     a, b, c      /*comment*/     )
	//        |                                               |
	//
	// The applicable span is from the first bar to the second bar (inclusive,
	// but not including parentheses)
	if argumentList == nil && node != nil {
		// If the user has just opened a list, and there are no arguments.
		// For example, foo(    )
		//                  |  |
		return core.NewTextRange(node.End(), scanner.SkipTrivia(sourceFile.Text(), node.End()))
	}
	applicableSpanStart := argumentList.Pos()
	applicableSpanEnd := scanner.SkipTrivia(sourceFile.Text(), argumentList.End())
	return core.NewTextRange(applicableSpanStart, applicableSpanEnd)
}

type argumentOrParameterListAndIndex struct {
	list          *ast.NodeList
	argumentIndex int
}

func getArgumentOrParameterListAndIndex(node *ast.Node, sourceFile *ast.SourceFile, c *checker.Checker) *argumentOrParameterListAndIndex {
	if node.Kind == ast.KindLessThanToken || node.Kind == ast.KindOpenParenToken {
		// Find the list that starts right *after* the < or ( token.
		// If the user has just opened a list, consider this item 0.
		list := getChildListThatStartsWithOpenerToken(node.Parent, node)
		return &argumentOrParameterListAndIndex{
			list:          list,
			argumentIndex: 0,
		}
	} else {
		// findListItemInfo can return undefined if we are not in parent's argument list
		// or type argument list. This includes cases where the cursor is:
		//   - To the right of the closing parenthesis, non-substitution template, or template tail.
		//   - Between the type arguments and the arguments (greater than token)
		//   - On the target of the call (parent.func)
		//   - On the 'new' keyword in a 'new' expression
		list := findContainingList(node, sourceFile)
		if list == nil {
			return nil
		}
		return &argumentOrParameterListAndIndex{
			list: list,
			// Find the index of the argument that contains the node.
			argumentIndex: getArgumentIndex(node, list, sourceFile, c),
		}
	}
}

func getChildListThatStartsWithOpenerToken(parent *ast.Node, openerToken *ast.Node) *ast.NodeList {
	if ast.IsCallExpression(parent) {
		parentCallExpression := parent.AsCallExpression()
		if openerToken.Kind == ast.KindLessThanToken {
			return parentCallExpression.TypeArgumentList()
		}
		return parentCallExpression.Arguments
	} else if ast.IsNewExpression(parent) {
		parentNewExpression := parent.AsNewExpression()
		if openerToken.Kind == ast.KindLessThanToken {
			return parentNewExpression.TypeArgumentList()
		}
		return parentNewExpression.Arguments
	}
	return nil
}

func tryGetParameterInfo(startingToken *ast.Node, sourceFile *ast.SourceFile, c *checker.Checker) *argumentListInfo {
	node := getAdjustedNode(startingToken)
	if node == nil {
		return nil
	}
	info := getContextualSignatureLocationInfo(node, sourceFile, c)
	if info == nil {
		return nil
	}

	// for optional function condition
	nonNullableContextualType := c.GetNonNullableType(info.contextualType)
	if nonNullableContextualType == nil {
		return nil
	}

	symbol := nonNullableContextualType.Symbol()
	if symbol == nil {
		return nil
	}

	signatures := c.GetSignaturesOfType(nonNullableContextualType, checker.SignatureKindCall)
	if len(signatures) == 0 {
		return nil
	}
	signature := signatures[len(signatures)-1]

	contextualInvocation := &contextualInvocation{
		signature: signature,
		node:      startingToken,
		symbol:    chooseBetterSymbol(symbol),
	}
	return &argumentListInfo{
		isTypeParameterList: false,
		invocation:          &invocation{contextualInvocation: contextualInvocation},
		argumentsSpan:       info.argumentsSpan,
		argumentIndex:       info.argumentIndex,
		argumentCount:       info.argumentCount,
	}
}

func chooseBetterSymbol(s *ast.Symbol) *ast.Symbol {
	if s.Name == ast.InternalSymbolNameType {
		for _, d := range s.Declarations {
			if ast.IsFunctionTypeNode(d) && ast.CanHaveSymbol(d.Parent) {
				return d.Parent.Symbol()
			}
		}
	}
	return s
}

func getContextualSignatureLocationInfo(node *ast.Node, sourceFile *ast.SourceFile, c *checker.Checker) *contextualSignatureLocationInfo {
	parent := node.Parent
	switch parent.Kind {
	case ast.KindParenthesizedExpression, ast.KindMethodDeclaration, ast.KindFunctionExpression, ast.KindArrowFunction:
		info := getArgumentOrParameterListInfo(node, sourceFile, c)
		if info == nil {
			return nil
		}
		argumentIndex := info.argumentIndex
		argumentCount := info.argumentCount
		argumentsSpan := info.argumentsSpan

		var contextualType *checker.Type
		if ast.IsMethodDeclaration(parent) {
			contextualType = c.GetContextualTypeForObjectLiteralElement(parent, checker.ContextFlagsNone)
		} else {
			contextualType = c.GetContextualType(parent, checker.ContextFlagsNone)
		}
		if contextualType != nil {
			return &contextualSignatureLocationInfo{
				contextualType: contextualType,
				argumentIndex:  argumentIndex,
				argumentCount:  argumentCount,
				argumentsSpan:  argumentsSpan,
			}
		}
		return nil
	case ast.KindBinaryExpression:
		highestBinary := getHighestBinary(parent.AsBinaryExpression())
		contextualType := c.GetContextualType(highestBinary.AsNode(), checker.ContextFlagsNone)
		argumentIndex := 0
		if node.Kind != ast.KindOpenParenToken {
			argumentIndex = countBinaryExpressionParameters(parent.AsBinaryExpression()) - 1
			argumentCount := countBinaryExpressionParameters(highestBinary)
			if contextualType != nil {
				return &contextualSignatureLocationInfo{
					contextualType: contextualType,
					argumentIndex:  argumentIndex,
					argumentCount:  argumentCount,
					argumentsSpan:  core.NewTextRange(parent.Pos(), parent.End()),
				}
			}
			return nil
		}
	}
	return nil
}

func getHighestBinary(b *ast.BinaryExpression) *ast.BinaryExpression {
	if ast.IsBinaryExpression(b.Parent) {
		return getHighestBinary(b.Parent.AsBinaryExpression())
	}
	return b
}

func countBinaryExpressionParameters(b *ast.BinaryExpression) int {
	if ast.IsBinaryExpression(b.Left) {
		return countBinaryExpressionParameters(b.Left.AsBinaryExpression()) + 1
	}
	return 2
}

func getTokenFromNodeList(nodeList *ast.NodeList, nodeListParent *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {
	if nodeList == nil || nodeListParent == nil {
		return nil
	}
	left := nodeList.Pos()
	nodeListIndex := 0
	var tokens []*ast.Node
	for left < nodeList.End() {
		if len(nodeList.Nodes) > nodeListIndex && left == nodeList.Nodes[nodeListIndex].Pos() {
			tokens = append(tokens, nodeList.Nodes[nodeListIndex])
			left = nodeList.Nodes[nodeListIndex].End()
			nodeListIndex++
		} else {
			scanner := scanner.GetScannerForSourceFile(sourceFile, left)
			token := scanner.Token()
			tokenFullStart := scanner.TokenFullStart()
			tokenEnd := scanner.TokenEnd()
			tokens = append(tokens, sourceFile.GetOrCreateToken(token, tokenFullStart, tokenEnd, nodeListParent, scanner.TokenFlags()))
			left = tokenEnd
		}
	}
	return tokens
}

func getArgumentListInfoForTemplate(tagExpression *ast.TaggedTemplateExpression, argumentIndex int, sourceFile *ast.SourceFile) *argumentListInfo {
	// argumentCount is either 1 or (numSpans + 1) to account for the template strings array argument.
	argumentCount := 1
	if !isNoSubstitutionTemplateLiteral(tagExpression.Template) {
		argumentCount = len(tagExpression.Template.AsTemplateExpression().TemplateSpans.Nodes) + 1
	}
	if argumentIndex != 0 {
		debug.AssertLessThan(argumentIndex, argumentCount)
	}
	return &argumentListInfo{
		isTypeParameterList: false,
		invocation:          &invocation{callInvocation: &callInvocation{node: tagExpression.AsNode()}},
		argumentIndex:       argumentIndex,
		argumentCount:       argumentCount,
		argumentsSpan:       getApplicableRangeForTaggedTemplate(tagExpression, sourceFile),
	}
}

func getApplicableRangeForTaggedTemplate(taggedTemplate *ast.TaggedTemplateExpression, sourceFile *ast.SourceFile) core.TextRange {
	template := taggedTemplate.Template
	applicableSpanStart := scanner.GetTokenPosOfNode(template, sourceFile, false)
	applicableSpanEnd := template.End()

	// We need to adjust the end position for the case where the template does not have a tail.
	// Otherwise, we will not show signature help past the expression.
	// For example,
	//
	//      ` ${ 1 + 1 foo(10)
	//       |       |
	// This is because a Missing node has no width. However, what we actually want is to include trivia
	// leading up to the next token in case the user is about to type in a TemplateMiddle or TemplateTail.
	if template.Kind == ast.KindTemplateExpression {
		templateSpans := template.AsTemplateExpression().TemplateSpans
		lastSpan := templateSpans.Nodes[len(templateSpans.Nodes)-1]
		if lastSpan.AsTemplateSpan().Literal.End()-lastSpan.AsTemplateSpan().Literal.Pos() == 0 {
			applicableSpanEnd = scanner.SkipTrivia(sourceFile.Text(), applicableSpanEnd)
		}
	}

	return core.NewTextRange(applicableSpanStart, applicableSpanEnd-applicableSpanStart)
}
