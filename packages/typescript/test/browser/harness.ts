interface RegisteredTest {
    name: string;
    run: () => unknown;
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
const suites: string[] = [];

export function describe(name: string, run: () => void): void {
    suites.push(name);
    try {
        run();
    }
    finally {
        suites.pop();
    }
}

export function test(name: string, run: () => unknown): void {
    tests.push({
        name: [...suites, name].join(" > "),
        run,
    });
}

export async function runRegisteredTests(exclusions: readonly BrowserTestExclusion[], timeoutMs = 10_000): Promise<BrowserTestResults> {
    const failures: BrowserTestFailure[] = [];
    const skipped: BrowserTestSkip[] = [];
    let passed = 0;
    for (const registered of tests) {
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
            let timer: ReturnType<typeof setTimeout> | undefined;
            try {
                await Promise.race([
                    Promise.resolve().then(registered.run),
                    new Promise((_, reject) => {
                        timer = setTimeout(() => reject(new Error(`Test timed out after ${timeoutMs}ms`)), timeoutMs);
                    }),
                ]);
            }
            finally {
                clearTimeout(timer);
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
