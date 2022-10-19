import * as ts from "../../../_namespaces/ts";

describe("unittests:: tsserver:: events:: LargeFileReferencedEvent with large file", () => {

    function getLargeFile(useLargeTsFile: boolean) {
        return `src/large.${useLargeTsFile ? "ts" : "js"}`;
    }

    function createSessionWithEventHandler(files: ts.projectSystem.File[], useLargeTsFile: boolean) {
        const largeFile: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/${getLargeFile(useLargeTsFile)}`,
            content: "export var x = 10;",
            fileSize: ts.server.maxFileSize + 1
        };
        files.push(largeFile);
        const host = ts.projectSystem.createServerHost(files);
        const { session, events: largeFileReferencedEvents } = ts.projectSystem.createSessionWithEventTracking<ts.server.LargeFileReferencedEvent>(host, ts.server.LargeFileReferencedEvent);

        return { session, verifyLargeFile };

        function verifyLargeFile(project: ts.server.Project) {
            ts.projectSystem.checkProjectActualFiles(project, files.map(f => f.path));

            // large file for non ts file should be empty and for ts file should have content
            const service = session.getProjectService();
            const info = service.getScriptInfo(largeFile.path)!;
            assert.equal(info.cacheSourceFile!.sourceFile.text, useLargeTsFile ? largeFile.content : "");

            assert.deepEqual(largeFileReferencedEvents, useLargeTsFile ? ts.emptyArray : [{
                eventName: ts.server.LargeFileReferencedEvent,
                data: { file: largeFile.path, fileSize: largeFile.fileSize, maxFileSize: ts.server.maxFileSize }
            }]);
        }
    }

    function verifyLargeFile(useLargeTsFile: boolean) {
        it("when large file is included by tsconfig", () => {
            const file: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/src/file.ts`,
                content: "export var y = 10;"
            };
            const tsconfig: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({ files: ["src/file.ts", getLargeFile(useLargeTsFile)], compilerOptions: { target: 1, allowJs: true } })
            };
            const files = [file, ts.projectSystem.libFile, tsconfig];
            const { session, verifyLargeFile } = createSessionWithEventHandler(files, useLargeTsFile);
            const service = session.getProjectService();
            ts.projectSystem.openFilesForSession([file], session);
            ts.projectSystem.checkNumberOfProjects(service, { configuredProjects: 1 });
            verifyLargeFile(service.configuredProjects.get(tsconfig.path)!);
        });

        it("when large file is included by module resolution", () => {
            const file: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/src/file.ts`,
                content: `export var y = 10;import {x} from "./large"`
            };
            const files = [file, ts.projectSystem.libFile];
            const { session, verifyLargeFile } = createSessionWithEventHandler(files, useLargeTsFile);
            const service = session.getProjectService();
            ts.projectSystem.openFilesForSession([file], session);
            ts.projectSystem.checkNumberOfProjects(service, { inferredProjects: 1 });
            verifyLargeFile(service.inferredProjects[0]);
        });
    }

    describe("large file is ts file", () => {
        verifyLargeFile(/*useLargeTsFile*/ true);
    });

    describe("large file is js file", () => {
        verifyLargeFile(/*useLargeTsFile*/ false);
    });
});
