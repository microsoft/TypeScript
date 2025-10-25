//// [tests/cases/conformance/es6/templates/taggedTemplateStringsWithManyCallAndMemberExpressions.ts] ////

//// [taggedTemplateStringsWithManyCallAndMemberExpressions.ts]
interface I {
    (strs: TemplateStringsArray, ...subs: number[]): I;
    member: {
        new (s: string): {
            new (n: number): {
                new (): boolean;
            }
        }
    };
}
var f: I;

var x = new new new f `abc${ 0 }def`.member("hello")(42) === true;



//// [taggedTemplateStringsWithManyCallAndMemberExpressions.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.freeze) {
        Object.freeze(Object.defineProperty(cooked, "raw", { value: Object.freeze(raw) }));
    }
    else {
        cooked.raw = raw;
    }
    return cooked;
};
var f;
var x = new new new (f(__makeTemplateObject(["abc", "def"], ["abc", "def"]), 0).member)("hello")(42) === true;
