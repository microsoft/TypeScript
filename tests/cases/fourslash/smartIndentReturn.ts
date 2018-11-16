/// <reference path='fourslash.ts'/>

//// function foo() {
////     if (true) {
////         {| "indentation": 8|}
////         return;
////         {| "indentation": 8|}
////     }
//// }

for (const marker of test.markers()) {
    verify.indentationAtPositionIs(marker.fileName, marker.position, marker.data.indentation);
}
