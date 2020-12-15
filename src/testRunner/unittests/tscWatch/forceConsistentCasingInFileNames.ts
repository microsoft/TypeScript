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
                sys: () => createWatchedSystem([loggerFile, anotherFile, tsconfig, libFile, tsconfig]),
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
                        files: ["node_modules/react/Jsx-runtime/index.d.ts", "index.tsx"]
                    })
                }
            ], { currentDirectory: projectRoot }),
            changes: emptyArray,
        });
    });
}
