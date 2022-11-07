import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: autoDiscovery", () => {
    it("does not depend on extension", () => {
        const file1 = {
            path: "/a/b/app.html",
            content: ""
        };
        const file2 = {
            path: "/a/b/app.d.ts",
            content: ""
        };
        const host = ts.projectSystem.createServerHost([file1, file2]);
        const projectService = ts.projectSystem.createProjectService(host);
        projectService.openExternalProject({
            projectFileName: "/a/b/proj.csproj",
            rootFiles: [ts.projectSystem.toExternalFile(file2.path), { fileName: file1.path, hasMixedContent: true, scriptKind: ts.ScriptKind.JS }],
            options: {}
        });
        projectService.checkNumberOfProjects({ externalProjects: 1 });
        const typeAcquisition = projectService.externalProjects[0].getTypeAcquisition();
        assert.isTrue(typeAcquisition.enable, "Typine acquisition should be enabled");
    });
});

describe("unittests:: tsserver:: prefer typings to js", () => {
    it("during second resolution pass", () => {
        const typingsCacheLocation = "/a/typings";
        const f1 = {
            path: "/a/b/app.js",
            content: "var x = require('bar')"
        };
        const barjs = {
            path: "/a/b/node_modules/bar/index.js",
            content: "export let x = 1"
        };
        const barTypings = {
            path: `${typingsCacheLocation}/node_modules/@types/bar/index.d.ts`,
            content: "export let y: number"
        };
        const config = {
            path: "/a/b/jsconfig.json",
            content: JSON.stringify({ compilerOptions: { allowJs: true }, exclude: ["node_modules"] })
        };
        const host = ts.projectSystem.createServerHost([f1, barjs, barTypings, config]);
        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller: new ts.projectSystem.TestTypingsInstaller(typingsCacheLocation, /*throttleLimit*/ 5, host) });

        projectService.openClientFile(f1.path);
        projectService.checkNumberOfProjects({ configuredProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(ts.projectSystem.configuredProjectAt(projectService, 0), [f1.path, barTypings.path, config.path]);
    });
});
