namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: forceConsistentCasingInFileNames", () => {
        const loggerFile: File = {
            path: `${projectRoot}/logger.ts`,
            content: `export class logger { }`
        };
        const anotherFile: File = {
            path: `${projectRoot}/another.ts`,
            content: `import { logger } from "./logger"; new logger();`
        };
        const tsconfig: File = {
            path: `${projectRoot}/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: { forceConsistentCasingInFileNames: true }
            })
        };

        function verifyConsistentFileNames({ subScenario, changes }: { subScenario: string; changes: TscWatchCompileChange[]; }) {
            verifyTscWatch({
                scenario: "forceConsistentCasingInFileNames",
                subScenario,
                commandLineArgs: ["--w", "--p", tsconfig.path],
                sys: () => createWatchedSystem([loggerFile, anotherFile, tsconfig, libFile]),
                changes
            });
        }

        verifyConsistentFileNames({
            subScenario: "when changing module name with different casing",
            changes: [
                {
                    caption: "Change module name from logger to Logger",
                    change: sys => sys.writeFile(anotherFile.path, anotherFile.content.replace("./logger", "./Logger")),
                    timeouts: runQueuedTimeoutCallbacks,
                }
            ]
        });

        verifyConsistentFileNames({
            subScenario: "when renaming file with different casing",
            changes: [
                {
                    caption: "Change name of file from logger to Logger",
                    change: sys => sys.renameFile(loggerFile.path, `${projectRoot}/Logger.ts`),
                    timeouts: runQueuedTimeoutCallbacks,
                }
            ]
        });

        verifyTscWatch({
            scenario: "forceConsistentCasingInFileNames",
            subScenario: "when relative information file location changes",
            commandLineArgs: ["--w", "--p", ".", "--explainFiles"],
            sys: () => {
                const moduleA: File = {
                    path: `${projectRoot}/moduleA.ts`,
                    content: `import a = require("./ModuleC")`
                };
                const moduleB: File = {
                    path: `${projectRoot}/moduleB.ts`,
                    content: `import a = require("./moduleC")`
                };
                const moduleC: File = {
                    path: `${projectRoot}/moduleC.ts`,
                    content: `export const x = 10;`
                };
                const tsconfig: File = {
                    path: `${projectRoot}/tsconfig.json`,
                    content: JSON.stringify({ compilerOptions: { forceConsistentCasingInFileNames: true } })
                };
                return createWatchedSystem([moduleA, moduleB, moduleC, libFile, tsconfig], { currentDirectory: projectRoot });
            },
            changes: [
                {
                    caption: "Prepend a line to moduleA",
                    change: sys => sys.prependFile(`${projectRoot}/moduleA.ts`, `// some comment
                    `),
                    timeouts: runQueuedTimeoutCallbacks,
                }
            ],
        });

        verifyTscWatch({
            scenario: "forceConsistentCasingInFileNames",
            subScenario: "jsxImportSource option changed",
            commandLineArgs: ["--w", "--p", ".", "--explainFiles"],
            sys: () => createWatchedSystem([
                libFile,
                {
                    path: `${projectRoot}/node_modules/react/Jsx-runtime/index.d.ts`,
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
                    path: `${projectRoot}/node_modules/react/package.json`,
                    content: JSON.stringify({ name: "react", version: "0.0.1" })
                },
                {
                    path: `${projectRoot}/index.tsx`,
                    content: `export const App = () => <div propA={true}></div>;`
                },
                {
                    path: `${projectRoot}/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: { jsx: "react-jsx", jsxImportSource: "react", forceConsistentCasingInFileNames: true },
                        files: ["node_modules/react/Jsx-Runtime/index.d.ts", "index.tsx"]
                    })
                }
            ], { currentDirectory: projectRoot }),
            changes: emptyArray,
        });

        function verifyWindowsStyleRoot(subScenario: string, windowsStyleRoot: string, projectRootRelative: string) {
            verifyTscWatch({
                scenario: "forceConsistentCasingInFileNames",
                subScenario,
                commandLineArgs: ["--w", "--p", `${windowsStyleRoot}/${projectRootRelative}`, "--explainFiles"],
                sys: () => {
                    const moduleA: File = {
                        path: `${windowsStyleRoot}/${projectRootRelative}/a.ts`,
                        content: `
export const a = 1;
export const b = 2;
`
                    };
                    const moduleB: File = {
                        path: `${windowsStyleRoot}/${projectRootRelative}/b.ts`,
                        content: `
import { a } from "${windowsStyleRoot.toLocaleUpperCase()}/${projectRootRelative}/a"
import { b } from "${windowsStyleRoot.toLocaleLowerCase()}/${projectRootRelative}/a"

a;b;
`
                    };
                    const tsconfig: File = {
                        path: `${windowsStyleRoot}/${projectRootRelative}/tsconfig.json`,
                        content: JSON.stringify({ compilerOptions: { forceConsistentCasingInFileNames: true } })
                    };
                    return createWatchedSystem([moduleA, moduleB, libFile, tsconfig], { windowsStyleRoot, useCaseSensitiveFileNames: false });
                },
                changes: [
                    {
                        caption: "Prepend a line to moduleA",
                        change: sys => sys.prependFile(`${windowsStyleRoot}/${projectRootRelative}/a.ts`, `// some comment
                        `),
                        timeouts: runQueuedTimeoutCallbacks,
                    }
                ],
            });
        }

        verifyWindowsStyleRoot("when Windows-style drive root is lowercase", "c:/", "project");
        verifyWindowsStyleRoot("when Windows-style drive root is uppercase", "C:/", "project");

        function verifyFileSymlink(subScenario: string, diskPath: string, targetPath: string, importedPath: string) {
            verifyTscWatch({
                scenario: "forceConsistentCasingInFileNames",
                subScenario,
                commandLineArgs: ["--w", "--p", ".", "--explainFiles"],
                sys: () => {
                    const moduleA: File = {

                        path: diskPath,
                        content: `
export const a = 1;
export const b = 2;
`
                    };
                    const symlinkA: SymLink = {
                        path: `${projectRoot}/link.ts`,
                        symLink: targetPath,
                    };
                    const moduleB: File = {
                        path: `${projectRoot}/b.ts`,
                        content: `
import { a } from "${importedPath}";
import { b } from "./link";

a;b;
`
                    };
                    const tsconfig: File = {
                        path: `${projectRoot}/tsconfig.json`,
                        content: JSON.stringify({ compilerOptions: { forceConsistentCasingInFileNames: true } })
                    };
                    return createWatchedSystem([moduleA, symlinkA, moduleB, libFile, tsconfig], { currentDirectory: projectRoot });
                },
                changes: [
                    {
                        caption: "Prepend a line to moduleA",
                        change: sys => sys.prependFile(diskPath, `// some comment
                        `),
                        timeouts: runQueuedTimeoutCallbacks,
                    }
                ],
            });
        }

        verifyFileSymlink("when both file symlink target and import match disk", `${projectRoot}/XY.ts`, `${projectRoot}/XY.ts`, `./XY`);
        verifyFileSymlink("when file symlink target matches disk but import does not", `${projectRoot}/XY.ts`, `${projectRoot}/Xy.ts`, `./XY`);
        verifyFileSymlink("when import matches disk but file symlink target does not", `${projectRoot}/XY.ts`, `${projectRoot}/XY.ts`, `./Xy`);
        verifyFileSymlink("when import and file symlink target agree but do not match disk", `${projectRoot}/XY.ts`, `${projectRoot}/Xy.ts`, `./Xy`);
        verifyFileSymlink("when import, file symlink target, and disk are all different", `${projectRoot}/XY.ts`, `${projectRoot}/Xy.ts`, `./yX`);

        function verifyDirSymlink(subScenario: string, diskPath: string, targetPath: string, importedPath: string) {
            verifyTscWatch({
                scenario: "forceConsistentCasingInFileNames",
                subScenario,
                commandLineArgs: ["--w", "--p", ".", "--explainFiles"],
                sys: () => {
                    const moduleA: File = {

                        path: `${diskPath}/a.ts`,
                        content: `
export const a = 1;
export const b = 2;
`
                    };
                    const symlinkA: SymLink = {
                        path: `${projectRoot}/link`,
                        symLink: targetPath,
                    };
                    const moduleB: File = {
                        path: `${projectRoot}/b.ts`,
                        content: `
import { a } from "${importedPath}/a";
import { b } from "./link/a";

a;b;
`
                    };
                    const tsconfig: File = {
                        path: `${projectRoot}/tsconfig.json`,
                        // Use outFile because otherwise the real and linked files will have the same output path
                        content: JSON.stringify({ compilerOptions: { forceConsistentCasingInFileNames: true, outFile: "out.js", module: "system" } })
                    };
                    return createWatchedSystem([moduleA, symlinkA, moduleB, libFile, tsconfig], { currentDirectory: projectRoot });
                },
                changes: [
                    {
                        caption: "Prepend a line to moduleA",
                        change: sys => sys.prependFile(`${diskPath}/a.ts`, `// some comment
                        `),
                        timeouts: runQueuedTimeoutCallbacks,
                    }
                ],
            });
        }

        verifyDirSymlink("when both directory symlink target and import match disk", `${projectRoot}/XY`, `${projectRoot}/XY`, `./XY`);
        verifyDirSymlink("when directory symlink target matches disk but import does not", `${projectRoot}/XY`, `${projectRoot}/Xy`, `./XY`);
        verifyDirSymlink("when import matches disk but directory symlink target does not", `${projectRoot}/XY`, `${projectRoot}/XY`, `./Xy`);
        verifyDirSymlink("when import and directory symlink target agree but do not match disk", `${projectRoot}/XY`, `${projectRoot}/Xy`, `./Xy`);
        verifyDirSymlink("when import, directory symlink target, and disk are all different", `${projectRoot}/XY`, `${projectRoot}/Xy`, `./yX`);

        verifyTscWatch({
            scenario: "forceConsistentCasingInFileNames",
            subScenario: "with nodeNext resolution",
            commandLineArgs: ["--w", "--explainFiles"],
            sys: () => createWatchedSystem({
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
                [libFile.path]: libFile.content,
            }, { currentDirectory: "/Users/name/projects/web" }),
            changes: emptyArray,
        });

        verifyTscWatch({
            scenario: "forceConsistentCasingInFileNames",
            subScenario: "self name package reference",
            commandLineArgs: ["-w", "--explainFiles"],
            sys: () => createWatchedSystem({
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
                "/a/lib/lib.esnext.full.d.ts": libFile.content,
            }, { currentDirectory: "/Users/name/projects/web" }),
            changes: emptyArray,
        });
    });
}
