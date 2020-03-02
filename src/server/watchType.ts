import { WatchType } from "./ts";
/* @internal */
declare module "../compiler/watch" {
    // Additional tsserver specific watch information
    export interface WatchTypeRegistry {
        ClosedScriptInfo: "Closed Script info";
        ConfigFileForInferredRoot: "Config file for the inferred project root";
        NodeModulesForClosedScriptInfo: "node_modules for closed script infos in them";
        MissingSourceMapFile: "Missing source map file";
        NoopConfigFileForInferredRoot: "Noop Config file for the inferred project root";
        MissingGeneratedFile: "Missing generated file";
        PackageJsonFile: "package.json file for import suggestions";
    }
}
/* @internal */
WatchType.ClosedScriptInfo = "Closed Script info";
/* @internal */
WatchType.ConfigFileForInferredRoot = "Config file for the inferred project root";
/* @internal */
WatchType.NodeModulesForClosedScriptInfo = "node_modules for closed script infos in them";
/* @internal */
WatchType.MissingSourceMapFile = "Missing source map file";
/* @internal */
WatchType.NoopConfigFileForInferredRoot = "Noop Config file for the inferred project root";
/* @internal */
WatchType.MissingGeneratedFile = "Missing generated file";
/* @internal */
WatchType.PackageJsonFile = "package.json file for import suggestions";
