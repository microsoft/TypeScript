import {
    CompilerOptions,
} from "../../_namespaces/ts";
import {
    dedent,
} from "../../_namespaces/Utils";
import {
    noChangeOnlyRuns,
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromFiles,
    replaceText,
} from "../helpers/vfs";

describe("unittests:: tsbuild:: with resolveJsonModule option on project resolveJsonModuleAndComposite", () => {
    function getProjFs(tsconfigFiles: object, additionalCompilerOptions?: CompilerOptions) {
        return loadProjectFromFiles({
            "/src/src/hello.json": JSON.stringify(
                {
                    hello: "world",
                },
                undefined,
                " ",
            ),
            "/src/src/index.ts": dedent`
                import hello from "./hello.json"
                export default hello.hello
            `,
            "/src/tsconfig.json": JSON.stringify(
                {
                    compilerOptions: {
                        composite: true,
                        moduleResolution: "node",
                        module: "commonjs",
                        resolveJsonModule: true,
                        esModuleInterop: true,
                        allowSyntheticDefaultImports: true,
                        outDir: "dist",
                        skipDefaultLibCheck: true,
                        ...additionalCompilerOptions,
                    },
                    ...tsconfigFiles,
                },
                undefined,
                " ",
            ),
        });
    }

    verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "include only",
        fs: () =>
            getProjFs({
                include: [
                    "src/**/*",
                ],
            }),
        commandLineArgs: ["--b", "/src/tsconfig.json", "--v", "--explainFiles"],
    });

    verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "include only without outDir",
        fs: () =>
            getProjFs({
                include: [
                    "src/**/*",
                ],
            }, { outDir: undefined }),
        commandLineArgs: ["--b", "/src/tsconfig.json", "--v", "--explainFiles"],
    });

    verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "include of json along with other include",
        fs: () =>
            getProjFs({
                include: [
                    "src/**/*",
                    "src/**/*.json",
                ],
            }),
        commandLineArgs: ["--b", "/src/tsconfig.json", "--v", "--explainFiles"],
    });

    verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "include of json along with other include and file name matches ts file",
        fs: () =>
            getProjFs({
                include: [
                    "src/**/*",
                    "src/**/*.json",
                ],
            }),
        commandLineArgs: ["--b", "/src/tsconfig.json", "--v", "--explainFiles"],
        modifyFs: fs => {
            fs.renameSync("/src/src/hello.json", "/src/src/index.json");
            replaceText(fs, "/src/src/index.ts", "hello.json", "index.json");
        },
    });

    verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "files containing json file",
        fs: () =>
            getProjFs({
                files: [
                    "src/index.ts",
                    "src/hello.json",
                ],
            }),
        commandLineArgs: ["--b", "/src/tsconfig.json", "--v", "--explainFiles"],
    });

    verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "include and files",
        fs: () =>
            getProjFs({
                files: [
                    "src/hello.json",
                ],
                include: [
                    "src/**/*",
                ],
            }),
        commandLineArgs: ["--b", "/src/tsconfig.json", "--v", "--explainFiles"],
    });

    verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "sourcemap",
        fs: () =>
            getProjFs({
                files: [
                    "src/index.ts",
                    "src/hello.json",
                ],
            }, { sourceMap: true }),
        commandLineArgs: ["--b", "src/tsconfig.json", "--verbose", "--explainFiles"],
        edits: noChangeOnlyRuns,
    });

    verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "without outDir",
        fs: () =>
            getProjFs({
                files: [
                    "src/index.ts",
                    "src/hello.json",
                ],
            }, { outDir: undefined }),
        commandLineArgs: ["--b", "src/tsconfig.json", "--verbose"],
        edits: noChangeOnlyRuns,
    });
});

describe("unittests:: tsbuild:: with resolveJsonModule option on project importJsonFromProjectReference", () => {
    verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "importing json module from project reference",
        fs: () =>
            loadProjectFromFiles({
                "/src/strings/foo.json": JSON.stringify(
                    {
                        foo: "bar baz",
                    },
                    undefined,
                    " ",
                ),
                "/src/strings/tsconfig.json": JSON.stringify(
                    {
                        extends: "../tsconfig.json",
                        include: ["foo.json"],
                        references: [],
                    },
                    undefined,
                    " ",
                ),
                "/src/main/index.ts": dedent`
                import { foo } from '../strings/foo.json';
                console.log(foo);
            `,
                "/src/main/tsconfig.json": JSON.stringify(
                    {
                        extends: "../tsconfig.json",
                        include: [
                            "./**/*.ts",
                        ],
                        references: [{
                            path: "../strings/tsconfig.json",
                        }],
                    },
                    undefined,
                    " ",
                ),
                "/src/tsconfig.json": JSON.stringify(
                    {
                        compilerOptions: {
                            target: "es5",
                            module: "commonjs",
                            rootDir: "./",
                            composite: true,
                            resolveJsonModule: true,
                            strict: true,
                            esModuleInterop: true,
                        },
                        references: [
                            { path: "./strings/tsconfig.json" },
                            { path: "./main/tsconfig.json" },
                        ],
                        files: [],
                    },
                    undefined,
                    " ",
                ),
            }),
        commandLineArgs: ["--b", "src/tsconfig.json", "--verbose", "--explainFiles"],
        edits: noChangeOnlyRuns,
    });
});
