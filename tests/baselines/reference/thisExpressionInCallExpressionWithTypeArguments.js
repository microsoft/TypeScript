//// [tests/cases/compiler/thisExpressionInCallExpressionWithTypeArguments.ts] ////

//// [thisExpressionInCallExpressionWithTypeArguments.ts]
class C {
    public foo() { [1,2,3].map<any,any>((x) => { return this; })}
}


//// [thisExpressionInCallExpressionWithTypeArguments.js]
class C {
    foo() { [1, 2, 3].map((x) => { return this; }); }
}
