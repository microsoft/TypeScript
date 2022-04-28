namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: moduleResolution", () => {
        verifyTscWatch({
            scenario: "moduleResolution",
            subScenario: `watches for changes to package-json main fields`,
            sys: () => createWatchedSystem([
                {
                    path: `${projectRoot}/packages/pkg1/package.json`,
                    content: JSON.stringify({
                        name: "pkg1",
                        version: "1.0.0",
                        main: "build/index.js",
                    })
                },
                {
                    path: `${projectRoot}/packages/pkg1/index.ts`,
                    content: Utils.dedent`
            import type { TheNum } from 'pkg2'
            export const theNum: TheNum = 42;`
                },
                {
                    path: `${projectRoot}/packages/pkg1/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            outDir: "build",
                        },
                    })
                },
                {
                    path: `${projectRoot}/packages/pkg2/build/const.d.ts`,
                    content: `export type TheNum = 42;`
                },
                {
                    path: `${projectRoot}/packages/pkg2/build/index.d.ts`,
                    content: `export type { TheNum } from './const.js';`
                },
                {
                    path: `${projectRoot}/packages/pkg2/build/other.d.ts`,
                    content: `export type TheStr = string;`
                },
                {
                    path: `${projectRoot}/packages/pkg2/package.json`,
                    content: JSON.stringify({
                        name: "pkg2",
                        version: "1.0.0",
                        main: "build/index.js",
                    })
                },
                {
                    path: `${projectRoot}/node_modules/pkg2`,
                    symLink: `${projectRoot}/packages/pkg2`,
                },
                libFile
            ], { currentDirectory: projectRoot }),
            commandLineArgs: ["--project", "./packages/pkg1/tsconfig.json", "-w", "--traceResolution"],
            changes: [
                {
                    caption: "reports import errors after change to package file",
                    change: sys => replaceFileText(sys, `${projectRoot}/packages/pkg2/package.json`, `index.js`, `other.js`),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // invalidates failed lookups
                        sys.runQueuedTimeoutCallbacks(); // actual update
                    },
                },
                {
                    caption: "removes those errors when a package file is changed back",
                    change: sys => replaceFileText(sys, `${projectRoot}/packages/pkg2/package.json`, `other.js`, `index.js`),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // invalidates failed lookups
                        sys.runQueuedTimeoutCallbacks(); // actual update
                    },
                },
            ]
        });
    });
}