/// <reference path="./host.ts" />
/// <reference path="./worker.ts" />
namespace Harness.Parallel {
    export type ParallelTestMessage = { type: "test", payload: { runner: TestRunnerKind | "unittest", file: string } } | never;
    export type ParallelBatchMessage = { type: "batch", payload: ParallelTestMessage["payload"][] } | never;
    export type ParallelCloseMessage = { type: "close" } | never;
    export type ParallelHostMessage = ParallelTestMessage | ParallelCloseMessage | ParallelBatchMessage;

    export type ParallelErrorMessage = { type: "error", payload: { error: string, stack: string, name?: string[] } } | never;
    export type ErrorInfo = ParallelErrorMessage["payload"] & { name: string[] };
    export type ParallelResultMessage = { type: "result", payload: { passing: number, errors: ErrorInfo[], duration: number, runner: TestRunnerKind | "unittest", file: string } } | never;
    export type ParallelBatchProgressMessage = { type: "progress", payload: ParallelResultMessage["payload"] } | never;
    export type ParallelTimeoutChangeMessage = { type: "timeout", payload: { duration: number | "reset" } } | never;
    export type ParallelClientMessage = ParallelErrorMessage | ParallelResultMessage | ParallelBatchProgressMessage | ParallelTimeoutChangeMessage;
}