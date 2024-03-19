//// [tests/cases/compiler/arrayDestructuringInSwitch1.ts] ////

//// [arrayDestructuringInSwitch1.ts]
export type Expression = BooleanLogicExpression | 'true' | 'false';
export type BooleanLogicExpression = ['and', ...Expression[]] | ['not', Expression];

export function evaluate(expression: Expression): boolean {
  if (Array.isArray(expression)) {
    const [operator, ...operands] = expression;
    switch (operator) {
      case 'and': {
        return operands.every((child) => evaluate(child));
      }
      case 'not': {
        return !evaluate(operands[0]);
      }
      default: {
        throw new Error(`${operator} is not a supported operator`);
      }
    }
  } else {
    return expression === 'true';
  }
}

//// [arrayDestructuringInSwitch1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = evaluate;
function evaluate(expression) {
    if (Array.isArray(expression)) {
        var operator = expression[0], operands = expression.slice(1);
        switch (operator) {
            case 'and': {
                return operands.every(function (child) { return evaluate(child); });
            }
            case 'not': {
                return !evaluate(operands[0]);
            }
            default: {
                throw new Error("".concat(operator, " is not a supported operator"));
            }
        }
    }
    else {
        return expression === 'true';
    }
}
