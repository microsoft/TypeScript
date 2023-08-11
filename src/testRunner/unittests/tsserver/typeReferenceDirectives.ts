import * as ts from "../../_namespaces/ts";
import {
    dedent,
} from "../../_namespaces/Utils";
import {
    baselineTsserverLogs,
    createLoggerWithInMemoryLogs,
    createSession,
    openFilesForSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: typeReferenceDirectives::", () => {
    it("when typeReferenceDirective contains UpperCasePackage", () => {
        const libProjectLocation = `/user/username/projects/myproject/lib`;
        const typeLib: File = {
            path: `${libProjectLocation}/@types/UpperCasePackage/index.d.ts`,
            content: `declare class BrokenTest {
    constructor(name: string, width: number, height: number, onSelect: Function);
    Name: string;
    SelectedFile: string;
}`,
        };
        const appLib: File = {
            path: `${libProjectLocation}/@app/lib/index.d.ts`,
            content: `/// <reference types="UpperCasePackage" />
declare class TestLib {
    issue: BrokenTest;
    constructor();
    test(): void;
}`,
        };
        const testProjectLocation = `/user/username/projects/myproject/test`;
        const testFile: File = {
            path: `${testProjectLocation}/test.ts`,
            content: `class TestClass1 {

    constructor() {
        var l = new TestLib();

    }

    public test2() {
        var x = new BrokenTest('',0,0,null);

    }
}`,
        };
        const testConfig: File = {
            path: `${testProjectLocation}/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: {
                    module: "amd",
                    typeRoots: ["../lib/@types", "../lib/@app"],
                },
            }),
        };

        const files = [typeLib, appLib, testFile, testConfig, libFile];
        const host = createServerHost(files);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([testFile], session);
        host.writeFile(appLib.path, appLib.content.replace("test()", "test2()"));
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("typeReferenceDirectives", "when typeReferenceDirective contains UpperCasePackage", session);
    });

    it("when typeReferenceDirective is relative path and in a sibling folder", () => {
        const projectPath = `/user/username/projects/myproject/background`;
        const file: File = {
            path: `${projectPath}/a.ts`,
            content: "let x = 10;",
        };
        const tsconfig: File = {
            path: `${projectPath}/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: {
                    types: [
                        "../typedefs/filesystem",
                    ],
                },
            }),
        };
        const filesystem: File = {
            path: `/user/username/projects/myproject/typedefs/filesystem.d.ts`,
            content: `interface LocalFileSystem { someProperty: string; }`,
        };
        const files = [file, tsconfig, filesystem, libFile];
        const host = createServerHost(files);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([file], session);
        baselineTsserverLogs("typeReferenceDirectives", "when typeReferenceDirective is relative path and in a sibling folder", session);
    });

    it("typeReferenceDirective of shared auto type file in two projects with same options", () => {
        const host = createServerHost({
            "/users/username/projects/replay/axios-src/test/module/ts-require/index.js": dedent`
                export const a = 10;

            `,
            "/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts": dedent`
                export const x = 10;
            `,
            "/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts": dedent`
                /// <reference types="node" />
                export const z = 10;
            `,
            "/users/username/projects/replay/axios-src/test/module/ts/index.js": dedent`
                export const y = 10;
            `,
            "/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts": dedent`
                export const x = 10;
            `,
        });
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host), disableAutomaticTypingAcquisition: true });
        // This will add responselike/index.d.ts and resolve the type ref "node" to "test/module/ts-require/node_modules/@types/node/index.d.ts" because of current directory
        openFilesForSession(["/users/username/projects/replay/axios-src/test/module/ts-require/index.js"], session);
        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({ // Schedule update
            command: ts.server.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [{
                    fileName: "/users/username/projects/replay/axios-src/test/module/ts-require/index.js",
                    textChanges: [{
                        newText: "//comment",
                        start: { line: 2, offset: 1 },
                        end: { line: 2, offset: 1 },
                    }],
                }],
            },
        });
        // This will add responselike/index.d.ts - which is same sourceFile as from previous project and update the typeRef "node" to "test/module/ts/node_modules/@types/node/index.d.ts" because of current directory
        openFilesForSession(["/users/username/projects/replay/axios-src/test/module/ts/index.js"], session);
        const firstProjectSourceFile = session.getProjectService().inferredProjects[0].getCurrentProgram()!.getSourceFile("/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts");
        const secondProjectSourceFile = session.getProjectService().inferredProjects[1].getCurrentProgram()!.getSourceFile("/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts");
        assert.isTrue(firstProjectSourceFile !== secondProjectSourceFile, "Source file should not be same in both projects");
        // So when first project is updated as part of this command, it will get incorrect type ref resolution from the other project
        session.executeCommandSeq<ts.server.protocol.NavtoRequest>({
            command: ts.server.protocol.CommandTypes.Navto,
            arguments: {
                searchValue: "a",
                maxResultCount: 256,
            },
        });
        baselineTsserverLogs("typeReferenceDirectives", "typeReferenceDirective of shared auto type file in two projects with same options", session);
    });
});
