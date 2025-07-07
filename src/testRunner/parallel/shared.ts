import { TestRunnerKind } from "../_namespaces/Harness.js";
import * as ts from "../_namespaces/ts.js";

export interface RunnerTask {
    runner: TestRunnerKind;
    file: string;
    size: number;
}

export interface UnitTestTask {
    runner: "unittest";
    file: string;
    size: number;
}

export type Task = RunnerTask | UnitTestTask;

export interface TestInfo {
    name: string[];
}

export interface ErrorInfo {
    name: string[];
    error: string;
    stack: string;
}

export interface TaskTimeout {
    duration: number | "reset";
}

export interface TaskResult {
    passing: number;
    errors: ErrorInfo[];
    passes: TestInfo[];
    duration: number;
    task: Task;
}

export interface ParallelTestMessage {
    type: "test";
    payload: Task;
}

export interface ParallelBatchMessage {
    type: "batch";
    payload: Task[];
}

export interface ParallelCloseMessage {
    type: "close";
}

export type ParallelHostMessage = ParallelTestMessage | ParallelCloseMessage | ParallelBatchMessage;

export interface ParallelErrorMessage {
    type: "error";
    payload: { error: string; stack: string; name?: string[]; };
}

export interface ParallelResultMessage {
    type: "result";
    payload: TaskResult;
}

export interface ParallelBatchProgressMessage {
    type: "progress";
    payload: TaskResult;
}

export interface ParallelTimeoutChangeMessage {
    type: "timeout";
    payload: TaskTimeout;
}

export type ParallelClientMessage = ParallelErrorMessage | ParallelResultMessage | ParallelBatchProgressMessage | ParallelTimeoutChangeMessage;

export function shimNoopTestInterface(global: Mocha.MochaGlobals): void {
    global.before = ts.noop;
    global.after = ts.noop;
    global.beforeEach = ts.noop;
    global.afterEach = ts.noop;
    global.describe = global.context = ((_: any, __: any) => {/*empty*/}) as Mocha.SuiteFunction;
    global.describe.skip = global.xdescribe = global.xcontext = ts.noop as Mocha.PendingSuiteFunction;
    global.describe.only = ts.noop as Mocha.ExclusiveSuiteFunction;
    global.it = global.specify = ((_: any, __: any) => {/*empty*/}) as Mocha.TestFunction;
    global.it.skip = global.xit = global.xspecify = ts.noop as Mocha.PendingTestFunction;
    global.it.only = ts.noop as Mocha.ExclusiveTestFunction;
}
