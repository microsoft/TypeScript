/* @internal */
namespace ts {
    // Additional tsserver specific watch information
    export interface WatchTypeRegistry {
        ClosedScriptInfo: "Closed Script info",
        ConfigFileForInferredRoot: "Config file for the inferred project root",
        NodeModules: "node_modules for closed script infos and package.jsons affecting module specifier cache",
        MissingSourceMapFile: "Missing source map file",
        NoopConfigFileForInferredRoot: "Noop Config file for the inferred project root",
        MissingGeneratedFile: "Missing generated file",
        NodeModulesForModuleSpecifierCache: "node_modules for module specifier cache invalidation",
    }
    WatchType.ClosedScriptInfo = "Closed Script info";
    WatchType.ConfigFileForInferredRoot = "Config file for the inferred project root";
    WatchType.NodeModules = "node_modules for closed script infos and package.jsons affecting module specifier cache";
    WatchType.MissingSourceMapFile = "Missing source map file";
    WatchType.NoopConfigFileForInferredRoot = "Noop Config file for the inferred project root";
    WatchType.MissingGeneratedFile = "Missing generated file";
}
