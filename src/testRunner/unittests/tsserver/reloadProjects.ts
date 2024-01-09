import * as ts from "../../_namespaces/ts";
import {
    jsonToReadableText,
} from "../helpers";
import {
    baselineTsserverLogs,
    openExternalProjectForSession,
    openFilesForSession,
    setCompilerOptionsForInferredProjectsRequestForSession,
    TestSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: reloadProjects", () => {
    const configFile: File = {
        path: `/user/username/projects/myproject/tsconfig.json`,
        content: jsonToReadableText({
            watchOptions: { excludeDirectories: ["node_modules"] },
        }),
    };
    const file1: File = {
        path: `/user/username/projects/myproject/file1.ts`,
        content: `import { foo } from "module1";
                foo();
                import { bar } from "./file2";
                bar();`,
    };
    const file2: File = {
        path: `/user/username/projects/myproject/file2.ts`,
        content: `export function bar(){}`,
    };
    const moduleFile: File = {
        path: `/user/username/projects/myproject/node_modules/module1/index.d.ts`,
        content: `export function foo(): string;`,
    };

    function verifyFileUpdates(host: TestServerHost, session: TestSession) {
        // update file
        const updatedText = `${file2.content}
            bar();`;
        host.writeFile(file2.path, updatedText);
        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.ReloadProjects,
        });

        // delete file
        host.deleteFile(file2.path);
        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.ReloadProjects,
        });
    }

    it("configured project", () => {
        const host = createServerHost([configFile, libFile, file1, file2]);
        const session = new TestSession(host);
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { watchOptions: { excludeFiles: [file2.path] } },
        });
        openFilesForSession([file1], session);

        // Install module1
        host.ensureFileOrFolder(moduleFile);

        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.ReloadProjects,
        });

        verifyFileUpdates(host, session);
        baselineTsserverLogs("reloadProjects", "configured project", session);
    });

    it("inferred project", () => {
        const host = createServerHost([libFile, file1, file2]);
        const session = new TestSession({ host, useInferredProjectPerProjectRoot: true });
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { watchOptions: { excludeFiles: [file2.path] } },
        });
        const timeoutId = host.getNextTimeoutId();
        setCompilerOptionsForInferredProjectsRequestForSession({
            options: { excludeDirectories: ["node_modules"] },
            projectRootPath: "/user/username/projects/myproject",
        }, session);
        host.clearTimeout(timeoutId);
        openFilesForSession([{ file: file1.path, projectRootPath: "/user/username/projects/myproject" }], session);

        // Install module1
        host.ensureFileOrFolder(moduleFile);

        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.ReloadProjects,
        });

        verifyFileUpdates(host, session);
        baselineTsserverLogs("reloadProjects", "inferred project", session);
    });

    it("external project", () => {
        const host = createServerHost([libFile, file1, file2]);
        const session = new TestSession(host);
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { watchOptions: { excludeFiles: [file2.path] } },
        });
        openExternalProjectForSession({
            projectFileName: `/user/username/projects/myproject/project.sln`,
            options: { excludeDirectories: ["node_modules"] },
            rootFiles: [{ fileName: file1.path }, { fileName: file2.path }],
        }, session);
        openFilesForSession([file1], session);

        // Install module1
        host.ensureFileOrFolder(moduleFile);

        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.ReloadProjects,
        });

        verifyFileUpdates(host, session);
        baselineTsserverLogs("reloadProjects", "external project", session);
    });

    it("external project with config file", () => {
        const host = createServerHost([libFile, file1, file2, configFile]);
        const session = new TestSession(host);
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { watchOptions: { excludeFiles: [file2.path] } },
        });
        openExternalProjectForSession({
            projectFileName: `/user/username/projects/myproject/project.sln`,
            options: { excludeDirectories: ["node_modules"] },
            rootFiles: [{ fileName: file1.path }, { fileName: file2.path }, { fileName: configFile.path }],
        }, session);
        openFilesForSession([file1], session);

        // Install module1
        host.ensureFileOrFolder(moduleFile);

        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.ReloadProjects,
        });

        verifyFileUpdates(host, session);
        baselineTsserverLogs("reloadProjects", "external project with config file", session);
    });
});
