//// [parserInvalidIdentifiersInVariableStatements1.ts]
var export;
var foo;
var class;
var bar;


//// [parserInvalidIdentifiersInVariableStatements1.js]
var ;
var foo;
var ;
var  = (function () {
    function () {
    }
    return ;
})();
;
var bar;
