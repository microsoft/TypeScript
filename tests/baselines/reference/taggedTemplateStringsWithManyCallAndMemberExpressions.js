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
var f;
var x = new new new f `abc${0}def`.member("hello")(42) === true;
