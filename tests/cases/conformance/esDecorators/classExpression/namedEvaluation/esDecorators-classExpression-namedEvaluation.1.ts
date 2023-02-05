// @target: es2022
// @noEmitHelpers: true
// @noTypesAndSymbols: true
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
