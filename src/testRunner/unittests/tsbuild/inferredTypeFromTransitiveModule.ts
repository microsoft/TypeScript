namespace ts {
    describe("unittests:: tsbuild:: inferredTypeFromTransitiveModule::", () => {
        let projFs: vfs.FileSystem;
        before(() => {
            projFs = loadProjectFromDisk("tests/projects/inferredTypeFromTransitiveModule");
        });
        after(() => {
            projFs = undefined!;
        });

        verifyTscSerializedIncrementalEdits({
            scenario: "inferredTypeFromTransitiveModule",
            subScenario: "inferred type from transitive module",
            fs: () => projFs,
            commandLineArgs: ["--b", "/src", "--verbose"],
            incrementalScenarios: [{
                buildKind: BuildKind.IncrementalDtsChange,
                modifyFs: changeBarParam,
            }],
        });

        verifyTscSerializedIncrementalEdits({
            subScenario: "inferred type from transitive module with isolatedModules",
            fs: () => projFs,
            scenario: "inferredTypeFromTransitiveModule",
            commandLineArgs: ["--b", "/src", "--verbose"],
            modifyFs: changeToIsolatedModules,
            incrementalScenarios: [{
                buildKind: BuildKind.IncrementalDtsChange,
                modifyFs: changeBarParam
            }]
        });

        verifyTscSerializedIncrementalEdits({
            scenario: "inferredTypeFromTransitiveModule",
            subScenario: "reports errors in files affected by change in signature with isolatedModules",
            fs: () => projFs,
            commandLineArgs: ["--b", "/src", "--verbose"],
            modifyFs: fs => {
                changeToIsolatedModules(fs);
                appendText(fs, "/src/lazyIndex.ts", `
import { default as bar } from './bar';
bar("hello");`);
            },
            incrementalScenarios: [
                {
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: changeBarParam
                },
                {
                    subScenario: "Fix Error",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => replaceText(fs, "/src/lazyIndex.ts", `bar("hello")`, "bar()")
                },
            ]
        });
    });

    function changeToIsolatedModules(fs: vfs.FileSystem) {
        replaceText(fs, "/src/tsconfig.json", `"incremental": true`, `"incremental": true, "isolatedModules": true`);
    }

    function changeBarParam(fs: vfs.FileSystem) {
        replaceText(fs, "/src/bar.ts", "param: string", "");
    }
}
