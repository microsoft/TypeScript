import Mocha = require("../../");

export = common;

declare function common(suites: Mocha.Suite[], context: Mocha.MochaGlobals, mocha: Mocha): common.CommonFunctions;

declare namespace common {
    export interface CommonFunctions {
        /**
         * This is only present if flag --delay is passed into Mocha. It triggers
         * root suite execution.
         */
        runWithSuite(suite: Mocha.Suite): () => void;

        /**
         * Execute before running tests.
         */
        before(fn?: Mocha.Func | Mocha.AsyncFunc): void;

        /**
         * Execute before running tests.
         */
        before(name: string, fn?: Mocha.Func | Mocha.AsyncFunc): void;

        /**
         * Execute after running tests.
         */
        after(fn?: Mocha.Func | Mocha.AsyncFunc): void;

        /**
         * Execute after running tests.
         */
        after(name: string, fn?: Mocha.Func | Mocha.AsyncFunc): void;

        /**
         * Execute before each test case.
         */
        beforeEach(fn?: Mocha.Func | Mocha.AsyncFunc): void;

        /**
         * Execute before each test case.
         */
        beforeEach(name: string, fn?: Mocha.Func | Mocha.AsyncFunc): void;

        /**
         * Execute after each test case.
         */
        afterEach(fn?: Mocha.Func | Mocha.AsyncFunc): void;

        /**
         * Execute after each test case.
         */
        afterEach(name: string, fn?: Mocha.Func | Mocha.AsyncFunc): void;

        suite: SuiteFunctions;
        test: TestFunctions;
    }

    export interface CreateOptions {
        /** Title of suite */
        title: string;

        /** Suite function */
        fn?: (this: Mocha.Suite) => void;

        /** Is suite pending? */
        pending?: boolean;

        /** Filepath where this Suite resides */
        file?: string;

        /** Is suite exclusive? */
        isOnly?: boolean;
    }

    export interface SuiteFunctions {
        /**
         * Create an exclusive Suite; convenience function
         */
        only(opts: CreateOptions): Mocha.Suite;

        /**
         * Create a Suite, but skip it; convenience function
         */
        skip(opts: CreateOptions): Mocha.Suite;

        /**
         * Creates a suite.
         */
        create(opts: CreateOptions): Mocha.Suite;
    }

    export interface TestFunctions {
        /**
         * Exclusive test-case.
         */
        only(mocha: Mocha, test: Mocha.Test): Mocha.Test;

        /**
         * Pending test case.
         */
        skip(title: string): void;

        /**
         * Number of retry attempts
         */
        retries(n: number): void;
    }
}
