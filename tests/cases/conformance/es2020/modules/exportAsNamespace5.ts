// @module: esnext
// @moduleResolution: bundler

// @filename: three.d.ts
export type Named = 0;
declare const Named: 0;

// @filename: two.d.ts
export * as default from "./three";

// @filename: one.ts
import ns from "./two";
type Alias = ns.Named;
ns.Named;
