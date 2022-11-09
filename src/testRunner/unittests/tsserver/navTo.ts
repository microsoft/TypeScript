import * as ts from "../../_namespaces/ts";
import { createServerHost, File, libFile } from "../virtualFileSystemWithWatch";
import { createSession, openFilesForSession, makeSessionRequest, createLoggerWithInMemoryLogs, baselineTsserverLogs } from "./helpers";

describe("unittests:: tsserver:: navigate-to for javascript project", () => {
    function findNavToItem(items: ts.server.protocol.NavtoItem[], itemName: string, itemKind: string) {
        return ts.find(items, item => item.name === itemName && item.kind === itemKind);
    }

    function containsNavToItem(items: ts.server.protocol.NavtoItem[], itemName: string, itemKind: string) {
        return findNavToItem(items, itemName, itemKind) !== undefined;
    }

    it("should not include type symbols", () => {
        const file1: File = {
            path: "/a/b/file1.js",
            content: "function foo() {}"
        };
        const configFile: File = {
            path: "/a/b/jsconfig.json",
            content: "{}"
        };
        const host = createServerHost([file1, configFile, libFile]);
        const session = createSession(host);
        openFilesForSession([file1], session);

        // Try to find some interface type defined in lib.d.ts
        const libTypeNavToRequest = makeSessionRequest<ts.server.protocol.NavtoRequestArgs>(ts.server.CommandNames.Navto, { searchValue: "Document", file: file1.path, projectFileName: configFile.path });
        const items = session.executeCommand(libTypeNavToRequest).response as ts.server.protocol.NavtoItem[];
        assert.isFalse(containsNavToItem(items, "Document", "interface"), `Found lib.d.ts symbol in JavaScript project nav to request result.`);

        const localFunctionNavToRequst = makeSessionRequest<ts.server.protocol.NavtoRequestArgs>(ts.server.CommandNames.Navto, { searchValue: "foo", file: file1.path, projectFileName: configFile.path });
        const items2 = session.executeCommand(localFunctionNavToRequst).response as ts.server.protocol.NavtoItem[];
        assert.isTrue(containsNavToItem(items2, "foo", "function"), `Cannot find function symbol "foo".`);
    });

    it("should de-duplicate symbols", () => {
        const configFile1: File = {
            path: "/a/tsconfig.json",
            content: `{
    "compilerOptions": {
        "composite": true
    }
}`
        };
        const file1: File = {
            path: "/a/index.ts",
            content: "export const abcdef = 1;"
        };
        const configFile2: File = {
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
        const file2: File = {
            path: "/b/index.ts",
            content: `import a = require("../a");
export const ghijkl = a.abcdef;`
        };
        const host = createServerHost([configFile1, file1, configFile2, file2]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([file1, file2], session);

        const request = makeSessionRequest<ts.server.protocol.NavtoRequestArgs>(ts.server.CommandNames.Navto, { searchValue: "abcdef", file: file1.path });
        session.executeCommand(request).response as ts.server.protocol.NavtoItem[];

        baselineTsserverLogs("navTo", "should de-duplicate symbols", session);
    });

    it("should de-duplicate symbols when searching all projects", () => {
        const solutionConfig: File = {
            path: "/tsconfig.json",
            content: JSON.stringify({
                references: [{ path: "./a" }, { path: "./b" }],
                files: [],
            })
        };
        const configFile1: File = {
            path: "/a/tsconfig.json",
            content: `{
    "compilerOptions": {
        "composite": true
    }
}`
        };
        const file1: File = {
            path: "/a/index.ts",
            content: "export const abcdef = 1;"
        };
        const configFile2: File = {
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
        const file2: File = {
            path: "/b/index.ts",
            content: `import a = require("../a");
export const ghijkl = a.abcdef;`
        };
        const host = createServerHost([configFile1, file1, configFile2, file2, solutionConfig]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([file1], session);

        const request = makeSessionRequest<ts.server.protocol.NavtoRequestArgs>(ts.server.CommandNames.Navto, { searchValue: "abcdef" });
        session.executeCommand(request).response as ts.server.protocol.NavtoItem[];
        baselineTsserverLogs("navTo", "should de-duplicate symbols when searching all projects", session);
    });

    it("should work with Deprecated", () => {
        const file1: File = {
            path: "/a/b/file1.js",
            content: "/** @deprecated */\nfunction foo () {}"
        };
        const configFile: File = {
            path: "/a/b/jsconfig.json",
            content: "{}"
        };
        const host = createServerHost([file1, configFile, libFile]);
        const session = createSession(host);
        openFilesForSession([file1], session);

        // Try to find some interface type defined in lib.d.ts
        const libTypeNavToRequest = makeSessionRequest<ts.server.protocol.NavtoRequestArgs>(ts.server.CommandNames.Navto, { searchValue: "foo", file: file1.path, projectFileName: configFile.path });
        const items = session.executeCommand(libTypeNavToRequest).response as ts.server.protocol.NavtoItem[];
        const fooItem = findNavToItem(items, "foo", "function");
        assert.isNotNull(fooItem, `Cannot find function symbol "foo".`);
        assert.isTrue(fooItem?.kindModifiers?.includes("deprecated"));
    });
});
