//// [forInModule.ts]
module Foo {
	for (var i = 0; i < 1; i++) {
		i+i;
	}
}

//// [forInModule.js]
var Foo;
(function (Foo) {
    for (var i = 0; i < 1; i++) {
        i + i;
    }
})(Foo || (Foo = {}));
