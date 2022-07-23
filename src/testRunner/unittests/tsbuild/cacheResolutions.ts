import * as ts from "../../_namespaces/ts";
import {
    noChangeRun,
    prependText,
    verifyTsc,
} from "../tsc/helpers";
import {
    getFsWithMultipleProjects,
    getFsWithNode16,
    getFsWithOut,
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
                discrepancyExplanation: () => [
                    "Failed lookups shouldnt matter in cache resolution and should be ignored which is TODO (shkamat)"
                ]
            },
        ]
    });
});