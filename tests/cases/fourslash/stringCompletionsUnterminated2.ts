///<reference path="fourslash.ts" />

// @Filename: test0.ts
//// type Test = 'test';
//// const test0: Test = `[|t/*0*/|]; // this comment should not be deleted

// @Filename: test1.ts
//// type Test = 'test';
//// const test1: Test = '[|t/*1*/|]; // this comment should not be deleted

// @Filename: test2.ts
//// type Test = 'test';
//// const test2: Test = "[|t/*2*/|] other stuff; // this comment should not be deleted

// @Filename: test3.ts
//// type Test = 'test';
//// const test3: Test = "[|t/*3*/|]es // this comment should not be deleted

// @Filename: test4.ts
//// type Test = 'test';
//// const test4: Test = "[|tes/*4*/|] // this comment should not be deleted

// @Filename: file5.ts
//// type Test = 'test';
//// const test5: {prop0: Test, prop1: number, prop2: number,  } = { prop0: '[|t/*5*/|] ,prop1: 5, prop2: 2 };

// @Filename: file6.ts
//// type Test = 'test';
//// const test6: {prop0: Test, prop1: number, prop2: number,  } = { prop0: '[|t/*6*/|]es ,prop1: 5, prop2: 2 };

// @Filename: test7.ts
//// type Test = 'test asdf';
//// const test7: Test = `[|test as/*7*/|]; // this comment should not be deleted

// @Filename: test8.ts
//// type Test = 'test asdf';
//// const test8: Test = `[|test/*8*/|] as; // this comment should not be deleted

const markers = test.markers();
const ranges = test.ranges();

for (let i = 0; i < markers.length; i++) {
    verify.completions({
        marker: markers[i],
        includes: [{
            "name": "test",
            "kind": "string",
            "kindModifiers": "",
            "replacementSpan": ranges[i],
        }],
    });    
}
