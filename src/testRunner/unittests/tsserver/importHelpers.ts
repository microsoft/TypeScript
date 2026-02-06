import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import {
    baselineTsserverLogs,
    openExternalProjectForSession,
    openFilesForSession,
    TestSession,
    toExternalFile,
} from "../helpers/tsserver.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: importHelpers::", () => {
    it("should not crash in tsserver", () => {
        const f1 = {
            path: "/user/username/projects/project/app.ts",
            content: "export async function foo() { return 100; }",
        };
        const tslib = {
            path: "/user/username/projects/project/node_modules/tslib/index.d.ts",
            content: "",
        };
        const host = TestServerHost.createServerHost([f1, tslib]);
        const session = new TestSession(host);
        openExternalProjectForSession({
            projectFileName: "p",
            rootFiles: [toExternalFile(f1.path)],
            options: { importHelpers: true },
        }, session);
        baselineTsserverLogs("importHelpers", "should not crash in tsserver", session);
    });

    it("import helpers sucessfully", () => {
        const type1 = {
            path: "/user/username/workspace/projects/project/type.ts",
            content: `
export type Foo {
    bar: number;
};`,
        };
        const file1 = {
            path: "/user/username/workspace/projects/project/file1.ts",
            content: `
import { Foo } from "./type";
const a: Foo = { bar : 1 };
a.bar;`,
        };
        const file2 = {
            path: "/user/username/workspace/projects/project/file2.ts",
            content: `
import { Foo } from "./type";
const a: Foo = { bar : 2 };
a.bar;`,
        };

        const config1 = {
            path: "/user/username/workspace/projects/project/tsconfig.json",
            content: jsonToReadableText({
                extends: "../tsconfig.json",
                compilerOptions: {
                    importHelpers: true,
                },
            }),
        };

        const file3 = {
            path: "/user/username/workspace/projects/file3.js",
            content: "console.log('noop');",
        };
        const config2 = {
            path: "/user/username/workspace/projects/tsconfig.json",
            content: jsonToReadableText({
                include: ["**/*"],
            }),
        };

        const host = TestServerHost.createServerHost([config2, config1, type1, file1, file2, file3]);
        const session = new TestSession(host);

        openFilesForSession([file3, file1], session);

        session.executeCommandSeq<ts.server.protocol.ReferencesRequest>({
            command: ts.server.protocol.CommandTypes.References,
            arguments: {
                file: file1.path,
                line: 4,
                offset: 3,
            },
        });

        baselineTsserverLogs("importHelpers", "import helpers successfully", session);
    });
});
