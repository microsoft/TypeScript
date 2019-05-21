/// <reference path="fourslash.ts" />

//@Filename: jsxExpressionFollowedByIdentifier.tsx
////declare var React: any;
////const a = <div>{<div />[|x|]}</div>
////const b = <div x={<div />[|x|]} />

test.ranges().forEach(range => {
  verify.errorExistsAtRange(range, 1005, "'}' expected.");
  // This is just to ensure getting quick info doesn’t crash
  verify.not.quickInfoExists();
});
