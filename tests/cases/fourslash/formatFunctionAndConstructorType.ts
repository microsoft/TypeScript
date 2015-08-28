/// <reference path='fourslash.ts' />

////function renderElement(
////    element: Element,
////    renderNode:
////(/*funcAutoformat*/
////    node: Node/*funcParamAutoformat*/
/////*funcIndent*/
////    ) => void,
////newNode:
////new(/*constrAutoformat*/
////    name: string/*constrParamAutoformat*/
/////*constrIndent*/
////) => Node
////): void {
////}

format.document();

goTo.marker("funcAutoformat");
verify.currentLineContentIs("        (");
goTo.marker("funcParamAutoformat");
verify.currentLineContentIs("            node: Node");
goTo.marker("funcIndent");
verify.indentationIs(12);

goTo.marker("constrAutoformat");
verify.currentLineContentIs("        new (");
goTo.marker("constrParamAutoformat");
verify.currentLineContentIs("            name: string");
goTo.marker("constrIndent");
verify.indentationIs(12);