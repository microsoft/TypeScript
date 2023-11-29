// @lib: esnext
// @declaration: true

function Foo(): void {

}
declare namespace Foo {
    var bla: {
        foo: number;
    };
    var baz: number;
    var bar: number;
    var fromIf: number;
    var inIf: number;
    var fromWhileCondition: number;
    var fromWhileBody: number;
    var fromWhileBodyNested: number;
    var fromDoBody: number;
    var fromDoBodyNested: number;
    var fromDoCondition: number;
    var forInit: number;
    var forCond: number;
    var fromForBody: number;
    var fromForBodyNested: number;
    var forIncr: number;
    var forOf: any[];
    var fromForOfBody: number;
    var fromForOfBodyNested: number;
    var forIn: any[];
    var fromForInBody: number;
    var fromForInBodyNested: number;
}

(Foo.bla = { foo: 1}).foo = (Foo.baz = 1) + (Foo.bar  = 0);

if(Foo.fromIf = 1) {
    Foo.inIf = 1;
}

while(Foo.fromWhileCondition = 1) {
    Foo.fromWhileBody = 1;
    {
        Foo.fromWhileBodyNested = 1;
    }
}

do {
    Foo.fromDoBody = 1;
    {
        Foo.fromDoBodyNested = 1;
    }
} while(Foo.fromDoCondition = 1);

for(Foo.forInit = 1; (Foo.forCond = 1) > 1; Foo.forIncr = 1){
    Foo.fromForBody = 1;
    {
        Foo.fromForBodyNested = 1;
    }
}

for(let f of (Foo.forOf = []) ){
    Foo.fromForOfBody = 1;
    {
        Foo.fromForOfBodyNested = 1;
    }
}


for(let f in (Foo.forIn = []) ){
    Foo.fromForInBody = 1;
    {
        Foo.fromForInBodyNested = 1;
    }
}