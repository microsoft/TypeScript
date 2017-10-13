// ==ORIGINAL==
interface UnaryExpression {
    kind: "Unary";
    operator: string;
    operand: any;
}

function parseUnaryExpression(operator: string): UnaryExpression {
    /*[#|*/return {
        kind: "Unary",
        operator,
        operand: parsePrimaryExpression(),
    };/*|]*/
}

function parsePrimaryExpression(): any {
    throw "Not implemented";
}
// ==SCOPE::Extract to inner function in function 'parseUnaryExpression'==
interface UnaryExpression {
    kind: "Unary";
    operator: string;
    operand: any;
}

function parseUnaryExpression(operator: string): UnaryExpression {
    return /*RENAME*/newFunction();

    function newFunction(): UnaryExpression {
        return {
            kind: "Unary",
            operator,
            operand: parsePrimaryExpression(),
        };
    }
}

function parsePrimaryExpression(): any {
    throw "Not implemented";
}
// ==SCOPE::Extract to function in global scope==
interface UnaryExpression {
    kind: "Unary";
    operator: string;
    operand: any;
}

function parseUnaryExpression(operator: string): UnaryExpression {
    return /*RENAME*/newFunction(operator);
}

function newFunction(operator: string): UnaryExpression {
    return {
        kind: "Unary",
        operator,
        operand: parsePrimaryExpression(),
    };
}

function parsePrimaryExpression(): any {
    throw "Not implemented";
}