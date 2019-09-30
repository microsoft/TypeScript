//// [variableDeclarationWithTrailingComment.ts]
for (let i = 0; i <= 10; ++i) {
  let _a, _b; /// 123
}

//// [variableDeclarationWithTrailingComment.js]
for (var i = 0; i <= 10; ++i) {
    var _a = void 0, _b = void 0; /// 123
}
