namespace ts.tscWatch {
    describe("unittests:: tsbuildWatch:: watchMode:: projectsBuilding", () => {
        function pkgs<T>(cb: (index: number) => T, count: number, startIndex?: number): T[] {
            const result: T[] = [];
            for (let index = startIndex || 0; count > 0; index++, count--) {
                result.push(cb(index));
            }
            return result;
        }
        function createPkgReference(index: number) {
            return { path: `./pkg${index}` };
        }
        function pkgFiles(index: number): File[] {
            return [
                {
                    path: `${projectRoot}/pkg${index}/index.ts`,
                    content: `export const pkg${index} = ${index};`
                },
                {
                    path: `${projectRoot}/pkg${index}/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: { composite: true },
                        references: index === 0 ?
                            undefined :
                            [{ path: `../pkg0` }]
                    })
                }
            ];
        }
        function solution(maxPkgs: number): File {
            return {
                path: `${projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    references: pkgs(createPkgReference, maxPkgs),
                    files: [],
                })
            };
        }
        function checkBuildPkg(startIndex: number, count: number): TscWatchCompileChange {
            return {
                caption: `build ${pkgs(index => `pkg${index}`, count, startIndex).join(",")}`,
                change: noop,
                timeouts: checkSingleTimeoutQueueLengthAndRun,
            };
        }
        verifyTscWatch({
            scenario: "projectsBuilding",
            subScenario: `when there are 3 projects in a solution`,
            commandLineArgs: ["-b", "-w", "-v"],
            sys: () => createWatchedSystem(
                [libFile, ...flatMap(pkgs(pkgFiles, 3), identity), solution(3)],
                { currentDirectory: projectRoot }
            ),
            changes: [
                {
                    caption: "dts doesn't change",
                    change: sys => sys.appendFile(`${projectRoot}/pkg0/index.ts`, `const someConst2 = 10;`),
                    timeouts: checkSingleTimeoutQueueLengthAndRun, // Build pkg0 and update timestamps
                },
                noopChange,
                {
                    caption: "dts change",
                    change: sys => sys.appendFile(`${projectRoot}/pkg0/index.ts`, `export const someConst = 10;`),
                    timeouts: checkSingleTimeoutQueueLengthAndRun // Build pkg0
                },
                checkBuildPkg(1, 2),
                noopChange,
            ]
        });
        verifyTscWatch({
            scenario: "projectsBuilding",
            subScenario: `when there are 5 projects in a solution`,
            commandLineArgs: ["-b", "-w", "-v"],
            sys: () => createWatchedSystem(
                [libFile, ...flatMap(pkgs(pkgFiles, 5), identity), solution(5)],
                { currentDirectory: projectRoot }
            ),
            changes: [
                {
                    caption: "dts doesn't change",
                    change: sys => sys.appendFile(`${projectRoot}/pkg0/index.ts`, `const someConst2 = 10;`),
                    timeouts: checkSingleTimeoutQueueLengthAndRun, // Build pkg0 and update timestamps
                },
                noopChange,
                {
                    caption: "dts change",
                    change: sys => sys.appendFile(`${projectRoot}/pkg0/index.ts`, `export const someConst = 10;`),
                    timeouts: checkSingleTimeoutQueueLengthAndRun // Build pkg0
                },
                checkBuildPkg(1, 4),
                noopChange,
            ]
        });
        verifyTscWatch({
            scenario: "projectsBuilding",
            subScenario: `when there are 8 projects in a solution`,
            commandLineArgs: ["-b", "-w", "-v"],
            sys: () => createWatchedSystem(
                [libFile, ...flatMap(pkgs(pkgFiles, 8), identity), solution(8)],
                { currentDirectory: projectRoot }
            ),
            changes: [
                {
                    caption: "dts doesn't change",
                    change: sys => sys.appendFile(`${projectRoot}/pkg0/index.ts`, `const someConst2 = 10;`),
                    timeouts: checkSingleTimeoutQueueLengthAndRun, // Build pkg0 and update timestamps
                },
                noopChange,
                {
                    caption: "dts change",
                    change: sys => sys.appendFile(`${projectRoot}/pkg0/index.ts`, `export const someConst = 10;`),
                    timeouts: checkSingleTimeoutQueueLengthAndRun // Build pkg0
                },
                checkBuildPkg(1, 5),
                checkBuildPkg(6, 2),
                noopChange,
                {
                    caption: "dts change2",
                    change: sys => sys.appendFile(`${projectRoot}/pkg0/index.ts`, `export const someConst3 = 10;`),
                    timeouts: checkSingleTimeoutQueueLengthAndRun // Build pkg0
                },
                checkBuildPkg(1, 5),
                {
                    caption: "change while building",
                    change: sys => sys.appendFile(`${projectRoot}/pkg0/index.ts`, `const someConst4 = 10;`),
                    timeouts: checkSingleTimeoutQueueLengthAndRun // Build pkg0
                },
                checkBuildPkg(6, 2),
                noopChange,
            ]
        });
        verifyTscWatch({
            scenario: "projectsBuilding",
            subScenario: `when there are 23 projects in a solution`,
            commandLineArgs: ["-b", "-w", "-v"],
            sys: () => createWatchedSystem(
                [libFile, ...flatMap(pkgs(pkgFiles, 23), identity), solution(23)],
                { currentDirectory: projectRoot }
            ),
            changes: [
                {
                    caption: "dts doesn't change",
                    change: sys => sys.appendFile(`${projectRoot}/pkg0/index.ts`, `const someConst2 = 10;`),
                    timeouts: checkSingleTimeoutQueueLengthAndRun, // Build pkg0 and update timestamps
                },
                noopChange,
                {
                    caption: "dts change",
                    change: sys => sys.appendFile(`${projectRoot}/pkg0/index.ts`, `export const someConst = 10;`),
                    timeouts: checkSingleTimeoutQueueLengthAndRun // Build pkg0
                },
                checkBuildPkg(1, 5),
                checkBuildPkg(6, 5),
                checkBuildPkg(11, 5),
                checkBuildPkg(16, 5),
                checkBuildPkg(21, 3),
                noopChange,
                {
                    caption: "dts change2",
                    change: sys => sys.appendFile(`${projectRoot}/pkg0/index.ts`, `export const someConst3 = 10;`),
                    timeouts: checkSingleTimeoutQueueLengthAndRun // Build pkg0
                },
                checkBuildPkg(1, 5),
                checkBuildPkg(6, 5),
                {
                    caption: "change while building",
                    change: sys => sys.appendFile(`${projectRoot}/pkg0/index.ts`, `const someConst4 = 10;`),
                    timeouts: checkSingleTimeoutQueueLengthAndRun // Build pkg0
                },
                checkBuildPkg(11, 5),
                {
                    caption: "change while building: dts changes",
                    change: sys => sys.appendFile(`${projectRoot}/pkg0/index.ts`, `export const someConst5 = 10;`),
                    timeouts: checkSingleTimeoutQueueLengthAndRun // Build pkg0
                },
                checkBuildPkg(1, 5),
                checkBuildPkg(6, 5),
                checkBuildPkg(11, 5),
                checkBuildPkg(16, 5),
                checkBuildPkg(21, 3),
                noopChange,
            ]
        });
    });
}