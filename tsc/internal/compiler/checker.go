package compiler

import (
	"fmt"
	"maps"
	"math"
	"slices"
	"strconv"
	"strings"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/tspath"
)

// CheckMode

type CheckMode uint32

const (
	CheckModeNormal               CheckMode = 0      // Normal type checking
	CheckModeContextual           CheckMode = 1 << 0 // Explicitly assigned contextual type, therefore not cacheable
	CheckModeInferential          CheckMode = 1 << 1 // Inferential typing
	CheckModeSkipContextSensitive CheckMode = 1 << 2 // Skip context sensitive function expressions
	CheckModeSkipGenericFunctions CheckMode = 1 << 3 // Skip single signature generic functions
	CheckModeIsForSignatureHelp   CheckMode = 1 << 4 // Call resolution for purposes of signature help
	CheckModeRestBindingElement   CheckMode = 1 << 5 // Checking a type that is going to be used to determine the type of a rest binding element
	//   e.g. in `const { a, ...rest } = foo`, when checking the type of `foo` to determine the type of `rest`,
	//   we need to preserve generic types instead of substituting them for constraints
	CheckModeTypeOnly CheckMode = 1 << 6 // Called from getTypeOfExpression, diagnostics may be omitted
)

type TypeSystemEntity any

type TypeSystemPropertyName int32

const (
	TypeSystemPropertyNameType TypeSystemPropertyName = iota
	TypeSystemPropertyNameResolvedBaseConstructorType
	TypeSystemPropertyNameDeclaredType
	TypeSystemPropertyNameResolvedReturnType
	TypeSystemPropertyNameResolvedBaseConstraint
	TypeSystemPropertyNameResolvedTypeArguments
	TypeSystemPropertyNameResolvedBaseTypes
	TypeSystemPropertyNameWriteType
	TypeSystemPropertyNameParameterInitializerContainsUndefined
)

type TypeResolution struct {
	target       TypeSystemEntity
	propertyName TypeSystemPropertyName
	result       bool
}

// WideningKind

type WideningKind int32

const (
	WideningKindNormal WideningKind = iota
	WideningKindFunctionReturn
	WideningKindGeneratorNext
	WideningKindGeneratorYield
)

// EnumLiteralKey

type EnumLiteralKey struct {
	enumSymbol *ast.Symbol
	value      any
}

// TypeCacheKind

type CachedTypeKind int32

const (
	CachedTypeKindLiteralUnionBaseType CachedTypeKind = iota
	CachedTypeKindIndexType
	CachedTypeKindStringIndexType
	CachedTypeKindEquivalentBaseType
	CachedTypeKindApparentType
	CachedTypeKindAwaitedType
	CachedTypeKindEvolvingArrayType
)

// CachedTypeKey

type CachedTypeKey struct {
	kind   CachedTypeKind
	typeId TypeId
}

// NarrowedTypeKey

type NarrowedTypeKey struct {
	t            *Type
	candidate    *Type
	assumeTrue   bool
	checkDerived bool
}

// UnionOfUnionKey

type UnionOfUnionKey struct {
	id1 TypeId
	id2 TypeId
	r   UnionReduction
	a   string
}

// CachedSignatureKey

type CachedSignatureKey struct {
	sig *Signature
	key string
}

// StringMappingKey

type StringMappingKey struct {
	s *ast.Symbol
	t *Type
}

// AssignmentReducedKey

type AssignmentReducedKey struct {
	id1 TypeId
	id2 TypeId
}

// InferenceContext

type InferenceContext struct{}

type DeclarationMeaning uint32

const (
	DeclarationMeaningGetAccessor DeclarationMeaning = 1 << iota
	DeclarationMeaningSetAccessor
	DeclarationMeaningPropertyAssignment
	DeclarationMeaningMethod
	DeclarationMeaningPrivateStatic
	DeclarationMeaningGetOrSetAccessor           = DeclarationMeaningGetAccessor | DeclarationMeaningSetAccessor
	DeclarationMeaningPropertyAssignmentOrMethod = DeclarationMeaningPropertyAssignment | DeclarationMeaningMethod
)

// IntrinsicTypeKind

type IntrinsicTypeKind int32

const (
	IntrinsicTypeKindUnknown IntrinsicTypeKind = iota
	IntrinsicTypeKindUppercase
	IntrinsicTypeKindLowercase
	IntrinsicTypeKindCapitalize
	IntrinsicTypeKindUncapitalize
	IntrinsicTypeKindNoInfer
)

var intrinsicTypeKinds = map[string]IntrinsicTypeKind{
	"Uppercase":    IntrinsicTypeKindUppercase,
	"Lowercase":    IntrinsicTypeKindLowercase,
	"Capitalize":   IntrinsicTypeKindCapitalize,
	"Uncapitalize": IntrinsicTypeKindUncapitalize,
	"NoInfer":      IntrinsicTypeKindNoInfer,
}

type MappedTypeModifiers uint32

const (
	MappedTypeModifiersIncludeReadonly MappedTypeModifiers = 1 << 0
	MappedTypeModifiersExcludeReadonly MappedTypeModifiers = 1 << 1
	MappedTypeModifiersIncludeOptional MappedTypeModifiers = 1 << 2
	MappedTypeModifiersExcludeOptional MappedTypeModifiers = 1 << 3
)

type MappedTypeNameTypeKind int32

const (
	MappedTypeNameTypeKindNone MappedTypeNameTypeKind = iota
	MappedTypeNameTypeKindFiltering
	MappedTypeNameTypeKindRemapping
)

type ReferenceHint int32

const (
	ReferenceHintUnspecified ReferenceHint = iota
	ReferenceHintIdentifier
	ReferenceHintProperty
	ReferenceHintExportAssignment
	ReferenceHintJsx
	ReferenceHintAsyncFunction
	ReferenceHintExportImportEquals
	ReferenceHintExportSpecifier
	ReferenceHintDecorator
)

type TypeFacts uint32

const (
	TypeFactsNone               TypeFacts = 0
	TypeFactsTypeofEQString     TypeFacts = 1 << 0
	TypeFactsTypeofEQNumber     TypeFacts = 1 << 1
	TypeFactsTypeofEQBigInt     TypeFacts = 1 << 2
	TypeFactsTypeofEQBoolean    TypeFacts = 1 << 3
	TypeFactsTypeofEQSymbol     TypeFacts = 1 << 4
	TypeFactsTypeofEQObject     TypeFacts = 1 << 5
	TypeFactsTypeofEQFunction   TypeFacts = 1 << 6
	TypeFactsTypeofEQHostObject TypeFacts = 1 << 7
	TypeFactsTypeofNEString     TypeFacts = 1 << 8
	TypeFactsTypeofNENumber     TypeFacts = 1 << 9
	TypeFactsTypeofNEBigInt     TypeFacts = 1 << 10
	TypeFactsTypeofNEBoolean    TypeFacts = 1 << 11
	TypeFactsTypeofNESymbol     TypeFacts = 1 << 12
	TypeFactsTypeofNEObject     TypeFacts = 1 << 13
	TypeFactsTypeofNEFunction   TypeFacts = 1 << 14
	TypeFactsTypeofNEHostObject TypeFacts = 1 << 15
	TypeFactsEQUndefined        TypeFacts = 1 << 16
	TypeFactsEQNull             TypeFacts = 1 << 17
	TypeFactsEQUndefinedOrNull  TypeFacts = 1 << 18
	TypeFactsNEUndefined        TypeFacts = 1 << 19
	TypeFactsNENull             TypeFacts = 1 << 20
	TypeFactsNEUndefinedOrNull  TypeFacts = 1 << 21
	TypeFactsTruthy             TypeFacts = 1 << 22
	TypeFactsFalsy              TypeFacts = 1 << 23
	TypeFactsIsUndefined        TypeFacts = 1 << 24
	TypeFactsIsNull             TypeFacts = 1 << 25
	TypeFactsIsUndefinedOrNull  TypeFacts = TypeFactsIsUndefined | TypeFactsIsNull
	TypeFactsAll                TypeFacts = (1 << 27) - 1
	// The following members encode facts about particular kinds of types for use in the getTypeFacts function.
	// The presence of a particular fact means that the given test is true for some (and possibly all) values
	// of that kind of type.
	TypeFactsBaseStringStrictFacts     TypeFacts = TypeFactsTypeofEQString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull
	TypeFactsBaseStringFacts           TypeFacts = TypeFactsBaseStringStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy
	TypeFactsStringStrictFacts         TypeFacts = TypeFactsBaseStringStrictFacts | TypeFactsTruthy | TypeFactsFalsy
	TypeFactsStringFacts               TypeFacts = TypeFactsBaseStringFacts | TypeFactsTruthy
	TypeFactsEmptyStringStrictFacts    TypeFacts = TypeFactsBaseStringStrictFacts | TypeFactsFalsy
	TypeFactsEmptyStringFacts          TypeFacts = TypeFactsBaseStringFacts
	TypeFactsNonEmptyStringStrictFacts TypeFacts = TypeFactsBaseStringStrictFacts | TypeFactsTruthy
	TypeFactsNonEmptyStringFacts       TypeFacts = TypeFactsBaseStringFacts | TypeFactsTruthy
	TypeFactsBaseNumberStrictFacts     TypeFacts = TypeFactsTypeofEQNumber | TypeFactsTypeofNEString | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull
	TypeFactsBaseNumberFacts           TypeFacts = TypeFactsBaseNumberStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy
	TypeFactsNumberStrictFacts         TypeFacts = TypeFactsBaseNumberStrictFacts | TypeFactsTruthy | TypeFactsFalsy
	TypeFactsNumberFacts               TypeFacts = TypeFactsBaseNumberFacts | TypeFactsTruthy
	TypeFactsZeroNumberStrictFacts     TypeFacts = TypeFactsBaseNumberStrictFacts | TypeFactsFalsy
	TypeFactsZeroNumberFacts           TypeFacts = TypeFactsBaseNumberFacts
	TypeFactsNonZeroNumberStrictFacts  TypeFacts = TypeFactsBaseNumberStrictFacts | TypeFactsTruthy
	TypeFactsNonZeroNumberFacts        TypeFacts = TypeFactsBaseNumberFacts | TypeFactsTruthy
	TypeFactsBaseBigIntStrictFacts     TypeFacts = TypeFactsTypeofEQBigInt | TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull
	TypeFactsBaseBigIntFacts           TypeFacts = TypeFactsBaseBigIntStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy
	TypeFactsBigIntStrictFacts         TypeFacts = TypeFactsBaseBigIntStrictFacts | TypeFactsTruthy | TypeFactsFalsy
	TypeFactsBigIntFacts               TypeFacts = TypeFactsBaseBigIntFacts | TypeFactsTruthy
	TypeFactsZeroBigIntStrictFacts     TypeFacts = TypeFactsBaseBigIntStrictFacts | TypeFactsFalsy
	TypeFactsZeroBigIntFacts           TypeFacts = TypeFactsBaseBigIntFacts
	TypeFactsNonZeroBigIntStrictFacts  TypeFacts = TypeFactsBaseBigIntStrictFacts | TypeFactsTruthy
	TypeFactsNonZeroBigIntFacts        TypeFacts = TypeFactsBaseBigIntFacts | TypeFactsTruthy
	TypeFactsBaseBooleanStrictFacts    TypeFacts = TypeFactsTypeofEQBoolean | TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull
	TypeFactsBaseBooleanFacts          TypeFacts = TypeFactsBaseBooleanStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy
	TypeFactsBooleanStrictFacts        TypeFacts = TypeFactsBaseBooleanStrictFacts | TypeFactsTruthy | TypeFactsFalsy
	TypeFactsBooleanFacts              TypeFacts = TypeFactsBaseBooleanFacts | TypeFactsTruthy
	TypeFactsFalseStrictFacts          TypeFacts = TypeFactsBaseBooleanStrictFacts | TypeFactsFalsy
	TypeFactsFalseFacts                TypeFacts = TypeFactsBaseBooleanFacts
	TypeFactsTrueStrictFacts           TypeFacts = TypeFactsBaseBooleanStrictFacts | TypeFactsTruthy
	TypeFactsTrueFacts                 TypeFacts = TypeFactsBaseBooleanFacts | TypeFactsTruthy
	TypeFactsSymbolStrictFacts         TypeFacts = TypeFactsTypeofEQSymbol | TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull | TypeFactsTruthy
	TypeFactsSymbolFacts               TypeFacts = TypeFactsSymbolStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy
	TypeFactsObjectStrictFacts         TypeFacts = TypeFactsTypeofEQObject | TypeFactsTypeofEQHostObject | TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEFunction | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull | TypeFactsTruthy
	TypeFactsObjectFacts               TypeFacts = TypeFactsObjectStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy
	TypeFactsFunctionStrictFacts       TypeFacts = TypeFactsTypeofEQFunction | TypeFactsTypeofEQHostObject | TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsNEUndefined | TypeFactsNENull | TypeFactsNEUndefinedOrNull | TypeFactsTruthy
	TypeFactsFunctionFacts             TypeFacts = TypeFactsFunctionStrictFacts | TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsFalsy
	TypeFactsVoidFacts                 TypeFacts = TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsEQUndefined | TypeFactsEQUndefinedOrNull | TypeFactsNENull | TypeFactsFalsy
	TypeFactsUndefinedFacts            TypeFacts = TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsEQUndefined | TypeFactsEQUndefinedOrNull | TypeFactsNENull | TypeFactsFalsy | TypeFactsIsUndefined
	TypeFactsNullFacts                 TypeFacts = TypeFactsTypeofEQObject | TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEFunction | TypeFactsTypeofNEHostObject | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsNEUndefined | TypeFactsFalsy | TypeFactsIsNull
	TypeFactsEmptyObjectStrictFacts    TypeFacts = TypeFactsAll & ^(TypeFactsEQUndefined | TypeFactsEQNull | TypeFactsEQUndefinedOrNull | TypeFactsIsUndefinedOrNull)
	TypeFactsEmptyObjectFacts          TypeFacts = TypeFactsAll & ^TypeFactsIsUndefinedOrNull
	TypeFactsUnknownFacts              TypeFacts = TypeFactsAll & ^TypeFactsIsUndefinedOrNull
	TypeFactsAllTypeofNE               TypeFacts = TypeFactsTypeofNEString | TypeFactsTypeofNENumber | TypeFactsTypeofNEBigInt | TypeFactsTypeofNEBoolean | TypeFactsTypeofNESymbol | TypeFactsTypeofNEObject | TypeFactsTypeofNEFunction | TypeFactsNEUndefined
	// Masks
	TypeFactsOrFactsMask  TypeFacts = TypeFactsTypeofEQFunction | TypeFactsTypeofNEObject
	TypeFactsAndFactsMask TypeFacts = TypeFactsAll & ^TypeFactsOrFactsMask
)

type IterationUse uint32

const (
	IterationUseAllowsSyncIterablesFlag  IterationUse = 1 << 0
	IterationUseAllowsAsyncIterablesFlag IterationUse = 1 << 1
	IterationUseAllowsStringInputFlag    IterationUse = 1 << 2
	IterationUseForOfFlag                IterationUse = 1 << 3
	IterationUseYieldStarFlag            IterationUse = 1 << 4
	IterationUseSpreadFlag               IterationUse = 1 << 5
	IterationUseDestructuringFlag        IterationUse = 1 << 6
	IterationUsePossiblyOutOfBounds      IterationUse = 1 << 7
	// Spread, Destructuring, Array element assignment
	IterationUseElement                  = IterationUseAllowsSyncIterablesFlag
	IterationUseSpread                   = IterationUseAllowsSyncIterablesFlag | IterationUseSpreadFlag
	IterationUseDestructuring            = IterationUseAllowsSyncIterablesFlag | IterationUseDestructuringFlag
	IterationUseForOf                    = IterationUseAllowsSyncIterablesFlag | IterationUseAllowsStringInputFlag | IterationUseForOfFlag
	IterationUseForAwaitOf               = IterationUseAllowsSyncIterablesFlag | IterationUseAllowsAsyncIterablesFlag | IterationUseAllowsStringInputFlag | IterationUseForOfFlag
	IterationUseYieldStar                = IterationUseAllowsSyncIterablesFlag | IterationUseYieldStarFlag
	IterationUseAsyncYieldStar           = IterationUseAllowsSyncIterablesFlag | IterationUseAllowsAsyncIterablesFlag | IterationUseYieldStarFlag
	IterationUseGeneratorReturnType      = IterationUseAllowsSyncIterablesFlag
	IterationUseAsyncGeneratorReturnType = IterationUseAllowsAsyncIterablesFlag
)

// Checker

type Checker struct {
	program                            *Program
	host                               CompilerHost
	compilerOptions                    *core.CompilerOptions
	files                              []*ast.SourceFile
	typeCount                          uint32
	symbolCount                        uint32
	totalInstantiationCount            uint32
	instantiationCount                 uint32
	instantiationDepth                 uint32
	inlineLevel                        int
	currentNode                        *ast.Node
	languageVersion                    core.ScriptTarget
	moduleKind                         core.ModuleKind
	legacyDecorators                   bool
	allowSyntheticDefaultImports       bool
	strictNullChecks                   bool
	strictFunctionTypes                bool
	strictBindCallApply                bool
	noImplicitAny                      bool
	noImplicitThis                     bool
	useUnknownInCatchVariables         bool
	exactOptionalPropertyTypes         bool
	arrayVariances                     []VarianceFlags
	globals                            ast.SymbolTable
	evaluate                           Evaluator
	stringLiteralTypes                 map[string]*Type
	numberLiteralTypes                 map[float64]*Type
	bigintLiteralTypes                 map[PseudoBigInt]*Type
	enumLiteralTypes                   map[EnumLiteralKey]*Type
	indexedAccessTypes                 map[string]*Type
	templateLiteralTypes               map[string]*Type
	stringMappingTypes                 map[StringMappingKey]*Type
	uniqueESSymbolTypes                map[*ast.Symbol]*Type
	cachedTypes                        map[CachedTypeKey]*Type
	cachedSignatures                   map[CachedSignatureKey]*Signature
	narrowedTypes                      map[NarrowedTypeKey]*Type
	assignmentReducedTypes             map[AssignmentReducedKey]*Type
	markerTypes                        core.Set[*Type]
	identifierSymbols                  map[*ast.Node]*ast.Symbol
	undefinedSymbol                    *ast.Symbol
	argumentsSymbol                    *ast.Symbol
	requireSymbol                      *ast.Symbol
	unknownSymbol                      *ast.Symbol
	resolvingSymbol                    *ast.Symbol
	errorTypes                         map[string]*Type
	globalThisSymbol                   *ast.Symbol
	resolveName                        func(location *ast.Node, name string, meaning ast.SymbolFlags, nameNotFoundMessage *diagnostics.Message, isUse bool, excludeGlobals bool) *ast.Symbol
	tupleTypes                         map[string]*Type
	unionTypes                         map[string]*Type
	unionOfUnionTypes                  map[UnionOfUnionKey]*Type
	intersectionTypes                  map[string]*Type
	diagnostics                        DiagnosticsCollection
	suggestionDiagnostics              DiagnosticsCollection
	symbolPool                         core.Pool[ast.Symbol]
	signaturePool                      core.Pool[Signature]
	indexInfoPool                      core.Pool[IndexInfo]
	mergedSymbols                      map[ast.MergeId]*ast.Symbol
	nodeLinks                          LinkStore[*ast.Node, NodeLinks]
	signatureLinks                     LinkStore[*ast.Node, SignatureLinks]
	typeNodeLinks                      LinkStore[*ast.Node, TypeNodeLinks]
	enumMemberLinks                    LinkStore[*ast.Node, EnumMemberLinks]
	valueSymbolLinks                   LinkStore[*ast.Symbol, ValueSymbolLinks]
	aliasSymbolLinks                   LinkStore[*ast.Symbol, AliasSymbolLinks]
	moduleSymbolLinks                  LinkStore[*ast.Symbol, ModuleSymbolLinks]
	exportTypeLinks                    LinkStore[*ast.Symbol, ExportTypeLinks]
	membersAndExportsLinks             LinkStore[*ast.Symbol, MembersAndExportsLinks]
	typeAliasLinks                     LinkStore[*ast.Symbol, TypeAliasLinks]
	declaredTypeLinks                  LinkStore[*ast.Symbol, DeclaredTypeLinks]
	spreadLinks                        LinkStore[*ast.Symbol, SpreadLinks]
	varianceLinks                      LinkStore[*ast.Symbol, VarianceLinks]
	sourceFileLinks                    LinkStore[*ast.SourceFile, SourceFileLinks]
	patternForType                     map[*Type]*ast.Node
	anyType                            *Type
	autoType                           *Type
	wildcardType                       *Type
	errorType                          *Type
	nonInferrableAnyType               *Type
	intrinsicMarkerType                *Type
	unknownType                        *Type
	undefinedType                      *Type
	undefinedWideningType              *Type
	missingType                        *Type
	undefinedOrMissingType             *Type
	optionalType                       *Type
	nullType                           *Type
	nullWideningType                   *Type
	stringType                         *Type
	numberType                         *Type
	bigintType                         *Type
	regularFalseType                   *Type
	falseType                          *Type
	regularTrueType                    *Type
	trueType                           *Type
	booleanType                        *Type
	esSymbolType                       *Type
	voidType                           *Type
	neverType                          *Type
	silentNeverType                    *Type
	implicitNeverType                  *Type
	unreachableNeverType               *Type
	nonPrimitiveType                   *Type
	stringOrNumberType                 *Type
	stringNumberSymbolType             *Type
	numberOrBigIntType                 *Type
	numericStringType                  *Type
	uniqueLiteralType                  *Type
	uniqueLiteralMapper                *TypeMapper
	outofbandVarianceMarkerHandler     func(onlyUnreliable bool)
	reportUnreliableMapper             *TypeMapper
	reportUnmeasurableMapper           *TypeMapper
	emptyObjectType                    *Type
	emptyTypeLiteralType               *Type
	unknownEmptyObjectType             *Type
	unknownUnionType                   *Type
	emptyGenericType                   *Type
	anyFunctionType                    *Type
	noConstraintType                   *Type
	circularConstraintType             *Type
	markerSuperType                    *Type
	markerSubType                      *Type
	markerOtherType                    *Type
	markerSuperTypeForCheck            *Type
	markerSubTypeForCheck              *Type
	noTypePredicate                    *TypePredicate
	anySignature                       *Signature
	unknownSignature                   *Signature
	resolvingSignature                 *Signature
	silentNeverSignature               *Signature
	enumNumberIndexInfo                *IndexInfo
	patternAmbientModules              []ast.PatternAmbientModule
	patternAmbientModuleAugmentations  ast.SymbolTable
	globalObjectType                   *Type
	globalFunctionType                 *Type
	globalCallableFunctionType         *Type
	globalNewableFunctionType          *Type
	globalArrayType                    *Type
	globalReadonlyArrayType            *Type
	globalStringType                   *Type
	globalNumberType                   *Type
	globalBooleanType                  *Type
	globalRegExpType                   *Type
	globalThisType                     *Type
	anyArrayType                       *Type
	autoArrayType                      *Type
	anyReadonlyArrayType               *Type
	deferredGlobalESSymbolType         *Type
	deferredGlobalBigIntType           *Type
	contextualBindingPatterns          []*ast.Node
	emptyStringType                    *Type
	zeroType                           *Type
	zeroBigIntType                     *Type
	typeResolutions                    []TypeResolution
	resolutionStart                    int
	inVarianceComputation              bool
	lastGetCombinedNodeFlagsNode       *ast.Node
	lastGetCombinedNodeFlagsResult     ast.NodeFlags
	lastGetCombinedModifierFlagsNode   *ast.Node
	lastGetCombinedModifierFlagsResult ast.ModifierFlags
	sharedFlows                        []SharedFlow
	flowAnalysisDisabled               bool
	flowInvocationCount                int
	flowNodePostSuper                  map[*ast.FlowNode]bool
	awaitedTypeStack                   []*Type
	subtypeRelation                    *Relation
	strictSubtypeRelation              *Relation
	assignableRelation                 *Relation
	comparableRelation                 *Relation
	identityRelation                   *Relation
	enumRelation                       *Relation
	getGlobalNonNullableTypeAliasOrNil func() *ast.Symbol
	getGlobalExtractSymbol             func() *ast.Symbol
	getGlobalDisposableType            func() *Type
	getGlobalAsyncDisposableType       func() *Type
	getGlobalAwaitedSymbol             func() *ast.Symbol
	getGlobalAwaitedSymbolOrNil        func() *ast.Symbol
	getGlobalNaNSymbol                 func() *ast.Symbol
	isPrimitiveOrObjectOrEmptyType     func(*Type) bool
	containsMissingType                func(*Type) bool
	couldContainTypeVariables          func(*Type) bool
	isStringIndexSignatureOnlyType     func(*Type) bool
}

func NewChecker(program *Program) *Checker {
	c := &Checker{}
	c.program = program
	c.host = program.host
	c.compilerOptions = program.options
	c.files = program.files
	c.languageVersion = c.compilerOptions.GetEmitScriptTarget()
	c.moduleKind = c.compilerOptions.GetEmitModuleKind()
	c.legacyDecorators = c.compilerOptions.ExperimentalDecorators == core.TSTrue
	c.allowSyntheticDefaultImports = c.compilerOptions.GetAllowSyntheticDefaultImports()
	c.strictNullChecks = c.getStrictOptionValue(c.compilerOptions.StrictNullChecks)
	c.strictFunctionTypes = c.getStrictOptionValue(c.compilerOptions.StrictFunctionTypes)
	c.strictBindCallApply = c.getStrictOptionValue(c.compilerOptions.StrictBindCallApply)
	c.noImplicitAny = c.getStrictOptionValue(c.compilerOptions.NoImplicitAny)
	c.noImplicitThis = c.getStrictOptionValue(c.compilerOptions.NoImplicitThis)
	c.useUnknownInCatchVariables = c.getStrictOptionValue(c.compilerOptions.UseUnknownInCatchVariables)
	c.exactOptionalPropertyTypes = c.compilerOptions.ExactOptionalPropertyTypes == core.TSTrue
	c.arrayVariances = []VarianceFlags{VarianceFlagsCovariant}
	c.globals = make(ast.SymbolTable)
	c.evaluate = createEvaluator(c.evaluateEntity)
	c.stringLiteralTypes = make(map[string]*Type)
	c.numberLiteralTypes = make(map[float64]*Type)
	c.bigintLiteralTypes = make(map[PseudoBigInt]*Type)
	c.enumLiteralTypes = make(map[EnumLiteralKey]*Type)
	c.indexedAccessTypes = make(map[string]*Type)
	c.templateLiteralTypes = make(map[string]*Type)
	c.stringMappingTypes = make(map[StringMappingKey]*Type)
	c.uniqueESSymbolTypes = make(map[*ast.Symbol]*Type)
	c.cachedTypes = make(map[CachedTypeKey]*Type)
	c.cachedSignatures = make(map[CachedSignatureKey]*Signature)
	c.narrowedTypes = make(map[NarrowedTypeKey]*Type)
	c.assignmentReducedTypes = make(map[AssignmentReducedKey]*Type)
	c.identifierSymbols = make(map[*ast.Node]*ast.Symbol)
	c.undefinedSymbol = c.newSymbol(ast.SymbolFlagsProperty, "undefined")
	c.argumentsSymbol = c.newSymbol(ast.SymbolFlagsProperty, "arguments")
	c.requireSymbol = c.newSymbol(ast.SymbolFlagsProperty, "require")
	c.unknownSymbol = c.newSymbol(ast.SymbolFlagsProperty, "unknown")
	c.resolvingSymbol = c.newSymbol(ast.SymbolFlagsNone, InternalSymbolNameResolving)
	c.errorTypes = make(map[string]*Type)
	c.globalThisSymbol = c.newSymbolEx(ast.SymbolFlagsModule, "globalThis", ast.CheckFlagsReadonly)
	c.globalThisSymbol.Exports = c.globals
	c.globals[c.globalThisSymbol.Name] = c.globalThisSymbol
	c.resolveName = c.createNameResolver().resolve
	c.tupleTypes = make(map[string]*Type)
	c.unionTypes = make(map[string]*Type)
	c.unionOfUnionTypes = make(map[UnionOfUnionKey]*Type)
	c.intersectionTypes = make(map[string]*Type)
	c.diagnostics = DiagnosticsCollection{}
	c.suggestionDiagnostics = DiagnosticsCollection{}
	c.mergedSymbols = make(map[ast.MergeId]*ast.Symbol)
	c.patternForType = make(map[*Type]*ast.Node)
	c.anyType = c.newIntrinsicType(TypeFlagsAny, "any")
	c.autoType = c.newIntrinsicTypeEx(TypeFlagsAny, "any", ObjectFlagsNonInferrableType)
	c.wildcardType = c.newIntrinsicType(TypeFlagsAny, "any")
	c.errorType = c.newIntrinsicType(TypeFlagsAny, "error")
	c.nonInferrableAnyType = c.newIntrinsicTypeEx(TypeFlagsAny, "any", ObjectFlagsContainsWideningType)
	c.intrinsicMarkerType = c.newIntrinsicType(TypeFlagsAny, "intrinsic")
	c.unknownType = c.newIntrinsicType(TypeFlagsUnknown, "unknown")
	c.undefinedType = c.newIntrinsicType(TypeFlagsUndefined, "undefined")
	c.undefinedWideningType = c.createWideningType(c.undefinedType)
	c.missingType = c.newIntrinsicType(TypeFlagsUndefined, "undefined")
	c.undefinedOrMissingType = core.IfElse(c.exactOptionalPropertyTypes, c.missingType, c.undefinedType)
	c.optionalType = c.newIntrinsicType(TypeFlagsUndefined, "undefined")
	c.nullType = c.newIntrinsicType(TypeFlagsNull, "null")
	c.nullWideningType = c.createWideningType(c.nullType)
	c.stringType = c.newIntrinsicType(TypeFlagsString, "string")
	c.numberType = c.newIntrinsicType(TypeFlagsNumber, "number")
	c.bigintType = c.newIntrinsicType(TypeFlagsBigInt, "bigint")
	c.regularFalseType = c.newLiteralType(TypeFlagsBooleanLiteral, false, nil)
	c.falseType = c.newLiteralType(TypeFlagsBooleanLiteral, false, c.regularFalseType)
	c.regularFalseType.AsLiteralType().freshType = c.falseType
	c.falseType.AsLiteralType().freshType = c.falseType
	c.regularTrueType = c.newLiteralType(TypeFlagsBooleanLiteral, true, nil)
	c.trueType = c.newLiteralType(TypeFlagsBooleanLiteral, true, c.regularTrueType)
	c.regularTrueType.AsLiteralType().freshType = c.trueType
	c.trueType.AsLiteralType().freshType = c.trueType
	c.booleanType = c.getUnionType([]*Type{c.regularFalseType, c.regularTrueType})
	c.esSymbolType = c.newIntrinsicType(TypeFlagsESSymbol, "symbol")
	c.voidType = c.newIntrinsicType(TypeFlagsVoid, "void")
	c.neverType = c.newIntrinsicType(TypeFlagsNever, "never")
	c.silentNeverType = c.newIntrinsicTypeEx(TypeFlagsNever, "never", ObjectFlagsNonInferrableType)
	c.implicitNeverType = c.newIntrinsicType(TypeFlagsNever, "never")
	c.unreachableNeverType = c.newIntrinsicType(TypeFlagsNever, "never")
	c.nonPrimitiveType = c.newIntrinsicType(TypeFlagsNonPrimitive, "object")
	c.stringOrNumberType = c.getUnionType([]*Type{c.stringType, c.numberType})
	c.stringNumberSymbolType = c.getUnionType([]*Type{c.stringType, c.numberType, c.esSymbolType})
	c.numberOrBigIntType = c.getUnionType([]*Type{c.numberType, c.bigintType})
	c.numericStringType = c.numberType                                // !!!
	c.uniqueLiteralType = c.newIntrinsicType(TypeFlagsNever, "never") // Special `never` flagged by union reduction to behave as a literal
	c.uniqueLiteralMapper = newFunctionTypeMapper(c.getUniqueLiteralTypeForTypeParameter)
	c.reportUnreliableMapper = newFunctionTypeMapper(c.reportUnreliableWorker)
	c.reportUnmeasurableMapper = newFunctionTypeMapper(c.reportUnmeasurableWorker)
	c.emptyObjectType = c.newAnonymousType(nil /*symbol*/, nil, nil, nil, nil)
	c.emptyTypeLiteralType = c.newAnonymousType(c.newSymbol(ast.SymbolFlagsTypeLiteral, InternalSymbolNameType), nil, nil, nil, nil)
	c.unknownEmptyObjectType = c.newAnonymousType(nil /*symbol*/, nil, nil, nil, nil)
	c.unknownUnionType = c.createUnknownUnionType()
	c.emptyGenericType = c.newAnonymousType(nil /*symbol*/, nil, nil, nil, nil)
	c.emptyGenericType.AsObjectType().instantiations = make(map[string]*Type)
	c.anyFunctionType = c.newAnonymousType(nil /*symbol*/, nil, nil, nil, nil)
	c.anyFunctionType.objectFlags |= ObjectFlagsNonInferrableType
	c.noConstraintType = c.newAnonymousType(nil /*symbol*/, nil, nil, nil, nil)
	c.circularConstraintType = c.newAnonymousType(nil /*symbol*/, nil, nil, nil, nil)
	c.markerSuperType = c.newTypeParameter(nil)
	c.markerSubType = c.newTypeParameter(nil)
	c.markerSubType.AsTypeParameter().constraint = c.markerSuperType
	c.markerOtherType = c.newTypeParameter(nil)
	c.markerSuperTypeForCheck = c.newTypeParameter(nil)
	c.markerSubTypeForCheck = c.newTypeParameter(nil)
	c.markerSubTypeForCheck.AsTypeParameter().constraint = c.markerSuperTypeForCheck
	c.noTypePredicate = &TypePredicate{kind: TypePredicateKindIdentifier, parameterIndex: 0, parameterName: "<<unresolved>>", t: c.anyType}
	c.anySignature = c.newSignature(SignatureFlagsNone, nil, nil, nil, nil, c.anyType, nil, 0)
	c.unknownSignature = c.newSignature(SignatureFlagsNone, nil, nil, nil, nil, c.errorType, nil, 0)
	c.resolvingSignature = c.newSignature(SignatureFlagsNone, nil, nil, nil, nil, c.anyType, nil, 0)
	c.silentNeverSignature = c.newSignature(SignatureFlagsNone, nil, nil, nil, nil, c.silentNeverType, nil, 0)
	c.enumNumberIndexInfo = &IndexInfo{keyType: c.numberType, valueType: c.stringType, isReadonly: true}
	c.emptyStringType = c.getStringLiteralType("")
	c.zeroType = c.getNumberLiteralType(0)
	c.zeroBigIntType = c.getBigIntLiteralType(PseudoBigInt{negative: false, base10Value: "0"})
	c.flowNodePostSuper = make(map[*ast.FlowNode]bool)
	c.subtypeRelation = &Relation{}
	c.strictSubtypeRelation = &Relation{}
	c.assignableRelation = &Relation{}
	c.comparableRelation = &Relation{}
	c.identityRelation = &Relation{}
	c.enumRelation = &Relation{}
	c.getGlobalNonNullableTypeAliasOrNil = c.getGlobalTypeAliasResolver("NonNullable", 1 /*arity*/, false /*reportErrors*/)
	c.getGlobalExtractSymbol = c.getGlobalTypeAliasResolver("Extract", 2 /*arity*/, true /*reportErrors*/)
	c.getGlobalDisposableType = c.getGlobalTypeResolver("Disposable", 0 /*arity*/, true /*reportErrors*/)
	c.getGlobalAsyncDisposableType = c.getGlobalTypeResolver("AsyncDisposable", 0 /*arity*/, true /*reportErrors*/)
	c.getGlobalAwaitedSymbol = c.getGlobalTypeAliasResolver("Awaited", 1 /*arity*/, true /*reportErrors*/)
	c.getGlobalAwaitedSymbolOrNil = c.getGlobalTypeAliasResolver("Awaited", 1 /*arity*/, false /*reportErrors*/)
	c.getGlobalNaNSymbol = c.getGlobalValueSymbolResolver("NaN", false /*reportErrors*/)
	c.initializeClosures()
	c.initializeChecker()
	return c
}

func (c *Checker) reportUnreliableWorker(t *Type) *Type {
	if c.outofbandVarianceMarkerHandler != nil && (t == c.markerSuperType || t == c.markerSubType || t == c.markerOtherType) {
		c.outofbandVarianceMarkerHandler(true /*onlyUnreliable*/)
	}
	return t
}

func (c *Checker) reportUnmeasurableWorker(t *Type) *Type {
	if c.outofbandVarianceMarkerHandler != nil && (t == c.markerSuperType || t == c.markerSubType || t == c.markerOtherType) {
		c.outofbandVarianceMarkerHandler(false /*onlyUnreliable*/)
	}
	return t
}

func (c *Checker) getStrictOptionValue(value core.Tristate) bool {
	if value != core.TSUnknown {
		return value == core.TSTrue
	}
	return c.compilerOptions.Strict == core.TSTrue
}

func (c *Checker) getGlobalTypeResolver(name string, arity int, reportErrors bool) func() *Type {
	return core.Memoize(func() *Type {
		return c.getGlobalType(name, arity, reportErrors)
	})
}

func (c *Checker) getGlobalTypeAliasResolver(name string, arity int, reportErrors bool) func() *ast.Symbol {
	return core.Memoize(func() *ast.Symbol {
		return c.getGlobalTypeAliasSymbol(name, arity, reportErrors)
	})
}

func (c *Checker) getGlobalValueSymbolResolver(name string, reportErrors bool) func() *ast.Symbol {
	return core.Memoize(func() *ast.Symbol {
		return c.getGlobalSymbol(name, ast.SymbolFlagsValue, core.IfElse(reportErrors, diagnostics.Cannot_find_global_value_0, nil))
	})
}

func (c *Checker) getGlobalTypeAliasSymbol(name string, arity int, reportErrors bool) *ast.Symbol {
	symbol := c.getGlobalSymbol(name, ast.SymbolFlagsTypeAlias, core.IfElse(reportErrors, diagnostics.Cannot_find_global_type_0, nil))
	if symbol == nil {
		return nil
	}
	// Resolve the declared type of the symbol. This resolves type parameters for the type alias so that we can check arity.
	c.getDeclaredTypeOfSymbol(symbol)
	if len(c.typeAliasLinks.get(symbol).typeParameters) != arity {
		if reportErrors {
			decl := core.Find(symbol.Declarations, ast.IsTypeAliasDeclaration)
			c.error(decl, diagnostics.Global_type_0_must_have_1_type_parameter_s, symbolName(symbol), arity)
		}
		return nil
	}
	return symbol
}

func (c *Checker) getGlobalType(name string, arity int, reportErrors bool) *Type {
	symbol := c.getGlobalSymbol(name, ast.SymbolFlagsType, core.IfElse(reportErrors, diagnostics.Cannot_find_global_type_0, nil))
	if symbol != nil {
		if symbol.Flags&(ast.SymbolFlagsClass|ast.SymbolFlagsInterface) != 0 {
			t := c.getDeclaredTypeOfSymbol(symbol)
			if len(t.AsInterfaceType().TypeParameters()) == arity {
				return t
			}
			if reportErrors {
				c.error(getGlobalTypeDeclaration(symbol), diagnostics.Global_type_0_must_have_1_type_parameter_s, symbolName(symbol), arity)
			}
		} else if reportErrors {
			c.error(getGlobalTypeDeclaration(symbol), diagnostics.Global_type_0_must_be_a_class_or_interface_type, symbolName(symbol))
		}
	}
	if arity != 0 {
		return c.emptyGenericType
	}
	return c.emptyObjectType
}

func getGlobalTypeDeclaration(symbol *ast.Symbol) *ast.Declaration {
	for _, declaration := range symbol.Declarations {
		switch declaration.Kind {
		case ast.KindClassDeclaration, ast.KindInterfaceDeclaration, ast.KindEnumDeclaration, ast.KindTypeAliasDeclaration:
			return declaration
		}
	}
	return nil
}

func (c *Checker) getGlobalSymbol(name string, meaning ast.SymbolFlags, diagnostic *diagnostics.Message) *ast.Symbol {
	// Don't track references for global symbols anyway, so value if `isReference` is arbitrary
	return c.resolveName(nil, name, meaning, diagnostic, false /*isUse*/, false /*excludeGlobals*/)
}

func (c *Checker) initializeClosures() {
	c.isPrimitiveOrObjectOrEmptyType = func(t *Type) bool {
		return t.flags&(TypeFlagsPrimitive|TypeFlagsNonPrimitive) != 0 || c.isEmptyAnonymousObjectType(t)
	}
	c.containsMissingType = func(t *Type) bool {
		return t == c.missingType || t.flags&TypeFlagsUnion != 0 && t.Types()[0] == c.missingType
	}
	c.couldContainTypeVariables = c.couldContainTypeVariablesWorker
	c.isStringIndexSignatureOnlyType = c.isStringIndexSignatureOnlyTypeWorker
}

func (c *Checker) initializeChecker() {
	c.program.bindSourceFiles()
	// Initialize global symbol table
	augmentations := make([][]*ast.Node, 0, len(c.files))
	for _, file := range c.files {
		if !isExternalOrCommonJsModule(file) {
			c.mergeSymbolTable(c.globals, file.Locals, false, nil)
		}
		c.patternAmbientModules = append(c.patternAmbientModules, file.PatternAmbientModules...)
		augmentations = append(augmentations, file.ModuleAugmentations)
		if file.Symbol != nil {
			// Merge in UMD exports with first-in-wins semantics (see #9771)
			for name, symbol := range file.Symbol.GlobalExports {
				if _, ok := c.globals[name]; !ok {
					c.globals[name] = symbol
				}
			}
		}
	}
	// We do global augmentations separately from module augmentations (and before creating global types) because they
	//  1. Affect global types. We won't have the correct global types until global augmentations are merged. Also,
	//  2. Module augmentation instantiation requires creating the type of a module, which, in turn, can require
	//       checking for an export or property on the module (if export=) which, in turn, can fall back to the
	//       apparent type of the module - either globalObjectType or globalFunctionType - which wouldn't exist if we
	//       did module augmentations prior to finalizing the global types.
	for _, list := range augmentations {
		for _, augmentation := range list {
			// Merge 'global' module augmentations. This needs to be done after global symbol table is initialized to
			// make sure that all ambient modules are indexed
			if isGlobalScopeAugmentation(augmentation.Parent) {
				c.mergeModuleAugmentation(augmentation)
			}
		}
	}
	c.addUndefinedToGlobalsOrErrorOnRedeclaration()
	c.valueSymbolLinks.get(c.undefinedSymbol).resolvedType = c.undefinedWideningType
	c.valueSymbolLinks.get(c.argumentsSymbol).resolvedType = c.errorType // !!!
	c.valueSymbolLinks.get(c.unknownSymbol).resolvedType = c.errorType
	c.valueSymbolLinks.get(c.globalThisSymbol).resolvedType = c.newObjectType(ObjectFlagsAnonymous, c.globalThisSymbol)
	// Initialize special types
	c.globalArrayType = c.getGlobalType("Array", 1 /*arity*/, true /*reportErrors*/)
	c.globalObjectType = c.getGlobalType("Object", 0 /*arity*/, true /*reportErrors*/)
	c.globalFunctionType = c.getGlobalType("Function", 0 /*arity*/, true /*reportErrors*/)
	c.globalCallableFunctionType = c.getGlobalStrictFunctionType("CallableFunction")
	c.globalNewableFunctionType = c.getGlobalStrictFunctionType("NewableFunction")
	c.globalStringType = c.getGlobalType("String", 0 /*arity*/, true /*reportErrors*/)
	c.globalNumberType = c.getGlobalType("Number", 0 /*arity*/, true /*reportErrors*/)
	c.globalBooleanType = c.getGlobalType("Boolean", 0 /*arity*/, true /*reportErrors*/)
	c.globalRegExpType = c.getGlobalType("RegExp", 0 /*arity*/, true /*reportErrors*/)
	c.anyArrayType = c.createArrayType(c.anyType)
	c.autoArrayType = c.createArrayType(c.autoType)
	if c.autoArrayType == c.emptyObjectType {
		// autoArrayType is used as a marker, so even if global Array type is not defined, it needs to be a unique type
		c.autoArrayType = c.newAnonymousType(nil, nil, nil, nil, nil)
	}
	c.globalReadonlyArrayType = c.getGlobalType("ReadonlyArray", 1 /*arity*/, false /*reportErrors*/)
	if c.globalReadonlyArrayType == nil {
		c.globalReadonlyArrayType = c.globalArrayType
	}
	c.anyReadonlyArrayType = c.createTypeFromGenericGlobalType(c.globalReadonlyArrayType, []*Type{c.anyType})
	c.globalThisType = c.getGlobalType("ThisType", 1 /*arity*/, false /*reportErrors*/)
	// merge _nonglobal_ module augmentations.
	// this needs to be done after global symbol table is initialized to make sure that all ambient modules are indexed
	for _, list := range augmentations {
		for _, augmentation := range list {
			if !isGlobalScopeAugmentation(augmentation.Parent) {
				c.mergeModuleAugmentation(augmentation)
			}
		}
	}
}

func (c *Checker) mergeModuleAugmentation(moduleName *ast.Node) {
	moduleNode := moduleName.Parent
	moduleAugmentation := moduleNode.AsModuleDeclaration()
	if moduleAugmentation.Symbol.Declarations[0] != moduleNode {
		// this is a combined symbol for multiple augmentations within the same file.
		// its symbol already has accumulated information for all declarations
		// so we need to add it just once - do the work only for first declaration
		return
	}
	if isGlobalScopeAugmentation(moduleNode) {
		c.mergeSymbolTable(c.globals, moduleAugmentation.Symbol.Exports, false /*unidirectional*/, nil /*parent*/)
	} else {
		// find a module that about to be augmented
		// do not validate names of augmentations that are defined in ambient context
		var moduleNotFoundError *diagnostics.Message
		if moduleName.Parent.Parent.Flags&ast.NodeFlagsAmbient == 0 {
			moduleNotFoundError = diagnostics.Invalid_module_name_in_augmentation_module_0_cannot_be_found
		}
		mainModule := c.resolveExternalModuleNameWorker(moduleName, moduleName, moduleNotFoundError /*ignoreErrors*/, false /*isForAugmentation*/, true)
		if mainModule == nil {
			return
		}
		// obtain item referenced by 'export='
		mainModule = c.resolveExternalModuleSymbol(mainModule, false /*dontResolveAlias*/)
		if mainModule.Flags&ast.SymbolFlagsNamespace != 0 {
			// If we're merging an augmentation to a pattern ambient module, we want to
			// perform the merge unidirectionally from the augmentation ('a.foo') to
			// the pattern ('*.foo'), so that 'getMergedSymbol()' on a.foo gives you
			// all the exports both from the pattern and from the augmentation, but
			// 'getMergedSymbol()' on *.foo only gives you exports from *.foo.
			if core.Some(c.patternAmbientModules, func(module ast.PatternAmbientModule) bool {
				return mainModule == module.Symbol
			}) {
				merged := c.mergeSymbol(moduleAugmentation.Symbol, mainModule, true /*unidirectional*/)
				// moduleName will be a StringLiteral since this is not `declare global`.
				getSymbolTable(&c.patternAmbientModuleAugmentations)[moduleName.Text()] = merged
			} else {
				if mainModule.Exports[InternalSymbolNameExportStar] != nil && len(moduleAugmentation.Symbol.Exports) != 0 {
					// We may need to merge the module augmentation's exports into the target symbols of the resolved exports
					resolvedExports := c.getResolvedMembersOrExportsOfSymbol(mainModule, MembersOrExportsResolutionKindResolvedExports)
					for key, value := range moduleAugmentation.Symbol.Exports {
						if resolvedExports[key] != nil && mainModule.Exports[key] == nil {
							c.mergeSymbol(resolvedExports[key], value, false /*unidirectional*/)
						}
					}
				}
				c.mergeSymbol(mainModule, moduleAugmentation.Symbol, false /*unidirectional*/)
			}
		} else {
			// moduleName will be a StringLiteral since this is not `declare global`.
			c.error(moduleName, diagnostics.Cannot_augment_module_0_because_it_resolves_to_a_non_module_entity, moduleName.Text())
		}
	}
}

func (c *Checker) addUndefinedToGlobalsOrErrorOnRedeclaration() {
	name := c.undefinedSymbol.Name
	targetSymbol := c.globals[name]
	if targetSymbol != nil {
		for _, declaration := range targetSymbol.Declarations {
			if !isTypeDeclaration(declaration) {
				c.diagnostics.add(createDiagnosticForNode(declaration, diagnostics.Declaration_name_conflicts_with_built_in_global_identifier_0, name))
			}
		}
	} else {
		c.globals[name] = c.undefinedSymbol
	}
}

func (c *Checker) createNameResolver() *NameResolver {
	return &NameResolver{
		compilerOptions:                  c.compilerOptions,
		getSymbolOfDeclaration:           c.getSymbolOfDeclaration,
		error:                            c.error,
		globals:                          c.globals,
		argumentsSymbol:                  c.argumentsSymbol,
		requireSymbol:                    c.requireSymbol,
		lookup:                           c.getSymbol,
		setRequiresScopeChangeCache:      c.setRequiresScopeChangeCache,
		getRequiresScopeChangeCache:      c.getRequiresScopeChangeCache,
		onPropertyWithInvalidInitializer: c.checkAndReportErrorForInvalidInitializer,
		onFailedToResolveSymbol:          c.onFailedToResolveSymbol,
		onSuccessfullyResolvedSymbol:     c.onSuccessfullyResolvedSymbol,
	}
}

func (c *Checker) getRequiresScopeChangeCache(node *ast.Node) core.Tristate {
	return c.nodeLinks.get(node).declarationRequiresScopeChange
}

func (c *Checker) setRequiresScopeChangeCache(node *ast.Node, value core.Tristate) {
	c.nodeLinks.get(node).declarationRequiresScopeChange = value
}

// The invalid initializer error is needed in two situation:
// 1. When result is undefined, after checking for a missing "this."
// 2. When result is defined
func (c *Checker) checkAndReportErrorForInvalidInitializer(errorLocation *ast.Node, name string, propertyWithInvalidInitializer *ast.Node, result *ast.Symbol) bool {
	if !getEmitStandardClassFields(c.compilerOptions) {
		if errorLocation != nil && result == nil && c.checkAndReportErrorForMissingPrefix(errorLocation, name) {
			return true
		}
		// We have a match, but the reference occurred within a property initializer and the identifier also binds
		// to a local variable in the constructor where the code will be emitted. Note that this is actually allowed
		// with emitStandardClassFields because the scope semantics are different.
		prop := propertyWithInvalidInitializer.AsPropertyDeclaration()
		message := core.IfElse(errorLocation != nil && prop.Type != nil && prop.Type.Loc.ContainsInclusive(errorLocation.Pos()),
			diagnostics.Type_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor,
			diagnostics.Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor)
		c.error(errorLocation, message, declarationNameToString(prop.Name()), name)
		return true
	}
	return false
}

func (c *Checker) onFailedToResolveSymbol(errorLocation *ast.Node, name string, meaning ast.SymbolFlags, nameNotFoundMessage *diagnostics.Message) {
	// !!!
	c.error(errorLocation, nameNotFoundMessage, name, "???")
}

func (c *Checker) onSuccessfullyResolvedSymbol(errorLocation *ast.Node, result *ast.Symbol, meaning ast.SymbolFlags, lastLocation *ast.Node, associatedDeclarationForContainingInitializerOrBindingName *ast.Node, withinDeferredContext bool) {
	name := result.Name
	isInExternalModule := lastLocation != nil && ast.IsSourceFile(lastLocation) && isExternalOrCommonJsModule(lastLocation.AsSourceFile())
	// Only check for block-scoped variable if we have an error location and are looking for the
	// name with variable meaning
	//      For example,
	//          declare module foo {
	//              interface bar {}
	//          }
	//      const foo/*1*/: foo/*2*/.bar;
	// The foo at /*1*/ and /*2*/ will share same symbol with two meanings:
	// block-scoped variable and namespace module. However, only when we
	// try to resolve name in /*1*/ which is used in variable position,
	// we want to check for block-scoped
	if errorLocation != nil && (meaning&ast.SymbolFlagsBlockScopedVariable != 0 || meaning&(ast.SymbolFlagsClass|ast.SymbolFlagsEnum) != 0 && meaning&ast.SymbolFlagsValue == ast.SymbolFlagsValue) {
		exportOrLocalSymbol := c.getExportSymbolOfValueSymbolIfExported(result)
		if exportOrLocalSymbol.Flags&(ast.SymbolFlagsBlockScopedVariable|ast.SymbolFlagsClass|ast.SymbolFlagsEnum) != 0 {
			c.checkResolvedBlockScopedVariable(exportOrLocalSymbol, errorLocation)
		}
	}
	// If we're in an external module, we can't reference value symbols created from UMD export declarations
	if isInExternalModule && (meaning&ast.SymbolFlagsValue) == ast.SymbolFlagsValue && errorLocation.Flags&ast.NodeFlagsJSDoc == 0 {
		merged := c.getMergedSymbol(result)
		if len(merged.Declarations) != 0 && core.Every(merged.Declarations, func(d *ast.Node) bool {
			return ast.IsNamespaceExportDeclaration(d) || ast.IsSourceFile(d) && d.Symbol().GlobalExports != nil
		}) {
			c.errorOrSuggestion(c.compilerOptions.AllowUmdGlobalAccess != core.TSTrue, errorLocation, diagnostics.X_0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead, name)
		}
	}
	// If we're in a parameter initializer or binding name, we can't reference the values of the parameter whose initializer we're within or parameters to the right
	if associatedDeclarationForContainingInitializerOrBindingName != nil && !withinDeferredContext && (meaning&ast.SymbolFlagsValue) == ast.SymbolFlagsValue {
		candidate := c.getMergedSymbol(c.getLateBoundSymbol(result))
		root := getRootDeclaration(associatedDeclarationForContainingInitializerOrBindingName)
		// A parameter initializer or binding pattern initializer within a parameter cannot refer to itself
		if candidate == c.getSymbolOfDeclaration(associatedDeclarationForContainingInitializerOrBindingName) {
			c.error(errorLocation, diagnostics.Parameter_0_cannot_reference_itself, declarationNameToString(associatedDeclarationForContainingInitializerOrBindingName.Name()))
		} else if candidate.ValueDeclaration != nil && candidate.ValueDeclaration.Pos() > associatedDeclarationForContainingInitializerOrBindingName.Pos() && root.Parent.Locals() != nil && c.getSymbol(root.Parent.Locals(), candidate.Name, meaning) == candidate {
			c.error(errorLocation, diagnostics.Parameter_0_cannot_reference_identifier_1_declared_after_it, declarationNameToString(associatedDeclarationForContainingInitializerOrBindingName.Name()), declarationNameToString(errorLocation))
		}
	}
	if errorLocation != nil && meaning&ast.SymbolFlagsValue != 0 && result.Flags&ast.SymbolFlagsAlias != 0 && result.Flags&ast.SymbolFlagsValue == 0 && !isValidTypeOnlyAliasUseSite(errorLocation) {
		typeOnlyDeclaration := c.getTypeOnlyAliasDeclarationEx(result, ast.SymbolFlagsValue)
		if typeOnlyDeclaration != nil {
			message := core.IfElse(ast.NodeKindIs(typeOnlyDeclaration, ast.KindExportSpecifier, ast.KindExportDeclaration, ast.KindNamespaceExport),
				diagnostics.X_0_cannot_be_used_as_a_value_because_it_was_exported_using_export_type,
				diagnostics.X_0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type)
			c.addTypeOnlyDeclarationRelatedInfo(c.error(errorLocation, message, name), typeOnlyDeclaration, name)
		}
	}
	// Look at 'compilerOptions.isolatedModules' and not 'getIsolatedModules(...)' (which considers 'verbatimModuleSyntax')
	// here because 'verbatimModuleSyntax' will already have an error for importing a type without 'import type'.
	if c.compilerOptions.IsolatedModules == core.TSTrue && result != nil && isInExternalModule && (meaning&ast.SymbolFlagsValue) == ast.SymbolFlagsValue {
		isGlobal := c.getSymbol(c.globals, name, meaning) == result
		var nonValueSymbol *ast.Symbol
		if isGlobal && ast.IsSourceFile(lastLocation) {
			nonValueSymbol = c.getSymbol(lastLocation.Locals(), name, ^ast.SymbolFlagsValue)
		}
		if nonValueSymbol != nil {
			importDecl := core.Find(nonValueSymbol.Declarations, func(d *ast.Node) bool {
				return ast.NodeKindIs(d, ast.KindImportSpecifier, ast.KindImportClause, ast.KindNamespaceImport, ast.KindImportEqualsDeclaration)
			})
			if importDecl != nil && !isTypeOnlyImportDeclaration(importDecl) {
				c.error(importDecl, diagnostics.Import_0_conflicts_with_global_value_used_in_this_file_so_must_be_declared_with_a_type_only_import_when_isolatedModules_is_enabled, name)
			}
		}
	}
}

func (c *Checker) checkResolvedBlockScopedVariable(result *ast.Symbol, errorLocation *ast.Node) {
	//Debug.assert(!!(result.flags&ast.SymbolFlagsBlockScopedVariable || result.flags&ast.SymbolFlagsClass || result.flags&ast.SymbolFlagsEnum))
	if result.Flags&(ast.SymbolFlagsFunction|ast.SymbolFlagsFunctionScopedVariable|ast.SymbolFlagsAssignment) != 0 && result.Flags&ast.SymbolFlagsClass != 0 {
		// constructor functions aren't block scoped
		return
	}
	// Block-scoped variables cannot be used before their definition
	declaration := core.Find(result.Declarations, func(d *ast.Node) bool {
		return isBlockOrCatchScoped(d) || ast.IsClassLike(d) || ast.IsEnumDeclaration(d)
	})
	if declaration == nil {
		panic("checkResolvedBlockScopedVariable could not find block-scoped declaration")
	}
	if declaration.Flags&ast.NodeFlagsAmbient == 0 && !c.isBlockScopedNameDeclaredBeforeUse(declaration, errorLocation) {
		var diagnostic *ast.Diagnostic
		declarationName := declarationNameToString(getNameOfDeclaration(declaration))
		if result.Flags&ast.SymbolFlagsBlockScopedVariable != 0 {
			diagnostic = c.error(errorLocation, diagnostics.Block_scoped_variable_0_used_before_its_declaration, declarationName)
		} else if result.Flags&ast.SymbolFlagsClass != 0 {
			diagnostic = c.error(errorLocation, diagnostics.Class_0_used_before_its_declaration, declarationName)
		} else if result.Flags&ast.SymbolFlagsRegularEnum != 0 {
			diagnostic = c.error(errorLocation, diagnostics.Enum_0_used_before_its_declaration, declarationName)
		} else {
			//Debug.assert(!!(result.flags & ast.SymbolFlagsConstEnum))
			if getIsolatedModules(c.compilerOptions) {
				diagnostic = c.error(errorLocation, diagnostics.Enum_0_used_before_its_declaration, declarationName)
			}
		}
		if diagnostic != nil {
			diagnostic.AddRelatedInfo(createDiagnosticForNode(declaration, diagnostics.X_0_is_declared_here, declarationName))
		}
	}
}

func (c *Checker) isBlockScopedNameDeclaredBeforeUse(declaration *ast.Node, usage *ast.Node) bool {
	return true // !!!
}

func (c *Checker) checkAndReportErrorForMissingPrefix(errorLocation *ast.Node, name string) bool {
	return false // !!!
}

func (c *Checker) getTypeOnlyAliasDeclaration(symbol *ast.Symbol) *ast.Node {
	return c.getTypeOnlyAliasDeclarationEx(symbol, ast.SymbolFlagsNone)
}

func (c *Checker) getTypeOnlyAliasDeclarationEx(symbol *ast.Symbol, include ast.SymbolFlags) *ast.Node {
	if symbol.Flags&ast.SymbolFlagsAlias == 0 {
		return nil
	}
	links := c.aliasSymbolLinks.get(symbol)
	if !links.typeOnlyDeclarationResolved {
		// We need to set a WIP value here to prevent reentrancy during `getImmediateAliasedSymbol` which, paradoxically, can depend on this
		links.typeOnlyDeclarationResolved = true
		resolved := c.resolveSymbol(symbol)
		// While usually the alias will have been marked during the pass by the full typecheck, we may still need to calculate the alias declaration now
		var immediateTarget *ast.Symbol
		if c.getDeclarationOfAliasSymbol(symbol) != nil {
			immediateTarget = c.getImmediateAliasedSymbol(symbol)
		}
		c.markSymbolOfAliasDeclarationIfTypeOnly(symbol.Declarations[0], immediateTarget, resolved, true /*overwriteEmpty*/, nil, "")
	}
	if include == ast.SymbolFlagsNone {
		return links.typeOnlyDeclaration
	}
	if links.typeOnlyDeclaration != nil {
		var resolved *ast.Symbol
		if links.typeOnlyDeclaration.Kind == ast.KindExportDeclaration {
			name := links.typeOnlyExportStarName
			if name == "" {
				name = symbol.Name
			}
			resolved = c.resolveSymbol(c.getExportsOfModule(links.typeOnlyDeclaration.Symbol().Parent)[name])
		} else {
			resolved = c.resolveAlias(links.typeOnlyDeclaration.Symbol())
		}
		if c.getSymbolFlags(resolved)&include != 0 {
			return links.typeOnlyDeclaration
		}
	}
	return nil
}

func (c *Checker) getImmediateAliasedSymbol(symbol *ast.Symbol) *ast.Symbol {
	// Debug.assert((symbol.flags&SymbolFlagsAlias) != 0, "Should only get Alias here.")
	links := c.aliasSymbolLinks.get(symbol)
	if links.immediateTarget == nil {
		node := c.getDeclarationOfAliasSymbol(symbol)
		if node == nil {
			panic("Unexpected nil in getImmediateAliasedSymbol")
		}
		links.immediateTarget = c.getTargetOfAliasDeclaration(node, true /*dontRecursivelyResolve*/)
	}

	return links.immediateTarget
}

func (c *Checker) addTypeOnlyDeclarationRelatedInfo(diagnostic *ast.Diagnostic, typeOnlyDeclaration *ast.Node, name string) {
	// !!!
}

func (c *Checker) getSymbol(symbols ast.SymbolTable, name string, meaning ast.SymbolFlags) *ast.Symbol {
	if meaning != 0 {
		symbol := c.getMergedSymbol(symbols[name])
		if symbol != nil {
			if symbol.Flags&meaning != 0 {
				return symbol
			}
			if symbol.Flags&ast.SymbolFlagsAlias != 0 {
				targetFlags := c.getSymbolFlags(symbol)
				// `targetFlags` will be `SymbolFlags.All` if an error occurred in alias resolution; this avoids cascading errors
				if targetFlags&meaning != 0 {
					return symbol
				}
			}
		}
	}
	// return nil if we can't find a symbol
	return nil
}

func (c *Checker) checkSourceFile(sourceFile *ast.SourceFile) {
	links := c.sourceFileLinks.get(sourceFile)
	if !links.typeChecked {
		// Grammar checking
		c.checkGrammarSourceFile(sourceFile)

		// !!!
		c.checkSourceElements(sourceFile.Statements.Nodes)
		c.checkDeferredNodes(sourceFile)
		links.typeChecked = true
	}
}

func (c *Checker) checkSourceElements(nodes []*ast.Node) {
	for _, node := range nodes {
		c.checkSourceElement(node)
	}
}

func (c *Checker) checkSourceElement(node *ast.Node) bool {
	if node != nil {
		saveCurrentNode := c.currentNode
		c.currentNode = node
		c.instantiationCount = 0
		c.checkSourceElementWorker(node)
		c.currentNode = saveCurrentNode
	}
	return false
}

func (c *Checker) checkSourceElementWorker(node *ast.Node) {
	// !!! Cancellation
	kind := node.Kind
	if kind >= ast.KindFirstStatement && kind <= ast.KindLastStatement {
		flowNode := node.FlowNodeData().FlowNode
		if flowNode != nil && !c.isReachableFlowNode(flowNode) {
			c.errorOrSuggestion(c.compilerOptions.AllowUnreachableCode == core.TSFalse, node, diagnostics.Unreachable_code_detected)
		}
	}
	switch node.Kind {
	case ast.KindTypeParameter:
		c.checkTypeParameter(node)
	case ast.KindParameter:
		c.checkParameter(node)
	case ast.KindPropertyDeclaration:
		c.checkPropertyDeclaration(node)
	case ast.KindPropertySignature:
		c.checkPropertySignature(node)
	case ast.KindConstructorType, ast.KindFunctionType, ast.KindCallSignature, ast.KindConstructSignature, ast.KindIndexSignature:
		c.checkSignatureDeclaration(node)
	case ast.KindMethodDeclaration, ast.KindMethodSignature:
		c.checkMethodDeclaration(node)
	case ast.KindClassStaticBlockDeclaration:
		c.checkClassStaticBlockDeclaration(node)
	case ast.KindConstructor:
		c.checkConstructorDeclaration(node)
	case ast.KindGetAccessor, ast.KindSetAccessor:
		c.checkAccessorDeclaration(node)
	case ast.KindTypeReference:
		c.checkTypeReferenceNode(node)
	case ast.KindTypePredicate:
		c.checkTypePredicate(node)
	case ast.KindTypeQuery:
		c.checkTypeQuery(node)
	case ast.KindTypeLiteral:
		c.checkTypeLiteral(node)
	case ast.KindArrayType:
		c.checkArrayType(node)
	case ast.KindTupleType:
		c.checkTupleType(node)
	case ast.KindUnionType, ast.KindIntersectionType:
		c.checkUnionOrIntersectionType(node)
	case ast.KindParenthesizedType, ast.KindOptionalType, ast.KindRestType:
		node.ForEachChild(c.checkSourceElement)
	case ast.KindThisType:
		c.checkThisType(node)
	case ast.KindTypeOperator:
		c.checkTypeOperator(node)
	case ast.KindConditionalType:
		c.checkConditionalType(node)
	case ast.KindInferType:
		c.checkInferType(node)
	case ast.KindTemplateLiteralType:
		c.checkTemplateLiteralType(node)
	case ast.KindImportType:
		c.checkImportType(node)
	case ast.KindNamedTupleMember:
		c.checkNamedTupleMember(node)
	case ast.KindIndexedAccessType:
		c.checkIndexedAccessType(node)
	case ast.KindMappedType:
		c.checkMappedType(node)
	case ast.KindFunctionDeclaration:
		c.checkFunctionDeclaration(node)
	case ast.KindBlock, ast.KindModuleBlock:
		c.checkBlock(node)
	case ast.KindVariableStatement:
		c.checkVariableStatement(node)
	case ast.KindExpressionStatement:
		c.checkExpressionStatement(node)
	case ast.KindIfStatement:
		c.checkIfStatement(node)
	case ast.KindDoStatement:
		c.checkDoStatement(node)
	case ast.KindWhileStatement:
		c.checkWhileStatement(node)
	case ast.KindForStatement:
		c.checkForStatement(node)
	case ast.KindForInStatement:
		c.checkForInStatement(node)
	case ast.KindForOfStatement:
		c.checkForOfStatement(node)
	case ast.KindContinueStatement, ast.KindBreakStatement:
		c.checkBreakOrContinueStatement(node)
	case ast.KindReturnStatement:
		c.checkReturnStatement(node)
	case ast.KindWithStatement:
		c.checkWithStatement(node)
	case ast.KindSwitchStatement:
		c.checkSwitchStatement(node)
	case ast.KindLabeledStatement:
		c.checkLabeledStatement(node)
	case ast.KindThrowStatement:
		c.checkThrowStatement(node)
	case ast.KindTryStatement:
		c.checkTryStatement(node)
	case ast.KindVariableDeclaration:
		c.checkVariableDeclaration(node)
	case ast.KindBindingElement:
		c.checkBindingElement(node)
	case ast.KindClassDeclaration:
		c.checkClassDeclaration(node)
	case ast.KindInterfaceDeclaration:
		c.checkInterfaceDeclaration(node)
	case ast.KindTypeAliasDeclaration:
		c.checkTypeAliasDeclaration(node)
	case ast.KindEnumDeclaration:
		c.checkEnumDeclaration(node)
	case ast.KindModuleDeclaration:
		c.checkModuleDeclaration(node)
	case ast.KindImportDeclaration:
		c.checkImportDeclaration(node)
	case ast.KindImportEqualsDeclaration:
		c.checkImportEqualsDeclaration(node)
	case ast.KindExportDeclaration:
		c.checkExportDeclaration(node)
	case ast.KindExportAssignment:
		c.checkExportAssignment(node)
	case ast.KindEmptyStatement, ast.KindDebuggerStatement:
		c.checkGrammarStatementInAmbientContext(node)
	case ast.KindMissingDeclaration:
		c.checkMissingDeclaration(node)
	default:
		// !!! Temporary
		if isExpressionNode(node) && !(ast.IsIdentifier(node) && isRightSideOfQualifiedNameOrPropertyAccess(node)) {
			_ = c.checkExpression(node)
		}
	}
}

// Function and class expression bodies are checked after all statements in the enclosing body. This is
// to ensure constructs like the following are permitted:
//
//	const foo = function () {
//	   const s = foo();
//	   return "hello";
//	}
//
// Here, performing a full type check of the body of the function expression whilst in the process of
// determining the type of foo would cause foo to be given type any because of the recursive reference.
// Delaying the type check of the body ensures foo has been assigned a type.
func (c *Checker) checkNodeDeferred(node *ast.Node) {
	enclosingFile := ast.GetSourceFileOfNode(node)
	links := c.sourceFileLinks.get(enclosingFile)
	if !links.typeChecked {
		links.deferredNodes.Add(node)
	}
}

func (c *Checker) checkDeferredNodes(context *ast.SourceFile) {
	links := c.sourceFileLinks.get(context)
	for node := range links.deferredNodes.Values() {
		c.checkDeferredNode(node)
	}
	links.deferredNodes.Clear()
}

func (c *Checker) checkDeferredNode(node *ast.Node) {
	saveCurrentNode := c.currentNode
	c.currentNode = node
	c.instantiationCount = 0
	// !!!
	// switch node.Kind {
	// case ast.KindCallExpression,
	// 	ast.KindNewExpression,
	// 	ast.KindTaggedTemplateExpression,
	// 	ast.KindDecorator,
	// 	ast.KindJsxOpeningElement:
	// 	// These node kinds are deferred checked when overload resolution fails
	// 	// To save on work, we ensure the arguments are checked just once, in
	// 	// a deferred way
	// 	c.resolveUntypedCall(node.AsCallLikeExpression())
	// case ast.KindFunctionExpression,
	// 	ast.KindArrowFunction,
	// 	ast.KindMethodDeclaration,
	// 	ast.KindMethodSignature:
	// 	c.checkFunctionExpressionOrObjectLiteralMethodDeferred(node.AsFunctionExpression())
	// case ast.KindGetAccessor,
	// 	ast.KindSetAccessor:
	// 	c.checkAccessorDeclaration(node.AsAccessorDeclaration())
	// case ast.KindClassExpression:
	// 	c.checkClassExpressionDeferred(node.AsClassExpression())
	// case ast.KindTypeParameter:
	// 	c.checkTypeParameterDeferred(node.AsTypeParameterDeclaration())
	// case ast.KindJsxSelfClosingElement:
	// 	c.checkJsxSelfClosingElementDeferred(node.AsJsxSelfClosingElement())
	// case ast.KindJsxElement:
	// 	c.checkJsxElementDeferred(node.AsJsxElement())
	// case ast.KindTypeAssertionExpression,
	// 	ast.KindAsExpression,
	// 	ast.KindParenthesizedExpression:
	// 	c.checkAssertionDeferred(node /* as AssertionExpression | JSDocTypeAssertion */)
	// case ast.KindVoidExpression:
	// 	c.checkExpression(node.AsVoidExpression().Expression)
	// case ast.KindBinaryExpression:
	// 	if isInstanceOfExpression(node) {
	// 		c.resolveUntypedCall(node)
	// 	}
	// }
	c.currentNode = saveCurrentNode
}

func (c *Checker) checkTypeParameter(node *ast.Node) {
	// Grammar Checking
	c.checkGrammarModifiers(node)
	if expr := node.AsTypeParameter().Expression; expr != nil {
		c.grammarErrorOnFirstToken(expr, diagnostics.Type_expected)
	}

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkParameter(node *ast.Node) {
	// Grammar checking
	// It is a SyntaxError if the Identifier "eval" or the Identifier "arguments" occurs as the
	// Identifier in a PropertySetParameterList of a PropertyAssignment that is contained in strict code
	// or if its FunctionBody is strict code(11.1.5).
	c.checkGrammarModifiers(node)

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkPropertyDeclaration(node *ast.Node) {
	// Grammar checking
	if !c.checkGrammarModifiers(node) && !c.checkGrammarProperty(node) {
		c.checkGrammarComputedPropertyName(node.Name())
	}
	c.checkVariableLikeDeclaration(node)

	// !!!
	// c.setNodeLinksForPrivateIdentifierScope(node)

	// property signatures already report "initializer not allowed in ambient context" elsewhere
	if hasSyntacticModifier(node, ast.ModifierFlagsAbstract) && ast.IsPropertyDeclaration(node) {
		propDecl := node.AsPropertyDeclaration()
		if propDecl.Initializer != nil {
			c.error(node, diagnostics.Property_0_cannot_have_an_initializer_because_it_is_marked_abstract, declarationNameToString(propDecl.Name()))
		}
	}
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkPropertySignature(node *ast.Node) {
	if ast.IsPrivateIdentifier(node.AsPropertySignatureDeclaration().Name()) {
		c.error(node, diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies)
	}

	c.checkPropertyDeclaration(node)
}

func (c *Checker) checkSignatureDeclaration(node *ast.Node) {
	// Grammar checking
	if node.Kind == ast.KindIndexSignature {
		c.checkGrammarIndexSignature(node.AsIndexSignatureDeclaration())
	} else if node.Kind == ast.KindFunctionType || node.Kind == ast.KindFunctionDeclaration || node.Kind == ast.KindConstructorType || node.Kind == ast.KindCallSignature || node.Kind == ast.KindConstructor || node.Kind == ast.KindConstructSignature {
		c.checkGrammarFunctionLikeDeclaration(node)
	}

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkMethodDeclaration(node *ast.Node) {
	// Grammar checking
	if !c.checkGrammarMethod(node) {
		c.checkGrammarComputedPropertyName(node.Name())
	}

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkClassStaticBlockDeclaration(node *ast.Node) {
	// Grammar checking
	c.checkGrammarModifiers(node)

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkConstructorDeclaration(node *ast.Node) {
	// Grammar check on signature of constructor and modifier of the constructor is done in checkSignatureDeclaration function.
	c.checkSignatureDeclaration(node)
	// Grammar check for checking only related to constructorDeclaration
	ctor := node.AsConstructorDeclaration()
	if !c.checkGrammarConstructorTypeParameters(ctor) {
		c.checkGrammarConstructorTypeAnnotation(ctor)
	}

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkAccessorDeclaration(node *ast.Node) {
	// Grammar checking accessors
	if !c.checkGrammarFunctionLikeDeclaration(node) && !c.checkGrammarAccessor(node) {
		c.checkGrammarComputedPropertyName(node.Name())
	}

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkTypeReferenceNode(node *ast.Node) {
	// Grammar checks
	c.checkGrammarTypeArguments(node, node.AsTypeReferenceNode().TypeArguments)

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkTypePredicate(node *ast.Node) {
	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkTypeQuery(node *ast.Node) {
	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkTypeLiteral(node *ast.Node) {
	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkArrayType(node *ast.Node) {
	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkTupleType(node *ast.Node) {
	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkUnionOrIntersectionType(node *ast.Node) {
	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkThisType(node *ast.Node) {
	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkTypeOperator(node *ast.Node) {
	// Grammar checks
	c.checkGrammarTypeOperatorNode(node.AsTypeOperatorNode())

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkConditionalType(node *ast.Node) {
	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkInferType(node *ast.Node) {
	// Grammar checks
	if ast.FindAncestor(node, func(n *ast.Node) bool {
		return n.Parent != nil && n.Parent.Kind == ast.KindConditionalType && (n.Parent.AsConditionalTypeNode()).ExtendsType == n
	}) == nil {
		c.grammarErrorOnNode(node, diagnostics.X_infer_declarations_are_only_permitted_in_the_extends_clause_of_a_conditional_type)
	}

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkTemplateLiteralType(node *ast.Node) {
	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkImportType(node *ast.Node) {
	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkNamedTupleMember(node *ast.Node) {
	tupleMember := node.AsNamedTupleMember()

	// Grammar checks
	if tupleMember.DotDotDotToken != nil && tupleMember.QuestionToken != nil {
		c.grammarErrorOnNode(node, diagnostics.A_tuple_member_cannot_be_both_optional_and_rest)
	}
	if tupleMember.Type.Kind == ast.KindOptionalType {
		c.grammarErrorOnNode(tupleMember.Type, diagnostics.A_labeled_tuple_element_is_declared_as_optional_with_a_question_mark_after_the_name_and_before_the_colon_rather_than_after_the_type)
	}
	if tupleMember.Type.Kind == ast.KindRestType {
		c.grammarErrorOnNode(tupleMember.Type, diagnostics.A_labeled_tuple_element_is_declared_as_rest_with_a_before_the_name_rather_than_before_the_type)
	}

	// !!!
	tupleMember.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkIndexedAccessType(node *ast.Node) {
	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkMappedType(node *ast.Node) {
	// Grammar checks
	c.checkGrammarMappedType(node.AsMappedTypeNode())

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkFunctionDeclaration(node *ast.Node) {
	// !!!
	c.checkGrammarForGenerator(node)
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkBlock(node *ast.Node) {
	// Grammar checking for SyntaxKind.Block
	if node.Kind == ast.KindBlock {
		c.checkGrammarStatementInAmbientContext(node)
	}

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkIfStatement(node *ast.Node) {
	// Grammar checking
	c.checkGrammarStatementInAmbientContext(node)

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkDoStatement(node *ast.Node) {
	// Grammar checking
	c.checkGrammarStatementInAmbientContext(node)

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkWhileStatement(node *ast.Node) {
	// Grammar checking
	c.checkGrammarStatementInAmbientContext(node)

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkForStatement(node *ast.Node) {
	// Grammar checking
	if !c.checkGrammarStatementInAmbientContext(node) {
		if init := node.Initializer(); init != nil && init.Kind == ast.KindVariableDeclarationList {
			c.checkGrammarVariableDeclarationList(init.AsVariableDeclarationList())
		}
	}

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkForInStatement(node *ast.Node) {
	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkForOfStatement(node *ast.Node) {
	forInOfStatement := node.AsForInOrOfStatement()
	// Grammar checking
	c.checkGrammarForInOrForOfStatement(forInOfStatement)

	container := getContainingFunctionOrClassStaticBlock(node)
	if forInOfStatement.AwaitModifier != nil {
		if container != nil && ast.IsClassStaticBlockDeclaration(container) {
			c.grammarErrorOnNode(forInOfStatement.AwaitModifier, diagnostics.X_for_await_loops_cannot_be_used_inside_a_class_static_block)
		}
		// !!!
	}

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkBreakOrContinueStatement(node *ast.Node) {
	// Grammar checking
	if !c.checkGrammarStatementInAmbientContext(node) {
		c.checkGrammarBreakOrContinueStatement(node)
	}

	// TODO: Check that target label is valid

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkReturnStatement(node *ast.Node) {
	// Grammar checking
	if c.checkGrammarStatementInAmbientContext(node) {
		return
	}
	container := getContainingFunctionOrClassStaticBlock(node)
	if container != nil && ast.IsClassStaticBlockDeclaration(container) {
		c.grammarErrorOnFirstToken(node, diagnostics.A_return_statement_cannot_be_used_inside_a_class_static_block)
		return
	}

	if container == nil {
		c.grammarErrorOnFirstToken(node, diagnostics.A_return_statement_can_only_be_used_within_a_function_body)
		return
	}

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkWithStatement(node *ast.Node) {
	// Grammar checking for withStatement
	if !c.checkGrammarStatementInAmbientContext(node) {
		if node.Flags&ast.NodeFlagsAwaitContext != 0 {
			c.grammarErrorOnFirstToken(node, diagnostics.X_with_statements_are_not_allowed_in_an_async_function_block)
		}
	}

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkSwitchStatement(node *ast.Node) {
	// Grammar checking
	c.checkGrammarStatementInAmbientContext(node)

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkLabeledStatement(node *ast.Node) {
	labeledStatement := node.AsLabeledStatement()
	labelNode := labeledStatement.Label
	labelText := labelNode.AsIdentifier().Text
	// Grammar checking
	if !c.checkGrammarStatementInAmbientContext(node) {
		// TODO(danielr): why is this not just a loop?
		ast.FindAncestorOrQuit(node.Parent, func(current *ast.Node) ast.FindAncestorResult {
			if ast.IsFunctionLike(current) {
				return ast.FindAncestorQuit
			}
			if current.Kind == ast.KindLabeledStatement && (current.AsLabeledStatement()).Label.AsIdentifier().Text == labelText {
				c.grammarErrorOnNode(labelNode, diagnostics.Duplicate_label_0, labelText)
				return ast.FindAncestorTrue
			}
			return ast.FindAncestorFalse
		})
	}

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkThrowStatement(node *ast.Node) {
	throwExpr := node.AsThrowStatement().Expression

	// Grammar checking
	if !c.checkGrammarStatementInAmbientContext(node) {
		if ast.IsIdentifier(throwExpr) && len(throwExpr.AsIdentifier().Text) == 0 {
			c.grammarErrorAtPos(node, throwExpr.Pos(), 0 /*length*/, diagnostics.Line_break_not_permitted_here)
		}
	}

	c.checkExpression(throwExpr)
}

func (c *Checker) checkTryStatement(node *ast.Node) {
	// Grammar checking
	c.checkGrammarStatementInAmbientContext(node)

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkBindingElement(node *ast.Node) {
	// Grammar checking
	c.checkGrammarBindingElement(node.AsBindingElement())

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkClassDeclaration(node *ast.Node) {
	classDecl := node.AsClassDeclaration()
	var firstDecorator *ast.Node
	if modifiers := classDecl.Modifiers(); modifiers != nil {
		firstDecorator = core.Find(modifiers.NodeList.Nodes, ast.IsDecorator)
	}
	if c.legacyDecorators && firstDecorator != nil && core.Some(classDecl.Members.Nodes, func(p *ast.Node) bool {
		return hasStaticModifier(p) && isPrivateIdentifierClassElementDeclaration(p)
	}) {
		c.grammarErrorOnNode(firstDecorator, diagnostics.Class_decorators_can_t_be_used_with_static_private_identifier_Consider_removing_the_experimental_decorator)
	}
	if node.Name() == nil && !hasSyntacticModifier(node, ast.ModifierFlagsDefault) {
		c.grammarErrorOnFirstToken(node, diagnostics.A_class_declaration_without_the_default_modifier_must_have_a_name)
	}

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkInterfaceDeclaration(node *ast.Node) {
	// Grammar checking
	if !c.checkGrammarModifiers(node) {
		c.checkGrammarInterfaceDeclaration(node.AsInterfaceDeclaration())
	}

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkEnumDeclaration(node *ast.Node) {
	// Grammar checking
	c.checkGrammarModifiers(node)

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkModuleDeclaration(node *ast.Node) {
	if body := node.AsModuleDeclaration().Body; body != nil {
		c.checkSourceElement(body)
		if !isGlobalScopeAugmentation(node) {
			c.registerForUnusedIdentifiersCheck(node)
		}
	}

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkImportDeclaration(node *ast.Node) {
	// Grammar checking
	var diagnostic *diagnostics.Message
	if isInJSFile(node) {
		diagnostic = diagnostics.An_import_declaration_can_only_be_used_at_the_top_level_of_a_module
	} else {
		diagnostic = diagnostics.An_import_declaration_can_only_be_used_at_the_top_level_of_a_namespace_or_module
	}
	if c.checkGrammarModuleElementContext(node, diagnostic) {
		// If we hit an import declaration in an illegal context, just bail out to avoid cascading errors.
		return
	}
	if !c.checkGrammarModifiers(node) && node.Modifiers() != nil {
		c.grammarErrorOnFirstToken(node, diagnostics.An_import_declaration_cannot_have_modifiers)
	}

	if importClause := node.AsImportDeclaration().ImportClause; importClause != nil && !c.checkGrammarImportClause(importClause.AsImportClause()) {
		// !!!
	}

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkImportEqualsDeclaration(node *ast.Node) {
	// Grammar checking
	var diagnostic *diagnostics.Message
	if isInJSFile(node) {
		diagnostic = diagnostics.An_import_declaration_can_only_be_used_at_the_top_level_of_a_module
	} else {
		diagnostic = diagnostics.An_import_declaration_can_only_be_used_at_the_top_level_of_a_namespace_or_module
	}
	if c.checkGrammarModuleElementContext(node, diagnostic) {
		// If we hit an import declaration in an illegal context, just bail out to avoid cascading errors.
		return
	}
	c.checkGrammarModifiers(node)

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkExportDeclaration(node *ast.Node) {
	// Grammar checking
	var diagnostic *diagnostics.Message
	if isInJSFile(node) {
		diagnostic = diagnostics.An_export_declaration_can_only_be_used_at_the_top_level_of_a_module
	} else {
		diagnostic = diagnostics.An_export_declaration_can_only_be_used_at_the_top_level_of_a_namespace_or_module
	}
	if c.checkGrammarModuleElementContext(node, diagnostic) {
		// If we hit an export in an illegal context, just bail out to avoid cascading errors.
		return
	}
	exportDecl := node.AsExportDeclaration()
	if !c.checkGrammarModifiers(node) && exportDecl.Modifiers() != nil {
		c.grammarErrorOnFirstToken(node, diagnostics.An_export_declaration_cannot_have_modifiers)
	}
	c.checkGrammarExportDeclaration(exportDecl)

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkExportAssignment(node *ast.Node) {
	exportAssignment := node.AsExportAssignment()
	isExportEquals := exportAssignment.IsExportEquals

	// Grammar checking
	var illegalContextMessage *diagnostics.Message
	if isExportEquals {
		illegalContextMessage = diagnostics.An_export_assignment_must_be_at_the_top_level_of_a_file_or_module_declaration
	} else {
		illegalContextMessage = diagnostics.A_default_export_must_be_at_the_top_level_of_a_file_or_module_declaration
	}
	if c.checkGrammarModuleElementContext(node, illegalContextMessage) {
		// If we hit an export assignment in an illegal context, just bail out to avoid cascading errors.
		return
	}
	var container *ast.Node
	if node.Parent.Kind == ast.KindSourceFile {
		container = node.Parent
	} else {
		container = node.Parent.Parent
	}
	if container.Kind == ast.KindModuleDeclaration && !isAmbientModule(container) {
		// TODO(danielr): should these be grammar errors?
		if isExportEquals {
			c.error(node, diagnostics.An_export_assignment_cannot_be_used_in_a_namespace)
		} else {
			c.error(node, diagnostics.A_default_export_can_only_be_used_in_an_ECMAScript_style_module)
		}

		return
	}
	if !c.checkGrammarModifiers(node) && exportAssignment.Modifiers() != nil {
		c.grammarErrorOnFirstToken(node, diagnostics.An_export_assignment_cannot_have_modifiers)
	}

	// !!!
	node.ForEachChild(c.checkSourceElement)
}

func (c *Checker) checkMissingDeclaration(node *ast.Node) {
	// !!!
}

func (c *Checker) checkVariableStatement(node *ast.Node) {
	// !!!
	varStatement := node.AsVariableStatement()
	declarationList := varStatement.DeclarationList
	// Grammar checking
	if !c.checkGrammarModifiers(node) && !c.checkGrammarVariableDeclarationList(declarationList.AsVariableDeclarationList()) {
		c.checkGrammarForDisallowedBlockScopedVariableStatement(varStatement)
	}
	c.checkVariableDeclarationList(declarationList)
}

func (c *Checker) checkVariableDeclarationList(node *ast.Node) {
	// !!!
	// blockScopeKind := getCombinedNodeFlags(node) & ast.NodeFlagsBlockScoped
	// if (blockScopeKind == ast.NodeFlagsUsing || blockScopeKind == ast.NodeFlagsAwaitUsing) && c.languageVersion < LanguageFeatureMinimumTarget.UsingAndAwaitUsing {
	// 	c.checkExternalEmitHelpers(node, ExternalEmitHelpersAddDisposableResourceAndDisposeResources)
	// }
	c.checkSourceElements(node.AsVariableDeclarationList().Declarations.Nodes)
}

func (c *Checker) checkVariableDeclaration(node *ast.Node) {
	// !!! tracing

	c.checkGrammarVariableDeclaration(node.AsVariableDeclaration())
	c.checkVariableLikeDeclaration(node)
}

// Check variable, parameter, or property declaration
func (c *Checker) checkVariableLikeDeclaration(node *ast.Node) {
	c.checkDecorators(node)
	name := node.Name()
	typeNode := node.Type()
	initializer := node.Initializer()
	if !ast.IsBindingElement(node) {
		c.checkSourceElement(typeNode)
	}
	// For a computed property, just check the initializer and exit
	// Do not use hasDynamicName here, because that returns false for well known symbols.
	// We want to perform checkComputedPropertyName for all computed properties, including
	// well known symbols.
	if ast.IsComputedPropertyName(name) {
		c.checkComputedPropertyName(name)
		if initializer != nil {
			c.checkExpressionCached(initializer)
		}
	}
	// !!!
	// if ast.IsBindingElement(node) {
	// 	if node.PropertyName != nil && isIdentifier(node.Name) && isPartOfParameterDeclaration(node) && nodeIsMissing(getContainingFunction(node).AsFunctionLikeDeclaration().Body) {
	// 		// type F = ({a: string}) => void;
	// 		//               ^^^^^^
	// 		// variable renaming in function type notation is confusing,
	// 		// so we forbid it even if noUnusedLocals is not enabled
	// 		c.potentialUnusedRenamedBindingElementsInTypes.push(node)
	// 		return
	// 	}

	// 	if isObjectBindingPattern(node.Parent) && node.DotDotDotToken != nil && c.languageVersion < LanguageFeatureMinimumTarget.ObjectSpreadRest {
	// 		c.checkExternalEmitHelpers(node, ExternalEmitHelpersRest)
	// 	}
	// 	// check computed properties inside property names of binding elements
	// 	if node.PropertyName != nil && node.PropertyName.Kind == ast.KindComputedPropertyName {
	// 		c.checkComputedPropertyName(node.PropertyName)
	// 	}

	// 	// check private/protected variable access
	// 	parent := node.Parent.Parent
	// 	var parentCheckMode /* TODO(TS-TO-GO) inferred type CheckMode.Normal | CheckMode.RestBindingElement */ any
	// 	if node.DotDotDotToken != nil {
	// 		parentCheckMode = CheckModeRestBindingElement
	// 	} else {
	// 		parentCheckMode = CheckModeNormal
	// 	}
	// 	parentType := c.getTypeForBindingElementParent(parent, parentCheckMode)
	// 	name := node.PropertyName || node.Name
	// 	if parentType != nil && !isBindingPattern(name) {
	// 		exprType := c.getLiteralTypeFromPropertyName(name)
	// 		if isTypeUsableAsPropertyName(exprType) {
	// 			nameText := getPropertyNameFromType(exprType)
	// 			property := c.getPropertyOfType(parentType, nameText)
	// 			if property != nil {
	// 				c.markPropertyAsReferenced(property, nil /*nodeForCheckWriteOnly*/, false /*isSelfTypeAccess*/)
	// 				// A destructuring is never a write-only reference.
	// 				c.checkPropertyAccessibility(node, parent.Initializer != nil && parent.Initializer.Kind == ast.KindSuperKeyword, false /*writing*/, parentType, property)
	// 			}
	// 		}
	// 	}
	// }
	// For a binding pattern, check contained binding elements
	if ast.IsBindingPattern(name) {
		c.checkSourceElements(name.AsBindingPattern().Elements.Nodes)
	}
	// For a parameter declaration with an initializer, error and exit if the containing function doesn't have a body
	if initializer != nil && isPartOfParameterDeclaration(node) && ast.NodeIsMissing(getBodyOfNode(getContainingFunction(node))) {
		c.error(node, diagnostics.A_parameter_initializer_is_only_allowed_in_a_function_or_constructor_implementation)
		return
	}
	// For a binding pattern, validate the initializer and exit
	if ast.IsBindingPattern(name) {
		if isInAmbientOrTypeNode(node) {
			return
		}
		needCheckInitializer := initializer != nil && node.Parent.Parent.Kind != ast.KindForInStatement
		needCheckWidenedType := !core.Some(name.AsBindingPattern().Elements.Nodes, func(n *ast.Node) bool { return !ast.IsOmittedExpression(n) })
		if needCheckInitializer || needCheckWidenedType {
			// Don't validate for-in initializer as it is already an error
			widenedType := c.getWidenedTypeForVariableLikeDeclaration(node, false /*reportErrors*/)
			if needCheckInitializer {
				initializerType := c.checkExpressionCached(initializer)
				if c.strictNullChecks && needCheckWidenedType {
					c.checkNonNullNonVoidType(initializerType, node)
				} else {
					c.checkTypeAssignableToAndOptionallyElaborate(initializerType, c.getWidenedTypeForVariableLikeDeclaration(node, false), node, initializer, nil, nil)
				}
			}
			// check the binding pattern with empty elements
			if needCheckWidenedType {
				if ast.IsArrayBindingPattern(name) {
					c.checkIteratedTypeOrElementType(IterationUseDestructuring, widenedType, c.undefinedType, node)
				} else if c.strictNullChecks {
					c.checkNonNullNonVoidType(widenedType, node)
				}
			}
		}
		return
	}
	// For a commonjs `const x = require`, validate the alias and exit
	symbol := c.getSymbolOfDeclaration(node)
	if symbol.Flags&ast.SymbolFlagsAlias != 0 && (isVariableDeclarationInitializedToBareOrAccessedRequire(node) || isBindingElementOfBareOrAccessedRequire(node)) {
		c.checkAliasSymbol(node)
		return
	}
	if ast.IsBigIntLiteral(name) {
		c.error(name, diagnostics.A_bigint_literal_cannot_be_used_as_a_property_name)
	}
	t := c.convertAutoToAny(c.getTypeOfSymbol(symbol))
	if node == symbol.ValueDeclaration {
		// Node is the primary declaration of the symbol, just validate the initializer
		// Don't validate for-in initializer as it is already an error
		if initializer != nil && !ast.IsForInStatement(node.Parent.Parent) {
			initializerType := c.checkExpressionCached(initializer)
			c.checkTypeAssignableToAndOptionallyElaborate(initializerType, t, node, initializer, nil /*headMessage*/, nil)
			blockScopeKind := c.getCombinedNodeFlagsCached(node) & ast.NodeFlagsBlockScoped
			if blockScopeKind == ast.NodeFlagsAwaitUsing {
				globalAsyncDisposableType := c.getGlobalAsyncDisposableType()
				globalDisposableType := c.getGlobalDisposableType()
				if globalAsyncDisposableType != c.emptyObjectType && globalDisposableType != c.emptyObjectType {
					optionalDisposableType := c.getUnionType([]*Type{globalAsyncDisposableType, globalDisposableType, c.nullType, c.undefinedType})
					c.checkTypeAssignableTo(c.widenTypeForVariableLikeDeclaration(initializerType, node, false), optionalDisposableType, initializer,
						diagnostics.The_initializer_of_an_await_using_declaration_must_be_either_an_object_with_a_Symbol_asyncDispose_or_Symbol_dispose_method_or_be_null_or_undefined)
				}
			} else if blockScopeKind == ast.NodeFlagsUsing {
				globalDisposableType := c.getGlobalDisposableType()
				if globalDisposableType != c.emptyObjectType {
					optionalDisposableType := c.getUnionType([]*Type{globalDisposableType, c.nullType, c.undefinedType})
					c.checkTypeAssignableTo(c.widenTypeForVariableLikeDeclaration(initializerType, node, false), optionalDisposableType, initializer,
						diagnostics.The_initializer_of_a_using_declaration_must_be_either_an_object_with_a_Symbol_dispose_method_or_be_null_or_undefined)
				}
			}
		}
		if len(symbol.Declarations) > 1 {
			if core.Some(symbol.Declarations, func(d *ast.Declaration) bool {
				return d != node && isVariableLike(d) && !c.areDeclarationFlagsIdentical(d, node)
			}) {
				c.error(name, diagnostics.All_declarations_of_0_must_have_identical_modifiers, declarationNameToString(name))
			}
		}
	} else {
		// Node is a secondary declaration, check that type is identical to primary declaration and check that
		// initializer is consistent with type associated with the node
		declarationType := c.convertAutoToAny(c.getWidenedTypeForVariableLikeDeclaration(node, false))
		if !c.isErrorType(t) && !c.isErrorType(declarationType) && !c.isTypeIdenticalTo(t, declarationType) && symbol.Flags&ast.SymbolFlagsAssignment == 0 {
			c.errorNextVariableOrPropertyDeclarationMustHaveSameType(symbol.ValueDeclaration, t, node, declarationType)
		}
		if initializer != nil {
			c.checkTypeAssignableToAndOptionallyElaborate(c.checkExpressionCached(initializer), declarationType, node, initializer, nil /*headMessage*/, nil)
		}
		if symbol.ValueDeclaration != nil && !c.areDeclarationFlagsIdentical(node, symbol.ValueDeclaration) {
			c.error(name, diagnostics.All_declarations_of_0_must_have_identical_modifiers, declarationNameToString(name))
		}
	}
	if !ast.IsPropertyDeclaration(node) && !ast.IsPropertySignatureDeclaration(node) {
		// We know we don't have a binding pattern or computed name here
		c.checkExportsOnMergedDeclarations(node)
		if ast.IsVariableDeclaration(node) || ast.IsBindingElement(node) {
			c.checkVarDeclaredNamesNotShadowed(node)
		}
		// !!! c.checkCollisionsForDeclarationName(node, node.Name)
	}
}

func (c *Checker) errorNextVariableOrPropertyDeclarationMustHaveSameType(firstDeclaration *ast.Declaration, firstType *Type, nextDeclaration *ast.Declaration, nextType *Type) {
	nextDeclarationName := getNameOfDeclaration(nextDeclaration)
	message := core.IfElse(ast.IsPropertyDeclaration(nextDeclaration) || ast.IsPropertySignatureDeclaration(nextDeclaration),
		diagnostics.Subsequent_property_declarations_must_have_the_same_type_Property_0_must_be_of_type_1_but_here_has_type_2,
		diagnostics.Subsequent_variable_declarations_must_have_the_same_type_Variable_0_must_be_of_type_1_but_here_has_type_2)
	declName := declarationNameToString(nextDeclarationName)
	err := c.error(nextDeclarationName, message, declName, c.typeToString(firstType), c.typeToString(nextType))
	if firstDeclaration != nil {
		err.AddRelatedInfo(createDiagnosticForNode(firstDeclaration, diagnostics.X_0_was_also_declared_here, declName))
	}
}

func (c *Checker) checkVarDeclaredNamesNotShadowed(node *ast.Node) {
	// - ScriptBody : StatementList
	// It is a Syntax Error if any element of the LexicallyDeclaredNames of StatementList
	// also occurs in the VarDeclaredNames of StatementList.

	// - Block : { StatementList }
	// It is a Syntax Error if any element of the LexicallyDeclaredNames of StatementList
	// also occurs in the VarDeclaredNames of StatementList.

	// Variable declarations are hoisted to the top of their function scope. They can shadow
	// block scoped declarations, which bind tighter. this will not be flagged as duplicate definition
	// by the binder as the declaration scope is different.
	// A non-initialized declaration is a no-op as the block declaration will resolve before the var
	// declaration. the problem is if the declaration has an initializer. this will act as a write to the
	// block declared value. this is fine for let, but not const.
	// Only consider declarations with initializers, uninitialized const declarations will not
	// step on a let/const variable.
	// Do not consider const and const declarations, as duplicate block-scoped declarations
	// are handled by the binder.
	// We are only looking for const declarations that step on let\const declarations from a
	// different scope. e.g.:
	//      {
	//          const x = 0; // localDeclarationSymbol obtained after name resolution will correspond to this declaration
	//          const x = 0; // symbol for this declaration will be 'symbol'
	//      }

	// skip block-scoped variables and parameters
	if (c.getCombinedNodeFlagsCached(node)&ast.NodeFlagsBlockScoped) != 0 || isPartOfParameterDeclaration(node) {
		return
	}
	// NOTE: in ES6 spec initializer is required in variable declarations where name is binding pattern
	// so we'll always treat binding elements as initialized
	symbol := c.getSymbolOfDeclaration(node)
	name := node.Name()
	if symbol.Flags&ast.SymbolFlagsFunctionScopedVariable != 0 {
		if !ast.IsIdentifier(name) {
			panic("Identifier expected")
		}
		localDeclarationSymbol := c.resolveName(node, name.Text(), ast.SymbolFlagsVariable, nil /*nameNotFoundMessage*/, false /*isUse*/, false)
		if localDeclarationSymbol != nil && localDeclarationSymbol != symbol && localDeclarationSymbol.Flags&ast.SymbolFlagsBlockScopedVariable != 0 {
			if c.getDeclarationNodeFlagsFromSymbol(localDeclarationSymbol)&ast.NodeFlagsBlockScoped != 0 {
				varDeclList := getAncestor(localDeclarationSymbol.ValueDeclaration, ast.KindVariableDeclarationList)
				var container *ast.Node
				if ast.IsVariableStatement(varDeclList.Parent) && varDeclList.Parent.Parent != nil {
					container = varDeclList.Parent.Parent
				}
				// names of block-scoped and function scoped variables can collide only
				// if block scoped variable is defined in the function\module\source file scope (because of variable hoisting)
				namesShareScope := container != nil && (ast.IsBlock(container) && ast.IsFunctionLike(container.Parent) ||
					ast.IsModuleBlock(container) || ast.IsModuleDeclaration(container) || ast.IsSourceFile(container))
				// here we know that function scoped variable is "shadowed" by block scoped one
				// a var declatation can't hoist past a lexical declaration and it results in a SyntaxError at runtime
				if !namesShareScope {
					name := c.symbolToString(localDeclarationSymbol)
					c.error(node, diagnostics.Cannot_initialize_outer_scoped_variable_0_in_the_same_scope_as_block_scoped_declaration_1, name, name)
				}
			}
		}
	}
}

func (c *Checker) checkDecorators(node *ast.Node) {
	// !!!
}

func (c *Checker) checkIteratedTypeOrElementType(use IterationUse, inputType *Type, sentType *Type, errorNode *ast.Node) *Type {
	if isTypeAny(inputType) {
		return inputType
	}
	t := c.getIteratedTypeOrElementType(use, inputType, sentType, errorNode, true /*checkAssignability*/)
	if t != nil {
		return t
	}
	return c.anyType
}

func (c *Checker) getIteratedTypeOrElementType(use IterationUse, inputType *Type, sentType *Type, errorNode *ast.Node, checkAssignability bool) *Type {
	return nil // !!!
}

func (c *Checker) checkAliasSymbol(node *ast.Node) {
	// !!!
}

func (c *Checker) areDeclarationFlagsIdentical(left *ast.Declaration, right *ast.Declaration) bool {
	if ast.IsParameter(left) && ast.IsVariableDeclaration(right) || ast.IsVariableDeclaration(left) && ast.IsParameter(right) {
		// Differences in optionality between parameters and variables are allowed.
		return true
	}
	if isOptionalDeclaration(left) != isOptionalDeclaration(right) {
		return false
	}
	interestingFlags := ast.ModifierFlagsPrivate | ast.ModifierFlagsProtected | ast.ModifierFlagsAsync | ast.ModifierFlagsAbstract | ast.ModifierFlagsReadonly | ast.ModifierFlagsStatic
	return getSelectedEffectiveModifierFlags(left, interestingFlags) == getSelectedEffectiveModifierFlags(right, interestingFlags)
}

func (c *Checker) checkTypeAliasDeclaration(node *ast.Node) {
	// Grammar checking
	c.checkGrammarModifiers(node)
	c.checkTypeNameIsReserved(node.Name(), diagnostics.Type_alias_name_cannot_be_0)
	c.checkExportsOnMergedDeclarations(node)

	typeNode := node.AsTypeAliasDeclaration().Type
	typeParameters := node.TypeParameters()
	c.checkTypeParameters(typeParameters)
	if typeNode.Kind == ast.KindIntrinsicKeyword {
		if !(len(typeParameters) == 0 && node.Name().Text() == "BuiltinIteratorReturn" ||
			len(typeParameters) == 1 && intrinsicTypeKinds[node.Name().Text()] != IntrinsicTypeKindUnknown) {
			c.error(typeNode, diagnostics.The_intrinsic_keyword_can_only_be_used_to_declare_compiler_provided_intrinsic_types)
		}
		return
	}
	c.checkSourceElement(typeNode)
	c.registerForUnusedIdentifiersCheck(node)
}

func (c *Checker) checkTypeNameIsReserved(name *ast.Node, message *diagnostics.Message) {
	// TS 1.0 spec (April 2014): 3.6.1
	// The predefined type keywords are reserved and cannot be used as names of user defined types.
	switch name.Text() {
	case "any", "unknown", "never", "number", "bigint", "boolean", "string", "symbol", "void", "object", "undefined":
		c.error(name, message, name.Text())
	}
}

func (c *Checker) checkExportsOnMergedDeclarations(node *ast.Node) {
	// !!!
}

func (c *Checker) checkTypeParameters(typeParameterDeclarations []*ast.Node) {
	// !!!

	for _, typeParameter := range typeParameterDeclarations {
		typeParameter.ForEachChild(c.checkSourceElement)
	}
}

func (c *Checker) registerForUnusedIdentifiersCheck(node *ast.Node) {
	// !!!
}

func (c *Checker) checkExpressionStatement(node *ast.Node) {
	// Grammar checking
	c.checkGrammarStatementInAmbientContext(node)

	c.checkExpression(node.AsExpressionStatement().Expression)
}

/**
 * Returns the type of an expression. Unlike checkExpression, this function is simply concerned
 * with computing the type and may not fully check all contained sub-expressions for errors.
 */

func (c *Checker) getTypeOfExpression(node *ast.Node) *Type {
	// !!!
	// // Don't bother caching types that require no flow analysis and are quick to compute.
	// quickType := c.getQuickTypeOfExpression(node)
	// if quickType != nil {
	// 	return quickType
	// }
	// // If a type has been cached for the node, return it.
	// if node.flags&NodeFlagsTypeCached != 0 {
	// 	cachedType := c.flowTypeCache[getNodeId(node)]
	// 	if cachedType {
	// 		return cachedType
	// 	}
	// }
	// startInvocationCount := c.flowInvocationCount
	// t := c.checkExpressionEx(node, CheckModeTypeOnly)
	// // If control flow analysis was required to determine the type, it is worth caching.
	// if c.flowInvocationCount != startInvocationCount {
	// 	cache := c.flowTypeCache || ( /* TODO(TS-TO-GO) EqualsToken BinaryExpression: flowTypeCache = [] */ TODO)
	// 	cache[getNodeId(node)] = t
	// 	setNodeFlags(node, node.flags|NodeFlagsTypeCached)
	// }
	t := c.checkExpressionEx(node, CheckModeTypeOnly)
	return t
}

/**
 * Returns the type of an expression. Unlike checkExpression, this function is simply concerned
 * with computing the type and may not fully check all contained sub-expressions for errors.
 */
func (c *Checker) getQuickTypeOfExpression(node *ast.Node) *Type {
	// !!!
	return nil
}

func (c *Checker) checkNonNullExpression(node *ast.Node) *Type {
	return c.checkNonNullType(c.checkExpression(node), node)
}

func (c *Checker) checkNonNullType(t *Type, node *ast.Node) *Type {
	return c.checkNonNullTypeWithReporter(t, node, (*Checker).reportObjectPossiblyNullOrUndefinedError)
}

func (c *Checker) checkNonNullTypeWithReporter(t *Type, node *ast.Node, reportError func(c *Checker, node *ast.Node, facts TypeFacts)) *Type {
	if c.strictNullChecks && t.flags&TypeFlagsUnknown != 0 {
		if isEntityNameExpression(node) {
			nodeText := entityNameToString(node)
			if len(nodeText) < 100 {
				c.error(node, diagnostics.X_0_is_of_type_unknown, nodeText)
				return c.errorType
			}
		}
		c.error(node, diagnostics.Object_is_of_type_unknown)
		return c.errorType
	}
	facts := c.getTypeFacts(t, TypeFactsIsUndefinedOrNull)
	if facts&TypeFactsIsUndefinedOrNull != 0 {
		reportError(c, node, facts)
		t := c.getNonNullableType(t)
		if t.flags&(TypeFlagsNullable|TypeFlagsNever) != 0 {
			return c.errorType
		}
	}
	return t
}

func (c *Checker) checkNonNullNonVoidType(t *Type, node *ast.Node) *Type {
	nonNullType := c.checkNonNullType(t, node)
	if nonNullType.flags&TypeFlagsVoid != 0 {
		if isEntityNameExpression(node) {
			nodeText := entityNameToString(node)
			if ast.IsIdentifier(node) && nodeText == "undefined" {
				c.error(node, diagnostics.The_value_0_cannot_be_used_here, nodeText)
				return nonNullType
			}
			if len(nodeText) < 100 {
				c.error(node, diagnostics.X_0_is_possibly_undefined, nodeText)
				return nonNullType
			}
		}
		c.error(node, diagnostics.Object_is_possibly_undefined)
	}
	return nonNullType
}

func (c *Checker) reportObjectPossiblyNullOrUndefinedError(node *ast.Node, facts TypeFacts) {
	var nodeText string
	if isEntityNameExpression(node) {
		nodeText = entityNameToString(node)
	}
	if node.Kind == ast.KindNullKeyword {
		c.error(node, diagnostics.The_value_0_cannot_be_used_here, "null")
		return
	}
	if nodeText != "" && len(nodeText) < 100 {
		if ast.IsIdentifier(node) && nodeText == "undefined" {
			c.error(node, diagnostics.The_value_0_cannot_be_used_here, "undefined")
			return
		}
		c.error(node, core.IfElse(facts&TypeFactsIsUndefined != 0,
			core.IfElse(facts&TypeFactsIsNull != 0,
				diagnostics.X_0_is_possibly_null_or_undefined,
				diagnostics.X_0_is_possibly_undefined),
			diagnostics.X_0_is_possibly_null), nodeText)
	} else {
		c.error(node, core.IfElse(facts&TypeFactsIsUndefined != 0,
			core.IfElse(facts&TypeFactsIsNull != 0,
				diagnostics.Object_is_possibly_null_or_undefined,
				diagnostics.Object_is_possibly_undefined),
			diagnostics.Object_is_possibly_null))
	}
}

func (c *Checker) checkExpressionWithContextualType(node *ast.Node, contextualType *Type, inferenceContext *InferenceContext, checkMode CheckMode) *Type {
	// !!!
	return c.checkExpressionEx(node, checkMode)
}

func (c *Checker) checkExpressionCached(node *ast.Node) *Type {
	return c.checkExpressionCachedEx(node, CheckModeNormal)
}

func (c *Checker) checkExpressionCachedEx(node *ast.Node, checkMode CheckMode) *Type {
	// !!!
	return c.checkExpressionEx(node, checkMode)
}

func (c *Checker) checkExpression(node *ast.Node) *Type {
	return c.checkExpressionEx(node, CheckModeNormal)
}

func (c *Checker) checkExpressionEx(node *ast.Node, checkMode CheckMode) *Type {
	saveCurrentNode := c.currentNode
	c.currentNode = node
	c.instantiationCount = 0
	uninstantiatedType := c.checkExpressionWorker(node, checkMode)
	t := c.instantiateTypeWithSingleGenericCallSignature(node, uninstantiatedType, checkMode)
	// !!!
	// if isConstEnumObjectType(typ) {
	// 	checkConstEnumAccess(node, typ)
	// }
	c.currentNode = saveCurrentNode
	return t
}

func (c *Checker) instantiateTypeWithSingleGenericCallSignature(node *ast.Node, uninstantiatedType *Type, checkMode CheckMode) *Type {
	return uninstantiatedType // !!!
}

func (c *Checker) checkExpressionWorker(node *ast.Node, checkMode CheckMode) *Type {
	switch node.Kind {
	case ast.KindIdentifier:
		return c.checkIdentifier(node)
	case ast.KindPrivateIdentifier:
		return c.checkPrivateIdentifierExpression(node)
	case ast.KindThisKeyword:
		return c.checkThisExpression(node)
	case ast.KindSuperKeyword:
		return c.checkSuperExpression(node)
	case ast.KindNullKeyword:
		return c.nullWideningType
	case ast.KindStringLiteral, ast.KindNoSubstitutionTemplateLiteral:
		// !!! Handle blockedStringType
		return c.getFreshTypeOfLiteralType(c.getStringLiteralType(node.Text()))
	case ast.KindNumericLiteral:
		c.checkGrammarNumericLiteral(node.AsNumericLiteral())
		return c.getFreshTypeOfLiteralType(c.getNumberLiteralType(stringutil.ToNumber(node.Text())))
	case ast.KindBigIntLiteral:
		c.checkGrammarBigIntLiteral(node.AsBigIntLiteral())
		return c.getFreshTypeOfLiteralType(c.getBigIntLiteralType(PseudoBigInt{
			negative:    false,
			base10Value: parsePseudoBigInt(node.AsBigIntLiteral().Text),
		}))
	case ast.KindTrueKeyword:
		return c.trueType
	case ast.KindFalseKeyword:
		return c.falseType
	case ast.KindTemplateExpression:
		return c.checkTemplateExpression(node)
	case ast.KindRegularExpressionLiteral:
		return c.checkRegularExpressionLiteral(node)
	case ast.KindArrayLiteralExpression:
		return c.checkArrayLiteral(node, checkMode)
	case ast.KindObjectLiteralExpression:
		return c.checkObjectLiteral(node, checkMode)
	case ast.KindPropertyAccessExpression:
		return c.checkPropertyAccessExpression(node, checkMode, false /*writeOnly*/)
	case ast.KindQualifiedName:
		return c.checkQualifiedName(node, checkMode)
	case ast.KindElementAccessExpression:
		return c.checkIndexedAccess(node, checkMode)
	case ast.KindCallExpression:
		if node.AsCallExpression().Expression.Kind == ast.KindImportKeyword {
			return c.checkImportCallExpression(node)
		}
		return c.checkCallExpression(node, checkMode)
	case ast.KindNewExpression:
		return c.checkCallExpression(node, checkMode)
	case ast.KindTaggedTemplateExpression:
		return c.checkTaggedTemplateExpression(node)
	case ast.KindParenthesizedExpression:
		return c.checkParenthesizedExpression(node, checkMode)
	case ast.KindClassExpression:
		return c.checkClassExpression(node)
	case ast.KindFunctionExpression, ast.KindArrowFunction:
		return c.checkFunctionExpressionOrObjectLiteralMethod(node, checkMode)
	case ast.KindTypeAssertionExpression, ast.KindAsExpression:
		return c.checkAssertion(node, checkMode)
	case ast.KindTypeOfExpression:
		return c.checkTypeOfExpression(node)
	case ast.KindNonNullExpression:
		return c.checkNonNullAssertion(node)
	case ast.KindExpressionWithTypeArguments:
		return c.checkExpressionWithTypeArguments(node)
	case ast.KindSatisfiesExpression:
		return c.checkSatisfiesExpression(node)
	case ast.KindMetaProperty:
		return c.checkMetaProperty(node)
	case ast.KindDeleteExpression:
		return c.checkDeleteExpression(node)
	case ast.KindVoidExpression:
		return c.checkVoidExpression(node)
	case ast.KindAwaitExpression:
		return c.checkAwaitExpression(node)
	case ast.KindPrefixUnaryExpression:
		return c.checkPrefixUnaryExpression(node)
	case ast.KindPostfixUnaryExpression:
		return c.checkPostfixUnaryExpression(node)
	case ast.KindBinaryExpression:
		return c.checkBinaryExpression(node, checkMode)
	case ast.KindConditionalExpression:
		return c.checkConditionalExpression(node, checkMode)
	case ast.KindSpreadElement:
		return c.checkSpreadExpression(node, checkMode)
	case ast.KindOmittedExpression:
		return c.undefinedWideningType
	case ast.KindYieldExpression:
		return c.checkYieldExpression(node)
	case ast.KindSyntheticExpression:
		return c.checkSyntheticExpression(node)
	case ast.KindJsxExpression:
		return c.checkJsxExpression(node, checkMode)
	case ast.KindJsxElement:
		return c.checkJsxElement(node, checkMode)
	case ast.KindJsxSelfClosingElement:
		return c.checkJsxSelfClosingElement(node, checkMode)
	case ast.KindJsxFragment:
		return c.checkJsxFragment(node)
	case ast.KindJsxAttributes:
		return c.checkJsxAttributes(node, checkMode)
	case ast.KindJsxOpeningElement:
		panic("Should never directly check a JsxOpeningElement")
	}
	return c.errorType
}

func (c *Checker) checkPrivateIdentifierExpression(node *ast.Node) *Type {
	c.checkGrammarPrivateIdentifierExpression(node.AsPrivateIdentifier())
	symbol := c.getSymbolForPrivateIdentifierExpression(node)
	if symbol != nil {
		c.markPropertyAsReferenced(symbol, nil /*nodeForCheckWriteOnly*/, false /*isSelfTypeAccess*/)
	}
	return c.anyType
}

func (c *Checker) getSymbolForPrivateIdentifierExpression(node *ast.Node) *ast.Symbol {
	if symbol := c.identifierSymbols[node]; symbol != nil {
		return symbol
	}
	symbol := c.lookupSymbolForPrivateIdentifierDeclaration(node.Text(), node)
	c.identifierSymbols[node] = symbol
	return symbol
}

// !!!
// Review
// func (c *Checker) getSymbolForPrivateIdentifierExpression(privId *ast.Node) *ast.Symbol {
// 	if !isExpressionNode(privId) {
// 		return nil
// 	}

// 	links := c.typeNodeLinks.get(privId)
// 	if links.resolvedSymbol == nil {
// 		links.resolvedSymbol = c.lookupSymbolForPrivateIdentifierDeclaration(privId.AsPrivateIdentifier().Text, privId)
// 	}
// 	return links.resolvedSymbol
// }

func (c *Checker) checkSuperExpression(node *ast.Node) *Type {
	// !!!
	return c.errorType
}

func (c *Checker) checkTemplateExpression(node *ast.Node) *Type {
	// !!!
	for _, span := range node.AsTemplateExpression().TemplateSpans.Nodes {
		c.checkExpression(span.AsTemplateSpan().Expression)
	}
	return c.errorType
}

func (c *Checker) checkRegularExpressionLiteral(node *ast.Node) *Type {
	// !!!
	return c.errorType
}

func (c *Checker) checkArrayLiteral(node *ast.Node, checkMode CheckMode) *Type {
	// !!!
	for _, expr := range node.AsArrayLiteralExpression().Elements.Nodes {
		c.checkExpression(expr)
	}
	return c.errorType
}
func (c *Checker) checkQualifiedName(node *ast.Node, checkMode CheckMode) *Type {
	// !!!
	return c.errorType
}

func (c *Checker) checkIndexedAccess(node *ast.Node, checkMode CheckMode) *Type {
	// !!!
	c.checkExpression(node.Expression())
	c.checkExpression(node.AsElementAccessExpression().ArgumentExpression)
	return c.errorType
}

func (c *Checker) checkImportCallExpression(node *ast.Node) *Type {
	// !!!
	return c.errorType
}

func (c *Checker) checkCallExpression(node *ast.Node, checkMode CheckMode) *Type {
	// !!!
	for _, expr := range node.Arguments() {
		c.checkExpression(expr)
	}
	return c.errorType
}

func (c *Checker) checkTaggedTemplateExpression(node *ast.Node) *Type {
	// !!!
	c.checkExpression(node.AsTaggedTemplateExpression().Tag)
	c.checkExpression(node.AsTaggedTemplateExpression().Template)
	return c.errorType
}

func (c *Checker) checkParenthesizedExpression(node *ast.Node, checkMode CheckMode) *Type {
	// !!!
	c.checkExpression(node.Expression())
	return c.errorType
}

func (c *Checker) checkClassExpression(node *ast.Node) *Type {
	// !!!
	node.ForEachChild(c.checkSourceElement)
	return c.errorType
}

func (c *Checker) checkFunctionExpressionOrObjectLiteralMethod(node *ast.Node, checkMode CheckMode) *Type {
	// !!!
	node.ForEachChild(c.checkSourceElement)
	return c.errorType
}

func (c *Checker) checkTypeOfExpression(node *ast.Node) *Type {
	// !!!
	c.checkExpression(node.Expression())
	return c.errorType
}

func (c *Checker) checkNonNullAssertion(node *ast.Node) *Type {
	// !!!
	c.checkExpression(node.Expression())
	return c.errorType
}

func (c *Checker) checkExpressionWithTypeArguments(node *ast.Node) *Type {
	// !!!
	c.checkExpression(node.Expression())
	return c.errorType
}

func (c *Checker) checkSatisfiesExpression(node *ast.Node) *Type {
	// !!!
	c.checkExpression(node.Expression())
	return c.errorType
}

func (c *Checker) checkMetaProperty(node *ast.Node) *Type {
	// !!!
	return c.errorType
}

func (c *Checker) checkDeleteExpression(node *ast.Node) *Type {
	// !!!
	c.checkExpression(node.Expression())
	return c.errorType
}

func (c *Checker) checkVoidExpression(node *ast.Node) *Type {
	// !!!
	c.checkExpression(node.Expression())
	return c.errorType
}

func (c *Checker) checkAwaitExpression(node *ast.Node) *Type {
	// !!!
	c.checkExpression(node.Expression())
	return c.errorType
}

func (c *Checker) checkPrefixUnaryExpression(node *ast.Node) *Type {
	// !!!
	c.checkExpression(node.AsPrefixUnaryExpression().Operand)
	return c.errorType
}

func (c *Checker) checkPostfixUnaryExpression(node *ast.Node) *Type {
	// !!!
	c.checkExpression(node.AsPostfixUnaryExpression().Operand)
	return c.errorType
}

func (c *Checker) checkConditionalExpression(node *ast.Node, checkMode CheckMode) *Type {
	// !!!
	c.checkExpression(node.AsConditionalExpression().Condition)
	c.checkExpression(node.AsConditionalExpression().WhenTrue)
	c.checkExpression(node.AsConditionalExpression().WhenFalse)
	return c.errorType
}

func (c *Checker) checkSpreadExpression(node *ast.Node, checkMode CheckMode) *Type {
	// !!!
	c.checkExpression(node.Expression())
	return c.errorType
}

func (c *Checker) checkYieldExpression(node *ast.Node) *Type {
	// !!!
	c.checkExpression(node.Expression())
	return c.errorType
}

func (c *Checker) checkSyntheticExpression(node *ast.Node) *Type {
	// !!!
	return c.errorType
}

func (c *Checker) checkJsxExpression(node *ast.Node, checkMode CheckMode) *Type {
	// !!!
	return c.errorType
}

func (c *Checker) checkJsxElement(node *ast.Node, checkMode CheckMode) *Type {
	// !!!
	return c.errorType
}

func (c *Checker) checkJsxSelfClosingElement(node *ast.Node, checkMode CheckMode) *Type {
	// !!!
	return c.errorType
}

func (c *Checker) checkJsxFragment(node *ast.Node) *Type {
	// !!!
	return c.errorType
}

func (c *Checker) checkJsxAttributes(node *ast.Node, checkMode CheckMode) *Type {
	// !!!
	return c.errorType
}

func (c *Checker) checkIdentifier(node *ast.Node) *Type {
	if isThisInTypeQuery(node) {
		return c.checkThisExpression(node)
	}
	symbol := c.getResolvedSymbol(node)
	if symbol == c.unknownSymbol {
		return c.errorType
	}
	// !!! c.checkIdentifierCalculateNodeCheckFlags(node, symbol)
	if symbol == c.argumentsSymbol {
		if c.isInPropertyInitializerOrClassStaticBlock(node) {
			return c.errorType
		}
		return c.getTypeOfSymbol(symbol)
	}
	// !!!
	// if c.shouldMarkIdentifierAliasReferenced(node) {
	// 	c.markLinkedReferences(node, ReferenceHintIdentifier)
	// }
	localOrExportSymbol := c.getExportSymbolOfValueSymbolIfExported(symbol)
	declaration := localOrExportSymbol.ValueDeclaration
	// !!!
	// immediateDeclaration := declaration
	// If the identifier is declared in a binding pattern for which we're currently computing the implied type and the
	// reference occurs with the same binding pattern, return the non-inferrable any type. This for example occurs in
	// 'const [a, b = a + 1] = [2]' when we're computing the contextual type for the array literal '[2]'.
	if declaration != nil && declaration.Kind == ast.KindBindingElement && slices.Contains(c.contextualBindingPatterns, declaration.Parent) &&
		ast.FindAncestor(node, func(parent *ast.Node) bool { return parent == declaration.Parent }) != nil {
		return c.nonInferrableAnyType
	}
	t := c.getNarrowedTypeOfSymbol(localOrExportSymbol, node)
	assignmentKind := getAssignmentTargetKind(node)
	if assignmentKind != AssignmentKindNone {
		if localOrExportSymbol.Flags&ast.SymbolFlagsVariable == 0 {
			var assignmentError *diagnostics.Message
			switch {
			case localOrExportSymbol.Flags&ast.SymbolFlagsEnum != 0:
				assignmentError = diagnostics.Cannot_assign_to_0_because_it_is_an_enum
			case localOrExportSymbol.Flags&ast.SymbolFlagsClass != 0:
				assignmentError = diagnostics.Cannot_assign_to_0_because_it_is_a_class
			case localOrExportSymbol.Flags&ast.SymbolFlagsModule != 0:
				assignmentError = diagnostics.Cannot_assign_to_0_because_it_is_a_namespace
			case localOrExportSymbol.Flags&ast.SymbolFlagsFunction != 0:
				assignmentError = diagnostics.Cannot_assign_to_0_because_it_is_a_function
			case localOrExportSymbol.Flags&ast.SymbolFlagsAlias != 0:
				assignmentError = diagnostics.Cannot_assign_to_0_because_it_is_an_import
			default:
				assignmentError = diagnostics.Cannot_assign_to_0_because_it_is_not_a_variable
			}
			c.error(node, assignmentError, c.symbolToString(symbol))
			return c.errorType
		}
		if c.isReadonlySymbol(localOrExportSymbol) {
			if localOrExportSymbol.Flags&ast.SymbolFlagsVariable != 0 {
				c.error(node, diagnostics.Cannot_assign_to_0_because_it_is_a_constant, c.symbolToString(symbol))
			} else {
				c.error(node, diagnostics.Cannot_assign_to_0_because_it_is_a_read_only_property, c.symbolToString(symbol))
			}
			return c.errorType
		}
	}
	isAlias := localOrExportSymbol.Flags&ast.SymbolFlagsAlias != 0
	// We only narrow variables and parameters occurring in a non-assignment position. For all other
	// entities we simply return the declared type.
	if localOrExportSymbol.Flags&ast.SymbolFlagsVariable != 0 {
		if assignmentKind == AssignmentKindDefinite {
			if isInCompoundLikeAssignment(node) {
				return c.getBaseTypeOfLiteralType(t)
			}
			return t
		}
	} else if isAlias {
		declaration = c.getDeclarationOfAliasSymbol(symbol)
	} else {
		return t
	}
	if declaration == nil {
		return t
	}
	// !!!
	flowType := c.getFlowTypeOfReference(node, t)
	if assignmentKind != AssignmentKindNone {
		// Identifier is target of a compound assignment
		return c.getBaseTypeOfLiteralType(flowType)
	}
	return flowType
}

func (c *Checker) checkPropertyAccessExpression(node *ast.Node, checkMode CheckMode, writeOnly bool) *Type {
	if node.Flags&ast.NodeFlagsOptionalChain != 0 {
		return c.checkPropertyAccessChain(node, checkMode)
	}
	expr := node.Expression()
	return c.checkPropertyAccessExpressionOrQualifiedName(node, expr, c.checkNonNullExpression(expr), node.AsPropertyAccessExpression().Name(), checkMode, writeOnly)
}

func (c *Checker) checkPropertyAccessChain(node *ast.Node, checkMode CheckMode) *Type {
	leftType := c.checkExpression(node.Expression())
	nonOptionalType := c.getOptionalExpressionType(leftType, node.Expression())
	return c.propagateOptionalTypeMarker(c.checkPropertyAccessExpressionOrQualifiedName(node, node.Expression(), c.checkNonNullType(nonOptionalType, node.Expression()), node.Name(), checkMode, false), node, nonOptionalType != leftType)
}

func (c *Checker) checkPropertyAccessExpressionOrQualifiedName(node *ast.Node, left *ast.Node, leftType *Type, right *ast.Node, checkMode CheckMode, writeOnly bool) *Type {
	parentSymbol := c.typeNodeLinks.get(node).resolvedSymbol
	assignmentKind := getAssignmentTargetKind(node)
	widenedType := leftType
	if assignmentKind != AssignmentKindNone || c.isMethodAccessForCall(node) {
		widenedType = c.getWidenedType(leftType)
	}
	apparentType := c.getApparentType(widenedType)
	isAnyLike := isTypeAny(apparentType) || apparentType == c.silentNeverType
	var prop *ast.Symbol
	if ast.IsPrivateIdentifier(right) {
		// !!!
		// if c.languageVersion < LanguageFeatureMinimumTarget.PrivateNamesAndClassStaticBlocks ||
		// 	c.languageVersion < LanguageFeatureMinimumTarget.ClassAndClassElementDecorators ||
		// 	!c.useDefineForClassFields {
		// 	if assignmentKind != AssignmentKindNone {
		// 		c.checkExternalEmitHelpers(node, ExternalEmitHelpersClassPrivateFieldSet)
		// 	}
		// 	if assignmentKind != AssignmentKindDefinite {
		// 		c.checkExternalEmitHelpers(node, ExternalEmitHelpersClassPrivateFieldGet)
		// 	}
		// }
		lexicallyScopedSymbol := c.lookupSymbolForPrivateIdentifierDeclaration(right.Text(), right)
		if assignmentKind != AssignmentKindNone && lexicallyScopedSymbol != nil && lexicallyScopedSymbol.ValueDeclaration != nil && ast.IsMethodDeclaration(lexicallyScopedSymbol.ValueDeclaration) {
			c.grammarErrorOnNode(right, diagnostics.Cannot_assign_to_private_method_0_Private_methods_are_not_writable, right.Text())
		}
		if isAnyLike {
			if lexicallyScopedSymbol != nil {
				if c.isErrorType(apparentType) {
					return c.errorType
				}
				return apparentType
			}
			if getContainingClassExcludingClassDecorators(right) == nil {
				c.grammarErrorOnNode(right, diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies)
				return c.anyType
			}
		}
		if lexicallyScopedSymbol != nil {
			prop = c.getPrivateIdentifierPropertyOfType(leftType, lexicallyScopedSymbol)
		}
		if prop == nil {
			// Check for private-identifier-specific shadowing and lexical-scoping errors.
			if c.checkPrivateIdentifierPropertyAccess(leftType, right, lexicallyScopedSymbol) {
				return c.errorType
			}
			// !!!
			// containingClass := getContainingClassExcludingClassDecorators(right)
			// if containingClass && isPlainJsFile(ast.GetSourceFileOfNode(containingClass), c.compilerOptions.checkJs) {
			// 	c.grammarErrorOnNode(right, diagnostics.Private_field_0_must_be_declared_in_an_enclosing_class, right.Text())
			// }
		} else {
			isSetonlyAccessor := prop.Flags&ast.SymbolFlagsSetAccessor != 0 && prop.Flags&ast.SymbolFlagsGetAccessor == 0
			if isSetonlyAccessor && assignmentKind != AssignmentKindDefinite {
				c.error(node, diagnostics.Private_accessor_was_defined_without_a_getter)
			}
		}
	} else {
		if isAnyLike {
			if ast.IsIdentifier(left) && parentSymbol != nil {
				c.markLinkedReferences(node, ReferenceHintProperty, nil /*propSymbol*/, leftType)
			}
			if c.isErrorType(apparentType) {
				return c.errorType
			}
			return apparentType
		}
		prop = c.getPropertyOfTypeEx(apparentType, right.Text(), isConstEnumObjectType(apparentType) /*skipObjectFunctionPropertyAugment*/, node.Kind == ast.KindQualifiedName /*includeTypeOnlyMembers*/)
	}
	c.markLinkedReferences(node, ReferenceHintProperty, prop, leftType)
	var propType *Type
	if prop == nil {
		var indexInfo *IndexInfo
		if !ast.IsPrivateIdentifier(right) && (assignmentKind == AssignmentKindNone || !c.isGenericObjectType(leftType) || isThisTypeParameter(leftType)) {
			indexInfo = c.getApplicableIndexInfoForName(apparentType, right.Text())
		}
		if indexInfo == nil {
			if leftType.symbol == c.globalThisSymbol {
				globalSymbol := c.globalThisSymbol.Exports[right.Text()]
				if globalSymbol != nil && globalSymbol.Flags&ast.SymbolFlagsBlockScoped != 0 {
					c.error(right, diagnostics.Property_0_does_not_exist_on_type_1, right.Text(), c.typeToString(leftType))
				} else if c.noImplicitAny {
					c.error(right, diagnostics.Element_implicitly_has_an_any_type_because_type_0_has_no_index_signature, c.typeToString(leftType))
				}
				return c.anyType
			}
			if right.Text() != "" && !c.checkAndReportErrorForExtendingInterface(node) {
				c.reportNonexistentProperty(right, core.IfElse(isThisTypeParameter(leftType), apparentType, leftType))
			}
			return c.errorType
		}
		if indexInfo.isReadonly && (isAssignmentTarget(node) || isDeleteTarget(node)) {
			c.error(node, diagnostics.Index_signature_in_type_0_only_permits_reading, c.typeToString(apparentType))
		}
		propType = indexInfo.valueType
		if c.compilerOptions.NoUncheckedIndexedAccess == core.TSTrue && getAssignmentTargetKind(node) != AssignmentKindDefinite {
			propType = c.getUnionType([]*Type{propType, c.missingType})
		}
		if c.compilerOptions.NoPropertyAccessFromIndexSignature == core.TSTrue && ast.IsPropertyAccessExpression(node) {
			c.error(right, diagnostics.Property_0_comes_from_an_index_signature_so_it_must_be_accessed_with_0, right.Text())
		}
		if indexInfo.declaration != nil && c.isDeprecatedDeclaration(indexInfo.declaration) {
			c.addDeprecatedSuggestion(right, []*ast.Node{indexInfo.declaration}, right.Text())
		}
	} else {
		targetPropSymbol := c.resolveAliasWithDeprecationCheck(prop, right)
		if c.isDeprecatedSymbol(targetPropSymbol) && c.isUncalledFunctionReference(node, targetPropSymbol) && targetPropSymbol.Declarations != nil {
			c.addDeprecatedSuggestion(right, targetPropSymbol.Declarations, right.Text())
		}
		c.checkPropertyNotUsedBeforeDeclaration(prop, node, right)
		c.markPropertyAsReferenced(prop, node, c.isSelfTypeAccess(left, parentSymbol))
		c.typeNodeLinks.get(node).resolvedSymbol = prop
		c.checkPropertyAccessibility(node, left.Kind == ast.KindSuperKeyword, isWriteAccess(node), apparentType, prop)
		if c.isAssignmentToReadonlyEntity(node, prop, assignmentKind) {
			c.error(right, diagnostics.Cannot_assign_to_0_because_it_is_a_read_only_property, right.Text())
			return c.errorType
		}
		switch {
		case c.isThisPropertyAccessInConstructor(node, prop):
			propType = c.autoType
		case writeOnly || isWriteOnlyAccess(node):
			propType = c.getWriteTypeOfSymbol(prop)
		default:
			propType = c.getTypeOfSymbol(prop)
		}
	}
	return c.getFlowTypeOfAccessExpression(node, prop, propType, right, checkMode)
}

func (c *Checker) getFlowTypeOfAccessExpression(node *ast.Node, prop *ast.Symbol, propType *Type, errorNode *ast.Node, checkMode CheckMode) *Type {
	return propType // !!!
}

func (c *Checker) isMethodAccessForCall(node *ast.Node) bool {
	for ast.IsParenthesizedExpression(node.Parent) {
		node = node.Parent
	}
	return isCallOrNewExpression(node.Parent) && node.Parent.Expression() == node
}

// Lookup the private identifier lexically.
func (c *Checker) lookupSymbolForPrivateIdentifierDeclaration(propName string, location *ast.Node) *ast.Symbol {
	for containingClass := getContainingClassExcludingClassDecorators(location); containingClass != nil; containingClass = getContainingClass(containingClass) {
		symbol := containingClass.Symbol()
		name := getSymbolNameForPrivateIdentifier(symbol, propName)
		prop := symbol.Members[name]
		if prop != nil {
			return prop
		}
		prop = symbol.Exports[name]
		if prop != nil {
			return prop
		}
	}
	return nil
}

func (c *Checker) getPrivateIdentifierPropertyOfType(leftType *Type, lexicallyScopedIdentifier *ast.Symbol) *ast.Symbol {
	return c.getPropertyOfType(leftType, lexicallyScopedIdentifier.Name)
}

func (c *Checker) checkPrivateIdentifierPropertyAccess(leftType *Type, right *ast.Node, lexicallyScopedIdentifier *ast.Symbol) bool {
	// Either the identifier could not be looked up in the lexical scope OR the lexically scoped identifier did not exist on the type.
	// Find a private identifier with the same description on the type.
	properties := c.getPropertiesOfType(leftType)
	var propertyOnType *ast.Symbol
	for _, symbol := range properties {
		decl := symbol.ValueDeclaration
		if decl != nil && decl.Name() != nil && ast.IsPrivateIdentifier(decl.Name()) && decl.Name().Text() == right.Text() {
			propertyOnType = symbol
			break
		}
	}
	diagName := declarationNameToString(right)
	if propertyOnType != nil {
		typeValueDecl := propertyOnType.ValueDeclaration
		typeClass := getContainingClass(typeValueDecl)
		// We found a private identifier property with the same description.
		// Either:
		// - There is a lexically scoped private identifier AND it shadows the one we found on the type.
		// - It is an attempt to access the private identifier outside of the class.
		if lexicallyScopedIdentifier != nil && lexicallyScopedIdentifier.ValueDeclaration != nil {
			lexicalValueDecl := lexicallyScopedIdentifier.ValueDeclaration
			lexicalClass := getContainingClass(lexicalValueDecl)
			if ast.FindAncestor(lexicalClass, func(n *ast.Node) bool { return typeClass == n }) != nil {
				diagnostic := c.error(right, diagnostics.The_property_0_cannot_be_accessed_on_type_1_within_this_class_because_it_is_shadowed_by_another_private_identifier_with_the_same_spelling, diagName, c.typeToString(leftType))
				diagnostic.AddRelatedInfo(createDiagnosticForNode(lexicalValueDecl, diagnostics.The_shadowing_declaration_of_0_is_defined_here, diagName))
				diagnostic.AddRelatedInfo(createDiagnosticForNode(typeValueDecl, diagnostics.The_declaration_of_0_that_you_probably_intended_to_use_is_defined_here, diagName))
				return true
			}
		}
		c.error(right, diagnostics.Property_0_is_not_accessible_outside_class_1_because_it_has_a_private_identifier, diagName, declarationNameToString(typeClass.Name()))
		return true
	}
	return false
}

func (c *Checker) reportNonexistentProperty(propNode *ast.Node, containingType *Type) {
	var errorInfo *ast.MessageChain
	var relatedInfo *ast.Diagnostic
	if !ast.IsPrivateIdentifier(propNode) && containingType.flags&TypeFlagsUnion != 0 && containingType.flags&TypeFlagsPrimitive == 0 {
		for _, subtype := range containingType.Types() {
			if c.getPropertyOfType(subtype, propNode.Text()) == nil && c.getApplicableIndexInfoForName(subtype, propNode.Text()) == nil {
				errorInfo = chainDiagnosticMessages(errorInfo, diagnostics.Property_0_does_not_exist_on_type_1, declarationNameToString(propNode), c.typeToString(subtype))
				break
			}
		}
	}
	if c.typeHasStaticProperty(propNode.Text(), containingType) {
		propName := declarationNameToString(propNode)
		typeName := c.typeToString(containingType)
		errorInfo = chainDiagnosticMessages(errorInfo, diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_to_access_the_static_member_2_instead, propName, typeName, typeName+"."+propName)
	} else {
		promisedType := c.getPromisedTypeOfPromise(containingType)
		if promisedType != nil && c.getPropertyOfType(promisedType, propNode.Text()) != nil {
			errorInfo = chainDiagnosticMessages(errorInfo, diagnostics.Property_0_does_not_exist_on_type_1, declarationNameToString(propNode), c.typeToString(containingType))
			relatedInfo = createDiagnosticForNode(propNode, diagnostics.Did_you_forget_to_use_await)
		} else {
			missingProperty := declarationNameToString(propNode)
			container := c.typeToString(containingType)
			libSuggestion := c.getSuggestedLibForNonExistentProperty(missingProperty, containingType)
			if libSuggestion != "" {
				errorInfo = chainDiagnosticMessages(errorInfo, diagnostics.Property_0_does_not_exist_on_type_1_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_2_or_later, missingProperty, container, libSuggestion)
			} else {
				suggestion := c.getSuggestedSymbolForNonexistentProperty(propNode, containingType)
				if suggestion != nil {
					suggestedName := symbolName(suggestion)
					errorInfo = chainDiagnosticMessages(errorInfo, diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2, missingProperty, container, suggestedName)
					if suggestion.ValueDeclaration != nil {
						relatedInfo = createDiagnosticForNode(suggestion.ValueDeclaration, diagnostics.X_0_is_declared_here, suggestedName)
					}
				} else {
					var diagnostic *diagnostics.Message
					if c.containerSeemsToBeEmptyDomElement(containingType) {
						diagnostic = diagnostics.Property_0_does_not_exist_on_type_1_Try_changing_the_lib_compiler_option_to_include_dom
					} else {
						diagnostic = diagnostics.Property_0_does_not_exist_on_type_1
					}
					errorInfo = chainDiagnosticMessages(c.elaborateNeverIntersection(errorInfo, containingType), diagnostic, missingProperty, container)
				}
			}
		}
	}
	resultDiagnostic := NewDiagnosticForNodeFromMessageChain(propNode, errorInfo).AddRelatedInfo(relatedInfo)
	c.diagnostics.add(resultDiagnostic)
}

func (c *Checker) getSuggestedLibForNonExistentProperty(missingProperty string, containingType *Type) string {
	return "" // !!!
}

func (c *Checker) getSuggestedSymbolForNonexistentProperty(name *ast.Node, containingType *Type) *ast.Symbol {
	return nil // !!!
}

func (c *Checker) containerSeemsToBeEmptyDomElement(containingType *Type) bool {
	return false // !!!
}

func (c *Checker) checkAndReportErrorForExtendingInterface(errorLocation *ast.Node) bool {
	expression := c.getEntityNameForExtendingInterface(errorLocation)
	if expression != nil && c.resolveEntityName(expression, ast.SymbolFlagsInterface, true /*ignoreErrors*/, false, nil) != nil {
		c.error(errorLocation, diagnostics.Cannot_extend_an_interface_0_Did_you_mean_implements, getTextOfNode(expression))
		return true
	}
	return false
}

/**
 * Climbs up parents to an ExpressionWithTypeArguments, and returns its expression,
 * but returns undefined if that expression is not an EntityNameExpression.
 */
func (c *Checker) getEntityNameForExtendingInterface(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindIdentifier, ast.KindPropertyAccessExpression:
		if node.Parent != nil {
			return c.getEntityNameForExtendingInterface(node.Parent)
		}
	case ast.KindExpressionWithTypeArguments:
		if isEntityNameExpression(node.Expression()) {
			return node.Expression()
		}
	}
	return nil
}

func (c *Checker) isUncalledFunctionReference(node *ast.Node, symbol *ast.Symbol) bool {
	if symbol.Flags&(ast.SymbolFlagsFunction|ast.SymbolFlagsMethod) != 0 {
		parent := ast.FindAncestor(node.Parent, func(n *ast.Node) bool { return !ast.IsAccessExpression(n) })
		if parent == nil {
			parent = node.Parent
		}
		if isCallLikeExpression(parent) {
			return isCallOrNewExpression(parent) && ast.IsIdentifier(node) && c.hasMatchingArgument(parent, node)
		}
		return core.Every(symbol.Declarations, func(d *ast.Node) bool {
			return !ast.IsFunctionLike(d) || c.isDeprecatedDeclaration(d)
		})
	}
	return true
}

func (c *Checker) hasMatchingArgument(expression *ast.Node, reference *ast.Node) bool {
	return false // !!!
}

func (c *Checker) checkPropertyNotUsedBeforeDeclaration(prop *ast.Symbol, node *ast.Node, right *ast.Node) {
	// !!!
}

/**
 * Check whether the requested property access is valid.
 * Returns true if node is a valid property access, and false otherwise.
 * @param node The node to be checked.
 * @param isSuper True if the access is from `super.`.
 * @param type The type of the object whose property is being accessed. (Not the type of the property.)
 * @param prop The symbol for the property being accessed.
 */
func (c *Checker) checkPropertyAccessibility(node *ast.Node, isSuper bool, writing bool, t *Type, prop *ast.Symbol) bool {
	return c.checkPropertyAccessibilityEx(node, isSuper, writing, t, prop, true /*reportError*/)
}

func (c *Checker) checkPropertyAccessibilityEx(node *ast.Node, isSuper bool, writing bool, t *Type, prop *ast.Symbol, reportError bool /*  = true */) bool {
	var errorNode *ast.Node
	if reportError {
		switch node.Kind {
		case ast.KindPropertyAccessExpression:
			errorNode = node.AsPropertyAccessExpression().Name()
		case ast.KindQualifiedName:
			errorNode = node.AsQualifiedName().Right
		case ast.KindImportType:
			errorNode = node
		case ast.KindBindingElement:
			errorNode = node.AsBindingElement().PropertyName
			if errorNode == nil {
				errorNode = node.Name()
			}
		default:
			errorNode = node.Name()
		}
	}
	return c.checkPropertyAccessibilityAtLocation(node, isSuper, writing, t, prop, errorNode)
}

/**
 * Check whether the requested property can be accessed at the requested location.
 * Returns true if node is a valid property access, and false otherwise.
 * @param location The location node where we want to check if the property is accessible.
 * @param isSuper True if the access is from `super.`.
 * @param writing True if this is a write property access, false if it is a read property access.
 * @param containingType The type of the object whose property is being accessed. (Not the type of the property.)
 * @param prop The symbol for the property being accessed.
 * @param errorNode The node where we should report an invalid property access error, or undefined if we should not report errors.
 */
func (c *Checker) checkPropertyAccessibilityAtLocation(location *ast.Node, isSuper bool, writing bool, containingType *Type, prop *ast.Symbol, errorNode *ast.Node) bool {
	flags := getDeclarationModifierFlagsFromSymbolEx(prop, writing)
	if isSuper {
		// TS 1.0 spec (April 2014): 4.8.2
		// - In a constructor, instance member function, instance member accessor, or
		//   instance member variable initializer where this references a derived class instance,
		//   a super property access is permitted and must specify a public instance member function of the base class.
		// - In a static member function or static member accessor
		//   where this references the constructor function object of a derived class,
		//   a super property access is permitted and must specify a public static member function of the base class.
		if c.languageVersion < core.ScriptTargetES2015 {
			if c.symbolHasNonMethodDeclaration(prop) {
				if errorNode != nil {
					c.error(errorNode, diagnostics.Only_public_and_protected_methods_of_the_base_class_are_accessible_via_the_super_keyword)
				}
				return false
			}
		}
		if flags&ast.ModifierFlagsAbstract != 0 {
			// A method cannot be accessed in a super property access if the method is abstract.
			// This error could mask a private property access error. But, a member
			// cannot simultaneously be private and abstract, so this will trigger an
			// additional error elsewhere.
			if errorNode != nil {
				c.error(errorNode, diagnostics.Abstract_method_0_in_class_1_cannot_be_accessed_via_super_expression, c.symbolToString(prop), c.typeToString(c.getDeclaringClass(prop)))
			}
			return false
		}
		// A class field cannot be accessed via super.* from a derived class.
		// This is true for both [[Set]] (old) and [[Define]] (ES spec) semantics.
		if flags&ast.ModifierFlagsStatic == 0 && core.Some(prop.Declarations, isClassInstanceProperty) {
			if errorNode != nil {
				c.error(errorNode, diagnostics.Class_field_0_defined_by_the_parent_class_is_not_accessible_in_the_child_class_via_super, c.symbolToString(prop))
			}
			return false
		}
	}
	// Referencing abstract properties within their own constructors is not allowed
	if flags&ast.ModifierFlagsAbstract != 0 && c.symbolHasNonMethodDeclaration(prop) && (isThisProperty(location) ||
		isThisInitializedObjectBindingExpression(location) ||
		ast.IsObjectBindingPattern(location.Parent) && isThisInitializedDeclaration(location.Parent.Parent)) {
		declaringClassDeclaration := getClassLikeDeclarationOfSymbol(c.getParentOfSymbol(prop))
		if declaringClassDeclaration != nil && c.isNodeUsedDuringClassInitialization(location) {
			if errorNode != nil {
				c.error(errorNode, diagnostics.Abstract_property_0_in_class_1_cannot_be_accessed_in_the_constructor, c.symbolToString(prop), declaringClassDeclaration.Name().Text())
			}
			return false
		}
	}
	// Public properties are otherwise accessible.
	if flags&ast.ModifierFlagsNonPublicAccessibilityModifier == 0 {
		return true
	}
	// Property is known to be private or protected at this point
	// Private property is accessible if the property is within the declaring class
	if flags&ast.ModifierFlagsPrivate != 0 {
		declaringClassDeclaration := getClassLikeDeclarationOfSymbol(c.getParentOfSymbol(prop))
		if !c.isNodeWithinClass(location, declaringClassDeclaration) {
			if errorNode != nil {
				c.error(errorNode, diagnostics.Property_0_is_private_and_only_accessible_within_class_1, c.symbolToString(prop), c.typeToString(c.getDeclaringClass(prop)))
			}
			return false
		}
		return true
	}
	// Property is known to be protected at this point
	// All protected properties of a supertype are accessible in a super access
	if isSuper {
		return true
	}
	// Find the first enclosing class that has the declaring classes of the protected constituents
	// of the property as base classes
	var enclosingClass *Type
	container := getContainingClass(location)
	for container != nil {
		class := c.getDeclaredTypeOfSymbol(c.getSymbolOfDeclaration(container))
		if c.isClassDerivedFromDeclaringClasses(class, prop, writing) {
			enclosingClass = class
			break
		}
		container = getContainingClass(container)
	}
	// A protected property is accessible if the property is within the declaring class or classes derived from it
	if enclosingClass == nil {
		// allow PropertyAccessibility if context is in function with this parameter
		// static member access is disallowed
		class := c.getEnclosingClassFromThisParameter(location)
		if class != nil && c.isClassDerivedFromDeclaringClasses(class, prop, writing) {
			enclosingClass = class
		}
		if flags&ast.ModifierFlagsStatic != 0 || enclosingClass == nil {
			if errorNode != nil {
				class := c.getDeclaringClass(prop)
				if class == nil {
					class = containingType
				}
				c.error(errorNode, diagnostics.Property_0_is_protected_and_only_accessible_within_class_1_and_its_subclasses, c.symbolToString(prop), c.typeToString(class))
			}
			return false
		}
	}
	// No further restrictions for static properties
	if flags&ast.ModifierFlagsStatic != 0 {
		return true
	}
	if containingType.flags&TypeFlagsTypeParameter != 0 {
		// get the original type -- represented as the type constraint of the 'this' type
		if containingType.AsTypeParameter().isThisType {
			containingType = c.getConstraintOfTypeParameter(containingType)
		} else {
			containingType = c.getBaseConstraintOfType(containingType)
		}
	}
	if containingType == nil || !c.hasBaseType(containingType, enclosingClass) {
		if errorNode != nil && containingType != nil {
			c.error(errorNode, diagnostics.Property_0_is_protected_and_only_accessible_through_an_instance_of_class_1_This_is_an_instance_of_class_2, c.symbolToString(prop), c.typeToString(enclosingClass), c.typeToString(containingType))
		}
		return false
	}
	return true
}

func (c *Checker) symbolHasNonMethodDeclaration(symbol *ast.Symbol) bool {
	return c.forEachProperty(symbol, func(prop *ast.Symbol) bool { return prop.Flags&ast.SymbolFlagsMethod == 0 })
}

// Invoke the callback for each underlying property symbol of the given symbol and return the first
// value that isn't undefined.
func (c *Checker) forEachProperty(prop *ast.Symbol, callback func(p *ast.Symbol) bool) bool {
	if prop.CheckFlags&ast.CheckFlagsSynthetic == 0 {
		return callback(prop)
	}
	for _, t := range c.valueSymbolLinks.get(prop).containingType.Types() {
		p := c.getPropertyOfType(t, prop.Name)
		if p != nil && c.forEachProperty(p, callback) {
			return true
		}
	}
	return false
}

// Return the declaring class type of a property or undefined if property not declared in class
func (c *Checker) getDeclaringClass(prop *ast.Symbol) *Type {
	if prop.Parent != nil && prop.Parent.Flags&ast.SymbolFlagsClass != 0 {
		return c.getDeclaredTypeOfSymbol(c.getParentOfSymbol(prop))
	}
	return nil
}

// Return true if source property is a valid override of protected parts of target property.
func (c *Checker) isValidOverrideOf(sourceProp *ast.Symbol, targetProp *ast.Symbol) bool {
	return !c.forEachProperty(targetProp, func(tp *ast.Symbol) bool {
		if getDeclarationModifierFlagsFromSymbol(tp)&ast.ModifierFlagsProtected != 0 {
			return c.isPropertyInClassDerivedFrom(sourceProp, c.getDeclaringClass(tp))
		}
		return false
	})
}

// Return true if some underlying source property is declared in a class that derives
// from the given base class.
func (c *Checker) isPropertyInClassDerivedFrom(prop *ast.Symbol, baseClass *Type) bool {
	return c.forEachProperty(prop, func(sp *ast.Symbol) bool {
		sourceClass := c.getDeclaringClass(sp)
		if sourceClass != nil {
			return c.hasBaseType(sourceClass, baseClass)
		}
		return false
	})
}

func (c *Checker) isNodeUsedDuringClassInitialization(node *ast.Node) bool {
	return ast.FindAncestorOrQuit(node, func(element *ast.Node) ast.FindAncestorResult {
		if ast.IsConstructorDeclaration(element) && ast.NodeIsPresent(getBodyOfNode(element)) || ast.IsPropertyDeclaration(element) {
			return ast.FindAncestorTrue
		} else if ast.IsClassLike(element) || ast.IsFunctionLikeDeclaration(element) {
			return ast.FindAncestorQuit
		}
		return ast.FindAncestorFalse
	}) != nil
}

func (c *Checker) isNodeWithinClass(node *ast.Node, classDeclaration *ast.Node) bool {
	return c.forEachEnclosingClass(node, func(n *ast.Node) bool { return n == classDeclaration })
}

func (c *Checker) forEachEnclosingClass(node *ast.Node, callback func(node *ast.Node) bool) bool {
	containingClass := getContainingClass(node)
	for containingClass != nil {
		result := callback(containingClass)
		if result {
			return true
		}
		containingClass = getContainingClass(containingClass)
	}
	return false
}

// Return true if the given class derives from each of the declaring classes of the protected
// constituents of the given property.
func (c *Checker) isClassDerivedFromDeclaringClasses(checkClass *Type, prop *ast.Symbol, writing bool) bool {
	return !c.forEachProperty(prop, func(p *ast.Symbol) bool {
		if getDeclarationModifierFlagsFromSymbolEx(p, writing)&ast.ModifierFlagsProtected != 0 {
			return !c.hasBaseType(checkClass, c.getDeclaringClass(p))
		}
		return false
	})
}

func (c *Checker) getEnclosingClassFromThisParameter(node *ast.Node) *Type {
	// 'this' type for a node comes from, in priority order...
	// 1. The type of a syntactic 'this' parameter in the enclosing function scope
	thisParameter := getThisParameterFromNodeContext(node)
	var thisType *Type
	if thisParameter != nil && thisParameter.AsParameterDeclaration().Type != nil {
		thisType = c.getTypeFromTypeNode(thisParameter.AsParameterDeclaration().Type)
	}
	if thisType != nil {
		// 2. The constraint of a type parameter used for an explicit 'this' parameter
		if thisType.flags&TypeFlagsTypeParameter != 0 {
			thisType = c.getConstraintOfTypeParameter(thisType)
		}
	} else {
		// 3. The 'this' parameter of a contextual type
		thisContainer := getThisContainer(node, false /*includeArrowFunctions*/, false /*includeClassComputedPropertyName*/)
		if thisContainer != nil && ast.IsFunctionLike(thisContainer) {
			thisType = c.getContextualThisParameterType(thisContainer)
		}
	}
	if thisType != nil && thisType.objectFlags&(ObjectFlagsClassOrInterface|ObjectFlagsReference) != 0 {
		return getTargetType(thisType)
	}
	return nil
}

func getThisParameterFromNodeContext(node *ast.Node) *ast.Node {
	thisContainer := getThisContainer(node, false /*includeArrowFunctions*/, false /*includeClassComputedPropertyName*/)
	if thisContainer != nil && ast.IsFunctionLike(thisContainer) {
		return getThisParameter(thisContainer)
	}
	return nil
}

func (c *Checker) getContextualThisParameterType(fn *ast.Node) *Type {
	return nil // !!!
}

// Return contextual type of parameter or undefined if no contextual type is available
func (c *Checker) getContextuallyTypedParameterType(parameter *ast.Node) *Type {
	return nil // !!!
}

func (c *Checker) checkThisExpression(node *ast.Node) *Type {
	// Stop at the first arrow function so that we can
	// tell whether 'this' needs to be captured.
	container := getThisContainer(node, true /*includeArrowFunctions*/, true /*includeClassComputedPropertyName*/)
	capturedByArrowFunction := false
	thisInComputedPropertyName := false
	if ast.IsConstructorDeclaration(container) {
		c.checkThisBeforeSuper(node, container, diagnostics.X_super_must_be_called_before_accessing_this_in_the_constructor_of_a_derived_class)
	}
	for {
		// Now skip arrow functions to get the "real" owner of 'this'.
		if ast.IsArrowFunction(container) {
			container = getThisContainer(container, false /*includeArrowFunctions*/, !thisInComputedPropertyName)
			capturedByArrowFunction = true
		}
		if ast.IsComputedPropertyName(container) {
			container = getThisContainer(container, !capturedByArrowFunction, false /*includeClassComputedPropertyName*/)
			thisInComputedPropertyName = true
			continue
		}
		break
	}
	c.checkThisInStaticClassFieldInitializerInDecoratedClass(node, container)
	if thisInComputedPropertyName {
		c.error(node, diagnostics.X_this_cannot_be_referenced_in_a_computed_property_name)
	} else {
		switch container.Kind {
		case ast.KindModuleDeclaration:
			c.error(node, diagnostics.X_this_cannot_be_referenced_in_a_module_or_namespace_body)
			// do not return here so in case if lexical this is captured - it will be reflected in flags on NodeLinks
		case ast.KindEnumDeclaration:
			c.error(node, diagnostics.X_this_cannot_be_referenced_in_current_location)
			// do not return here so in case if lexical this is captured - it will be reflected in flags on NodeLinks
		}
	}
	t := c.tryGetThisTypeAtEx(node, true /*includeGlobalThis*/, container)
	if c.noImplicitThis {
		globalThisType := c.getTypeOfSymbol(c.globalThisSymbol)
		if t == globalThisType && capturedByArrowFunction {
			c.error(node, diagnostics.The_containing_arrow_function_captures_the_global_value_of_this)
		} else if t == nil {
			// With noImplicitThis, functions may not reference 'this' if it has type 'any'
			diag := c.error(node, diagnostics.X_this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation)
			if !ast.IsSourceFile(container) {
				outsideThis := c.tryGetThisTypeAt(container)
				if outsideThis != nil && outsideThis != globalThisType {
					diag.AddRelatedInfo(createDiagnosticForNode(container, diagnostics.An_outer_value_of_this_is_shadowed_by_this_container))
				}
			}
		}
	}
	if t == nil {
		return c.anyType
	}
	return t
}

func (c *Checker) tryGetThisTypeAt(node *ast.Node) *Type {
	return c.tryGetThisTypeAtEx(node, true /*includeGlobalThis*/, c.getThisContainer(node, false /*includeArrowFunctions*/, false /*includeClassComputedPropertyName*/))
}

func (c *Checker) tryGetThisTypeAtEx(node *ast.Node, includeGlobalThis bool, container *ast.Node) *Type {
	if ast.IsFunctionLike(container) && (!c.isInParameterInitializerBeforeContainingFunction(node) || getThisParameter(container) != nil) {
		thisType := c.getThisTypeOfDeclaration(container)
		// Note: a parameter initializer should refer to class-this unless function-this is explicitly annotated.
		// If this is a function in a JS file, it might be a class method.
		if thisType == nil {
			thisType = c.getContextualThisParameterType(container)
		}
		if thisType != nil {
			return c.getFlowTypeOfReference(node, thisType)
		}
	}
	if container.Parent != nil && ast.IsClassLike(container.Parent) {
		symbol := c.getSymbolOfDeclaration(container.Parent)
		var t *Type
		if isStatic(container) {
			t = c.getTypeOfSymbol(symbol)
		} else {
			t = c.getDeclaredTypeOfSymbol(symbol).AsInterfaceType().thisType
		}
		return c.getFlowTypeOfReference(node, t)
	}
	if ast.IsSourceFile(container) {
		// look up in the source file's locals or exports
		if container.AsSourceFile().ExternalModuleIndicator != nil {
			// TODO: Maybe issue a better error than 'object is possibly undefined'
			return c.undefinedType
		}
		if includeGlobalThis {
			return c.getTypeOfSymbol(c.globalThisSymbol)
		}
	}
	return nil
}

func (c *Checker) getThisContainer(node *ast.Node, includeArrowFunctions bool, includeClassComputedPropertyName bool) *ast.Node {
	for {
		node = node.Parent
		if node == nil {
			// If we never pass in a SourceFile, this should be unreachable, since we'll stop when we reach that.
			panic("No parent in getThisContainer")
		}
		switch node.Kind {
		case ast.KindComputedPropertyName:
			// If the grandparent node is an object literal (as opposed to a class),
			// then the computed property is not a 'this' container.
			// A computed property name in a class needs to be a this container
			// so that we can error on it.
			if includeClassComputedPropertyName && ast.IsClassLike(node.Parent.Parent) {
				return node
			}
			// If this is a computed property, then the parent should not
			// make it a this container. The parent might be a property
			// in an object literal, like a method or accessor. But in order for
			// such a parent to be a this container, the reference must be in
			// the *body* of the container.
			node = node.Parent.Parent
		case ast.KindDecorator:
			// Decorators are always applied outside of the body of a class or method.
			if node.Parent.Kind == ast.KindParameter && ast.IsClassElement(node.Parent.Parent) {
				// If the decorator's parent is a Parameter, we resolve the this container from
				// the grandparent class declaration.
				node = node.Parent.Parent
			} else if ast.IsClassElement(node.Parent) {
				// If the decorator's parent is a class element, we resolve the 'this' container
				// from the parent class declaration.
				node = node.Parent
			}
		case ast.KindArrowFunction:
			if !includeArrowFunctions {
				continue
			}
			fallthrough
		case ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindModuleDeclaration, ast.KindClassStaticBlockDeclaration,
			ast.KindPropertyDeclaration, ast.KindPropertySignature, ast.KindMethodDeclaration, ast.KindMethodSignature, ast.KindConstructor,
			ast.KindGetAccessor, ast.KindSetAccessor, ast.KindCallSignature, ast.KindConstructSignature, ast.KindIndexSignature,
			ast.KindEnumDeclaration, ast.KindSourceFile:
			return node
		}
	}
}

func (c *Checker) isInParameterInitializerBeforeContainingFunction(node *ast.Node) bool {
	inBindingInitializer := false
	for node.Parent != nil && !ast.IsFunctionLike(node.Parent) {
		if ast.IsParameter(node.Parent) {
			if inBindingInitializer || node.Parent.AsParameterDeclaration().Initializer == node {
				return true
			}
		}

		if ast.IsBindingElement(node.Parent) && node.Parent.AsBindingElement().Initializer == node {
			inBindingInitializer = true
		}

		node = node.Parent
	}

	return false
}

func (c *Checker) getThisTypeOfDeclaration(declaration *ast.Node) *Type {
	return c.getThisTypeOfSignature(c.getSignatureFromDeclaration(declaration))
}

func (c *Checker) checkThisInStaticClassFieldInitializerInDecoratedClass(thisExpression *ast.Node, container *ast.Node) {
	if ast.IsPropertyDeclaration(container) && hasStaticModifier(container) && c.legacyDecorators {
		initializer := container.Initializer()
		if initializer != nil && initializer.Loc.ContainsInclusive(thisExpression.Pos()) && hasDecorators(container.Parent) {
			c.error(thisExpression, diagnostics.Cannot_use_this_in_a_static_property_initializer_of_a_decorated_class)
		}
	}
}

func (c *Checker) checkThisBeforeSuper(node *ast.Node, container *ast.Node, diagnosticMessage *diagnostics.Message) {
	containingClassDecl := container.Parent
	baseTypeNode := getClassExtendsHeritageElement(containingClassDecl)
	// If a containing class does not have extends clause or the class extends null
	// skip checking whether super statement is called before "this" accessing.
	if baseTypeNode != nil && !c.classDeclarationExtendsNull(containingClassDecl) {
		if node.FlowNodeData() != nil && !c.isPostSuperFlowNode(node.FlowNodeData().FlowNode, false /*noCacheCheck*/) {
			c.error(node, diagnosticMessage)
		}
	}
}

/**
 * Check if the given class-declaration extends null then return true.
 * Otherwise, return false
 * @param classDecl a class declaration to check if it extends null
 */
func (c *Checker) classDeclarationExtendsNull(classDecl *ast.Node) bool {
	classSymbol := c.getSymbolOfDeclaration(classDecl)
	classInstanceType := c.getDeclaredTypeOfSymbol(classSymbol)
	baseConstructorType := c.getBaseConstructorTypeOfClass(classInstanceType)
	return baseConstructorType == c.nullWideningType
}

func (c *Checker) checkAssertion(node *ast.Node, checkMode CheckMode) *Type {
	typeNode := node.Type()
	exprType := c.checkExpression(node.Expression())
	if isConstTypeReference(typeNode) {
		if !c.isValidConstAssertionArgument(node.Expression()) {
			c.error(node.Expression(), diagnostics.A_const_assertions_can_only_be_applied_to_references_to_enum_members_or_string_number_boolean_array_or_object_literals)
		}
		return c.getRegularTypeOfLiteralType(exprType)
	}
	links := c.typeNodeLinks.get(node)
	links.resolvedType = exprType
	c.checkSourceElement(typeNode)
	c.checkNodeDeferred(node)
	return c.getTypeFromTypeNode(typeNode)
}

func (c *Checker) checkBinaryExpression(node *ast.Node, checkMode CheckMode) *Type {
	binary := node.AsBinaryExpression()
	return c.checkBinaryLikeExpression(binary.Left, binary.OperatorToken, binary.Right, checkMode, node)
}

func (c *Checker) checkBinaryLikeExpression(left *ast.Node, operatorToken *ast.Node, right *ast.Node, checkMode CheckMode, errorNode *ast.Node) *Type {
	operator := operatorToken.Kind
	if operator == ast.KindEqualsToken && (left.Kind == ast.KindObjectLiteralExpression || left.Kind == ast.KindArrayLiteralExpression) {
		// !!! Handle destructuring assignment
		return c.checkExpressionEx(right, checkMode)
	}
	leftType := c.checkExpressionEx(left, checkMode)
	rightType := c.checkExpressionEx(right, checkMode)
	if isLogicalOperator(operator) {
		c.checkTruthinessOfType(leftType, left)
	}
	switch operator {
	case ast.KindAsteriskToken, ast.KindAsteriskAsteriskToken, ast.KindAsteriskEqualsToken, ast.KindAsteriskAsteriskEqualsToken,
		ast.KindSlashToken, ast.KindSlashEqualsToken, ast.KindPercentToken, ast.KindPercentEqualsToken, ast.KindMinusToken,
		ast.KindMinusEqualsToken, ast.KindLessThanLessThanToken, ast.KindLessThanLessThanEqualsToken, ast.KindGreaterThanGreaterThanToken,
		ast.KindGreaterThanGreaterThanEqualsToken, ast.KindGreaterThanGreaterThanGreaterThanToken, ast.KindGreaterThanGreaterThanGreaterThanEqualsToken,
		ast.KindBarToken, ast.KindBarEqualsToken, ast.KindCaretToken, ast.KindCaretEqualsToken, ast.KindAmpersandToken, ast.KindAmpersandEqualsToken:
		if leftType == c.silentNeverType || rightType == c.silentNeverType {
			return c.silentNeverType
		}
		leftType = c.checkNonNullType(leftType, left)
		rightType = c.checkNonNullType(rightType, right)
		// if a user tries to apply a bitwise operator to 2 boolean operands
		// try and return them a helpful suggestion
		if leftType.flags&TypeFlagsBooleanLike != 0 && rightType.flags&TypeFlagsBooleanLike != 0 {
			suggestedOperator := c.getSuggestedBooleanOperator(operator)
			if suggestedOperator != ast.KindUnknown {
				c.error(operatorToken, diagnostics.The_0_operator_is_not_allowed_for_boolean_types_Consider_using_1_instead, scanner.TokenToString(operatorToken.Kind), scanner.TokenToString(suggestedOperator))
				return c.numberType
			}
		}
		// otherwise just check each operand separately and report errors as normal
		leftOk := c.checkArithmeticOperandType(left, leftType, diagnostics.The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_bigint_or_an_enum_type, true /*isAwaitValid*/)
		rightOk := c.checkArithmeticOperandType(right, rightType, diagnostics.The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_bigint_or_an_enum_type, true /*isAwaitValid*/)
		var resultType *Type
		// If both are any or unknown, allow operation; assume it will resolve to number
		if c.isTypeAssignableToKind(leftType, TypeFlagsAnyOrUnknown) && c.isTypeAssignableToKind(rightType, TypeFlagsAnyOrUnknown) || !c.maybeTypeOfKind(leftType, TypeFlagsBigIntLike) && !c.maybeTypeOfKind(rightType, TypeFlagsBigIntLike) {
			resultType = c.numberType
		} else if c.bothAreBigIntLike(leftType, rightType) {
			switch operator {
			case ast.KindGreaterThanGreaterThanGreaterThanToken, ast.KindGreaterThanGreaterThanGreaterThanEqualsToken:
				c.reportOperatorError(leftType, operator, rightType, errorNode, nil)
			case ast.KindAsteriskAsteriskToken, ast.KindAsteriskAsteriskEqualsToken:
				if c.languageVersion < core.ScriptTargetES2016 {
					c.error(errorNode, diagnostics.Exponentiation_cannot_be_performed_on_bigint_values_unless_the_target_option_is_set_to_es2016_or_later)
				}
			}
			resultType = c.bigintType
		} else {
			c.reportOperatorError(leftType, operator, rightType, errorNode, c.bothAreBigIntLike)
			resultType = c.errorType
		}
		if leftOk && rightOk {
			c.checkAssignmentOperator(left, operator, right, leftType, resultType)
			switch operator {
			case ast.KindLessThanLessThanToken, ast.KindLessThanLessThanEqualsToken, ast.KindGreaterThanGreaterThanToken,
				ast.KindGreaterThanGreaterThanEqualsToken, ast.KindGreaterThanGreaterThanGreaterThanToken,
				ast.KindGreaterThanGreaterThanGreaterThanEqualsToken:
				rhsEval := c.evaluate(right, right)
				if numValue, ok := rhsEval.value.(float64); ok && math.Abs(numValue) >= 32 {
					c.errorOrSuggestion(ast.IsEnumMember(ast.WalkUpParenthesizedExpressions(right.Parent.Parent)), errorNode, diagnostics.This_operation_can_be_simplified_This_shift_is_identical_to_0_1_2, getTextOfNode(left), scanner.TokenToString(operator), math.Floor(numValue/32))
				}
			}
		}
		return resultType
	case ast.KindPlusToken, ast.KindPlusEqualsToken:
		if leftType == c.silentNeverType || rightType == c.silentNeverType {
			return c.silentNeverType
		}
		if !c.isTypeAssignableToKind(leftType, TypeFlagsStringLike) && !c.isTypeAssignableToKind(rightType, TypeFlagsStringLike) {
			leftType = c.checkNonNullType(leftType, left)
			rightType = c.checkNonNullType(rightType, right)
		}
		var resultType *Type
		if c.isTypeAssignableToKindEx(leftType, TypeFlagsNumberLike, true /*strict*/) && c.isTypeAssignableToKindEx(rightType, TypeFlagsNumberLike, true /*strict*/) {
			// Operands of an enum type are treated as having the primitive type Number.
			// If both operands are of the Number primitive type, the result is of the Number primitive type.
			resultType = c.numberType
		} else if c.isTypeAssignableToKindEx(leftType, TypeFlagsBigIntLike, true /*strict*/) && c.isTypeAssignableToKindEx(rightType, TypeFlagsBigIntLike, true /*strict*/) {
			// If both operands are of the BigInt primitive type, the result is of the BigInt primitive type.
			resultType = c.bigintType
		} else if c.isTypeAssignableToKindEx(leftType, TypeFlagsStringLike, true /*strict*/) || c.isTypeAssignableToKindEx(rightType, TypeFlagsStringLike, true /*strict*/) {
			// If one or both operands are of the String primitive type, the result is of the String primitive type.
			resultType = c.stringType
		} else if isTypeAny(leftType) || isTypeAny(rightType) {
			// Otherwise, the result is of type Any.
			// NOTE: unknown type here denotes error type. Old compiler treated this case as any type so do we.
			if c.isErrorType(leftType) || c.isErrorType(rightType) {
				resultType = c.errorType
			} else {
				resultType = c.anyType
			}
		}
		// Symbols are not allowed at all in arithmetic expressions
		if resultType != nil && !c.checkForDisallowedESSymbolOperand(left, right, leftType, rightType, operator) {
			return resultType
		}
		if resultType == nil {
			// Types that have a reasonably good chance of being a valid operand type.
			// If both types have an awaited type of one of these, we'll assume the user
			// might be missing an await without doing an exhaustive check that inserting
			// await(s) will actually be a completely valid binary expression.
			closeEnoughKind := TypeFlagsNumberLike | TypeFlagsBigIntLike | TypeFlagsStringLike | TypeFlagsAnyOrUnknown
			c.reportOperatorError(leftType, operator, rightType, errorNode, func(left *Type, right *Type) bool {
				return c.isTypeAssignableToKind(left, closeEnoughKind) && c.isTypeAssignableToKind(right, closeEnoughKind)
			})
			return c.anyType
		}
		if operator == ast.KindPlusEqualsToken {
			c.checkAssignmentOperator(left, operator, right, leftType, resultType)
		}
		return resultType
	case ast.KindLessThanToken, ast.KindGreaterThanToken, ast.KindLessThanEqualsToken, ast.KindGreaterThanEqualsToken:
		if c.checkForDisallowedESSymbolOperand(left, right, leftType, rightType, operator) {
			leftType = c.getBaseTypeOfLiteralTypeForComparison(c.checkNonNullType(leftType, left))
			rightType = c.getBaseTypeOfLiteralTypeForComparison(c.checkNonNullType(rightType, right))
			c.reportOperatorErrorUnless(leftType, operator, rightType, errorNode, func(left *Type, right *Type) bool {
				if isTypeAny(left) || isTypeAny(right) {
					return true
				}
				leftAssignableToNumber := c.isTypeAssignableTo(left, c.numberOrBigIntType)
				rightAssignableToNumber := c.isTypeAssignableTo(right, c.numberOrBigIntType)
				return leftAssignableToNumber && rightAssignableToNumber || !leftAssignableToNumber && !rightAssignableToNumber && c.areTypesComparable(left, right)
			})
		}
		return c.booleanType
	case ast.KindEqualsEqualsToken, ast.KindExclamationEqualsToken, ast.KindEqualsEqualsEqualsToken, ast.KindExclamationEqualsEqualsToken:
		// We suppress errors in CheckMode.TypeOnly (meaning the invocation came from getTypeOfExpression). During
		// control flow analysis it is possible for operands to temporarily have narrower types, and those narrower
		// types may cause the operands to not be comparable. We don't want such errors reported (see #46475).
		if checkMode&CheckModeTypeOnly == 0 {
			if isLiteralExpressionOfObject(left) || isLiteralExpressionOfObject(right) {
				eqType := operator == ast.KindEqualsEqualsToken || operator == ast.KindEqualsEqualsEqualsToken
				c.error(errorNode, diagnostics.This_condition_will_always_return_0_since_JavaScript_compares_objects_by_reference_not_value, core.IfElse(eqType, "false", "true"))
			}
			c.checkNaNEquality(errorNode, operator, left, right)
			c.reportOperatorErrorUnless(leftType, operator, rightType, errorNode, func(left *Type, right *Type) bool {
				return c.isTypeEqualityComparableTo(left, right) || c.isTypeEqualityComparableTo(right, left)
			})
		}
		return c.booleanType
	case ast.KindInstanceOfKeyword:
		return c.checkInstanceOfExpression(left, right, leftType, rightType, checkMode)
	case ast.KindInKeyword:
		return c.checkInExpression(left, right, leftType, rightType)
	case ast.KindAmpersandAmpersandToken, ast.KindAmpersandAmpersandEqualsToken:
		resultType := leftType
		if c.hasTypeFacts(leftType, TypeFactsTruthy) {
			t := leftType
			if !c.strictNullChecks {
				t = c.getBaseTypeOfLiteralType(rightType)
			}
			resultType = c.getUnionType([]*Type{c.extractDefinitelyFalsyTypes(t), rightType})
		}
		if operator == ast.KindAmpersandAmpersandEqualsToken {
			c.checkAssignmentOperator(left, operator, right, leftType, rightType)
		}
		return resultType
	case ast.KindBarBarToken,
		ast.KindBarBarEqualsToken:
		resultType := leftType
		if c.hasTypeFacts(leftType, TypeFactsFalsy) {
			resultType = c.getUnionTypeEx([]*Type{c.getNonNullableType(c.removeDefinitelyFalsyTypes(leftType)), rightType}, UnionReductionSubtype, nil, nil)
		}
		if operator == ast.KindBarBarEqualsToken {
			c.checkAssignmentOperator(left, operator, right, leftType, rightType)
		}
		return resultType
	case ast.KindQuestionQuestionToken, ast.KindQuestionQuestionEqualsToken:
		resultType := leftType
		if c.hasTypeFacts(leftType, TypeFactsEQUndefinedOrNull) {
			resultType = c.getUnionTypeEx([]*Type{c.getNonNullableType(leftType), rightType}, UnionReductionSubtype, nil, nil)
		}
		if operator == ast.KindQuestionQuestionEqualsToken {
			c.checkAssignmentOperator(left, operator, right, leftType, rightType)
		}
		return resultType
	case ast.KindEqualsToken:
		c.checkAssignmentOperator(left, operator, right, leftType, rightType)
		return rightType
	case ast.KindCommaToken:
		if c.compilerOptions.AllowUnreachableCode == core.TSFalse && c.isSideEffectFree(left) && !c.isIndirectCall(left.Parent) {
			sf := ast.GetSourceFileOfNode(left)
			start := scanner.SkipTrivia(sf.Text, left.Pos())
			isInDiag2657 := core.Some(sf.Diagnostics(), func(d *ast.Diagnostic) bool {
				if d.Code() != diagnostics.JSX_expressions_must_have_one_parent_element.Code() {
					return false
				}
				return d.Loc().Contains(start)
			})
			if !isInDiag2657 {
				c.error(left, diagnostics.Left_side_of_comma_operator_is_unused_and_has_no_side_effects)
			}
		}
		return rightType
	}
	panic("Unhandled case in checkBinaryLikeExpression")
}

func (c *Checker) reportOperatorError(leftType *Type, operator ast.Kind, rightType *Type, errorNode *ast.Node, isRelated func(left *Type, right *Type) bool) {
	wouldWorkWithAwait := false
	if isRelated != nil {
		awaitedLeftType := c.getAwaitedTypeNoAlias(leftType)
		awaitedRightType := c.getAwaitedTypeNoAlias(rightType)
		wouldWorkWithAwait = !(awaitedLeftType == leftType && awaitedRightType == rightType) && awaitedLeftType != nil && awaitedRightType != nil && isRelated(awaitedLeftType, awaitedRightType)
	}
	effectiveLeft := leftType
	effectiveRight := rightType
	if !wouldWorkWithAwait && isRelated != nil {
		effectiveLeft, effectiveRight = c.getBaseTypesIfUnrelated(leftType, rightType, isRelated)
	}
	leftStr, rightStr := c.getTypeNamesForErrorDisplay(effectiveLeft, effectiveRight)
	switch operator {
	case ast.KindEqualsEqualsEqualsToken, ast.KindEqualsEqualsToken, ast.KindExclamationEqualsEqualsToken, ast.KindExclamationEqualsToken:
		c.errorAndMaybeSuggestAwait(errorNode, wouldWorkWithAwait, diagnostics.This_comparison_appears_to_be_unintentional_because_the_types_0_and_1_have_no_overlap, leftStr, rightStr)
	default:
		c.errorAndMaybeSuggestAwait(errorNode, wouldWorkWithAwait, diagnostics.Operator_0_cannot_be_applied_to_types_1_and_2, scanner.TokenToString(operator), leftStr, rightStr)
	}
}

func (c *Checker) reportOperatorErrorUnless(leftType *Type, operator ast.Kind, rightType *Type, errorNode *ast.Node, typesAreCompatible func(left *Type, right *Type) bool) {
	if !typesAreCompatible(leftType, rightType) {
		c.reportOperatorError(leftType, operator, rightType, errorNode, typesAreCompatible)
	}
}

func (c *Checker) getBaseTypesIfUnrelated(leftType *Type, rightType *Type, isRelated func(left *Type, right *Type) bool) (*Type, *Type) {
	effectiveLeft := leftType
	effectiveRight := rightType
	leftBase := c.getBaseTypeOfLiteralType(leftType)
	rightBase := c.getBaseTypeOfLiteralType(rightType)
	if !isRelated(leftBase, rightBase) {
		effectiveLeft = leftBase
		effectiveRight = rightBase
	}
	return effectiveLeft, effectiveRight
}

func (c *Checker) checkAssignmentOperator(left *ast.Node, operator ast.Kind, right *ast.Node, leftType *Type, rightType *Type) {
	if isAssignmentOperator(operator) {
		// getters can be a subtype of setters, so to check for assignability we use the setter's type instead
		if isCompoundAssignment(operator) && ast.IsPropertyAccessExpression(left) {
			leftType = c.checkPropertyAccessExpression(left, CheckModeNormal, true /*writeOnly*/)
		}
		if c.checkReferenceExpression(left, diagnostics.The_left_hand_side_of_an_assignment_expression_must_be_a_variable_or_a_property_access, diagnostics.The_left_hand_side_of_an_assignment_expression_may_not_be_an_optional_property_access) {
			var headMessage *diagnostics.Message
			if c.exactOptionalPropertyTypes && ast.IsPropertyAccessExpression(left) && c.maybeTypeOfKind(rightType, TypeFlagsUndefined) {
				target := c.getTypeOfPropertyOfType(c.getTypeOfExpression(left.Expression()), left.Name().Text())
				if c.isExactOptionalPropertyMismatch(rightType, target) {
					headMessage = diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_type_of_the_target
				}
			}
			// to avoid cascading errors check assignability only if 'isReference' check succeeded and no errors were reported
			c.checkTypeAssignableToAndOptionallyElaborate(rightType, leftType, left, right, headMessage, nil)
		}
	}
}

func (c *Checker) bothAreBigIntLike(left *Type, right *Type) bool {
	return c.isTypeAssignableToKind(left, TypeFlagsBigIntLike) && c.isTypeAssignableToKind(right, TypeFlagsBigIntLike)
}

func (c *Checker) getSuggestedBooleanOperator(operator ast.Kind) ast.Kind {
	switch operator {
	case ast.KindBarToken, ast.KindBarEqualsToken:
		return ast.KindBarBarToken
	case ast.KindCaretToken, ast.KindCaretEqualsToken:
		return ast.KindExclamationEqualsEqualsToken
	case ast.KindAmpersandToken, ast.KindAmpersandEqualsToken:
		return ast.KindAmpersandAmpersandToken
	}
	return ast.KindUnknown
}

func (c *Checker) checkArithmeticOperandType(operand *ast.Node, t *Type, diagnostic *diagnostics.Message, isAwaitValid bool) bool {
	if !c.isTypeAssignableTo(t, c.numberOrBigIntType) {
		var awaitedType *Type
		if isAwaitValid {
			awaitedType = c.getAwaitedTypeOfPromise(t)
		}
		c.errorAndMaybeSuggestAwait(operand, awaitedType != nil && c.isTypeAssignableTo(awaitedType, c.numberOrBigIntType), diagnostic)
		return false
	}
	return true
}

// Return true if there was no error, false if there was an error.
func (c *Checker) checkForDisallowedESSymbolOperand(left *ast.Node, right *ast.Node, leftType *Type, rightType *Type, operator ast.Kind) bool {
	var offendingSymbolOperand *ast.Node
	switch {
	case c.maybeTypeOfKindConsideringBaseConstraint(leftType, TypeFlagsESSymbolLike):
		offendingSymbolOperand = left
	case c.maybeTypeOfKindConsideringBaseConstraint(rightType, TypeFlagsESSymbolLike):
		offendingSymbolOperand = right
	}
	if offendingSymbolOperand != nil {
		c.error(offendingSymbolOperand, diagnostics.The_0_operator_cannot_be_applied_to_type_symbol, scanner.TokenToString(operator))
		return false
	}
	return true
}

func (c *Checker) checkNaNEquality(errorNode *ast.Node, operator ast.Kind, left *ast.Expression, right *ast.Expression) {
	isLeftNaN := c.isGlobalNaN(ast.SkipParentheses(left))
	isRightNaN := c.isGlobalNaN(ast.SkipParentheses(right))
	if isLeftNaN || isRightNaN {
		err := c.error(errorNode, diagnostics.This_condition_will_always_return_0, scanner.TokenToString(core.IfElse(operator == ast.KindEqualsEqualsEqualsToken || operator == ast.KindEqualsEqualsToken, ast.KindFalseKeyword, ast.KindTrueKeyword)))
		if isLeftNaN && isRightNaN {
			return
		}
		var operatorString string
		if operator == ast.KindExclamationEqualsEqualsToken || operator == ast.KindExclamationEqualsToken {
			operatorString = scanner.TokenToString(ast.KindExclamationToken)
		}
		location := left
		if isLeftNaN {
			location = right
		}
		expression := ast.SkipParentheses(location)
		entityName := "..."
		if isEntityNameExpression(expression) {
			entityName = entityNameToString(expression)
		}
		suggestion := operatorString + "Number.isNaN(" + entityName + ")"
		err.AddRelatedInfo(createDiagnosticForNode(location, diagnostics.Did_you_mean_0, suggestion))
	}
}

func (c *Checker) isGlobalNaN(expr *ast.Expression) bool {
	if ast.IsIdentifier(expr) && expr.Text() == "NaN" {
		globalNaNSymbol := c.getGlobalNaNSymbol()
		return globalNaNSymbol != nil && globalNaNSymbol == c.getResolvedSymbol(expr)
	}
	return false
}

func (c *Checker) isTypeEqualityComparableTo(source *Type, target *Type) bool {
	return (target.flags&TypeFlagsNullable) != 0 || c.isTypeComparableTo(source, target)
}

func (c *Checker) checkTruthinessOfType(t *Type, node *ast.Node) *Type {
	if t.flags&TypeFlagsVoid != 0 {
		c.error(node, diagnostics.An_expression_of_type_void_cannot_be_tested_for_truthiness)
		return t
	}
	semantics := c.getSyntacticTruthySemantics(node)
	if semantics != PredicateSemanticsSometimes {
		c.error(node, core.IfElse(semantics == PredicateSemanticsAlways, diagnostics.This_kind_of_expression_is_always_truthy, diagnostics.This_kind_of_expression_is_always_falsy))
	}
	return t
}

type PredicateSemantics uint32

const (
	PredicateSemanticsNone      PredicateSemantics = 0
	PredicateSemanticsAlways    PredicateSemantics = 1 << 0
	PredicateSemanticsNever     PredicateSemantics = 1 << 1
	PredicateSemanticsSometimes                    = PredicateSemanticsAlways | PredicateSemanticsNever
)

func (c *Checker) getSyntacticTruthySemantics(node *ast.Node) PredicateSemantics {
	node = ast.SkipOuterExpressions(node, ast.OEKAll)
	switch node.Kind {
	case ast.KindNumericLiteral:
		// Allow `while(0)` or `while(1)`
		if node.Text() == "0" || node.Text() == "1" {
			return PredicateSemanticsSometimes
		}
		return PredicateSemanticsAlways
	case ast.KindArrayLiteralExpression, ast.KindArrowFunction, ast.KindBigIntLiteral, ast.KindClassExpression, ast.KindFunctionExpression,
		ast.KindJsxElement, ast.KindJsxSelfClosingElement, ast.KindObjectLiteralExpression, ast.KindRegularExpressionLiteral:
		return PredicateSemanticsAlways
	case ast.KindVoidExpression, ast.KindNullKeyword:
		return PredicateSemanticsNever
	case ast.KindNoSubstitutionTemplateLiteral, ast.KindStringLiteral:
		if node.Text() != "" {
			return PredicateSemanticsAlways
		}
		return PredicateSemanticsNever
	case ast.KindConditionalExpression:
		return c.getSyntacticTruthySemantics(node.AsConditionalExpression().WhenTrue) | c.getSyntacticTruthySemantics(node.AsConditionalExpression().WhenFalse)
	case ast.KindIdentifier:
		if c.getResolvedSymbol(node) == c.undefinedSymbol {
			return PredicateSemanticsNever
		}
	}
	return PredicateSemanticsSometimes
}

/**
 * This is a *shallow* check: An expression is side-effect-free if the
 * evaluation of the expression *itself* cannot produce side effects.
 * For example, x++ / 3 is side-effect free because the / operator
 * does not have side effects.
 * The intent is to "smell test" an expression for correctness in positions where
 * its value is discarded (e.g. the left side of the comma operator).
 */
func (c *Checker) isSideEffectFree(node *ast.Node) bool {
	node = ast.SkipParentheses(node)
	switch node.Kind {
	case ast.KindIdentifier, ast.KindStringLiteral, ast.KindRegularExpressionLiteral, ast.KindTaggedTemplateExpression, ast.KindTemplateExpression,
		ast.KindNoSubstitutionTemplateLiteral, ast.KindNumericLiteral, ast.KindBigIntLiteral, ast.KindTrueKeyword, ast.KindFalseKeyword,
		ast.KindNullKeyword, ast.KindUndefinedKeyword, ast.KindFunctionExpression, ast.KindClassExpression, ast.KindArrowFunction,
		ast.KindArrayLiteralExpression, ast.KindObjectLiteralExpression, ast.KindTypeOfExpression, ast.KindNonNullExpression, ast.KindJsxSelfClosingElement,
		ast.KindJsxElement:
		return true
	case ast.KindConditionalExpression:
		return c.isSideEffectFree(node.AsConditionalExpression().WhenTrue) && c.isSideEffectFree(node.AsConditionalExpression().WhenFalse)
	case ast.KindBinaryExpression:
		if isAssignmentOperator(node.AsBinaryExpression().OperatorToken.Kind) {
			return false
		}
		return c.isSideEffectFree(node.AsBinaryExpression().Left) && c.isSideEffectFree(node.AsBinaryExpression().Right)
	case ast.KindPrefixUnaryExpression, ast.KindPostfixUnaryExpression:
		// Unary operators ~, !, +, and - have no side effects.
		// The rest do.
		switch node.AsPrefixUnaryExpression().Operator {
		case ast.KindExclamationToken, ast.KindPlusToken, ast.KindMinusToken, ast.KindTildeToken:
			return true
		}
	}
	return false
}

// Return true for "indirect calls", (i.e. `(0, x.f)(...)` or `(0, eval)(...)`), which prevents passing `this`.
func (c *Checker) isIndirectCall(node *ast.Node) bool {
	left := node.AsBinaryExpression().Left
	right := node.AsBinaryExpression().Right
	return ast.IsParenthesizedExpression(node.Parent) && ast.IsNumericLiteral(left) && left.Text() == "0" &&
		(ast.IsCallExpression(node.Parent.Parent) && node.Parent.Parent.Expression() == node.Parent ||
			ast.IsTaggedTemplateExpression(node.Parent.Parent) && (ast.IsAccessExpression(right) || ast.IsIdentifier(right) && right.Text() == "eval"))
}

func (c *Checker) checkInstanceOfExpression(left *ast.Expression, right *ast.Expression, leftType *Type, rightType *Type, checkMode CheckMode) *Type {
	if leftType == c.silentNeverType || rightType == c.silentNeverType {
		return c.silentNeverType
	}
	// TypeScript 1.0 spec (April 2014): 4.15.4
	// The instanceof operator requires the left operand to be of type Any, an object type, or a type parameter type,
	// and the right operand to be of type Any, a subtype of the 'Function' interface type, or have a call or construct signature.
	// The result is always of the Boolean primitive type.
	// NOTE: do not raise error if leftType is unknown as related error was already reported
	if !isTypeAny(leftType) && c.allTypesAssignableToKind(leftType, TypeFlagsPrimitive) {
		c.error(left, diagnostics.The_left_hand_side_of_an_instanceof_expression_must_be_of_type_any_an_object_type_or_a_type_parameter)
	}
	signature := c.getResolvedSignature(left.Parent, nil /*candidatesOutArray*/, checkMode)
	if signature == c.resolvingSignature {
		// CheckMode.SkipGenericFunctions is enabled and this is a call to a generic function that
		// returns a function type. We defer checking and return silentNeverType.
		return c.silentNeverType
	}
	// If rightType has a `[Symbol.hasInstance]` method that is not `(value: unknown) => boolean`, we
	// must check the expression as if it were a call to `right[Symbol.hasInstance](left)`. The call to
	// `getResolvedSignature`, below, will check that leftType is assignable to the type of the first
	// parameter.
	returnType := c.getReturnTypeOfSignature(signature)
	// We also verify that the return type of the `[Symbol.hasInstance]` method is assignable to
	// `boolean`. According to the spec, the runtime will actually perform `ToBoolean` on the result,
	// but this is more type-safe.
	c.checkTypeAssignableTo(returnType, c.booleanType, right, diagnostics.An_object_s_Symbol_hasInstance_method_must_return_a_boolean_value_for_it_to_be_used_on_the_right_hand_side_of_an_instanceof_expression)
	return c.booleanType
}

func (c *Checker) checkInExpression(left *ast.Expression, right *ast.Expression, leftType *Type, rightType *Type) *Type {
	if leftType == c.silentNeverType || rightType == c.silentNeverType {
		return c.silentNeverType
	}
	if ast.IsPrivateIdentifier(left) {
		// !!!
		// if c.languageVersion < LanguageFeatureMinimumTarget.PrivateNamesAndClassStaticBlocks || c.languageVersion < LanguageFeatureMinimumTarget.ClassAndClassElementDecorators || !c.useDefineForClassFields {
		// 	c.checkExternalEmitHelpers(left, ExternalEmitHelpersClassPrivateFieldIn)
		// }
		// Unlike in 'checkPrivateIdentifierExpression' we now have access to the RHS type
		// which provides us with the opportunity to emit more detailed errors
		if c.identifierSymbols[left] == nil && getContainingClass(left) != nil {
			c.reportNonexistentProperty(left, rightType)
		}
	} else {
		// The type of the lef operand must be assignable to string, number, or symbol.
		c.checkTypeAssignableTo(c.checkNonNullType(leftType, left), c.stringNumberSymbolType, left, nil)
	}
	// The type of the right operand must be assignable to 'object'.
	if c.checkTypeAssignableTo(c.checkNonNullType(rightType, right), c.nonPrimitiveType, right, nil) {
		// The {} type is assignable to the object type, yet {} might represent a primitive type. Here we
		// detect and error on {} that results from narrowing the unknown type, as well as intersections
		// that include {} (we know that the other types in such intersections are assignable to object
		// since we already checked for that).
		if c.hasEmptyObjectIntersection(rightType) {
			c.error(right, diagnostics.Type_0_may_represent_a_primitive_value_which_is_not_permitted_as_the_right_operand_of_the_in_operator, c.typeToString(rightType))
		}
	}
	// The result is always of the Boolean primitive type.
	return c.booleanType
}

func (c *Checker) hasEmptyObjectIntersection(t *Type) bool {
	return someType(t, func(t *Type) bool {
		return t == c.unknownEmptyObjectType || t.flags&TypeFlagsIntersection != 0 && c.isEmptyAnonymousObjectType(c.getBaseConstraintOrType(t))
	})
}

func (c *Checker) getResolvedSignature(node *ast.Node, candidatesOutArray *[]*Signature, checkMode CheckMode) *Signature {
	return c.unknownSignature // !!!
}

func (c *Checker) isExactOptionalPropertyMismatch(source *Type, target *Type) bool {
	return source != nil && target != nil && c.maybeTypeOfKind(source, TypeFlagsUndefined) && !!c.containsMissingType(target)
}

func (c *Checker) checkReferenceExpression(expr *ast.Node, invalidReferenceMessage *diagnostics.Message, invalidOptionalChainMessage *diagnostics.Message) bool {
	// References are combinations of identifiers, parentheses, and property accesses.
	node := ast.SkipOuterExpressions(expr, ast.OEKAssertions|ast.OEKParentheses)
	if node.Kind != ast.KindIdentifier && !ast.IsAccessExpression(node) {
		c.error(expr, invalidReferenceMessage)
		return false
	}
	if node.Flags&ast.NodeFlagsOptionalChain != 0 {
		c.error(expr, invalidOptionalChainMessage)
		return false
	}
	return true
}

func (c *Checker) checkObjectLiteral(node *ast.Node, checkMode CheckMode) *Type {
	inDestructuringPattern := isAssignmentTarget(node)
	// Grammar checking
	c.checkGrammarObjectLiteralExpression(node.AsObjectLiteralExpression(), inDestructuringPattern)

	// c.checkGrammarObjectLiteralExpression(node, inDestructuringPattern)
	var allPropertiesTable ast.SymbolTable
	if c.strictNullChecks {
		allPropertiesTable = make(ast.SymbolTable)
	}
	propertiesTable := make(ast.SymbolTable)
	var propertiesArray []*ast.Symbol
	spread := c.emptyObjectType
	c.pushCachedContextualType(node)
	contextualType := c.getApparentTypeOfContextualType(node, ContextFlagsNone)
	var contextualTypeHasPattern bool
	if contextualType != nil {
		if pattern := c.patternForType[contextualType]; pattern != nil && (ast.IsObjectBindingPattern(pattern) || ast.IsObjectLiteralExpression(pattern)) {
			contextualTypeHasPattern = true
		}
	}
	inConstContext := c.isConstContext(node)
	var checkFlags ast.CheckFlags
	if inConstContext {
		checkFlags = ast.CheckFlagsReadonly
	}
	objectFlags := ObjectFlagsFreshLiteral
	patternWithComputedProperties := false
	hasComputedStringProperty := false
	hasComputedNumberProperty := false
	hasComputedSymbolProperty := false
	// Spreads may cause an early bail; ensure computed names are always checked (this is cached)
	// As otherwise they may not be checked until exports for the type at this position are retrieved,
	// which may never occur.
	for _, elem := range node.AsObjectLiteralExpression().Properties.Nodes {
		if elem.Name() != nil && ast.IsComputedPropertyName(elem.Name()) {
			c.checkComputedPropertyName(elem.Name())
		}
	}
	offset := 0
	createObjectLiteralType := func() *Type {
		var indexInfos []*IndexInfo
		isReadonly := c.isConstContext(node)
		if hasComputedStringProperty {
			indexInfos = append(indexInfos, c.getObjectLiteralIndexInfo(isReadonly, propertiesArray[offset:], c.stringType))
		}
		if hasComputedNumberProperty {
			indexInfos = append(indexInfos, c.getObjectLiteralIndexInfo(isReadonly, propertiesArray[offset:], c.numberType))
		}
		if hasComputedSymbolProperty {
			indexInfos = append(indexInfos, c.getObjectLiteralIndexInfo(isReadonly, propertiesArray[offset:], c.esSymbolType))
		}
		result := c.newAnonymousType(node.Symbol(), propertiesTable, nil, nil, indexInfos)
		result.objectFlags |= objectFlags | ObjectFlagsObjectLiteral | ObjectFlagsContainsObjectOrArrayLiteral
		if patternWithComputedProperties {
			result.objectFlags |= ObjectFlagsObjectLiteralPatternWithComputedProperties
		}
		if inDestructuringPattern {
			c.patternForType[result] = node
		}
		return result
	}
	for _, memberDecl := range node.AsObjectLiteralExpression().Properties.Nodes {
		member := c.getSymbolOfDeclaration(memberDecl)
		var computedNameType *Type
		if memberDecl.Name() != nil && memberDecl.Name().Kind == ast.KindComputedPropertyName {
			computedNameType = c.checkComputedPropertyName(memberDecl.Name())
		}
		if ast.IsPropertyAssignment(memberDecl) || ast.IsShorthandPropertyAssignment(memberDecl) || isObjectLiteralMethod(memberDecl) {
			var t *Type
			switch {
			case memberDecl.Kind == ast.KindPropertyAssignment:
				t = c.checkPropertyAssignment(memberDecl, checkMode)
			case memberDecl.Kind == ast.KindShorthandPropertyAssignment:
				var expr *ast.Node
				if !inDestructuringPattern {
					expr = memberDecl.AsShorthandPropertyAssignment().ObjectAssignmentInitializer
				}
				if expr == nil {
					expr = memberDecl.Name()
				}
				t = c.checkExpressionForMutableLocation(expr, checkMode)
			default:
				t = c.checkObjectLiteralMethod(memberDecl, checkMode)
			}
			objectFlags |= t.objectFlags & ObjectFlagsPropagatingFlags
			var nameType *Type
			if computedNameType != nil && isTypeUsableAsPropertyName(computedNameType) {
				nameType = computedNameType
			}
			var prop *ast.Symbol
			if nameType != nil {
				prop = c.newSymbolEx(ast.SymbolFlagsProperty|member.Flags, getPropertyNameFromType(nameType), checkFlags|ast.CheckFlagsLate)
			} else {
				prop = c.newSymbolEx(ast.SymbolFlagsProperty|member.Flags, member.Name, checkFlags)
			}
			links := c.valueSymbolLinks.get(prop)
			if nameType != nil {
				links.nameType = nameType
			}
			if inDestructuringPattern && c.hasDefaultValue(memberDecl) {
				// If object literal is an assignment pattern and if the assignment pattern specifies a default value
				// for the property, make the property optional.
				prop.Flags |= ast.SymbolFlagsOptional
			} else if contextualTypeHasPattern && contextualType.objectFlags&ObjectFlagsObjectLiteralPatternWithComputedProperties == 0 {
				// If object literal is contextually typed by the implied type of a binding pattern, and if the
				// binding pattern specifies a default value for the property, make the property optional.
				impliedProp := c.getPropertyOfType(contextualType, member.Name)
				if impliedProp != nil {
					prop.Flags |= impliedProp.Flags & ast.SymbolFlagsOptional
				} else if c.getIndexInfoOfType(contextualType, c.stringType) == nil {
					c.error(memberDecl.Name(), diagnostics.Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1, c.symbolToString(member), c.typeToString(contextualType))
				}
			}
			prop.Declarations = member.Declarations
			prop.Parent = member.Parent
			prop.ValueDeclaration = member.ValueDeclaration
			links.resolvedType = t
			links.target = member
			member = prop
			if allPropertiesTable != nil {
				allPropertiesTable[prop.Name] = prop
			}
			if contextualType != nil && checkMode&CheckModeInferential != 0 && checkMode&CheckModeSkipContextSensitive == 0 && (ast.IsPropertyAssignment(memberDecl) || ast.IsMethodDeclaration(memberDecl)) && c.isContextSensitive(memberDecl) {
				// !!!
				// inferenceContext := c.getInferenceContext(node)
				// Debug.assert(inferenceContext)
				// // In CheckMode.Inferential we should always have an inference context
				// var inferenceNode /* TODO(TS-TO-GO) inferred type Expression | MethodDeclaration */ any
				// if memberDecl.kind == KindPropertyAssignment {
				// 	inferenceNode = memberDecl.initializer
				// } else {
				// 	inferenceNode = memberDecl
				// }
				// c.addIntraExpressionInferenceSite(inferenceContext, inferenceNode, t)
			}
		} else if memberDecl.Kind == ast.KindSpreadAssignment {
			if len(propertiesArray) > 0 {
				spread = c.getSpreadType(spread, createObjectLiteralType(), node.Symbol(), objectFlags, inConstContext)
				propertiesArray = nil
				propertiesTable = make(ast.SymbolTable)
				hasComputedStringProperty = false
				hasComputedNumberProperty = false
				hasComputedSymbolProperty = false
			}
			t := c.getReducedType(c.checkExpressionEx(memberDecl.Expression(), checkMode&CheckModeInferential))
			if c.isValidSpreadType(t) {
				mergedType := c.tryMergeUnionOfObjectTypeAndEmptyObject(t, inConstContext)
				if allPropertiesTable != nil {
					c.checkSpreadPropOverrides(mergedType, allPropertiesTable, memberDecl)
				}
				offset = len(propertiesArray)
				if c.isErrorType(spread) {
					continue
				}
				spread = c.getSpreadType(spread, mergedType, node.Symbol(), objectFlags, inConstContext)
			} else {
				c.error(memberDecl, diagnostics.Spread_types_may_only_be_created_from_object_types)
				spread = c.errorType
			}
			continue
		} else {
			// TypeScript 1.0 spec (April 2014)
			// A get accessor declaration is processed in the same manner as
			// an ordinary function declaration(section 6.1) with no parameters.
			// A set accessor declaration is processed in the same manner
			// as an ordinary function declaration with a single parameter and a Void return type.
			// !!!
			// Debug.assert(memberDecl.kind == KindGetAccessor || memberDecl.kind == KindSetAccessor)
			c.checkNodeDeferred(memberDecl)
		}
		if computedNameType != nil && computedNameType.flags&TypeFlagsStringOrNumberLiteralOrUnique == 0 {
			if c.isTypeAssignableTo(computedNameType, c.stringNumberSymbolType) {
				if c.isTypeAssignableTo(computedNameType, c.numberType) {
					hasComputedNumberProperty = true
				} else if c.isTypeAssignableTo(computedNameType, c.esSymbolType) {
					hasComputedSymbolProperty = true
				} else {
					hasComputedStringProperty = true
				}
				if inDestructuringPattern {
					patternWithComputedProperties = true
				}
			}
		} else {
			propertiesTable[member.Name] = member
		}
		propertiesArray = append(propertiesArray, member)
	}
	c.popContextualType()
	if c.isErrorType(spread) {
		return c.errorType
	}
	if spread != c.emptyObjectType {
		if len(propertiesArray) > 0 {
			spread = c.getSpreadType(spread, createObjectLiteralType(), node.Symbol(), objectFlags, inConstContext)
			propertiesArray = nil
			propertiesTable = make(ast.SymbolTable)
			hasComputedStringProperty = false
			hasComputedNumberProperty = false
		}
		// remap the raw emptyObjectType fed in at the top into a fresh empty object literal type, unique to this use site
		return c.mapType(spread, func(t *Type) *Type {
			if t == c.emptyObjectType {
				return createObjectLiteralType()
			}
			return t
		})
	}
	return createObjectLiteralType()
}

func (c *Checker) checkSpreadPropOverrides(t *Type, props ast.SymbolTable, spread *ast.Node) {
	for _, right := range c.getPropertiesOfType(t) {
		if right.Flags&ast.SymbolFlagsOptional == 0 {
			if left := props[right.Name]; left != nil {
				diagnostic := c.error(left.ValueDeclaration, diagnostics.X_0_is_specified_more_than_once_so_this_usage_will_be_overwritten, left.Name)
				diagnostic.AddRelatedInfo(NewDiagnosticForNode(spread, diagnostics.This_spread_always_overwrites_this_property))
			}
		}
	}
}

/**
 * Since the source of spread types are object literals, which are not binary,
 * this function should be called in a left folding style, with left = previous result of getSpreadType
 * and right = the new element to be spread.
 */
func (c *Checker) getSpreadType(left *Type, right *Type, symbol *ast.Symbol, objectFlags ObjectFlags, readonly bool) *Type {
	if left.flags&TypeFlagsAny != 0 || right.flags&TypeFlagsAny != 0 {
		return c.anyType
	}
	if left.flags&TypeFlagsUnknown != 0 || right.flags&TypeFlagsUnknown != 0 {
		return c.unknownType
	}
	if left.flags&TypeFlagsNever != 0 {
		return right
	}
	if right.flags&TypeFlagsNever != 0 {
		return left
	}
	left = c.tryMergeUnionOfObjectTypeAndEmptyObject(left, readonly)
	if left.flags&TypeFlagsUnion != 0 {
		if c.checkCrossProductUnion([]*Type{left, right}) {
			return c.mapType(left, func(t *Type) *Type {
				return c.getSpreadType(t, right, symbol, objectFlags, readonly)
			})
		}
		return c.errorType
	}
	right = c.tryMergeUnionOfObjectTypeAndEmptyObject(right, readonly)
	if right.flags&TypeFlagsUnion != 0 {
		if c.checkCrossProductUnion([]*Type{left, right}) {
			return c.mapType(right, func(t *Type) *Type {
				return c.getSpreadType(left, t, symbol, objectFlags, readonly)
			})
		}
		return c.errorType
	}
	if right.flags&(TypeFlagsBooleanLike|TypeFlagsNumberLike|TypeFlagsBigIntLike|TypeFlagsStringLike|TypeFlagsEnumLike|TypeFlagsNonPrimitive|TypeFlagsIndex) != 0 {
		return left
	}
	if c.isGenericObjectType(left) || c.isGenericObjectType(right) {
		if c.isEmptyObjectType(left) {
			return right
		}
		// When the left type is an intersection, we may need to merge the last constituent of the
		// intersection with the right type. For example when the left type is 'T & { a: string }'
		// and the right type is '{ b: string }' we produce 'T & { a: string, b: string }'.
		if left.flags&TypeFlagsIntersection != 0 {
			types := left.Types()
			lastLeft := types[len(types)-1]
			if c.isNonGenericObjectType(lastLeft) && c.isNonGenericObjectType(right) {
				newTypes := slices.Clone(types)
				newTypes[len(newTypes)-1] = c.getSpreadType(lastLeft, right, symbol, objectFlags, readonly)
				return c.getIntersectionType(newTypes)
			}
		}
		return c.getIntersectionType([]*Type{left, right})
	}
	members := make(ast.SymbolTable)
	var skippedPrivateMembers core.Set[string]
	var indexInfos []*IndexInfo
	if left == c.emptyObjectType {
		indexInfos = c.getIndexInfosOfType(right)
	} else {
		indexInfos = c.getUnionIndexInfos([]*Type{left, right})
	}
	for _, rightProp := range c.getPropertiesOfType(right) {
		if getDeclarationModifierFlagsFromSymbol(rightProp)&(ast.ModifierFlagsPrivate|ast.ModifierFlagsProtected) != 0 {
			skippedPrivateMembers.Add(rightProp.Name)
		} else if c.isSpreadableProperty(rightProp) {
			members[rightProp.Name] = c.getSpreadSymbol(rightProp, readonly)
		}
	}

	for _, leftProp := range c.getPropertiesOfType(left) {
		if skippedPrivateMembers.Has(leftProp.Name) || !c.isSpreadableProperty(leftProp) {
			continue
		}
		if members[leftProp.Name] != nil {
			rightProp := members[leftProp.Name]
			rightType := c.getTypeOfSymbol(rightProp)
			if rightProp.Flags&ast.SymbolFlagsOptional != 0 {
				declarations := core.Concatenate(leftProp.Declarations, rightProp.Declarations)
				flags := ast.SymbolFlagsProperty | (leftProp.Flags & ast.SymbolFlagsOptional)
				result := c.newSymbol(flags, leftProp.Name)
				links := c.valueSymbolLinks.get(result)
				// Optimization: avoid calculating the union type if spreading into the exact same type.
				// This is common, e.g. spreading one options bag into another where the bags have the
				// same type, or have properties which overlap. If the unions are large, it may turn out
				// to be expensive to perform subtype reduction.
				leftType := c.getTypeOfSymbol(leftProp)
				leftTypeWithoutUndefined := c.removeMissingOrUndefinedType(leftType)
				rightTypeWithoutUndefined := c.removeMissingOrUndefinedType(rightType)
				if leftTypeWithoutUndefined == rightTypeWithoutUndefined {
					links.resolvedType = leftType
				} else {
					links.resolvedType = c.getUnionTypeEx([]*Type{leftType, rightTypeWithoutUndefined}, UnionReductionSubtype, nil, nil)
				}
				c.spreadLinks.get(result).leftSpread = leftProp
				c.spreadLinks.get(result).rightSpread = rightProp
				result.Declarations = declarations
				links.nameType = c.valueSymbolLinks.get(leftProp).nameType
				members[leftProp.Name] = result
			}
		} else {
			members[leftProp.Name] = c.getSpreadSymbol(leftProp, readonly)
		}
	}
	spreadIndexInfos := core.SameMap(indexInfos, func(info *IndexInfo) *IndexInfo {
		return c.getIndexInfoWithReadonly(info, readonly)
	})
	spread := c.newAnonymousType(symbol, members, nil, nil, spreadIndexInfos)
	spread.objectFlags |= ObjectFlagsObjectLiteral | ObjectFlagsContainsObjectOrArrayLiteral | ObjectFlagsContainsSpread | objectFlags
	return spread
}

func (c *Checker) getIndexInfoWithReadonly(info *IndexInfo, readonly bool) *IndexInfo {
	if info.isReadonly != readonly {
		return c.newIndexInfo(info.keyType, info.valueType, readonly, info.declaration)
	}
	return info
}

func (c *Checker) isValidSpreadType(t *Type) bool {
	s := c.removeDefinitelyFalsyTypes(c.mapType(t, c.getBaseConstraintOrType))
	return s.flags&(TypeFlagsAny|TypeFlagsNonPrimitive|TypeFlagsObject|TypeFlagsInstantiableNonPrimitive) != 0 ||
		s.flags&TypeFlagsUnionOrIntersection != 0 && core.Every(s.Types(), c.isValidSpreadType)
}

func (c *Checker) getUnionIndexInfos(types []*Type) []*IndexInfo {
	sourceInfos := c.getIndexInfosOfType(types[0])
	var result []*IndexInfo
	for _, info := range sourceInfos {
		indexType := info.keyType
		if core.Every(types, func(t *Type) bool { return c.getIndexInfoOfType(t, indexType) != nil }) {
			valueType := c.getUnionType(core.Map(types, func(t *Type) *Type {
				return c.getIndexTypeOfType(t, indexType)
			}))
			isReadonly := core.Some(types, func(t *Type) bool { return c.getIndexInfoOfType(t, indexType).isReadonly })
			result = append(result, c.newIndexInfo(indexType, valueType, isReadonly, nil))
		}
	}
	return result
}

func (c *Checker) isNonGenericObjectType(t *Type) bool {
	return t.flags&TypeFlagsObject != 0 && !c.isGenericMappedType(t)
}

func (c *Checker) tryMergeUnionOfObjectTypeAndEmptyObject(t *Type, readonly bool) *Type {
	if t.flags&TypeFlagsUnion == 0 {
		return t
	}
	if core.Every(t.Types(), c.isEmptyObjectTypeOrSpreadsIntoEmptyObject) {
		empty := core.Find(t.Types(), c.isEmptyObjectType)
		if empty != nil {
			return empty
		}
		return c.emptyObjectType
	}
	firstType := core.Find(t.Types(), func(t *Type) bool {
		return !c.isEmptyObjectTypeOrSpreadsIntoEmptyObject(t)
	})
	if firstType == nil {
		return t
	}
	secondType := core.Find(t.Types(), func(t *Type) bool {
		return t != firstType && !c.isEmptyObjectTypeOrSpreadsIntoEmptyObject(t)
	})
	if secondType != nil {
		return t
	}
	// gets the type as if it had been spread, but where everything in the spread is made optional
	members := make(ast.SymbolTable)
	for _, prop := range c.getPropertiesOfType(firstType) {
		if getDeclarationModifierFlagsFromSymbol(prop)&(ast.ModifierFlagsPrivate|ast.ModifierFlagsProtected) != 0 {
			// do nothing, skip privates
		} else if c.isSpreadableProperty(prop) {
			isSetonlyAccessor := prop.Flags&ast.SymbolFlagsSetAccessor != 0 && prop.Flags&ast.SymbolFlagsGetAccessor == 0
			flags := ast.SymbolFlagsProperty | ast.SymbolFlagsOptional
			result := c.newSymbolEx(flags, prop.Name, prop.CheckFlags&ast.CheckFlagsLate|(core.IfElse(readonly, ast.CheckFlagsReadonly, 0)))
			links := c.valueSymbolLinks.get(result)
			if isSetonlyAccessor {
				links.resolvedType = c.undefinedType
			} else {
				links.resolvedType = c.addOptionalityEx(c.getTypeOfSymbol(prop), true /*isProperty*/, true /*isOptional*/)
			}
			result.Declarations = prop.Declarations
			links.nameType = c.valueSymbolLinks.get(prop).nameType
			// !!!
			// links.syntheticOrigin = prop
			members[prop.Name] = result
		}
	}
	spread := c.newAnonymousType(firstType.symbol, members, nil, nil, c.getIndexInfosOfType(firstType))
	spread.objectFlags |= ObjectFlagsObjectLiteral | ObjectFlagsContainsObjectOrArrayLiteral
	return spread
}

// We approximate own properties as non-methods plus methods that are inside the object literal
func (c *Checker) isSpreadableProperty(prop *ast.Symbol) bool {
	return !core.Some(prop.Declarations, isPrivateIdentifierClassElementDeclaration) && prop.Flags&(ast.SymbolFlagsMethod|ast.SymbolFlagsGetAccessor|ast.SymbolFlagsSetAccessor) == 0 ||
		!core.Some(prop.Declarations, func(d *ast.Node) bool { return d.Parent != nil && ast.IsClassLike(d.Parent) })
}

func (c *Checker) getSpreadSymbol(prop *ast.Symbol, readonly bool) *ast.Symbol {
	isSetonlyAccessor := prop.Flags&ast.SymbolFlagsSetAccessor != 0 && prop.Flags&ast.SymbolFlagsGetAccessor == 0
	if !isSetonlyAccessor && readonly == c.isReadonlySymbol(prop) {
		return prop
	}
	flags := ast.SymbolFlagsProperty | (prop.Flags & ast.SymbolFlagsOptional)
	result := c.newSymbolEx(flags, prop.Name, prop.CheckFlags&ast.CheckFlagsLate|(core.IfElse(readonly, ast.CheckFlagsReadonly, 0)))
	links := c.valueSymbolLinks.get(result)
	if isSetonlyAccessor {
		links.resolvedType = c.undefinedType
	} else {
		links.resolvedType = c.getTypeOfSymbol(prop)
	}
	result.Declarations = prop.Declarations
	links.nameType = c.valueSymbolLinks.get(prop).nameType
	// !!!
	// result.links.syntheticOrigin = prop
	return result
}

func (c *Checker) isEmptyObjectTypeOrSpreadsIntoEmptyObject(t *Type) bool {
	return c.isEmptyObjectType(t) || t.flags&(TypeFlagsNull|TypeFlagsUndefined|TypeFlagsBooleanLike|TypeFlagsNumberLike|TypeFlagsBigIntLike|TypeFlagsStringLike|TypeFlagsEnumLike|TypeFlagsNonPrimitive|TypeFlagsIndex) != 0
}

func (c *Checker) hasDefaultValue(node *ast.Node) bool {
	return ast.IsBindingElement(node) && node.AsBindingElement().Initializer != nil ||
		ast.IsPropertyAssignment(node) && c.hasDefaultValue(node.AsPropertyAssignment().Initializer) ||
		ast.IsShorthandPropertyAssignment(node) && node.AsShorthandPropertyAssignment().ObjectAssignmentInitializer != nil ||
		ast.IsBinaryExpression(node) && node.AsBinaryExpression().OperatorToken.Kind == ast.KindEqualsToken
}

func (c *Checker) isConstContext(node *ast.Node) bool {
	parent := node.Parent
	return isConstAssertion(parent) ||
		c.isValidConstAssertionArgument(node) && c.isConstTypeVariable(c.getContextualType(node, ContextFlagsNone), 0) ||
		(ast.IsParenthesizedExpression(parent) || ast.IsArrayLiteralExpression(parent) || ast.IsSpreadElement(parent)) && c.isConstContext(parent) ||
		(ast.IsPropertyAssignment(parent) || ast.IsShorthandPropertyAssignment(parent) || ast.IsTemplateSpan(parent)) && c.isConstContext(parent.Parent)
}

func (c *Checker) isValidConstAssertionArgument(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindStringLiteral, ast.KindNoSubstitutionTemplateLiteral, ast.KindNumericLiteral, ast.KindBigIntLiteral, ast.KindTrueKeyword,
		ast.KindFalseKeyword, ast.KindArrayLiteralExpression, ast.KindObjectLiteralExpression, ast.KindTemplateExpression:
		return true
	case ast.KindParenthesizedExpression:
		return c.isValidConstAssertionArgument(node.Expression())
	case ast.KindPrefixUnaryExpression:
		op := node.AsPrefixUnaryExpression().Operator
		arg := node.AsPrefixUnaryExpression().Operand
		return op == ast.KindMinusToken && (arg.Kind == ast.KindNumericLiteral || arg.Kind == ast.KindBigIntLiteral) || op == ast.KindPlusToken && arg.Kind == ast.KindNumericLiteral
	case ast.KindPropertyAccessExpression, ast.KindElementAccessExpression:
		expr := ast.SkipParentheses(node.Expression())
		var symbol *ast.Symbol
		if isEntityNameExpression(expr) {
			symbol = c.resolveEntityName(expr, ast.SymbolFlagsValue, true /*ignoreErrors*/, false, nil)
		}
		return symbol != nil && symbol.Flags&ast.SymbolFlagsEnum != 0
	}
	return false
}

func (c *Checker) isConstTypeVariable(t *Type, depth int) bool {
	if depth >= 5 || t == nil {
		return false
	}
	switch {
	case t.flags&TypeFlagsTypeParameter != 0:
		return t.symbol != nil && core.Some(t.symbol.Declarations, func(d *ast.Node) bool { return hasSyntacticModifier(d, ast.ModifierFlagsConst) })
	case t.flags&TypeFlagsUnionOrIntersection != 0:
		return core.Some(t.Types(), func(s *Type) bool { return c.isConstTypeVariable(s, depth) })
	case t.flags&TypeFlagsIndexedAccess != 0:
		return c.isConstTypeVariable(t.AsIndexedAccessType().objectType, depth+1)
	case t.flags&TypeFlagsConditional != 0:
		return c.isConstTypeVariable(c.getConstraintOfConditionalType(t), depth+1)
	case t.flags&TypeFlagsSubstitution != 0:
		return c.isConstTypeVariable(t.AsSubstitutionType().baseType, depth)
	case t.objectFlags&ObjectFlagsMapped != 0:
		typeVariable := c.getHomomorphicTypeVariable(t)
		return typeVariable != nil && c.isConstTypeVariable(typeVariable, depth)
	case c.isGenericTupleType(t):
		for i, s := range c.getElementTypes(t) {
			if t.TargetTupleType().elementInfos[i].flags&ElementFlagsVariadic != 0 && c.isConstTypeVariable(s, depth) {
				return true
			}
		}
	}
	return false
}

func (c *Checker) checkPropertyAssignment(node *ast.Node, checkMode CheckMode) *Type {
	// Do not use hasDynamicName here, because that returns false for well known symbols.
	// We want to perform checkComputedPropertyName for all computed properties, including
	// well known symbols.
	// !!!
	// if node.name.kind == KindComputedPropertyName {
	// 	c.checkComputedPropertyName(node.name)
	// }
	return c.checkExpressionForMutableLocation(node.AsPropertyAssignment().Initializer, checkMode)
}

func (c *Checker) isInPropertyInitializerOrClassStaticBlock(node *ast.Node) bool {
	return ast.FindAncestorOrQuit(node, func(node *ast.Node) ast.FindAncestorResult {
		switch node.Kind {
		case ast.KindPropertyDeclaration:
			return ast.FindAncestorTrue
		case ast.KindPropertyAssignment, ast.KindMethodDeclaration, ast.KindGetAccessor, ast.KindSetAccessor, ast.KindSpreadAssignment,
			ast.KindComputedPropertyName, ast.KindTemplateSpan, ast.KindJsxExpression, ast.KindJsxAttribute, ast.KindJsxAttributes,
			ast.KindJsxSpreadAttribute, ast.KindJsxOpeningElement, ast.KindExpressionWithTypeArguments, ast.KindHeritageClause:
			return ast.FindAncestorFalse
		case ast.KindArrowFunction, ast.KindExpressionStatement:
			if ast.IsBlock(node.Parent) && ast.IsClassStaticBlockDeclaration(node.Parent.Parent) {
				return ast.FindAncestorTrue
			}
			return ast.FindAncestorQuit
		default:
			if isExpressionNode(node) {
				return ast.FindAncestorFalse
			}
			return ast.FindAncestorQuit
		}
	}) != nil
}

func (c *Checker) getNarrowedTypeOfSymbol(symbol *ast.Symbol, location *ast.Node) *Type {
	return c.getTypeOfSymbol(symbol) // !!!
}

func (c *Checker) isReadonlySymbol(symbol *ast.Symbol) bool {
	// The following symbols are considered read-only:
	// Properties with a 'readonly' modifier
	// Variables declared with 'const'
	// Get accessors without matching set accessors
	// Enum members
	// Object.defineProperty assignments with writable false or no setter
	// Unions and intersections of the above (unions and intersections eagerly set isReadonly on creation)
	return symbol.CheckFlags&ast.CheckFlagsReadonly != 0 ||
		symbol.Flags&ast.SymbolFlagsProperty != 0 && getDeclarationModifierFlagsFromSymbol(symbol)&ast.ModifierFlagsReadonly != 0 ||
		symbol.Flags&ast.SymbolFlagsVariable != 0 && c.getDeclarationNodeFlagsFromSymbol(symbol)&ast.NodeFlagsConstant != 0 ||
		symbol.Flags&ast.SymbolFlagsAccessor != 0 && symbol.Flags&ast.SymbolFlagsSetAccessor == 0 ||
		symbol.Flags&ast.SymbolFlagsEnumMember != 0
}

func (c *Checker) checkObjectLiteralMethod(node *ast.Node, checkMode CheckMode) *Type {
	return c.anyType // !!!
}

func (c *Checker) checkJsxAttribute(node *ast.JsxAttribute, checkMode CheckMode) *Type {
	return c.anyType // !!!
}

func (c *Checker) checkExpressionForMutableLocation(node *ast.Node, checkMode CheckMode) *Type {
	t := c.checkExpressionEx(node, checkMode)
	switch {
	case c.isConstContext(node):
		return c.getRegularTypeOfLiteralType(t)
	case isTypeAssertion(node):
		return t
	default:
		return c.getWidenedLiteralLikeTypeForContextualType(t, c.instantiateContextualType(c.getContextualType(node, ContextFlagsNone), node, ContextFlagsNone))
	}
}

func (c *Checker) getResolvedSymbol(node *ast.Node) *ast.Symbol {
	if symbol := c.identifierSymbols[node]; symbol != nil {
		return symbol
	}
	var symbol *ast.Symbol
	if !ast.NodeIsMissing(node) {
		symbol = c.resolveName(node, node.AsIdentifier().Text, ast.SymbolFlagsValue|ast.SymbolFlagsExportValue,
			c.getCannotFindNameDiagnosticForName(node), !isWriteOnlyAccess(node), false /*excludeGlobals*/)
	}
	if symbol == nil {
		symbol = c.unknownSymbol
	}
	c.identifierSymbols[node] = symbol
	return symbol
}

func (c *Checker) getCannotFindNameDiagnosticForName(node *ast.Node) *diagnostics.Message {
	switch node.AsIdentifier().Text {
	case "document", "console":
		return diagnostics.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_include_dom
	case "$":
		return core.IfElse(c.compilerOptions.Types != nil,
			diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery_and_then_add_jquery_to_the_types_field_in_your_tsconfig,
			diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery)
	case "describe", "suite", "it", "test":
		return core.IfElse(c.compilerOptions.Types != nil,
			diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha_and_then_add_jest_or_mocha_to_the_types_field_in_your_tsconfig,
			diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha)
	case "process", "require", "Buffer", "module":
		return core.IfElse(c.compilerOptions.Types != nil,
			diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode_and_then_add_node_to_the_types_field_in_your_tsconfig,
			diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode)
	case "Bun":
		return core.IfElse(c.compilerOptions.Types != nil,
			diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_Bun_Try_npm_i_save_dev_types_Slashbun_and_then_add_bun_to_the_types_field_in_your_tsconfig,
			diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_Bun_Try_npm_i_save_dev_types_Slashbun)
	case "Map", "Set", "Promise", "ast.Symbol", "WeakMap", "WeakSet", "Iterator", "AsyncIterator", "SharedArrayBuffer", "Atomics", "AsyncIterable",
		"AsyncIterableIterator", "AsyncGenerator", "AsyncGeneratorFunction", "BigInt", "Reflect", "BigInt64Array", "BigUint64Array":
		return diagnostics.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_1_or_later
	case "await":
		if ast.IsCallExpression(node.Parent) {
			return diagnostics.Cannot_find_name_0_Did_you_mean_to_write_this_in_an_async_function
		}
		fallthrough
	default:
		if node.Parent.Kind == ast.KindShorthandPropertyAssignment {
			return diagnostics.No_value_exists_in_scope_for_the_shorthand_property_0_Either_declare_one_or_provide_an_initializer
		}
		return diagnostics.Cannot_find_name_0
	}
}

func (c *Checker) isReachableFlowNode(flowNode *ast.FlowNode) bool {
	return true // !!!
}

func (c *Checker) GetDiagnostics(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	if sourceFile != nil {
		c.checkSourceFile(sourceFile)
		return c.diagnostics.GetDiagnosticsForFile(sourceFile.FileName())
	}
	for _, file := range c.files {
		c.checkSourceFile(file)
	}
	return c.diagnostics.GetDiagnostics()
}

func (c *Checker) GetGlobalDiagnostics() []*ast.Diagnostic {
	return c.diagnostics.GetGlobalDiagnostics()
}

func (c *Checker) error(location *ast.Node, message *diagnostics.Message, args ...any) *ast.Diagnostic {
	diagnostic := NewDiagnosticForNode(location, message, args...)
	c.diagnostics.add(diagnostic)
	return diagnostic
}

func (c *Checker) errorOrSuggestion(isError bool, location *ast.Node, message *diagnostics.Message, args ...any) {
	c.addErrorOrSuggestion(isError, NewDiagnosticForNode(location, message, args...))
}

func (c *Checker) errorAndMaybeSuggestAwait(location *ast.Node, maybeMissingAwait bool, message *diagnostics.Message, args ...any) {
	diagnostic := c.error(location, message, args...)
	if maybeMissingAwait {
		diagnostic.AddRelatedInfo(createDiagnosticForNode(location, diagnostics.Did_you_forget_to_use_await))
	}
}

func (c *Checker) addErrorOrSuggestion(isError bool, diagnostic *ast.Diagnostic) {
	if isError {
		c.diagnostics.add(diagnostic)
	} else {
		suggestion := *diagnostic
		suggestion.SetCategory(diagnostics.CategorySuggestion)
		c.suggestionDiagnostics.add(&suggestion)
	}
}

func (c *Checker) errorSkippedOn(_ /*key*/ string, location *ast.Node, message *diagnostics.Message, args ...any) *ast.Diagnostic {
	diagnostic := c.error(location, message, args...)
	// !!!
	// diagnostic.skippedOn = key
	return diagnostic
}
func (c *Checker) isDeprecatedDeclaration(declaration *ast.Node) bool {
	return c.getCombinedNodeFlagsCached(declaration)&ast.NodeFlagsDeprecated != 0
}

func (c *Checker) addDeprecatedSuggestion(location *ast.Node, declarations []*ast.Node, deprecatedEntity string) *ast.Diagnostic {
	diagnostic := NewDiagnosticForNode(location, diagnostics.X_0_is_deprecated, deprecatedEntity)
	return c.addDeprecatedSuggestionWorker(declarations, diagnostic)
}

func (c *Checker) addDeprecatedSuggestionWorker(declarations []*ast.Node, diagnostic *ast.Diagnostic) *ast.Diagnostic {
	// !!!
	// var deprecatedTag *JSDocDeprecatedTag
	// if Array.isArray(declarations) {
	// 	deprecatedTag = forEach(declarations, getJSDocDeprecatedTag)
	// } else {
	// 	deprecatedTag = getJSDocDeprecatedTag(declarations)
	// }
	// if deprecatedTag {
	// 	addRelatedInfo(diagnostic, createDiagnosticForNode(deprecatedTag, Diagnostics.The_declaration_was_marked_as_deprecated_here))
	// }
	// // We call `addRelatedInfo()` before adding the diagnostic to prevent duplicates.
	c.suggestionDiagnostics.add(diagnostic)
	return diagnostic
}

func (c *Checker) isDeprecatedSymbol(symbol *ast.Symbol) bool {
	parentSymbol := c.getParentOfSymbol(symbol)
	if parentSymbol != nil && len(symbol.Declarations) > 1 {
		if parentSymbol.Flags&ast.SymbolFlagsInterface != 0 {
			return core.Some(symbol.Declarations, c.isDeprecatedDeclaration)
		} else {
			return core.Every(symbol.Declarations, c.isDeprecatedDeclaration)
		}
	}
	return symbol.ValueDeclaration != nil && c.isDeprecatedDeclaration(symbol.ValueDeclaration) || len(symbol.Declarations) != 0 && core.Every(symbol.Declarations, c.isDeprecatedDeclaration)
}

func (c *Checker) hasParseDiagnostics(sourceFile *ast.SourceFile) bool {
	return len(sourceFile.Diagnostics()) > 0
}

func (c *Checker) newSymbol(flags ast.SymbolFlags, name string) *ast.Symbol {
	c.symbolCount++
	result := c.symbolPool.New()
	result.Flags = flags | ast.SymbolFlagsTransient
	result.Name = name
	return result
}

func (c *Checker) newSymbolEx(flags ast.SymbolFlags, name string, checkFlags ast.CheckFlags) *ast.Symbol {
	result := c.newSymbol(flags, name)
	result.CheckFlags = checkFlags
	return result
}

func (c *Checker) mergeSymbolTable(target ast.SymbolTable, source ast.SymbolTable, unidirectional bool, mergedParent *ast.Symbol) {
	for id, sourceSymbol := range source {
		targetSymbol := target[id]
		var merged *ast.Symbol
		if targetSymbol != nil {
			merged = c.mergeSymbol(targetSymbol, sourceSymbol, unidirectional)
		} else {
			merged = c.getMergedSymbol(sourceSymbol)
		}
		if mergedParent != nil && targetSymbol != nil {
			// If a merge was performed on the target symbol, set its parent to the merged parent that initiated the merge
			// of its exports. Otherwise, `merged` came only from `sourceSymbol` and can keep its parent:
			//
			// // a.ts
			// export interface A { x: number; }
			//
			// // b.ts
			// declare module "./a" {
			//   interface A { y: number; }
			//   interface B {}
			// }
			//
			// When merging the module augmentation into a.ts, the symbol for `A` will itself be merged, so its parent
			// should be the merged module symbol. But the symbol for `B` has only one declaration, so its parent should
			// be the module augmentation symbol, which contains its only declaration.
			merged.Parent = mergedParent
		}
		target[id] = merged
	}
}

/**
 * Note: if target is transient, then it is mutable, and mergeSymbol with both mutate and return it.
 * If target is not transient, mergeSymbol will produce a transient clone, mutate that and return it.
 */
func (c *Checker) mergeSymbol(target *ast.Symbol, source *ast.Symbol, unidirectional bool) *ast.Symbol {
	if target.Flags&getExcludedSymbolFlags(source.Flags) == 0 || (source.Flags|target.Flags)&ast.SymbolFlagsAssignment != 0 {
		if source == target {
			// This can happen when an export assigned namespace exports something also erroneously exported at the top level
			// See `declarationFileNoCrashOnExtraExportModifier` for an example
			return target
		}
		if target.Flags&ast.SymbolFlagsTransient == 0 {
			resolvedTarget := c.resolveSymbol(target)
			if resolvedTarget == c.unknownSymbol {
				return source
			}
			if resolvedTarget.Flags&getExcludedSymbolFlags(source.Flags) == 0 || (source.Flags|resolvedTarget.Flags)&ast.SymbolFlagsAssignment != 0 {
				target = c.cloneSymbol(resolvedTarget)
			} else {
				c.reportMergeSymbolError(target, source)
				return source
			}
		}
		// Javascript static-property-assignment declarations always merge, even though they are also values
		if source.Flags&ast.SymbolFlagsValueModule != 0 && target.Flags&ast.SymbolFlagsValueModule != 0 && target.ConstEnumOnlyModule && !source.ConstEnumOnlyModule {
			// reset flag when merging instantiated module into value module that has only const enums
			target.ConstEnumOnlyModule = false
		}
		target.Flags |= source.Flags
		if source.ValueDeclaration != nil {
			setValueDeclaration(target, source.ValueDeclaration)
		}
		target.Declarations = append(target.Declarations, source.Declarations...)
		if source.Members != nil {
			c.mergeSymbolTable(getSymbolTable(&target.Members), source.Members, unidirectional, nil)
		}
		if source.Exports != nil {
			c.mergeSymbolTable(getSymbolTable(&target.Exports), source.Exports, unidirectional, target)
		}
		if !unidirectional {
			c.recordMergedSymbol(target, source)
		}
	} else if target.Flags&ast.SymbolFlagsNamespaceModule != 0 {
		// Do not report an error when merging `var globalThis` with the built-in `globalThis`,
		// as we will already report a "Declaration name conflicts..." error, and this error
		// won't make much sense.
		if target != c.globalThisSymbol {
			c.error(getNameOfDeclaration(getFirstDeclaration(source)), diagnostics.Cannot_augment_module_0_with_value_exports_because_it_resolves_to_a_non_module_entity, c.symbolToString(target))
		}
	} else {
		c.reportMergeSymbolError(target, source)
	}
	return target
}

func (c *Checker) reportMergeSymbolError(target *ast.Symbol, source *ast.Symbol) {
	isEitherEnum := target.Flags&ast.SymbolFlagsEnum != 0 || source.Flags&ast.SymbolFlagsEnum != 0
	isEitherBlockScoped := target.Flags&ast.SymbolFlagsBlockScopedVariable != 0 || source.Flags&ast.SymbolFlagsBlockScopedVariable != 0
	var message *diagnostics.Message
	switch {
	case isEitherEnum:
		message = diagnostics.Enum_declarations_can_only_merge_with_namespace_or_other_enum_declarations
	case isEitherBlockScoped:
		message = diagnostics.Cannot_redeclare_block_scoped_variable_0
	default:
		message = diagnostics.Duplicate_identifier_0
	}
	// sourceSymbolFile := ast.GetSourceFileOfNode(getFirstDeclaration(source))
	// targetSymbolFile := ast.GetSourceFileOfNode(getFirstDeclaration(target))
	symbolName := c.symbolToString(source)
	// !!!
	// Collect top-level duplicate identifier errors into one mapping, so we can then merge their diagnostics if there are a bunch
	// if sourceSymbolFile != nil && targetSymbolFile != nil && c.amalgamatedDuplicates && !isEitherEnum && sourceSymbolFile != targetSymbolFile {
	// 	var firstFile SourceFile
	// 	if comparePaths(sourceSymbolFile.path, targetSymbolFile.path) == ComparisonLessThan {
	// 		firstFile = sourceSymbolFile
	// 	} else {
	// 		firstFile = targetSymbolFile
	// 	}
	// 	var secondFile SourceFile
	// 	if firstFile == sourceSymbolFile {
	// 		secondFile = targetSymbolFile
	// 	} else {
	// 		secondFile = sourceSymbolFile
	// 	}
	// 	filesDuplicates := getOrUpdate(c.amalgamatedDuplicates, __TEMPLATE__(firstFile.path, "|", secondFile.path), func() DuplicateInfoForFiles {
	// 		return (map[any]any{ /* TODO(TS-TO-GO): was object literal */
	// 			"firstFile":          firstFile,
	// 			"secondFile":         secondFile,
	// 			"conflictingSymbols": NewMap(),
	// 		})
	// 	})
	// 	conflictingSymbolInfo := getOrUpdate(filesDuplicates.conflictingSymbols, symbolName, func() DuplicateInfoForSymbol {
	// 		return (map[any]any{ /* TODO(TS-TO-GO): was object literal */
	// 			"isBlockScoped":       isEitherBlockScoped,
	// 			"firstFileLocations":  []never{},
	// 			"secondFileLocations": []never{},
	// 		})
	// 	})
	// 	if !isSourcePlainJs {
	// 		addDuplicateLocations(conflictingSymbolInfo.firstFileLocations, source)
	// 	}
	// 	if !isTargetPlainJs {
	// 		addDuplicateLocations(conflictingSymbolInfo.secondFileLocations, target)
	// 	}
	// } else {
	c.addDuplicateDeclarationErrorsForSymbols(source, message, symbolName, target)
	c.addDuplicateDeclarationErrorsForSymbols(target, message, symbolName, source)
}

func (c *Checker) addDuplicateDeclarationErrorsForSymbols(target *ast.Symbol, message *diagnostics.Message, symbolName string, source *ast.Symbol) {
	for _, node := range target.Declarations {
		c.addDuplicateDeclarationError(node, message, symbolName, source.Declarations)
	}
}

func (c *Checker) addDuplicateDeclarationError(node *ast.Node, message *diagnostics.Message, symbolName string, relatedNodes []*ast.Node) {
	errorNode := getAdjustedNodeForError(node)
	if errorNode == nil {
		errorNode = node
	}
	err := c.lookupOrIssueError(errorNode, message, symbolName)
	for _, relatedNode := range relatedNodes {
		adjustedNode := getAdjustedNodeForError(relatedNode)
		if adjustedNode == errorNode {
			continue
		}
		leadingMessage := createDiagnosticForNode(adjustedNode, diagnostics.X_0_was_also_declared_here, symbolName)
		followOnMessage := createDiagnosticForNode(adjustedNode, diagnostics.X_and_here)
		if len(err.RelatedInformation()) >= 5 || core.Some(err.RelatedInformation(), func(d *ast.Diagnostic) bool {
			return CompareDiagnostics(d, followOnMessage) == 0 || CompareDiagnostics(d, leadingMessage) == 0
		}) {
			continue
		}
		if len(err.RelatedInformation()) == 0 {
			err.AddRelatedInfo(leadingMessage)
		} else {
			err.AddRelatedInfo(followOnMessage)
		}
	}
}

func createDiagnosticForNode(node *ast.Node, message *diagnostics.Message, args ...any) *ast.Diagnostic {
	return NewDiagnosticForNode(node, message, args...)
}

func getAdjustedNodeForError(node *ast.Node) *ast.Node {
	name := getNameOfDeclaration(node)
	if name != nil {
		return name
	}
	return node
}

func (c *Checker) lookupOrIssueError(location *ast.Node, message *diagnostics.Message, args ...any) *ast.Diagnostic {
	var file *ast.SourceFile
	var loc core.TextRange
	if location != nil {
		file = ast.GetSourceFileOfNode(location)
		loc = location.Loc
	}
	diagnostic := ast.NewDiagnostic(file, loc, message, args...)
	existing := c.diagnostics.lookup(diagnostic)
	if existing != nil {
		return existing
	}
	c.diagnostics.add(diagnostic)
	return diagnostic
}

func getFirstDeclaration(symbol *ast.Symbol) *ast.Node {
	if len(symbol.Declarations) > 0 {
		return symbol.Declarations[0]
	}
	return nil
}

func getExcludedSymbolFlags(flags ast.SymbolFlags) ast.SymbolFlags {
	var result ast.SymbolFlags
	if flags&ast.SymbolFlagsBlockScopedVariable != 0 {
		result |= ast.SymbolFlagsBlockScopedVariableExcludes
	}
	if flags&ast.SymbolFlagsFunctionScopedVariable != 0 {
		result |= ast.SymbolFlagsFunctionScopedVariableExcludes
	}
	if flags&ast.SymbolFlagsProperty != 0 {
		result |= ast.SymbolFlagsPropertyExcludes
	}
	if flags&ast.SymbolFlagsEnumMember != 0 {
		result |= ast.SymbolFlagsEnumMemberExcludes
	}
	if flags&ast.SymbolFlagsFunction != 0 {
		result |= ast.SymbolFlagsFunctionExcludes
	}
	if flags&ast.SymbolFlagsClass != 0 {
		result |= ast.SymbolFlagsClassExcludes
	}
	if flags&ast.SymbolFlagsInterface != 0 {
		result |= ast.SymbolFlagsInterfaceExcludes
	}
	if flags&ast.SymbolFlagsRegularEnum != 0 {
		result |= ast.SymbolFlagsRegularEnumExcludes
	}
	if flags&ast.SymbolFlagsConstEnum != 0 {
		result |= ast.SymbolFlagsConstEnumExcludes
	}
	if flags&ast.SymbolFlagsValueModule != 0 {
		result |= ast.SymbolFlagsValueModuleExcludes
	}
	if flags&ast.SymbolFlagsMethod != 0 {
		result |= ast.SymbolFlagsMethodExcludes
	}
	if flags&ast.SymbolFlagsGetAccessor != 0 {
		result |= ast.SymbolFlagsGetAccessorExcludes
	}
	if flags&ast.SymbolFlagsSetAccessor != 0 {
		result |= ast.SymbolFlagsSetAccessorExcludes
	}
	if flags&ast.SymbolFlagsTypeParameter != 0 {
		result |= ast.SymbolFlagsTypeParameterExcludes
	}
	if flags&ast.SymbolFlagsTypeAlias != 0 {
		result |= ast.SymbolFlagsTypeAliasExcludes
	}
	if flags&ast.SymbolFlagsAlias != 0 {
		result |= ast.SymbolFlagsAliasExcludes
	}
	return result
}

func (c *Checker) cloneSymbol(symbol *ast.Symbol) *ast.Symbol {
	result := c.newSymbol(symbol.Flags, symbol.Name)
	// Force reallocation if anything is ever appended to declarations
	result.Declarations = symbol.Declarations[0:len(symbol.Declarations):len(symbol.Declarations)]
	result.Parent = symbol.Parent
	result.ValueDeclaration = symbol.ValueDeclaration
	result.ConstEnumOnlyModule = symbol.ConstEnumOnlyModule
	result.Members = maps.Clone(symbol.Members)
	result.Exports = maps.Clone(symbol.Exports)
	c.recordMergedSymbol(result, symbol)
	return result
}

func (c *Checker) getMergedSymbol(symbol *ast.Symbol) *ast.Symbol {
	// If a symbol was never merged it will have a zero mergeId
	if symbol != nil && symbol.MergeId != 0 {
		merged := c.mergedSymbols[symbol.MergeId]
		if merged != nil {
			return merged
		}
	}
	return symbol
}

func (c *Checker) getParentOfSymbol(symbol *ast.Symbol) *ast.Symbol {
	if symbol.Parent != nil {
		return c.getMergedSymbol(c.getLateBoundSymbol(symbol.Parent))
	}
	return nil
}

func (c *Checker) recordMergedSymbol(target *ast.Symbol, source *ast.Symbol) {
	c.mergedSymbols[getMergeId(source)] = target
}

func (c *Checker) getSymbolIfSameReference(s1 *ast.Symbol, s2 *ast.Symbol) *ast.Symbol {
	if c.getMergedSymbol(c.resolveSymbol(c.getMergedSymbol(s1))) == c.getMergedSymbol(c.resolveSymbol(c.getMergedSymbol(s2))) {
		return s1
	}
	return nil
}

func (c *Checker) getExportSymbolOfValueSymbolIfExported(symbol *ast.Symbol) *ast.Symbol {
	if symbol != nil && symbol.Flags&ast.SymbolFlagsExportValue != 0 && symbol.ExportSymbol != nil {
		symbol = symbol.ExportSymbol
	}
	return c.getMergedSymbol(symbol)
}

func (c *Checker) getSymbolOfDeclaration(node *ast.Node) *ast.Symbol {
	symbol := node.Symbol()
	if symbol != nil {
		return c.getMergedSymbol(c.getLateBoundSymbol(symbol))
	}
	return nil
}

/**
 * Get the merged symbol for a node. If you know the node is a `Declaration`, it is faster and more type safe to
 * use use `getSymbolOfDeclaration` instead.
 */
func (c *Checker) getSymbolOfNode(node *ast.Node) *ast.Symbol {
	return c.getSymbolOfDeclaration(node)
}

func (c *Checker) getLateBoundSymbol(symbol *ast.Symbol) *ast.Symbol {
	return symbol // !!!
}

func (c *Checker) resolveSymbol(symbol *ast.Symbol) *ast.Symbol {
	return c.resolveSymbolEx(symbol, false /*dontResolveAlias*/)
}

func (c *Checker) resolveSymbolEx(symbol *ast.Symbol, dontResolveAlias bool) *ast.Symbol {
	if !dontResolveAlias && isNonLocalAlias(symbol, ast.SymbolFlagsValue|ast.SymbolFlagsType|ast.SymbolFlagsNamespace) {
		return c.resolveAlias(symbol)
	}
	return symbol
}

func (c *Checker) getTargetOfImportEqualsDeclaration(node *ast.Node, dontResolveAlias bool) *ast.Symbol {
	// Node is ImportEqualsDeclaration | VariableDeclaration
	commonJSPropertyAccess := c.getCommonJSPropertyAccess(node)
	if commonJSPropertyAccess != nil {
		access := commonJSPropertyAccess.AsPropertyAccessExpression()
		name := getLeftmostAccessExpression(access.Expression).AsCallExpression().Arguments.Nodes[0]
		if ast.IsIdentifier(access.Name()) {
			return c.resolveSymbol(c.getPropertyOfType(c.resolveExternalModuleTypeByLiteral(name), access.Name().Text()))
		}
		return nil
	}
	if ast.IsVariableDeclaration(node) || node.AsImportEqualsDeclaration().ModuleReference.Kind == ast.KindExternalModuleReference {
		moduleReference := getExternalModuleRequireArgument(node)
		if moduleReference == nil {
			moduleReference = getExternalModuleImportEqualsDeclarationExpression(node)
		}
		immediate := c.resolveExternalModuleName(node, moduleReference, false /*ignoreErrors*/)
		resolved := c.resolveExternalModuleSymbol(immediate, false /*dontResolveAlias*/)
		c.markSymbolOfAliasDeclarationIfTypeOnly(node, immediate, resolved, false /*overwriteEmpty*/, nil, "")
		return resolved
	}
	resolved := c.getSymbolOfPartOfRightHandSideOfImportEquals(node.AsImportEqualsDeclaration().ModuleReference, dontResolveAlias)
	c.checkAndReportErrorForResolvingImportAliasToTypeOnlySymbol(node, resolved)
	return resolved
}

func (c *Checker) getCommonJSPropertyAccess(node *ast.Node) *ast.Node {
	if ast.IsVariableDeclaration(node) {
		decl := node.AsVariableDeclaration()
		if decl.Initializer != nil && ast.IsPropertyAccessExpression(decl.Initializer) {
			return decl.Initializer
		}
	}
	return nil
}

func (c *Checker) resolveExternalModuleTypeByLiteral(name *ast.Node) *Type {
	moduleSym := c.resolveExternalModuleName(name, name, false /*ignoreErrors*/)
	if moduleSym != nil {
		resolvedModuleSymbol := c.resolveExternalModuleSymbol(moduleSym, false /*dontResolveAlias*/)
		if resolvedModuleSymbol != nil {
			return c.getTypeOfSymbol(resolvedModuleSymbol)
		}
	}
	return c.anyType
}

// This function is only for imports with entity names
func (c *Checker) getSymbolOfPartOfRightHandSideOfImportEquals(entityName *ast.Node, dontResolveAlias bool) *ast.Symbol {
	// There are three things we might try to look for. In the following examples,
	// the search term is enclosed in |...|:
	//
	//     import a = |b|; // Namespace
	//     import a = |b.c|; // Value, type, namespace
	//     import a = |b.c|.d; // Namespace
	if entityName.Kind == ast.KindIdentifier && isRightSideOfQualifiedNameOrPropertyAccess(entityName) {
		entityName = entityName.Parent // QualifiedName
	}
	// Check for case 1 and 3 in the above example
	if entityName.Kind == ast.KindIdentifier || entityName.Parent.Kind == ast.KindQualifiedName {
		return c.resolveEntityName(entityName, ast.SymbolFlagsNamespace, false /*ignoreErrors*/, dontResolveAlias, nil /*location*/)
	}
	// Case 2 in above example
	// entityName.kind could be a QualifiedName or a Missing identifier
	//Debug.assert(entityName.parent.kind == ast.KindImportEqualsDeclaration)
	return c.resolveEntityName(entityName, ast.SymbolFlagsValue|ast.SymbolFlagsType|ast.SymbolFlagsNamespace, false /*ignoreErrors*/, dontResolveAlias, nil /*location*/)
}

func (c *Checker) checkAndReportErrorForResolvingImportAliasToTypeOnlySymbol(node *ast.Node, resolved *ast.Symbol) {
	decl := node.AsImportEqualsDeclaration()
	if c.markSymbolOfAliasDeclarationIfTypeOnly(node, nil /*immediateTarget*/, resolved, false /*overwriteEmpty*/, nil, "") && !decl.IsTypeOnly {
		typeOnlyDeclaration := c.getTypeOnlyAliasDeclaration(c.getSymbolOfDeclaration(node))
		isExport := ast.NodeKindIs(typeOnlyDeclaration, ast.KindExportSpecifier, ast.KindExportDeclaration)
		message := core.IfElse(isExport,
			diagnostics.An_import_alias_cannot_reference_a_declaration_that_was_exported_using_export_type,
			diagnostics.An_import_alias_cannot_reference_a_declaration_that_was_imported_using_import_type)
		relatedMessage := core.IfElse(isExport,
			diagnostics.X_0_was_exported_here,
			diagnostics.X_0_was_imported_here)
		// TODO: how to get name for export *?
		name := "*"
		if typeOnlyDeclaration.Kind == ast.KindImportDeclaration {
			name = getNameFromImportDeclaration(typeOnlyDeclaration).AsIdentifier().Text
		}
		c.error(decl.ModuleReference, message).AddRelatedInfo(createDiagnosticForNode(typeOnlyDeclaration, relatedMessage, name))
	}
}

func (c *Checker) getTargetOfImportClause(node *ast.Node, dontResolveAlias bool) *ast.Symbol {
	moduleSymbol := c.resolveExternalModuleName(node, getModuleSpecifierFromNode(node.Parent), false /*ignoreErrors*/)
	if moduleSymbol != nil {
		return c.getTargetOfModuleDefault(moduleSymbol, node, dontResolveAlias)
	}
	return nil
}

func (c *Checker) getTargetOfModuleDefault(moduleSymbol *ast.Symbol, node *ast.Node, dontResolveAlias bool) *ast.Symbol {
	var exportDefaultSymbol *ast.Symbol
	if isShorthandAmbientModuleSymbol(moduleSymbol) {
		exportDefaultSymbol = moduleSymbol
	} else {
		exportDefaultSymbol = c.resolveExportByName(moduleSymbol, InternalSymbolNameDefault, node, dontResolveAlias)
	}
	// !!!
	// file := find(moduleSymbol.declarations, isSourceFile)
	// specifier := c.getModuleSpecifierForImportOrExport(node)
	// if specifier == nil {
	// 	return exportDefaultSymbol
	// }
	// hasDefaultOnly := c.isOnlyImportableAsDefault(specifier, moduleSymbol)
	// hasSyntheticDefault := c.canHaveSyntheticDefault(file, moduleSymbol, dontResolveAlias, specifier)
	// if !exportDefaultSymbol && !hasSyntheticDefault && !hasDefaultOnly {
	// 	if c.hasExportAssignmentSymbol(moduleSymbol) && !c.allowSyntheticDefaultImports {
	// 		var compilerOptionName /* TODO(TS-TO-GO) inferred type "allowSyntheticDefaultImports" | "esModuleInterop" */ any
	// 		if c.moduleKind >= core.ModuleKindES2015 {
	// 			compilerOptionName = "allowSyntheticDefaultImports"
	// 		} else {
	// 			compilerOptionName = "esModuleInterop"
	// 		}
	// 		exportEqualsSymbol := moduleSymbol.exports.get(InternalSymbolNameExportEquals)
	// 		exportAssignment := exportEqualsSymbol.valueDeclaration
	// 		err := c.error(node.name, Diagnostics.Module_0_can_only_be_default_imported_using_the_1_flag, c.symbolToString(moduleSymbol), compilerOptionName)

	// 		if exportAssignment {
	// 			addRelatedInfo(err, createDiagnosticForNode(exportAssignment, Diagnostics.This_module_is_declared_with_export_and_can_only_be_used_with_a_default_import_when_using_the_0_flag, compilerOptionName))
	// 		}
	// 	} else if isImportClause(node) {
	// 		c.reportNonDefaultExport(moduleSymbol, node)
	// 	} else {
	// 		c.errorNoModuleMemberSymbol(moduleSymbol, moduleSymbol, node, isImportOrExportSpecifier(node) && node.propertyName || node.name)
	// 	}
	// } else if hasSyntheticDefault || hasDefaultOnly {
	// 	// per emit behavior, a synthetic default overrides a "real" .default member if `__esModule` is not present
	// 	resolved := c.resolveExternalModuleSymbol(moduleSymbol, dontResolveAlias) || c.resolveSymbol(moduleSymbol, dontResolveAlias)
	// 	c.markSymbolOfAliasDeclarationIfTypeOnly(node, moduleSymbol, resolved /*overwriteEmpty*/, false)
	// 	return resolved
	// }
	// c.markSymbolOfAliasDeclarationIfTypeOnly(node, exportDefaultSymbol /*finalTarget*/, nil /*overwriteEmpty*/, false)
	return exportDefaultSymbol
}

func (c *Checker) resolveExportByName(moduleSymbol *ast.Symbol, name string, sourceNode *ast.Node, dontResolveAlias bool) *ast.Symbol {
	exportValue := moduleSymbol.Exports[InternalSymbolNameExportEquals]
	var exportSymbol *ast.Symbol
	if exportValue != nil {
		exportSymbol = c.getPropertyOfTypeEx(c.getTypeOfSymbol(exportValue), name, true /*skipObjectFunctionPropertyAugment*/, false /*includeTypeOnlyMembers*/)
	} else {
		exportSymbol = moduleSymbol.Exports[name]
	}
	resolved := c.resolveSymbolEx(exportSymbol, dontResolveAlias)
	c.markSymbolOfAliasDeclarationIfTypeOnly(sourceNode, exportSymbol, resolved, false /*overwriteEmpty*/, nil, "")
	return resolved
}

func (c *Checker) getTargetOfNamespaceImport(node *ast.Node, dontResolveAlias bool) *ast.Symbol {
	moduleSpecifier := c.getModuleSpecifierForImportOrExport(node)
	immediate := c.resolveExternalModuleName(node, moduleSpecifier, false /*ignoreErrors*/)
	resolved := c.resolveESModuleSymbol(immediate, moduleSpecifier, dontResolveAlias /*suppressInteropError*/, false)
	c.markSymbolOfAliasDeclarationIfTypeOnly(node, immediate, resolved, false /*overwriteEmpty*/, nil, "")
	return resolved
}

func (c *Checker) getTargetOfNamespaceExport(node *ast.Node, dontResolveAlias bool) *ast.Symbol {
	moduleSpecifier := c.getModuleSpecifierForImportOrExport(node)
	if moduleSpecifier != nil {
		immediate := c.resolveExternalModuleName(node, moduleSpecifier, false /*ignoreErrors*/)
		resolved := c.resolveESModuleSymbol(immediate, moduleSpecifier, dontResolveAlias /*suppressInteropError*/, false)
		c.markSymbolOfAliasDeclarationIfTypeOnly(node, immediate, resolved, false /*overwriteEmpty*/, nil, "")
		return resolved
	}
	return nil
}

func (c *Checker) getTargetOfImportSpecifier(node *ast.Node, dontResolveAlias bool) *ast.Symbol {
	name := node.AsImportSpecifier().PropertyName
	if name == nil {
		name = node.AsImportSpecifier().Name()
	}
	if moduleExportNameIsDefault(name) {
		specifier := c.getModuleSpecifierForImportOrExport(node)
		if specifier != nil {
			moduleSymbol := c.resolveExternalModuleName(node, specifier, false /*ignoreErrors*/)
			if moduleSymbol != nil {
				return c.getTargetOfModuleDefault(moduleSymbol, node, dontResolveAlias)
			}
		}
	}
	root := node.Parent.Parent.Parent // ImportDeclaration
	resolved := c.getExternalModuleMember(root, node, dontResolveAlias)
	c.markSymbolOfAliasDeclarationIfTypeOnly(node, nil /*immediateTarget*/, resolved, false /*overwriteEmpty*/, nil, "")
	return resolved
}

func (c *Checker) getExternalModuleMember(node *ast.Node, specifier *ast.Node, dontResolveAlias bool) *ast.Symbol {
	// node is ImportDeclaration | ExportDeclaration | VariableDeclaration
	// specifier is ImportSpecifier | ExportSpecifier | BindingElement | PropertyAccessExpression
	moduleSpecifier := getExternalModuleRequireArgument(node)
	if moduleSpecifier == nil {
		moduleSpecifier = getExternalModuleName(node)
	}
	moduleSymbol := c.resolveExternalModuleName(node, moduleSpecifier, false /*ignoreErrors*/)
	var name *ast.Node
	if !ast.IsPropertyAccessExpression(specifier) {
		name = getPropertyNameFromSpecifier(specifier)
	}
	if name == nil {
		name = getNameFromSpecifier(specifier)
	}
	if !ast.IsIdentifier(name) && !ast.IsStringLiteral(name) {
		return nil
	}
	nameText := name.Text()
	suppressInteropError := nameText == InternalSymbolNameDefault && c.allowSyntheticDefaultImports
	targetSymbol := c.resolveESModuleSymbol(moduleSymbol, moduleSpecifier /*dontResolveAlias*/, false, suppressInteropError)
	if targetSymbol != nil {
		// Note: The empty string is a valid module export name:
		//
		//   import { "" as foo } from "./foo";
		//   export { foo as "" };
		//
		if nameText != "" || name.Kind == ast.KindStringLiteral {
			if isShorthandAmbientModuleSymbol(moduleSymbol) {
				return moduleSymbol
			}
			var symbolFromVariable *ast.Symbol
			// First check if module was specified with "export=". If so, get the member from the resolved type
			if moduleSymbol != nil && moduleSymbol.Exports[InternalSymbolNameExportEquals] != nil {
				symbolFromVariable = c.getPropertyOfTypeEx(c.getTypeOfSymbol(targetSymbol), nameText, true /*skipObjectFunctionPropertyAugment*/, false /*includeTypeOnlyMembers*/)
			} else {
				symbolFromVariable = c.getPropertyOfVariable(targetSymbol, nameText)
			}
			// if symbolFromVariable is export - get its final target
			symbolFromVariable = c.resolveSymbolEx(symbolFromVariable, dontResolveAlias)
			symbolFromModule := c.getExportOfModule(targetSymbol, nameText, specifier, dontResolveAlias)
			if symbolFromModule == nil && nameText == InternalSymbolNameDefault {
				file := core.Find(moduleSymbol.Declarations, ast.IsSourceFile)
				if c.isOnlyImportableAsDefault(moduleSpecifier, moduleSymbol) || c.canHaveSyntheticDefault(file.AsSourceFile(), moduleSymbol, dontResolveAlias, moduleSpecifier) {
					symbolFromModule = c.resolveExternalModuleSymbol(moduleSymbol, dontResolveAlias)
					if symbolFromModule == nil {
						symbolFromModule = c.resolveSymbolEx(moduleSymbol, dontResolveAlias)
					}
				}
			}
			symbol := symbolFromVariable
			if symbolFromModule != nil {
				symbol = symbolFromModule
				if symbolFromVariable != nil {
					symbol = c.combineValueAndTypeSymbols(symbolFromVariable, symbolFromModule)
				}
			}
			if isImportOrExportSpecifier(specifier) && c.isOnlyImportableAsDefault(moduleSpecifier, moduleSymbol) && nameText != InternalSymbolNameDefault {
				// !!!
				// c.error(name, Diagnostics.Named_imports_from_a_JSON_file_into_an_ECMAScript_module_are_not_allowed_when_module_is_set_to_0, core.ModuleKind[c.moduleKind])
			} else if symbol == nil {
				c.errorNoModuleMemberSymbol(moduleSymbol, targetSymbol, node, name)
			}
			return symbol
		}
	}
	return nil
}

func (c *Checker) getPropertyOfVariable(symbol *ast.Symbol, name string) *ast.Symbol {
	if symbol.Flags&ast.SymbolFlagsVariable != 0 {
		typeAnnotation := symbol.ValueDeclaration.AsVariableDeclaration().Type
		if typeAnnotation != nil {
			return c.resolveSymbol(c.getPropertyOfType(c.getTypeFromTypeNode(typeAnnotation), name))
		}
	}
	return nil
}

// This function creates a synthetic symbol that combines the value side of one symbol with the
// type/namespace side of another symbol. Consider this example:
//
//	declare module graphics {
//	    interface Point {
//	        x: number;
//	        y: number;
//	    }
//	}
//	declare var graphics: {
//	    Point: new (x: number, y: number) => graphics.Point;
//	}
//	declare module "graphics" {
//	    export = graphics;
//	}
//
// An 'import { Point } from "graphics"' needs to create a symbol that combines the value side 'Point'
// property with the type/namespace side interface 'Point'.
func (c *Checker) combineValueAndTypeSymbols(valueSymbol *ast.Symbol, typeSymbol *ast.Symbol) *ast.Symbol {
	if valueSymbol == c.unknownSymbol && typeSymbol == c.unknownSymbol {
		return c.unknownSymbol
	}
	if valueSymbol.Flags&(ast.SymbolFlagsType|ast.SymbolFlagsNamespace) != 0 {
		return valueSymbol
	}
	result := c.newSymbol(valueSymbol.Flags|typeSymbol.Flags, valueSymbol.Name)
	//Debug.assert(valueSymbol.declarations || typeSymbol.declarations)
	result.Declarations = slices.Compact(slices.Concat(valueSymbol.Declarations, typeSymbol.Declarations))
	result.Parent = valueSymbol.Parent
	if result.Parent == nil {
		result.Parent = typeSymbol.Parent
	}
	result.ValueDeclaration = valueSymbol.ValueDeclaration
	result.Members = maps.Clone(typeSymbol.Members)
	result.Exports = maps.Clone(valueSymbol.Exports)
	return result
}

func (c *Checker) getExportOfModule(symbol *ast.Symbol, nameText string, specifier *ast.Node, dontResolveAlias bool) *ast.Symbol {
	if symbol.Flags&ast.SymbolFlagsModule != 0 {
		exportSymbol := c.getExportsOfSymbol(symbol)[nameText]
		resolved := c.resolveSymbolEx(exportSymbol, dontResolveAlias)
		exportStarDeclaration := c.moduleSymbolLinks.get(symbol).typeOnlyExportStarMap[nameText]
		c.markSymbolOfAliasDeclarationIfTypeOnly(specifier, exportSymbol, resolved /*overwriteEmpty*/, false, exportStarDeclaration, nameText)
		return resolved
	}
	return nil
}

func (c *Checker) isOnlyImportableAsDefault(usage *ast.Node, resolvedModule *ast.Symbol) bool {
	// In Node.js, JSON modules don't get named exports
	if core.ModuleKindNode16 <= c.moduleKind && c.moduleKind <= core.ModuleKindNodeNext {
		usageMode := c.getEmitSyntaxForModuleSpecifierExpression(usage)
		if usageMode == core.ModuleKindESNext {
			if resolvedModule == nil {
				resolvedModule = c.resolveExternalModuleName(usage, usage, true /*ignoreErrors*/)
			}
			var targetFile *ast.SourceFile
			if resolvedModule != nil {
				targetFile = getSourceFileOfModule(resolvedModule)
			}
			return targetFile != nil && (isJsonSourceFile(targetFile) || tspath.GetDeclarationFileExtension(targetFile.FileName()) == ".d.json.ts")
		}
	}
	return false
}

func (c *Checker) canHaveSyntheticDefault(file *ast.SourceFile, moduleSymbol *ast.Symbol, dontResolveAlias bool, usage *ast.Node) bool {
	// !!!
	// var usageMode ResolutionMode
	// if file != nil {
	// 	usageMode = c.getEmitSyntaxForModuleSpecifierExpression(usage)
	// }
	// if file != nil && usageMode != core.ModuleKindNone {
	// 	targetMode := host.getImpliedNodeFormatForEmit(file)
	// 	if usageMode == core.ModuleKindESNext && targetMode == core.ModuleKindCommonJS && core.ModuleKindNode16 <= c.moduleKind && c.moduleKind <= core.ModuleKindNodeNext {
	// 		// In Node.js, CommonJS modules always have a synthetic default when imported into ESM
	// 		return true
	// 	}
	// 	if usageMode == core.ModuleKindESNext && targetMode == core.ModuleKindESNext {
	// 		// No matter what the `module` setting is, if we're confident that both files
	// 		// are ESM, there cannot be a synthetic default.
	// 		return false
	// 	}
	// }
	if !c.allowSyntheticDefaultImports {
		return false
	}
	// Declaration files (and ambient modules)
	if file == nil || file.IsDeclarationFile {
		// Definitely cannot have a synthetic default if they have a syntactic default member specified
		defaultExportSymbol := c.resolveExportByName(moduleSymbol, InternalSymbolNameDefault /*sourceNode*/, nil /*dontResolveAlias*/, true)
		// Dont resolve alias because we want the immediately exported symbol's declaration
		if defaultExportSymbol != nil && core.Some(defaultExportSymbol.Declarations, isSyntacticDefault) {
			return false
		}
		// It _might_ still be incorrect to assume there is no __esModule marker on the import at runtime, even if there is no `default` member
		// So we check a bit more,
		if c.resolveExportByName(moduleSymbol, "__esModule", nil /*sourceNode*/, dontResolveAlias) != nil {
			// If there is an `__esModule` specified in the declaration (meaning someone explicitly added it or wrote it in their code),
			// it definitely is a module and does not have a synthetic default
			return false
		}
		// There are _many_ declaration files not written with esmodules in mind that still get compiled into a format with __esModule set
		// Meaning there may be no default at runtime - however to be on the permissive side, we allow access to a synthetic default member
		// as there is no marker to indicate if the accompanying JS has `__esModule` or not, or is even native esm
		return true
	}
	// TypeScript files never have a synthetic default (as they are always emitted with an __esModule marker) _unless_ they contain an export= statement
	return hasExportAssignmentSymbol(moduleSymbol)
}

func (c *Checker) getEmitSyntaxForModuleSpecifierExpression(usage *ast.Node) core.ResolutionMode {
	// !!!
	// if isStringLiteralLike(usage) {
	// 	return host.getEmitSyntaxForUsageLocation(ast.GetSourceFileOfNode(usage), usage)
	// }
	return core.ModuleKindNone
}

func (c *Checker) errorNoModuleMemberSymbol(moduleSymbol *ast.Symbol, targetSymbol *ast.Symbol, node *ast.Node, name *ast.Node) {
	moduleName := c.getFullyQualifiedName(moduleSymbol, node)
	declarationName := declarationNameToString(name)
	var suggestion *ast.Symbol
	if ast.IsIdentifier(name) {
		suggestion = c.getSuggestedSymbolForNonexistentModule(name, targetSymbol)
	}
	if suggestion != nil {
		suggestionName := c.symbolToString(suggestion)
		diagnostic := c.error(name, diagnostics.X_0_has_no_exported_member_named_1_Did_you_mean_2, moduleName, declarationName, suggestionName)
		if suggestion.ValueDeclaration != nil {
			diagnostic.AddRelatedInfo(createDiagnosticForNode(suggestion.ValueDeclaration, diagnostics.X_0_is_declared_here, suggestionName))
		}
	} else {
		if moduleSymbol.Exports[InternalSymbolNameDefault] != nil {
			c.error(name, diagnostics.Module_0_has_no_exported_member_1_Did_you_mean_to_use_import_1_from_0_instead, moduleName, declarationName)
		} else {
			c.reportNonExportedMember(node, name, declarationName, moduleSymbol, moduleName)
		}
	}
}

func (c *Checker) reportNonExportedMember(node *ast.Node, name *ast.Node, declarationName string, moduleSymbol *ast.Symbol, moduleName string) {
	var localSymbol *ast.Symbol
	if locals := getLocalsOfNode(moduleSymbol.ValueDeclaration); locals != nil {
		localSymbol = locals[name.Text()]
	}
	exports := moduleSymbol.Exports
	if localSymbol != nil {
		if exportedEqualsSymbol := exports[InternalSymbolNameExportEquals]; exportedEqualsSymbol != nil {
			if c.getSymbolIfSameReference(exportedEqualsSymbol, localSymbol) != nil {
				c.reportInvalidImportEqualsExportMember(node, name, declarationName, moduleName)
			} else {
				c.error(name, diagnostics.Module_0_has_no_exported_member_1, moduleName, declarationName)
			}
		} else {
			exportedSymbol := findInMap(exports, func(symbol *ast.Symbol) bool {
				return c.getSymbolIfSameReference(symbol, localSymbol) != nil
			})
			var diagnostic *ast.Diagnostic
			if exportedSymbol != nil {
				diagnostic = c.error(name, diagnostics.Module_0_declares_1_locally_but_it_is_exported_as_2, moduleName, declarationName, c.symbolToString(exportedSymbol))
			} else {
				diagnostic = c.error(name, diagnostics.Module_0_declares_1_locally_but_it_is_not_exported, moduleName, declarationName)
			}
			for i, decl := range localSymbol.Declarations {
				diagnostic.AddRelatedInfo(createDiagnosticForNode(decl, core.IfElse(i == 0, diagnostics.X_0_is_declared_here, diagnostics.X_and_here), declarationName))
			}
		}
	} else {
		c.error(name, diagnostics.Module_0_has_no_exported_member_1, moduleName, declarationName)
	}
}

func (c *Checker) reportInvalidImportEqualsExportMember(node *ast.Node, name *ast.Node, declarationName string, moduleName string) {
	if c.moduleKind >= core.ModuleKindES2015 {
		message := core.IfElse(c.compilerOptions.GetESModuleInterop(),
			diagnostics.X_0_can_only_be_imported_by_using_a_default_import,
			diagnostics.X_0_can_only_be_imported_by_turning_on_the_esModuleInterop_flag_and_using_a_default_import)
		c.error(name, message, declarationName)
	} else {
		message := core.IfElse(c.compilerOptions.GetESModuleInterop(),
			diagnostics.X_0_can_only_be_imported_by_using_import_1_require_2_or_a_default_import,
			diagnostics.X_0_can_only_be_imported_by_using_import_1_require_2_or_by_turning_on_the_esModuleInterop_flag_and_using_a_default_import)
		c.error(name, message, declarationName, declarationName, moduleName)
	}
}

func getPropertyNameFromSpecifier(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindImportSpecifier:
		return node.AsImportSpecifier().PropertyName
	case ast.KindExportSpecifier:
		return node.AsExportSpecifier().PropertyName
	case ast.KindBindingElement:
		return node.AsBindingElement().PropertyName
	}
	panic("Unhandled case in getSpecifierPropertyName")
}

func getNameFromSpecifier(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindImportSpecifier:
		return node.AsImportSpecifier().Name()
	case ast.KindExportSpecifier:
		return node.AsExportSpecifier().Name()
	case ast.KindBindingElement:
		return node.AsBindingElement().Name()
	case ast.KindPropertyAccessExpression:
		return node.AsPropertyAccessExpression().Name()
	}
	panic("Unhandled case in getSpecifierPropertyName")
}

func (c *Checker) getTargetOfBindingElement(node *ast.Node, dontResolveAlias bool) *ast.Symbol {
	panic("getTargetOfBindingElement") // !!!
}

func (c *Checker) getTargetOfExportSpecifier(node *ast.Node, meaning ast.SymbolFlags, dontResolveAlias bool) *ast.Symbol {
	name := node.AsExportSpecifier().PropertyName
	if name == nil {
		name = node.AsExportSpecifier().Name()
	}
	if moduleExportNameIsDefault(name) {
		specifier := c.getModuleSpecifierForImportOrExport(node)
		if specifier != nil {
			moduleSymbol := c.resolveExternalModuleName(node, specifier, false /*ignoreErrors*/)
			if moduleSymbol != nil {
				return c.getTargetOfModuleDefault(moduleSymbol, node, dontResolveAlias)
			}
		}
	}
	exportDeclaration := node.Parent.Parent
	var resolved *ast.Symbol
	switch {
	case exportDeclaration.AsExportDeclaration().ModuleSpecifier != nil:
		resolved = c.getExternalModuleMember(exportDeclaration, node, dontResolveAlias)
	case ast.IsStringLiteral(name):
		resolved = nil
	default:
		resolved = c.resolveEntityName(name, meaning, false /*ignoreErrors*/, dontResolveAlias, nil /*location*/)
	}
	c.markSymbolOfAliasDeclarationIfTypeOnly(node, nil /*immediateTarget*/, resolved, false /*overwriteEmpty*/, nil, "")
	return resolved
}

func (c *Checker) getTargetOfExportAssignment(node *ast.Node, dontResolveAlias bool) *ast.Symbol {
	resolved := c.getTargetOfAliasLikeExpression(node.AsExportAssignment().Expression, dontResolveAlias)
	c.markSymbolOfAliasDeclarationIfTypeOnly(node, nil /*immediateTarget*/, resolved, false /*overwriteEmpty*/, nil, "")
	return resolved
}

func (c *Checker) getTargetOfBinaryExpression(node *ast.Node, dontResolveAlias bool) *ast.Symbol {
	resolved := c.getTargetOfAliasLikeExpression(node.AsBinaryExpression().Right, dontResolveAlias)
	c.markSymbolOfAliasDeclarationIfTypeOnly(node, nil /*immediateTarget*/, resolved, false /*overwriteEmpty*/, nil, "")
	return resolved
}

func (c *Checker) getTargetOfAliasLikeExpression(expression *ast.Node, dontResolveAlias bool) *ast.Symbol {
	if ast.IsClassExpression(expression) {
		return c.unknownSymbol
		// !!! return c.checkExpressionCached(expression).symbol
	}
	if !ast.IsEntityName(expression) && !isEntityNameExpression(expression) {
		return nil
	}
	aliasLike := c.resolveEntityName(expression, ast.SymbolFlagsValue|ast.SymbolFlagsType|ast.SymbolFlagsNamespace, true /*ignoreErrors*/, dontResolveAlias, nil /*location*/)
	if aliasLike != nil {
		return aliasLike
	}
	return c.unknownSymbol
	// !!! c.checkExpressionCached(expression)
	// return c.getNodeLinks(expression).resolvedSymbol
}

func (c *Checker) getTargetOfNamespaceExportDeclaration(node *ast.Node, dontResolveAlias bool) *ast.Symbol {
	if canHaveSymbol(node.Parent) {
		resolved := c.resolveExternalModuleSymbol(node.Parent.Symbol(), dontResolveAlias)
		c.markSymbolOfAliasDeclarationIfTypeOnly(node, nil /*immediateTarget*/, resolved, false /*overwriteEmpty*/, nil, "")
		return resolved
	}
	return nil
}

func (c *Checker) getTargetOfAccessExpression(node *ast.Node, dontRecursivelyResolve bool) *ast.Symbol {
	if ast.IsBinaryExpression(node.Parent) {
		expr := node.Parent.AsBinaryExpression()
		if expr.Left == node && expr.OperatorToken.Kind == ast.KindEqualsToken {
			return c.getTargetOfAliasLikeExpression(expr.Right, dontRecursivelyResolve)
		}
	}
	return nil
}

func (c *Checker) getModuleSpecifierForImportOrExport(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindImportClause:
		return getModuleSpecifierFromNode(node.Parent)
	case ast.KindImportEqualsDeclaration:
		if ast.IsExternalModuleReference(node.AsImportEqualsDeclaration().ModuleReference) {
			return node.AsImportEqualsDeclaration().ModuleReference.AsExternalModuleReference().Expression_
		} else {
			return nil
		}
	case ast.KindNamespaceImport:
		return getModuleSpecifierFromNode(node.Parent.Parent)
	case ast.KindImportSpecifier:
		return getModuleSpecifierFromNode(node.Parent.Parent.Parent)
	case ast.KindNamespaceExport:
		return getModuleSpecifierFromNode(node.Parent)
	case ast.KindExportSpecifier:
		return getModuleSpecifierFromNode(node.Parent.Parent)
	}
	panic("Unhandled case in getModuleSpecifierForImportOrExport")
}

func getModuleSpecifierFromNode(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindImportDeclaration:
		return node.AsImportDeclaration().ModuleSpecifier
	case ast.KindExportDeclaration:
		return node.AsExportDeclaration().ModuleSpecifier
	}
	panic("Unhandled case in getModuleSpecifierFromNode")
}

/**
 * Marks a symbol as type-only if its declaration is syntactically type-only.
 * If it is not itself marked type-only, but resolves to a type-only alias
 * somewhere in its resolution chain, save a reference to the type-only alias declaration
 * so the alias _not_ marked type-only can be identified as _transitively_ type-only.
 *
 * This function is called on each alias declaration that could be type-only or resolve to
 * another type-only alias during `resolveAlias`, so that later, when an alias is used in a
 * JS-emitting expression, we can quickly determine if that symbol is effectively type-only
 * and issue an error if so.
 *
 * @param aliasDeclaration The alias declaration not marked as type-only
 * @param immediateTarget The symbol to which the alias declaration immediately resolves
 * @param finalTarget The symbol to which the alias declaration ultimately resolves
 * @param overwriteEmpty Checks `resolvesToSymbol` for type-only declarations even if `aliasDeclaration`
 * has already been marked as not resolving to a type-only alias. Used when recursively resolving qualified
 * names of import aliases, e.g. `import C = a.b.C`. If namespace `a` is not found to be type-only, the
 * import declaration will initially be marked as not resolving to a type-only symbol. But, namespace `b`
 * must still be checked for a type-only marker, overwriting the previous negative result if found.
 */

func (c *Checker) markSymbolOfAliasDeclarationIfTypeOnly(aliasDeclaration *ast.Node, immediateTarget *ast.Symbol, finalTarget *ast.Symbol, overwriteEmpty bool, exportStarDeclaration *ast.Node, exportStarName string) bool {
	if aliasDeclaration == nil || !ast.IsDeclarationNode(aliasDeclaration) {
		return false
	}
	// If the declaration itself is type-only, mark it and return. No need to check what it resolves to.
	sourceSymbol := c.getSymbolOfDeclaration(aliasDeclaration)
	if isTypeOnlyImportOrExportDeclaration(aliasDeclaration) {
		links := c.aliasSymbolLinks.get(sourceSymbol)
		links.typeOnlyDeclaration = aliasDeclaration
		return true
	}
	if exportStarDeclaration != nil {
		links := c.aliasSymbolLinks.get(sourceSymbol)
		links.typeOnlyDeclaration = exportStarDeclaration
		if sourceSymbol.Name != exportStarName {
			links.typeOnlyExportStarName = exportStarName
		}
		return true
	}
	links := c.aliasSymbolLinks.get(sourceSymbol)
	return c.markSymbolOfAliasDeclarationIfTypeOnlyWorker(links, immediateTarget, overwriteEmpty) || c.markSymbolOfAliasDeclarationIfTypeOnlyWorker(links, finalTarget, overwriteEmpty)
}

func (c *Checker) markSymbolOfAliasDeclarationIfTypeOnlyWorker(aliasDeclarationLinks *AliasSymbolLinks, target *ast.Symbol, overwriteEmpty bool) bool {
	if target != nil && (aliasDeclarationLinks.typeOnlyDeclaration == nil || overwriteEmpty && aliasDeclarationLinks.typeOnlyDeclarationResolved && aliasDeclarationLinks.typeOnlyDeclaration == nil) {
		exportSymbol := target.Exports[InternalSymbolNameExportEquals]
		if exportSymbol == nil {
			exportSymbol = target
		}
		typeOnly := core.Some(exportSymbol.Declarations, isTypeOnlyImportOrExportDeclaration)
		aliasDeclarationLinks.typeOnlyDeclarationResolved = true
		aliasDeclarationLinks.typeOnlyDeclaration = nil
		if typeOnly {
			aliasDeclarationLinks.typeOnlyDeclaration = c.aliasSymbolLinks.get(exportSymbol).typeOnlyDeclaration
		}
	}
	return aliasDeclarationLinks.typeOnlyDeclaration != nil
}

func (c *Checker) resolveExternalModuleName(location *ast.Node, moduleReferenceExpression *ast.Node, ignoreErrors bool) *ast.Symbol {
	errorMessage := diagnostics.Cannot_find_module_0_or_its_corresponding_type_declarations
	return c.resolveExternalModuleNameWorker(location, moduleReferenceExpression, core.IfElse(ignoreErrors, nil, errorMessage), ignoreErrors, false /*isForAugmentation*/)
}

func (c *Checker) resolveExternalModuleNameWorker(location *ast.Node, moduleReferenceExpression *ast.Node, moduleNotFoundError *diagnostics.Message, ignoreErrors bool, isForAugmentation bool) *ast.Symbol {
	if isStringLiteralLike(moduleReferenceExpression) {
		return c.resolveExternalModule(location, moduleReferenceExpression.Text(), moduleNotFoundError, core.IfElse(!ignoreErrors, moduleReferenceExpression, nil), isForAugmentation)
	}
	return nil
}

func (c *Checker) resolveExternalModule(location *ast.Node, moduleReference string, moduleNotFoundError *diagnostics.Message, errorNode *ast.Node, isForAugmentation bool) *ast.Symbol {
	if errorNode != nil && strings.HasPrefix(moduleReference, "@types/") {
		withoutAtTypePrefix := moduleReference[len("@types/"):]
		c.error(errorNode, diagnostics.Cannot_import_type_declaration_files_Consider_importing_0_instead_of_1, withoutAtTypePrefix, moduleReference)
	}
	ambientModule := c.tryFindAmbientModule(moduleReference, true /*withAugmentations*/)
	if ambientModule != nil {
		return ambientModule
	}
	// !!! The following only implements simple module resoltion
	sourceFile := c.program.getResolvedModule(ast.GetSourceFileOfNode(location), moduleReference)
	if sourceFile != nil {
		if sourceFile.Symbol != nil {
			return c.getMergedSymbol(sourceFile.Symbol)
		}
		if errorNode != nil && moduleNotFoundError != nil && !isSideEffectImport(errorNode) {
			c.error(errorNode, diagnostics.File_0_is_not_a_module, sourceFile.FileName())
		}
		return nil
	}
	if errorNode != nil && moduleNotFoundError != nil {
		c.error(errorNode, moduleNotFoundError, moduleReference)
	}
	return nil
}

func (c *Checker) tryFindAmbientModule(moduleName string, withAugmentations bool) *ast.Symbol {
	if tspath.IsExternalModuleNameRelative(moduleName) {
		return nil
	}
	symbol := c.getSymbol(c.globals, "\""+moduleName+"\"", ast.SymbolFlagsValueModule)
	// merged symbol is module declaration symbol combined with all augmentations
	if withAugmentations {
		return c.getMergedSymbol(symbol)
	}
	return symbol
}

func (c *Checker) resolveExternalModuleSymbol(moduleSymbol *ast.Symbol, dontResolveAlias bool) *ast.Symbol {
	if moduleSymbol != nil {
		exportEquals := c.resolveSymbolEx(moduleSymbol.Exports[InternalSymbolNameExportEquals], dontResolveAlias)
		exported := c.getMergedSymbol(c.getCommonJsExportEquals(c.getMergedSymbol(exportEquals), c.getMergedSymbol(moduleSymbol)))
		if exported != nil {
			return exported
		}
	}
	return moduleSymbol
}

func (c *Checker) getCommonJsExportEquals(exported *ast.Symbol, moduleSymbol *ast.Symbol) *ast.Symbol {
	if exported == nil || exported == c.unknownSymbol || exported == moduleSymbol || len(moduleSymbol.Exports) == 1 || exported.Flags&ast.SymbolFlagsAlias != 0 {
		return exported
	}
	links := c.moduleSymbolLinks.get(exported)
	if links.cjsExportMerged != nil {
		return links.cjsExportMerged
	}
	var merged *ast.Symbol
	if exported.Flags&ast.SymbolFlagsTransient != 0 {
		merged = exported
	} else {
		merged = c.cloneSymbol(exported)
	}
	merged.Flags |= ast.SymbolFlagsValueModule
	mergedExports := getExports(merged)
	for name, s := range moduleSymbol.Exports {
		if name != InternalSymbolNameExportEquals {
			if existing, ok := mergedExports[name]; ok {
				s = c.mergeSymbol(existing, s /*unidirectional*/, false)
			}
			mergedExports[name] = s
		}
	}
	if merged == exported {
		// We just mutated a symbol, reset any cached links we may have already set
		// (Notably required to make late bound members appear)
		c.moduleSymbolLinks.get(merged).resolvedExports = nil
		// !!! c.moduleSymbolLinks.get(merged).resolvedMembers = nil
	}
	c.moduleSymbolLinks.get(merged).cjsExportMerged = merged
	links.cjsExportMerged = merged
	return links.cjsExportMerged
}

// An external module with an 'export =' declaration may be referenced as an ES6 module provided the 'export ='
// references a symbol that is at least declared as a module or a variable. The target of the 'export =' may
// combine other declarations with the module or variable (e.g. a class/module, function/module, interface/variable).
func (c *Checker) resolveESModuleSymbol(moduleSymbol *ast.Symbol, referencingLocation *ast.Node, dontResolveAlias bool, suppressInteropError bool) *ast.Symbol {
	symbol := c.resolveExternalModuleSymbol(moduleSymbol, dontResolveAlias)
	if !dontResolveAlias && symbol != nil {
		if !suppressInteropError && symbol.Flags&(ast.SymbolFlagsModule|ast.SymbolFlagsVariable) == 0 && getDeclarationOfKind(symbol, ast.KindSourceFile) == nil {
			compilerOptionName := core.IfElse(c.moduleKind >= core.ModuleKindES2015, "allowSyntheticDefaultImports", "esModuleInterop")
			c.error(referencingLocation, diagnostics.This_module_can_only_be_referenced_with_ECMAScript_imports_Slashexports_by_turning_on_the_0_flag_and_referencing_its_default_export, compilerOptionName)
			return symbol
		}
		referenceParent := referencingLocation.Parent
		if ast.IsImportDeclaration(referenceParent) && getNamespaceDeclarationNode(referenceParent) != nil || isImportCall(referenceParent) {
			var reference *ast.Node
			if isImportCall(referenceParent) {
				reference = referenceParent.AsCallExpression().Arguments.Nodes[0]
			} else {
				reference = referenceParent.AsImportDeclaration().ModuleSpecifier
			}
			typ := c.getTypeOfSymbol(symbol)
			defaultOnlyType := c.getTypeWithSyntheticDefaultOnly(typ, symbol, moduleSymbol, reference)
			if defaultOnlyType != nil {
				return c.cloneTypeAsModuleType(symbol, defaultOnlyType, referenceParent)
			}
			// !!!
			// targetFile := moduleSymbol. /* ? */ declarations. /* ? */ find(isSourceFile)
			// isEsmCjsRef := targetFile && c.isESMFormatImportImportingCommonjsFormatFile(c.getEmitSyntaxForModuleSpecifierExpression(reference), host.getImpliedNodeFormatForEmit(targetFile))
			// if c.compilerOptions.GetESModuleInterop() || isEsmCjsRef {
			// 	sigs := c.getSignaturesOfStructuredType(type_, SignatureKindCall)
			// 	if !sigs || !sigs.length {
			// 		sigs = c.getSignaturesOfStructuredType(type_, SignatureKindConstruct)
			// 	}
			// 	if (sigs && sigs.length) || c.getPropertyOfType(type_, InternalSymbolNameDefault /*skipObjectFunctionPropertyAugment*/, true) || isEsmCjsRef {
			// 		var moduleType *Type
			// 		if type_.flags & TypeFlagsStructuredType {
			// 			moduleType = c.getTypeWithSyntheticDefaultImportType(type_, symbol, moduleSymbol, reference)
			// 		} else {
			// 			moduleType = c.createDefaultPropertyWrapperForModule(symbol, symbol.parent)
			// 		}
			// 		return c.cloneTypeAsModuleType(symbol, moduleType, referenceParent)
			// 	}
			// }
		}
	}
	return symbol
}

func (c *Checker) getTypeWithSyntheticDefaultOnly(typ *Type, symbol *ast.Symbol, originalSymbol *ast.Symbol, moduleSpecifier *ast.Node) *Type {
	return nil // !!!
}

func (c *Checker) cloneTypeAsModuleType(symbol *ast.Symbol, moduleType *Type, referenceParent *ast.Node) *ast.Symbol {
	result := c.newSymbol(symbol.Flags, symbol.Name)
	result.ConstEnumOnlyModule = symbol.ConstEnumOnlyModule
	result.Declarations = slices.Clone(symbol.Declarations)
	result.ValueDeclaration = symbol.ValueDeclaration
	result.Members = maps.Clone(symbol.Members)
	result.Exports = maps.Clone(symbol.Exports)
	result.Parent = symbol.Parent
	links := c.exportTypeLinks.get(result)
	links.target = symbol
	links.originatingImport = referenceParent
	resolvedModuleType := c.resolveStructuredTypeMembers(moduleType)
	c.valueSymbolLinks.get(result).resolvedType = c.newAnonymousType(result, resolvedModuleType.members, nil, nil, resolvedModuleType.indexInfos)
	return result
}

func (c *Checker) getTargetOfAliasDeclaration(node *ast.Node, dontRecursivelyResolve bool /*  = false */) *ast.Symbol {
	switch node.Kind {
	case ast.KindImportEqualsDeclaration, ast.KindVariableDeclaration:
		return c.getTargetOfImportEqualsDeclaration(node, dontRecursivelyResolve)
	case ast.KindImportClause:
		return c.getTargetOfImportClause(node, dontRecursivelyResolve)
	case ast.KindNamespaceImport:
		return c.getTargetOfNamespaceImport(node, dontRecursivelyResolve)
	case ast.KindNamespaceExport:
		return c.getTargetOfNamespaceExport(node, dontRecursivelyResolve)
	case ast.KindImportSpecifier:
		return c.getTargetOfImportSpecifier(node, dontRecursivelyResolve)
	case ast.KindBindingElement:
		return c.getTargetOfBindingElement(node, dontRecursivelyResolve)
	case ast.KindExportSpecifier:
		return c.getTargetOfExportSpecifier(node, ast.SymbolFlagsValue|ast.SymbolFlagsType|ast.SymbolFlagsNamespace, dontRecursivelyResolve)
	case ast.KindExportAssignment:
		return c.getTargetOfExportAssignment(node, dontRecursivelyResolve)
	case ast.KindBinaryExpression:
		return c.getTargetOfBinaryExpression(node, dontRecursivelyResolve)
	case ast.KindNamespaceExportDeclaration:
		return c.getTargetOfNamespaceExportDeclaration(node, dontRecursivelyResolve)
	case ast.KindShorthandPropertyAssignment:
		return c.resolveEntityName(node.AsShorthandPropertyAssignment().Name(), ast.SymbolFlagsValue|ast.SymbolFlagsType|ast.SymbolFlagsNamespace, true /*ignoreErrors*/, dontRecursivelyResolve, nil /*location*/)
	case ast.KindPropertyAssignment:
		return c.getTargetOfAliasLikeExpression(node.AsPropertyAssignment().Initializer, dontRecursivelyResolve)
	case ast.KindElementAccessExpression, ast.KindPropertyAccessExpression:
		return c.getTargetOfAccessExpression(node, dontRecursivelyResolve)
	}
	panic("Unhandled case in getTargetOfAliasDeclaration")
}

/**
 * Resolves a qualified name and any involved aliases.
 */
func (c *Checker) resolveEntityName(name *ast.Node, meaning ast.SymbolFlags, ignoreErrors bool, dontResolveAlias bool, location *ast.Node) *ast.Symbol {
	if ast.NodeIsMissing(name) {
		return nil
	}
	var symbol *ast.Symbol
	switch name.Kind {
	case ast.KindIdentifier:
		var message *diagnostics.Message
		if !ignoreErrors {
			if meaning == ast.SymbolFlagsNamespace || ast.NodeIsSynthesized(name) {
				message = diagnostics.Cannot_find_namespace_0
			} else {
				message = c.getCannotFindNameDiagnosticForName(getFirstIdentifier(name))
			}
		}
		resolveLocation := location
		if resolveLocation == nil {
			resolveLocation = name
		}
		symbol = c.getMergedSymbol(c.resolveName(resolveLocation, name.AsIdentifier().Text, meaning, message, true /*isUse*/, false /*excludeGlobals*/))
	case ast.KindQualifiedName:
		qualified := name.AsQualifiedName()
		symbol = c.resolveQualifiedName(name, qualified.Left, qualified.Right, meaning, ignoreErrors, dontResolveAlias, location)
	case ast.KindPropertyAccessExpression:
		access := name.AsPropertyAccessExpression()
		symbol = c.resolveQualifiedName(name, access.Expression, access.Name(), meaning, ignoreErrors, dontResolveAlias, location)
	default:
		panic("Unknown entity name kind")
	}
	if symbol != nil {
		if !ast.NodeIsSynthesized(name) && ast.IsEntityName(name) && (symbol.Flags&ast.SymbolFlagsAlias != 0 || name.Parent.Kind == ast.KindExportAssignment) {
			c.markSymbolOfAliasDeclarationIfTypeOnly(getAliasDeclarationFromName(name), symbol, nil /*finalTarget*/, true /*overwriteEmpty*/, nil, "")
		}
		if symbol.Flags&meaning == 0 && !dontResolveAlias {
			return c.resolveAlias(symbol)
		}
	}
	return symbol
}

func (c *Checker) resolveQualifiedName(name *ast.Node, left *ast.Node, right *ast.Node, meaning ast.SymbolFlags, ignoreErrors bool, dontResolveAlias bool, location *ast.Node) *ast.Symbol {
	namespace := c.resolveEntityName(left, ast.SymbolFlagsNamespace, ignoreErrors /*dontResolveAlias*/, false, location)
	if namespace == nil || ast.NodeIsMissing(right) {
		return nil
	}
	if namespace == c.unknownSymbol {
		return namespace
	}
	text := right.AsIdentifier().Text
	symbol := c.getMergedSymbol(c.getSymbol(c.getExportsOfSymbol(namespace), text, meaning))
	if symbol != nil && namespace.Flags&ast.SymbolFlagsAlias != 0 {
		// `namespace` can be resolved further if there was a symbol merge with a re-export
		symbol = c.getMergedSymbol(c.getSymbol(c.getExportsOfSymbol(c.resolveAlias(namespace)), text, meaning))
	}
	if symbol == nil {
		if !ignoreErrors {
			namespaceName := c.getFullyQualifiedName(namespace, nil /*containingLocation*/)
			declarationName := declarationNameToString(right)
			suggestionForNonexistentModule := c.getSuggestedSymbolForNonexistentModule(right, namespace)
			if suggestionForNonexistentModule != nil {
				c.error(right, diagnostics.X_0_has_no_exported_member_named_1_Did_you_mean_2, namespaceName, declarationName, c.symbolToString(suggestionForNonexistentModule))
				return nil
			}
			var containingQualifiedName *ast.Node
			if ast.IsQualifiedName(name) {
				containingQualifiedName = getContainingQualifiedNameNode(name)
			}
			canSuggestTypeof := c.globalObjectType != nil && meaning&ast.SymbolFlagsType != 0 && containingQualifiedName != nil && !ast.IsTypeOfExpression(containingQualifiedName.Parent) && c.tryGetQualifiedNameAsValue(containingQualifiedName) != nil
			if canSuggestTypeof {
				c.error(containingQualifiedName, diagnostics.X_0_refers_to_a_value_but_is_being_used_as_a_type_here_Did_you_mean_typeof_0, entityNameToString(containingQualifiedName))
				return nil
			}
			if meaning&ast.SymbolFlagsNamespace != 0 {
				if ast.IsQualifiedName(name.Parent) {
					exportedTypeSymbol := c.getMergedSymbol(c.getSymbol(c.getExportsOfSymbol(namespace), text, ast.SymbolFlagsType))
					if exportedTypeSymbol != nil {
						qualified := name.Parent.AsQualifiedName()
						c.error(qualified.Right, diagnostics.Cannot_access_0_1_because_0_is_a_type_but_not_a_namespace_Did_you_mean_to_retrieve_the_type_of_the_property_1_in_0_with_0_1, c.symbolToString(exportedTypeSymbol), qualified.Right.AsIdentifier().Text)
						return nil
					}
				}
			}
			c.error(right, diagnostics.Namespace_0_has_no_exported_member_1, namespaceName, declarationName)
		}
	}
	return symbol
}

func (c *Checker) tryGetQualifiedNameAsValue(node *ast.Node) *ast.Symbol {
	id := getFirstIdentifier(node)
	symbol := c.resolveName(id, id.AsIdentifier().Text, ast.SymbolFlagsValue, nil /*nameNotFoundMessage*/, true /*isUse*/, false /*excludeGlobals*/)
	if symbol == nil {
		return nil
	}
	n := id
	for ast.IsQualifiedName(n.Parent) {
		t := c.getTypeOfSymbol(symbol)
		symbol = c.getPropertyOfType(t, n.Parent.AsQualifiedName().Right.AsIdentifier().Text)
		if symbol == nil {
			return nil
		}
		n = n.Parent
	}
	return symbol
}

func (c *Checker) getSuggestedSymbolForNonexistentModule(name *ast.Node, targetModule *ast.Symbol) *ast.Symbol {
	return nil // !!!
}

func (c *Checker) getFullyQualifiedName(symbol *ast.Symbol, containingLocation *ast.Node) string {
	if symbol.Parent != nil {
		return c.getFullyQualifiedName(symbol.Parent, containingLocation) + "." + c.symbolToString(symbol)
	}
	return c.symbolToString(symbol) // !!!
}

func (c *Checker) getExportsOfSymbol(symbol *ast.Symbol) ast.SymbolTable {
	if symbol.Flags&ast.SymbolFlagsLateBindingContainer != 0 {
		return c.getResolvedMembersOrExportsOfSymbol(symbol, MembersOrExportsResolutionKindResolvedExports)
	}
	if symbol.Flags&ast.SymbolFlagsModule != 0 {
		return c.getExportsOfModule(symbol)
	}
	return symbol.Exports
}

func (c *Checker) getResolvedMembersOrExportsOfSymbol(symbol *ast.Symbol, resolutionKind MembersOrExportsResolutionKind) ast.SymbolTable {
	links := c.membersAndExportsLinks.get(symbol)
	if links[resolutionKind] == nil {
		isStatic := resolutionKind == MembersOrExportsResolutionKindResolvedExports
		earlySymbols := symbol.Exports
		switch {
		case !isStatic:
			earlySymbols = symbol.Members
		case symbol.Flags&ast.SymbolFlagsModule != 0:
			earlySymbols, _ = c.getExportsOfModuleWorker(symbol)
		}
		links[resolutionKind] = earlySymbols
		// !!! Resolve late-bound members
	}
	return links[resolutionKind]
}

/**
 * Gets a SymbolTable containing both the early- and late-bound members of a symbol.
 *
 * For a description of late-binding, see `lateBindMember`.
 */
func (c *Checker) getMembersOfSymbol(symbol *ast.Symbol) ast.SymbolTable {
	if symbol.Flags&ast.SymbolFlagsLateBindingContainer != 0 {
		return c.getResolvedMembersOrExportsOfSymbol(symbol, MembersOrExportsResolutionKindresolvedMembers)
	}
	return symbol.Members
}

func (c *Checker) getExportsOfModule(moduleSymbol *ast.Symbol) ast.SymbolTable {
	links := c.moduleSymbolLinks.get(moduleSymbol)
	if links.resolvedExports == nil {
		exports, typeOnlyExportStarMap := c.getExportsOfModuleWorker(moduleSymbol)
		links.resolvedExports = exports
		links.typeOnlyExportStarMap = typeOnlyExportStarMap
	}
	return links.resolvedExports
}

type ExportCollision struct {
	specifierText        string
	exportsWithDuplicate []*ast.Node
}

type ExportCollisionTable = map[string]*ExportCollision

func (c *Checker) getExportsOfModuleWorker(moduleSymbol *ast.Symbol) (exports ast.SymbolTable, typeOnlyExportStarMap map[string]*ast.Node) {
	var visitedSymbols []*ast.Symbol
	var nonTypeOnlyNames core.Set[string]
	// The ES6 spec permits export * declarations in a module to circularly reference the module itself. For example,
	// module 'a' can 'export * from "b"' and 'b' can 'export * from "a"' without error.
	var visit func(*ast.Symbol, *ast.Node, bool) ast.SymbolTable
	visit = func(symbol *ast.Symbol, exportStar *ast.Node, isTypeOnly bool) ast.SymbolTable {
		if !isTypeOnly && symbol != nil {
			// Add non-type-only names before checking if we've visited this module,
			// because we might have visited it via an 'export type *', and visiting
			// again with 'export *' will override the type-onlyness of its exports.
			for name := range symbol.Exports {
				nonTypeOnlyNames.Add(name)
			}
		}
		if symbol == nil || symbol.Exports == nil || slices.Contains(visitedSymbols, symbol) {
			return nil
		}
		symbols := maps.Clone(symbol.Exports)
		// All export * declarations are collected in an __export symbol by the binder
		exportStars := symbol.Exports[InternalSymbolNameExportStar]
		if exportStars != nil {
			nestedSymbols := make(ast.SymbolTable)
			lookupTable := make(ExportCollisionTable)
			for _, node := range exportStars.Declarations {
				resolvedModule := c.resolveExternalModuleName(node, node.AsExportDeclaration().ModuleSpecifier, false /*ignoreErrors*/)
				exportedSymbols := visit(resolvedModule, node, isTypeOnly || node.AsExportDeclaration().IsTypeOnly)
				c.extendExportSymbols(nestedSymbols, exportedSymbols, lookupTable, node)
			}
			for id, s := range lookupTable {
				// It's not an error if the file with multiple `export *`s with duplicate names exports a member with that name itself
				if id == "export=" || len(s.exportsWithDuplicate) == 0 || symbols[id] != nil {
					continue
				}
				for _, node := range s.exportsWithDuplicate {
					c.diagnostics.add(createDiagnosticForNode(node, diagnostics.Module_0_has_already_exported_a_member_named_1_Consider_explicitly_re_exporting_to_resolve_the_ambiguity, s.specifierText, id))
				}
			}
			c.extendExportSymbols(symbols, nestedSymbols, nil, nil)
		}
		if exportStar != nil && exportStar.AsExportDeclaration().IsTypeOnly {
			if typeOnlyExportStarMap == nil {
				typeOnlyExportStarMap = make(map[string]*ast.Node)
			}
			for name := range symbols {
				typeOnlyExportStarMap[name] = exportStar
			}
		}
		return symbols
	}
	// A module defined by an 'export=' consists of one export that needs to be resolved
	moduleSymbol = c.resolveExternalModuleSymbol(moduleSymbol, false /*dontResolveAlias*/)
	exports = visit(moduleSymbol, nil, false)
	if exports == nil {
		exports = make(ast.SymbolTable)
	}
	for name := range nonTypeOnlyNames.Keys() {
		delete(typeOnlyExportStarMap, name)
	}
	return exports, typeOnlyExportStarMap
}

/**
 * Extends one symbol table with another while collecting information on name collisions for error message generation into the `lookupTable` argument
 * Not passing `lookupTable` and `exportNode` disables this collection, and just extends the tables
 */
func (c *Checker) extendExportSymbols(target ast.SymbolTable, source ast.SymbolTable, lookupTable ExportCollisionTable, exportNode *ast.Node) {
	for id, sourceSymbol := range source {
		if id == InternalSymbolNameDefault {
			continue
		}
		targetSymbol := target[id]
		if targetSymbol == nil {
			target[id] = sourceSymbol
			if lookupTable != nil && exportNode != nil {
				lookupTable[id] = &ExportCollision{
					specifierText: getTextOfNode(exportNode.AsExportDeclaration().ModuleSpecifier),
				}
			}
		} else if lookupTable != nil && exportNode != nil && c.resolveSymbol(targetSymbol) != c.resolveSymbol(sourceSymbol) {
			s := lookupTable[id]
			s.exportsWithDuplicate = append(s.exportsWithDuplicate, exportNode)
		}
	}
}

/**
 * Indicates that a symbol is an alias that does not merge with a local declaration.
 * OR Is a JSContainer which may merge an alias with a local declaration
 */
func isNonLocalAlias(symbol *ast.Symbol, excludes ast.SymbolFlags) bool {
	if symbol == nil {
		return false
	}
	return symbol.Flags&(ast.SymbolFlagsAlias|excludes) == ast.SymbolFlagsAlias ||
		symbol.Flags&ast.SymbolFlagsAlias != 0 && symbol.Flags&ast.SymbolFlagsAssignment != 0
}

func (c *Checker) resolveAlias(symbol *ast.Symbol) *ast.Symbol {
	if symbol == c.unknownSymbol {
		return symbol // !!! Remove once all symbols are properly resolved
	}
	if symbol.Flags&ast.SymbolFlagsAlias == 0 {
		panic("Should only get alias here")
	}
	links := c.aliasSymbolLinks.get(symbol)
	if links.aliasTarget == nil {
		links.aliasTarget = c.resolvingSymbol
		node := c.getDeclarationOfAliasSymbol(symbol)
		if node == nil {
			panic("Unexpected nil in resolveAlias")
		}
		target := c.getTargetOfAliasDeclaration(node, false /*dontRecursivelyResolve*/)
		if links.aliasTarget == c.resolvingSymbol {
			if target == nil {
				target = c.unknownSymbol
			}
			links.aliasTarget = target
		} else {
			c.error(node, diagnostics.Circular_definition_of_import_alias_0, c.symbolToString(symbol))
		}
	} else if links.aliasTarget == c.resolvingSymbol {
		links.aliasTarget = c.unknownSymbol
	}
	return links.aliasTarget
}

func (c *Checker) resolveAliasWithDeprecationCheck(symbol *ast.Symbol, location *ast.Node) *ast.Symbol {
	if symbol.Flags&ast.SymbolFlagsAlias == 0 || c.isDeprecatedSymbol(symbol) || c.getDeclarationOfAliasSymbol(symbol) == nil {
		return symbol
	}
	targetSymbol := c.resolveAlias(symbol)
	if targetSymbol == c.unknownSymbol {
		return targetSymbol
	}
	for symbol.Flags&ast.SymbolFlagsAlias != 0 {
		target := c.getImmediateAliasedSymbol(symbol)
		if target != nil {
			if target == targetSymbol {
				break
			}
			if len(target.Declarations) != 0 {
				if c.isDeprecatedSymbol(target) {
					c.addDeprecatedSuggestion(location, target.Declarations, target.Name)
					break
				} else {
					if symbol == targetSymbol {
						break
					}
					symbol = target
				}
			}
		} else {
			break
		}
	}
	return targetSymbol
}

/**
 * Gets combined flags of a `symbol` and all alias targets it resolves to. `resolveAlias`
 * is typically recursive over chains of aliases, but stops mid-chain if an alias is merged
 * with another exported symbol, e.g.
 * ```ts
 * // a.ts
 * export const a = 0;
 * // b.ts
 * export { a } from "./a";
 * export type a = number;
 * // c.ts
 * import { a } from "./b";
 * ```
 * Calling `resolveAlias` on the `a` in c.ts would stop at the merged symbol exported
 * from b.ts, even though there is still more alias to resolve. Consequently, if we were
 * trying to determine if the `a` in c.ts has a value meaning, looking at the flags on
 * the local symbol and on the symbol returned by `resolveAlias` is not enough.
 * @returns SymbolFlags.All if `symbol` is an alias that ultimately resolves to `unknown`;
 * combined flags of all alias targets otherwise.
 */
func (c *Checker) getSymbolFlags(symbol *ast.Symbol) ast.SymbolFlags {
	return c.getSymbolFlagsEx(symbol, false /*excludeTypeOnlyMeanings*/, false /*excludeLocalMeanings*/)
}

func (c *Checker) getSymbolFlagsEx(symbol *ast.Symbol, excludeTypeOnlyMeanings bool, excludeLocalMeanings bool) ast.SymbolFlags {
	var typeOnlyDeclaration *ast.Node
	if excludeTypeOnlyMeanings {
		typeOnlyDeclaration = c.getTypeOnlyAliasDeclaration(symbol)
	}
	typeOnlyDeclarationIsExportStar := typeOnlyDeclaration != nil && ast.IsExportDeclaration(typeOnlyDeclaration)
	var typeOnlyResolution *ast.Symbol
	if typeOnlyDeclaration != nil {
		if typeOnlyDeclarationIsExportStar {
			moduleSpecifier := typeOnlyDeclaration.AsExportDeclaration().ModuleSpecifier
			typeOnlyResolution = c.resolveExternalModuleName(moduleSpecifier, moduleSpecifier /*ignoreErrors*/, true)
		} else {
			typeOnlyResolution = c.resolveAlias(typeOnlyDeclaration.Symbol())
		}
	}
	var typeOnlyExportStarTargets ast.SymbolTable
	if typeOnlyDeclarationIsExportStar && typeOnlyResolution != nil {
		typeOnlyExportStarTargets = c.getExportsOfModule(typeOnlyResolution)
	}
	var flags ast.SymbolFlags
	if !excludeLocalMeanings {
		flags = symbol.Flags
	}
	var seenSymbols core.Set[*ast.Symbol]
	for symbol.Flags&ast.SymbolFlagsAlias != 0 {
		target := c.getExportSymbolOfValueSymbolIfExported(c.resolveAlias(symbol))
		if !typeOnlyDeclarationIsExportStar && target == typeOnlyResolution || typeOnlyExportStarTargets[target.Name] == target {
			break
		}
		if target == c.unknownSymbol {
			return ast.SymbolFlagsAll
		}
		// Optimizations - try to avoid creating or adding to
		// `seenSymbols` if possible
		if target == symbol || seenSymbols.Has(target) {
			break
		}
		if target.Flags&ast.SymbolFlagsAlias != 0 {
			if seenSymbols.Len() == 0 {
				seenSymbols.Add(symbol)
			}
			seenSymbols.Add(target)
		}
		flags |= target.Flags
		symbol = target
	}
	return flags
}

func (c *Checker) getDeclarationOfAliasSymbol(symbol *ast.Symbol) *ast.Node {
	return core.FindLast(symbol.Declarations, c.isAliasSymbolDeclaration)
}

/**
 * An alias symbol is created by one of the following declarations:
 * import <symbol> = ...
 * import <symbol> from ...
 * import * as <symbol> from ...
 * import { x as <symbol> } from ...
 * export { x as <symbol> } from ...
 * export * as ns <symbol> from ...
 * export = <EntityNameExpression>
 * export default <EntityNameExpression>
 */
func (c *Checker) isAliasSymbolDeclaration(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindImportEqualsDeclaration, ast.KindNamespaceExportDeclaration, ast.KindNamespaceImport, ast.KindNamespaceExport,
		ast.KindImportSpecifier, ast.KindExportSpecifier:
		return true
	case ast.KindImportClause:
		return node.AsImportClause().Name() != nil
	case ast.KindExportAssignment:
		return exportAssignmentIsAlias(node)
	}
	return false
}

/**
 * Distinct write types come only from set accessors, but synthetic union and intersection
 * properties deriving from set accessors will either pre-compute or defer the union or
 * intersection of the writeTypes of their constituents.
 */
func (c *Checker) getWriteTypeOfSymbol(symbol *ast.Symbol) *Type {
	return c.getTypeOfSymbol(symbol) // !!!
}

func (c *Checker) getTypeOfSymbol(symbol *ast.Symbol) *Type {
	// !!!
	// checkFlags := symbol.checkFlags
	// if checkFlags&CheckFlagsDeferredType != 0 {
	// 	return c.getTypeOfSymbolWithDeferredType(symbol)
	// }
	if symbol.CheckFlags&ast.CheckFlagsInstantiated != 0 {
		return c.getTypeOfInstantiatedSymbol(symbol)
	}
	// if checkFlags&CheckFlagsMapped != 0 {
	// 	return c.getTypeOfMappedSymbol(symbol.(MappedSymbol))
	// }
	// if checkFlags&CheckFlagsReverseMapped != 0 {
	// 	return c.getTypeOfReverseMappedSymbol(symbol.(ReverseMappedSymbol))
	// }
	if symbol.Flags&(ast.SymbolFlagsVariable|ast.SymbolFlagsProperty) != 0 {
		return c.getTypeOfVariableOrParameterOrProperty(symbol)
	}
	if symbol.Flags&(ast.SymbolFlagsFunction|ast.SymbolFlagsMethod|ast.SymbolFlagsClass|ast.SymbolFlagsEnum|ast.SymbolFlagsValueModule) != 0 {
		return c.getTypeOfFuncClassEnumModule(symbol)
	}
	if symbol.Flags&ast.SymbolFlagsEnumMember != 0 {
		return c.getTypeOfEnumMember(symbol)
	}
	// if symbol.flags&SymbolFlagsAccessor != 0 {
	// 	return c.getTypeOfAccessors(symbol)
	// }
	// if symbol.flags&SymbolFlagsAlias != 0 {
	// 	return c.getTypeOfAlias(symbol)
	// }
	return c.errorType
}

func (c *Checker) getNonMissingTypeOfSymbol(symbol *ast.Symbol) *Type {
	return c.removeMissingType(c.getTypeOfSymbol(symbol), symbol.Flags&ast.SymbolFlagsOptional != 0)
}

func (c *Checker) getTypeOfInstantiatedSymbol(symbol *ast.Symbol) *Type {
	links := c.valueSymbolLinks.get(symbol)
	if links.resolvedType == nil {
		links.resolvedType = c.instantiateType(c.getTypeOfSymbol(links.target), links.mapper)
	}
	return links.resolvedType
}

func (c *Checker) getTypeOfVariableOrParameterOrProperty(symbol *ast.Symbol) *Type {
	links := c.valueSymbolLinks.get(symbol)
	if links.resolvedType == nil {
		t := c.getTypeOfVariableOrParameterOrPropertyWorker(symbol)
		if t == nil {
			panic("Unexpected nil type")
		}
		// For a contextually typed parameter it is possible that a type has already
		// been assigned (in assignTypeToParameterAndFixTypeParameters), and we want
		// to preserve this type. In fact, we need to _prefer_ that type, but it won't
		// be assigned until contextual typing is complete, so we need to defer in
		// cases where contextual typing may take place.
		if links.resolvedType == nil && !c.isParameterOfContextSensitiveSignature(symbol) {
			links.resolvedType = t
		}
		return t
	}
	return links.resolvedType
}

func (c *Checker) isParameterOfContextSensitiveSignature(symbol *ast.Symbol) bool {
	return false // !!!
}

func (c *Checker) getTypeOfVariableOrParameterOrPropertyWorker(symbol *ast.Symbol) *Type {
	// Handle prototype property
	if symbol.Flags&ast.SymbolFlagsPrototype != 0 {
		return c.getTypeOfPrototypeProperty(symbol)
	}
	// CommonsJS require and module both have type any.
	if symbol == c.requireSymbol {
		return c.anyType
	}
	// !!! Handle SymbolFlagsModuleExports
	// !!! Debug.assertIsDefined(symbol.valueDeclaration)
	declaration := symbol.ValueDeclaration
	// !!! Handle export default expressions
	// if isSourceFile(declaration) && isJsonSourceFile(declaration) {
	// 	if !declaration.statements.length {
	// 		return c.emptyObjectType
	// 	}
	// 	return c.getWidenedType(c.getWidenedLiteralType(c.checkExpression(declaration.statements[0].expression)))
	// }
	// Handle variable, parameter or property
	if !c.pushTypeResolution(symbol, TypeSystemPropertyNameType) {
		return c.reportCircularityError(symbol)
	}
	var result *Type
	switch declaration.Kind {
	case ast.KindParameter, ast.KindPropertyDeclaration, ast.KindPropertySignature, ast.KindVariableDeclaration,
		ast.KindBindingElement:
		result = c.getWidenedTypeForVariableLikeDeclaration(declaration, true /*reportErrors*/)
	case ast.KindPropertyAssignment:
		result = c.checkPropertyAssignment(declaration, CheckModeNormal)
	case ast.KindShorthandPropertyAssignment:
		result = c.checkExpressionForMutableLocation(declaration, CheckModeNormal)
	case ast.KindMethodDeclaration:
		result = c.checkObjectLiteralMethod(declaration, CheckModeNormal)
	case ast.KindExportAssignment:
		result = c.widenTypeForVariableLikeDeclaration(c.checkExpressionCached(declaration.AsExportAssignment().Expression), declaration, false /*reportErrors*/)
	case ast.KindBinaryExpression:
		result = c.getWidenedTypeForAssignmentDeclaration(symbol, nil)
	case ast.KindJsxAttribute:
		result = c.checkJsxAttribute(declaration.AsJsxAttribute(), CheckModeNormal)
	case ast.KindEnumMember:
		result = c.getTypeOfEnumMember(symbol)
	default:
		panic("Unhandled case in getTypeOfVariableOrParameterOrPropertyWorker")
	}
	if !c.popTypeResolution() {
		return c.reportCircularityError(symbol)
	}
	return result
}

// Return the type associated with a variable, parameter, or property declaration. In the simple case this is the type
// specified in a type annotation or inferred from an initializer. However, in the case of a destructuring declaration it
// is a bit more involved. For example:
//
//	var [x, s = ""] = [1, "one"];
//
// Here, the array literal [1, "one"] is contextually typed by the type [any, string], which is the implied type of the
// binding pattern [x, s = ""]. Because the contextual type is a tuple type, the resulting type of [1, "one"] is the
// tuple type [number, string]. Thus, the type inferred for 'x' is number and the type inferred for 's' is string.
func (c *Checker) getWidenedTypeForVariableLikeDeclaration(declaration *ast.Node, reportErrors bool) *Type {
	return c.widenTypeForVariableLikeDeclaration(c.getTypeForVariableLikeDeclaration(declaration /*includeOptionality*/, true, CheckModeNormal), declaration, reportErrors)
}

// Return the inferred type for a variable, parameter, or property declaration
func (c *Checker) getTypeForVariableLikeDeclaration(declaration *ast.Node, includeOptionality bool, checkMode CheckMode) *Type {
	// A variable declared in a for..in statement is of type string, or of type keyof T when the
	// right hand expression is of a type parameter type.
	if ast.IsVariableDeclaration(declaration) {
		grandParent := declaration.Parent.Parent
		switch grandParent.Kind {
		case ast.KindForInStatement:
			indexType := c.getIndexType(c.getNonNullableTypeIfNeeded(c.checkExpressionEx(grandParent.Expression(), checkMode /*checkMode*/)))
			if indexType.flags&(TypeFlagsTypeParameter|TypeFlagsIndex) != 0 {
				return c.getExtractStringType(indexType)
			}
			return c.stringType
		case ast.KindForOfStatement:
			// checkRightHandSideOfForOf will return undefined if the for-of expression type was
			// missing properties/signatures required to get its iteratedType (like
			// [Symbol.iterator] or next). This may be because we accessed properties from anyType,
			// or it may have led to an error inside getElementTypeOfIterable.
			return c.checkRightHandSideOfForOf(grandParent)
		}
	} else if ast.IsBindingElement(declaration) {
		return c.getTypeForBindingElement(declaration)
	}
	isProperty := ast.IsPropertyDeclaration(declaration) && !hasAccessorModifier(declaration) || ast.IsPropertySignatureDeclaration(declaration)
	isOptional := includeOptionality && isOptionalDeclaration(declaration)
	// Use type from type annotation if one is present
	declaredType := c.tryGetTypeFromEffectiveTypeNode(declaration)
	if isCatchClauseVariableDeclarationOrBindingElement(declaration) {
		if declaredType != nil {
			// If the catch clause is explicitly annotated with any or unknown, accept it, otherwise error.
			if declaredType.flags&TypeFlagsAnyOrUnknown != 0 {
				return declaredType
			}
			return c.errorType
		}
		// If the catch clause is not explicitly annotated, treat it as though it were explicitly
		// annotated with unknown or any, depending on useUnknownInCatchVariables.
		if c.useUnknownInCatchVariables {
			return c.unknownType
		} else {
			return c.anyType
		}
	}
	if declaredType != nil {
		return c.addOptionalityEx(declaredType, isProperty, isOptional)
	}
	if c.noImplicitAny && ast.IsVariableDeclaration(declaration) && !ast.IsBindingPattern(declaration.Name()) &&
		c.getCombinedModifierFlagsCached(declaration)&ast.ModifierFlagsExport == 0 && declaration.Flags&ast.NodeFlagsAmbient == 0 {
		// If --noImplicitAny is on or the declaration is in a Javascript file,
		// use control flow tracked 'any' type for non-ambient, non-exported var or let variables with no
		// initializer or a 'null' or 'undefined' initializer.
		variableDeclaration := declaration.AsVariableDeclaration()
		if c.getCombinedNodeFlagsCached(declaration)&ast.NodeFlagsConstant == 0 && (variableDeclaration.Initializer == nil || c.isNullOrUndefined(variableDeclaration.Initializer)) {
			return c.autoType
		}
		// Use control flow tracked 'any[]' type for non-ambient, non-exported variables with an empty array
		// literal initializer.
		if variableDeclaration.Initializer != nil && isEmptyArrayLiteral(variableDeclaration.Initializer) {
			return c.autoArrayType
		}
	}
	if ast.IsParameter(declaration) {
		fn := declaration.Parent
		// For a parameter of a set accessor, use the type of the get accessor if one is present
		if ast.IsSetAccessorDeclaration(fn) && c.hasBindableName(fn) {
			getter := getDeclarationOfKind(c.getSymbolOfDeclaration(declaration.Parent), ast.KindGetAccessor)
			if getter != nil {
				getterSignature := c.getSignatureFromDeclaration(getter)
				thisParameter := c.getAccessorThisParameter(fn)
				if thisParameter != nil && declaration == thisParameter {
					// Use the type from the *getter*
					// Debug.assert(thisParameter.Type_ == nil)
					return c.getTypeOfSymbol(getterSignature.thisParameter)
				}
				return c.getReturnTypeOfSignature(getterSignature)
			}
		}
		// Use contextual parameter type if one is available
		var t *Type
		if declaration.Symbol().Name == InternalSymbolNameThis {
			t = c.getContextualThisParameterType(fn)
		} else {
			t = c.getContextuallyTypedParameterType(declaration)
		}
		if t != nil {
			return c.addOptionalityEx(t, false /*isProperty*/, isOptional)
		}
	}
	// Use the type of the initializer expression if one is present and the declaration is
	// not a parameter of a contextually typed function
	if declaration.Initializer() != nil {
		t := c.widenTypeInferredFromInitializer(declaration, c.checkDeclarationInitializer(declaration, checkMode, nil /*contextualType*/))
		return c.addOptionalityEx(t, isProperty, isOptional)
	}
	if c.noImplicitAny && ast.IsPropertyDeclaration(declaration) {
		// We have a property declaration with no type annotation or initializer, in noImplicitAny mode or a .js file.
		// Use control flow analysis of this.xxx assignments in the constructor or static block to determine the type of the property.
		if !hasStaticModifier(declaration) {
			return nil
			// !!!
			// constructor := findConstructorDeclaration(declaration.parent.(ClassLikeDeclaration))
			// var t *Type
			// switch {
			// case constructor != nil:
			// 	t = c.getFlowTypeInConstructor(declaration.symbol, constructor)
			// case getEffectiveModifierFlags(declaration)&ModifierFlagsAmbient != 0:
			// 	t = c.getTypeOfPropertyInBaseClass(declaration.symbol)
			// }
			// if t != nil {
			// 	t = c.addOptionalityEx(t, true /*isProperty*/, isOptional)
			// }
			// return t
		} else {
			return nil
			// !!!
			// staticBlocks := filter(declaration.parent.(ClassLikeDeclaration).Members(), isClassStaticBlockDeclaration)
			// var t *Type
			// switch {
			// case len(staticBlocks) != 0:
			// 	t = c.getFlowTypeInStaticBlocks(declaration.symbol, staticBlocks)
			// case getEffectiveModifierFlags(declaration)&ModifierFlagsAmbient != 0:
			// 	t = c.getTypeOfPropertyInBaseClass(declaration.symbol)
			// }
			// if t != nil {
			// 	t = c.addOptionalityEx(t, true /*isProperty*/, isOptional)
			// }
			// return t
		}
	}
	if ast.IsJsxAttribute(declaration) {
		// if JSX attribute doesn't have initializer, by default the attribute will have boolean value of true.
		// I.e <Elem attr /> is sugar for <Elem attr={true} />
		return c.trueType
	}
	// If the declaration specifies a binding pattern and is not a parameter of a contextually
	// typed function, use the type implied by the binding pattern
	if ast.IsBindingPattern(declaration.Name()) {
		return c.getTypeFromBindingPattern(declaration.Name() /*includePatternInType*/, false /*reportErrors*/, true)
	}
	// No type specified and nothing can be inferred
	return nil
}

func (c *Checker) checkDeclarationInitializer(declaration *ast.Node, checkMode CheckMode, contextualType *Type) *Type {
	initializer := c.getEffectiveInitializer(declaration)
	t := c.getQuickTypeOfExpression(initializer)
	if t == nil {
		if contextualType != nil {
			t = c.checkExpressionWithContextualType(initializer, contextualType, nil /*inferenceContext*/, checkMode)
		} else {
			t = c.checkExpressionCachedEx(initializer, checkMode)
		}
	}
	if ast.IsParameter(getRootDeclaration(declaration)) {
		name := declaration.Name()
		switch name.Kind {
		case ast.KindObjectBindingPattern:
			if isObjectLiteralType(t) {
				return c.padObjectLiteralType(t, name)
			}
		case ast.KindArrayBindingPattern:
			if isTupleType(t) {
				return c.padTupleType(t, name)
			}
		}
	}
	return t
}

func (c *Checker) padObjectLiteralType(t *Type, pattern *ast.Node) *Type {
	return t // !!!
}

func (c *Checker) padTupleType(t *Type, pattern *ast.Node) *Type {
	return t // !!!
}

func (c *Checker) getEffectiveInitializer(declaration *ast.Node) *ast.Node {
	return declaration.Initializer()
}

func (c *Checker) widenTypeInferredFromInitializer(declaration *ast.Node, t *Type) *Type {
	if c.getCombinedNodeFlagsCached(declaration)&ast.NodeFlagsConstant != 0 || isDeclarationReadonly(declaration) {
		return t
	}
	return c.getWidenedLiteralType(t)
}

func (c *Checker) getTypeOfFuncClassEnumModule(symbol *ast.Symbol) *Type {
	links := c.valueSymbolLinks.get(symbol)
	if links.resolvedType == nil {
		links.resolvedType = c.getTypeOfFuncClassEnumModuleWorker(symbol)
	}
	return links.resolvedType
}

func (c *Checker) getTypeOfFuncClassEnumModuleWorker(symbol *ast.Symbol) *Type {
	if symbol.Flags&ast.SymbolFlagsModule != 0 && isShorthandAmbientModuleSymbol(symbol) {
		return c.anyType
	}
	t := c.newObjectType(ObjectFlagsAnonymous, symbol)
	if symbol.Flags&ast.SymbolFlagsClass != 0 {
		baseTypeVariable := c.getBaseTypeVariableOfClass(symbol)
		if baseTypeVariable != nil {
			return c.getIntersectionType([]*Type{t, baseTypeVariable})
		}
		return t
	}
	if c.strictNullChecks && symbol.Flags&ast.SymbolFlagsOptional != 0 {
		return c.getOptionalType(t /*isProperty*/, true)
	}
	return t
}

func (c *Checker) getBaseTypeVariableOfClass(symbol *ast.Symbol) *Type {
	baseConstructorType := c.getBaseConstructorTypeOfClass(c.getDeclaredTypeOfClassOrInterface(symbol))
	switch {
	case baseConstructorType.flags&TypeFlagsTypeVariable != 0:
		return baseConstructorType
	case baseConstructorType.flags&TypeFlagsIntersection != 0:
		return core.Find(baseConstructorType.Types(), func(t *Type) bool {
			return t.flags&TypeFlagsTypeVariable != 0
		})
	}
	return nil
}

/**
 * The base constructor of a class can resolve to
 * * undefinedType if the class has no extends clause,
 * * errorType if an error occurred during resolution of the extends expression,
 * * nullType if the extends expression is the null value,
 * * anyType if the extends expression has type any, or
 * * an object type with at least one construct signature.
 */
func (c *Checker) getBaseConstructorTypeOfClass(t *Type) *Type {
	data := t.AsInterfaceType()
	if data.resolvedBaseConstructorType != nil {
		return data.resolvedBaseConstructorType
	}
	baseTypeNode := getBaseTypeNodeOfClass(t)
	if baseTypeNode == nil {
		data.resolvedBaseConstructorType = c.undefinedType
		return data.resolvedBaseConstructorType
	}
	if !c.pushTypeResolution(t, TypeSystemPropertyNameResolvedBaseConstructorType) {
		return c.errorType
	}
	baseConstructorType := c.checkExpression(baseTypeNode.Expression())
	if baseConstructorType.flags&(TypeFlagsObject|TypeFlagsIntersection) != 0 {
		// Resolving the members of a class requires us to resolve the base class of that class.
		// We force resolution here such that we catch circularities now.
		c.resolveStructuredTypeMembers(baseConstructorType)
	}
	if !c.popTypeResolution() {
		c.error(t.symbol.ValueDeclaration, diagnostics.X_0_is_referenced_directly_or_indirectly_in_its_own_base_expression, c.symbolToString(t.symbol))
		if data.resolvedBaseConstructorType == nil {
			data.resolvedBaseConstructorType = c.errorType
		}
		return data.resolvedBaseConstructorType
	}
	if baseConstructorType.flags&TypeFlagsAny == 0 && baseConstructorType != c.nullWideningType && !c.isConstructorType(baseConstructorType) {
		err := c.error(baseTypeNode.Expression(), diagnostics.Type_0_is_not_a_constructor_function_type, c.typeToString(baseConstructorType))
		if baseConstructorType.flags&TypeFlagsTypeParameter != 0 {
			constraint := c.getConstraintFromTypeParameter(baseConstructorType)
			var ctorReturn *Type = c.unknownType
			if constraint != nil {
				ctorSigs := c.getSignaturesOfType(constraint, SignatureKindConstruct)
				if len(ctorSigs) != 0 {
					ctorReturn = c.getReturnTypeOfSignature(ctorSigs[0])
				}
			}
			if baseConstructorType.symbol.Declarations != nil {
				err.AddRelatedInfo(createDiagnosticForNode(baseConstructorType.symbol.Declarations[0], diagnostics.Did_you_mean_for_0_to_be_constrained_to_type_new_args_Colon_any_1, c.symbolToString(baseConstructorType.symbol), c.typeToString(ctorReturn)))
			}
		}
		if data.resolvedBaseConstructorType == nil {
			data.resolvedBaseConstructorType = c.errorType
		}
		return data.resolvedBaseConstructorType
	}
	if data.resolvedBaseConstructorType == nil {
		data.resolvedBaseConstructorType = baseConstructorType
	}
	return data.resolvedBaseConstructorType
}

func (c *Checker) isFunctionType(t *Type) bool {
	return t.flags&TypeFlagsObject != 0 && len(c.getSignaturesOfType(t, SignatureKindCall)) > 0
}

func (c *Checker) isConstructorType(t *Type) bool {
	if len(c.getSignaturesOfType(t, SignatureKindConstruct)) > 0 {
		return true
	}
	if t.flags&TypeFlagsTypeVariable != 0 {
		constraint := c.getBaseConstraintOfType(t)
		return constraint != nil && c.isMixinConstructorType(constraint)
	}
	return false
}

// A type is a mixin constructor if it has a single construct signature taking no type parameters and a single
// rest parameter of type any[].
func (c *Checker) isMixinConstructorType(t *Type) bool {
	signatures := c.getSignaturesOfType(t, SignatureKindConstruct)
	if len(signatures) == 1 {
		s := signatures[0]
		if len(s.typeParameters) == 0 && len(s.parameters) == 1 && signatureHasRestParameter(s) {
			paramType := c.getTypeOfParameter(s.parameters[0])
			return isTypeAny(paramType) || c.getElementTypeOfArrayType(paramType) == c.anyType
		}
	}
	return false
}

func signatureHasRestParameter(sig *Signature) bool {
	return sig.flags&SignatureFlagsHasRestParameter != 0
}

func (c *Checker) getTypeOfParameter(symbol *ast.Symbol) *Type {
	declaration := symbol.ValueDeclaration
	return c.addOptionalityEx(c.getTypeOfSymbol(symbol), false, declaration != nil && (declaration.Initializer() != nil || isOptionalDeclaration(declaration)))
}

func (c *Checker) getConstraintOfType(t *Type) *Type {
	switch {
	case t.flags&TypeFlagsTypeParameter != 0:
		return c.getConstraintOfTypeParameter(t)
	case t.flags&TypeFlagsIndexedAccess != 0:
		return c.getConstraintOfIndexedAccess(t)
	case t.flags&TypeFlagsConditional != 0:
		return c.getConstraintOfConditionalType(t)
	}
	return c.getBaseConstraintOfType(t)
}

func (c *Checker) getConstraintOfTypeParameter(typeParameter *Type) *Type {
	if c.hasNonCircularBaseConstraint(typeParameter) {
		return c.getConstraintFromTypeParameter(typeParameter)
	}
	return nil
}

func (c *Checker) hasNonCircularBaseConstraint(t *Type) bool {
	return c.getResolvedBaseConstraint(t, nil) != c.circularConstraintType
}

// This is a worker function. Use getConstraintOfTypeParameter which guards against circular constraints
func (c *Checker) getConstraintFromTypeParameter(t *Type) *Type {
	tp := t.AsTypeParameter()
	if tp.constraint == nil {
		var constraint *Type
		if tp.target != nil {
			constraint = c.instantiateType(c.getConstraintOfTypeParameter(tp.target), tp.mapper)
		} else {
			constraintDeclaration := c.getConstraintDeclaration(t)
			if constraintDeclaration != nil {
				constraint = c.getTypeFromTypeNode(constraintDeclaration)
				if constraint.flags&TypeFlagsAny != 0 && !c.isErrorType(constraint) {
					// use stringNumberSymbolType as the base constraint for mapped type key constraints (unknown isn;t assignable to that, but `any` was),
					// use unknown otherwise
					if ast.IsMappedTypeNode(constraintDeclaration.Parent.Parent) {
						constraint = c.stringNumberSymbolType
					} else {
						constraint = c.unknownType
					}
				}
			} else {
				constraint = c.getInferredTypeParameterConstraint(t, false)
			}
		}
		if constraint == nil {
			constraint = c.noConstraintType
		}
		tp.constraint = constraint
	}
	if tp.constraint != c.noConstraintType {
		return tp.constraint
	}
	return nil
}

func (c *Checker) getConstraintOrUnknownFromTypeParameter(t *Type) *Type {
	result := c.getConstraintFromTypeParameter(t)
	return core.IfElse(result != nil, result, c.unknownType)
}

func (c *Checker) getInferredTypeParameterConstraint(t *Type, omitTypeReferences bool) *Type {
	return nil // !!!
}

func (c *Checker) getConstraintOfIndexedAccess(t *Type) *Type {
	if c.hasNonCircularBaseConstraint(t) {
		return c.getConstraintFromIndexedAccess(t)
	}
	return nil
}

func (c *Checker) getConstraintFromIndexedAccess(t *Type) *Type {
	return nil // !!!
}

func (c *Checker) getConstraintOfConditionalType(t *Type) *Type {
	if c.hasNonCircularBaseConstraint(t) {
		return c.getConstraintFromConditionalType(t)
	}
	return nil
}

func (c *Checker) getConstraintFromConditionalType(t *Type) *Type {
	return c.anyType // !!!
}

func (c *Checker) getDeclaredTypeOfClassOrInterface(symbol *ast.Symbol) *Type {
	links := c.declaredTypeLinks.get(symbol)
	if links.declaredType == nil {
		kind := core.IfElse(symbol.Flags&ast.SymbolFlagsClass != 0, ObjectFlagsClass, ObjectFlagsInterface)
		t := c.newObjectType(kind, symbol)
		links.declaredType = t
		outerTypeParameters := c.getOuterTypeParametersOfClassOrInterface(symbol)
		typeParameters := c.appendLocalTypeParametersOfClassOrInterfaceOrTypeAlias(outerTypeParameters, symbol)
		// A class or interface is generic if it has type parameters or a "this" type. We always give classes a "this" type
		// because it is not feasible to analyze all members to determine if the "this" type escapes the class (in particular,
		// property types inferred from initializers and method return types inferred from return statements are very hard
		// to exhaustively analyze). We give interfaces a "this" type if we can't definitely determine that they are free of
		// "this" references.
		if typeParameters != nil || kind == ObjectFlagsClass || !c.isThislessInterface(symbol) {
			t.objectFlags |= ObjectFlagsReference
			d := t.AsInterfaceType()
			d.thisType = c.newTypeParameter(symbol)
			d.thisType.AsTypeParameter().isThisType = true
			d.thisType.AsTypeParameter().constraint = t
			d.allTypeParameters = append(typeParameters, d.thisType)
			d.outerTypeParameterCount = len(outerTypeParameters)
			d.resolvedTypeArguments = d.TypeParameters()
			d.instantiations = make(map[string]*Type)
			d.instantiations[getTypeListKey(d.resolvedTypeArguments)] = t
			d.target = t
		}
	}
	return links.declaredType
}

/**
 * Returns true if the interface given by the symbol is free of "this" references.
 *
 * Specifically, the result is true if the interface itself contains no references
 * to "this" in its body, if all base types are interfaces,
 * and if none of the base interfaces have a "this" type.
 */
func (c *Checker) isThislessInterface(symbol *ast.Symbol) bool {
	for _, declaration := range symbol.Declarations {
		if ast.IsInterfaceDeclaration(declaration) {
			if declaration.Flags&ast.NodeFlagsContainsThis != 0 {
				return false
			}
			baseTypeNodes := getInterfaceBaseTypeNodes(declaration)
			for _, node := range baseTypeNodes {
				if isEntityNameExpression(node.Expression()) {
					baseSymbol := c.resolveEntityName(node.Expression(), ast.SymbolFlagsType, true /*ignoreErrors*/, false, nil)
					if baseSymbol == nil || baseSymbol.Flags&ast.SymbolFlagsInterface == 0 || c.getDeclaredTypeOfClassOrInterface(baseSymbol).AsInterfaceType().thisType != nil {
						return false
					}
				}
			}
		}
	}
	return true
}

type KeyBuilder struct {
	strings.Builder
}

var base64chars = []byte{
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
	'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
	'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
	'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '$', '%'}

func (b *KeyBuilder) WriteInt(value int) {
	for value != 0 {
		b.WriteByte(base64chars[value&0x3F])
		value >>= 6
	}
}

func (b *KeyBuilder) WriteSymbol(s *ast.Symbol) {
	b.WriteInt(int(getSymbolId(s)))
}

func (b *KeyBuilder) WriteType(t *Type) {
	b.WriteInt(int(t.id))
}

func (b *KeyBuilder) WriteTypes(types []*Type) {
	i := 0
	var tail bool
	for i < len(types) {
		startId := types[i].id
		count := 1
		for i+count < len(types) && types[i+count].id == startId+TypeId(count) {
			count++
		}
		if tail {
			b.WriteByte(',')
		}
		b.WriteInt(int(startId))
		if count > 1 {
			b.WriteByte(':')
			b.WriteInt(count)
		}
		i += count
		tail = true
	}
}

func (b *KeyBuilder) WriteAlias(alias *TypeAlias) {
	if alias != nil {
		b.WriteByte('@')
		b.WriteSymbol(alias.symbol)
		if len(alias.typeArguments) != 0 {
			b.WriteByte(':')
			b.WriteTypes(alias.typeArguments)
		}
	}
}

// writeTypeReference(A<T, number, U>) writes "111=0-12=1"
// where A.id=111 and number.id=12
// Returns true if any referenced type parameter was constrained
func (b *KeyBuilder) WriteTypeReference(ref *Type, ignoreConstraints bool, depth int) bool {
	var constrained bool
	typeParameters := make([]*Type, 0, 8)
	b.WriteType(ref)
	for _, t := range ref.AsTypeReference().resolvedTypeArguments {
		if t.flags&TypeFlagsTypeParameter != 0 {
			if ignoreConstraints || isUnconstrainedTypeParameter(t) {
				index := slices.Index(typeParameters, t)
				if index < 0 {
					index = len(typeParameters)
					typeParameters = append(typeParameters, t)
				}
				b.WriteByte('=')
				b.WriteInt(index)
				continue
			}
			constrained = true
		} else if depth < 4 && isTypeReferenceWithGenericArguments(t) {
			b.WriteByte('<')
			constrained = b.WriteTypeReference(t, ignoreConstraints, depth+1) || constrained
			b.WriteByte('>')
			continue
		}
		b.WriteByte('-')
		b.WriteType(t)
	}
	return constrained
}

func getTypeListKey(types []*Type) string {
	var b KeyBuilder
	b.WriteTypes(types)
	return b.String()
}

func getAliasKey(alias *TypeAlias) string {
	var b KeyBuilder
	b.WriteAlias(alias)
	return b.String()
}

func getUnionKey(types []*Type, origin *Type, alias *TypeAlias) string {
	var b KeyBuilder
	switch {
	case origin == nil:
		b.WriteTypes(types)
	case origin.flags&TypeFlagsUnion != 0:
		b.WriteByte('|')
		b.WriteTypes(origin.Types())
	case origin.flags&TypeFlagsIntersection != 0:
		b.WriteByte('&')
		b.WriteTypes(origin.Types())
	case origin.flags&TypeFlagsIndex != 0:
		// origin type id alone is insufficient, as `keyof x` may resolve to multiple WIP values while `x` is still resolving
		b.WriteByte('#')
		b.WriteType(origin)
		b.WriteByte('|')
		b.WriteTypes(types)
	default:
		panic("Unhandled case in getUnionId")
	}
	b.WriteAlias(alias)
	return b.String()
}

func getIntersectionKey(types []*Type, flags IntersectionFlags, alias *TypeAlias) string {
	var b KeyBuilder
	b.WriteTypes(types)
	if flags&IntersectionFlagsNoConstraintReduction == 0 {
		b.WriteAlias(alias)
	} else {
		b.WriteByte('*')
	}
	return b.String()
}

func getTupleKey(elementInfos []TupleElementInfo, readonly bool) string {
	var b KeyBuilder
	for _, e := range elementInfos {
		switch {
		case e.flags&ElementFlagsRequired != 0:
			b.WriteByte('#')
		case e.flags&ElementFlagsOptional != 0:
			b.WriteByte('?')
		case e.flags&ElementFlagsRest != 0:
			b.WriteByte('.')
		default:
			b.WriteByte('*')
		}
		if e.labeledDeclaration != nil {
			b.WriteInt(int(getNodeId(e.labeledDeclaration)))
		}
	}
	if readonly {
		b.WriteByte('!')
	}
	return b.String()
}

func getTypeAliasInstantiationKey(typeArguments []*Type, alias *TypeAlias) string {
	return getTypeInstantiationKey(typeArguments, alias, false)
}

func getTypeInstantiationKey(typeArguments []*Type, alias *TypeAlias, singleSignature bool) string {
	var b KeyBuilder
	b.WriteTypes(typeArguments)
	b.WriteAlias(alias)
	if singleSignature {
		b.WriteByte('!')
	}
	return b.String()
}

func getIndexedAccessKey(objectType *Type, indexType *Type, accessFlags AccessFlags, alias *TypeAlias) string {
	var b KeyBuilder
	b.WriteType(objectType)
	b.WriteByte(',')
	b.WriteType(indexType)
	b.WriteByte(',')
	b.WriteInt(int(accessFlags))
	b.WriteAlias(alias)
	return b.String()
}

func getTemplateTypeKey(texts []string, types []*Type) string {
	var b KeyBuilder
	b.WriteTypes(types)
	b.WriteByte('|')
	for i, s := range texts {
		if i != 0 {
			b.WriteByte(',')
		}
		b.WriteInt(len(s))
	}
	b.WriteByte('|')
	for _, s := range texts {
		b.WriteString(s)
	}
	return b.String()
}

func getRelationKey(source *Type, target *Type, intersectionState IntersectionState, isIdentity bool, ignoreConstraints bool) string {
	if isIdentity && source.id > target.id {
		source, target = target, source
	}
	var b KeyBuilder
	var constrained bool
	if isTypeReferenceWithGenericArguments(source) && isTypeReferenceWithGenericArguments(target) {
		constrained = b.WriteTypeReference(source, ignoreConstraints, 0)
		b.WriteByte(',')
		constrained = b.WriteTypeReference(target, ignoreConstraints, 0) || constrained
	} else {
		b.WriteType(source)
		b.WriteByte(',')
		b.WriteType(target)
	}
	if intersectionState != IntersectionStateNone {
		b.WriteByte(':')
		b.WriteInt(int(intersectionState))
	}
	if constrained {
		// We mark keys with type references that reference constrained type parameters such that we know
		// to obtain and look for a "broadest equivalent key" in the cache.
		b.WriteByte('*')
	}
	return b.String()
}

func isTypeReferenceWithGenericArguments(t *Type) bool {
	return isNonDeferredTypeReference(t) && core.Some(t.AsTypeReference().resolvedTypeArguments, func(t *Type) bool {
		return t.flags&TypeFlagsTypeParameter != 0 || isTypeReferenceWithGenericArguments(t)
	})
}

func isNonDeferredTypeReference(t *Type) bool {
	return t.objectFlags&ObjectFlagsReference != 0 && t.AsTypeReference().node == nil
}

// Return true if type parameter originates in an unconstrained declaration in a type parameter list
func isUnconstrainedTypeParameter(tp *Type) bool {
	target := tp.Target()
	if target == nil {
		target = tp
	}
	if target.symbol == nil {
		return false
	}
	for _, d := range target.symbol.Declarations {
		if ast.IsTypeParameterDeclaration(d) && (d.AsTypeParameter().Constraint != nil || ast.IsMappedTypeNode(d.Parent) || ast.IsInferTypeNode(d.Parent)) {
			return false
		}
	}
	return true
}

func (c *Checker) isNullOrUndefined(node *ast.Node) bool {
	expr := ast.SkipParentheses(node)
	switch expr.Kind {
	case ast.KindNullKeyword:
		return true
	case ast.KindIdentifier:
		return c.getResolvedSymbol(expr) == c.undefinedSymbol
	}
	return false
}

func (c *Checker) checkRightHandSideOfForOf(statement *ast.Node) *Type {
	return c.anyType // !!!
}

func (c *Checker) getTypeForBindingElement(declaration *ast.Node) *Type {
	return c.anyType // !!!
}

// Return the type implied by a binding pattern. This is the type implied purely by the binding pattern itself
// and without regard to its context (i.e. without regard any type annotation or initializer associated with the
// declaration in which the binding pattern is contained). For example, the implied type of [x, y] is [any, any]
// and the implied type of { x, y: z = 1 } is { x: any; y: number; }. The type implied by a binding pattern is
// used as the contextual type of an initializer associated with the binding pattern. Also, for a destructuring
// parameter with no type annotation or initializer, the type implied by the binding pattern becomes the type of
// the parameter.
func (c *Checker) getTypeFromBindingPattern(pattern *ast.Node, includePatternInType bool, reportErrors bool) *Type {
	return c.anyType // !!!
}

func (c *Checker) getTypeOfPrototypeProperty(prototype *ast.Symbol) *Type {
	return c.anyType // !!!
}

func (c *Checker) getWidenedTypeForAssignmentDeclaration(symbol *ast.Symbol, resolvedSymbol *ast.Symbol) *Type {
	return c.anyType // !!!
}

func (c *Checker) widenTypeForVariableLikeDeclaration(t *Type, declaration *ast.Node, reportErrors bool) *Type {
	if t != nil {
		return t
		// !!!
		// // TODO: If back compat with pre-3.0/4.0 libs isn't required, remove the following SymbolConstructor special case transforming `symbol` into `unique symbol`
		// if t.flags&TypeFlagsESSymbol != 0 && c.isGlobalSymbolConstructor(declaration.parent) {
		// 	t = c.getESSymbolLikeTypeForNode(declaration)
		// }
		// if reportErrors {
		// 	c.reportErrorsFromWidening(declaration, t)
		// }
		// // always widen a 'unique symbol' type if the type was created for a different declaration.
		// if t.flags&TypeFlagsUniqueESSymbol && (isBindingElement(declaration) || !declaration.type_) && t.symbol != c.getSymbolOfDeclaration(declaration) {
		// 	t = c.esSymbolType
		// }
		// return c.getWidenedType(t)
	}
	// Rest parameters default to type any[], other parameters default to type any
	if ast.IsParameter(declaration) && declaration.AsParameterDeclaration().DotDotDotToken != nil {
		t = c.anyArrayType
	} else {
		t = c.anyType
	}
	// Report implicit any errors unless this is a private property within an ambient declaration
	if reportErrors {
		if !declarationBelongsToPrivateAmbientMember(declaration) {
			c.reportImplicitAny(declaration, t, WideningKindNormal)
		}
	}
	return t
}

func (c *Checker) reportImplicitAny(declaration *ast.Node, t *Type, wideningKind WideningKind) {
	typeAsString := c.typeToString(c.getWidenedType(t))
	var diagnostic *diagnostics.Message
	switch declaration.Kind {
	case ast.KindBinaryExpression, ast.KindPropertyDeclaration, ast.KindPropertySignature:
		diagnostic = core.IfElse(c.noImplicitAny,
			diagnostics.Member_0_implicitly_has_an_1_type,
			diagnostics.Member_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage)
	case ast.KindParameter:
		param := declaration.AsParameterDeclaration()
		if ast.IsIdentifier(param.Name()) {
			name := param.Name().AsIdentifier()
			originalKeywordKind := scanner.IdentifierToKeywordKind(name)
			if (ast.IsCallSignatureDeclaration(declaration.Parent) || ast.IsMethodSignatureDeclaration(declaration.Parent) || ast.IsFunctionTypeNode(declaration.Parent)) &&
				slices.Contains(declaration.Parent.Parameters(), declaration) &&
				(ast.IsTypeNodeKind(originalKeywordKind) || c.resolveName(declaration, name.Text, ast.SymbolFlagsType, nil /*nameNotFoundMessage*/, true /*isUse*/, false /*excludeGlobals*/) != nil) {
				newName := fmt.Sprintf("arg%v", slices.Index(declaration.Parent.Parameters(), declaration))
				typeName := declarationNameToString(param.Name()) + core.IfElse(param.DotDotDotToken != nil, "[]", "")
				c.errorOrSuggestion(c.noImplicitAny, declaration, diagnostics.Parameter_has_a_name_but_no_type_Did_you_mean_0_Colon_1, newName, typeName)
				return
			}
		}
		switch {
		case param.DotDotDotToken != nil:
			if c.noImplicitAny {
				diagnostic = diagnostics.Rest_parameter_0_implicitly_has_an_any_type
			} else {
				diagnostic = diagnostics.Rest_parameter_0_implicitly_has_an_any_type_but_a_better_type_may_be_inferred_from_usage
			}
		case c.noImplicitAny:
			diagnostic = diagnostics.Parameter_0_implicitly_has_an_1_type
		default:
			diagnostic = diagnostics.Parameter_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage
		}
	case ast.KindBindingElement:
		diagnostic = diagnostics.Binding_element_0_implicitly_has_an_1_type
		if !c.noImplicitAny {
			// Don't issue a suggestion for binding elements since the codefix doesn't yet support them.
			return
		}
	case ast.KindFunctionDeclaration, ast.KindMethodDeclaration, ast.KindMethodSignature, ast.KindGetAccessor,
		ast.KindSetAccessor, ast.KindFunctionExpression, ast.KindArrowFunction:
		if c.noImplicitAny && declaration.Name() == nil {
			if wideningKind == WideningKindGeneratorYield {
				c.error(declaration, diagnostics.Generator_implicitly_has_yield_type_0_Consider_supplying_a_return_type_annotation, typeAsString)
			} else {
				c.error(declaration, diagnostics.Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type, typeAsString)
			}
			return
		}
		switch {
		case !c.noImplicitAny:
			diagnostic = diagnostics.X_0_implicitly_has_an_1_return_type_but_a_better_type_may_be_inferred_from_usage
		case wideningKind == WideningKindGeneratorYield:
			diagnostic = diagnostics.X_0_which_lacks_return_type_annotation_implicitly_has_an_1_yield_type
		default:
			diagnostic = diagnostics.X_0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type
		}
	case ast.KindMappedType:
		if c.noImplicitAny {
			c.error(declaration, diagnostics.Mapped_object_type_implicitly_has_an_any_template_type)
		}
		return
	default:
		if c.noImplicitAny {
			diagnostic = diagnostics.Variable_0_implicitly_has_an_1_type
		} else {
			diagnostic = diagnostics.Variable_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage
		}
	}
	c.errorOrSuggestion(c.noImplicitAny, declaration, diagnostic, declarationNameToString(getNameOfDeclaration(declaration)), typeAsString)
}

func (c *Checker) getWidenedType(t *Type) *Type {
	return t // !!!
}

func (c *Checker) getTypeOfEnumMember(symbol *ast.Symbol) *Type {
	links := c.valueSymbolLinks.get(symbol)
	if links.resolvedType == nil {
		links.resolvedType = c.getDeclaredTypeOfEnumMember(symbol)
	}
	return links.resolvedType
}

func (c *Checker) addOptionalityEx(t *Type, isProperty bool, isOptional bool) *Type {
	if c.strictNullChecks && isOptional {
		return c.getOptionalType(t, isProperty)
	}
	return t
}

func (c *Checker) getOptionalType(t *Type, isProperty bool) *Type {
	// !!! Debug.assert(c.strictNullChecks)
	missingOrUndefined := core.IfElse(isProperty, c.undefinedOrMissingType, c.undefinedType)
	if t == missingOrUndefined || t.flags&TypeFlagsUnion != 0 && t.Types()[0] == missingOrUndefined {
		return t
	}
	return c.getUnionType([]*Type{t, missingOrUndefined})
}

func (c *Checker) getNonNullableType(t *Type) *Type {
	if c.strictNullChecks {
		return c.getAdjustedTypeWithFacts(t, TypeFactsNEUndefinedOrNull)
	}
	return t
}

func (c *Checker) isNullableType(t *Type) bool {
	return c.hasTypeFacts(t, TypeFactsIsUndefinedOrNull)
}

func (c *Checker) getNonNullableTypeIfNeeded(t *Type) *Type {
	if c.isNullableType(t) {
		return c.getNonNullableType(t)
	}
	return t
}

func (c *Checker) getDeclarationNodeFlagsFromSymbol(s *ast.Symbol) ast.NodeFlags {
	if s.ValueDeclaration != nil {
		return c.getCombinedNodeFlagsCached(s.ValueDeclaration)
	}
	return ast.NodeFlagsNone
}

func (c *Checker) getCombinedNodeFlagsCached(node *ast.Node) ast.NodeFlags {
	// we hold onto the last node and result to speed up repeated lookups against the same node.
	if c.lastGetCombinedNodeFlagsNode == node {
		return c.lastGetCombinedNodeFlagsResult
	}
	c.lastGetCombinedNodeFlagsNode = node
	c.lastGetCombinedNodeFlagsResult = getCombinedNodeFlags(node)
	return c.lastGetCombinedNodeFlagsResult
}

func (c *Checker) isVarConstLike(node *ast.Node) bool {
	blockScopeKind := c.getCombinedNodeFlagsCached(node) & ast.NodeFlagsBlockScoped
	return blockScopeKind == ast.NodeFlagsConst || blockScopeKind == ast.NodeFlagsUsing || blockScopeKind == ast.NodeFlagsAwaitUsing
}

func (c *Checker) getEffectivePropertyNameForPropertyNameNode(node *ast.PropertyName) (string, bool) {
	name := getPropertyNameForPropertyNameNode(node)
	switch {
	case name != InternalSymbolNameMissing:
		return name, true
	case ast.IsComputedPropertyName(node):
		return c.tryGetNameFromType(c.getTypeOfExpression(node.Expression()))
	}
	return "", false
}

func (c *Checker) tryGetNameFromType(t *Type) (name string, ok bool) {
	switch {
	case t.flags&TypeFlagsUniqueESSymbol != 0:
		return t.AsUniqueESSymbolType().name, true
	case t.flags&TypeFlagsStringLiteral != 0:
		s := t.AsLiteralType().value.(string)
		return s, true
	case t.flags&TypeFlagsNumberLiteral != 0:
		s := stringutil.FromNumber(t.AsLiteralType().value.(float64))
		return s, true
	default:
		return "", false
	}
}

func (c *Checker) getCombinedModifierFlagsCached(node *ast.Node) ast.ModifierFlags {
	// we hold onto the last node and result to speed up repeated lookups against the same node.
	if c.lastGetCombinedModifierFlagsNode == node {
		return c.lastGetCombinedModifierFlagsResult
	}
	c.lastGetCombinedModifierFlagsNode = node
	c.lastGetCombinedModifierFlagsResult = getCombinedModifierFlags(node)
	return c.lastGetCombinedModifierFlagsResult
}

/**
 * Push an entry on the type resolution stack. If an entry with the given target and the given property name
 * is already on the stack, and no entries in between already have a type, then a circularity has occurred.
 * In this case, the result values of the existing entry and all entries pushed after it are changed to false,
 * and the value false is returned. Otherwise, the new entry is just pushed onto the stack, and true is returned.
 * In order to see if the same query has already been done before, the target object and the propertyName both
 * must match the one passed in.
 *
 * @param target The symbol, type, or signature whose type is being queried
 * @param propertyName The property name that should be used to query the target for its type
 */
func (c *Checker) pushTypeResolution(target TypeSystemEntity, propertyName TypeSystemPropertyName) bool {
	resolutionCycleStartIndex := c.findResolutionCycleStartIndex(target, propertyName)
	if resolutionCycleStartIndex >= 0 {
		// A cycle was found
		for i := resolutionCycleStartIndex; i < len(c.typeResolutions); i++ {
			c.typeResolutions[i].result = false
		}
		return false
	}
	c.typeResolutions = append(c.typeResolutions, TypeResolution{target: target, propertyName: propertyName, result: true})
	return true
}

/**
 * Pop an entry from the type resolution stack and return its associated result value. The result value will
 * be true if no circularities were detected, or false if a circularity was found.
 */
func (c *Checker) popTypeResolution() bool {
	lastIndex := len(c.typeResolutions) - 1
	result := c.typeResolutions[lastIndex].result
	c.typeResolutions = c.typeResolutions[:lastIndex]
	return result
}

func (c *Checker) findResolutionCycleStartIndex(target TypeSystemEntity, propertyName TypeSystemPropertyName) int {
	for i := len(c.typeResolutions) - 1; i >= c.resolutionStart; i-- {
		resolution := &c.typeResolutions[i]
		if c.typeResolutionHasProperty(resolution) {
			return -1
		}
		if resolution.target == target && resolution.propertyName == propertyName {
			return i
		}
	}
	return -1
}

func (c *Checker) typeResolutionHasProperty(r *TypeResolution) bool {
	switch r.propertyName {
	case TypeSystemPropertyNameType:
		return c.valueSymbolLinks.get(r.target.(*ast.Symbol)).resolvedType != nil
	case TypeSystemPropertyNameDeclaredType:
		return c.typeAliasLinks.get(r.target.(*ast.Symbol)).declaredType != nil
	case TypeSystemPropertyNameResolvedTypeArguments:
		return r.target.(*Type).AsTypeReference().resolvedTypeArguments != nil
	case TypeSystemPropertyNameResolvedBaseTypes:
		return r.target.(*Type).AsInterfaceType().baseTypesResolved
	case TypeSystemPropertyNameResolvedBaseConstructorType:
		return r.target.(*Type).AsInterfaceType().resolvedBaseConstructorType != nil
	case TypeSystemPropertyNameResolvedReturnType:
		return r.target.(*Signature).resolvedReturnType != nil
	case TypeSystemPropertyNameResolvedBaseConstraint:
		return r.target.(*Type).AsConstrainedType().resolvedBaseConstraint != nil
		// !!!
		// case TypeSystemPropertyNameWriteType:
		// 	return !!c.getSymbolLinks(target.(Symbol)).writeType
		// case TypeSystemPropertyNameParameterInitializerContainsUndefined:
		// 	return c.getNodeLinks(target.(ParameterDeclaration)).parameterInitializerContainsUndefined != nil
	}
	panic("Unhandled case in typeResolutionHasProperty")
}

func (c *Checker) reportCircularityError(symbol *ast.Symbol) *Type {
	declaration := symbol.ValueDeclaration
	// Check if variable has type annotation that circularly references the variable itself
	if declaration != nil {
		if declaration.Type() != nil {
			c.error(symbol.ValueDeclaration, diagnostics.X_0_is_referenced_directly_or_indirectly_in_its_own_type_annotation, c.symbolToString(symbol))
			return c.errorType
		}
		// Check if variable has initializer that circularly references the variable itself
		if c.noImplicitAny && (declaration.Kind != ast.KindParameter || declaration.AsParameterDeclaration().Initializer != nil) {
			c.error(symbol.ValueDeclaration, diagnostics.X_0_implicitly_has_type_any_because_it_does_not_have_a_type_annotation_and_is_referenced_directly_or_indirectly_in_its_own_initializer, c.symbolToString(symbol))
		}
	} else if symbol.Flags&ast.SymbolFlagsAlias != 0 {
		node := c.getDeclarationOfAliasSymbol(symbol)
		if node != nil {
			c.error(node, diagnostics.Circular_definition_of_import_alias_0, c.symbolToString(symbol))
		}
	}
	// Circularities could also result from parameters in function expressions that end up
	// having themselves as contextual types following type argument inference. In those cases
	// we have already reported an implicit any error so we don't report anything here.
	return c.anyType
}

func (c *Checker) getPropertiesOfType(t *Type) []*ast.Symbol {
	t = c.getReducedApparentType(t)
	if t.flags&TypeFlagsUnionOrIntersection != 0 {
		return c.getPropertiesOfUnionOrIntersectionType(t)
	}
	return c.getPropertiesOfObjectType(t)
}

func (c *Checker) getPropertiesOfObjectType(t *Type) []*ast.Symbol {
	if t.flags&TypeFlagsObject != 0 {
		return c.resolveStructuredTypeMembers(t).properties
	}
	return nil
}

func (c *Checker) getPropertiesOfUnionOrIntersectionType(t *Type) []*ast.Symbol {
	d := t.AsUnionOrIntersectionType()
	if d.resolvedProperties == nil {
		var checked core.Set[string]
		props := []*ast.Symbol{}
		for _, current := range d.types {
			for _, prop := range c.getPropertiesOfType(current) {
				if !checked.Has(prop.Name) {
					checked.Add(prop.Name)
					combinedProp := c.getPropertyOfUnionOrIntersectionType(t, prop.Name, t.flags&TypeFlagsIntersection != 0 /*skipObjectFunctionPropertyAugment*/)
					if combinedProp != nil {
						props = append(props, combinedProp)
					}
				}
			}
			// The properties of a union type are those that are present in all constituent types, so
			// we only need to check the properties of the first type without index signature
			if t.flags&TypeFlagsUnion != 0 && len(c.getIndexInfosOfType(current)) == 0 {
				break
			}
		}
		d.resolvedProperties = props
	}
	return d.resolvedProperties
}

func (c *Checker) getPropertyOfType(t *Type, name string) *ast.Symbol {
	return c.getPropertyOfTypeEx(t, name, false /*skipObjectFunctionPropertyAugment*/, false /*includeTypeOnlyMembers*/)
}

/**
 * Return the symbol for the property with the given name in the given type. Creates synthetic union properties when
 * necessary, maps primitive types and type parameters are to their apparent types, and augments with properties from
 * Object and Function as appropriate.
 *
 * @param type a type to look up property from
 * @param name a name of property to look up in a given type
 */
func (c *Checker) getPropertyOfTypeEx(t *Type, name string, skipObjectFunctionPropertyAugment bool, includeTypeOnlyMembers bool) *ast.Symbol {
	t = c.getReducedApparentType(t)
	switch {
	case t.flags&TypeFlagsObject != 0:
		resolved := c.resolveStructuredTypeMembers(t)
		symbol := resolved.members[name]
		if symbol != nil {
			if !includeTypeOnlyMembers && t.symbol != nil && t.symbol.Flags&ast.SymbolFlagsValueModule != 0 && c.moduleSymbolLinks.get(t.symbol).typeOnlyExportStarMap[name] != nil {
				// If this is the type of a module, `resolved.members.get(name)` might have effectively skipped over
				// an `export type * from './foo'`, leaving `symbolIsValue` unable to see that the symbol is being
				// viewed through a type-only export.
				return nil
			}
			if c.symbolIsValueEx(symbol, includeTypeOnlyMembers) {
				return symbol
			}
		}
		if skipObjectFunctionPropertyAugment {
			return nil
		}
		var functionType *Type
		switch {
		case t == c.anyFunctionType:
			functionType = c.globalFunctionType
		case len(resolved.CallSignatures()) != 0:
			functionType = c.globalCallableFunctionType
		case len(resolved.ConstructSignatures()) != 0:
			functionType = c.globalNewableFunctionType
		}
		if functionType != nil {
			symbol = c.getPropertyOfObjectType(functionType, name)
			if symbol != nil {
				return symbol
			}
		}
		return c.getPropertyOfObjectType(c.globalObjectType, name)
	case t.flags&TypeFlagsIntersection != 0:
		prop := c.getPropertyOfUnionOrIntersectionType(t, name, true /*skipObjectFunctionPropertyAugment*/)
		if prop != nil {
			return prop
		}
		if !skipObjectFunctionPropertyAugment {
			return c.getPropertyOfUnionOrIntersectionType(t, name, skipObjectFunctionPropertyAugment)
		}
		return nil
	case t.flags&TypeFlagsUnion != 0:
		return c.getPropertyOfUnionOrIntersectionType(t, name, skipObjectFunctionPropertyAugment)
	}
	return nil
}

// Return the type of the given property in the given type, or nil if no such property exists
func (c *Checker) getTypeOfPropertyOfType(t *Type, name string) *Type {
	prop := c.getPropertyOfType(t, name)
	if prop != nil {
		return c.getTypeOfSymbol(prop)
	}
	return nil
}

func (c *Checker) getSignaturesOfType(t *Type, kind SignatureKind) []*Signature {
	if t.flags&TypeFlagsStructuredType == 0 {
		return nil
	}
	resolved := c.resolveStructuredTypeMembers(t)
	if kind == SignatureKindCall {
		return resolved.signatures[:resolved.callSignatureCount]
	}
	return resolved.signatures[resolved.callSignatureCount:]
}

func (c *Checker) getIndexInfosOfType(t *Type) []*IndexInfo {
	return c.getIndexInfosOfStructuredType(c.getReducedApparentType(t))
}

func (c *Checker) getIndexInfosOfStructuredType(t *Type) []*IndexInfo {
	if t.flags&TypeFlagsStructuredType != 0 {
		return c.resolveStructuredTypeMembers(t).indexInfos
	}
	return nil
}

// Return the indexing info of the given kind in the given type. Creates synthetic union index types when necessary and
// maps primitive types and type parameters are to their apparent types.
func (c *Checker) getIndexInfoOfType(t *Type, keyType *Type) *IndexInfo {
	return findIndexInfo(c.getIndexInfosOfType(t), keyType)
}

// Return the index type of the given kind in the given type. Creates synthetic union index types when necessary and
// maps primitive types and type parameters are to their apparent types.
func (c *Checker) getIndexTypeOfType(t *Type, keyType *Type) *Type {
	info := c.getIndexInfoOfType(t, keyType)
	if info != nil {
		return info.valueType
	}
	return nil
}

func (c *Checker) getIndexTypeOfTypeEx(t *Type, keyType *Type, defaultType *Type) *Type {
	if result := c.getIndexTypeOfType(t, keyType); result != nil {
		return result
	}
	return defaultType
}

func (c *Checker) getApplicableIndexInfo(t *Type, keyType *Type) *IndexInfo {
	return c.findApplicableIndexInfo(c.getIndexInfosOfType(t), keyType)
}

func (c *Checker) getApplicableIndexInfoForName(t *Type, name string) *IndexInfo {
	if isLateBoundName(name) {
		return c.getApplicableIndexInfo(t, c.esSymbolType)
	}
	return c.getApplicableIndexInfo(t, c.getStringLiteralType(name))
}

func (c *Checker) findApplicableIndexInfo(indexInfos []*IndexInfo, keyType *Type) *IndexInfo {
	// Index signatures for type 'string' are considered only when no other index signatures apply.
	var stringIndexInfo *IndexInfo
	applicableInfos := make([]*IndexInfo, 0, 8)
	for _, info := range indexInfos {
		if info.keyType == c.stringType {
			stringIndexInfo = info
		} else if c.isApplicableIndexType(keyType, info.keyType) {
			applicableInfos = append(applicableInfos, info)
		}
	}
	// When more than one index signature is applicable we create a synthetic IndexInfo. Instead of computing
	// the intersected key type, we just use unknownType for the key type as nothing actually depends on the
	// keyType property of the returned IndexInfo.
	switch len(applicableInfos) {
	case 0:
		if stringIndexInfo != nil && c.isApplicableIndexType(keyType, c.stringType) {
			return stringIndexInfo
		}
		return nil
	case 1:
		return applicableInfos[0]
	default:
		isReadonly := true
		types := make([]*Type, len(applicableInfos))
		for i, info := range applicableInfos {
			types[i] = info.valueType
			if !info.isReadonly {
				isReadonly = false
			}
		}
		return c.newIndexInfo(c.unknownType, c.getIntersectionType(types), isReadonly, nil)
	}
}

func (c *Checker) isApplicableIndexType(source *Type, target *Type) bool {
	// A 'string' index signature applies to types assignable to 'string' or 'number', and a 'number' index
	// signature applies to types assignable to 'number', `${number}` and numeric string literal types.
	return c.isTypeAssignableTo(source, target) ||
		target == c.stringType && c.isTypeAssignableTo(source, c.numberType) ||
		target == c.numberType && (source == c.numericStringType || source.flags&TypeFlagsStringLiteral != 0 && isNumericLiteralName(source.AsLiteralType().value.(string)))
}

func (c *Checker) resolveStructuredTypeMembers(t *Type) *StructuredType {
	if t.objectFlags&ObjectFlagsMembersResolved == 0 {
		switch {
		case t.flags&TypeFlagsObject != 0:
			switch {
			case t.objectFlags&ObjectFlagsReference != 0:
				c.resolveTypeReferenceMembers(t)
			case t.objectFlags&ObjectFlagsClassOrInterface != 0:
				c.resolveClassOrInterfaceMembers(t)
			case t.objectFlags&ObjectFlagsReverseMapped != 0:
				c.resolveReverseMappedTypeMembers(t)
			case t.objectFlags&ObjectFlagsAnonymous != 0:
				c.resolveAnonymousTypeMembers(t)
			case t.objectFlags&ObjectFlagsMapped != 0:
				c.resolveMappedTypeMembers(t)
			default:
				panic("Unhandled case in resolveStructuredTypeMembers")
			}
		case t.flags&TypeFlagsUnion != 0:
			c.resolveUnionTypeMembers(t)
		case t.flags&TypeFlagsIntersection != 0:
			c.resolveIntersectionTypeMembers(t)
		default:
			panic("Unhandled case in resolveStructuredTypeMembers")
		}
	}
	return t.AsStructuredType()
}

func (c *Checker) resolveClassOrInterfaceMembers(t *Type) {
	c.resolveObjectTypeMembers(t, t, nil, nil)
}

func (c *Checker) resolveTypeReferenceMembers(t *Type) {
	source := t.Target()
	typeParameters := source.AsInterfaceType().allTypeParameters
	typeArguments := c.getTypeArguments(t)
	paddedTypeArguments := typeArguments
	if len(typeArguments) == len(typeParameters)-1 {
		paddedTypeArguments = core.Concatenate(typeArguments, []*Type{t})
	}
	c.resolveObjectTypeMembers(t, source, typeParameters, paddedTypeArguments)
}

func (c *Checker) resolveObjectTypeMembers(t *Type, source *Type, typeParameters []*Type, typeArguments []*Type) {
	var mapper *TypeMapper
	var members ast.SymbolTable
	var callSignatures []*Signature
	var constructSignatures []*Signature
	var indexInfos []*IndexInfo
	var instantiated bool
	resolved := c.resolveDeclaredMembers(source)
	if slices.Equal(typeParameters, typeArguments) {
		members = resolved.declaredMembers
		callSignatures = resolved.declaredCallSignatures
		constructSignatures = resolved.declaredConstructSignatures
		indexInfos = resolved.declaredIndexInfos
	} else {
		instantiated = true
		mapper = newTypeMapper(typeParameters, typeArguments)
		members = c.instantiateSymbolTable(resolved.declaredMembers, mapper, len(typeParameters) == 1 /*mappingThisOnly*/)
		callSignatures = c.instantiateSignatures(resolved.declaredCallSignatures, mapper)
		constructSignatures = c.instantiateSignatures(resolved.declaredConstructSignatures, mapper)
		indexInfos = c.instantiateIndexInfos(resolved.declaredIndexInfos, mapper)
	}
	baseTypes := c.getBaseTypes(source)
	if len(baseTypes) != 0 {
		if !instantiated {
			members = maps.Clone(members)
		}
		c.setStructuredTypeMembers(t, members, callSignatures, constructSignatures, indexInfos)
		thisArgument := core.LastOrNil(typeArguments)
		for _, baseType := range baseTypes {
			instantiatedBaseType := baseType
			if thisArgument != nil {
				instantiatedBaseType = c.getTypeWithThisArgument(c.instantiateType(baseType, mapper), thisArgument, false /*needsApparentType*/)
			}
			members = c.addInheritedMembers(members, c.getPropertiesOfType(instantiatedBaseType))
			callSignatures = core.Concatenate(callSignatures, c.getSignaturesOfType(instantiatedBaseType, SignatureKindCall))
			constructSignatures = core.Concatenate(constructSignatures, c.getSignaturesOfType(instantiatedBaseType, SignatureKindConstruct))
			var inheritedIndexInfos []*IndexInfo
			if instantiatedBaseType != c.anyType {
				inheritedIndexInfos = c.getIndexInfosOfType(instantiatedBaseType)
			} else {
				inheritedIndexInfos = []*IndexInfo{{keyType: c.stringType, valueType: c.anyType}}
			}
			indexInfos = core.Concatenate(indexInfos, core.Filter(inheritedIndexInfos, func(info *IndexInfo) bool {
				return findIndexInfo(indexInfos, info.keyType) != nil
			}))
		}
	}
	c.setStructuredTypeMembers(t, members, callSignatures, constructSignatures, indexInfos)
}

func findIndexInfo(indexInfos []*IndexInfo, keyType *Type) *IndexInfo {
	for _, info := range indexInfos {
		if info.keyType == keyType {
			return info
		}
	}
	return nil
}

func (c *Checker) getBaseTypes(t *Type) []*Type {
	data := t.AsInterfaceType()
	if !data.baseTypesResolved {
		if !c.pushTypeResolution(t, TypeSystemPropertyNameResolvedBaseTypes) {
			return data.resolvedBaseTypes
		}
		switch {
		case t.objectFlags&ObjectFlagsTuple != 0:
			data.resolvedBaseTypes = []*Type{c.getTupleBaseType(t)}
		case t.symbol.Flags&(ast.SymbolFlagsClass|ast.SymbolFlagsInterface) != 0:
			if t.symbol.Flags&ast.SymbolFlagsClass != 0 {
				c.resolveBaseTypesOfClass(t)
			}
			if t.symbol.Flags&ast.SymbolFlagsInterface != 0 {
				c.resolveBaseTypesOfInterface(t)
			}
		default:
			panic("Unhandled case in getBaseTypes")
		}
		if !c.popTypeResolution() && t.symbol.Declarations != nil {
			for _, declaration := range t.symbol.Declarations {
				if ast.IsClassDeclaration(declaration) || ast.IsInterfaceDeclaration(declaration) {
					c.reportCircularBaseType(declaration, t)
				}
			}
		}
		data.baseTypesResolved = true
	}
	return data.resolvedBaseTypes
}

func (c *Checker) getTupleBaseType(t *Type) *Type {
	typeParameters := t.AsTupleType().TypeParameters()
	elementInfos := t.AsTupleType().elementInfos
	elementTypes := make([]*Type, len(typeParameters))
	for i, tp := range typeParameters {
		if elementInfos[i].flags&ElementFlagsVariadic != 0 {
			elementTypes[i] = c.getIndexedAccessType(tp, c.numberType)
		} else {
			elementTypes[i] = tp
		}
	}
	return c.createArrayTypeEx(c.getUnionType(elementTypes), t.AsTupleType().readonly)
}

func (c *Checker) resolveBaseTypesOfClass(t *Type) {
	baseConstructorType := c.getApparentType(c.getBaseConstructorTypeOfClass(t))
	if baseConstructorType.flags&(TypeFlagsObject|TypeFlagsIntersection|TypeFlagsAny) == 0 {
		return
	}
	baseTypeNode := getBaseTypeNodeOfClass(t)
	var baseType *Type
	var originalBaseType *Type
	if baseConstructorType.symbol != nil {
		originalBaseType = c.getDeclaredTypeOfSymbol(baseConstructorType.symbol)
	}
	if baseConstructorType.symbol != nil && baseConstructorType.symbol.Flags&ast.SymbolFlagsClass != 0 && c.areAllOuterTypeParametersApplied(originalBaseType) {
		// When base constructor type is a class with no captured type arguments we know that the constructors all have the same type parameters as the
		// class and all return the instance type of the class. There is no need for further checks and we can apply the
		// type arguments in the same manner as a type reference to get the same error reporting experience.
		baseType = c.getTypeFromClassOrInterfaceReference(baseTypeNode, baseConstructorType.symbol)
	} else if baseConstructorType.flags&TypeFlagsAny != 0 {
		baseType = baseConstructorType
	} else {
		// The class derives from a "class-like" constructor function, check that we have at least one construct signature
		// with a matching number of type parameters and use the return type of the first instantiated signature. Elsewhere
		// we check that all instantiated signatures return the same type.
		constructors := c.getInstantiatedConstructorsForTypeArguments(baseConstructorType, baseTypeNode.TypeArguments(), baseTypeNode)
		if len(constructors) == 0 {
			c.error(baseTypeNode.Expression(), diagnostics.No_base_constructor_has_the_specified_number_of_type_arguments)
			return
		}
		baseType = c.getReturnTypeOfSignature(constructors[0])
	}
	if c.isErrorType(baseType) {
		return
	}
	reducedBaseType := c.getReducedType(baseType)
	if !c.isValidBaseType(reducedBaseType) {
		diagnostic := NewDiagnosticForNode(baseTypeNode.Expression(), diagnostics.Base_constructor_return_type_0_is_not_an_object_type_or_intersection_of_object_types_with_statically_known_members, c.typeToString(reducedBaseType))
		diagnostic.AddMessageChain(c.elaborateNeverIntersection(nil, baseType))
		c.diagnostics.add(diagnostic)
		return
	}
	if t == reducedBaseType || c.hasBaseType(reducedBaseType, t) {
		c.error(t.symbol.ValueDeclaration, diagnostics.Type_0_recursively_references_itself_as_a_base_type, c.typeToString(t))
		return
	}
	// !!! This logic is suspicious. We really shouldn't be un-resolving members after they've been resolved.
	// if t.resolvedBaseTypes == resolvingEmptyArray {
	// 	// Circular reference, likely through instantiation of default parameters
	// 	// (otherwise there'd be an error from hasBaseType) - this is fine, but `.members` should be reset
	// 	// as `getIndexedAccessType` via `instantiateType` via `getTypeFromClassOrInterfaceReference` forces a
	// 	// partial instantiation of the members without the base types fully resolved
	// 	t.members = nil
	// }
	t.AsInterfaceType().resolvedBaseTypes = []*Type{reducedBaseType}
}

func getBaseTypeNodeOfClass(t *Type) *ast.Node {
	decl := getClassLikeDeclarationOfSymbol(t.symbol)
	if decl != nil {
		return getClassExtendsHeritageElement(decl)
	}
	return nil
}

func (c *Checker) getInstantiatedConstructorsForTypeArguments(t *Type, typeArgumentNodes []*ast.Node, location *ast.Node) []*Signature {
	signatures := c.getConstructorsForTypeArguments(t, typeArgumentNodes, location)
	typeArguments := core.Map(typeArgumentNodes, c.getTypeFromTypeNode)
	return core.SameMap(signatures, func(sig *Signature) *Signature {
		if len(sig.typeParameters) != 0 {
			return c.getSignatureInstantiation(sig, typeArguments, nil)
		}
		return sig
	})
}

func (c *Checker) getConstructorsForTypeArguments(t *Type, typeArgumentNodes []*ast.Node, location *ast.Node) []*Signature {
	typeArgCount := len(typeArgumentNodes)
	return core.Filter(c.getSignaturesOfType(t, SignatureKindConstruct), func(sig *Signature) bool {
		return typeArgCount >= c.getMinTypeArgumentCount(sig.typeParameters) && typeArgCount <= len(sig.typeParameters)
	})
}

func (c *Checker) getSignatureInstantiation(sig *Signature, typeArguments []*Type, inferredTypeParameters []*Type) *Signature {
	instantiatedSignature := c.getSignatureInstantiationWithoutFillingInTypeArguments(sig, c.fillMissingTypeArguments(typeArguments, sig.typeParameters, c.getMinTypeArgumentCount(sig.typeParameters)))
	if len(inferredTypeParameters) != 0 {
		returnSignature := c.getSingleCallOrConstructSignature(c.getReturnTypeOfSignature(instantiatedSignature))
		if returnSignature != nil {
			newReturnSignature := c.cloneSignature(returnSignature)
			newReturnSignature.typeParameters = inferredTypeParameters
			newInstantiatedSignature := c.cloneSignature(instantiatedSignature)
			newInstantiatedSignature.resolvedReturnType = c.getOrCreateTypeFromSignature(newReturnSignature, nil)
			return newInstantiatedSignature
		}
	}
	return instantiatedSignature
}

func (c *Checker) cloneSignature(sig *Signature) *Signature {
	result := c.newSignature(sig.flags&SignatureFlagsPropagatingFlags, sig.declaration, sig.typeParameters, sig.thisParameter, sig.parameters, nil, nil, int(sig.minArgumentCount))
	result.target = sig.target
	result.mapper = sig.mapper
	result.composite = sig.composite
	return result
}

func (c *Checker) getSignatureInstantiationWithoutFillingInTypeArguments(sig *Signature, typeArguments []*Type) *Signature {
	key := CachedSignatureKey{sig: sig, key: getTypeListKey(typeArguments)}
	instantiation := c.cachedSignatures[key]
	if instantiation == nil {
		instantiation = c.createSignatureInstantiation(sig, typeArguments)
		c.cachedSignatures[key] = instantiation
	}
	return instantiation
}

func (c *Checker) createSignatureInstantiation(sig *Signature, typeArguments []*Type) *Signature {
	return c.instantiateSignatureEx(sig, c.createSignatureTypeMapper(sig, typeArguments), true /*eraseTypeParameters*/)
}

func (c *Checker) createSignatureTypeMapper(sig *Signature, typeArguments []*Type) *TypeMapper {
	return newTypeMapper(c.getTypeParametersForMapper(sig), typeArguments)
}

func (c *Checker) getTypeParametersForMapper(sig *Signature) []*Type {
	return core.SameMap(sig.typeParameters, func(tp *Type) *Type { return c.instantiateType(tp, tp.Mapper()) })
}

// If type has a single call signature and no other members, return that signature. Otherwise, return nil.
func (c *Checker) getSingleCallSignature(t *Type) *Signature {
	return c.getSingleSignature(t, SignatureKindCall, false /*allowMembers*/)
}

func (c *Checker) getSingleCallOrConstructSignature(t *Type) *Signature {
	callSig := c.getSingleSignature(t, SignatureKindCall, false /*allowMembers*/)
	if callSig != nil {
		return callSig
	}
	return c.getSingleSignature(t, SignatureKindConstruct, false /*allowMembers*/)
}

func (c *Checker) getSingleSignature(t *Type, kind SignatureKind, allowMembers bool) *Signature {
	if t.flags&TypeFlagsObject != 0 {
		resolved := c.resolveStructuredTypeMembers(t)
		if allowMembers || len(resolved.properties) == 0 && len(resolved.indexInfos) == 0 {
			if kind == SignatureKindCall && len(resolved.CallSignatures()) == 1 && len(resolved.ConstructSignatures()) == 0 {
				return resolved.CallSignatures()[0]
			}
			if kind == SignatureKindConstruct && len(resolved.ConstructSignatures()) == 1 && len(resolved.CallSignatures()) == 0 {
				return resolved.ConstructSignatures()[0]
			}
		}
	}
	return nil
}

func (c *Checker) getOrCreateTypeFromSignature(sig *Signature, outerTypeParameters []*Type) *Type {
	// There are two ways to declare a construct signature, one is by declaring a class constructor
	// using the constructor keyword, and the other is declaring a bare construct signature in an
	// object type literal or interface (using the new keyword). Each way of declaring a constructor
	// will result in a different declaration kind.
	if sig.isolatedSignatureType == nil {
		var kind ast.Kind
		if sig.declaration != nil {
			kind = sig.declaration.Kind
		}
		// If declaration is undefined, it is likely to be the signature of the default constructor.
		isConstructor := kind == ast.KindUnknown || kind == ast.KindConstructor || kind == ast.KindConstructSignature || kind == ast.KindConstructorType
		// The type must have a symbol with a `Function` flag and a declaration in order to be correctly flagged as possibly containing
		// type variables by `couldContainTypeVariables`
		t := c.newObjectType(ObjectFlagsAnonymous|ObjectFlagsSingleSignatureType, c.newSymbol(ast.SymbolFlagsFunction, InternalSymbolNameFunction))
		if sig.declaration != nil && !ast.NodeIsSynthesized(sig.declaration) {
			t.symbol.Declarations = []*ast.Node{sig.declaration}
			t.symbol.ValueDeclaration = sig.declaration
		}
		if outerTypeParameters == nil && sig.declaration != nil {
			outerTypeParameters = c.getOuterTypeParameters(sig.declaration, true /*includeThisTypes*/)
		}
		t.AsSingleSignatureType().outerTypeParameters = outerTypeParameters
		if isConstructor {
			c.setStructuredTypeMembers(t, nil, nil, []*Signature{sig}, nil)
		} else {
			c.setStructuredTypeMembers(t, nil, []*Signature{sig}, nil, nil)
		}
		sig.isolatedSignatureType = t
	}
	return sig.isolatedSignatureType
}

func (c *Checker) getErasedSignature(signature *Signature) *Signature {
	if len(signature.typeParameters) == 0 {
		return signature
	}
	key := CachedSignatureKey{sig: signature, key: "-"}
	erased := c.cachedSignatures[key]
	if erased == nil {
		erased = c.instantiateSignatureEx(signature, newArrayToSingleTypeMapper(signature.typeParameters, c.anyType), true /*eraseTypeParameters*/)
		c.cachedSignatures[key] = erased
	}
	return erased
}

func (c *Checker) getCanonicalSignature(signature *Signature) *Signature {
	if len(signature.typeParameters) == 0 {
		return signature
	}
	key := CachedSignatureKey{sig: signature, key: "*"}
	canonical := c.cachedSignatures[key]
	if canonical == nil {
		canonical = c.createCanonicalSignature(signature)
		c.cachedSignatures[key] = canonical
	}
	return canonical
}

func (c *Checker) createCanonicalSignature(signature *Signature) *Signature {
	// Create an instantiation of the signature where each unconstrained type parameter is replaced with
	// its original. When a generic class or interface is instantiated, each generic method in the class or
	// interface is instantiated with a fresh set of cloned type parameters (which we need to handle scenarios
	// where different generations of the same type parameter are in scope). This leads to a lot of new type
	// identities, and potentially a lot of work comparing those identities, so here we create an instantiation
	// that uses the original type identities for all unconstrained type parameters.
	return c.getSignatureInstantiation(signature, core.Map(signature.typeParameters, func(tp *Type) *Type {
		if tp.Target() != nil && c.getConstraintOfTypeParameter(tp.Target()) == nil {
			return tp.Target()
		}
		return tp
	}), nil)
}

// Instantiate a generic signature in the context of a non-generic signature (section 3.8.5 in TypeScript spec)
func (c *Checker) instantiateSignatureInContextOf(signature *Signature, contextualSignature *Signature, inferenceContext *InferenceContext, compareTypes TypeComparer) *Signature {
	return signature // !!!
}

func (c *Checker) resolveBaseTypesOfInterface(t *Type) {
	data := t.AsInterfaceType()
	for _, declaration := range t.symbol.Declarations {
		if ast.IsInterfaceDeclaration(declaration) {
			for _, node := range getInterfaceBaseTypeNodes(declaration) {
				baseType := c.getReducedType(c.getTypeFromTypeNode(node))
				if !c.isErrorType(baseType) {
					if c.isValidBaseType(baseType) {
						if t != baseType && !c.hasBaseType(baseType, t) {
							data.resolvedBaseTypes = append(data.resolvedBaseTypes, baseType)
						} else {
							c.reportCircularBaseType(declaration, t)
						}
					} else {
						c.error(node, diagnostics.An_interface_can_only_extend_an_object_type_or_intersection_of_object_types_with_statically_known_members)
					}
				}
			}
		}
	}
}

func (c *Checker) areAllOuterTypeParametersApplied(t *Type) bool {
	// An unapplied type parameter has its symbol still the same as the matching argument symbol.
	// Since parameters are applied outer-to-inner, only the last outer parameter needs to be checked.
	outerTypeParameters := t.AsInterfaceType().OuterTypeParameters()
	if len(outerTypeParameters) != 0 {
		last := len(outerTypeParameters) - 1
		typeArguments := c.getTypeArguments(t)
		return outerTypeParameters[last].symbol != typeArguments[last].symbol
	}
	return true
}

func (c *Checker) reportCircularBaseType(node *ast.Node, t *Type) {
	c.error(node, diagnostics.Type_0_recursively_references_itself_as_a_base_type, c.typeToStringEx(t, nil, TypeFormatFlagsWriteArrayAsGenericType))
}

// A valid base type is `any`, an object type or intersection of object types.
func (c *Checker) isValidBaseType(t *Type) bool {
	if t.flags&TypeFlagsTypeParameter != 0 {
		constraint := c.getBaseConstraintOfType(t)
		if constraint != nil {
			return c.isValidBaseType(constraint)
		}
	}
	// TODO: Given that we allow type parmeters here now, is this `!isGenericMappedType(type)` check really needed?
	// There's no reason a `T` should be allowed while a `Readonly<T>` should not.
	return t.flags&(TypeFlagsObject|TypeFlagsNonPrimitive|TypeFlagsAny) != 0 && !c.isGenericMappedType(t) ||
		t.flags&TypeFlagsIntersection != 0 && core.Every(t.Types(), c.isValidBaseType)
}

// TODO: GH#18217 If `checkBase` is undefined, we should not call this because this will always return false.
func (c *Checker) hasBaseType(t *Type, checkBase *Type) bool {
	var check func(*Type) bool
	check = func(t *Type) bool {
		if t.objectFlags&(ObjectFlagsClassOrInterface|ObjectFlagsReference) != 0 {
			target := getTargetType(t)
			return target == checkBase || core.Some(c.getBaseTypes(target), check)
		}
		if t.flags&TypeFlagsIntersection != 0 {
			return core.Some(t.Types(), check)
		}
		return false
	}
	return check(t)
}

func getTargetType(t *Type) *Type {
	if t.objectFlags&ObjectFlagsReference != 0 {
		return t.Target()
	}
	return t
}

func (c *Checker) getTypeWithThisArgument(t *Type, thisArgument *Type, needApparentType bool) *Type {
	if t.objectFlags&ObjectFlagsReference != 0 {
		target := t.Target()
		typeArguments := c.getTypeArguments(t)
		if len(target.AsInterfaceType().TypeParameters()) == len(typeArguments) {
			if thisArgument == nil {
				thisArgument = target.AsInterfaceType().thisType
			}
			return c.createTypeReference(target, core.Concatenate(typeArguments, []*Type{thisArgument}))
		}
		return t
	} else if t.flags&TypeFlagsIntersection != 0 {
		types := t.Types()
		newTypes := core.SameMap(types, func(t *Type) *Type { return c.getTypeWithThisArgument(t, thisArgument, needApparentType) })
		if core.Same(newTypes, types) {
			return t
		}
		return c.getIntersectionType(newTypes)
	}
	if needApparentType {
		return c.getApparentType(t)
	}
	return t
}

func (c *Checker) addInheritedMembers(symbols ast.SymbolTable, baseSymbols []*ast.Symbol) ast.SymbolTable {
	for _, base := range baseSymbols {
		if !isStaticPrivateIdentifierProperty(base) {
			if _, ok := symbols[base.Name]; !ok {
				if symbols == nil {
					symbols = make(ast.SymbolTable)
				}
				symbols[base.Name] = base
			}
		}
	}
	return symbols
}

func (c *Checker) resolveDeclaredMembers(t *Type) *InterfaceType {
	d := t.AsInterfaceType()
	if !d.declaredMembersResolved {
		d.declaredMembersResolved = true
		d.declaredMembers = c.getMembersOfSymbol(t.symbol)
		d.declaredCallSignatures = c.getSignaturesOfSymbol(d.declaredMembers[InternalSymbolNameCall])
		d.declaredConstructSignatures = c.getSignaturesOfSymbol(d.declaredMembers[InternalSymbolNameNew])
		d.declaredIndexInfos = c.getIndexInfosOfSymbol(t.symbol)
	}
	return d
}

func (c *Checker) getIndexInfosOfSymbol(symbol *ast.Symbol) []*IndexInfo {
	indexSymbol := c.getIndexSymbol(symbol)
	if indexSymbol != nil {
		return c.getIndexInfosOfIndexSymbol(indexSymbol, slices.Collect(maps.Values(c.getMembersOfSymbol(symbol))))
	}
	return nil
}

// note intentional similarities to index signature building in `checkObjectLiteral` for parity
func (c *Checker) getIndexInfosOfIndexSymbol(indexSymbol *ast.Symbol, siblingSymbols []*ast.Symbol) []*IndexInfo {
	var indexInfos []*IndexInfo
	hasComputedStringProperty := false
	hasComputedNumberProperty := false
	hasComputedSymbolProperty := false
	readonlyComputedStringProperty := true
	readonlyComputedNumberProperty := true
	readonlyComputedSymbolProperty := true
	var propertySymbols []*ast.Symbol
	for _, declaration := range indexSymbol.Declarations {
		if ast.IsIndexSignatureDeclaration(declaration) {
			parameters := declaration.Parameters()
			returnTypeNode := declaration.Type()
			if len(parameters) == 1 {
				typeNode := parameters[0].AsParameterDeclaration().Type
				if typeNode != nil {
					valueType := c.anyType
					if returnTypeNode != nil {
						valueType = c.getTypeFromTypeNode(returnTypeNode)
					}
					forEachType(c.getTypeFromTypeNode(typeNode), func(keyType *Type) {
						if c.isValidIndexKeyType(keyType) && findIndexInfo(indexInfos, keyType) == nil {
							indexInfo := c.newIndexInfo(keyType, valueType, hasEffectiveModifier(declaration, ast.ModifierFlagsReadonly), declaration)
							indexInfos = append(indexInfos, indexInfo)
						}
					})
				}
			}
		} else if c.hasLateBindableIndexSignature(declaration) {
			var declName *ast.Node
			if ast.IsBinaryExpression(declaration) {
				declName = declaration.AsBinaryExpression().Left
			} else {
				declName = declaration.Name()
			}
			var keyType *Type
			if ast.IsElementAccessExpression(declName) {
				keyType = c.checkExpressionCached(declName.AsElementAccessExpression().ArgumentExpression)
			} else {
				keyType = c.checkComputedPropertyName(declName)
			}
			if findIndexInfo(indexInfos, keyType) != nil {
				continue
				// Explicit index for key type takes priority
			}
			if c.isTypeAssignableTo(keyType, c.stringNumberSymbolType) {
				if c.isTypeAssignableTo(keyType, c.numberType) {
					hasComputedNumberProperty = true
					if !hasEffectiveReadonlyModifier(declaration) {
						readonlyComputedNumberProperty = false
					}
				} else if c.isTypeAssignableTo(keyType, c.esSymbolType) {
					hasComputedSymbolProperty = true
					if !hasEffectiveReadonlyModifier(declaration) {
						readonlyComputedSymbolProperty = false
					}
				} else {
					hasComputedStringProperty = true
					if !hasEffectiveReadonlyModifier(declaration) {
						readonlyComputedStringProperty = false
					}
				}
				propertySymbols = append(propertySymbols, declaration.Symbol())
			}
		}
	}
	if hasComputedStringProperty || hasComputedNumberProperty || hasComputedSymbolProperty {
		for _, sym := range siblingSymbols {
			if sym != indexSymbol {
				propertySymbols = append(propertySymbols, sym)
			}
		}
		// aggregate similar index infos implied to be the same key to the same combined index info
		if hasComputedStringProperty && findIndexInfo(indexInfos, c.stringType) == nil {
			indexInfos = append(indexInfos, c.getObjectLiteralIndexInfo(readonlyComputedStringProperty, propertySymbols, c.stringType))
		}
		if hasComputedNumberProperty && findIndexInfo(indexInfos, c.numberType) == nil {
			indexInfos = append(indexInfos, c.getObjectLiteralIndexInfo(readonlyComputedNumberProperty, propertySymbols, c.numberType))
		}
		if hasComputedSymbolProperty && findIndexInfo(indexInfos, c.esSymbolType) == nil {
			indexInfos = append(indexInfos, c.getObjectLiteralIndexInfo(readonlyComputedSymbolProperty, propertySymbols, c.esSymbolType))
		}
	}
	return indexInfos
}

// NOTE: currently does not make pattern literal indexers, eg `${number}px`
func (c *Checker) getObjectLiteralIndexInfo(isReadonly bool, properties []*ast.Symbol, keyType *Type) *IndexInfo {
	var propTypes []*Type
	for _, prop := range properties {
		if keyType == c.stringType && !c.isSymbolWithSymbolName(prop) ||
			keyType == c.numberType && c.isSymbolWithNumericName(prop) ||
			keyType == c.esSymbolType && c.isSymbolWithSymbolName(prop) {
			propTypes = append(propTypes, c.getTypeOfSymbol(prop))
		}
	}
	unionType := c.undefinedType
	if len(propTypes) != 0 {
		unionType = c.getUnionTypeEx(propTypes, UnionReductionSubtype, nil, nil)
	}
	return c.newIndexInfo(keyType, unionType, isReadonly, nil /*declaration*/)
}

func (c *Checker) isSymbolWithSymbolName(symbol *ast.Symbol) bool {
	if isKnownSymbol(symbol) {
		return true
	}
	if len(symbol.Declarations) != 0 {
		name := symbol.Declarations[0].Name()
		return name != nil && ast.IsComputedPropertyName(name) && c.isTypeAssignableToKind(c.checkComputedPropertyName(name), TypeFlagsESSymbol)
	}
	return false
}

func (c *Checker) isSymbolWithNumericName(symbol *ast.Symbol) bool {
	if isNumericLiteralName(symbol.Name) {
		return true
	}
	if len(symbol.Declarations) != 0 {
		name := symbol.Declarations[0].Name()
		return name != nil && c.isNumericName(name)
	}
	return false
}

func (c *Checker) isNumericName(name *ast.Node) bool {
	switch name.Kind {
	case ast.KindComputedPropertyName:
		return c.isNumericComputedName(name)
	case ast.KindIdentifier, ast.KindNumericLiteral, ast.KindStringLiteral:
		return isNumericLiteralName(name.Text())
	}
	return false
}

func (c *Checker) isNumericComputedName(name *ast.Node) bool {
	// It seems odd to consider an expression of type Any to result in a numeric name,
	// but this behavior is consistent with checkIndexedAccess
	return c.isTypeAssignableToKind(c.checkComputedPropertyName(name), TypeFlagsNumberLike)
}

func (c *Checker) isValidIndexKeyType(t *Type) bool {
	return t.flags&(TypeFlagsString|TypeFlagsNumber|TypeFlagsESSymbol) != 0 ||
		c.isPatternLiteralType(t) ||
		t.flags&TypeFlagsIntersection != 0 && !c.isGenericType(t) && core.Some(t.Types(), c.isValidIndexKeyType)
}

func (c *Checker) findIndexInfo(indexInfos []*IndexInfo, keyType *Type) *IndexInfo {
	for _, info := range indexInfos {
		if info.keyType == keyType {
			return info
		}
	}
	return nil
}

func (c *Checker) getIndexSymbol(symbol *ast.Symbol) *ast.Symbol {
	return c.getMembersOfSymbol(symbol)[InternalSymbolNameIndex]
}

func (c *Checker) getSignaturesOfSymbol(symbol *ast.Symbol) []*Signature {
	if symbol == nil {
		return nil
	}
	var result []*Signature
	for i, decl := range symbol.Declarations {
		if !ast.IsFunctionLike(decl) {
			continue
		}
		// Don't include signature if node is the implementation of an overloaded function. A node is considered
		// an implementation node if it has a body and the previous node is of the same kind and immediately
		// precedes the implementation node (i.e. has the same parent and ends where the implementation starts).
		if i > 0 && getBodyOfNode(decl) != nil {
			previous := symbol.Declarations[i-1]
			if decl.Parent == previous.Parent && decl.Kind == previous.Kind && decl.Pos() == previous.End() {
				continue
			}
		}
		// If this is a function or method declaration, get the signature from the @type tag for the sake of optional parameters.
		// Exclude contextually-typed kinds because we already apply the @type tag to the context, plus applying it here to the initializer would supress checks that the two are compatible.
		result = append(result, c.getSignatureFromDeclaration(decl))
	}
	return result
}

func (c *Checker) getSignatureFromDeclaration(declaration *ast.Node) *Signature {
	links := c.signatureLinks.get(declaration)
	if links.resolvedSignature != nil {
		return links.resolvedSignature
	}
	var parameters []*ast.Symbol
	var flags SignatureFlags
	var thisParameter *ast.Symbol
	minArgumentCount := 0
	hasThisParameter := false
	iife := getImmediatelyInvokedFunctionExpression(declaration)
	for i, param := range declaration.Parameters() {
		paramSymbol := param.Symbol()
		typeNode := param.AsParameterDeclaration().Type
		// Include parameter symbol instead of property symbol in the signature
		if paramSymbol != nil && paramSymbol.Flags&ast.SymbolFlagsProperty != 0 && !ast.IsBindingPattern(param.Name()) {
			resolvedSymbol := c.resolveName(param, paramSymbol.Name, ast.SymbolFlagsValue, nil /*nameNotFoundMessage*/, false /*isUse*/, false /*excludeGlobals*/)
			paramSymbol = resolvedSymbol
		}
		if i == 0 && paramSymbol.Name == InternalSymbolNameThis {
			hasThisParameter = true
			thisParameter = param.Symbol()
		} else {
			parameters = append(parameters, paramSymbol)
		}
		if typeNode != nil && typeNode.Kind == ast.KindLiteralType {
			flags |= SignatureFlagsHasLiteralTypes
		}
		// Record a new minimum argument count if this is not an optional parameter
		isOptionalParameter := isOptionalDeclaration(param) ||
			param.AsParameterDeclaration().Initializer != nil ||
			isRestParameter(param) ||
			iife != nil && len(parameters) > len(iife.AsCallExpression().Arguments.Nodes) && typeNode == nil
		if !isOptionalParameter {
			minArgumentCount = len(parameters)
		}
	}
	// If only one accessor includes a this-type annotation, the other behaves as if it had the same type annotation
	if (ast.IsGetAccessorDeclaration(declaration) || ast.IsSetAccessorDeclaration(declaration)) && c.hasBindableName(declaration) && (!hasThisParameter || thisParameter == nil) {
		otherKind := core.IfElse(ast.IsGetAccessorDeclaration(declaration), ast.KindSetAccessor, ast.KindGetAccessor)
		other := getDeclarationOfKind(c.getSymbolOfDeclaration(declaration), otherKind)
		if other != nil {
			thisParameter = c.getAnnotatedAccessorThisParameter(other)
		}
	}
	var classType *Type
	if ast.IsConstructorDeclaration(declaration) {
		classType = c.getDeclaredTypeOfClassOrInterface(c.getMergedSymbol(declaration.Parent.Symbol()))
	}
	var typeParameters []*Type
	if classType != nil {
		typeParameters = classType.AsInterfaceType().LocalTypeParameters()
	} else {
		typeParameters = c.getTypeParametersFromDeclaration(declaration)
	}
	if hasRestParameter(declaration) {
		flags |= SignatureFlagsHasRestParameter
	}
	if ast.IsConstructorTypeNode(declaration) || ast.IsConstructorDeclaration(declaration) || ast.IsConstructSignatureDeclaration(declaration) {
		flags |= SignatureFlagsConstruct
	}
	if ast.IsConstructorTypeNode(declaration) && hasSyntacticModifier(declaration, ast.ModifierFlagsAbstract) || ast.IsConstructorDeclaration(declaration) && hasSyntacticModifier(declaration.Parent, ast.ModifierFlagsAbstract) {
		flags |= SignatureFlagsAbstract
	}
	links.resolvedSignature = c.newSignature(flags, declaration, typeParameters, thisParameter, parameters, nil /*resolvedReturnType*/, nil /*resolvedTypePredicate*/, minArgumentCount)
	return links.resolvedSignature
}

func (c *Checker) getTypeParametersFromDeclaration(declaration *ast.Node) []*Type {
	var result []*Type
	for _, node := range declaration.TypeParameters() {
		result = core.AppendIfUnique(result, c.getDeclaredTypeOfTypeParameter(node.Symbol()))
	}
	return result
}

func (c *Checker) getAnnotatedAccessorThisParameter(accessor *ast.Node) *ast.Symbol {
	parameter := c.getAccessorThisParameter(accessor)
	if parameter != nil {
		return parameter.Symbol()
	}
	return nil
}

func (c *Checker) getAccessorThisParameter(accessor *ast.Node) *ast.Node {
	if len(accessor.Parameters()) == core.IfElse(ast.IsGetAccessorDeclaration(accessor), 1, 2) {
		return getThisParameter(accessor)
	}
	return nil
}

/**
 * Indicates whether a declaration has an early-bound name or a dynamic name that can be late-bound.
 */
func (c *Checker) hasBindableName(node *ast.Node) bool {
	return !hasDynamicName(node) || c.hasLateBindableName(node)
}

/**
 * Indicates whether a declaration has a late-bindable dynamic name.
 */
func (c *Checker) hasLateBindableName(node *ast.Node) bool {
	name := getNameOfDeclaration(node)
	return name != nil && c.isLateBindableName(name)
}

/**
 * Indicates whether a declaration name is definitely late-bindable.
 * A declaration name is only late-bindable if:
 * - It is a `ComputedPropertyName`.
 * - Its expression is an `Identifier` or either a `PropertyAccessExpression` an
 * `ElementAccessExpression` consisting only of these same three types of nodes.
 * - The type of its expression is a string or numeric literal type, or is a `unique symbol` type.
 */
func (c *Checker) isLateBindableName(node *ast.Node) bool {
	if !isLateBindableAST(node) {
		return false
	}
	if ast.IsComputedPropertyName(node) {
		return isTypeUsableAsPropertyName(c.checkComputedPropertyName(node))
	}
	return isTypeUsableAsPropertyName(c.checkExpressionCached(node.AsElementAccessExpression().ArgumentExpression))
}

func (c *Checker) hasLateBindableIndexSignature(node *ast.Node) bool {
	name := getNameOfDeclaration(node)
	return name != nil && c.isLateBindableIndexSignature(name)
}

func (c *Checker) isLateBindableIndexSignature(node *ast.Node) bool {
	if !isLateBindableAST(node) {
		return false
	}
	if ast.IsComputedPropertyName(node) {
		return c.isTypeUsableAsIndexSignature(c.checkComputedPropertyName(node))
	}
	return c.isTypeUsableAsIndexSignature(c.checkExpressionCached(node.AsElementAccessExpression().ArgumentExpression))
}

func (c *Checker) isTypeUsableAsIndexSignature(t *Type) bool {
	return c.isTypeAssignableTo(t, c.stringNumberSymbolType)
}

func isLateBindableAST(node *ast.Node) bool {
	var expr *ast.Node
	switch {
	case ast.IsComputedPropertyName(node):
		expr = node.AsComputedPropertyName().Expression
	case ast.IsElementAccessExpression(node):
		expr = node.AsElementAccessExpression().ArgumentExpression
	}
	return expr != nil && isEntityNameExpression(expr)
}

func (c *Checker) getReturnTypeOfSignature(sig *Signature) *Type {
	if sig.resolvedReturnType != nil {
		return sig.resolvedReturnType
	}
	if !c.pushTypeResolution(sig, TypeSystemPropertyNameResolvedReturnType) {
		return c.errorType
	}
	var t *Type
	switch {
	case sig.target != nil:
		t = c.instantiateType(c.getReturnTypeOfSignature(sig.target), sig.mapper)
		// !!!
		// case signature.compositeSignatures:
		// 	t = c.instantiateType(c.getUnionOrIntersectionType(map_(signature.compositeSignatures, c.getReturnTypeOfSignature), signature.compositeKind, UnionReductionSubtype), signature.mapper)
	default:
		t = c.getReturnTypeFromAnnotation(sig.declaration)
		if t == nil {
			if !ast.NodeIsMissing(getBodyOfNode(sig.declaration)) {
				t = c.getReturnTypeFromBody(sig.declaration)
			} else {
				t = c.anyType
			}
		}
	}
	if sig.flags&SignatureFlagsIsInnerCallChain != 0 {
		t = c.addOptionalTypeMarker(t)
	} else if sig.flags&SignatureFlagsIsOuterCallChain != 0 {
		t = c.getOptionalType(t, false /*isProperty*/)
	}
	if !c.popTypeResolution() {
		if sig.declaration != nil {
			typeNode := sig.declaration.Type()
			if typeNode != nil {
				c.error(typeNode, diagnostics.Return_type_annotation_circularly_references_itself)
			} else if c.noImplicitAny {
				name := getNameOfDeclaration(sig.declaration)
				if name != nil {
					c.error(name, diagnostics.X_0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions, declarationNameToString(name))
				} else {
					c.error(sig.declaration, diagnostics.Function_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions)
				}
			}
		}
		t = c.anyType
	}
	if sig.resolvedReturnType == nil {
		sig.resolvedReturnType = t
	}
	return sig.resolvedReturnType
}

func (c *Checker) getNonCircularReturnTypeOfSignature(sig *Signature) *Type {
	if c.isResolvingReturnTypeOfSignature(sig) {
		return c.anyType
	}
	return c.getReturnTypeOfSignature(sig)
}

func (c *Checker) getReturnTypeFromAnnotation(declaration *ast.Node) *Type {
	if ast.IsConstructorDeclaration(declaration) {
		return c.getDeclaredTypeOfClassOrInterface(c.getMergedSymbol(declaration.Parent.Symbol()))
	}
	returnType := declaration.Type()
	if returnType != nil {
		return c.getTypeFromTypeNode(returnType)
	}
	if ast.IsGetAccessorDeclaration(declaration) && c.hasBindableName(declaration) {
		return c.getAnnotatedAccessorType(getDeclarationOfKind(c.getSymbolOfDeclaration(declaration), ast.KindSetAccessor))
	}
	return nil
}

func (c *Checker) getAnnotatedAccessorType(accessor *ast.Node) *Type {
	node := c.getAnnotatedAccessorTypeNode(accessor)
	if node != nil {
		return c.getTypeFromTypeNode(node)
	}
	return nil
}

func (c *Checker) getAnnotatedAccessorTypeNode(accessor *ast.Node) *ast.Node {
	if accessor != nil {
		switch accessor.Kind {
		case ast.KindGetAccessor, ast.KindPropertyDeclaration:
			return accessor.Type()
		case ast.KindSetAccessor:
			return getEffectiveSetAccessorTypeAnnotationNode(accessor)
		}
	}
	return nil
}

func getEffectiveSetAccessorTypeAnnotationNode(node *ast.Node) *ast.Node {
	param := getSetAccessorValueParameter(node)
	if param != nil {
		return param.Type()
	}
	return nil
}

func getSetAccessorValueParameter(accessor *ast.Node) *ast.Node {
	parameters := accessor.Parameters()
	if len(parameters) > 0 {
		hasThis := len(parameters) == 2 && parameterIsThisKeyword(parameters[0])
		return parameters[core.IfElse(hasThis, 1, 0)]
	}
	return nil
}

func (c *Checker) getReturnTypeFromBody(sig *ast.Node) *Type {
	return c.anyType // !!!
}

func (c *Checker) getTypePredicateFromBody(fn *ast.Node) *TypePredicate {
	return nil // !!!
}

func (c *Checker) addOptionalTypeMarker(t *Type) *Type {
	if c.strictNullChecks {
		return c.getUnionType([]*Type{t, c.optionalType})
	}
	return t
}

func (c *Checker) instantiateSignature(sig *Signature, m *TypeMapper) *Signature {
	return c.instantiateSignatureEx(sig, m, false /*eraseTypeParameters*/)
}

func (c *Checker) instantiateSignatureEx(sig *Signature, m *TypeMapper, eraseTypeParameters bool) *Signature {
	var freshTypeParameters []*Type
	if len(sig.typeParameters) != 0 && !eraseTypeParameters {
		// First create a fresh set of type parameters, then include a mapping from the old to the
		// new type parameters in the mapper function. Finally store this mapper in the new type
		// parameters such that we can use it when instantiating constraints.
		freshTypeParameters = core.Map(sig.typeParameters, c.cloneTypeParameter)
		m = c.combineTypeMappers(newTypeMapper(sig.typeParameters, freshTypeParameters), m)
		for _, tp := range freshTypeParameters {
			tp.AsTypeParameter().mapper = m
		}
	}
	// Don't compute resolvedReturnType and resolvedTypePredicate now,
	// because using `mapper` now could trigger inferences to become fixed. (See `createInferenceContext`.)
	// See GH#17600.
	result := c.newSignature(sig.flags&SignatureFlagsPropagatingFlags, sig.declaration, freshTypeParameters,
		c.instantiateSymbol(sig.thisParameter, m), c.instantiateSymbols(sig.parameters, m),
		nil /*resolvedReturnType*/, nil /*resolvedTypePredicate*/, int(sig.minArgumentCount))
	result.target = sig
	result.mapper = m
	return result
}

func (c *Checker) instantiateIndexInfo(info *IndexInfo, m *TypeMapper) *IndexInfo {
	newValueType := c.instantiateType(info.valueType, m)
	if newValueType == info.valueType {
		return info
	}
	return c.newIndexInfo(info.keyType, newValueType, info.isReadonly, info.declaration)
}

func (c *Checker) resolveAnonymousTypeMembers(t *Type) {
	d := t.AsObjectType()
	if d.target != nil {
		c.setStructuredTypeMembers(t, nil, nil, nil, nil)
		members := c.createInstantiatedSymbolTable(c.getPropertiesOfObjectType(d.target), d.mapper)
		callSignatures := c.instantiateSignatures(c.getSignaturesOfType(d.target, SignatureKindCall), d.mapper)
		constructSignatures := c.instantiateSignatures(c.getSignaturesOfType(d.target, SignatureKindConstruct), d.mapper)
		indexInfos := c.instantiateIndexInfos(c.getIndexInfosOfType(d.target), d.mapper)
		c.setStructuredTypeMembers(t, members, callSignatures, constructSignatures, indexInfos)
		return
	}
	symbol := c.getMergedSymbol(t.symbol)
	if symbol.Flags&ast.SymbolFlagsTypeLiteral != 0 {
		c.setStructuredTypeMembers(t, nil, nil, nil, nil)
		members := c.getMembersOfSymbol(symbol)
		callSignatures := c.getSignaturesOfSymbol(members[InternalSymbolNameCall])
		constructSignatures := c.getSignaturesOfSymbol(members[InternalSymbolNameNew])
		indexInfos := c.getIndexInfosOfSymbol(symbol)
		c.setStructuredTypeMembers(t, members, callSignatures, constructSignatures, indexInfos)
		return
	}
	// Combinations of function, class, enum and module
	members := c.getExportsOfSymbol(symbol)
	var indexInfos []*IndexInfo
	if symbol == c.globalThisSymbol {
		varsOnly := make(ast.SymbolTable)
		for _, p := range members {
			if p.Flags&ast.SymbolFlagsBlockScoped == 0 && !(p.Flags&ast.SymbolFlagsValueModule != 0 && len(p.Declarations) != 0 && core.Every(p.Declarations, isAmbientModule)) {
				varsOnly[p.Name] = p
			}
		}
		members = varsOnly
	}
	var baseConstructorIndexInfo *IndexInfo
	c.setStructuredTypeMembers(t, members, nil, nil, nil)
	if symbol.Flags&ast.SymbolFlagsClass != 0 {
		classType := c.getDeclaredTypeOfClassOrInterface(symbol)
		baseConstructorType := c.getBaseConstructorTypeOfClass(classType)
		if baseConstructorType.flags&(TypeFlagsObject|TypeFlagsIntersection|TypeFlagsTypeVariable) != 0 {
			members = maps.Clone(members)
			c.addInheritedMembers(members, c.getPropertiesOfType(baseConstructorType))
			c.setStructuredTypeMembers(t, members, nil, nil, nil)
		} else if baseConstructorType == c.anyType {
			baseConstructorIndexInfo = &IndexInfo{keyType: c.stringType, valueType: c.anyType}
		}
	}
	indexSymbol := members[InternalSymbolNameIndex]
	if indexSymbol != nil {
		indexInfos = c.getIndexInfosOfIndexSymbol(indexSymbol, slices.Collect(maps.Values(members)))
	} else {
		if baseConstructorIndexInfo != nil {
			indexInfos = append(indexInfos, baseConstructorIndexInfo)
		}
		if symbol.Flags&ast.SymbolFlagsEnum != 0 && (c.getDeclaredTypeOfSymbol(symbol).flags&TypeFlagsEnum != 0 || core.Some(d.properties, func(prop *ast.Symbol) bool {
			return c.getTypeOfSymbol(prop).flags&TypeFlagsNumberLike != 0
		})) {
			indexInfos = append(indexInfos, c.enumNumberIndexInfo)
		}
	}
	d.indexInfos = indexInfos
	// We resolve the members before computing the signatures because a signature may use
	// typeof with a qualified name expression that circularly references the type we are
	// in the process of resolving (see issue #6072). The temporarily empty signature list
	// will never be observed because a qualified name can't reference signatures.
	if symbol.Flags&(ast.SymbolFlagsFunction|ast.SymbolFlagsMethod) != 0 {
		d.signatures = c.getSignaturesOfSymbol(symbol)
		d.callSignatureCount = len(d.signatures)
	}
	// And likewise for construct signatures for classes
	if symbol.Flags&ast.SymbolFlagsClass != 0 {
		classType := c.getDeclaredTypeOfClassOrInterface(symbol)
		constructSignatures := c.getSignaturesOfSymbol(symbol.Members[InternalSymbolNameConstructor])
		if len(constructSignatures) == 0 {
			constructSignatures = c.getDefaultConstructSignatures(classType)
		}
		d.signatures = append(d.signatures, constructSignatures...)
	}
}

// The mappingThisOnly flag indicates that the only type parameter being mapped is "this". When the flag is true,
// we check symbols to see if we can quickly conclude they are free of "this" references, thus needing no instantiation.
func (c *Checker) createInstantiatedSymbolTable(symbols []*ast.Symbol, m *TypeMapper) ast.SymbolTable {
	if len(symbols) == 0 {
		return nil
	}
	result := make(ast.SymbolTable)
	for _, symbol := range symbols {
		result[symbol.Name] = c.instantiateSymbol(symbol, m)
	}
	return result
}

// The mappingThisOnly flag indicates that the only type parameter being mapped is "this". When the flag is true,
// we check symbols to see if we can quickly conclude they are free of "this" references, thus needing no instantiation.
func (c *Checker) instantiateSymbolTable(symbols ast.SymbolTable, m *TypeMapper, mappingThisOnly bool) ast.SymbolTable {
	if len(symbols) == 0 {
		return nil
	}
	result := make(ast.SymbolTable)
	for id, symbol := range symbols {
		if c.isNamedMember(symbol, id) {
			if mappingThisOnly && c.isThisless(symbol) {
				result[id] = symbol
			} else {
				result[id] = c.instantiateSymbol(symbol, m)
			}
		}
	}
	return result
}

func (c *Checker) instantiateSymbol(symbol *ast.Symbol, m *TypeMapper) *ast.Symbol {
	if symbol == nil {
		return nil
	}
	links := c.valueSymbolLinks.get(symbol)
	// If the type of the symbol is already resolved, and if that type could not possibly
	// be affected by instantiation, simply return the symbol itself.
	if links.resolvedType != nil && !c.couldContainTypeVariables(links.resolvedType) {
		if symbol.Flags&ast.SymbolFlagsSetAccessor == 0 {
			return symbol
		}
		// If we're a setter, check writeType.
		if links.writeType != nil && !c.couldContainTypeVariables(links.writeType) {
			return symbol
		}
	}
	if symbol.CheckFlags&ast.CheckFlagsInstantiated != 0 {
		// If symbol being instantiated is itself a instantiation, fetch the original target and combine the
		// type mappers. This ensures that original type identities are properly preserved and that aliases
		// always reference a non-aliases.
		symbol = links.target
		m = c.combineTypeMappers(links.mapper, m)
	}
	// Keep the flags from the symbol we're instantiating.  Mark that is instantiated, and
	// also transient so that we can just store data on it directly.
	result := c.newSymbol(symbol.Flags, symbol.Name)
	result.CheckFlags = ast.CheckFlagsInstantiated | symbol.CheckFlags&(ast.CheckFlagsReadonly|ast.CheckFlagsLate|ast.CheckFlagsOptionalParameter|ast.CheckFlagsRestParameter)
	result.Declarations = symbol.Declarations
	result.Parent = symbol.Parent
	result.ValueDeclaration = symbol.ValueDeclaration
	resultLinks := c.valueSymbolLinks.get(result)
	resultLinks.target = symbol
	resultLinks.mapper = m
	resultLinks.nameType = links.nameType
	return result
}

/**
 * Returns true if the class or interface member given by the symbol is free of "this" references. The
 * function may return false for symbols that are actually free of "this" references because it is not
 * feasible to perform a complete analysis in all cases. In particular, property members with types
 * inferred from their initializers and function members with inferred return types are conservatively
 * assumed not to be free of "this" references.
 */
func (c *Checker) isThisless(symbol *ast.Symbol) bool {
	return false // !!!
}

func (c *Checker) getDefaultConstructSignatures(classType *Type) []*Signature {
	baseConstructorType := c.getBaseConstructorTypeOfClass(classType)
	baseSignatures := c.getSignaturesOfType(baseConstructorType, SignatureKindConstruct)
	declaration := getClassLikeDeclarationOfSymbol(classType.symbol)
	isAbstract := declaration != nil && hasSyntacticModifier(declaration, ast.ModifierFlagsAbstract)
	if len(baseSignatures) == 0 {
		flags := core.IfElse(isAbstract, SignatureFlagsConstruct|SignatureFlagsAbstract, SignatureFlagsConstruct)
		return []*Signature{c.newSignature(flags, nil, classType.AsInterfaceType().LocalTypeParameters(), nil, nil, classType, nil, 0)}
	}
	baseTypeNode := getBaseTypeNodeOfClass(classType)
	typeArguments := c.getTypeArgumentsFromNode(baseTypeNode)
	typeArgCount := len(typeArguments)
	var result []*Signature
	for _, baseSig := range baseSignatures {
		minTypeArgumentCount := c.getMinTypeArgumentCount(baseSig.typeParameters)
		typeParamCount := len(baseSig.typeParameters)
		if typeArgCount >= minTypeArgumentCount && typeArgCount <= typeParamCount {
			var sig *Signature
			if typeParamCount != 0 {
				sig = c.createSignatureInstantiation(baseSig, c.fillMissingTypeArguments(typeArguments, baseSig.typeParameters, minTypeArgumentCount))
			} else {
				sig = c.cloneSignature(baseSig)
			}
			sig.typeParameters = classType.AsInterfaceType().LocalTypeParameters()
			sig.resolvedReturnType = classType
			if isAbstract {
				sig.flags |= SignatureFlagsAbstract
			} else {
				sig.flags &^= SignatureFlagsAbstract
			}
			result = append(result, sig)
		}
	}
	return result
}

func (c *Checker) resolveMappedTypeMembers(t *Type) {
	// !!!
	c.setStructuredTypeMembers(t, nil, nil, nil, nil)
}

func (c *Checker) resolveReverseMappedTypeMembers(t *Type) {
	// !!!
	c.setStructuredTypeMembers(t, nil, nil, nil, nil)
}

func (c *Checker) resolveUnionTypeMembers(t *Type) {
	// !!!
	c.setStructuredTypeMembers(t, nil, nil, nil, nil)
}

func (c *Checker) resolveIntersectionTypeMembers(t *Type) {
	// !!!
	c.setStructuredTypeMembers(t, nil, nil, nil, nil)
}

/**
 * If the given type is an object type and that type has a property by the given name,
 * return the symbol for that property. Otherwise return undefined.
 */
func (c *Checker) getPropertyOfObjectType(t *Type, name string) *ast.Symbol {
	if t.flags&TypeFlagsObject != 0 {
		resolved := c.resolveStructuredTypeMembers(t)
		symbol := resolved.members[name]
		if symbol != nil && c.symbolIsValue(symbol) {
			return symbol
		}
	}
	return nil
}

func (c *Checker) getPropertyOfUnionOrIntersectionType(t *Type, name string, skipObjectFunctionPropertyAugment bool) *ast.Symbol {
	prop := c.getUnionOrIntersectionProperty(t, name, skipObjectFunctionPropertyAugment)
	// We need to filter out partial properties in union types
	if prop != nil && prop.CheckFlags&ast.CheckFlagsReadPartial != 0 {
		return nil
	}
	return prop
}

// Return the symbol for a given property in a union or intersection type, or undefined if the property
// does not exist in any constituent type. Note that the returned property may only be present in some
// constituents, in which case the isPartial flag is set when the containing type is union type. We need
// these partial properties when identifying discriminant properties, but otherwise they are filtered out
// and do not appear to be present in the union type.
func (c *Checker) getUnionOrIntersectionProperty(t *Type, name string, skipObjectFunctionPropertyAugment bool) *ast.Symbol {
	var cache ast.SymbolTable
	if skipObjectFunctionPropertyAugment {
		cache = getSymbolTable(&t.AsUnionOrIntersectionType().propertyCacheWithoutFunctionPropertyAugment)
	} else {
		cache = getSymbolTable(&t.AsUnionOrIntersectionType().propertyCache)
	}
	if prop := cache[name]; prop != nil {
		return prop
	}
	prop := c.createUnionOrIntersectionProperty(t, name, skipObjectFunctionPropertyAugment)
	if prop != nil {
		cache[name] = prop
		// Propagate an entry from the non-augmented cache to the augmented cache unless the property is partial.
		if skipObjectFunctionPropertyAugment && prop.CheckFlags&ast.CheckFlagsPartial == 0 {
			augmentedCache := getSymbolTable(&t.AsUnionOrIntersectionType().propertyCache)
			if augmentedCache[name] == nil {
				augmentedCache[name] = prop
			}
		}
	}
	return prop
}

func (c *Checker) createUnionOrIntersectionProperty(containingType *Type, name string, skipObjectFunctionPropertyAugment bool) *ast.Symbol {
	var singleProp *ast.Symbol
	var propSet core.Set[*ast.Symbol]
	var indexTypes []*Type
	isUnion := containingType.flags&TypeFlagsUnion != 0
	// Flags we want to propagate to the result if they exist in all source symbols
	var checkFlags ast.CheckFlags
	var optionalFlag ast.SymbolFlags
	if !isUnion {
		checkFlags = ast.CheckFlagsReadonly
		optionalFlag = ast.SymbolFlagsOptional
	}
	syntheticFlag := ast.CheckFlagsSyntheticMethod
	mergedInstantiations := false
	for _, current := range containingType.Types() {
		t := c.getApparentType(current)
		if !c.isErrorType(t) && t.flags&TypeFlagsNever == 0 {
			prop := c.getPropertyOfTypeEx(t, name, skipObjectFunctionPropertyAugment, false)
			var modifiers ast.ModifierFlags
			if prop != nil {
				modifiers = getDeclarationModifierFlagsFromSymbol(prop)
				if prop.Flags&ast.SymbolFlagsClassMember != 0 {
					if isUnion {
						optionalFlag |= prop.Flags & ast.SymbolFlagsOptional
					} else {
						optionalFlag &= prop.Flags
					}
				}
				if singleProp == nil {
					singleProp = prop
				} else if prop != singleProp {
					isInstantiation := c.getTargetSymbol(prop) == c.getTargetSymbol(singleProp)
					// If the symbols are instances of one another with identical types - consider the symbols
					// equivalent and just use the first one, which thus allows us to avoid eliding private
					// members when intersecting a (this-)instantiations of a class with its raw base or another instance
					if isInstantiation && c.compareProperties(singleProp, prop, compareTypesEqual) == TernaryTrue {
						// If we merged instantiations of a generic type, we replicate the symbol parent resetting behavior we used
						// to do when we recorded multiple distinct symbols so that we still get, eg, `Array<T>.length` printed
						// back and not `Array<string>.length` when we're looking at a `.length` access on a `string[] | number[]`
						mergedInstantiations = singleProp.Parent != nil && len(c.getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(singleProp.Parent)) != 0
					} else {
						if propSet.Len() == 0 {
							propSet.Add(singleProp)
						}
						propSet.Add(prop)
					}
				}
				if isUnion && c.isReadonlySymbol(prop) {
					checkFlags |= ast.CheckFlagsReadonly
				} else if !isUnion && !c.isReadonlySymbol(prop) {
					checkFlags &^= ast.CheckFlagsReadonly
				}
				if modifiers&ast.ModifierFlagsNonPublicAccessibilityModifier == 0 {
					checkFlags |= ast.CheckFlagsContainsPublic
				}
				if modifiers&ast.ModifierFlagsProtected != 0 {
					checkFlags |= ast.CheckFlagsContainsProtected
				}
				if modifiers&ast.ModifierFlagsPrivate != 0 {
					checkFlags |= ast.CheckFlagsContainsPrivate
				}
				if modifiers&ast.ModifierFlagsStatic != 0 {
					checkFlags |= ast.CheckFlagsContainsStatic
				}
				if !isPrototypeProperty(prop) {
					syntheticFlag = ast.CheckFlagsSyntheticProperty
				}
			} else if isUnion {
				var indexInfo *IndexInfo
				if !isLateBoundName(name) {
					indexInfo = c.getApplicableIndexInfoForName(t, name)
				}
				if indexInfo != nil {
					checkFlags |= ast.CheckFlagsWritePartial | (core.IfElse(indexInfo.isReadonly, ast.CheckFlagsReadonly, 0))
					if isTupleType(t) {
						indexType := c.getRestTypeOfTupleType(t)
						if indexType == nil {
							indexType = c.undefinedType
						}
						indexTypes = append(indexTypes, indexType)
					} else {
						indexTypes = append(indexTypes, indexInfo.valueType)
					}
				} else if isObjectLiteralType(t) && t.objectFlags&ObjectFlagsContainsSpread == 0 {
					checkFlags |= ast.CheckFlagsWritePartial
					indexTypes = append(indexTypes, c.undefinedType)
				} else {
					checkFlags |= ast.CheckFlagsReadPartial
				}
			}
		}
	}
	if singleProp == nil || isUnion &&
		(propSet.Len() == 0 || checkFlags&ast.CheckFlagsPartial != 0) &&
		checkFlags&(ast.CheckFlagsContainsPrivate|ast.CheckFlagsContainsProtected) != 0 &&
		!(propSet.Len() != 0 && c.hasCommonDeclaration(propSet)) {
		// No property was found, or, in a union, a property has a private or protected declaration in one
		// constituent, but is missing or has a different declaration in another constituent.
		return nil
	}
	if propSet.Len() == 0 && checkFlags&ast.CheckFlagsReadPartial == 0 && len(indexTypes) == 0 {
		if !mergedInstantiations {
			return singleProp
		}
		// No symbol from a union/intersection should have a `.parent` set (since unions/intersections don't act as symbol parents)
		// Unless that parent is "reconstituted" from the "first value declaration" on the symbol (which is likely different than its instantiated parent!)
		// They also have a `.containingType` set, which affects some services endpoints behavior, like `getRootSymbol`
		var singlePropType *Type
		var singlePropMapper *TypeMapper
		if singleProp.Flags&ast.SymbolFlagsTransient != 0 {
			links := c.valueSymbolLinks.get(singleProp)
			singlePropType = links.resolvedType
			singlePropMapper = links.mapper
		}
		clone := c.createSymbolWithType(singleProp, singlePropType)
		if singleProp.ValueDeclaration != nil {
			clone.Parent = singleProp.ValueDeclaration.Symbol().Parent
		}
		links := c.valueSymbolLinks.get(clone)
		links.containingType = containingType
		links.mapper = singlePropMapper
		links.writeType = c.getWriteTypeOfSymbol(singleProp)
		return clone
	}
	if propSet.Len() == 0 {
		propSet.Add(singleProp)
	}
	var declarations []*ast.Node
	var firstType *Type
	var nameType *Type
	var propTypes []*Type
	var writeTypes []*Type
	var firstValueDeclaration *ast.Node
	var hasNonUniformValueDeclaration bool
	for prop := range propSet.Keys() {
		if firstValueDeclaration == nil {
			firstValueDeclaration = prop.ValueDeclaration
		} else if prop.ValueDeclaration != nil && prop.ValueDeclaration != firstValueDeclaration {
			hasNonUniformValueDeclaration = true
		}
		declarations = append(declarations, prop.Declarations...)
		t := c.getTypeOfSymbol(prop)
		if firstType == nil {
			firstType = t
			nameType = c.valueSymbolLinks.get(prop).nameType
		}
		writeType := c.getWriteTypeOfSymbol(prop)
		if writeTypes != nil || writeType != t {
			if writeTypes == nil {
				writeTypes = slices.Clone(propTypes)
			}
			writeTypes = append(writeTypes, writeType)
		}
		if t != firstType {
			checkFlags |= ast.CheckFlagsHasNonUniformType
		}
		if isLiteralType(t) || c.isPatternLiteralType(t) {
			checkFlags |= ast.CheckFlagsHasLiteralType
		}
		if t.flags&TypeFlagsNever != 0 && t != c.uniqueLiteralType {
			checkFlags |= ast.CheckFlagsHasNeverType
		}
		propTypes = append(propTypes, t)
	}
	propTypes = append(propTypes, indexTypes...)
	result := c.newSymbolEx(ast.SymbolFlagsProperty|optionalFlag, name, checkFlags|syntheticFlag)
	result.Declarations = declarations
	if !hasNonUniformValueDeclaration && firstValueDeclaration != nil {
		result.ValueDeclaration = firstValueDeclaration
		// Inherit information about parent type.
		result.Parent = firstValueDeclaration.Symbol().Parent
	}
	links := c.valueSymbolLinks.get(result)
	links.containingType = containingType
	links.nameType = nameType
	// !!! Need new DeferredSymbolLinks or some such
	// if propTypes.length > 2 {
	// 	// When `propTypes` has the potential to explode in size when normalized, defer normalization until absolutely needed
	// 	result.links.checkFlags |= CheckFlagsDeferredType
	// 	result.links.deferralParent = containingType
	// 	result.links.deferralConstituents = propTypes
	// 	result.links.deferralWriteConstituents = writeTypes
	// } else {
	if isUnion {
		links.resolvedType = c.getUnionType(propTypes)
	} else {
		links.resolvedType = c.getIntersectionType(propTypes)
	}
	if writeTypes != nil {
		if isUnion {
			links.writeType = c.getUnionType(writeTypes)
		} else {
			links.writeType = c.getIntersectionType(writeTypes)
		}
	}
	return result
}

func (c *Checker) getTargetSymbol(s *ast.Symbol) *ast.Symbol {
	// if symbol is instantiated its flags are not copied from the 'target'
	// so we'll need to get back original 'target' symbol to work with correct set of flags
	// NOTE: cast to TransientSymbol should be safe because only TransientSymbols have CheckFlags.Instantiated
	if s.CheckFlags&ast.CheckFlagsInstantiated != 0 {
		return c.valueSymbolLinks.get(s).target
	}
	return s
}

/**
 * Return whether this symbol is a member of a prototype somewhere
 * Note that this is not tracked well within the compiler, so the answer may be incorrect.
 */
func isPrototypeProperty(symbol *ast.Symbol) bool {
	return symbol.Flags&ast.SymbolFlagsMethod != 0 || symbol.CheckFlags&ast.CheckFlagsSyntheticMethod != 0
}

func (c *Checker) hasCommonDeclaration(symbols core.Set[*ast.Symbol]) bool {
	var commonDeclarations core.Set[*ast.Node]
	for symbol := range symbols.Keys() {
		if len(symbol.Declarations) == 0 {
			return false
		}
		if commonDeclarations.Len() == 0 {
			for _, d := range symbol.Declarations {
				commonDeclarations.Add(d)
			}
			continue
		}
		for d := range commonDeclarations.Keys() {
			if !slices.Contains(symbol.Declarations, d) {
				commonDeclarations.Delete(d)
			}
		}
		if commonDeclarations.Len() == 0 {
			return false
		}
	}
	return commonDeclarations.Len() != 0
}

func (c *Checker) createSymbolWithType(source *ast.Symbol, t *Type) *ast.Symbol {
	symbol := c.newSymbolEx(source.Flags, source.Name, source.CheckFlags&ast.CheckFlagsReadonly)
	symbol.Declarations = source.Declarations
	symbol.Parent = source.Parent
	symbol.ValueDeclaration = source.ValueDeclaration
	links := c.valueSymbolLinks.get(symbol)
	links.resolvedType = t
	links.target = source
	links.nameType = c.valueSymbolLinks.get(source).nameType
	return symbol
}

func (c *Checker) isMappedTypeGenericIndexedAccess(t *Type) bool {
	if t.flags&TypeFlagsIndexedAccess != 0 {
		objectType := t.AsIndexedAccessType().objectType
		return objectType.objectFlags&ObjectFlagsMapped != 0 && !c.isGenericMappedType(objectType) && c.isGenericIndexType(t.AsIndexedAccessType().indexType) &&
			getMappedTypeModifiers(objectType)&MappedTypeModifiersExcludeOptional == 0 && objectType.AsMappedType().declaration.NameType == nil
	}
	return false
}

/**
 * For a type parameter, return the base constraint of the type parameter. For the string, number,
 * boolean, and symbol primitive types, return the corresponding object types. Otherwise return the
 * type itself.
 */
func (c *Checker) getApparentType(t *Type) *Type {
	originalType := t
	if t.flags&TypeFlagsInstantiable != 0 {
		t = c.getBaseConstraintOfType(t)
		if t == nil {
			t = c.unknownType
		}
	}
	switch {
	case t.objectFlags&ObjectFlagsMapped != 0:
		return c.getApparentTypeOfMappedType(t)
	case t.objectFlags&ObjectFlagsReference != 0 && t != originalType:
		return c.getTypeWithThisArgument(t, originalType, false /*needsApparentType*/)
	case t.flags&TypeFlagsIntersection != 0:
		return c.getApparentTypeOfIntersectionType(t, originalType)
	case t.flags&TypeFlagsStringLike != 0:
		return c.globalStringType
	case t.flags&TypeFlagsNumberLike != 0:
		return c.globalNumberType
	case t.flags&TypeFlagsBigIntLike != 0:
		return c.getGlobalBigIntType()
	case t.flags&TypeFlagsBooleanLike != 0:
		return c.globalBooleanType
	case t.flags&TypeFlagsESSymbolLike != 0:
		return c.getGlobalESSymbolType()
	case t.flags&TypeFlagsNonPrimitive != 0:
		return c.emptyObjectType
	case t.flags&TypeFlagsIndex != 0:
		return c.stringNumberSymbolType
	case t.flags&TypeFlagsUnknown != 0 && !c.strictNullChecks:
		return c.emptyObjectType
	}
	return t
}

func (c *Checker) getApparentTypeOfMappedType(t *Type) *Type {
	return t // !!!
}

func (c *Checker) getApparentTypeOfIntersectionType(t *Type, thisArgument *Type) *Type {
	if t == thisArgument {
		d := t.AsIntersectionType()
		if d.resolvedApparentType == nil {
			d.resolvedApparentType = c.getTypeWithThisArgument(t, thisArgument, true /*needApparentType*/)
		}
		return d.resolvedApparentType
	}
	key := CachedTypeKey{kind: CachedTypeKindApparentType, typeId: thisArgument.id}
	result := c.cachedTypes[key]
	if result == nil {
		result = c.getTypeWithThisArgument(t, thisArgument, true /*needApparentType*/)
		c.cachedTypes[key] = result
	}
	return result
}

/**
 * Return the reduced form of the given type. For a union type, it is a union of the normalized constituent types.
 * For an intersection of types containing one or more mututally exclusive discriminant properties, it is 'never'.
 * For all other types, it is simply the type itself. Discriminant properties are considered mutually exclusive when
 * no constituent property has type 'never', but the intersection of the constituent property types is 'never'.
 */
func (c *Checker) getReducedType(t *Type) *Type {
	switch {
	case t.flags&TypeFlagsUnion != 0:
		if t.objectFlags&ObjectFlagsContainsIntersections != 0 {
			if reducedType := t.AsUnionType().resolvedReducedType; reducedType != nil {
				return reducedType
			}
			reducedType := c.getReducedUnionType(t)
			t.AsUnionType().resolvedReducedType = reducedType
			return reducedType
		}
	case t.flags&TypeFlagsIntersection != 0:
		if t.objectFlags&ObjectFlagsIsNeverIntersectionComputed == 0 {
			t.objectFlags |= ObjectFlagsIsNeverIntersectionComputed
			if core.Some(c.getPropertiesOfUnionOrIntersectionType(t), c.isNeverReducedProperty) {
				t.objectFlags |= ObjectFlagsIsNeverIntersection
			}
		}
		if t.objectFlags&ObjectFlagsIsNeverIntersection != 0 {
			return c.neverType
		}
	}
	return t
}

func (c *Checker) getReducedUnionType(unionType *Type) *Type {
	reducedTypes := core.SameMap(unionType.Types(), c.getReducedType)
	if core.Same(reducedTypes, unionType.Types()) {
		return unionType
	}
	reduced := c.getUnionType(reducedTypes)
	if reduced.flags&TypeFlagsUnion != 0 {
		reduced.AsUnionType().resolvedReducedType = reduced
	}
	return reduced
}

func (c *Checker) isNeverReducedProperty(prop *ast.Symbol) bool {
	return c.isDiscriminantWithNeverType(prop) || isConflictingPrivateProperty(prop)
}

func (c *Checker) getReducedApparentType(t *Type) *Type {
	// Since getApparentType may return a non-reduced union or intersection type, we need to perform
	// type reduction both before and after obtaining the apparent type. For example, given a type parameter
	// 'T extends A | B', the type 'T & X' becomes 'A & X | B & X' after obtaining the apparent type, and
	// that type may need further reduction to remove empty intersections.
	return c.getReducedType(c.getApparentType(c.getReducedType(t)))
}

func (c *Checker) elaborateNeverIntersection(errorInfo *ast.MessageChain, t *Type) *ast.MessageChain {
	if t.flags&TypeFlagsIntersection != 0 && t.objectFlags&ObjectFlagsIsNeverIntersection != 0 {
		neverProp := core.Find(c.getPropertiesOfUnionOrIntersectionType(t), c.isDiscriminantWithNeverType)
		if neverProp != nil {
			return ast.NewMessageChain(diagnostics.The_intersection_0_was_reduced_to_never_because_property_1_has_conflicting_types_in_some_constituents, c.typeToStringEx(t, nil, TypeFormatFlagsNoTypeReduction), c.symbolToString(neverProp))
		}
		privateProp := core.Find(c.getPropertiesOfUnionOrIntersectionType(t), isConflictingPrivateProperty)
		if privateProp != nil {
			return chainDiagnosticMessages(errorInfo, diagnostics.The_intersection_0_was_reduced_to_never_because_property_1_exists_in_multiple_constituents_and_is_private_in_some, c.typeToStringEx(t, nil, TypeFormatFlagsNoTypeReduction), c.symbolToString(privateProp))
		}
	}
	return nil
}

func (c *Checker) isDiscriminantWithNeverType(prop *ast.Symbol) bool {
	// Return true for a synthetic non-optional property with non-uniform types, where at least one is
	// a literal type and none is never, that reduces to never.
	return prop.Flags&ast.SymbolFlagsOptional == 0 && prop.CheckFlags&(ast.CheckFlagsNonUniformAndLiteral|ast.CheckFlagsHasNeverType) == ast.CheckFlagsNonUniformAndLiteral && c.getTypeOfSymbol(prop).flags&TypeFlagsNever != 0
}

func isConflictingPrivateProperty(prop *ast.Symbol) bool {
	// Return true for a synthetic property with multiple declarations, at least one of which is private.
	return prop.ValueDeclaration == nil && prop.CheckFlags&ast.CheckFlagsContainsPrivate != 0
}

type allAccessorDeclarations struct {
	firstAccessor  *ast.AccessorDeclaration
	secondAccessor *ast.AccessorDeclaration
	setAccessor    *ast.SetAccessorDeclaration
	getAccessor    *ast.GetAccessorDeclaration
}

func (c *Checker) getAllAccessorDeclarationsForDeclaration(accessor *ast.AccessorDeclaration) allAccessorDeclarations {
	// !!!
	// accessor = getParseTreeNode(accessor, isGetOrSetAccessorDeclaration)

	var otherKind ast.Kind
	if accessor.Kind == ast.KindSetAccessor {
		otherKind = ast.KindGetAccessor
	} else if accessor.Kind == ast.KindGetAccessor {
		otherKind = ast.KindSetAccessor
	} else {
		panic(fmt.Sprintf("Unexpected node kind %q", accessor.Kind))
	}
	otherAccessor := getDeclarationOfKind(c.getSymbolOfDeclaration(accessor), otherKind)

	var firstAccessor *ast.AccessorDeclaration
	var secondAccessor *ast.AccessorDeclaration
	if otherAccessor != nil && (otherAccessor.Pos() < accessor.Pos()) {
		firstAccessor = otherAccessor
		secondAccessor = accessor
	} else {
		firstAccessor = accessor
		secondAccessor = otherAccessor
	}

	var setAccessor *ast.SetAccessorDeclaration
	var getAccessor *ast.GetAccessorDeclaration
	if accessor.Kind == ast.KindSetAccessor {
		setAccessor = accessor.AsSetAccessorDeclaration()
		if otherAccessor != nil {
			getAccessor = otherAccessor.AsGetAccessorDeclaration()
		}
	} else {
		getAccessor = accessor.AsGetAccessorDeclaration()
		if otherAccessor != nil {
			setAccessor = otherAccessor.AsSetAccessorDeclaration()
		}
	}

	return allAccessorDeclarations{
		firstAccessor:  firstAccessor,
		secondAccessor: secondAccessor,
		setAccessor:    setAccessor,
		getAccessor:    getAccessor,
	}
}

func (c *Checker) getTypeArguments(t *Type) []*Type {
	d := t.AsTypeReference()
	if d.resolvedTypeArguments == nil {
		n := d.target.AsInterfaceType()
		if !c.pushTypeResolution(t, TypeSystemPropertyNameResolvedTypeArguments) {
			return slices.Repeat([]*Type{c.errorType}, len(n.TypeParameters()))
		}
		var typeArguments []*Type
		node := t.AsTypeReference().node
		if node != nil {
			switch node.Kind {
			case ast.KindTypeReference:
				typeArguments = append(n.OuterTypeParameters(), c.getEffectiveTypeArguments(node, n.LocalTypeParameters())...)
			case ast.KindArrayType:
				typeArguments = []*Type{c.getTypeFromTypeNode(node.AsArrayTypeNode().ElementType)}
			case ast.KindTupleType:
				typeArguments = core.Map(node.AsTupleTypeNode().Elements.Nodes, c.getTypeFromTypeNode)
			default:
				panic("Unhandled case in getTypeArguments")
			}
		}
		if c.popTypeResolution() {
			if d.resolvedTypeArguments == nil {
				d.resolvedTypeArguments = c.instantiateTypes(typeArguments, d.mapper)
			}
		} else {
			if d.resolvedTypeArguments == nil {
				d.resolvedTypeArguments = slices.Repeat([]*Type{c.errorType}, len(n.TypeParameters()))
			}
			errorNode := core.IfElse(node != nil, node, c.currentNode)
			if d.target.symbol != nil {
				c.error(errorNode, diagnostics.Type_arguments_for_0_circularly_reference_themselves, c.symbolToString(d.target.symbol))
			} else {
				c.error(errorNode, diagnostics.Tuple_type_arguments_circularly_reference_themselves)
			}
		}
	}
	return d.resolvedTypeArguments
}

func (c *Checker) getEffectiveTypeArguments(node *ast.Node, typeParameters []*Type) []*Type {
	return c.fillMissingTypeArguments(core.Map(node.TypeArguments(), c.getTypeFromTypeNode), typeParameters, c.getMinTypeArgumentCount(typeParameters))
}

/**
 * Gets the minimum number of type arguments needed to satisfy all non-optional type
 * parameters.
 */
func (c *Checker) getMinTypeArgumentCount(typeParameters []*Type) int {
	minTypeArgumentCount := 0
	for i, typeParameter := range typeParameters {
		if !c.hasTypeParameterDefault(typeParameter) {
			minTypeArgumentCount = i + 1
		}
	}
	return minTypeArgumentCount
}

func (c *Checker) hasTypeParameterDefault(t *Type) bool {
	return t.symbol != nil && core.Some(t.symbol.Declarations, func(d *ast.Node) bool {
		return ast.IsTypeParameterDeclaration(d) && d.AsTypeParameter().DefaultType != nil
	})
}

func (c *Checker) fillMissingTypeArguments(typeArguments []*Type, typeParameters []*Type, minTypeArgumentCount int) []*Type {
	numTypeParameters := len(typeParameters)
	if numTypeParameters == 0 {
		return nil
	}
	numTypeArguments := len(typeArguments)
	if numTypeArguments >= minTypeArgumentCount && numTypeArguments < numTypeParameters {
		result := make([]*Type, numTypeParameters)
		copy(result, typeArguments)
		// Map invalid forward references in default types to the error type
		for i := numTypeArguments; i < numTypeParameters; i++ {
			result[i] = c.errorType
		}
		for i := numTypeArguments; i < numTypeParameters; i++ {
			defaultType := c.getDefaultFromTypeParameter(typeParameters[i])
			if defaultType != nil {
				result[i] = c.instantiateType(defaultType, newTypeMapper(typeParameters, result))
			} else {
				result[i] = c.unknownType
			}
		}
		return result
	}
	return typeArguments
}

func (c *Checker) getDefaultFromTypeParameter(t *Type) *Type {
	return c.unknownType // !!!
}

func (c *Checker) getDefaultOrUnknownFromTypeParameter(t *Type) *Type {
	result := c.getDefaultFromTypeParameter(t)
	return core.IfElse(result != nil, result, c.unknownType)
}

func (c *Checker) getNamedMembers(members ast.SymbolTable) []*ast.Symbol {
	var result []*ast.Symbol
	for id, symbol := range members {
		if c.isNamedMember(symbol, id) {
			result = append(result, symbol)
		}
		sortSymbols(result)
	}
	return result
}

func (c *Checker) isNamedMember(symbol *ast.Symbol, id string) bool {
	return !isReservedMemberName(id) && c.symbolIsValue(symbol)
}

// A reserved member name consists of the byte 0xFE (which is an invalid UTF-8 encoding) followed by one or more
// characters where the first character is not '@' or '#'. The '@' character indicates that the name is denoted by
// a well known ES Symbol instance and the '#' character indicates that the name is a PrivateIdentifier.
func isReservedMemberName(name string) bool {
	return len(name) >= 2 && name[0] == '\xFE' && name[1] != '@' && name[1] != '#'
}

func (c *Checker) symbolIsValue(symbol *ast.Symbol) bool {
	return c.symbolIsValueEx(symbol, false /*includeTyoeOnlyMembers*/)
}

func (c *Checker) symbolIsValueEx(symbol *ast.Symbol, includeTypeOnlyMembers bool) bool {
	return symbol.Flags&ast.SymbolFlagsValue != 0 || symbol.Flags&ast.SymbolFlagsAlias != 0 &&
		c.getSymbolFlagsEx(symbol, !includeTypeOnlyMembers, false /*excludeLocalMeanings*/)&ast.SymbolFlagsValue != 0
}

func (c *Checker) instantiateType(t *Type, m *TypeMapper) *Type {
	return c.instantiateTypeWithAlias(t, m, nil /*alias*/)
}

func (c *Checker) instantiateTypeWithAlias(t *Type, m *TypeMapper, alias *TypeAlias) *Type {
	if t == nil || m == nil || !c.couldContainTypeVariables(t) {
		return t
	}
	if c.instantiationDepth == 100 || c.instantiationCount >= 5_000_000 {
		// We have reached 100 recursive type instantiations, or 5M type instantiations caused by the same statement
		// or expression. There is a very high likelyhood we're dealing with a combination of infinite generic types
		// that perpetually generate new type identities, so we stop the recursion here by yielding the error type.
		c.error(c.currentNode, diagnostics.Type_instantiation_is_excessively_deep_and_possibly_infinite)
		return c.errorType
	}
	c.totalInstantiationCount++
	c.instantiationCount++
	c.instantiationDepth++
	result := c.instantiateTypeWorker(t, m, alias)
	c.instantiationDepth--
	return result
}

// Return true if the given type could possibly reference a type parameter for which
// we perform type inference (i.e. a type parameter of a generic function). We cache
// results for union and intersection types for performance reasons.
func (c *Checker) couldContainTypeVariablesWorker(t *Type) bool {
	if t.flags&TypeFlagsStructuredOrInstantiable == 0 {
		return false
	}
	objectFlags := t.objectFlags
	if objectFlags&ObjectFlagsCouldContainTypeVariablesComputed != 0 {
		return objectFlags&ObjectFlagsCouldContainTypeVariables != 0
	}
	result := t.flags&TypeFlagsInstantiable != 0 ||
		t.flags&TypeFlagsObject != 0 && !c.isNonGenericTopLevelType(t) && (objectFlags&ObjectFlagsReference != 0 && (t.AsTypeReference().node != nil || core.Some(c.getTypeArguments(t), c.couldContainTypeVariables)) ||
			objectFlags&ObjectFlagsSingleSignatureType != 0 && len(t.AsSingleSignatureType().outerTypeParameters) != 0 ||
			objectFlags&ObjectFlagsAnonymous != 0 && t.symbol != nil && t.symbol.Flags&(ast.SymbolFlagsFunction|ast.SymbolFlagsMethod|ast.SymbolFlagsClass|ast.SymbolFlagsTypeLiteral|ast.SymbolFlagsObjectLiteral) != 0 && t.symbol.Declarations != nil ||
			objectFlags&(ObjectFlagsMapped|ObjectFlagsReverseMapped|ObjectFlagsObjectRestType|ObjectFlagsInstantiationExpressionType) != 0) ||
		t.flags&TypeFlagsUnionOrIntersection != 0 && t.flags&TypeFlagsEnumLiteral == 0 && !c.isNonGenericTopLevelType(t) && core.Some(t.Types(), c.couldContainTypeVariables)
	t.objectFlags |= ObjectFlagsCouldContainTypeVariablesComputed | core.IfElse(result, ObjectFlagsCouldContainTypeVariables, 0)
	return result
}

func (c *Checker) isNonGenericTopLevelType(t *Type) bool {
	if t.alias != nil && len(t.alias.typeArguments) == 0 {
		declaration := getDeclarationOfKind(t.alias.symbol, ast.KindTypeAliasDeclaration)
		return declaration != nil && ast.FindAncestorOrQuit(declaration.Parent, func(n *ast.Node) ast.FindAncestorResult {
			switch n.Kind {
			case ast.KindSourceFile:
				return ast.FindAncestorTrue
			case ast.KindModuleDeclaration:
				return ast.FindAncestorFalse
			}
			return ast.FindAncestorQuit
		}) != nil
	}
	return false
}

func (c *Checker) instantiateTypeWorker(t *Type, m *TypeMapper, alias *TypeAlias) *Type {
	flags := t.flags
	switch {
	case flags&TypeFlagsTypeParameter != 0:
		return m.Map(t)
	case flags&TypeFlagsObject != 0:
		objectFlags := t.objectFlags
		if objectFlags&(ObjectFlagsReference|ObjectFlagsAnonymous|ObjectFlagsMapped) != 0 {
			if objectFlags&ObjectFlagsReference != 0 && t.AsTypeReference().node == nil {
				resolvedTypeArguments := t.AsTypeReference().resolvedTypeArguments
				newTypeArguments := c.instantiateTypes(resolvedTypeArguments, m)
				if core.Same(newTypeArguments, resolvedTypeArguments) {
					return t
				}
				return c.createNormalizedTypeReference(t.Target(), newTypeArguments)
			}
			if objectFlags&ObjectFlagsReverseMapped != 0 {
				return c.instantiateReverseMappedType(t, m)
			}
			return c.getObjectTypeInstantiation(t, m, alias)
		}
		return t
	case flags&TypeFlagsUnionOrIntersection != 0:
		source := t
		if t.flags&TypeFlagsUnion != 0 {
			origin := t.AsUnionType().origin
			if origin != nil && origin.flags&TypeFlagsUnionOrIntersection != 0 {
				source = origin
			}
		}
		types := source.Types()
		newTypes := c.instantiateTypes(types, m)
		if core.Same(newTypes, types) && alias.Symbol() == t.alias.Symbol() {
			return t
		}
		if alias == nil {
			alias = c.instantiateTypeAlias(t.alias, m)
		}
		if source.flags&TypeFlagsIntersection != 0 {
			return c.getIntersectionTypeEx(newTypes, IntersectionFlagsNone, alias)
		}
		return c.getUnionTypeEx(newTypes, UnionReductionLiteral, alias, nil /*origin*/)
	case flags&TypeFlagsIndex != 0:
		return c.getIndexType(c.instantiateType(t.Target(), m))
	case flags&TypeFlagsIndexedAccess != 0:
		if alias == nil {
			alias = c.instantiateTypeAlias(t.alias, m)
		}
		d := t.AsIndexedAccessType()
		return c.getIndexedAccessTypeEx(c.instantiateType(d.objectType, m), c.instantiateType(d.indexType, m), d.accessFlags, nil /*accessNode*/, alias)
	case flags&TypeFlagsTemplateLiteral != 0:
		return c.getTemplateLiteralType(t.AsTemplateLiteralType().texts, c.instantiateTypes(t.AsTemplateLiteralType().types, m))
	case flags&TypeFlagsStringMapping != 0:
		return c.getStringMappingType(t.symbol, c.instantiateType(t.AsStringMappingType().target, m))
		// !!!
		// case flags&TypeFlagsConditional != 0:
		// 	return c.getConditionalTypeInstantiation(t.(ConditionalType), c.combineTypeMappers((t.(ConditionalType)).mapper, m) /*forConstraint*/, false, aliasSymbol, aliasTypeArguments)
		// case flags&TypeFlagsSubstitution != 0:
		// 	newBaseType := c.instantiateType((t.(SubstitutionType)).baseType, m)
		// 	if c.isNoInferType(t) {
		// 		return c.getNoInferType(newBaseType)
		// 	}
		// 	newConstraint := c.instantiateType((t.(SubstitutionType)).constraint, m)
		// 	// A substitution type originates in the true branch of a conditional type and can be resolved
		// 	// to just the base type in the same cases as the conditional type resolves to its true branch
		// 	// (because the base type is then known to satisfy the constraint).
		// 	if newBaseType.flags&TypeFlagsTypeVariable && c.isGenericType(newConstraint) {
		// 		return c.getSubstitutionType(newBaseType, newConstraint)
		// 	}
		// 	if newConstraint.flags&TypeFlagsAnyOrUnknown || c.isTypeAssignableTo(c.getRestrictiveInstantiation(newBaseType), c.getRestrictiveInstantiation(newConstraint)) {
		// 		return newBaseType
		// 	}
		// 	if newBaseType.flags & TypeFlagsTypeVariable {
		// 		return c.getSubstitutionType(newBaseType, newConstraint)
		// 	} else {
		// 		return c.getIntersectionType([]Type{newConstraint, newBaseType})
		// 	}
	}
	return t
}

// Handles instantion of the following object types:
// AnonymousType (ObjectFlagsAnonymous)
// TypeReference with node != nil (ObjectFlagsReference)
// SingleSignatureType (ObjectFlagsSingleSignatureType)
// InstantiationExpressionType (ObjectFlagsInstantiationExpressionType)
// MappedType (ObjectFlagsMapped)
func (c *Checker) getObjectTypeInstantiation(t *Type, m *TypeMapper, alias *TypeAlias) *Type {
	var declaration *ast.Node
	var target *Type
	var typeParameters []*Type
	switch {
	case t.objectFlags&ObjectFlagsReference != 0: // Deferred type reference
		declaration = t.AsTypeReference().node
	case t.objectFlags&ObjectFlagsInstantiationExpressionType != 0:
		declaration = t.AsInstantiationExpressionType().node
	default:
		declaration = t.symbol.Declarations[0]
	}
	links := c.typeNodeLinks.get(declaration)
	switch {
	case t.objectFlags&ObjectFlagsReference != 0: // Deferred type reference
		target = links.resolvedType
	case t.objectFlags&ObjectFlagsInstantiated != 0:
		target = t.Target()
	default:
		target = t
	}
	if t.objectFlags&ObjectFlagsSingleSignatureType != 0 {
		typeParameters = t.AsSingleSignatureType().outerTypeParameters
	} else {
		typeParameters = links.outerTypeParameters
		if typeParameters == nil {
			// The first time an anonymous type is instantiated we compute and store a list of the type
			// parameters that are in scope (and therefore potentially referenced). For type literals that
			// aren't the right hand side of a generic type alias declaration we optimize by reducing the
			// set of type parameters to those that are possibly referenced in the literal.
			typeParameters = c.getOuterTypeParameters(declaration, true /*includeThisTypes*/)
			if len(target.alias.TypeArguments()) == 0 {
				if t.objectFlags&(ObjectFlagsReference|ObjectFlagsInstantiationExpressionType) != 0 {
					typeParameters = core.Filter(typeParameters, func(tp *Type) bool {
						return c.isTypeParameterPossiblyReferenced(tp, declaration)
					})
				} else if target.symbol.Flags&(ast.SymbolFlagsMethod|ast.SymbolFlagsTypeLiteral) != 0 {
					typeParameters = core.Filter(typeParameters, func(tp *Type) bool {
						return core.Some(t.symbol.Declarations, func(d *ast.Node) bool {
							return c.isTypeParameterPossiblyReferenced(tp, d)
						})
					})
				}
			}
			if typeParameters == nil {
				typeParameters = []*Type{}
			}
			links.outerTypeParameters = typeParameters
		}
	}
	if len(typeParameters) == 0 {
		return t
	}
	// We are instantiating an anonymous type that has one or more type parameters in scope. Apply the
	// mapper to the type parameters to produce the effective list of type arguments, and compute the
	// instantiation cache key from the type IDs of the type arguments.
	combinedMapper := c.combineTypeMappers(t.Mapper(), m)
	typeArguments := make([]*Type, len(typeParameters))
	for i, tp := range typeParameters {
		typeArguments[i] = combinedMapper.Map(tp)
	}
	newAlias := alias
	if newAlias == nil {
		newAlias = c.instantiateTypeAlias(t.alias, m)
	}
	data := target.AsObjectType()
	key := getTypeInstantiationKey(typeArguments, alias, t.objectFlags&ObjectFlagsSingleSignatureType != 0)
	if data.instantiations == nil {
		data.instantiations = make(map[string]*Type)
		data.instantiations[getTypeInstantiationKey(typeParameters, target.alias, false)] = target
	}
	result := data.instantiations[key]
	if result == nil {
		if t.objectFlags&ObjectFlagsSingleSignatureType != 0 {
			result = c.instantiateAnonymousType(t, m, nil /*alias*/)
			data.instantiations[key] = result
			return result
		}
		newMapper := newTypeMapper(typeParameters, typeArguments)
		switch {
		case target.objectFlags&ObjectFlagsReference != 0:
			result = c.createDeferredTypeReference(t.Target(), t.AsTypeReference().node, newMapper, newAlias)
		case target.objectFlags&ObjectFlagsMapped != 0:
			result = c.instantiateMappedType(target, newMapper, newAlias)
		default:
			result = c.instantiateAnonymousType(target, newMapper, newAlias)
		}
		data.instantiations[key] = result
	}
	return result
}

func (c *Checker) maybeTypeParameterReference(node *ast.Node) bool {
	return !(ast.IsTypeReferenceNode(node.Parent) && len(node.Parent.TypeArguments()) != 0 && node == node.Parent.AsTypeReferenceNode().TypeName ||
		ast.IsImportTypeNode(node.Parent) && len(node.Parent.TypeArguments()) != 0 && node == node.Parent.AsImportTypeNode().Qualifier)
}

func (c *Checker) isTypeParameterPossiblyReferenced(tp *Type, node *ast.Node) bool {
	var containsReference func(*ast.Node) bool
	containsReference = func(node *ast.Node) bool {
		switch node.Kind {
		case ast.KindThisType:
			return tp.AsTypeParameter().isThisType
		case ast.KindIdentifier:
			return !tp.AsTypeParameter().isThisType && isPartOfTypeNode(node) && c.maybeTypeParameterReference(node) && c.getTypeFromTypeNodeWorker(node) == tp
			// use worker because we're looking for === equality
		case ast.KindTypeQuery:
			entityName := node.AsTypeQueryNode().ExprName
			firstIdentifier := getFirstIdentifier(entityName)
			if !isThisIdentifier(firstIdentifier) {
				firstIdentifierSymbol := c.getResolvedSymbol(firstIdentifier)
				tpDeclaration := tp.symbol.Declarations[0] // There is exactly one declaration, otherwise `containsReference` is not called
				var tpScope *ast.Node
				switch {
				case ast.IsTypeParameterDeclaration(tpDeclaration):
					tpScope = tpDeclaration.Parent // Type parameter is a regular type parameter, e.g. foo<T>
				case tp.AsTypeParameter().isThisType:
					tpScope = tpDeclaration // Type parameter is the this type, and its declaration is the class declaration.
				}
				if tpScope != nil {
					return core.Some(firstIdentifierSymbol.Declarations, func(d *ast.Node) bool { return isNodeDescendantOf(d, tpScope) }) ||
						core.Some(node.TypeArguments(), containsReference)
				}
			}
			return true
		case ast.KindMethodDeclaration, ast.KindMethodSignature:
			returnType := node.Type()
			return returnType == nil && getBodyOfNode(node) != nil ||
				core.Some(node.TypeParameters(), containsReference) ||
				core.Some(node.Parameters(), containsReference) ||
				returnType != nil && containsReference(returnType)
		}
		return node.ForEachChild(containsReference)
	}
	// If the type parameter doesn't have exactly one declaration, if there are intervening statement blocks
	// between the node and the type parameter declaration, if the node contains actual references to the
	// type parameter, or if the node contains type queries that we can't prove couldn't contain references to the type parameter,
	// we consider the type parameter possibly referenced.
	if tp.symbol != nil && tp.symbol.Declarations != nil && len(tp.symbol.Declarations) == 1 {
		container := tp.symbol.Declarations[0].Parent
		for n := node; n != container; n = n.Parent {
			if n == nil || ast.IsBlock(n) || ast.IsConditionalTypeNode(n) && n.AsConditionalTypeNode().ExtendsType.ForEachChild(containsReference) {
				return true
			}
		}
		return containsReference(node)
	}
	return true
}

func (c *Checker) instantiateAnonymousType(t *Type, m *TypeMapper, alias *TypeAlias) *Type {
	// !!! Debug.assert(t.symbol, "anonymous type must have symbol to be instantiated")
	result := c.newObjectType(t.objectFlags&^(ObjectFlagsCouldContainTypeVariablesComputed|ObjectFlagsCouldContainTypeVariables)|ObjectFlagsInstantiated, t.symbol)
	switch {
	case t.objectFlags&ObjectFlagsMapped != 0:
		result.AsMappedType().declaration = t.AsMappedType().declaration
		// C.f. instantiateSignature
		origTypeParameter := c.getTypeParameterFromMappedType(t)
		freshTypeParameter := c.cloneTypeParameter(origTypeParameter)
		result.AsMappedType().typeParameter = freshTypeParameter
		m = c.combineTypeMappers(newSimpleTypeMapper(origTypeParameter, freshTypeParameter), m)
		freshTypeParameter.AsTypeParameter().mapper = m
	case t.objectFlags&ObjectFlagsInstantiationExpressionType != 0:
		result.AsInstantiationExpressionType().node = t.AsInstantiationExpressionType().node
	case t.objectFlags&ObjectFlagsSingleSignatureType != 0:
		result.AsSingleSignatureType().outerTypeParameters = t.AsSingleSignatureType().outerTypeParameters
	}
	if alias == nil {
		alias = c.instantiateTypeAlias(t.alias, m)
	}
	result.alias = alias
	if alias != nil && len(alias.typeArguments) != 0 {
		result.objectFlags |= c.getPropagatingFlagsOfTypes(result.alias.typeArguments, TypeFlagsNone)
	}
	d := result.AsObjectType()
	d.target = t
	d.mapper = m
	return result
}

func (c *Checker) cloneTypeParameter(tp *Type) *Type {
	result := c.newTypeParameter(tp.symbol)
	result.AsTypeParameter().target = tp
	return result
}

func (c *Checker) getHomomorphicTypeVariable(t *Type) *Type {
	return nil // !!!
}

func (c *Checker) instantiateMappedType(t *Type, m *TypeMapper, alias *TypeAlias) *Type {
	return c.anyType // !!!
}

func (c *Checker) getTypeParameterFromMappedType(t *Type) *Type {
	return c.anyType // !!!
}

func (c *Checker) getConstraintTypeFromMappedType(t *Type) *Type {
	return c.anyType // !!!
}

func (c *Checker) getNameTypeFromMappedType(t *Type) *Type {
	return c.anyType // !!!
}

func (c *Checker) getTemplateTypeFromMappedType(t *Type) *Type {
	return c.anyType // !!!
}

func (c *Checker) isMappedTypeWithKeyofConstraintDeclaration(t *Type) bool {
	constraintDeclaration := c.getConstraintDeclarationForMappedType(t)
	return ast.IsTypeOperatorNode(constraintDeclaration) && constraintDeclaration.AsTypeOperatorNode().Operator == ast.KindKeyOfKeyword
}

func (c *Checker) getConstraintDeclarationForMappedType(t *Type) *ast.Node {
	return t.AsMappedType().declaration.AsMappedTypeNode().TypeParameter.AsTypeParameter().Constraint
}

func (c *Checker) getApparentMappedTypeKeys(nameType *Type, targetType *Type) *Type {
	modifiersType := c.getApparentType(c.getModifiersTypeFromMappedType(targetType))
	var mappedKeys []*Type
	c.forEachMappedTypePropertyKeyTypeAndIndexSignatureKeyType(modifiersType, TypeFlagsStringOrNumberLiteralOrUnique, false, func(t *Type) {
		mappedKeys = append(mappedKeys, c.instantiateType(nameType, appendTypeMapping(targetType.Mapper(), c.getTypeParameterFromMappedType(targetType), t)))
	})
	return c.getUnionType(mappedKeys)
}

func (c *Checker) forEachMappedTypePropertyKeyTypeAndIndexSignatureKeyType(t *Type, include TypeFlags, stringsOnly bool, cb func(keyType *Type)) {
	for _, prop := range c.getPropertiesOfType(t) {
		cb(c.getLiteralTypeFromProperty(prop, include, false))
	}
	if t.flags&TypeFlagsAny != 0 {
		cb(c.stringType)
	} else {
		for _, info := range c.getIndexInfosOfType(t) {
			if !stringsOnly || info.keyType.flags&(TypeFlagsString|TypeFlagsTemplateLiteral) != 0 {
				cb(info.keyType)
			}
		}
	}
}

func (c *Checker) instantiateReverseMappedType(t *Type, m *TypeMapper) *Type {
	return c.anyType // !!!
}

func (c *Checker) instantiateTypeAlias(alias *TypeAlias, m *TypeMapper) *TypeAlias {
	if alias == nil {
		return nil
	}
	return &TypeAlias{symbol: alias.symbol, typeArguments: c.instantiateTypes(alias.typeArguments, m)}
}

func (c *Checker) instantiateTypes(types []*Type, m *TypeMapper) []*Type {
	return instantiateList(c, types, m, (*Checker).instantiateType)
}

func (c *Checker) instantiateSymbols(symbols []*ast.Symbol, m *TypeMapper) []*ast.Symbol {
	return instantiateList(c, symbols, m, (*Checker).instantiateSymbol)
}

func (c *Checker) instantiateSignatures(signatures []*Signature, m *TypeMapper) []*Signature {
	return instantiateList(c, signatures, m, (*Checker).instantiateSignature)
}

func (c *Checker) instantiateIndexInfos(indexInfos []*IndexInfo, m *TypeMapper) []*IndexInfo {
	return instantiateList(c, indexInfos, m, (*Checker).instantiateIndexInfo)
}

func instantiateList[T comparable](c *Checker, values []T, m *TypeMapper, instantiator func(c *Checker, value T, m *TypeMapper) T) []T {
	for i, value := range values {
		mapped := instantiator(c, value, m)
		if mapped != value {
			result := make([]T, len(values))
			copy(result, values[:i])
			result[i] = mapped
			for j := i + 1; j < len(values); j++ {
				result[j] = instantiator(c, values[j], m)
			}
			return result
		}
	}
	return values
}

func (c *Checker) tryGetTypeFromEffectiveTypeNode(node *ast.Node) *Type {
	typeNode := node.Type()
	if typeNode != nil {
		return c.getTypeFromTypeNode(typeNode)
	}
	return nil
}

func (c *Checker) getTypeFromTypeNode(node *ast.Node) *Type {
	return c.getConditionalFlowTypeOfType(c.getTypeFromTypeNodeWorker(node), node)
}

func (c *Checker) getTypeFromTypeNodeWorker(node *ast.Node) *Type {
	switch node.Kind {
	case ast.KindAnyKeyword:
		return c.anyType
	case ast.KindUnknownKeyword:
		return c.unknownType
	case ast.KindStringKeyword:
		return c.stringType
	case ast.KindNumberKeyword:
		return c.numberType
	case ast.KindBigIntKeyword:
		return c.bigintType
	case ast.KindBooleanKeyword:
		return c.booleanType
	case ast.KindSymbolKeyword:
		return c.esSymbolType
	case ast.KindVoidKeyword:
		return c.voidType
	case ast.KindUndefinedKeyword:
		return c.undefinedType
	case ast.KindNullKeyword:
		return c.nullType
	case ast.KindNeverKeyword:
		return c.neverType
	case ast.KindObjectKeyword:
		if node.Flags&ast.NodeFlagsJavaScriptFile != 0 && !c.noImplicitAny {
			return c.anyType
		} else {
			return c.nonPrimitiveType
		}
	case ast.KindIntrinsicKeyword:
		return c.intrinsicMarkerType
	case ast.KindThisType, ast.KindThisKeyword:
		return c.getTypeFromThisTypeNode(node)
	case ast.KindLiteralType:
		return c.getTypeFromLiteralTypeNode(node)
	case ast.KindTypeReference, ast.KindExpressionWithTypeArguments:
		return c.getTypeFromTypeReference(node)
	case ast.KindTypePredicate:
		if node.AsTypePredicateNode().AssertsModifier != nil {
			return c.voidType
		}
		return c.booleanType
	// case KindTypeQuery:
	// 	return c.getTypeFromTypeQueryNode(node /* as TypeQueryNode */)
	case ast.KindArrayType, ast.KindTupleType:
		return c.getTypeFromArrayOrTupleTypeNode(node)
	case ast.KindOptionalType:
		return c.getTypeFromOptionalTypeNode(node)
	case ast.KindUnionType:
		return c.getTypeFromUnionTypeNode(node)
	case ast.KindIntersectionType:
		return c.getTypeFromIntersectionTypeNode(node)
	// case KindNamedTupleMember:
	// 	return c.getTypeFromNamedTupleTypeNode(node /* as NamedTupleMember */)
	case ast.KindParenthesizedType:
		return c.getTypeFromTypeNode(node.AsParenthesizedTypeNode().Type)
	case ast.KindRestType:
		return c.getTypeFromRestTypeNode(node)
	case ast.KindFunctionType, ast.KindConstructorType, ast.KindTypeLiteral:
		return c.getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node)
	case ast.KindTypeOperator:
		return c.getTypeFromTypeOperatorNode(node)
	case ast.KindIndexedAccessType:
		return c.getTypeFromIndexedAccessTypeNode(node)
	case ast.KindTemplateLiteralType:
		return c.getTypeFromTemplateTypeNode(node)
	// !!!
	// case KindMappedType:
	// 	return c.getTypeFromMappedTypeNode(node /* as MappedTypeNode */)
	// case KindConditionalType:
	// 	return c.getTypeFromConditionalTypeNode(node /* as ConditionalTypeNode */)
	// case KindInferType:
	// 	return c.getTypeFromInferTypeNode(node /* as InferTypeNode */)
	// case KindImportType:
	// 	return c.getTypeFromImportTypeNode(node /* as ImportTypeNode */)
	// case KindIdentifier, /* as TypeNodeast.Kind */
	// 	KindQualifiedName, /* as TypeNodeast.Kind */
	// 	KindPropertyAccessExpression /* as TypeNodeast.Kind */ :
	// 	symbol := c.getSymbolAtLocation(node)
	// 	if symbol {
	// 		return c.getDeclaredTypeOfSymbol(symbol)
	// 	} else {
	// 		return c.errorType
	// 	}
	default:
		return c.errorType
	}
}

func (c *Checker) getTypeFromThisTypeNode(node *ast.Node) *Type {
	links := c.typeNodeLinks.get(node)
	if links.resolvedType == nil {
		links.resolvedType = c.getThisType(node)
	}
	return links.resolvedType
}

func (c *Checker) getThisType(node *ast.Node) *Type {
	container := getThisContainer(node /*includeArrowFunctions*/, false /*includeClassComputedPropertyName*/, false)
	if container != nil {
		parent := container.Parent
		if parent != nil && (ast.IsClassLike(parent) || ast.IsInterfaceDeclaration(parent)) {
			if !isStatic(container) && (!ast.IsConstructorDeclaration(container) || isNodeDescendantOf(node, getBodyOfNode(container))) {
				return c.getDeclaredTypeOfClassOrInterface(c.getSymbolOfDeclaration(parent)).AsInterfaceType().thisType
			}
		}
	}
	c.error(node, diagnostics.A_this_type_is_available_only_in_a_non_static_member_of_a_class_or_interface)
	return c.errorType
}

func (c *Checker) getTypeFromLiteralTypeNode(node *ast.Node) *Type {
	if node.AsLiteralTypeNode().Literal.Kind == ast.KindNullKeyword {
		return c.nullType
	}
	links := c.typeNodeLinks.get(node)
	if links.resolvedType == nil {
		links.resolvedType = c.getRegularTypeOfLiteralType(c.checkExpression(node.AsLiteralTypeNode().Literal))
	}
	return links.resolvedType
}

func (c *Checker) getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node *ast.Node) *Type {
	links := c.typeNodeLinks.get(node)
	if links.resolvedType == nil {
		// Deferred resolution of members is handled by resolveObjectTypeMembers
		alias := c.getAliasForTypeNode(node)
		if len(c.getMembersOfSymbol(node.Symbol())) == 0 && alias == nil {
			links.resolvedType = c.emptyTypeLiteralType
		} else {
			t := c.newObjectType(ObjectFlagsAnonymous, node.Symbol())
			t.alias = alias
			links.resolvedType = t
		}
	}
	return links.resolvedType
}

func (c *Checker) getTypeFromIndexedAccessTypeNode(node *ast.Node) *Type {
	links := c.typeNodeLinks.get(node)
	if links.resolvedType == nil {
		objectType := c.getTypeFromTypeNode(node.AsIndexedAccessTypeNode().ObjectType)
		indexType := c.getTypeFromTypeNode(node.AsIndexedAccessTypeNode().IndexType)
		potentialAlias := c.getAliasForTypeNode(node)
		links.resolvedType = c.getIndexedAccessTypeEx(objectType, indexType, AccessFlagsNone, node, potentialAlias)
	}
	return links.resolvedType
}

func (c *Checker) getTypeFromTypeOperatorNode(node *ast.Node) *Type {
	links := c.typeNodeLinks.get(node)
	if links.resolvedType == nil {
		argType := node.AsTypeOperatorNode().Type
		switch node.AsTypeOperatorNode().Operator {
		case ast.KindKeyOfKeyword:
			links.resolvedType = c.getIndexType(c.getTypeFromTypeNode(argType))
		case ast.KindUniqueKeyword:
			if argType.Kind == ast.KindSymbolKeyword {
				links.resolvedType = c.getESSymbolLikeTypeForNode(ast.WalkUpParenthesizedTypes(node.Parent))
			} else {
				links.resolvedType = c.errorType
			}
		case ast.KindReadonlyKeyword:
			links.resolvedType = c.getTypeFromTypeNode(argType)
		default:
			panic("Unhandled case in getTypeFromTypeOperatorNode")
		}
	}
	return links.resolvedType
}

func (c *Checker) getESSymbolLikeTypeForNode(node *ast.Node) *Type {
	if isValidESSymbolDeclaration(node) {
		symbol := c.getSymbolOfNode(node)
		if symbol != nil {
			uniqueType := c.uniqueESSymbolTypes[symbol]
			if uniqueType == nil {
				var b KeyBuilder
				b.WriteString(InternalSymbolNamePrefix)
				b.WriteByte('@')
				b.WriteString(symbol.Name)
				b.WriteByte('@')
				b.WriteSymbol(symbol)
				uniqueType = c.newUniqueESSymbolType(symbol, b.String())
				c.uniqueESSymbolTypes[symbol] = uniqueType
			}
			return uniqueType
		}
	}
	return c.esSymbolType
}

func (c *Checker) getTypeFromTypeReference(node *ast.Node) *Type {
	links := c.typeNodeLinks.get(node)
	if links.resolvedType == nil {
		// handle LS queries on the `const` in `x as const` by resolving to the type of `x`
		if isConstTypeReference(node) && ast.IsAssertionExpression(node.Parent) {
			links.resolvedSymbol = c.unknownSymbol
			links.resolvedType = c.checkExpressionCached(node.Parent.Expression())
			return links.resolvedType
		}
		symbol := c.resolveTypeReferenceName(node, ast.SymbolFlagsType, false /*ignoreErrors*/)
		t := c.getTypeReferenceType(node, symbol)
		// Cache both the resolved symbol and the resolved type. The resolved symbol is needed when we check the
		// type reference in checkTypeReferenceNode.
		links.resolvedSymbol = symbol
		links.resolvedType = t
	}
	return links.resolvedType
}

func (c *Checker) resolveTypeReferenceName(typeReference *ast.Node, meaning ast.SymbolFlags, ignoreErrors bool) *ast.Symbol {
	name := getTypeReferenceName(typeReference)
	if name == nil {
		return c.unknownSymbol
	}
	symbol := c.resolveEntityName(name, meaning, ignoreErrors, false /*dontResolveAlias*/, nil /*location*/)
	if symbol != nil && symbol != c.unknownSymbol {
		return symbol
	}
	if ignoreErrors {
		return c.unknownSymbol
	}
	return c.unknownSymbol // !!! return c.getUnresolvedSymbolForEntityName(name)
}

func (c *Checker) getTypeReferenceType(node *ast.Node, symbol *ast.Symbol) *Type {
	if symbol == c.unknownSymbol {
		return c.errorType
	}
	if symbol.Flags&(ast.SymbolFlagsClass|ast.SymbolFlagsInterface) != 0 {
		return c.getTypeFromClassOrInterfaceReference(node, symbol)
	}
	if symbol.Flags&ast.SymbolFlagsTypeAlias != 0 {
		return c.getTypeFromTypeAliasReference(node, symbol)
	}
	// Get type from reference to named type that cannot be generic (enum or type parameter)
	res := c.tryGetDeclaredTypeOfSymbol(symbol)
	if res != nil && c.checkNoTypeArguments(node, symbol) {
		return c.getRegularTypeOfLiteralType(res)
	}
	return c.errorType
}

/**
 * Get type from type-reference that reference to class or interface
 */
func (c *Checker) getTypeFromClassOrInterfaceReference(node *ast.Node, symbol *ast.Symbol) *Type {
	t := c.getDeclaredTypeOfClassOrInterface(c.getMergedSymbol(symbol))
	d := t.AsInterfaceType()
	typeParameters := d.LocalTypeParameters()
	if len(typeParameters) != 0 {
		numTypeArguments := len(node.TypeArguments())
		minTypeArgumentCount := c.getMinTypeArgumentCount(typeParameters)
		if numTypeArguments < minTypeArgumentCount || numTypeArguments > len(typeParameters) {
			message := diagnostics.Generic_type_0_requires_1_type_argument_s
			if minTypeArgumentCount < len(typeParameters) {
				message = diagnostics.Generic_type_0_requires_between_1_and_2_type_arguments
			}
			typeStr := c.typeToString(t) // !!! /*enclosingDeclaration*/, nil, TypeFormatFlagsWriteArrayAsGenericType
			c.error(node, message, typeStr, minTypeArgumentCount, len(typeParameters))
			// TODO: Adopt same permissive behavior in TS as in JS to reduce follow-on editing experience failures (requires editing fillMissingTypeArguments)
			return c.errorType
		}
		if node.Kind == ast.KindTypeReference && c.isDeferredTypeReferenceNode(node, numTypeArguments != len(typeParameters)) {
			return c.createDeferredTypeReference(t, node, nil /*mapper*/, nil /*alias*/)
		}
		// In a type reference, the outer type parameters of the referenced class or interface are automatically
		// supplied as type arguments and the type reference only specifies arguments for the local type parameters
		// of the class or interface.
		localTypeArguments := c.fillMissingTypeArguments(c.getTypeArgumentsFromNode(node), typeParameters, minTypeArgumentCount)
		typeArguments := append(d.OuterTypeParameters(), localTypeArguments...)
		return c.createTypeReference(t, typeArguments)
	}
	if c.checkNoTypeArguments(node, symbol) {
		return t
	}
	return c.errorType
}

func (c *Checker) getTypeArgumentsFromNode(node *ast.Node) []*Type {
	return core.Map(node.TypeArguments(), c.getTypeFromTypeNode)
}

func (c *Checker) checkNoTypeArguments(node *ast.Node, symbol *ast.Symbol) bool {
	if len(node.TypeArguments()) != 0 {
		c.error(node, diagnostics.Type_0_is_not_generic, c.symbolToString(symbol))
		return false
	}
	return true
}

// Return true if the given type reference node is directly aliased or if it needs to be deferred
// because it is possibly contained in a circular chain of eagerly resolved types.
func (c *Checker) isDeferredTypeReferenceNode(node *ast.Node, hasDefaultTypeArguments bool) bool {
	if c.getAliasSymbolForTypeNode(node) != nil {
		return true
	}
	if c.isResolvedByTypeAlias(node) {
		switch node.Kind {
		case ast.KindArrayType:
			return c.mayResolveTypeAlias(node.AsArrayTypeNode().ElementType)
		case ast.KindTupleType:
			return core.Some(node.AsTupleTypeNode().Elements.Nodes, c.mayResolveTypeAlias)
		case ast.KindTypeReference:
			return hasDefaultTypeArguments || core.Some(node.TypeArguments(), c.mayResolveTypeAlias)
		}
		panic("Unhandled case in isDeferredTypeReferenceNode")
	}
	return false
}

// Return true when the given node is transitively contained in type constructs that eagerly
// resolve their constituent types. We include SyntaxKind.TypeReference because type arguments
// of type aliases are eagerly resolved.
func (c *Checker) isResolvedByTypeAlias(node *ast.Node) bool {
	parent := node.Parent
	switch parent.Kind {
	case ast.KindParenthesizedType, ast.KindNamedTupleMember, ast.KindTypeReference, ast.KindUnionType, ast.KindIntersectionType,
		ast.KindIndexedAccessType, ast.KindConditionalType, ast.KindTypeOperator, ast.KindArrayType, ast.KindTupleType:
		return c.isResolvedByTypeAlias(parent)
	case ast.KindTypeAliasDeclaration:
		return true
	}
	return false
}

// Return true if resolving the given node (i.e. getTypeFromTypeNode) possibly causes resolution
// of a type alias.
func (c *Checker) mayResolveTypeAlias(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindTypeReference:
		return c.resolveTypeReferenceName(node, ast.SymbolFlagsType, false).Flags&ast.SymbolFlagsTypeAlias != 0
	case ast.KindTypeQuery:
		return true
	case ast.KindTypeOperator:
		return node.AsTypeOperatorNode().Operator != ast.KindUniqueKeyword && c.mayResolveTypeAlias(node.AsTypeOperatorNode().Type)
	case ast.KindParenthesizedType:
		return c.mayResolveTypeAlias(node.AsParenthesizedTypeNode().Type)
	case ast.KindOptionalType:
		return c.mayResolveTypeAlias(node.AsOptionalTypeNode().Type)
	case ast.KindNamedTupleMember:
		return c.mayResolveTypeAlias(node.AsNamedTupleMember().Type)
	case ast.KindRestType:
		return node.AsRestTypeNode().Type.Kind != ast.KindArrayType || c.mayResolveTypeAlias(node.AsRestTypeNode().Type.AsArrayTypeNode().ElementType)
	case ast.KindUnionType:
		return core.Some(node.AsUnionTypeNode().Types.Nodes, c.mayResolveTypeAlias)
	case ast.KindIntersectionType:
		return core.Some(node.AsIntersectionTypeNode().Types.Nodes, c.mayResolveTypeAlias)
	case ast.KindIndexedAccessType:
		return c.mayResolveTypeAlias(node.AsIndexedAccessTypeNode().ObjectType) || c.mayResolveTypeAlias(node.AsIndexedAccessTypeNode().IndexType)
	case ast.KindConditionalType:
		return c.mayResolveTypeAlias(node.AsConditionalTypeNode().CheckType) || c.mayResolveTypeAlias(node.AsConditionalTypeNode().ExtendsType) ||
			c.mayResolveTypeAlias(node.AsConditionalTypeNode().TrueType) || c.mayResolveTypeAlias(node.AsConditionalTypeNode().FalseType)
	}
	return false
}

func (c *Checker) createNormalizedTypeReference(target *Type, typeArguments []*Type) *Type {
	if target.objectFlags&ObjectFlagsTuple != 0 {
		return c.createNormalizedTupleType(target, typeArguments)
	}
	return c.createTypeReference(target, typeArguments)
}

func (c *Checker) createNormalizedTupleType(target *Type, elementTypes []*Type) *Type {
	d := target.AsTupleType()
	if d.combinedFlags&ElementFlagsNonRequired == 0 {
		// No need to normalize when we only have regular required elements
		return c.createTypeReference(target, elementTypes)
	}
	if d.combinedFlags&ElementFlagsVariadic != 0 {
		for i, e := range elementTypes {
			if d.elementInfos[i].flags&ElementFlagsVariadic != 0 && e.flags&(TypeFlagsNever|TypeFlagsUnion) != 0 {
				// Transform [A, ...(X | Y | Z)] into [A, ...X] | [A, ...Y] | [A, ...Z]
				checkTypes := core.MapIndex(elementTypes, func(t *Type, i int) *Type {
					if d.elementInfos[i].flags&ElementFlagsVariadic != 0 {
						return t
					}
					return c.unknownType
				})
				if c.checkCrossProductUnion(checkTypes) {
					return c.mapType(e, func(t *Type) *Type {
						return c.createNormalizedTupleType(target, core.ReplaceElement(elementTypes, i, t))
					})
				}
			}
		}
	}
	// We have optional, rest, or variadic n that may need normalizing. Normalization ensures that all variadic
	// n are generic and that the tuple type has one of the following layouts, disregarding variadic n:
	// (1) Zero or more required n, followed by zero or more optional n, followed by zero or one rest element.
	// (2) Zero or more required n, followed by a rest element, followed by zero or more required n.
	// In either layout, zero or more generic variadic n may be present at any location.
	n := &TupleNormalizer{}
	if !n.normalize(c, elementTypes, d.elementInfos) {
		return c.errorType
	}
	tupleTarget := c.getTupleTargetType(n.infos, d.readonly)
	switch {
	case tupleTarget == c.emptyGenericType:
		return c.emptyObjectType
	case len(n.types) != 0:
		return c.createTypeReference(tupleTarget, n.types)
	}
	return tupleTarget
}

type TupleNormalizer struct {
	c                       *Checker
	types                   []*Type
	infos                   []TupleElementInfo
	lastRequiredIndex       int
	firstRestIndex          int
	lastOptionalOrRestIndex int
}

func (n *TupleNormalizer) normalize(c *Checker, elementTypes []*Type, elementInfos []TupleElementInfo) bool {
	n.c = c
	n.lastRequiredIndex = -1
	n.firstRestIndex = -1
	n.lastOptionalOrRestIndex = -1
	for i, t := range elementTypes {
		info := elementInfos[i]
		if info.flags&ElementFlagsVariadic != 0 {
			if t.flags&TypeFlagsAny != 0 {
				n.add(t, TupleElementInfo{flags: ElementFlagsRest, labeledDeclaration: info.labeledDeclaration})
			} else if t.flags&TypeFlagsInstantiableNonPrimitive != 0 || c.isGenericMappedType(t) {
				// Generic variadic elements stay as they are.
				n.add(t, info)
			} else if isTupleType(t) {
				spreadTypes := c.getElementTypes(t)
				if len(spreadTypes)+len(n.types) >= 10_000 {
					message := core.IfElse(isPartOfTypeNode(c.currentNode),
						diagnostics.Type_produces_a_tuple_type_that_is_too_large_to_represent,
						diagnostics.Expression_produces_a_tuple_type_that_is_too_large_to_represent)
					c.error(c.currentNode, message)
					return false
				}
				// Spread variadic elements with tuple types into the resulting tuple.
				spreadInfos := t.TargetTupleType().elementInfos
				for j, s := range spreadTypes {
					n.add(s, spreadInfos[j])
				}
			} else {
				// Treat everything else as an array type and create a rest element.
				var s *Type
				if c.isArrayLikeType(t) {
					s = c.getIndexTypeOfType(t, c.numberType)
				}
				if s == nil {
					s = c.errorType
				}
				n.add(s, TupleElementInfo{flags: ElementFlagsRest, labeledDeclaration: info.labeledDeclaration})
			}
		} else {
			// Copy other element kinds with no change.
			n.add(t, info)
		}
	}
	// Turn optional elements preceding the last required element into required elements
	for i := range n.lastRequiredIndex {
		if n.infos[i].flags&ElementFlagsOptional != 0 {
			n.infos[i].flags = ElementFlagsRequired
		}
	}
	if n.firstRestIndex >= 0 && n.firstRestIndex < n.lastOptionalOrRestIndex {
		// Turn elements between first rest and last optional/rest into a single rest element
		var types []*Type
		for i := n.firstRestIndex; i <= n.lastOptionalOrRestIndex; i++ {
			t := n.types[i]
			if n.infos[i].flags&ElementFlagsVariadic != 0 {
				t = c.getIndexedAccessType(t, c.numberType)
			}
			types = append(types, t)
		}
		n.types[n.firstRestIndex] = c.getUnionType(types)
		n.types = slices.Delete(n.types, n.firstRestIndex+1, n.lastOptionalOrRestIndex+1)
		n.infos = slices.Delete(n.infos, n.firstRestIndex+1, n.lastOptionalOrRestIndex+1)
	}
	return true
}

func (n *TupleNormalizer) add(t *Type, info TupleElementInfo) {
	if info.flags&ElementFlagsRequired != 0 {
		n.lastRequiredIndex = len(n.types)
	}
	if info.flags&ElementFlagsRest != 0 && n.firstRestIndex < 0 {
		n.firstRestIndex = len(n.types)
	}
	if info.flags&(ElementFlagsOptional|ElementFlagsRest) != 0 {
		n.lastOptionalOrRestIndex = len(n.types)
	}
	n.types = append(n.types, n.c.addOptionalityEx(t, true /*isProperty*/, info.flags&ElementFlagsOptional != 0))
	n.infos = append(n.infos, info)
}

// Return count of starting consecutive tuple elements of the given kind(s)
func getStartElementCount(t *TupleType, flags ElementFlags) int {
	for i, info := range t.elementInfos {
		if info.flags&flags == 0 {
			return i
		}
	}
	return len(t.elementInfos)
}

// Return count of ending consecutive tuple elements of the given kind(s)
func getEndElementCount(t *TupleType, flags ElementFlags) int {
	for i := len(t.elementInfos); i > 0; i-- {
		if t.elementInfos[i-1].flags&flags == 0 {
			return len(t.elementInfos) - i
		}
	}
	return len(t.elementInfos)
}

func getTotalFixedElementCount(t *TupleType) int {
	return t.fixedLength + getEndElementCount(t, ElementFlagsFixed)
}

func (c *Checker) getElementTypes(t *Type) []*Type {
	typeArguments := c.getTypeArguments(t)
	arity := c.getTypeReferenceArity(t)
	if len(typeArguments) == arity {
		return typeArguments
	}
	return typeArguments[0:arity]
}

func (c *Checker) getTypeReferenceArity(t *Type) int {
	return len(t.TargetInterfaceType().TypeParameters())
}

func (c *Checker) isArrayType(t *Type) bool {
	return t.objectFlags&ObjectFlagsReference != 0 && (t.Target() == c.globalArrayType || t.Target() == c.globalReadonlyArrayType)
}

func (c *Checker) isReadonlyArrayType(t *Type) bool {
	return t.objectFlags&ObjectFlagsReference != 0 && t.Target() == c.globalReadonlyArrayType
}

func isTupleType(t *Type) bool {
	return t.objectFlags&ObjectFlagsReference != 0 && t.Target().objectFlags&ObjectFlagsTuple != 0
}

func isMutableTupleType(t *Type) bool {
	return isTupleType(t) && !t.TargetTupleType().readonly
}

func isGenericTupleType(t *Type) bool {
	return isTupleType(t) && t.TargetTupleType().combinedFlags&ElementFlagsVariadic != 0
}

func isSingleElementGenericTupleType(t *Type) bool {
	return isGenericTupleType(t) && len(t.TargetTupleType().elementInfos) == 1
}

func (c *Checker) isArrayOrTupleType(t *Type) bool {
	return c.isArrayType(t) || isTupleType(t)
}

func (c *Checker) isMutableArrayOrTuple(t *Type) bool {
	return c.isArrayType(t) && !c.isReadonlyArrayType(t) || isTupleType(t) && !t.TargetTupleType().readonly
}

func (c *Checker) getElementTypeOfArrayType(t *Type) *Type {
	if c.isArrayType(t) {
		return c.getTypeArguments(t)[0]
	}
	return nil
}

func (c *Checker) isArrayLikeType(t *Type) bool {
	// A type is array-like if it is a reference to the global Array or global ReadonlyArray type,
	// or if it is not the undefined or null type and if it is assignable to ReadonlyArray<any>
	return c.isArrayType(t) || t.flags&TypeFlagsNullable == 0 && c.isTypeAssignableTo(t, c.anyReadonlyArrayType)
}

func (c *Checker) isMutableArrayLikeType(t *Type) bool {
	// A type is mutable-array-like if it is a reference to the global Array type, or if it is not the
	// any, undefined or null type and if it is assignable to Array<any>
	return c.isMutableArrayOrTuple(t) || t.flags&(TypeFlagsAny|TypeFlagsNullable) == 0 && c.isTypeAssignableTo(t, c.anyArrayType)
}

func (c *Checker) isEmptyArrayLiteralType(t *Type) bool {
	elementType := c.getElementTypeOfArrayType(t)
	return elementType != nil && c.isEmptyLiteralType(elementType)
}

func (c *Checker) isEmptyLiteralType(t *Type) bool {
	if c.strictNullChecks {
		return t == c.implicitNeverType
	}
	return t == c.undefinedWideningType
}

/**
 * Get type from reference to type alias. When a type alias is generic, the declared type of the type alias may include
 * references to the type parameters of the alias. We replace those with the actual type arguments by instantiating the
 * declared type. Instantiations are cached using the type identities of the type arguments as the key.
 */
func (c *Checker) getTypeFromTypeAliasReference(node *ast.Node, symbol *ast.Symbol) *Type {
	typeArguments := node.TypeArguments()
	if symbol.CheckFlags&ast.CheckFlagsUnresolved != 0 {
		alias := &TypeAlias{symbol: symbol, typeArguments: core.Map(typeArguments, c.getTypeFromTypeNode)}
		key := getAliasKey(alias)
		errorType := c.errorTypes[key]
		if errorType == nil {
			errorType = c.newIntrinsicType(TypeFlagsAny, "error")
			errorType.alias = alias
			c.errorTypes[key] = errorType
		}
		return errorType
	}
	t := c.getDeclaredTypeOfSymbol(symbol)
	typeParameters := c.typeAliasLinks.get(symbol).typeParameters
	if len(typeParameters) != 0 {
		numTypeArguments := len(typeArguments)
		minTypeArgumentCount := c.getMinTypeArgumentCount(typeParameters)
		if numTypeArguments < minTypeArgumentCount || numTypeArguments > len(typeParameters) {
			message := core.IfElse(minTypeArgumentCount == len(typeParameters),
				diagnostics.Generic_type_0_requires_1_type_argument_s,
				diagnostics.Generic_type_0_requires_between_1_and_2_type_arguments)
			c.error(node, message, c.symbolToString(symbol), minTypeArgumentCount, len(typeParameters))
			return c.errorType
		}
		// We refrain from associating a local type alias with an instantiation of a top-level type alias
		// because the local alias may end up being referenced in an inferred return type where it is not
		// accessible--which in turn may lead to a large structural expansion of the type when generating
		// a .d.ts file. See #43622 for an example.
		aliasSymbol := c.getAliasSymbolForTypeNode(node)
		var newAliasSymbol *ast.Symbol
		if aliasSymbol != nil && (isLocalTypeAlias(symbol) || !isLocalTypeAlias(aliasSymbol)) {
			newAliasSymbol = aliasSymbol
		}
		var aliasTypeArguments []*Type
		if newAliasSymbol != nil {
			aliasTypeArguments = c.getTypeArgumentsForAliasSymbol(newAliasSymbol)
		} else if isTypeReferenceType(node) {
			aliasSymbol := c.resolveTypeReferenceName(node, ast.SymbolFlagsAlias, true /*ignoreErrors*/)
			// refers to an alias import/export/reexport - by making sure we use the target as an aliasSymbol,
			// we ensure the exported symbol is used to refer to the type when it is reserialized later
			if aliasSymbol != nil && aliasSymbol != c.unknownSymbol {
				resolved := c.resolveAlias(aliasSymbol)
				if resolved != nil && resolved.Flags&ast.SymbolFlagsTypeAlias != 0 {
					newAliasSymbol = resolved
					aliasTypeArguments = c.getTypeArgumentsFromNode(node)
				}
			}
		}
		var newAlias *TypeAlias
		if newAliasSymbol != nil {
			newAlias = &TypeAlias{symbol: newAliasSymbol, typeArguments: aliasTypeArguments}
		}
		return c.getTypeAliasInstantiation(symbol, c.getTypeArgumentsFromNode(node), newAlias)
	}
	if c.checkNoTypeArguments(node, symbol) {
		return t
	}
	return c.errorType
}

func (c *Checker) getTypeAliasInstantiation(symbol *ast.Symbol, typeArguments []*Type, alias *TypeAlias) *Type {
	t := c.getDeclaredTypeOfSymbol(symbol)
	if t == c.intrinsicMarkerType {
		if typeKind, ok := intrinsicTypeKinds[symbol.Name]; ok && len(typeArguments) == 1 {
			switch typeKind {
			case IntrinsicTypeKindNoInfer:
				return c.getNoInferType(typeArguments[0])
			default:
				return c.getStringMappingType(symbol, typeArguments[0])
			}
		}
	}
	links := c.typeAliasLinks.get(symbol)
	typeParameters := links.typeParameters
	key := getTypeAliasInstantiationKey(typeArguments, alias)
	instantiation := links.instantiations[key]
	if instantiation == nil {
		mapper := newTypeMapper(typeParameters, c.fillMissingTypeArguments(typeArguments, typeParameters, c.getMinTypeArgumentCount(typeParameters)))
		instantiation = c.instantiateTypeWithAlias(t, mapper, alias)
		links.instantiations[key] = instantiation
	}
	return instantiation
}

func isLocalTypeAlias(symbol *ast.Symbol) bool {
	declaration := core.Find(symbol.Declarations, isTypeAlias)
	return declaration != nil && getContainingFunction(declaration) != nil
}

func (c *Checker) getDeclaredTypeOfSymbol(symbol *ast.Symbol) *Type {
	result := c.tryGetDeclaredTypeOfSymbol(symbol)
	if result == nil {
		result = c.errorType
	}
	return result
}

func (c *Checker) tryGetDeclaredTypeOfSymbol(symbol *ast.Symbol) *Type {
	switch {
	case symbol.Flags&(ast.SymbolFlagsClass|ast.SymbolFlagsInterface) != 0:
		return c.getDeclaredTypeOfClassOrInterface(symbol)
	case symbol.Flags&ast.SymbolFlagsTypeParameter != 0:
		return c.getDeclaredTypeOfTypeParameter(symbol)
	case symbol.Flags&ast.SymbolFlagsTypeAlias != 0:
		return c.getDeclaredTypeOfTypeAlias(symbol)
	case symbol.Flags&ast.SymbolFlagsEnum != 0:
		return c.getDeclaredTypeOfEnum(symbol)
	case symbol.Flags&ast.SymbolFlagsEnumMember != 0:
		return c.getDeclaredTypeOfEnumMember(symbol)
		// !!!
		// case symbol.flags&SymbolFlagsAlias != 0:
		// 	return c.getDeclaredTypeOfAlias(symbol)
	}
	return nil
}

func getTypeReferenceName(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindTypeReference:
		return node.AsTypeReference().TypeName
	case ast.KindExpressionWithTypeArguments:
		// We only support expressions that are simple qualified names. For other
		// expressions this produces nil
		expr := node.AsExpressionWithTypeArguments().Expression
		if isEntityNameExpression(expr) {
			return expr
		}
	}
	return nil
}

func (c *Checker) getAliasForTypeNode(node *ast.Node) *TypeAlias {
	symbol := c.getAliasSymbolForTypeNode(node)
	if symbol != nil {
		return &TypeAlias{symbol: symbol, typeArguments: c.getTypeArgumentsForAliasSymbol(symbol)}
	}
	return nil
}

func (c *Checker) getAliasSymbolForTypeNode(node *ast.Node) *ast.Symbol {
	host := node.Parent
	for ast.IsParenthesizedTypeNode(host) || ast.IsTypeOperatorNode(host) && host.AsTypeOperatorNode().Operator == ast.KindReadonlyKeyword {
		host = host.Parent
	}
	if isTypeAlias(host) {
		return c.getSymbolOfDeclaration(host)
	}
	return nil
}

func (c *Checker) getTypeArgumentsForAliasSymbol(symbol *ast.Symbol) []*Type {
	if symbol != nil {
		return c.getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol)
	}
	return nil
}

func (c *Checker) getOuterTypeParametersOfClassOrInterface(symbol *ast.Symbol) []*Type {
	declaration := symbol.ValueDeclaration
	if symbol.Flags&(ast.SymbolFlagsClass|ast.SymbolFlagsFunction) == 0 {
		declaration = core.Find(symbol.Declarations, func(d *ast.Node) bool {
			if d.Kind == ast.KindInterfaceDeclaration {
				return true
			}
			if d.Kind != ast.KindVariableDeclaration {
				return false
			}
			initializer := d.AsVariableDeclaration().Initializer
			return initializer != nil && (initializer.Kind == ast.KindFunctionExpression || initializer.Kind == ast.KindArrowFunction)
		})
	}
	// !!! Debug.assert(!!declaration, "Class was missing valueDeclaration -OR- non-class had no interface declarations")
	return c.getOuterTypeParameters(declaration, false /*includeThisTypes*/)
}

// Return the outer type parameters of a node or undefined if the node has no outer type parameters.
func (c *Checker) getOuterTypeParameters(node *ast.Node, includeThisTypes bool) []*Type {
	for {
		node = node.Parent
		if node == nil {
			return nil
		}
		kind := node.Kind
		switch kind {
		case ast.KindClassDeclaration, ast.KindClassExpression, ast.KindInterfaceDeclaration, ast.KindCallSignature, ast.KindConstructSignature,
			ast.KindMethodSignature, ast.KindFunctionType, ast.KindConstructorType, ast.KindJSDocFunctionType, ast.KindFunctionDeclaration,
			ast.KindMethodDeclaration, ast.KindFunctionExpression, ast.KindArrowFunction, ast.KindTypeAliasDeclaration, ast.KindMappedType,
			ast.KindConditionalType:
			outerTypeParameters := c.getOuterTypeParameters(node, includeThisTypes)
			if (kind == ast.KindFunctionExpression || kind == ast.KindArrowFunction || isObjectLiteralMethod(node)) && c.isContextSensitive(node) {
				signature := core.FirstOrNil(c.getSignaturesOfType(c.getTypeOfSymbol(c.getSymbolOfDeclaration(node)), SignatureKindCall))
				if signature != nil && len(signature.typeParameters) != 0 {
					return append(outerTypeParameters, signature.typeParameters...)
				}
			}
			if kind == ast.KindMappedType {
				return append(outerTypeParameters, c.getDeclaredTypeOfTypeParameter(c.getSymbolOfDeclaration((node.AsMappedTypeNode().TypeParameter))))
			}
			if kind == ast.KindConditionalType {
				return append(outerTypeParameters, c.getInferTypeParameters(node)...)
			}
			outerAndOwnTypeParameters := c.appendTypeParameters(outerTypeParameters, node.TypeParameters())
			var thisType *Type
			if includeThisTypes && (kind == ast.KindClassDeclaration || kind == ast.KindClassExpression || kind == ast.KindInterfaceDeclaration) {
				thisType = c.getDeclaredTypeOfClassOrInterface(c.getSymbolOfDeclaration(node)).AsInterfaceType().thisType
			}
			if thisType != nil {
				return append(outerAndOwnTypeParameters, thisType)
			}
			return outerAndOwnTypeParameters
		}
	}
}

func (c *Checker) getInferTypeParameters(node *ast.Node) []*Type {
	var result []*Type
	for _, symbol := range node.Locals() {
		if symbol.Flags&ast.SymbolFlagsTypeParameter != 0 {
			result = append(result, c.getDeclaredTypeOfSymbol(symbol))
		}
	}
	return result
}

// The local type parameters are the combined set of type parameters from all declarations of the class,
// interface, or type alias.
func (c *Checker) getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol *ast.Symbol) []*Type {
	return c.appendLocalTypeParametersOfClassOrInterfaceOrTypeAlias(nil, symbol)
}

func (c *Checker) appendLocalTypeParametersOfClassOrInterfaceOrTypeAlias(types []*Type, symbol *ast.Symbol) []*Type {
	for _, node := range symbol.Declarations {
		if ast.NodeKindIs(node, ast.KindInterfaceDeclaration, ast.KindClassDeclaration, ast.KindClassExpression) || isTypeAlias(node) {
			types = c.appendTypeParameters(types, node.TypeParameters())
		}
	}
	return types
}

// Appends the type parameters given by a list of declarations to a set of type parameters and returns the resulting set.
// The function allocates a new array if the input type parameter set is undefined, but otherwise it modifies the set
// in-place and returns the same array.
func (c *Checker) appendTypeParameters(typeParameters []*Type, declarations []*ast.Node) []*Type {
	for _, declaration := range declarations {
		typeParameters = core.AppendIfUnique(typeParameters, c.getDeclaredTypeOfTypeParameter(c.getSymbolOfDeclaration(declaration)))
	}
	return typeParameters
}

func (c *Checker) getDeclaredTypeOfTypeParameter(symbol *ast.Symbol) *Type {
	links := c.declaredTypeLinks.get(symbol)
	if links.declaredType == nil {
		links.declaredType = c.newTypeParameter(symbol)
	}
	return links.declaredType
}

func (c *Checker) getDeclaredTypeOfTypeAlias(symbol *ast.Symbol) *Type {
	links := c.typeAliasLinks.get(symbol)
	if links.declaredType == nil {
		// Note that we use the links object as the target here because the symbol object is used as the unique
		// identity for resolution of the 'type' property in SymbolLinks.
		if !c.pushTypeResolution(symbol, TypeSystemPropertyNameDeclaredType) {
			return c.errorType
		}
		declaration := core.Find(symbol.Declarations, ast.IsTypeAliasDeclaration)
		typeNode := declaration.AsTypeAliasDeclaration().Type
		t := c.getTypeFromTypeNode(typeNode)
		if c.popTypeResolution() {
			typeParameters := c.getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol)
			if len(typeParameters) != 0 {
				// Initialize the instantiation cache for generic type aliases. The declared type corresponds to
				// an instantiation of the type alias with the type parameters supplied as type arguments.
				links.typeParameters = typeParameters
				links.instantiations = make(map[string]*Type)
				links.instantiations[getTypeListKey(typeParameters)] = t
			}
			// !!!
			// if type_ == c.intrinsicMarkerType && symbol.escapedName == "BuiltinIteratorReturn" {
			// 	type_ = c.getBuiltinIteratorReturnType()
			// }
		} else {
			errorNode := declaration.Name()
			if errorNode == nil {
				errorNode = declaration
			}
			c.error(errorNode, diagnostics.Type_alias_0_circularly_references_itself, c.symbolToString(symbol))
			t = c.errorType
		}
		if links.declaredType == nil {
			links.declaredType = t
		}
	}
	return links.declaredType
}

func (c *Checker) getDeclaredTypeOfEnum(symbol *ast.Symbol) *Type {
	links := c.declaredTypeLinks.get(symbol)
	if !(links.declaredType != nil) {
		var memberTypeList []*Type
		for _, declaration := range symbol.Declarations {
			if declaration.Kind == ast.KindEnumDeclaration {
				for _, member := range declaration.AsEnumDeclaration().Members.Nodes {
					if c.hasBindableName(member) {
						memberSymbol := c.getSymbolOfDeclaration(member)
						value := c.getEnumMemberValue(member).value
						var memberType *Type
						if value != nil {
							memberType = c.getEnumLiteralType(value, symbol, memberSymbol)
						} else {
							memberType = c.createComputedEnumType(memberSymbol)
						}
						c.declaredTypeLinks.get(memberSymbol).declaredType = c.getFreshTypeOfLiteralType(memberType)
						memberTypeList = append(memberTypeList, memberType)
					}
				}
			}
		}
		var enumType *Type
		if len(memberTypeList) != 0 {
			enumType = c.getUnionTypeEx(memberTypeList, UnionReductionLiteral, &TypeAlias{symbol: symbol}, nil /*origin*/)
		} else {
			enumType = c.createComputedEnumType(symbol)
		}
		if enumType.flags&TypeFlagsUnion != 0 {
			enumType.flags |= TypeFlagsEnumLiteral
			enumType.symbol = symbol
		}
		links.declaredType = enumType
	}
	return links.declaredType
}

func (c *Checker) getEnumMemberValue(node *ast.Node) EvaluatorResult {
	c.computeEnumMemberValues(node.Parent)
	return c.enumMemberLinks.get(node).value
}

func (c *Checker) createComputedEnumType(symbol *ast.Symbol) *Type {
	regularType := c.newLiteralType(TypeFlagsEnum, nil, nil)
	regularType.symbol = symbol
	freshType := c.newLiteralType(TypeFlagsEnum, nil, regularType)
	freshType.symbol = symbol
	regularType.AsLiteralType().freshType = freshType
	return regularType
}

func (c *Checker) getDeclaredTypeOfEnumMember(symbol *ast.Symbol) *Type {
	links := c.declaredTypeLinks.get(symbol)
	if !(links.declaredType != nil) {
		enumType := c.getDeclaredTypeOfEnum(c.getParentOfSymbol(symbol))
		if links.declaredType == nil {
			links.declaredType = enumType
		}
	}
	return links.declaredType
}

func (c *Checker) computeEnumMemberValues(node *ast.Node) {
	nodeLinks := c.nodeLinks.get(node)
	if !(nodeLinks.flags&NodeCheckFlagsEnumValuesComputed != 0) {
		nodeLinks.flags |= NodeCheckFlagsEnumValuesComputed
		var autoValue = 0.0
		var previous *ast.Node
		for _, member := range node.AsEnumDeclaration().Members.Nodes {
			result := c.computeEnumMemberValue(member, autoValue, previous)
			c.enumMemberLinks.get(member).value = result
			if value, isNumber := result.value.(float64); isNumber {
				autoValue = value + 1
			} else {
				autoValue = math.NaN()
			}
			previous = member
		}
	}
}

func (c *Checker) computeEnumMemberValue(member *ast.Node, autoValue float64, previous *ast.Node) EvaluatorResult {
	if isComputedNonLiteralName(member.Name()) {
		c.error(member.Name(), diagnostics.Computed_property_names_are_not_allowed_in_enums)
	} else {
		text := member.Name().Text()
		if isNumericLiteralName(text) && !isInfinityOrNaNString(text) {
			c.error(member.Name(), diagnostics.An_enum_member_cannot_have_a_numeric_name)
		}
	}
	if member.AsEnumMember().Initializer != nil {
		return c.computeConstantEnumMemberValue(member)
	}
	// In ambient non-const numeric enum declarations, enum members without initializers are
	// considered computed members (as opposed to having auto-incremented values).
	if member.Parent.Flags&ast.NodeFlagsAmbient != 0 && !isEnumConst(member.Parent) {
		return evaluatorResult(nil, false, false, false)
	}
	// If the member declaration specifies no value, the member is considered a constant enum member.
	// If the member is the first member in the enum declaration, it is assigned the value zero.
	// Otherwise, it is assigned the value of the immediately preceding member plus one, and an error
	// occurs if the immediately preceding member is not a constant enum member.
	if math.IsNaN(autoValue) {
		c.error(member.Name(), diagnostics.Enum_member_must_have_initializer)
		return evaluatorResult(nil, false, false, false)
	}
	if getIsolatedModules(c.compilerOptions) && previous != nil && previous.AsEnumMember().Initializer != nil {
		prevValue := c.getEnumMemberValue(previous)
		_, prevIsNum := prevValue.value.(float64)
		if !prevIsNum || prevValue.resolvedOtherFiles {
			c.error(member.Name(), diagnostics.Enum_member_following_a_non_literal_numeric_member_must_have_an_initializer_when_isolatedModules_is_enabled)
		}
	}
	return evaluatorResult(autoValue, false, false, false)
}

func (c *Checker) computeConstantEnumMemberValue(member *ast.Node) EvaluatorResult {
	isConstEnum := isEnumConst(member.Parent)
	initializer := member.AsEnumMember().Initializer
	result := c.evaluate(initializer, member)
	switch {
	case result.value != nil:
		if isConstEnum {
			if numValue, isNumber := result.value.(float64); isNumber && (math.IsInf(numValue, 0) || !math.IsNaN(numValue)) {
				c.error(initializer, core.IfElse(math.IsNaN(numValue),
					diagnostics.X_const_enum_member_initializer_was_evaluated_to_disallowed_value_NaN,
					diagnostics.X_const_enum_member_initializer_was_evaluated_to_a_non_finite_value))
			}
		}
		if getIsolatedModules(c.compilerOptions) {
			if _, isString := result.value.(string); isString && !result.isSyntacticallyString {
				memberName := member.Parent.Name().Text() + "." + member.Name().Text()
				c.error(initializer, diagnostics.X_0_has_a_string_type_but_must_have_syntactically_recognizable_string_syntax_when_isolatedModules_is_enabled, memberName)
			}
		}
	case isConstEnum:
		c.error(initializer, diagnostics.X_const_enum_member_initializers_must_be_constant_expressions)
	case member.Parent.Flags&ast.NodeFlagsAmbient != 0:
		c.error(initializer, diagnostics.In_ambient_enum_declarations_member_initializer_must_be_constant_expression)
	default:
		c.checkTypeAssignableTo(c.checkExpression(initializer), c.numberType, initializer, diagnostics.Type_0_is_not_assignable_to_type_1_as_required_for_computed_enum_member_values)
	}
	return result
}

func (c *Checker) evaluateEntity(expr *ast.Node, location *ast.Node) EvaluatorResult {
	switch expr.Kind {
	case ast.KindIdentifier, ast.KindPropertyAccessExpression:
		symbol := c.resolveEntityName(expr, ast.SymbolFlagsValue, true /*ignoreErrors*/, false, nil)
		if symbol == nil {
			return evaluatorResult(nil, false, false, false)
		}
		if expr.Kind == ast.KindIdentifier {
			if isInfinityOrNaNString(expr.Text()) && (symbol == c.getGlobalSymbol(expr.Text(), ast.SymbolFlagsValue, nil /*diagnostic*/)) {
				// Technically we resolved a global lib file here, but the decision to treat this as numeric
				// is more predicated on the fact that the single-file resolution *didn't* resolve to a
				// different meaning of `Infinity` or `NaN`. Transpilers handle this no problem.
				return evaluatorResult(stringutil.ToNumber(expr.Text()), false, false, false)
			}
		}
		if symbol.Flags&ast.SymbolFlagsEnumMember != 0 {
			if location != nil {
				return c.evaluateEnumMember(expr, symbol, location)
			}
			return c.getEnumMemberValue(symbol.ValueDeclaration)
		}
		if c.isConstantVariable(symbol) {
			declaration := symbol.ValueDeclaration
			if declaration != nil && declaration.Type() == nil && declaration.Initializer() != nil &&
				(location == nil || declaration != location && c.isBlockScopedNameDeclaredBeforeUse(declaration, location)) {
				result := c.evaluate(declaration.Initializer(), declaration)
				if location != nil && ast.GetSourceFileOfNode(location) != ast.GetSourceFileOfNode(declaration) {
					return evaluatorResult(result.value, false, true, true)
				}
				return evaluatorResult(result.value, result.isSyntacticallyString, result.resolvedOtherFiles, true /*hasExternalReferences*/)
			}
		}
		return evaluatorResult(nil, false, false, false)
	case ast.KindElementAccessExpression:
		root := expr.Expression()
		if isEntityNameExpression(root) && isStringLiteralLike(expr.AsElementAccessExpression().ArgumentExpression) {
			rootSymbol := c.resolveEntityName(root, ast.SymbolFlagsValue, true /*ignoreErrors*/, false, nil)
			if rootSymbol != nil && rootSymbol.Flags&ast.SymbolFlagsEnum != 0 {
				name := expr.AsElementAccessExpression().ArgumentExpression.Text()
				member := rootSymbol.Exports[name]
				if member != nil {
					// !!! Debug.assert(ast.GetSourceFileOfNode(member.valueDeclaration) == ast.GetSourceFileOfNode(rootSymbol.valueDeclaration))
					if location != nil {
						return c.evaluateEnumMember(expr, member, location)
					}
					return c.getEnumMemberValue(member.ValueDeclaration)
				}
			}
		}
		return evaluatorResult(nil, false, false, false)
	}
	panic("Unhandled case in evaluateEntity")
}

func (c *Checker) evaluateEnumMember(expr *ast.Node, symbol *ast.Symbol, location *ast.Node) EvaluatorResult {
	declaration := symbol.ValueDeclaration
	if declaration == nil || declaration == location {
		c.error(expr, diagnostics.Property_0_is_used_before_being_assigned, c.symbolToString(symbol))
		return evaluatorResult(nil, false, false, false)
	}
	if !c.isBlockScopedNameDeclaredBeforeUse(declaration, location) {
		c.error(expr, diagnostics.A_member_initializer_in_a_enum_declaration_cannot_reference_members_declared_after_it_including_members_defined_in_other_enums)
		return evaluatorResult(0.0, false, false, false)
	}
	value := c.getEnumMemberValue(declaration)
	if location.Parent != declaration.Parent {
		return evaluatorResult(value.value, value.isSyntacticallyString, value.resolvedOtherFiles, true /*hasExternalReferences*/)
	}
	return value
}

func (c *Checker) getTypeFromArrayOrTupleTypeNode(node *ast.Node) *Type {
	links := c.typeNodeLinks.get(node)
	if links.resolvedType == nil {
		target := c.getArrayOrTupleTargetType(node)
		if target == c.emptyGenericType {
			links.resolvedType = c.emptyObjectType
		} else if !(node.Kind == ast.KindTupleType && core.Some(node.AsTupleTypeNode().Elements.Nodes, c.isVariadicTupleElement)) && c.isDeferredTypeReferenceNode(node, false) {
			if node.Kind == ast.KindTupleType && len(node.AsTupleTypeNode().Elements.Nodes) == 0 {
				links.resolvedType = target
			} else {
				links.resolvedType = c.createDeferredTypeReference(target, node, nil /*mapper*/, nil /*alias*/)
			}
		} else {
			var elementTypes []*Type
			if node.Kind == ast.KindArrayType {
				elementTypes = []*Type{c.getTypeFromTypeNode(node.AsArrayTypeNode().ElementType)}
			} else {
				elementTypes = core.Map(node.AsTupleTypeNode().Elements.Nodes, c.getTypeFromTypeNode)
			}
			links.resolvedType = c.createNormalizedTypeReference(target, elementTypes)
		}
	}
	return links.resolvedType
}

func (c *Checker) isVariadicTupleElement(node *ast.Node) bool {
	return c.getTupleElementFlags(node)&ElementFlagsVariadic != 0
}

func (c *Checker) getArrayOrTupleTargetType(node *ast.Node) *Type {
	readonly := c.isReadonlyTypeOperator(node.Parent)
	elementType := c.getArrayElementTypeNode(node)
	if elementType != nil {
		if readonly {
			return c.globalReadonlyArrayType
		}
		return c.globalArrayType
	}
	return c.getTupleTargetType(core.Map(node.AsTupleTypeNode().Elements.Nodes, c.getTupleElementInfo), readonly)
}

func (c *Checker) isReadonlyTypeOperator(node *ast.Node) bool {
	return ast.IsTypeOperatorNode(node) && node.AsTypeOperatorNode().Operator == ast.KindReadonlyKeyword
}

func (c *Checker) getTypeFromRestTypeNode(node *ast.Node) *Type {
	typeNode := node.AsRestTypeNode().Type
	elementTypeNode := c.getArrayElementTypeNode(typeNode)
	if elementTypeNode != nil {
		typeNode = elementTypeNode
	}
	return c.getTypeFromTypeNode(typeNode)
}

func (c *Checker) getArrayElementTypeNode(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindParenthesizedType:
		return c.getArrayElementTypeNode(node.AsParenthesizedTypeNode().Type)
	case ast.KindTupleType:
		if len(node.AsTupleTypeNode().Elements.Nodes) == 1 {
			node = node.AsTupleTypeNode().Elements.Nodes[0]
			if node.Kind == ast.KindRestType {
				return c.getArrayElementTypeNode(node.AsRestTypeNode().Type)
			}
			if node.Kind == ast.KindNamedTupleMember && node.AsNamedTupleMember().DotDotDotToken != nil {
				return c.getArrayElementTypeNode(node.AsNamedTupleMember().Type)
			}
		}
	case ast.KindArrayType:
		return node.AsArrayTypeNode().ElementType
	}
	return nil
}

func (c *Checker) getTypeFromOptionalTypeNode(node *ast.Node) *Type {
	return c.addOptionalityEx(c.getTypeFromTypeNode(node.AsOptionalTypeNode().Type), true /*isProperty*/, true /*isOptional*/)
}

func (c *Checker) getTypeFromUnionTypeNode(node *ast.Node) *Type {
	links := c.typeNodeLinks.get(node)
	if links.resolvedType == nil {
		alias := c.getAliasForTypeNode(node)
		links.resolvedType = c.getUnionTypeEx(core.Map(node.AsUnionTypeNode().Types.Nodes, c.getTypeFromTypeNode), UnionReductionLiteral, alias, nil /*origin*/)
	}
	return links.resolvedType
}

func (c *Checker) getTypeFromIntersectionTypeNode(node *ast.Node) *Type {
	links := c.typeNodeLinks.get(node)
	if links.resolvedType == nil {
		alias := c.getAliasForTypeNode(node)
		types := core.Map(node.AsIntersectionTypeNode().Types.Nodes, c.getTypeFromTypeNode)
		// We perform no supertype reduction for X & {} or {} & X, where X is one of string, number, bigint,
		// or a pattern literal template type. This enables union types like "a" | "b" | string & {} or
		// "aa" | "ab" | `a${string}` which preserve the literal types for purposes of statement completion.
		noSupertypeReduction := false
		if len(types) == 2 {
			emptyIndex := slices.Index(types, c.emptyTypeLiteralType)
			if emptyIndex >= 0 {
				t := types[1-emptyIndex]
				noSupertypeReduction = t.flags&(TypeFlagsString|TypeFlagsNumber|TypeFlagsBigInt) != 0 || t.flags&TypeFlagsTemplateLiteral != 0 && c.isPatternLiteralType(t)
			}
		}
		links.resolvedType = c.getIntersectionTypeEx(types, core.IfElse(noSupertypeReduction, IntersectionFlagsNoSupertypeReduction, 0), alias)
	}
	return links.resolvedType
}

func (c *Checker) getTypeFromTemplateTypeNode(node *ast.Node) *Type {
	links := c.typeNodeLinks.get(node)
	if links.resolvedType == nil {
		spans := node.AsTemplateLiteralTypeNode().TemplateSpans
		texts := make([]string, len(spans.Nodes)+1)
		types := make([]*Type, len(spans.Nodes))
		texts[0] = node.AsTemplateLiteralTypeNode().Head.Text()
		for i, span := range spans.Nodes {
			texts[i+1] = span.AsTemplateLiteralTypeSpan().Literal.Text()
			types[i] = c.getTypeFromTypeNode(span.AsTemplateLiteralTypeSpan().Type)
		}
		links.resolvedType = c.getTemplateLiteralType(texts, types)
	}
	return links.resolvedType
}

func (c *Checker) createTypeFromGenericGlobalType(genericGlobalType *Type, typeArguments []*Type) *Type {
	if genericGlobalType != c.emptyGenericType {
		return c.createTypeReference(genericGlobalType, typeArguments)
	}
	return c.emptyObjectType
}

func (c *Checker) getGlobalStrictFunctionType(name string) *Type {
	if c.strictBindCallApply {
		return c.getGlobalType(name, 0 /*arity*/, true /*reportErrors*/)
	}
	return c.globalFunctionType
}

func (c *Checker) getGlobalESSymbolType() *Type {
	if c.deferredGlobalESSymbolType == nil {
		c.deferredGlobalESSymbolType = c.getGlobalType("ast.Symbol", 0 /*arity*/, false /*reportErrors*/)
		if c.deferredGlobalESSymbolType == nil {
			c.deferredGlobalESSymbolType = c.emptyObjectType
		}
	}
	return c.deferredGlobalESSymbolType
}

func (c *Checker) getGlobalBigIntType() *Type {
	if c.deferredGlobalBigIntType == nil {
		c.deferredGlobalBigIntType = c.getGlobalType("BigInt", 0 /*arity*/, false /*reportErrors*/)
		if c.deferredGlobalBigIntType == nil {
			c.deferredGlobalBigIntType = c.emptyObjectType
		}
	}
	return c.deferredGlobalBigIntType
}

func (c *Checker) createArrayType(elementType *Type) *Type {
	return c.createArrayTypeEx(elementType, false /*readonly*/)
}

func (c *Checker) createArrayTypeEx(elementType *Type, readonly bool) *Type {
	return c.createTypeFromGenericGlobalType(core.IfElse(readonly, c.globalReadonlyArrayType, c.globalArrayType), []*Type{elementType})
}

func (c *Checker) getTupleElementFlags(node *ast.Node) ElementFlags {
	switch node.Kind {
	case ast.KindOptionalType:
		return ElementFlagsOptional
	case ast.KindRestType:
		return core.IfElse(c.getArrayElementTypeNode(node.AsRestTypeNode().Type) != nil, ElementFlagsRest, ElementFlagsVariadic)
	case ast.KindNamedTupleMember:
		named := node.AsNamedTupleMember()
		switch {
		case named.QuestionToken != nil:
			return ElementFlagsOptional
		case named.DotDotDotToken != nil:
			return core.IfElse(c.getArrayElementTypeNode(named.Type) != nil, ElementFlagsRest, ElementFlagsVariadic)
		}
		return ElementFlagsRequired
	}
	return ElementFlagsRequired
}

func (c *Checker) getTupleElementInfo(node *ast.Node) TupleElementInfo {
	return TupleElementInfo{
		flags:              c.getTupleElementFlags(node),
		labeledDeclaration: core.IfElse(ast.IsNamedTupleMember(node) || ast.IsParameter(node), node, nil),
	}
}

func (c *Checker) createTupleType(elementTypes []*Type) *Type {
	elementInfos := core.Map(elementTypes, func(_ *Type) TupleElementInfo { return TupleElementInfo{flags: ElementFlagsRequired} })
	return c.createTupleTypeEx(elementTypes, elementInfos, false /*readonly*/)
}

func (c *Checker) createTupleTypeEx(elementTypes []*Type, elementInfos []TupleElementInfo, readonly bool) *Type {
	tupleTarget := c.getTupleTargetType(elementInfos, readonly)
	switch {
	case tupleTarget == c.emptyGenericType:
		return c.emptyObjectType
	case len(elementTypes) != 0:
		return c.createNormalizedTypeReference(tupleTarget, elementTypes)
	}
	return tupleTarget
}

func (c *Checker) getTupleTargetType(elementInfos []TupleElementInfo, readonly bool) *Type {
	if len(elementInfos) == 1 && elementInfos[0].flags&ElementFlagsRest != 0 {
		// [...X[]] is equivalent to just X[]
		if readonly {
			return c.globalReadonlyArrayType
		}
		return c.globalArrayType
	}
	key := getTupleKey(elementInfos, readonly)
	t := c.tupleTypes[key]
	if t == nil {
		t = c.createTupleTargetType(elementInfos, readonly)
		c.tupleTypes[key] = t
	}
	return t
}

// We represent tuple types as type references to synthesized generic interface types created by
// this function. The types are of the form:
//
//	interface Tuple<T0, T1, T2, ...> extends Array<T0 | T1 | T2 | ...> { 0: T0, 1: T1, 2: T2, ... }
//
// Note that the generic type created by this function has no symbol associated with it. The same
// is true for each of the synthesized type parameters.
func (c *Checker) createTupleTargetType(elementInfos []TupleElementInfo, readonly bool) *Type {
	arity := len(elementInfos)
	minLength := core.CountWhere(elementInfos, func(e TupleElementInfo) bool {
		return e.flags&(ElementFlagsRequired|ElementFlagsVariadic) != 0
	})
	var typeParameters []*Type
	members := make(ast.SymbolTable)
	combinedFlags := ElementFlagsNone
	if arity != 0 {
		typeParameters = make([]*Type, 0, arity)
		for i := range arity {
			typeParameter := c.newTypeParameter(nil)
			typeParameters = append(typeParameters, typeParameter)
			flags := elementInfos[i].flags
			combinedFlags |= flags
			if combinedFlags&ElementFlagsVariable == 0 {
				property := c.newSymbolEx(ast.SymbolFlagsProperty|(core.IfElse(flags&ElementFlagsOptional != 0, ast.SymbolFlagsOptional, 0)), strconv.Itoa(i), core.IfElse(readonly, ast.CheckFlagsReadonly, 0))
				c.valueSymbolLinks.get(property).resolvedType = typeParameter
				//c.valueSymbolLinks.get(property).tupleLabelDeclaration = elementInfos[i].labeledDeclaration
				members[property.Name] = property
			}
		}
	}
	fixedLength := len(members)
	lengthSymbol := c.newSymbolEx(ast.SymbolFlagsProperty, "length", core.IfElse(readonly, ast.CheckFlagsReadonly, 0))
	if combinedFlags&ElementFlagsVariable != 0 {
		c.valueSymbolLinks.get(lengthSymbol).resolvedType = c.numberType
	} else {
		var literalTypes []*Type
		for i := minLength; i <= arity; i++ {
			literalTypes = append(literalTypes, c.getNumberLiteralType(float64(i)))
		}
		c.valueSymbolLinks.get(lengthSymbol).resolvedType = c.getUnionType(literalTypes)
	}
	members[lengthSymbol.Name] = lengthSymbol
	t := c.newObjectType(ObjectFlagsTuple|ObjectFlagsReference, nil)
	d := t.AsTupleType()
	d.thisType = c.newTypeParameter(nil)
	d.thisType.AsTypeParameter().isThisType = true
	d.thisType.AsTypeParameter().constraint = t
	d.allTypeParameters = append(typeParameters, d.thisType)
	d.instantiations = make(map[string]*Type)
	d.instantiations[getTypeListKey(d.TypeParameters())] = t
	d.target = t
	d.resolvedTypeArguments = d.TypeParameters()
	d.declaredMembersResolved = true
	d.declaredMembers = members
	d.elementInfos = elementInfos
	d.minLength = minLength
	d.fixedLength = fixedLength
	d.combinedFlags = combinedFlags
	d.readonly = readonly
	return t
}

func (c *Checker) getElementTypeOfSliceOfTupleType(t *Type, index int, endSkipCount int, writing bool, noReductions bool) *Type {
	length := c.getTypeReferenceArity(t) - endSkipCount
	elementInfos := t.TargetTupleType().elementInfos
	if index < length {
		typeArguments := c.getTypeArguments(t)
		var elementTypes []*Type
		for i := index; i < length; i++ {
			e := typeArguments[i]
			if elementInfos[i].flags&ElementFlagsVariadic != 0 {
				e = c.getIndexedAccessType(e, c.numberType)
			}
			elementTypes = append(elementTypes, e)
		}
		if writing {
			return c.getIntersectionType(elementTypes)
		}
		return c.getUnionTypeEx(elementTypes, core.IfElse(noReductions, UnionReductionNone, UnionReductionLiteral), nil, nil)
	}
	return nil
}

func (c *Checker) getRestTypeOfTupleType(t *Type) *Type {
	return c.getElementTypeOfSliceOfTupleType(t, t.TargetTupleType().fixedLength, 0, false, false)
}

func (c *Checker) getTupleElementTypeOutOfStartCount(t *Type, index float64, undefinedOrMissingType *Type) *Type {
	return c.mapType(t, func(t *Type) *Type {
		restType := c.getRestTypeOfTupleType(t)
		if restType == nil {
			return c.undefinedType
		}
		if c.undefinedOrMissingType != nil && index >= float64(getTotalFixedElementCount(t.TargetTupleType())) {
			return c.getUnionType([]*Type{restType, c.undefinedOrMissingType})
		}
		return restType
	})
}

func (c *Checker) isGenericType(t *Type) bool {
	return c.getGenericObjectFlags(t) != 0
}

func (c *Checker) isGenericObjectType(t *Type) bool {
	return c.getGenericObjectFlags(t)&ObjectFlagsIsGenericObjectType != 0
}

func (c *Checker) isGenericIndexType(t *Type) bool {
	return c.getGenericObjectFlags(t)&ObjectFlagsIsGenericIndexType != 0
}

func (c *Checker) getGenericObjectFlags(t *Type) ObjectFlags {
	var combinedFlags ObjectFlags
	if t.flags&(TypeFlagsUnionOrIntersection|TypeFlagsSubstitution) != 0 {
		if t.objectFlags&ObjectFlagsIsGenericTypeComputed == 0 {
			if t.flags&TypeFlagsUnionOrIntersection != 0 {
				for _, u := range t.Types() {
					combinedFlags |= c.getGenericObjectFlags(u)
				}
			} else {
				combinedFlags = c.getGenericObjectFlags(t.AsSubstitutionType().baseType) | c.getGenericObjectFlags(t.AsSubstitutionType().constraint)
			}
			t.objectFlags |= ObjectFlagsIsGenericTypeComputed | combinedFlags
		}
		return t.objectFlags & ObjectFlagsIsGenericType
	}
	if t.flags&TypeFlagsInstantiableNonPrimitive != 0 || c.isGenericMappedType(t) || c.isGenericTupleType(t) {
		combinedFlags |= ObjectFlagsIsGenericObjectType
	}
	if t.flags&(TypeFlagsInstantiableNonPrimitive|TypeFlagsIndex) != 0 || c.isGenericStringLikeType(t) {
		combinedFlags |= ObjectFlagsIsGenericIndexType
	}
	return combinedFlags
}

func (c *Checker) isGenericTupleType(t *Type) bool {
	return isTupleType(t) && t.TargetTupleType().combinedFlags&ElementFlagsVariadic != 0
}

func (c *Checker) isGenericMappedType(t *Type) bool {
	// !!!
	// if t.objectFlags&ObjectFlagsMapped != 0 {
	// 	constraint := c.getConstraintTypeFromMappedType(type_.(MappedType))
	// 	if c.isGenericIndexType(constraint) {
	// 		return true
	// 	}
	// 	// A mapped type is generic if the 'as' clause references generic types other than the iteration type.
	// 	// To determine this, we substitute the constraint type (that we now know isn't generic) for the iteration
	// 	// type and check whether the resulting type is generic.
	// 	nameType := c.getNameTypeFromMappedType(type_.(MappedType))
	// 	if nameType && c.isGenericIndexType(c.instantiateType(nameType, c.makeUnaryTypeMapper(c.getTypeParameterFromMappedType(type_.(MappedType)), constraint))) {
	// 		return true
	// 	}
	// }
	return false
}

/**
 * A union type which is reducible upon instantiation (meaning some members are removed under certain instantiations)
 * must be kept generic, as that instantiation information needs to flow through the type system. By replacing all
 * type parameters in the union with a special never type that is treated as a literal in `getReducedType`, we can cause
 * the `getReducedType` logic to reduce the resulting type if possible (since only intersections with conflicting
 * literal-typed properties are reducible).
 */
func (c *Checker) isGenericReducibleType(t *Type) bool {
	return t.flags&TypeFlagsUnion != 0 && t.objectFlags&ObjectFlagsContainsIntersections != 0 && core.Some(t.Types(), c.isGenericReducibleType) ||
		t.flags&TypeFlagsIntersection != 0 && c.isReducibleIntersection(t)
}

func (c *Checker) isReducibleIntersection(t *Type) bool {
	d := t.AsIntersectionType()
	if d.uniqueLiteralFilledInstantiation == nil {
		d.uniqueLiteralFilledInstantiation = c.instantiateType(t, c.uniqueLiteralMapper)
	}
	return c.getReducedType(d.uniqueLiteralFilledInstantiation) != d.uniqueLiteralFilledInstantiation
}

func (c *Checker) getUniqueLiteralTypeForTypeParameter(t *Type) *Type {
	if t.flags&TypeFlagsTypeParameter != 0 {
		return c.uniqueLiteralType
	}
	return t
}

func (c *Checker) isContextSensitive(node *ast.Node) bool {
	return false // !!!
}

func (c *Checker) getConditionalFlowTypeOfType(typ *Type, node *ast.Node) *Type {
	return typ // !!!
}

func (c *Checker) newType(flags TypeFlags, objectFlags ObjectFlags, data TypeData) *Type {
	c.typeCount++
	t := data.AsType()
	t.flags = flags
	t.objectFlags = objectFlags &^ (ObjectFlagsCouldContainTypeVariablesComputed | ObjectFlagsCouldContainTypeVariables | ObjectFlagsMembersResolved)
	t.id = TypeId(c.typeCount)
	t.data = data
	return t
}

func (c *Checker) newIntrinsicType(flags TypeFlags, intrinsicName string) *Type {
	return c.newIntrinsicTypeEx(flags, intrinsicName, ObjectFlagsNone)
}

func (c *Checker) newIntrinsicTypeEx(flags TypeFlags, intrinsicName string, objectFlags ObjectFlags) *Type {
	data := &IntrinsicType{}
	data.intrinsicName = intrinsicName
	return c.newType(flags, objectFlags, data)
}

func (c *Checker) createWideningType(nonWideningType *Type) *Type {
	if c.strictNullChecks {
		return nonWideningType
	}
	return c.newIntrinsicType(nonWideningType.flags, nonWideningType.AsIntrinsicType().intrinsicName)
}

func (c *Checker) createUnknownUnionType() *Type {
	if c.strictNullChecks {
		return c.getUnionType([]*Type{c.undefinedType, c.nullType, c.unknownEmptyObjectType})
	}
	return c.unknownType
}

func (c *Checker) newLiteralType(flags TypeFlags, value any, regularType *Type) *Type {
	data := &LiteralType{}
	data.value = value
	t := c.newType(flags, ObjectFlagsNone, data)
	if regularType != nil {
		data.regularType = regularType
	} else {
		data.regularType = t
	}
	return t
}

func (c *Checker) newUniqueESSymbolType(symbol *ast.Symbol, name string) *Type {
	data := &UniqueESSymbolType{}
	data.name = name
	t := c.newType(TypeFlagsUniqueESSymbol, ObjectFlagsNone, data)
	t.symbol = symbol
	return t
}

func (c *Checker) newObjectType(objectFlags ObjectFlags, symbol *ast.Symbol) *Type {
	var data TypeData
	switch {
	case objectFlags&ObjectFlagsClassOrInterface != 0:
		data = &InterfaceType{}
	case objectFlags&ObjectFlagsTuple != 0:
		data = &TupleType{}
	case objectFlags&ObjectFlagsReference != 0:
		data = &TypeReference{}
	case objectFlags&ObjectFlagsMapped != 0:
		data = &MappedType{}
	case objectFlags&ObjectFlagsReverseMapped != 0:
		data = &ReverseMappedType{}
	case objectFlags&ObjectFlagsEvolvingArray != 0:
		data = &EvolvingArrayType{}
	case objectFlags&ObjectFlagsInstantiationExpressionType != 0:
		data = &InstantiationExpressionType{}
	case objectFlags&ObjectFlagsSingleSignatureType != 0:
		data = &SingleSignatureType{}
	case objectFlags&ObjectFlagsAnonymous != 0:
		data = &ObjectType{}
	default:
		panic("Unhandled case in newObjectType")
	}
	t := c.newType(TypeFlagsObject, objectFlags, data)
	t.symbol = symbol
	return t
}

func (c *Checker) newAnonymousType(symbol *ast.Symbol, members ast.SymbolTable, callSignatures []*Signature, constructSignatures []*Signature, indexInfos []*IndexInfo) *Type {
	t := c.newObjectType(ObjectFlagsAnonymous, symbol)
	c.setStructuredTypeMembers(t, members, callSignatures, constructSignatures, indexInfos)
	return t
}

func (c *Checker) createTypeReference(target *Type, typeArguments []*Type) *Type {
	id := getTypeListKey(typeArguments)
	intf := target.AsInterfaceType()
	if t, ok := intf.instantiations[id]; ok {
		return t
	}
	t := c.newObjectType(ObjectFlagsReference, target.symbol)
	t.objectFlags |= c.getPropagatingFlagsOfTypes(typeArguments, TypeFlagsNone)
	d := t.AsTypeReference()
	d.target = target
	d.resolvedTypeArguments = typeArguments
	intf.instantiations[id] = t
	return t
}

func (c *Checker) createDeferredTypeReference(target *Type, node *ast.Node, mapper *TypeMapper, alias *TypeAlias) *Type {
	if alias == nil {
		alias := c.getAliasForTypeNode(node)
		if alias != nil && mapper != nil {
			alias.typeArguments = c.instantiateTypes(alias.typeArguments, mapper)
		}
	}
	t := c.newObjectType(ObjectFlagsReference, target.symbol)
	t.alias = alias
	d := t.AsTypeReference()
	d.target = target
	d.mapper = mapper
	d.node = node
	return t
}

func (c *Checker) setStructuredTypeMembers(t *Type, members ast.SymbolTable, callSignatures []*Signature, constructSignatures []*Signature, indexInfos []*IndexInfo) {
	t.objectFlags |= ObjectFlagsMembersResolved
	data := t.AsStructuredType()
	data.members = members
	data.properties = c.getNamedMembers(members)
	if len(callSignatures) != 0 {
		if len(constructSignatures) != 0 {
			data.signatures = core.Concatenate(callSignatures, constructSignatures)
		} else {
			data.signatures = slices.Clip(callSignatures)
		}
		data.callSignatureCount = len(callSignatures)
	} else {
		if len(constructSignatures) != 0 {
			data.signatures = slices.Clip(constructSignatures)
		} else {
			data.signatures = nil
		}
		data.callSignatureCount = 0
	}
	data.indexInfos = slices.Clip(indexInfos)
}

func (c *Checker) newTypeParameter(symbol *ast.Symbol) *Type {
	t := c.newType(TypeFlagsTypeParameter, ObjectFlagsNone, &TypeParameter{})
	t.symbol = symbol
	return t
}

// This function is used to propagate certain flags when creating new object type references and union types.
// It is only necessary to do so if a constituent type might be the undefined type, the null type, the type
// of an object literal or a non-inferrable type. This is because there are operations in the type checker
// that care about the presence of such types at arbitrary depth in a containing type.
func (c *Checker) getPropagatingFlagsOfTypes(types []*Type, excludeKinds TypeFlags) ObjectFlags {
	result := ObjectFlagsNone
	for _, t := range types {
		if t.flags&excludeKinds == 0 {
			result |= t.objectFlags
		}
	}
	return result & ObjectFlagsPropagatingFlags
}

func (c *Checker) newUnionType(objectFlags ObjectFlags, types []*Type) *Type {
	data := &UnionType{}
	data.types = types
	return c.newType(TypeFlagsUnion, objectFlags, data)
}

func (c *Checker) newIntersectionType(objectFlags ObjectFlags, types []*Type) *Type {
	data := &IntersectionType{}
	data.types = types
	return c.newType(TypeFlagsIntersection, objectFlags, data)
}

func (c *Checker) newIndexedAccessType(objectType *Type, indexType *Type, accessFlags AccessFlags) *Type {
	data := &IndexedAccessType{}
	data.objectType = objectType
	data.indexType = indexType
	data.accessFlags = accessFlags
	return c.newType(TypeFlagsIndexedAccess, ObjectFlagsNone, data)
}

func (c *Checker) newIndexType(target *Type, indexFlags IndexFlags) *Type {
	data := &IndexType{}
	data.target = target
	data.indexFlags = indexFlags
	return c.newType(TypeFlagsIndex, ObjectFlagsNone, data)
}

func (c *Checker) newTemplateLiteralType(texts []string, types []*Type) *Type {
	data := &TemplateLiteralType{}
	data.texts = texts
	data.types = types
	return c.newType(TypeFlagsTemplateLiteral, ObjectFlagsNone, data)
}

func (c *Checker) newStringMappingType(symbol *ast.Symbol, target *Type) *Type {
	data := &StringMappingType{}
	data.target = target
	t := c.newType(TypeFlagsStringMapping, ObjectFlagsNone, data)
	t.symbol = symbol
	return t
}

func (c *Checker) newSignature(flags SignatureFlags, declaration *ast.Node, typeParameters []*Type, thisParameter *ast.Symbol, parameters []*ast.Symbol, resolvedReturnType *Type, resolvedTypePredicate *TypePredicate, minArgumentCount int) *Signature {
	sig := c.signaturePool.New()
	sig.flags = flags
	sig.declaration = declaration
	sig.typeParameters = typeParameters
	sig.parameters = parameters
	sig.thisParameter = thisParameter
	sig.resolvedReturnType = resolvedReturnType
	sig.resolvedTypePredicate = resolvedTypePredicate
	sig.minArgumentCount = int32(minArgumentCount)
	sig.resolvedMinArgumentCount = -1
	return sig
}

func (c *Checker) newIndexInfo(keyType *Type, valueType *Type, isReadonly bool, declaration *ast.Node) *IndexInfo {
	info := c.indexInfoPool.New()
	info.keyType = keyType
	info.valueType = valueType
	info.isReadonly = isReadonly
	info.declaration = declaration
	return info
}

func (c *Checker) getRegularTypeOfLiteralType(t *Type) *Type {
	if t.flags&TypeFlagsFreshable != 0 {
		return t.AsLiteralType().regularType
	}
	if t.flags&TypeFlagsUnion != 0 {
		u := t.AsUnionType()
		if u.regularType == nil {
			u.regularType = c.mapType(t, c.getRegularTypeOfLiteralType)
		}
		return u.regularType
	}
	return t
}

func (c *Checker) getFreshTypeOfLiteralType(t *Type) *Type {
	if t.flags&TypeFlagsFreshable != 0 {
		d := t.AsLiteralType()
		if d.freshType == nil {
			f := c.newLiteralType(t.flags, d.value, t)
			f.symbol = t.symbol
			f.AsLiteralType().freshType = f
			d.freshType = f
		}
		return d.freshType
	}
	return t
}

func isFreshLiteralType(t *Type) bool {
	return t.flags&TypeFlagsFreshable != 0 && t.AsLiteralType().freshType == t
}

func (c *Checker) getStringLiteralType(value string) *Type {
	t := c.stringLiteralTypes[value]
	if t == nil {
		t = c.newLiteralType(TypeFlagsStringLiteral, value, nil)
		c.stringLiteralTypes[value] = t
	}
	return t
}

func (c *Checker) getNumberLiteralType(value float64) *Type {
	t := c.numberLiteralTypes[value]
	if t == nil {
		t = c.newLiteralType(TypeFlagsNumberLiteral, value, nil)
		c.numberLiteralTypes[value] = t
	}
	return t
}

func (c *Checker) getBigIntLiteralType(value PseudoBigInt) *Type {
	t := c.bigintLiteralTypes[value]
	if t == nil {
		t = c.newLiteralType(TypeFlagsBigIntLiteral, value, nil)
		c.bigintLiteralTypes[value] = t
	}
	return t
}

func getStringLiteralValue(t *Type) string {
	return t.AsLiteralType().value.(string)
}

func getNumberLiteralValue(t *Type) float64 {
	return t.AsLiteralType().value.(float64)
}

func getBigIntLiteralValue(t *Type) PseudoBigInt {
	return t.AsLiteralType().value.(PseudoBigInt)
}

func (c *Checker) getEnumLiteralType(value any, enumSymbol *ast.Symbol, symbol *ast.Symbol) *Type {
	var flags TypeFlags
	switch value.(type) {
	case string:
		flags = TypeFlagsEnumLiteral | TypeFlagsStringLiteral
	case float64:
		flags = TypeFlagsEnumLiteral | TypeFlagsNumberLiteral
	default:
		panic("Unhandled case in getEnumLiteralType")
	}
	key := EnumLiteralKey{enumSymbol: enumSymbol, value: value}
	t := c.enumLiteralTypes[key]
	if t == nil {
		t = c.newLiteralType(flags, value, nil)
		t.symbol = symbol
		c.enumLiteralTypes[key] = t
	}
	return t
}

func isLiteralType(t *Type) bool {
	if t.flags&TypeFlagsBoolean != 0 {
		return true
	}
	if t.flags&TypeFlagsUnion != 0 {
		if t.flags&TypeFlagsEnumLiteral != 0 {
			return true
		}
		return core.Every(t.Types(), isUnitType)
	}
	return isUnitType(t)
}

func isUnitType(t *Type) bool {
	return t.flags&TypeFlagsUnit != 0
}

func (c *Checker) isUnitLikeType(t *Type) bool {
	// Intersections that reduce to 'never' (e.g. 'T & null' where 'T extends {}') are not unit types.
	t = c.getBaseConstraintOrType(t)
	// Scan intersections such that tagged literal types are considered unit types.
	if t.flags&TypeFlagsIntersection != 0 {
		return core.Some(t.AsIntersectionType().types, isUnitType)
	}
	return isUnitType(t)
}

func (c *Checker) getBaseTypeOfLiteralType(t *Type) *Type {
	switch {
	case t.flags&TypeFlagsEnumLike != 0:
		return c.getBaseTypeOfEnumLikeType(t)
	case t.flags&(TypeFlagsStringLiteral|TypeFlagsTemplateLiteral|TypeFlagsStringMapping) != 0:
		return c.stringType
	case t.flags&TypeFlagsNumberLiteral != 0:
		return c.numberType
	case t.flags&TypeFlagsBigIntLiteral != 0:
		return c.bigintType
	case t.flags&TypeFlagsBooleanLiteral != 0:
		return c.booleanType
	case t.flags&TypeFlagsUnion != 0:
		return c.getBaseTypeOfLiteralTypeUnion(t)
	}
	return t
}

// This like getBaseTypeOfLiteralType, but instead treats enum literals as strings/numbers instead
// of returning their enum base type (which depends on the types of other literals in the enum).
func (c *Checker) getBaseTypeOfLiteralTypeForComparison(t *Type) *Type {
	switch {
	case t.flags&(TypeFlagsStringLiteral|TypeFlagsTemplateLiteral|TypeFlagsStringMapping) != 0:
		return c.stringType
	case t.flags&(TypeFlagsNumberLiteral|TypeFlagsEnum) != 0:
		return c.numberType
	case t.flags&TypeFlagsBigIntLiteral != 0:
		return c.bigintType
	case t.flags&TypeFlagsBooleanLiteral != 0:
		return c.booleanType
	case t.flags&TypeFlagsUnion != 0:
		return c.mapType(t, c.getBaseTypeOfLiteralTypeForComparison)
	}
	return t
}

func (c *Checker) getBaseTypeOfEnumLikeType(t *Type) *Type {
	if t.flags&TypeFlagsEnumLike != 0 && t.symbol.Flags&ast.SymbolFlagsEnumMember != 0 {
		return c.getDeclaredTypeOfSymbol(c.getParentOfSymbol(t.symbol))
	}
	return t
}

func (c *Checker) getBaseTypeOfLiteralTypeUnion(t *Type) *Type {
	key := CachedTypeKey{kind: CachedTypeKindLiteralUnionBaseType, typeId: t.id}
	if cached, ok := c.cachedTypes[key]; ok {
		return cached
	}
	result := c.mapType(t, c.getBaseTypeOfLiteralType)
	c.cachedTypes[key] = result
	return result
}

func (c *Checker) getWidenedLiteralType(t *Type) *Type {
	switch {
	case t.flags&TypeFlagsEnumLike != 0 && isFreshLiteralType(t):
		return c.getBaseTypeOfEnumLikeType(t)
	case t.flags&TypeFlagsStringLiteral != 0 && isFreshLiteralType(t):
		return c.stringType
	case t.flags&TypeFlagsNumberLiteral != 0 && isFreshLiteralType(t):
		return c.numberType
	case t.flags&TypeFlagsBigIntLiteral != 0 && isFreshLiteralType(t):
		return c.bigintType
	case t.flags&TypeFlagsBooleanLiteral != 0 && isFreshLiteralType(t):
		return c.booleanType
	case t.flags&TypeFlagsUnion != 0:
		return c.mapType(t, c.getWidenedLiteralType)
	}
	return t
}

func (c *Checker) getWidenedUniqueESSymbolType(t *Type) *Type {
	switch {
	case t.flags&TypeFlagsUniqueESSymbol != 0:
		return c.esSymbolType
	case t.flags&TypeFlagsUnion != 0:
		return c.mapType(t, c.getWidenedUniqueESSymbolType)
	}
	return t
}

func (c *Checker) getWidenedLiteralLikeTypeForContextualType(t *Type, contextualType *Type) *Type {
	if !c.isLiteralOfContextualType(t, contextualType) {
		t = c.getWidenedUniqueESSymbolType(c.getWidenedLiteralType(t))
	}
	return c.getRegularTypeOfLiteralType(t)
}

func (c *Checker) isLiteralOfContextualType(candidateType *Type, contextualType *Type) bool {
	if contextualType != nil {
		if contextualType.flags&TypeFlagsUnionOrIntersection != 0 {
			return core.Some(contextualType.Types(), func(t *Type) bool {
				return c.isLiteralOfContextualType(candidateType, t)
			})
		}
		if contextualType.flags&TypeFlagsInstantiableNonPrimitive != 0 {
			// If the contextual type is a type variable constrained to a primitive type, consider
			// this a literal context for literals of that primitive type. For example, given a
			// type parameter 'T extends string', infer string literal types for T.
			constraint := c.getBaseConstraintOfType(contextualType)
			if constraint == nil {
				constraint = c.unknownType
			}
			return c.maybeTypeOfKind(constraint, TypeFlagsString) && c.maybeTypeOfKind(candidateType, TypeFlagsStringLiteral) || c.maybeTypeOfKind(constraint, TypeFlagsNumber) && c.maybeTypeOfKind(candidateType, TypeFlagsNumberLiteral) || c.maybeTypeOfKind(constraint, TypeFlagsBigInt) && c.maybeTypeOfKind(candidateType, TypeFlagsBigIntLiteral) || c.maybeTypeOfKind(constraint, TypeFlagsESSymbol) && c.maybeTypeOfKind(candidateType, TypeFlagsUniqueESSymbol) || c.isLiteralOfContextualType(candidateType, constraint)
		}
		// If the contextual type is a literal of a particular primitive type, we consider this a
		// literal context for all literals of that primitive type.
		return contextualType.flags&(TypeFlagsStringLiteral|TypeFlagsIndex|TypeFlagsTemplateLiteral|TypeFlagsStringMapping) != 0 && c.maybeTypeOfKind(candidateType, TypeFlagsStringLiteral) ||
			contextualType.flags&TypeFlagsNumberLiteral != 0 && c.maybeTypeOfKind(candidateType, TypeFlagsNumberLiteral) ||
			contextualType.flags&TypeFlagsBigIntLiteral != 0 && c.maybeTypeOfKind(candidateType, TypeFlagsBigIntLiteral) ||
			contextualType.flags&TypeFlagsBooleanLiteral != 0 && c.maybeTypeOfKind(candidateType, TypeFlagsBooleanLiteral) ||
			contextualType.flags&TypeFlagsUniqueESSymbol != 0 && c.maybeTypeOfKind(candidateType, TypeFlagsUniqueESSymbol)
	}
	return false
}

func (c *Checker) mapType(t *Type, f func(*Type) *Type) *Type {
	return c.mapTypeEx(t, f, false /*noReductions*/)
}

func (c *Checker) mapTypeEx(t *Type, f func(*Type) *Type, noReductions bool) *Type {
	if t.flags&TypeFlagsNever != 0 {
		return t
	}
	if t.flags&TypeFlagsUnion == 0 {
		return f(t)
	}
	u := t.AsUnionType()
	types := u.types
	if u.origin != nil && u.origin.flags&TypeFlagsUnion != 0 {
		types = u.origin.Types()
	}
	var mappedTypes []*Type
	var changed bool
	for _, s := range types {
		var mapped *Type
		if s.flags&TypeFlagsUnion != 0 {
			mapped = c.mapTypeEx(s, f, noReductions)
		} else {
			mapped = f(s)
		}
		if mapped != s {
			changed = true
		}
		if mapped != nil {
			mappedTypes = append(mappedTypes, mapped)
		}
	}
	if changed {
		unionReduction := UnionReductionLiteral
		if noReductions {
			unionReduction = UnionReductionNone
		}
		return c.getUnionTypeEx(mappedTypes, unionReduction, nil /*alias*/, nil /*origin*/)
	}
	return t
}

type UnionReduction int32

const (
	UnionReductionNone UnionReduction = iota
	UnionReductionLiteral
	UnionReductionSubtype
)

func (c *Checker) getUnionOrIntersectionType(types []*Type, flags TypeFlags, unionReduction UnionReduction) *Type {
	if flags&TypeFlagsIntersection == 0 {
		return c.getUnionTypeEx(types, unionReduction, nil, nil)
	}
	return c.getIntersectionType(types)
}

func (c *Checker) getUnionType(types []*Type) *Type {
	return c.getUnionTypeEx(types, UnionReductionLiteral, nil /*alias*/, nil /*origin*/)
}

// We sort and deduplicate the constituent types based on object identity. If the subtypeReduction
// flag is specified we also reduce the constituent type set to only include types that aren't subtypes
// of other types. Subtype reduction is expensive for large union types and is possible only when union
// types are known not to circularly reference themselves (as is the case with union types created by
// expression constructs such as array literals and the || and ?: operators). Named types can
// circularly reference themselves and therefore cannot be subtype reduced during their declaration.
// For example, "type Item = string | (() => Item" is a named type that circularly references itself.
func (c *Checker) getUnionTypeEx(types []*Type, unionReduction UnionReduction, alias *TypeAlias, origin *Type) *Type {
	if len(types) == 0 {
		return c.neverType
	}
	if len(types) == 1 {
		return types[0]
	}
	// We optimize for the common case of unioning a union type with some other type (such as `undefined`).
	if len(types) == 2 && origin == nil && (types[0].flags&TypeFlagsUnion != 0 || types[1].flags&TypeFlagsUnion != 0) {
		id1 := types[0].id
		id2 := types[1].id
		if id1 > id2 {
			id1, id2 = id2, id1
		}
		key := UnionOfUnionKey{id1: id1, id2: id2, r: unionReduction, a: getAliasKey(alias)}
		t := c.unionOfUnionTypes[key]
		if t == nil {
			t = c.getUnionTypeWorker(types, unionReduction, alias, nil /*origin*/)
			c.unionOfUnionTypes[key] = t
		}
		return t
	}
	return c.getUnionTypeWorker(types, unionReduction, alias, origin)
}

func (c *Checker) getUnionTypeWorker(types []*Type, unionReduction UnionReduction, alias *TypeAlias, origin *Type) *Type {
	typeSet, includes := c.addTypesToUnion(nil, 0, types)
	if unionReduction != UnionReductionNone {
		if includes&TypeFlagsAnyOrUnknown != 0 {
			if includes&TypeFlagsAny != 0 {
				switch {
				case includes&TypeFlagsIncludesWildcard != 0:
					return c.wildcardType
				case includes&TypeFlagsIncludesError != 0:
					return c.errorType
				}
				return c.anyType
			}
			return c.unknownType
		}
		if includes&TypeFlagsUndefined != 0 {
			// If type set contains both undefinedType and missingType, remove missingType
			if len(typeSet) >= 2 && typeSet[0] == c.undefinedType && typeSet[1] == c.missingType {
				typeSet = slices.Delete(typeSet, 1, 2)
			}
		}
		if includes&(TypeFlagsEnum|TypeFlagsLiteral|TypeFlagsUniqueESSymbol|TypeFlagsTemplateLiteral|TypeFlagsStringMapping) != 0 ||
			includes&TypeFlagsVoid != 0 && includes&TypeFlagsUndefined != 0 {
			typeSet = c.removeRedundantLiteralTypes(typeSet, includes, unionReduction&UnionReductionSubtype != 0)
		}
		if includes&TypeFlagsStringLiteral != 0 && includes&(TypeFlagsTemplateLiteral|TypeFlagsStringMapping) != 0 {
			typeSet = c.removeStringLiteralsMatchedByTemplateLiterals(typeSet)
		}
		if includes&TypeFlagsIncludesConstrainedTypeVariable != 0 {
			typeSet = c.removeConstrainedTypeVariables(typeSet)
		}
		if unionReduction == UnionReductionSubtype {
			typeSet = c.removeSubtypes(typeSet, includes&TypeFlagsObject != 0)
			if typeSet == nil {
				return c.errorType
			}
		}
		if len(typeSet) == 0 {
			switch {
			case includes&TypeFlagsNull != 0:
				if includes&TypeFlagsIncludesNonWideningType != 0 {
					return c.nullType
				}
				return c.nullWideningType
			case includes&TypeFlagsUndefined != 0:
				if includes&TypeFlagsIncludesNonWideningType != 0 {
					return c.undefinedType
				}
				return c.undefinedWideningType
			}
			return c.neverType
		}
	}
	if origin == nil && includes&TypeFlagsUnion != 0 {
		namedUnions := c.addNamedUnions(nil, types)
		var reducedTypes []*Type
		for _, t := range typeSet {
			if !core.Some(namedUnions, func(u *Type) bool { return containsType(u.Types(), t) }) {
				reducedTypes = append(reducedTypes, t)
			}
		}
		if alias == nil && len(namedUnions) == 1 && len(reducedTypes) == 0 {
			return namedUnions[0]
		}
		// We create a denormalized origin type only when the union was created from one or more named unions
		// (unions with alias symbols or origins) and when there is no overlap between those named unions.
		namedTypesCount := 0
		for _, u := range namedUnions {
			namedTypesCount += len(u.Types())
		}
		if namedTypesCount+len(reducedTypes) == len(typeSet) {
			for _, t := range namedUnions {
				reducedTypes, _ = insertType(reducedTypes, t)
			}
			origin = c.newUnionType(ObjectFlagsNone, reducedTypes)
		}
	}
	objectFlags := core.IfElse(includes&TypeFlagsNotPrimitiveUnion != 0, ObjectFlagsNone, ObjectFlagsPrimitiveUnion) |
		core.IfElse(includes&TypeFlagsIntersection != 0, ObjectFlagsContainsIntersections, ObjectFlagsNone)
	return c.getUnionTypeFromSortedList(typeSet, objectFlags, alias, origin)
}

// This function assumes the constituent type list is sorted and deduplicated.
func (c *Checker) getUnionTypeFromSortedList(types []*Type, precomputedObjectFlags ObjectFlags, alias *TypeAlias, origin *Type) *Type {
	if len(types) == 0 {
		return c.neverType
	}
	if len(types) == 1 {
		return types[0]
	}
	key := getUnionKey(types, origin, alias)
	t := c.unionTypes[key]
	if t == nil {
		t = c.newUnionType(precomputedObjectFlags|c.getPropagatingFlagsOfTypes(types, TypeFlagsNullable), types)
		t.AsUnionType().origin = origin
		t.alias = alias
		if len(types) == 2 && types[0].flags&TypeFlagsBooleanLiteral != 0 && types[1].flags&TypeFlagsBooleanLiteral != 0 {
			t.flags |= TypeFlagsBoolean
		}
		c.unionTypes[key] = t
	}
	return t
}

func (c *Checker) addTypesToUnion(typeSet []*Type, includes TypeFlags, types []*Type) ([]*Type, TypeFlags) {
	var lastType *Type
	for _, t := range types {
		if t != lastType {
			if t.flags&TypeFlagsUnion != 0 {
				u := t.AsUnionType()
				if t.alias != nil || u.origin != nil {
					includes |= TypeFlagsUnion
				}
				typeSet, includes = c.addTypesToUnion(typeSet, includes, u.types)
			} else {
				typeSet, includes = c.addTypeToUnion(typeSet, includes, t)
			}
			lastType = t
		}
	}
	return typeSet, includes
}

func (c *Checker) addTypeToUnion(typeSet []*Type, includes TypeFlags, t *Type) ([]*Type, TypeFlags) {
	flags := t.flags
	// We ignore 'never' types in unions
	if flags&TypeFlagsNever == 0 {
		includes |= flags & TypeFlagsIncludesMask
		if flags&TypeFlagsInstantiable != 0 {
			includes |= TypeFlagsIncludesInstantiable
		}
		if flags&TypeFlagsIntersection != 0 && t.objectFlags&ObjectFlagsIsConstrainedTypeVariable != 0 {
			includes |= TypeFlagsIncludesConstrainedTypeVariable
		}
		if t == c.wildcardType {
			includes |= TypeFlagsIncludesWildcard
		}
		if c.isErrorType(t) {
			includes |= TypeFlagsIncludesError
		}
		if !c.strictNullChecks && flags&TypeFlagsNullable != 0 {
			if t.objectFlags&ObjectFlagsContainsWideningType == 0 {
				includes |= TypeFlagsIncludesNonWideningType
			}
		} else {
			var index int
			var ok bool
			if len(typeSet) != 0 && t.id > typeSet[len(typeSet)-1].id {
				index = len(typeSet)
			} else {
				index, ok = slices.BinarySearchFunc(typeSet, t, compareTypeIds)
			}
			if !ok {
				typeSet = slices.Insert(typeSet, index, t)
			}
		}
	}
	return typeSet, includes
}

func (c *Checker) addNamedUnions(namedUnions []*Type, types []*Type) []*Type {
	for _, t := range types {
		if t.flags&TypeFlagsUnion != 0 {
			u := t.AsUnionType()
			if t.alias != nil || u.origin != nil && u.origin.flags&TypeFlagsUnion == 0 {
				namedUnions = core.AppendIfUnique(namedUnions, t)
			} else if u.origin != nil && u.origin.flags&TypeFlagsUnion != 0 {
				namedUnions = c.addNamedUnions(namedUnions, u.origin.Types())
			}
		}
	}
	return namedUnions
}

func (c *Checker) removeRedundantLiteralTypes(types []*Type, includes TypeFlags, reduceVoidUndefined bool) []*Type {
	i := len(types)
	for i > 0 {
		i--
		t := types[i]
		flags := t.flags
		remove := flags&(TypeFlagsStringLiteral|TypeFlagsTemplateLiteral|TypeFlagsStringMapping) != 0 && includes&TypeFlagsString != 0 ||
			flags&TypeFlagsNumberLiteral != 0 && includes&TypeFlagsNumber != 0 ||
			flags&TypeFlagsBigIntLiteral != 0 && includes&TypeFlagsBigInt != 0 ||
			flags&TypeFlagsUniqueESSymbol != 0 && includes&TypeFlagsESSymbol != 0 ||
			reduceVoidUndefined && flags&TypeFlagsUndefined != 0 && includes&TypeFlagsVoid != 0 ||
			isFreshLiteralType(t) && containsType(types, t.AsLiteralType().regularType)
		if remove {
			types = slices.Delete(types, i, i+1)
		}
	}
	return types
}

func (c *Checker) removeStringLiteralsMatchedByTemplateLiterals(types []*Type) []*Type {
	// !!!
	return types
}

func (c *Checker) removeConstrainedTypeVariables(types []*Type) []*Type {
	// !!!
	return types
}

func (c *Checker) removeSubtypes(types []*Type, hasObjectTypes bool) []*Type {
	// !!!
	return types
}

type IntersectionFlags uint32

const (
	IntersectionFlagsNone                  IntersectionFlags = 0
	IntersectionFlagsNoSupertypeReduction  IntersectionFlags = 1 << 0
	IntersectionFlagsNoConstraintReduction IntersectionFlags = 1 << 1
)

// We normalize combinations of intersection and union types based on the distributive property of the '&'
// operator. Specifically, because X & (A | B) is equivalent to X & A | X & B, we can transform intersection
// types with union type constituents into equivalent union types with intersection type constituents and
// effectively ensure that union types are always at the top level in type representations.
//
// We do not perform structural deduplication on intersection types. Intersection types are created only by the &
// type operator and we can't reduce those because we want to support recursive intersection types. For example,
// a type alias of the form "type List<T> = T & { next: List<T> }" cannot be reduced during its declaration.
// Also, unlike union types, the order of the constituent types is preserved in order that overload resolution
// for intersections of types with signatures can be deterministic.
func (c *Checker) getIntersectionType(types []*Type) *Type {
	return c.getIntersectionTypeEx(types, IntersectionFlagsNone, nil /*alias*/)
}

func (c *Checker) getIntersectionTypeEx(types []*Type, flags IntersectionFlags, alias *TypeAlias) *Type {
	var orderedTypes orderedMap[TypeId, *Type]
	includes := c.addTypesToIntersection(&orderedTypes, 0, types)
	typeSet := orderedTypes.values
	objectFlags := ObjectFlagsNone
	// An intersection type is considered empty if it contains
	// the type never, or
	// more than one unit type or,
	// an object type and a nullable type (null or undefined), or
	// a string-like type and a type known to be non-string-like, or
	// a number-like type and a type known to be non-number-like, or
	// a symbol-like type and a type known to be non-symbol-like, or
	// a void-like type and a type known to be non-void-like, or
	// a non-primitive type and a type known to be primitive.
	if includes&TypeFlagsNever != 0 {
		if slices.Contains(typeSet, c.silentNeverType) {
			return c.silentNeverType
		}
		return c.neverType
	}
	if c.strictNullChecks && includes&TypeFlagsNullable != 0 && includes&(TypeFlagsObject|TypeFlagsNonPrimitive|TypeFlagsIncludesEmptyObject) != 0 ||
		includes&TypeFlagsNonPrimitive != 0 && includes&(TypeFlagsDisjointDomains&^TypeFlagsNonPrimitive) != 0 ||
		includes&TypeFlagsStringLike != 0 && includes&(TypeFlagsDisjointDomains&^TypeFlagsStringLike) != 0 ||
		includes&TypeFlagsNumberLike != 0 && includes&(TypeFlagsDisjointDomains&^TypeFlagsNumberLike) != 0 ||
		includes&TypeFlagsBigIntLike != 0 && includes&(TypeFlagsDisjointDomains&^TypeFlagsBigIntLike) != 0 ||
		includes&TypeFlagsESSymbolLike != 0 && includes&(TypeFlagsDisjointDomains&^TypeFlagsESSymbolLike) != 0 ||
		includes&TypeFlagsVoidLike != 0 && includes&(TypeFlagsDisjointDomains&^TypeFlagsVoidLike) != 0 {
		return c.neverType
	}
	if includes&(TypeFlagsTemplateLiteral|TypeFlagsStringMapping) != 0 && includes&TypeFlagsStringLiteral != 0 && c.extractRedundantTemplateLiterals(typeSet) {
		return c.neverType
	}
	if includes&TypeFlagsAny != 0 {
		switch {
		case includes&TypeFlagsIncludesWildcard != 0:
			return c.wildcardType
		case includes&TypeFlagsIncludesError != 0:
			return c.errorType
		}
		return c.anyType
	}
	if !c.strictNullChecks && includes&TypeFlagsNullable != 0 {
		switch {
		case includes&TypeFlagsIncludesEmptyObject != 0:
			return c.neverType
		case includes&TypeFlagsUndefined != 0:
			return c.undefinedType
		}
		return c.nullType
	}
	if includes&TypeFlagsString != 0 && includes&(TypeFlagsStringLiteral|TypeFlagsTemplateLiteral|TypeFlagsStringMapping) != 0 ||
		includes&TypeFlagsNumber != 0 && includes&TypeFlagsNumberLiteral != 0 ||
		includes&TypeFlagsBigInt != 0 && includes&TypeFlagsBigIntLiteral != 0 ||
		includes&TypeFlagsESSymbol != 0 && includes&TypeFlagsUniqueESSymbol != 0 ||
		includes&TypeFlagsVoid != 0 && includes&TypeFlagsUndefined != 0 ||
		includes&TypeFlagsIncludesEmptyObject != 0 && includes&TypeFlagsDefinitelyNonNullable != 0 {
		if flags&IntersectionFlagsNoSupertypeReduction == 0 {
			typeSet = c.removeRedundantSupertypes(typeSet, includes)
		}
	}
	if includes&TypeFlagsIncludesMissingType != 0 {
		typeSet[slices.Index(typeSet, c.undefinedType)] = c.missingType
	}
	if len(typeSet) == 0 {
		return c.unknownType
	}
	if len(typeSet) == 1 {
		return typeSet[0]
	}
	if len(typeSet) == 2 && flags&IntersectionFlagsNoConstraintReduction == 0 {
		typeVarIndex := 0
		if typeSet[0].flags&TypeFlagsTypeVariable == 0 {
			typeVarIndex = 1
		}
		typeVariable := typeSet[typeVarIndex]
		primitiveType := typeSet[1-typeVarIndex]
		if typeVariable.flags&TypeFlagsTypeVariable != 0 && (primitiveType.flags&(TypeFlagsPrimitive|TypeFlagsNonPrimitive) != 0 && !c.isGenericStringLikeType(primitiveType) ||
			includes&TypeFlagsIncludesEmptyObject != 0) {
			// We have an intersection T & P or P & T, where T is a type variable and P is a primitive type, the object type, or {}.
			constraint := c.getBaseConstraintOfType(typeVariable)
			// Check that T's constraint is similarly composed of primitive types, the object type, or {}.
			if constraint != nil && everyType(constraint, c.isPrimitiveOrObjectOrEmptyType) {
				// If T's constraint is a subtype of P, simply return T. For example, given `T extends "a" | "b"`,
				// the intersection `T & string` reduces to just T.
				if c.isTypeStrictSubtypeOf(constraint, primitiveType) {
					return typeVariable
				}
				if !(constraint.flags&TypeFlagsUnion != 0 && someType(constraint, func(n *Type) bool {
					return c.isTypeStrictSubtypeOf(n, primitiveType)
				})) {
					// No constituent of T's constraint is a subtype of P. If P is also not a subtype of T's constraint,
					// then the constraint and P are unrelated, and the intersection reduces to never. For example, given
					// `T extends "a" | "b"`, the intersection `T & number` reduces to never.
					if !c.isTypeStrictSubtypeOf(primitiveType, constraint) {
						return c.neverType
					}
				}
				// Some constituent of T's constraint is a subtype of P, or P is a subtype of T's constraint. Thus,
				// the intersection further constrains the type variable. For example, given `T extends string | number`,
				// the intersection `T & "a"` is marked as a constrained type variable. Likewise, given `T extends "a" | 1`,
				// the intersection `T & number` is marked as a constrained type variable.
				objectFlags = ObjectFlagsIsConstrainedTypeVariable
			}
		}
	}
	key := getIntersectionKey(typeSet, flags, alias)
	result := c.intersectionTypes[key]
	if result == nil {
		if includes&TypeFlagsUnion != 0 {
			var reduced bool
			typeSet, reduced = c.intersectUnionsOfPrimitiveTypes(typeSet)
			switch {
			case reduced:
				// When the intersection creates a reduced set (which might mean that *all* union types have
				// disappeared), we restart the operation to get a new set of combined flags. Once we have
				// reduced we'll never reduce again, so this occurs at most once.
				result = c.getIntersectionTypeEx(typeSet, flags, alias)
			case core.Every(typeSet, isUnionWithUndefined):
				containedUndefinedType := c.undefinedType
				if core.Some(typeSet, c.containsMissingType) {
					containedUndefinedType = c.missingType
				}
				c.filterTypes(typeSet, isNotUndefinedType)
				result = c.getUnionTypeEx([]*Type{c.getIntersectionTypeEx(typeSet, flags, nil /*alias*/), containedUndefinedType}, UnionReductionLiteral, alias, nil /*origin*/)
			case core.Every(typeSet, isUnionWithNull):
				c.filterTypes(typeSet, isNotNullType)
				result = c.getUnionTypeEx([]*Type{c.getIntersectionTypeEx(typeSet, flags, nil /*alias*/), c.nullType}, UnionReductionLiteral, alias, nil /*origin*/)
			case len(typeSet) >= 3 && len(types) > 2:
				// When we have three or more constituents, more than two inputs (to head off infinite reexpansion), some of which are unions, we employ a "divide and conquer" strategy
				// where A & B & C & D is processed as (A & B) & (C & D). Since intersections of unions often produce far smaller
				// unions of intersections than the full cartesian product (due to some intersections becoming `never`), this can
				// dramatically reduce the overall work.
				middle := len(typeSet) / 2
				result = c.getIntersectionTypeEx([]*Type{
					c.getIntersectionTypeEx(typeSet[:middle], flags, nil /*alias*/),
					c.getIntersectionTypeEx(typeSet[middle:], flags, nil /*alias*/)},
					flags, alias)
			default:
				// We are attempting to construct a type of the form X & (A | B) & (C | D). Transform this into a type of
				// the form X & A & C | X & A & D | X & B & C | X & B & D. If the estimated size of the resulting union type
				// exceeds 100000 constituents, report an error.
				if !c.checkCrossProductUnion(typeSet) {
					return c.errorType
				}
				constituents := c.getCrossProductIntersections(typeSet, flags)
				// We attach a denormalized origin type when at least one constituent of the cross-product union is an
				// intersection (i.e. when the intersection didn't just reduce one or more unions to smaller unions) and
				// the denormalized origin has fewer constituents than the union itself.
				var origin *Type
				if core.Some(constituents, isIntersectionType) && getConstituentCountOfTypes(constituents) > getConstituentCountOfTypes(typeSet) {
					origin = c.newIntersectionType(ObjectFlagsNone, typeSet)
				}
				result = c.getUnionTypeEx(constituents, UnionReductionLiteral, alias, origin)
			}
		} else {
			result = c.newIntersectionType(objectFlags|c.getPropagatingFlagsOfTypes(types /*excludeKinds*/, TypeFlagsNullable), typeSet)
			result.alias = alias
		}
		c.intersectionTypes[key] = result
	}
	return result
}

func isUnionWithUndefined(t *Type) bool {
	return t.flags&TypeFlagsUnion != 0 && t.Types()[0].flags&TypeFlagsUndefined != 0
}

func isUnionWithNull(t *Type) bool {
	return t.flags&TypeFlagsUnion != 0 && (t.Types()[0].flags&TypeFlagsNull != 0 || t.Types()[1].flags&TypeFlagsNull != 0)
}

func isIntersectionType(t *Type) bool {
	return t.flags&TypeFlagsIntersection != 0
}

func isPrimitiveUnion(t *Type) bool {
	return t.objectFlags&ObjectFlagsPrimitiveUnion != 0
}

func isNotUndefinedType(t *Type) bool {
	return t.flags&TypeFlagsUndefined == 0
}

func isNotNullType(t *Type) bool {
	return t.flags&TypeFlagsNull == 0
}

// Add the given types to the given type set. Order is preserved, freshness is removed from literal
// types, duplicates are removed, and nested types of the given kind are flattened into the set.
func (c *Checker) addTypesToIntersection(typeSet *orderedMap[TypeId, *Type], includes TypeFlags, types []*Type) TypeFlags {
	for _, t := range types {
		includes = c.addTypeToIntersection(typeSet, includes, c.getRegularTypeOfLiteralType(t))
	}
	return includes
}

func (c *Checker) addTypeToIntersection(typeSet *orderedMap[TypeId, *Type], includes TypeFlags, t *Type) TypeFlags {
	flags := t.flags
	if flags&TypeFlagsIntersection != 0 {
		return c.addTypesToIntersection(typeSet, includes, t.Types())
	}
	if c.isEmptyAnonymousObjectType(t) {
		if includes&TypeFlagsIncludesEmptyObject == 0 {
			includes |= TypeFlagsIncludesEmptyObject
			typeSet.add(t.id, t)
		}
	} else {
		if flags&TypeFlagsAnyOrUnknown != 0 {
			if t == c.wildcardType {
				includes |= TypeFlagsIncludesWildcard
			}
			if c.isErrorType(t) {
				includes |= TypeFlagsIncludesError
			}
		} else if c.strictNullChecks || flags&TypeFlagsNullable == 0 {
			if t == c.missingType {
				includes |= TypeFlagsIncludesMissingType
				t = c.undefinedType
			}
			if !typeSet.contains(t.id) {
				if t.flags&TypeFlagsUnit != 0 && includes&TypeFlagsUnit != 0 {
					// We have seen two distinct unit types which means we should reduce to an
					// empty intersection. Adding TypeFlags.NonPrimitive causes that to happen.
					includes |= TypeFlagsNonPrimitive
				}
				typeSet.add(t.id, t)
			}
		}
		includes |= flags & TypeFlagsIncludesMask
	}
	return includes
}

func (c *Checker) removeRedundantSupertypes(types []*Type, includes TypeFlags) []*Type {
	i := len(types)
	for i > 0 {
		i--
		t := types[i]
		remove := t.flags&TypeFlagsString != 0 && includes&(TypeFlagsStringLiteral|TypeFlagsTemplateLiteral|TypeFlagsStringMapping) != 0 ||
			t.flags&TypeFlagsNumber != 0 && includes&TypeFlagsNumberLiteral != 0 ||
			t.flags&TypeFlagsBigInt != 0 && includes&TypeFlagsBigIntLiteral != 0 ||
			t.flags&TypeFlagsESSymbol != 0 && includes&TypeFlagsUniqueESSymbol != 0 ||
			t.flags&TypeFlagsVoid != 0 && includes&TypeFlagsUndefined != 0 ||
			c.isEmptyAnonymousObjectType(t) && includes&TypeFlagsDefinitelyNonNullable != 0
		if remove {
			types = slices.Delete(types, i, i+1)
		}
	}
	return types
}

/**
 * Returns true if the intersection of the template literals and string literals is the empty set,
 * for example `get${string}` & "setX", and should reduce to never.
 */
func (c *Checker) extractRedundantTemplateLiterals(types []*Type) bool {
	// !!!
	return false
}

// If the given list of types contains more than one union of primitive types, replace the
// first with a union containing an intersection of those primitive types, then remove the
// other unions and return true. Otherwise, do nothing and return false.
func (c *Checker) intersectUnionsOfPrimitiveTypes(types []*Type) ([]*Type, bool) {
	index := slices.IndexFunc(types, isPrimitiveUnion)
	if index < 0 {
		return types, false
	}
	// Remove all but the first union of primitive types and collect them in
	// the unionTypes array.
	i := index + 1
	unionTypes := types[index:i:i]
	for i < len(types) {
		t := types[i]
		if t.objectFlags&ObjectFlagsPrimitiveUnion != 0 {
			unionTypes = append(unionTypes, t)
			types = slices.Delete(types, i, i+1)
		} else {
			i++
		}
	}
	// Return false if there was only one union of primitive types
	if len(unionTypes) == 1 {
		return types, false
	}
	// We have more than one union of primitive types, now intersect them. For each
	// type in each union we check if the type is matched in every union and if so
	// we include it in the result.
	var checked []*Type
	var result []*Type
	for _, u := range unionTypes {
		for _, t := range u.Types() {
			var inserted bool
			if checked, inserted = insertType(checked, t); inserted {
				if c.eachUnionContains(unionTypes, t) {
					// undefinedType/missingType are always sorted first so we leverage that here
					if t == c.undefinedType && len(result) != 0 && result[0] == c.missingType {
						continue
					}
					if t == c.missingType && len(result) != 0 && result[0] == c.undefinedType {
						result[0] = c.missingType
						continue
					}
					result, _ = insertType(result, t)
				}
			}
		}
	}
	// Finally replace the first union with the result
	types[index] = c.getUnionTypeFromSortedList(result, ObjectFlagsPrimitiveUnion, nil /*alias*/, nil /*origin*/)
	return types, true
}

// Check that the given type has a match in every union. A given type is matched by
// an identical type, and a literal type is additionally matched by its corresponding
// primitive type, and missingType is matched by undefinedType (and vice versa).
func (c *Checker) eachUnionContains(unionTypes []*Type, t *Type) bool {
	for _, u := range unionTypes {
		types := u.Types()
		if !containsType(types, t) {
			if t == c.missingType {
				return containsType(types, c.undefinedType)
			}
			if t == c.undefinedType {
				return containsType(types, c.missingType)
			}
			var primitive *Type
			switch {
			case t.flags&TypeFlagsStringLiteral != 0:
				primitive = c.stringType
			case t.flags&(TypeFlagsEnum|TypeFlagsNumberLiteral) != 0:
				primitive = c.numberType
			case t.flags&TypeFlagsBigIntLiteral != 0:
				primitive = c.bigintType
			case t.flags&TypeFlagsUniqueESSymbol != 0:
				primitive = c.esSymbolType
			}
			if primitive == nil || !containsType(types, primitive) {
				return false
			}
		}
	}
	return true
}

func (c *Checker) getCrossProductIntersections(types []*Type, flags IntersectionFlags) []*Type {
	count := c.getCrossProductUnionSize(types)
	var intersections []*Type
	for i := range count {
		constituents := slices.Clone(types)
		n := i
		for j := len(types) - 1; j >= 0; j-- {
			if types[j].flags&TypeFlagsUnion != 0 {
				sourceTypes := types[j].Types()
				length := len(sourceTypes)
				constituents[j] = sourceTypes[n%length]
				n = n / length
			}
		}
		t := c.getIntersectionTypeEx(constituents, flags, nil /*alias*/)
		if t.flags&TypeFlagsNever == 0 {
			intersections = append(intersections, t)
		}
	}
	return intersections
}

func getConstituentCount(t *Type) int {
	switch {
	case t.flags&TypeFlagsUnionOrIntersection == 0 || t.alias != nil:
		return 1
	case t.flags&TypeFlagsUnion != 0 && t.AsUnionType().origin != nil:
		return getConstituentCount(t.AsUnionType().origin)
	}
	return getConstituentCountOfTypes(t.Types())
}

func getConstituentCountOfTypes(types []*Type) int {
	n := 0
	for _, t := range types {
		n += getConstituentCount(t)
	}
	return n
}

func (c *Checker) filterTypes(types []*Type, predicate func(*Type) bool) {
	for i, t := range types {
		types[i] = c.filterType(t, predicate)
	}
}

func (c *Checker) isEmptyAnonymousObjectType(t *Type) bool {
	return t.objectFlags&ObjectFlagsAnonymous != 0 && t.objectFlags&ObjectFlagsMembersResolved != 0 && c.isEmptyResolvedType(t.AsStructuredType()) ||
		t.symbol != nil && t.symbol.Flags&ast.SymbolFlagsTypeLiteral != 0 && len(c.getMembersOfSymbol(t.symbol)) == 0
}

func (c *Checker) isEmptyResolvedType(t *StructuredType) bool {
	return t.AsType() != c.anyFunctionType && len(t.properties) == 0 && len(t.signatures) == 0 && len(t.indexInfos) == 0
}

func (c *Checker) isEmptyObjectType(t *Type) bool {
	switch {
	case t.flags&TypeFlagsObject != 0:
		return !c.isGenericMappedType(t) && c.isEmptyResolvedType(c.resolveStructuredTypeMembers(t))
	case t.flags&TypeFlagsNonPrimitive != 0:
		return true
	case t.flags&TypeFlagsUnion != 0:
		return core.Some(t.Types(), c.isEmptyObjectType)
	case t.flags&TypeFlagsIntersection != 0:
		return core.Every(t.Types(), c.isEmptyObjectType)
	}
	return false
}

func (c *Checker) isPatternLiteralPlaceholderType(t *Type) bool {
	if t.flags&TypeFlagsIntersection != 0 {
		// Return true if the intersection consists of one or more placeholders and zero or
		// more object type tags.
		seenPlaceholder := false
		for _, s := range t.Types() {
			if s.flags&(TypeFlagsLiteral|TypeFlagsNullable) != 0 || c.isPatternLiteralPlaceholderType(s) {
				seenPlaceholder = true
			} else if s.flags&TypeFlagsObject == 0 {
				return false
			}
		}
		return seenPlaceholder
	}
	return t.flags&(TypeFlagsAny|TypeFlagsString|TypeFlagsNumber|TypeFlagsBigInt) != 0 || c.isPatternLiteralType(t)
}

func (c *Checker) isPatternLiteralType(t *Type) bool {
	// A pattern literal type is a template literal or a string mapping type that contains only
	// non-generic pattern literal placeholders.
	return t.flags&TypeFlagsTemplateLiteral != 0 && core.Every(t.AsTemplateLiteralType().types, c.isPatternLiteralPlaceholderType) ||
		t.flags&TypeFlagsStringMapping != 0 && c.isPatternLiteralPlaceholderType(t.Target())
}

func (c *Checker) isGenericStringLikeType(t *Type) bool {
	return t.flags&(TypeFlagsTemplateLiteral|TypeFlagsStringMapping) != 0 && !c.isPatternLiteralType(t)
}

func forEachType(t *Type, f func(t *Type)) {
	if t.flags&TypeFlagsUnion != 0 {
		for _, u := range t.Types() {
			f(u)
		}
	} else {
		f(t)
	}
}

func someType(t *Type, f func(*Type) bool) bool {
	if t.flags&TypeFlagsUnion != 0 {
		return core.Some(t.Types(), f)
	}
	return f(t)
}

func everyType(t *Type, f func(*Type) bool) bool {
	if t.flags&TypeFlagsUnion != 0 {
		return core.Every(t.Types(), f)
	}
	return f(t)
}

func (c *Checker) filterType(t *Type, f func(*Type) bool) *Type {
	if t.flags&TypeFlagsUnion != 0 {
		types := t.Types()
		filtered := core.Filter(types, f)
		if core.Same(types, filtered) {
			return t
		}
		origin := t.AsUnionType().origin
		var newOrigin *Type
		if origin != nil && origin.flags&TypeFlagsUnion != 0 {
			// If the origin type is a (denormalized) union type, filter its non-union constituents. If that ends
			// up removing a smaller number of types than in the normalized constituent set (meaning some of the
			// filtered types are within nested unions in the origin), then we can't construct a new origin type.
			// Otherwise, if we have exactly one type left in the origin set, return that as the filtered type.
			// Otherwise, construct a new filtered origin type.
			originTypes := origin.Types()
			originFiltered := core.Filter(originTypes, func(u *Type) bool {
				return u.flags&TypeFlagsUnion != 0 || f(u)
			})
			if len(originTypes)-len(originFiltered) == len(types)-len(filtered) {
				if len(originFiltered) == 1 {
					return originFiltered[0]
				}
				newOrigin = c.newUnionType(ObjectFlagsNone, originFiltered)
			}
		}
		// filtering could remove intersections so `ContainsIntersections` might be forwarded "incorrectly"
		// it is purely an optimization hint so there is no harm in accidentally forwarding it
		return c.getUnionTypeFromSortedList(filtered, t.AsUnionType().objectFlags&(ObjectFlagsPrimitiveUnion|ObjectFlagsContainsIntersections), nil /*alias*/, newOrigin)
	}
	if t.flags&TypeFlagsNever != 0 || f(t) {
		return t
	}
	return c.neverType
}

func (c *Checker) removeType(t *Type, targetType *Type) *Type {
	return c.filterType(t, func(t *Type) bool { return t != targetType })
}

func containsType(types []*Type, t *Type) bool {
	_, ok := slices.BinarySearchFunc(types, t, compareTypeIds)
	return ok
}

func insertType(types []*Type, t *Type) ([]*Type, bool) {
	if i, ok := slices.BinarySearchFunc(types, t, compareTypeIds); !ok {
		return slices.Insert(types, i, t), true
	}
	return types, false
}

func countTypes(t *Type) int {
	switch {
	case t.flags&TypeFlagsUnion != 0:
		return len(t.Types())
	case t.flags&TypeFlagsNever != 0:
		return 0
	}
	return 1
}

func (c *Checker) isErrorType(t *Type) bool {
	// The only 'any' types that have alias symbols are those manufactured by getTypeFromTypeAliasReference for
	// a reference to an unresolved symbol. We want those to behave like the errorType.
	return t == c.errorType || t.flags&TypeFlagsAny != 0 && t.alias != nil
}

func compareTypeIds(t1, t2 *Type) int {
	return int(t1.id) - int(t2.id)
}

func (c *Checker) checkCrossProductUnion(types []*Type) bool {
	size := c.getCrossProductUnionSize(types)
	if size >= 100_000 {
		c.error(c.currentNode, diagnostics.Expression_produces_a_union_type_that_is_too_complex_to_represent)
		return false
	}
	return true
}

func (c *Checker) getCrossProductUnionSize(types []*Type) int {
	size := 1
	for _, t := range types {
		switch {
		case t.flags&TypeFlagsUnion != 0:
			size *= len(t.Types())
		case t.flags&TypeFlagsNever != 0:
			return 0
		}
	}
	return size
}

func (c *Checker) getIndexType(t *Type) *Type {
	return c.getIndexTypeEx(t, IndexFlagsNone)
}

func (c *Checker) getIndexTypeEx(t *Type, indexFlags IndexFlags) *Type {
	t = c.getReducedType(t)
	switch {
	case c.isNoInferType(t):
		return c.getNoInferType(c.getIndexTypeEx(t.AsSubstitutionType().baseType, indexFlags))
	case c.shouldDeferIndexType(t, indexFlags):
		return c.getIndexTypeForGenericType(t, indexFlags)
	case t.flags&TypeFlagsUnion != 0:
		return c.getIntersectionType(core.Map(t.Types(), func(t *Type) *Type { return c.getIndexTypeEx(t, indexFlags) }))
	case t.flags&TypeFlagsIntersection != 0:
		return c.getUnionType(core.Map(t.Types(), func(t *Type) *Type { return c.getIndexTypeEx(t, indexFlags) }))
	case t.objectFlags&ObjectFlagsMapped != 0:
		return c.getIndexTypeForMappedType(t, indexFlags)
	case t == c.wildcardType:
		return c.wildcardType
	case t.flags&TypeFlagsUnknown != 0:
		return c.neverType
	case t.flags&(TypeFlagsAny|TypeFlagsNever) != 0:
		return c.stringNumberSymbolType
	}
	include := core.IfElse(indexFlags&IndexFlagsNoIndexSignatures != 0, TypeFlagsStringLiteral, TypeFlagsStringLike) |
		core.IfElse(indexFlags&IndexFlagsStringsOnly != 0, TypeFlagsNone, TypeFlagsNumberLike|TypeFlagsESSymbolLike)
	return c.getLiteralTypeFromProperties(t, include, indexFlags == IndexFlagsNone)
}

func (c *Checker) getExtractStringType(t *Type) *Type {
	extractTypeAlias := c.getGlobalExtractSymbol()
	if extractTypeAlias != nil {
		return c.getTypeAliasInstantiation(extractTypeAlias, []*Type{t, c.stringType}, nil)
	}
	return c.stringType
}

func (c *Checker) getLiteralTypeFromProperties(t *Type, include TypeFlags, includeOrigin bool) *Type {
	var origin *Type
	if includeOrigin && t.objectFlags&(ObjectFlagsClassOrInterface|ObjectFlagsReference) != 0 || t.alias != nil {
		origin = c.newIndexType(t, IndexFlagsNone)
	}
	var types []*Type
	for _, prop := range c.getPropertiesOfType(t) {
		types = append(types, c.getLiteralTypeFromProperty(prop, include, false))
	}
	for _, info := range c.getIndexInfosOfType(t) {
		if info != c.enumNumberIndexInfo && c.isKeyTypeIncluded(info.keyType, include) {
			if info.keyType == c.stringType && include&TypeFlagsNumber != 0 {
				types = append(types, c.stringOrNumberType)
			} else {
				types = append(types, info.keyType)
			}
		}
	}
	return c.getUnionTypeEx(types, UnionReductionLiteral, nil, origin)
}

func (c *Checker) getLiteralTypeFromProperty(prop *ast.Symbol, include TypeFlags, includeNonPublic bool) *Type {
	if includeNonPublic || getDeclarationModifierFlagsFromSymbol(prop)&ast.ModifierFlagsNonPublicAccessibilityModifier == 0 {
		t := c.valueSymbolLinks.get(c.getLateBoundSymbol(prop)).nameType
		if t == nil {
			if prop.Name == InternalSymbolNameDefault {
				t = c.getStringLiteralType("default")
			} else {
				name := getNameOfDeclaration(prop.ValueDeclaration)
				if name != nil {
					t = c.getLiteralTypeFromPropertyName(name)
				}
				if t == nil && !isKnownSymbol(prop) {
					t = c.getStringLiteralType(symbolName(prop))
				}
			}
		}
		if t != nil && t.flags&include != 0 {
			return t
		}
	}
	return c.neverType
}

func (c *Checker) getLiteralTypeFromPropertyName(name *ast.Node) *Type {
	if ast.IsPrivateIdentifier(name) {
		return c.neverType
	}
	if ast.IsNumericLiteral(name) {
		return c.getRegularTypeOfLiteralType(c.checkExpression(name))
	}
	if ast.IsComputedPropertyName(name) {
		return c.getRegularTypeOfLiteralType(c.checkComputedPropertyName(name))
	}
	propertyName := getPropertyNameForPropertyNameNode(name)
	if propertyName != InternalSymbolNameMissing {
		return c.getStringLiteralType(propertyName)
	}
	if ast.IsExpression(name) {
		return c.getRegularTypeOfLiteralType(c.checkExpression(name))
	}
	return c.neverType
}

func (c *Checker) isKeyTypeIncluded(keyType *Type, include TypeFlags) bool {
	return keyType.flags&include != 0 ||
		keyType.flags&TypeFlagsIntersection != 0 && core.Some(keyType.Types(), func(t *Type) bool {
			return c.isKeyTypeIncluded(t, include)
		})
}

func (c *Checker) checkComputedPropertyName(node *ast.Node) *Type {
	return c.neverType // !!!
}

func (c *Checker) isNoInferType(t *Type) bool {
	// A NoInfer<T> type is represented as a substitution type with a TypeFlags.Unknown constraint.
	return t.flags&TypeFlagsSubstitution != 0 && t.AsSubstitutionType().constraint.flags&TypeFlagsUnknown != 0
}

func (c *Checker) getSubstitutionIntersection(t *Type) *Type {
	if c.isNoInferType(t) {
		return t.AsSubstitutionType().baseType
	}
	return c.getIntersectionType([]*Type{t.AsSubstitutionType().constraint, t.AsSubstitutionType().baseType})
}

func (c *Checker) shouldDeferIndexType(t *Type, indexFlags IndexFlags) bool {
	return t.flags&TypeFlagsInstantiableNonPrimitive != 0 ||
		c.isGenericTupleType(t) ||
		c.isGenericMappedType(t) && (!c.hasDistributiveNameType(t) || c.getMappedTypeNameTypeKind(t) == MappedTypeNameTypeKindRemapping) ||
		t.flags&TypeFlagsUnion != 0 && indexFlags&IndexFlagsNoReducibleCheck == 0 && c.isGenericReducibleType(t) ||
		t.flags&TypeFlagsIntersection != 0 && c.maybeTypeOfKind(t, TypeFlagsInstantiable) && core.Some(t.Types(), c.isEmptyAnonymousObjectType)
}

// Ordinarily we reduce a keyof M, where M is a mapped type { [P in K as N<P>]: X }, to simply N<K>. This however presumes
// that N distributes over union types, i.e. that N<A | B | C> is equivalent to N<A> | N<B> | N<C>. Specifically, we only
// want to perform the reduction when the name type of a mapped type is distributive with respect to the type variable
// introduced by the 'in' clause of the mapped type. Note that non-generic types are considered to be distributive because
// they're the same type regardless of what's being distributed over.
func (c *Checker) hasDistributiveNameType(mappedType *Type) bool {
	typeVariable := c.getTypeParameterFromMappedType(mappedType)
	var isDistributive func(*Type) bool
	isDistributive = func(t *Type) bool {
		switch {
		case t.flags&(TypeFlagsAnyOrUnknown|TypeFlagsPrimitive|TypeFlagsNever|TypeFlagsTypeParameter|TypeFlagsObject|TypeFlagsNonPrimitive) != 0:
			return true
		case t.flags&TypeFlagsConditional != 0:
			return t.AsConditionalType().root.isDistributive && t.AsConditionalType().checkType == typeVariable
		case t.flags&TypeFlagsUnionOrIntersection != 0:
			return core.Every(t.Types(), isDistributive)
		case t.flags&TypeFlagsTemplateLiteral != 0:
			return core.Every(t.AsTemplateLiteralType().types, isDistributive)
		case t.flags&TypeFlagsIndexedAccess != 0:
			return isDistributive(t.AsIndexedAccessType().objectType) && isDistributive(t.AsIndexedAccessType().indexType)
		case t.flags&TypeFlagsSubstitution != 0:
			return isDistributive(t.AsSubstitutionType().baseType) && isDistributive(t.AsSubstitutionType().constraint)
		case t.flags&TypeFlagsStringMapping != 0:
			return isDistributive(t.Target())
		default:
			return false
		}
	}
	nameType := c.getNameTypeFromMappedType(mappedType)
	if nameType == nil {
		nameType = typeVariable
	}
	return isDistributive(nameType)
}

func (c *Checker) getMappedTypeNameTypeKind(t *Type) MappedTypeNameTypeKind {
	nameType := c.getNameTypeFromMappedType(t)
	if nameType == nil {
		return MappedTypeNameTypeKindNone
	}
	if c.isTypeAssignableTo(nameType, c.getTypeParameterFromMappedType(t)) {
		return MappedTypeNameTypeKindFiltering
	}
	return MappedTypeNameTypeKindRemapping
}

func (c *Checker) getIndexTypeForGenericType(t *Type, indexFlags IndexFlags) *Type {
	key := CachedTypeKey{
		kind:   core.IfElse(indexFlags&IndexFlagsStringsOnly != 0, CachedTypeKindStringIndexType, CachedTypeKindIndexType),
		typeId: t.id,
	}
	if indexType := c.cachedTypes[key]; indexType != nil {
		return indexType
	}
	indexType := c.newIndexType(t, indexFlags&IndexFlagsStringsOnly)
	c.cachedTypes[key] = indexType
	return indexType
}

func (c *Checker) getIndexTypeForMappedType(t *Type, indexFlags IndexFlags) *Type {
	return c.neverType // !!!
}

func (c *Checker) getIndexedAccessType(objectType *Type, indexType *Type) *Type {
	return c.getIndexedAccessTypeEx(objectType, indexType, AccessFlagsNone, nil, nil)
}

func (c *Checker) getIndexedAccessTypeEx(objectType *Type, indexType *Type, accessFlags AccessFlags, accessNode *ast.Node, alias *TypeAlias) *Type {
	result := c.getIndexedAccessTypeOrUndefined(objectType, indexType, accessFlags, accessNode, alias)
	if result == nil {
		result = core.IfElse(accessNode != nil, c.errorType, c.unknownType)
	}
	return result
}

func (c *Checker) getIndexedAccessTypeOrUndefined(objectType *Type, indexType *Type, accessFlags AccessFlags, accessNode *ast.Node, alias *TypeAlias) *Type {
	if objectType == c.wildcardType || indexType == c.wildcardType {
		return c.wildcardType
	}
	objectType = c.getReducedType(objectType)
	// If the object type has a string index signature and no other members we know that the result will
	// always be the type of that index signature and we can simplify accordingly.
	if c.isStringIndexSignatureOnlyType(objectType) && indexType.flags&TypeFlagsNullable == 0 && c.isTypeAssignableToKind(indexType, TypeFlagsString|TypeFlagsNumber) {
		indexType = c.stringType
	}
	// In noUncheckedIndexedAccess mode, indexed access operations that occur in an expression in a read position and resolve to
	// an index signature have 'undefined' included in their type.
	if c.compilerOptions.NoUncheckedIndexedAccess == core.TSTrue && accessFlags&AccessFlagsExpressionPosition != 0 {
		accessFlags |= AccessFlagsIncludeUndefined
	}
	// If the index type is generic, or if the object type is generic and doesn't originate in an expression and
	// the operation isn't exclusively indexing the fixed (non-variadic) portion of a tuple type, we are performing
	// a higher-order index access where we cannot meaningfully access the properties of the object type. Note that
	// for a generic T and a non-generic K, we eagerly resolve T[K] if it originates in an expression. This is to
	// preserve backwards compatibility. For example, an element access 'this["foo"]' has always been resolved
	// eagerly using the constraint type of 'this' at the given location.
	if c.shouldDeferIndexedAccessType(objectType, indexType, accessNode) {
		if objectType.flags&TypeFlagsAnyOrUnknown != 0 {
			return objectType
		}
		// Defer the operation by creating an indexed access type.
		persistentAccessFlags := accessFlags & AccessFlagsPersistent
		key := getIndexedAccessKey(objectType, indexType, accessFlags, alias)
		t := c.indexedAccessTypes[key]
		if t == nil {
			t = c.newIndexedAccessType(objectType, indexType, persistentAccessFlags)
			t.alias = alias
			c.indexedAccessTypes[key] = t
		}
		return t
	}
	// In the following we resolve T[K] to the type of the property in T selected by K.
	// We treat boolean as different from other unions to improve errors;
	// skipping straight to getPropertyTypeForIndexType gives errors with 'boolean' instead of 'true'.
	apparentObjectType := c.getReducedApparentType(objectType)
	if indexType.flags&TypeFlagsUnion != 0 && indexType.flags&TypeFlagsBoolean == 0 {
		var propTypes []*Type
		wasMissingProp := false
		for _, t := range indexType.Types() {
			propType := c.getPropertyTypeForIndexType(objectType, apparentObjectType, t, indexType, accessNode, accessFlags|core.IfElse(wasMissingProp, AccessFlagsSuppressNoImplicitAnyError, 0))
			if propType != nil {
				propTypes = append(propTypes, propType)
			} else if accessNode == nil {
				// If there's no error node, we can immeditely stop, since error reporting is off
				return nil
			} else {
				// Otherwise we set a flag and return at the end of the loop so we still mark all errors
				wasMissingProp = true
			}
		}
		if wasMissingProp {
			return nil
		}
		if accessFlags&AccessFlagsWriting != 0 {
			return c.getIntersectionTypeEx(propTypes, IntersectionFlagsNone, alias)
		}
		return c.getUnionTypeEx(propTypes, UnionReductionLiteral, alias, nil)
	}
	return c.getPropertyTypeForIndexType(objectType, apparentObjectType, indexType, indexType, accessNode, accessFlags|AccessFlagsCacheSymbol|AccessFlagsReportDeprecated)
}

func (c *Checker) getPropertyTypeForIndexType(originalObjectType *Type, objectType *Type, indexType *Type, fullIndexType *Type, accessNode *ast.Node, accessFlags AccessFlags) *Type {
	var accessExpression *ast.Node
	if accessNode != nil && ast.IsElementAccessExpression(accessNode) {
		accessExpression = accessNode
	}
	var propName string
	var hasPropName bool
	if !(accessNode != nil && ast.IsPrivateIdentifier(accessNode)) {
		propName = c.getPropertyNameFromIndex(indexType, accessNode)
		hasPropName = propName != InternalSymbolNameMissing
	}
	if hasPropName {
		if accessFlags&AccessFlagsContextual != 0 {
			t := c.getTypeOfPropertyOfContextualType(objectType, propName)
			if t == nil {
				t = c.anyType
			}
			return t
		}
		prop := c.getPropertyOfType(objectType, propName)
		if prop != nil {
			// !!!
			// if accessFlags&AccessFlagsReportDeprecated != 0 && accessNode != nil && len(prop.declarations) != 0 && c.isDeprecatedSymbol(prop) && c.isUncalledFunctionReference(accessNode, prop) {
			// 	deprecatedNode := /* TODO(TS-TO-GO) QuestionQuestionToken BinaryExpression: accessExpression?.argumentExpression ?? (isIndexedAccessTypeNode(accessNode) ? accessNode.indexType : accessNode) */ TODO
			// 	c.addDeprecatedSuggestion(deprecatedNode, prop.declarations, propName /* as string */)
			// }
			if accessExpression != nil {
				c.markPropertyAsReferenced(prop, accessExpression, c.isSelfTypeAccess(accessExpression.Expression(), objectType.symbol))
				if c.isAssignmentToReadonlyEntity(accessExpression, prop, getAssignmentTargetKind(accessExpression)) {
					c.error(accessExpression.AsElementAccessExpression().ArgumentExpression, diagnostics.Cannot_assign_to_0_because_it_is_a_read_only_property, c.symbolToString(prop))
					return nil
				}
				if accessFlags&AccessFlagsCacheSymbol != 0 {
					c.typeNodeLinks.get(accessNode).resolvedSymbol = prop
				}
				if c.isThisPropertyAccessInConstructor(accessExpression, prop) {
					return c.autoType
				}
			}
			var propType *Type
			if accessFlags&AccessFlagsWriting != 0 {
				propType = c.getWriteTypeOfSymbol(prop)
			} else {
				propType = c.getTypeOfSymbol(prop)
			}
			switch {
			case accessExpression != nil && getAssignmentTargetKind(accessExpression) != AssignmentKindDefinite:
				return c.getFlowTypeOfReference(accessExpression, propType)
			case accessNode != nil && ast.IsIndexedAccessTypeNode(accessNode) && c.containsMissingType(propType):
				return c.getUnionType([]*Type{propType, c.undefinedType})
			default:
				return propType
			}
		}
		if everyType(objectType, isTupleType) && isNumericLiteralName(propName) {
			index := stringutil.ToNumber(propName)
			if accessNode != nil && everyType(objectType, func(t *Type) bool {
				return t.TargetTupleType().combinedFlags&ElementFlagsVariable == 0
			}) && accessFlags&AccessFlagsAllowMissing == 0 {
				indexNode := getIndexNodeForAccessExpression(accessNode)
				if isTupleType(objectType) {
					if index < 0 {
						c.error(indexNode, diagnostics.A_tuple_type_cannot_be_indexed_with_a_negative_value)
						return c.undefinedType
					}
					c.error(indexNode, diagnostics.Tuple_type_0_of_length_1_has_no_element_at_index_2, c.typeToString(objectType), c.getTypeReferenceArity(objectType), propName)
				} else {
					c.error(indexNode, diagnostics.Property_0_does_not_exist_on_type_1, propName, c.typeToString(objectType))
				}
			}
			if index >= 0 {
				c.errorIfWritingToReadonlyIndex(c.getIndexInfoOfType(objectType, c.numberType), objectType, accessExpression)
				return c.getTupleElementTypeOutOfStartCount(objectType, index, core.IfElse(accessFlags&AccessFlagsIncludeUndefined != 0, c.missingType, nil))
			}
		}
	}
	if indexType.flags&TypeFlagsNullable == 0 && c.isTypeAssignableToKind(indexType, TypeFlagsStringLike|TypeFlagsNumberLike|TypeFlagsESSymbolLike) {
		if objectType.flags&(TypeFlagsAny|TypeFlagsNever) != 0 {
			return objectType
		}
		// If no index signature is applicable, we default to the string index signature. In effect, this means the string
		// index signature applies even when accessing with a symbol-like type.
		indexInfo := c.getApplicableIndexInfo(objectType, indexType)
		if indexInfo == nil {
			indexInfo = c.getIndexInfoOfType(objectType, c.stringType)
		}
		if indexInfo != nil {
			if accessFlags&AccessFlagsNoIndexSignatures != 0 && indexInfo.keyType != c.numberType {
				if accessExpression != nil {
					if accessFlags&AccessFlagsWriting != 0 {
						c.error(accessExpression, diagnostics.Type_0_is_generic_and_can_only_be_indexed_for_reading, c.typeToString(originalObjectType))
					} else {
						c.error(accessExpression, diagnostics.Type_0_cannot_be_used_to_index_type_1, c.typeToString(indexType), c.typeToString(originalObjectType))
					}
				}
				return nil
			}
			if accessNode != nil && indexInfo.keyType == c.stringType && !c.isTypeAssignableToKind(indexType, TypeFlagsString|TypeFlagsNumber) {
				indexNode := getIndexNodeForAccessExpression(accessNode)
				c.error(indexNode, diagnostics.Type_0_cannot_be_used_as_an_index_type, c.typeToString(indexType))
				if accessFlags&AccessFlagsIncludeUndefined != 0 {
					return c.getUnionType([]*Type{indexInfo.valueType, c.missingType})
				} else {
					return indexInfo.valueType
				}
			}
			c.errorIfWritingToReadonlyIndex(indexInfo, objectType, accessExpression)
			// When accessing an enum object with its own type,
			// e.g. E[E.A] for enum E { A }, undefined shouldn't
			// be included in the result type
			if accessFlags&AccessFlagsIncludeUndefined != 0 &&
				!(objectType.symbol != nil &&
					objectType.symbol.Flags&(ast.SymbolFlagsRegularEnum|ast.SymbolFlagsConstEnum) != 0 &&
					(indexType.symbol != nil &&
						indexType.flags&TypeFlagsEnumLiteral != 0 &&
						c.getParentOfSymbol(indexType.symbol) == objectType.symbol)) {
				return c.getUnionType([]*Type{indexInfo.valueType, c.missingType})
			}
			return indexInfo.valueType
		}
		if indexType.flags&TypeFlagsNever != 0 {
			return c.neverType
		}
		if accessExpression != nil && !isConstEnumObjectType(objectType) {
			if isObjectLiteralType(objectType) {
				if c.noImplicitAny && indexType.flags&(TypeFlagsStringLiteral|TypeFlagsNumberLiteral) != 0 {
					c.diagnostics.add(createDiagnosticForNode(accessExpression, diagnostics.Property_0_does_not_exist_on_type_1, indexType.AsLiteralType().value, c.typeToString(objectType)))
					return c.undefinedType
				} else if indexType.flags&(TypeFlagsNumber|TypeFlagsString) != 0 {
					types := core.Map(objectType.AsStructuredType().properties, func(prop *ast.Symbol) *Type {
						return c.getTypeOfSymbol(prop)
					})
					return c.getUnionType(append(types, c.undefinedType))
				}
			}
			if objectType.symbol == c.globalThisSymbol && hasPropName && c.globalThisSymbol.Exports[propName] != nil && c.globalThisSymbol.Exports[propName].Flags&ast.SymbolFlagsBlockScoped != 0 {
				c.error(accessExpression, diagnostics.Property_0_does_not_exist_on_type_1, propName, c.typeToString(objectType))
			} else if c.noImplicitAny && accessFlags&AccessFlagsSuppressNoImplicitAnyError == 0 {
				if hasPropName && c.typeHasStaticProperty(propName, objectType) {
					typeName := c.typeToString(objectType)
					c.error(accessExpression, diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_to_access_the_static_member_2_instead, propName /* as string */, typeName, typeName+"["+getTextOfNode(accessExpression.AsElementAccessExpression().ArgumentExpression)+"]")
				} else if c.getIndexTypeOfType(objectType, c.numberType) != nil {
					c.error(accessExpression.AsElementAccessExpression().ArgumentExpression, diagnostics.Element_implicitly_has_an_any_type_because_index_expression_is_not_of_type_number)
				} else {
					var suggestion string
					if hasPropName {
						suggestion = c.getSuggestionForNonexistentProperty(propName, objectType)
					}
					if suggestion != "" {
						c.error(accessExpression.AsElementAccessExpression().ArgumentExpression, diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2, propName /* as string */, c.typeToString(objectType), suggestion)
					} else {
						suggestion = c.getSuggestionForNonexistentIndexSignature(objectType, accessExpression, indexType)
						if suggestion != "" {
							c.error(accessExpression, diagnostics.Element_implicitly_has_an_any_type_because_type_0_has_no_index_signature_Did_you_mean_to_call_1, c.typeToString(objectType), suggestion)
						} else {
							var errorInfo *ast.MessageChain
							switch {
							case indexType.flags&TypeFlagsEnumLiteral != 0:
								errorInfo = ast.NewMessageChain(nil, diagnostics.Property_0_does_not_exist_on_type_1, "["+c.typeToString(indexType)+"]", c.typeToString(objectType))
							case indexType.flags&TypeFlagsUniqueESSymbol != 0:
								symbolName := c.getFullyQualifiedName(indexType.symbol, accessExpression)
								errorInfo = ast.NewMessageChain(nil, diagnostics.Property_0_does_not_exist_on_type_1, "["+symbolName+"]", c.typeToString(objectType))
							case indexType.flags&TypeFlagsStringLiteral != 0:
								errorInfo = ast.NewMessageChain(nil, diagnostics.Property_0_does_not_exist_on_type_1, indexType.AsLiteralType().value, c.typeToString(objectType))
							case indexType.flags&TypeFlagsNumberLiteral != 0:
								errorInfo = ast.NewMessageChain(nil, diagnostics.Property_0_does_not_exist_on_type_1, indexType.AsLiteralType().value, c.typeToString(objectType))
							case indexType.flags&(TypeFlagsNumber|TypeFlagsString) != 0:
								errorInfo = ast.NewMessageChain(nil, diagnostics.No_index_signature_with_a_parameter_of_type_0_was_found_on_type_1, c.typeToString(indexType), c.typeToString(objectType))
							}
							diagnostic := c.error(accessExpression, diagnostics.Element_implicitly_has_an_any_type_because_expression_of_type_0_can_t_be_used_to_index_type_1, c.typeToString(fullIndexType), c.typeToString(objectType))
							if errorInfo != nil {
								diagnostic.AddMessageChain(errorInfo)
							}
						}
					}
				}
			}
			return nil
		}
	}
	if accessFlags&AccessFlagsAllowMissing != 0 && isObjectLiteralType(objectType) {
		return c.undefinedType
	}
	if accessNode != nil {
		indexNode := getIndexNodeForAccessExpression(accessNode)
		if indexNode.Kind != ast.KindBigIntLiteral && indexType.flags&(TypeFlagsStringLiteral|TypeFlagsNumberLiteral) != 0 {
			c.error(indexNode, diagnostics.Property_0_does_not_exist_on_type_1, indexType.AsLiteralType().value, c.typeToString(objectType))
		} else if indexType.flags&(TypeFlagsString|TypeFlagsNumber) != 0 {
			c.error(indexNode, diagnostics.Type_0_has_no_matching_index_signature_for_type_1, c.typeToString(objectType), c.typeToString(indexType))
		} else {
			var typeString string
			if indexNode.Kind == ast.KindBigIntLiteral {
				typeString = "bigint"
			} else {
				typeString = c.typeToString(indexType)
			}
			c.error(indexNode, diagnostics.Type_0_cannot_be_used_as_an_index_type, typeString)
		}
	}
	if isTypeAny(indexType) {
		return indexType
	}
	return nil
}

func (c *Checker) typeHasStaticProperty(propName string, containingType *Type) bool {
	if containingType.symbol != nil {
		prop := c.getPropertyOfType(c.getTypeOfSymbol(containingType.symbol), propName)
		return prop != nil && prop.ValueDeclaration != nil && isStatic(prop.ValueDeclaration)
	}
	return false
}

func (c *Checker) getSuggestionForNonexistentProperty(name string, containingType *Type) string {
	return "" // !!!
}

func (c *Checker) getSuggestionForNonexistentIndexSignature(objectType *Type, expr *ast.Node, keyedType *Type) string {
	return "" // !!!
}

func getIndexNodeForAccessExpression(accessNode *ast.Node) *ast.Node {
	switch accessNode.Kind {
	case ast.KindElementAccessExpression:
		return accessNode.AsElementAccessExpression().ArgumentExpression
	case ast.KindIndexedAccessType:
		return accessNode.AsIndexedAccessTypeNode().IndexType
	case ast.KindComputedPropertyName:
		return accessNode.AsComputedPropertyName().Expression
	}
	return accessNode
}

func (c *Checker) errorIfWritingToReadonlyIndex(indexInfo *IndexInfo, objectType *Type, accessExpression *ast.Node) {
	if indexInfo != nil && indexInfo.isReadonly && accessExpression != nil && (isAssignmentTarget(accessExpression) || isDeleteTarget(accessExpression)) {
		c.error(accessExpression, diagnostics.Index_signature_in_type_0_only_permits_reading, c.typeToString(objectType))
	}
}

func (c *Checker) isSelfTypeAccess(name *ast.Node, parent *ast.Symbol) bool {
	return name.Kind == ast.KindThisKeyword || parent != nil && isEntityNameExpression(name) && parent == c.getResolvedSymbol(getFirstIdentifier(name))
}

func (c *Checker) isAssignmentToReadonlyEntity(expr *ast.Node, symbol *ast.Symbol, assignmentKind AssignmentKind) bool {
	return false // !!!
}

func (c *Checker) isThisPropertyAccessInConstructor(node *ast.Node, prop *ast.Symbol) bool {
	return isThisProperty(node) && c.isAutoTypedProperty(prop) && getThisContainer(node, true /*includeArrowFunctions*/, false /*includeClassComputedPropertyName*/) == c.getDeclaringConstructor(prop)
}

func (c *Checker) isAutoTypedProperty(symbol *ast.Symbol) bool {
	// A property is auto-typed when its declaration has no type annotation or initializer and we're in
	// noImplicitAny mode or a .js file.
	declaration := symbol.ValueDeclaration
	return declaration != nil && ast.IsPropertyDeclaration(declaration) && declaration.Type() == nil && declaration.AsPropertyDeclaration().Initializer == nil && c.noImplicitAny
}

func (c *Checker) getDeclaringConstructor(symbol *ast.Symbol) *ast.Node {
	for _, declaration := range symbol.Declarations {
		container := getThisContainer(declaration, false /*includeArrowFunctions*/, false /*includeClassComputedPropertyName*/)
		if container != nil && ast.IsConstructorDeclaration(container) {
			return container
		}
	}
	return nil
}

func (c *Checker) getPropertyNameFromIndex(indexType *Type, accessNode *ast.Node) string {
	if isTypeUsableAsPropertyName(indexType) {
		return getPropertyNameFromType(indexType)
	}
	if accessNode != nil && ast.IsPropertyName(accessNode) {
		return getPropertyNameForPropertyNameNode(accessNode)
	}
	return InternalSymbolNameMissing
}

func (c *Checker) isStringIndexSignatureOnlyTypeWorker(t *Type) bool {
	return t.flags&TypeFlagsObject != 0 && !c.isGenericMappedType(t) && len(c.getPropertiesOfType(t)) == 0 && len(c.getIndexInfosOfType(t)) == 1 && c.getIndexInfoOfType(t, c.stringType) != nil ||
		t.flags&TypeFlagsUnionOrIntersection != 0 && core.Every(t.Types(), c.isStringIndexSignatureOnlyType)
}

func (c *Checker) shouldDeferIndexedAccessType(objectType *Type, indexType *Type, accessNode *ast.Node) bool {
	if c.isGenericIndexType(indexType) {
		return true
	}
	if accessNode != nil && ast.IsIndexedAccessTypeNode(accessNode) {
		return c.isGenericTupleType(objectType) && !indexTypeLessThan(indexType, getTotalFixedElementCount(objectType.TargetTupleType()))
	}
	return c.isGenericObjectType(objectType) && !(isTupleType(objectType) && indexTypeLessThan(indexType, getTotalFixedElementCount(objectType.TargetTupleType()))) ||
		c.isGenericReducibleType(objectType)
}

func indexTypeLessThan(indexType *Type, limit int) bool {
	return everyType(indexType, func(t *Type) bool {
		if t.flags&TypeFlagsStringOrNumberLiteral != 0 {
			propName := getPropertyNameFromType(t)
			if isNumericLiteralName(propName) {
				index := stringutil.ToNumber(propName)
				return index >= 0 && index < float64(limit)
			}
		}
		return false
	})
}

func (c *Checker) getNoInferType(t *Type) *Type {
	return c.anyType // !!!
}

func (c *Checker) getBaseConstraintOrType(t *Type) *Type {
	constraint := c.getBaseConstraintOfType(t)
	if constraint != nil {
		return constraint
	}
	return t
}

func (c *Checker) getBaseConstraintOfType(t *Type) *Type {
	if t.flags&(TypeFlagsInstantiableNonPrimitive|TypeFlagsUnionOrIntersection|TypeFlagsTemplateLiteral|TypeFlagsStringMapping) != 0 || c.isGenericTupleType(t) {
		constraint := c.getResolvedBaseConstraint(t, nil)
		if constraint != c.noConstraintType && constraint != c.circularConstraintType {
			return constraint
		}
		return nil
	}
	if t.flags&TypeFlagsIndex != 0 {
		return c.stringNumberSymbolType
	}
	return nil
}

func (c *Checker) getResolvedBaseConstraint(t *Type, stack []RecursionId) *Type {
	constrained := t.AsConstrainedType()
	if constrained == nil {
		return t
	}
	if constrained.resolvedBaseConstraint != nil {
		return constrained.resolvedBaseConstraint
	}
	if !c.pushTypeResolution(t, TypeSystemPropertyNameResolvedBaseConstraint) {
		return c.circularConstraintType
	}
	var constraint *Type
	// We always explore at least 10 levels of nested constraints. Thereafter, we continue to explore
	// up to 50 levels of nested constraints provided there are no "deeply nested" types on the stack
	// (i.e. no types for which five instantiations have been recorded on the stack). If we reach 50
	// levels of nesting, we are presumably exploring a repeating pattern with a long cycle that hasn't
	// yet triggered the deeply nested limiter. We have no test cases that actually get to 50 levels of
	// nesting, so it is effectively just a safety stop.
	identity := getRecursionIdentity(t)
	if len(stack) < 10 || len(stack) < 50 && !slices.Contains(stack, identity) {
		constraint = c.computeBaseConstraint(c.getSimplifiedType(t /*writing*/, false), append(stack, identity))
	}
	if !c.popTypeResolution() {
		if t.flags&TypeFlagsTypeParameter != 0 {
			errorNode := c.getConstraintDeclaration(t)
			if errorNode != nil {
				diagnostic := c.error(errorNode, diagnostics.Type_parameter_0_has_a_circular_constraint, c.typeToString(t))
				if c.currentNode != nil && !isNodeDescendantOf(errorNode, c.currentNode) && !isNodeDescendantOf(c.currentNode, errorNode) {
					diagnostic.AddRelatedInfo(NewDiagnosticForNode(c.currentNode, diagnostics.Circularity_originates_in_type_at_this_location))
				}
			}
		}
		constraint = c.circularConstraintType
	}
	if constraint == nil {
		constraint = c.noConstraintType
	}
	if constrained.resolvedBaseConstraint == nil {
		constrained.resolvedBaseConstraint = constraint
	}
	return constraint
}

func (c *Checker) computeBaseConstraint(t *Type, stack []RecursionId) *Type {
	switch {
	case t.flags&TypeFlagsTypeParameter != 0:
		constraint := c.getConstraintFromTypeParameter(t)
		if t.AsTypeParameter().isThisType || constraint == nil {
			return constraint
		}
		return c.getNextBaseConstraint(constraint, stack)
	case t.flags&TypeFlagsUnionOrIntersection != 0:
		types := t.Types()
		constraints := make([]*Type, 0, len(types))
		different := false
		for _, s := range types {
			constraint := c.getNextBaseConstraint(s, stack)
			if constraint != nil {
				if constraint != s {
					different = true
				}
				constraints = append(constraints, constraint)
			} else {
				different = true
			}
		}
		if !different {
			return t
		}
		switch {
		case t.flags&TypeFlagsUnion != 0 && len(constraints) == len(types):
			return c.getUnionType(constraints)
		case t.flags&TypeFlagsIntersection != 0 && len(constraints) != 0:
			return c.getIntersectionType(constraints)
		}
		return nil
	case t.flags&TypeFlagsIndex != 0:
		return c.stringNumberSymbolType
	case t.flags&TypeFlagsTemplateLiteral != 0:
		types := t.Types()
		constraints := make([]*Type, 0, len(types))
		for _, s := range types {
			constraint := c.getNextBaseConstraint(s, stack)
			if constraint != nil {
				constraints = append(constraints, constraint)
			}
		}
		if len(constraints) == len(types) {
			return c.getTemplateLiteralType(t.AsTemplateLiteralType().texts, constraints)
		}
		return c.stringType
	case t.flags&TypeFlagsStringMapping != 0:
		constraint := c.getNextBaseConstraint(t.Target(), stack)
		if constraint != nil && constraint != t.Target() {
			return c.getStringMappingType(t.symbol, constraint)
		}
		return c.stringType
	case t.flags&TypeFlagsIndexedAccess != 0:
		if c.isMappedTypeGenericIndexedAccess(t) {
			// For indexed access types of the form { [P in K]: E }[X], where K is non-generic and X is generic,
			// we substitute an instantiation of E where P is replaced with X.
			return c.getNextBaseConstraint(c.substituteIndexedMappedType(t.AsIndexedAccessType().objectType, t.AsIndexedAccessType().indexType), stack)
		}
		baseObjectType := c.getNextBaseConstraint(t.AsIndexedAccessType().objectType, stack)
		baseIndexType := c.getNextBaseConstraint(t.AsIndexedAccessType().indexType, stack)
		if baseObjectType == nil || baseIndexType == nil {
			return nil
		}
		c.getNextBaseConstraint(c.getIndexedAccessTypeOrUndefined(baseObjectType, baseIndexType, t.AsIndexedAccessType().accessFlags, nil, nil), stack)
	case t.flags&TypeFlagsConditional != 0:
		constraint := c.getConstraintFromConditionalType(t)
		if constraint == nil {
			return nil
		}
		return c.getNextBaseConstraint(constraint, stack)
	case t.flags&TypeFlagsSubstitution != 0:
		return c.getNextBaseConstraint(c.getSubstitutionIntersection(t), stack)
	case c.isGenericTupleType(t):
		// We substitute constraints for variadic elements only when the constraints are array types or
		// non-variadic tuple types as we want to avoid further (possibly unbounded) recursion.
		elementTypes := c.getElementTypes(t)
		elementInfos := t.TargetTupleType().elementInfos
		newElements := make([]*Type, 0, len(elementTypes))
		for i, v := range elementTypes {
			newElement := v
			if v.flags&TypeFlagsTypeParameter != 0 && elementInfos[i].flags&ElementFlagsVariadic != 0 {
				constraint := c.getNextBaseConstraint(v, stack)
				if constraint != v && everyType(constraint, func(n *Type) bool { return c.isArrayOrTupleType(n) && !c.isGenericTupleType(n) }) {
					newElement = constraint
				}
			}
			newElements = append(newElements, newElement)
		}
		return c.createTupleTypeEx(newElements, elementInfos, t.TargetTupleType().readonly)
	}
	return t
}

func (c *Checker) getNextBaseConstraint(t *Type, stack []RecursionId) *Type {
	constraint := c.getResolvedBaseConstraint(t, stack)
	if constraint == c.noConstraintType || constraint == c.circularConstraintType {
		return nil
	}
	return constraint
}

// Return true if type might be of the given kind. A union or intersection type might be of a given
// kind if at least one constituent type is of the given kind.
func (c *Checker) maybeTypeOfKind(t *Type, kind TypeFlags) bool {
	if t.flags&kind != 0 {
		return true
	}
	if t.flags&TypeFlagsUnionOrIntersection != 0 {
		for _, t := range t.Types() {
			if c.maybeTypeOfKind(t, kind) {
				return true
			}
		}
	}
	return false
}

func (c *Checker) maybeTypeOfKindConsideringBaseConstraint(t *Type, kind TypeFlags) bool {
	if c.maybeTypeOfKind(t, kind) {
		return true
	}
	baseConstraint := c.getBaseConstraintOrType(t)
	return baseConstraint != nil && c.maybeTypeOfKind(baseConstraint, kind)
}

func (c *Checker) allTypesAssignableToKind(source *Type, kind TypeFlags) bool {
	return c.allTypesAssignableToKindEx(source, kind, false)
}

func (c *Checker) allTypesAssignableToKindEx(source *Type, kind TypeFlags, strict bool) bool {
	if source.flags&TypeFlagsUnion != 0 {
		return core.Every(source.Types(), func(subType *Type) bool {
			return c.allTypesAssignableToKindEx(subType, kind, strict)
		})
	}
	return c.isTypeAssignableToKindEx(source, kind, strict)
}

func (c *Checker) isTypeAssignableToKind(source *Type, kind TypeFlags) bool {
	return c.isTypeAssignableToKindEx(source, kind, false)
}

func (c *Checker) isTypeAssignableToKindEx(source *Type, kind TypeFlags, strict bool) bool {
	if source.flags&kind != 0 {
		return true
	}
	if strict && source.flags&(TypeFlagsAnyOrUnknown|TypeFlagsVoid|TypeFlagsUndefined|TypeFlagsNull) != 0 {
		return false
	}
	return kind&TypeFlagsNumberLike != 0 && c.isTypeAssignableTo(source, c.numberType) ||
		kind&TypeFlagsBigIntLike != 0 && c.isTypeAssignableTo(source, c.bigintType) ||
		kind&TypeFlagsStringLike != 0 && c.isTypeAssignableTo(source, c.stringType) ||
		kind&TypeFlagsBooleanLike != 0 && c.isTypeAssignableTo(source, c.booleanType) ||
		kind&TypeFlagsVoid != 0 && c.isTypeAssignableTo(source, c.voidType) ||
		kind&TypeFlagsNever != 0 && c.isTypeAssignableTo(source, c.neverType) ||
		kind&TypeFlagsNull != 0 && c.isTypeAssignableTo(source, c.nullType) ||
		kind&TypeFlagsUndefined != 0 && c.isTypeAssignableTo(source, c.undefinedType) ||
		kind&TypeFlagsESSymbol != 0 && c.isTypeAssignableTo(source, c.esSymbolType) ||
		kind&TypeFlagsNonPrimitive != 0 && c.isTypeAssignableTo(source, c.nonPrimitiveType)
}

func isConstEnumObjectType(t *Type) bool {
	return t.objectFlags&ObjectFlagsAnonymous != 0 && t.symbol != nil && isConstEnumSymbol(t.symbol)
}

func isConstEnumSymbol(symbol *ast.Symbol) bool {
	return symbol.Flags&ast.SymbolFlagsConstEnum != 0
}

func (c *Checker) compareProperties(sourceProp *ast.Symbol, targetProp *ast.Symbol, compareTypes func(source *Type, target *Type) Ternary) Ternary {
	// Two members are considered identical when
	// - they are public properties with identical names, optionality, and types,
	// - they are private or protected properties originating in the same declaration and having identical types
	if sourceProp == targetProp {
		return TernaryTrue
	}
	sourcePropAccessibility := getDeclarationModifierFlagsFromSymbol(sourceProp) & ast.ModifierFlagsNonPublicAccessibilityModifier
	targetPropAccessibility := getDeclarationModifierFlagsFromSymbol(targetProp) & ast.ModifierFlagsNonPublicAccessibilityModifier
	if sourcePropAccessibility != targetPropAccessibility {
		return TernaryFalse
	}
	if sourcePropAccessibility != ast.ModifierFlagsNone {
		if c.getTargetSymbol(sourceProp) != c.getTargetSymbol(targetProp) {
			return TernaryFalse
		}
	} else {
		if (sourceProp.Flags & ast.SymbolFlagsOptional) != (targetProp.Flags & ast.SymbolFlagsOptional) {
			return TernaryFalse
		}
	}
	if c.isReadonlySymbol(sourceProp) != c.isReadonlySymbol(targetProp) {
		return TernaryFalse
	}
	return compareTypes(c.getTypeOfSymbol(sourceProp), c.getTypeOfSymbol(targetProp))
}

func compareTypesEqual(s *Type, t *Type) Ternary {
	if s == t {
		return TernaryTrue
	}
	return TernaryFalse
}

func (c *Checker) getTypeOfPropertyOfContextualType(t *Type, name string) *Type {
	return nil // !!!
}

func (c *Checker) markPropertyAsReferenced(prop *ast.Symbol, nodeForCheckWriteOnly *ast.Node, isSelfTypeAccess bool) {
	// !!!
}

func hasRestParameter(signature *ast.Node) bool {
	last := core.LastOrNil(signature.Parameters())
	return last != nil && isRestParameter(last)
}

func isRestParameter(param *ast.Node) bool {
	return param.AsParameterDeclaration().DotDotDotToken != nil
}

func getNameFromIndexInfo(info *IndexInfo) string {
	if info.declaration != nil {
		return declarationNameToString(info.declaration.Parameters()[0].Name())
	}
	return "x"
}

func (c *Checker) isUnknownLikeUnionType(t *Type) bool {
	if c.strictNullChecks && t.flags&TypeFlagsUnion != 0 {
		if t.objectFlags&ObjectFlagsIsUnknownLikeUnionComputed == 0 {
			t.objectFlags |= ObjectFlagsIsUnknownLikeUnionComputed
			types := t.Types()
			if len(types) >= 3 && types[0].flags&TypeFlagsUndefined != 0 && types[1].flags&TypeFlagsNull != 0 && core.Some(types, c.isEmptyAnonymousObjectType) {
				t.objectFlags |= ObjectFlagsIsUnknownLikeUnion
			}
		}
		return t.objectFlags&ObjectFlagsIsUnknownLikeUnion != 0
	}
	return false
}

func (c *Checker) typeHasCallOrConstructSignatures(t *Type) bool {
	return t.flags&TypeFlagsStructuredType != 0 && len(c.resolveStructuredTypeMembers(t).signatures) != 0
}

func (c *Checker) getNormalizedType(t *Type, writing bool) *Type {
	for {
		var n *Type
		switch {
		case isFreshLiteralType(t):
			n = t.AsLiteralType().regularType
		case c.isGenericTupleType(t):
			n = c.getNormalizedTupleType(t, writing)
		case t.objectFlags&ObjectFlagsReference != 0:
			if t.AsTypeReference().node != nil {
				n = c.createTypeReference(t.Target(), c.getTypeArguments(t))
			} else {
				n = c.getSingleBaseForNonAugmentingSubtype(t)
				if n == nil {
					n = t
				}
			}
		case t.flags&TypeFlagsUnionOrIntersection != 0:
			n = c.getNormalizedUnionOrIntersectionType(t, writing)
		case t.flags&TypeFlagsSubstitution != 0:
			if writing {
				n = t.AsSubstitutionType().baseType
			} else {
				n = c.getSubstitutionIntersection(t)
			}
		case t.flags&TypeFlagsSimplifiable != 0:
			n = c.getSimplifiedType(t, writing)
		default:
			return t
		}
		if n == t {
			return n
		}
		t = n
	}
}

func (c *Checker) getSimplifiedType(t *Type, writing bool) *Type {
	return t // !!!
}

func (c *Checker) getSimplifiedTypeOrConstraint(t *Type) *Type {
	if simplified := c.getSimplifiedType(t, false /*writing*/); simplified != t {
		return simplified
	}
	return c.getConstraintOfType(t)
}

func (c *Checker) getNormalizedUnionOrIntersectionType(t *Type, writing bool) *Type {
	if reduced := c.getReducedType(t); reduced != t {
		return reduced
	}
	if t.flags&TypeFlagsIntersection != 0 && c.shouldNormalizeIntersection(t) {
		// Normalization handles cases like
		// Partial<T>[K] & ({} | null) ==>
		// Partial<T>[K] & {} | Partial<T>[K} & null ==>
		// (T[K] | undefined) & {} | (T[K] | undefined) & null ==>
		// T[K] & {} | undefined & {} | T[K] & null | undefined & null ==>
		// T[K] & {} | T[K] & null
		types := t.Types()
		normalizedTypes := core.SameMap(types, func(u *Type) *Type { return c.getNormalizedType(u, writing) })
		if !core.Same(normalizedTypes, types) {
			return c.getIntersectionType(normalizedTypes)
		}
	}
	return t
}

func (c *Checker) shouldNormalizeIntersection(t *Type) bool {
	hasInstantiable := false
	hasNullableOrEmpty := false
	for _, t := range t.Types() {
		hasInstantiable = hasInstantiable || t.flags&TypeFlagsInstantiable != 0
		hasNullableOrEmpty = hasNullableOrEmpty || t.flags&TypeFlagsNullable != 0 || c.isEmptyAnonymousObjectType(t)
		if hasInstantiable && hasNullableOrEmpty {
			return true
		}
	}
	return false
}

func (c *Checker) getNormalizedTupleType(t *Type, writing bool) *Type {
	elements := c.getElementTypes(t)
	normalizedElements := core.SameMap(elements, func(t *Type) *Type {
		if t.flags&TypeFlagsSimplifiable != 0 {
			return c.getSimplifiedType(t, writing)
		}
		return t
	})
	if !core.Same(elements, normalizedElements) {
		return c.createNormalizedTupleType(t.Target(), normalizedElements)
	}
	return t
}

func (c *Checker) getSingleBaseForNonAugmentingSubtype(t *Type) *Type {
	if t.objectFlags&ObjectFlagsReference == 0 || t.Target().objectFlags&ObjectFlagsClassOrInterface == 0 {
		return nil
	}
	key := CachedTypeKey{kind: CachedTypeKindEquivalentBaseType, typeId: t.id}
	if t.objectFlags&ObjectFlagsIdenticalBaseTypeCalculated != 0 {
		return c.cachedTypes[key]
	}
	t.objectFlags |= ObjectFlagsIdenticalBaseTypeCalculated
	target := t.Target()
	if target.objectFlags&ObjectFlagsClass != 0 {
		baseTypeNode := getBaseTypeNodeOfClass(target)
		// A base type expression may circularly reference the class itself (e.g. as an argument to function call), so we only
		// check for base types specified as simple qualified names.
		if baseTypeNode != nil && !ast.IsIdentifier(baseTypeNode.Expression()) && !ast.IsPropertyAccessExpression(baseTypeNode.Expression()) {
			return nil
		}
	}
	bases := c.getBaseTypes(target)
	if len(bases) != 1 {
		return nil
	}
	if len(c.getMembersOfSymbol(t.symbol)) != 0 {
		// If the interface has any members, they may subtype members in the base, so we should do a full structural comparison
		return nil
	}
	var instantiatedBase *Type
	typeParameters := target.AsInterfaceType().TypeParameters()
	if len(typeParameters) == 0 {
		instantiatedBase = bases[0]
	} else {
		instantiatedBase = c.instantiateType(bases[0], newTypeMapper(typeParameters, c.getTypeArguments(t)[:len(typeParameters)]))
	}
	if len(c.getTypeArguments(t)) > len(typeParameters) {
		instantiatedBase = c.getTypeWithThisArgument(instantiatedBase, core.LastOrNil(c.getTypeArguments(t)), false)
	}
	c.cachedTypes[key] = instantiatedBase
	return instantiatedBase
}

func (c *Checker) getModifiersTypeFromMappedType(t *Type) *Type {
	return c.unknownType // !!!
}

func (c *Checker) extractTypesOfKind(t *Type, kind TypeFlags) *Type {
	return c.filterType(t, func(t *Type) bool { return t.flags&kind != 0 })
}

func (c *Checker) getRegularTypeOfObjectLiteral(t *Type) *Type {
	return t // !!!
}

func (c *Checker) getTrueTypeFromConditionalType(t *Type) *Type {
	data := t.AsConditionalType()
	if data.resolvedTrueType == nil {
		data.resolvedTrueType = c.instantiateType(c.getTypeFromTypeNode(data.root.node.AsConditionalTypeNode().TrueType), data.mapper)
	}
	return data.resolvedTrueType
}

func (c *Checker) getFalseTypeFromConditionalType(t *Type) *Type {
	data := t.AsConditionalType()
	if data.resolvedFalseType == nil {
		data.resolvedFalseType = c.instantiateType(c.getTypeFromTypeNode(data.root.node.AsConditionalTypeNode().FalseType), data.mapper)
	}
	return data.resolvedFalseType
}

func (c *Checker) markLinkedReferences(location *ast.Node, hint ReferenceHint, propSymbol *ast.Symbol, parentType *Type) {
	// !!!
}

func (c *Checker) getPromisedTypeOfPromise(t *Type) *Type {
	return c.getPromisedTypeOfPromiseEx(t, nil, nil)
}

func (c *Checker) getPromisedTypeOfPromiseEx(t *Type, errorNode *ast.Node, thisTypeForErrorOut **Type) *Type {
	return nil // !!!
}

func getMappedTypeModifiers(t *Type) MappedTypeModifiers {
	declaration := t.AsMappedType().declaration
	return core.IfElse(declaration.ReadonlyToken != nil, core.IfElse(declaration.ReadonlyToken.Kind == ast.KindMinusToken, MappedTypeModifiersExcludeReadonly, MappedTypeModifiersIncludeReadonly), 0) |
		core.IfElse(declaration.QuestionToken != nil, core.IfElse(declaration.QuestionToken.Kind == ast.KindMinusToken, MappedTypeModifiersExcludeOptional, MappedTypeModifiersIncludeOptional), 0)
}

func isPartialMappedType(t *Type) bool {
	return t.objectFlags&ObjectFlagsMapped != 0 && getMappedTypeModifiers(t)&MappedTypeModifiersIncludeOptional != 0
}

func (c *Checker) getOptionalExpressionType(exprType *Type, expression *ast.Node) *Type {
	switch {
	case ast.IsExpressionOfOptionalChainRoot(expression):
		return c.getNonNullableType(exprType)
	case ast.IsOptionalChain(expression):
		return c.removeOptionalTypeMarker(exprType)
	default:
		return exprType
	}
}

func (c *Checker) removeOptionalTypeMarker(t *Type) *Type {
	if c.strictNullChecks {
		return c.removeType(t, c.optionalType)
	}
	return t
}

func (c *Checker) propagateOptionalTypeMarker(t *Type, node *ast.Node, wasOptional bool) *Type {
	if wasOptional {
		if ast.IsOutermostOptionalChain(node) {
			return c.getOptionalType(t, false)
		}
		return c.addOptionalTypeMarker(t)
	}
	return t
}

func (c *Checker) removeMissingType(t *Type, isOptional bool) *Type {
	if c.exactOptionalPropertyTypes && isOptional {
		return c.removeType(t, c.missingType)
	}
	return t
}

func (c *Checker) removeMissingOrUndefinedType(t *Type) *Type {
	if c.exactOptionalPropertyTypes {
		return c.removeType(t, c.missingType)
	}
	return c.getTypeWithFacts(t, TypeFactsNEUndefined)
}

func (c *Checker) removeDefinitelyFalsyTypes(t *Type) *Type {
	return c.filterType(t, func(t *Type) bool { return c.hasTypeFacts(t, TypeFactsTruthy) })
}

func (c *Checker) extractDefinitelyFalsyTypes(t *Type) *Type {
	return c.mapType(t, c.getDefinitelyFalsyPartOfType)
}

func (c *Checker) getDefinitelyFalsyPartOfType(t *Type) *Type {
	switch {
	case t.flags&TypeFlagsString != 0:
		return c.emptyStringType
	case t.flags&TypeFlagsNumber != 0:
		return c.zeroType
	case t.flags&TypeFlagsBigInt != 0:
		return c.zeroBigIntType
	case t == c.regularFalseType || t == c.falseType ||
		t.flags&(TypeFlagsVoid|TypeFlagsUndefined|TypeFlagsNull|TypeFlagsAnyOrUnknown) != 0 ||
		t.flags&TypeFlagsStringLiteral != 0 && t.AsLiteralType().value.(string) == "" ||
		t.flags&TypeFlagsNumberLiteral != 0 && t.AsLiteralType().value.(float64) == 0 ||
		t.flags&TypeFlagsBigIntLiteral != 0 && isZeroBigInt(t):
		return t
	}
	return c.neverType
}

func (c *Checker) getConstraintDeclaration(t *Type) *ast.Node {
	if t.symbol != nil {
		declaration := core.Find(t.symbol.Declarations, ast.IsTypeParameterDeclaration)
		if declaration != nil {
			return declaration.AsTypeParameter().Constraint
		}
	}
	return nil
}

func (c *Checker) getTemplateLiteralType(texts []string, types []*Type) *Type {
	unionIndex := core.FindIndex(types, func(t *Type) bool {
		return t.flags&(TypeFlagsNever|TypeFlagsUnion) != 0
	})
	if unionIndex >= 0 {
		if !c.checkCrossProductUnion(types) {
			return c.errorType
		}
		return c.mapType(types[unionIndex], func(t *Type) *Type {
			return c.getTemplateLiteralType(texts, core.ReplaceElement(types, unionIndex, t))
		})
	}
	if slices.Contains(types, c.wildcardType) {
		return c.wildcardType
	}
	var newTypes []*Type
	var newTexts []string
	var sb strings.Builder
	sb.WriteString(texts[0])
	var addSpans func([]string, []*Type) bool
	addSpans = func(texts []string, types []*Type) bool {
		for i, t := range types {
			switch {
			case t.flags&(TypeFlagsLiteral|TypeFlagsNull|TypeFlagsUndefined) != 0:
				sb.WriteString(c.getTemplateStringForType(t))
				sb.WriteString(texts[i+1])
			case t.flags&TypeFlagsTemplateLiteral != 0:
				sb.WriteString(t.AsTemplateLiteralType().texts[0])
				if !addSpans(t.AsTemplateLiteralType().texts, t.AsTemplateLiteralType().types) {
					return false
				}
				sb.WriteString(texts[i+1])
			case c.isGenericIndexType(t) || c.isPatternLiteralPlaceholderType(t):
				newTypes = append(newTypes, t)
				newTexts = append(newTexts, sb.String())
				sb.Reset()
				sb.WriteString(texts[i+1])
			default:
				return false
			}
		}
		return true
	}
	if !addSpans(texts, types) {
		return c.stringType
	}
	if len(newTypes) == 0 {
		return c.getStringLiteralType(sb.String())
	}
	newTexts = append(newTexts, sb.String())
	if core.Every(newTexts, func(t string) bool { return t == "" }) {
		if core.Every(newTypes, func(t *Type) bool { return t.flags&TypeFlagsString != 0 }) {
			return c.stringType
		}
		// Normalize `${Mapping<xxx>}` into Mapping<xxx>
		if len(newTypes) == 1 && c.isPatternLiteralType(newTypes[0]) {
			return newTypes[0]
		}
	}
	key := getTemplateTypeKey(newTexts, newTypes)
	t := c.templateLiteralTypes[key]
	if t == nil {
		t = c.newTemplateLiteralType(newTexts, newTypes)
		c.templateLiteralTypes[key] = t
	}
	return t
}

func (c *Checker) getTemplateStringForType(t *Type) string {
	switch {
	case t.flags&(TypeFlagsStringLiteral|TypeFlagsNumberLiteral|TypeFlagsBooleanLiteral|TypeFlagsBigIntLiteral) != 0:
		return anyToString(t.AsLiteralType().value)
	case t.flags&TypeFlagsNullable != 0:
		return t.AsIntrinsicType().intrinsicName
	}
	return ""
}

func (c *Checker) getStringMappingType(symbol *ast.Symbol, t *Type) *Type {
	switch {
	case t.flags&(TypeFlagsUnion|TypeFlagsNever) != 0:
		return c.mapType(t, func(t *Type) *Type { return c.getStringMappingType(symbol, t) })
	case t.flags&TypeFlagsStringLiteral != 0:
		return c.getStringLiteralType(applyStringMapping(symbol, getStringLiteralValue(t)))
	case t.flags&TypeFlagsTemplateLiteral != 0:
		return c.getTemplateLiteralType(c.applyTemplateStringMapping(symbol, t.AsTemplateLiteralType().texts, t.AsTemplateLiteralType().types))
	case t.flags&TypeFlagsStringMapping != 0 && symbol == t.symbol:
		return t
	case t.flags&(TypeFlagsAny|TypeFlagsString|TypeFlagsStringMapping) != 0 || c.isGenericIndexType(t):
		return c.getStringMappingTypeForGenericType(symbol, t)
	case c.isPatternLiteralPlaceholderType(t):
		return c.getStringMappingTypeForGenericType(symbol, c.getTemplateLiteralType([]string{"", ""}, []*Type{t}))
	default:
		return t
	}
}

func applyStringMapping(symbol *ast.Symbol, str string) string {
	switch intrinsicTypeKinds[symbol.Name] {
	case IntrinsicTypeKindUppercase:
		return strings.ToUpper(str)
	case IntrinsicTypeKindLowercase:
		return strings.ToLower(str)
	case IntrinsicTypeKindCapitalize:
		_, size := utf8.DecodeRuneInString(str)
		return strings.ToUpper(str[:size]) + str[size:]
	case IntrinsicTypeKindUncapitalize:
		_, size := utf8.DecodeRuneInString(str)
		return strings.ToLower(str[:size]) + str[size:]
	}
	return str
}

func (c *Checker) applyTemplateStringMapping(symbol *ast.Symbol, texts []string, types []*Type) ([]string, []*Type) {
	switch intrinsicTypeKinds[symbol.Name] {
	case IntrinsicTypeKindUppercase, IntrinsicTypeKindLowercase:
		return core.Map(texts, func(t string) string { return applyStringMapping(symbol, t) }),
			core.Map(types, func(t *Type) *Type { return c.getStringMappingType(symbol, t) })
	case IntrinsicTypeKindCapitalize, IntrinsicTypeKindUncapitalize:
		if texts[0] != "" {
			newTexts := slices.Clone(texts)
			newTexts[0] = applyStringMapping(symbol, newTexts[0])
			return newTexts, types
		}
		newTypes := slices.Clone(types)
		newTypes[0] = c.getStringMappingType(symbol, newTypes[0])
		return texts, newTypes
	}
	return texts, types
}

func (c *Checker) getStringMappingTypeForGenericType(symbol *ast.Symbol, t *Type) *Type {
	key := StringMappingKey{s: symbol, t: t}
	result := c.stringMappingTypes[key]
	if result == nil {
		result = c.newStringMappingType(symbol, t)
		c.stringMappingTypes[key] = result
	}
	return result
}

// Given an indexed access on a mapped type of the form { [P in K]: E }[X], return an instantiation of E where P is
// replaced with X. Since this simplification doesn't account for mapped type modifiers, add 'undefined' to the
// resulting type if the mapped type includes a '?' modifier or if the modifiers type indicates that some properties
// are optional. If the modifiers type is generic, conservatively estimate optionality by recursively looking for
// mapped types that include '?' modifiers.
func (c *Checker) substituteIndexedMappedType(objectType *Type, index *Type) *Type {
	return c.anyType // !!!
}

func (c *Checker) getTypeOfPropertyOrIndexSignatureOfType(t *Type, name string) *Type {
	propType := c.getTypeOfPropertyOfType(t, name)
	if propType != nil {
		return propType
	}
	indexInfo := c.getApplicableIndexInfoForName(t, name)
	if indexInfo != nil {
		return c.addOptionalityEx(indexInfo.valueType, true /*isProperty*/, true /*isOptional*/)
	}
	return nil
}

func (c *Checker) getContextualType(node *ast.Node, contextFlags ContextFlags) *Type {
	return nil // !!!
}

// Return the contextual type for a given expression node. During overload resolution, a contextual type may temporarily
// be "pushed" onto a node using the contextualType property.
func (c *Checker) getApparentTypeOfContextualType(node *ast.Node, contextFlags ContextFlags) *Type {
	return nil // !!!
}

// If the given contextual type contains instantiable types and if a mapper representing
// return type inferences is available, instantiate those types using that mapper.
func (c *Checker) instantiateContextualType(contextualType *Type, node *ast.Node, contextFlags ContextFlags) *Type {
	return contextualType // !!!
}

func (c *Checker) pushCachedContextualType(node *ast.Node) {
	c.pushContextualType(node, c.getContextualType(node, ContextFlagsNone), true /*isCache*/)
}

func (c *Checker) pushContextualType(node *ast.Node, t *Type, isCache bool) {
	// !!!
	// c.contextualTypeNodes[c.contextualTypeCount] = node
	// c.contextualTypes[c.contextualTypeCount] = t
	// c.contextualIsCache[c.contextualTypeCount] = isCache
	// c.contextualTypeCount++
}

func (c *Checker) popContextualType() {
	// !!!
	// c.contextualTypeCount--
}

func (c *Checker) pushInferenceContext(node *ast.Node, inferenceContext *InferenceContext) {
	// !!!
	// c.inferenceContextNodes[c.inferenceContextCount] = node
	// c.inferenceContexts[c.inferenceContextCount] = inferenceContext
	// c.inferenceContextCount++
}

func (c *Checker) popInferenceContext() {
	// !!!
	// c.inferenceContextCount--
}

func (c *Checker) getInferenceContext(node *ast.Node) *InferenceContext {
	// !!!
	// for i := c.inferenceContextCount - 1; i >= 0; i-- {
	// 	if isNodeDescendantOf(node, c.inferenceContextNodes[i]) {
	// 		return c.inferenceContexts[i]
	// 	}
	// }
	return nil
}

func (c *Checker) getTypeFacts(t *Type, mask TypeFacts) TypeFacts {
	return c.getTypeFactsWorker(t, mask) & mask
}

func (c *Checker) hasTypeFacts(t *Type, mask TypeFacts) bool {
	return c.getTypeFacts(t, mask) != 0
}

func (c *Checker) getTypeFactsWorker(t *Type, callerOnlyNeeds TypeFacts) TypeFacts {
	if t.flags&(TypeFlagsIntersection|TypeFlagsInstantiable) != 0 {
		t = c.getBaseConstraintOfType(t)
		if t == nil {
			t = c.unknownType
		}
	}
	flags := t.flags
	switch {
	case flags&(TypeFlagsString|TypeFlagsStringMapping) != 0:
		if c.strictNullChecks {
			return TypeFactsStringStrictFacts
		}
		return TypeFactsStringFacts
	case flags&(TypeFlagsStringLiteral|TypeFlagsTemplateLiteral) != 0:
		isEmpty := flags&TypeFlagsStringLiteral != 0 && t.AsLiteralType().value.(string) == ""
		if c.strictNullChecks {
			if isEmpty {
				return TypeFactsEmptyStringStrictFacts
			}
			return TypeFactsNonEmptyStringStrictFacts
		}
		if isEmpty {
			return TypeFactsEmptyStringFacts
		}
		return TypeFactsNonEmptyStringFacts
	case flags&(TypeFlagsNumber|TypeFlagsEnum) != 0:
		if c.strictNullChecks {
			return TypeFactsNumberStrictFacts
		}
		return TypeFactsNumberFacts
	case flags&TypeFlagsNumberLiteral != 0:
		isZero := t.AsLiteralType().value.(float64) == 0
		if c.strictNullChecks {
			if isZero {
				return TypeFactsZeroNumberStrictFacts
			}
			return TypeFactsNonZeroNumberStrictFacts
		}
		if isZero {
			return TypeFactsZeroNumberFacts
		}
		return TypeFactsNonZeroNumberFacts
	case flags&TypeFlagsBigInt != 0:
		if c.strictNullChecks {
			return TypeFactsBigIntStrictFacts
		}
		return TypeFactsBigIntFacts
	case flags&TypeFlagsBigIntLiteral != 0:
		isZero := isZeroBigInt(t)
		if c.strictNullChecks {
			if isZero {
				return TypeFactsZeroBigIntStrictFacts
			}
			return TypeFactsNonZeroBigIntStrictFacts
		}
		if isZero {
			return TypeFactsZeroBigIntFacts
		}
		return TypeFactsNonZeroBigIntFacts
	case flags&TypeFlagsBoolean != 0:
		if c.strictNullChecks {
			return TypeFactsBooleanStrictFacts
		}
		return TypeFactsBooleanFacts
	case flags&TypeFlagsBooleanLike != 0:
		isFalse := t == c.falseType || t == c.regularFalseType
		if c.strictNullChecks {
			if isFalse {
				return TypeFactsFalseStrictFacts
			}
			return TypeFactsTrueStrictFacts
		}
		if isFalse {
			return TypeFactsFalseFacts
		}
		return TypeFactsTrueFacts
	case flags&TypeFlagsObject != 0:
		var possibleFacts TypeFacts
		if c.strictNullChecks {
			possibleFacts = TypeFactsEmptyObjectStrictFacts | TypeFactsFunctionStrictFacts | TypeFactsObjectStrictFacts
		} else {
			possibleFacts = TypeFactsEmptyObjectFacts | TypeFactsFunctionFacts | TypeFactsObjectFacts
		}
		if (callerOnlyNeeds & possibleFacts) == 0 {
			// If the caller doesn't care about any of the facts that we could possibly produce,
			// return zero so we can skip resolving members.
			return TypeFactsNone
		}
		switch {
		case t.objectFlags&ObjectFlagsAnonymous != 0 && c.isEmptyObjectType(t):
			if c.strictNullChecks {
				return TypeFactsEmptyObjectStrictFacts
			}
			return TypeFactsEmptyObjectFacts
		case c.isFunctionObjectType(t):
			if c.strictNullChecks {
				return TypeFactsFunctionStrictFacts
			}
			return TypeFactsFunctionFacts
		case c.strictNullChecks:
			return TypeFactsObjectStrictFacts
		}
		return TypeFactsObjectFacts
	case flags&TypeFlagsVoid != 0:
		return TypeFactsVoidFacts
	case flags&TypeFlagsUndefined != 0:
		return TypeFactsUndefinedFacts
	case flags&TypeFlagsNull != 0:
		return TypeFactsNullFacts
	case flags&TypeFlagsESSymbolLike != 0:
		if c.strictNullChecks {
			return TypeFactsSymbolStrictFacts
		} else {
			return TypeFactsSymbolFacts
		}
	case flags&TypeFlagsNonPrimitive != 0:
		if c.strictNullChecks {
			return TypeFactsObjectStrictFacts
		} else {
			return TypeFactsObjectFacts
		}
	case flags&TypeFlagsNever != 0:
		return TypeFactsNone
	case flags&TypeFlagsUnion != 0:
		var facts TypeFacts
		for _, t := range t.Types() {
			facts |= c.getTypeFactsWorker(t, callerOnlyNeeds)
		}
		return facts
	case flags&TypeFlagsIntersection != 0:
		return c.getIntersectionTypeFacts(t, callerOnlyNeeds)
	}
	return TypeFactsUnknownFacts
}

func (c *Checker) getIntersectionTypeFacts(t *Type, callerOnlyNeeds TypeFacts) TypeFacts {
	// When an intersection contains a primitive type we ignore object type constituents as they are
	// presumably type tags. For example, in string & { __kind__: "name" } we ignore the object type.
	ignoreObjects := c.maybeTypeOfKind(t, TypeFlagsPrimitive)
	// When computing the type facts of an intersection type, certain type facts are computed as `and`
	// and others are computed as `or`.
	oredFacts := TypeFactsNone
	andedFacts := TypeFactsAll
	for _, t := range t.Types() {
		if !(ignoreObjects && t.flags&TypeFlagsObject != 0) {
			f := c.getTypeFactsWorker(t, callerOnlyNeeds)
			oredFacts |= f
			andedFacts &= f
		}
	}
	return oredFacts&TypeFactsOrFactsMask | andedFacts&TypeFactsAndFactsMask
}

func isZeroBigInt(t *Type) bool {
	return t.AsLiteralType().value.(PseudoBigInt).base10Value == "0"
}

func (c *Checker) isFunctionObjectType(t *Type) bool {
	if t.objectFlags&ObjectFlagsEvolvingArray != 0 {
		return false
	}
	// We do a quick check for a "bind" property before performing the more expensive subtype
	// check. This gives us a quicker out in the common case where an object type is not a function.
	resolved := c.resolveStructuredTypeMembers(t)
	return len(resolved.signatures) != 0 || resolved.members["bind"] != nil && c.isTypeSubtypeOf(t, c.globalFunctionType)
}

func (c *Checker) getTypeWithFacts(t *Type, include TypeFacts) *Type {
	return c.filterType(t, func(t *Type) bool {
		return c.hasTypeFacts(t, include)
	})
}

// This function is similar to getTypeWithFacts, except that in strictNullChecks mode it replaces type
// unknown with the union {} | null | undefined (and reduces that accordingly), and it intersects remaining
// instantiable types with {}, {} | null, or {} | undefined in order to remove null and/or undefined.
func (c *Checker) getAdjustedTypeWithFacts(t *Type, facts TypeFacts) *Type {
	reduced := c.recombineUnknownType(c.getTypeWithFacts(core.IfElse(c.strictNullChecks && t.flags&TypeFlagsUnknown != 0, c.unknownUnionType, t), facts))
	if c.strictNullChecks {
		switch facts {
		case TypeFactsNEUndefined:
			return c.removeNullableByIntersection(reduced, TypeFactsEQUndefined, TypeFactsEQNull, TypeFactsIsNull, c.nullType)
		case TypeFactsNENull:
			return c.removeNullableByIntersection(reduced, TypeFactsEQNull, TypeFactsEQUndefined, TypeFactsIsUndefined, c.undefinedType)
		case TypeFactsNEUndefinedOrNull, TypeFactsTruthy:
			return c.mapType(reduced, func(t *Type) *Type {
				if c.hasTypeFacts(t, TypeFactsEQUndefinedOrNull) {
					return c.getGlobalNonNullableTypeInstantiation(t)
				}
				return t
			})
		}
	}
	return reduced
}

func (c *Checker) removeNullableByIntersection(t *Type, targetFacts TypeFacts, otherFacts TypeFacts, otherIncludesFacts TypeFacts, otherType *Type) *Type {
	facts := c.getTypeFacts(t, TypeFactsEQUndefined|TypeFactsEQNull|TypeFactsIsUndefined|TypeFactsIsNull)
	// Simply return the type if it never compares equal to the target nullable.
	if facts&targetFacts == 0 {
		return t
	}
	// By default we intersect with a union of {} and the opposite nullable.
	emptyAndOtherUnion := c.getUnionType([]*Type{c.emptyObjectType, otherType})
	// For each constituent type that can compare equal to the target nullable, intersect with the above union
	// if the type doesn't already include the opppsite nullable and the constituent can compare equal to the
	// opposite nullable; otherwise, just intersect with {}.
	return c.mapType(t, func(t *Type) *Type {
		if c.hasTypeFacts(t, targetFacts) {
			if facts&otherIncludesFacts == 0 && c.hasTypeFacts(t, otherFacts) {
				return c.getIntersectionType([]*Type{t, emptyAndOtherUnion})
			}
			return c.getIntersectionType([]*Type{t, c.emptyObjectType})
		}
		return t
	})
}

func (c *Checker) recombineUnknownType(t *Type) *Type {
	if t == c.unknownUnionType {
		return c.unknownType
	}
	return t
}

func (c *Checker) getGlobalNonNullableTypeInstantiation(t *Type) *Type {
	alias := c.getGlobalNonNullableTypeAliasOrNil()
	if alias != nil {
		return c.getTypeAliasInstantiation(alias, []*Type{t}, nil)
	}
	return c.getIntersectionType([]*Type{t, c.emptyObjectType})
}

func (c *Checker) convertAutoToAny(t *Type) *Type {
	switch {
	case t == c.autoType:
		return c.anyType
	case t == c.autoArrayType:
		return c.anyArrayType
	}
	return t
}

/**
 * Gets the "awaited type" of a type.
 *
 * The "awaited type" of an expression is its "promised type" if the expression is a
 * Promise-like type; otherwise, it is the type of the expression. If the "promised
 * type" is itself a Promise-like, the "promised type" is recursively unwrapped until a
 * non-promise type is found.
 *
 * This is used to reflect the runtime behavior of the `await` keyword.
 */
func (c *Checker) getAwaitedType(t *Type) *Type {
	return c.getAwaitedTypeEx(t, nil, nil)
}

func (c *Checker) getAwaitedTypeEx(t *Type, errorNode *ast.Node, diagnosticMessage *diagnostics.Message, args ...any) *Type {
	awaitedType := c.getAwaitedTypeNoAliasEx(t, errorNode, diagnosticMessage, args...)
	if awaitedType != nil {
		return c.createAwaitedTypeIfNeeded(awaitedType)
	}
	return nil
}

/**
 * Gets the "awaited type" of a type without introducing an `Awaited<T>` wrapper.
 *
 * @see {@link getAwaitedType}
 */
func (c *Checker) getAwaitedTypeNoAlias(t *Type) *Type {
	return c.getAwaitedTypeNoAliasEx(t, nil, nil)
}

func (c *Checker) getAwaitedTypeNoAliasEx(t *Type, errorNode *ast.Node, diagnosticMessage *diagnostics.Message, args ...any) *Type {
	if isTypeAny(t) {
		return t
	}
	// If this is already an `Awaited<T>`, just return it. This avoids `Awaited<Awaited<T>>` in higher-order
	if c.isAwaitedTypeInstantiation(t) {
		return t
	}
	// If we've already cached an awaited type, return a possible `Awaited<T>` for it.
	key := CachedTypeKey{kind: CachedTypeKindAwaitedType, typeId: t.id}
	if awaitedType := c.cachedTypes[key]; awaitedType != nil {
		return awaitedType
	}
	// For a union, get a union of the awaited types of each constituent.
	if t.flags&TypeFlagsUnion != 0 {
		if slices.Contains(c.awaitedTypeStack, t) {
			if errorNode != nil {
				c.error(errorNode, diagnostics.Type_is_referenced_directly_or_indirectly_in_the_fulfillment_callback_of_its_own_then_method)
			}
			return nil
		}
		c.awaitedTypeStack = append(c.awaitedTypeStack, t)
		mapped := c.mapType(t, func(t *Type) *Type { return c.getAwaitedTypeNoAliasEx(t, errorNode, diagnosticMessage, args...) })
		c.awaitedTypeStack = c.awaitedTypeStack[:len(c.awaitedTypeStack)-1]
		c.cachedTypes[key] = mapped
		return mapped
	}
	// If `type` is generic and should be wrapped in `Awaited<T>`, return it.
	if c.isAwaitedTypeNeeded(t) {
		c.cachedTypes[key] = t
		return t
	}
	var thisTypeForError *Type
	promisedType := c.getPromisedTypeOfPromiseEx(t, nil /*errorNode*/, &thisTypeForError)
	if promisedType != nil {
		if t == promisedType || slices.Contains(c.awaitedTypeStack, promisedType) {
			// Verify that we don't have a bad actor in the form of a promise whose
			// promised type is the same as the promise type, or a mutually recursive
			// promise. If so, we return undefined as we cannot guess the shape. If this
			// were the actual case in the JavaScript, this Promise would never resolve.
			//
			// An example of a bad actor with a singly-recursive promise type might
			// be:
			//
			//  interface BadPromise {
			//      then(
			//          onfulfilled: (value: BadPromise) => any,
			//          onrejected: (error: any) => any): BadPromise;
			//  }
			//
			// The above interface will pass the PromiseLike check, and return a
			// promised type of `BadPromise`. Since this is a self reference, we
			// don't want to keep recursing ad infinitum.
			//
			// An example of a bad actor in the form of a mutually-recursive
			// promise type might be:
			//
			//  interface BadPromiseA {
			//      then(
			//          onfulfilled: (value: BadPromiseB) => any,
			//          onrejected: (error: any) => any): BadPromiseB;
			//  }
			//
			//  interface BadPromiseB {
			//      then(
			//          onfulfilled: (value: BadPromiseA) => any,
			//          onrejected: (error: any) => any): BadPromiseA;
			//  }
			//
			if errorNode != nil {
				c.error(errorNode, diagnostics.Type_is_referenced_directly_or_indirectly_in_the_fulfillment_callback_of_its_own_then_method)
			}
			return nil
		}
		// Keep track of the type we're about to unwrap to avoid bad recursive promise types.
		// See the comments above for more information.
		c.awaitedTypeStack = append(c.awaitedTypeStack, t)
		awaitedType := c.getAwaitedTypeNoAliasEx(promisedType, errorNode, diagnosticMessage, args...)
		c.awaitedTypeStack = c.awaitedTypeStack[:len(c.awaitedTypeStack)-1]
		if awaitedType == nil {
			return nil
		}
		c.cachedTypes[key] = awaitedType
		return awaitedType
	}
	// The type was not a promise, so it could not be unwrapped any further.
	// As long as the type does not have a callable "then" property, it is
	// safe to return the type; otherwise, an error is reported and we return
	// undefined.
	//
	// An example of a non-promise "thenable" might be:
	//
	//  await { then(): void {} }
	//
	// The "thenable" does not match the minimal definition for a promise. When
	// a Promise/A+-compatible or ES6 promise tries to adopt this value, the promise
	// will never settle. We treat this as an error to help flag an early indicator
	// of a runtime problem. If the user wants to return this value from an async
	// function, they would need to wrap it in some other value. If they want it to
	// be treated as a promise, they can cast to <any>.
	if c.isThenableType(t) {
		if errorNode != nil {
			var chain *ast.MessageChain
			if thisTypeForError != nil {
				chain = chainDiagnosticMessages(chain, diagnostics.The_this_context_of_type_0_is_not_assignable_to_method_s_this_of_type_1, c.typeToString(t), c.typeToString(thisTypeForError))
			}
			chain = chainDiagnosticMessages(chain, diagnosticMessage, args...)
			c.diagnostics.add(NewDiagnosticForNodeFromMessageChain(errorNode, chain))
		}
		return nil
	}
	c.cachedTypes[key] = t
	return t
}

func (c *Checker) isAwaitedTypeInstantiation(t *Type) bool {
	if t.flags&TypeFlagsConditional != 0 {
		awaitedSymbol := c.getGlobalAwaitedSymbolOrNil()
		return awaitedSymbol != nil && t.alias != nil && t.alias.symbol == awaitedSymbol && len(t.alias.typeArguments) == 1
	}
	return false
}

func (c *Checker) isAwaitedTypeNeeded(t *Type) bool {
	// If this is already an `Awaited<T>`, we shouldn't wrap it. This helps to avoid `Awaited<Awaited<T>>` in higher-order.
	if isTypeAny(t) || c.isAwaitedTypeInstantiation(t) {
		return false
	}
	// We only need `Awaited<T>` if `T` contains possibly non-primitive types.
	if c.isGenericObjectType(t) {
		baseConstraint := c.getBaseConstraintOfType(t)
		// We only need `Awaited<T>` if `T` is a type variable that has no base constraint, or the base constraint of `T` is `any`, `unknown`, `{}`, `object`,
		// or is promise-like.
		if baseConstraint != nil {
			return baseConstraint.flags&TypeFlagsAnyOrUnknown != 0 || c.isEmptyObjectType(baseConstraint) || someType(baseConstraint, c.isThenableType)
		}
		return c.maybeTypeOfKind(t, TypeFlagsTypeVariable)
	}
	return false
}

func (c *Checker) createAwaitedTypeIfNeeded(t *Type) *Type {
	// We wrap type `T` in `Awaited<T>` based on the following conditions:
	// - `T` is not already an `Awaited<U>`, and
	// - `T` is generic, and
	// - One of the following applies:
	//   - `T` has no base constraint, or
	//   - The base constraint of `T` is `any`, `unknown`, `object`, or `{}`, or
	//   - The base constraint of `T` is an object type with a callable `then` method.
	if c.isAwaitedTypeNeeded(t) {
		awaitedType := c.tryCreateAwaitedType(t)
		if awaitedType != nil {
			return awaitedType
		}
	}
	return t
}

func (c *Checker) tryCreateAwaitedType(t *Type) *Type {
	// Nothing to do if `Awaited<T>` doesn't exist
	awaitedSymbol := c.getGlobalAwaitedSymbol()
	if awaitedSymbol != nil {
		// Unwrap unions that may contain `Awaited<T>`, otherwise its possible to manufacture an `Awaited<Awaited<T> | U>` where
		// an `Awaited<T | U>` would suffice.
		return c.getTypeAliasInstantiation(awaitedSymbol, []*Type{c.unwrapAwaitedType(t)}, nil)
	}
	return nil
}

/**
 * For a generic `Awaited<T>`, gets `T`.
 */
func (c *Checker) unwrapAwaitedType(t *Type) *Type {
	switch {
	case t.flags&TypeFlagsUnion != 0:
		return c.mapType(t, c.unwrapAwaitedType)
	case c.isAwaitedTypeInstantiation(t):
		return t.alias.typeArguments[0]
	}
	return t
}

func (c *Checker) isThenableType(t *Type) bool {
	if c.allTypesAssignableToKind(c.getBaseConstraintOrType(t), TypeFlagsPrimitive|TypeFlagsNever) {
		// primitive types cannot be considered "thenable" since they are not objects.
		return false
	}
	thenFunction := c.getTypeOfPropertyOfType(t, "then")
	return thenFunction != nil && len(c.getSignaturesOfType(c.getTypeWithFacts(thenFunction, TypeFactsNEUndefinedOrNull), SignatureKindCall)) != 0
}

func (c *Checker) getAwaitedTypeOfPromise(t *Type) *Type {
	return c.getAwaitedTypeOfPromiseEx(t, nil, nil)
}

func (c *Checker) getAwaitedTypeOfPromiseEx(t *Type, errorNode *ast.Node, diagnosticMessage *diagnostics.Message, args ...any) *Type {
	promisedType := c.getPromisedTypeOfPromiseEx(t, errorNode, nil)
	if promisedType != nil {
		return c.getAwaitedTypeEx(promisedType, errorNode, diagnosticMessage, args...)
	}
	return nil
}

// Check if a parameter or catch variable (or their bindings elements) is assigned anywhere
func (c *Checker) isSomeSymbolAssigned(rootDeclaration *ast.Node) bool {
	return c.isSomeSymbolAssignedWorker(rootDeclaration.Name())
}

func (c *Checker) isSomeSymbolAssignedWorker(node *ast.Node) bool {
	if node.Kind == ast.KindIdentifier {
		return c.isSymbolAssigned(c.getSymbolOfDeclaration(node.Parent))
	}
	return core.Some(node.AsBindingPattern().Elements.Nodes, func(e *ast.Node) bool {
		return e.Kind != ast.KindOmittedExpression && c.isSomeSymbolAssignedWorker(e.Name())
	})
}

// Check if a parameter, catch variable, or mutable local variable is assigned anywhere
func (c *Checker) isSymbolAssigned(symbol *ast.Symbol) bool {
	return true // !!!
}

func (c *Checker) getTargetType(t *Type) *Type {
	if t.objectFlags&ObjectFlagsReference != 0 {
		return t.AsTypeReference().target
	}
	return t
}

func (c *Checker) getNarrowableTypeForReference(t *Type, reference *ast.Node, checkMode CheckMode) *Type {
	if c.isNoInferType(t) {
		t = t.AsSubstitutionType().baseType
	}
	// When the type of a reference is or contains an instantiable type with a union type constraint, and
	// when the reference is in a constraint position (where it is known we'll obtain the apparent type) or
	// has a contextual type containing no top-level instantiables (meaning constraints will determine
	// assignability), we substitute constraints for all instantiables in the type of the reference to give
	// control flow analysis an opportunity to narrow it further. For example, for a reference of a type
	// parameter type 'T extends string | undefined' with a contextual type 'string', we substitute
	// 'string | undefined' to give control flow analysis the opportunity to narrow to type 'string'.
	substituteConstraints := checkMode&CheckModeInferential == 0 && someType(t, c.isGenericTypeWithUnionConstraint) && (c.isConstraintPosition(t, reference) || c.hasContextualTypeWithNoGenericTypes(reference, checkMode))
	if substituteConstraints {
		return c.mapType(t, c.getBaseConstraintOrType)
	}
	return t
}

func (c *Checker) isConstraintPosition(t *Type, node *ast.Node) bool {
	parent := node.Parent
	// In an element access obj[x], we consider obj to be in a constraint position, except when obj is of
	// a generic type without a nullable constraint and x is a generic type. This is because when both obj
	// and x are of generic types T and K, we want the resulting type to be T[K].
	return ast.IsPropertyAccessExpression(parent) || ast.IsQualifiedName(parent) ||
		(ast.IsCallExpression(parent) || ast.IsNewExpression(parent)) && parent.Expression() == node ||
		ast.IsElementAccessExpression(parent) && parent.Expression() == node && !(someType(t, c.isGenericTypeWithoutNullableConstraint) && c.isGenericIndexType(c.getTypeOfExpression(parent.AsElementAccessExpression().ArgumentExpression)))
}

func (c *Checker) isGenericTypeWithUnionConstraint(t *Type) bool {
	if t.flags&TypeFlagsIntersection != 0 {
		return core.Some(t.AsIntersectionType().types, c.isGenericTypeWithUnionConstraint)
	}
	return t.flags&TypeFlagsInstantiable != 0 && c.getBaseConstraintOrType(t).flags&(TypeFlagsNullable|TypeFlagsUnion) != 0
}

func (c *Checker) isGenericTypeWithoutNullableConstraint(t *Type) bool {
	if t.flags&TypeFlagsIntersection != 0 {
		return core.Some(t.AsIntersectionType().types, c.isGenericTypeWithoutNullableConstraint)
	}
	return t.flags&TypeFlagsInstantiable != 0 && !c.maybeTypeOfKind(c.getBaseConstraintOrType(t), TypeFlagsNullable)
}

func (c *Checker) hasContextualTypeWithNoGenericTypes(node *ast.Node, checkMode CheckMode) bool {
	// Computing the contextual type for a child of a JSX element involves resolving the type of the
	// element's tag name, so we exclude that here to avoid circularities.
	// If check mode has `CheckMode.RestBindingElement`, we skip binding pattern contextual types,
	// as we want the type of a rest element to be generic when possible.
	if (ast.IsIdentifier(node) || ast.IsPropertyAccessExpression(node) || ast.IsElementAccessExpression(node)) &&
		!((ast.IsJsxOpeningElement(node.Parent) || ast.IsJsxSelfClosingElement(node.Parent)) && getTagNameOfNode(node.Parent) == node) {
		contextualType := c.getContextualType(node, core.IfElse(checkMode&CheckModeRestBindingElement != 0, ContextFlagsSkipBindingPatterns, ContextFlagsNone))
		if contextualType != nil {
			return !c.isGenericType(contextualType)
		}
	}
	return false
}

func (c *Checker) getNonUndefinedType(t *Type) *Type {
	typeOrConstraint := t
	if someType(t, c.isGenericTypeWithUndefinedConstraint) {
		typeOrConstraint = c.mapType(t, func(t *Type) *Type {
			if t.flags&TypeFlagsInstantiable != 0 {
				return c.getBaseConstraintOrType(t)
			}
			return t
		})
	}
	return c.getTypeWithFacts(typeOrConstraint, TypeFactsNEUndefined)
}

func (c *Checker) isGenericTypeWithUndefinedConstraint(t *Type) bool {
	if t.flags&TypeFlagsInstantiable != 0 {
		constraint := c.getBaseConstraintOfType(t)
		if constraint != nil {
			return c.maybeTypeOfKind(constraint, TypeFlagsUndefined)
		}
	}
	return false
}
