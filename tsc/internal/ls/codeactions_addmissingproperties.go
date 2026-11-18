package ls

import (
	"context"
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/astnav"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/ls/change"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
)

const fixMissingProperties = "fixMissingProperties"

type addMissingPropertiesFixer struct {
	sourceFile  *ast.SourceFile
	typeChecker *checker.Checker
}

type missingProperties struct {
	declaration *ast.Node
	properties  []*ast.Symbol
}

var addMissingPropertiesErrorCodes = []int32{
	diagnostics.Property_0_is_missing_in_type_1_but_required_in_type_2.Code(),
	diagnostics.Type_0_is_missing_the_following_properties_from_type_1_Colon_2.Code(),
	diagnostics.Type_0_is_missing_the_following_properties_from_type_1_Colon_2_and_3_more.Code(),
	diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1.Code(),
	diagnostics.Type_0_is_not_assignable_to_type_1.Code(),
	diagnostics.Type_0_does_not_satisfy_the_expected_type_1.Code(),
}

var AddMissingPropertiesFixProvider = &CodeFixProvider{
	ErrorCodes:        addMissingPropertiesErrorCodes,
	GetCodeActions:    getCodeActionsToAddMissingProperties,
	FixIds:            []string{fixMissingProperties},
	GetAllCodeActions: getAllCodeActionsToAddMissingProperties,
}

func getCodeActionsToAddMissingProperties(ctx context.Context, fixContext *CodeFixContext) ([]*CodeAction, error) {
	typeChecker, done := fixContext.Program.GetTypeCheckerForFile(ctx, fixContext.SourceFile)
	defer done()

	fix := addMissingPropertiesFixer{
		sourceFile:  fixContext.SourceFile,
		typeChecker: typeChecker,
	}

	declaration, properties := fix.getInfo(fixContext.Span.Pos(), fixContext.ErrorCode)
	if len(properties) == 0 {
		return nil, nil
	}

	tracker := change.NewTracker(ctx, fixContext.Program.Options(), fixContext.LS.FormatOptions(), fixContext.LS.converters)
	importAdder, err := fixContext.LS.createImportAdder(ctx, typeChecker, fixContext.SourceFile)
	if err != nil {
		return nil, err
	}

	loc := locale.FromContext(ctx)
	fixer := newMissingMemberFixer(tracker, fixContext.Program, typeChecker, fixContext.LS.UserPreferences(), importAdder, loc)
	fix.addChanges(fixer, declaration, properties)

	fixer.addImports()
	if importAdder != nil {
		importAdder.WriteFixes(tracker)
	}
	changes := getCodeFixChanges(fixContext.SourceFile, tracker)
	if len(changes) == 0 {
		return nil, nil
	}

	return []*CodeAction{{
		Description:       diagnostics.Add_missing_properties.Localize(loc),
		Changes:           changes,
		FixID:             fixMissingProperties,
		FixAllDescription: diagnostics.Add_all_missing_properties.Localize(loc),
	}}, nil
}

func getAllCodeActionsToAddMissingProperties(ctx context.Context, fixContext *CodeFixContext, fixAll *CodeFixAll) (*CombinedCodeActions, error) {
	fix := addMissingPropertiesFixer{
		sourceFile:  fixContext.SourceFile,
		typeChecker: fixAll.typeChecker,
	}

	var fixes []missingProperties
	var seen collections.Set[*ast.Node]
	for _, diagnostic := range fixAll.diagnostics {
		if diagnostic.File() == fixContext.SourceFile && isFixableDiagnostic(diagnostic, addMissingPropertiesErrorCodes) {
			declaration, properties := fix.getInfo(diagnostic.Pos(), diagnostic.Code())
			if len(properties) > 0 && seen.AddIfAbsent(declaration) {
				fixes = append(fixes, missingProperties{declaration: declaration, properties: properties})
			}
		}
	}

	if len(fixes) == 0 {
		return nil, nil
	}

	importAdder, err := fixAll.getImportAdder(ctx, fixContext)
	if err != nil {
		return nil, err
	}

	tracker := change.NewTracker(ctx, fixContext.Program.Options(), fixContext.LS.FormatOptions(), fixContext.LS.converters)
	loc := locale.FromContext(ctx)
	fixer := newMissingMemberFixer(tracker, fixContext.Program, fixAll.typeChecker, fixContext.LS.UserPreferences(), importAdder, loc)
	fix.addAllChanges(fixer, fixes)

	changes := getCodeFixChanges(fixContext.SourceFile, tracker)
	if len(changes) == 0 {
		return nil, nil
	}
	fixer.addImports()

	return &CombinedCodeActions{
		Description: diagnostics.Add_all_missing_properties.Localize(loc),
		Changes:     changes,
	}, nil
}

func (fix *addMissingPropertiesFixer) getInfo(pos int, errorCode int32) (*ast.Node, []*ast.Symbol) {
	token := astnav.GetTokenAtPosition(fix.sourceFile, pos)
	if token == nil || token.Parent == nil {
		return nil, nil
	}

	parent := token.Parent
	if errorCode == diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1.Code() || ast.IsObjectLiteralExpression(parent) && ast.IsCallExpression(parent.Parent) {
		if !(token.Kind == ast.KindOpenBraceToken && ast.IsObjectLiteralExpression(parent) && ast.IsCallExpression(parent.Parent)) {
			return nil, nil
		}
		argumentIndex := slices.Index(parent.Parent.Arguments(), parent)
		if argumentIndex < 0 {
			return nil, nil
		}
		signature := fix.typeChecker.GetResolvedSignature(parent.Parent)
		if signature == nil || signature.Declaration() == nil || len(signature.Parameters()) == 0 {
			return nil, nil
		}
		parameterIndex := argumentIndex
		if signature.HasRestParameter() {
			parameterIndex = min(parameterIndex, len(signature.Parameters())-1)
		}
		if parameterIndex >= len(signature.Parameters()) {
			return nil, nil
		}
		parameter := signature.Parameters()[parameterIndex].ValueDeclaration()
		if parameter == nil || !ast.IsParameterDeclaration(parameter) || !ast.IsIdentifier(parameter.Name()) {
			return nil, nil
		}
	}

	var literal *ast.Node
	var targetType *checker.Type
	if token.Kind == ast.KindOpenBraceToken || ast.IsSatisfiesExpression(parent) || ast.IsReturnStatement(parent) {
		literal = parent
		if ast.IsSatisfiesExpression(parent) || ast.IsReturnStatement(parent) {
			literal = parent.Expression()
		}
		if literal == nil || !ast.IsObjectLiteralExpression(literal) {
			return nil, nil
		}
		if ast.IsSatisfiesExpression(parent) {
			targetType = fix.typeChecker.GetTypeFromTypeNode(parent.Type())
		} else {
			targetType = fix.typeChecker.GetContextualType(literal, checker.ContextFlagsNone)
		}
	} else if ast.IsIdentifier(token) && ast.HasInitializer(parent) && parent.Initializer() != nil && ast.IsObjectLiteralExpression(parent.Initializer()) {
		literal = parent.Initializer()
		targetType = core.OrElse(fix.typeChecker.GetContextualType(token, checker.ContextFlagsNone), fix.typeChecker.GetTypeAtLocation(token))
	} else {
		return nil, nil
	}

	if targetType == nil {
		return nil, nil
	}

	return literal, fix.typeChecker.GetUnmatchedProperties(fix.typeChecker.GetTypeAtLocation(literal), fix.typeChecker.GetNonNullableType(targetType), false /*requireOptionalProperties*/, false /*matchDiscriminantProperties*/)
}

func (fix *addMissingPropertiesFixer) addChanges(f *missingMemberFixer, literal *ast.Node, properties []*ast.Symbol) {
	factory := f.changeTracker.NodeFactory
	quotePreference := lsutil.GetQuotePreference(fix.sourceFile, f.preferences)
	members := append([]*ast.Node{}, literal.AsObjectLiteralExpression().Properties.Nodes...)
	members = append(members, fix.createMissingProperties(f, literal, properties, quotePreference)...)
	fix.replaceObjectLiteral(f, literal, factory.NewObjectLiteralExpression(factory.NewNodeList(members), true /*multiLine*/))
}

func (fix *addMissingPropertiesFixer) addAllChanges(f *missingMemberFixer, fixes []missingProperties) {
	factory := f.changeTracker.NodeFactory
	quotePreference := lsutil.GetQuotePreference(fix.sourceFile, f.preferences)
	for _, info := range fixes {
		members := fix.createMissingProperties(f, info.declaration, info.properties, quotePreference)
		properties := info.declaration.AsObjectLiteralExpression().Properties
		if len(properties.Nodes) == 0 {
			fix.replaceObjectLiteral(f, info.declaration, factory.NewObjectLiteralExpression(factory.NewNodeList(members), true /*multiLine*/))
		} else {
			f.changeTracker.InsertNodesInListAfter(fix.sourceFile, properties.Nodes[len(properties.Nodes)-1], members, properties)
		}
	}
}

func (fix *addMissingPropertiesFixer) createMissingProperties(f *missingMemberFixer, literal *ast.Node, properties []*ast.Symbol, quotePreference lsutil.QuotePreference) []*ast.Node {
	factory := f.changeTracker.NodeFactory
	members := make([]*ast.Node, 0, len(properties))
	for _, property := range properties {
		initializer := f.tryGetValueFromType(f.typeChecker.GetTypeOfSymbol(property), literal, fix.sourceFile, quotePreference, nil /*typeStack*/)
		members = append(members, factory.NewPropertyAssignment(nil /*modifiers*/, f.createPropertyNameFromSymbol(property, literal, quotePreference), nil /*postfixToken*/, nil /*typeNode*/, initializer))
	}
	return members
}

func (fix *addMissingPropertiesFixer) replaceObjectLiteral(f *missingMemberFixer, literal *ast.Node, replacement *ast.Node) {
	var options *change.NodeOptions
	if ast.IsReturnStatement(literal.Parent) || ast.IsYieldExpression(literal.Parent) {
		indentation := 0
		options = &change.NodeOptions{
			LeadingTriviaOption:  change.LeadingTriviaOptionExclude,
			TrailingTriviaOption: change.TrailingTriviaOptionExclude,
			Indentation:          &indentation,
		}
	}

	f.changeTracker.ReplaceNode(fix.sourceFile, literal, replacement, options)
}
