import * as ts from "../../_namespaces/ts";
import { createServerHost, File, libFile } from "../virtualFileSystemWithWatch";
import { createProjectService, checkNumberOfInferredProjects } from "./helpers";

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
        const projectService = createProjectService(host);
        projectService.openClientFile(file1.path);

        let project = projectService.inferredProjects[0];
        let options = project.getCompilationSettings();
        assert.isTrue(options.maxNodeModuleJsDepth === 2);

        // Assert the option sticks
        projectService.setCompilerOptionsForInferredProjects({ target: ts.ScriptTarget.ES2016 });
        project = projectService.inferredProjects[0];
        options = project.getCompilationSettings();
        assert.isTrue(options.maxNodeModuleJsDepth === 2);
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
        const projectService = createProjectService(host, { useSingleInferredProject: true });

        projectService.openClientFile(file1.path);
        checkNumberOfInferredProjects(projectService, 1);
        let project = projectService.inferredProjects[0];
        assert.isUndefined(project.getCompilationSettings().maxNodeModuleJsDepth);

        projectService.openClientFile(file2.path);
        project = projectService.inferredProjects[0];
        assert.isTrue(project.getCompilationSettings().maxNodeModuleJsDepth === 2);

        projectService.closeClientFile(file2.path);
        project = projectService.inferredProjects[0];
        assert.isUndefined(project.getCompilationSettings().maxNodeModuleJsDepth);
    });
});
