package ast

type ModifierFlags uint32

const (
	ModifierFlagsNone ModifierFlags = 0
	// Syntactic/JSDoc modifiers
	ModifierFlagsPublic    ModifierFlags = 1 << 0 // Property/Method
	ModifierFlagsPrivate   ModifierFlags = 1 << 1 // Property/Method
	ModifierFlagsProtected ModifierFlags = 1 << 2 // Property/Method
	ModifierFlagsReadonly  ModifierFlags = 1 << 3 // Property/Method
	ModifierFlagsOverride  ModifierFlags = 1 << 4 // Override method
	// Syntactic-only modifiers
	ModifierFlagsExport    ModifierFlags = 1 << 5  // Declarations
	ModifierFlagsAbstract  ModifierFlags = 1 << 6  // Class/Method/ConstructSignature
	ModifierFlagsAmbient   ModifierFlags = 1 << 7  // Declarations
	ModifierFlagsStatic    ModifierFlags = 1 << 8  // Property/Method
	ModifierFlagsAccessor  ModifierFlags = 1 << 9  // Property
	ModifierFlagsAsync     ModifierFlags = 1 << 10 // Property/Method/Function
	ModifierFlagsDefault   ModifierFlags = 1 << 11 // Function/Class (export default declaration)
	ModifierFlagsConst     ModifierFlags = 1 << 12 // Const enum
	ModifierFlagsIn        ModifierFlags = 1 << 13 // Contravariance modifier
	ModifierFlagsOut       ModifierFlags = 1 << 14 // Covariance modifier
	ModifierFlagsDecorator ModifierFlags = 1 << 15 // Contains a decorator.
	ModifierFlagsImmediate ModifierFlags = 1 << 16 // Parameter
	// JSDoc-only modifiers
	ModifierFlagsDeprecated     ModifierFlags = 1 << 17 // Deprecated tag.
	ModifierFlagsJSDocImmediate ModifierFlags = 1 << 18 // Parameter
	// Cache-only JSDoc-modifiers. Should match order of Syntactic/JSDoc modifiers, above.
	ModifierFlagsJSDocPublic               ModifierFlags = 1 << 23 // if this value changes, `selectEffectiveModifierFlags` must change accordingly
	ModifierFlagsJSDocPrivate              ModifierFlags = 1 << 24
	ModifierFlagsJSDocProtected            ModifierFlags = 1 << 25
	ModifierFlagsJSDocReadonly             ModifierFlags = 1 << 26
	ModifierFlagsJSDocOverride             ModifierFlags = 1 << 27
	ModifierFlagsHasComputedJSDocModifiers ModifierFlags = 1 << 28 // Indicates the computed modifier flags include modifiers from JSDoc.
	ModifierFlagsHasComputedFlags          ModifierFlags = 1 << 29 // Modifier flags have been computed

	ModifierFlagsSyntacticOrJSDocModifiers = ModifierFlagsPublic | ModifierFlagsPrivate | ModifierFlagsProtected | ModifierFlagsReadonly | ModifierFlagsOverride
	ModifierFlagsSyntacticOnlyModifiers    = ModifierFlagsExport | ModifierFlagsAmbient | ModifierFlagsAbstract | ModifierFlagsStatic | ModifierFlagsAccessor | ModifierFlagsAsync | ModifierFlagsDefault | ModifierFlagsConst | ModifierFlagsIn | ModifierFlagsOut | ModifierFlagsDecorator | ModifierFlagsImmediate
	ModifierFlagsSyntacticModifiers        = ModifierFlagsSyntacticOrJSDocModifiers | ModifierFlagsSyntacticOnlyModifiers
	ModifierFlagsJSDocCacheOnlyModifiers   = ModifierFlagsJSDocPublic | ModifierFlagsJSDocPrivate | ModifierFlagsJSDocProtected | ModifierFlagsJSDocReadonly | ModifierFlagsJSDocOverride
	ModifierFlagsJSDocOnlyModifiers        = ModifierFlagsDeprecated | ModifierFlagsJSDocImmediate
	ModifierFlagsNonCacheOnlyModifiers     = ModifierFlagsSyntacticOrJSDocModifiers | ModifierFlagsSyntacticOnlyModifiers | ModifierFlagsJSDocOnlyModifiers

	ModifierFlagsAccessibilityModifier = ModifierFlagsPublic | ModifierFlagsPrivate | ModifierFlagsProtected
	// Accessibility modifiers and 'readonly' can be attached to a parameter in a constructor to make it a property.
	ModifierFlagsParameterPropertyModifier      = ModifierFlagsAccessibilityModifier | ModifierFlagsReadonly | ModifierFlagsOverride
	ModifierFlagsNonPublicAccessibilityModifier = ModifierFlagsPrivate | ModifierFlagsProtected

	ModifierFlagsTypeScriptModifier = ModifierFlagsAmbient | ModifierFlagsPublic | ModifierFlagsPrivate | ModifierFlagsProtected | ModifierFlagsReadonly | ModifierFlagsAbstract | ModifierFlagsConst | ModifierFlagsOverride | ModifierFlagsIn | ModifierFlagsOut | ModifierFlagsImmediate
	ModifierFlagsExportDefault      = ModifierFlagsExport | ModifierFlagsDefault
	ModifierFlagsAll                = ModifierFlagsExport | ModifierFlagsAmbient | ModifierFlagsPublic | ModifierFlagsPrivate | ModifierFlagsProtected | ModifierFlagsStatic | ModifierFlagsReadonly | ModifierFlagsAbstract | ModifierFlagsAccessor | ModifierFlagsAsync | ModifierFlagsDefault | ModifierFlagsConst | ModifierFlagsDeprecated | ModifierFlagsOverride | ModifierFlagsIn | ModifierFlagsOut | ModifierFlagsImmediate | ModifierFlagsDecorator
	ModifierFlagsModifier           = ModifierFlagsAll & ^ModifierFlagsDecorator
)
