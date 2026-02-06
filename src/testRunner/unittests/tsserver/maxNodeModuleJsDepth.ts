import * as ts from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    openFilesForSession,
    setCompilerOptionsForInferredProjectsRequestForSession,
    TestSession,
} from "../helpers/tsserver.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: maxNodeModuleJsDepth:: for inferred projects", () => {
    it("should be set to 2 if the project has js root files", () => {
        const file1: File = {
            path: "/home/src/projects/project/file1.js",
            content: `var t = require("test"); t.`,
        };
        const moduleFile: File = {
            path: "/home/src/projects/project/node_modules/test/index.js",
            content: `var v = 10; module.exports = v;`,
        };

        const host = TestServerHost.createServerHost([file1, moduleFile]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);

        session.logger.log(`maxNodeModuleJsDepth: ${session.getProjectService().inferredProjects[0].getCompilationSettings().maxNodeModuleJsDepth}`);

        // Assert the option sticks
        setCompilerOptionsForInferredProjectsRequestForSession({ target: ts.server.protocol.ScriptTarget.ES2016 }, session);
        session.logger.log(`maxNodeModuleJsDepth: ${session.getProjectService().inferredProjects[0].getCompilationSettings().maxNodeModuleJsDepth}`);
        baselineTsserverLogs("maxNodeModuleJsDepth", "should be set to 2 if the project has js root files", session);
    });

    it("should return to normal state when all js root files are removed from project", () => {
        const file1 = {
            path: "/home/src/projects/project/file1.ts",
            content: "let x =1;",
        };
        const file2 = {
            path: "/home/src/projects/project/file2.js",
            content: "let x =1;",
        };

        const host = TestServerHost.createServerHost([file1, file2]);
        const session = new TestSession({ host, useSingleInferredProject: true });

        openFilesForSession([file1], session);
        session.logger.log(`maxNodeModuleJsDepth: ${session.getProjectService().inferredProjects[0].getCompilationSettings().maxNodeModuleJsDepth}`);

        openFilesForSession([file2], session);
        session.logger.log(`maxNodeModuleJsDepth: ${session.getProjectService().inferredProjects[0].getCompilationSettings().maxNodeModuleJsDepth}`);

        closeFilesForSession([file2], session);
        session.logger.log(`maxNodeModuleJsDepth: ${session.getProjectService().inferredProjects[0].getCompilationSettings().maxNodeModuleJsDepth}`);
        baselineTsserverLogs("maxNodeModuleJsDepth", "should return to normal state when all js root files are removed from project", session);
    });

    it("handles resolutions when currentNodeModulesDepth changes when referencing file from another file", () => {
        const host = TestServerHost.createServerHost({
            "/user/username/projects/project1/src/file1.js": dedent`
                import {x} from 'glob';
                import {y} from 'minimatch'; // This imported file will add imports from minimatch to program
            `,
            "/user/username/projects/project1/src/node_modules/glob/index.js": dedent`
                import { y } from "minimatch"; // This import is will put minimatch at maxNodeModuleJsDepth so its imports are not added to program
                export const x = y;
            `,
            "/user/username/projects/project1/src/node_modules/minimatch/index.js": dedent`
                import { z } from "path";  // This will be resolved two times
                export const y = z;
            `,
            "/user/username/projects/project1/src/node_modules/path/index.js": dedent`
                export const z = 10;
            `,
        });
        const session = new TestSession({ host, useSingleInferredProject: true });

        openFilesForSession(["/user/username/projects/project1/src/file1.js"], session);
        baselineTsserverLogs("maxNodeModuleJsDepth", "handles resolutions when currentNodeModulesDepth changes when referencing file from another file", session);
    });
});
