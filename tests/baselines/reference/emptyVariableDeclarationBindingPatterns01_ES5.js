//// [emptyVariableDeclarationBindingPatterns01_ES5.ts]

(function () {
    var a: any;

    var {} = a;
    let {} = a;
    const {} = a;

    var [] = a;
    let [] = a;
    const [] = a;
})();

//// [emptyVariableDeclarationBindingPatterns01_ES5.js]
(function () {
    var a;
    var ;
    var ;
    var ;
    var ;
    var ;
    var ;
})();


//// [emptyVariableDeclarationBindingPatterns01_ES5.d.ts]
