namespace Harness.Parallel.Worker {
    let errors: ErrorInfo[] = [];
    let passes: TestInfo[] = [];
    let passing = 0;

    type MochaCallback = (this: Mocha.ISuiteCallbackContext, done: MochaDone) => void;
    type Callable = () => void;

    type Executor = {name: string, callback: MochaCallback, kind: "suite" | "test"} | never;

    function resetShimHarnessAndExecute(runner: RunnerBase) {
        errors = [];
        passes = [];
        passing = 0;
        testList.length = 0;
        const start = +(new Date());
        runner.initializeTests();
        testList.forEach(({ name, callback, kind }) => executeCallback(name, callback, kind));
        return { errors, passes, passing, duration: +(new Date()) - start };
    }


    let beforeEachFunc: Callable;
    const namestack: string[] = [];
    let testList: Executor[] = [];
    function shimMochaHarness() {
        (global as any).before = undefined;
        (global as any).after = undefined;
        (global as any).beforeEach = undefined;
        (global as any).describe = ((name, callback) => {
            testList.push({ name, callback, kind: "suite" });
        }) as Mocha.IContextDefinition;
        (global as any).describe.skip = ts.noop;
        (global as any).it = ((name, callback) => {
            if (!testList) {
                throw new Error("Tests must occur within a describe block");
            }
            testList.push({ name, callback, kind: "test" });
        }) as Mocha.ITestDefinition;
        (global as any).it.skip = ts.noop;
    }

    function setTimeoutAndExecute(timeout: number | undefined, f: () => void) {
        if (timeout !== undefined) {
            const timeoutMsg: ParallelTimeoutChangeMessage = { type: "timeout", payload: { duration: timeout } };
            process.send(timeoutMsg);
        }
        f();
        if (timeout !== undefined) {
            // Reset timeout
            const timeoutMsg: ParallelTimeoutChangeMessage = { type: "timeout", payload: { duration: "reset" } };
            process.send(timeoutMsg);
        }
    }

    function executeSuiteCallback(name: string, callback: MochaCallback) {
        let timeout: number;
        const fakeContext: Mocha.ISuiteCallbackContext = {
            retries() { return this; },
            slow() { return this; },
            timeout(n: number) {
                timeout = n;
                return this;
            },
        };
        namestack.push(name);
        let beforeFunc: Callable;
        (before as any) = (cb: Callable) => beforeFunc = cb;
        let afterFunc: Callable;
        (after as any) = (cb: Callable) => afterFunc = cb;
        const savedBeforeEach = beforeEachFunc;
        (beforeEach as any) = (cb: Callable) => beforeEachFunc = cb;
        const savedTestList = testList;

        testList = [];
        try {
            callback.call(fakeContext);
        }
        catch (e) {
            errors.push({ error: `Error executing suite: ${e.message}`, stack: e.stack, name: [...namestack] });
            return cleanup();
        }
        try {
            if (beforeFunc) {
                beforeFunc();
            }
        }
        catch (e) {
            errors.push({ error: `Error executing before function: ${e.message}`, stack: e.stack, name: [...namestack] });
            return cleanup();
        }
        finally {
            beforeFunc = undefined;
        }

        setTimeoutAndExecute(timeout, () => {
            testList.forEach(({ name, callback, kind }) => executeCallback(name, callback, kind));
        });

        try {
            if (afterFunc) {
                afterFunc();
            }
        }
        catch (e) {
            errors.push({ error: `Error executing after function: ${e.message}`, stack: e.stack, name: [...namestack] });
        }
        finally {
            afterFunc = undefined;
            cleanup();
        }
        function cleanup() {
            testList.length = 0;
            testList = savedTestList;
            beforeEachFunc = savedBeforeEach;
            namestack.pop();
        }
    }

    function executeCallback(name: string, callback: MochaCallback, kind: "suite" | "test") {
        if (kind === "suite") {
            executeSuiteCallback(name, callback);
        }
        else {
            executeTestCallback(name, callback);
        }
    }

    function executeTestCallback(name: string, callback: MochaCallback) {
        let timeout: number;
        const fakeContext: Mocha.ITestCallbackContext = {
            skip() { return this; },
            timeout(n: number) {
                timeout = n;
                const timeoutMsg: ParallelTimeoutChangeMessage = { type: "timeout", payload: { duration: timeout } };
                process.send(timeoutMsg);
                return this;
            },
            retries() { return this; },
            slow() { return this; },
        };
        namestack.push(name);
        if (beforeEachFunc) {
            try {
                beforeEachFunc();
            }
            catch (error) {
                errors.push({ error: error.message, stack: error.stack, name: [...namestack] });
                namestack.pop();
                return;
            }
        }
        if (callback.length === 0) {
            try {
                // TODO: If we ever start using async test completions, polyfill promise return handling
                callback.call(fakeContext);
                passes.push({ name: [...namestack] });
            }
            catch (error) {
                errors.push({ error: error.message, stack: error.stack, name: [...namestack] });
                return;
            }
            finally {
                namestack.pop();
                if (timeout !== undefined) {
                    const timeoutMsg: ParallelTimeoutChangeMessage = { type: "timeout", payload: { duration: "reset" } };
                    process.send(timeoutMsg);
                }
            }
            passing++;
        }
        else {
            // Uses `done` callback
            let completed = false;
            try {
                callback.call(fakeContext, (err: any) => {
                    if (completed) {
                        throw new Error(`done() callback called multiple times; ensure it is only called once.`);
                    }
                    if (err) {
                        errors.push({ error: err.toString(), stack: "", name: [...namestack] });
                    }
                    else {
                        passes.push({ name: [...namestack] });
                        passing++;
                    }
                    completed = true;
                });
            }
            catch (error) {
                errors.push({ error: error.message, stack: error.stack, name: [...namestack] });
                return;
            }
            finally {
                namestack.pop();
                if (timeout !== undefined) {
                    const timeoutMsg: ParallelTimeoutChangeMessage = { type: "timeout", payload: { duration: "reset" } };
                    process.send(timeoutMsg);
                }
            }
            if (!completed) {
                errors.push({ error: "Test completes asynchronously, which is unsupported by the parallel harness", stack: "", name: [...namestack] });
            }
        }
    }

    export function start() {
        let initialized = false;
        const runners = ts.createMap<RunnerBase>();
        process.on("message", (data: ParallelHostMessage) => {
            if (!initialized) {
                initialized = true;
                shimMochaHarness();
            }
            switch (data.type) {
                case "test":
                    const { runner, file } = data.payload;
                    if (!runner) {
                        console.error(data);
                    }
                    const message: ParallelResultMessage = { type: "result", payload: handleTest(runner, file) };
                    process.send(message);
                    break;
                case "close":
                    process.exit(0);
                    break;
                case "batch": {
                    const items = data.payload;
                    for (let i = 0; i < items.length; i++) {
                        const { runner, file } = items[i];
                        if (!runner) {
                            console.error(data);
                        }
                        let message: ParallelBatchProgressMessage | ParallelResultMessage;
                        const payload = handleTest(runner, file);
                        if (i === (items.length - 1)) {
                            message = { type: "result", payload };
                        }
                        else {
                            message = { type: "progress", payload };
                        }
                        process.send(message);
                    }
                    break;
                }
            }
        });
        process.on("uncaughtException", error => {
            const message: ParallelErrorMessage = { type: "error", payload: { error: error.message, stack: error.stack, name: [...namestack] } };
            try {
                process.send(message);
            }
            catch (e) {
                console.error(error);
                throw error;
            }
        });
        if (!runUnitTests) {
            // ensure unit tests do not get run
            (global as any).describe = ts.noop;
        }
        else {
            initialized = true;
            shimMochaHarness();
        }

        function handleTest(runner: TestRunnerKind | "unittest", file: string) {
            collectUnitTestsIfNeeded();
            if (runner === unittest) {
                return executeUnitTest(file);
            }
            else {
                if (!runners.has(runner)) {
                    runners.set(runner, createRunner(runner));
                }
                const instance = runners.get(runner);
                instance.tests = [file];
                return { ...resetShimHarnessAndExecute(instance), runner, file };
            }
        }
    }

    const unittest: "unittest" = "unittest";
    let unitTests: {[name: string]: MochaCallback};
    function collectUnitTestsIfNeeded() {
        if (!unitTests && testList.length) {
            unitTests = {};
            for (const test of testList) {
                unitTests[test.name] = test.callback;
            }
            testList.length = 0;
        }
    }

    function executeUnitTest(name: string) {
        if (!unitTests) {
            throw new Error(`Asked to run unit test ${name}, but no unit tests were discovered!`);
        }
        if (unitTests[name]) {
            errors = [];
            passes = [];
            passing = 0;
            const start = +(new Date());
            executeSuiteCallback(name, unitTests[name]);
            delete unitTests[name];
            return { file: name, runner: unittest, errors, passes, passing, duration: +(new Date()) - start };
        }
        throw new Error(`Unit test with name "${name}" was asked to be run, but such a test does not exist!`);
    }
}