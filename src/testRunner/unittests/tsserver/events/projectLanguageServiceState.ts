import { createLoggerWithInMemoryLogs } from "../../../../harness/tsserverLogger";
import * as ts from "../../../_namespaces/ts";
import {
    baselineTsserverLogs,
    createProjectService,
    createSession,
    openFilesForSession,
} from "../../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: events:: ProjectLanguageServiceStateEvent", () => {
    it("language service disabled events are triggered", () => {
        const f1 = {
            path: "/a/app.js",
            content: "let x = 1;"
        };
        const f2 = {
            path: "/a/largefile.js",
            content: "",
        };
        const config = {
            path: "/a/jsconfig.json",
            content: "{}"
        };
        const configWithExclude = {
            path: config.path,
            content: JSON.stringify({ exclude: ["largefile.js"] })
        };
        const host = createServerHost([f1, f2, config]);
        const originalGetFileSize = host.getFileSize;
        host.getFileSize = (filePath: string) =>
            filePath === f2.path ? ts.server.maxProgramSizeForNonTsFiles + 1 : originalGetFileSize.call(host, filePath);

        const session = createSession(host, { canUseEvents: true, logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([f1], session);
        session.logger.log(`Language service enabled: ${session.getProjectService().configuredProjects.get(config.path)!.languageServiceEnabled}`);

        host.writeFile(configWithExclude.path, configWithExclude.content);
        host.runQueuedTimeoutCallbacks();
        session.logger.log(`Language service enabled: ${session.getProjectService().configuredProjects.get(config.path)!.languageServiceEnabled}`);
        baselineTsserverLogs("events/projectLanguageServiceState", "language service disabled events are triggered", session);
    });

    it("Large file size is determined correctly", () => {
        const f1: File = {
            path: "/a/app.js",
            content: "let x = 1;"
        };
        const f2: File = {
            path: "/a/largefile.js",
            content: "",
            fileSize: ts.server.maxProgramSizeForNonTsFiles + 1
        };
        const f3: File = {
            path: "/a/extremlylarge.d.ts",
            content: "",
            fileSize: ts.server.maxProgramSizeForNonTsFiles + 100
        };
        const config = {
            path: "/a/jsconfig.json",
            content: "{}"
        };
        const host = createServerHost([f1, f2, f3, libFile, config]);
        const service = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        service.openClientFile(f1.path);
        const project = service.configuredProjects.get(config.path)!;
        service.logger.info(`languageServiceEnabled: ${project.languageServiceEnabled}`);
        service.logger.info(`lastFileExceededProgramSize: ${project.lastFileExceededProgramSize}`);
        baselineTsserverLogs("events/projectLanguageServiceState", "large file size is determined correctly", service);
    });
});
