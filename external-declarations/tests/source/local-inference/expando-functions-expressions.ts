// @strict:true
// @target: es2015

// @fileName: propNames.ts

export const S = "s-name";

// @fileName: expando-functions.ts
// import { S } from ''
export const x = ()=> {}
x.test = 1;

export const fnExpression = function (): string {
    return "";
}
fnExpression.prop = "1"
fnExpression.prop = false
fnExpression["SS"] = "A"
fnExpression["SS"] = "A"
fnExpression[S] = 1
fnExpression[S] = 1