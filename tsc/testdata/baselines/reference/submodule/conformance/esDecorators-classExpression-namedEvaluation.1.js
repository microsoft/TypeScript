//// [tests/cases/conformance/esDecorators/classExpression/namedEvaluation/esDecorators-classExpression-namedEvaluation.1.ts] ////

//// [esDecorators-classExpression-namedEvaluation.1.ts]
declare let dec: any;

let x: any;

// 13.15.2 RS: Evaluation
//  AssignmentExpression : LeftHandSideExpression `=` AssignmentExpression

x = @dec class { };
x = class { @dec y: any; };

// 13.15.2 RS: Evaluation
//  AssignmentExpression : LeftHandSideExpression `&&=` AssignmentExpression

x &&= @dec class { };
x &&= class { @dec y: any; };

// 13.15.2 RS: Evaluation
//  AssignmentExpression : LeftHandSideExpression `||=` AssignmentExpression

x ||= @dec class { };
x ||= class { @dec y: any; };

// 13.15.2 RS: Evaluation
//  AssignmentExpression : LeftHandSideExpression `??=` AssignmentExpression

x ??= @dec class { };
x ??= class { @dec y: any; };


//// [esDecorators-classExpression-namedEvaluation.1.js]
let x;
x = 
@dec
class {
};
x = class {
    @dec
    y;
};
x &&= 
@dec
class {
};
x &&= class {
    @dec
    y;
};
x ||= 
@dec
class {
};
x ||= class {
    @dec
    y;
};
x ??= 
@dec
class {
};
x ??= class {
    @dec
    y;
};
