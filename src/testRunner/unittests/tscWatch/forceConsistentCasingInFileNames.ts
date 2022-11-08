import * as ts from "../../_namespaces/ts";
import * as Utils from "../../_namespaces/Utils";

describe("unittests:: tsc-watch:: forceConsistentCasingInFileNames", () => {
    const loggerFile: ts.tscWatch.File = {
        path: `${ts.tscWatch.projectRoot}/logger.ts`,
        content: `export class logger { }`
    };
    const anotherFile: ts.tscWatch.File = {
        path: `${ts.tscWatch.projectRoot}/another.ts`,
        content: `import { logger } from "./logger"; new logger();`
    };
    const tsconfig: ts.tscWatch.File = {
        path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
        content: JSON.stringify({
            compilerOptions: { forceConsistentCasingInFileNames: true }
        })
    };

    function verifyConsistentFileNames({ subScenario, changes }: { subScenario: string; changes: ts.tscWatch.TscWatchCompileChange[]; }) {
        ts.tscWatch.verifyTscWatch({
            scenario: "forceConsistentCasingInFileNames",
            subScenario,
            commandLineArgs: ["--w", "--p", tsconfig.path],
            sys: () => ts.tscWatch.createWatchedSystem([loggerFile, anotherFile, tsconfig, ts.tscWatch.libFile]),
            changes
        });
    }

    verifyConsistentFileNames({
        subScenario: "when changing module name with different casing",
        changes: [
            {
                caption: "Change module name from logger to Logger",
                change: sys => sys.writeFile(anotherFile.path, anotherFile.content.replace("./logger", "./Logger")),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            }
        ]
    });

    verifyConsistentFileNames({
        subScenario: "when renaming file with different casing",
        changes: [
            {
                caption: "Change name of file from logger to Logger",
                change: sys => sys.renameFile(loggerFile.path, `${ts.tscWatch.projectRoot}/Logger.ts`),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "forceConsistentCasingInFileNames",
        subScenario: "when relative information file location changes",
        commandLineArgs: ["--w", "--p", ".", "--explainFiles"],
        sys: () => {
            const moduleA: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/moduleA.ts`,
                content: `import a = require("./ModuleC")`
            };
            const moduleB: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/moduleB.ts`,
                content: `import a = require("./moduleC")`
            };
            const moduleC: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/moduleC.ts`,
                content: `export const x = 10;`
            };
            const tsconfig: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { forceConsistentCasingInFileNames: true } })
            };
            return ts.tscWatch.createWatchedSystem([moduleA, moduleB, moduleC, ts.tscWatch.libFile, tsconfig], { currentDirectory: ts.tscWatch.projectRoot });
        },
        changes: [
            {
                caption: "Prepend a line to moduleA",
                change: sys => sys.prependFile(`${ts.tscWatch.projectRoot}/moduleA.ts`, `// some comment
                    `),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            }
        ],
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "forceConsistentCasingInFileNames",
        subScenario: "jsxImportSource option changed",
        commandLineArgs: ["--w", "--p", ".", "--explainFiles"],
        sys: () => ts.tscWatch.createWatchedSystem([
            ts.tscWatch.libFile,
            {
                path: `${ts.tscWatch.projectRoot}/node_modules/react/Jsx-runtime/index.d.ts`,
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
                path: `${ts.tscWatch.projectRoot}/node_modules/react/package.json`,
                content: JSON.stringify({ name: "react", version: "0.0.1" })
            },
            {
                path: `${ts.tscWatch.projectRoot}/index.tsx`,
                content: `export const App = () => <div propA={true}></div>;`
            },
            {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { jsx: "react-jsx", jsxImportSource: "react", forceConsistentCasingInFileNames: true },
                    files: ["node_modules/react/Jsx-Runtime/index.d.ts", "index.tsx"]
                })
            }
        ], { currentDirectory: ts.tscWatch.projectRoot }),
        changes: ts.emptyArray,
    });

    function verifyWindowsStyleRoot(subScenario: string, windowsStyleRoot: string, projectRootRelative: string) {
        ts.tscWatch.verifyTscWatch({
            scenario: "forceConsistentCasingInFileNames",
            subScenario,
            commandLineArgs: ["--w", "--p", `${windowsStyleRoot}/${projectRootRelative}`, "--explainFiles"],
            sys: () => {
                const moduleA: ts.tscWatch.File = {
                    path: `${windowsStyleRoot}/${projectRootRelative}/a.ts`,
                    content: `
export const a = 1;
export const b = 2;
`
                };
                const moduleB: ts.tscWatch.File = {
                    path: `${windowsStyleRoot}/${projectRootRelative}/b.ts`,
                    content: `
import { a } from "${windowsStyleRoot.toLocaleUpperCase()}/${projectRootRelative}/a"
import { b } from "${windowsStyleRoot.toLocaleLowerCase()}/${projectRootRelative}/a"

a;b;
`
                };
                const tsconfig: ts.tscWatch.File = {
                    path: `${windowsStyleRoot}/${projectRootRelative}/tsconfig.json`,
                    content: JSON.stringify({ compilerOptions: { forceConsistentCasingInFileNames: true } })
                };
                return ts.tscWatch.createWatchedSystem([moduleA, moduleB, ts.tscWatch.libFile, tsconfig], { windowsStyleRoot, useCaseSensitiveFileNames: false });
            },
            changes: [
                {
                    caption: "Prepend a line to moduleA",
                    change: sys => sys.prependFile(`${windowsStyleRoot}/${projectRootRelative}/a.ts`, `// some comment
                        `),
                    timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
                }
            ],
        });
    }

    verifyWindowsStyleRoot("when Windows-style drive root is lowercase", "c:/", "project");
    verifyWindowsStyleRoot("when Windows-style drive root is uppercase", "C:/", "project");

    function verifyFileSymlink(subScenario: string, diskPath: string, targetPath: string, importedPath: string) {
        ts.tscWatch.verifyTscWatch({
            scenario: "forceConsistentCasingInFileNames",
            subScenario,
            commandLineArgs: ["--w", "--p", ".", "--explainFiles"],
            sys: () => {
                const moduleA: ts.tscWatch.File = {

                    path: diskPath,
                    content: `
export const a = 1;
export const b = 2;
`
                };
                const symlinkA: ts.tscWatch.SymLink = {
                    path: `${ts.tscWatch.projectRoot}/link.ts`,
                    symLink: targetPath,
                };
                const moduleB: ts.tscWatch.File = {
                    path: `${ts.tscWatch.projectRoot}/b.ts`,
                    content: `
import { a } from "${importedPath}";
import { b } from "./link";

a;b;
`
                };
                const tsconfig: ts.tscWatch.File = {
                    path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                    content: JSON.stringify({ compilerOptions: { forceConsistentCasingInFileNames: true } })
                };
                return ts.tscWatch.createWatchedSystem([moduleA, symlinkA, moduleB, ts.tscWatch.libFile, tsconfig], { currentDirectory: ts.tscWatch.projectRoot });
            },
            changes: [
                {
                    caption: "Prepend a line to moduleA",
                    change: sys => sys.prependFile(diskPath, `// some comment
                        `),
                    timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
                }
            ],
        });
    }

    verifyFileSymlink("when both file symlink target and import match disk", `${ts.tscWatch.projectRoot}/XY.ts`, `${ts.tscWatch.projectRoot}/XY.ts`, `./XY`);
    verifyFileSymlink("when file symlink target matches disk but import does not", `${ts.tscWatch.projectRoot}/XY.ts`, `${ts.tscWatch.projectRoot}/Xy.ts`, `./XY`);
    verifyFileSymlink("when import matches disk but file symlink target does not", `${ts.tscWatch.projectRoot}/XY.ts`, `${ts.tscWatch.projectRoot}/XY.ts`, `./Xy`);
    verifyFileSymlink("when import and file symlink target agree but do not match disk", `${ts.tscWatch.projectRoot}/XY.ts`, `${ts.tscWatch.projectRoot}/Xy.ts`, `./Xy`);
    verifyFileSymlink("when import, file symlink target, and disk are all different", `${ts.tscWatch.projectRoot}/XY.ts`, `${ts.tscWatch.projectRoot}/Xy.ts`, `./yX`);

    function verifyDirSymlink(subScenario: string, diskPath: string, targetPath: string, importedPath: string) {
        ts.tscWatch.verifyTscWatch({
            scenario: "forceConsistentCasingInFileNames",
            subScenario,
            commandLineArgs: ["--w", "--p", ".", "--explainFiles"],
            sys: () => {
                const moduleA: ts.tscWatch.File = {

                    path: `${diskPath}/a.ts`,
                    content: `
export const a = 1;
export const b = 2;
`
                };
                const symlinkA: ts.tscWatch.SymLink = {
                    path: `${ts.tscWatch.projectRoot}/link`,
                    symLink: targetPath,
                };
                const moduleB: ts.tscWatch.File = {
                    path: `${ts.tscWatch.projectRoot}/b.ts`,
                    content: `
import { a } from "${importedPath}/a";
import { b } from "./link/a";

a;b;
`
                };
                const tsconfig: ts.tscWatch.File = {
                    path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                    // Use outFile because otherwise the real and linked files will have the same output path
                    content: JSON.stringify({ compilerOptions: { forceConsistentCasingInFileNames: true, outFile: "out.js", module: "system" } })
                };
                return ts.tscWatch.createWatchedSystem([moduleA, symlinkA, moduleB, ts.tscWatch.libFile, tsconfig], { currentDirectory: ts.tscWatch.projectRoot });
            },
            changes: [
                {
                    caption: "Prepend a line to moduleA",
                    change: sys => sys.prependFile(`${diskPath}/a.ts`, `// some comment
                        `),
                    timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
                }
            ],
        });
    }

    verifyDirSymlink("when both directory symlink target and import match disk", `${ts.tscWatch.projectRoot}/XY`, `${ts.tscWatch.projectRoot}/XY`, `./XY`);
    verifyDirSymlink("when directory symlink target matches disk but import does not", `${ts.tscWatch.projectRoot}/XY`, `${ts.tscWatch.projectRoot}/Xy`, `./XY`);
    verifyDirSymlink("when import matches disk but directory symlink target does not", `${ts.tscWatch.projectRoot}/XY`, `${ts.tscWatch.projectRoot}/XY`, `./Xy`);
    verifyDirSymlink("when import and directory symlink target agree but do not match disk", `${ts.tscWatch.projectRoot}/XY`, `${ts.tscWatch.projectRoot}/Xy`, `./Xy`);
    verifyDirSymlink("when import, directory symlink target, and disk are all different", `${ts.tscWatch.projectRoot}/XY`, `${ts.tscWatch.projectRoot}/Xy`, `./yX`);

    ts.tscWatch.verifyTscWatch({
        scenario: "forceConsistentCasingInFileNames",
        subScenario: "with nodeNext resolution",
        commandLineArgs: ["--w", "--explainFiles"],
        sys: () => ts.tscWatch.createWatchedSystem({
            "/Users/name/projects/web/src/bin.ts": `import { foo } from "yargs";`,
            "/Users/name/projects/web/node_modules/@types/yargs/index.d.ts": "export function foo(): void;",
            "/Users/name/projects/web/node_modules/@types/yargs/index.d.mts": "export function foo(): void;",
            "/Users/name/projects/web/node_modules/@types/yargs/package.json": JSON.stringify({
                name: "yargs",
                version: "17.0.12",
                exports: {
                    ".": {
                        types: {
                            import: "./index.d.mts",
                            default: "./index.d.ts"
                        }
                    },
                }
            }),
            "/Users/name/projects/web/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    moduleResolution: "nodenext",
                    forceConsistentCasingInFileNames: true,
                    traceResolution: true,
                }
            }),
            [ts.tscWatch.libFile.path]: ts.tscWatch.libFile.content,
        }, { currentDirectory: "/Users/name/projects/web" }),
        changes: ts.emptyArray,
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "forceConsistentCasingInFileNames",
        subScenario: "self name package reference",
        commandLineArgs: ["-w", "--explainFiles"],
        sys: () => ts.tscWatch.createWatchedSystem({
            "/Users/name/projects/web/package.json": JSON.stringify({
                name: "@this/package",
                type: "module",
                exports: {
                    ".": "./dist/index.js"
                }
            }),
            "/Users/name/projects/web/index.ts": Utils.dedent`
                    import * as me from "@this/package";
                    me.thing();
                    export function thing(): void {}
                `,
            "/Users/name/projects/web/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    module: "nodenext",
                    outDir: "./dist",
                    declarationDir: "./types",
                    composite: true,
                    forceConsistentCasingInFileNames: true,
                    traceResolution: true,
                }
            }),
            "/a/lib/lib.esnext.full.d.ts": ts.tscWatch.libFile.content,
        }, { currentDirectory: "/Users/name/projects/web" }),
        changes: ts.emptyArray,
    });


    ts.tscWatch.verifyTscWatch({
        scenario: "forceConsistentCasingInFileNames",
        subScenario: "package json is looked up for file",
        commandLineArgs: ["-w", "--explainFiles"],
        sys: () => ts.tscWatch.createWatchedSystem({
            "/Users/name/projects/lib-boilerplate/package.json": JSON.stringify({
                name: "lib-boilerplate",
                version: "0.0.2",
                type: "module",
                exports: "./src/index.ts",
            }),
            "/Users/name/projects/lib-boilerplate/src/index.ts": Utils.dedent`
                    export function thing(): void {}
                `,
            "/Users/name/projects/lib-boilerplate/test/basic.spec.ts": Utils.dedent`
                    import { thing } from 'lib-boilerplate'
                `,
            "/Users/name/projects/lib-boilerplate/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    module: "node16",
                    target: "es2021",
                    forceConsistentCasingInFileNames: true,
                    traceResolution: true,
                }
            }),
            "/a/lib/lib.es2021.full.d.ts": ts.tscWatch.libFile.content,
        }, { currentDirectory: "/Users/name/projects/lib-boilerplate" }),
        changes: ts.emptyArray,
    });
});
