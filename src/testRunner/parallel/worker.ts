import Mocha from "mocha";
import {
    createRunner,
    globalTimeout,
    RunnerBase,
    runUnitTests,
} from "../_namespaces/Harness.js";
import {
    ErrorInfo,
    ParallelClientMessage,
    ParallelHostMessage,
    RunnerTask,
    shimNoopTestInterface,
    Task,
    TaskResult,
    TestInfo,
    UnitTestTask,
} from "../_namespaces/Harness.Parallel.js";

export function start(importTests: () => Promise<unknown>): void {
    // This brings in the tests after we finish setting things up and yield to the event loop.
    const importTestsPromise = importTests();

    function hookUncaughtExceptions() {
        if (!exceptionsHooked) {
            process.on("uncaughtException", handleUncaughtException);
            process.on("unhandledRejection", handleUncaughtException);
            exceptionsHooked = true;
        }
    }

    function unhookUncaughtExceptions() {
        if (exceptionsHooked) {
            process.removeListener("uncaughtException", handleUncaughtException);
            process.removeListener("unhandledRejection", handleUncaughtException);
            exceptionsHooked = false;
        }
    }

    let exceptionsHooked = false;
    hookUncaughtExceptions();

    /**
     * Mixin helper.
     * @param base The base class constructor.
     * @param mixins The mixins to apply to the constructor.
     */
    function mixin<T extends new (...args: any[]) => any>(base: T, ...mixins: ((klass: T) => T)[]) {
        for (const mixin of mixins) {
            base = mixin(base);
        }
        return base;
    }

    /**
     * Mixes in overrides for `resetTimeout` and `clearTimeout` to support parallel test execution in a worker.
     */
    function Timeout<T extends typeof Mocha.Runnable>(base: T) {
        return class extends (base as typeof Mocha.Runnable) {
            override resetTimeout() {
                this.clearTimeout();
                if (this.timeout() > 0) {
                    sendMessage({ type: "timeout", payload: { duration: this.timeout() || 1e9 } });
                    this.timer = true;
                }
            }
            override clearTimeout() {
                if (this.timer) {
                    sendMessage({ type: "timeout", payload: { duration: "reset" } });
                    this.timer = false;
                }
            }
        } as T;
    }

    /**
     * Mixes in an override for `clone` to support parallel test execution in a worker.
     */
    function Clone<T extends typeof Mocha.Suite | typeof Mocha.Test>(base: T) {
        return class extends (base as new (...args: any[]) => { clone(): any; }) {
            override clone() {
                const cloned = super.clone();
                Object.setPrototypeOf(cloned, this.constructor.prototype);
                return cloned;
            }
        } as T;
    }

    /**
     * A `Mocha.Suite` subclass to support parallel test execution in a worker.
     */
    class Suite extends mixin(Mocha.Suite, Clone) {
        override _createHook(title: string, fn?: Mocha.Func | Mocha.AsyncFunc) {
            const hook = super._createHook(title, fn);
            Object.setPrototypeOf(hook, Hook.prototype);
            return hook;
        }
    }

    /**
     * A `Mocha.Hook` subclass to support parallel test execution in a worker.
     */
    class Hook extends mixin(Mocha.Hook, Timeout) {
    }

    /**
     * A `Mocha.Test` subclass to support parallel test execution in a worker.
     */
    class Test extends mixin(Mocha.Test, Timeout, Clone) {
    }

    /**
     * Shims a 'bdd'-style test interface to support parallel test execution in a worker.
     * @param rootSuite The root suite.
     * @param context The test context (usually the NodeJS `global` object).
     */
    function shimTestInterface(rootSuite: Mocha.Suite, context: Mocha.MochaGlobals) {
        const suites = [rootSuite];
        context.before = (title: string | Mocha.Func | Mocha.AsyncFunc, fn?: Mocha.Func | Mocha.AsyncFunc) => suites[0].beforeAll(title as string, fn);
        context.after = (title: string | Mocha.Func | Mocha.AsyncFunc, fn?: Mocha.Func | Mocha.AsyncFunc) => suites[0].afterAll(title as string, fn);
        context.beforeEach = (title: string | Mocha.Func | Mocha.AsyncFunc, fn?: Mocha.Func | Mocha.AsyncFunc) => suites[0].beforeEach(title as string, fn);
        context.afterEach = (title: string | Mocha.Func | Mocha.AsyncFunc, fn?: Mocha.Func | Mocha.AsyncFunc) => suites[0].afterEach(title as string, fn);
        context.describe = context.context = ((title: string, fn: (this: Mocha.Suite) => void) => addSuite(title, fn)) as Mocha.SuiteFunction;
        context.describe.skip = context.xdescribe = context.xcontext = (title: string) => addSuite(title, /*fn*/ undefined);
        context.describe.only = (title: string, fn?: (this: Mocha.Suite) => void) => addSuite(title, fn);
        context.it = context.specify = ((title: string | Mocha.Func | Mocha.AsyncFunc, fn?: Mocha.Func | Mocha.AsyncFunc) => addTest(title, fn)) as Mocha.TestFunction;
        context.it.skip = context.xit = context.xspecify = (title: string | Mocha.Func | Mocha.AsyncFunc) => addTest(typeof title === "function" ? title.name : title, /*fn*/ undefined);
        context.it.only = (title: string | Mocha.Func | Mocha.AsyncFunc, fn?: Mocha.Func | Mocha.AsyncFunc) => addTest(title, fn);

        function addSuite(title: string, fn: ((this: Mocha.Suite) => void) | undefined): Mocha.Suite {
            const suite = new Suite(title, suites[0].ctx);
            suites[0].addSuite(suite);
            suite.pending = !fn;
            suites.unshift(suite);
            if (fn) {
                fn.call(suite);
            }
            suites.shift();
            return suite;
        }

        function addTest(title: string | Mocha.Func | Mocha.AsyncFunc, fn: Mocha.Func | Mocha.AsyncFunc | undefined): Mocha.Test {
            if (typeof title === "function") {
                fn = title;
                title = fn.name;
            }
            const test = new Test(title, suites[0].pending ? undefined : fn);
            suites[0].addTest(test);
            return test;
        }
    }

    /**
     * Run the tests in the requested task.
     */
    function runTests(task: Task, fn: (payload: TaskResult) => void) {
        if (task.runner === "unittest") {
            return executeUnitTests(task, fn);
        }
        else {
            return runFileTests(task, fn);
        }
    }

    function executeUnitTests(task: UnitTestTask, fn: (payload: TaskResult) => void) {
        if (!unitTestSuiteMap && unitTestSuite.suites.length) {
            unitTestSuiteMap = new Map<string, Mocha.Suite>();
            for (const suite of unitTestSuite.suites) {
                unitTestSuiteMap.set(suite.title, suite);
            }
        }
        if (!unitTestTestMap && unitTestSuite.tests.length) {
            unitTestTestMap = new Map<string, Mocha.Test>();
            for (const test of unitTestSuite.tests) {
                unitTestTestMap.set(test.title, test);
            }
        }

        if (!unitTestSuiteMap && !unitTestTestMap) {
            throw new Error(`Asked to run unit test ${task.file}, but no unit tests were discovered!`);
        }

        let suite = unitTestSuiteMap.get(task.file);
        const test = unitTestTestMap.get(task.file);
        if (!suite && !test) {
            throw new Error(`Unit test with name "${task.file}" was asked to be run, but such a test does not exist!`);
        }

        const root = new Suite("", new Mocha.Context());
        root.timeout(globalTimeout || 40_000);
        if (suite) {
            root.addSuite(suite);
            Object.setPrototypeOf(suite.ctx, root.ctx);
        }
        else if (test) {
            const newSuite = new Suite("", new Mocha.Context());
            newSuite.addTest(test);
            root.addSuite(newSuite);
            Object.setPrototypeOf(newSuite.ctx, root.ctx);
            Object.setPrototypeOf(test.ctx, root.ctx);
            test.parent = newSuite;
            suite = newSuite;
        }

        runSuite(task, suite!, payload => {
            suite!.parent = unitTestSuite;
            Object.setPrototypeOf(suite!.ctx, unitTestSuite.ctx);
            fn(payload);
        });
    }

    function runFileTests(task: RunnerTask, fn: (result: TaskResult) => void) {
        let instance = runners.get(task.runner);
        if (!instance) runners.set(task.runner, instance = createRunner(task.runner));
        instance.tests = [task.file];

        const suite = new Suite("", new Mocha.Context());
        suite.timeout(globalTimeout || 40_000);

        shimTestInterface(suite, global);
        instance.initializeTests();

        runSuite(task, suite, fn);
    }

    function runSuite(task: Task, suite: Mocha.Suite, fn: (result: TaskResult) => void) {
        const errors: ErrorInfo[] = [];
        const passes: TestInfo[] = [];
        const start = +new Date();
        const runner = new Mocha.Runner(suite, { delay: false });

        runner
            .on("start", () => {
                unhookUncaughtExceptions(); // turn off global uncaught handling
            })
            .on("pass", (test: Mocha.Test) => {
                passes.push({ name: test.titlePath() });
            })
            .on("fail", (test: Mocha.Test | Mocha.Hook, err: any) => {
                errors.push({ name: test.titlePath(), error: err.message, stack: err.stack });
            })
            .on("end", () => {
                hookUncaughtExceptions();
                runner.dispose();
            })
            .run(() => {
                fn({ task, errors, passes, passing: passes.length, duration: +new Date() - start });
            });
    }

    /**
     * Validates a message received from the host is well-formed.
     */
    function validateHostMessage(message: ParallelHostMessage) {
        switch (message.type) {
            case "test":
                return validateTest(message.payload);
            case "batch":
                return validateBatch(message.payload);
            case "close":
                return true;
            default:
                return false;
        }
    }

    /**
     * Validates a test task is well formed.
     */
    function validateTest(task: Task) {
        return !!task && !!task.runner && !!task.file;
    }

    /**
     * Validates a batch of test tasks are well formed.
     */
    function validateBatch(tasks: Task[]) {
        return !!tasks && Array.isArray(tasks) && tasks.length > 0 && tasks.every(validateTest);
    }

    async function processHostMessage(message: ParallelHostMessage) {
        await importTestsPromise;

        if (!validateHostMessage(message)) {
            console.log("Invalid message:", message);
            return;
        }

        switch (message.type) {
            case "test":
                return processTest(message.payload, /*last*/ true);
            case "batch":
                return processBatch(message.payload);
            case "close":
                return process.exit(0);
        }
    }

    function processTest(task: Task, last: boolean, fn?: () => void) {
        runTests(task, payload => {
            sendMessage(last ? { type: "result", payload } : { type: "progress", payload });
            if (fn) fn();
        });
    }

    function processBatch(tasks: Task[], fn?: () => void) {
        const next = () => {
            const task = tasks.shift();
            if (task) return processTest(task, tasks.length === 0, next);
            if (fn) fn();
        };
        next();
    }

    function handleUncaughtException(err: any) {
        const error = err instanceof Error ? err : new Error("" + err);
        sendMessage({ type: "error", payload: { error: error.message, stack: error.stack! } });
    }

    function sendMessage(message: ParallelClientMessage) {
        process.send!(message);
    }

    // A cache of test harness Runner instances.
    const runners = new Map<string, RunnerBase>();

    // The root suite for all unit tests.
    let unitTestSuite: Suite;
    let unitTestSuiteMap: Map<string, Mocha.Suite>;
    // (Unit) Tests directly within the root suite
    let unitTestTestMap: Map<string, Mocha.Test>;

    if (runUnitTests) {
        unitTestSuite = new Suite("", new Mocha.Context());
        unitTestSuite.timeout(globalTimeout || 40_000);
        shimTestInterface(unitTestSuite, global);
    }
    else {
        // ensure unit tests do not get run
        shimNoopTestInterface(global);
    }

    process.on("message", processHostMessage);
}
