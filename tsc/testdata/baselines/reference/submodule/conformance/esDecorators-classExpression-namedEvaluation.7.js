//// [tests/cases/conformance/esDecorators/classExpression/namedEvaluation/esDecorators-classExpression-namedEvaluation.7.ts] ////

//// [esDecorators-classExpression-namedEvaluation.7.ts]
declare let dec: any, obj: any, x: any;

// 13.15.5.6 RS: KeyedDestructuringAssignmentEvaluation
//   AssignmentElement : DestructuringAssignmentTarget Initializer?

[x = @dec class { }] = obj;
[x = class { @dec y: any; }] = obj;


//// [esDecorators-classExpression-namedEvaluation.7.js]
// 13.15.5.6 RS: KeyedDestructuringAssignmentEvaluation
//   AssignmentElement : DestructuringAssignmentTarget Initializer?
[x = 
    @dec
    class {
    }] = obj;
[x = class {
        @dec
        y;
    }] = obj;
