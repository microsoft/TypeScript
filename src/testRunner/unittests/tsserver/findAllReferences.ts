import { protocol } from "../../_namespaces/ts.server.js";
import {
    baselineTsserverLogs,
    TestSession,
} from "../helpers/tsserver.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: services:: findAllReferences::", () => {
    it("does not try to open a file in a project that was updated and no longer has the file", () => {
        const files: File[] = [
            {
                path: "/home/src/projects/project/packages/babel-loader/tsconfig.json",
                content: `
{
    "compilerOptions": {
        "target": "ES2018",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "composite": true,
        "rootDir": "src",
        "outDir": "dist"
    },
    "include": ["src"],
    "references": [{"path": "../core"}]
}
`,
            },
            {
                path: "/home/src/projects/project/packages/babel-loader/src/index.ts",
                content: `
import type { Foo } from "../../core/src/index.js";
`,
            },
            {
                path: "/home/src/projects/project/packages/core/tsconfig.json",
                content: `
{
    "compilerOptions": {
        "target": "ES2018",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "composite": true,
        "rootDir": "./src",
        "outDir": "./dist",
    },
    "include": ["./src"]
}
`,
            },
            {
                path: "/home/src/projects/project/packages/core/src/index.ts",
                content: `
import { Bar } from "./loading-indicator.js";
export type Foo = {};
const bar: Bar = {
    prop: 0
}
`,
            },
            {
                path: "/home/src/projects/project/packages/core/src/loading-indicator.ts",
                content: `
export interface Bar {
    prop: number;
}
const bar: Bar = {
    prop: 1
}
`,
            },
        ];
        const host = TestServerHost.createServerHost(files);
        const session = new TestSession(host);
        // Open files in the two configured projects
        session.executeCommandSeq<protocol.UpdateOpenRequest>({
            command: protocol.CommandTypes.UpdateOpen,
            arguments: {
                openFiles: [
                    {
                        file: files[1].path, // babel-loader/src/index.ts
                        fileContent: files[1].content,
                    },
                ],
            },
        });
        session.executeCommandSeq<protocol.UpdateOpenRequest>({
            command: protocol.CommandTypes.UpdateOpen,
            arguments: {
                openFiles: [
                    {
                        file: files[3].path, // core/src/index.ts
                        fileContent: files[3].content,
                    },
                ],
            },
        });
        // Now change `babel-loader` project to no longer import `core` project
        session.executeCommandSeq<protocol.UpdateOpenRequest>({
            command: protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [
                    {
                        fileName: files[1].path,
                        textChanges: [
                            {
                                start: {
                                    line: 1,
                                    offset: 26,
                                },
                                end: {
                                    line: 1,
                                    offset: 26,
                                },
                                newText: "// comment",
                            },
                        ],
                    },
                ],
            },
        });
        const loadingIndicatorScriptInfo = session.getProjectService().getScriptInfo(files[3].path)!;
        // At this point, we haven't updated `babel-loader` project yet,
        // so `babel-loader` is still a containing project of `loading-indicator` file.
        assert(loadingIndicatorScriptInfo.containingProjects.find(p => p.projectName === "/home/src/projects/project/packages/babel-loader/tsconfig.json"));
        // When calling find all references,
        // we shouldn't crash due to using outdated information on a file's containig projects.
        session.executeCommandSeq<protocol.ReferencesRequest>({
            command: protocol.CommandTypes.References,
            arguments: {
                file: files[3].path, // core/src/index.ts
                line: 5, // `prop`
                offset: 5,
            },
        });
        baselineTsserverLogs("findAllReferences", "does not try to open a file in a project that was updated and no longer has the file", session);
    });
});
