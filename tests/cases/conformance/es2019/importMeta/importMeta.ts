
// @target: esnext,es5
// @module: esnext,commonjs,system,es2020
// @lib: es5,dom

// @Filename: example.ts
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

// @Filename: moduleLookingFile01.ts
export let x = import.meta;
export let y = import.metal;
export let z = import.import.import.malkovich;

// @Filename: scriptLookingFile01.ts
let globalA = import.meta;
let globalB = import.metal;
let globalC = import.import.import.malkovich;

// @Filename: assignmentTargets.ts
export const foo: ImportMeta = import.meta.blah = import.meta.blue = import.meta;
import.meta = foo;

// @Filename augmentations.ts
declare global {
  interface ImportMeta {
    wellKnownProperty: { a: number, b: string, c: boolean };
  }
}

const { a, b, c } = import.meta.wellKnownProperty;