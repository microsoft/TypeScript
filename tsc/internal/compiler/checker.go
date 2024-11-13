package compiler

import (
	"fmt"
	"maps"
	"slices"
	"strconv"
	"strings"

	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
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
	enumSymbol *Symbol
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
)

// CachedTypeKey

type CachedTypeKey struct {
	kind   CachedTypeKind
	typeId TypeId
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

// InferenceContext

type InferenceContext struct{}

// IntrinsicTypeKind

type IntrinsicTypeKind int32

const (
	IntrinsicTypeKindUppercase IntrinsicTypeKind = iota
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

// Checker

type Checker struct {
	program                            *Program
	host                               CompilerHost
	compilerOptions                    *CompilerOptions
	files                              []*SourceFile
	typeCount                          uint32
	symbolCount                        uint32
	totalInstantiationCount            uint32
	instantiationCount                 uint32
	instantiationDepth                 uint32
	currentNode                        *Node
	languageVersion                    ScriptTarget
	moduleKind                         ModuleKind
	allowSyntheticDefaultImports       bool
	strictNullChecks                   bool
	strictFunctionTypes                bool
	strictBindCallApply                bool
	noImplicitAny                      bool
	useUnknownInCatchVariables         bool
	exactOptionalPropertyTypes         bool
	arrayVariances                     []VarianceFlags
	globals                            SymbolTable
	stringLiteralTypes                 map[string]*Type
	numberLiteralTypes                 map[float64]*Type
	bigintLiteralTypes                 map[PseudoBigInt]*Type
	enumLiteralTypes                   map[EnumLiteralKey]*Type
	indexedAccessTypes                 map[string]*Type
	uniqueESSymbolTypes                map[*Symbol]*Type
	cachedTypes                        map[CachedTypeKey]*Type
	cachedSignatures                   map[CachedSignatureKey]*Signature
	markerTypes                        set[*Type]
	identifierSymbols                  map[*Node]*Symbol
	undefinedSymbol                    *Symbol
	argumentsSymbol                    *Symbol
	requireSymbol                      *Symbol
	unknownSymbol                      *Symbol
	resolvingSymbol                    *Symbol
	errorTypes                         map[string]*Type
	globalThisSymbol                   *Symbol
	resolveName                        func(location *Node, name string, meaning SymbolFlags, nameNotFoundMessage *diagnostics.Message, isUse bool, excludeGlobals bool) *Symbol
	tupleTypes                         map[string]*Type
	unionTypes                         map[string]*Type
	unionOfUnionTypes                  map[UnionOfUnionKey]*Type
	intersectionTypes                  map[string]*Type
	diagnostics                        DiagnosticsCollection
	suggestionDiagnostics              DiagnosticsCollection
	symbolPool                         Pool[Symbol]
	signaturePool                      Pool[Signature]
	indexInfoPool                      Pool[IndexInfo]
	mergedSymbols                      map[MergeId]*Symbol
	nodeLinks                          LinkStore[*Node, NodeLinks]
	signatureLinks                     LinkStore[*Node, SignatureLinks]
	typeNodeLinks                      LinkStore[*Node, TypeNodeLinks]
	valueSymbolLinks                   LinkStore[*Symbol, ValueSymbolLinks]
	aliasSymbolLinks                   LinkStore[*Symbol, AliasSymbolLinks]
	moduleSymbolLinks                  LinkStore[*Symbol, ModuleSymbolLinks]
	exportTypeLinks                    LinkStore[*Symbol, ExportTypeLinks]
	membersAndExportsLinks             LinkStore[*Symbol, MembersAndExportsLinks]
	typeParameterLinks                 LinkStore[*Symbol, TypeParameterLinks]
	interfaceTypeLinks                 LinkStore[*Symbol, InterfaceTypeLinks]
	typeAliasLinks                     LinkStore[*Symbol, TypeAliasLinks]
	spreadLinks                        LinkStore[*Symbol, SpreadLinks]
	varianceLinks                      LinkStore[*Symbol, VarianceLinks]
	patternForType                     map[*Type]*Node
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
	nonPrimitiveType                   *Type
	stringOrNumberType                 *Type
	stringNumberSymbolType             *Type
	numericStringType                  *Type
	uniqueLiteralType                  *Type
	uniqueLiteralMapper                *TypeMapper
	outofbandVarianceMarkerHandler     func(onlyUnreliable bool)
	reportUnreliableMapper             *TypeMapper
	reportUnmeasurableMapper           *TypeMapper
	emptyObjectType                    *Type
	emptyTypeLiteralType               *Type
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
	enumNumberIndexInfo                *IndexInfo
	patternAmbientModules              []PatternAmbientModule
	patternAmbientModuleAugmentations  SymbolTable
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
	contextualBindingPatterns          []*Node
	typeResolutions                    []TypeResolution
	resolutionStart                    int
	inVarianceComputation              bool
	lastGetCombinedNodeFlagsNode       *Node
	lastGetCombinedNodeFlagsResult     NodeFlags
	lastGetCombinedModifierFlagsNode   *Node
	lastGetCombinedModifierFlagsResult ModifierFlags
	subtypeRelation                    *Relation
	strictSubtypeRelation              *Relation
	assignableRelation                 *Relation
	comparableRelation                 *Relation
	identityRelation                   *Relation
	enumRelation                       *Relation
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
	c.languageVersion = getEmitScriptTarget(c.compilerOptions)
	c.moduleKind = getEmitModuleKind(c.compilerOptions)
	c.allowSyntheticDefaultImports = getAllowSyntheticDefaultImports(c.compilerOptions)
	c.strictNullChecks = c.getStrictOptionValue(c.compilerOptions.StrictNullChecks)
	c.strictFunctionTypes = c.getStrictOptionValue(c.compilerOptions.StrictFunctionTypes)
	c.strictBindCallApply = c.getStrictOptionValue(c.compilerOptions.StrictBindCallApply)
	c.noImplicitAny = c.getStrictOptionValue(c.compilerOptions.NoImplicitAny)
	c.useUnknownInCatchVariables = c.getStrictOptionValue(c.compilerOptions.UseUnknownInCatchVariables)
	c.exactOptionalPropertyTypes = c.compilerOptions.ExactOptionalPropertyTypes == TSTrue
	c.arrayVariances = []VarianceFlags{VarianceFlagsCovariant}
	c.globals = make(SymbolTable)
	c.stringLiteralTypes = make(map[string]*Type)
	c.numberLiteralTypes = make(map[float64]*Type)
	c.bigintLiteralTypes = make(map[PseudoBigInt]*Type)
	c.enumLiteralTypes = make(map[EnumLiteralKey]*Type)
	c.indexedAccessTypes = make(map[string]*Type)
	c.uniqueESSymbolTypes = make(map[*Symbol]*Type)
	c.cachedTypes = make(map[CachedTypeKey]*Type)
	c.cachedSignatures = make(map[CachedSignatureKey]*Signature)
	c.identifierSymbols = make(map[*Node]*Symbol)
	c.undefinedSymbol = c.newSymbol(SymbolFlagsProperty, "undefined")
	c.argumentsSymbol = c.newSymbol(SymbolFlagsProperty, "arguments")
	c.requireSymbol = c.newSymbol(SymbolFlagsProperty, "require")
	c.unknownSymbol = c.newSymbol(SymbolFlagsProperty, "unknown")
	c.resolvingSymbol = c.newSymbol(SymbolFlagsNone, InternalSymbolNameResolving)
	c.errorTypes = make(map[string]*Type)
	c.globalThisSymbol = c.newSymbolEx(SymbolFlagsModule, "globalThis", CheckFlagsReadonly)
	c.globalThisSymbol.exports = c.globals
	c.globals[c.globalThisSymbol.name] = c.globalThisSymbol
	c.resolveName = c.createNameResolver().resolve
	c.tupleTypes = make(map[string]*Type)
	c.unionTypes = make(map[string]*Type)
	c.unionOfUnionTypes = make(map[UnionOfUnionKey]*Type)
	c.intersectionTypes = make(map[string]*Type)
	c.diagnostics = DiagnosticsCollection{}
	c.suggestionDiagnostics = DiagnosticsCollection{}
	c.mergedSymbols = make(map[MergeId]*Symbol)
	c.patternForType = make(map[*Type]*Node)
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
	c.undefinedOrMissingType = ifElse(c.exactOptionalPropertyTypes, c.missingType, c.undefinedType)
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
	c.nonPrimitiveType = c.newIntrinsicType(TypeFlagsNonPrimitive, "object")
	c.stringOrNumberType = c.getUnionType([]*Type{c.stringType, c.numberType})
	c.stringNumberSymbolType = c.getUnionType([]*Type{c.stringType, c.numberType, c.esSymbolType})
	c.numericStringType = c.numberType                                // !!!
	c.uniqueLiteralType = c.newIntrinsicType(TypeFlagsNever, "never") // Special `never` flagged by union reduction to behave as a literal
	c.uniqueLiteralMapper = newFunctionTypeMapper(c.getUniqueLiteralTypeForTypeParameter)
	c.reportUnreliableMapper = newFunctionTypeMapper(c.reportUnreliableWorker)
	c.reportUnmeasurableMapper = newFunctionTypeMapper(c.reportUnmeasurableWorker)
	c.emptyObjectType = c.newAnonymousType(nil /*symbol*/, nil, nil, nil, nil)
	c.emptyTypeLiteralType = c.newAnonymousType(c.newSymbol(SymbolFlagsTypeLiteral, InternalSymbolNameType), nil, nil, nil, nil)
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
	c.enumNumberIndexInfo = &IndexInfo{keyType: c.numberType, valueType: c.stringType, isReadonly: true}
	c.subtypeRelation = &Relation{}
	c.strictSubtypeRelation = &Relation{}
	c.assignableRelation = &Relation{}
	c.comparableRelation = &Relation{}
	c.identityRelation = &Relation{}
	c.enumRelation = &Relation{}
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

func (c *Checker) getStrictOptionValue(value Tristate) bool {
	if value != TSUnknown {
		return value == TSTrue
	}
	return c.compilerOptions.Strict == TSTrue
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
	augmentations := make([][]*Node, 0, len(c.files))
	for _, file := range c.files {
		if !isExternalOrCommonJsModule(file) {
			c.mergeSymbolTable(c.globals, file.locals, false, nil)
		}
		c.patternAmbientModules = append(c.patternAmbientModules, file.patternAmbientModules...)
		augmentations = append(augmentations, file.moduleAugmentations)
		if file.symbol != nil {
			// Merge in UMD exports with first-in-wins semantics (see #9771)
			for name, symbol := range file.symbol.globalExports {
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
			if isGlobalScopeAugmentation(augmentation.parent) {
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
	c.globalReadonlyArrayType = c.getGlobalTypeOrNil("ReadonlyArray", 1 /*arity*/)
	if c.globalReadonlyArrayType == nil {
		c.globalReadonlyArrayType = c.globalArrayType
	}
	c.anyReadonlyArrayType = c.createTypeFromGenericGlobalType(c.globalReadonlyArrayType, []*Type{c.anyType})
	c.globalThisType = c.getGlobalTypeOrNil("ThisType", 1 /*arity*/)
	// merge _nonglobal_ module augmentations.
	// this needs to be done after global symbol table is initialized to make sure that all ambient modules are indexed
	for _, list := range augmentations {
		for _, augmentation := range list {
			if !isGlobalScopeAugmentation(augmentation.parent) {
				c.mergeModuleAugmentation(augmentation)
			}
		}
	}
}

func (c *Checker) mergeModuleAugmentation(moduleName *Node) {
	moduleNode := moduleName.parent
	moduleAugmentation := moduleNode.AsModuleDeclaration()
	if moduleAugmentation.symbol.declarations[0] != moduleNode {
		// this is a combined symbol for multiple augmentations within the same file.
		// its symbol already has accumulated information for all declarations
		// so we need to add it just once - do the work only for first declaration
		return
	}
	if isGlobalScopeAugmentation(moduleNode) {
		c.mergeSymbolTable(c.globals, moduleAugmentation.symbol.exports, false /*unidirectional*/, nil /*parent*/)
	} else {
		// find a module that about to be augmented
		// do not validate names of augmentations that are defined in ambient context
		var moduleNotFoundError *diagnostics.Message
		if moduleName.parent.parent.flags&NodeFlagsAmbient == 0 {
			moduleNotFoundError = diagnostics.Invalid_module_name_in_augmentation_module_0_cannot_be_found
		}
		mainModule := c.resolveExternalModuleNameWorker(moduleName, moduleName, moduleNotFoundError /*ignoreErrors*/, false /*isForAugmentation*/, true)
		if mainModule == nil {
			return
		}
		// obtain item referenced by 'export='
		mainModule = c.resolveExternalModuleSymbol(mainModule, false /*dontResolveAlias*/)
		if mainModule.flags&SymbolFlagsNamespace != 0 {
			// If we're merging an augmentation to a pattern ambient module, we want to
			// perform the merge unidirectionally from the augmentation ('a.foo') to
			// the pattern ('*.foo'), so that 'getMergedSymbol()' on a.foo gives you
			// all the exports both from the pattern and from the augmentation, but
			// 'getMergedSymbol()' on *.foo only gives you exports from *.foo.
			if core.Some(c.patternAmbientModules, func(module PatternAmbientModule) bool {
				return mainModule == module.symbol
			}) {
				merged := c.mergeSymbol(moduleAugmentation.symbol, mainModule, true /*unidirectional*/)
				// moduleName will be a StringLiteral since this is not `declare global`.
				getSymbolTable(&c.patternAmbientModuleAugmentations)[moduleName.Text()] = merged
			} else {
				if mainModule.exports[InternalSymbolNameExportStar] != nil && len(moduleAugmentation.symbol.exports) != 0 {
					// We may need to merge the module augmentation's exports into the target symbols of the resolved exports
					resolvedExports := c.getResolvedMembersOrExportsOfSymbol(mainModule, MembersOrExportsResolutionKindResolvedExports)
					for key, value := range moduleAugmentation.symbol.exports {
						if resolvedExports[key] != nil && mainModule.exports[key] == nil {
							c.mergeSymbol(resolvedExports[key], value, false /*unidirectional*/)
						}
					}
				}
				c.mergeSymbol(mainModule, moduleAugmentation.symbol, false /*unidirectional*/)
			}
		} else {
			// moduleName will be a StringLiteral since this is not `declare global`.
			c.error(moduleName, diagnostics.Cannot_augment_module_0_because_it_resolves_to_a_non_module_entity, moduleName.Text())
		}
	}
}

func (c *Checker) addUndefinedToGlobalsOrErrorOnRedeclaration() {
	name := c.undefinedSymbol.name
	targetSymbol := c.globals[name]
	if targetSymbol != nil {
		for _, declaration := range targetSymbol.declarations {
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

func (c *Checker) getRequiresScopeChangeCache(node *Node) Tristate {
	return c.nodeLinks.get(node).declarationRequiresScopeChange
}

func (c *Checker) setRequiresScopeChangeCache(node *Node, value Tristate) {
	c.nodeLinks.get(node).declarationRequiresScopeChange = value
}

// The invalid initializer error is needed in two situation:
// 1. When result is undefined, after checking for a missing "this."
// 2. When result is defined
func (c *Checker) checkAndReportErrorForInvalidInitializer(errorLocation *Node, name string, propertyWithInvalidInitializer *Node, result *Symbol) bool {
	if !getEmitStandardClassFields(c.compilerOptions) {
		if errorLocation != nil && result == nil && c.checkAndReportErrorForMissingPrefix(errorLocation, name) {
			return true
		}
		// We have a match, but the reference occurred within a property initializer and the identifier also binds
		// to a local variable in the constructor where the code will be emitted. Note that this is actually allowed
		// with emitStandardClassFields because the scope semantics are different.
		prop := propertyWithInvalidInitializer.AsPropertyDeclaration()
		message := ifElse(errorLocation != nil && prop.typeNode != nil && prop.typeNode.loc.ContainsInclusive(errorLocation.Pos()),
			diagnostics.Type_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor,
			diagnostics.Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor)
		c.error(errorLocation, message, declarationNameToString(prop.name), name)
		return true
	}
	return false
}

func (c *Checker) onFailedToResolveSymbol(errorLocation *Node, name string, meaning SymbolFlags, nameNotFoundMessage *diagnostics.Message) {
	// !!!
	c.error(errorLocation, nameNotFoundMessage, name, "???")
}

func (c *Checker) onSuccessfullyResolvedSymbol(errorLocation *Node, result *Symbol, meaning SymbolFlags, lastLocation *Node, associatedDeclarationForContainingInitializerOrBindingName *Node, withinDeferredContext bool) {
	name := result.name
	isInExternalModule := lastLocation != nil && isSourceFile(lastLocation) && isExternalOrCommonJsModule(lastLocation.AsSourceFile())
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
	if errorLocation != nil && (meaning&SymbolFlagsBlockScopedVariable != 0 || meaning&(SymbolFlagsClass|SymbolFlagsEnum) != 0 && meaning&SymbolFlagsValue == SymbolFlagsValue) {
		exportOrLocalSymbol := c.getExportSymbolOfValueSymbolIfExported(result)
		if exportOrLocalSymbol.flags&(SymbolFlagsBlockScopedVariable|SymbolFlagsClass|SymbolFlagsEnum) != 0 {
			c.checkResolvedBlockScopedVariable(exportOrLocalSymbol, errorLocation)
		}
	}
	// If we're in an external module, we can't reference value symbols created from UMD export declarations
	if isInExternalModule && (meaning&SymbolFlagsValue) == SymbolFlagsValue && errorLocation.flags&NodeFlagsJSDoc == 0 {
		merged := c.getMergedSymbol(result)
		if len(merged.declarations) != 0 && core.Every(merged.declarations, func(d *Node) bool {
			return isNamespaceExportDeclaration(d) || isSourceFile(d) && d.Symbol().globalExports != nil
		}) {
			c.errorOrSuggestion(c.compilerOptions.AllowUmdGlobalAccess != TSTrue, errorLocation, diagnostics.X_0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead, name)
		}
	}
	// If we're in a parameter initializer or binding name, we can't reference the values of the parameter whose initializer we're within or parameters to the right
	if associatedDeclarationForContainingInitializerOrBindingName != nil && !withinDeferredContext && (meaning&SymbolFlagsValue) == SymbolFlagsValue {
		candidate := c.getMergedSymbol(c.getLateBoundSymbol(result))
		root := getRootDeclaration(associatedDeclarationForContainingInitializerOrBindingName)
		// A parameter initializer or binding pattern initializer within a parameter cannot refer to itself
		if candidate == c.getSymbolOfDeclaration(associatedDeclarationForContainingInitializerOrBindingName) {
			c.error(errorLocation, diagnostics.Parameter_0_cannot_reference_itself, declarationNameToString(associatedDeclarationForContainingInitializerOrBindingName.Name()))
		} else if candidate.valueDeclaration != nil && candidate.valueDeclaration.Pos() > associatedDeclarationForContainingInitializerOrBindingName.Pos() && root.parent.LocalsContainerData().locals != nil && c.getSymbol(root.parent.LocalsContainerData().locals, candidate.name, meaning) == candidate {
			c.error(errorLocation, diagnostics.Parameter_0_cannot_reference_identifier_1_declared_after_it, declarationNameToString(associatedDeclarationForContainingInitializerOrBindingName.Name()), declarationNameToString(errorLocation))
		}
	}
	if errorLocation != nil && meaning&SymbolFlagsValue != 0 && result.flags&SymbolFlagsAlias != 0 && result.flags&SymbolFlagsValue == 0 && !isValidTypeOnlyAliasUseSite(errorLocation) {
		typeOnlyDeclaration := c.getTypeOnlyAliasDeclarationEx(result, SymbolFlagsValue)
		if typeOnlyDeclaration != nil {
			message := ifElse(nodeKindIs(typeOnlyDeclaration, SyntaxKindExportSpecifier, SyntaxKindExportDeclaration, SyntaxKindNamespaceExport),
				diagnostics.X_0_cannot_be_used_as_a_value_because_it_was_exported_using_export_type,
				diagnostics.X_0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type)
			c.addTypeOnlyDeclarationRelatedInfo(c.error(errorLocation, message, name), typeOnlyDeclaration, name)
		}
	}
	// Look at 'compilerOptions.isolatedModules' and not 'getIsolatedModules(...)' (which considers 'verbatimModuleSyntax')
	// here because 'verbatimModuleSyntax' will already have an error for importing a type without 'import type'.
	if c.compilerOptions.IsolatedModules == TSTrue && result != nil && isInExternalModule && (meaning&SymbolFlagsValue) == SymbolFlagsValue {
		isGlobal := c.getSymbol(c.globals, name, meaning) == result
		var nonValueSymbol *Symbol
		if isGlobal && isSourceFile(lastLocation) {
			nonValueSymbol = c.getSymbol(lastLocation.AsSourceFile().locals, name, ^SymbolFlagsValue)
		}
		if nonValueSymbol != nil {
			importDecl := core.Find(nonValueSymbol.declarations, func(d *Node) bool {
				return nodeKindIs(d, SyntaxKindImportSpecifier, SyntaxKindImportClause, SyntaxKindNamespaceImport, SyntaxKindImportEqualsDeclaration)
			})
			if importDecl != nil && !isTypeOnlyImportDeclaration(importDecl) {
				c.error(importDecl, diagnostics.Import_0_conflicts_with_global_value_used_in_this_file_so_must_be_declared_with_a_type_only_import_when_isolatedModules_is_enabled, name)
			}
		}
	}
}

func (c *Checker) checkResolvedBlockScopedVariable(result *Symbol, errorLocation *Node) {
	//Debug.assert(!!(result.flags&SymbolFlagsBlockScopedVariable || result.flags&SymbolFlagsClass || result.flags&SymbolFlagsEnum))
	if result.flags&(SymbolFlagsFunction|SymbolFlagsFunctionScopedVariable|SymbolFlagsAssignment) != 0 && result.flags&SymbolFlagsClass != 0 {
		// constructor functions aren't block scoped
		return
	}
	// Block-scoped variables cannot be used before their definition
	declaration := core.Find(result.declarations, func(d *Node) bool {
		return isBlockOrCatchScoped(d) || isClassLike(d) || isEnumDeclaration(d)
	})
	if declaration == nil {
		panic("checkResolvedBlockScopedVariable could not find block-scoped declaration")
	}
	if declaration.flags&NodeFlagsAmbient == 0 && !c.isBlockScopedNameDeclaredBeforeUse(declaration, errorLocation) {
		var diagnostic *Diagnostic
		declarationName := declarationNameToString(getNameOfDeclaration(declaration))
		if result.flags&SymbolFlagsBlockScopedVariable != 0 {
			diagnostic = c.error(errorLocation, diagnostics.Block_scoped_variable_0_used_before_its_declaration, declarationName)
		} else if result.flags&SymbolFlagsClass != 0 {
			diagnostic = c.error(errorLocation, diagnostics.Class_0_used_before_its_declaration, declarationName)
		} else if result.flags&SymbolFlagsRegularEnum != 0 {
			diagnostic = c.error(errorLocation, diagnostics.Enum_0_used_before_its_declaration, declarationName)
		} else {
			//Debug.assert(!!(result.flags & SymbolFlagsConstEnum))
			if getIsolatedModules(c.compilerOptions) {
				diagnostic = c.error(errorLocation, diagnostics.Enum_0_used_before_its_declaration, declarationName)
			}
		}
		if diagnostic != nil {
			diagnostic.addRelatedInfo(createDiagnosticForNode(declaration, diagnostics.X_0_is_declared_here, declarationName))
		}
	}
}

func (c *Checker) isBlockScopedNameDeclaredBeforeUse(declaration *Node, usage *Node) bool {
	return true // !!!
}

func (c *Checker) checkAndReportErrorForMissingPrefix(errorLocation *Node, name string) bool {
	return false // !!!
}

func (c *Checker) getTypeOnlyAliasDeclaration(symbol *Symbol) *Node {
	return c.getTypeOnlyAliasDeclarationEx(symbol, SymbolFlagsNone)
}

func (c *Checker) getTypeOnlyAliasDeclarationEx(symbol *Symbol, include SymbolFlags) *Node {
	if symbol.flags&SymbolFlagsAlias == 0 {
		return nil
	}
	links := c.aliasSymbolLinks.get(symbol)
	if !links.typeOnlyDeclarationResolved {
		// We need to set a WIP value here to prevent reentrancy during `getImmediateAliasedSymbol` which, paradoxically, can depend on this
		links.typeOnlyDeclarationResolved = true
		resolved := c.resolveSymbol(symbol)
		// While usually the alias will have been marked during the pass by the full typecheck, we may still need to calculate the alias declaration now
		var immediateTarget *Symbol
		if c.getDeclarationOfAliasSymbol(symbol) != nil {
			immediateTarget = c.getImmediateAliasedSymbol(symbol)
		}
		c.markSymbolOfAliasDeclarationIfTypeOnly(symbol.declarations[0], immediateTarget, resolved, true /*overwriteEmpty*/, nil, "")
	}
	if include == SymbolFlagsNone {
		return links.typeOnlyDeclaration
	}
	if links.typeOnlyDeclaration != nil {
		var resolved *Symbol
		if links.typeOnlyDeclaration.kind == SyntaxKindExportDeclaration {
			name := links.typeOnlyExportStarName
			if name == "" {
				name = symbol.name
			}
			resolved = c.resolveSymbol(c.getExportsOfModule(links.typeOnlyDeclaration.Symbol().parent)[name])
		} else {
			resolved = c.resolveAlias(links.typeOnlyDeclaration.Symbol())
		}
		if c.getSymbolFlags(resolved)&include != 0 {
			return links.typeOnlyDeclaration
		}
	}
	return nil
}

func (c *Checker) getImmediateAliasedSymbol(symbol *Symbol) *Symbol {
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

func (c *Checker) addTypeOnlyDeclarationRelatedInfo(diagnostic *Diagnostic, typeOnlyDeclaration *Node, name string) {
	// !!!
}

func (c *Checker) getSymbol(symbols SymbolTable, name string, meaning SymbolFlags) *Symbol {
	if meaning != 0 {
		symbol := c.getMergedSymbol(symbols[name])
		if symbol != nil {
			if symbol.flags&meaning != 0 {
				return symbol
			}
			if symbol.flags&SymbolFlagsAlias != 0 {
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

func (c *Checker) checkSourceFile(sourceFile *SourceFile) {
	node := sourceFile.AsNode()
	links := c.nodeLinks.get(node)
	if links.flags&NodeCheckFlagsTypeChecked == 0 {
		c.checkSourceElement(node)
		links.flags |= NodeCheckFlagsTypeChecked
	}
}

func (c *Checker) checkSourceElement(node *Node) bool {
	if node != nil {
		saveCurrentNode := c.currentNode
		c.currentNode = node
		c.instantiationCount = 0
		c.checkSourceElementWorker(node)
		c.currentNode = saveCurrentNode
	}
	return false
}

func (c *Checker) checkSourceElementWorker(node *Node) {
	// !!! Cancellation
	kind := node.kind
	if kind >= SyntaxKindFirstStatement && kind <= SyntaxKindLastStatement {
		flowNode := node.FlowNodeData().flowNode
		if flowNode != nil && !c.isReachableFlowNode(flowNode) {
			c.errorOrSuggestion(c.compilerOptions.AllowUnreachableCode == TSFalse, node, diagnostics.Unreachable_code_detected)
		}
	}
	switch node.kind {
	case SyntaxKindIdentifier:
		if isExpressionNode(node) &&
			!(isPropertyAccessExpression(node.parent) && node.parent.AsPropertyAccessExpression().name == node) &&
			!(isQualifiedName(node.parent) && node.parent.AsQualifiedName().right == node) {
			_ = c.checkExpression(node)
		}
	case SyntaxKindStringLiteral, SyntaxKindNumericLiteral, SyntaxKindBigIntLiteral:
		if isExpressionNode(node) {
			c.checkExpression(node)
		}
	case SyntaxKindExpressionStatement:
		c.checkExpressionStatement(node)
	case SyntaxKindTypeAliasDeclaration:
		c.getTypeFromTypeNode(node.AsTypeAliasDeclaration().typeNode)
	default:
		node.ForEachChild(c.checkSourceElement)
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
func (c *Checker) checkNodeDeferred(node *Node) {
	// !!!
	// enclosingFile := getSourceFileOfNode(node)
	// links := c.getNodeLinks(enclosingFile)
	// if !(links.flags & NodeCheckFlagsTypeChecked) {
	// 	links.deferredNodes = links.deferredNodes || NewSet()
	// 	links.deferredNodes.add(node)
	// } else {
	// 	Debug.assert(!links.deferredNodes, "A type-checked file should have no deferred nodes.")
	// }
}

func (c *Checker) checkExpressionStatement(node *Node) {
	// !!! Grammar checking
	c.checkExpression(node.AsExpressionStatement().expression)
}

/**
 * Returns the type of an expression. Unlike checkExpression, this function is simply concerned
 * with computing the type and may not fully check all contained sub-expressions for errors.
 */

func (c *Checker) getTypeOfExpression(node *Node) *Type {
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
func (c *Checker) getQuickTypeOfExpression(node *Node) *Type {
	// !!!
	return nil
}

func (c *Checker) checkNonNullExpression(node *Node) *Type {
	return c.checkNonNullType(c.checkExpression(node), node)
}

func (c *Checker) checkNonNullType(t *Type, node *Node) *Type {
	return t // !!!
}

func (c *Checker) checkExpressionWithContextualType(node *Node, contextualType *Type, inferenceContext *InferenceContext, checkMode CheckMode) *Type {
	// !!!
	return c.checkExpressionEx(node, checkMode)
}

func (c *Checker) checkExpressionCached(node *Node) *Type {
	return c.checkExpressionCachedEx(node, CheckModeNormal)
}

func (c *Checker) checkExpressionCachedEx(node *Node, checkMode CheckMode) *Type {
	// !!!
	return c.checkExpressionEx(node, checkMode)
}

func (c *Checker) checkExpression(node *Node) *Type {
	return c.checkExpressionEx(node, CheckModeNormal)
}

func (c *Checker) checkExpressionEx(node *Node, checkMode CheckMode) *Type {
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

func (c *Checker) instantiateTypeWithSingleGenericCallSignature(node *Node, uninstantiatedType *Type, checkMode CheckMode) *Type {
	return uninstantiatedType // !!!
}

func (c *Checker) checkExpressionWorker(node *Node, checkMode CheckMode) *Type {
	switch node.kind {
	case SyntaxKindIdentifier:
		return c.checkIdentifier(node)
	case SyntaxKindThisKeyword:
		return c.checkThisExpression(node)
	case SyntaxKindNullKeyword:
		return c.nullWideningType
	case SyntaxKindStringLiteral, SyntaxKindNoSubstitutionTemplateLiteral:
		// !!! Handle blockedStringType
		return c.getFreshTypeOfLiteralType(c.getStringLiteralType(node.Text()))
	case SyntaxKindNumericLiteral:
		// !!! checkGrammarNumericLiteral(node as NumericLiteral)
		// !!! Revise this to handle NaN, Infinity, etc. in the same manner as JS
		return c.getFreshTypeOfLiteralType(c.getNumberLiteralType(stringToNumber(node.Text())))
	case SyntaxKindBigIntLiteral:
		// !!! checkGrammarBigIntLiteral(node as BigIntLiteral);
		return c.getFreshTypeOfLiteralType(c.getBigIntLiteralType(PseudoBigInt{
			negative:    false,
			base10Value: parsePseudoBigInt(node.AsBigIntLiteral().text),
		}))
	case SyntaxKindTrueKeyword:
		return c.trueType
	case SyntaxKindFalseKeyword:
		return c.falseType
	case SyntaxKindObjectLiteralExpression:
		return c.checkObjectLiteral(node, checkMode)
	case SyntaxKindPropertyAccessExpression:
		return c.checkPropertyAccessExpression(node, checkMode, false /*writeOnly*/)
	case SyntaxKindBinaryExpression:
		return c.checkBinaryExpression(node, checkMode)
	case SyntaxKindTypeAssertionExpression, SyntaxKindAsExpression:
		return c.checkAssertion(node, checkMode)
	}
	return c.anyType // !!!
}

func (c *Checker) checkIdentifier(node *Node) *Type {
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
	declaration := localOrExportSymbol.valueDeclaration
	// !!!
	// immediateDeclaration := declaration
	// If the identifier is declared in a binding pattern for which we're currently computing the implied type and the
	// reference occurs with the same binding pattern, return the non-inferrable any type. This for example occurs in
	// 'const [a, b = a + 1] = [2]' when we're computing the contextual type for the array literal '[2]'.
	if declaration != nil && declaration.kind == SyntaxKindBindingElement && slices.Contains(c.contextualBindingPatterns, declaration.parent) &&
		findAncestor(node, func(parent *Node) bool { return parent == declaration.parent }) != nil {
		return c.nonInferrableAnyType
	}
	t := c.getNarrowedTypeOfSymbol(localOrExportSymbol, node)
	assignmentKind := getAssignmentTargetKind(node)
	if assignmentKind != AssignmentKindNone {
		if localOrExportSymbol.flags&SymbolFlagsVariable == 0 {
			var assignmentError *diagnostics.Message
			switch {
			case localOrExportSymbol.flags&SymbolFlagsEnum != 0:
				assignmentError = diagnostics.Cannot_assign_to_0_because_it_is_an_enum
			case localOrExportSymbol.flags&SymbolFlagsClass != 0:
				assignmentError = diagnostics.Cannot_assign_to_0_because_it_is_a_class
			case localOrExportSymbol.flags&SymbolFlagsModule != 0:
				assignmentError = diagnostics.Cannot_assign_to_0_because_it_is_a_namespace
			case localOrExportSymbol.flags&SymbolFlagsFunction != 0:
				assignmentError = diagnostics.Cannot_assign_to_0_because_it_is_a_function
			case localOrExportSymbol.flags&SymbolFlagsAlias != 0:
				assignmentError = diagnostics.Cannot_assign_to_0_because_it_is_an_import
			default:
				assignmentError = diagnostics.Cannot_assign_to_0_because_it_is_not_a_variable
			}
			c.error(node, assignmentError, c.symbolToString(symbol))
			return c.errorType
		}
		if c.isReadonlySymbol(localOrExportSymbol) {
			if localOrExportSymbol.flags&SymbolFlagsVariable != 0 {
				c.error(node, diagnostics.Cannot_assign_to_0_because_it_is_a_constant, c.symbolToString(symbol))
			} else {
				c.error(node, diagnostics.Cannot_assign_to_0_because_it_is_a_read_only_property, c.symbolToString(symbol))
			}
			return c.errorType
		}
	}
	isAlias := localOrExportSymbol.flags&SymbolFlagsAlias != 0
	// We only narrow variables and parameters occurring in a non-assignment position. For all other
	// entities we simply return the declared type.
	if localOrExportSymbol.flags&SymbolFlagsVariable != 0 {
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
	flowType := t
	if assignmentKind != AssignmentKindNone {
		// Identifier is target of a compound assignment
		return c.getBaseTypeOfLiteralType(flowType)
	}
	return flowType
}

func (c *Checker) checkPropertyAccessExpression(node *Node, checkMode CheckMode, writeOnly bool) *Type {
	if node.flags&NodeFlagsOptionalChain != 0 {
		return c.checkPropertyAccessChain(node, checkMode)
	}
	expr := node.Expression()
	return c.checkPropertyAccessExpressionOrQualifiedName(node, expr, c.checkNonNullExpression(expr), node.AsPropertyAccessExpression().name, checkMode, writeOnly)
}

func (c *Checker) checkPropertyAccessChain(node *Node, checkMode CheckMode) *Type {
	return c.anyType // !!!
}

func (c *Checker) checkPropertyAccessExpressionOrQualifiedName(node *Node, left *Node, leftType *Type, right *Node, checkMode CheckMode, writeOnly bool) *Type {
	parentSymbol := c.typeNodeLinks.get(node).resolvedSymbol
	assignmentKind := getAssignmentTargetKind(node)
	widenedType := leftType
	if assignmentKind != AssignmentKindNone || c.isMethodAccessForCall(node) {
		widenedType = c.getWidenedType(leftType)
	}
	apparentType := c.getApparentType(widenedType)
	isAnyLike := isTypeAny(apparentType) || apparentType == c.silentNeverType
	var prop *Symbol
	if isPrivateIdentifier(right) {
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
		if assignmentKind != AssignmentKindNone && lexicallyScopedSymbol != nil && lexicallyScopedSymbol.valueDeclaration != nil && isMethodDeclaration(lexicallyScopedSymbol.valueDeclaration) {
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
			// if containingClass && isPlainJsFile(getSourceFileOfNode(containingClass), c.compilerOptions.checkJs) {
			// 	c.grammarErrorOnNode(right, diagnostics.Private_field_0_must_be_declared_in_an_enclosing_class, right.Text())
			// }
		} else {
			isSetonlyAccessor := prop.flags&SymbolFlagsSetAccessor != 0 && prop.flags&SymbolFlagsGetAccessor == 0
			if isSetonlyAccessor && assignmentKind != AssignmentKindDefinite {
				c.error(node, diagnostics.Private_accessor_was_defined_without_a_getter)
			}
		}
	} else {
		if isAnyLike {
			if isIdentifier(left) && parentSymbol != nil {
				c.markLinkedReferences(node, ReferenceHintProperty, nil /*propSymbol*/, leftType)
			}
			if c.isErrorType(apparentType) {
				return c.errorType
			}
			return apparentType
		}
		prop = c.getPropertyOfTypeEx(apparentType, right.Text(), isConstEnumObjectType(apparentType) /*skipObjectFunctionPropertyAugment*/, node.kind == SyntaxKindQualifiedName /*includeTypeOnlyMembers*/)
	}
	c.markLinkedReferences(node, ReferenceHintProperty, prop, leftType)
	var propType *Type
	if prop == nil {
		var indexInfo *IndexInfo
		if !isPrivateIdentifier(right) && (assignmentKind == AssignmentKindNone || !c.isGenericObjectType(leftType) || isThisTypeParameter(leftType)) {
			indexInfo = c.getApplicableIndexInfoForName(apparentType, right.Text())
		}
		if indexInfo == nil {
			if leftType.symbol == c.globalThisSymbol {
				globalSymbol := c.globalThisSymbol.exports[right.Text()]
				if globalSymbol != nil && globalSymbol.flags&SymbolFlagsBlockScoped != 0 {
					c.error(right, diagnostics.Property_0_does_not_exist_on_type_1, right.Text(), c.typeToString(leftType))
				} else if c.noImplicitAny {
					c.error(right, diagnostics.Element_implicitly_has_an_any_type_because_type_0_has_no_index_signature, c.typeToString(leftType))
				}
				return c.anyType
			}
			if right.Text() != "" && !c.checkAndReportErrorForExtendingInterface(node) {
				c.reportNonexistentProperty(right, ifElse(isThisTypeParameter(leftType), apparentType, leftType))
			}
			return c.errorType
		}
		if indexInfo.isReadonly && (isAssignmentTarget(node) || isDeleteTarget(node)) {
			c.error(node, diagnostics.Index_signature_in_type_0_only_permits_reading, c.typeToString(apparentType))
		}
		propType = indexInfo.valueType
		if c.compilerOptions.NoUncheckedIndexedAccess == TSTrue && getAssignmentTargetKind(node) != AssignmentKindDefinite {
			propType = c.getUnionType([]*Type{propType, c.missingType})
		}
		if c.compilerOptions.NoPropertyAccessFromIndexSignature == TSTrue && isPropertyAccessExpression(node) {
			c.error(right, diagnostics.Property_0_comes_from_an_index_signature_so_it_must_be_accessed_with_0, right.Text())
		}
		if indexInfo.declaration != nil && c.isDeprecatedDeclaration(indexInfo.declaration) {
			c.addDeprecatedSuggestion(right, []*Node{indexInfo.declaration}, right.Text())
		}
	} else {
		targetPropSymbol := c.resolveAliasWithDeprecationCheck(prop, right)
		if c.isDeprecatedSymbol(targetPropSymbol) && c.isUncalledFunctionReference(node, targetPropSymbol) && targetPropSymbol.declarations != nil {
			c.addDeprecatedSuggestion(right, targetPropSymbol.declarations, right.Text())
		}
		c.checkPropertyNotUsedBeforeDeclaration(prop, node, right)
		c.markPropertyAsReferenced(prop, node, c.isSelfTypeAccess(left, parentSymbol))
		c.typeNodeLinks.get(node).resolvedSymbol = prop
		c.checkPropertyAccessibility(node, left.kind == SyntaxKindSuperKeyword, isWriteAccess(node), apparentType, prop)
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

func (c *Checker) getFlowTypeOfAccessExpression(node *Node, prop *Symbol, propType *Type, errorNode *Node, checkMode CheckMode) *Type {
	return propType // !!!
}

func (c *Checker) isMethodAccessForCall(node *Node) bool {
	for isParenthesizedExpression(node.parent) {
		node = node.parent
	}
	return isCallOrNewExpression(node.parent) && node.parent.Expression() == node
}

// Lookup the private identifier lexically.
func (c *Checker) lookupSymbolForPrivateIdentifierDeclaration(propName string, location *Node) *Symbol {
	for containingClass := getContainingClassExcludingClassDecorators(location); containingClass != nil; containingClass = getContainingClass(containingClass) {
		symbol := containingClass.Symbol()
		name := getSymbolNameForPrivateIdentifier(symbol, propName)
		prop := symbol.members[name]
		if prop != nil {
			return prop
		}
		prop = symbol.exports[name]
		if prop != nil {
			return prop
		}
	}
	return nil
}

func (c *Checker) getPrivateIdentifierPropertyOfType(leftType *Type, lexicallyScopedIdentifier *Symbol) *Symbol {
	return c.getPropertyOfType(leftType, lexicallyScopedIdentifier.name)
}

func (c *Checker) checkPrivateIdentifierPropertyAccess(leftType *Type, right *Node, lexicallyScopedIdentifier *Symbol) bool {
	// Either the identifier could not be looked up in the lexical scope OR the lexically scoped identifier did not exist on the type.
	// Find a private identifier with the same description on the type.
	properties := c.getPropertiesOfType(leftType)
	var propertyOnType *Symbol
	for _, symbol := range properties {
		decl := symbol.valueDeclaration
		if decl != nil && decl.Name() != nil && isPrivateIdentifier(decl.Name()) && decl.Name().Text() == right.Text() {
			propertyOnType = symbol
			break
		}
	}
	diagName := declarationNameToString(right)
	if propertyOnType != nil {
		typeValueDecl := propertyOnType.valueDeclaration
		typeClass := getContainingClass(typeValueDecl)
		// We found a private identifier property with the same description.
		// Either:
		// - There is a lexically scoped private identifier AND it shadows the one we found on the type.
		// - It is an attempt to access the private identifier outside of the class.
		if lexicallyScopedIdentifier != nil && lexicallyScopedIdentifier.valueDeclaration != nil {
			lexicalValueDecl := lexicallyScopedIdentifier.valueDeclaration
			lexicalClass := getContainingClass(lexicalValueDecl)
			if findAncestor(lexicalClass, func(n *Node) bool { return typeClass == n }) != nil {
				diagnostic := c.error(right, diagnostics.The_property_0_cannot_be_accessed_on_type_1_within_this_class_because_it_is_shadowed_by_another_private_identifier_with_the_same_spelling, diagName, c.typeToString(leftType))
				diagnostic.addRelatedInfo(createDiagnosticForNode(lexicalValueDecl, diagnostics.The_shadowing_declaration_of_0_is_defined_here, diagName))
				diagnostic.addRelatedInfo(createDiagnosticForNode(typeValueDecl, diagnostics.The_declaration_of_0_that_you_probably_intended_to_use_is_defined_here, diagName))
				return true
			}
		}
		c.error(right, diagnostics.Property_0_is_not_accessible_outside_class_1_because_it_has_a_private_identifier, diagName, declarationNameToString(typeClass.Name()))
		return true
	}
	return false
}

func (c *Checker) reportNonexistentProperty(propNode *Node, containingType *Type) {
	var errorInfo *MessageChain
	var relatedInfo *Diagnostic
	if !isPrivateIdentifier(propNode) && containingType.flags&TypeFlagsUnion != 0 && containingType.flags&TypeFlagsPrimitive == 0 {
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
					if suggestion.valueDeclaration != nil {
						relatedInfo = createDiagnosticForNode(suggestion.valueDeclaration, diagnostics.X_0_is_declared_here, suggestedName)
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
	resultDiagnostic := NewDiagnosticForNodeFromMessageChain(propNode, errorInfo).addRelatedInfo(relatedInfo)
	c.diagnostics.add(resultDiagnostic)
}

func (c *Checker) getSuggestedLibForNonExistentProperty(missingProperty string, containingType *Type) string {
	return "" // !!!
}

func (c *Checker) getSuggestedSymbolForNonexistentProperty(name *Node, containingType *Type) *Symbol {
	return nil // !!!
}

func (c *Checker) containerSeemsToBeEmptyDomElement(containingType *Type) bool {
	return false // !!!
}

func (c *Checker) checkAndReportErrorForExtendingInterface(errorLocation *Node) bool {
	expression := c.getEntityNameForExtendingInterface(errorLocation)
	if expression != nil && c.resolveEntityName(expression, SymbolFlagsInterface, true /*ignoreErrors*/, false, nil) != nil {
		c.error(errorLocation, diagnostics.Cannot_extend_an_interface_0_Did_you_mean_implements, getTextOfNode(expression))
		return true
	}
	return false
}

/**
 * Climbs up parents to an ExpressionWithTypeArguments, and returns its expression,
 * but returns undefined if that expression is not an EntityNameExpression.
 */
func (c *Checker) getEntityNameForExtendingInterface(node *Node) *Node {
	switch node.kind {
	case SyntaxKindIdentifier, SyntaxKindPropertyAccessExpression:
		if node.parent != nil {
			return c.getEntityNameForExtendingInterface(node.parent)
		}
	case SyntaxKindExpressionWithTypeArguments:
		if isEntityNameExpression(node.Expression()) {
			return node.Expression()
		}
	}
	return nil
}

func (c *Checker) isUncalledFunctionReference(node *Node, symbol *Symbol) bool {
	if symbol.flags&(SymbolFlagsFunction|SymbolFlagsMethod) != 0 {
		parent := findAncestor(node.parent, func(n *Node) bool { return !isAccessExpression(n) })
		if parent == nil {
			parent = node.parent
		}
		if isCallLikeExpression(parent) {
			return isCallOrNewExpression(parent) && isIdentifier(node) && c.hasMatchingArgument(parent, node)
		}
		return core.Every(symbol.declarations, func(d *Node) bool {
			return !isFunctionLike(d) || c.isDeprecatedDeclaration(d)
		})
	}
	return true
}

func (c *Checker) hasMatchingArgument(expression *Node, reference *Node) bool {
	return false // !!!
}

func (c *Checker) checkPropertyNotUsedBeforeDeclaration(prop *Symbol, node *Node, right *Node) {
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
func (c *Checker) checkPropertyAccessibility(node *Node, isSuper bool, writing bool, t *Type, prop *Symbol) bool {
	return c.checkPropertyAccessibilityEx(node, isSuper, writing, t, prop, true /*reportError*/)
}

func (c *Checker) checkPropertyAccessibilityEx(node *Node, isSuper bool, writing bool, t *Type, prop *Symbol, reportError bool /*  = true */) bool {
	var errorNode *Node
	if reportError {
		switch node.kind {
		case SyntaxKindPropertyAccessExpression:
			errorNode = node.AsPropertyAccessExpression().name
		case SyntaxKindQualifiedName:
			errorNode = node.AsQualifiedName().right
		case SyntaxKindImportType:
			errorNode = node
		case SyntaxKindBindingElement:
			errorNode = node.AsBindingElement().propertyName
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
func (c *Checker) checkPropertyAccessibilityAtLocation(location *Node, isSuper bool, writing bool, containingType *Type, prop *Symbol, errorNode *Node) bool {
	flags := getDeclarationModifierFlagsFromSymbolEx(prop, writing)
	if isSuper {
		// TS 1.0 spec (April 2014): 4.8.2
		// - In a constructor, instance member function, instance member accessor, or
		//   instance member variable initializer where this references a derived class instance,
		//   a super property access is permitted and must specify a public instance member function of the base class.
		// - In a static member function or static member accessor
		//   where this references the constructor function object of a derived class,
		//   a super property access is permitted and must specify a public static member function of the base class.
		if c.languageVersion < ScriptTargetES2015 {
			if c.symbolHasNonMethodDeclaration(prop) {
				if errorNode != nil {
					c.error(errorNode, diagnostics.Only_public_and_protected_methods_of_the_base_class_are_accessible_via_the_super_keyword)
				}
				return false
			}
		}
		if flags&ModifierFlagsAbstract != 0 {
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
		if flags&ModifierFlagsStatic == 0 && core.Some(prop.declarations, isClassInstanceProperty) {
			if errorNode != nil {
				c.error(errorNode, diagnostics.Class_field_0_defined_by_the_parent_class_is_not_accessible_in_the_child_class_via_super, c.symbolToString(prop))
			}
			return false
		}
	}
	// Referencing abstract properties within their own constructors is not allowed
	if flags&ModifierFlagsAbstract != 0 && c.symbolHasNonMethodDeclaration(prop) && (isThisProperty(location) ||
		isThisInitializedObjectBindingExpression(location) ||
		isObjectBindingPattern(location.parent) && isThisInitializedDeclaration(location.parent.parent)) {
		declaringClassDeclaration := getClassLikeDeclarationOfSymbol(c.getParentOfSymbol(prop))
		if declaringClassDeclaration != nil && c.isNodeUsedDuringClassInitialization(location) {
			if errorNode != nil {
				c.error(errorNode, diagnostics.Abstract_property_0_in_class_1_cannot_be_accessed_in_the_constructor, c.symbolToString(prop), declaringClassDeclaration.Name().Text())
			}
			return false
		}
	}
	// Public properties are otherwise accessible.
	if flags&ModifierFlagsNonPublicAccessibilityModifier == 0 {
		return true
	}
	// Property is known to be private or protected at this point
	// Private property is accessible if the property is within the declaring class
	if flags&ModifierFlagsPrivate != 0 {
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
		if flags&ModifierFlagsStatic != 0 || enclosingClass == nil {
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
	if flags&ModifierFlagsStatic != 0 {
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

func (c *Checker) symbolHasNonMethodDeclaration(symbol *Symbol) bool {
	return c.forEachProperty(symbol, func(prop *Symbol) bool { return prop.flags&SymbolFlagsMethod == 0 })
}

// Invoke the callback for each underlying property symbol of the given symbol and return the first
// value that isn't undefined.
func (c *Checker) forEachProperty(prop *Symbol, callback func(p *Symbol) bool) bool {
	if prop.checkFlags&CheckFlagsSynthetic == 0 {
		return callback(prop)
	}
	for _, t := range c.valueSymbolLinks.get(prop).containingType.Types() {
		p := c.getPropertyOfType(t, prop.name)
		if p != nil && c.forEachProperty(p, callback) {
			return true
		}
	}
	return false
}

// Return the declaring class type of a property or undefined if property not declared in class
func (c *Checker) getDeclaringClass(prop *Symbol) *Type {
	if prop.parent != nil && prop.parent.flags&SymbolFlagsClass != 0 {
		return c.getDeclaredTypeOfSymbol(c.getParentOfSymbol(prop))
	}
	return nil
}

// Return true if source property is a valid override of protected parts of target property.
func (c *Checker) isValidOverrideOf(sourceProp *Symbol, targetProp *Symbol) bool {
	return !c.forEachProperty(targetProp, func(tp *Symbol) bool {
		if getDeclarationModifierFlagsFromSymbol(tp)&ModifierFlagsProtected != 0 {
			return c.isPropertyInClassDerivedFrom(sourceProp, c.getDeclaringClass(tp))
		}
		return false
	})
}

// Return true if some underlying source property is declared in a class that derives
// from the given base class.
func (c *Checker) isPropertyInClassDerivedFrom(prop *Symbol, baseClass *Type) bool {
	return c.forEachProperty(prop, func(sp *Symbol) bool {
		sourceClass := c.getDeclaringClass(sp)
		if sourceClass != nil {
			return c.hasBaseType(sourceClass, baseClass)
		}
		return false
	})
}

func (c *Checker) isNodeUsedDuringClassInitialization(node *Node) bool {
	return findAncestorOrQuit(node, func(element *Node) FindAncestorResult {
		if isConstructorDeclaration(element) && nodeIsPresent(getBodyOfNode(element)) || isPropertyDeclaration(element) {
			return FindAncestorTrue
		} else if isClassLike(element) || isFunctionLikeDeclaration(element) {
			return FindAncestorQuit
		}
		return FindAncestorFalse
	}) != nil
}

func (c *Checker) isNodeWithinClass(node *Node, classDeclaration *Node) bool {
	return c.forEachEnclosingClass(node, func(n *Node) bool { return n == classDeclaration })
}

func (c *Checker) forEachEnclosingClass(node *Node, callback func(node *Node) bool) bool {
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
func (c *Checker) isClassDerivedFromDeclaringClasses(checkClass *Type, prop *Symbol, writing bool) bool {
	return !c.forEachProperty(prop, func(p *Symbol) bool {
		if getDeclarationModifierFlagsFromSymbolEx(p, writing)&ModifierFlagsProtected != 0 {
			return !c.hasBaseType(checkClass, c.getDeclaringClass(p))
		}
		return false
	})
}

func (c *Checker) getEnclosingClassFromThisParameter(node *Node) *Type {
	// 'this' type for a node comes from, in priority order...
	// 1. The type of a syntactic 'this' parameter in the enclosing function scope
	thisParameter := getThisParameterFromNodeContext(node)
	var thisType *Type
	if thisParameter != nil && thisParameter.AsParameterDeclaration().typeNode != nil {
		thisType = c.getTypeFromTypeNode(thisParameter.AsParameterDeclaration().typeNode)
	}
	if thisType != nil {
		// 2. The constraint of a type parameter used for an explicit 'this' parameter
		if thisType.flags&TypeFlagsTypeParameter != 0 {
			thisType = c.getConstraintOfTypeParameter(thisType)
		}
	} else {
		// 3. The 'this' parameter of a contextual type
		thisContainer := getThisContainer(node, false /*includeArrowFunctions*/, false /*includeClassComputedPropertyName*/)
		if isFunctionLike(thisContainer) {
			thisType = c.getContextualThisParameterType(thisContainer)
		}
	}
	if thisType != nil && thisType.objectFlags&(ObjectFlagsClassOrInterface|ObjectFlagsReference) != 0 {
		return getTargetType(thisType)
	}
	return nil
}

func getThisParameterFromNodeContext(node *Node) *Node {
	thisContainer := getThisContainer(node, false /*includeArrowFunctions*/, false /*includeClassComputedPropertyName*/)
	if thisContainer != nil && isFunctionLike(thisContainer) {
		return getThisParameter(thisContainer)
	}
	return nil
}

func (c *Checker) getContextualThisParameterType(fn *Node) *Type {
	return nil // !!!
}

func (c *Checker) checkThisExpression(node *Node) *Type {
	// !!!
	// isNodeInTypeQuery := isInTypeQuery(node)
	// Stop at the first arrow function so that we can
	// tell whether 'this' needs to be captured.
	container := getThisContainer(node, true /*includeArrowFunctions*/, true /*includeClassComputedPropertyName*/)
	capturedByArrowFunction := false
	thisInComputedPropertyName := false
	if isConstructorDeclaration(container) {
		c.checkThisBeforeSuper(node, container, diagnostics.X_super_must_be_called_before_accessing_this_in_the_constructor_of_a_derived_class)
	}
	for {
		// Now skip arrow functions to get the "real" owner of 'this'.
		if isArrowFunction(container) {
			container = getThisContainer(container, false /*includeArrowFunctions*/, !thisInComputedPropertyName)
			capturedByArrowFunction = true
		}
		if isComputedPropertyName(container) {
			container = getThisContainer(container, !capturedByArrowFunction, false /*includeClassComputedPropertyName*/)
			thisInComputedPropertyName = true
			continue
		}
		break
	}
	// !!!
	// c.checkThisInStaticClassFieldInitializerInDecoratedClass(node, container)
	// if thisInComputedPropertyName {
	// 	c.error(node, Diagnostics.this_cannot_be_referenced_in_a_computed_property_name)
	// } else {
	// 	switch container.kind {
	// 	case SyntaxKindModuleDeclaration:
	// 		c.error(node, Diagnostics.this_cannot_be_referenced_in_a_module_or_namespace_body)
	// 		// do not return here so in case if lexical this is captured - it will be reflected in flags on NodeLinks
	// 	case SyntaxKindEnumDeclaration:
	// 		c.error(node, Diagnostics.this_cannot_be_referenced_in_current_location)
	// 		// do not return here so in case if lexical this is captured - it will be reflected in flags on NodeLinks
	// 	}
	// }
	// // When targeting es6, mark that we'll need to capture `this` in its lexically bound scope.
	// if !isNodeInTypeQuery && capturedByArrowFunction && c.languageVersion < ScriptTargetES2015 {
	// 	c.captureLexicalThis(node, container)
	// }
	t := c.tryGetThisTypeAt(node /*includeGlobalThis*/, true, container)
	// !!!
	// if c.noImplicitThis {
	// 	globalThisType := c.getTypeOfSymbol(c.globalThisSymbol)
	// 	if t == globalThisType && capturedByArrowFunction {
	// 		c.error(node, Diagnostics.The_containing_arrow_function_captures_the_global_value_of_this)
	// 	} else if !t {
	// 		// With noImplicitThis, functions may not reference 'this' if it has type 'any'
	// 		diag := c.error(node, Diagnostics.this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation)
	// 		if !isSourceFile(container) {
	// 			outsideThis := c.tryGetThisTypeAt(container)
	// 			if outsideThis && outsideThis != globalThisType {
	// 				addRelatedInfo(diag, createDiagnosticForNode(container, Diagnostics.An_outer_value_of_this_is_shadowed_by_this_container))
	// 			}
	// 		}
	// 	}
	// }
	if t == nil {
		return c.anyType
	}
	return t
}

func (c *Checker) tryGetThisTypeAt(node *Node, includeGlobalThis bool, container *Node) *Type {
	// !!!
	// isInJS := isInJSFile(node)
	// if isFunctionLike(container) && (!c.isInParameterInitializerBeforeContainingFunction(node) || getThisParameter(container)) {
	// 	thisType := c.getThisTypeOfDeclaration(container) || isInJS && c.getTypeForThisExpressionFromJSDoc(container)
	// 	// Note: a parameter initializer should refer to class-this unless function-this is explicitly annotated.
	// 	// If this is a function in a JS file, it might be a class method.
	// 	if !thisType {
	// 		className := c.getClassNameFromPrototypeMethod(container)
	// 		if isInJS && className {
	// 			classSymbol := c.checkExpression(className).symbol
	// 			if classSymbol && classSymbol.members && (classSymbol.flags & SymbolFlagsFunction) {
	// 				thisType = (c.getDeclaredTypeOfSymbol(classSymbol).(InterfaceType)).thisType
	// 			}
	// 		} else if c.isJSConstructor(container) {
	// 			thisType = (c.getDeclaredTypeOfSymbol(c.getMergedSymbol(container.symbol)).(InterfaceType)).thisType
	// 		}
	// 		thisType = thisType || c.getContextualThisParameterType(container)
	// 	}

	// 	if thisType {
	// 		return c.getFlowTypeOfReference(node, thisType)
	// 	}
	// }
	if isClassLike(container.parent) {
		symbol := c.getSymbolOfDeclaration(container.parent)
		var t *Type
		if isStatic(container) {
			t = c.getTypeOfSymbol(symbol)
		} else {
			t = c.getDeclaredTypeOfSymbol(symbol).AsInterfaceType().thisType
		}
		return c.getFlowTypeOfReference(node, t)
	}
	// !!!
	// if isSourceFile(container) {
	// 	// look up in the source file's locals or exports
	// 	if container.commonJsModuleIndicator {
	// 		fileSymbol := c.getSymbolOfDeclaration(container)
	// 		return fileSymbol && c.getTypeOfSymbol(fileSymbol)
	// 	} else if container.externalModuleIndicator {
	// 		// TODO: Maybe issue a better error than 'object is possibly undefined'
	// 		return c.undefinedType
	// 	} else if includeGlobalThis {
	// 		return c.getTypeOfSymbol(c.globalThisSymbol)
	// 	}
	// }
	return nil
}

func (c *Checker) checkThisBeforeSuper(node *Node, container *Node, diagnosticMessage *diagnostics.Message) {
	// !!!
}

func (c *Checker) checkAssertion(node *Node, checkMode CheckMode) *Type {
	typeNode := getEffectiveTypeAnnotationNode(node)
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

func (c *Checker) checkBinaryExpression(node *Node, checkMode CheckMode) *Type {
	binary := node.AsBinaryExpression()
	operator := binary.operatorToken.kind
	if operator == SyntaxKindEqualsToken && (binary.left.kind == SyntaxKindObjectLiteralExpression || binary.left.kind == SyntaxKindArrayLiteralExpression) {
		// !!! Handle destructuring assignment
		return c.checkExpressionEx(binary.right, checkMode)
	}
	leftType := c.checkExpressionEx(binary.left, checkMode)
	rightType := c.checkExpressionEx(binary.right, checkMode)
	switch operator {
	case SyntaxKindEqualsToken:
		c.checkAssignmentOperator(binary.left, binary.right, leftType, rightType, checkMode)
		return rightType
	}
	return c.unknownType
}

func (c *Checker) checkAssignmentOperator(left *Node, right *Node, leftType *Type, rightType *Type, checkMode CheckMode) {
	// !!!
	// assigneeType := leftType
	// // getters can be a subtype of setters, so to check for assignability we use the setter's type instead
	// if isCompoundAssignment(operatorToken.kind) && left.kind == SyntaxKindPropertyAccessExpression {
	// 	assigneeType = c.checkPropertyAccessExpression(left.(PropertyAccessExpression) /*checkMode*/, nil /*writeOnly*/, true)
	// }
	if c.checkReferenceExpression(left, diagnostics.The_left_hand_side_of_an_assignment_expression_must_be_a_variable_or_a_property_access, diagnostics.The_left_hand_side_of_an_assignment_expression_may_not_be_an_optional_property_access) {
		var headMessage *diagnostics.Message
		if c.exactOptionalPropertyTypes && isPropertyAccessExpression(left) && c.maybeTypeOfKind(rightType, TypeFlagsUndefined) {
			target := c.getTypeOfPropertyOfType(c.getTypeOfExpression(left.Expression()), left.Name().Text())
			if c.isExactOptionalPropertyMismatch(rightType, target) {
				headMessage = diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_type_of_the_target
			}
		}
		// to avoid cascading errors check assignability only if 'isReference' check succeeded and no errors were reported
		c.checkTypeAssignableToAndOptionallyElaborate(rightType, leftType, left, right, headMessage, nil)
	}
}

func (c *Checker) isExactOptionalPropertyMismatch(source *Type, target *Type) bool {
	return source != nil && target != nil && c.maybeTypeOfKind(source, TypeFlagsUndefined) && !!c.containsMissingType(target)
}

func (c *Checker) checkReferenceExpression(expr *Node, invalidReferenceMessage *diagnostics.Message, invalidOptionalChainMessage *diagnostics.Message) bool {
	// References are combinations of identifiers, parentheses, and property accesses.
	node := skipOuterExpressions(expr, OEKAssertions|OEKParentheses)
	if node.kind != SyntaxKindIdentifier && !isAccessExpression(node) {
		c.error(expr, invalidReferenceMessage)
		return false
	}
	if node.flags&NodeFlagsOptionalChain != 0 {
		c.error(expr, invalidOptionalChainMessage)
		return false
	}
	return true
}

func (c *Checker) checkObjectLiteral(node *Node, checkMode CheckMode) *Type {
	inDestructuringPattern := isAssignmentTarget(node)
	// !!!
	// // Grammar checking
	// c.checkGrammarObjectLiteralExpression(node, inDestructuringPattern)
	var allPropertiesTable SymbolTable
	if c.strictNullChecks {
		allPropertiesTable = make(SymbolTable)
	}
	propertiesTable := make(SymbolTable)
	var propertiesArray []*Symbol
	spread := c.emptyObjectType
	c.pushCachedContextualType(node)
	contextualType := c.getApparentTypeOfContextualType(node, ContextFlagsNone)
	var contextualTypeHasPattern bool
	if contextualType != nil {
		if pattern := c.patternForType[contextualType]; pattern != nil && (isObjectBindingPattern(pattern) || isObjectLiteralExpression(pattern)) {
			contextualTypeHasPattern = true
		}
	}
	inConstContext := c.isConstContext(node)
	var checkFlags CheckFlags
	if inConstContext {
		checkFlags = CheckFlagsReadonly
	}
	objectFlags := ObjectFlagsFreshLiteral
	patternWithComputedProperties := false
	hasComputedStringProperty := false
	hasComputedNumberProperty := false
	hasComputedSymbolProperty := false
	// Spreads may cause an early bail; ensure computed names are always checked (this is cached)
	// As otherwise they may not be checked until exports for the type at this position are retrieved,
	// which may never occur.
	for _, elem := range node.AsObjectLiteralExpression().properties {
		if elem.Name() != nil && isComputedPropertyName(elem.Name()) {
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
	for _, memberDecl := range node.AsObjectLiteralExpression().properties {
		member := c.getSymbolOfDeclaration(memberDecl)
		var computedNameType *Type
		if memberDecl.Name() != nil && memberDecl.Name().kind == SyntaxKindComputedPropertyName {
			computedNameType = c.checkComputedPropertyName(memberDecl.Name())
		}
		if isPropertyAssignment(memberDecl) || isShorthandPropertyAssignment(memberDecl) || isObjectLiteralMethod(memberDecl) {
			var t *Type
			switch {
			case memberDecl.kind == SyntaxKindPropertyAssignment:
				t = c.checkPropertyAssignment(memberDecl, checkMode)
			case memberDecl.kind == SyntaxKindShorthandPropertyAssignment:
				var expr *Node
				if !inDestructuringPattern {
					expr = memberDecl.AsShorthandPropertyAssignment().objectAssignmentInitializer
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
			var prop *Symbol
			if nameType != nil {
				prop = c.newSymbolEx(SymbolFlagsProperty|member.flags, getPropertyNameFromType(nameType), checkFlags|CheckFlagsLate)
			} else {
				prop = c.newSymbolEx(SymbolFlagsProperty|member.flags, member.name, checkFlags)
			}
			links := c.valueSymbolLinks.get(prop)
			if nameType != nil {
				links.nameType = nameType
			}
			if inDestructuringPattern && c.hasDefaultValue(memberDecl) {
				// If object literal is an assignment pattern and if the assignment pattern specifies a default value
				// for the property, make the property optional.
				prop.flags |= SymbolFlagsOptional
			} else if contextualTypeHasPattern && contextualType.objectFlags&ObjectFlagsObjectLiteralPatternWithComputedProperties == 0 {
				// If object literal is contextually typed by the implied type of a binding pattern, and if the
				// binding pattern specifies a default value for the property, make the property optional.
				impliedProp := c.getPropertyOfType(contextualType, member.name)
				if impliedProp != nil {
					prop.flags |= impliedProp.flags & SymbolFlagsOptional
				} else if c.getIndexInfoOfType(contextualType, c.stringType) == nil {
					c.error(memberDecl.Name(), diagnostics.Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1, c.symbolToString(member), c.typeToString(contextualType))
				}
			}
			prop.declarations = member.declarations
			prop.parent = member.parent
			prop.valueDeclaration = member.valueDeclaration
			links.resolvedType = t
			links.target = member
			member = prop
			if allPropertiesTable != nil {
				allPropertiesTable[prop.name] = prop
			}
			if contextualType != nil && checkMode&CheckModeInferential != 0 && checkMode&CheckModeSkipContextSensitive == 0 && (isPropertyAssignment(memberDecl) || isMethodDeclaration(memberDecl)) && c.isContextSensitive(memberDecl) {
				// !!!
				// inferenceContext := c.getInferenceContext(node)
				// Debug.assert(inferenceContext)
				// // In CheckMode.Inferential we should always have an inference context
				// var inferenceNode /* TODO(TS-TO-GO) inferred type Expression | MethodDeclaration */ any
				// if memberDecl.kind == SyntaxKindPropertyAssignment {
				// 	inferenceNode = memberDecl.initializer
				// } else {
				// 	inferenceNode = memberDecl
				// }
				// c.addIntraExpressionInferenceSite(inferenceContext, inferenceNode, t)
			}
		} else if memberDecl.kind == SyntaxKindSpreadAssignment {
			if len(propertiesArray) > 0 {
				spread = c.getSpreadType(spread, createObjectLiteralType(), node.Symbol(), objectFlags, inConstContext)
				propertiesArray = nil
				propertiesTable = make(SymbolTable)
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
			// Debug.assert(memberDecl.kind == SyntaxKindGetAccessor || memberDecl.kind == SyntaxKindSetAccessor)
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
			propertiesTable[member.name] = member
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
			propertiesTable = make(SymbolTable)
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

func (c *Checker) checkSpreadPropOverrides(t *Type, props SymbolTable, spread *Node) {
	for _, right := range c.getPropertiesOfType(t) {
		if right.flags&SymbolFlagsOptional == 0 {
			if left := props[right.name]; left != nil {
				diagnostic := c.error(left.valueDeclaration, diagnostics.X_0_is_specified_more_than_once_so_this_usage_will_be_overwritten, left.name)
				diagnostic.addRelatedInfo(NewDiagnosticForNode(spread, diagnostics.This_spread_always_overwrites_this_property))
			}
		}
	}
}

/**
 * Since the source of spread types are object literals, which are not binary,
 * this function should be called in a left folding style, with left = previous result of getSpreadType
 * and right = the new element to be spread.
 */
func (c *Checker) getSpreadType(left *Type, right *Type, symbol *Symbol, objectFlags ObjectFlags, readonly bool) *Type {
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
	members := make(SymbolTable)
	var skippedPrivateMembers set[string]
	var indexInfos []*IndexInfo
	if left == c.emptyObjectType {
		indexInfos = c.getIndexInfosOfType(right)
	} else {
		indexInfos = c.getUnionIndexInfos([]*Type{left, right})
	}
	for _, rightProp := range c.getPropertiesOfType(right) {
		if getDeclarationModifierFlagsFromSymbol(rightProp)&(ModifierFlagsPrivate|ModifierFlagsProtected) != 0 {
			skippedPrivateMembers.add(rightProp.name)
		} else if c.isSpreadableProperty(rightProp) {
			members[rightProp.name] = c.getSpreadSymbol(rightProp, readonly)
		}
	}

	for _, leftProp := range c.getPropertiesOfType(left) {
		if skippedPrivateMembers.has(leftProp.name) || !c.isSpreadableProperty(leftProp) {
			continue
		}
		if members[leftProp.name] != nil {
			rightProp := members[leftProp.name]
			rightType := c.getTypeOfSymbol(rightProp)
			if rightProp.flags&SymbolFlagsOptional != 0 {
				declarations := core.Concatenate(leftProp.declarations, rightProp.declarations)
				flags := SymbolFlagsProperty | (leftProp.flags & SymbolFlagsOptional)
				result := c.newSymbol(flags, leftProp.name)
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
				result.declarations = declarations
				links.nameType = c.valueSymbolLinks.get(leftProp).nameType
				members[leftProp.name] = result
			}
		} else {
			members[leftProp.name] = c.getSpreadSymbol(leftProp, readonly)
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
	members := make(SymbolTable)
	for _, prop := range c.getPropertiesOfType(firstType) {
		if getDeclarationModifierFlagsFromSymbol(prop)&(ModifierFlagsPrivate|ModifierFlagsProtected) != 0 {
			// do nothing, skip privates
		} else if c.isSpreadableProperty(prop) {
			isSetonlyAccessor := prop.flags&SymbolFlagsSetAccessor != 0 && prop.flags&SymbolFlagsGetAccessor == 0
			flags := SymbolFlagsProperty | SymbolFlagsOptional
			result := c.newSymbolEx(flags, prop.name, prop.checkFlags&CheckFlagsLate|(ifElse(readonly, CheckFlagsReadonly, 0)))
			links := c.valueSymbolLinks.get(result)
			if isSetonlyAccessor {
				links.resolvedType = c.undefinedType
			} else {
				links.resolvedType = c.addOptionalityEx(c.getTypeOfSymbol(prop), true /*isProperty*/, true /*isOptional*/)
			}
			result.declarations = prop.declarations
			links.nameType = c.valueSymbolLinks.get(prop).nameType
			// !!!
			// links.syntheticOrigin = prop
			members[prop.name] = result
		}
	}
	spread := c.newAnonymousType(firstType.symbol, members, nil, nil, c.getIndexInfosOfType(firstType))
	spread.objectFlags |= ObjectFlagsObjectLiteral | ObjectFlagsContainsObjectOrArrayLiteral
	return spread
}

// We approximate own properties as non-methods plus methods that are inside the object literal
func (c *Checker) isSpreadableProperty(prop *Symbol) bool {
	return !core.Some(prop.declarations, isPrivateIdentifierClassElementDeclaration) && prop.flags&(SymbolFlagsMethod|SymbolFlagsGetAccessor|SymbolFlagsSetAccessor) == 0 ||
		!core.Some(prop.declarations, func(d *Node) bool { return isClassLike(d.parent) })
}

func (c *Checker) getSpreadSymbol(prop *Symbol, readonly bool) *Symbol {
	isSetonlyAccessor := prop.flags&SymbolFlagsSetAccessor != 0 && prop.flags&SymbolFlagsGetAccessor == 0
	if !isSetonlyAccessor && readonly == c.isReadonlySymbol(prop) {
		return prop
	}
	flags := SymbolFlagsProperty | (prop.flags & SymbolFlagsOptional)
	result := c.newSymbolEx(flags, prop.name, prop.checkFlags&CheckFlagsLate|(ifElse(readonly, CheckFlagsReadonly, 0)))
	links := c.valueSymbolLinks.get(result)
	if isSetonlyAccessor {
		links.resolvedType = c.undefinedType
	} else {
		links.resolvedType = c.getTypeOfSymbol(prop)
	}
	result.declarations = prop.declarations
	links.nameType = c.valueSymbolLinks.get(prop).nameType
	// !!!
	// result.links.syntheticOrigin = prop
	return result
}

func (c *Checker) isEmptyObjectTypeOrSpreadsIntoEmptyObject(t *Type) bool {
	return c.isEmptyObjectType(t) || t.flags&(TypeFlagsNull|TypeFlagsUndefined|TypeFlagsBooleanLike|TypeFlagsNumberLike|TypeFlagsBigIntLike|TypeFlagsStringLike|TypeFlagsEnumLike|TypeFlagsNonPrimitive|TypeFlagsIndex) != 0
}

func (c *Checker) hasDefaultValue(node *Node) bool {
	return isBindingElement(node) && node.AsBindingElement().initializer != nil ||
		isPropertyAssignment(node) && c.hasDefaultValue(node.AsPropertyAssignment().initializer) ||
		isShorthandPropertyAssignment(node) && node.AsShorthandPropertyAssignment().objectAssignmentInitializer != nil ||
		isBinaryExpression(node) && node.AsBinaryExpression().operatorToken.kind == SyntaxKindEqualsToken
}

func (c *Checker) isConstContext(node *Node) bool {
	parent := node.parent
	return isConstAssertion(parent) ||
		c.isValidConstAssertionArgument(node) && c.isConstTypeVariable(c.getContextualType(node, ContextFlagsNone), 0) ||
		(isParenthesizedExpression(parent) || isArrayLiteralExpression(parent) || isSpreadElement(parent)) && c.isConstContext(parent) ||
		(isPropertyAssignment(parent) || isShorthandPropertyAssignment(parent) || isTemplateSpan(parent)) && c.isConstContext(parent.parent)
}

func (c *Checker) isValidConstAssertionArgument(node *Node) bool {
	switch node.kind {
	case SyntaxKindStringLiteral, SyntaxKindNoSubstitutionTemplateLiteral, SyntaxKindNumericLiteral, SyntaxKindBigIntLiteral, SyntaxKindTrueKeyword,
		SyntaxKindFalseKeyword, SyntaxKindArrayLiteralExpression, SyntaxKindObjectLiteralExpression, SyntaxKindTemplateExpression:
		return true
	case SyntaxKindParenthesizedExpression:
		return c.isValidConstAssertionArgument(node.Expression())
	case SyntaxKindPrefixUnaryExpression:
		op := node.AsPrefixUnaryExpression().operator
		arg := node.AsPrefixUnaryExpression().operand
		return op == SyntaxKindMinusToken && (arg.kind == SyntaxKindNumericLiteral || arg.kind == SyntaxKindBigIntLiteral) || op == SyntaxKindPlusToken && arg.kind == SyntaxKindNumericLiteral
	case SyntaxKindPropertyAccessExpression, SyntaxKindElementAccessExpression:
		expr := skipParentheses(node.Expression())
		var symbol *Symbol
		if isEntityNameExpression(expr) {
			symbol = c.resolveEntityName(expr, SymbolFlagsValue, true /*ignoreErrors*/, false, nil)
		}
		return symbol != nil && symbol.flags&SymbolFlagsEnum != 0
	}
	return false
}

func (c *Checker) isConstTypeVariable(t *Type, depth int) bool {
	if depth >= 5 || t == nil {
		return false
	}
	switch {
	case t.flags&TypeFlagsTypeParameter != 0:
		return t.symbol != nil && core.Some(t.symbol.declarations, func(d *Node) bool { return hasSyntacticModifier(d, ModifierFlagsConst) })
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

func (c *Checker) checkPropertyAssignment(node *Node, checkMode CheckMode) *Type {
	// Do not use hasDynamicName here, because that returns false for well known symbols.
	// We want to perform checkComputedPropertyName for all computed properties, including
	// well known symbols.
	// !!!
	// if node.name.kind == SyntaxKindComputedPropertyName {
	// 	c.checkComputedPropertyName(node.name)
	// }
	return c.checkExpressionForMutableLocation(node.AsPropertyAssignment().initializer, checkMode)
}

func (c *Checker) isInPropertyInitializerOrClassStaticBlock(node *Node) bool {
	return findAncestorOrQuit(node, func(node *Node) FindAncestorResult {
		switch node.kind {
		case SyntaxKindPropertyDeclaration:
			return FindAncestorTrue
		case SyntaxKindPropertyAssignment, SyntaxKindMethodDeclaration, SyntaxKindGetAccessor, SyntaxKindSetAccessor, SyntaxKindSpreadAssignment,
			SyntaxKindComputedPropertyName, SyntaxKindTemplateSpan, SyntaxKindJsxExpression, SyntaxKindJsxAttribute, SyntaxKindJsxAttributes,
			SyntaxKindJsxSpreadAttribute, SyntaxKindJsxOpeningElement, SyntaxKindExpressionWithTypeArguments, SyntaxKindHeritageClause:
			return FindAncestorFalse
		case SyntaxKindArrowFunction, SyntaxKindExpressionStatement:
			if isBlock(node.parent) && isClassStaticBlockDeclaration(node.parent.parent) {
				return FindAncestorTrue
			}
			return FindAncestorQuit
		default:
			if isExpressionNode(node) {
				return FindAncestorFalse
			}
			return FindAncestorQuit
		}
	}) != nil
}

func (c *Checker) getNarrowedTypeOfSymbol(symbol *Symbol, location *Node) *Type {
	return c.getTypeOfSymbol(symbol) // !!!
}

func (c *Checker) isReadonlySymbol(symbol *Symbol) bool {
	// The following symbols are considered read-only:
	// Properties with a 'readonly' modifier
	// Variables declared with 'const'
	// Get accessors without matching set accessors
	// Enum members
	// Object.defineProperty assignments with writable false or no setter
	// Unions and intersections of the above (unions and intersections eagerly set isReadonly on creation)
	return symbol.checkFlags&CheckFlagsReadonly != 0 ||
		symbol.flags&SymbolFlagsProperty != 0 && getDeclarationModifierFlagsFromSymbol(symbol)&ModifierFlagsReadonly != 0 ||
		symbol.flags&SymbolFlagsVariable != 0 && c.getDeclarationNodeFlagsFromSymbol(symbol)&NodeFlagsConstant != 0 ||
		symbol.flags&SymbolFlagsAccessor != 0 && symbol.flags&SymbolFlagsSetAccessor == 0 ||
		symbol.flags&SymbolFlagsEnumMember != 0
}

func (c *Checker) checkObjectLiteralMethod(node *Node, checkMode CheckMode) *Type {
	return c.anyType // !!!
}

func (c *Checker) checkJsxAttribute(node *JsxAttribute, checkMode CheckMode) *Type {
	return c.anyType // !!!
}

func (c *Checker) checkExpressionForMutableLocation(node *Node, checkMode CheckMode) *Type {
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

func (c *Checker) getResolvedSymbol(node *Node) *Symbol {
	if symbol := c.identifierSymbols[node]; symbol != nil {
		return symbol
	}
	var symbol *Symbol
	if !nodeIsMissing(node) {
		symbol = c.resolveName(node, node.AsIdentifier().text, SymbolFlagsValue|SymbolFlagsExportValue,
			c.getCannotFindNameDiagnosticForName(node), !isWriteOnlyAccess(node), false /*excludeGlobals*/)
	}
	if symbol == nil {
		symbol = c.unknownSymbol
	}
	c.identifierSymbols[node] = symbol
	return symbol
}

func (c *Checker) getCannotFindNameDiagnosticForName(node *Node) *diagnostics.Message {
	switch node.AsIdentifier().text {
	case "document", "console":
		return diagnostics.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_include_dom
	case "$":
		return ifElse(c.compilerOptions.Types != nil,
			diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery_and_then_add_jquery_to_the_types_field_in_your_tsconfig,
			diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery)
	case "describe", "suite", "it", "test":
		return ifElse(c.compilerOptions.Types != nil,
			diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha_and_then_add_jest_or_mocha_to_the_types_field_in_your_tsconfig,
			diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha)
	case "process", "require", "Buffer", "module":
		return ifElse(c.compilerOptions.Types != nil,
			diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode_and_then_add_node_to_the_types_field_in_your_tsconfig,
			diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode)
	case "Bun":
		return ifElse(c.compilerOptions.Types != nil,
			diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_Bun_Try_npm_i_save_dev_types_Slashbun_and_then_add_bun_to_the_types_field_in_your_tsconfig,
			diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_Bun_Try_npm_i_save_dev_types_Slashbun)
	case "Map", "Set", "Promise", "Symbol", "WeakMap", "WeakSet", "Iterator", "AsyncIterator", "SharedArrayBuffer", "Atomics", "AsyncIterable",
		"AsyncIterableIterator", "AsyncGenerator", "AsyncGeneratorFunction", "BigInt", "Reflect", "BigInt64Array", "BigUint64Array":
		return diagnostics.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_1_or_later
	case "await":
		if isCallExpression(node.parent) {
			return diagnostics.Cannot_find_name_0_Did_you_mean_to_write_this_in_an_async_function
		}
		fallthrough
	default:
		if node.parent.kind == SyntaxKindShorthandPropertyAssignment {
			return diagnostics.No_value_exists_in_scope_for_the_shorthand_property_0_Either_declare_one_or_provide_an_initializer
		}
		return diagnostics.Cannot_find_name_0
	}
}

func (c *Checker) isReachableFlowNode(flowNode *FlowNode) bool {
	return true // !!!
}

func (c *Checker) GetDiagnostics(sourceFile *SourceFile) []*Diagnostic {
	if sourceFile != nil {
		c.checkSourceFile(sourceFile)
		return c.diagnostics.GetDiagnosticsForFile(sourceFile.fileName)
	}
	for _, file := range c.files {
		c.checkSourceFile(file)
	}
	return c.diagnostics.GetDiagnostics()
}

func (c *Checker) GetGlobalDiagnostics() []*Diagnostic {
	return c.diagnostics.GetGlobalDiagnostics()
}

func (c *Checker) error(location *Node, message *diagnostics.Message, args ...any) *Diagnostic {
	diagnostic := NewDiagnosticForNode(location, message, args...)
	c.diagnostics.add(diagnostic)
	return diagnostic
}

func (c *Checker) errorOrSuggestion(isError bool, location *Node, message *diagnostics.Message, args ...any) {
	c.addErrorOrSuggestion(isError, NewDiagnosticForNode(location, message, args...))
}

func (c *Checker) addErrorOrSuggestion(isError bool, diagnostic *Diagnostic) {
	if isError {
		c.diagnostics.add(diagnostic)
	} else {
		suggestion := *diagnostic
		suggestion.category = diagnostics.CategorySuggestion
		c.suggestionDiagnostics.add(&suggestion)
	}
}

func (c *Checker) isDeprecatedDeclaration(declaration *Node) bool {
	return c.getCombinedNodeFlagsCached(declaration)&NodeFlagsDeprecated != 0
}

func (c *Checker) addDeprecatedSuggestion(location *Node, declarations []*Node, deprecatedEntity string) *Diagnostic {
	diagnostic := NewDiagnosticForNode(location, diagnostics.X_0_is_deprecated, deprecatedEntity)
	return c.addDeprecatedSuggestionWorker(declarations, diagnostic)
}

func (c *Checker) addDeprecatedSuggestionWorker(declarations []*Node, diagnostic *Diagnostic) *Diagnostic {
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

func (c *Checker) isDeprecatedSymbol(symbol *Symbol) bool {
	parentSymbol := c.getParentOfSymbol(symbol)
	if parentSymbol != nil && len(symbol.declarations) > 1 {
		if parentSymbol.flags&SymbolFlagsInterface != 0 {
			return core.Some(symbol.declarations, c.isDeprecatedDeclaration)
		} else {
			return core.Every(symbol.declarations, c.isDeprecatedDeclaration)
		}
	}
	return symbol.valueDeclaration != nil && c.isDeprecatedDeclaration(symbol.valueDeclaration) || len(symbol.declarations) != 0 && core.Every(symbol.declarations, c.isDeprecatedDeclaration)
}

func (c *Checker) grammarErrorOnNode(node *Node, message *diagnostics.Message, args ...any) bool {
	sourceFile := getSourceFileOfNode(node)
	if !c.hasParseDiagnostics(sourceFile) {
		c.diagnostics.add(NewDiagnosticForNode(node, message, args...))
		return true
	}
	return false
}

func (c *Checker) hasParseDiagnostics(sourceFile *SourceFile) bool {
	return len(sourceFile.diagnostics) > 0
}

func (c *Checker) newSymbol(flags SymbolFlags, name string) *Symbol {
	c.symbolCount++
	result := c.symbolPool.New()
	result.flags = flags | SymbolFlagsTransient
	result.name = name
	return result
}

func (c *Checker) newSymbolEx(flags SymbolFlags, name string, checkFlags CheckFlags) *Symbol {
	result := c.newSymbol(flags, name)
	result.checkFlags = checkFlags
	return result
}

func (c *Checker) mergeSymbolTable(target SymbolTable, source SymbolTable, unidirectional bool, mergedParent *Symbol) {
	for id, sourceSymbol := range source {
		targetSymbol := target[id]
		var merged *Symbol
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
			merged.parent = mergedParent
		}
		target[id] = merged
	}
}

/**
 * Note: if target is transient, then it is mutable, and mergeSymbol with both mutate and return it.
 * If target is not transient, mergeSymbol will produce a transient clone, mutate that and return it.
 */
func (c *Checker) mergeSymbol(target *Symbol, source *Symbol, unidirectional bool) *Symbol {
	if target.flags&getExcludedSymbolFlags(source.flags) == 0 || (source.flags|target.flags)&SymbolFlagsAssignment != 0 {
		if source == target {
			// This can happen when an export assigned namespace exports something also erroneously exported at the top level
			// See `declarationFileNoCrashOnExtraExportModifier` for an example
			return target
		}
		if target.flags&SymbolFlagsTransient == 0 {
			resolvedTarget := c.resolveSymbol(target)
			if resolvedTarget == c.unknownSymbol {
				return source
			}
			if resolvedTarget.flags&getExcludedSymbolFlags(source.flags) == 0 || (source.flags|resolvedTarget.flags)&SymbolFlagsAssignment != 0 {
				target = c.cloneSymbol(resolvedTarget)
			} else {
				c.reportMergeSymbolError(target, source)
				return source
			}
		}
		// Javascript static-property-assignment declarations always merge, even though they are also values
		if source.flags&SymbolFlagsValueModule != 0 && target.flags&SymbolFlagsValueModule != 0 && target.constEnumOnlyModule && !source.constEnumOnlyModule {
			// reset flag when merging instantiated module into value module that has only const enums
			target.constEnumOnlyModule = false
		}
		target.flags |= source.flags
		if source.valueDeclaration != nil {
			setValueDeclaration(target, source.valueDeclaration)
		}
		target.declarations = append(target.declarations, source.declarations...)
		if source.members != nil {
			c.mergeSymbolTable(getSymbolTable(&target.members), source.members, unidirectional, nil)
		}
		if source.exports != nil {
			c.mergeSymbolTable(getSymbolTable(&target.exports), source.exports, unidirectional, target)
		}
		if !unidirectional {
			c.recordMergedSymbol(target, source)
		}
	} else if target.flags&SymbolFlagsNamespaceModule != 0 {
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

func (c *Checker) reportMergeSymbolError(target *Symbol, source *Symbol) {
	isEitherEnum := target.flags&SymbolFlagsEnum != 0 || source.flags&SymbolFlagsEnum != 0
	isEitherBlockScoped := target.flags&SymbolFlagsBlockScopedVariable != 0 || source.flags&SymbolFlagsBlockScopedVariable != 0
	var message *diagnostics.Message
	switch {
	case isEitherEnum:
		message = diagnostics.Enum_declarations_can_only_merge_with_namespace_or_other_enum_declarations
	case isEitherBlockScoped:
		message = diagnostics.Cannot_redeclare_block_scoped_variable_0
	default:
		message = diagnostics.Duplicate_identifier_0
	}
	// sourceSymbolFile := getSourceFileOfNode(getFirstDeclaration(source))
	// targetSymbolFile := getSourceFileOfNode(getFirstDeclaration(target))
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

func (c *Checker) addDuplicateDeclarationErrorsForSymbols(target *Symbol, message *diagnostics.Message, symbolName string, source *Symbol) {
	for _, node := range target.declarations {
		c.addDuplicateDeclarationError(node, message, symbolName, source.declarations)
	}
}

func (c *Checker) addDuplicateDeclarationError(node *Node, message *diagnostics.Message, symbolName string, relatedNodes []*Node) {
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
		if len(err.relatedInformation) >= 5 || core.Some(err.relatedInformation, func(d *Diagnostic) bool {
			return CompareDiagnostics(d, followOnMessage) == 0 || CompareDiagnostics(d, leadingMessage) == 0
		}) {
			continue
		}
		if len(err.relatedInformation) == 0 {
			err.addRelatedInfo(leadingMessage)
		} else {
			err.addRelatedInfo(followOnMessage)
		}
	}
}

func createDiagnosticForNode(node *Node, message *diagnostics.Message, args ...any) *Diagnostic {
	return NewDiagnosticForNode(node, message, args...)
}

func getAdjustedNodeForError(node *Node) *Node {
	name := getNameOfDeclaration(node)
	if name != nil {
		return name
	}
	return node
}

func (c *Checker) lookupOrIssueError(location *Node, message *diagnostics.Message, args ...any) *Diagnostic {
	var file *SourceFile
	var loc TextRange
	if location != nil {
		file = getSourceFileOfNode(location)
		loc = location.loc
	}
	diagnostic := NewDiagnostic(file, loc, message, args...)
	existing := c.diagnostics.lookup(diagnostic)
	if existing != nil {
		return existing
	}
	c.diagnostics.add(diagnostic)
	return diagnostic
}

func getFirstDeclaration(symbol *Symbol) *Node {
	if len(symbol.declarations) > 0 {
		return symbol.declarations[0]
	}
	return nil
}

func getExcludedSymbolFlags(flags SymbolFlags) SymbolFlags {
	var result SymbolFlags
	if flags&SymbolFlagsBlockScopedVariable != 0 {
		result |= SymbolFlagsBlockScopedVariableExcludes
	}
	if flags&SymbolFlagsFunctionScopedVariable != 0 {
		result |= SymbolFlagsFunctionScopedVariableExcludes
	}
	if flags&SymbolFlagsProperty != 0 {
		result |= SymbolFlagsPropertyExcludes
	}
	if flags&SymbolFlagsEnumMember != 0 {
		result |= SymbolFlagsEnumMemberExcludes
	}
	if flags&SymbolFlagsFunction != 0 {
		result |= SymbolFlagsFunctionExcludes
	}
	if flags&SymbolFlagsClass != 0 {
		result |= SymbolFlagsClassExcludes
	}
	if flags&SymbolFlagsInterface != 0 {
		result |= SymbolFlagsInterfaceExcludes
	}
	if flags&SymbolFlagsRegularEnum != 0 {
		result |= SymbolFlagsRegularEnumExcludes
	}
	if flags&SymbolFlagsConstEnum != 0 {
		result |= SymbolFlagsConstEnumExcludes
	}
	if flags&SymbolFlagsValueModule != 0 {
		result |= SymbolFlagsValueModuleExcludes
	}
	if flags&SymbolFlagsMethod != 0 {
		result |= SymbolFlagsMethodExcludes
	}
	if flags&SymbolFlagsGetAccessor != 0 {
		result |= SymbolFlagsGetAccessorExcludes
	}
	if flags&SymbolFlagsSetAccessor != 0 {
		result |= SymbolFlagsSetAccessorExcludes
	}
	if flags&SymbolFlagsTypeParameter != 0 {
		result |= SymbolFlagsTypeParameterExcludes
	}
	if flags&SymbolFlagsTypeAlias != 0 {
		result |= SymbolFlagsTypeAliasExcludes
	}
	if flags&SymbolFlagsAlias != 0 {
		result |= SymbolFlagsAliasExcludes
	}
	return result
}

func (c *Checker) cloneSymbol(symbol *Symbol) *Symbol {
	result := c.newSymbol(symbol.flags, symbol.name)
	// Force reallocation if anything is ever appended to declarations
	result.declarations = symbol.declarations[0:len(symbol.declarations):len(symbol.declarations)]
	result.parent = symbol.parent
	result.valueDeclaration = symbol.valueDeclaration
	result.constEnumOnlyModule = symbol.constEnumOnlyModule
	result.members = maps.Clone(symbol.members)
	result.exports = maps.Clone(symbol.exports)
	c.recordMergedSymbol(result, symbol)
	return result
}

func (c *Checker) getMergedSymbol(symbol *Symbol) *Symbol {
	// If a symbol was never merged it will have a zero mergeId
	if symbol != nil && symbol.mergeId != 0 {
		merged := c.mergedSymbols[symbol.mergeId]
		if merged != nil {
			return merged
		}
	}
	return symbol
}

func (c *Checker) getParentOfSymbol(symbol *Symbol) *Symbol {
	if symbol.parent != nil {
		return c.getMergedSymbol(c.getLateBoundSymbol(symbol.parent))
	}
	return nil
}

func (c *Checker) recordMergedSymbol(target *Symbol, source *Symbol) {
	c.mergedSymbols[getMergeId(source)] = target
}

func (c *Checker) getSymbolIfSameReference(s1 *Symbol, s2 *Symbol) *Symbol {
	if c.getMergedSymbol(c.resolveSymbol(c.getMergedSymbol(s1))) == c.getMergedSymbol(c.resolveSymbol(c.getMergedSymbol(s2))) {
		return s1
	}
	return nil
}

func (c *Checker) getExportSymbolOfValueSymbolIfExported(symbol *Symbol) *Symbol {
	if symbol != nil && symbol.flags&SymbolFlagsExportValue != 0 && symbol.exportSymbol != nil {
		symbol = symbol.exportSymbol
	}
	return c.getMergedSymbol(symbol)
}

func (c *Checker) getSymbolOfDeclaration(node *Node) *Symbol {
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
func (c *Checker) getSymbolOfNode(node *Node) *Symbol {
	return c.getSymbolOfDeclaration(node)
}

func (c *Checker) getLateBoundSymbol(symbol *Symbol) *Symbol {
	return symbol // !!!
}

func (c *Checker) resolveSymbol(symbol *Symbol) *Symbol {
	return c.resolveSymbolEx(symbol, false /*dontResolveAlias*/)
}

func (c *Checker) resolveSymbolEx(symbol *Symbol, dontResolveAlias bool) *Symbol {
	if !dontResolveAlias && isNonLocalAlias(symbol, SymbolFlagsValue|SymbolFlagsType|SymbolFlagsNamespace) {
		return c.resolveAlias(symbol)
	}
	return symbol
}

func (c *Checker) getTargetOfImportEqualsDeclaration(node *Node, dontResolveAlias bool) *Symbol {
	// Node is ImportEqualsDeclaration | VariableDeclaration
	commonJSPropertyAccess := c.getCommonJSPropertyAccess(node)
	if commonJSPropertyAccess != nil {
		access := commonJSPropertyAccess.AsPropertyAccessExpression()
		name := getLeftmostAccessExpression(access.expression).AsCallExpression().arguments[0]
		if isIdentifier(access.name) {
			return c.resolveSymbol(c.getPropertyOfType(c.resolveExternalModuleTypeByLiteral(name), access.name.Text()))
		}
		return nil
	}
	if isVariableDeclaration(node) || node.AsImportEqualsDeclaration().moduleReference.kind == SyntaxKindExternalModuleReference {
		moduleReference := getExternalModuleRequireArgument(node)
		if moduleReference == nil {
			moduleReference = getExternalModuleImportEqualsDeclarationExpression(node)
		}
		immediate := c.resolveExternalModuleName(node, moduleReference, false /*ignoreErrors*/)
		resolved := c.resolveExternalModuleSymbol(immediate, false /*dontResolveAlias*/)
		c.markSymbolOfAliasDeclarationIfTypeOnly(node, immediate, resolved, false /*overwriteEmpty*/, nil, "")
		return resolved
	}
	resolved := c.getSymbolOfPartOfRightHandSideOfImportEquals(node.AsImportEqualsDeclaration().moduleReference, dontResolveAlias)
	c.checkAndReportErrorForResolvingImportAliasToTypeOnlySymbol(node, resolved)
	return resolved
}

func (c *Checker) getCommonJSPropertyAccess(node *Node) *Node {
	if isVariableDeclaration(node) {
		decl := node.AsVariableDeclaration()
		if decl.initializer != nil && isPropertyAccessExpression(decl.initializer) {
			return decl.initializer
		}
	}
	return nil
}

func (c *Checker) resolveExternalModuleTypeByLiteral(name *Node) *Type {
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
func (c *Checker) getSymbolOfPartOfRightHandSideOfImportEquals(entityName *Node, dontResolveAlias bool) *Symbol {
	// There are three things we might try to look for. In the following examples,
	// the search term is enclosed in |...|:
	//
	//     import a = |b|; // Namespace
	//     import a = |b.c|; // Value, type, namespace
	//     import a = |b.c|.d; // Namespace
	if entityName.kind == SyntaxKindIdentifier && isRightSideOfQualifiedNameOrPropertyAccess(entityName) {
		entityName = entityName.parent // QualifiedName
	}
	// Check for case 1 and 3 in the above example
	if entityName.kind == SyntaxKindIdentifier || entityName.parent.kind == SyntaxKindQualifiedName {
		return c.resolveEntityName(entityName, SymbolFlagsNamespace, false /*ignoreErrors*/, dontResolveAlias, nil /*location*/)
	}
	// Case 2 in above example
	// entityName.kind could be a QualifiedName or a Missing identifier
	//Debug.assert(entityName.parent.kind == SyntaxKindImportEqualsDeclaration)
	return c.resolveEntityName(entityName, SymbolFlagsValue|SymbolFlagsType|SymbolFlagsNamespace, false /*ignoreErrors*/, dontResolveAlias, nil /*location*/)
}

func (c *Checker) checkAndReportErrorForResolvingImportAliasToTypeOnlySymbol(node *Node, resolved *Symbol) {
	decl := node.AsImportEqualsDeclaration()
	if c.markSymbolOfAliasDeclarationIfTypeOnly(node, nil /*immediateTarget*/, resolved, false /*overwriteEmpty*/, nil, "") && !decl.isTypeOnly {
		typeOnlyDeclaration := c.getTypeOnlyAliasDeclaration(c.getSymbolOfDeclaration(node))
		isExport := nodeKindIs(typeOnlyDeclaration, SyntaxKindExportSpecifier, SyntaxKindExportDeclaration)
		message := ifElse(isExport,
			diagnostics.An_import_alias_cannot_reference_a_declaration_that_was_exported_using_export_type,
			diagnostics.An_import_alias_cannot_reference_a_declaration_that_was_imported_using_import_type)
		relatedMessage := ifElse(isExport,
			diagnostics.X_0_was_exported_here,
			diagnostics.X_0_was_imported_here)
		// TODO: how to get name for export *?
		name := "*"
		if typeOnlyDeclaration.kind == SyntaxKindImportDeclaration {
			name = getNameFromImportDeclaration(typeOnlyDeclaration).AsIdentifier().text
		}
		c.error(decl.moduleReference, message).addRelatedInfo(createDiagnosticForNode(typeOnlyDeclaration, relatedMessage, name))
	}
}

func (c *Checker) getTargetOfImportClause(node *Node, dontResolveAlias bool) *Symbol {
	moduleSymbol := c.resolveExternalModuleName(node, getModuleSpecifierFromNode(node.parent), false /*ignoreErrors*/)
	if moduleSymbol != nil {
		return c.getTargetOfModuleDefault(moduleSymbol, node, dontResolveAlias)
	}
	return nil
}

func (c *Checker) getTargetOfModuleDefault(moduleSymbol *Symbol, node *Node, dontResolveAlias bool) *Symbol {
	var exportDefaultSymbol *Symbol
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
	// 		if c.moduleKind >= ModuleKindES2015 {
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

func (c *Checker) resolveExportByName(moduleSymbol *Symbol, name string, sourceNode *Node, dontResolveAlias bool) *Symbol {
	exportValue := moduleSymbol.exports[InternalSymbolNameExportEquals]
	var exportSymbol *Symbol
	if exportValue != nil {
		exportSymbol = c.getPropertyOfTypeEx(c.getTypeOfSymbol(exportValue), name, true /*skipObjectFunctionPropertyAugment*/, false /*includeTypeOnlyMembers*/)
	} else {
		exportSymbol = moduleSymbol.exports[name]
	}
	resolved := c.resolveSymbolEx(exportSymbol, dontResolveAlias)
	c.markSymbolOfAliasDeclarationIfTypeOnly(sourceNode, exportSymbol, resolved, false /*overwriteEmpty*/, nil, "")
	return resolved
}

func (c *Checker) getTargetOfNamespaceImport(node *Node, dontResolveAlias bool) *Symbol {
	moduleSpecifier := c.getModuleSpecifierForImportOrExport(node)
	immediate := c.resolveExternalModuleName(node, moduleSpecifier, false /*ignoreErrors*/)
	resolved := c.resolveESModuleSymbol(immediate, moduleSpecifier, dontResolveAlias /*suppressInteropError*/, false)
	c.markSymbolOfAliasDeclarationIfTypeOnly(node, immediate, resolved, false /*overwriteEmpty*/, nil, "")
	return resolved
}

func (c *Checker) getTargetOfNamespaceExport(node *Node, dontResolveAlias bool) *Symbol {
	moduleSpecifier := c.getModuleSpecifierForImportOrExport(node)
	if moduleSpecifier != nil {
		immediate := c.resolveExternalModuleName(node, moduleSpecifier, false /*ignoreErrors*/)
		resolved := c.resolveESModuleSymbol(immediate, moduleSpecifier, dontResolveAlias /*suppressInteropError*/, false)
		c.markSymbolOfAliasDeclarationIfTypeOnly(node, immediate, resolved, false /*overwriteEmpty*/, nil, "")
		return resolved
	}
	return nil
}

func (c *Checker) getTargetOfImportSpecifier(node *Node, dontResolveAlias bool) *Symbol {
	name := node.AsImportSpecifier().propertyName
	if name == nil {
		name = node.AsImportSpecifier().name
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
	root := node.parent.parent.parent // ImportDeclaration
	resolved := c.getExternalModuleMember(root, node, dontResolveAlias)
	c.markSymbolOfAliasDeclarationIfTypeOnly(node, nil /*immediateTarget*/, resolved, false /*overwriteEmpty*/, nil, "")
	return resolved
}

func (c *Checker) getExternalModuleMember(node *Node, specifier *Node, dontResolveAlias bool) *Symbol {
	// node is ImportDeclaration | ExportDeclaration | VariableDeclaration
	// specifier is ImportSpecifier | ExportSpecifier | BindingElement | PropertyAccessExpression
	moduleSpecifier := getExternalModuleRequireArgument(node)
	if moduleSpecifier == nil {
		moduleSpecifier = getExternalModuleName(node)
	}
	moduleSymbol := c.resolveExternalModuleName(node, moduleSpecifier, false /*ignoreErrors*/)
	var name *Node
	if !isPropertyAccessExpression(specifier) {
		name = getPropertyNameFromSpecifier(specifier)
	}
	if name == nil {
		name = getNameFromSpecifier(specifier)
	}
	if !isIdentifier(name) && !isStringLiteral(name) {
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
		if nameText != "" || name.kind == SyntaxKindStringLiteral {
			if isShorthandAmbientModuleSymbol(moduleSymbol) {
				return moduleSymbol
			}
			var symbolFromVariable *Symbol
			// First check if module was specified with "export=". If so, get the member from the resolved type
			if moduleSymbol != nil && moduleSymbol.exports[InternalSymbolNameExportEquals] != nil {
				symbolFromVariable = c.getPropertyOfTypeEx(c.getTypeOfSymbol(targetSymbol), nameText, true /*skipObjectFunctionPropertyAugment*/, false /*includeTypeOnlyMembers*/)
			} else {
				symbolFromVariable = c.getPropertyOfVariable(targetSymbol, nameText)
			}
			// if symbolFromVariable is export - get its final target
			symbolFromVariable = c.resolveSymbolEx(symbolFromVariable, dontResolveAlias)
			symbolFromModule := c.getExportOfModule(targetSymbol, nameText, specifier, dontResolveAlias)
			if symbolFromModule == nil && nameText == InternalSymbolNameDefault {
				file := core.Find(moduleSymbol.declarations, isSourceFile)
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
				// c.error(name, Diagnostics.Named_imports_from_a_JSON_file_into_an_ECMAScript_module_are_not_allowed_when_module_is_set_to_0, ModuleKind[c.moduleKind])
			} else if symbol == nil {
				c.errorNoModuleMemberSymbol(moduleSymbol, targetSymbol, node, name)
			}
			return symbol
		}
	}
	return nil
}

func (c *Checker) getPropertyOfVariable(symbol *Symbol, name string) *Symbol {
	if symbol.flags&SymbolFlagsVariable != 0 {
		typeAnnotation := symbol.valueDeclaration.AsVariableDeclaration().typeNode
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
func (c *Checker) combineValueAndTypeSymbols(valueSymbol *Symbol, typeSymbol *Symbol) *Symbol {
	if valueSymbol == c.unknownSymbol && typeSymbol == c.unknownSymbol {
		return c.unknownSymbol
	}
	if valueSymbol.flags&(SymbolFlagsType|SymbolFlagsNamespace) != 0 {
		return valueSymbol
	}
	result := c.newSymbol(valueSymbol.flags|typeSymbol.flags, valueSymbol.name)
	//Debug.assert(valueSymbol.declarations || typeSymbol.declarations)
	result.declarations = slices.Compact(slices.Concat(valueSymbol.declarations, typeSymbol.declarations))
	result.parent = valueSymbol.parent
	if result.parent == nil {
		result.parent = typeSymbol.parent
	}
	result.valueDeclaration = valueSymbol.valueDeclaration
	result.members = maps.Clone(typeSymbol.members)
	result.exports = maps.Clone(valueSymbol.exports)
	return result
}

func (c *Checker) getExportOfModule(symbol *Symbol, nameText string, specifier *Node, dontResolveAlias bool) *Symbol {
	if symbol.flags&SymbolFlagsModule != 0 {
		exportSymbol := c.getExportsOfSymbol(symbol)[nameText]
		resolved := c.resolveSymbolEx(exportSymbol, dontResolveAlias)
		exportStarDeclaration := c.moduleSymbolLinks.get(symbol).typeOnlyExportStarMap[nameText]
		c.markSymbolOfAliasDeclarationIfTypeOnly(specifier, exportSymbol, resolved /*overwriteEmpty*/, false, exportStarDeclaration, nameText)
		return resolved
	}
	return nil
}

func (c *Checker) isOnlyImportableAsDefault(usage *Node, resolvedModule *Symbol) bool {
	// In Node.js, JSON modules don't get named exports
	if ModuleKindNode16 <= c.moduleKind && c.moduleKind <= ModuleKindNodeNext {
		usageMode := c.getEmitSyntaxForModuleSpecifierExpression(usage)
		if usageMode == ModuleKindESNext {
			if resolvedModule == nil {
				resolvedModule = c.resolveExternalModuleName(usage, usage, true /*ignoreErrors*/)
			}
			var targetFile *SourceFile
			if resolvedModule != nil {
				targetFile = getSourceFileOfModule(resolvedModule)
			}
			return targetFile != nil && (isJsonSourceFile(targetFile) || getDeclarationFileExtension(targetFile.fileName) == ".d.json.ts")
		}
	}
	return false
}

func (c *Checker) canHaveSyntheticDefault(file *SourceFile, moduleSymbol *Symbol, dontResolveAlias bool, usage *Node) bool {
	// !!!
	// var usageMode ResolutionMode
	// if file != nil {
	// 	usageMode = c.getEmitSyntaxForModuleSpecifierExpression(usage)
	// }
	// if file != nil && usageMode != ModuleKindNone {
	// 	targetMode := host.getImpliedNodeFormatForEmit(file)
	// 	if usageMode == ModuleKindESNext && targetMode == ModuleKindCommonJS && ModuleKindNode16 <= c.moduleKind && c.moduleKind <= ModuleKindNodeNext {
	// 		// In Node.js, CommonJS modules always have a synthetic default when imported into ESM
	// 		return true
	// 	}
	// 	if usageMode == ModuleKindESNext && targetMode == ModuleKindESNext {
	// 		// No matter what the `module` setting is, if we're confident that both files
	// 		// are ESM, there cannot be a synthetic default.
	// 		return false
	// 	}
	// }
	if !c.allowSyntheticDefaultImports {
		return false
	}
	// Declaration files (and ambient modules)
	if file == nil || file.isDeclarationFile {
		// Definitely cannot have a synthetic default if they have a syntactic default member specified
		defaultExportSymbol := c.resolveExportByName(moduleSymbol, InternalSymbolNameDefault /*sourceNode*/, nil /*dontResolveAlias*/, true)
		// Dont resolve alias because we want the immediately exported symbol's declaration
		if defaultExportSymbol != nil && core.Some(defaultExportSymbol.declarations, isSyntacticDefault) {
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

func (c *Checker) getEmitSyntaxForModuleSpecifierExpression(usage *Node) ResolutionMode {
	// !!!
	// if isStringLiteralLike(usage) {
	// 	return host.getEmitSyntaxForUsageLocation(getSourceFileOfNode(usage), usage)
	// }
	return ModuleKindNone
}

func (c *Checker) errorNoModuleMemberSymbol(moduleSymbol *Symbol, targetSymbol *Symbol, node *Node, name *Node) {
	moduleName := c.getFullyQualifiedName(moduleSymbol, node)
	declarationName := declarationNameToString(name)
	var suggestion *Symbol
	if isIdentifier(name) {
		suggestion = c.getSuggestedSymbolForNonexistentModule(name, targetSymbol)
	}
	if suggestion != nil {
		suggestionName := c.symbolToString(suggestion)
		diagnostic := c.error(name, diagnostics.X_0_has_no_exported_member_named_1_Did_you_mean_2, moduleName, declarationName, suggestionName)
		if suggestion.valueDeclaration != nil {
			diagnostic.addRelatedInfo(createDiagnosticForNode(suggestion.valueDeclaration, diagnostics.X_0_is_declared_here, suggestionName))
		}
	} else {
		if moduleSymbol.exports[InternalSymbolNameDefault] != nil {
			c.error(name, diagnostics.Module_0_has_no_exported_member_1_Did_you_mean_to_use_import_1_from_0_instead, moduleName, declarationName)
		} else {
			c.reportNonExportedMember(node, name, declarationName, moduleSymbol, moduleName)
		}
	}
}

func (c *Checker) reportNonExportedMember(node *Node, name *Node, declarationName string, moduleSymbol *Symbol, moduleName string) {
	var localSymbol *Symbol
	if locals := getLocalsOfNode(moduleSymbol.valueDeclaration); locals != nil {
		localSymbol = locals[name.Text()]
	}
	exports := moduleSymbol.exports
	if localSymbol != nil {
		if exportedEqualsSymbol := exports[InternalSymbolNameExportEquals]; exportedEqualsSymbol != nil {
			if c.getSymbolIfSameReference(exportedEqualsSymbol, localSymbol) != nil {
				c.reportInvalidImportEqualsExportMember(node, name, declarationName, moduleName)
			} else {
				c.error(name, diagnostics.Module_0_has_no_exported_member_1, moduleName, declarationName)
			}
		} else {
			exportedSymbol := findInMap(exports, func(symbol *Symbol) bool {
				return c.getSymbolIfSameReference(symbol, localSymbol) != nil
			})
			var diagnostic *Diagnostic
			if exportedSymbol != nil {
				diagnostic = c.error(name, diagnostics.Module_0_declares_1_locally_but_it_is_exported_as_2, moduleName, declarationName, c.symbolToString(exportedSymbol))
			} else {
				diagnostic = c.error(name, diagnostics.Module_0_declares_1_locally_but_it_is_not_exported, moduleName, declarationName)
			}
			for i, decl := range localSymbol.declarations {
				diagnostic.addRelatedInfo(createDiagnosticForNode(decl, ifElse(i == 0, diagnostics.X_0_is_declared_here, diagnostics.X_and_here), declarationName))
			}
		}
	} else {
		c.error(name, diagnostics.Module_0_has_no_exported_member_1, moduleName, declarationName)
	}
}

func (c *Checker) reportInvalidImportEqualsExportMember(node *Node, name *Node, declarationName string, moduleName string) {
	if c.moduleKind >= ModuleKindES2015 {
		message := ifElse(getESModuleInterop(c.compilerOptions),
			diagnostics.X_0_can_only_be_imported_by_using_a_default_import,
			diagnostics.X_0_can_only_be_imported_by_turning_on_the_esModuleInterop_flag_and_using_a_default_import)
		c.error(name, message, declarationName)
	} else {
		message := ifElse(getESModuleInterop(c.compilerOptions),
			diagnostics.X_0_can_only_be_imported_by_using_import_1_require_2_or_a_default_import,
			diagnostics.X_0_can_only_be_imported_by_using_import_1_require_2_or_by_turning_on_the_esModuleInterop_flag_and_using_a_default_import)
		c.error(name, message, declarationName, declarationName, moduleName)
	}
}

func getPropertyNameFromSpecifier(node *Node) *Node {
	switch node.kind {
	case SyntaxKindImportSpecifier:
		return node.AsImportSpecifier().propertyName
	case SyntaxKindExportSpecifier:
		return node.AsExportSpecifier().propertyName
	case SyntaxKindBindingElement:
		return node.AsBindingElement().propertyName
	}
	panic("Unhandled case in getSpecifierPropertyName")
}

func getNameFromSpecifier(node *Node) *Node {
	switch node.kind {
	case SyntaxKindImportSpecifier:
		return node.AsImportSpecifier().name
	case SyntaxKindExportSpecifier:
		return node.AsExportSpecifier().name
	case SyntaxKindBindingElement:
		return node.AsBindingElement().name
	case SyntaxKindPropertyAccessExpression:
		return node.AsPropertyAccessExpression().name
	}
	panic("Unhandled case in getSpecifierPropertyName")
}

func (c *Checker) getTargetOfBindingElement(node *Node, dontResolveAlias bool) *Symbol {
	panic("getTargetOfBindingElement") // !!!
}

func (c *Checker) getTargetOfExportSpecifier(node *Node, meaning SymbolFlags, dontResolveAlias bool) *Symbol {
	name := node.AsExportSpecifier().propertyName
	if name == nil {
		name = node.AsExportSpecifier().name
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
	exportDeclaration := node.parent.parent
	var resolved *Symbol
	switch {
	case exportDeclaration.AsExportDeclaration().moduleSpecifier != nil:
		resolved = c.getExternalModuleMember(exportDeclaration, node, dontResolveAlias)
	case isStringLiteral(name):
		resolved = nil
	default:
		resolved = c.resolveEntityName(name, meaning, false /*ignoreErrors*/, dontResolveAlias, nil /*location*/)
	}
	c.markSymbolOfAliasDeclarationIfTypeOnly(node, nil /*immediateTarget*/, resolved, false /*overwriteEmpty*/, nil, "")
	return resolved
}

func (c *Checker) getTargetOfExportAssignment(node *Node, dontResolveAlias bool) *Symbol {
	resolved := c.getTargetOfAliasLikeExpression(node.AsExportAssignment().expression, dontResolveAlias)
	c.markSymbolOfAliasDeclarationIfTypeOnly(node, nil /*immediateTarget*/, resolved, false /*overwriteEmpty*/, nil, "")
	return resolved
}

func (c *Checker) getTargetOfBinaryExpression(node *Node, dontResolveAlias bool) *Symbol {
	resolved := c.getTargetOfAliasLikeExpression(node.AsBinaryExpression().right, dontResolveAlias)
	c.markSymbolOfAliasDeclarationIfTypeOnly(node, nil /*immediateTarget*/, resolved, false /*overwriteEmpty*/, nil, "")
	return resolved
}

func (c *Checker) getTargetOfAliasLikeExpression(expression *Node, dontResolveAlias bool) *Symbol {
	if isClassExpression(expression) {
		return c.unknownSymbol
		// !!! return c.checkExpressionCached(expression).symbol
	}
	if !isEntityName(expression) && !isEntityNameExpression(expression) {
		return nil
	}
	aliasLike := c.resolveEntityName(expression, SymbolFlagsValue|SymbolFlagsType|SymbolFlagsNamespace, true /*ignoreErrors*/, dontResolveAlias, nil /*location*/)
	if aliasLike != nil {
		return aliasLike
	}
	return c.unknownSymbol
	// !!! c.checkExpressionCached(expression)
	// return c.getNodeLinks(expression).resolvedSymbol
}

func (c *Checker) getTargetOfNamespaceExportDeclaration(node *Node, dontResolveAlias bool) *Symbol {
	if canHaveSymbol(node.parent) {
		resolved := c.resolveExternalModuleSymbol(node.parent.Symbol(), dontResolveAlias)
		c.markSymbolOfAliasDeclarationIfTypeOnly(node, nil /*immediateTarget*/, resolved, false /*overwriteEmpty*/, nil, "")
		return resolved
	}
	return nil
}

func (c *Checker) getTargetOfAccessExpression(node *Node, dontRecursivelyResolve bool) *Symbol {
	if isBinaryExpression(node.parent) {
		expr := node.parent.AsBinaryExpression()
		if expr.left == node && expr.operatorToken.kind == SyntaxKindEqualsToken {
			return c.getTargetOfAliasLikeExpression(expr.right, dontRecursivelyResolve)
		}
	}
	return nil
}

func (c *Checker) getModuleSpecifierForImportOrExport(node *Node) *Node {
	switch node.kind {
	case SyntaxKindImportClause:
		return getModuleSpecifierFromNode(node.parent)
	case SyntaxKindImportEqualsDeclaration:
		if isExternalModuleReference(node.AsImportEqualsDeclaration().moduleReference) {
			return node.AsImportEqualsDeclaration().moduleReference.AsExternalModuleReference().expression
		} else {
			return nil
		}
	case SyntaxKindNamespaceImport:
		return getModuleSpecifierFromNode(node.parent.parent)
	case SyntaxKindImportSpecifier:
		return getModuleSpecifierFromNode(node.parent.parent.parent)
	case SyntaxKindNamespaceExport:
		return getModuleSpecifierFromNode(node.parent)
	case SyntaxKindExportSpecifier:
		return getModuleSpecifierFromNode(node.parent.parent)
	}
	panic("Unhandled case in getModuleSpecifierForImportOrExport")
}

func getModuleSpecifierFromNode(node *Node) *Node {
	switch node.kind {
	case SyntaxKindImportDeclaration:
		return node.AsImportDeclaration().moduleSpecifier
	case SyntaxKindExportDeclaration:
		return node.AsExportDeclaration().moduleSpecifier
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

func (c *Checker) markSymbolOfAliasDeclarationIfTypeOnly(aliasDeclaration *Node, immediateTarget *Symbol, finalTarget *Symbol, overwriteEmpty bool, exportStarDeclaration *Node, exportStarName string) bool {
	if aliasDeclaration == nil || !isDeclarationNode(aliasDeclaration) {
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
		if sourceSymbol.name != exportStarName {
			links.typeOnlyExportStarName = exportStarName
		}
		return true
	}
	links := c.aliasSymbolLinks.get(sourceSymbol)
	return c.markSymbolOfAliasDeclarationIfTypeOnlyWorker(links, immediateTarget, overwriteEmpty) || c.markSymbolOfAliasDeclarationIfTypeOnlyWorker(links, finalTarget, overwriteEmpty)
}

func (c *Checker) markSymbolOfAliasDeclarationIfTypeOnlyWorker(aliasDeclarationLinks *AliasSymbolLinks, target *Symbol, overwriteEmpty bool) bool {
	if target != nil && (aliasDeclarationLinks.typeOnlyDeclaration == nil || overwriteEmpty && aliasDeclarationLinks.typeOnlyDeclarationResolved && aliasDeclarationLinks.typeOnlyDeclaration == nil) {
		exportSymbol := target.exports[InternalSymbolNameExportEquals]
		if exportSymbol == nil {
			exportSymbol = target
		}
		typeOnly := core.Some(exportSymbol.declarations, isTypeOnlyImportOrExportDeclaration)
		aliasDeclarationLinks.typeOnlyDeclarationResolved = true
		aliasDeclarationLinks.typeOnlyDeclaration = nil
		if typeOnly {
			aliasDeclarationLinks.typeOnlyDeclaration = c.aliasSymbolLinks.get(exportSymbol).typeOnlyDeclaration
		}
	}
	return aliasDeclarationLinks.typeOnlyDeclaration != nil
}

func (c *Checker) resolveExternalModuleName(location *Node, moduleReferenceExpression *Node, ignoreErrors bool) *Symbol {
	errorMessage := diagnostics.Cannot_find_module_0_or_its_corresponding_type_declarations
	return c.resolveExternalModuleNameWorker(location, moduleReferenceExpression, ifElse(ignoreErrors, nil, errorMessage), ignoreErrors, false /*isForAugmentation*/)
}

func (c *Checker) resolveExternalModuleNameWorker(location *Node, moduleReferenceExpression *Node, moduleNotFoundError *diagnostics.Message, ignoreErrors bool, isForAugmentation bool) *Symbol {
	if isStringLiteralLike(moduleReferenceExpression) {
		return c.resolveExternalModule(location, moduleReferenceExpression.Text(), moduleNotFoundError, ifElse(!ignoreErrors, moduleReferenceExpression, nil), isForAugmentation)
	}
	return nil
}

func (c *Checker) resolveExternalModule(location *Node, moduleReference string, moduleNotFoundError *diagnostics.Message, errorNode *Node, isForAugmentation bool) *Symbol {
	if errorNode != nil && strings.HasPrefix(moduleReference, "@types/") {
		withoutAtTypePrefix := moduleReference[len("@types/"):]
		c.error(errorNode, diagnostics.Cannot_import_type_declaration_files_Consider_importing_0_instead_of_1, withoutAtTypePrefix, moduleReference)
	}
	ambientModule := c.tryFindAmbientModule(moduleReference, true /*withAugmentations*/)
	if ambientModule != nil {
		return ambientModule
	}
	// !!! The following only implements simple module resoltion
	sourceFile := c.program.getResolvedModule(getSourceFileOfNode(location), moduleReference)
	if sourceFile != nil {
		if sourceFile.symbol != nil {
			return c.getMergedSymbol(sourceFile.symbol)
		}
		if errorNode != nil && moduleNotFoundError != nil && !isSideEffectImport(errorNode) {
			c.error(errorNode, diagnostics.File_0_is_not_a_module, sourceFile.fileName)
		}
		return nil
	}
	if errorNode != nil && moduleNotFoundError != nil {
		c.error(errorNode, moduleNotFoundError, moduleReference)
	}
	return nil
}

func (c *Checker) tryFindAmbientModule(moduleName string, withAugmentations bool) *Symbol {
	if isExternalModuleNameRelative(moduleName) {
		return nil
	}
	symbol := c.getSymbol(c.globals, "\""+moduleName+"\"", SymbolFlagsValueModule)
	// merged symbol is module declaration symbol combined with all augmentations
	if withAugmentations {
		return c.getMergedSymbol(symbol)
	}
	return symbol
}

func (c *Checker) resolveExternalModuleSymbol(moduleSymbol *Symbol, dontResolveAlias bool) *Symbol {
	if moduleSymbol != nil {
		exportEquals := c.resolveSymbolEx(moduleSymbol.exports[InternalSymbolNameExportEquals], dontResolveAlias)
		exported := c.getMergedSymbol(c.getCommonJsExportEquals(c.getMergedSymbol(exportEquals), c.getMergedSymbol(moduleSymbol)))
		if exported != nil {
			return exported
		}
	}
	return moduleSymbol
}

func (c *Checker) getCommonJsExportEquals(exported *Symbol, moduleSymbol *Symbol) *Symbol {
	if exported == nil || exported == c.unknownSymbol || exported == moduleSymbol || len(moduleSymbol.exports) == 1 || exported.flags&SymbolFlagsAlias != 0 {
		return exported
	}
	links := c.moduleSymbolLinks.get(exported)
	if links.cjsExportMerged != nil {
		return links.cjsExportMerged
	}
	var merged *Symbol
	if exported.flags&SymbolFlagsTransient != 0 {
		merged = exported
	} else {
		merged = c.cloneSymbol(exported)
	}
	merged.flags |= SymbolFlagsValueModule
	mergedExports := getExports(merged)
	for name, s := range moduleSymbol.exports {
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
func (c *Checker) resolveESModuleSymbol(moduleSymbol *Symbol, referencingLocation *Node, dontResolveAlias bool, suppressInteropError bool) *Symbol {
	symbol := c.resolveExternalModuleSymbol(moduleSymbol, dontResolveAlias)
	if !dontResolveAlias && symbol != nil {
		if !suppressInteropError && symbol.flags&(SymbolFlagsModule|SymbolFlagsVariable) == 0 && getDeclarationOfKind(symbol, SyntaxKindSourceFile) == nil {
			compilerOptionName := ifElse(c.moduleKind >= ModuleKindES2015, "allowSyntheticDefaultImports", "esModuleInterop")
			c.error(referencingLocation, diagnostics.This_module_can_only_be_referenced_with_ECMAScript_imports_Slashexports_by_turning_on_the_0_flag_and_referencing_its_default_export, compilerOptionName)
			return symbol
		}
		referenceParent := referencingLocation.parent
		if isImportDeclaration(referenceParent) && getNamespaceDeclarationNode(referenceParent) != nil || isImportCall(referenceParent) {
			var reference *Node
			if isImportCall(referenceParent) {
				reference = referenceParent.AsCallExpression().arguments[0]
			} else {
				reference = referenceParent.AsImportDeclaration().moduleSpecifier
			}
			typ := c.getTypeOfSymbol(symbol)
			defaultOnlyType := c.getTypeWithSyntheticDefaultOnly(typ, symbol, moduleSymbol, reference)
			if defaultOnlyType != nil {
				return c.cloneTypeAsModuleType(symbol, defaultOnlyType, referenceParent)
			}
			// !!!
			// targetFile := moduleSymbol. /* ? */ declarations. /* ? */ find(isSourceFile)
			// isEsmCjsRef := targetFile && c.isESMFormatImportImportingCommonjsFormatFile(c.getEmitSyntaxForModuleSpecifierExpression(reference), host.getImpliedNodeFormatForEmit(targetFile))
			// if getESModuleInterop(c.compilerOptions) || isEsmCjsRef {
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

func (c *Checker) getTypeWithSyntheticDefaultOnly(typ *Type, symbol *Symbol, originalSymbol *Symbol, moduleSpecifier *Node) *Type {
	return nil // !!!
}

func (c *Checker) cloneTypeAsModuleType(symbol *Symbol, moduleType *Type, referenceParent *Node) *Symbol {
	result := c.newSymbol(symbol.flags, symbol.name)
	result.constEnumOnlyModule = symbol.constEnumOnlyModule
	result.declarations = slices.Clone(symbol.declarations)
	result.valueDeclaration = symbol.valueDeclaration
	result.members = maps.Clone(symbol.members)
	result.exports = maps.Clone(symbol.exports)
	result.parent = symbol.parent
	links := c.exportTypeLinks.get(result)
	links.target = symbol
	links.originatingImport = referenceParent
	resolvedModuleType := c.resolveStructuredTypeMembers(moduleType)
	c.valueSymbolLinks.get(result).resolvedType = c.newAnonymousType(result, resolvedModuleType.members, nil, nil, resolvedModuleType.indexInfos)
	return result
}

func (c *Checker) getTargetOfAliasDeclaration(node *Node, dontRecursivelyResolve bool /*  = false */) *Symbol {
	switch node.kind {
	case SyntaxKindImportEqualsDeclaration, SyntaxKindVariableDeclaration:
		return c.getTargetOfImportEqualsDeclaration(node, dontRecursivelyResolve)
	case SyntaxKindImportClause:
		return c.getTargetOfImportClause(node, dontRecursivelyResolve)
	case SyntaxKindNamespaceImport:
		return c.getTargetOfNamespaceImport(node, dontRecursivelyResolve)
	case SyntaxKindNamespaceExport:
		return c.getTargetOfNamespaceExport(node, dontRecursivelyResolve)
	case SyntaxKindImportSpecifier:
		return c.getTargetOfImportSpecifier(node, dontRecursivelyResolve)
	case SyntaxKindBindingElement:
		return c.getTargetOfBindingElement(node, dontRecursivelyResolve)
	case SyntaxKindExportSpecifier:
		return c.getTargetOfExportSpecifier(node, SymbolFlagsValue|SymbolFlagsType|SymbolFlagsNamespace, dontRecursivelyResolve)
	case SyntaxKindExportAssignment:
		return c.getTargetOfExportAssignment(node, dontRecursivelyResolve)
	case SyntaxKindBinaryExpression:
		return c.getTargetOfBinaryExpression(node, dontRecursivelyResolve)
	case SyntaxKindNamespaceExportDeclaration:
		return c.getTargetOfNamespaceExportDeclaration(node, dontRecursivelyResolve)
	case SyntaxKindShorthandPropertyAssignment:
		return c.resolveEntityName(node.AsShorthandPropertyAssignment().name, SymbolFlagsValue|SymbolFlagsType|SymbolFlagsNamespace, true /*ignoreErrors*/, dontRecursivelyResolve, nil /*location*/)
	case SyntaxKindPropertyAssignment:
		return c.getTargetOfAliasLikeExpression(node.AsPropertyAssignment().initializer, dontRecursivelyResolve)
	case SyntaxKindElementAccessExpression, SyntaxKindPropertyAccessExpression:
		return c.getTargetOfAccessExpression(node, dontRecursivelyResolve)
	}
	panic("Unhandled case in getTargetOfAliasDeclaration")
}

/**
 * Resolves a qualified name and any involved aliases.
 */
func (c *Checker) resolveEntityName(name *Node, meaning SymbolFlags, ignoreErrors bool, dontResolveAlias bool, location *Node) *Symbol {
	if nodeIsMissing(name) {
		return nil
	}
	var symbol *Symbol
	switch name.kind {
	case SyntaxKindIdentifier:
		var message *diagnostics.Message
		if !ignoreErrors {
			if meaning == SymbolFlagsNamespace || nodeIsSynthesized(name) {
				message = diagnostics.Cannot_find_namespace_0
			} else {
				message = c.getCannotFindNameDiagnosticForName(getFirstIdentifier(name))
			}
		}
		resolveLocation := location
		if resolveLocation == nil {
			resolveLocation = name
		}
		symbol = c.getMergedSymbol(c.resolveName(resolveLocation, name.AsIdentifier().text, meaning, message, true /*isUse*/, false /*excludeGlobals*/))
	case SyntaxKindQualifiedName:
		qualified := name.AsQualifiedName()
		symbol = c.resolveQualifiedName(name, qualified.left, qualified.right, meaning, ignoreErrors, dontResolveAlias, location)
	case SyntaxKindPropertyAccessExpression:
		access := name.AsPropertyAccessExpression()
		symbol = c.resolveQualifiedName(name, access.expression, access.name, meaning, ignoreErrors, dontResolveAlias, location)
	default:
		panic("Unknown entity name kind")
	}
	if symbol != nil {
		if !nodeIsSynthesized(name) && isEntityName(name) && (symbol.flags&SymbolFlagsAlias != 0 || name.parent.kind == SyntaxKindExportAssignment) {
			c.markSymbolOfAliasDeclarationIfTypeOnly(getAliasDeclarationFromName(name), symbol, nil /*finalTarget*/, true /*overwriteEmpty*/, nil, "")
		}
		if symbol.flags&meaning == 0 && !dontResolveAlias {
			return c.resolveAlias(symbol)
		}
	}
	return symbol
}

func (c *Checker) resolveQualifiedName(name *Node, left *Node, right *Node, meaning SymbolFlags, ignoreErrors bool, dontResolveAlias bool, location *Node) *Symbol {
	namespace := c.resolveEntityName(left, SymbolFlagsNamespace, ignoreErrors /*dontResolveAlias*/, false, location)
	if namespace == nil || nodeIsMissing(right) {
		return nil
	}
	if namespace == c.unknownSymbol {
		return namespace
	}
	text := right.AsIdentifier().text
	symbol := c.getMergedSymbol(c.getSymbol(c.getExportsOfSymbol(namespace), text, meaning))
	if symbol != nil && namespace.flags&SymbolFlagsAlias != 0 {
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
			var containingQualifiedName *Node
			if isQualifiedName(name) {
				containingQualifiedName = getContainingQualifiedNameNode(name)
			}
			canSuggestTypeof := c.globalObjectType != nil && meaning&SymbolFlagsType != 0 && containingQualifiedName != nil && !isTypeOfExpression(containingQualifiedName.parent) && c.tryGetQualifiedNameAsValue(containingQualifiedName) != nil
			if canSuggestTypeof {
				c.error(containingQualifiedName, diagnostics.X_0_refers_to_a_value_but_is_being_used_as_a_type_here_Did_you_mean_typeof_0, entityNameToString(containingQualifiedName))
				return nil
			}
			if meaning&SymbolFlagsNamespace != 0 {
				if isQualifiedName(name.parent) {
					exportedTypeSymbol := c.getMergedSymbol(c.getSymbol(c.getExportsOfSymbol(namespace), text, SymbolFlagsType))
					if exportedTypeSymbol != nil {
						qualified := name.parent.AsQualifiedName()
						c.error(qualified.right, diagnostics.Cannot_access_0_1_because_0_is_a_type_but_not_a_namespace_Did_you_mean_to_retrieve_the_type_of_the_property_1_in_0_with_0_1, c.symbolToString(exportedTypeSymbol), qualified.right.AsIdentifier().text)
						return nil
					}
				}
			}
			c.error(right, diagnostics.Namespace_0_has_no_exported_member_1, namespaceName, declarationName)
		}
	}
	return symbol
}

func (c *Checker) tryGetQualifiedNameAsValue(node *Node) *Symbol {
	id := getFirstIdentifier(node)
	symbol := c.resolveName(id, id.AsIdentifier().text, SymbolFlagsValue, nil /*nameNotFoundMessage*/, true /*isUse*/, false /*excludeGlobals*/)
	if symbol == nil {
		return nil
	}
	n := id
	for isQualifiedName(n.parent) {
		t := c.getTypeOfSymbol(symbol)
		symbol = c.getPropertyOfType(t, n.parent.AsQualifiedName().right.AsIdentifier().text)
		if symbol == nil {
			return nil
		}
		n = n.parent
	}
	return symbol
}

func (c *Checker) getSuggestedSymbolForNonexistentModule(name *Node, targetModule *Symbol) *Symbol {
	return nil // !!!
}

func (c *Checker) getFullyQualifiedName(symbol *Symbol, containingLocation *Node) string {
	if symbol.parent != nil {
		return c.getFullyQualifiedName(symbol.parent, containingLocation) + "." + c.symbolToString(symbol)
	}
	return c.symbolToString(symbol) // !!!
}

func (c *Checker) getExportsOfSymbol(symbol *Symbol) SymbolTable {
	if symbol.flags&SymbolFlagsLateBindingContainer != 0 {
		return c.getResolvedMembersOrExportsOfSymbol(symbol, MembersOrExportsResolutionKindResolvedExports)
	}
	if symbol.flags&SymbolFlagsModule != 0 {
		return c.getExportsOfModule(symbol)
	}
	return symbol.exports
}

func (c *Checker) getResolvedMembersOrExportsOfSymbol(symbol *Symbol, resolutionKind MembersOrExportsResolutionKind) SymbolTable {
	links := c.membersAndExportsLinks.get(symbol)
	if links[resolutionKind] == nil {
		isStatic := resolutionKind == MembersOrExportsResolutionKindResolvedExports
		earlySymbols := symbol.exports
		switch {
		case !isStatic:
			earlySymbols = symbol.members
		case symbol.flags&SymbolFlagsModule != 0:
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
func (c *Checker) getMembersOfSymbol(symbol *Symbol) SymbolTable {
	if symbol.flags&SymbolFlagsLateBindingContainer != 0 {
		return c.getResolvedMembersOrExportsOfSymbol(symbol, MembersOrExportsResolutionKindresolvedMembers)
	}
	return symbol.members
}

func (c *Checker) getExportsOfModule(moduleSymbol *Symbol) SymbolTable {
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
	exportsWithDuplicate []*Node
}

type ExportCollisionTable = map[string]*ExportCollision

func (c *Checker) getExportsOfModuleWorker(moduleSymbol *Symbol) (exports SymbolTable, typeOnlyExportStarMap map[string]*Node) {
	var visitedSymbols []*Symbol
	var nonTypeOnlyNames set[string]
	// The ES6 spec permits export * declarations in a module to circularly reference the module itself. For example,
	// module 'a' can 'export * from "b"' and 'b' can 'export * from "a"' without error.
	var visit func(*Symbol, *Node, bool) SymbolTable
	visit = func(symbol *Symbol, exportStar *Node, isTypeOnly bool) SymbolTable {
		if !isTypeOnly && symbol != nil {
			// Add non-type-only names before checking if we've visited this module,
			// because we might have visited it via an 'export type *', and visiting
			// again with 'export *' will override the type-onlyness of its exports.
			for name := range symbol.exports {
				nonTypeOnlyNames.add(name)
			}
		}
		if symbol == nil || symbol.exports == nil || slices.Contains(visitedSymbols, symbol) {
			return nil
		}
		symbols := maps.Clone(symbol.exports)
		// All export * declarations are collected in an __export symbol by the binder
		exportStars := symbol.exports[InternalSymbolNameExportStar]
		if exportStars != nil {
			nestedSymbols := make(SymbolTable)
			lookupTable := make(ExportCollisionTable)
			for _, node := range exportStars.declarations {
				resolvedModule := c.resolveExternalModuleName(node, node.AsExportDeclaration().moduleSpecifier, false /*ignoreErrors*/)
				exportedSymbols := visit(resolvedModule, node, isTypeOnly || node.AsExportDeclaration().isTypeOnly)
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
		if exportStar != nil && exportStar.AsExportDeclaration().isTypeOnly {
			if typeOnlyExportStarMap == nil {
				typeOnlyExportStarMap = make(map[string]*Node)
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
		exports = make(SymbolTable)
	}
	for name := range nonTypeOnlyNames.keys() {
		delete(typeOnlyExportStarMap, name)
	}
	return exports, typeOnlyExportStarMap
}

/**
 * Extends one symbol table with another while collecting information on name collisions for error message generation into the `lookupTable` argument
 * Not passing `lookupTable` and `exportNode` disables this collection, and just extends the tables
 */
func (c *Checker) extendExportSymbols(target SymbolTable, source SymbolTable, lookupTable ExportCollisionTable, exportNode *Node) {
	for id, sourceSymbol := range source {
		if id == InternalSymbolNameDefault {
			continue
		}
		targetSymbol := target[id]
		if targetSymbol == nil {
			target[id] = sourceSymbol
			if lookupTable != nil && exportNode != nil {
				lookupTable[id] = &ExportCollision{
					specifierText: getTextOfNode(exportNode.AsExportDeclaration().moduleSpecifier),
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
func isNonLocalAlias(symbol *Symbol, excludes SymbolFlags) bool {
	if symbol == nil {
		return false
	}
	return symbol.flags&(SymbolFlagsAlias|excludes) == SymbolFlagsAlias ||
		symbol.flags&SymbolFlagsAlias != 0 && symbol.flags&SymbolFlagsAssignment != 0
}

func (c *Checker) resolveAlias(symbol *Symbol) *Symbol {
	if symbol == c.unknownSymbol {
		return symbol // !!! Remove once all symbols are properly resolved
	}
	if symbol.flags&SymbolFlagsAlias == 0 {
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

func (c *Checker) resolveAliasWithDeprecationCheck(symbol *Symbol, location *Node) *Symbol {
	if symbol.flags&SymbolFlagsAlias == 0 || c.isDeprecatedSymbol(symbol) || c.getDeclarationOfAliasSymbol(symbol) == nil {
		return symbol
	}
	targetSymbol := c.resolveAlias(symbol)
	if targetSymbol == c.unknownSymbol {
		return targetSymbol
	}
	for symbol.flags&SymbolFlagsAlias != 0 {
		target := c.getImmediateAliasedSymbol(symbol)
		if target != nil {
			if target == targetSymbol {
				break
			}
			if len(target.declarations) != 0 {
				if c.isDeprecatedSymbol(target) {
					c.addDeprecatedSuggestion(location, target.declarations, target.name)
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
func (c *Checker) getSymbolFlags(symbol *Symbol) SymbolFlags {
	return c.getSymbolFlagsEx(symbol, false /*excludeTypeOnlyMeanings*/, false /*excludeLocalMeanings*/)
}

func (c *Checker) getSymbolFlagsEx(symbol *Symbol, excludeTypeOnlyMeanings bool, excludeLocalMeanings bool) SymbolFlags {
	var typeOnlyDeclaration *Node
	if excludeTypeOnlyMeanings {
		typeOnlyDeclaration = c.getTypeOnlyAliasDeclaration(symbol)
	}
	typeOnlyDeclarationIsExportStar := typeOnlyDeclaration != nil && isExportDeclaration(typeOnlyDeclaration)
	var typeOnlyResolution *Symbol
	if typeOnlyDeclaration != nil {
		if typeOnlyDeclarationIsExportStar {
			moduleSpecifier := typeOnlyDeclaration.AsExportDeclaration().moduleSpecifier
			typeOnlyResolution = c.resolveExternalModuleName(moduleSpecifier, moduleSpecifier /*ignoreErrors*/, true)
		} else {
			typeOnlyResolution = c.resolveAlias(typeOnlyDeclaration.Symbol())
		}
	}
	var typeOnlyExportStarTargets SymbolTable
	if typeOnlyDeclarationIsExportStar && typeOnlyResolution != nil {
		typeOnlyExportStarTargets = c.getExportsOfModule(typeOnlyResolution)
	}
	var flags SymbolFlags
	if !excludeLocalMeanings {
		flags = symbol.flags
	}
	var seenSymbols set[*Symbol]
	for symbol.flags&SymbolFlagsAlias != 0 {
		target := c.getExportSymbolOfValueSymbolIfExported(c.resolveAlias(symbol))
		if !typeOnlyDeclarationIsExportStar && target == typeOnlyResolution || typeOnlyExportStarTargets[target.name] == target {
			break
		}
		if target == c.unknownSymbol {
			return SymbolFlagsAll
		}
		// Optimizations - try to avoid creating or adding to
		// `seenSymbols` if possible
		if target == symbol || seenSymbols.has(target) {
			break
		}
		if target.flags&SymbolFlagsAlias != 0 {
			if seenSymbols.len() == 0 {
				seenSymbols.add(symbol)
			}
			seenSymbols.add(target)
		}
		flags |= target.flags
		symbol = target
	}
	return flags
}

func (c *Checker) getDeclarationOfAliasSymbol(symbol *Symbol) *Node {
	return core.FindLast(symbol.declarations, c.isAliasSymbolDeclaration)
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
func (c *Checker) isAliasSymbolDeclaration(node *Node) bool {
	switch node.kind {
	case SyntaxKindImportEqualsDeclaration, SyntaxKindNamespaceExportDeclaration, SyntaxKindNamespaceImport, SyntaxKindNamespaceExport,
		SyntaxKindImportSpecifier, SyntaxKindExportSpecifier:
		return true
	case SyntaxKindImportClause:
		return node.AsImportClause().name != nil
	case SyntaxKindExportAssignment:
		return exportAssignmentIsAlias(node)
	}
	return false
}

/**
 * Distinct write types come only from set accessors, but synthetic union and intersection
 * properties deriving from set accessors will either pre-compute or defer the union or
 * intersection of the writeTypes of their constituents.
 */
func (c *Checker) getWriteTypeOfSymbol(symbol *Symbol) *Type {
	return c.getTypeOfSymbol(symbol) // !!!
}

func (c *Checker) getTypeOfSymbol(symbol *Symbol) *Type {
	// !!!
	// checkFlags := symbol.checkFlags
	// if checkFlags&CheckFlagsDeferredType != 0 {
	// 	return c.getTypeOfSymbolWithDeferredType(symbol)
	// }
	if symbol.checkFlags&CheckFlagsInstantiated != 0 {
		return c.getTypeOfInstantiatedSymbol(symbol)
	}
	// if checkFlags&CheckFlagsMapped != 0 {
	// 	return c.getTypeOfMappedSymbol(symbol.(MappedSymbol))
	// }
	// if checkFlags&CheckFlagsReverseMapped != 0 {
	// 	return c.getTypeOfReverseMappedSymbol(symbol.(ReverseMappedSymbol))
	// }
	if symbol.flags&(SymbolFlagsVariable|SymbolFlagsProperty) != 0 {
		return c.getTypeOfVariableOrParameterOrProperty(symbol)
	}
	if symbol.flags&(SymbolFlagsFunction|SymbolFlagsMethod|SymbolFlagsClass|SymbolFlagsEnum|SymbolFlagsValueModule) != 0 {
		return c.getTypeOfFuncClassEnumModule(symbol)
	}
	// if symbol.flags&SymbolFlagsEnumMember != 0 {
	// 	return c.getTypeOfEnumMember(symbol)
	// }
	// if symbol.flags&SymbolFlagsAccessor != 0 {
	// 	return c.getTypeOfAccessors(symbol)
	// }
	// if symbol.flags&SymbolFlagsAlias != 0 {
	// 	return c.getTypeOfAlias(symbol)
	// }
	return c.errorType
}

func (c *Checker) getNonMissingTypeOfSymbol(symbol *Symbol) *Type {
	return c.removeMissingType(c.getTypeOfSymbol(symbol), symbol.flags&SymbolFlagsOptional != 0)
}

func (c *Checker) getTypeOfInstantiatedSymbol(symbol *Symbol) *Type {
	links := c.valueSymbolLinks.get(symbol)
	if links.resolvedType == nil {
		links.resolvedType = c.instantiateType(c.getTypeOfSymbol(links.target), links.mapper)
	}
	return links.resolvedType
}

func (c *Checker) getTypeOfVariableOrParameterOrProperty(symbol *Symbol) *Type {
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

func (c *Checker) isParameterOfContextSensitiveSignature(symbol *Symbol) bool {
	return false // !!!
}

func (c *Checker) getTypeOfVariableOrParameterOrPropertyWorker(symbol *Symbol) *Type {
	// Handle prototype property
	if symbol.flags&SymbolFlagsPrototype != 0 {
		return c.getTypeOfPrototypeProperty(symbol)
	}
	// CommonsJS require and module both have type any.
	if symbol == c.requireSymbol {
		return c.anyType
	}
	// !!! Debug.assertIsDefined(symbol.valueDeclaration)
	declaration := symbol.valueDeclaration
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
	switch declaration.kind {
	case SyntaxKindParameter, SyntaxKindPropertyDeclaration, SyntaxKindPropertySignature, SyntaxKindVariableDeclaration,
		SyntaxKindBindingElement:
		result = c.getWidenedTypeForVariableLikeDeclaration(declaration, true /*reportErrors*/)
	case SyntaxKindExportAssignment:
		result = c.widenTypeForVariableLikeDeclaration(c.checkExpressionCached(declaration.AsExportAssignment().expression), declaration, false /*reportErrors*/)
	case SyntaxKindBinaryExpression:
		result = c.getWidenedTypeForAssignmentDeclaration(symbol, nil)
	case SyntaxKindJsxAttribute:
		result = c.checkJsxAttribute(declaration.AsJsxAttribute(), CheckModeNormal)
	case SyntaxKindEnumMember:
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
func (c *Checker) getWidenedTypeForVariableLikeDeclaration(declaration *Node, reportErrors bool) *Type {
	return c.widenTypeForVariableLikeDeclaration(c.getTypeForVariableLikeDeclaration(declaration /*includeOptionality*/, true, CheckModeNormal), declaration, reportErrors)
}

// Return the inferred type for a variable, parameter, or property declaration
func (c *Checker) getTypeForVariableLikeDeclaration(declaration *Node, includeOptionality bool, checkMode CheckMode) *Type {
	// A variable declared in a for..in statement is of type string, or of type keyof T when the
	// right hand expression is of a type parameter type.
	if isVariableDeclaration(declaration) {
		grandParent := declaration.parent.parent
		switch grandParent.kind {
		case SyntaxKindForInStatement:
			// !!!
			// indexType := c.getIndexType(c.getNonNullableTypeIfNeeded(c.checkExpression(declaration.parent.parent.expression /*checkMode*/, checkMode)))
			// if indexType.flags & (TypeFlagsTypeParameter | TypeFlagsIndex) {
			// 	return c.getExtractStringType(indexType)
			// } else {
			// 	return c.stringType
			// }
			return c.stringType
		case SyntaxKindForOfStatement:
			// checkRightHandSideOfForOf will return undefined if the for-of expression type was
			// missing properties/signatures required to get its iteratedType (like
			// [Symbol.iterator] or next). This may be because we accessed properties from anyType,
			// or it may have led to an error inside getElementTypeOfIterable.
			return c.checkRightHandSideOfForOf(grandParent)
		}
	} else if isBindingElement(declaration) {
		return c.getTypeForBindingElement(declaration)
	}
	isProperty := isPropertyDeclaration(declaration) && !hasAccessorModifier(declaration) || isPropertySignatureDeclaration(declaration)
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
	if c.noImplicitAny && isVariableDeclaration(declaration) && !isBindingPattern(declaration.Name()) &&
		c.getCombinedModifierFlagsCached(declaration)&ModifierFlagsExport == 0 && declaration.flags&NodeFlagsAmbient == 0 {
		// If --noImplicitAny is on or the declaration is in a Javascript file,
		// use control flow tracked 'any' type for non-ambient, non-exported var or let variables with no
		// initializer or a 'null' or 'undefined' initializer.
		variableDeclaration := declaration.AsVariableDeclaration()
		if c.getCombinedNodeFlagsCached(declaration)&NodeFlagsConstant == 0 && (variableDeclaration.initializer == nil || c.isNullOrUndefined(variableDeclaration.initializer)) {
			return c.autoType
		}
		// Use control flow tracked 'any[]' type for non-ambient, non-exported variables with an empty array
		// literal initializer.
		if variableDeclaration.initializer != nil && isEmptyArrayLiteral(variableDeclaration.initializer) {
			return c.autoArrayType
		}
	}
	if isParameter(declaration) {
		// !!!
		// if declaration.Symbol() == nil {
		// 	// parameters of function types defined in JSDoc in TS files don't have symbols
		// 	return nil
		// }
		// fn := declaration.parent.(FunctionLikeDeclaration)
		// // For a parameter of a set accessor, use the type of the get accessor if one is present
		// if fn.kind == SyntaxKindSetAccessor && c.hasBindableName(fn) {
		// 	getter := getDeclarationOfKind(c.getSymbolOfDeclaration(declaration.parent), SyntaxKindGetAccessor)
		// 	if getter != nil {
		// 		getterSignature := c.getSignatureFromDeclaration(getter)
		// 		thisParameter := c.getAccessorThisParameter(fn.(AccessorDeclaration))
		// 		if thisParameter && declaration == thisParameter {
		// 			// Use the type from the *getter*
		// 			Debug.assert(!thisParameter.type_)
		// 			return c.getTypeOfSymbol(getterSignature.thisParameter)
		// 		}
		// 		return c.getReturnTypeOfSignature(getterSignature)
		// 	}
		// }
		// parameterTypeOfTypeTag := c.getParameterTypeOfTypeTag(fn, declaration)
		// if parameterTypeOfTypeTag {
		// 	return parameterTypeOfTypeTag
		// }
		// // Use contextual parameter type if one is available
		// var type_ *Type
		// if declaration.symbol.escapedName == InternalSymbolNameThis {
		// 	type_ = c.getContextualThisParameterType(fn)
		// } else {
		// 	type_ = c.getContextuallyTypedParameterType(declaration)
		// }
		// if type_ {
		// 	return c.addOptionality(type_ /*isProperty*/, false, isOptional)
		// }
	}
	// Use the type of the initializer expression if one is present and the declaration is
	// not a parameter of a contextually typed function
	if getInitializerFromNode(declaration) != nil {
		t := c.widenTypeInferredFromInitializer(declaration, c.checkDeclarationInitializer(declaration, checkMode, nil /*contextualType*/))
		return c.addOptionalityEx(t, isProperty, isOptional)
	}
	if c.noImplicitAny && isPropertyDeclaration(declaration) {
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
	if isJsxAttribute(declaration) {
		// if JSX attribute doesn't have initializer, by default the attribute will have boolean value of true.
		// I.e <Elem attr /> is sugar for <Elem attr={true} />
		return c.trueType
	}
	// If the declaration specifies a binding pattern and is not a parameter of a contextually
	// typed function, use the type implied by the binding pattern
	if isBindingPattern(declaration.Name()) {
		return c.getTypeFromBindingPattern(declaration.Name() /*includePatternInType*/, false /*reportErrors*/, true)
	}
	// No type specified and nothing can be inferred
	return nil
}

func (c *Checker) checkDeclarationInitializer(declaration *Node, checkMode CheckMode, contextualType *Type) *Type {
	initializer := c.getEffectiveInitializer(declaration)
	t := c.getQuickTypeOfExpression(initializer)
	if t == nil {
		if contextualType != nil {
			t = c.checkExpressionWithContextualType(initializer, contextualType, nil /*inferenceContext*/, checkMode)
		} else {
			t = c.checkExpressionCachedEx(initializer, checkMode)
		}
	}
	if isParameter(getRootDeclaration(declaration)) {
		name := declaration.Name()
		switch name.kind {
		case SyntaxKindObjectBindingPattern:
			if isObjectLiteralType(t) {
				return c.padObjectLiteralType(t, name)
			}
		case SyntaxKindArrayBindingPattern:
			if isTupleType(t) {
				return c.padTupleType(t, name)
			}
		}
	}
	return t
}

func (c *Checker) padObjectLiteralType(t *Type, pattern *Node) *Type {
	return t
}

func (c *Checker) padTupleType(t *Type, pattern *Node) *Type {
	return t
}

func (c *Checker) getEffectiveInitializer(declaration *Node) *Node {
	return getInitializerFromNode(declaration)
}

func (c *Checker) widenTypeInferredFromInitializer(declaration *Node, t *Type) *Type {
	if c.getCombinedNodeFlagsCached(declaration)&NodeFlagsConstant != 0 || isDeclarationReadonly(declaration) {
		return t
	}
	return c.getWidenedLiteralType(t)
}

func (c *Checker) getTypeOfFuncClassEnumModule(symbol *Symbol) *Type {
	links := c.valueSymbolLinks.get(symbol)
	if links.resolvedType == nil {
		links.resolvedType = c.getTypeOfFuncClassEnumModuleWorker(symbol)
	}
	return links.resolvedType
}

func (c *Checker) getTypeOfFuncClassEnumModuleWorker(symbol *Symbol) *Type {
	if symbol.flags&SymbolFlagsModule != 0 && isShorthandAmbientModuleSymbol(symbol) {
		return c.anyType
	}
	t := c.newObjectType(ObjectFlagsAnonymous, symbol)
	if symbol.flags&SymbolFlagsClass != 0 {
		baseTypeVariable := c.getBaseTypeVariableOfClass(symbol)
		if baseTypeVariable != nil {
			return c.getIntersectionType([]*Type{t, baseTypeVariable})
		}
		return t
	}
	if c.strictNullChecks && symbol.flags&SymbolFlagsOptional != 0 {
		return c.getOptionalType(t /*isProperty*/, true)
	}
	return t
}

func (c *Checker) getBaseTypeVariableOfClass(symbol *Symbol) *Type {
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
		c.error(t.symbol.valueDeclaration, diagnostics.X_0_is_referenced_directly_or_indirectly_in_its_own_base_expression, c.symbolToString(t.symbol))
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
			if baseConstructorType.symbol.declarations != nil {
				err.addRelatedInfo(createDiagnosticForNode(baseConstructorType.symbol.declarations[0], diagnostics.Did_you_mean_for_0_to_be_constrained_to_type_new_args_Colon_any_1, c.symbolToString(baseConstructorType.symbol), c.typeToString(ctorReturn)))
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

func (c *Checker) getTypeOfParameter(symbol *Symbol) *Type {
	declaration := symbol.valueDeclaration
	return c.addOptionalityEx(c.getTypeOfSymbol(symbol), false, declaration != nil && (getInitializerFromNode(declaration) != nil || isOptionalDeclaration(declaration)))
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
					if isMappedTypeNode(constraintDeclaration.parent.parent) {
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

func (c *Checker) getDeclaredTypeOfClassOrInterface(symbol *Symbol) *Type {
	links := c.interfaceTypeLinks.get(symbol)
	if links.declaredType == nil {
		kind := ifElse(symbol.flags&SymbolFlagsClass != 0, ObjectFlagsClass, ObjectFlagsInterface)
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
func (c *Checker) isThislessInterface(symbol *Symbol) bool {
	for _, declaration := range symbol.declarations {
		if isInterfaceDeclaration(declaration) {
			if declaration.flags&NodeFlagsContainsThis != 0 {
				return false
			}
			baseTypeNodes := getInterfaceBaseTypeNodes(declaration)
			for _, node := range baseTypeNodes {
				if isEntityNameExpression(node.Expression()) {
					baseSymbol := c.resolveEntityName(node.Expression(), SymbolFlagsType, true /*ignoreErrors*/, false, nil)
					if baseSymbol == nil || baseSymbol.flags&SymbolFlagsInterface == 0 || c.getDeclaredTypeOfClassOrInterface(baseSymbol).AsInterfaceType().thisType != nil {
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

func (b *KeyBuilder) WriteSymbol(s *Symbol) {
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
	for _, d := range target.symbol.declarations {
		if isTypeParameterDeclaration(d) && (!isTypeParameterList(d.parent) || d.AsTypeParameter().constraint != nil) {
			return false
		}
	}
	return true
}

func (c *Checker) isNullOrUndefined(node *Node) bool {
	expr := skipParentheses(node)
	switch expr.kind {
	case SyntaxKindNullKeyword:
		return true
	case SyntaxKindIdentifier:
		return c.getResolvedSymbol(expr) == c.undefinedSymbol
	}
	return false
}

func (c *Checker) checkRightHandSideOfForOf(statement *Node) *Type {
	return c.anyType // !!!
}

func (c *Checker) getTypeForBindingElement(declaration *Node) *Type {
	return c.anyType // !!!
}

// Return the type implied by a binding pattern. This is the type implied purely by the binding pattern itself
// and without regard to its context (i.e. without regard any type annotation or initializer associated with the
// declaration in which the binding pattern is contained). For example, the implied type of [x, y] is [any, any]
// and the implied type of { x, y: z = 1 } is { x: any; y: number; }. The type implied by a binding pattern is
// used as the contextual type of an initializer associated with the binding pattern. Also, for a destructuring
// parameter with no type annotation or initializer, the type implied by the binding pattern becomes the type of
// the parameter.
func (c *Checker) getTypeFromBindingPattern(pattern *Node, includePatternInType bool, reportErrors bool) *Type {
	return c.anyType // !!!
}

func (c *Checker) getTypeOfPrototypeProperty(prototype *Symbol) *Type {
	return c.anyType // !!!
}

func (c *Checker) getWidenedTypeForAssignmentDeclaration(symbol *Symbol, resolvedSymbol *Symbol) *Type {
	return c.anyType // !!!
}

func (c *Checker) widenTypeForVariableLikeDeclaration(t *Type, declaration *Node, reportErrors bool) *Type {
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
	if isParameter(declaration) && declaration.AsParameterDeclaration().dotDotDotToken != nil {
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

func (c *Checker) reportImplicitAny(declaration *Node, t *Type, wideningKind WideningKind) {
	typeAsString := c.typeToString(c.getWidenedType(t))
	var diagnostic *diagnostics.Message
	switch declaration.kind {
	case SyntaxKindBinaryExpression, SyntaxKindPropertyDeclaration, SyntaxKindPropertySignature:
		diagnostic = ifElse(c.noImplicitAny,
			diagnostics.Member_0_implicitly_has_an_1_type,
			diagnostics.Member_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage)
	case SyntaxKindParameter:
		param := declaration.AsParameterDeclaration()
		if isIdentifier(param.name) {
			name := param.name.AsIdentifier()
			originalKeywordKind := identifierToKeywordKind(name)
			if (isCallSignatureDeclaration(declaration.parent) || isMethodSignatureDeclaration(declaration.parent) || isFunctionTypeNode(declaration.parent)) &&
				slices.Contains(declaration.parent.Parameters(), declaration) &&
				(isTypeNodeKind(originalKeywordKind) || c.resolveName(declaration, name.text, SymbolFlagsType, nil /*nameNotFoundMessage*/, true /*isUse*/, false /*excludeGlobals*/) != nil) {
				newName := fmt.Sprintf("arg%v", slices.Index(declaration.parent.Parameters(), declaration))
				typeName := declarationNameToString(param.name) + ifElse(param.dotDotDotToken != nil, "[]", "")
				c.errorOrSuggestion(c.noImplicitAny, declaration, diagnostics.Parameter_has_a_name_but_no_type_Did_you_mean_0_Colon_1, newName, typeName)
				return
			}
		}
		switch {
		case param.dotDotDotToken != nil:
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
	case SyntaxKindBindingElement:
		diagnostic = diagnostics.Binding_element_0_implicitly_has_an_1_type
		if !c.noImplicitAny {
			// Don't issue a suggestion for binding elements since the codefix doesn't yet support them.
			return
		}
	case SyntaxKindFunctionDeclaration, SyntaxKindMethodDeclaration, SyntaxKindMethodSignature, SyntaxKindGetAccessor,
		SyntaxKindSetAccessor, SyntaxKindFunctionExpression, SyntaxKindArrowFunction:
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
	case SyntaxKindMappedType:
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

func (c *Checker) getTypeOfEnumMember(symbol *Symbol) *Type {
	return c.anyType // !!!
}

func (c *Checker) addOptionalityEx(t *Type, isProperty bool, isOptional bool) *Type {
	if c.strictNullChecks && isOptional {
		return c.getOptionalType(t, isProperty)
	}
	return t
}

func (c *Checker) getOptionalType(t *Type, isProperty bool) *Type {
	// !!! Debug.assert(c.strictNullChecks)
	missingOrUndefined := ifElse(isProperty, c.undefinedOrMissingType, c.undefinedType)
	if t == missingOrUndefined || t.flags&TypeFlagsUnion != 0 && t.Types()[0] == missingOrUndefined {
		return t
	}
	return c.getUnionType([]*Type{t, missingOrUndefined})
}

func (c *Checker) getNonNullableType(t *Type) *Type {
	// !!!
	// if c.strictNullChecks {
	// 	return c.getAdjustedTypeWithFacts(t, TypeFactsNEUndefinedOrNull)
	// } else {
	// 	return t
	// }
	return t
}

func (c *Checker) getDeclarationNodeFlagsFromSymbol(s *Symbol) NodeFlags {
	if s.valueDeclaration != nil {
		return c.getCombinedNodeFlagsCached(s.valueDeclaration)
	}
	return NodeFlagsNone
}

func (c *Checker) getCombinedNodeFlagsCached(node *Node) NodeFlags {
	// we hold onto the last node and result to speed up repeated lookups against the same node.
	if c.lastGetCombinedNodeFlagsNode == node {
		return c.lastGetCombinedNodeFlagsResult
	}
	c.lastGetCombinedNodeFlagsNode = node
	c.lastGetCombinedNodeFlagsResult = getCombinedNodeFlags(node)
	return c.lastGetCombinedNodeFlagsResult
}

func (c *Checker) getCombinedModifierFlagsCached(node *Node) ModifierFlags {
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
		return c.valueSymbolLinks.get(r.target.(*Symbol)).resolvedType != nil
	case TypeSystemPropertyNameDeclaredType:
		return c.typeAliasLinks.get(r.target.(*Symbol)).declaredType != nil
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

func (c *Checker) reportCircularityError(symbol *Symbol) *Type {
	declaration := symbol.valueDeclaration
	// Check if variable has type annotation that circularly references the variable itself
	if declaration != nil {
		if getEffectiveTypeAnnotationNode(declaration) != nil {
			c.error(symbol.valueDeclaration, diagnostics.X_0_is_referenced_directly_or_indirectly_in_its_own_type_annotation, c.symbolToString(symbol))
			return c.errorType
		}
		// Check if variable has initializer that circularly references the variable itself
		if c.noImplicitAny && (declaration.kind != SyntaxKindParameter || declaration.AsParameterDeclaration().initializer != nil) {
			c.error(symbol.valueDeclaration, diagnostics.X_0_implicitly_has_type_any_because_it_does_not_have_a_type_annotation_and_is_referenced_directly_or_indirectly_in_its_own_initializer, c.symbolToString(symbol))
		}
	} else if symbol.flags&SymbolFlagsAlias != 0 {
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

func (c *Checker) getPropertiesOfType(t *Type) []*Symbol {
	t = c.getReducedApparentType(t)
	if t.flags&TypeFlagsUnionOrIntersection != 0 {
		return c.getPropertiesOfUnionOrIntersectionType(t)
	}
	return c.getPropertiesOfObjectType(t)
}

func (c *Checker) getPropertiesOfObjectType(t *Type) []*Symbol {
	if t.flags&TypeFlagsObject != 0 {
		return c.resolveStructuredTypeMembers(t).properties
	}
	return nil
}

func (c *Checker) getPropertiesOfUnionOrIntersectionType(t *Type) []*Symbol {
	d := t.AsUnionOrIntersectionType()
	if d.resolvedProperties == nil {
		var checked set[string]
		props := []*Symbol{}
		for _, current := range d.types {
			for _, prop := range c.getPropertiesOfType(current) {
				if !checked.has(prop.name) {
					checked.add(prop.name)
					combinedProp := c.getPropertyOfUnionOrIntersectionType(t, prop.name, t.flags&TypeFlagsIntersection != 0 /*skipObjectFunctionPropertyAugment*/)
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

func (c *Checker) getPropertyOfType(t *Type, name string) *Symbol {
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
func (c *Checker) getPropertyOfTypeEx(t *Type, name string, skipObjectFunctionPropertyAugment bool, includeTypeOnlyMembers bool) *Symbol {
	t = c.getReducedApparentType(t)
	switch {
	case t.flags&TypeFlagsObject != 0:
		resolved := c.resolveStructuredTypeMembers(t)
		symbol := resolved.members[name]
		if symbol != nil {
			if !includeTypeOnlyMembers && t.symbol != nil && t.symbol.flags&SymbolFlagsValueModule != 0 && c.moduleSymbolLinks.get(t.symbol).typeOnlyExportStarMap[name] != nil {
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
	var members SymbolTable
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
		case t.symbol.flags&(SymbolFlagsClass|SymbolFlagsInterface) != 0:
			if t.symbol.flags&SymbolFlagsClass != 0 {
				c.resolveBaseTypesOfClass(t)
			}
			if t.symbol.flags&SymbolFlagsInterface != 0 {
				c.resolveBaseTypesOfInterface(t)
			}
		default:
			panic("Unhandled case in getBaseTypes")
		}
		if !c.popTypeResolution() && t.symbol.declarations != nil {
			for _, declaration := range t.symbol.declarations {
				if isClassDeclaration(declaration) || isInterfaceDeclaration(declaration) {
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
	if baseConstructorType.symbol != nil && baseConstructorType.symbol.flags&SymbolFlagsClass != 0 && c.areAllOuterTypeParametersApplied(originalBaseType) {
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
		constructors := c.getInstantiatedConstructorsForTypeArguments(baseConstructorType, getTypeArgumentNodesFromNode(baseTypeNode), baseTypeNode)
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
		diagnostic.addMessageChain(c.elaborateNeverIntersection(nil, baseType))
		c.diagnostics.add(diagnostic)
		return
	}
	if t == reducedBaseType || c.hasBaseType(reducedBaseType, t) {
		c.error(t.symbol.valueDeclaration, diagnostics.Type_0_recursively_references_itself_as_a_base_type, c.typeToString(t))
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

func getBaseTypeNodeOfClass(t *Type) *Node {
	decl := getClassLikeDeclarationOfSymbol(t.symbol)
	if decl != nil {
		return getClassExtendsHeritageElement(decl)
	}
	return nil
}

func (c *Checker) getInstantiatedConstructorsForTypeArguments(t *Type, typeArgumentNodes []*Node, location *Node) []*Signature {
	signatures := c.getConstructorsForTypeArguments(t, typeArgumentNodes, location)
	typeArguments := core.Map(typeArgumentNodes, c.getTypeFromTypeNode)
	return core.SameMap(signatures, func(sig *Signature) *Signature {
		if len(sig.typeParameters) != 0 {
			return c.getSignatureInstantiation(sig, typeArguments, nil)
		}
		return sig
	})
}

func (c *Checker) getConstructorsForTypeArguments(t *Type, typeArgumentNodes []*Node, location *Node) []*Signature {
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
		var kind SyntaxKind
		if sig.declaration != nil {
			kind = sig.declaration.kind
		}
		// If declaration is undefined, it is likely to be the signature of the default constructor.
		isConstructor := kind == SyntaxKindUnknown || kind == SyntaxKindConstructor || kind == SyntaxKindConstructSignature || kind == SyntaxKindConstructorType
		// The type must have a symbol with a `Function` flag and a declaration in order to be correctly flagged as possibly containing
		// type variables by `couldContainTypeVariables`
		t := c.newObjectType(ObjectFlagsAnonymous|ObjectFlagsSingleSignatureType, c.newSymbol(SymbolFlagsFunction, InternalSymbolNameFunction))
		if sig.declaration != nil && !nodeIsSynthesized(sig.declaration) {
			t.symbol.declarations = []*Node{sig.declaration}
			t.symbol.valueDeclaration = sig.declaration
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
	for _, declaration := range t.symbol.declarations {
		if isInterfaceDeclaration(declaration) {
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

func (c *Checker) reportCircularBaseType(node *Node, t *Type) {
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

func (c *Checker) addInheritedMembers(symbols SymbolTable, baseSymbols []*Symbol) SymbolTable {
	for _, base := range baseSymbols {
		if !isStaticPrivateIdentifierProperty(base) {
			if _, ok := symbols[base.name]; !ok {
				if symbols == nil {
					symbols = make(SymbolTable)
				}
				symbols[base.name] = base
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

func (c *Checker) getIndexInfosOfSymbol(symbol *Symbol) []*IndexInfo {
	indexSymbol := c.getIndexSymbol(symbol)
	if indexSymbol != nil {
		return c.getIndexInfosOfIndexSymbol(indexSymbol, slices.Collect(maps.Values(c.getMembersOfSymbol(symbol))))
	}
	return nil
}

// note intentional similarities to index signature building in `checkObjectLiteral` for parity
func (c *Checker) getIndexInfosOfIndexSymbol(indexSymbol *Symbol, siblingSymbols []*Symbol) []*IndexInfo {
	var indexInfos []*IndexInfo
	hasComputedStringProperty := false
	hasComputedNumberProperty := false
	hasComputedSymbolProperty := false
	readonlyComputedStringProperty := true
	readonlyComputedNumberProperty := true
	readonlyComputedSymbolProperty := true
	var propertySymbols []*Symbol
	for _, declaration := range indexSymbol.declarations {
		if isIndexSignatureDeclaration(declaration) {
			parameters := declaration.Parameters()
			returnTypeNode := declaration.ReturnType()
			if len(parameters) == 1 {
				typeNode := parameters[0].AsParameterDeclaration().typeNode
				if typeNode != nil {
					valueType := c.anyType
					if returnTypeNode != nil {
						valueType = c.getTypeFromTypeNode(returnTypeNode)
					}
					forEachType(c.getTypeFromTypeNode(typeNode), func(keyType *Type) {
						if c.isValidIndexKeyType(keyType) && findIndexInfo(indexInfos, keyType) == nil {
							indexInfo := c.newIndexInfo(keyType, valueType, hasEffectiveModifier(declaration, ModifierFlagsReadonly), declaration)
							indexInfos = append(indexInfos, indexInfo)
						}
					})
				}
			}
		} else if c.hasLateBindableIndexSignature(declaration) {
			var declName *Node
			if isBinaryExpression(declaration) {
				declName = declaration.AsBinaryExpression().left
			} else {
				declName = declaration.Name()
			}
			var keyType *Type
			if isElementAccessExpression(declName) {
				keyType = c.checkExpressionCached(declName.AsElementAccessExpression().argumentExpression)
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
func (c *Checker) getObjectLiteralIndexInfo(isReadonly bool, properties []*Symbol, keyType *Type) *IndexInfo {
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

func (c *Checker) isSymbolWithSymbolName(symbol *Symbol) bool {
	if isKnownSymbol(symbol) {
		return true
	}
	if len(symbol.declarations) != 0 {
		name := symbol.declarations[0].Name()
		return name != nil && isComputedPropertyName(name) && c.isTypeAssignableToKind(c.checkComputedPropertyName(name), TypeFlagsESSymbol)
	}
	return false
}

func (c *Checker) isSymbolWithNumericName(symbol *Symbol) bool {
	if isNumericLiteralName(symbol.name) {
		return true
	}
	if len(symbol.declarations) != 0 {
		name := symbol.declarations[0].Name()
		return name != nil && c.isNumericName(name)
	}
	return false
}

func (c *Checker) isNumericName(name *Node) bool {
	switch name.kind {
	case SyntaxKindComputedPropertyName:
		return c.isNumericComputedName(name)
	case SyntaxKindIdentifier, SyntaxKindNumericLiteral, SyntaxKindStringLiteral:
		return isNumericLiteralName(name.Text())
	}
	return false
}

func (c *Checker) isNumericComputedName(name *Node) bool {
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

func (c *Checker) getIndexSymbol(symbol *Symbol) *Symbol {
	return c.getMembersOfSymbol(symbol)[InternalSymbolNameIndex]
}

func (c *Checker) getSignaturesOfSymbol(symbol *Symbol) []*Signature {
	if symbol == nil {
		return nil
	}
	var result []*Signature
	for i, decl := range symbol.declarations {
		if !isFunctionLike(decl) {
			continue
		}
		// Don't include signature if node is the implementation of an overloaded function. A node is considered
		// an implementation node if it has a body and the previous node is of the same kind and immediately
		// precedes the implementation node (i.e. has the same parent and ends where the implementation starts).
		if i > 0 && getBodyOfNode(decl) != nil {
			previous := symbol.declarations[i-1]
			if decl.parent == previous.parent && decl.kind == previous.kind && decl.Pos() == previous.End() {
				continue
			}
		}
		// If this is a function or method declaration, get the signature from the @type tag for the sake of optional parameters.
		// Exclude contextually-typed kinds because we already apply the @type tag to the context, plus applying it here to the initializer would supress checks that the two are compatible.
		result = append(result, c.getSignatureFromDeclaration(decl))
	}
	return result
}

func (c *Checker) getSignatureFromDeclaration(declaration *Node) *Signature {
	links := c.signatureLinks.get(declaration)
	if links.resolvedSignature != nil {
		return links.resolvedSignature
	}
	var parameters []*Symbol
	var flags SignatureFlags
	var thisParameter *Symbol
	minArgumentCount := 0
	hasThisParameter := false
	iife := getImmediatelyInvokedFunctionExpression(declaration)
	for i, param := range declaration.Parameters() {
		paramSymbol := param.Symbol()
		typeNode := param.AsParameterDeclaration().typeNode
		// Include parameter symbol instead of property symbol in the signature
		if paramSymbol != nil && paramSymbol.flags&SymbolFlagsProperty != 0 && !isBindingPattern(param.Name()) {
			resolvedSymbol := c.resolveName(param, paramSymbol.name, SymbolFlagsValue, nil /*nameNotFoundMessage*/, false /*isUse*/, false /*excludeGlobals*/)
			paramSymbol = resolvedSymbol
		}
		if i == 0 && paramSymbol.name == InternalSymbolNameThis {
			hasThisParameter = true
			thisParameter = param.Symbol()
		} else {
			parameters = append(parameters, paramSymbol)
		}
		if typeNode != nil && typeNode.kind == SyntaxKindLiteralType {
			flags |= SignatureFlagsHasLiteralTypes
		}
		// Record a new minimum argument count if this is not an optional parameter
		isOptionalParameter := isOptionalDeclaration(param) ||
			param.AsParameterDeclaration().initializer != nil ||
			isRestParameter(param) ||
			iife != nil && len(parameters) > len(iife.AsCallExpression().arguments) && typeNode == nil
		if !isOptionalParameter {
			minArgumentCount = len(parameters)
		}
	}
	// If only one accessor includes a this-type annotation, the other behaves as if it had the same type annotation
	if (isGetAccessorDeclaration(declaration) || isSetAccessorDeclaration(declaration)) && c.hasBindableName(declaration) && (!hasThisParameter || thisParameter == nil) {
		otherKind := ifElse(isGetAccessorDeclaration(declaration), SyntaxKindSetAccessor, SyntaxKindGetAccessor)
		other := getDeclarationOfKind(c.getSymbolOfDeclaration(declaration), otherKind)
		if other != nil {
			thisParameter = c.getAnnotatedAccessorThisParameter(other)
		}
	}
	var classType *Type
	if isConstructorDeclaration(declaration) {
		classType = c.getDeclaredTypeOfClassOrInterface(c.getMergedSymbol(declaration.parent.Symbol()))
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
	if isConstructorTypeNode(declaration) || isConstructorDeclaration(declaration) || isConstructSignatureDeclaration(declaration) {
		flags |= SignatureFlagsConstruct
	}
	if isConstructorTypeNode(declaration) && hasSyntacticModifier(declaration, ModifierFlagsAbstract) || isConstructorDeclaration(declaration) && hasSyntacticModifier(declaration.parent, ModifierFlagsAbstract) {
		flags |= SignatureFlagsAbstract
	}
	links.resolvedSignature = c.newSignature(flags, declaration, typeParameters, thisParameter, parameters, nil /*resolvedReturnType*/, nil /*resolvedTypePredicate*/, minArgumentCount)
	return links.resolvedSignature
}

func (c *Checker) getTypeParametersFromDeclaration(declaration *Node) []*Type {
	var result []*Type
	for _, node := range getTypeParameterNodesFromNode(declaration) {
		result = core.AppendIfUnique(result, c.getDeclaredTypeOfTypeParameter(node.Symbol()))
	}
	return result
}

func (c *Checker) getAnnotatedAccessorThisParameter(accessor *Node) *Symbol {
	parameter := c.getAccessorThisParameter(accessor)
	if parameter != nil {
		return parameter.Symbol()
	}
	return nil
}

func (c *Checker) getAccessorThisParameter(accessor *Node) *Node {
	if len(accessor.Parameters()) == ifElse(isGetAccessorDeclaration(accessor), 1, 2) {
		return getThisParameter(accessor)
	}
	return nil
}

/**
 * Indicates whether a declaration has an early-bound name or a dynamic name that can be late-bound.
 */
func (c *Checker) hasBindableName(node *Node) bool {
	return !hasDynamicName(node) || c.hasLateBindableName(node)
}

/**
 * Indicates whether a declaration has a late-bindable dynamic name.
 */
func (c *Checker) hasLateBindableName(node *Node) bool {
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
func (c *Checker) isLateBindableName(node *Node) bool {
	if !isLateBindableAST(node) {
		return false
	}
	if isComputedPropertyName(node) {
		return isTypeUsableAsPropertyName(c.checkComputedPropertyName(node))
	}
	return isTypeUsableAsPropertyName(c.checkExpressionCached(node.AsElementAccessExpression().argumentExpression))
}

func (c *Checker) hasLateBindableIndexSignature(node *Node) bool {
	name := getNameOfDeclaration(node)
	return name != nil && c.isLateBindableIndexSignature(name)
}

func (c *Checker) isLateBindableIndexSignature(node *Node) bool {
	if !isLateBindableAST(node) {
		return false
	}
	if isComputedPropertyName(node) {
		return c.isTypeUsableAsIndexSignature(c.checkComputedPropertyName(node))
	}
	return c.isTypeUsableAsIndexSignature(c.checkExpressionCached(node.AsElementAccessExpression().argumentExpression))
}

func (c *Checker) isTypeUsableAsIndexSignature(t *Type) bool {
	return c.isTypeAssignableTo(t, c.stringNumberSymbolType)
}

func isLateBindableAST(node *Node) bool {
	var expr *Node
	switch {
	case isComputedPropertyName(node):
		expr = node.AsComputedPropertyName().expression
	case isElementAccessExpression(node):
		expr = node.AsElementAccessExpression().argumentExpression
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
			if !nodeIsMissing(getBodyOfNode(sig.declaration)) {
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
			typeNode := sig.declaration.ReturnType()
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

func (c *Checker) getReturnTypeFromAnnotation(declaration *Node) *Type {
	if isConstructorDeclaration(declaration) {
		return c.getDeclaredTypeOfClassOrInterface(c.getMergedSymbol(declaration.parent.Symbol()))
	}
	returnType := getEffectiveTypeAnnotationNode(declaration)
	if returnType != nil {
		return c.getTypeFromTypeNode(returnType)
	}
	if isGetAccessorDeclaration(declaration) && c.hasBindableName(declaration) {
		return c.getAnnotatedAccessorType(getDeclarationOfKind(c.getSymbolOfDeclaration(declaration), SyntaxKindSetAccessor))
	}
	return nil
}

func (c *Checker) getAnnotatedAccessorType(accessor *Node) *Type {
	node := c.getAnnotatedAccessorTypeNode(accessor)
	if node != nil {
		return c.getTypeFromTypeNode(node)
	}
	return nil
}

func (c *Checker) getAnnotatedAccessorTypeNode(accessor *Node) *Node {
	if accessor != nil {
		switch accessor.kind {
		case SyntaxKindGetAccessor, SyntaxKindPropertyDeclaration:
			return getEffectiveTypeAnnotationNode(accessor)
		case SyntaxKindSetAccessor:
			return getEffectiveSetAccessorTypeAnnotationNode(accessor)
		}
	}
	return nil
}

func getEffectiveSetAccessorTypeAnnotationNode(node *Node) *Node {
	param := getSetAccessorValueParameter(node)
	if param != nil {
		return getEffectiveTypeAnnotationNode(param)
	}
	return nil
}

func getSetAccessorValueParameter(accessor *Node) *Node {
	parameters := accessor.Parameters()
	if len(parameters) > 0 {
		hasThis := len(parameters) == 2 && parameterIsThisKeyword(parameters[0])
		return parameters[ifElse(hasThis, 1, 0)]
	}
	return nil
}

func (c *Checker) getReturnTypeFromBody(sig *Node) *Type {
	return c.anyType // !!!
}

func (c *Checker) getTypePredicateFromBody(fn *Node) *TypePredicate {
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
	if symbol.flags&SymbolFlagsTypeLiteral != 0 {
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
		varsOnly := make(SymbolTable)
		for _, p := range members {
			if p.flags&SymbolFlagsBlockScoped == 0 && !(p.flags&SymbolFlagsValueModule != 0 && len(p.declarations) != 0 && core.Every(p.declarations, isAmbientModule)) {
				varsOnly[p.name] = p
			}
		}
		members = varsOnly
	}
	var baseConstructorIndexInfo *IndexInfo
	c.setStructuredTypeMembers(t, members, nil, nil, nil)
	if symbol.flags&SymbolFlagsClass != 0 {
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
		if symbol.flags&SymbolFlagsEnum != 0 && (c.getDeclaredTypeOfSymbol(symbol).flags&TypeFlagsEnum != 0 || core.Some(d.properties, func(prop *Symbol) bool {
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
	if symbol.flags&(SymbolFlagsFunction|SymbolFlagsMethod) != 0 {
		d.signatures = c.getSignaturesOfSymbol(symbol)
		d.callSignatureCount = len(d.signatures)
	}
	// And likewise for construct signatures for classes
	if symbol.flags&SymbolFlagsClass != 0 {
		classType := c.getDeclaredTypeOfClassOrInterface(symbol)
		constructSignatures := c.getSignaturesOfSymbol(symbol.members[InternalSymbolNameConstructor])
		if len(constructSignatures) == 0 {
			constructSignatures = c.getDefaultConstructSignatures(classType)
		}
		d.signatures = append(d.signatures, constructSignatures...)
	}
}

// The mappingThisOnly flag indicates that the only type parameter being mapped is "this". When the flag is true,
// we check symbols to see if we can quickly conclude they are free of "this" references, thus needing no instantiation.
func (c *Checker) createInstantiatedSymbolTable(symbols []*Symbol, m *TypeMapper) SymbolTable {
	if len(symbols) == 0 {
		return nil
	}
	result := make(SymbolTable)
	for _, symbol := range symbols {
		result[symbol.name] = c.instantiateSymbol(symbol, m)
	}
	return result
}

// The mappingThisOnly flag indicates that the only type parameter being mapped is "this". When the flag is true,
// we check symbols to see if we can quickly conclude they are free of "this" references, thus needing no instantiation.
func (c *Checker) instantiateSymbolTable(symbols SymbolTable, m *TypeMapper, mappingThisOnly bool) SymbolTable {
	if len(symbols) == 0 {
		return nil
	}
	result := make(SymbolTable)
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

func (c *Checker) instantiateSymbol(symbol *Symbol, m *TypeMapper) *Symbol {
	if symbol == nil {
		return nil
	}
	links := c.valueSymbolLinks.get(symbol)
	// If the type of the symbol is already resolved, and if that type could not possibly
	// be affected by instantiation, simply return the symbol itself.
	if links.resolvedType != nil && !c.couldContainTypeVariables(links.resolvedType) {
		if symbol.flags&SymbolFlagsSetAccessor == 0 {
			return symbol
		}
		// If we're a setter, check writeType.
		if links.writeType != nil && !c.couldContainTypeVariables(links.writeType) {
			return symbol
		}
	}
	if symbol.checkFlags&CheckFlagsInstantiated != 0 {
		// If symbol being instantiated is itself a instantiation, fetch the original target and combine the
		// type mappers. This ensures that original type identities are properly preserved and that aliases
		// always reference a non-aliases.
		symbol = links.target
		m = c.combineTypeMappers(links.mapper, m)
	}
	// Keep the flags from the symbol we're instantiating.  Mark that is instantiated, and
	// also transient so that we can just store data on it directly.
	result := c.newSymbol(symbol.flags, symbol.name)
	result.checkFlags = CheckFlagsInstantiated | symbol.checkFlags&(CheckFlagsReadonly|CheckFlagsLate|CheckFlagsOptionalParameter|CheckFlagsRestParameter)
	result.declarations = symbol.declarations
	result.parent = symbol.parent
	result.valueDeclaration = symbol.valueDeclaration
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
func (c *Checker) isThisless(symbol *Symbol) bool {
	return false // !!!
}

func (c *Checker) getDefaultConstructSignatures(classType *Type) []*Signature {
	baseConstructorType := c.getBaseConstructorTypeOfClass(classType)
	baseSignatures := c.getSignaturesOfType(baseConstructorType, SignatureKindConstruct)
	declaration := getClassLikeDeclarationOfSymbol(classType.symbol)
	isAbstract := declaration != nil && hasSyntacticModifier(declaration, ModifierFlagsAbstract)
	if len(baseSignatures) == 0 {
		flags := ifElse(isAbstract, SignatureFlagsConstruct|SignatureFlagsAbstract, SignatureFlagsConstruct)
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
func (c *Checker) getPropertyOfObjectType(t *Type, name string) *Symbol {
	if t.flags&TypeFlagsObject != 0 {
		resolved := c.resolveStructuredTypeMembers(t)
		symbol := resolved.members[name]
		if symbol != nil && c.symbolIsValue(symbol) {
			return symbol
		}
	}
	return nil
}

func (c *Checker) getPropertyOfUnionOrIntersectionType(t *Type, name string, skipObjectFunctionPropertyAugment bool) *Symbol {
	prop := c.getUnionOrIntersectionProperty(t, name, skipObjectFunctionPropertyAugment)
	// We need to filter out partial properties in union types
	if prop != nil && prop.checkFlags&CheckFlagsReadPartial != 0 {
		return nil
	}
	return prop
}

// Return the symbol for a given property in a union or intersection type, or undefined if the property
// does not exist in any constituent type. Note that the returned property may only be present in some
// constituents, in which case the isPartial flag is set when the containing type is union type. We need
// these partial properties when identifying discriminant properties, but otherwise they are filtered out
// and do not appear to be present in the union type.
func (c *Checker) getUnionOrIntersectionProperty(t *Type, name string, skipObjectFunctionPropertyAugment bool) *Symbol {
	var cache SymbolTable
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
		if skipObjectFunctionPropertyAugment && prop.checkFlags&CheckFlagsPartial == 0 {
			augmentedCache := getSymbolTable(&t.AsUnionOrIntersectionType().propertyCache)
			if augmentedCache[name] == nil {
				augmentedCache[name] = prop
			}
		}
	}
	return prop
}

func (c *Checker) createUnionOrIntersectionProperty(containingType *Type, name string, skipObjectFunctionPropertyAugment bool) *Symbol {
	var singleProp *Symbol
	var propSet set[*Symbol]
	var indexTypes []*Type
	isUnion := containingType.flags&TypeFlagsUnion != 0
	// Flags we want to propagate to the result if they exist in all source symbols
	var checkFlags CheckFlags
	var optionalFlag SymbolFlags
	if !isUnion {
		checkFlags = CheckFlagsReadonly
		optionalFlag = SymbolFlagsOptional
	}
	syntheticFlag := CheckFlagsSyntheticMethod
	mergedInstantiations := false
	for _, current := range containingType.Types() {
		t := c.getApparentType(current)
		if !c.isErrorType(t) && t.flags&TypeFlagsNever == 0 {
			prop := c.getPropertyOfTypeEx(t, name, skipObjectFunctionPropertyAugment, false)
			var modifiers ModifierFlags
			if prop != nil {
				modifiers = getDeclarationModifierFlagsFromSymbol(prop)
				if prop.flags&SymbolFlagsClassMember != 0 {
					if isUnion {
						optionalFlag |= prop.flags & SymbolFlagsOptional
					} else {
						optionalFlag &= prop.flags
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
						mergedInstantiations = singleProp.parent != nil && len(c.getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(singleProp.parent)) != 0
					} else {
						if propSet.len() == 0 {
							propSet.add(singleProp)
						}
						propSet.add(prop)
					}
				}
				if isUnion && c.isReadonlySymbol(prop) {
					checkFlags |= CheckFlagsReadonly
				} else if !isUnion && !c.isReadonlySymbol(prop) {
					checkFlags &^= CheckFlagsReadonly
				}
				if modifiers&ModifierFlagsNonPublicAccessibilityModifier == 0 {
					checkFlags |= CheckFlagsContainsPublic
				}
				if modifiers&ModifierFlagsProtected != 0 {
					checkFlags |= CheckFlagsContainsProtected
				}
				if modifiers&ModifierFlagsPrivate != 0 {
					checkFlags |= CheckFlagsContainsPrivate
				}
				if modifiers&ModifierFlagsStatic != 0 {
					checkFlags |= CheckFlagsContainsStatic
				}
				if !isPrototypeProperty(prop) {
					syntheticFlag = CheckFlagsSyntheticProperty
				}
			} else if isUnion {
				var indexInfo *IndexInfo
				if !isLateBoundName(name) {
					indexInfo = c.getApplicableIndexInfoForName(t, name)
				}
				if indexInfo != nil {
					checkFlags |= CheckFlagsWritePartial | (ifElse(indexInfo.isReadonly, CheckFlagsReadonly, 0))
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
					checkFlags |= CheckFlagsWritePartial
					indexTypes = append(indexTypes, c.undefinedType)
				} else {
					checkFlags |= CheckFlagsReadPartial
				}
			}
		}
	}
	if singleProp == nil || isUnion &&
		(propSet.len() == 0 || checkFlags&CheckFlagsPartial != 0) &&
		checkFlags&(CheckFlagsContainsPrivate|CheckFlagsContainsProtected) != 0 &&
		!(propSet.len() != 0 && c.hasCommonDeclaration(propSet)) {
		// No property was found, or, in a union, a property has a private or protected declaration in one
		// constituent, but is missing or has a different declaration in another constituent.
		return nil
	}
	if propSet.len() == 0 && checkFlags&CheckFlagsReadPartial == 0 && len(indexTypes) == 0 {
		if !mergedInstantiations {
			return singleProp
		}
		// No symbol from a union/intersection should have a `.parent` set (since unions/intersections don't act as symbol parents)
		// Unless that parent is "reconstituted" from the "first value declaration" on the symbol (which is likely different than its instantiated parent!)
		// They also have a `.containingType` set, which affects some services endpoints behavior, like `getRootSymbol`
		var singlePropType *Type
		var singlePropMapper *TypeMapper
		if singleProp.flags&SymbolFlagsTransient != 0 {
			links := c.valueSymbolLinks.get(singleProp)
			singlePropType = links.resolvedType
			singlePropMapper = links.mapper
		}
		clone := c.createSymbolWithType(singleProp, singlePropType)
		if singleProp.valueDeclaration != nil {
			clone.parent = singleProp.valueDeclaration.Symbol().parent
		}
		links := c.valueSymbolLinks.get(clone)
		links.containingType = containingType
		links.mapper = singlePropMapper
		links.writeType = c.getWriteTypeOfSymbol(singleProp)
		return clone
	}
	if propSet.len() == 0 {
		propSet.add(singleProp)
	}
	var declarations []*Node
	var firstType *Type
	var nameType *Type
	var propTypes []*Type
	var writeTypes []*Type
	var firstValueDeclaration *Node
	var hasNonUniformValueDeclaration bool
	for prop := range propSet.keys() {
		if firstValueDeclaration == nil {
			firstValueDeclaration = prop.valueDeclaration
		} else if prop.valueDeclaration != nil && prop.valueDeclaration != firstValueDeclaration {
			hasNonUniformValueDeclaration = true
		}
		declarations = append(declarations, prop.declarations...)
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
			checkFlags |= CheckFlagsHasNonUniformType
		}
		if isLiteralType(t) || c.isPatternLiteralType(t) {
			checkFlags |= CheckFlagsHasLiteralType
		}
		if t.flags&TypeFlagsNever != 0 && t != c.uniqueLiteralType {
			checkFlags |= CheckFlagsHasNeverType
		}
		propTypes = append(propTypes, t)
	}
	propTypes = append(propTypes, indexTypes...)
	result := c.newSymbolEx(SymbolFlagsProperty|optionalFlag, name, checkFlags|syntheticFlag)
	result.declarations = declarations
	if !hasNonUniformValueDeclaration && firstValueDeclaration != nil {
		result.valueDeclaration = firstValueDeclaration
		// Inherit information about parent type.
		result.parent = firstValueDeclaration.Symbol().parent
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

func (c *Checker) getTargetSymbol(s *Symbol) *Symbol {
	// if symbol is instantiated its flags are not copied from the 'target'
	// so we'll need to get back original 'target' symbol to work with correct set of flags
	// NOTE: cast to TransientSymbol should be safe because only TransientSymbols have CheckFlags.Instantiated
	if s.checkFlags&CheckFlagsInstantiated != 0 {
		return c.valueSymbolLinks.get(s).target
	}
	return s
}

/**
 * Return whether this symbol is a member of a prototype somewhere
 * Note that this is not tracked well within the compiler, so the answer may be incorrect.
 */
func isPrototypeProperty(symbol *Symbol) bool {
	return symbol.flags&SymbolFlagsMethod != 0 || symbol.checkFlags&CheckFlagsSyntheticMethod != 0
}

func (c *Checker) hasCommonDeclaration(symbols set[*Symbol]) bool {
	var commonDeclarations set[*Node]
	for symbol := range symbols.keys() {
		if len(symbol.declarations) == 0 {
			return false
		}
		if commonDeclarations.len() == 0 {
			for _, d := range symbol.declarations {
				commonDeclarations.add(d)
			}
			continue
		}
		for d := range commonDeclarations.keys() {
			if !slices.Contains(symbol.declarations, d) {
				commonDeclarations.delete(d)
			}
		}
		if commonDeclarations.len() == 0 {
			return false
		}
	}
	return commonDeclarations.len() != 0
}

func (c *Checker) createSymbolWithType(source *Symbol, t *Type) *Symbol {
	symbol := c.newSymbolEx(source.flags, source.name, source.checkFlags&CheckFlagsReadonly)
	symbol.declarations = source.declarations
	symbol.parent = source.parent
	symbol.valueDeclaration = source.valueDeclaration
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
			getMappedTypeModifiers(objectType)&MappedTypeModifiersExcludeOptional == 0 && objectType.AsMappedType().declaration.nameType == nil
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

func (c *Checker) isNeverReducedProperty(prop *Symbol) bool {
	return c.isDiscriminantWithNeverType(prop) || isConflictingPrivateProperty(prop)
}

func (c *Checker) getReducedApparentType(t *Type) *Type {
	// Since getApparentType may return a non-reduced union or intersection type, we need to perform
	// type reduction both before and after obtaining the apparent type. For example, given a type parameter
	// 'T extends A | B', the type 'T & X' becomes 'A & X | B & X' after obtaining the apparent type, and
	// that type may need further reduction to remove empty intersections.
	return c.getReducedType(c.getApparentType(c.getReducedType(t)))
}

func (c *Checker) elaborateNeverIntersection(errorInfo *MessageChain, t *Type) *MessageChain {
	if t.flags&TypeFlagsIntersection != 0 && t.objectFlags&ObjectFlagsIsNeverIntersection != 0 {
		neverProp := core.Find(c.getPropertiesOfUnionOrIntersectionType(t), c.isDiscriminantWithNeverType)
		if neverProp != nil {
			return NewMessageChain(diagnostics.The_intersection_0_was_reduced_to_never_because_property_1_has_conflicting_types_in_some_constituents, c.typeToStringEx(t, nil, TypeFormatFlagsNoTypeReduction), c.symbolToString(neverProp))
		}
		privateProp := core.Find(c.getPropertiesOfUnionOrIntersectionType(t), isConflictingPrivateProperty)
		if privateProp != nil {
			return chainDiagnosticMessages(errorInfo, diagnostics.The_intersection_0_was_reduced_to_never_because_property_1_exists_in_multiple_constituents_and_is_private_in_some, c.typeToStringEx(t, nil, TypeFormatFlagsNoTypeReduction), c.symbolToString(privateProp))
		}
	}
	return nil
}

func (c *Checker) isDiscriminantWithNeverType(prop *Symbol) bool {
	// Return true for a synthetic non-optional property with non-uniform types, where at least one is
	// a literal type and none is never, that reduces to never.
	return prop.flags&SymbolFlagsOptional == 0 && prop.checkFlags&(CheckFlagsNonUniformAndLiteral|CheckFlagsHasNeverType) == CheckFlagsNonUniformAndLiteral && c.getTypeOfSymbol(prop).flags&TypeFlagsNever != 0
}

func isConflictingPrivateProperty(prop *Symbol) bool {
	// Return true for a synthetic property with multiple declarations, at least one of which is private.
	return prop.valueDeclaration == nil && prop.checkFlags&CheckFlagsContainsPrivate != 0
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
			switch node.kind {
			case SyntaxKindTypeReference:
				typeArguments = append(n.OuterTypeParameters(), c.getEffectiveTypeArguments(node.AsTypeReference().typeArguments, n.LocalTypeParameters())...)
			case SyntaxKindArrayType:
				typeArguments = []*Type{c.getTypeFromTypeNode(node.AsArrayTypeNode().elementType)}
			case SyntaxKindTupleType:
				typeArguments = core.Map(node.AsTupleTypeNode().elements, c.getTypeFromTypeNode)
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
			errorNode := ifElse(node != nil, node, c.currentNode)
			if d.target.symbol != nil {
				c.error(errorNode, diagnostics.Type_arguments_for_0_circularly_reference_themselves, c.symbolToString(d.target.symbol))
			} else {
				c.error(errorNode, diagnostics.Tuple_type_arguments_circularly_reference_themselves)
			}
		}
	}
	return d.resolvedTypeArguments
}

func (c *Checker) getEffectiveTypeArguments(node *Node, typeParameters []*Type) []*Type {
	return c.fillMissingTypeArguments(core.Map(node.AsTypeArgumentList().arguments, c.getTypeFromTypeNode), typeParameters, c.getMinTypeArgumentCount(typeParameters))
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
	return t.symbol != nil && core.Some(t.symbol.declarations, func(d *Node) bool {
		return isTypeParameterDeclaration(d) && d.AsTypeParameter().defaultType != nil
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

func (c *Checker) getNamedMembers(members SymbolTable) []*Symbol {
	var result []*Symbol
	for id, symbol := range members {
		if c.isNamedMember(symbol, id) {
			result = append(result, symbol)
		}
		sortSymbols(result)
	}
	return result
}

func (c *Checker) isNamedMember(symbol *Symbol, id string) bool {
	return !isReservedMemberName(id) && c.symbolIsValue(symbol)
}

// A reserved member name consists of the byte 0xFE (which is an invalid UTF-8 encoding) followed by one or more
// characters where the first character is not '@' or '#'. The '@' character indicates that the name is denoted by
// a well known ES Symbol instance and the '#' character indicates that the name is a PrivateIdentifier.
func isReservedMemberName(name string) bool {
	return len(name) >= 2 && name[0] == '\xFE' && name[1] != '@' && name[1] != '#'
}

func (c *Checker) symbolIsValue(symbol *Symbol) bool {
	return c.symbolIsValueEx(symbol, false /*includeTyoeOnlyMembers*/)
}

func (c *Checker) symbolIsValueEx(symbol *Symbol, includeTypeOnlyMembers bool) bool {
	return symbol.flags&SymbolFlagsValue != 0 || symbol.flags&SymbolFlagsAlias != 0 &&
		c.getSymbolFlagsEx(symbol, !includeTypeOnlyMembers, false /*excludeLocalMeanings*/)&SymbolFlagsValue != 0
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
			objectFlags&ObjectFlagsAnonymous != 0 && t.symbol != nil && t.symbol.flags&(SymbolFlagsFunction|SymbolFlagsMethod|SymbolFlagsClass|SymbolFlagsTypeLiteral|SymbolFlagsObjectLiteral) != 0 && t.symbol.declarations != nil ||
			objectFlags&(ObjectFlagsMapped|ObjectFlagsReverseMapped|ObjectFlagsObjectRestType|ObjectFlagsInstantiationExpressionType) != 0) ||
		t.flags&TypeFlagsUnionOrIntersection != 0 && t.flags&TypeFlagsEnumLiteral == 0 && !c.isNonGenericTopLevelType(t) && core.Some(t.Types(), c.couldContainTypeVariables)
	t.objectFlags |= ObjectFlagsCouldContainTypeVariablesComputed | ifElse(result, ObjectFlagsCouldContainTypeVariables, 0)
	return result
}

func (c *Checker) isNonGenericTopLevelType(t *Type) bool {
	if t.alias != nil && len(t.alias.typeArguments) == 0 {
		declaration := getDeclarationOfKind(t.alias.symbol, SyntaxKindTypeAliasDeclaration)
		return declaration != nil && findAncestorOrQuit(declaration.parent, func(n *Node) FindAncestorResult {
			switch n.kind {
			case SyntaxKindSourceFile:
				return FindAncestorTrue
			case SyntaxKindModuleDeclaration:
				return FindAncestorFalse
			}
			return FindAncestorQuit
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
		// !!!
		// case flags&TypeFlagsTemplateLiteral != 0:
		// 	return c.getTemplateLiteralType((t.(TemplateLiteralType)).texts, c.instantiateTypes((t.(TemplateLiteralType)).types, m))
		// case flags&TypeFlagsStringMapping != 0:
		// 	return c.getStringMappingType((t.(StringMappingType)).symbol, c.instantiateType((t.(StringMappingType)).type_, m))
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
	var declaration *Node
	var target *Type
	var typeParameters []*Type
	switch {
	case t.objectFlags&ObjectFlagsReference != 0: // Deferred type reference
		declaration = t.AsTypeReference().node
	case t.objectFlags&ObjectFlagsInstantiationExpressionType != 0:
		declaration = t.AsInstantiationExpressionType().node
	default:
		declaration = t.symbol.declarations[0]
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
				} else if target.symbol.flags&(SymbolFlagsMethod|SymbolFlagsTypeLiteral) != 0 {
					typeParameters = core.Filter(typeParameters, func(tp *Type) bool {
						return core.Some(t.symbol.declarations, func(d *Node) bool {
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

func (c *Checker) maybeTypeParameterReference(node *Node) bool {
	return !(isTypeReferenceNode(node.parent) && len(getTypeArgumentNodesFromNode(node.parent)) != 0 && node == node.parent.AsTypeReferenceNode().typeName ||
		isImportTypeNode(node.parent) && len(getTypeArgumentNodesFromNode(node.parent)) != 0 && node == node.parent.AsImportTypeNode().qualifier)
}

func (c *Checker) isTypeParameterPossiblyReferenced(tp *Type, node *Node) bool {
	var containsReference func(*Node) bool
	containsReference = func(node *Node) bool {
		switch node.kind {
		case SyntaxKindThisType:
			return tp.AsTypeParameter().isThisType
		case SyntaxKindIdentifier:
			return !tp.AsTypeParameter().isThisType && isPartOfTypeNode(node) && c.maybeTypeParameterReference(node) && c.getTypeFromTypeNodeWorker(node) == tp
			// use worker because we're looking for === equality
		case SyntaxKindTypeQuery:
			entityName := node.AsTypeQueryNode().exprName
			firstIdentifier := getFirstIdentifier(entityName)
			if !isThisIdentifier(firstIdentifier) {
				firstIdentifierSymbol := c.getResolvedSymbol(firstIdentifier)
				tpDeclaration := tp.symbol.declarations[0] // There is exactly one declaration, otherwise `containsReference` is not called
				var tpScope *Node
				switch {
				case isTypeParameterDeclaration(tpDeclaration):
					tpScope = tpDeclaration.parent // Type parameter is a regular type parameter, e.g. foo<T>
				case tp.AsTypeParameter().isThisType:
					tpScope = tpDeclaration // Type parameter is the this type, and its declaration is the class declaration.
				}
				if tpScope != nil {
					return core.Some(firstIdentifierSymbol.declarations, func(d *Node) bool { return isNodeDescendantOf(d, tpScope) }) ||
						core.Some(getTypeArgumentNodesFromNode(node), containsReference)
				}
			}
			return true
		case SyntaxKindMethodDeclaration, SyntaxKindMethodSignature:
			returnType := node.ReturnType()
			return returnType == nil && getBodyOfNode(node) != nil ||
				core.Some(getTypeParameterNodesFromNode(node), containsReference) ||
				core.Some(node.Parameters(), containsReference) ||
				returnType != nil && containsReference(returnType)
		}
		return node.ForEachChild(containsReference)
	}
	// If the type parameter doesn't have exactly one declaration, if there are intervening statement blocks
	// between the node and the type parameter declaration, if the node contains actual references to the
	// type parameter, or if the node contains type queries that we can't prove couldn't contain references to the type parameter,
	// we consider the type parameter possibly referenced.
	if tp.symbol != nil && tp.symbol.declarations != nil && len(tp.symbol.declarations) == 1 {
		container := tp.symbol.declarations[0].parent
		for n := node; n != container; n = n.parent {
			if n == nil || isBlock(n) || isConditionalTypeNode(n) && n.AsConditionalTypeNode().extendsType.ForEachChild(containsReference) {
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

func (c *Checker) getNameTypeFromMappedType(t *Type) *Type {
	return c.anyType // !!!
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

func (c *Checker) instantiateSymbols(symbols []*Symbol, m *TypeMapper) []*Symbol {
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

func (c *Checker) tryGetTypeFromEffectiveTypeNode(node *Node) *Type {
	typeNode := getEffectiveTypeAnnotationNode(node)
	if typeNode != nil {
		return c.getTypeFromTypeNode(typeNode)
	}
	return nil
}

func (c *Checker) getTypeFromTypeNode(node *Node) *Type {
	return c.getConditionalFlowTypeOfType(c.getTypeFromTypeNodeWorker(node), node)
}

func (c *Checker) getTypeFromTypeNodeWorker(node *Node) *Type {
	switch node.kind {
	case SyntaxKindAnyKeyword:
		return c.anyType
	case SyntaxKindUnknownKeyword:
		return c.unknownType
	case SyntaxKindStringKeyword:
		return c.stringType
	case SyntaxKindNumberKeyword:
		return c.numberType
	case SyntaxKindBigIntKeyword:
		return c.bigintType
	case SyntaxKindBooleanKeyword:
		return c.booleanType
	case SyntaxKindSymbolKeyword:
		return c.esSymbolType
	case SyntaxKindVoidKeyword:
		return c.voidType
	case SyntaxKindUndefinedKeyword:
		return c.undefinedType
	case SyntaxKindNullKeyword:
		return c.nullType
	case SyntaxKindNeverKeyword:
		return c.neverType
	case SyntaxKindObjectKeyword:
		if node.flags&NodeFlagsJavaScriptFile != 0 && !c.noImplicitAny {
			return c.anyType
		} else {
			return c.nonPrimitiveType
		}
	case SyntaxKindIntrinsicKeyword:
		return c.intrinsicMarkerType
	case SyntaxKindThisType, SyntaxKindThisKeyword:
		return c.getTypeFromThisTypeNode(node)
	case SyntaxKindLiteralType:
		return c.getTypeFromLiteralTypeNode(node)
	case SyntaxKindTypeReference, SyntaxKindExpressionWithTypeArguments:
		return c.getTypeFromTypeReference(node)
	// case SyntaxKindTypePredicate:
	// 	if (node /* as TypePredicateNode */).assertsModifier {
	// 		return c.voidType
	// 	} else {
	// 		return c.booleanType
	// 	}
	// case SyntaxKindTypeQuery:
	// 	return c.getTypeFromTypeQueryNode(node /* as TypeQueryNode */)
	case SyntaxKindArrayType, SyntaxKindTupleType:
		return c.getTypeFromArrayOrTupleTypeNode(node)
	case SyntaxKindOptionalType:
		return c.getTypeFromOptionalTypeNode(node)
	case SyntaxKindUnionType:
		return c.getTypeFromUnionTypeNode(node)
	case SyntaxKindIntersectionType:
		return c.getTypeFromIntersectionTypeNode(node)
	// case SyntaxKindNamedTupleMember:
	// 	return c.getTypeFromNamedTupleTypeNode(node /* as NamedTupleMember */)
	case SyntaxKindParenthesizedType:
		return c.getTypeFromTypeNode(node.AsParenthesizedTypeNode().typeNode)
	case SyntaxKindRestType:
		return c.getTypeFromRestTypeNode(node)
	case SyntaxKindFunctionType, SyntaxKindConstructorType, SyntaxKindTypeLiteral:
		return c.getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node)
	case SyntaxKindTypeOperator:
		return c.getTypeFromTypeOperatorNode(node)
	case SyntaxKindIndexedAccessType:
		return c.getTypeFromIndexedAccessTypeNode(node)
	// case SyntaxKindMappedType:
	// 	return c.getTypeFromMappedTypeNode(node /* as MappedTypeNode */)
	// case SyntaxKindConditionalType:
	// 	return c.getTypeFromConditionalTypeNode(node /* as ConditionalTypeNode */)
	// case SyntaxKindInferType:
	// 	return c.getTypeFromInferTypeNode(node /* as InferTypeNode */)
	// case SyntaxKindTemplateLiteralType:
	// 	return c.getTypeFromTemplateTypeNode(node /* as TemplateLiteralTypeNode */)
	// case SyntaxKindImportType:
	// 	return c.getTypeFromImportTypeNode(node /* as ImportTypeNode */)
	// case SyntaxKindIdentifier, /* as TypeNodeSyntaxKind */
	// 	SyntaxKindQualifiedName, /* as TypeNodeSyntaxKind */
	// 	SyntaxKindPropertyAccessExpression /* as TypeNodeSyntaxKind */ :
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

func (c *Checker) getTypeFromThisTypeNode(node *Node) *Type {
	links := c.typeNodeLinks.get(node)
	if links.resolvedType == nil {
		links.resolvedType = c.getThisType(node)
	}
	return links.resolvedType
}

func (c *Checker) getThisType(node *Node) *Type {
	container := getThisContainer(node /*includeArrowFunctions*/, false /*includeClassComputedPropertyName*/, false)
	if container != nil {
		parent := container.parent
		if isClassLike(parent) || isInterfaceDeclaration(parent) {
			if !isStatic(container) && (!isConstructorDeclaration(container) || isNodeDescendantOf(node, getBodyOfNode(container))) {
				return c.getDeclaredTypeOfClassOrInterface(c.getSymbolOfDeclaration(parent)).AsInterfaceType().thisType
			}
		}
	}
	c.error(node, diagnostics.A_this_type_is_available_only_in_a_non_static_member_of_a_class_or_interface)
	return c.errorType
}

func (c *Checker) getTypeFromLiteralTypeNode(node *Node) *Type {
	if node.AsLiteralTypeNode().literal.kind == SyntaxKindNullKeyword {
		return c.nullType
	}
	links := c.typeNodeLinks.get(node)
	if links.resolvedType == nil {
		links.resolvedType = c.getRegularTypeOfLiteralType(c.checkExpression(node.AsLiteralTypeNode().literal))
	}
	return links.resolvedType
}

func (c *Checker) getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node *Node) *Type {
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

func (c *Checker) getTypeFromIndexedAccessTypeNode(node *Node) *Type {
	links := c.typeNodeLinks.get(node)
	if links.resolvedType == nil {
		objectType := c.getTypeFromTypeNode(node.AsIndexedAccessTypeNode().objectType)
		indexType := c.getTypeFromTypeNode(node.AsIndexedAccessTypeNode().indexType)
		potentialAlias := c.getAliasForTypeNode(node)
		links.resolvedType = c.getIndexedAccessTypeEx(objectType, indexType, AccessFlagsNone, node, potentialAlias)
	}
	return links.resolvedType
}

func (c *Checker) getTypeFromTypeOperatorNode(node *Node) *Type {
	links := c.typeNodeLinks.get(node)
	if links.resolvedType == nil {
		argType := node.AsTypeOperatorNode().typeNode
		switch node.AsTypeOperatorNode().operator {
		case SyntaxKindKeyOfKeyword:
			links.resolvedType = c.getIndexType(c.getTypeFromTypeNode(argType))
		case SyntaxKindUniqueKeyword:
			if argType.kind == SyntaxKindSymbolKeyword {
				links.resolvedType = c.getESSymbolLikeTypeForNode(walkUpParenthesizedTypes(node.parent))
			} else {
				links.resolvedType = c.errorType
			}
		case SyntaxKindReadonlyKeyword:
			links.resolvedType = c.getTypeFromTypeNode(argType)
		default:
			panic("Unhandled case in getTypeFromTypeOperatorNode")
		}
	}
	return links.resolvedType
}

func (c *Checker) getESSymbolLikeTypeForNode(node *Node) *Type {
	if isValidESSymbolDeclaration(node) {
		symbol := c.getSymbolOfNode(node)
		if symbol != nil {
			uniqueType := c.uniqueESSymbolTypes[symbol]
			if uniqueType == nil {
				var b KeyBuilder
				b.WriteString(InternalSymbolNamePrefix)
				b.WriteByte('@')
				b.WriteString(symbol.name)
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

func (c *Checker) getTypeFromTypeReference(node *Node) *Type {
	links := c.typeNodeLinks.get(node)
	if links.resolvedType == nil {
		// handle LS queries on the `const` in `x as const` by resolving to the type of `x`
		if isConstTypeReference(node) && isAssertionExpression(node.parent) {
			links.resolvedSymbol = c.unknownSymbol
			links.resolvedType = c.checkExpressionCached(node.parent.Expression())
			return links.resolvedType
		}
		symbol := c.resolveTypeReferenceName(node, SymbolFlagsType, false /*ignoreErrors*/)
		t := c.getTypeReferenceType(node, symbol)
		// Cache both the resolved symbol and the resolved type. The resolved symbol is needed when we check the
		// type reference in checkTypeReferenceNode.
		links.resolvedSymbol = symbol
		links.resolvedType = t
	}
	return links.resolvedType
}

func (c *Checker) resolveTypeReferenceName(typeReference *Node, meaning SymbolFlags, ignoreErrors bool) *Symbol {
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

func (c *Checker) getTypeReferenceType(node *Node, symbol *Symbol) *Type {
	if symbol == c.unknownSymbol {
		return c.errorType
	}
	if symbol.flags&(SymbolFlagsClass|SymbolFlagsInterface) != 0 {
		return c.getTypeFromClassOrInterfaceReference(node, symbol)
	}
	if symbol.flags&SymbolFlagsTypeAlias != 0 {
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
func (c *Checker) getTypeFromClassOrInterfaceReference(node *Node, symbol *Symbol) *Type {
	t := c.getDeclaredTypeOfClassOrInterface(c.getMergedSymbol(symbol))
	d := t.AsInterfaceType()
	typeParameters := d.LocalTypeParameters()
	if len(typeParameters) != 0 {
		numTypeArguments := len(getTypeArgumentNodesFromNode(node))
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
		if node.kind == SyntaxKindTypeReference && c.isDeferredTypeReferenceNode(node, numTypeArguments != len(typeParameters)) {
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

func (c *Checker) getTypeArgumentsFromNode(node *Node) []*Type {
	return core.Map(getTypeArgumentNodesFromNode(node), c.getTypeFromTypeNode)
}

func (c *Checker) checkNoTypeArguments(node *Node, symbol *Symbol) bool {
	if len(getTypeArgumentNodesFromNode(node)) != 0 {
		c.error(node, diagnostics.Type_0_is_not_generic, c.symbolToString(symbol))
		return false
	}
	return true
}

func (c *Checker) isDeferredTypeReferenceNode(node *Node, hasDefaultTypeArguments bool) bool {
	return false // !!!
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
					message := ifElse(isPartOfTypeNode(c.currentNode),
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
func (c *Checker) getTypeFromTypeAliasReference(node *Node, symbol *Symbol) *Type {
	typeArguments := getTypeArgumentNodesFromNode(node)
	if symbol.checkFlags&CheckFlagsUnresolved != 0 {
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
			message := ifElse(minTypeArgumentCount == len(typeParameters),
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
		var newAliasSymbol *Symbol
		if aliasSymbol != nil && (isLocalTypeAlias(symbol) || !isLocalTypeAlias(aliasSymbol)) {
			newAliasSymbol = aliasSymbol
		}
		var aliasTypeArguments []*Type
		if newAliasSymbol != nil {
			aliasTypeArguments = c.getTypeArgumentsForAliasSymbol(newAliasSymbol)
		} else if isTypeReferenceType(node) {
			aliasSymbol := c.resolveTypeReferenceName(node, SymbolFlagsAlias, true /*ignoreErrors*/)
			// refers to an alias import/export/reexport - by making sure we use the target as an aliasSymbol,
			// we ensure the exported symbol is used to refer to the type when it is reserialized later
			if aliasSymbol != nil && aliasSymbol != c.unknownSymbol {
				resolved := c.resolveAlias(aliasSymbol)
				if resolved != nil && resolved.flags&SymbolFlagsTypeAlias != 0 {
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

func (c *Checker) getTypeAliasInstantiation(symbol *Symbol, typeArguments []*Type, alias *TypeAlias) *Type {
	t := c.getDeclaredTypeOfSymbol(symbol)
	if t == c.intrinsicMarkerType {
		if typeKind, ok := intrinsicTypeKinds[symbol.name]; ok && len(typeArguments) == 1 {
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

func isLocalTypeAlias(symbol *Symbol) bool {
	declaration := core.Find(symbol.declarations, isTypeAlias)
	return declaration != nil && getContainingFunction(declaration) != nil
}

func (c *Checker) getDeclaredTypeOfSymbol(symbol *Symbol) *Type {
	result := c.tryGetDeclaredTypeOfSymbol(symbol)
	if result == nil {
		result = c.errorType
	}
	return result
}

func (c *Checker) tryGetDeclaredTypeOfSymbol(symbol *Symbol) *Type {
	switch {
	case symbol.flags&(SymbolFlagsClass|SymbolFlagsInterface) != 0:
		return c.getDeclaredTypeOfClassOrInterface(symbol)
	case symbol.flags&SymbolFlagsTypeParameter != 0:
		return c.getDeclaredTypeOfTypeParameter(symbol)
	case symbol.flags&SymbolFlagsTypeAlias != 0:
		return c.getDeclaredTypeOfTypeAlias(symbol)
		// !!!
		// case symbol.flags&SymbolFlagsEnum != 0:
		// 	return c.getDeclaredTypeOfEnum(symbol)
		// case symbol.flags&SymbolFlagsEnumMember != 0:
		// 	return c.getDeclaredTypeOfEnumMember(symbol)
		// case symbol.flags&SymbolFlagsAlias != 0:
		// 	return c.getDeclaredTypeOfAlias(symbol)
	}
	return nil
}

func getTypeReferenceName(node *Node) *Node {
	switch node.kind {
	case SyntaxKindTypeReference:
		return node.AsTypeReference().typeName
	case SyntaxKindExpressionWithTypeArguments:
		// We only support expressions that are simple qualified names. For other
		// expressions this produces nil
		expr := node.AsExpressionWithTypeArguments().expression
		if isEntityNameExpression(expr) {
			return expr
		}
	}
	return nil
}

func (c *Checker) getAliasForTypeNode(node *Node) *TypeAlias {
	symbol := c.getAliasSymbolForTypeNode(node)
	if symbol != nil {
		return &TypeAlias{symbol: symbol, typeArguments: c.getTypeArgumentsForAliasSymbol(symbol)}
	}
	return nil
}

func (c *Checker) getAliasSymbolForTypeNode(node *Node) *Symbol {
	host := node.parent
	for isParenthesizedTypeNode(host) || isTypeOperatorNode(host) && host.AsTypeOperatorNode().operator == SyntaxKindReadonlyKeyword {
		host = host.parent
	}
	if isTypeAlias(host) {
		return c.getSymbolOfDeclaration(host)
	}
	return nil
}

func (c *Checker) getTypeArgumentsForAliasSymbol(symbol *Symbol) []*Type {
	if symbol != nil {
		return c.getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol)
	}
	return nil
}

func (c *Checker) getOuterTypeParametersOfClassOrInterface(symbol *Symbol) []*Type {
	declaration := symbol.valueDeclaration
	if symbol.flags&(SymbolFlagsClass|SymbolFlagsFunction) == 0 {
		declaration = core.Find(symbol.declarations, func(d *Node) bool {
			if d.kind == SyntaxKindInterfaceDeclaration {
				return true
			}
			if d.kind != SyntaxKindVariableDeclaration {
				return false
			}
			initializer := d.AsVariableDeclaration().initializer
			return initializer != nil && (initializer.kind == SyntaxKindFunctionExpression || initializer.kind == SyntaxKindArrowFunction)
		})
	}
	// !!! Debug.assert(!!declaration, "Class was missing valueDeclaration -OR- non-class had no interface declarations")
	return c.getOuterTypeParameters(declaration, false /*includeThisTypes*/)
}

// Return the outer type parameters of a node or undefined if the node has no outer type parameters.
func (c *Checker) getOuterTypeParameters(node *Node, includeThisTypes bool) []*Type {
	for {
		node = node.parent
		if node == nil {
			return nil
		}
		kind := node.kind
		switch kind {
		case SyntaxKindClassDeclaration, SyntaxKindClassExpression, SyntaxKindInterfaceDeclaration, SyntaxKindCallSignature, SyntaxKindConstructSignature,
			SyntaxKindMethodSignature, SyntaxKindFunctionType, SyntaxKindConstructorType, SyntaxKindJSDocFunctionType, SyntaxKindFunctionDeclaration,
			SyntaxKindMethodDeclaration, SyntaxKindFunctionExpression, SyntaxKindArrowFunction, SyntaxKindTypeAliasDeclaration, SyntaxKindMappedType,
			SyntaxKindConditionalType:
			outerTypeParameters := c.getOuterTypeParameters(node, includeThisTypes)
			if (kind == SyntaxKindFunctionExpression || kind == SyntaxKindArrowFunction || isObjectLiteralMethod(node)) && c.isContextSensitive(node) {
				signature := core.FirstOrNil(c.getSignaturesOfType(c.getTypeOfSymbol(c.getSymbolOfDeclaration(node)), SignatureKindCall))
				if signature != nil && len(signature.typeParameters) != 0 {
					return append(outerTypeParameters, signature.typeParameters...)
				}
			}
			if kind == SyntaxKindMappedType {
				return append(outerTypeParameters, c.getDeclaredTypeOfTypeParameter(c.getSymbolOfDeclaration((node.AsMappedTypeNode().typeParameter))))
			}
			if kind == SyntaxKindConditionalType {
				return append(outerTypeParameters, c.getInferTypeParameters(node)...)
			}
			outerAndOwnTypeParameters := c.appendTypeParameters(outerTypeParameters, getEffectiveTypeParameterDeclarations(node))
			var thisType *Type
			if includeThisTypes && (kind == SyntaxKindClassDeclaration || kind == SyntaxKindClassExpression || kind == SyntaxKindInterfaceDeclaration) {
				thisType = c.getDeclaredTypeOfClassOrInterface(c.getSymbolOfDeclaration(node)).AsInterfaceType().thisType
			}
			if thisType != nil {
				return append(outerAndOwnTypeParameters, thisType)
			}
			return outerAndOwnTypeParameters
		}
	}
}

func (c *Checker) getInferTypeParameters(node *Node) []*Type {
	var result []*Type
	for _, symbol := range node.AsConditionalTypeNode().locals {
		if symbol.flags&SymbolFlagsTypeParameter != 0 {
			result = append(result, c.getDeclaredTypeOfSymbol(symbol))
		}
	}
	return result
}

// The local type parameters are the combined set of type parameters from all declarations of the class,
// interface, or type alias.
func (c *Checker) getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol *Symbol) []*Type {
	return c.appendLocalTypeParametersOfClassOrInterfaceOrTypeAlias(nil, symbol)
}

func (c *Checker) appendLocalTypeParametersOfClassOrInterfaceOrTypeAlias(types []*Type, symbol *Symbol) []*Type {
	for _, node := range symbol.declarations {
		if nodeKindIs(node, SyntaxKindInterfaceDeclaration, SyntaxKindClassDeclaration, SyntaxKindClassExpression) || isTypeAlias(node) {
			types = c.appendTypeParameters(types, getEffectiveTypeParameterDeclarations(node))
		}
	}
	return types
}

// Appends the type parameters given by a list of declarations to a set of type parameters and returns the resulting set.
// The function allocates a new array if the input type parameter set is undefined, but otherwise it modifies the set
// in-place and returns the same array.
func (c *Checker) appendTypeParameters(typeParameters []*Type, declarations []*Node) []*Type {
	for _, declaration := range declarations {
		typeParameters = core.AppendIfUnique(typeParameters, c.getDeclaredTypeOfTypeParameter(c.getSymbolOfDeclaration(declaration)))
	}
	return typeParameters
}

func (c *Checker) getDeclaredTypeOfTypeParameter(symbol *Symbol) *Type {
	links := c.typeParameterLinks.get(symbol)
	if links.declaredType == nil {
		links.declaredType = c.newTypeParameter(symbol)
	}
	return links.declaredType
}

func (c *Checker) getDeclaredTypeOfTypeAlias(symbol *Symbol) *Type {
	links := c.typeAliasLinks.get(symbol)
	if links.declaredType == nil {
		// Note that we use the links object as the target here because the symbol object is used as the unique
		// identity for resolution of the 'type' property in SymbolLinks.
		if !c.pushTypeResolution(symbol, TypeSystemPropertyNameDeclaredType) {
			return c.errorType
		}
		declaration := core.Find(symbol.declarations, isTypeAliasDeclaration)
		typeNode := declaration.AsTypeAliasDeclaration().typeNode
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

func (c *Checker) getTypeFromArrayOrTupleTypeNode(node *Node) *Type {
	links := c.typeNodeLinks.get(node)
	if links.resolvedType == nil {
		target := c.getArrayOrTupleTargetType(node)
		if target == c.emptyGenericType {
			links.resolvedType = c.emptyObjectType
		} else if !(node.kind == SyntaxKindTupleType && core.Some(node.AsTupleTypeNode().elements, c.isVariadicTupleElement)) && c.isDeferredTypeReferenceNode(node, false) {
			if node.kind == SyntaxKindTupleType && len(node.AsTupleTypeNode().elements) != 0 {
				links.resolvedType = target
			} else {
				links.resolvedType = c.createDeferredTypeReference(target, node, nil /*mapper*/, nil /*alias*/)
			}
		} else {
			var elementTypes []*Type
			if node.kind == SyntaxKindArrayType {
				elementTypes = []*Type{c.getTypeFromTypeNode(node.AsArrayTypeNode().elementType)}
			} else {
				elementTypes = core.Map(node.AsTupleTypeNode().elements, c.getTypeFromTypeNode)
			}
			links.resolvedType = c.createNormalizedTypeReference(target, elementTypes)
		}
	}
	return links.resolvedType
}

func (c *Checker) isVariadicTupleElement(node *Node) bool {
	return c.getTupleElementFlags(node)&ElementFlagsVariadic != 0
}

func (c *Checker) getArrayOrTupleTargetType(node *Node) *Type {
	readonly := c.isReadonlyTypeOperator(node.parent)
	elementType := c.getArrayElementTypeNode(node)
	if elementType != nil {
		if readonly {
			return c.globalReadonlyArrayType
		}
		return c.globalArrayType
	}
	return c.getTupleTargetType(core.Map(node.AsTupleTypeNode().elements, c.getTupleElementInfo), readonly)
}

func (c *Checker) isReadonlyTypeOperator(node *Node) bool {
	return isTypeOperatorNode(node) && node.AsTypeOperatorNode().operator == SyntaxKindReadonlyKeyword
}

func (c *Checker) getTypeFromRestTypeNode(node *Node) *Type {
	typeNode := node.AsRestTypeNode().typeNode
	elementTypeNode := c.getArrayElementTypeNode(typeNode)
	if elementTypeNode != nil {
		typeNode = elementTypeNode
	}
	return c.getTypeFromTypeNode(typeNode)
}

func (c *Checker) getArrayElementTypeNode(node *Node) *Node {
	switch node.kind {
	case SyntaxKindParenthesizedType:
		return c.getArrayElementTypeNode(node.AsParenthesizedTypeNode().typeNode)
	case SyntaxKindTupleType:
		if len(node.AsTupleTypeNode().elements) == 1 {
			node = node.AsTupleTypeNode().elements[0]
			if node.kind == SyntaxKindRestType {
				return c.getArrayElementTypeNode(node.AsRestTypeNode().typeNode)
			}
			if node.kind == SyntaxKindNamedTupleMember && node.AsNamedTupleMember().dotDotDotToken != nil {
				return c.getArrayElementTypeNode(node.AsNamedTupleMember().typeNode)
			}
		}
	case SyntaxKindArrayType:
		return node.AsArrayTypeNode().elementType
	}
	return nil
}

func (c *Checker) getTypeFromOptionalTypeNode(node *Node) *Type {
	return c.addOptionalityEx(c.getTypeFromTypeNode(node.AsOptionalTypeNode().typeNode), true /*isProperty*/, true /*isOptional*/)
}

func (c *Checker) getTypeFromUnionTypeNode(node *Node) *Type {
	links := c.typeNodeLinks.get(node)
	if links.resolvedType == nil {
		alias := c.getAliasForTypeNode(node)
		links.resolvedType = c.getUnionTypeEx(core.Map(node.AsUnionTypeNode().types, c.getTypeFromTypeNode), UnionReductionLiteral, alias, nil /*origin*/)
	}
	return links.resolvedType
}

func (c *Checker) getTypeFromIntersectionTypeNode(node *Node) *Type {
	links := c.typeNodeLinks.get(node)
	if links.resolvedType == nil {
		alias := c.getAliasForTypeNode(node)
		types := core.Map(node.AsIntersectionTypeNode().types, c.getTypeFromTypeNode)
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
		links.resolvedType = c.getIntersectionTypeEx(types, ifElse(noSupertypeReduction, IntersectionFlagsNoSupertypeReduction, 0), alias)
	}
	return links.resolvedType
}

func (c *Checker) getTypeOfGlobalSymbol(symbol *Symbol, arity int) *Type {
	if symbol != nil {
		t := c.getDeclaredTypeOfSymbol(symbol)
		if t.flags&TypeFlagsObject != 0 {
			if len(t.AsInterfaceType().TypeParameters()) == arity {
				return t
			} else {
				c.error(getGlobalTypeDeclaration(symbol), diagnostics.Global_type_0_must_have_1_type_parameter_s, symbolName(symbol), arity)
			}
		} else {
			c.error(getGlobalTypeDeclaration(symbol), diagnostics.Global_type_0_must_be_a_class_or_interface_type, symbolName(symbol))
		}
	}
	if arity != 0 {
		return c.emptyGenericType
	}
	return c.emptyObjectType
}

func getGlobalTypeDeclaration(symbol *Symbol) *Declaration {
	if symbol.declarations != nil {
		for _, declaration := range symbol.declarations {
			switch declaration.kind {
			case SyntaxKindClassDeclaration, SyntaxKindInterfaceDeclaration, SyntaxKindEnumDeclaration:
				return declaration
			}
		}
	}
	return nil
}

func (c *Checker) getGlobalValueSymbol(name string, reportErrors bool) *Symbol {
	return c.getGlobalSymbol(name, SymbolFlagsValue, ifElse(reportErrors, diagnostics.Cannot_find_global_value_0, nil))
}

func (c *Checker) getGlobalTypeSymbol(name string, reportErrors bool) *Symbol {
	return c.getGlobalSymbol(name, SymbolFlagsType, ifElse(reportErrors, diagnostics.Cannot_find_global_type_0, nil))
}

func (c *Checker) getGlobalTypeAliasSymbol(name string, arity int, reportErrors bool) *Symbol {
	symbol := c.getGlobalSymbol(name, SymbolFlagsType, ifElse(reportErrors, diagnostics.Cannot_find_global_type_0, nil))
	if symbol != nil {
		// Resolve the declared type of the symbol. This resolves type parameters for the type
		// alias so that we can check arity.
		c.getDeclaredTypeOfSymbol(symbol)
		if len(c.typeAliasLinks.get(symbol).typeParameters) != arity {
			decl := core.Find(symbol.declarations, isTypeAliasDeclaration)
			c.error(decl, diagnostics.Global_type_0_must_have_1_type_parameter_s, symbolName(symbol), arity)
			return nil
		}
	}
	return symbol
}

func (c *Checker) getGlobalSymbol(name string, meaning SymbolFlags, diagnostic *diagnostics.Message) *Symbol {
	// Don't track references for global symbols anyway, so value if `isReference` is arbitrary
	return c.resolveName(nil, name, meaning, diagnostic, false /*isUse*/, false /*excludeGlobals*/)
}

func (c *Checker) getGlobalType(name string, arity int, reportErrors bool) *Type {
	symbol := c.getGlobalTypeSymbol(name, reportErrors)
	if symbol != nil || reportErrors {
		return c.getTypeOfGlobalSymbol(symbol, arity)
	}
	return nil
}

func (c *Checker) getGlobalTypeOrNil(name string, arity int) *Type {
	symbol := c.getGlobalSymbol(name, SymbolFlagsType, nil /*diagnostic*/)
	if symbol != nil {
		return c.getTypeOfGlobalSymbol(symbol, arity)
	}
	return nil
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
		c.deferredGlobalESSymbolType = c.getGlobalType("Symbol", 0 /*arity*/, false /*reportErrors*/)
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
	return c.createTypeFromGenericGlobalType(ifElse(readonly, c.globalReadonlyArrayType, c.globalArrayType), []*Type{elementType})
}

func (c *Checker) getTupleElementFlags(node *Node) ElementFlags {
	switch node.kind {
	case SyntaxKindOptionalType:
		return ElementFlagsOptional
	case SyntaxKindRestType:
		return ifElse(c.getArrayElementTypeNode(node.AsRestTypeNode().typeNode) != nil, ElementFlagsRest, ElementFlagsVariadic)
	case SyntaxKindNamedTupleMember:
		named := node.AsNamedTupleMember()
		switch {
		case named.questionToken != nil:
			return ElementFlagsOptional
		case named.dotDotDotToken != nil:
			return ifElse(c.getArrayElementTypeNode(named.typeNode) != nil, ElementFlagsRest, ElementFlagsVariadic)
		}
		return ElementFlagsRequired
	}
	return ElementFlagsRequired
}

func (c *Checker) getTupleElementInfo(node *Node) TupleElementInfo {
	return TupleElementInfo{
		flags:              c.getTupleElementFlags(node),
		labeledDeclaration: ifElse(isNamedTupleMember(node) || isParameter(node), node, nil),
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
	members := make(SymbolTable)
	combinedFlags := ElementFlagsNone
	if arity != 0 {
		typeParameters = make([]*Type, 0, arity)
		for i := range arity {
			typeParameter := c.newTypeParameter(nil)
			typeParameters = append(typeParameters, typeParameter)
			flags := elementInfos[i].flags
			combinedFlags |= flags
			if combinedFlags&ElementFlagsVariable == 0 {
				property := c.newSymbolEx(SymbolFlagsProperty|(ifElse(flags&ElementFlagsOptional != 0, SymbolFlagsOptional, 0)), strconv.Itoa(i), ifElse(readonly, CheckFlagsReadonly, 0))
				c.valueSymbolLinks.get(property).resolvedType = typeParameter
				//c.valueSymbolLinks.get(property).tupleLabelDeclaration = elementInfos[i].labeledDeclaration
				members[property.name] = property
			}
		}
	}
	fixedLength := len(members)
	lengthSymbol := c.newSymbolEx(SymbolFlagsProperty, "length", ifElse(readonly, CheckFlagsReadonly, 0))
	if combinedFlags&ElementFlagsVariable != 0 {
		c.valueSymbolLinks.get(lengthSymbol).resolvedType = c.numberType
	} else {
		var literalTypes []*Type
		for i := minLength; i <= arity; i++ {
			literalTypes = append(literalTypes, c.getNumberLiteralType(float64(i)))
		}
		c.valueSymbolLinks.get(lengthSymbol).resolvedType = c.getUnionType(literalTypes)
	}
	members[lengthSymbol.name] = lengthSymbol
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
		return c.getUnionTypeEx(elementTypes, ifElse(noReductions, UnionReductionNone, UnionReductionLiteral), nil, nil)
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

func (c *Checker) isContextSensitive(node *Node) bool {
	return false // !!!
}

func (c *Checker) getConditionalFlowTypeOfType(typ *Type, node *Node) *Type {
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

func (c *Checker) newUniqueESSymbolType(symbol *Symbol, name string) *Type {
	data := &UniqueESSymbolType{}
	data.name = name
	t := c.newType(TypeFlagsUniqueESSymbol, ObjectFlagsNone, data)
	t.symbol = symbol
	return t
}

func (c *Checker) newObjectType(objectFlags ObjectFlags, symbol *Symbol) *Type {
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

func (c *Checker) newAnonymousType(symbol *Symbol, members SymbolTable, callSignatures []*Signature, constructSignatures []*Signature, indexInfos []*IndexInfo) *Type {
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

func (c *Checker) createDeferredTypeReference(target *Type, node *Node, mapper *TypeMapper, alias *TypeAlias) *Type {
	if alias == nil {
		alias := c.getAliasForTypeNode(node)
		if mapper != nil {
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

func (c *Checker) setStructuredTypeMembers(t *Type, members SymbolTable, callSignatures []*Signature, constructSignatures []*Signature, indexInfos []*IndexInfo) {
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

func (c *Checker) newTypeParameter(symbol *Symbol) *Type {
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

func (c *Checker) newSignature(flags SignatureFlags, declaration *Node, typeParameters []*Type, thisParameter *Symbol, parameters []*Symbol, resolvedReturnType *Type, resolvedTypePredicate *TypePredicate, minArgumentCount int) *Signature {
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

func (c *Checker) newIndexInfo(keyType *Type, valueType *Type, isReadonly bool, declaration *Node) *IndexInfo {
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

func (c *Checker) getEnumLiteralType(value any, enumSymbol *Symbol, symbol *Symbol) *Type {
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

func (c *Checker) getBaseTypeOfEnumLikeType(t *Type) *Type {
	if t.flags&TypeFlagsEnumLike != 0 && t.symbol.flags&SymbolFlagsEnumMember != 0 {
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
	objectFlags := ifElse(includes&TypeFlagsNotPrimitiveUnion != 0, ObjectFlagsNone, ObjectFlagsPrimitiveUnion) |
		ifElse(includes&TypeFlagsIntersection != 0, ObjectFlagsContainsIntersections, ObjectFlagsNone)
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
		t.symbol != nil && t.symbol.flags&SymbolFlagsTypeLiteral != 0 && len(c.getMembersOfSymbol(t.symbol)) == 0
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
	include := ifElse(indexFlags&IndexFlagsNoIndexSignatures != 0, TypeFlagsStringLiteral, TypeFlagsStringLike) |
		ifElse(indexFlags&IndexFlagsStringsOnly != 0, TypeFlagsNone, TypeFlagsNumberLike|TypeFlagsESSymbolLike)
	return c.getLiteralTypeFromProperties(t, include, indexFlags == IndexFlagsNone)
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

func (c *Checker) getLiteralTypeFromProperty(prop *Symbol, include TypeFlags, includeNonPublic bool) *Type {
	if includeNonPublic || getDeclarationModifierFlagsFromSymbol(prop)&ModifierFlagsNonPublicAccessibilityModifier == 0 {
		t := c.valueSymbolLinks.get(c.getLateBoundSymbol(prop)).nameType
		if t == nil {
			if prop.name == InternalSymbolNameDefault {
				t = c.getStringLiteralType("default")
			} else {
				name := getNameOfDeclaration(prop.valueDeclaration)
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

func (c *Checker) getLiteralTypeFromPropertyName(name *Node) *Type {
	if isPrivateIdentifier(name) {
		return c.neverType
	}
	if isNumericLiteral(name) {
		return c.getRegularTypeOfLiteralType(c.checkExpression(name))
	}
	if isComputedPropertyName(name) {
		return c.getRegularTypeOfLiteralType(c.checkComputedPropertyName(name))
	}
	propertyName := getPropertyNameForPropertyNameNode(name)
	if propertyName != InternalSymbolNameMissing {
		return c.getStringLiteralType(propertyName)
	}
	if isExpression(name) {
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

func (c *Checker) checkComputedPropertyName(node *Node) *Type {
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
		kind:   ifElse(indexFlags&IndexFlagsStringsOnly != 0, CachedTypeKindStringIndexType, CachedTypeKindIndexType),
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

func (c *Checker) getIndexedAccessTypeEx(objectType *Type, indexType *Type, accessFlags AccessFlags, accessNode *Node, alias *TypeAlias) *Type {
	result := c.getIndexedAccessTypeOrUndefined(objectType, indexType, accessFlags, accessNode, alias)
	if result == nil {
		result = ifElse(accessNode != nil, c.errorType, c.unknownType)
	}
	return result
}

func (c *Checker) getIndexedAccessTypeOrUndefined(objectType *Type, indexType *Type, accessFlags AccessFlags, accessNode *Node, alias *TypeAlias) *Type {
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
	if c.compilerOptions.NoUncheckedIndexedAccess == TSTrue && accessFlags&AccessFlagsExpressionPosition != 0 {
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
			propType := c.getPropertyTypeForIndexType(objectType, apparentObjectType, t, indexType, accessNode, accessFlags|ifElse(wasMissingProp, AccessFlagsSuppressNoImplicitAnyError, 0))
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

func (c *Checker) getPropertyTypeForIndexType(originalObjectType *Type, objectType *Type, indexType *Type, fullIndexType *Type, accessNode *Node, accessFlags AccessFlags) *Type {
	var accessExpression *Node
	if accessNode != nil && isElementAccessExpression(accessNode) {
		accessExpression = accessNode
	}
	var propName string
	var hasPropName bool
	if !(accessNode != nil && isPrivateIdentifier(accessNode)) {
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
					c.error(accessExpression.AsElementAccessExpression().argumentExpression, diagnostics.Cannot_assign_to_0_because_it_is_a_read_only_property, c.symbolToString(prop))
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
			case accessNode != nil && isIndexedAccessTypeNode(accessNode) && c.containsMissingType(propType):
				return c.getUnionType([]*Type{propType, c.undefinedType})
			default:
				return propType
			}
		}
		if everyType(objectType, isTupleType) && isNumericLiteralName(propName) {
			index := stringToNumber(propName)
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
				return c.getTupleElementTypeOutOfStartCount(objectType, index, ifElse(accessFlags&AccessFlagsIncludeUndefined != 0, c.missingType, nil))
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
					objectType.symbol.flags&(SymbolFlagsRegularEnum|SymbolFlagsConstEnum) != 0 &&
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
					types := core.Map(objectType.AsStructuredType().properties, func(prop *Symbol) *Type {
						return c.getTypeOfSymbol(prop)
					})
					return c.getUnionType(append(types, c.undefinedType))
				}
			}
			if objectType.symbol == c.globalThisSymbol && hasPropName && c.globalThisSymbol.exports[propName] != nil && c.globalThisSymbol.exports[propName].flags&SymbolFlagsBlockScoped != 0 {
				c.error(accessExpression, diagnostics.Property_0_does_not_exist_on_type_1, propName, c.typeToString(objectType))
			} else if c.noImplicitAny && accessFlags&AccessFlagsSuppressNoImplicitAnyError == 0 {
				if hasPropName && c.typeHasStaticProperty(propName, objectType) {
					typeName := c.typeToString(objectType)
					c.error(accessExpression, diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_to_access_the_static_member_2_instead, propName /* as string */, typeName, typeName+"["+getTextOfNode(accessExpression.AsElementAccessExpression().argumentExpression)+"]")
				} else if c.getIndexTypeOfType(objectType, c.numberType) != nil {
					c.error(accessExpression.AsElementAccessExpression().argumentExpression, diagnostics.Element_implicitly_has_an_any_type_because_index_expression_is_not_of_type_number)
				} else {
					var suggestion string
					if hasPropName {
						suggestion = c.getSuggestionForNonexistentProperty(propName, objectType)
					}
					if suggestion != "" {
						c.error(accessExpression.AsElementAccessExpression().argumentExpression, diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2, propName /* as string */, c.typeToString(objectType), suggestion)
					} else {
						suggestion = c.getSuggestionForNonexistentIndexSignature(objectType, accessExpression, indexType)
						if suggestion != "" {
							c.error(accessExpression, diagnostics.Element_implicitly_has_an_any_type_because_type_0_has_no_index_signature_Did_you_mean_to_call_1, c.typeToString(objectType), suggestion)
						} else {
							var errorInfo *MessageChain
							switch {
							case indexType.flags&TypeFlagsEnumLiteral != 0:
								errorInfo = NewMessageChain(nil, diagnostics.Property_0_does_not_exist_on_type_1, "["+c.typeToString(indexType)+"]", c.typeToString(objectType))
							case indexType.flags&TypeFlagsUniqueESSymbol != 0:
								symbolName := c.getFullyQualifiedName(indexType.symbol, accessExpression)
								errorInfo = NewMessageChain(nil, diagnostics.Property_0_does_not_exist_on_type_1, "["+symbolName+"]", c.typeToString(objectType))
							case indexType.flags&TypeFlagsStringLiteral != 0:
								errorInfo = NewMessageChain(nil, diagnostics.Property_0_does_not_exist_on_type_1, indexType.AsLiteralType().value, c.typeToString(objectType))
							case indexType.flags&TypeFlagsNumberLiteral != 0:
								errorInfo = NewMessageChain(nil, diagnostics.Property_0_does_not_exist_on_type_1, indexType.AsLiteralType().value, c.typeToString(objectType))
							case indexType.flags&(TypeFlagsNumber|TypeFlagsString) != 0:
								errorInfo = NewMessageChain(nil, diagnostics.No_index_signature_with_a_parameter_of_type_0_was_found_on_type_1, c.typeToString(indexType), c.typeToString(objectType))
							}
							diagnostic := c.error(accessExpression, diagnostics.Element_implicitly_has_an_any_type_because_expression_of_type_0_can_t_be_used_to_index_type_1, c.typeToString(fullIndexType), c.typeToString(objectType))
							if errorInfo != nil {
								diagnostic.addMessageChain(errorInfo)
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
		if indexNode.kind != SyntaxKindBigIntLiteral && indexType.flags&(TypeFlagsStringLiteral|TypeFlagsNumberLiteral) != 0 {
			c.error(indexNode, diagnostics.Property_0_does_not_exist_on_type_1, indexType.AsLiteralType().value, c.typeToString(objectType))
		} else if indexType.flags&(TypeFlagsString|TypeFlagsNumber) != 0 {
			c.error(indexNode, diagnostics.Type_0_has_no_matching_index_signature_for_type_1, c.typeToString(objectType), c.typeToString(indexType))
		} else {
			var typeString string
			if indexNode.kind == SyntaxKindBigIntLiteral {
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
		return prop != nil && prop.valueDeclaration != nil && isStatic(prop.valueDeclaration)
	}
	return false
}

func (c *Checker) getSuggestionForNonexistentProperty(name string, containingType *Type) string {
	return "" // !!!
}

func (c *Checker) getSuggestionForNonexistentIndexSignature(objectType *Type, expr *Node, keyedType *Type) string {
	return "" // !!!
}

func getIndexNodeForAccessExpression(accessNode *Node) *Node {
	switch accessNode.kind {
	case SyntaxKindElementAccessExpression:
		return accessNode.AsElementAccessExpression().argumentExpression
	case SyntaxKindIndexedAccessType:
		return accessNode.AsIndexedAccessTypeNode().indexType
	case SyntaxKindComputedPropertyName:
		return accessNode.AsComputedPropertyName().expression
	}
	return accessNode
}

func (c *Checker) errorIfWritingToReadonlyIndex(indexInfo *IndexInfo, objectType *Type, accessExpression *Node) {
	if indexInfo != nil && indexInfo.isReadonly && accessExpression != nil && (isAssignmentTarget(accessExpression) || isDeleteTarget(accessExpression)) {
		c.error(accessExpression, diagnostics.Index_signature_in_type_0_only_permits_reading, c.typeToString(objectType))
	}
}

func (c *Checker) isSelfTypeAccess(name *Node, parent *Symbol) bool {
	return name.kind == SyntaxKindThisKeyword || parent != nil && isEntityNameExpression(name) && parent == c.getResolvedSymbol(getFirstIdentifier(name))
}

func (c *Checker) isAssignmentToReadonlyEntity(expr *Node, symbol *Symbol, assignmentKind AssignmentKind) bool {
	return false // !!!
}

func (c *Checker) isThisPropertyAccessInConstructor(node *Node, prop *Symbol) bool {
	return isThisProperty(node) && c.isAutoTypedProperty(prop) && getThisContainer(node, true /*includeArrowFunctions*/, false /*includeClassComputedPropertyName*/) == c.getDeclaringConstructor(prop)
}

func (c *Checker) isAutoTypedProperty(symbol *Symbol) bool {
	// A property is auto-typed when its declaration has no type annotation or initializer and we're in
	// noImplicitAny mode or a .js file.
	declaration := symbol.valueDeclaration
	return declaration != nil && isPropertyDeclaration(declaration) && getEffectiveTypeAnnotationNode(declaration) == nil && declaration.AsPropertyDeclaration().initializer == nil && c.noImplicitAny
}

func (c *Checker) getDeclaringConstructor(symbol *Symbol) *Node {
	for _, declaration := range symbol.declarations {
		container := getThisContainer(declaration, false /*includeArrowFunctions*/, false /*includeClassComputedPropertyName*/)
		if container != nil && isConstructorDeclaration(container) {
			return container
		}
	}
	return nil
}

func (c *Checker) getPropertyNameFromIndex(indexType *Type, accessNode *Node) string {
	if isTypeUsableAsPropertyName(indexType) {
		return getPropertyNameFromType(indexType)
	}
	if accessNode != nil && isPropertyName(accessNode) {
		return getPropertyNameForPropertyNameNode(accessNode)
	}
	return InternalSymbolNameMissing
}

func (c *Checker) isStringIndexSignatureOnlyTypeWorker(t *Type) bool {
	return t.flags&TypeFlagsObject != 0 && !c.isGenericMappedType(t) && len(c.getPropertiesOfType(t)) == 0 && len(c.getIndexInfosOfType(t)) == 1 && c.getIndexInfoOfType(t, c.stringType) != nil ||
		t.flags&TypeFlagsUnionOrIntersection != 0 && core.Every(t.Types(), c.isStringIndexSignatureOnlyType)
}

func (c *Checker) shouldDeferIndexedAccessType(objectType *Type, indexType *Type, accessNode *Node) bool {
	if c.isGenericIndexType(indexType) {
		return true
	}
	if accessNode != nil && isIndexedAccessTypeNode(accessNode) {
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
				index := stringToNumber(propName)
				return index >= 0 && index < float64(limit)
			}
		}
		return false
	})
}

func (c *Checker) getNoInferType(t *Type) *Type {
	return c.anyType // !!!
}

func (c *Checker) getStringMappingType(symbol *Symbol, t *Type) *Type {
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
					diagnostic.addRelatedInfo(NewDiagnosticForNode(c.currentNode, diagnostics.Circularity_originates_in_type_at_this_location))
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

func isConstEnumSymbol(symbol *Symbol) bool {
	return symbol.flags&SymbolFlagsConstEnum != 0
}

func (c *Checker) compareProperties(sourceProp *Symbol, targetProp *Symbol, compareTypes func(source *Type, target *Type) Ternary) Ternary {
	// Two members are considered identical when
	// - they are public properties with identical names, optionality, and types,
	// - they are private or protected properties originating in the same declaration and having identical types
	if sourceProp == targetProp {
		return TernaryTrue
	}
	sourcePropAccessibility := getDeclarationModifierFlagsFromSymbol(sourceProp) & ModifierFlagsNonPublicAccessibilityModifier
	targetPropAccessibility := getDeclarationModifierFlagsFromSymbol(targetProp) & ModifierFlagsNonPublicAccessibilityModifier
	if sourcePropAccessibility != targetPropAccessibility {
		return TernaryFalse
	}
	if sourcePropAccessibility != ModifierFlagsNone {
		if c.getTargetSymbol(sourceProp) != c.getTargetSymbol(targetProp) {
			return TernaryFalse
		}
	} else {
		if (sourceProp.flags & SymbolFlagsOptional) != (targetProp.flags & SymbolFlagsOptional) {
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

func (c *Checker) markPropertyAsReferenced(prop *Symbol, nodeForCheckWriteOnly *Node, isSelfTypeAccess bool) {
	// !!!
}

func (c *Checker) getFlowTypeOfReference(reference *Node, declaredType *Type) *Type {
	return c.getFlowTypeOfReferenceEx(reference, declaredType, declaredType, nil /*flowContainer*/, getFlowNodeOfNode(reference))
}

func (c *Checker) getFlowTypeOfReferenceEx(reference *Node, declaredType *Type, initialType *Type, flowContainer *Node, flowNode *FlowNode) *Type {
	return declaredType // !!!
}

func hasRestParameter(signature *Node) bool {
	last := core.LastOrNil(signature.Parameters())
	return last != nil && isRestParameter(last)
}

func isRestParameter(param *Node) bool {
	return param.AsParameterDeclaration().dotDotDotToken != nil
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

func (c *Checker) getNormalizedUnionOrIntersectionType(t *Type, writing bool) *Type {
	reduced := c.getReducedType(t)
	if reduced != t {
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
		if baseTypeNode != nil && !isIdentifier(baseTypeNode.Expression()) && !isPropertyAccessExpression(baseTypeNode.Expression()) {
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
		data.resolvedTrueType = c.instantiateType(c.getTypeFromTypeNode(data.root.node.AsConditionalTypeNode().trueType), data.mapper)
	}
	return data.resolvedTrueType
}

func (c *Checker) getFalseTypeFromConditionalType(t *Type) *Type {
	data := t.AsConditionalType()
	if data.resolvedFalseType == nil {
		data.resolvedFalseType = c.instantiateType(c.getTypeFromTypeNode(data.root.node.AsConditionalTypeNode().falseType), data.mapper)
	}
	return data.resolvedFalseType
}

func (c *Checker) markLinkedReferences(location *Node, hint ReferenceHint, propSymbol *Symbol, parentType *Type) {
	// !!!
}

func (c *Checker) getPromisedTypeOfPromise(t *Type) *Type {
	return nil // !!!
}

func getMappedTypeModifiers(t *Type) MappedTypeModifiers {
	declaration := t.AsMappedType().declaration
	return ifElse(declaration.readonlyToken != nil, ifElse(declaration.readonlyToken.kind == SyntaxKindMinusToken, MappedTypeModifiersExcludeReadonly, MappedTypeModifiersIncludeReadonly), 0) |
		ifElse(declaration.questionToken != nil, ifElse(declaration.questionToken.kind == SyntaxKindMinusToken, MappedTypeModifiersExcludeOptional, MappedTypeModifiersIncludeOptional), 0)
}

func isPartialMappedType(t *Type) bool {
	return t.objectFlags&ObjectFlagsMapped != 0 && getMappedTypeModifiers(t)&MappedTypeModifiersIncludeOptional != 0
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
	// !!!
	// return c.getTypeWithFacts(t, TypeFactsNEUndefined)
	return t
}

func (c *Checker) removeDefinitelyFalsyTypes(t *Type) *Type {
	// !!!
	// return c.filterType(t, func(t *Type) bool {
	// 	return c.hasTypeFacts(t, TypeFactsTruthy)
	// })
	return t
}

func (c *Checker) getConstraintDeclaration(t *Type) *Node {
	if t.symbol != nil {
		declaration := core.Find(t.symbol.declarations, isTypeParameterDeclaration)
		if declaration != nil {
			return declaration.AsTypeParameter().constraint
		}
	}
	return nil
}

func (c *Checker) getTemplateLiteralType(texts []string, types []*Type) *Type {
	return c.stringType // !!!
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

func (c *Checker) getContextualType(node *Node, contextFlags ContextFlags) *Type {
	return nil // !!!
}

// Return the contextual type for a given expression node. During overload resolution, a contextual type may temporarily
// be "pushed" onto a node using the contextualType property.
func (c *Checker) getApparentTypeOfContextualType(node *Node, contextFlags ContextFlags) *Type {
	return nil // !!!
}

// If the given contextual type contains instantiable types and if a mapper representing
// return type inferences is available, instantiate those types using that mapper.
func (c *Checker) instantiateContextualType(contextualType *Type, node *Node, contextFlags ContextFlags) *Type {
	return contextualType // !!!
}

func (c *Checker) pushCachedContextualType(node *Node) {
	c.pushContextualType(node, c.getContextualType(node, ContextFlagsNone), true /*isCache*/)
}

func (c *Checker) pushContextualType(node *Node, t *Type, isCache bool) {
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

func (c *Checker) pushInferenceContext(node *Node, inferenceContext *InferenceContext) {
	// !!!
	// c.inferenceContextNodes[c.inferenceContextCount] = node
	// c.inferenceContexts[c.inferenceContextCount] = inferenceContext
	// c.inferenceContextCount++
}

func (c *Checker) popInferenceContext() {
	// !!!
	// c.inferenceContextCount--
}

func (c *Checker) getInferenceContext(node *Node) *InferenceContext {
	// !!!
	// for i := c.inferenceContextCount - 1; i >= 0; i-- {
	// 	if isNodeDescendantOf(node, c.inferenceContextNodes[i]) {
	// 		return c.inferenceContexts[i]
	// 	}
	// }
	return nil
}

type TypeFacts uint32

const (
	TypeFactsNEUndefinedOrNull TypeFacts = 0
	TypeFactsIsUndefinedOrNull TypeFacts = 0
)

func (c *Checker) getTypeFacts(t *Type, mask TypeFacts) TypeFacts {
	// !!!
	return 0
}
