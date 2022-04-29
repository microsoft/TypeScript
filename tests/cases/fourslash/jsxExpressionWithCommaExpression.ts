/// <reference path="fourslash.ts" />

//@Filename: jsxExpressionWithCommaExpression.tsx
//@jsx: react
////declare var React: any;
////declare var x: string;
////const a = <div x={[|x, x|]} />
////const b = <div>{[|x, x|]}</div>

verify.getSyntacticDiagnostics([]);
test.ranges().forEach(range => verify.errorExistsAtRange(range, 18006));
