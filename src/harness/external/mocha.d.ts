// Type definitions for mocha 1.9.0
// Project: http://visionmedia.github.io/mocha/
// Definitions by: Kazi Manzur Rashid <https://github.com/kazimanzurrashid/>
// DefinitelyTyped: https://github.com/borisyankov/DefinitelyTyped

declare var describe : {
    (description: string, spec: () => void): void;
    only(description: string, spec: () => void): void;
    skip(description: string, spec: () => void): void;
    timeout(ms: number): void;
}

declare var it: {
    (expectation: string, assertion?: () => void): void;
    (expectation: string, assertion?: (done: () => void) => void): void;
    only(expectation: string, assertion?: () => void): void;
    only(expectation: string, assertion?: (done: () => void) => void): void;
    skip(expectation: string, assertion?: () => void): void;
    skip(expectation: string, assertion?: (done: () => void) => void): void;
    timeout(ms: number): void;
};

/** Runs once before any 'it' blocks in the current 'describe' are run */
declare function before(action: () => void): void;

/** Runs once before any 'it' blocks in the current 'describe' are run */
declare function before(action: (done: () => void) => void): void;

/** Runs once after all 'it' blocks in the current 'describe' are run */
declare function after(action: () => void): void;

/** Runs once after all 'it' blocks in the current 'describe' are run */
declare function after(action: (done: () => void) => void): void;

/** Runs before each individual 'it' block in the current 'describe' is run */
declare function beforeEach(action: () => void): void;

/** Runs before each individual 'it' block in the current 'describe' is run */
declare function beforeEach(action: (done: () => void) => void): void;

/** Runs after each individual 'it' block in the current 'describe' is run */
declare function afterEach(action: () => void): void;

/** Runs after each individual 'it' block in the current 'describe' is run */
declare function afterEach(action: (done: () => void) => void): void;