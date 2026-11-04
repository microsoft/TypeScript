//// [tests/cases/compiler/flakyDiagnosticsJsClassPropertyInitializedToUndefined.ts] ////

//// [index.js]
export class C {
    constructor() {
        this.base = undefined;
        const nullableRead = this.base;
        /** @type {undefined} */
        const nullableCheck = nullableRead;
    }
}

export const nullableResult = new C().base;

export const NullClass = class {
    constructor() {
        this.base = null;
    }
};

export class LaterWrite {
    constructor() {
        this.base = undefined;
        this.base = 1;
    }
}

export class BranchWrite {
    /** @param {boolean} condition */
    constructor(condition) {
        this.base = undefined;
        if (condition) {
            this.base = 1;
        } else {
            this.base = "value";
        }
    }
}

export class Annotated {
    constructor() {
        /** @type {number | undefined} */
        this.base = undefined;
    }
}

export class MutualNestedNullable {
    constructor() {
        this.first = (this.second = undefined);
        this.second = (this.first = undefined);
    }
}

export const NestedNullableExpression = class {
    constructor() {
        this.first = (this.second = null);
        this.second = (this.first = null);
    }
};

export const nestedNullableResult = new MutualNestedNullable().first;
export const expressionNullableResult = new NestedNullableExpression().second;

export class MutualNestedNumber {
    constructor() {
        this.first = (this.second = undefined);
        this.second = (this.first = undefined);
        this.first = 1;
        this.second = 2;
    }
}

/** @type {number} */
export const nestedFirst = new MutualNestedNumber().first;
/** @type {number} */
export const nestedSecond = new MutualNestedNumber().second;
/** @type {string} */
export const invalidNestedString = new MutualNestedNumber().first;

export class AssignmentValues {
    constructor() {
        const initialValue = (this.base = undefined);
        const initialRead = this.base;
        const numberValue = (this.base = 1);
        const stringValue = (this.base = "value");
        const finalRead = this.base;
        /** @type {undefined} */
        const initialCheck = initialValue;
        /** @type {undefined} */
        const initialReadCheck = initialRead;
        /** @type {number} */
        const numberCheck = numberValue;
        /** @type {string} */
        const stringCheck = stringValue;
        /** @type {string} */
        const finalReadCheck = finalRead;
        /** @type {number} */
        const invalidNumber = this.base;
    }
}

export class Reentrant {
    constructor() {
        this.base = undefined;
        this.read = this.getValue();
        this.base = 1;
    }
    getValue() {
        return this.base;
    }
}

/** @type {number} */
export const reentrantResult = new Reentrant().read;
/** @type {string} */
export const invalidReentrantString = new Reentrant().read;

/** @type {string} */
export const finalValue = new AssignmentValues().base;

/** @type {number} */
export const numberValue = new LaterWrite().base;
/** @type {string} */
export const invalidString = new LaterWrite().base;
/** @type {number | string} */
export const branchValue = new BranchWrite(true).base;

//// [index.js]
export class C {
    constructor() {
        this.base = undefined;
        const nullableRead = this.base;
        /** @type {undefined} */
        const nullableCheck = nullableRead;
    }
}
export const nullableResult = new C().base;
export const NullClass = class {
    constructor() {
        this.base = null;
    }
};
export class LaterWrite {
    constructor() {
        this.base = undefined;
        this.base = 1;
    }
}
export class BranchWrite {
    /** @param {boolean} condition */
    constructor(condition) {
        this.base = undefined;
        if (condition) {
            this.base = 1;
        }
        else {
            this.base = "value";
        }
    }
}
export class Annotated {
    constructor() {
        /** @type {number | undefined} */
        this.base = undefined;
    }
}
export class MutualNestedNullable {
    constructor() {
        this.first = (this.second = undefined);
        this.second = (this.first = undefined);
    }
}
export const NestedNullableExpression = class {
    constructor() {
        this.first = (this.second = null);
        this.second = (this.first = null);
    }
};
export const nestedNullableResult = new MutualNestedNullable().first;
export const expressionNullableResult = new NestedNullableExpression().second;
export class MutualNestedNumber {
    constructor() {
        this.first = (this.second = undefined);
        this.second = (this.first = undefined);
        this.first = 1;
        this.second = 2;
    }
}
/** @type {number} */
export const nestedFirst = new MutualNestedNumber().first;
/** @type {number} */
export const nestedSecond = new MutualNestedNumber().second;
/** @type {string} */
export const invalidNestedString = new MutualNestedNumber().first;
export class AssignmentValues {
    constructor() {
        const initialValue = (this.base = undefined);
        const initialRead = this.base;
        const numberValue = (this.base = 1);
        const stringValue = (this.base = "value");
        const finalRead = this.base;
        /** @type {undefined} */
        const initialCheck = initialValue;
        /** @type {undefined} */
        const initialReadCheck = initialRead;
        /** @type {number} */
        const numberCheck = numberValue;
        /** @type {string} */
        const stringCheck = stringValue;
        /** @type {string} */
        const finalReadCheck = finalRead;
        /** @type {number} */
        const invalidNumber = this.base;
    }
}
export class Reentrant {
    constructor() {
        this.base = undefined;
        this.read = this.getValue();
        this.base = 1;
    }
    getValue() {
        return this.base;
    }
}
/** @type {number} */
export const reentrantResult = new Reentrant().read;
/** @type {string} */
export const invalidReentrantString = new Reentrant().read;
/** @type {string} */
export const finalValue = new AssignmentValues().base;
/** @type {number} */
export const numberValue = new LaterWrite().base;
/** @type {string} */
export const invalidString = new LaterWrite().base;
/** @type {number | string} */
export const branchValue = new BranchWrite(true).base;


//// [index.d.ts]
export declare class C {
    base: any;
    constructor();
}
export declare const nullableResult: any;
export declare const NullClass: {
    new (): {
        base: any;
    };
};
export declare class LaterWrite {
    base: number;
    constructor();
}
export declare class BranchWrite {
    base: string | number;
    /** @param {boolean} condition */
    constructor(condition: boolean);
}
export declare class Annotated {
    /** @type {number | undefined} */
    base: number | undefined;
    constructor();
}
export declare class MutualNestedNullable {
    first: any;
    second: any;
    constructor();
}
export declare const NestedNullableExpression: {
    new (): {
        first: any;
        second: any;
    };
};
export declare const nestedNullableResult: any;
export declare const expressionNullableResult: any;
export declare class MutualNestedNumber {
    first: number;
    second: number;
    constructor();
}
/** @type {number} */
export declare const nestedFirst: number;
/** @type {number} */
export declare const nestedSecond: number;
/** @type {string} */
export declare const invalidNestedString: string;
export declare class AssignmentValues {
    base: string;
    constructor();
}
export declare class Reentrant {
    base: number;
    read: number;
    constructor();
    getValue(): number;
}
/** @type {number} */
export declare const reentrantResult: number;
/** @type {string} */
export declare const invalidReentrantString: string;
/** @type {string} */
export declare const finalValue: string;
/** @type {number} */
export declare const numberValue: number;
/** @type {string} */
export declare const invalidString: string;
/** @type {number | string} */
export declare const branchValue: number | string;
