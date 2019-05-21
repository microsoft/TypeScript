/// <reference path="fourslash.ts" />

//@Filename: jsxExpressionFollowedByIdentifier.tsx
////declare var React: any;
////declare var x: string;
////const a = <div>{<div />[|x|]}</div>
////const b = <div x={<div />[|x|]} />

const range = test.ranges()[0];
verify.getSyntacticDiagnostics([{
  code: 1005,
  message: "'}' expected.",
  range,
}]);
verify.quickInfoAt(range, 'var x: string');