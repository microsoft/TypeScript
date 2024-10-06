import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { getSysForMultipleErrorsForceConsistentCasingInFileNames } from "../helpers/forceConsistentCasingInFileNames.js";
import {
    TscWatchCompileChange,
    verifyTscWatch,
} from "../helpers/tscWatch.js";
import {
    File,
    SymLink,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tscWatch:: forceConsistentCasingInFileNames::", () => {
    const loggerFile: File = {
        path: `/user/username/projects/myproject/logger.ts`,
        content: `export class logger { }`,
    };
    const anotherFile: File = {
        path: `/user/username/projects/myproject/another.ts`,
        content: `import { logger } from "./logger"; new logger();`,
    };
    const tsconfig: File = {
        path: `/user/username/projects/myproject/tsconfig.json`,
        content: jsonToReadableText({
            compilerOptions: { forceConsistentCasingInFileNames: true },
        }),
    };

    function verifyConsistentFileNames({ subScenario, changes }: { subScenario: string; changes: TscWatchCompileChange[]; }) {
        verifyTscWatch({
            scenario: "forceConsistentCasingInFileNames",
            subScenario,
            commandLineArgs: ["--w", "--p", tsconfig.path],
            sys: () =>
                TestServerHost.createWatchedSystem(
                    [loggerFile, anotherFile, tsconfig],
                    { currentDirectory: "/user/username/projects/myproject" },
                ),
            edits: changes,
        });
    }

    verifyConsistentFileNames({
        subScenario: "when changing module name with different casing",
        changes: [
            {
                caption: "Change module name from logger to Logger",
                edit: sys => sys.writeFile(anotherFile.path, anotherFile.content.replace("./logger", "./Logger")),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyConsistentFileNames({
        subScenario: "when renaming file with different casing",
        changes: [
            {
                caption: "Change name of file from logger to Logger",
                edit: sys => sys.renameFile(loggerFile.path, `/user/username/projects/myproject/Logger.ts`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario: "forceConsistentCasingInFileNames",
        subScenario: "when relative information file location changes",
        commandLineArgs: ["--w", "--p", ".", "--explainFiles"],
        sys: () => {
            const moduleA: File = {
                path: `/user/username/projects/myproject/moduleA.ts`,
                content: `import a = require("./ModuleC")`,
            };
            const moduleB: File = {
                path: `/user/username/projects/myproject/moduleB.ts`,
                content: `import a = require("./moduleC")`,
            };
            const moduleC: File = {
                path: `/user/username/projects/myproject/moduleC.ts`,
                content: `export const x = 10;`,
            };
            const tsconfig: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({ compilerOptions: { forceConsistentCasingInFileNames: true } }),
            };
            return TestServerHost.createWatchedSystem(
                [moduleA, moduleB, moduleC, tsconfig],
                { currentDirectory: "/user/username/projects/myproject" },
            );
        },
        edits: [
            {
                caption: "Prepend a line to moduleA",
                edit: sys =>
                    sys.prependFile(
                        `/user/username/projects/myproject/moduleA.ts`,
                        `// some comment
                    `,
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario: "forceConsistentCasingInFileNames",
        subScenario: "jsxImportSource option changed",
        commandLineArgs: ["--w", "--p", ".", "--explainFiles"],
        sys: () =>
            TestServerHost.createWatchedSystem([
                {
                    path: `/user/username/projects/myproject/node_modules/react/Jsx-runtime/index.d.ts`,
                    content: `export namespace JSX {
    interface Element {}
    interface IntrinsicElements {
        div: {
            propA?: boolean;
        };
    }
}
export function jsx(...args: any[]): void;
export function jsxs(...args: any[]): void;
export const Fragment: unique symbol;
`,
                },
                {
                    path: `/user/username/projects/myproject/node_modules/react/package.json`,
                    content: jsonToReadableText({ name: "react", version: "0.0.1" }),
                },
                {
                    path: `/user/username/projects/myproject/index.tsx`,
                    content: `export const App = () => <div propA={true}></div>;`,
                },
                {
                    path: `/user/username/projects/myproject/tsconfig.json`,
                    content: jsonToReadableText({
                        compilerOptions: { jsx: "react-jsx", jsxImportSource: "react", forceConsistentCasingInFileNames: true },
                        files: ["node_modules/react/Jsx-Runtime/index.d.ts", "index.tsx"],
                    }),
                },
            ], { currentDirectory: "/user/username/projects/myproject" }),
    });

    function verifyWindowsStyleRoot(subScenario: string, windowsStyleRoot: string, projectRootRelative: string) {
        verifyTscWatch({
            scenario: "forceConsistentCasingInFileNames",
            subScenario,
            commandLineArgs: ["--w", "--p", `${windowsStyleRoot}workspaces/solution/${projectRootRelative}`, "--explainFiles"],
            sys: () => {
                const moduleA: File = {
                    path: `${windowsStyleRoot}workspaces/solution/${projectRootRelative}/a.ts`,
                    content: `
export const a = 1;
export const b = 2;
`,
                };
                const moduleB: File = {
                    path: `${windowsStyleRoot}workspaces/solution/${projectRootRelative}/b.ts`,
                    content: `
import { a } from "${windowsStyleRoot.toLocaleUpperCase()}workspaces/solution/${projectRootRelative}/a"
import { b } from "${windowsStyleRoot.toLocaleLowerCase()}workspaces/solution/${projectRootRelative}/a"

a;b;
`,
                };
                const tsconfig: File = {
                    path: `${windowsStyleRoot}workspaces/solution/${projectRootRelative}/tsconfig.json`,
                    content: jsonToReadableText({ compilerOptions: { forceConsistentCasingInFileNames: true } }),
                };
                return TestServerHost.createWatchedSystem(
                    [moduleA, moduleB, tsconfig],
                    {
                        windowsStyleRoot,
                        useCaseSensitiveFileNames: false,
                        currentDirectory: `${windowsStyleRoot}workspaces/solution`,
                    },
                );
            },
            edits: [
                {
                    caption: "Prepend a line to moduleA",
                    edit: sys =>
                        sys.prependFile(
                            `${windowsStyleRoot}workspaces/solution/${projectRootRelative}/a.ts`,
                            `// some comment
                        `,
                        ),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ],
        });
    }

    verifyWindowsStyleRoot("when Windows-style drive root is lowercase", "c:/", "project");
    verifyWindowsStyleRoot("when Windows-style drive root is uppercase", "C:/", "project");

    function verifyFileSymlink(subScenario: string, diskPath: string, targetPath: string, importedPath: string) {
        verifyTscWatch({
            scenario: "forceConsistentCasingInFileNames",
            subScenario,
            commandLineArgs: ["--w", "--p", ".", "--explainFiles", "--extendedDiagnostics"],
            sys: () => {
                const moduleA: File = {
                    path: diskPath,
                    content: `
export const a = 1;
export const b = 2;
`,
                };
                const symlinkA: SymLink = {
                    path: `/user/username/projects/myproject/link.ts`,
                    symLink: targetPath,
                };
                const moduleB: File = {
                    path: `/user/username/projects/myproject/b.ts`,
                    content: `
import { a } from "${importedPath}";
import { b } from "./link";

a;b;
`,
                };
                const tsconfig: File = {
                    path: `/user/username/projects/myproject/tsconfig.json`,
                    content: jsonToReadableText({ compilerOptions: { forceConsistentCasingInFileNames: true } }),
                };
                return TestServerHost.createWatchedSystem(
                    [moduleA, symlinkA, moduleB, tsconfig],
                    { currentDirectory: "/user/username/projects/myproject" },
                );
            },
            edits: [
                {
                    caption: "Prepend a line to moduleA",
                    edit: sys =>
                        sys.prependFile(
                            diskPath,
                            `// some comment
                        `,
                        ),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ],
        });
    }

    verifyFileSymlink("when both file symlink target and import match disk", `/user/username/projects/myproject/XY.ts`, `/user/username/projects/myproject/XY.ts`, `./XY`);
    verifyFileSymlink("when file symlink target matches disk but import does not", `/user/username/projects/myproject/XY.ts`, `/user/username/projects/myproject/Xy.ts`, `./XY`);
    verifyFileSymlink("when import matches disk but file symlink target does not", `/user/username/projects/myproject/XY.ts`, `/user/username/projects/myproject/XY.ts`, `./Xy`);
    verifyFileSymlink("when import and file symlink target agree but do not match disk", `/user/username/projects/myproject/XY.ts`, `/user/username/projects/myproject/Xy.ts`, `./Xy`);
    verifyFileSymlink("when import, file symlink target, and disk are all different", `/user/username/projects/myproject/XY.ts`, `/user/username/projects/myproject/Xy.ts`, `./xY`);

    function verifyDirSymlink(subScenario: string, diskPath: string, targetPath: string, importedPath: string) {
        verifyTscWatch({
            scenario: "forceConsistentCasingInFileNames",
            subScenario,
            commandLineArgs: ["--w", "--p", ".", "--explainFiles", "--extendedDiagnostics"],
            sys: () => {
                const moduleA: File = {
                    path: `${diskPath}/a.ts`,
                    content: `
export const a = 1;
export const b = 2;
`,
                };
                const symlinkA: SymLink = {
                    path: `/user/username/projects/myproject/link`,
                    symLink: targetPath,
                };
                const moduleB: File = {
                    path: `/user/username/projects/myproject/b.ts`,
                    content: `
import { a } from "${importedPath}/a";
import { b } from "./link/a";

a;b;
`,
                };
                const tsconfig: File = {
                    path: `/user/username/projects/myproject/tsconfig.json`,
                    // Use outFile because otherwise the real and linked files will have the same output path
                    content: jsonToReadableText({ compilerOptions: { forceConsistentCasingInFileNames: true, outFile: "out.js", module: "system" } }),
                };
                return TestServerHost.createWatchedSystem(
                    [moduleA, symlinkA, moduleB, tsconfig],
                    { currentDirectory: "/user/username/projects/myproject" },
                );
            },
            edits: [
                {
                    caption: "Prepend a line to moduleA",
                    edit: sys =>
                        sys.prependFile(
                            `${diskPath}/a.ts`,
                            `// some comment
                        `,
                        ),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ],
        });
    }

    verifyDirSymlink("when both directory symlink target and import match disk", `/user/username/projects/myproject/XY`, `/user/username/projects/myproject/XY`, `./XY`);
    verifyDirSymlink("when directory symlink target matches disk but import does not", `/user/username/projects/myproject/XY`, `/user/username/projects/myproject/Xy`, `./XY`);
    verifyDirSymlink("when import matches disk but directory symlink target does not", `/user/username/projects/myproject/XY`, `/user/username/projects/myproject/XY`, `./Xy`);
    verifyDirSymlink("when import and directory symlink target agree but do not match disk", `/user/username/projects/myproject/XY`, `/user/username/projects/myproject/Xy`, `./Xy`);
    verifyDirSymlink("when import, directory symlink target, and disk are all different", `/user/username/projects/myproject/XY`, `/user/username/projects/myproject/Xy`, `./xY`);

    verifyTscWatch({
        scenario: "forceConsistentCasingInFileNames",
        subScenario: "with nodeNext resolution",
        commandLineArgs: ["--w", "--explainFiles"],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/Users/name/projects/web/src/bin.ts": `import { foo } from "yargs";`,
                "/Users/name/projects/web/node_modules/@types/yargs/index.d.ts": "export function foo(): void;",
                "/Users/name/projects/web/node_modules/@types/yargs/index.d.mts": "export function foo(): void;",
                "/Users/name/projects/web/node_modules/@types/yargs/package.json": jsonToReadableText({
                    name: "yargs",
                    version: "17.0.12",
                    exports: {
                        ".": {
                            types: {
                                import: "./index.d.mts",
                                default: "./index.d.ts",
                            },
                        },
                    },
                }),
                "/Users/name/projects/web/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        moduleResolution: "nodenext",
                        forceConsistentCasingInFileNames: true,
                        traceResolution: true,
                    },
                }),
            }, { currentDirectory: "/Users/name/projects/web" }),
    });

    verifyTscWatch({
        scenario: "forceConsistentCasingInFileNames",
        subScenario: "self name package reference",
        commandLineArgs: ["-w", "--explainFiles"],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/Users/name/projects/web/package.json": jsonToReadableText({
                    name: "@this/package",
                    type: "module",
                    exports: {
                        ".": "./dist/index.js",
                    },
                }),
                "/Users/name/projects/web/index.ts": dedent`
                    import * as me from "@this/package";
                    me.thing();
                    export function thing(): void {}
                `,
                "/Users/name/projects/web/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        module: "nodenext",
                        outDir: "./dist",
                        declarationDir: "./types",
                        composite: true,
                        forceConsistentCasingInFileNames: true,
                        traceResolution: true,
                    },
                }),
            }, { currentDirectory: "/Users/name/projects/web" }),
    });

    verifyTscWatch({
        scenario: "forceConsistentCasingInFileNames",
        subScenario: "package json is looked up for file",
        commandLineArgs: ["-w", "--explainFiles"],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/Users/name/projects/lib-boilerplate/package.json": jsonToReadableText({
                    name: "lib-boilerplate",
                    version: "0.0.2",
                    type: "module",
                    exports: "./src/index.ts",
                }),
                "/Users/name/projects/lib-boilerplate/src/index.ts": dedent`
                    export function thing(): void {}
                `,
                "/Users/name/projects/lib-boilerplate/test/basic.spec.ts": dedent`
                    import { thing } from 'lib-boilerplate'
                `,
                "/Users/name/projects/lib-boilerplate/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        module: "node16",
                        target: "es2021",
                        forceConsistentCasingInFileNames: true,
                        traceResolution: true,
                    },
                }),
            }, { currentDirectory: "/Users/name/projects/lib-boilerplate" }),
    });

    verifyTscWatch({
        scenario: "forceConsistentCasingInFileNames",
        subScenario: "when file is included from multiple places with different casing",
        commandLineArgs: ["-w", "--explainFiles"],
        sys: getSysForMultipleErrorsForceConsistentCasingInFileNames,
        edits: [
            {
                caption: "change to reuse imports",
                edit: sys => sys.appendFile("/home/src/projects/project/src/struct.d.ts", "export const y = 10;"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "change to update imports",
                edit: sys =>
                    sys.writeFile(
                        "/home/src/projects/project/src/struct.d.ts",
                        dedent`
                            import * as xs1 from "fp-ts/lib/Struct";
                            import * as xs2 from "fp-ts/lib/struct";
                            import * as xs3 from "./Struct";
                        `,
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });
});
