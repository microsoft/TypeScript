import { noop } from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import {
    noChangeOnlyRuns,
    verifyTsc,
} from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: projectReferenceWithRootDirInParent:: with rootDir of project reference in parentDirectory", () => {
    function getProjectReferenceWithRootDirInParentSys() {
        return TestServerHost.createWatchedSystem({
            "/home/src/workspaces/solution/src/main/a.ts": dedent`
                import { b } from './b';
                const a = b;
            `,
            "/home/src/workspaces/solution/src/main/b.ts": dedent`
                export const b = 0;
            `,
            "/home/src/workspaces/solution/src/main/tsconfig.json": jsonToReadableText({
                extends: "../../tsconfig.base.json",
                references: [
                    { path: "../other" },
                ],
            }),
            "/home/src/workspaces/solution/src/other/other.ts": dedent`
                export const Other = 0;
            `,
            "/home/src/workspaces/solution/src/other/tsconfig.json": jsonToReadableText({
                extends: "../../tsconfig.base.json",
            }),
            "/home/src/workspaces/solution/tsconfig.base.json": jsonToReadableText({
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
        }, { currentDirectory: "/home/src/workspaces/solution" });
    }

    verifyTsc({
        scenario: "projectReferenceWithRootDirInParent",
        subScenario: "builds correctly",
        sys: getProjectReferenceWithRootDirInParentSys,
        commandLineArgs: ["--b", "src/main", "/home/src/workspaces/solution/src/other"],
    });

    verifyTsc({
        scenario: "projectReferenceWithRootDirInParent",
        subScenario: "reports error for same tsbuildinfo file because no rootDir in the base",
        sys: getProjectReferenceWithRootDirInParentSys,
        commandLineArgs: ["--b", "src/main", "--verbose"],
        modifySystem: sys => sys.replaceFileText("/home/src/workspaces/solution/tsconfig.base.json", `"rootDir": "./src/",`, ""),
    });

    verifyTsc({
        scenario: "projectReferenceWithRootDirInParent",
        subScenario: "reports error for same tsbuildinfo file",
        sys: getProjectReferenceWithRootDirInParentSys,
        commandLineArgs: ["--b", "src/main", "--verbose"],
        modifySystem: sys => {
            sys.writeFile(
                "/home/src/workspaces/solution/src/main/tsconfig.json",
                jsonToReadableText({
                    compilerOptions: { composite: true, outDir: "../../dist/" },
                    references: [{ path: "../other" }],
                }),
            );
            sys.writeFile(
                "/home/src/workspaces/solution/src/other/tsconfig.json",
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
        commandLineArgs: ["--b", "src/main", "--verbose"],
        modifySystem: sys => {
            sys.writeFile(
                "/home/src/workspaces/solution/src/main/tsconfig.json",
                jsonToReadableText({
                    compilerOptions: { outDir: "../../dist/" },
                    references: [{ path: "../other" }],
                }),
            );
            sys.writeFile(
                "/home/src/workspaces/solution/src/other/tsconfig.json",
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
        commandLineArgs: ["--b", "src/other", "--verbose"],
        modifySystem: sys => {
            sys.writeFile(
                "/home/src/workspaces/solution/src/main/tsconfig.json",
                jsonToReadableText({
                    compilerOptions: { outDir: "../../dist/" },
                    references: [{ path: "../other" }],
                }),
            );
            sys.writeFile(
                "/home/src/workspaces/solution/src/other/tsconfig.json",
                jsonToReadableText({
                    compilerOptions: { composite: true, outDir: "../../dist/" },
                }),
            );
        },
        edits: [
            {
                caption: "Running tsc on main",
                edit: noop,
                commandLineArgs: ["-p", "src/main"],
            },
        ],
    });

    verifyTsc({
        scenario: "projectReferenceWithRootDirInParent",
        subScenario: "reports no error when tsbuildinfo differ",
        sys: getProjectReferenceWithRootDirInParentSys,
        commandLineArgs: ["--b", "src/main/tsconfig.main.json", "--verbose"],
        modifySystem: sys => {
            sys.renameFile("/home/src/workspaces/solution/src/main/tsconfig.json", "/home/src/workspaces/solution/src/main/tsconfig.main.json");
            sys.renameFile("/home/src/workspaces/solution/src/other/tsconfig.json", "/home/src/workspaces/solution/src/other/tsconfig.other.json");
            sys.writeFile(
                "/home/src/workspaces/solution/src/main/tsconfig.main.json",
                jsonToReadableText({
                    compilerOptions: { composite: true, outDir: "../../dist/" },
                    references: [{ path: "../other/tsconfig.other.json" }],
                }),
            );
            sys.writeFile(
                "/home/src/workspaces/solution/src/other/tsconfig.other.json",
                jsonToReadableText({
                    compilerOptions: { composite: true, outDir: "../../dist/" },
                }),
            );
        },
        edits: noChangeOnlyRuns,
    });
});
