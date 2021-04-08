//// [narrowingOfQualifiedNames.ts]
interface IProperties {
    foo?: {
        aaa: string
        bbb: string
    }
}

function init(properties: IProperties) {
    if (properties.foo) {
        type FooOK = typeof properties.foo;
        properties.foo; // type is { aaa: string; bbb: string; }
        for (const x of [1, 2, 3]) {
          properties.foo; // type is { aaa: string; bbb: string; }
          type FooOrUndefined = typeof properties.foo; //type is { aaa: string; bbb: string; } | undefined
        }
    }
}

//// [narrowingOfQualifiedNames.js]
"use strict";
function init(properties) {
    if (properties.foo) {
        properties.foo; // type is { aaa: string; bbb: string; }
        for (var _i = 0, _a = [1, 2, 3]; _i < _a.length; _i++) {
            var x = _a[_i];
            properties.foo; // type is { aaa: string; bbb: string; }
        }
    }
}
