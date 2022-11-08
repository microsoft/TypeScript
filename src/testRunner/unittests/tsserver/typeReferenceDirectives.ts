import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: typeReferenceDirectives", () => {
    it("when typeReferenceDirective contains UpperCasePackage", () => {
        const libProjectLocation = `${ts.tscWatch.projectRoot}/lib`;
        const typeLib: ts.projectSystem.File = {
            path: `${libProjectLocation}/@types/UpperCasePackage/index.d.ts`,
            content: `declare class BrokenTest {
    constructor(name: string, width: number, height: number, onSelect: Function);
    Name: string;
    SelectedFile: string;
}`
        };
        const appLib: ts.projectSystem.File = {
            path: `${libProjectLocation}/@app/lib/index.d.ts`,
            content: `/// <reference types="UpperCasePackage" />
declare class TestLib {
    issue: BrokenTest;
    constructor();
    test(): void;
}`
        };
        const testProjectLocation = `${ts.tscWatch.projectRoot}/test`;
        const testFile: ts.projectSystem.File = {
            path: `${testProjectLocation}/test.ts`,
            content: `class TestClass1 {

    constructor() {
        var l = new TestLib();

    }

    public test2() {
        var x = new BrokenTest('',0,0,null);

    }
}`
        };
        const testConfig: ts.projectSystem.File = {
            path: `${testProjectLocation}/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: {
                    module: "amd",
                    typeRoots: ["../lib/@types", "../lib/@app"]
                }
            })
        };

        const files = [typeLib, appLib, testFile, testConfig, ts.projectSystem.libFile];
        const host = ts.projectSystem.createServerHost(files);
        const service = ts.projectSystem.createProjectService(host);
        service.openClientFile(testFile.path);
        ts.projectSystem.checkNumberOfProjects(service, { configuredProjects: 1 });
        const project = service.configuredProjects.get(testConfig.path)!;
        ts.projectSystem.checkProjectActualFiles(project, files.map(f => f.path));
        host.writeFile(appLib.path, appLib.content.replace("test()", "test2()"));
        host.checkTimeoutQueueLengthAndRun(2);
    });

    it("when typeReferenceDirective is relative path and in a sibling folder", () => {
        const projectPath = `${ts.tscWatch.projectRoot}/background`;
        const file: ts.projectSystem.File = {
            path: `${projectPath}/a.ts`,
            content: "let x = 10;"
        };
        const tsconfig: ts.projectSystem.File = {
            path: `${projectPath}/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: {
                    types: [
                        "../typedefs/filesystem"
                    ]
                }
            })
        };
        const filesystem: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/typedefs/filesystem.d.ts`,
            content: `interface LocalFileSystem { someProperty: string; }`
        };
        const files = [file, tsconfig, filesystem, ts.projectSystem.libFile];
        const host = ts.projectSystem.createServerHost(files);
        const service = ts.projectSystem.createProjectService(host);
        service.openClientFile(file.path);
    });
});
