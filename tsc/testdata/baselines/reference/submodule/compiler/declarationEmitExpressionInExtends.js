//// [tests/cases/compiler/declarationEmitExpressionInExtends.ts] ////

//// [declarationEmitExpressionInExtends.ts]
var x: {
    new<T>(s: any): Q;
}

class Q {
    s: string;    
}

class B extends x<string> {    
}

var q: B;
q.s;

//// [declarationEmitExpressionInExtends.js]
var x;
class Q {
    s;
}
class B extends x {
}
var q;
q.s;


//// [declarationEmitExpressionInExtends.d.ts]
declare var x: {
    new <T>(s: any): Q;
};
declare class Q {
    s: string;
}
declare class B extends x<string> {
}
declare var q: B;
