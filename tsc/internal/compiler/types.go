package compiler

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
)

//go:generate go run golang.org/x/tools/cmd/stringer -type=SignatureKind -output=stringer_generated.go

// ParseFlags

type ParseFlags uint32

const (
	ParseFlagsNone                   ParseFlags = 0
	ParseFlagsYield                  ParseFlags = 1 << 0
	ParseFlagsAwait                  ParseFlags = 1 << 1
	ParseFlagsType                   ParseFlags = 1 << 2
	ParseFlagsIgnoreMissingOpenBrace ParseFlags = 1 << 4
	ParseFlagsJSDoc                  ParseFlags = 1 << 5
)

type SignatureKind int32

const (
	SignatureKindCall SignatureKind = iota
	SignatureKindConstruct
)

type ContextFlags uint32

const (
	ContextFlagsNone                ContextFlags = 0
	ContextFlagsSignature           ContextFlags = 1 << 0 // Obtaining contextual signature
	ContextFlagsNoConstraints       ContextFlags = 1 << 1 // Don't obtain type variable constraints
	ContextFlagsCompletions         ContextFlags = 1 << 2 // Ignore inference to current node and parent nodes out to the containing call for completions
	ContextFlagsSkipBindingPatterns ContextFlags = 1 << 3 // Ignore contextual types applied by binding patterns
)

type TypeFormatFlags uint32

const (
	TypeFormatFlagsNone                               TypeFormatFlags = 0
	TypeFormatFlagsNoTruncation                       TypeFormatFlags = 1 << 0 // Don't truncate typeToString result
	TypeFormatFlagsWriteArrayAsGenericType            TypeFormatFlags = 1 << 1 // Write Array<T> instead T[]
	TypeFormatFlagsGenerateNamesForShadowedTypeParams TypeFormatFlags = 1 << 2 // When a type parameter T is shadowing another T, generate a name for it so it can still be referenced
	TypeFormatFlagsUseStructuralFallback              TypeFormatFlags = 1 << 3 // When an alias cannot be named by its symbol, rather than report an error, fallback to a structural printout if possible
	// hole because there's a hole in node builder flags
	TypeFormatFlagsWriteTypeArgumentsOfSignature TypeFormatFlags = 1 << 5 // Write the type arguments instead of type parameters of the signature
	TypeFormatFlagsUseFullyQualifiedType         TypeFormatFlags = 1 << 6 // Write out the fully qualified type name (eg. Module.Type, instead of Type)
	// hole because `UseOnlyExternalAliasing` is here in node builder flags, but functions which take old flags use `SymbolFormatFlags` instead
	TypeFormatFlagsSuppressAnyReturnType TypeFormatFlags = 1 << 8 // If the return type is any-like, don't offer a return type.
	// hole because `WriteTypeParametersInQualifiedName` is here in node builder flags, but functions which take old flags use `SymbolFormatFlags` for this instead
	TypeFormatFlagsMultilineObjectLiterals             TypeFormatFlags = 1 << 10 // Always print object literals across multiple lines (only used to map into node builder flags)
	TypeFormatFlagsWriteClassExpressionAsTypeLiteral   TypeFormatFlags = 1 << 11 // Write a type literal instead of (Anonymous class)
	TypeFormatFlagsUseTypeOfFunction                   TypeFormatFlags = 1 << 12 // Write typeof instead of function type literal
	TypeFormatFlagsOmitParameterModifiers              TypeFormatFlags = 1 << 13 // Omit modifiers on parameters
	TypeFormatFlagsUseAliasDefinedOutsideCurrentScope  TypeFormatFlags = 1 << 14 // For a `type T = ... ` defined in a different file, write `T` instead of its value, even though `T` can't be accessed in the current scope.
	TypeFormatFlagsUseSingleQuotesForStringLiteralType TypeFormatFlags = 1 << 28 // Use single quotes for string literal type
	TypeFormatFlagsNoTypeReduction                     TypeFormatFlags = 1 << 29 // Don't call getReducedType
	TypeFormatFlagsOmitThisParameter                   TypeFormatFlags = 1 << 25
	// Error Handling
	TypeFormatFlagsAllowUniqueESSymbolType TypeFormatFlags = 1 << 20 // This is bit 20 to align with the same bit in `NodeBuilderFlags`
	// TypeFormatFlags exclusive
	TypeFormatFlagsAddUndefined             TypeFormatFlags = 1 << 17 // Add undefined to types of initialized, non-optional parameters
	TypeFormatFlagsWriteArrowStyleSignature TypeFormatFlags = 1 << 18 // Write arrow style signature
	// State
	TypeFormatFlagsInArrayType         TypeFormatFlags = 1 << 19 // Writing an array element type
	TypeFormatFlagsInElementType       TypeFormatFlags = 1 << 21 // Writing an array or union element type
	TypeFormatFlagsInFirstTypeArgument TypeFormatFlags = 1 << 22 // Writing first type argument of the instantiated type
	TypeFormatFlagsInTypeAlias         TypeFormatFlags = 1 << 23 // Writing type in type alias declaration
)

// Ids

type TypeId uint32

// Links for value symbols

type ValueSymbolLinks struct {
	resolvedType   *Type // Type of value symbol
	writeType      *Type
	target         *ast.Symbol
	mapper         *TypeMapper
	nameType       *Type
	keyType        *Type // Key type for mapped type member
	containingType *Type // Mapped type for mapped type property, containing union or intersection type for synthetic property
}

// Links for alias symbols

type AliasSymbolLinks struct {
	immediateTarget             *ast.Symbol // Immediate target of an alias. May be another alias. Do not access directly, use `checker.getImmediateAliasedSymbol` instead.
	aliasTarget                 *ast.Symbol // Resolved (non-alias) target of an alias
	typeOnlyDeclarationResolved bool        // True when typeOnlyDeclaration resolution in process
	typeOnlyDeclaration         *ast.Node   // First resolved alias declaration that makes the symbol only usable in type constructs
	typeOnlyExportStarName      string      // Set to the name of the symbol re-exported by an 'export type *' declaration, when different from the symbol name
}

// Links for module symbols

type ModuleSymbolLinks struct {
	resolvedExports       ast.SymbolTable      // Resolved exports of module or combined early- and late-bound static members of a class.
	cjsExportMerged       *ast.Symbol          // Version of the symbol with all non export= exports merged with the export= target
	typeOnlyExportStarMap map[string]*ast.Node // Set on a module symbol when some of its exports were resolved through a 'export type * from "mod"' declaration
}

// Links for late-bound symbols

type LateBoundLinks struct {
	lateSymbol *ast.Symbol
}

// Links for export type symbols

type ExportTypeLinks struct {
	target            *ast.Symbol // Target symbol
	originatingImport *ast.Node   // Import declaration which produced the symbol, present if the symbol is marked as uncallable but had call signatures in `resolveESModuleSymbol`
}

// Links for type aliases

type TypeAliasLinks struct {
	declaredType   *Type
	typeParameters []*Type          // Type parameters of type alias (undefined if non-generic)
	instantiations map[string]*Type // Instantiations of generic type alias (undefined if non-generic)
}

// Links for declared types (type parameters, class types, interface types, enums)

type DeclaredTypeLinks struct {
	declaredType *Type
}

// Links for switch clauses

type ExhaustiveState byte

const (
	ExhaustiveStateUnknown   ExhaustiveState = iota // Exhaustive state not computed
	ExhaustiveStateComputing                        // Exhaustive state computation in progress
	ExhaustiveStateFalse                            // Switch statement is not exhaustive
	ExhaustiveStateTrue                             // Switch statement is exhaustive
)

type SwitchStatementLinks struct {
	exhaustiveState     ExhaustiveState // Switch statement exhaustiveness
	switchTypesComputed bool
	witnessesComputed   bool
	switchTypes         []*Type
	witnesses           []string
}

type ArrayLiteralLinks struct {
	indicesComputed  bool
	firstSpreadIndex int // Index of first spread expression (or -1 if none)
	lastSpreadIndex  int // Index of last spread expression (or -1 if none)
}

// Links for late-binding containers

type MembersOrExportsResolutionKind int

const (
	MembersOrExportsResolutionKindResolvedExports MembersOrExportsResolutionKind = 0
	MembersOrExportsResolutionKindresolvedMembers MembersOrExportsResolutionKind = 1
)

type MembersAndExportsLinks [2]ast.SymbolTable // Indexed by MembersOrExportsResolutionKind

// Links for syntheric spread properties

type SpreadLinks struct {
	leftSpread  *ast.Symbol // Left source for synthetic spread property
	rightSpread *ast.Symbol // Right source for synthetic spread property
}

// Links for variances of type aliases and interface types

type VarianceLinks struct {
	variances []VarianceFlags
}

type VarianceFlags uint32

const (
	VarianceFlagsInvariant                VarianceFlags = 0                                                                                                       // Neither covariant nor contravariant
	VarianceFlagsCovariant                VarianceFlags = 1 << 0                                                                                                  // Covariant
	VarianceFlagsContravariant            VarianceFlags = 1 << 1                                                                                                  // Contravariant
	VarianceFlagsBivariant                VarianceFlags = VarianceFlagsCovariant | VarianceFlagsContravariant                                                     // Both covariant and contravariant
	VarianceFlagsIndependent              VarianceFlags = 1 << 2                                                                                                  // Unwitnessed type parameter
	VarianceFlagsVarianceMask             VarianceFlags = VarianceFlagsInvariant | VarianceFlagsCovariant | VarianceFlagsContravariant | VarianceFlagsIndependent // Mask containing all measured variances without the unmeasurable flag
	VarianceFlagsUnmeasurable             VarianceFlags = 1 << 3                                                                                                  // Variance result is unusable - relationship relies on structural comparisons which are not reflected in generic relationships
	VarianceFlagsUnreliable               VarianceFlags = 1 << 4                                                                                                  // Variance result is unreliable - checking may produce false negatives, but not false positives
	VarianceFlagsAllowsStructuralFallback               = VarianceFlagsUnmeasurable | VarianceFlagsUnreliable
)

type IndexSymbolLinks struct {
	filteredIndexSymbolCache map[string]*ast.Symbol // Symbol with applicable declarations
}

type AccessFlags uint32

const (
	AccessFlagsNone                       AccessFlags = 0
	AccessFlagsIncludeUndefined           AccessFlags = 1 << 0
	AccessFlagsNoIndexSignatures          AccessFlags = 1 << 1
	AccessFlagsWriting                    AccessFlags = 1 << 2
	AccessFlagsCacheSymbol                AccessFlags = 1 << 3
	AccessFlagsAllowMissing               AccessFlags = 1 << 4
	AccessFlagsExpressionPosition         AccessFlags = 1 << 5
	AccessFlagsReportDeprecated           AccessFlags = 1 << 6
	AccessFlagsSuppressNoImplicitAnyError AccessFlags = 1 << 7
	AccessFlagsContextual                 AccessFlags = 1 << 8
	AccessFlagsPersistent                             = AccessFlagsIncludeUndefined
)

type AssignmentDeclarationKind = int32

const (
	AssignmentDeclarationKindNone = AssignmentDeclarationKind(iota)
	/// exports.name = expr
	/// module.exports.name = expr
	AssignmentDeclarationKindExportsProperty
	/// module.exports = expr
	AssignmentDeclarationKindModuleExports
	/// className.prototype.name = expr
	AssignmentDeclarationKindPrototypeProperty
	/// this.name = expr
	AssignmentDeclarationKindThisProperty
	// F.name = expr
	AssignmentDeclarationKindProperty
	// F.prototype = { ... }
	AssignmentDeclarationKindPrototype
	// Object.defineProperty(x, 'name', { value: any, writable?: boolean (false by default) });
	// Object.defineProperty(x, 'name', { get: Function, set: Function });
	// Object.defineProperty(x, 'name', { get: Function });
	// Object.defineProperty(x, 'name', { set: Function });
	AssignmentDeclarationKindObjectDefinePropertyValue
	// Object.defineProperty(exports || module.exports, 'name', ...);
	AssignmentDeclarationKindObjectDefinePropertyExports
	// Object.defineProperty(Foo.prototype, 'name', ...);
	AssignmentDeclarationKindObjectDefinePrototypeProperty
)

const InternalSymbolNamePrefix = "\xFE" // Invalid UTF8 sequence, will never occur as IdentifierName

const (
	InternalSymbolNameCall                    = InternalSymbolNamePrefix + "call"                    // Call signatures
	InternalSymbolNameConstructor             = InternalSymbolNamePrefix + "constructor"             // Constructor implementations
	InternalSymbolNameNew                     = InternalSymbolNamePrefix + "new"                     // Constructor signatures
	InternalSymbolNameIndex                   = InternalSymbolNamePrefix + "index"                   // Index signatures
	InternalSymbolNameExportStar              = InternalSymbolNamePrefix + "export"                  // Module export * declarations
	InternalSymbolNameGlobal                  = InternalSymbolNamePrefix + "global"                  // Global self-reference
	InternalSymbolNameMissing                 = InternalSymbolNamePrefix + "missing"                 // Indicates missing symbol
	InternalSymbolNameType                    = InternalSymbolNamePrefix + "type"                    // Anonymous type literal symbol
	InternalSymbolNameObject                  = InternalSymbolNamePrefix + "object"                  // Anonymous object literal declaration
	InternalSymbolNameJSXAttributes           = InternalSymbolNamePrefix + "jsxAttributes"           // Anonymous JSX attributes object literal declaration
	InternalSymbolNameClass                   = InternalSymbolNamePrefix + "class"                   // Unnamed class expression
	InternalSymbolNameFunction                = InternalSymbolNamePrefix + "function"                // Unnamed function expression
	InternalSymbolNameComputed                = InternalSymbolNamePrefix + "computed"                // Computed property name declaration with dynamic name
	InternalSymbolNameResolving               = InternalSymbolNamePrefix + "resolving"               // Indicator symbol used to mark partially resolved type aliases
	InternalSymbolNameExportEquals            = InternalSymbolNamePrefix + "export="                 // Export assignment symbol
	InternalSymbolNameInstantiationExpression = InternalSymbolNamePrefix + "instantiationExpression" // Instantiation expressions
	InternalSymbolNameImportAttributes        = InternalSymbolNamePrefix + "importAttributes"
	InternalSymbolNameDefault                 = "default" // Default export symbol (technically not wholly internal, but included here for usability)
	InternalSymbolNameThis                    = "this"
)

type NodeCheckFlags uint32

const (
	NodeCheckFlagsNone                                     NodeCheckFlags = 0
	NodeCheckFlagsTypeChecked                              NodeCheckFlags = 1 << 0  // Node has been type checked
	NodeCheckFlagsLexicalThis                              NodeCheckFlags = 1 << 1  // Lexical 'this' reference
	NodeCheckFlagsCaptureThis                              NodeCheckFlags = 1 << 2  // Lexical 'this' used in body
	NodeCheckFlagsCaptureNewTarget                         NodeCheckFlags = 1 << 3  // Lexical 'new.target' used in body
	NodeCheckFlagsSuperInstance                            NodeCheckFlags = 1 << 4  // Instance 'super' reference
	NodeCheckFlagsSuperStatic                              NodeCheckFlags = 1 << 5  // Static 'super' reference
	NodeCheckFlagsContextChecked                           NodeCheckFlags = 1 << 6  // Contextual types have been assigned
	NodeCheckFlagsMethodWithSuperPropertyAccessInAsync     NodeCheckFlags = 1 << 7  // A method that contains a SuperProperty access in an async context.
	NodeCheckFlagsMethodWithSuperPropertyAssignmentInAsync NodeCheckFlags = 1 << 8  // A method that contains a SuperProperty assignment in an async context.
	NodeCheckFlagsCaptureArguments                         NodeCheckFlags = 1 << 9  // Lexical 'arguments' used in body
	NodeCheckFlagsEnumValuesComputed                       NodeCheckFlags = 1 << 10 // Values for enum members have been computed, and any errors have been reported for them.
	NodeCheckFlagsLexicalModuleMergesWithClass             NodeCheckFlags = 1 << 11 // Instantiated lexical module declaration is merged with a previous class declaration.
	NodeCheckFlagsLoopWithCapturedBlockScopedBinding       NodeCheckFlags = 1 << 12 // Loop that contains block scoped variable captured in closure
	NodeCheckFlagsContainsCapturedBlockScopeBinding        NodeCheckFlags = 1 << 13 // Part of a loop that contains block scoped variable captured in closure
	NodeCheckFlagsCapturedBlockScopedBinding               NodeCheckFlags = 1 << 14 // Block-scoped binding that is captured in some function
	NodeCheckFlagsBlockScopedBindingInLoop                 NodeCheckFlags = 1 << 15 // Block-scoped binding with declaration nested inside iteration statement
	NodeCheckFlagsNeedsLoopOutParameter                    NodeCheckFlags = 1 << 16 // Block scoped binding whose value should be explicitly copied outside of the converted loop
	NodeCheckFlagsAssignmentsMarked                        NodeCheckFlags = 1 << 17 // Parameter assignments have been marked
	NodeCheckFlagsContainsConstructorReference             NodeCheckFlags = 1 << 18 // Class or class element that contains a binding that references the class constructor.
	NodeCheckFlagsConstructorReference                     NodeCheckFlags = 1 << 29 // Binding to a class constructor inside of the class's body.
	NodeCheckFlagsContainsClassWithPrivateIdentifiers      NodeCheckFlags = 1 << 20 // Marked on all block-scoped containers containing a class with private identifiers.
	NodeCheckFlagsContainsSuperPropertyInStaticInitializer NodeCheckFlags = 1 << 21 // Marked on all block-scoped containers containing a static initializer with 'super.x' or 'super[x]'.
	NodeCheckFlagsInCheckIdentifier                        NodeCheckFlags = 1 << 22
	NodeCheckFlagsPartiallyTypeChecked                     NodeCheckFlags = 1 << 23 // Node has been partially type checked
	NodeCheckFlagsInitializerIsUndefined                   NodeCheckFlags = 1 << 24
	NodeCheckFlagsInitializerIsUndefinedComputed           NodeCheckFlags = 1 << 25
)

// Common links

type NodeLinks struct {
	flags                                NodeCheckFlags // Set of flags specific to Node
	declarationRequiresScopeChange       core.Tristate  // Set by `useOuterVariableScopeInParameter` in checker when downlevel emit would change the name resolution scope inside of a parameter.
	hasReportedStatementInAmbientContext bool           // Cache boolean if we report statements in ambient context
}

type TypeNodeLinks struct {
	resolvedType        *Type       // Cached type of type node
	resolvedSymbol      *ast.Symbol // Cached name resolution result
	outerTypeParameters []*Type     // Outer type parameters of anonymous object type
}

// Links for enum members

type EnumMemberLinks struct {
	value EvaluatorResult // Constant value of enum member
}

// SourceFile links

type SourceFileLinks struct {
	typeChecked   bool
	deferredNodes collections.OrderedSet[*ast.Node]
}

// Signature specific links

type SignatureLinks struct {
	resolvedSignature *Signature // Cached signature of signature node or call expression
	effectsSignature  *Signature // Signature with possible control flow effects
}

// jsxFlag: JsxOpeningElement | JsxClosingElement
// resolvedJsxElementAttributesType: JsxOpeningElement | JsxClosingElement
// resolvedJsxElementAllAttributesType: JsxOpeningElement | JsxClosingElement
// jsxNamespace: Jsx*
// jsxImplicitImportContainer: Jsx*

// resolvedJSDocType: JSDoc TypeReference | ImportType

// switchTypes: SwitchStatement

// contectFreeType: Expression | FunctionExpression | ArrowFunction | MethodDeclaration

// outerTypeParameters: AnonymousType | MappedType | DeferredTypeReference

// Only on SourceFile
// deferredNodes []Node          // Set of nodes whose checking has been deferred

// resolvedSignature Signature;      // Cached signature of signature node or call expression
// effectsSignature Signature;       // Signature with possible control flow effects
// enumMemberValue EvaluatorResult;  // Constant value of enum member
// isVisible boolean;                // Is this node visible
// containsArgumentsReference boolean; // Whether a function-like declaration contains an 'arguments' reference
// hasReportedStatementInAmbientContext boolean; // Cache boolean if we report statements in ambient context
// jsxFlag JsxFlags;                 // flags for knowing what kind of element/attributes we're dealing with
// resolvedJsxElementAttributesType Type; // resolved element attributes type of a JSX openinglike element
// resolvedJsxElementAllAttributesType Type; // resolved all element attributes type of a JSX openinglike element
// resolvedJSDocType Type;           // Resolved type of a JSDoc type reference
// switchTypes []Type;               // Cached array of switch case expression types
// jsxNamespace *Symbol;      // Resolved jsx namespace symbol for this node
// jsxImplicitImportContainer *Symbol; // Resolved module symbol the implicit jsx import of this file should refer to
// contextFreeType Type;             // Cached context-free type used by the first pass of inference; used when a function's return is partially contextually sensitive
// deferredNodes []Node          // Set of nodes whose checking has been deferred
// capturedBlockScopeBindings []*Symbol; // Block-scoped bindings captured beneath this part of an IterationStatement
// outerTypeParameters []*TypeParameter; // Outer type parameters of anonymous object type
// isExhaustive boolean;         // Is node an exhaustive switch statement (0 indicates in-process resolution)
// skipDirectInference true;         // Flag set by the API `getContextualType` call on a node when `Completions` is passed to force the checker to skip making inferences to a node's type
// declarationRequiresScopeChange boolean; // Set by `useOuterVariableScopeInParameter` in checker when downlevel emit would change the name resolution scope inside of a parameter.
// serializedTypes map[string]SerializedTypeEntry> // Collection of types serialized at this location
// decoratorSignature Signature;     // Signature for decorator as if invoked by the runtime.
// spreadIndices { first: number | undefined, last: number | undefined }; // Indices of first and last spread elements in array literal
// parameterInitializerContainsUndefined boolean; // True if this is a parameter declaration whose type annotation contains "undefined".
// fakeScopeForSignatureDeclaration "params" | "typeParams"; // If present, this is a fake scope injected into an enclosing declaration chain.
// assertionExpressionType Type;     // Cached type of the expression of a type assertion
// potentialThisCollisions Node[];
// potentialNewTargetCollisions Node[];
// potentialWeakMapSetCollisions Node[];
// potentialReflectCollisions Node[];
// potentialUnusedRenamedBindingElementsInTypes BindingElement[];
// externalHelpersModule Symbol;     // Resolved symbol for the external helpers module
// instantiationExpressionTypes Map<number, Type>; // Cache of instantiation expression types for the node

type TypeFlags uint32

const (
	TypeFlagsNone            TypeFlags = 0
	TypeFlagsAny             TypeFlags = 1 << 0
	TypeFlagsUnknown         TypeFlags = 1 << 1
	TypeFlagsString          TypeFlags = 1 << 2
	TypeFlagsNumber          TypeFlags = 1 << 3
	TypeFlagsBoolean         TypeFlags = 1 << 4
	TypeFlagsEnum            TypeFlags = 1 << 5 // Numeric computed enum member value
	TypeFlagsBigInt          TypeFlags = 1 << 6
	TypeFlagsStringLiteral   TypeFlags = 1 << 7
	TypeFlagsNumberLiteral   TypeFlags = 1 << 8
	TypeFlagsBooleanLiteral  TypeFlags = 1 << 9
	TypeFlagsEnumLiteral     TypeFlags = 1 << 10 // Always combined with StringLiteral, NumberLiteral, or Union
	TypeFlagsBigIntLiteral   TypeFlags = 1 << 11
	TypeFlagsESSymbol        TypeFlags = 1 << 12 // Type of symbol primitive introduced in ES6
	TypeFlagsUniqueESSymbol  TypeFlags = 1 << 13 // unique symbol
	TypeFlagsVoid            TypeFlags = 1 << 14
	TypeFlagsUndefined       TypeFlags = 1 << 15
	TypeFlagsNull            TypeFlags = 1 << 16
	TypeFlagsNever           TypeFlags = 1 << 17 // Never type
	TypeFlagsTypeParameter   TypeFlags = 1 << 18 // Type parameter
	TypeFlagsObject          TypeFlags = 1 << 19 // Object type
	TypeFlagsUnion           TypeFlags = 1 << 20 // Union (T | U)
	TypeFlagsIntersection    TypeFlags = 1 << 21 // Intersection (T & U)
	TypeFlagsIndex           TypeFlags = 1 << 22 // keyof T
	TypeFlagsIndexedAccess   TypeFlags = 1 << 23 // T[K]
	TypeFlagsConditional     TypeFlags = 1 << 24 // T extends U ? X : Y
	TypeFlagsSubstitution    TypeFlags = 1 << 25 // Type parameter substitution
	TypeFlagsNonPrimitive    TypeFlags = 1 << 26 // intrinsic object type
	TypeFlagsTemplateLiteral TypeFlags = 1 << 27 // Template literal type
	TypeFlagsStringMapping   TypeFlags = 1 << 28 // Uppercase/Lowercase type
	TypeFlagsReserved1       TypeFlags = 1 << 29 // Used by union/intersection type construction
	TypeFlagsReserved2       TypeFlags = 1 << 30 // Used by union/intersection type construction
	TypeFlagsReserved3       TypeFlags = 1 << 31

	TypeFlagsAnyOrUnknown                  = TypeFlagsAny | TypeFlagsUnknown
	TypeFlagsNullable                      = TypeFlagsUndefined | TypeFlagsNull
	TypeFlagsLiteral                       = TypeFlagsStringLiteral | TypeFlagsNumberLiteral | TypeFlagsBigIntLiteral | TypeFlagsBooleanLiteral
	TypeFlagsUnit                          = TypeFlagsEnum | TypeFlagsLiteral | TypeFlagsUniqueESSymbol | TypeFlagsNullable
	TypeFlagsFreshable                     = TypeFlagsEnum | TypeFlagsLiteral
	TypeFlagsStringOrNumberLiteral         = TypeFlagsStringLiteral | TypeFlagsNumberLiteral
	TypeFlagsStringOrNumberLiteralOrUnique = TypeFlagsStringLiteral | TypeFlagsNumberLiteral | TypeFlagsUniqueESSymbol
	TypeFlagsDefinitelyFalsy               = TypeFlagsStringLiteral | TypeFlagsNumberLiteral | TypeFlagsBigIntLiteral | TypeFlagsBooleanLiteral | TypeFlagsVoid | TypeFlagsUndefined | TypeFlagsNull
	TypeFlagsPossiblyFalsy                 = TypeFlagsDefinitelyFalsy | TypeFlagsString | TypeFlagsNumber | TypeFlagsBigInt | TypeFlagsBoolean
	TypeFlagsIntrinsic                     = TypeFlagsAny | TypeFlagsUnknown | TypeFlagsString | TypeFlagsNumber | TypeFlagsBigInt | TypeFlagsESSymbol | TypeFlagsVoid | TypeFlagsUndefined | TypeFlagsNull | TypeFlagsNever | TypeFlagsNonPrimitive
	TypeFlagsStringLike                    = TypeFlagsString | TypeFlagsStringLiteral | TypeFlagsTemplateLiteral | TypeFlagsStringMapping
	TypeFlagsNumberLike                    = TypeFlagsNumber | TypeFlagsNumberLiteral | TypeFlagsEnum
	TypeFlagsBigIntLike                    = TypeFlagsBigInt | TypeFlagsBigIntLiteral
	TypeFlagsBooleanLike                   = TypeFlagsBoolean | TypeFlagsBooleanLiteral
	TypeFlagsEnumLike                      = TypeFlagsEnum | TypeFlagsEnumLiteral
	TypeFlagsESSymbolLike                  = TypeFlagsESSymbol | TypeFlagsUniqueESSymbol
	TypeFlagsVoidLike                      = TypeFlagsVoid | TypeFlagsUndefined
	TypeFlagsPrimitive                     = TypeFlagsStringLike | TypeFlagsNumberLike | TypeFlagsBigIntLike | TypeFlagsBooleanLike | TypeFlagsEnumLike | TypeFlagsESSymbolLike | TypeFlagsVoidLike | TypeFlagsNull
	TypeFlagsDefinitelyNonNullable         = TypeFlagsStringLike | TypeFlagsNumberLike | TypeFlagsBigIntLike | TypeFlagsBooleanLike | TypeFlagsEnumLike | TypeFlagsESSymbolLike | TypeFlagsObject | TypeFlagsNonPrimitive
	TypeFlagsDisjointDomains               = TypeFlagsNonPrimitive | TypeFlagsStringLike | TypeFlagsNumberLike | TypeFlagsBigIntLike | TypeFlagsBooleanLike | TypeFlagsESSymbolLike | TypeFlagsVoidLike | TypeFlagsNull
	TypeFlagsUnionOrIntersection           = TypeFlagsUnion | TypeFlagsIntersection
	TypeFlagsStructuredType                = TypeFlagsObject | TypeFlagsUnion | TypeFlagsIntersection
	TypeFlagsTypeVariable                  = TypeFlagsTypeParameter | TypeFlagsIndexedAccess
	TypeFlagsInstantiableNonPrimitive      = TypeFlagsTypeVariable | TypeFlagsConditional | TypeFlagsSubstitution
	TypeFlagsInstantiablePrimitive         = TypeFlagsIndex | TypeFlagsTemplateLiteral | TypeFlagsStringMapping
	TypeFlagsInstantiable                  = TypeFlagsInstantiableNonPrimitive | TypeFlagsInstantiablePrimitive
	TypeFlagsStructuredOrInstantiable      = TypeFlagsStructuredType | TypeFlagsInstantiable
	TypeFlagsObjectFlagsType               = TypeFlagsAny | TypeFlagsNullable | TypeFlagsNever | TypeFlagsObject | TypeFlagsUnion | TypeFlagsIntersection
	TypeFlagsSimplifiable                  = TypeFlagsIndexedAccess | TypeFlagsConditional
	TypeFlagsSingleton                     = TypeFlagsAny | TypeFlagsUnknown | TypeFlagsString | TypeFlagsNumber | TypeFlagsBoolean | TypeFlagsBigInt | TypeFlagsESSymbol | TypeFlagsVoid | TypeFlagsUndefined | TypeFlagsNull | TypeFlagsNever | TypeFlagsNonPrimitive
	// 'TypeFlagsNarrowable' types are types where narrowing actually narrows.
	// This *should* be every type other than null, undefined, void, and never
	TypeFlagsNarrowable = TypeFlagsAny | TypeFlagsUnknown | TypeFlagsStructuredOrInstantiable | TypeFlagsStringLike | TypeFlagsNumberLike | TypeFlagsBigIntLike | TypeFlagsBooleanLike | TypeFlagsESSymbol | TypeFlagsUniqueESSymbol | TypeFlagsNonPrimitive
	// The following flags are aggregated during union and intersection type construction
	TypeFlagsIncludesMask = TypeFlagsAny | TypeFlagsUnknown | TypeFlagsPrimitive | TypeFlagsNever | TypeFlagsObject | TypeFlagsUnion | TypeFlagsIntersection | TypeFlagsNonPrimitive | TypeFlagsTemplateLiteral | TypeFlagsStringMapping
	// The following flags are used for different purposes during union and intersection type construction
	TypeFlagsIncludesMissingType             = TypeFlagsTypeParameter
	TypeFlagsIncludesNonWideningType         = TypeFlagsIndex
	TypeFlagsIncludesWildcard                = TypeFlagsIndexedAccess
	TypeFlagsIncludesEmptyObject             = TypeFlagsConditional
	TypeFlagsIncludesInstantiable            = TypeFlagsSubstitution
	TypeFlagsIncludesConstrainedTypeVariable = TypeFlagsReserved1
	TypeFlagsIncludesError                   = TypeFlagsReserved2
	TypeFlagsNotPrimitiveUnion               = TypeFlagsAny | TypeFlagsUnknown | TypeFlagsVoid | TypeFlagsNever | TypeFlagsObject | TypeFlagsIntersection | TypeFlagsIncludesInstantiable
)

type ObjectFlags uint32

// Types included in TypeFlags.ObjectFlagsType have an objectFlags property. Some ObjectFlags
// are specific to certain types and reuse the same bit position. Those ObjectFlags require a check
// for a certain TypeFlags value to determine their meaning.
// dprint-ignore
const (
	ObjectFlagsNone                                       ObjectFlags = 0
	ObjectFlagsClass                                      ObjectFlags = 1 << 0  // Class
	ObjectFlagsInterface                                  ObjectFlags = 1 << 1  // Interface
	ObjectFlagsReference                                  ObjectFlags = 1 << 2  // Generic type reference
	ObjectFlagsTuple                                      ObjectFlags = 1 << 3  // Synthesized generic tuple type
	ObjectFlagsAnonymous                                  ObjectFlags = 1 << 4  // Anonymous
	ObjectFlagsMapped                                     ObjectFlags = 1 << 5  // Mapped
	ObjectFlagsInstantiated                               ObjectFlags = 1 << 6  // Instantiated anonymous or mapped type
	ObjectFlagsObjectLiteral                              ObjectFlags = 1 << 7  // Originates in an object literal
	ObjectFlagsEvolvingArray                              ObjectFlags = 1 << 8  // Evolving array type
	ObjectFlagsObjectLiteralPatternWithComputedProperties ObjectFlags = 1 << 9  // Object literal pattern with computed properties
	ObjectFlagsReverseMapped                              ObjectFlags = 1 << 10 // Object contains a property from a reverse-mapped type
	ObjectFlagsJsxAttributes                              ObjectFlags = 1 << 11 // Jsx attributes type
	ObjectFlagsJSLiteral                                  ObjectFlags = 1 << 12 // Object type declared in JS - disables errors on read/write of nonexisting members
	ObjectFlagsFreshLiteral                               ObjectFlags = 1 << 13 // Fresh object literal
	ObjectFlagsArrayLiteral                               ObjectFlags = 1 << 14 // Originates in an array literal
	ObjectFlagsPrimitiveUnion                             ObjectFlags = 1 << 15 // Union of only primitive types
	ObjectFlagsContainsWideningType                       ObjectFlags = 1 << 16 // Type is or contains undefined or null widening type
	ObjectFlagsContainsObjectOrArrayLiteral               ObjectFlags = 1 << 17 // Type is or contains object literal type
	ObjectFlagsNonInferrableType                          ObjectFlags = 1 << 18 // Type is or contains anyFunctionType or silentNeverType
	ObjectFlagsCouldContainTypeVariablesComputed          ObjectFlags = 1 << 19 // CouldContainTypeVariables flag has been computed
	ObjectFlagsCouldContainTypeVariables                  ObjectFlags = 1 << 20 // Type could contain a type variable
	ObjectFlagsMembersResolved                            ObjectFlags = 1 << 21 // Members have been resolved

	ObjectFlagsClassOrInterface   = ObjectFlagsClass | ObjectFlagsInterface
	ObjectFlagsRequiresWidening   = ObjectFlagsContainsWideningType | ObjectFlagsContainsObjectOrArrayLiteral
	ObjectFlagsPropagatingFlags   = ObjectFlagsContainsWideningType | ObjectFlagsContainsObjectOrArrayLiteral | ObjectFlagsNonInferrableType
	ObjectFlagsInstantiatedMapped = ObjectFlagsMapped | ObjectFlagsInstantiated
	// Object flags that uniquely identify the kind of ObjectType
	ObjectFlagsObjectTypeKindMask = ObjectFlagsClassOrInterface | ObjectFlagsReference | ObjectFlagsTuple | ObjectFlagsAnonymous | ObjectFlagsMapped | ObjectFlagsReverseMapped | ObjectFlagsEvolvingArray
	// Flags that require TypeFlags.Object
	ObjectFlagsContainsSpread              = 1 << 22 // Object literal contains spread operation
	ObjectFlagsObjectRestType              = 1 << 23 // Originates in object rest declaration
	ObjectFlagsInstantiationExpressionType = 1 << 24 // Originates in instantiation expression
	ObjectFlagsSingleSignatureType         = 1 << 25 // A single signature type extracted from a potentially broader type
	ObjectFlagsIsClassInstanceClone        = 1 << 26 // Type is a clone of a class instance type
	// Flags that require TypeFlags.Object and ObjectFlags.Reference
	ObjectFlagsIdenticalBaseTypeCalculated = 1 << 27 // has had `getSingleBaseForNonAugmentingSubtype` invoked on it already
	ObjectFlagsIdenticalBaseTypeExists     = 1 << 28 // has a defined cachedEquivalentBaseType member
	// Flags that require TypeFlags.UnionOrIntersection or TypeFlags.Substitution
	ObjectFlagsIsGenericTypeComputed = 1 << 22 // IsGenericObjectType flag has been computed
	ObjectFlagsIsGenericObjectType   = 1 << 23 // Union or intersection contains generic object type
	ObjectFlagsIsGenericIndexType    = 1 << 24 // Union or intersection contains generic index type
	ObjectFlagsIsGenericType         = ObjectFlagsIsGenericObjectType | ObjectFlagsIsGenericIndexType
	// Flags that require TypeFlags.Union
	ObjectFlagsContainsIntersections      = 1 << 25 // Union contains intersections
	ObjectFlagsIsUnknownLikeUnionComputed = 1 << 26 // IsUnknownLikeUnion flag has been computed
	ObjectFlagsIsUnknownLikeUnion         = 1 << 27 // Union of null, undefined, and empty object type
	// Flags that require TypeFlags.Intersection
	ObjectFlagsIsNeverIntersectionComputed = 1 << 25 // IsNeverLike flag has been computed
	ObjectFlagsIsNeverIntersection         = 1 << 26 // Intersection reduces to never
	ObjectFlagsIsConstrainedTypeVariable   = 1 << 27 // T & C, where T's constraint and C are primitives, object, or {}
)

// TypeAlias

type TypeAlias struct {
	symbol        *ast.Symbol
	typeArguments []*Type
}

func (a *TypeAlias) Symbol() *ast.Symbol {
	if a == nil {
		return nil
	}
	return a.symbol
}

func (a *TypeAlias) TypeArguments() []*Type {
	if a == nil {
		return nil
	}
	return a.typeArguments
}

// Type

type Type struct {
	flags       TypeFlags
	objectFlags ObjectFlags
	id          TypeId
	symbol      *ast.Symbol
	alias       *TypeAlias
	data        TypeData // Type specific data
}

// Casts for concrete struct types

func (t *Type) AsIntrinsicType() *IntrinsicType             { return t.data.(*IntrinsicType) }
func (t *Type) AsLiteralType() *LiteralType                 { return t.data.(*LiteralType) }
func (t *Type) AsUniqueESSymbolType() *UniqueESSymbolType   { return t.data.(*UniqueESSymbolType) }
func (t *Type) AsTupleType() *TupleType                     { return t.data.(*TupleType) }
func (t *Type) AsSingleSignatureType() *SingleSignatureType { return t.data.(*SingleSignatureType) }
func (t *Type) AsInstantiationExpressionType() *InstantiationExpressionType {
	return t.data.(*InstantiationExpressionType)
}
func (t *Type) AsMappedType() *MappedType                   { return t.data.(*MappedType) }
func (t *Type) AsReverseMappedType() *ReverseMappedType     { return t.data.(*ReverseMappedType) }
func (t *Type) AsEvolvingArrayType() *EvolvingArrayType     { return t.data.(*EvolvingArrayType) }
func (t *Type) AsTypeParameter() *TypeParameter             { return t.data.(*TypeParameter) }
func (t *Type) AsUnionType() *UnionType                     { return t.data.(*UnionType) }
func (t *Type) AsIntersectionType() *IntersectionType       { return t.data.(*IntersectionType) }
func (t *Type) AsIndexType() *IndexType                     { return t.data.(*IndexType) }
func (t *Type) AsIndexedAccessType() *IndexedAccessType     { return t.data.(*IndexedAccessType) }
func (t *Type) AsTemplateLiteralType() *TemplateLiteralType { return t.data.(*TemplateLiteralType) }
func (t *Type) AsStringMappingType() *StringMappingType     { return t.data.(*StringMappingType) }
func (t *Type) AsSubstitutionType() *SubstitutionType       { return t.data.(*SubstitutionType) }
func (t *Type) AsConditionalType() *ConditionalType         { return t.data.(*ConditionalType) }

// Casts for embedded struct types

func (t *Type) AsConstrainedType() *ConstrainedType { return t.data.AsConstrainedType() }
func (t *Type) AsStructuredType() *StructuredType   { return t.data.AsStructuredType() }
func (t *Type) AsObjectType() *ObjectType           { return t.data.AsObjectType() }
func (t *Type) AsTypeReference() *TypeReference     { return t.data.AsTypeReference() }
func (t *Type) AsInterfaceType() *InterfaceType     { return t.data.AsInterfaceType() }
func (t *Type) AsUnionOrIntersectionType() *UnionOrIntersectionType {
	return t.data.AsUnionOrIntersectionType()
}

func (t *Type) Distributed() []*Type {
	switch {
	case t.flags&TypeFlagsUnion != 0:
		return t.AsUnionType().types
	case t.flags&TypeFlagsNever != 0:
		return nil
	}
	return []*Type{t}
}

// Common accessors

func (t *Type) Target() *Type {
	switch {
	case t.flags&TypeFlagsObject != 0:
		return t.AsObjectType().target
	case t.flags&TypeFlagsTypeParameter != 0:
		return t.AsTypeParameter().target
	case t.flags&TypeFlagsIndex != 0:
		return t.AsIndexType().target
	case t.flags&TypeFlagsStringMapping != 0:
		return t.AsStringMappingType().target
	}
	panic("Unhandled case in Type.Target")
}

func (t *Type) Mapper() *TypeMapper {
	switch {
	case t.flags&TypeFlagsObject != 0:
		return t.AsObjectType().mapper
	case t.flags&TypeFlagsTypeParameter != 0:
		return t.AsTypeParameter().mapper
	case t.flags&TypeFlagsConditional != 0:
		return t.AsConditionalType().mapper
	}
	panic("Unhandled case in Type.Mapper")
}

func (t *Type) Types() []*Type {
	switch {
	case t.flags&TypeFlagsUnionOrIntersection != 0:
		return t.AsUnionOrIntersectionType().types
	case t.flags&TypeFlagsTemplateLiteral != 0:
		return t.AsTemplateLiteralType().types
	}
	panic("Unhandled case in Type.Types")
}

func (t *Type) TargetInterfaceType() *InterfaceType {
	return t.AsTypeReference().target.AsInterfaceType()
}

func (t *Type) TargetTupleType() *TupleType {
	return t.AsTypeReference().target.AsTupleType()
}

// TypeData

type TypeData interface {
	AsType() *Type
	AsConstrainedType() *ConstrainedType
	AsStructuredType() *StructuredType
	AsObjectType() *ObjectType
	AsTypeReference() *TypeReference
	AsInterfaceType() *InterfaceType
	AsUnionOrIntersectionType() *UnionOrIntersectionType
}

// TypeBase

type TypeBase struct {
	Type
}

func (t *TypeBase) AsType() *Type                                       { return &t.Type }
func (t *TypeBase) AsConstrainedType() *ConstrainedType                 { return nil }
func (t *TypeBase) AsStructuredType() *StructuredType                   { return nil }
func (t *TypeBase) AsObjectType() *ObjectType                           { return nil }
func (t *TypeBase) AsTypeReference() *TypeReference                     { return nil }
func (t *TypeBase) AsInterfaceType() *InterfaceType                     { return nil }
func (t *TypeBase) AsUnionOrIntersectionType() *UnionOrIntersectionType { return nil }

// IntrinsicTypeData

type IntrinsicType struct {
	TypeBase
	intrinsicName string
}

// LiteralTypeData

type LiteralType struct {
	TypeBase
	value       any   // string | float64 | bool | PseudoBigInt | nil (computed enum)
	freshType   *Type // Fresh version of type
	regularType *Type // Regular version of type
}

type PseudoBigInt struct {
	negative    bool
	base10Value string
}

// UniqueESSymbolTypeData

type UniqueESSymbolType struct {
	TypeBase
	name string
}

// ConstrainedType (type with computed base constraint)

type ConstrainedType struct {
	TypeBase
	resolvedBaseConstraint *Type
}

func (t *ConstrainedType) AsConstrainedType() *ConstrainedType { return t }

// StructuredType (base of all types with members)

type StructuredType struct {
	ConstrainedType
	members            ast.SymbolTable
	properties         []*ast.Symbol
	signatures         []*Signature // Signatures (call + construct)
	callSignatureCount int          // Count of call signatures
	indexInfos         []*IndexInfo
}

func (t *StructuredType) AsStructuredType() *StructuredType { return t }

func (t *StructuredType) CallSignatures() []*Signature {
	return slices.Clip(t.signatures[:t.callSignatureCount])
}

func (t *StructuredType) ConstructSignatures() []*Signature {
	return slices.Clip(t.signatures[t.callSignatureCount:])
}

// ObjectType (base of all instantiable object types)
// Instances of ObjectType or derived types have the following ObjectFlags:
// ObjectType (ObjectFlagsAnonymous)
//   TypeReference (ObjectFlagsReference)
//     InterfaceType (ObjectFlagsReference | (ObjectFlagsClass|ObjectFlagsInterface))
//       TupleType (ObjectFlagsReference | ObjectFlagsTuple)
//   SingleSignatureType (ObjectFlagsAnonymous|ObjectFlagsSingleSignatureType)
//   InstantiationExpressionType (ObjectFlagsAnonymous|ObjectFlagsInstantiationExpressionType)
//   MappedType (ObjectFlagsAnonymous|ObjectFlagsMapped)
//   ReverseMapped (ObjectFlagsReverseMapped)
//   EvolvingArray (ObjectFlagsEvolvingArray)

type ObjectType struct {
	StructuredType
	target         *Type            // Target of instantiated type
	mapper         *TypeMapper      // Type mapper for instantiated type
	instantiations map[string]*Type // Map of type instantiations
}

func (t *ObjectType) AsObjectType() *ObjectType { return t }

// TypeReference (instantiation of an InterfaceType)

type TypeReference struct {
	ObjectType
	node                  *ast.Node // TypeReferenceNode | ArrayTypeNode | TupleTypeNode when deferred, else nil
	resolvedTypeArguments []*Type
}

func (t *TypeReference) AsTypeReference() *TypeReference { return t }

// InterfaceType (when generic, serves as reference to instantiation of itself)

type InterfaceType struct {
	TypeReference
	allTypeParameters           []*Type // Type parameters (outer + local + thisType)
	outerTypeParameterCount     int     // Count of outer type parameters
	thisType                    *Type   // The "this" type (nil if none)
	baseTypesResolved           bool
	declaredMembersResolved     bool
	resolvedBaseConstructorType *Type
	resolvedBaseTypes           []*Type
	declaredMembers             ast.SymbolTable // Declared members
	declaredCallSignatures      []*Signature    // Declared call signatures
	declaredConstructSignatures []*Signature    // Declared construct signatures
	declaredIndexInfos          []*IndexInfo    // Declared index signatures
}

func (t *InterfaceType) AsInterfaceType() *InterfaceType { return t }

func (t *InterfaceType) OuterTypeParameters() []*Type {
	if len(t.allTypeParameters) == 0 {
		return nil
	}
	return slices.Clip(t.allTypeParameters[:t.outerTypeParameterCount])
}

func (t *InterfaceType) LocalTypeParameters() []*Type {
	if len(t.allTypeParameters) == 0 {
		return nil
	}
	return slices.Clip(t.allTypeParameters[t.outerTypeParameterCount : len(t.allTypeParameters)-1])
}

func (t *InterfaceType) TypeParameters() []*Type {
	if len(t.allTypeParameters) == 0 {
		return nil
	}
	return slices.Clip(t.allTypeParameters[:len(t.allTypeParameters)-1])
}

// TupleType

type ElementFlags uint32

const (
	ElementFlagsNone        ElementFlags = 0
	ElementFlagsRequired    ElementFlags = 1 << 0 // T
	ElementFlagsOptional    ElementFlags = 1 << 1 // T?
	ElementFlagsRest        ElementFlags = 1 << 2 // ...T[]
	ElementFlagsVariadic    ElementFlags = 1 << 3 // ...T
	ElementFlagsFixed                    = ElementFlagsRequired | ElementFlagsOptional
	ElementFlagsVariable                 = ElementFlagsRest | ElementFlagsVariadic
	ElementFlagsNonRequired              = ElementFlagsOptional | ElementFlagsRest | ElementFlagsVariadic
	ElementFlagsNonRest                  = ElementFlagsRequired | ElementFlagsOptional | ElementFlagsVariadic
)

type TupleElementInfo struct {
	flags              ElementFlags
	labeledDeclaration *ast.Node // NamedTupleMember | ParameterDeclaration | nil
}

type TupleType struct {
	InterfaceType
	elementInfos  []TupleElementInfo
	minLength     int // Number of required or variadic elements
	fixedLength   int // Number of initial required or optional elements
	combinedFlags ElementFlags
	readonly      bool
}

// SingleSignatureType

type SingleSignatureType struct {
	ObjectType
	outerTypeParameters []*Type
}

// InstantiationExpressionType

type InstantiationExpressionType struct {
	ObjectType
	node *ast.Node
}

// MappedType

type MappedType struct {
	ObjectType
	declaration          *ast.MappedTypeNode
	typeParameter        *Type
	constraintType       *Type
	nameType             *Type
	templateType         *Type
	modifiersType        *Type
	resolvedApparentType *Type
	containsError        bool
}

// ReverseMappedType

type ReverseMappedType struct {
	ObjectType
	source         *Type
	mappedType     *Type
	constraintType *Type
}

// EvolvingArrayType

type EvolvingArrayType struct {
	ObjectType
	elementType    *Type
	finalArrayType *Type
}

// UnionOrIntersectionTypeData

type UnionOrIntersectionType struct {
	StructuredType
	types                                       []*Type
	propertyCache                               ast.SymbolTable
	propertyCacheWithoutFunctionPropertyAugment ast.SymbolTable
	resolvedProperties                          []*ast.Symbol
	resolvedBaseConstraint                      *Type
}

func (t *UnionOrIntersectionType) AsUnionOrIntersectionType() *UnionOrIntersectionType { return t }

// UnionType

type UnionType struct {
	UnionOrIntersectionType
	resolvedReducedType *Type
	regularType         *Type
	origin              *Type           // Denormalized union, intersection, or index type in which union originates
	keyPropertyName     string          // Property with unique unit type that exists in every object/intersection in union type
	constituentMap      map[*Type]*Type // Constituents keyed by unit type discriminants
}

// IntersectionType

type IntersectionType struct {
	UnionOrIntersectionType
	resolvedApparentType             *Type
	uniqueLiteralFilledInstantiation *Type // Instantiation with type parameters mapped to never type
}

// TypeParameter

type TypeParameter struct {
	ConstrainedType
	constraint          *Type
	target              *Type
	mapper              *TypeMapper
	isThisType          bool
	resolvedDefaultType *Type
}

// IndexFlags

type IndexFlags uint32

const (
	IndexFlagsNone              IndexFlags = 0
	IndexFlagsStringsOnly       IndexFlags = 1 << 0
	IndexFlagsNoIndexSignatures IndexFlags = 1 << 1
	IndexFlagsNoReducibleCheck  IndexFlags = 1 << 2
)

// IndexType

type IndexType struct {
	ConstrainedType
	target     *Type
	indexFlags IndexFlags
}

// IndexedAccessType

type IndexedAccessType struct {
	ConstrainedType
	objectType  *Type
	indexType   *Type
	accessFlags AccessFlags // Only includes AccessFlags.Persistent
}

type TemplateLiteralType struct {
	ConstrainedType
	texts []string // Always one element longer than types
	types []*Type  // Always at least one element
}

type StringMappingType struct {
	ConstrainedType
	target *Type
}

type SubstitutionType struct {
	ConstrainedType
	baseType   *Type // Target type
	constraint *Type // Constraint that target type is known to satisfy
}

type ConditionalRoot struct {
	node                *ast.Node // ConditionalTypeNode
	checkType           *Type
	extendsType         *Type
	isDistributive      bool
	inferTypeParameters []*Type
	outerTypeParameters []*Type
	instantiations      map[string]*Type
	alias               *TypeAlias
}

type ConditionalType struct {
	ConstrainedType
	root                             *ConditionalRoot
	checkType                        *Type
	extendsType                      *Type
	resolvedTrueType                 *Type
	resolvedFalseType                *Type
	resolvedInferredTrueType         *Type // The `trueType` instantiated with the `combinedMapper`, if present
	resolvedDefaultConstraint        *Type
	resolvedConstraintOfDistributive *Type
	mapper                           *TypeMapper
	combinedMapper                   *TypeMapper
}

type IterationTypes struct {
	yieldType  *Type
	returnType *Type
	nextType   *Type
}

// SignatureFlags

type SignatureFlags uint32

const (
	SignatureFlagsNone SignatureFlags = 0
	// Propagating flags
	SignatureFlagsHasRestParameter SignatureFlags = 1 << 0 // Indicates last parameter is rest parameter
	SignatureFlagsHasLiteralTypes  SignatureFlags = 1 << 1 // Indicates signature is specialized
	SignatureFlagsConstruct        SignatureFlags = 1 << 2 // Indicates signature is a construct signature
	SignatureFlagsAbstract         SignatureFlags = 1 << 3 // Indicates signature comes from an abstract class, abstract construct signature, or abstract constructor type
	// Non-propagating flags
	SignatureFlagsIsInnerCallChain                       SignatureFlags = 1 << 4 // Indicates signature comes from a CallChain nested in an outer OptionalChain
	SignatureFlagsIsOuterCallChain                       SignatureFlags = 1 << 5 // Indicates signature comes from a CallChain that is the outermost chain of an optional expression
	SignatureFlagsIsUntypedSignatureInJSFile             SignatureFlags = 1 << 6 // Indicates signature is from a js file and has no types
	SignatureFlagsIsNonInferrable                        SignatureFlags = 1 << 7 // Indicates signature comes from a non-inferrable type
	SignatureFlagsIsSignatureCandidateForOverloadFailure SignatureFlags = 1 << 8
	// We do not propagate `IsInnerCallChain` or `IsOuterCallChain` to instantiated signatures, as that would result in us
	// attempting to add `| undefined` on each recursive call to `getReturnTypeOfSignature` when
	// instantiating the return type.
	SignatureFlagsPropagatingFlags = SignatureFlagsHasRestParameter | SignatureFlagsHasLiteralTypes | SignatureFlagsConstruct | SignatureFlagsAbstract | SignatureFlagsIsUntypedSignatureInJSFile | SignatureFlagsIsSignatureCandidateForOverloadFailure
	SignatureFlagsCallChainFlags   = SignatureFlagsIsInnerCallChain | SignatureFlagsIsOuterCallChain
)

// Signature

type Signature struct {
	flags                    SignatureFlags
	minArgumentCount         int32
	resolvedMinArgumentCount int32
	declaration              *ast.Node
	typeParameters           []*Type
	parameters               []*ast.Symbol
	thisParameter            *ast.Symbol
	resolvedReturnType       *Type
	resolvedTypePredicate    *TypePredicate
	target                   *Signature
	mapper                   *TypeMapper
	isolatedSignatureType    *Type
	composite                *CompositeSignature
}

type CompositeSignature struct {
	flags      TypeFlags // TypeFlagsUnion | TypeFlagsIntersection
	signatures []*Signature
}

type TypePredicateKind int32

const (
	TypePredicateKindThis TypePredicateKind = iota
	TypePredicateKindIdentifier
	TypePredicateKindAssertsThis
	TypePredicateKindAssertsIdentifier
)

type TypePredicate struct {
	kind           TypePredicateKind
	parameterIndex int32
	parameterName  string
	t              *Type
}

// IndexInfo

type IndexInfo struct {
	keyType     *Type
	valueType   *Type
	isReadonly  bool
	declaration *ast.Node // IndexSignatureDeclaration
}

/**
 * Ternary values are defined such that
 * x & y picks the lesser in the order False < Unknown < Maybe < True, and
 * x | y picks the greater in the order False < Unknown < Maybe < True.
 * Generally, Ternary.Maybe is used as the result of a relation that depends on itself, and
 * Ternary.Unknown is used as the result of a variance check that depends on itself. We make
 * a distinction because we don't want to cache circular variance check results.
 */
type Ternary int8

const (
	TernaryFalse   Ternary = 0
	TernaryUnknown Ternary = 1
	TernaryMaybe   Ternary = 3
	TernaryTrue    Ternary = -1
)

type TypeComparer func(s *Type, t *Type, reportErrors bool) Ternary

type LanguageFeatureMinimumTargetMap struct {
	Classes                           core.ScriptTarget
	ForOf                             core.ScriptTarget
	Generators                        core.ScriptTarget
	Iteration                         core.ScriptTarget
	SpreadElements                    core.ScriptTarget
	RestElements                      core.ScriptTarget
	TaggedTemplates                   core.ScriptTarget
	DestructuringAssignment           core.ScriptTarget
	BindingPatterns                   core.ScriptTarget
	ArrowFunctions                    core.ScriptTarget
	BlockScopedVariables              core.ScriptTarget
	ObjectAssign                      core.ScriptTarget
	RegularExpressionFlagsUnicode     core.ScriptTarget
	RegularExpressionFlagsSticky      core.ScriptTarget
	Exponentiation                    core.ScriptTarget
	AsyncFunctions                    core.ScriptTarget
	ForAwaitOf                        core.ScriptTarget
	AsyncGenerators                   core.ScriptTarget
	AsyncIteration                    core.ScriptTarget
	ObjectSpreadRest                  core.ScriptTarget
	RegularExpressionFlagsDotAll      core.ScriptTarget
	BindinglessCatch                  core.ScriptTarget
	BigInt                            core.ScriptTarget
	NullishCoalesce                   core.ScriptTarget
	OptionalChaining                  core.ScriptTarget
	LogicalAssignment                 core.ScriptTarget
	TopLevelAwait                     core.ScriptTarget
	ClassFields                       core.ScriptTarget
	PrivateNamesAndClassStaticBlocks  core.ScriptTarget
	RegularExpressionFlagsHasIndices  core.ScriptTarget
	ShebangComments                   core.ScriptTarget
	UsingAndAwaitUsing                core.ScriptTarget
	ClassAndClassElementDecorators    core.ScriptTarget
	RegularExpressionFlagsUnicodeSets core.ScriptTarget
}

var LanguageFeatureMinimumTarget = LanguageFeatureMinimumTargetMap{
	Classes:                           core.ScriptTargetES2015,
	ForOf:                             core.ScriptTargetES2015,
	Generators:                        core.ScriptTargetES2015,
	Iteration:                         core.ScriptTargetES2015,
	SpreadElements:                    core.ScriptTargetES2015,
	RestElements:                      core.ScriptTargetES2015,
	TaggedTemplates:                   core.ScriptTargetES2015,
	DestructuringAssignment:           core.ScriptTargetES2015,
	BindingPatterns:                   core.ScriptTargetES2015,
	ArrowFunctions:                    core.ScriptTargetES2015,
	BlockScopedVariables:              core.ScriptTargetES2015,
	ObjectAssign:                      core.ScriptTargetES2015,
	RegularExpressionFlagsUnicode:     core.ScriptTargetES2015,
	RegularExpressionFlagsSticky:      core.ScriptTargetES2015,
	Exponentiation:                    core.ScriptTargetES2016,
	AsyncFunctions:                    core.ScriptTargetES2017,
	ForAwaitOf:                        core.ScriptTargetES2018,
	AsyncGenerators:                   core.ScriptTargetES2018,
	AsyncIteration:                    core.ScriptTargetES2018,
	ObjectSpreadRest:                  core.ScriptTargetES2018,
	RegularExpressionFlagsDotAll:      core.ScriptTargetES2018,
	BindinglessCatch:                  core.ScriptTargetES2019,
	BigInt:                            core.ScriptTargetES2020,
	NullishCoalesce:                   core.ScriptTargetES2020,
	OptionalChaining:                  core.ScriptTargetES2020,
	LogicalAssignment:                 core.ScriptTargetES2021,
	TopLevelAwait:                     core.ScriptTargetES2022,
	ClassFields:                       core.ScriptTargetES2022,
	PrivateNamesAndClassStaticBlocks:  core.ScriptTargetES2022,
	RegularExpressionFlagsHasIndices:  core.ScriptTargetES2022,
	ShebangComments:                   core.ScriptTargetESNext,
	UsingAndAwaitUsing:                core.ScriptTargetESNext,
	ClassAndClassElementDecorators:    core.ScriptTargetESNext,
	RegularExpressionFlagsUnicodeSets: core.ScriptTargetESNext,
}

type ProjectReference struct {
	path         string
	originalPath string
	circular     bool
}

type FileIncludeKind int

const (
	FileIncludeKindRootFile FileIncludeKind = iota
	FileIncludeKindSourceFromProjectReference
	FileIncludeKindOutputFromProjectReference
	FileIncludeKindImport
	FileIncludeKindReferenceFile
	FileIncludeKindTypeReferenceDirective
	FileIncludeKindLibFile
	FileIncludeKindLibReferenceDirective
	FileIncludeKindAutomaticTypeDirectiveFile
)

type FileIncludeReason struct {
	Kind  FileIncludeKind
	Index int
}
