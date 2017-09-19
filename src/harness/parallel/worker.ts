namespace Harness.Parallel.Worker {
    let errors: ErrorInfo[] = [];
    let passing = 0;
    let reportedUnitTests = false;

    type Executor = {name: string, callback: Function, kind: "suite" | "test"} | never;

    function resetShimHarnessAndExecute(runner: RunnerBase) {
        if (reportedUnitTests) {
            errors = [];
            passing = 0;
            testList.length = 0;
        }
        reportedUnitTests = true;
        runner.initializeTests();
        testList.forEach(({ name, callback, kind }) => executeCallback(name, callback, kind));
        return { errors, passing };
    }


    let beforeEachFunc: Function;
    const namestack: string[] = [];
    let testList: Executor[] = [];
    function shimMochaHarness() {
        (global as any).before = undefined;
        (global as any).after = undefined;
        (global as any).beforeEach = undefined;
        describe = ((name, callback) => {
            testList.push({ name, callback, kind: "suite" });
        }) as Mocha.IContextDefinition;
        it = ((name, callback) => {
            if (!testList) {
                throw new Error("Tests must occur within a describe block");
            }
            testList.push({ name, callback, kind: "test" });
        }) as Mocha.ITestDefinition;
    }

    function executeSuiteCallback(name: string, callback: Function) {
        const fakeContext: Mocha.ISuiteCallbackContext = {
            retries() { return this; },
            slow() { return this; },
            timeout() { return this; },
        };
        namestack.push(name);
        (before as any) = (cb: Function) => cb();
        let afterFunc: Function;
        (after as any) = (cb: Function) => afterFunc = cb;
        const savedBeforeEach = beforeEachFunc;
        (beforeEach as any) = (cb: Function) => beforeEachFunc = cb;
        const savedTestList = testList;

        testList = [];
        callback.call(fakeContext);
        testList.forEach(({ name, callback, kind }) => executeCallback(name, callback, kind));
        testList.length = 0;
        testList = savedTestList;

        afterFunc && afterFunc();
        afterFunc = undefined;
        beforeEachFunc = savedBeforeEach;
        namestack.pop();
    }

    function executeCallback(name: string, callback: Function, kind: "suite" | "test") {
        if (kind === "suite") {
            executeSuiteCallback(name, callback);
        }
        else {
            executeTestCallback(name, callback);
        }
    }

    function executeTestCallback(name: string, callback: Function) {
        const fakeContext: Mocha.ITestCallbackContext = {
            skip() { return this; },
            timeout() { return this; },
            retries() { return this; },
            slow() { return this; },
        };
        // TODO: If we ever start using async test completions, polyfill the `done` parameter/promise return handling
        name = [...namestack, name].join(" ");
        if (beforeEachFunc) {
            try {
                beforeEachFunc();
            }
            catch (error) {
                errors.push({ error: error.message, stack: error.stack, name });
                return;
            }
        }
        try {
            callback.call(fakeContext);
        }
        catch (error) {
            errors.push({ error: error.message, stack: error.stack, name });
            return;
        }
        passing++;
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
            const message: ParallelErrorMessage = { type: "error", payload: { error: error.message, stack: error.stack } };
            process.send(message);
        });
        if (!runUnitTests) {
            // ensure unit tests do not get run
            describe = ts.noop as any;
        }
        else {
            initialized = true;
            shimMochaHarness();
        }

        function handleTest(runner: TestRunnerKind, file: string) {
            if (!runners.has(runner)) {
                runners.set(runner, createRunner(runner));
            }
            const instance = runners.get(runner);
            instance.tests = [file];
            return resetShimHarnessAndExecute(instance);
        }
    }
}