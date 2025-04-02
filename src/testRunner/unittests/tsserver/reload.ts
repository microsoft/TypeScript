import * as ts from "../../_namespaces/ts.js";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: reload::", () => {
    it("should work with temp file", () => {
        const f1 = {
            path: "/home/src/projects/project/app.ts",
            content: "let x = 1",
        };
        const tmp = {
            path: "/home/src/projects/project/app.tmp",
            content: "const y = 42",
        };
        const host = TestServerHost.createServerHost([f1, tmp]);
        const session = new TestSession(host);

        // send open request
        openFilesForSession([f1], session);

        // reload from tmp file
        session.executeCommandSeq<ts.server.protocol.ReloadRequest>({
            command: ts.server.protocol.CommandTypes.Reload,
            arguments: { file: f1.path, tmpfile: tmp.path },
        });

        // verify content
        const snap1 = session.getProjectService().getScriptInfo(f1.path)!.getSnapshot();
        session.logger.log(`Content of ${f1.path}:: ${ts.getSnapshotText(snap1)}`);

        // reload from original file file
        session.executeCommandSeq<ts.server.protocol.ReloadRequest>({
            command: ts.server.protocol.CommandTypes.Reload,
            arguments: { file: f1.path, tmpfile: undefined! },
        });

        // verify content
        const snap2 = session.getProjectService().getScriptInfo(f1.path)!.getSnapshot();
        session.logger.log(`Content of ${f1.path}:: ${ts.getSnapshotText(snap2)}`);
        baselineTsserverLogs("reload", "should work with temp file", session);
    });

    it("should work when script info doesnt have any project open", () => {
        const f1 = {
            path: "/home/src/projects/project/app.ts",
            content: "let x = 1",
        };
        const tmp = {
            path: "/home/src/projects/project/app.tmp",
            content: "const y = 42",
        };
        const host = TestServerHost.createServerHost([f1, tmp]);
        const session = new TestSession(host);
        const openContent = "let z = 1";
        // send open request
        openFilesForSession([{ file: f1.path, content: openContent }], session);

        const info = session.getProjectService().getScriptInfo(f1.path)!;
        assert.isDefined(info);
        checkScriptInfoContents("contents set during open request");

        // send close request
        closeFilesForSession([f1], session);
        checkScriptInfoAndProjects("contents of closed file");

        // Can reload contents of the file when its not open and has no project
        // reload from temp file
        session.executeCommandSeq<ts.server.protocol.ReloadRequest>({
            command: ts.server.protocol.CommandTypes.Reload,
            arguments: { file: f1.path, tmpfile: tmp.path },
        });
        checkScriptInfoAndProjects("contents of temp file");

        // reload from own file
        session.executeCommandSeq<ts.server.protocol.ReloadRequest>({
            command: ts.server.protocol.CommandTypes.Reload,
            arguments: { file: f1.path, tmpfile: undefined! },
        });
        checkScriptInfoAndProjects("contents of closed file");

        // Open file again without setting its content
        openFilesForSession([f1], session);
        checkScriptInfoAndProjects("contents of file when opened without specifying contents");
        const snap = info.getSnapshot();

        // send close request
        closeFilesForSession([f1], session);
        checkScriptInfoAndProjects("contents of closed file");
        assert.strictEqual(info.getSnapshot(), snap);

        // reload from temp file
        session.executeCommandSeq<ts.server.protocol.ReloadRequest>({
            command: ts.server.protocol.CommandTypes.Reload,
            arguments: { file: f1.path, tmpfile: tmp.path },
        });
        checkScriptInfoAndProjects("contents of temp file");
        assert.notStrictEqual(info.getSnapshot(), snap);

        // reload from own file
        session.executeCommandSeq<ts.server.protocol.ReloadRequest>({
            command: ts.server.protocol.CommandTypes.Reload,
            arguments: { file: f1.path, tmpfile: undefined! },
        });
        checkScriptInfoAndProjects("contents of closed file");
        assert.notStrictEqual(info.getSnapshot(), snap);
        baselineTsserverLogs("reload", "should work when script info doesnt have any project open", session);

        function checkScriptInfoAndProjects(captionForContents: string) {
            assert.strictEqual(session.getProjectService().getScriptInfo(f1.path), info);
            checkScriptInfoContents(captionForContents);
        }

        function checkScriptInfoContents(captionForContents: string) {
            const snap = info.getSnapshot();
            session.logger.log(`${captionForContents}:: Content of ${info.fileName}:: ${ts.getSnapshotText(snap)}`);
        }
    });
});
