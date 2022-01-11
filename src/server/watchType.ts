import { WatchType } from "./ts";
/* @internal */
declare module "../compiler/watch" {
// Additional tsserver specific watch information
export interface WatchTypeRegistry {
        ClosedScriptInfo: "Closed Script info";
        ConfigFileForInferredRoot: "Config file for the inferred project root";
        NodeModules: "node_modules for closed script infos and package.jsons affecting module specifier cache";
        MissingSourceMapFile: "Missing source map file";
        NoopConfigFileForInferredRoot: "Noop Config file for the inferred project root";
        MissingGeneratedFile: "Missing generated file";
        NodeModulesForModuleSpecifierCache: "node_modules for module specifier cache invalidation";
}
}
/* @internal */
WatchType.ClosedScriptInfo = "Closed Script info";
/* @internal */
WatchType.ConfigFileForInferredRoot = "Config file for the inferred project root";
/* @internal */
WatchType.NodeModules = "node_modules for closed script infos and package.jsons affecting module specifier cache";
/* @internal */
WatchType.MissingSourceMapFile = "Missing source map file";
/* @internal */
WatchType.NoopConfigFileForInferredRoot = "Noop Config file for the inferred project root";
/* @internal */
WatchType.MissingGeneratedFile = "Missing generated file";
