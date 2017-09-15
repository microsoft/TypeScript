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
var __getTemplateObject = (this && this.__getTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        return Object.defineProperty(cooked, "raw", { value: raw });
    }
    cooked.raw = raw;
    return cooked;
};
var f;
var x = new new new (f(_a || (_a = __getTemplateObject(["abc", "def"], ["abc", "def"])), 0).member)("hello")(42) === true;
var _a;
