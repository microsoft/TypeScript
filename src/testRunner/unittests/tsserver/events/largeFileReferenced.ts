import * as ts from "../../../_namespaces/ts";
import { createServerHost, File, libFile } from "../../virtualFileSystemWithWatch";
import { createSessionWithEventTracking, checkProjectActualFiles, openFilesForSession, checkNumberOfProjects } from "../helpers";

describe("unittests:: tsserver:: events:: LargeFileReferencedEvent with large file", () => {

    function getLargeFile(useLargeTsFile: boolean) {
        return `src/large.${useLargeTsFile ? "ts" : "js"}`;
    }

    function createSessionWithEventHandler(files: File[], useLargeTsFile: boolean) {
        const largeFile: File = {
            path: `/user/username/projects/myproject/${getLargeFile(useLargeTsFile)}`,
            content: "export var x = 10;",
            fileSize: ts.server.maxFileSize + 1
        };
        files.push(largeFile);
        const host = createServerHost(files);
        const { session, events: largeFileReferencedEvents } = createSessionWithEventTracking<ts.server.LargeFileReferencedEvent>(host, ts.server.LargeFileReferencedEvent);

        return { session, verifyLargeFile };

        function verifyLargeFile(project: ts.server.Project) {
            checkProjectActualFiles(project, files.map(f => f.path));

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
            const file: File = {
                path: `/user/username/projects/myproject/src/file.ts`,
                content: "export var y = 10;"
            };
            const tsconfig: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: JSON.stringify({ files: ["src/file.ts", getLargeFile(useLargeTsFile)], compilerOptions: { target: 1, allowJs: true } })
            };
            const files = [file, libFile, tsconfig];
            const { session, verifyLargeFile } = createSessionWithEventHandler(files, useLargeTsFile);
            const service = session.getProjectService();
            openFilesForSession([file], session);
            checkNumberOfProjects(service, { configuredProjects: 1 });
            verifyLargeFile(service.configuredProjects.get(tsconfig.path)!);
        });

        it("when large file is included by module resolution", () => {
            const file: File = {
                path: `/user/username/projects/myproject/src/file.ts`,
                content: `export var y = 10;import {x} from "./large"`
            };
            const files = [file, libFile];
            const { session, verifyLargeFile } = createSessionWithEventHandler(files, useLargeTsFile);
            const service = session.getProjectService();
            openFilesForSession([file], session);
            checkNumberOfProjects(service, { inferredProjects: 1 });
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
