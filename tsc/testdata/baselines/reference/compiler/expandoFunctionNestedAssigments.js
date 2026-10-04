//// [tests/cases/compiler/expandoFunctionNestedAssigments.ts] ////

//// [expandoFunctionNestedAssigments.ts]
function Foo(): void {

}
let d: number = (Foo.inVariableInit = 1);


function bar(p = (Foo.inNestedFunction = 1)) {

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

//// [expandoFunctionNestedAssigments.js]
"use strict";
function Foo() {
}
let d = (Foo.inVariableInit = 1);
function bar(p = (Foo.inNestedFunction = 1)) {
}
(Foo.bla = { foo: 1 }).foo = (Foo.baz = 1) + (Foo.bar = 0);
if (Foo.fromIf = 1) {
    Foo.inIf = 1;
}
while (Foo.fromWhileCondition = 1) {
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
} while (Foo.fromDoCondition = 1);
for (Foo.forInit = 1; (Foo.forCond = 1) > 1; Foo.forIncr = 1) {
    Foo.fromForBody = 1;
    {
        Foo.fromForBodyNested = 1;
    }
}
for (let f of (Foo.forOf = [])) {
    Foo.fromForOfBody = 1;
    {
        Foo.fromForOfBodyNested = 1;
    }
}
for (let f in (Foo.forIn = [])) {
    Foo.fromForInBody = 1;
    {
        Foo.fromForInBodyNested = 1;
    }
}


//// [expandoFunctionNestedAssigments.d.ts]
declare function Foo(): void;
declare namespace Foo {
    export var inVariableInit: number;
    export var bla: {
        foo: number;
    };
    export var baz: number;
    var _a: number;
    export { _a as bar };
    export var fromIf: number;
    export var inIf: number;
    export var fromWhileCondition: number;
    export var fromWhileBody: number;
    export var fromWhileBodyNested: number;
    export var fromDoBody: number;
    export var fromDoBodyNested: number;
    export var fromDoCondition: number;
    export var forInit: number;
    export var forCond: number;
    export var forIncr: number;
    export var fromForBody: number;
    export var fromForBodyNested: number;
    export var forOf: any[];
    export var fromForOfBody: number;
    export var fromForOfBodyNested: number;
    export var forIn: any[];
    export var fromForInBody: number;
    export var fromForInBodyNested: number;
}
declare let d: number;
declare function bar(p?: number): void;
