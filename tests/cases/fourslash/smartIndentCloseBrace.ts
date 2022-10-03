/// <reference path='fourslash.ts'/>

////class A {    
////    {| "indentation": 0|}  }
////class B {    
////    var x = 1;
////    {| "indentation": 0|}  }

test.markers().forEach((marker) => {
    verify.indentationAtPositionIs(marker.fileName, marker.position, marker.data.indentation);
});
