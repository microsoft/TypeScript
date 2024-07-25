//// [tests/cases/compiler/keywordExpressionInternalComments.ts] ////

//// [keywordExpressionInternalComments.ts]
/*1*/ new /*2*/ Array /*3*/;
/*1*/ typeof /*2*/ Array /*3*/;
/*1*/ void /*2*/ Array /*3*/;
/*1*/ delete /*2*/ Array.toString /*3*/;


//// [keywordExpressionInternalComments.js]
/*1*/ new /*2*/ Array /*3*/;
/*1*/ typeof /*2*/ Array /*3*/;
/*1*/ void /*2*/ Array /*3*/;
/*1*/ delete /*2*/ Array.toString /*3*/;
