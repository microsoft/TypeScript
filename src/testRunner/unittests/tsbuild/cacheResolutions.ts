import * as ts from "../../_namespaces/ts";
import {
    appendText,
    noChangeRun,
    prependText,
    replaceText,
    verifyTsc,
} from "../tsc/helpers";
import {
    getFsWithMultipleProjects,
    getFsWithNode16,
    getFsWithOut,
    getFsWithPackageJsonEdits,
    getFsWithSameResolutionFromMultiplePlaces,
    getPkgImportContent,
    getPkgTypeRefContent,
} from "./cacheResolutionsHelper";

describe("unittests:: tsbuild:: cacheResolutions::", () => {
    verifyTsc({
        scenario: "cacheResolutions",
        subScenario: "multi file",
        fs: getFsWithNode16,
        commandLineArgs: ["-b", "/src/project", "--explainFiles"],
        baselineModulesAndTypeRefs: true,
        edits: [
            noChangeRun,
            {
                caption: "write file not resolved by import",
                edit: fs => fs.writeFileSync("/src/project/node_modules/pkg1/require.d.ts", getPkgImportContent("Require", 1)),
            },
            {
                caption: "write file not resolved by typeRef",
                edit: fs => fs.writeFileSync("/src/project/node_modules/pkg3/require.d.ts", getPkgTypeRefContent("Require", 3)),
            },
            {
                caption: "modify randomFileForImport by adding import",
                edit: fs => prependText(fs, "/src/project/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0" assert { "resolution-mode": "import" };\n`),
            },
            {
                caption: "modify randomFileForTypeRef by adding typeRef",
                edit: fs => prependText(fs, "/src/project/randomFileForTypeRef.ts", `/// <reference types="pkg2" resolution-mode="import"/>\n`),
            },
            {
                caption: "modify package.json and that should re-resolve and random edit",
                edit: fs => {
                    replaceText(fs, "/src/project/node_modules/pkg1/package.json", "./require.js", "./require1.js");
                    appendText(fs, "/src/project/randomFileForImport.ts", `export const y = 10;`);
                },
                discrepancyExplanation: () => [
                    `Clean build doesnt emit files so it doesnt have emit signatures and latestChangedDtsFile`,
                    `Incremental build has this information from previous pass`,
                ]
            },
            {
                caption: "write file not resolved by import and random edit",
                edit: fs => {
                    fs.writeFileSync("/src/project/node_modules/pkg1/require1.d.ts", getPkgImportContent("Require", 1));
                    appendText(fs, "/src/project/randomFileForImport.ts", `export const z = 10;`);
                },
            },
        ]
    });

    verifyTsc({
        scenario: "cacheResolutions",
        subScenario: "bundle emit",
        fs: getFsWithOut,
        commandLineArgs: ["-b", "/src/project", "--explainFiles"],
        baselineModulesAndTypeRefs: true,
        edits: [
            noChangeRun,
            {
                caption: "write file not resolved by import",
                edit: fs => fs.writeFileSync("/src/project/pkg1.d.ts", getPkgImportContent("Require", 1)),
            },
            {
                caption: "write file not resolved by typeRef",
                edit: fs => {
                    fs.mkdirpSync("/src/project/node_modules/pkg3");
                    fs.writeFileSync("/src/project/node_modules/pkg3/index.d.ts", getPkgTypeRefContent("Require", 3));
                },
            },
            {
                caption: "modify randomFileForImport by adding import",
                edit: fs => prependText(fs, "/src/project/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
            },
            {
                caption: "modify randomFileForTypeRef by adding typeRef",
                edit: fs => prependText(fs, "/src/project/randomFileForTypeRef.ts", `/// <reference types="pkg2"/>\n`),
            },
        ]
    });

    verifyTsc({
        scenario: "cacheResolutions",
        subScenario: "multi project",
        fs: getFsWithMultipleProjects,
        commandLineArgs: ["-b", "/src/project", "--explainFiles", "--v"],
        baselineModulesAndTypeRefs: true,
        edits: [
            {
                caption: "modify aRandomFileForImport by adding import",
                edit: fs => prependText(fs, "/src/project/aRandomFileForImport.ts", `export type { ImportInterface0 } from "pkg0";\n`),
            },
            {
                caption: "modify bRandomFileForImport by adding import",
                edit: fs => prependText(fs, "/src/project/bRandomFileForImport.ts", `export type { ImportInterface0 } from "pkg0";\n`),
            },
            {
                caption: "modify cRandomFileForImport by adding import",
                edit: fs => prependText(fs, "/src/project/cRandomFileForImport.ts", `export type { ImportInterface0 } from "pkg0";\n`),
            },
            {
                caption: "Project build on B",
                edit: ts.noop,
                commandLineArgs: ["-p", "/src/project/tsconfig.b.json", "--explainFiles"],
                discrepancyExplanation: () => [
                    "During incremental build, build succeeds because everything was built",
                    "Clean build does not have project build from a so it errors and has extra errors and incorrect buildinfo",
                ]
            },
            {
                caption: "modify bRandomFileForImport2 by adding import and project build",
                edit: fs => prependText(fs, "/src/project/bRandomFileForImport2.ts", `export type { ImportInterface0 } from "pkg0";\n`),
                commandLineArgs: ["-p", "/src/project/tsconfig.b.json", "--explainFiles"],
                discrepancyExplanation: () => [
                    "During incremental build, build succeeds because everything was built",
                    "Clean build does not have project build from a so it errors and has extra errors and incorrect buildinfo",
                ]
            },
            {
                caption: "Project build on c",
                edit: ts.noop,
                commandLineArgs: ["-p", "/src/project", "--explainFiles"],
                discrepancyExplanation: () => [
                    "During incremental build, build succeeds because everything was built",
                    "Clean build does not have project build from a and b so it errors and has extra errors and incorrect buildinfo",
                ]
            },
            {
                caption: "modify cRandomFileForImport2 by adding import and project build",
                edit: fs => prependText(fs, "/src/project/cRandomFileForImport2.ts", `export type { ImportInterface0 } from "pkg0";\n`),
                commandLineArgs: ["-p", "/src/project", "--explainFiles"],
                discrepancyExplanation: () => [
                    "During incremental build, build succeeds because everything was built",
                    "Clean build does not have project build from a and b so it errors and has extra errors and incorrect buildinfo",
                ]
            },
        ]
    });

    verifyTsc({
        scenario: "cacheResolutions",
        subScenario: "multiple places",
        fs: getFsWithSameResolutionFromMultiplePlaces,
        commandLineArgs: ["-b", "/src/project", "--explainFiles"],
        baselineModulesAndTypeRefs: true,
        edits: [
            {
                caption: "modify randomFileForImport by adding import",
                edit: fs => prependText(fs, "/src/project/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
            },
            {
                caption: "modify b/randomFileForImport by adding import",
                edit: fs => prependText(fs, "/src/project/b/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
            },
            {
                caption: "modify c/ca/caa/randomFileForImport by adding import",
                edit: fs => prependText(fs, "/src/project/c/ca/caa/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
            },
            {
                caption: "modify d/da/daa/daaa/x/y/z/randomFileForImport by adding import",
                edit: fs => prependText(fs, "/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
            },
            {
                caption: "modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding import",
                edit: fs => prependText(fs, "/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
            },
            {
                caption: "modify randomFileForImport by adding unresolved import",
                edit: fs => prependText(fs, "/src/project/randomFileForImport.ts", `import type { ImportInterface1 } from "pkg1";\n`),
            },
            {
                caption: "modify b/randomFileForImport by adding unresolved import",
                edit: fs => prependText(fs, "/src/project/b/randomFileForImport.ts", `import type { ImportInterface1 } from "pkg1";\n`),
            },
            {
                caption: "modify c/ca/caa/randomFileForImport by adding unresolved import",
                edit: fs => prependText(fs, "/src/project/c/ca/caa/randomFileForImport.ts", `import type { ImportInterface1 } from "pkg1";\n`),
            },
            {
                caption: "modify d/da/daa/daaa/x/y/z/randomFileForImport by adding unresolved import",
                edit: fs => prependText(fs, "/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts", `import type { ImportInterface1 } from "pkg1";\n`),
            },
            {
                caption: "modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding unresolved import",
                edit: fs => prependText(fs, "/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts", `import type { ImportInterface1 } from "pkg1";\n`),
            },
            {
                caption: "modify f/fa/faa/x/y/z/randomFileForImport by adding import",
                edit: fs => prependText(fs, "/src/project/f/fa/faa/x/y/z/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
            },
            {
                caption: "modify f/fa/faa/x/y/z/randomFileForImport by adding unresolved import",
                edit: fs => prependText(fs, "/src/project/f/fa/faa/x/y/z/randomFileForImport.ts", `import type { ImportInterface1 } from "pkg1";\n`),
            },
            {
                caption: "add file for unresolved import",
                edit: fs => {
                    fs.mkdirpSync("/src/project/node_modules/pkg1");
                    fs.writeFileSync("/src/project/node_modules/pkg1/index.d.ts", getPkgImportContent("Import", 1));
                },
            },
        ]
    });

    verifyTsc({
        scenario: "cacheResolutions",
        subScenario: "packageJson edited",
        commandLineArgs: ["--b", "/src/projects/project/src", "--explainFiles"],
        fs: getFsWithPackageJsonEdits,
        baselineModulesAndTypeRefs: true,
        edits: [
            {
                caption: "random edit",
                edit: fs => appendText(fs, "/src/projects/project/src/randomFile.ts", `export const y = 10;`),
            },
            {
                caption: "Modify package json file to add type module",
                edit: fs => fs.writeFileSync(`/src/projects/project/package.json`, JSON.stringify({ name: "app", version: "1.0.0", type: "module" })),
            },
            {
                caption: "Modify package.json file to remove type module and randmon edit",
                edit: fs => {
                    fs.writeFileSync(`/src/projects/project/package.json`, JSON.stringify({ name: "app", version: "1.0.0" }));
                    appendText(fs, "/src/projects/project/src/randomFile.ts", `export const z = 10;`);
                },
                discrepancyExplanation: () => [
                    `Clean build and incremental build differ in emit signature and latestChangedDtsFile since incremental persists it from previous build and clean has errors`
                ]
            },
            {
                caption: "Delete package.json",
                edit: fs => fs.unlinkSync(`/src/projects/project/package.json`),
                discrepancyExplanation: () => [
                    `Clean build and incremental build differ in emit signature and latestChangedDtsFile since incremental persists it from previous build and clean has errors`
                ]
            },
            {
                caption: "Add package json file with type module",
                edit: fs => fs.writeFileSync(`/src/projects/project/package.json`, JSON.stringify({ name: "app", version: "1.0.0", type: "module" })),
            },
            {
                caption: "Delete package.json and random edit",
                edit: fs => {
                    fs.unlinkSync(`/src/projects/project/package.json`);
                    appendText(fs, "/src/projects/project/src/randomFile.ts", `export const k = 10;`);
                },
                discrepancyExplanation: () => [
                    `Clean build and incremental build differ in emit signature and latestChangedDtsFile since incremental persists it from previous build and clean has errors`
                ]
            },
        ],
    });
});