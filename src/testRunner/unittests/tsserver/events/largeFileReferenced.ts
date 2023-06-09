import { createLoggerWithInMemoryLogs } from "../../../../harness/tsserverLogger";
import * as ts from "../../../_namespaces/ts";
import {
    baselineTsserverLogs,
    createSession,
    openFilesForSession,
} from "../../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: events:: LargeFileReferencedEvent with large file", () => {
    function getFileType(useLargeTsFile: boolean) {
        return useLargeTsFile ? "ts" : "js";
    }
    function getLargeFile(useLargeTsFile: boolean) {
        return `src/large.${getFileType(useLargeTsFile)}`;
    }

    function createSessionWithEventHandler(files: File[], useLargeTsFile: boolean) {
        const largeFile: File = {
            path: `/user/username/projects/myproject/${getLargeFile(useLargeTsFile)}`,
            content: "export var x = 10;",
            fileSize: ts.server.maxFileSize + 1
        };
        files.push(largeFile);
        const host = createServerHost(files);
        const session = createSession(host, { canUseEvents: true, logger: createLoggerWithInMemoryLogs(host) });

        return session;
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
            const session = createSessionWithEventHandler(files, useLargeTsFile);
            openFilesForSession([file], session);
            baselineTsserverLogs("events/largeFileReferenced", `when large ${getFileType(useLargeTsFile)} file is included by tsconfig`, session);
        });

        it("when large file is included by module resolution", () => {
            const file: File = {
                path: `/user/username/projects/myproject/src/file.ts`,
                content: `export var y = 10;import {x} from "./large"`
            };
            const files = [file, libFile];
            const session = createSessionWithEventHandler(files, useLargeTsFile);
            openFilesForSession([file], session);
            baselineTsserverLogs("events/largeFileReferenced", `when large ${getFileType(useLargeTsFile)} file is included by module resolution`, session);
        });
    }

    describe("large file is ts file", () => {
        verifyLargeFile(/*useLargeTsFile*/ true);
    });

    describe("large file is js file", () => {
        verifyLargeFile(/*useLargeTsFile*/ false);
    });
});
