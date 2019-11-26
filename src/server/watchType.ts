/* @internal */
namespace ts {
    // Additional tsserver specific watch information
    export const enum WatchType {
        ClosedScriptInfo = "Closed Script info",
        ConfigFileForInferredRoot = "Config file for the inferred project root",
        NodeModulesForClosedScriptInfo = "node_modules for closed script infos in them",
        MissingSourceMapFile = "Missing source map file",
        NoopConfigFileForInferredRoot = "Noop Config file for the inferred project root",
        MissingGeneratedFile = "Missing generated file",
        PackageJsonFile = "package.json file for import suggestions"
    }
}