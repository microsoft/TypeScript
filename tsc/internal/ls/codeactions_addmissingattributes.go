package ls

import (
	"context"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/astnav"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/ls/change"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
)

const fixMissingAttributes = "fixMissingAttributes"

type addMissingJsxAttributesFixer struct {
	sourceFile  *ast.SourceFile
	typeChecker *checker.Checker
}

var AddMissingJsxAttributesFixProvider = &CodeFixProvider{
	ErrorCodes:        addMissingPropertiesErrorCodes,
	GetCodeActions:    getCodeActionsToAddMissingJsxAttributes,
	FixIds:            []string{fixMissingAttributes},
	GetAllCodeActions: getAllCodeActionsToAddMissingJsxAttributes,
}

func getCodeActionsToAddMissingJsxAttributes(ctx context.Context, fixContext *CodeFixContext) ([]*CodeAction, error) {
	typeChecker, done := fixContext.Program.GetTypeCheckerForFile(ctx, fixContext.SourceFile)
	defer done()
	fix := addMissingJsxAttributesFixer{
		sourceFile:  fixContext.SourceFile,
		typeChecker: typeChecker,
	}

	declaration, properties := fix.getInfo(fixContext.Span.Pos())
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
		Description:       diagnostics.Add_missing_attributes.Localize(loc),
		Changes:           changes,
		FixID:             fixMissingAttributes,
		FixAllDescription: diagnostics.Add_all_missing_attributes.Localize(loc),
	}}, nil
}

func getAllCodeActionsToAddMissingJsxAttributes(ctx context.Context, fixContext *CodeFixContext, fixAll *CodeFixAll) (*CombinedCodeActions, error) {
	fix := addMissingJsxAttributesFixer{
		sourceFile:  fixContext.SourceFile,
		typeChecker: fixAll.typeChecker,
	}

	var fixes []missingProperties
	var seen collections.Set[*ast.Node]
	for _, diagnostic := range fixAll.diagnostics {
		if diagnostic.File() == fixContext.SourceFile && isFixableDiagnostic(diagnostic, addMissingPropertiesErrorCodes) {
			declaration, properties := fix.getInfo(diagnostic.Pos())
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
	for _, info := range fixes {
		fix.addChanges(fixer, info.declaration, info.properties)
	}

	changes := getCodeFixChanges(fixContext.SourceFile, tracker)
	if len(changes) == 0 {
		return nil, nil
	}
	fixer.addImports()

	return &CombinedCodeActions{
		Description: diagnostics.Add_all_missing_attributes.Localize(loc),
		Changes:     changes,
	}, nil
}

func (fix *addMissingJsxAttributesFixer) getInfo(pos int) (*ast.Node, []*ast.Symbol) {
	token := astnav.GetTokenAtPosition(fix.sourceFile, pos)
	if token == nil || !ast.IsIdentifier(token) || token.Parent == nil || !ast.IsJsxOpeningLikeElement(token.Parent) {
		return nil, nil
	}

	declaration := token.Parent
	attributes := declaration.Attributes()
	targetType := fix.typeChecker.GetContextualType(attributes, checker.ContextFlagsNone)
	if targetType == nil {
		return nil, nil
	}

	sourceType := fix.typeChecker.GetJsxAttributesType(attributes)
	return declaration, core.Filter(fix.typeChecker.GetPropertiesOfType(targetType), func(property *ast.Symbol) bool {
		sourceProperty := fix.typeChecker.GetPropertyOfType(sourceType, property.Name())
		return scanner.IsIdentifierText(property.Name(), core.LanguageVariantJSX) && property.Flags()&ast.SymbolFlagsOptional == 0 && property.CheckFlags()&ast.CheckFlagsPartial == 0 &&
			(sourceProperty == nil || sourceProperty.Flags()&ast.SymbolFlagsOptional != 0 || sourceProperty.CheckFlags()&ast.CheckFlagsPartial != 0)
	})
}

func (fix *addMissingJsxAttributesFixer) addChanges(f *missingMemberFixer, declaration *ast.Node, properties []*ast.Symbol) {
	sourceFile := fix.sourceFile
	factory := f.changeTracker.NodeFactory
	attributes := declaration.Attributes()
	quotePreference := lsutil.GetQuotePreference(sourceFile, f.preferences)

	var members []*ast.Node
	for _, property := range properties {
		initializer := f.tryGetValueFromType(f.typeChecker.GetTypeOfSymbol(property), declaration, sourceFile, quotePreference, nil /*typeStack*/)
		name := factory.NewIdentifier(property.Name())
		attribute := factory.NewJsxAttribute(name, factory.NewJsxExpression(nil /*dotDotDotToken*/, initializer))
		name.Parent = attribute
		members = append(members, attribute)
	}

	pos := attributes.End()
	if core.Some(attributes.Properties(), ast.IsJsxSpreadAttribute) {
		pos = attributes.Pos()
	}

	f.changeTracker.InsertNodeAt(sourceFile, core.TextPos(pos), factory.NewJsxAttributes(factory.NewNodeList(members)), change.NodeOptions{Prefix: " "})
}
