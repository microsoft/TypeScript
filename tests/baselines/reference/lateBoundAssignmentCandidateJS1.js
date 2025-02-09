//// [tests/cases/compiler/lateBoundAssignmentCandidateJS1.ts] ////

//// [index.js]
// https://github.com/microsoft/TypeScript/issues/60590

export const kBar = Symbol("bar");

export class foo0 {
    /**
     * @protected
     * @type {null | string}
     */
    [kBar] = null;

    get bar() {
        return this[kBar];
    }
    /**
     * @type {string}
     */
    set bar(value) {
        this[kBar] = value;
    }
}


//// [index.js]
// https://github.com/microsoft/TypeScript/issues/60590
export const kBar = Symbol("bar");
export class foo0 {
    /**
     * @protected
     * @type {null | string}
     */
    [kBar] = null;
    get bar() {
        return this[kBar];
    }
    /**
     * @type {string}
     */
    set bar(value) {
        this[kBar] = value;
    }
}


//// [index.d.ts]
export const kBar: unique symbol;
export class foo0 {
    /**
     * @type {string}
     */
    set bar(value: string | null);
    get bar(): string | null;
    /**
     * @protected
     * @type {null | string}
     */
    protected [kBar]: null | string;
}
