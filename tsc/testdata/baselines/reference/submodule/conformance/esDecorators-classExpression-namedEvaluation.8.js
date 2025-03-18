//// [tests/cases/conformance/esDecorators/classExpression/namedEvaluation/esDecorators-classExpression-namedEvaluation.8.ts] ////

//// [a.ts]
declare let dec: any;

// 16.2.3.7 RS: Evaluation
//   ExportDeclaration : `export` `default` AssignmentExpression `;` 

export default (@dec class { });

//// [b.ts]
declare let dec: any;

// 16.2.3.7 RS: Evaluation
//   ExportDeclaration : `export` `default` AssignmentExpression `;` 

export default (class { @dec y: any });

//// [a.js]
export default (
@dec
class {
});
//// [b.js]
export default (class {
    @dec
    y;
});
