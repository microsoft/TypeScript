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
verify.completions({ includes: ["n", "s", "b"].map(name => ({ name, kind: "property" })) });;
edit.insert('n.');
verify.completions({ includes: { name: "toFixed", kind: "method", kindModifiers: "declare" } });

edit.backspace(4);
edit.insert('y.');
verify.completions({ includes: { name: "toUpperCase", kind: "method", kindModifiers: "declare" } });
edit.backspace(2);
edit.insert('z(');
verify.signatureHelp({
    text: "z(a: (number | boolean), b: Array<string>): string",
    parameterDocComment: "The first param",
    tags: [
        { name: "param", text: [{ kind: "parameterName", text: "a" }, { kind: "space", text: " " }, { kind: "text", text: "The first param" }] },
        { name: "param", text: [{ kind: "parameterName", text: "b" }, { kind: "space", text: " " }, { kind: "text", text: "The second param" }] },
    ],
});
