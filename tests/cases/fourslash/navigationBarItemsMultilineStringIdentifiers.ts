
////{| "itemName": "\"Multiline\\r\\nMadness\"", "kind": "module" |}
////declare module "Multiline\r\nMadness" {
////}
////
////{| "itemName": "\"Multiline\\\nMadness\"", "kind": "module" |}
////declare module "Multiline\
////Madness" {
////}
////{| "itemName": "\"MultilineMadness\"", "kind": "module" |}
////declare module "MultilineMadness" {}
////
////{| "itemName": "Foo", "kind": "interface", "parentName": "<global>" |}
////interface Foo {
////    {| "itemName": "\"a1\\\\\\r\\nb\"", "kind": "property", "parentName": "Foo" |}
////    "a1\\\r\nb";
////    {| "itemName": "\"a2\\\n    \\\n    b\"", "kind": "method", "parentName": "Foo" |}
////    "a2\
////    \
////    b"(): Foo;
////}
////
////{| "itemName": "Bar", "kind": "class", "parentName": "<global>" |}
////class Bar implements Foo {
////    {| "itemName": "'a1\\\\\\r\\nb'", "kind": "property", "parentName": "Bar" |}
////    'a1\\\r\nb': Foo;
////
////    {| "itemName": "'a2\\\n    \\\n    b'", "kind": "method", "parentName": "Bar" |}
////    'a2\
////    \
////    b'(): Foo {
////        return this;
////    }
////}


test.markers().forEach((marker) => {
    verify.navigationBarContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

verify.navigationBarCount(12); // global + 1 child, interface w/ 2 properties, class w/ 2 properties, 3 modules
