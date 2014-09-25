
////{| "itemName": "\"Multiline\\r\\nMadness\"", "kind": "module" |}
////declare module "Multiline\r\nMadness" {
////}
////
////{| "itemName": "\"MultilineMadness\"", "kind": "module" |}
////declare module "Multiline\
////Madness" {
////}
////declare module "MultilineMadness" {}
////
////{| "itemName": "Foo", "kind": "interface" |}
////interface Foo {
////    {| "itemName": "\"a1\\\\\\r\\nb\"", "kind": "property", "parentName": "Foo" |}
////    "a1\\\r\nb";
////    {| "itemName": "\"a2        b\"", "kind": "method", "parentName": "Foo" |}
////    "a2\
////    \
////    b"(): Foo;
////}
////
////{| "itemName": "Bar", "kind": "class" |}
////class Bar implements Foo {
////    {| "itemName": "\"a1\\\\\\r\\nb\"", "kind": "property", "parentName": "Bar" |}
////    'a1\\\r\nb': Foo;
////
////    {| "itemName": "\"a2        b\"", "kind": "method", "parentName": "Bar" |}
////    'a2\
////    \
////    b'(): Foo {
////        return this;
////    }
////}


test.markers().forEach((marker) => {
    verify.getScriptLexicalStructureListContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

verify.getScriptLexicalStructureListCount(8); // interface w/ 2 properties, class w/ 2 properties, 1 merged module, and 1 independent module
