//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! THIS FILE IS AUTO-GENERATED — DO NOT EDIT !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Source: internal/ast/nodeflags.go
// Regenerate: npx hereby generate:enums
//
export var NodeFlags: any;
(function (NodeFlags) {
    NodeFlags[NodeFlags["None"] = 0] = "None";
    NodeFlags[NodeFlags["Let"] = 1] = "Let";
    NodeFlags[NodeFlags["Const"] = 2] = "Const";
    NodeFlags[NodeFlags["Using"] = 4] = "Using";
    NodeFlags[NodeFlags["Reparsed"] = 8] = "Reparsed";
    NodeFlags[NodeFlags["Synthesized"] = 16] = "Synthesized";
    NodeFlags[NodeFlags["OptionalChain"] = 32] = "OptionalChain";
    NodeFlags[NodeFlags["ExportContext"] = 64] = "ExportContext";
    NodeFlags[NodeFlags["ContainsThis"] = 128] = "ContainsThis";
    NodeFlags[NodeFlags["HasImplicitReturn"] = 256] = "HasImplicitReturn";
    NodeFlags[NodeFlags["HasExplicitReturn"] = 512] = "HasExplicitReturn";
    NodeFlags[NodeFlags["DisallowInContext"] = 1024] = "DisallowInContext";
    NodeFlags[NodeFlags["YieldContext"] = 2048] = "YieldContext";
    NodeFlags[NodeFlags["DecoratorContext"] = 4096] = "DecoratorContext";
    NodeFlags[NodeFlags["AwaitContext"] = 8192] = "AwaitContext";
    NodeFlags[NodeFlags["DisallowConditionalTypesContext"] = 16384] = "DisallowConditionalTypesContext";
    NodeFlags[NodeFlags["ThisNodeHasError"] = 32768] = "ThisNodeHasError";
    NodeFlags[NodeFlags["JavaScriptFile"] = 65536] = "JavaScriptFile";
    NodeFlags[NodeFlags["ThisNodeOrAnySubNodesHasError"] = 131072] = "ThisNodeOrAnySubNodesHasError";
    NodeFlags[NodeFlags["HasAggregatedChildData"] = 262144] = "HasAggregatedChildData";
    NodeFlags[NodeFlags["PossiblyContainsDynamicImport"] = 524288] = "PossiblyContainsDynamicImport";
    NodeFlags[NodeFlags["PossiblyContainsImportMeta"] = 1048576] = "PossiblyContainsImportMeta";
    NodeFlags[NodeFlags["HasJSDoc"] = 2097152] = "HasJSDoc";
    NodeFlags[NodeFlags["JSDoc"] = 4194304] = "JSDoc";
    NodeFlags[NodeFlags["Ambient"] = 8388608] = "Ambient";
    NodeFlags[NodeFlags["InWithStatement"] = 16777216] = "InWithStatement";
    NodeFlags[NodeFlags["JsonFile"] = 33554432] = "JsonFile";
    NodeFlags[NodeFlags["PossiblyContainsDeprecatedTag"] = 67108864] = "PossiblyContainsDeprecatedTag";
    NodeFlags[NodeFlags["Unreachable"] = 134217728] = "Unreachable";
    NodeFlags[NodeFlags["BlockScoped"] = 7] = "BlockScoped";
    NodeFlags[NodeFlags["Constant"] = 6] = "Constant";
    NodeFlags[NodeFlags["AwaitUsing"] = 6] = "AwaitUsing";
    NodeFlags[NodeFlags["ReachabilityCheckFlags"] = 768] = "ReachabilityCheckFlags";
    NodeFlags[NodeFlags["ContextFlags"] = 25263104] = "ContextFlags";
    NodeFlags[NodeFlags["TypeExcludesFlags"] = 10240] = "TypeExcludesFlags";
    NodeFlags[NodeFlags["PermanentlySetIncrementalFlags"] = 1572864] = "PermanentlySetIncrementalFlags";
    NodeFlags[NodeFlags["IdentifierHasExtendedUnicodeEscape"] = 128] = "IdentifierHasExtendedUnicodeEscape";
})(NodeFlags || (NodeFlags = {}));
