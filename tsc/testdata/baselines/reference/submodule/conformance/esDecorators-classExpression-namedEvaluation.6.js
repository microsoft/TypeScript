//// [tests/cases/conformance/esDecorators/classExpression/namedEvaluation/esDecorators-classExpression-namedEvaluation.6.ts] ////

//// [esDecorators-classExpression-namedEvaluation.6.ts]
declare let dec: any, obj: any, x: any;

// 13.15.5.6 RS: KeyedDestructuringAssignmentEvaluation
//   AssignmentElement : DestructuringAssignmentTarget Initializer?

({ y: x = @dec class { } } = obj);
({ y: x = class { @dec y: any; } } = obj);


//// [esDecorators-classExpression-namedEvaluation.6.js]
// 13.15.5.6 RS: KeyedDestructuringAssignmentEvaluation
//   AssignmentElement : DestructuringAssignmentTarget Initializer?
({ y: x = 
    @dec
    class {
    } } = obj);
({ y: x = class {
        @dec
        y;
    } } = obj);
