//// [assignmentCompatForEnums.ts]
enum TokenType { One, Two };

var list = {};


function returnType(): TokenType { return null; }

function foo() {
    var x = returnType();

    var x: TokenType = list['one'];
}



//// [assignmentCompatForEnums.js]
var TokenType;
(function (TokenType) {
    TokenType[TokenType["One"] = 0] = "One";
    TokenType[TokenType["Two"] = 1] = "Two";
})(TokenType || (TokenType = {}));
;
var list = {};
function returnType() { return null; }
function foo() {
    var x = returnType();
    var x = list['one'];
}
