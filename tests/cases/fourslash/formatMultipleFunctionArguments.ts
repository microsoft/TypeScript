/// <reference path="fourslash.ts"/>

////
////  someRandomFunction({
////    prop1: 1,
////    prop2: 2
////  }, {
////    prop3: 3,
////    prop4: 4
////  }, {
////    prop5: 5,
////    prop6: 6
////  });

format.document();
verify.currentFileContentIs(`
someRandomFunction({
    prop1: 1,
    prop2: 2
}, {
    prop3: 3,
    prop4: 4
}, {
    prop5: 5,
    prop6: 6
});`);
