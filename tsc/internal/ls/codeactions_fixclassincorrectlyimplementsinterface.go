package ls

import (
	"context"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/locale"
	"github.com/microsoft/typescript-go/internal/ls/autoimport"
	"github.com/microsoft/typescript-go/internal/ls/change"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/scanner"
)

const fixClassIncorrectlyImplementsInterfaceFixID = "fixClassIncorrectlyImplementsInterface"

var fixClassIncorrectlyImplementsInterfaceErrorCodes = []int32{
	diagnostics.Class_0_incorrectly_implements_interface_1.Code(),
	diagnostics.Class_0_incorrectly_implements_class_1_Did_you_mean_to_extend_1_and_inherit_its_members_as_a_subclass.Code(),
}

var FixClassIncorrectlyImplementsInterfaceProvider = &CodeFixProvider{
	ErrorCodes:        fixClassIncorrectlyImplementsInterfaceErrorCodes,
	GetCodeActions:    getCodeActionsToFixClassIncorrectlyImplementsInterface,
	FixIds:            []string{fixClassIncorrectlyImplementsInterfaceFixID},
	GetAllCodeActions: getAllCodeActionsToFixClassIncorrectlyImplementsInterface,
}

func getCodeActionsToFixClassIncorrectlyImplementsInterface(context context.Context, fixContext *CodeFixContext) ([]*CodeAction, error) {
	classDeclaration := getClass(fixContext.SourceFile, fixContext.Span)
	if classDeclaration == nil {
		return nil, nil
	}

	implementsTypes := ast.GetImplementsTypeNodes(classDeclaration)
	locale := locale.FromContext(context)

	typeChecker, done := fixContext.Program.GetTypeCheckerForFile(context, fixContext.SourceFile)
	defer done()

	var actions []*CodeAction
	for _, implementedTypeNode := range implementsTypes {
		changeTracker := change.NewTracker(context, fixContext.Program.Options(), fixContext.LS.FormatOptions(), fixContext.LS.converters)
		importAdder, err := createImportAdder(context, fixContext, typeChecker)
		if err != nil {
			return nil, err
		}

		addChanges(context, fixContext, changeTracker, importAdder, typeChecker, classDeclaration, implementedTypeNode)
		changes := getChanges(changeTracker, importAdder, fixContext.SourceFile)
		if len(changes) == 0 {
			continue
		}

		actions = append(actions, &CodeAction{
			Description:       diagnostics.Implement_interface_0.Localize(locale, scanner.GetTextOfNode(implementedTypeNode)),
			Changes:           changes,
			FixID:             fixClassIncorrectlyImplementsInterfaceFixID,
			FixAllDescription: diagnostics.Implement_all_unimplemented_interfaces.Localize(locale),
		})
	}
	return actions, nil
}

func getAllCodeActionsToFixClassIncorrectlyImplementsInterface(context context.Context, fixContext *CodeFixContext) (*CombinedCodeActions, error) {
	typeChecker, done := fixContext.Program.GetTypeCheckerForFile(context, fixContext.SourceFile)
	defer done()

	changeTracker := change.NewTracker(context, fixContext.Program.Options(), fixContext.LS.FormatOptions(), fixContext.LS.converters)
	importAdder, err := createImportAdder(context, fixContext, typeChecker)
	if err != nil {
		return nil, err
	}

	seenClassDeclarations := collections.Set[*ast.Node]{}

	for _, diag := range getAllDiagnostics(context, fixContext.Program, fixContext.SourceFile) {
		if containsErrorCode(fixClassIncorrectlyImplementsInterfaceErrorCodes, diag.Code()) {
			classDeclaration := getClass(fixContext.SourceFile, core.NewTextRange(diag.Pos(), diag.End()))
			if classDeclaration == nil {
				continue
			}
			if seenClassDeclarations.AddIfAbsent(classDeclaration) {
				implementsTypes := ast.GetImplementsTypeNodes(classDeclaration)
				for _, implementedTypeNode := range implementsTypes {
					addChanges(context, fixContext, changeTracker, importAdder, typeChecker, classDeclaration, implementedTypeNode)
				}
			}
		}
	}

	changes := getChanges(changeTracker, importAdder, fixContext.SourceFile)
	if len(changes) == 0 {
		return nil, nil
	}

	return &CombinedCodeActions{
		Description: diagnostics.Implement_all_unimplemented_interfaces.Localize(locale.FromContext(context)),
		Changes:     changes,
	}, nil
}

func addChanges(context context.Context, fixContext *CodeFixContext, changeTracker *change.Tracker, importAdder autoimport.ImportAdder, typeChecker *checker.Checker, classDeclaration *ast.Node, implementedTypeNode *ast.Node) {
	missingMemberFixer := newMissingMemberFixer(changeTracker, fixContext.Program, typeChecker, fixContext.LS.UserPreferences(), importAdder, locale.FromContext(context))
	constructor := getConstructor(classDeclaration)
	implementedType := typeChecker.GetTypeAtLocation(implementedTypeNode)
	classType := typeChecker.GetTypeAtLocation(classDeclaration)

	if typeChecker.GetNumberIndexType(classType) == nil {
		member := missingMemberFixer.createIndexSignatureDeclarationFromType(classDeclaration, implementedType, typeChecker.GetNumberType())
		if member != nil {
			insertInterfaceMemberNode(changeTracker, fixContext.SourceFile, classDeclaration, constructor, member)
		}
	}

	if typeChecker.GetStringIndexType(classType) == nil {
		member := missingMemberFixer.createIndexSignatureDeclarationFromType(classDeclaration, implementedType, typeChecker.GetStringType())
		if member != nil {
			insertInterfaceMemberNode(changeTracker, fixContext.SourceFile, classDeclaration, constructor, member)
		}
	}

	missingMembers := getMissingMembers(typeChecker, classDeclaration, []*checker.Type{implementedType})
	for _, member := range missingMembers {
		memberNodes := missingMemberFixer.createMemberFromSymbol(member, classDeclaration, fixContext.SourceFile, nil /*body*/, preserveOptionalFlagsAll)
		for _, memberNode := range memberNodes {
			insertInterfaceMemberNode(changeTracker, fixContext.SourceFile, classDeclaration, constructor, memberNode)
		}
	}
}

func getChanges(changeTracker *change.Tracker, importAdder autoimport.ImportAdder, sourceFile *ast.SourceFile) []*lsproto.TextEdit {
	fileChanges := changeTracker.GetChanges()[sourceFile.FileName()]
	if importAdder != nil && importAdder.HasFixes() {
		fileChanges = append(fileChanges, importAdder.Edits()...)
	}
	return fileChanges
}

func insertInterfaceMemberNode(changeTracker *change.Tracker, sourceFile *ast.SourceFile, classDeclaration *ast.Node, constructor *ast.Node, member *ast.Node) {
	if constructor == nil {
		changeTracker.InsertMemberAtStart(sourceFile, classDeclaration, member)
	} else {
		changeTracker.InsertNodeAfter(sourceFile, constructor, member)
	}
}

func getClass(sourceFile *ast.SourceFile, span core.TextRange) *ast.Node {
	token := astnav.GetTokenAtPosition(sourceFile, span.Pos())
	if token == nil {
		return nil
	}
	return ast.GetContainingClass(token)
}

func getConstructor(classDeclaration *ast.Node) *ast.Node {
	if classDeclaration == nil || classDeclaration.MemberList() == nil {
		return nil
	}
	for _, member := range classDeclaration.MemberList().Nodes {
		if member != nil && ast.IsConstructorDeclaration(member) {
			return member
		}
	}
	return nil
}

func getMissingMembers(typeChecker *checker.Checker, classDeclaration *ast.Node, implementedTypes []*checker.Type) []*ast.Symbol {
	inheritedMembers := getInheritedMembers(typeChecker, classDeclaration)
	seenMembers := make(map[string]*ast.Symbol)

	var classMembers ast.SymbolTable
	if classDeclaration.Symbol() != nil {
		classMembers = classDeclaration.Symbol().Members
	}

	var missingMembers []*ast.Symbol
	for _, implementedType := range implementedTypes {
		for _, symbol := range typeChecker.GetPropertiesOfType(implementedType) {
			if symbol == nil {
				continue
			}
			if classMembers != nil && classMembers[symbol.Name] != nil {
				continue
			}
			if inheritedMembers[symbol.Name] != nil || seenMembers[symbol.Name] != nil {
				continue
			}
			flags := checker.GetDeclarationModifierFlagsFromSymbol(symbol)
			if flags&ast.ModifierFlagsPrivate == 0 {
				seenMembers[symbol.Name] = symbol
				missingMembers = append(missingMembers, symbol)
			}
		}
	}
	return missingMembers
}

func getInheritedMembers(typeChecker *checker.Checker, classDeclaration *ast.Node) ast.SymbolTable {
	typeNode := ast.GetClassExtendsHeritageElement(classDeclaration)
	if typeNode == nil {
		return ast.SymbolTable{}
	}

	baseType := typeChecker.GetTypeAtLocation(typeNode.AsNode())
	if baseType == nil {
		return ast.SymbolTable{}
	}

	inheritedMembers := make(ast.SymbolTable)
	for _, symbol := range typeChecker.GetPropertiesOfType(baseType) {
		if symbol == nil {
			continue
		}
		flags := checker.GetDeclarationModifierFlagsFromSymbol(symbol)
		if flags&ast.ModifierFlagsPrivate == 0 {
			inheritedMembers[symbol.Name] = symbol
		}
	}
	return inheritedMembers
}

func createImportAdder(context context.Context, fixContext *CodeFixContext, typeChecker *checker.Checker) (autoimport.ImportAdder, error) {
	view, err := fixContext.LS.getPreparedAutoImportView(fixContext.SourceFile)
	if err != nil {
		return nil, err
	}
	if view == nil {
		return nil, nil
	}
	return autoimport.NewImportAdder(context, fixContext.Program, typeChecker, fixContext.SourceFile, view, fixContext.LS.FormatOptions(), fixContext.LS.converters, fixContext.LS.UserPreferences()), nil
}
