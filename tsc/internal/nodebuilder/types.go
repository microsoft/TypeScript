// Exports interfaces and types defining the node builder - concrete implementations are on top of the checker, but these types and interfaces are used by the emit resolver in the printer
package nodebuilder

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/modulespecifiers"
)

// TODO: previously all symboltracker methods were optional, but now they're required.
type SymbolTracker interface {
	GetModuleSpecifierGenerationHost() modulespecifiers.ModuleSpecifierGenerationHost

	TrackSymbol(symbol *ast.Symbol, enclosingDeclaration *ast.Node, meaning ast.SymbolFlags) bool
	ReportInaccessibleThisError()
	ReportPrivateInBaseOfClassExpression(propertyName string)
	ReportInaccessibleUniqueSymbolError()
	ReportCyclicStructureError()
	ReportLikelyUnsafeImportRequiredError(specifier string)
	ReportTruncationError()
	ReportNonlocalAugmentation(containingFile *ast.SourceFile, parentSymbol *ast.Symbol, augmentingSymbol *ast.Symbol)
	ReportNonSerializableProperty(propertyName string)

	ReportInferenceFallback(node *ast.Node)
	PushErrorFallbackNode(node *ast.Node)
	PopErrorFallbackNode()
}

// NOTE: If modifying this enum, must modify `TypeFormatFlags` too!
type Flags int32

const (
	FlagsNone Flags = 0
	// Options
	FlagsNoTruncation                        Flags = 1 << 0
	FlagsWriteArrayAsGenericType             Flags = 1 << 1
	FlagsGenerateNamesForShadowedTypeParams  Flags = 1 << 2
	FlagsUseStructuralFallback               Flags = 1 << 3
	FlagsForbidIndexedAccessSymbolReferences Flags = 1 << 4
	FlagsWriteTypeArgumentsOfSignature       Flags = 1 << 5
	FlagsUseFullyQualifiedType               Flags = 1 << 6
	FlagsUseOnlyExternalAliasing             Flags = 1 << 7
	FlagsSuppressAnyReturnType               Flags = 1 << 8
	FlagsWriteTypeParametersInQualifiedName  Flags = 1 << 9
	FlagsMultilineObjectLiterals             Flags = 1 << 10
	FlagsWriteClassExpressionAsTypeLiteral   Flags = 1 << 11
	FlagsUseTypeOfFunction                   Flags = 1 << 12
	FlagsOmitParameterModifiers              Flags = 1 << 13
	FlagsUseAliasDefinedOutsideCurrentScope  Flags = 1 << 14
	FlagsUseSingleQuotesForStringLiteralType Flags = 1 << 28
	FlagsNoTypeReduction                     Flags = 1 << 29
	FlagsOmitThisParameter                   Flags = 1 << 25
	FlagsWriteCallStyleSignature             Flags = 1 << 27
	// Error handling
	FlagsAllowThisInObjectLiteral              Flags = 1 << 15
	FlagsAllowQualifiedNameInPlaceOfIdentifier Flags = 1 << 16
	FlagsAllowAnonymousIdentifier              Flags = 1 << 17
	FlagsAllowEmptyUnionOrIntersection         Flags = 1 << 18
	FlagsAllowEmptyTuple                       Flags = 1 << 19
	FlagsAllowUniqueESSymbolType               Flags = 1 << 20
	FlagsAllowEmptyIndexInfoType               Flags = 1 << 21
	// Errors (cont.)
	FlagsAllowNodeModulesRelativePaths Flags = 1 << 26
	FlagsIgnoreErrors                  Flags = FlagsAllowThisInObjectLiteral | FlagsAllowQualifiedNameInPlaceOfIdentifier | FlagsAllowAnonymousIdentifier | FlagsAllowEmptyUnionOrIntersection | FlagsAllowEmptyTuple | FlagsAllowEmptyIndexInfoType | FlagsAllowNodeModulesRelativePaths
	// State
	FlagsInObjectTypeLiteral Flags = 1 << 22
	FlagsInTypeAlias         Flags = 1 << 23
	FlagsInInitialEntityName Flags = 1 << 24
)

/** @internal */

type InternalFlags int32

const (
	InternalFlagsNone                    InternalFlags = 0
	InternalFlagsWriteComputedProps      InternalFlags = 1 << 0
	InternalFlagsNoSyntacticPrinter      InternalFlags = 1 << 1
	InternalFlagsDoNotIncludeSymbolChain InternalFlags = 1 << 2
	InternalFlagsAllowUnresolvedNames    InternalFlags = 1 << 3
)
