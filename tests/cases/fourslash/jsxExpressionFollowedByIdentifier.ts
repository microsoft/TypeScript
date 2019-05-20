/// <reference path="fourslash.ts" />

//@Filename: jsxExpressionFollowedByIdentifier.tsx
////declare var React: any;
////declare var x: string;
////const a = <div>{<div />/*1*/x/*2*/}</div>

goTo.marker('1');
verify.getSyntacticDiagnostics([{
  code: 1005,
  message: "'}' expected.",
  range: {
    fileName: test.marker('1').fileName,
    pos: test.marker('1').position,
    end: test.marker('2').position,
  }
}]);
verify.quickInfoIs('var x: string');