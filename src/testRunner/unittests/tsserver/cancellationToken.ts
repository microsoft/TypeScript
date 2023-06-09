import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    createSession,
    TestServerCancellationToken,
    TestSessionRequest,
} from "../helpers/tsserver";
import { createServerHost } from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: cancellationToken", () => {
    // Disable sourcemap support for the duration of the test, as sourcemapping the errors generated during this test is slow and not something we care to test
    let oldPrepare: ts.AnyFunction;
    before(() => {
        oldPrepare = (Error as any).prepareStackTrace;
        delete (Error as any).prepareStackTrace;
    });

    after(() => {
        (Error as any).prepareStackTrace = oldPrepare;
    });

    it("is attached to request", () => {
        const f1 = {
            path: "/a/b/app.ts",
            content: "let xyz = 1;"
        };
        const host = createServerHost([f1]);
        const cancellationToken: ts.server.ServerCancellationToken = {
            isCancellationRequested: () => false,
            setRequest: requestId => session.logger.log(`ServerCancellationToken:: Cancellation Request id:: ${requestId}`),
            resetRequest: ts.noop
        };

        const session = createSession(host, { cancellationToken, logger: createLoggerWithInMemoryLogs(host) });

        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: { file: f1.path }
        });

        session.executeCommandSeq<ts.server.protocol.GeterrRequest>({
            command: ts.server.protocol.CommandTypes.Geterr,
            arguments: { files: [f1.path], delay: 0 }
        });

        session.executeCommandSeq<ts.server.protocol.DocumentHighlightsRequest>({
            command: ts.server.protocol.CommandTypes.DocumentHighlights,
            arguments: { file: f1.path, line: 1, offset: 6, filesToSearch: [f1.path] }
        });

        host.runQueuedTimeoutCallbacks();
        host.runQueuedImmediateCallbacks();
        host.runQueuedImmediateCallbacks();
        baselineTsserverLogs("cancellationT", "is attached to request", session);
    });

    it("Geterr is cancellable", () => {
        const f1 = {
            path: "/a/app.ts",
            content: "let x = 1"
        };
        const config = {
            path: "/a/tsconfig.json",
            content: JSON.stringify({
                compilerOptions: {}
            })
        };

        const host = createServerHost([f1, config]);
        const logger = createLoggerWithInMemoryLogs(host);
        const cancellationToken = new TestServerCancellationToken(logger);
        const session = createSession(host, {
            canUseEvents: true,
            eventHandler: ts.noop,
            cancellationToken,
            logger,
        });
        {
            session.executeCommandSeq<ts.server.protocol.OpenRequest>({
                command: ts.server.protocol.CommandTypes.Open,
                arguments: { file: f1.path }
            });
            // send geterr for missing file
            session.executeCommandSeq<ts.server.protocol.GeterrRequest>({
                command: ts.server.protocol.CommandTypes.Geterr,
                arguments: { files: ["/a/missing"], delay: 0 }
            });
            // Queued files
            host.runQueuedTimeoutCallbacks();
            // Completed event since file is missing
        }
        {
            const getErrId = session.getNextSeq();
            // send geterr for a valid file
            session.executeCommandSeq<ts.server.protocol.GeterrRequest>({
                command: ts.server.protocol.CommandTypes.Geterr,
                arguments: { files: [f1.path], delay: 0 }
            });

            // run new request
            session.executeCommandSeq<ts.server.protocol.ProjectInfoRequest>({
                command: ts.server.protocol.CommandTypes.ProjectInfo,
                arguments: { file: f1.path, needFileNameList: false }
            });

            // cancel previously issued Geterr
            cancellationToken.setRequestToCancel(getErrId);
            host.runQueuedTimeoutCallbacks();
            cancellationToken.resetToken();
        }
        {
            const getErrId = session.getNextSeq();
            session.executeCommandSeq<ts.server.protocol.GeterrRequest>({
                command: ts.server.protocol.CommandTypes.Geterr,
                arguments: { files: [f1.path], delay: 0 }
            });

            // run first step
            host.runQueuedTimeoutCallbacks();

            cancellationToken.setRequestToCancel(getErrId);
            host.runQueuedImmediateCallbacks();

            cancellationToken.resetToken();
        }
        {
            session.executeCommandSeq<ts.server.protocol.GeterrRequest>({
                command: ts.server.protocol.CommandTypes.Geterr,
                arguments: { files: [f1.path], delay: 0 }
            });
            // run first step
            host.runQueuedTimeoutCallbacks();
            // the semanticDiag message
            host.runQueuedImmediateCallbacks();
            host.runQueuedImmediateCallbacks();
            cancellationToken.resetToken();
        }
        {
            session.executeCommandSeq<ts.server.protocol.GeterrRequest>({
                command: ts.server.protocol.CommandTypes.Geterr,
                arguments: { files: [f1.path], delay: 0 }
            });
            // run first step
            host.runQueuedTimeoutCallbacks();
            session.executeCommandSeq<ts.server.protocol.GeterrRequest>({
                command: ts.server.protocol.CommandTypes.Geterr,
                arguments: { files: [f1.path], delay: 0 }
            });
            // make sure that getErr1 is completed
        }
        baselineTsserverLogs("cancellationT", "Geterr is cancellable", session);
    });

    it("Lower priority tasks are cancellable", () => {
        const f1 = {
            path: "/a/app.ts",
            content: `{ let x = 1; } var foo = "foo"; var bar = "bar"; var fooBar = "fooBar";`
        };
        const config = {
            path: "/a/tsconfig.json",
            content: JSON.stringify({
                compilerOptions: {}
            })
        };
        const host = createServerHost([f1, config]);
        const logger = createLoggerWithInMemoryLogs(host);
        const cancellationToken = new TestServerCancellationToken(logger, /*cancelAfterRequest*/ 3);
        const session = createSession(host, {
            canUseEvents: true,
            eventHandler: ts.noop,
            cancellationToken,
            throttleWaitMilliseconds: 0,
            logger,
        });
        {
            session.executeCommandSeq<ts.server.protocol.OpenRequest>({
                command: ts.server.protocol.CommandTypes.Open,
                arguments: { file: f1.path }
            });

            // send navbar request (normal priority)
            session.executeCommandSeq<ts.server.protocol.NavBarRequest>({
                command: ts.server.protocol.CommandTypes.NavBar,
                arguments: { file: f1.path }
            });

            // ensure the nav bar request can be canceled
            verifyExecuteCommandSeqIsCancellable<ts.server.protocol.NavBarRequest>({
                command: ts.server.protocol.CommandTypes.NavBar,
                arguments: { file: f1.path }
            });

            // send outlining spans request (normal priority)
            session.executeCommandSeq<ts.server.protocol.OutliningSpansRequestFull>({
                command: ts.server.protocol.CommandTypes.GetOutliningSpansFull,
                arguments: { file: f1.path }
            });

            // ensure the outlining spans request can be canceled
            verifyExecuteCommandSeqIsCancellable<ts.server.protocol.OutliningSpansRequestFull>({
                command: ts.server.protocol.CommandTypes.GetOutliningSpansFull,
                arguments: { file: f1.path }
            });
        }
        baselineTsserverLogs("cancellationT", "Lower priority tasks are cancellable", session);

        function verifyExecuteCommandSeqIsCancellable<T extends ts.server.protocol.Request>(request: TestSessionRequest<T>) {
            // Set the next request to be cancellable
            // The cancellation token will cancel the request the third time
            // isCancellationRequested() is called.
            cancellationToken.setRequestToCancel(session.getNextSeq());
            let operationCanceledExceptionThrown = false;

            try {
                session.executeCommandSeq(request);
            }
            catch (e) {
                session.logger.log(`Exception is OperationCanceledException: ${e instanceof ts.OperationCanceledException}`);
                operationCanceledExceptionThrown = true;
            }
            if (!operationCanceledExceptionThrown) session.logger.log("Operation Canceled Exception not thrown for request: " + JSON.stringify(request));
        }
    });
});
