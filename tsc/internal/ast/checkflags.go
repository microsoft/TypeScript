package ast

// CheckFlags

type CheckFlags uint32

const (
	CheckFlagsNone                   CheckFlags = 0
	CheckFlagsInstantiated           CheckFlags = 1 << 0  // Instantiated symbol
	CheckFlagsSyntheticProperty      CheckFlags = 1 << 1  // Property in union or intersection type
	CheckFlagsSyntheticMethod        CheckFlags = 1 << 2  // Method in union or intersection type
	CheckFlagsReadonly               CheckFlags = 1 << 3  // Readonly transient symbol
	CheckFlagsReadPartial            CheckFlags = 1 << 4  // Synthetic property present in some but not all constituents
	CheckFlagsWritePartial           CheckFlags = 1 << 5  // Synthetic property present in some but only satisfied by an index signature in others
	CheckFlagsHasNonUniformType      CheckFlags = 1 << 6  // Synthetic property with non-uniform type in constituents
	CheckFlagsHasLiteralType         CheckFlags = 1 << 7  // Synthetic property with at least one literal type in constituents
	CheckFlagsContainsPublic         CheckFlags = 1 << 8  // Synthetic property with public constituent(s)
	CheckFlagsContainsProtected      CheckFlags = 1 << 9  // Synthetic property with protected constituent(s)
	CheckFlagsContainsPrivate        CheckFlags = 1 << 10 // Synthetic property with private constituent(s)
	CheckFlagsContainsWritePublic    CheckFlags = 1 << 11 // Synthetic property with public set accessors(s)
	CheckFlagsContainsWriteProtected CheckFlags = 1 << 12 // Synthetic property with protected set accessors(s)
	CheckFlagsContainsWritePrivate   CheckFlags = 1 << 13 // Synthetic property with private set accessors(s)
	CheckFlagsContainsStatic         CheckFlags = 1 << 14 // Synthetic property with static constituent(s)
	CheckFlagsLate                   CheckFlags = 1 << 15 // Late-bound symbol for a computed property with a dynamic name
	CheckFlagsReverseMapped          CheckFlags = 1 << 16 // Property of reverse-inferred homomorphic mapped type
	CheckFlagsOptionalParameter      CheckFlags = 1 << 17 // Optional parameter
	CheckFlagsRestParameter          CheckFlags = 1 << 18 // Rest parameter
	CheckFlagsDeferredType           CheckFlags = 1 << 19 // Calculation of the type of this symbol is deferred due to processing costs, should be fetched with `getTypeOfSymbolWithDeferredType`
	CheckFlagsHasNeverType           CheckFlags = 1 << 20 // Synthetic property with at least one never type in constituents
	CheckFlagsMapped                 CheckFlags = 1 << 21 // Property of mapped type
	CheckFlagsStripOptional          CheckFlags = 1 << 22 // Strip optionality in mapped property
	CheckFlagsUnresolved             CheckFlags = 1 << 23 // Unresolved type alias symbol
	CheckFlagsIsDiscriminantComputed CheckFlags = 1 << 24 // IsDiscriminant flags has been computed
	CheckFlagsIsDiscriminant         CheckFlags = 1 << 25 // Discriminant property
	CheckFlagsIndexSymbol            CheckFlags = 1 << 26 // Synthetic property created from index signature
	CheckFlagsSynthetic                         = CheckFlagsSyntheticProperty | CheckFlagsSyntheticMethod
	CheckFlagsNonUniformAndLiteral              = CheckFlagsHasNonUniformType | CheckFlagsHasLiteralType
	CheckFlagsPartial                           = CheckFlagsReadPartial | CheckFlagsWritePartial
)
