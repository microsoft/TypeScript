//// [tests/cases/compiler/declarationEmitSimpleComputedNames1.ts] ////

//// [declarationEmitSimpleComputedNames1.ts]
export const fieldName = Math.random() > 0.5 ? "f1" : "f2";
export const conatainer = {
    [fieldName]() {
        return "result";
    }
};

const classFieldName = Math.random() > 0.5 ? "g1" : "g2";
const otherField = classFieldName === "g1" ? "g2" : "g1";
const staticField = Math.random() > 0.5 ? "s1" : "s2";
export class Holder {
    [classFieldName]() {
        return "value";
    }
    [otherField]() {
        return 42;
    }
    static [staticField]() {
        return { static: true };
    }
    static [staticField]() {
        return { static: "sometimes" };
    }
}

/**
 * Could be `"prototype"`, so all static string indexers include the instance type
 */
export const staticLookup = Holder["some" + "thing"];
export const instanceLookup = (new Holder())["some" + "thing"];


//// [declarationEmitSimpleComputedNames1.js]
export const fieldName = Math.random() > 0.5 ? "f1" : "f2";
export const conatainer = {
    [fieldName]() {
        return "result";
    }
};
const classFieldName = Math.random() > 0.5 ? "g1" : "g2";
const otherField = classFieldName === "g1" ? "g2" : "g1";
const staticField = Math.random() > 0.5 ? "s1" : "s2";
export class Holder {
    [classFieldName]() {
        return "value";
    }
    [otherField]() {
        return 42;
    }
    static [staticField]() {
        return { static: true };
    }
    static [staticField]() {
        return { static: "sometimes" };
    }
}
/**
 * Could be `"prototype"`, so all static string indexers include the instance type
 */
export const staticLookup = Holder["some" + "thing"];
export const instanceLookup = (new Holder())["some" + "thing"];


//// [declarationEmitSimpleComputedNames1.d.ts]
export declare const fieldName: string;
export declare const conatainer: {
    [fieldName]: () => string;
};
declare const classFieldName: string;
declare const otherField: string;
declare const staticField: string;
export declare class Holder {
    static [staticField]: () => {
        static: boolean;
    };
    static [staticField]: () => {
        static: string;
    };
    [classFieldName]: () => string;
    [otherField]: () => number;
}
/**
 * Could be `"prototype"`, so all static string indexers include the instance type
 */
export declare const staticLookup: Holder | (() => {
    static: boolean;
}) | (() => {
    static: string;
});
export declare const instanceLookup: (() => string) | (() => number);
export {};
