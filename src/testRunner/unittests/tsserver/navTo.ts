import * as ts from "../../_namespaces/ts";
import {
    jsonToReadableText,
} from "../helpers";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: navigate-to for javascript project", () => {
    it("should not include type symbols", () => {
        const file1: File = {
            path: "/a/b/file1.js",
            content: "function foo() {}",
        };
        const configFile: File = {
            path: "/a/b/jsconfig.json",
            content: "{}",
        };
        const host = createServerHost([file1, configFile, libFile]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);

        // Try to find some interface type defined in lib.d.ts
        session.executeCommandSeq<ts.server.protocol.NavtoRequest>({
            command: ts.server.protocol.CommandTypes.Navto,
            arguments: { searchValue: "Document", file: file1.path, projectFileName: configFile.path },
        }).response as ts.server.protocol.NavtoItem[];

        session.executeCommandSeq<ts.server.protocol.NavtoRequest>({
            command: ts.server.protocol.CommandTypes.Navto,
            arguments: { searchValue: "foo", file: file1.path, projectFileName: configFile.path },
        }).response as ts.server.protocol.NavtoItem[];
        baselineTsserverLogs("navTo", "should not include type symbols", session);
    });

    it("should de-duplicate symbols", () => {
        const configFile1: File = {
            path: "/a/tsconfig.json",
            content: `{
    "compilerOptions": {
        "composite": true
    }
}`,
        };
        const file1: File = {
            path: "/a/index.ts",
            content: "export const abcdef = 1;",
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
}`,
        };
        const file2: File = {
            path: "/b/index.ts",
            content: `import a = require("../a");
export const ghijkl = a.abcdef;`,
        };
        const host = createServerHost([configFile1, file1, configFile2, file2]);
        const session = new TestSession(host);
        openFilesForSession([file1, file2], session);

        session.executeCommandSeq<ts.server.protocol.NavtoRequest>({
            command: ts.server.protocol.CommandTypes.Navto,
            arguments: { searchValue: "abcdef", file: file1.path },
        });

        baselineTsserverLogs("navTo", "should de-duplicate symbols", session);
    });

    it("should de-duplicate symbols when searching all projects", () => {
        const solutionConfig: File = {
            path: "/tsconfig.json",
            content: jsonToReadableText({
                references: [{ path: "./a" }, { path: "./b" }],
                files: [],
            }),
        };
        const configFile1: File = {
            path: "/a/tsconfig.json",
            content: `{
    "compilerOptions": {
        "composite": true
    }
}`,
        };
        const file1: File = {
            path: "/a/index.ts",
            content: "export const abcdef = 1;",
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
}`,
        };
        const file2: File = {
            path: "/b/index.ts",
            content: `import a = require("../a");
export const ghijkl = a.abcdef;`,
        };
        const host = createServerHost([configFile1, file1, configFile2, file2, solutionConfig]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);

        session.executeCommandSeq<ts.server.protocol.NavtoRequest>({
            command: ts.server.protocol.CommandTypes.Navto,
            arguments: { searchValue: "abcdef" },
        });
        baselineTsserverLogs("navTo", "should de-duplicate symbols when searching all projects", session);
    });

    it("should work with Deprecated", () => {
        const file1: File = {
            path: "/a/b/file1.js",
            content: "/** @deprecated */\nfunction foo () {}",
        };
        const configFile: File = {
            path: "/a/b/jsconfig.json",
            content: "{}",
        };
        const host = createServerHost([file1, configFile, libFile]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);

        // Try to find some interface type defined in lib.d.ts
        session.executeCommandSeq<ts.server.protocol.NavtoRequest>({
            command: ts.server.protocol.CommandTypes.Navto,
            arguments: { searchValue: "foo", file: file1.path, projectFileName: configFile.path },
        });
        baselineTsserverLogs("navTo", "should work with Deprecated", session);
    });
});
