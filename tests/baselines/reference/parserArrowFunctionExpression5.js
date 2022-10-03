//// [parserArrowFunctionExpression5.ts]
(bar(x,
    () => {},
    () => {}
  )
)


//// [parserArrowFunctionExpression5.js]
(bar(x, function () { }, function () { }));
