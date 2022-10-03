/// <reference path="fourslash.ts"/>

////async   function asyncFunction() {/*asyncKeyword*/
////    await
/////*awaitExpressionIndent*/
////    Promise.resolve("await");/*awaitExpressionAutoformat*/
////    return  await   Promise.resolve("completed");/*awaitKeyword*/
////}

format.document();

goTo.marker("asyncKeyword");
verify.currentLineContentIs("async function asyncFunction() {");
goTo.marker("awaitExpressionIndent");
verify.indentationIs(8);
goTo.marker("awaitExpressionAutoformat");
verify.currentLineContentIs('        Promise.resolve("await");');
goTo.marker("awaitKeyword");
verify.currentLineContentIs('    return await Promise.resolve("completed");');