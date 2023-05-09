import {
    loadProjectFromFiles,
    verifyTsc,
} from "./helpers";

describe("unittests:: tsc:: arbitraryExtensions::", () => {

    verifyTsc({
        scenario: "arbitraryExtensions",
        subScenario: "reports error for css resolution",
        fs: () => loadProjectFromFiles({
            "/src/a.ts": `import {} from "./b.css";`,
            "/src/b.css": "random content",
        }),
        commandLineArgs: ["/src/a.ts", "--explainFiles", "--traceResolution"],
        baselinePrograms: true,
    });

    verifyTsc({
        scenario: "arbitraryExtensions",
        subScenario: "resolves to css file",
        fs: () => loadProjectFromFiles({
            "/src/a.ts": `import {} from "./b.css";`,
            "/src/b.css": "random content",
        }),
        commandLineArgs: ["/src/a.ts", "--explainFiles", "--traceResolution", "--allowArbitraryExtensions"],
        baselinePrograms: true,
    });

    // May be always try arbitraryextension and report error depending on options ?

    // TODO:: try other flags, watchMode, incremental, program reuse, host.getDeclarationForArbitraryExtensionFile
    // editor scenarios, module specifier
});