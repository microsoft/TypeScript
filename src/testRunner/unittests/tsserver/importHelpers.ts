import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: import helpers", () => {
    it("should not crash in tsserver", () => {
        const f1 = {
            path: "/a/app.ts",
            content: "export async function foo() { return 100; }"
        };
        const tslib = {
            path: "/a/node_modules/tslib/index.d.ts",
            content: ""
        };
        const host = ts.projectSystem.createServerHost([f1, tslib]);
        const service = ts.projectSystem.createProjectService(host);
        service.openExternalProject({ projectFileName: "p", rootFiles: [ts.projectSystem.toExternalFile(f1.path)], options: { importHelpers: true } });
        service.checkNumberOfProjects({ externalProjects: 1 });
    });
});
