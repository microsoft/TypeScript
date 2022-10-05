import * as ts from "../../_namespaces/ts";

describe("unittests:: tsbuildWatch:: watchMode:: with demo project", () => {
    const projectLocation = `${ts.TestFSWithWatch.tsbuildProjectsLocation}/demo`;
    let coreFiles: ts.tscWatch.File[];
    let animalFiles: ts.tscWatch.File[];
    let zooFiles: ts.tscWatch.File[];
    let solutionFile: ts.tscWatch.File;
    let baseConfig: ts.tscWatch.File;
    let allFiles: ts.tscWatch.File[];
    before(() => {
        coreFiles = subProjectFiles("core", ["tsconfig.json", "utilities.ts"]);
        animalFiles = subProjectFiles("animals", ["tsconfig.json", "animal.ts", "dog.ts", "index.ts"]);
        zooFiles = subProjectFiles("zoo", ["tsconfig.json", "zoo.ts"]);
        solutionFile = projectFile("tsconfig.json");
        baseConfig = projectFile("tsconfig-base.json");
        allFiles = [...coreFiles, ...animalFiles, ...zooFiles, solutionFile, baseConfig, { path: ts.tscWatch.libFile.path, content: ts.libContent }];
    });

    after(() => {
        coreFiles = undefined!;
        animalFiles = undefined!;
        zooFiles = undefined!;
        solutionFile = undefined!;
        baseConfig = undefined!;
        allFiles = undefined!;
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "demo",
        subScenario: "updates with circular reference",
        commandLineArgs: ["-b", "-w", "-verbose"],
        sys: () => {
            const sys = ts.tscWatch.createWatchedSystem(allFiles, { currentDirectory: projectLocation });
            sys.writeFile(coreFiles[0].path, coreFiles[0].content.replace(
                "}",
                `},
  "references": [
    {
      "path": "../zoo"
    }
  ]`
            ));
            return sys;
        },
        changes: [
            {
                caption: "Fix error",
                change: sys => sys.writeFile(coreFiles[0].path, coreFiles[0].content),
                timeouts: sys => {
                    sys.checkTimeoutQueueLengthAndRun(1); // build core
                    sys.checkTimeoutQueueLengthAndRun(1); // build animals, zoo and solution
                    sys.checkTimeoutQueueLength(0);
                },
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "demo",
        subScenario: "updates with bad reference",
        commandLineArgs: ["-b", "-w", "-verbose"],
        sys: () => {
            const sys = ts.tscWatch.createWatchedSystem(allFiles, { currentDirectory: projectLocation });
            sys.writeFile(coreFiles[1].path, `import * as A from '../animals';
${coreFiles[1].content}`);
            return sys;
        },
        changes: [
            {
                caption: "Prepend a line",
                change: sys => sys.writeFile(coreFiles[1].path, `
import * as A from '../animals';
${coreFiles[1].content}`),
                // build core
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
            }
        ]
    });

    function subProjectFiles(subProject: string, fileNames: readonly string[]): ts.tscWatch.File[] {
        return fileNames.map(file => projectFile(`${subProject}/${file}`));
    }

    function projectFile(fileName: string): ts.tscWatch.File {
        return ts.TestFSWithWatch.getTsBuildProjectFile("demo", fileName);
    }
});