/// <reference path="fourslash.ts"/>

////
////new Array
////{| "indent": 0 |}
////new Array;
////{| "indent": 0 |}
////new Array(0);
////{| "indent": 0 |}
////new Array(;
////{| "indent": 0 |}
////new Array(
////{| "indent": 4 |}
 
test.markers().forEach(marker => {
    verify.indentationAtPositionIs(marker.fileName, marker.position, marker.data.indent);
});
