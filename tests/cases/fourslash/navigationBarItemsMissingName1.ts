////export function
/////**
//// * This is a class.
//// */
////{| "itemName": "C", "kind": "class", "parentName": "\"navigationBarItemsMissingName1\"" |} class C {
////    {| "itemName": "foo", "kind": "method" |} foo() {
////    }
////}


test.markers().forEach((marker) => {
    verify.navigationBarContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

/// Root + 1 child, class + 1 child
verify.navigationBarCount(4);
