//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! THIS FILE IS AUTO-GENERATED — DO NOT EDIT !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Source: internal/ast/modifierflags.go
// Regenerate: npx hereby generate:enums
//
export enum ModifierFlags {
    None = 0,
    Public = 1 << 0,
    Private = 1 << 1,
    Protected = 1 << 2,
    Readonly = 1 << 3,
    Override = 1 << 4,
    Export = 1 << 5,
    Abstract = 1 << 6,
    Ambient = 1 << 7,
    Static = 1 << 8,
    Accessor = 1 << 9,
    Async = 1 << 10,
    Default = 1 << 11,
    Const = 1 << 12,
    In = 1 << 13,
    Out = 1 << 14,
    Decorator = 1 << 15,
    Deprecated = 1 << 16,
    JSDocPublic = 1 << 23,
    JSDocPrivate = 1 << 24,
    JSDocProtected = 1 << 25,
    JSDocReadonly = 1 << 26,
    JSDocOverride = 1 << 27,
    HasComputedJSDocModifiers = 1 << 28,
    HasComputedFlags = 1 << 29,
    SyntacticOrJSDocModifiers = Public | Private | Protected | Readonly | Override,
    SyntacticOnlyModifiers = Export | Ambient | Abstract | Static | Accessor | Async | Default | Const | In | Out | Decorator,
    SyntacticModifiers = SyntacticOrJSDocModifiers | SyntacticOnlyModifiers,
    JSDocCacheOnlyModifiers = JSDocPublic | JSDocPrivate | JSDocProtected | JSDocReadonly | JSDocOverride,
    JSDocOnlyModifiers = Deprecated,
    NonCacheOnlyModifiers = SyntacticOrJSDocModifiers | SyntacticOnlyModifiers | JSDocOnlyModifiers,
    AccessibilityModifier = Public | Private | Protected,
    ParameterPropertyModifier = AccessibilityModifier | Readonly | Override,
    NonPublicAccessibilityModifier = Private | Protected,
    TypeScriptModifier = Ambient | Public | Private | Protected | Readonly | Abstract | Const | Override | In | Out,
    ExportDefault = Export | Default,
    All = Export | Ambient | Public | Private | Protected | Static | Readonly | Abstract | Accessor | Async | Default | Const | Deprecated | Override | In | Out | Decorator,
    Modifier = All & ~Decorator,
    JavaScript = Export | Static | Accessor | Async | Default,
}
