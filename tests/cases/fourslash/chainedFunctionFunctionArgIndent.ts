/// <reference path='fourslash.ts' />
//// declare var $: any;
//// $(".contentDiv").each(function (index, element) {/**/
////     // <-- ensure cursor is here after return on above
//// });

goTo.marker();
edit.insert("\n");
verify.indentationIs(4);
edit.insert("}");
verify.indentationIs(0); // arguments should be aligned with the preceding argument
