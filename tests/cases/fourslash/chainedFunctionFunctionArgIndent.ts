/// <reference path='fourslash.ts' />
//// declare var $: any;
//// $(".contentDiv").each(function (index, element) {/**/
////     // <-- ensure cursor is here after return on above
//// }); // Ensure indent is 0 after LBrace

goTo.marker();
edit.insert("\n");
verify.indentationIs(4);
edit.insert("}");
verify.indentationIs(0);
