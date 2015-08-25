/// <reference path='fourslash.ts' />

////function renderElement(
////    element: Element,
////    renderNode: (
////    node: Node/*paramInFuntionType*/
/////*paramIndent*/
////    ) => void
////): void {
////}

format.document();

goTo.marker("paramInFuntionType");
verify.currentLineContentIs("        node: Node");
goTo.marker("paramIndent");
verify.indentationIs(8);