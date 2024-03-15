import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    TestSession,
    TestSessionConstructorOptions,
} from "../helpers/tsserver";
import {
    createServerHost,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: regionDiagnostics", () => {
    it("diagnostics for select nodes", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content:
`function foo(x: number, y: string): number {
    return x + y;
}



foo(10, 50);`
        }
        const host = createServerHost([file1]);
        const session = new RegionTestSession(host);

        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: { file: file1.path },
        });

        verifyGetErrRegionRequest({
            session,
            files: [{
                file: file1.path,
                ranges: [{ startLine: 6, startOffset: 1, endLine: 7, endOffset: 13 }]
            }],
        });

        baselineTsserverLogs("regionDiagnostics", "diagnostics for select nodes", session);
    });
});

interface VerifyGetErrRegionRequest {
    session: TestSession;
    files: ts.server.protocol.FileRangesRequestArgs[];
}

function verifyGetErrRegionRequest(request: VerifyGetErrRegionRequest): void {
    const { session, files } = request;

    session.executeCommandSeq<ts.server.protocol.GeterrRequest>({
        command: ts.server.protocol.CommandTypes.Geterr,
        arguments: {
            delay: 0,
            files
        },
    });

    session.host.runQueuedTimeoutCallbacks();
    for (let i = 0; i < 3; ++i) {
        session.host.runQueuedImmediateCallbacks();
    }
}

class RegionTestSession extends TestSession {
    constructor(optsOrHost: TestSessionConstructorOptions) {
        super(optsOrHost);
    }

    protected override shouldDoRegionCheck(file: ts.server.NormalizedPath): boolean {
        return true;
    }
}