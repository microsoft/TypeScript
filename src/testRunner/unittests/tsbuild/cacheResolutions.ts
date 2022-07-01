import {
    noChangeRun,
    prependText,
    verifyTsc,
} from "../tsc/helpers";
import {
    getFsWithNode16,
    getFsWithOut,
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
});