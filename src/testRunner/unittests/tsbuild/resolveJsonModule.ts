import {
    CompilerOptions,
} from "../../_namespaces/ts";
import {
    dedent,
} from "../../_namespaces/Utils";
import {
    noChangeOnlyRuns,
    verifyTsc,
    VerifyTscWithEditsInput,
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

    function verfiyJson(
        input: Pick<VerifyTscWithEditsInput, "subScenario" | "modifyFs" | "edits"> | string,
        tsconfigFiles: object,
        additionalCompilerOptions?: CompilerOptions,
    ) {
        if (typeof input === "string") input = { subScenario: input };
        verifyTsc({
            scenario: "resolveJsonModule",
            fs: () => getProjFs(tsconfigFiles, additionalCompilerOptions),
            commandLineArgs: ["--b", "/src/tsconfig.json", "--v", "--explainFiles", "--listEmittedFiles"],
            ...input,
        });
        verifyTsc({
            scenario: "resolveJsonModule",
            fs: () => getProjFs(tsconfigFiles, { composite: undefined, ...additionalCompilerOptions }),
            commandLineArgs: ["--b", "/src/tsconfig.json", "--v", "--explainFiles", "--listEmittedFiles"],
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
        modifyFs: fs => {
            fs.renameSync("/src/src/hello.json", "/src/hello.json");
            replaceText(fs, "/src/src/index.ts", "./hello.json", "../hello.json");
        },
    }, {
        include: [
            "src/**/*",
        ],
    }, { rootDir: "src" });

    verfiyJson({
        subScenario: "include only with json without rootDir but outside configDirectory",
        modifyFs: fs => {
            fs.renameSync("/src/src/hello.json", "/hello.json");
            replaceText(fs, "/src/src/index.ts", "./hello.json", "../../hello.json");
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
        modifyFs: fs => {
            fs.renameSync("/src/src/hello.json", "/src/src/index.json");
            replaceText(fs, "/src/src/index.ts", "hello.json", "index.json");
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
