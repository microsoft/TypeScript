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
var f;
var x = new new new (_a = ["abc", "def"], _a.raw = ["abc", "def"], f(_a, 0)).member("hello")(42) === true;
var _a;
