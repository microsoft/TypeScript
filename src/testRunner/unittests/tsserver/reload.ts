import {
    createServerHost,
    libFile,
} from "../virtualFileSystemWithWatch";
import * as ts from "../../_namespaces/ts";
import {
    checkNumberOfProjects,
    createSession,
} from "./helpers";

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
        const session = createSession(host);

        // send open request
        session.executeCommand({
            type: "request",
            command: "open",
            seq: 1,
            arguments: { file: f1.path }
        } as ts.server.protocol.OpenRequest);

        // reload from tmp file
        session.executeCommand({
            type: "request",
            command: "reload",
            seq: 2,
            arguments: { file: f1.path, tmpfile: tmp.path }
        } as ts.server.protocol.ReloadRequest);

        // verify content
        const projectServiice = session.getProjectService();
        const snap1 = projectServiice.getScriptInfo(f1.path)!.getSnapshot();
        assert.equal(ts.getSnapshotText(snap1), tmp.content, "content should be equal to the content of temp file");

        // reload from original file file
        session.executeCommand({
            type: "request",
            command: "reload",
            seq: 2,
            arguments: { file: f1.path }
        } as ts.server.protocol.ReloadRequest);

        // verify content
        const snap2 = projectServiice.getScriptInfo(f1.path)!.getSnapshot();
        assert.equal(ts.getSnapshotText(snap2), f1.content, "content should be equal to the content of original file");

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
        const session = createSession(host);
        const openContent = "let z = 1";
        // send open request
        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: { file: f1.path, fileContent: openContent }
        } as ts.server.protocol.OpenRequest);

        const projectService = session.getProjectService();
        checkNumberOfProjects(projectService, { inferredProjects: 1 });
        const info = projectService.getScriptInfo(f1.path)!;
        assert.isDefined(info);
        checkScriptInfoContents(openContent, "contents set during open request");

        // send close request
        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.Close,
            arguments: { file: f1.path }
        } as ts.server.protocol.CloseRequest);
        checkScriptInfoAndProjects(f1.content, "contents of closed file");
        checkInferredProjectIsOrphan();

        // Can reload contents of the file when its not open and has no project
        // reload from temp file
        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.Reload,
            arguments: { file: f1.path, tmpfile: tmp.path }
        } as ts.server.protocol.ReloadRequest);
        checkScriptInfoAndProjects(tmp.content, "contents of temp file");
        checkInferredProjectIsOrphan();

        // reload from own file
        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.Reload,
            arguments: { file: f1.path }
        } as ts.server.protocol.ReloadRequest);
        checkScriptInfoAndProjects(f1.content, "contents of closed file");
        checkInferredProjectIsOrphan();

        // Open file again without setting its content
        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: { file: f1.path }
        } as ts.server.protocol.OpenRequest);
        checkScriptInfoAndProjects(f1.content, "contents of file when opened without specifying contents");
        const snap = info.getSnapshot();

        // send close request
        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.Close,
            arguments: { file: f1.path }
        } as ts.server.protocol.CloseRequest);
        checkScriptInfoAndProjects(f1.content, "contents of closed file");
        assert.strictEqual(info.getSnapshot(), snap);
        checkInferredProjectIsOrphan();

        // reload from temp file
        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.Reload,
            arguments: { file: f1.path, tmpfile: tmp.path }
        } as ts.server.protocol.ReloadRequest);
        checkScriptInfoAndProjects(tmp.content, "contents of temp file");
        assert.notStrictEqual(info.getSnapshot(), snap);
        checkInferredProjectIsOrphan();

        // reload from own file
        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.Reload,
            arguments: { file: f1.path }
        } as ts.server.protocol.ReloadRequest);
        checkScriptInfoAndProjects(f1.content, "contents of closed file");
        assert.notStrictEqual(info.getSnapshot(), snap);
        checkInferredProjectIsOrphan();

        function checkInferredProjectIsOrphan() {
            assert.isTrue(projectService.inferredProjects[0].isOrphan());
            assert.equal(info.containingProjects.length, 0);
        }

        function checkScriptInfoAndProjects(contentsOfInfo: string, captionForContents: string) {
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            assert.strictEqual(projectService.getScriptInfo(f1.path), info);
            checkScriptInfoContents(contentsOfInfo, captionForContents);
        }

        function checkScriptInfoContents(contentsOfInfo: string, captionForContents: string) {
            const snap = info.getSnapshot();
            assert.equal(ts.getSnapshotText(snap), contentsOfInfo, "content should be equal to " + captionForContents);
        }
    });
});
