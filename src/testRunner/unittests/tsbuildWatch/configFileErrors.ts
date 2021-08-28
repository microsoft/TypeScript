namespace ts.tscWatch {
    describe("unittests:: tsbuildWatch:: watchMode:: configFileErrors:: reports syntax errors in config file", () => {
        function build(sys: WatchedSystem) {
            sys.checkTimeoutQueueLengthAndRun(1); // build the project
            sys.checkTimeoutQueueLength(0);
        }
        verifyTscWatch({
            scenario: "configFileErrors",
            subScenario: "reports syntax errors in config file",
            sys: () => createWatchedSystem(
                [
                    { path: `${projectRoot}/a.ts`, content: "export function foo() { }" },
                    { path: `${projectRoot}/b.ts`, content: "export function bar() { }" },
                    {
                        path: `${projectRoot}/tsconfig.json`,
                        content: Utils.dedent`
{
    "compilerOptions": {
        "composite": true,
    },
    "files": [
        "a.ts"
        "b.ts"
    ]
}`
                    },
                    libFile
                ],
                { currentDirectory: projectRoot }
            ),
            commandLineArgs: ["--b", "-w"],
            changes: [
                {
                    caption: "reports syntax errors after change to config file",
                    change: sys => replaceFileText(sys, `${projectRoot}/tsconfig.json`, ",", `,
        "declaration": true,`),
                    timeouts: build,
                },
                {
                    caption: "reports syntax errors after change to ts file",
                    change: sys => replaceFileText(sys, `${projectRoot}/a.ts`, "foo", "fooBar"),
                    timeouts: build,
                },
                {
                    caption: "reports error when there is no change to tsconfig file",
                    change: sys => replaceFileText(sys, `${projectRoot}/tsconfig.json`, "", ""),
                    timeouts: build,
                },
                {
                    caption: "builds after fixing config file errors",
                    change: sys => sys.writeFile(`${projectRoot}/tsconfig.json`, JSON.stringify({
                        compilerOptions: { composite: true, declaration: true },
                        files: ["a.ts", "b.ts"]
                    })),
                    timeouts: build,
                }
            ]
        });
    });
}