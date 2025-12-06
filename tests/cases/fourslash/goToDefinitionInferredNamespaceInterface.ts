/// <reference path='fourslash.ts' />

// Classic namespace/interface shadowing pattern commonly used in TypeScript

////namespace /*namespaceDefinition*/Config {
////    export const defaultValue = "default";
////    export function parse(input: string): Config {
////        return { setting: input };
////    }
////}
////
////interface /*interfaceDefinition*/Config {
////    setting: string;
////}
////
////// Type position - should go to interface
////function updateConfig(cfg: /*interfaceUsage*/Config): void {
////    console.log(cfg.setting);
////}
////
////// Value position - should go to namespace
////const defaultCfg = /*namespaceUsage*/Config.parse("test");
////
////// Type in return position - should go to interface
////function getConfig(): /*returnTypeUsage*/Config {
////    return { setting: "value" };
////}
////
////// Type in type alias - should go to interface
////type ConfigArray = Array</*typeArgumentUsage*/Config>;

goTo.marker("interfaceUsage");
verify.goToDefinitionInferredIndex("interfaceDefinition");

goTo.marker("namespaceUsage");
verify.goToDefinitionInferredIndex("namespaceDefinition");

goTo.marker("returnTypeUsage");
verify.goToDefinitionInferredIndex("interfaceDefinition");

goTo.marker("typeArgumentUsage");
verify.goToDefinitionInferredIndex("interfaceDefinition");
