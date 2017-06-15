import { TestConfig } from "./config";

export type TestRunnerKind = "conformance" | "compiler";

export interface TestRunTask {
    /**
     * The id of the associated runner.
     */
    runner: TestRunnerKind;

    /**
     * The ids of the test cases in the runner.
     */
    tests?: string[];
}

export abstract class Runner<TKind extends TestRunnerKind = TestRunnerKind> {
    public readonly kind: TKind;
    public readonly config: TestConfig;

    constructor(kind: TKind, config: TestConfig) {
        this.kind = kind;
        this.config = config;
    }

    /**
     * Discover test cases for the runner.
     */
    public abstract discover(): string[];

    /**
     * Setup the runner's tests so that they are ready to be executed by the harness.
     * @param tests The tests for this run.
     */
    public run(tests = this.discover()): void {
        describe(`${this.kind} tests`, () => {
            if (this.before !== Runner.prototype.before) before(() => this.before());
            if (this.beforeEach !== Runner.prototype.beforeEach) beforeEach(() => this.beforeEach());
            if (this.afterEach !== Runner.prototype.afterEach) afterEach(() => this.afterEach());
            if (this.after !== Runner.prototype.after) after(() => this.after());
            for (const test of tests) {
                describe(`${this.kind} tests for ${test}`, () => {
                    this.runSuite(test);
                });
            }
        });
    }

    /**
     * Override to perform initialization before any tests in the runner are executed.
     */
    protected before(): void { }

    /**
     * Override to perform initialization before each test in the runner is executed.
     */
    protected beforeEach(): void { }

    /**
     * Override to perform cleanup after any tests in the runner are executed.
     */
    protected after(): void {}

    /**
     * Override to perform cleanup after each test in the runner is executed.
     */
    protected afterEach(): void { }

    /**
     * Override to describe test suites and tests for a specific test case.
     * @param id The id of the test case.
     */
    protected abstract runSuite(id: string): void;
}