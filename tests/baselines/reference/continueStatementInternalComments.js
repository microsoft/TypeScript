//// [continueStatementInternalComments.ts]
foo: for (;;) {
    /*1*/ continue /*2*/ foo /*3*/;
}

//// [continueStatementInternalComments.js]
foo: for (;;) {
    /*1*/ continue /*2*/ foo /*3*/;
}
