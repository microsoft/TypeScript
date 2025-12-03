//// [tests/cases/compiler/lateBoundAssignmentCandidateJS3.ts] ////

//// [index.js]
const prop = 'prop';

export class foo2 {
    constructor() {
        this[prop] = 12;
    }

    /**
     * @protected
     * @type {string}
     */
    prop = 'baz';
}


//// [index.js]
const prop = 'prop';
export class foo2 {
    constructor() {
        this[prop] = 12;
    }
    /**
     * @protected
     * @type {string}
     */
    prop = 'baz';
}


//// [index.d.ts]
export class foo2 {
    /**
     * @protected
     * @type {string}
     */
    protected prop: string;
}
