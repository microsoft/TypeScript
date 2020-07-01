import { File } from "../../../harness/vfsUtil";
import { createSession, openFilesForSession, executeSessionRequest, protocol } from "./helpers";
import { createServerHost } from "../../../../built/local/harness";
import { assert } from "console";

    describe("unittests:: tsserver:: getApplicableRefactors", () => {
        it("works when taking position", () => {
            const aTs: File = { path: "/a.ts", content: "" };
            const session = createSession(createServerHost([aTs]));
            openFilesForSession([aTs], session);
            const response = executeSessionRequest<protocol.GetApplicableRefactorsRequest, protocol.GetApplicableRefactorsResponse>(
                session, protocol.CommandTypes.GetApplicableRefactors, { file: aTs.path, line: 1, offset: 1 });
            assert.deepEqual<readonly protocol.ApplicableRefactorInfo[] | undefined>(response, []);
        });
    });

