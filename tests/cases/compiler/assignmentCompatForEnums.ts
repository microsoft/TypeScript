enum TokenType { One, Two };

var list = {};


function returnType(): TokenType { return null; }

function foo() {
    var x = returnType();

    var x: TokenType = list['one'];
}

