/// <reference path="fourslash.ts" />
//// {| "itemName": "Windows", "kind": "module", "parentName": "" |}declare module Windows {
////     {| "itemName": "Foundation", "kind": "module", "parentName": "" |}export module Foundation {
////         export var {| "itemName": "A", "kind": "var" |}A;
////         {| "itemName": "Test", "kind": "class", "parentName": "Foundation" |}export class Test {
////             {| "itemName": "wow", "kind": "method" |}public wow();
////         }
////     }
//// }
//// 
//// {| "itemName": "Windows", "kind": "module", "parentName": "", "isAdditionalRange": true |}declare module Windows {
////     {| "itemName": "Foundation", "kind": "module", "parentName": "", "isAdditionalRange": true |}export module Foundation {
////         export var {| "itemName": "B", "kind": "var" |}B;
////         {| "itemName": "Test", "kind": "module" |}export module Test {
////             {| "itemName": "Boom", "kind": "function" |}export function Boom(): number;
////         }
////     }
//// }
//// 
//// {| "itemName": "ABC", "kind": "class", "parentName": "" |}class ABC {
////     {| "itemName": "foo", "kind": "method" |}public foo() {
////         return 3;
////     }
//// }
//// 
//// {| "itemName": "ABC", "kind": "module", "parentName": "" |}module ABC {
////     export var {| "itemName": "x", "kind": "var" |}x = 3;
//// }

test.markers().forEach(marker => {
    if (marker.data) {
        verify.navigationBarContains(
            marker.data.itemName,
            marker.data.kind,
            marker.fileName,
            marker.data.parentName,
            marker.data.isAdditionalRange,
            marker.position);
    }
});
verify.navigationBarCount(15);