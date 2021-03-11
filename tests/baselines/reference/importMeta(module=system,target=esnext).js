//// [tests/cases/conformance/es2019/importMeta/importMeta.ts] ////

//// [example.ts]
// Adapted from https://github.com/tc39/proposal-import-meta/tree/c3902a9ffe2e69a7ac42c19d7ea74cbdcea9b7fb#example
(async () => {
  const response = await fetch(new URL("../hamsters.jpg", import.meta.url).toString());
  const blob = await response.blob();

  const size = import.meta.scriptElement.dataset.size || 300;

  const image = new Image();
  image.src = URL.createObjectURL(blob);
  image.width = image.height = size;

  document.body.appendChild(image);
})();

//// [moduleLookingFile01.ts]
export let x = import.meta;
export let y = import.metal;
export let z = import.import.import.malkovich;

//// [scriptLookingFile01.ts]
let globalA = import.meta;
let globalB = import.metal;
let globalC = import.import.import.malkovich;

//// [assignmentTargets.ts]
export const foo: ImportMeta = import.meta.blah = import.meta.blue = import.meta;
import.meta = foo;

// @Filename augmentations.ts
declare global {
  interface ImportMeta {
    wellKnownProperty: { a: number, b: string, c: boolean };
  }
}

const { a, b, c } = import.meta.wellKnownProperty;

//// [example.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            // Adapted from https://github.com/tc39/proposal-import-meta/tree/c3902a9ffe2e69a7ac42c19d7ea74cbdcea9b7fb#example
            (async () => {
                const response = await fetch(new URL("../hamsters.jpg", context_1.meta.url).toString());
                const blob = await response.blob();
                const size = context_1.meta.scriptElement.dataset.size || 300;
                const image = new Image();
                image.src = URL.createObjectURL(blob);
                image.width = image.height = size;
                document.body.appendChild(image);
            })();
        }
    };
});
//// [moduleLookingFile01.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var x, y, z;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("x", x = context_1.meta);
            exports_1("y", y = import.metal);
            exports_1("z", z = import.import.import.malkovich);
        }
    };
});
//// [scriptLookingFile01.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var globalA, globalB, globalC;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            globalA = context_1.meta;
            globalB = import.metal;
            globalC = import.import.import.malkovich;
        }
    };
});
//// [assignmentTargets.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var foo, _a, a, b, c;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("foo", foo = context_1.meta.blah = context_1.meta.blue = context_1.meta);
            context_1.meta = foo;
            _a = context_1.meta.wellKnownProperty, a = _a.a, b = _a.b, c = _a.c;
        }
    };
});
