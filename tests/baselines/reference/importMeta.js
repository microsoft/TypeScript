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


//// [example.js]
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
export let x = import.meta;
export let y = import.metal;
export let z = import.import.import.malkovich;
//// [scriptLookingFile01.js]
let globalA = import.meta;
let globalB = import.metal;
let globalC = import.import.import.malkovich;
