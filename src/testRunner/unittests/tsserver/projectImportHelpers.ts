import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver.js";
import { createServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: projectImportHelpers::", () => {
    it("import helpers sucessfully", () => {
        const type1 = {
            path: "/a/type.ts",
            content: `
export type Foo {
    bar: number;
};`,
        };
        const file1 = {
            path: "/a/file1.ts",
            content: `
import { Foo } from "./type";
const a: Foo = { bar : 1 };
a.bar;`,
        };
        const file2 = {
            path: "/a/file2.ts",
            content: `
import { Foo } from "./type";
const a: Foo = { bar : 2 };
a.bar;`,
        };

        const config1 = {
            path: "/a/tsconfig.json",
            content: jsonToReadableText({
                extends: "../tsconfig.json",
                compilerOptions: {
                    importHelpers: true,
                },
            }),
        };

        const file3 = {
            path: "/file3.js",
            content: "console.log('noop');",
        };
        const config2 = {
            path: "/tsconfig.json",
            content: jsonToReadableText({
                include: ["**/*"],
            }),
        };

        const host = createServerHost([config2, config1, type1, file1, file2, file3]);
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
