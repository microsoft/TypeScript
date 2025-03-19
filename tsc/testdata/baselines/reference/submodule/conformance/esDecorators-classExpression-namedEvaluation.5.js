//// [tests/cases/conformance/esDecorators/classExpression/namedEvaluation/esDecorators-classExpression-namedEvaluation.5.ts] ////

//// [esDecorators-classExpression-namedEvaluation.5.ts]
declare let dec: any, obj: any, x: any;

// 13.15.5.3 RS: PropertyDestructuringAssignmentEvaluation
//   AssignmentProperty : IdentifierReference Initializer?

({ x = @dec class { } } = obj);
({ x = class { @dec y: any; } } = obj);


//// [esDecorators-classExpression-namedEvaluation.5.js]
// 13.15.5.3 RS: PropertyDestructuringAssignmentEvaluation
//   AssignmentProperty : IdentifierReference Initializer?
({ x = 
    @dec
    class {
    } } = obj);
({ x = class {
        @dec
        y;
    } } = obj);
