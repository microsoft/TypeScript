import * as vfs from "../../_namespaces/vfs";
import {
    appendText,
    loadProjectFromDisk,
    replaceText,
    verifyTsc,
} from "../tsc/helpers";

describe("unittests:: tsbuild:: inferredTypeFromTransitiveModule::", () => {
    let projFs: vfs.FileSystem;
    before(() => {
        projFs = loadProjectFromDisk("tests/projects/inferredTypeFromTransitiveModule");
    });
    after(() => {
        projFs = undefined!;
    });

    verifyTsc({
        scenario: "inferredTypeFromTransitiveModule",
        subScenario: "inferred type from transitive module",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src", "--verbose"],
        edits: [
            {
                caption: "incremental-declaration-changes",
                edit: changeBarParam,
            },
            {
                caption: "incremental-declaration-changes",
                edit: changeBarParamBack,
            },
        ],
    });

    verifyTsc({
        subScenario: "inferred type from transitive module with isolatedModules",
        fs: () => projFs,
        scenario: "inferredTypeFromTransitiveModule",
        commandLineArgs: ["--b", "/src", "--verbose"],
        modifyFs: changeToIsolatedModules,
        edits: [
            {
                caption: "incremental-declaration-changes",
                edit: changeBarParam
            },
            {
                caption: "incremental-declaration-changes",
                edit: changeBarParamBack,
            },
        ]
    });

    verifyTsc({
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
                caption: "incremental-declaration-changes",
                edit: changeBarParam
            },
            {
                caption: "incremental-declaration-changes",
                edit: changeBarParamBack,
            },
            {
                caption: "incremental-declaration-changes",
                edit: changeBarParam
            },
            {
                caption: "Fix Error",
                edit: fs => replaceText(fs, "/src/lazyIndex.ts", `bar("hello")`, "bar()")
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
