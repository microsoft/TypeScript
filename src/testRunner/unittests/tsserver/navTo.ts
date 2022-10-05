import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: navigate-to for javascript project", () => {
    function findNavToItem(items: ts.projectSystem.protocol.NavtoItem[], itemName: string, itemKind: string) {
        return ts.find(items, item => item.name === itemName && item.kind === itemKind);
    }

    function containsNavToItem(items: ts.projectSystem.protocol.NavtoItem[], itemName: string, itemKind: string) {
        return findNavToItem(items, itemName, itemKind) !== undefined;
    }

    it("should not include type symbols", () => {
        const file1: ts.projectSystem.File = {
            path: "/a/b/file1.js",
            content: "function foo() {}"
        };
        const configFile: ts.projectSystem.File = {
            path: "/a/b/jsconfig.json",
            content: "{}"
        };
        const host = ts.projectSystem.createServerHost([file1, configFile, ts.projectSystem.libFile]);
        const session = ts.projectSystem.createSession(host);
        ts.projectSystem.openFilesForSession([file1], session);

        // Try to find some interface type defined in lib.d.ts
        const libTypeNavToRequest = ts.projectSystem.makeSessionRequest<ts.projectSystem.protocol.NavtoRequestArgs>(ts.projectSystem.CommandNames.Navto, { searchValue: "Document", file: file1.path, projectFileName: configFile.path });
        const items = session.executeCommand(libTypeNavToRequest).response as ts.projectSystem.protocol.NavtoItem[];
        assert.isFalse(containsNavToItem(items, "Document", "interface"), `Found lib.d.ts symbol in JavaScript project nav to request result.`);

        const localFunctionNavToRequst = ts.projectSystem.makeSessionRequest<ts.projectSystem.protocol.NavtoRequestArgs>(ts.projectSystem.CommandNames.Navto, { searchValue: "foo", file: file1.path, projectFileName: configFile.path });
        const items2 = session.executeCommand(localFunctionNavToRequst).response as ts.projectSystem.protocol.NavtoItem[];
        assert.isTrue(containsNavToItem(items2, "foo", "function"), `Cannot find function symbol "foo".`);
    });

    it("should de-duplicate symbols", () => {
        const configFile1: ts.projectSystem.File = {
            path: "/a/tsconfig.json",
            content: `{
    "compilerOptions": {
        "composite": true
    }
}`
        };
        const file1: ts.projectSystem.File = {
            path: "/a/index.ts",
            content: "export const abcdef = 1;"
        };
        const configFile2: ts.projectSystem.File = {
            path: "/b/tsconfig.json",
            content: `{
    "compilerOptions": {
        "composite": true
    },
    "references": [
        { "path": "../a" }
    ]
}`
        };
        const file2: ts.projectSystem.File = {
            path: "/b/index.ts",
            content: `import a = require("../a");
export const ghijkl = a.abcdef;`
        };
        const host = ts.projectSystem.createServerHost([configFile1, file1, configFile2, file2]);
        const session = ts.projectSystem.createSession(host, { logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        ts.projectSystem.openFilesForSession([file1, file2], session);

        const request = ts.projectSystem.makeSessionRequest<ts.projectSystem.protocol.NavtoRequestArgs>(ts.projectSystem.CommandNames.Navto, { searchValue: "abcdef", file: file1.path });
        session.executeCommand(request).response as ts.projectSystem.protocol.NavtoItem[];

        ts.projectSystem.baselineTsserverLogs("navTo", "should de-duplicate symbols", session);
    });

    it("should de-duplicate symbols when searching all projects", () => {
        const solutionConfig: ts.projectSystem.File = {
            path: "/tsconfig.json",
            content: JSON.stringify({
                references: [{ path: "./a" }, { path: "./b" }],
                files: [],
            })
        };
        const configFile1: ts.projectSystem.File = {
            path: "/a/tsconfig.json",
            content: `{
    "compilerOptions": {
        "composite": true
    }
}`
        };
        const file1: ts.projectSystem.File = {
            path: "/a/index.ts",
            content: "export const abcdef = 1;"
        };
        const configFile2: ts.projectSystem.File = {
            path: "/b/tsconfig.json",
            content: `{
    "compilerOptions": {
        "composite": true
    },
    "references": [
        { "path": "../a" }
    ]
}`
        };
        const file2: ts.projectSystem.File = {
            path: "/b/index.ts",
            content: `import a = require("../a");
export const ghijkl = a.abcdef;`
        };
        const host = ts.projectSystem.createServerHost([configFile1, file1, configFile2, file2, solutionConfig]);
        const session = ts.projectSystem.createSession(host, { logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        ts.projectSystem.openFilesForSession([file1], session);

        const request = ts.projectSystem.makeSessionRequest<ts.projectSystem.protocol.NavtoRequestArgs>(ts.projectSystem.CommandNames.Navto, { searchValue: "abcdef" });
        session.executeCommand(request).response as ts.projectSystem.protocol.NavtoItem[];
        ts.projectSystem.baselineTsserverLogs("navTo", "should de-duplicate symbols when searching all projects", session);
    });

    it("should work with Deprecated", () => {
        const file1: ts.projectSystem.File = {
            path: "/a/b/file1.js",
            content: "/** @deprecated */\nfunction foo () {}"
        };
        const configFile: ts.projectSystem.File = {
            path: "/a/b/jsconfig.json",
            content: "{}"
        };
        const host = ts.projectSystem.createServerHost([file1, configFile, ts.projectSystem.libFile]);
        const session = ts.projectSystem.createSession(host);
        ts.projectSystem.openFilesForSession([file1], session);

        // Try to find some interface type defined in lib.d.ts
        const libTypeNavToRequest = ts.projectSystem.makeSessionRequest<ts.projectSystem.protocol.NavtoRequestArgs>(ts.projectSystem.CommandNames.Navto, { searchValue: "foo", file: file1.path, projectFileName: configFile.path });
        const items = session.executeCommand(libTypeNavToRequest).response as ts.projectSystem.protocol.NavtoItem[];
        const fooItem = findNavToItem(items, "foo", "function");
        assert.isNotNull(fooItem, `Cannot find function symbol "foo".`);
        assert.isTrue(fooItem?.kindModifiers?.includes("deprecated"));
    });
});
