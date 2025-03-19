//// [tests/cases/conformance/esDecorators/classExpression/namedEvaluation/esDecorators-classExpression-namedEvaluation.3.ts] ////

//// [esDecorators-classExpression-namedEvaluation.3.ts]
declare let dec: any;

// 14.3.1.2 RS: Evaluation
//   LexicalBinding : BindingIdentifier Initializer

{ let x = @dec class { }; }
{ let x = class { @dec y: any; }; }

{ const x = @dec class { }; }
{ const x = class { @dec y: any; }; }

// 14.3.2.1 RS: Evaluation
//   VariableDeclaration : BindingIdentifier Initializer

{ var x2 = @dec class { }; }
{ var x1 = class { @dec y: any; }; }


//// [esDecorators-classExpression-namedEvaluation.3.js]
// 14.3.1.2 RS: Evaluation
//   LexicalBinding : BindingIdentifier Initializer
{
    let x = 
    @dec
    class {
    };
}
{
    let x = class {
        @dec
        y;
    };
}
{
    const x = 
    @dec
    class {
    };
}
{
    const x = class {
        @dec
        y;
    };
}
// 14.3.2.1 RS: Evaluation
//   VariableDeclaration : BindingIdentifier Initializer
{
    var x2 = 
    @dec
    class {
    };
}
{
    var x1 = class {
        @dec
        y;
    };
}
