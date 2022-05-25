namespace ts.tscWatch {
    describe("unittests:: tsbuildWatch:: watchMode:: module resolution different in referenced project", () => {
        verifyTscWatch({
            scenario: "moduleResolutionCache",
            subScenario: "handles the cache correctly when two projects use different module resolution settings",
            sys: () => createWatchedSystem(
                [
                    { path: `${projectRoot}/project1/index.ts`, content: `import { foo } from "file";` },
                    { path: `${projectRoot}/project1/node_modules/file/index.d.ts`, content: "export const foo = 10;" },
                    {
                        path: `${projectRoot}/project1/tsconfig.json`,
                        content: JSON.stringify({
                            compilerOptions: { composite: true, types: ["foo", "bar"] },
                            files: ["index.ts"]
                        })
                    },
                    { path: `${projectRoot}/project2/index.ts`, content: `import { foo } from "file";` },
                    { path: `${projectRoot}/project2/file.d.ts`, content: "export const foo = 10;" },
                    {
                        path: `${projectRoot}/project2/tsconfig.json`,
                        content: JSON.stringify({
                            compilerOptions: { composite: true, types: ["foo"], moduleResolution: "classic" },
                            files: ["index.ts"]
                        })
                    },
                    { path: `${projectRoot}/node_modules/@types/foo/index.d.ts`, content: "export const foo = 10;" },
                    { path: `${projectRoot}/node_modules/@types/bar/index.d.ts`, content: "export const bar = 10;" },
                    {
                        path: `${projectRoot}/tsconfig.json`,
                        content: JSON.stringify({
                            files: [],
                            references: [
                                { path: "./project1" },
                                { path: "./project2" }
                            ]
                        })
                    },
                    libFile
                ],
                { currentDirectory: projectRoot }
            ),
            commandLineArgs: ["--b", "-w", "-v"],
            changes: [
                {
                    caption: "Append text",
                    change: sys => sys.appendFile(`${projectRoot}/project1/index.ts`, "const bar = 10;"),
                    timeouts: sys => {
                        sys.checkTimeoutQueueLengthAndRun(1); // build project1 and solution
                        sys.checkTimeoutQueueLength(0);
                    }
                },
            ]
        });
    });
}