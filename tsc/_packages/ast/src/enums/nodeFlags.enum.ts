//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! THIS FILE IS AUTO-GENERATED — DO NOT EDIT !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Source: internal/ast/nodeflags.go
// Regenerate: npx hereby generate:enums
//
export enum NodeFlags {
    None = 0,
    Let = 1 << 0,
    Const = 1 << 1,
    Using = 1 << 2,
    Reparsed = 1 << 3,
    Synthesized = 1 << 4,
    OptionalChain = 1 << 5,
    ExportContext = 1 << 6,
    ContainsThis = 1 << 7,
    HasImplicitReturn = 1 << 8,
    HasExplicitReturn = 1 << 9,
    DisallowInContext = 1 << 10,
    YieldContext = 1 << 11,
    DecoratorContext = 1 << 12,
    AwaitContext = 1 << 13,
    DisallowConditionalTypesContext = 1 << 14,
    ThisNodeHasError = 1 << 15,
    JavaScriptFile = 1 << 16,
    ThisNodeOrAnySubNodesHasError = 1 << 17,
    HasAggregatedChildData = 1 << 18,
    PossiblyContainsDynamicImport = 1 << 19,
    PossiblyContainsImportMeta = 1 << 20,
    HasJSDoc = 1 << 21,
    JSDoc = 1 << 22,
    Ambient = 1 << 23,
    InWithStatement = 1 << 24,
    JsonFile = 1 << 25,
    PossiblyContainsDeprecatedTag = 1 << 26,
    Unreachable = 1 << 27,
    BlockScoped = Let | Const | Using,
    Constant = Const | Using,
    AwaitUsing = Const | Using,
    ReachabilityCheckFlags = HasImplicitReturn | HasExplicitReturn,
    ContextFlags = DisallowInContext | DisallowConditionalTypesContext | YieldContext | DecoratorContext | AwaitContext | JavaScriptFile | InWithStatement | Ambient,
    TypeExcludesFlags = YieldContext | AwaitContext,
    PermanentlySetIncrementalFlags = PossiblyContainsDynamicImport | PossiblyContainsImportMeta,
    IdentifierHasExtendedUnicodeEscape = ContainsThis,
}
