//// [tests/cases/conformance/parser/ecmascript5/Expressions/parserConditionalExpression1.ts] ////

//// [parserConditionalExpression1.ts]
(a=this.R[c])?a.JW||(a.e5(this,c),a.JW=_.l):this.A

//// [parserConditionalExpression1.js]
(a = this.R[c]) ? a.JW || (a.e5(this, c), a.JW = _.l) : this.A;
