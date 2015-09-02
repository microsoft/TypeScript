//// [emptyVariableDeclarationBindingPatterns01_ES6.ts]

(function () {
    var a: any;

    var {} = a;
    let {} = a;
    const {} = a;

    var [] = a;
    let [] = a;
    const [] = a;
})();

//// [emptyVariableDeclarationBindingPatterns01_ES6.js]
(function () {
    var a;
    var {  } = a;
    let {  } = a;
    const {  } = a;
    var [] = a;
    let [] = a;
    const [] = a;
})();


//// [emptyVariableDeclarationBindingPatterns01_ES6.d.ts]
