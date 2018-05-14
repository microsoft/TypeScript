///<reference path="fourslash.ts" />

// @allowJs: true

// @Filename: node_modules/myMod/index.js
//// exports.n = 3;
//// exports.s = 'foo';
//// exports.b = true;

// @Filename: node_modules/anotherMod/index.js
//// exports.x = 3;
//// exports.y = 'foo';
//// /**
////   * @param {(number | boolean)} a The first param
////   * @param {Array<string>}      b The second param
////   */
//// exports.z = function(a,b){ return "test"; };

// @Filename: consumer.js
//// import * as x from 'myMod';
//// import {y,z} from 'anotherMod';
//// x/**/;

goTo.file('consumer.js');
goTo.marker();
edit.insert('.');
verify.completionListContains("n", /*displayText:*/ undefined, /*documentation*/ undefined, "property");
verify.completionListContains("s", /*displayText:*/ undefined, /*documentation*/ undefined, "property");
verify.completionListContains("b", /*displayText:*/ undefined, /*documentation*/ undefined, "property");
edit.insert('n.');
verify.completionListContains("toFixed", /*displayText:*/ undefined, /*documentation*/ undefined, "method");

edit.backspace(4);
edit.insert('y.');
verify.completionListContains("toUpperCase", /*displayText:*/ undefined, /*documentation*/ undefined, "method");
edit.backspace(2);
edit.insert('z(');
verify.signatureHelp({
    text: "z(a: number | boolean, b: string[]): string",
    // TODO: GH#24129
    parameterDocComment: "The first param\nThe first param",
    tags: [
        { name: "param", text: "a The first param" },
        { name: "param", text: "b The second param" },
        { name: "param", text: "a The first param" },
        { name: "param", text: "b The second param" },
    ],
});
