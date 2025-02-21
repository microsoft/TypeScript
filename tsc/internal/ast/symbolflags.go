package ast

// SymbolFlags

type SymbolFlags uint32

const (
	SymbolFlagsNone                   SymbolFlags = 0
	SymbolFlagsFunctionScopedVariable SymbolFlags = 1 << 0  // Variable (var) or parameter
	SymbolFlagsBlockScopedVariable    SymbolFlags = 1 << 1  // A block-scoped variable (let or const)
	SymbolFlagsProperty               SymbolFlags = 1 << 2  // Property or enum member
	SymbolFlagsEnumMember             SymbolFlags = 1 << 3  // Enum member
	SymbolFlagsFunction               SymbolFlags = 1 << 4  // Function
	SymbolFlagsClass                  SymbolFlags = 1 << 5  // Class
	SymbolFlagsInterface              SymbolFlags = 1 << 6  // Interface
	SymbolFlagsConstEnum              SymbolFlags = 1 << 7  // Const enum
	SymbolFlagsRegularEnum            SymbolFlags = 1 << 8  // Enum
	SymbolFlagsValueModule            SymbolFlags = 1 << 9  // Instantiated module
	SymbolFlagsNamespaceModule        SymbolFlags = 1 << 10 // Uninstantiated module
	SymbolFlagsTypeLiteral            SymbolFlags = 1 << 11 // Type Literal or mapped type
	SymbolFlagsObjectLiteral          SymbolFlags = 1 << 12 // Object Literal
	SymbolFlagsMethod                 SymbolFlags = 1 << 13 // Method
	SymbolFlagsConstructor            SymbolFlags = 1 << 14 // Constructor
	SymbolFlagsGetAccessor            SymbolFlags = 1 << 15 // Get accessor
	SymbolFlagsSetAccessor            SymbolFlags = 1 << 16 // Set accessor
	SymbolFlagsSignature              SymbolFlags = 1 << 17 // Call, construct, or index signature
	SymbolFlagsTypeParameter          SymbolFlags = 1 << 18 // Type parameter
	SymbolFlagsTypeAlias              SymbolFlags = 1 << 19 // Type alias
	SymbolFlagsExportValue            SymbolFlags = 1 << 20 // Exported value marker (see comment in declareModuleMember in binder)
	SymbolFlagsAlias                  SymbolFlags = 1 << 21 // An alias for another symbol (see comment in isAliasSymbolDeclaration in checker)
	SymbolFlagsPrototype              SymbolFlags = 1 << 22 // Prototype property (no source representation)
	SymbolFlagsExportStar             SymbolFlags = 1 << 23 // Export * declaration
	SymbolFlagsOptional               SymbolFlags = 1 << 24 // Optional property
	SymbolFlagsTransient              SymbolFlags = 1 << 25 // Transient symbol (created during type check)
	SymbolFlagsAssignment             SymbolFlags = 1 << 26 // Assignment to property on function acting as declaration (eg `func.prop = 1`)
	SymbolFlagsModuleExports          SymbolFlags = 1 << 27 // Symbol for CommonJS `module` of `module.exports`
	SymbolFlagsConstEnumOnlyModule    SymbolFlags = 1 << 28 // Module contains only const enums or other modules with only const enums
	SymbolFlagsReplaceableByMethod    SymbolFlags = 1 << 29
	SymbolFlagsGlobalLookup           SymbolFlags = 1 << 30   // Flag to signal this is a global lookup
	SymbolFlagsAll                    SymbolFlags = 1<<30 - 1 // All flags except SymbolFlagsGlobalLookup

	SymbolFlagsEnum      = SymbolFlagsRegularEnum | SymbolFlagsConstEnum
	SymbolFlagsVariable  = SymbolFlagsFunctionScopedVariable | SymbolFlagsBlockScopedVariable
	SymbolFlagsValue     = SymbolFlagsVariable | SymbolFlagsProperty | SymbolFlagsEnumMember | SymbolFlagsObjectLiteral | SymbolFlagsFunction | SymbolFlagsClass | SymbolFlagsEnum | SymbolFlagsValueModule | SymbolFlagsMethod | SymbolFlagsGetAccessor | SymbolFlagsSetAccessor
	SymbolFlagsType      = SymbolFlagsClass | SymbolFlagsInterface | SymbolFlagsEnum | SymbolFlagsEnumMember | SymbolFlagsTypeLiteral | SymbolFlagsTypeParameter | SymbolFlagsTypeAlias
	SymbolFlagsNamespace = SymbolFlagsValueModule | SymbolFlagsNamespaceModule | SymbolFlagsEnum
	SymbolFlagsModule    = SymbolFlagsValueModule | SymbolFlagsNamespaceModule
	SymbolFlagsAccessor  = SymbolFlagsGetAccessor | SymbolFlagsSetAccessor

	// Variables can be redeclared, but can not redeclare a block-scoped declaration with the
	// same name, or any other value that is not a variable, e.g. ValueModule or Class
	SymbolFlagsFunctionScopedVariableExcludes = SymbolFlagsValue & ^SymbolFlagsFunctionScopedVariable

	// Block-scoped declarations are not allowed to be re-declared
	// they can not merge with anything in the value space
	SymbolFlagsBlockScopedVariableExcludes = SymbolFlagsValue

	SymbolFlagsParameterExcludes                   = SymbolFlagsValue
	SymbolFlagsPropertyExcludes                    = SymbolFlagsValue & ^SymbolFlagsProperty
	SymbolFlagsEnumMemberExcludes                  = SymbolFlagsValue | SymbolFlagsType
	SymbolFlagsFunctionExcludes                    = SymbolFlagsValue & ^(SymbolFlagsFunction | SymbolFlagsValueModule | SymbolFlagsClass)
	SymbolFlagsClassExcludes                       = (SymbolFlagsValue | SymbolFlagsType) & ^(SymbolFlagsValueModule | SymbolFlagsInterface | SymbolFlagsFunction) // class-interface mergability done in checker.ts
	SymbolFlagsInterfaceExcludes                   = SymbolFlagsType & ^(SymbolFlagsInterface | SymbolFlagsClass)
	SymbolFlagsRegularEnumExcludes                 = (SymbolFlagsValue | SymbolFlagsType) & ^(SymbolFlagsRegularEnum | SymbolFlagsValueModule) // regular enums merge only with regular enums and modules
	SymbolFlagsConstEnumExcludes                   = (SymbolFlagsValue | SymbolFlagsType) & ^SymbolFlagsConstEnum                              // const enums merge only with const enums
	SymbolFlagsValueModuleExcludes                 = SymbolFlagsValue & ^(SymbolFlagsFunction | SymbolFlagsClass | SymbolFlagsRegularEnum | SymbolFlagsValueModule)
	SymbolFlagsNamespaceModuleExcludes             = SymbolFlagsNone
	SymbolFlagsMethodExcludes                      = SymbolFlagsValue & ^SymbolFlagsMethod
	SymbolFlagsGetAccessorExcludes                 = SymbolFlagsValue & ^SymbolFlagsSetAccessor
	SymbolFlagsSetAccessorExcludes                 = SymbolFlagsValue & ^SymbolFlagsGetAccessor
	SymbolFlagsAccessorExcludes                    = SymbolFlagsValue & ^SymbolFlagsAccessor
	SymbolFlagsTypeParameterExcludes               = SymbolFlagsType & ^SymbolFlagsTypeParameter
	SymbolFlagsTypeAliasExcludes                   = SymbolFlagsType
	SymbolFlagsAliasExcludes                       = SymbolFlagsAlias
	SymbolFlagsModuleMember                        = SymbolFlagsVariable | SymbolFlagsFunction | SymbolFlagsClass | SymbolFlagsInterface | SymbolFlagsEnum | SymbolFlagsModule | SymbolFlagsTypeAlias | SymbolFlagsAlias
	SymbolFlagsExportHasLocal                      = SymbolFlagsFunction | SymbolFlagsClass | SymbolFlagsEnum | SymbolFlagsValueModule
	SymbolFlagsBlockScoped                         = SymbolFlagsBlockScopedVariable | SymbolFlagsClass | SymbolFlagsEnum
	SymbolFlagsPropertyOrAccessor                  = SymbolFlagsProperty | SymbolFlagsAccessor
	SymbolFlagsClassMember                         = SymbolFlagsMethod | SymbolFlagsAccessor | SymbolFlagsProperty
	SymbolFlagsExportSupportsDefaultModifier       = SymbolFlagsClass | SymbolFlagsFunction | SymbolFlagsInterface
	SymbolFlagsExportDoesNotSupportDefaultModifier = ^SymbolFlagsExportSupportsDefaultModifier
	// The set of things we consider semantically classifiable.  Used to speed up the LS during
	// classification.
	SymbolFlagsClassifiable         = SymbolFlagsClass | SymbolFlagsEnum | SymbolFlagsTypeAlias | SymbolFlagsInterface | SymbolFlagsTypeParameter | SymbolFlagsModule | SymbolFlagsAlias
	SymbolFlagsLateBindingContainer = SymbolFlagsClass | SymbolFlagsInterface | SymbolFlagsTypeLiteral | SymbolFlagsObjectLiteral | SymbolFlagsFunction
)
