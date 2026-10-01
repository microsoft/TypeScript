// @declaration: true
// @emitDeclarationOnly: true
// @module: commonjs, nodenext, preserve
// @esModuleInterop: true

// @filename: route.d.ts
export type Schema = unknown;
declare class Route {
    private parts;
}
export = Route;

// @filename: index.ts
import Route from "./route";
export const route = new Route();