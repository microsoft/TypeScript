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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//// [moduleLookingFile01.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = exports.y = exports.x = void 0;
exports.x = import.meta;
exports.y = import.metal;
exports.z = import.import.import.malkovich;
//// [scriptLookingFile01.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let globalA = import.meta;
let globalB = import.metal;
let globalC = import.import.import.malkovich;
//// [assignmentTargets.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
exports.foo = import.meta.blah = import.meta.blue = import.meta;
import.meta = exports.foo;
const { a, b, c } = import.meta.wellKnownProperty;
