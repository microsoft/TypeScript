import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    createSession,
    openFilesForSession,
    setCompilerOptionsForInferredProjectsRequestForSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: maxNodeModuleJsDepth for inferred projects", () => {
    it("should be set to 2 if the project has js root files", () => {
        const file1: File = {
            path: "/a/b/file1.js",
            content: `var t = require("test"); t.`
        };
        const moduleFile: File = {
            path: "/a/b/node_modules/test/index.js",
            content: `var v = 10; module.exports = v;`
        };

        const host = createServerHost([file1, moduleFile]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([file1], session);

        session.logger.log(`maxNodeModuleJsDepth: ${session.getProjectService().inferredProjects[0].getCompilationSettings().maxNodeModuleJsDepth}`);

        // Assert the option sticks
        setCompilerOptionsForInferredProjectsRequestForSession({ target: ts.ScriptTarget.ES2016 }, session);
        session.logger.log(`maxNodeModuleJsDepth: ${session.getProjectService().inferredProjects[0].getCompilationSettings().maxNodeModuleJsDepth}`);
        baselineTsserverLogs("maxNodeModuleJsDepth", "should be set to 2 if the project has js root files", session);
    });

    it("should return to normal state when all js root files are removed from project", () => {
        const file1 = {
            path: "/a/file1.ts",
            content: "let x =1;"
        };
        const file2 = {
            path: "/a/file2.js",
            content: "let x =1;"
        };

        const host = createServerHost([file1, file2, libFile]);
        const session = createSession(host, { useSingleInferredProject: true, logger: createLoggerWithInMemoryLogs(host) });

        openFilesForSession([file1], session);
        session.logger.log(`maxNodeModuleJsDepth: ${session.getProjectService().inferredProjects[0].getCompilationSettings().maxNodeModuleJsDepth}`);

        openFilesForSession([file2], session);
        session.logger.log(`maxNodeModuleJsDepth: ${session.getProjectService().inferredProjects[0].getCompilationSettings().maxNodeModuleJsDepth}`);

        closeFilesForSession([file2], session);
        session.logger.log(`maxNodeModuleJsDepth: ${session.getProjectService().inferredProjects[0].getCompilationSettings().maxNodeModuleJsDepth}`);
        baselineTsserverLogs("maxNodeModuleJsDepth", "should return to normal state when all js root files are removed from project", session);
    });
});
