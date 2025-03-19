//// [tests/cases/conformance/esDecorators/classExpression/namedEvaluation/esDecorators-classExpression-namedEvaluation.4.ts] ////

//// [esDecorators-classExpression-namedEvaluation.4.ts]
declare let dec: any, obj: any;

// 8.6.3 RS: IteratorBindingInitialization
//  SingleNameBinding : BindingIdentifier Initializer?

{ const [x = @dec class { }] = obj; }
{ const [x = class { @dec y: any; }] = obj; }

// 14.3.3.3 RS: KeyedBindingInitialization
//  SingleNameBinding : BindingIdentifier Initializer?

{ const { x = @dec class { } } = obj; }
{ const { x = class { @dec y: any; } } = obj; }

{ const { y: x = @dec class { } } = obj; }
{ const { y: x = class { @dec y: any; } } = obj; }



//// [esDecorators-classExpression-namedEvaluation.4.js]
// 8.6.3 RS: IteratorBindingInitialization
//  SingleNameBinding : BindingIdentifier Initializer?
{
    const [x = 
    @dec
    class {
    }] = obj;
}
{
    const [x = class {
        @dec
        y;
    }] = obj;
}
// 14.3.3.3 RS: KeyedBindingInitialization
//  SingleNameBinding : BindingIdentifier Initializer?
{
    const { x = 
    @dec
    class {
    } } = obj;
}
{
    const { x = class {
        @dec
        y;
    } } = obj;
}
{
    const { y: x = 
    @dec
    class {
    } } = obj;
}
{
    const { y: x = class {
        @dec
        y;
    } } = obj;
}
