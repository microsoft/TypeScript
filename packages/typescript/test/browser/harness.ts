interface RegisteredTest {
    name: string;
    run: (context: BrowserTestContext) => unknown;
    skip?: string;
}

interface RegisteredSuite {
    name: string;
    skip?: string;
}

interface BrowserTestContext {
    after(callback: () => unknown): void;
    mock: {
        method<T extends object, K extends keyof T>(
            target: T,
            name: K,
            implementation: T[K],
        ): void;
    };
}

export interface BrowserTestFailure {
    name: string;
    message: string;
    stack?: string;
}

export interface BrowserTestSkip {
    name: string;
    reason: string;
}

export interface BrowserTestResults {
    passed: number;
    skipped: BrowserTestSkip[];
    failures: BrowserTestFailure[];
}

export interface BrowserTestExclusion {
    pattern: RegExp;
    reason: string;
}

const tests: RegisteredTest[] = [];
const suites: RegisteredSuite[] = [];

interface TestOptions {
    skip?: boolean | string;
}

export function describe(name: string, options: TestOptions, run: () => void): void;
export function describe(name: string, run: () => void): void;
export function describe(name: string, optionsOrRun: TestOptions | (() => void), run?: () => void): void {
    const callback = typeof optionsOrRun === "function" ? optionsOrRun : run!;
    const skip = currentSuiteSkip() ?? (typeof optionsOrRun === "function" ? undefined : skipReason(optionsOrRun.skip));
    suites.push({
        name,
        ...skip === undefined ? {} : { skip },
    });
    try {
        callback();
    }
    finally {
        suites.pop();
    }
}

export function test(name: string, options: TestOptions, run: (context: BrowserTestContext) => unknown): void;
export function test(name: string, run: (context: BrowserTestContext) => unknown): void;
export function test(
    name: string,
    optionsOrRun: TestOptions | ((context: BrowserTestContext) => unknown),
    run?: (context: BrowserTestContext) => unknown,
): void {
    const callback = typeof optionsOrRun === "function" ? optionsOrRun : run!;
    const skip = currentSuiteSkip() ?? (typeof optionsOrRun === "function" ? undefined : skipReason(optionsOrRun.skip));
    tests.push({
        name: [...suites.map(suite => suite.name), name].join(" > "),
        run: callback,
        ...skip === undefined ? {} : { skip },
    });
}

export async function runRegisteredTests(exclusions: readonly BrowserTestExclusion[], timeoutMs = 10_000): Promise<BrowserTestResults> {
    const failures: BrowserTestFailure[] = [];
    const skipped: BrowserTestSkip[] = [];
    let passed = 0;
    for (const registered of tests) {
        if (registered.skip) {
            skipped.push({
                name: registered.name,
                reason: registered.skip,
            });
            continue;
        }
        const exclusion = exclusions.find(entry => entry.pattern.test(registered.name));
        if (exclusion) {
            skipped.push({
                name: registered.name,
                reason: exclusion.reason,
            });
            continue;
        }
        try {
            Reflect.set(globalThis, "browserTestProgress", registered.name);
            const restorations: (() => void)[] = [];
            const context: BrowserTestContext = {
                after(callback) {
                    restorations.push(callback);
                },
                mock: {
                    method(target, name, implementation) {
                        const descriptor = Object.getOwnPropertyDescriptor(target, name);
                        Object.defineProperty(target, name, {
                            configurable: true,
                            value: implementation,
                            writable: true,
                        });
                        restorations.push(() => {
                            if (descriptor) {
                                Object.defineProperty(target, name, descriptor);
                            }
                            else {
                                delete target[name];
                            }
                        });
                    },
                },
            };
            let timer: ReturnType<typeof setTimeout> | undefined;
            try {
                await Promise.race([
                    Promise.resolve().then(() => registered.run(context)),
                    new Promise((_, reject) => {
                        timer = setTimeout(() => reject(new Error(`Test timed out after ${timeoutMs}ms`)), timeoutMs);
                    }),
                ]);
            }
            finally {
                clearTimeout(timer);
                for (let i = restorations.length - 1; i >= 0; i--) {
                    await restorations[i]();
                }
            }
            passed++;
        }
        catch (error) {
            const normalized = normalizeError(error);
            failures.push({
                name: registered.name,
                message: normalized.message,
                ...normalized.stack === undefined ? {} : { stack: normalized.stack },
            });
        }
    }
    return { passed, skipped, failures };
}

function currentSuiteSkip(): string | undefined {
    for (let i = suites.length - 1; i >= 0; i--) {
        if (suites[i].skip) {
            return suites[i].skip;
        }
    }
    return undefined;
}

function skipReason(skip: boolean | string | undefined): string | undefined {
    if (!skip) {
        return undefined;
    }
    return typeof skip === "string" ? skip : "Skipped by test option";
}

function normalizeError(error: unknown): Error {
    if (
        error instanceof Error
        && error.name === "SuppressedError"
        && "error" in error
        && "suppressed" in error
    ) {
        const primary = normalizeError(error.error);
        const suppressed = normalizeError(error.suppressed);
        return new Error(`${primary.message}\nSuppressed during disposal: ${suppressed.message}`, {
            cause: primary,
        });
    }
    return error instanceof Error ? error : new Error(String(error));
}
