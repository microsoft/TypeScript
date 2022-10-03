// @moduleResolution: minimal
// @noEmit: true
// @traceResolution: true
// @noTypesAndSymbols: true

// @Filename: /node_modules/@types/foo/index.d.ts
export {};

// @Filename: /node_modules/bar/index.d.ts
export {};

// @Filename: /main.ts
import {} from "foo";
import {} from "bar";
