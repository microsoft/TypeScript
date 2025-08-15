package declarations

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/modulespecifiers"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
)

type SymbolTrackerImpl struct {
	resolver      printer.EmitResolver
	state         *SymbolTrackerSharedState
	host          DeclarationEmitHost
	fallbackStack []*ast.Node
}

// GetModuleSpecifierGenerationHost implements checker.SymbolTracker.
func (s *SymbolTrackerImpl) GetModuleSpecifierGenerationHost() modulespecifiers.ModuleSpecifierGenerationHost {
	return s.host
}

// PopErrorFallbackNode implements checker.SymbolTracker.
func (s *SymbolTrackerImpl) PopErrorFallbackNode() {
	s.fallbackStack = s.fallbackStack[:len(s.fallbackStack)-1]
}

// PushErrorFallbackNode implements checker.SymbolTracker.
func (s *SymbolTrackerImpl) PushErrorFallbackNode(node *ast.Node) {
	s.fallbackStack = append(s.fallbackStack, node)
}

// ReportCyclicStructureError implements checker.SymbolTracker.
func (s *SymbolTrackerImpl) ReportCyclicStructureError() {
	location := s.errorLocation()
	if location != nil {
		s.state.addDiagnostic(createDiagnosticForNode(location, diagnostics.The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialized_A_type_annotation_is_necessary, s.errorDeclarationNameWithFallback()))
	}
}

// ReportInaccessibleThisError implements checker.SymbolTracker.
func (s *SymbolTrackerImpl) ReportInaccessibleThisError() {
	location := s.errorLocation()
	if location != nil {
		s.state.addDiagnostic(createDiagnosticForNode(location, diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary, s.errorDeclarationNameWithFallback(), "this"))
	}
}

// ReportInaccessibleUniqueSymbolError implements checker.SymbolTracker.
func (s *SymbolTrackerImpl) ReportInaccessibleUniqueSymbolError() {
	location := s.errorLocation()
	if location != nil {
		s.state.addDiagnostic(createDiagnosticForNode(location, diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary, s.errorDeclarationNameWithFallback(), "unique symbol"))
	}
}

// ReportInferenceFallback implements checker.SymbolTracker.
func (s *SymbolTrackerImpl) ReportInferenceFallback(node *ast.Node) {
	if s.state.isolatedDeclarations || ast.IsSourceFileJS(s.state.currentSourceFile) {
		return
	}
	if ast.GetSourceFileOfNode(node) != s.state.currentSourceFile {
		return // Nested error on a declaration in another file - ignore, will be reemitted if file is in the output file set
	}
	if ast.IsVariableDeclaration(node) && s.state.resolver.IsExpandoFunctionDeclaration(node) {
		s.state.reportExpandoFunctionErrors(node)
	} else {
		// !!! isolatedDeclaration support
		// s.state.addDiagnostic(getIsolatedDeclarationError(node))
	}
}

// ReportLikelyUnsafeImportRequiredError implements checker.SymbolTracker.
func (s *SymbolTrackerImpl) ReportLikelyUnsafeImportRequiredError(specifier string) {
	location := s.errorLocation()
	if location != nil {
		s.state.addDiagnostic(createDiagnosticForNode(location, diagnostics.The_inferred_type_of_0_cannot_be_named_without_a_reference_to_1_This_is_likely_not_portable_A_type_annotation_is_necessary, s.errorDeclarationNameWithFallback(), specifier))
	}
}

// ReportNonSerializableProperty implements checker.SymbolTracker.
func (s *SymbolTrackerImpl) ReportNonSerializableProperty(propertyName string) {
	location := s.errorLocation()
	if location != nil {
		s.state.addDiagnostic(createDiagnosticForNode(location, diagnostics.The_type_of_this_node_cannot_be_serialized_because_its_property_0_cannot_be_serialized, propertyName))
	}
}

// ReportNonlocalAugmentation implements checker.SymbolTracker.
func (s *SymbolTrackerImpl) ReportNonlocalAugmentation(containingFile *ast.SourceFile, parentSymbol *ast.Symbol, augmentingSymbol *ast.Symbol) {
	primaryDeclaration := core.Find(parentSymbol.Declarations, func(d *ast.Node) bool { return ast.GetSourceFileOfNode(d) == containingFile })
	augmentingDeclarations := core.Filter(augmentingSymbol.Declarations, func(d *ast.Node) bool { return ast.GetSourceFileOfNode(d) != containingFile })
	if primaryDeclaration != nil && len(augmentingDeclarations) > 0 {
		for _, augmentations := range augmentingDeclarations {
			diag := createDiagnosticForNode(augmentations, diagnostics.Declaration_augments_declaration_in_another_file_This_cannot_be_serialized)
			related := createDiagnosticForNode(primaryDeclaration, diagnostics.This_is_the_declaration_being_augmented_Consider_moving_the_augmenting_declaration_into_the_same_file)
			diag.AddRelatedInfo(related)
			s.state.addDiagnostic(diag)
		}
	}
}

// ReportPrivateInBaseOfClassExpression implements checker.SymbolTracker.
func (s *SymbolTrackerImpl) ReportPrivateInBaseOfClassExpression(propertyName string) {
	location := s.errorLocation()
	if location != nil {
		diag := createDiagnosticForNode(location, diagnostics.Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected, propertyName)
		if ast.IsVariableDeclaration(location.Parent) {
			related := createDiagnosticForNode(location, diagnostics.Add_a_type_annotation_to_the_variable_0, s.errorDeclarationNameWithFallback())
			diag.AddRelatedInfo(related)
		}
		s.state.addDiagnostic(diag)
	}
}

// ReportTruncationError implements checker.SymbolTracker.
func (s *SymbolTrackerImpl) ReportTruncationError() {
	location := s.errorLocation()
	if location != nil {
		s.state.addDiagnostic(createDiagnosticForNode(location, diagnostics.The_inferred_type_of_this_node_exceeds_the_maximum_length_the_compiler_will_serialize_An_explicit_type_annotation_is_needed))
	}
}

func (s *SymbolTrackerImpl) errorFallbackNode() *ast.Node {
	if len(s.fallbackStack) >= 1 {
		return s.fallbackStack[len(s.fallbackStack)-1]
	}
	return nil
}

func (s *SymbolTrackerImpl) errorLocation() *ast.Node {
	location := s.state.errorNameNode
	if location == nil {
		location = s.errorFallbackNode()
	}
	return location
}

func (s *SymbolTrackerImpl) errorDeclarationNameWithFallback() string {
	if s.state.errorNameNode != nil {
		return scanner.DeclarationNameToString(s.state.errorNameNode)
	}
	if s.errorFallbackNode() != nil && ast.GetNameOfDeclaration(s.errorFallbackNode()) != nil {
		return scanner.DeclarationNameToString(ast.GetNameOfDeclaration(s.errorFallbackNode()))
	}
	if s.errorFallbackNode() != nil && ast.IsExportAssignment(s.errorFallbackNode()) {
		if s.errorFallbackNode().AsExportAssignment().IsExportEquals {
			return "export="
		}
		return "default"
	}
	return "(Missing)" // same fallback declarationNameToString uses when node is zero-width (ie, nameless)
}

// TrackSymbol implements checker.SymbolTracker.
func (s *SymbolTrackerImpl) TrackSymbol(symbol *ast.Symbol, enclosingDeclaration *ast.Node, meaning ast.SymbolFlags) bool {
	if symbol.Flags&ast.SymbolFlagsTypeParameter != 0 {
		return false
	}
	issuedDiagnostic := s.handleSymbolAccessibilityError(s.resolver.IsSymbolAccessible(symbol, enclosingDeclaration, meaning /*shouldComputeAliasToMarkVisible*/, true))
	return issuedDiagnostic
}

func (s *SymbolTrackerImpl) handleSymbolAccessibilityError(symbolAccessibilityResult printer.SymbolAccessibilityResult) bool {
	if symbolAccessibilityResult.Accessibility == printer.SymbolAccessibilityAccessible {
		// Add aliases back onto the possible imports list if they're not there so we can try them again with updated visibility info
		if len(symbolAccessibilityResult.AliasesToMakeVisible) > 0 {
			for _, ref := range symbolAccessibilityResult.AliasesToMakeVisible {
				s.state.lateMarkedStatements = core.AppendIfUnique(s.state.lateMarkedStatements, ref)
			}
		}
		// TODO: Do all these accessibility checks inside/after the first pass in the checker when declarations are enabled, if possible

		// The checker should issue errors on unresolvable names, skip the declaration emit error for using a private/unreachable name for those
	} else if symbolAccessibilityResult.Accessibility != printer.SymbolAccessibilityNotResolved {
		// Report error
		errorInfo := s.state.getSymbolAccessibilityDiagnostic(symbolAccessibilityResult)
		if errorInfo != nil {
			info := *errorInfo
			diagNode := symbolAccessibilityResult.ErrorNode
			if diagNode == nil {
				diagNode = errorInfo.errorNode
			}
			if info.typeName != nil {
				s.state.addDiagnostic(createDiagnosticForNode(diagNode, info.diagnosticMessage, scanner.GetTextOfNode(info.typeName), symbolAccessibilityResult.ErrorSymbolName, symbolAccessibilityResult.ErrorModuleName))
			} else {
				s.state.addDiagnostic(createDiagnosticForNode(diagNode, info.diagnosticMessage, symbolAccessibilityResult.ErrorSymbolName, symbolAccessibilityResult.ErrorModuleName))
			}
			return true
		}
	}
	return false
}

func createDiagnosticForNode(node *ast.Node, message *diagnostics.Message, args ...any) *ast.Diagnostic {
	return checker.NewDiagnosticForNode(node, message, args...)
}

type SymbolTrackerSharedState struct {
	lateMarkedStatements             []*ast.Node
	diagnostics                      []*ast.Diagnostic
	getSymbolAccessibilityDiagnostic GetSymbolAccessibilityDiagnostic
	errorNameNode                    *ast.Node
	isolatedDeclarations             bool
	currentSourceFile                *ast.SourceFile
	resolver                         printer.EmitResolver
	reportExpandoFunctionErrors      func(node *ast.Node)
}

func (s *SymbolTrackerSharedState) addDiagnostic(diag *ast.Diagnostic) {
	s.diagnostics = append(s.diagnostics, diag)
}

func NewSymbolTracker(host DeclarationEmitHost, resolver printer.EmitResolver, state *SymbolTrackerSharedState) *SymbolTrackerImpl {
	tracker := &SymbolTrackerImpl{host: host, resolver: resolver, state: state}
	return tracker
}
