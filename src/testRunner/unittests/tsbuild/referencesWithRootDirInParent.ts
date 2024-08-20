import { noop } from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import {
    noChangeOnlyRuns,
    verifyTsc,
} from "../helpers/tsc.js";
import { loadProjectFromFiles } from "../helpers/vfs.js";

describe("unittests:: tsbuild:: with rootDir of project reference in parentDirectory", () => {
    function getProjectReferenceWithRootDirInParentSys() {
        return loadProjectFromFiles({
            "/src/src/main/a.ts": dedent`
                import { b } from './b';
                const a = b;
            `,
            "/src/src/main/b.ts": dedent`
                export const b = 0;
            `,
            "/src/src/main/tsconfig.json": jsonToReadableText({
                extends: "../../tsconfig.base.json",
                references: [
                    { path: "../other" },
                ],
            }),
            "/src/src/other/other.ts": dedent`
                export const Other = 0;
            `,
            "/src/src/other/tsconfig.json": jsonToReadableText({
                extends: "../../tsconfig.base.json",
            }),
            "/src/tsconfig.base.json": jsonToReadableText({
                compilerOptions: {
                    composite: true,
                    declaration: true,
                    rootDir: "./src/",
                    outDir: "./dist/",
                    skipDefaultLibCheck: true,
                },
                exclude: [
                    "node_modules",
                ],
            }),
        });
    }

    verifyTsc({
        scenario: "projectReferenceWithRootDirInParent",
        subScenario: "builds correctly",
        sys: getProjectReferenceWithRootDirInParentSys,
        commandLineArgs: ["--b", "/src/src/main", "/src/src/other"],
    });

    verifyTsc({
        scenario: "projectReferenceWithRootDirInParent",
        subScenario: "reports error for same tsbuildinfo file because no rootDir in the base",
        sys: getProjectReferenceWithRootDirInParentSys,
        commandLineArgs: ["--b", "/src/src/main", "--verbose"],
        modifySystem: sys => sys.replaceFileText("/src/tsconfig.base.json", `"rootDir": "./src/",`, ""),
    });

    verifyTsc({
        scenario: "projectReferenceWithRootDirInParent",
        subScenario: "reports error for same tsbuildinfo file",
        sys: getProjectReferenceWithRootDirInParentSys,
        commandLineArgs: ["--b", "/src/src/main", "--verbose"],
        modifySystem: sys => {
            sys.writeFile(
                "/src/src/main/tsconfig.json",
                jsonToReadableText({
                    compilerOptions: { composite: true, outDir: "../../dist/" },
                    references: [{ path: "../other" }],
                }),
            );
            sys.writeFile(
                "/src/src/other/tsconfig.json",
                jsonToReadableText({
                    compilerOptions: { composite: true, outDir: "../../dist/" },
                }),
            );
        },
        edits: noChangeOnlyRuns,
    });

    verifyTsc({
        scenario: "projectReferenceWithRootDirInParent",
        subScenario: "reports error for same tsbuildinfo file without incremental",
        sys: getProjectReferenceWithRootDirInParentSys,
        commandLineArgs: ["--b", "/src/src/main", "--verbose"],
        modifySystem: sys => {
            sys.writeFile(
                "/src/src/main/tsconfig.json",
                jsonToReadableText({
                    compilerOptions: { outDir: "../../dist/" },
                    references: [{ path: "../other" }],
                }),
            );
            sys.writeFile(
                "/src/src/other/tsconfig.json",
                jsonToReadableText({
                    compilerOptions: { composite: true, outDir: "../../dist/" },
                }),
            );
        },
    });

    verifyTsc({
        scenario: "projectReferenceWithRootDirInParent",
        subScenario: "reports error for same tsbuildinfo file without incremental with tsc",
        sys: getProjectReferenceWithRootDirInParentSys,
        commandLineArgs: ["--b", "/src/src/other", "--verbose"],
        modifySystem: sys => {
            sys.writeFile(
                "/src/src/main/tsconfig.json",
                jsonToReadableText({
                    compilerOptions: { outDir: "../../dist/" },
                    references: [{ path: "../other" }],
                }),
            );
            sys.writeFile(
                "/src/src/other/tsconfig.json",
                jsonToReadableText({
                    compilerOptions: { composite: true, outDir: "../../dist/" },
                }),
            );
        },
        edits: [
            {
                caption: "Running tsc on main",
                edit: noop,
                commandLineArgs: ["-p", "/src/src/main"],
            },
        ],
    });

    verifyTsc({
        scenario: "projectReferenceWithRootDirInParent",
        subScenario: "reports no error when tsbuildinfo differ",
        sys: getProjectReferenceWithRootDirInParentSys,
        commandLineArgs: ["--b", "/src/src/main/tsconfig.main.json", "--verbose"],
        modifySystem: sys => {
            sys.renameFile("/src/src/main/tsconfig.json", "/src/src/main/tsconfig.main.json");
            sys.renameFile("/src/src/other/tsconfig.json", "/src/src/other/tsconfig.other.json");
            sys.writeFile(
                "/src/src/main/tsconfig.main.json",
                jsonToReadableText({
                    compilerOptions: { composite: true, outDir: "../../dist/" },
                    references: [{ path: "../other/tsconfig.other.json" }],
                }),
            );
            sys.writeFile(
                "/src/src/other/tsconfig.other.json",
                jsonToReadableText({
                    compilerOptions: { composite: true, outDir: "../../dist/" },
                }),
            );
        },
        edits: noChangeOnlyRuns,
    });
});
