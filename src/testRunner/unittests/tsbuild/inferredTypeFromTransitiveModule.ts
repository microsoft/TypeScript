namespace ts {
    describe("unittests:: tsbuild:: inferredTypeFromTransitiveModule::", () => {
        let projFs: vfs.FileSystem;
        before(() => {
            projFs = loadProjectFromDisk("tests/projects/inferredTypeFromTransitiveModule");
        });
        after(() => {
            projFs = undefined!;
        });

        verifyTscWithEdits({
            scenario: "inferredTypeFromTransitiveModule",
            subScenario: "inferred type from transitive module",
            fs: () => projFs,
            commandLineArgs: ["--b", "/src", "--verbose"],
            edits: [
                {
                    subScenario: "incremental-declaration-changes",
                    modifyFs: changeBarParam,
                },
                {
                    subScenario: "incremental-declaration-changes",
                    modifyFs: changeBarParamBack,
                },
            ],
        });

        verifyTscWithEdits({
            subScenario: "inferred type from transitive module with isolatedModules",
            fs: () => projFs,
            scenario: "inferredTypeFromTransitiveModule",
            commandLineArgs: ["--b", "/src", "--verbose"],
            modifyFs: changeToIsolatedModules,
            edits: [
                {
                    subScenario: "incremental-declaration-changes",
                    modifyFs: changeBarParam
                },
                {
                    subScenario: "incremental-declaration-changes",
                    modifyFs: changeBarParamBack,
                },
            ]
        });

        verifyTscWithEdits({
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
            edits: [
                {
                    subScenario: "incremental-declaration-changes",
                    modifyFs: changeBarParam
                },
                {
                    subScenario: "incremental-declaration-changes",
                    modifyFs: changeBarParamBack,
                },
                {
                    subScenario: "incremental-declaration-changes",
                    modifyFs: changeBarParam
                },
                {
                    subScenario: "Fix Error",
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

    function changeBarParamBack(fs: vfs.FileSystem) {
        replaceText(fs, "/src/bar.ts", "foobar()", "foobar(param: string)");
    }
}
