//// [taggedTemplateUntypedTagCall01.ts]
var tag: Function;
tag `Hello world!`;

//// [taggedTemplateUntypedTagCall01.js]
var tag;
(_a = ["Hello world!"], _a.raw = ["Hello world!"], tag(_a));
var _a;
