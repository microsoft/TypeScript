//// [tests/cases/compiler/lateBoundAssignmentCandidateJS2.ts] ////

//// [index.js]
const prop = 'prop';

export class foo1 {
    constructor() {
        this[prop] = 'bar'
    }

    /**
     * @protected
     * @type {string}
     */
    [prop] = 'baz';
}


//// [index.js]
const prop = 'prop';
export class foo1 {
    constructor() {
        this[prop] = 'bar';
    }
    /**
     * @protected
     * @type {string}
     */
    [prop] = 'baz';
}


//// [index.d.ts]
declare const prop = "prop";
export declare class foo1 {
    constructor();
    /**
     * @protected
     * @type {string}
     */
    protected [prop]: string;
}
export {};
