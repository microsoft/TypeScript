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
////
////  someRandomFunction(
////      { prop7: 1, prop8: 2 },
////      { prop9: 3, prop10: 4 },
////      {
////        prop11: 5,
////        prop2: 6
////      }
////  );

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
});

someRandomFunction(
    { prop7: 1, prop8: 2 },
    { prop9: 3, prop10: 4 },
    {
        prop11: 5,
        prop2: 6
    }
);`);
