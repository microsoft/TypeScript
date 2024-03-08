import {
    dedent,
} from "../../_namespaces/Utils";
import * as vfs from "../../_namespaces/vfs";
import {
    jsonToReadableText,
} from "../helpers";
import {
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromFiles,
    replaceText,
} from "../helpers/vfs";

describe("unittests:: tsbuild:: with rootDir of project reference in parentDirectory", () => {
    let projFs: vfs.FileSystem;
    before(() => {
        projFs = loadProjectFromFiles({
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
    });

    after(() => {
        projFs = undefined!; // Release the contents
    });

    verifyTsc({
        scenario: "projectReferenceWithRootDirInParent",
        subScenario: "builds correctly",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/src/main", "/src/src/other"],
    });

    verifyTsc({
        scenario: "projectReferenceWithRootDirInParent",
        subScenario: "reports error for same tsbuildinfo file because no rootDir in the base",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/src/main", "--verbose"],
        modifyFs: fs => replaceText(fs, "/src/tsconfig.base.json", `"rootDir": "./src/",`, ""),
    });

    verifyTsc({
        scenario: "projectReferenceWithRootDirInParent",
        subScenario: "reports error for same tsbuildinfo file",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/src/main", "--verbose"],
        modifyFs: fs => {
            fs.writeFileSync(
                "/src/src/main/tsconfig.json",
                jsonToReadableText({
                    compilerOptions: { composite: true, outDir: "../../dist/" },
                    references: [{ path: "../other" }],
                }),
            );
            fs.writeFileSync(
                "/src/src/other/tsconfig.json",
                jsonToReadableText({
                    compilerOptions: { composite: true, outDir: "../../dist/" },
                }),
            );
        },
    });

    verifyTsc({
        scenario: "projectReferenceWithRootDirInParent",
        subScenario: "reports no error when tsbuildinfo differ",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/src/main/tsconfig.main.json", "--verbose"],
        modifyFs: fs => {
            fs.renameSync("/src/src/main/tsconfig.json", "/src/src/main/tsconfig.main.json");
            fs.renameSync("/src/src/other/tsconfig.json", "/src/src/other/tsconfig.other.json");
            fs.writeFileSync(
                "/src/src/main/tsconfig.main.json",
                jsonToReadableText({
                    compilerOptions: { composite: true, outDir: "../../dist/" },
                    references: [{ path: "../other/tsconfig.other.json" }],
                }),
            );
            fs.writeFileSync(
                "/src/src/other/tsconfig.other.json",
                jsonToReadableText({
                    compilerOptions: { composite: true, outDir: "../../dist/" },
                }),
            );
        },
    });
});
