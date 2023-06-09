import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    createSession,
    logInferredProjectsOrphanStatus,
    openFilesForSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: reload", () => {
    it("should work with temp file", () => {
        const f1 = {
            path: "/a/b/app.ts",
            content: "let x = 1"
        };
        const tmp = {
            path: "/a/b/app.tmp",
            content: "const y = 42"
        };
        const host = createServerHost([f1, tmp]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });

        // send open request
        openFilesForSession([f1], session);

        // reload from tmp file
        session.executeCommandSeq<ts.server.protocol.ReloadRequest>({
            command: ts.server.protocol.CommandTypes.Reload,
            arguments: { file: f1.path, tmpfile: tmp.path }
        });

        // verify content
        const projectService = session.getProjectService();
        const snap1 = projectService.getScriptInfo(f1.path)!.getSnapshot();
        session.logger.log(`Content of ${f1.path}:: ${ts.getSnapshotText(snap1)}`);

        // reload from original file file
        session.executeCommandSeq<ts.server.protocol.ReloadRequest>({
            command: ts.server.protocol.CommandTypes.Reload,
            arguments: { file: f1.path, tmpfile: undefined! }
        });

        // verify content
        const snap2 = projectService.getScriptInfo(f1.path)!.getSnapshot();
        session.logger.log(`Content of ${f1.path}:: ${ts.getSnapshotText(snap2)}`);
        baselineTsserverLogs("reload", "should work with temp file", session);
    });

    it("should work when script info doesnt have any project open", () => {
        const f1 = {
            path: "/a/b/app.ts",
            content: "let x = 1"
        };
        const tmp = {
            path: "/a/b/app.tmp",
            content: "const y = 42"
        };
        const host = createServerHost([f1, tmp, libFile]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        const openContent = "let z = 1";
        // send open request
        openFilesForSession([{ file: f1.path, content: openContent }], session);

        const projectService = session.getProjectService();
        const info = projectService.getScriptInfo(f1.path)!;
        assert.isDefined(info);
        checkScriptInfoContents("contents set during open request");

        // send close request
        closeFilesForSession([f1], session);
        checkScriptInfoAndProjects("contents of closed file");
        checkInferredProjectIsOrphan();

        // Can reload contents of the file when its not open and has no project
        // reload from temp file
        session.executeCommandSeq<ts.server.protocol.ReloadRequest>({
            command: ts.server.protocol.CommandTypes.Reload,
            arguments: { file: f1.path, tmpfile: tmp.path }
        });
        checkScriptInfoAndProjects("contents of temp file");
        checkInferredProjectIsOrphan();

        // reload from own file
        session.executeCommandSeq<ts.server.protocol.ReloadRequest>({
            command: ts.server.protocol.CommandTypes.Reload,
            arguments: { file: f1.path, tmpfile: undefined! }
        });
        checkScriptInfoAndProjects("contents of closed file");
        checkInferredProjectIsOrphan();

        // Open file again without setting its content
        openFilesForSession([f1], session);
        checkScriptInfoAndProjects("contents of file when opened without specifying contents");
        const snap = info.getSnapshot();

        // send close request
        closeFilesForSession([f1], session);
        checkScriptInfoAndProjects("contents of closed file");
        assert.strictEqual(info.getSnapshot(), snap);
        checkInferredProjectIsOrphan();

        // reload from temp file
        session.executeCommandSeq<ts.server.protocol.ReloadRequest>({
            command: ts.server.protocol.CommandTypes.Reload,
            arguments: { file: f1.path, tmpfile: tmp.path }
        });
        checkScriptInfoAndProjects("contents of temp file");
        assert.notStrictEqual(info.getSnapshot(), snap);
        checkInferredProjectIsOrphan();

        // reload from own file
        session.executeCommandSeq<ts.server.protocol.ReloadRequest>({
            command: ts.server.protocol.CommandTypes.Reload,
            arguments: { file: f1.path, tmpfile: undefined! }
        });
        checkScriptInfoAndProjects("contents of closed file");
        assert.notStrictEqual(info.getSnapshot(), snap);
        checkInferredProjectIsOrphan();
        baselineTsserverLogs("reload", "should work when script info doesnt have any project open", session);

        function checkInferredProjectIsOrphan() {
            logInferredProjectsOrphanStatus(projectService);
            session.logger.log(`info:: ${info.path}:: ${info.containingProjects.map(p => p.projectName).join(",")}`);
        }

        function checkScriptInfoAndProjects(captionForContents: string) {
            assert.strictEqual(projectService.getScriptInfo(f1.path), info);
            checkScriptInfoContents(captionForContents);
        }

        function checkScriptInfoContents(captionForContents: string) {
            const snap = info.getSnapshot();
            session.logger.log(`${captionForContents}:: Content of ${info.fileName}:: ${ts.getSnapshotText(snap)}`);
        }
    });
});
