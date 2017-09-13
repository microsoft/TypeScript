// ==ORIGINAL==
interface UnaryExpression {
    kind: "Unary";
    operator: string;
    operand: any;
}

function parseUnaryExpression(operator: string): UnaryExpression {
    return {
        kind: "Unary",
        operator,
        operand: parsePrimaryExpression(),
    };
}

function parsePrimaryExpression(): any {
    throw "Not implemented";
}
// ==SCOPE::function 'parseUnaryExpression'==
interface UnaryExpression {
    kind: "Unary";
    operator: string;
    operand: any;
}

function parseUnaryExpression(operator: string): UnaryExpression {
    return /*RENAME*/newFunction();

    function newFunction() {
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
// ==SCOPE::global scope==
interface UnaryExpression {
    kind: "Unary";
    operator: string;
    operand: any;
}

function parseUnaryExpression(operator: string): UnaryExpression {
    return /*RENAME*/newFunction(operator);
}

function newFunction(operator: string) {
    return {
        kind: "Unary",
        operator,
        operand: parsePrimaryExpression(),
    };
}

function parsePrimaryExpression(): any {
    throw "Not implemented";
}