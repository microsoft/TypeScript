/* @internal */
namespace ts {
    // Additional tsserver specific watch information
    export interface WatchTypeRegistry {
        ClosedScriptInfo: "Closed Script info",
        ConfigFileForInferredRoot: "Config file for the inferred project root",
        NodeModulesForClosedScriptInfo: "node_modules for closed script infos in them",
        MissingSourceMapFile: "Missing source map file",
        NoopConfigFileForInferredRoot: "Noop Config file for the inferred project root",
        MissingGeneratedFile: "Missing generated file",
        PackageJsonFile: "package.json file for import suggestions"
    }
    WatchType.ClosedScriptInfo = "Closed Script info";
    WatchType.ConfigFileForInferredRoot = "Config file for the inferred project root";
    WatchType.NodeModulesForClosedScriptInfo = "node_modules for closed script infos in them";
    WatchType.MissingSourceMapFile = "Missing source map file";
    WatchType.NoopConfigFileForInferredRoot = "Noop Config file for the inferred project root";
    WatchType.MissingGeneratedFile = "Missing generated file";
    WatchType.PackageJsonFile = "package.json file for import suggestions";
}