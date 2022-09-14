import * as ts from "../../_namespaces/ts";
import * as vfs from "../../_namespaces/vfs";

describe("unittests:: tsbuild:: inferredTypeFromTransitiveModule::", () => {
    let projFs: vfs.FileSystem;
    before(() => {
        projFs = ts.loadProjectFromDisk("tests/projects/inferredTypeFromTransitiveModule");
    });
    after(() => {
        projFs = undefined!;
    });

    ts.verifyTscWithEdits({
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

    ts.verifyTscWithEdits({
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

    ts.verifyTscWithEdits({
        scenario: "inferredTypeFromTransitiveModule",
        subScenario: "reports errors in files affected by change in signature with isolatedModules",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src", "--verbose"],
        modifyFs: fs => {
            changeToIsolatedModules(fs);
            ts.appendText(fs, "/src/lazyIndex.ts", `
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
                modifyFs: fs => ts.replaceText(fs, "/src/lazyIndex.ts", `bar("hello")`, "bar()")
            },
        ]
    });
});

function changeToIsolatedModules(fs: vfs.FileSystem) {
    ts.replaceText(fs, "/src/tsconfig.json", `"incremental": true`, `"incremental": true, "isolatedModules": true`);
}

function changeBarParam(fs: vfs.FileSystem) {
    ts.replaceText(fs, "/src/bar.ts", "param: string", "");
}

function changeBarParamBack(fs: vfs.FileSystem) {
    ts.replaceText(fs, "/src/bar.ts", "foobar()", "foobar(param: string)");
}
