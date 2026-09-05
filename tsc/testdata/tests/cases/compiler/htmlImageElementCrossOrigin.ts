// @lib: es5,dom
// @strict: true

const img = new Image(10, 10);

img.crossOrigin = "anonymous";
img.crossOrigin = "use-credentials";
img.crossOrigin = "";
img.crossOrigin = null;
img.crossOrigin = "abc";

const value: "anonymous" | "use-credentials" | "" | null = img.crossOrigin;
