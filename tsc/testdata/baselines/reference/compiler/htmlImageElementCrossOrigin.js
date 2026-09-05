//// [tests/cases/compiler/htmlImageElementCrossOrigin.ts] ////

//// [htmlImageElementCrossOrigin.ts]
const img = new Image(10, 10);

img.crossOrigin = "anonymous";
img.crossOrigin = "use-credentials";
img.crossOrigin = "";
img.crossOrigin = null;
img.crossOrigin = "abc";

const value: "anonymous" | "use-credentials" | "" | null = img.crossOrigin;


//// [htmlImageElementCrossOrigin.js]
"use strict";
const img = new Image(10, 10);
img.crossOrigin = "anonymous";
img.crossOrigin = "use-credentials";
img.crossOrigin = "";
img.crossOrigin = null;
img.crossOrigin = "abc";
const value = img.crossOrigin;
