//// [tests/cases/conformance/esDecorators/classExpression/namedEvaluation/esDecorators-classExpression-namedEvaluation.11.ts] ////

//// [esDecorators-classExpression-namedEvaluation.11.ts]
declare let dec: any;

// No NamedEvaluation, no class name

(@dec class {});
(class { @dec y: any });

// No NamedEvaluation, class name

(@dec class C {});
(class C { @dec y: any });


//// [esDecorators-classExpression-namedEvaluation.11.js]
(
@dec
class {
});
(class {
    @dec
    y;
});
(
@dec
class C {
});
(class C {
    @dec
    y;
});
