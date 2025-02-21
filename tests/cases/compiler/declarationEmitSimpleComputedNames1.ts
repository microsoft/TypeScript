// @declaration: true

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
