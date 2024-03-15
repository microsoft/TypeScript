//// [tests/cases/conformance/esDecorators/esDecorators-decoratorExpression.3.ts] ////

//// [esDecorators-decoratorExpression.3.ts]
declare let g: <T>(...args: any) => any;

// existing errors

{ @g<number> class C {} }

{ @g()<number> class C {} }


//// [esDecorators-decoratorExpression.3.js]
// existing errors
{
    class C {
    };
}
{
    class C {
    };
}
