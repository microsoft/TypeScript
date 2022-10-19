namespace Harness.Parallel.Worker {
export function start() {
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

    // Capitalization is aligned with the global `Mocha` namespace for typespace/namespace references.
    const Mocha = require("mocha") as typeof import("mocha");

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
            resetTimeout() {
                this.clearTimeout();
                if (this.timeout() > 0) {
                    sendMessage({ type: "timeout", payload: { duration: this.timeout() || 1e9 } });
                    this.timer = true;
                }
            }
            clearTimeout() {
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
            clone() {
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
        _createHook(title: string, fn?: Mocha.Func | Mocha.AsyncFunc) {
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
    function runTests(task: Harness.Parallel.Task, fn: (payload: Harness.Parallel.TaskResult) => void) {
        if (task.runner === "unittest") {
            return executeUnitTests(task, fn);
        }
        else {
            return runFileTests(task, fn);
        }
    }

    function executeUnitTests(task: Harness.Parallel.UnitTestTask, fn: (payload: Harness.Parallel.TaskResult) => void) {
        if (!unitTestSuiteMap && unitTestSuite.suites.length) {
            unitTestSuiteMap = new ts.Map<string, Mocha.Suite>();
            for (const suite of unitTestSuite.suites) {
                unitTestSuiteMap.set(suite.title, suite);
            }
        }
        if (!unitTestTestMap && unitTestSuite.tests.length) {
            unitTestTestMap = new ts.Map<string, Mocha.Test>();
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
        root.timeout(Harness.globalTimeout || 40_000);
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

    function runFileTests(task: Harness.Parallel.RunnerTask, fn: (result: Harness.Parallel.TaskResult) => void) {
        let instance = runners.get(task.runner);
        if (!instance) runners.set(task.runner, instance = Harness.createRunner(task.runner));
        instance.tests = [task.file];

        const suite = new Suite("", new Mocha.Context());
        suite.timeout(Harness.globalTimeout || 40_000);

        shimTestInterface(suite, global);
        instance.initializeTests();

        runSuite(task, suite, fn);
    }

    function runSuite(task: Harness.Parallel.Task, suite: Mocha.Suite, fn: (result: Harness.Parallel.TaskResult) => void) {
        const errors: Harness.Parallel.ErrorInfo[] = [];
        const passes: Harness.Parallel.TestInfo[] = [];
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
    function validateHostMessage(message: Harness.Parallel.ParallelHostMessage) {
        switch (message.type) {
            case "test": return validateTest(message.payload);
            case "batch": return validateBatch(message.payload);
            case "close": return true;
            default: return false;
        }
    }

    /**
     * Validates a test task is well formed.
     */
    function validateTest(task: Harness.Parallel.Task) {
        return !!task && !!task.runner && !!task.file;
    }

    /**
     * Validates a batch of test tasks are well formed.
     */
    function validateBatch(tasks: Harness.Parallel.Task[]) {
        return !!tasks && Array.isArray(tasks) && tasks.length > 0 && tasks.every(validateTest);
    }

    function processHostMessage(message: Harness.Parallel.ParallelHostMessage) {
        if (!validateHostMessage(message)) {
            console.log("Invalid message:", message);
            return;
        }

        switch (message.type) {
            case "test": return processTest(message.payload, /*last*/ true);
            case "batch": return processBatch(message.payload);
            case "close": return process.exit(0);
        }
    }

    function processTest(task: Harness.Parallel.Task, last: boolean, fn?: () => void) {
        runTests(task, payload => {
            sendMessage(last ? { type: "result", payload } : { type: "progress", payload });
            if (fn) fn();
        });
    }

    function processBatch(tasks: Harness.Parallel.Task[], fn?: () => void) {
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

    function sendMessage(message: Harness.Parallel.ParallelClientMessage) {
        process.send!(message);
    }

    // A cache of test harness Runner instances.
    const runners = new ts.Map<string, Harness.RunnerBase>();

    // The root suite for all unit tests.
    let unitTestSuite: Suite;
    let unitTestSuiteMap: ts.ESMap<string, Mocha.Suite>;
    // (Unit) Tests directly within the root suite
    let unitTestTestMap: ts.ESMap<string, Mocha.Test>;

    if (Harness.runUnitTests) {
        unitTestSuite = new Suite("", new Mocha.Context());
        unitTestSuite.timeout(Harness.globalTimeout || 40_000);
        shimTestInterface(unitTestSuite, global);
    }
    else {
        // ensure unit tests do not get run
        Harness.Parallel.shimNoopTestInterface(global);
    }

    process.on("message", processHostMessage);
}
}
