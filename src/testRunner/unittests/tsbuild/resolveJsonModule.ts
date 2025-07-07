import { CompilerOptions } from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import {
    noChangeOnlyRuns,
    verifyTsc,
    VerifyTscWithEditsInput,
} from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: with resolveJsonModule:: option on project resolveJsonModuleAndComposite", () => {
    function getProjFs(tsconfigFiles: object, additionalCompilerOptions?: CompilerOptions) {
        return TestServerHost.createWatchedSystem({
            "/home/src/workspaces/solution/project/src/hello.json": jsonToReadableText({
                hello: "world",
            }),
            "/home/src/workspaces/solution/project/src/index.ts": dedent`
                import hello from "./hello.json"
                export default hello.hello
            `,
            "/home/src/workspaces/solution/project/tsconfig.json": jsonToReadableText({
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
            }),
        }, { currentDirectory: "/home/src/workspaces/solution" });
    }

    function verfiyJson(
        input: Pick<VerifyTscWithEditsInput, "subScenario" | "modifySystem" | "edits"> | string,
        tsconfigFiles: object,
        additionalCompilerOptions?: CompilerOptions,
    ) {
        if (typeof input === "string") input = { subScenario: input };
        verifyTsc({
            scenario: "resolveJsonModule",
            sys: () => getProjFs(tsconfigFiles, additionalCompilerOptions),
            commandLineArgs: ["--b", "project", "--v", "--explainFiles", "--listEmittedFiles"],
            ...input,
        });
        verifyTsc({
            scenario: "resolveJsonModule",
            sys: () => getProjFs(tsconfigFiles, { composite: undefined, ...additionalCompilerOptions }),
            commandLineArgs: ["--b", "project", "--v", "--explainFiles", "--listEmittedFiles"],
            ...input,
            subScenario: `${input.subScenario} non-composite`,
        });
    }

    verfiyJson("include only", {
        include: [
            "src/**/*",
        ],
    });

    verfiyJson("include only without outDir", {
        include: [
            "src/**/*",
        ],
    }, { outDir: undefined });

    verfiyJson({
        subScenario: "include only with json not in rootDir",
        modifySystem: sys => {
            sys.renameFile("/home/src/workspaces/solution/project/src/hello.json", "/home/src/workspaces/solution/project/hello.json");
            sys.replaceFileText("/home/src/workspaces/solution/project/src/index.ts", "./hello.json", "../hello.json");
        },
    }, {
        include: [
            "src/**/*",
        ],
    }, { rootDir: "src" });

    verfiyJson({
        subScenario: "include only with json without rootDir but outside configDirectory",
        modifySystem: sys => {
            sys.renameFile("/home/src/workspaces/solution/project/src/hello.json", "/home/src/workspaces/solution/hello.json");
            sys.replaceFileText("/home/src/workspaces/solution/project/src/index.ts", "./hello.json", "../../hello.json");
        },
    }, {
        include: [
            "src/**/*",
        ],
    });

    verfiyJson("include of json along with other include", {
        include: [
            "src/**/*",
            "src/**/*.json",
        ],
    });

    verfiyJson({
        subScenario: "include of json along with other include and file name matches ts file",
        modifySystem: sys => {
            sys.renameFile("/home/src/workspaces/solution/project/src/hello.json", "/home/src/workspaces/solution/project/src/index.json");
            sys.replaceFileText("/home/src/workspaces/solution/project/src/index.ts", "hello.json", "index.json");
        },
    }, {
        include: [
            "src/**/*",
            "src/**/*.json",
        ],
    });

    verfiyJson("files containing json file", {
        files: [
            "src/index.ts",
            "src/hello.json",
        ],
    });

    verfiyJson("include and files", {
        files: [
            "src/hello.json",
        ],
        include: [
            "src/**/*",
        ],
    });

    verfiyJson({
        subScenario: "sourcemap",
        edits: noChangeOnlyRuns,
    }, {
        files: [
            "src/index.ts",
            "src/hello.json",
        ],
    }, { sourceMap: true });

    verfiyJson({
        subScenario: "without outDir",
        edits: noChangeOnlyRuns,
    }, {
        files: [
            "src/index.ts",
            "src/hello.json",
        ],
    }, { outDir: undefined });
});

describe("unittests:: tsbuild:: with resolveJsonModule:: option on project importJsonFromProjectReference", () => {
    verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "importing json module from project reference",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/solution/project/strings/foo.json": jsonToReadableText({
                    foo: "bar baz",
                }),
                "/home/src/workspaces/solution/project/strings/tsconfig.json": jsonToReadableText({
                    extends: "../tsconfig.json",
                    include: ["foo.json"],
                    references: [],
                }),
                "/home/src/workspaces/solution/project/main/index.ts": dedent`
                    import { foo } from '../strings/foo.json';
                    console.log(foo);
                `,
                "/home/src/workspaces/solution/project/main/tsconfig.json": jsonToReadableText({
                    extends: "../tsconfig.json",
                    include: [
                        "./**/*.ts",
                    ],
                    references: [{
                        path: "../strings/tsconfig.json",
                    }],
                }),
                "/home/src/workspaces/solution/project/tsconfig.json": jsonToReadableText({
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
                }),
            }, { currentDirectory: "/home/src/workspaces/solution" }),
        commandLineArgs: ["--b", "project", "--verbose", "--explainFiles"],
        edits: noChangeOnlyRuns,
    });
});
