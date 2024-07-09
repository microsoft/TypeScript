// @module: commonjs
// @filename: a.ts
export * from "./b";
export * from "./c";

// @filename: b.ts
export {Animals} from "./c";

// @filename: c.ts
export enum Animals {
	Cat,
	Dog
};