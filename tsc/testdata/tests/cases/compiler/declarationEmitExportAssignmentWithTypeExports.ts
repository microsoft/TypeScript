// @declaration: true
// @emitDeclarationOnly: true
// @module: commonjs, nodenext, preserve
// @esModuleInterop: true

// @filename: route.d.ts
export type Schema = { value: number };
declare class Route<T> {
    private parts;
    protected typeHints: unknown;
    readonly schema: T;
    constructor(schema: T);
}
export = Route;

// @filename: defaultImport.ts
import Route, { Schema } from "./route";
export const route = new Route<Schema>({ value: 0 });
export const constructor = Route;
export function createRoute() {
    return new Route({ value: "" });
}

// @filename: namedDefaultImport.ts
import { default as Route, Schema } from "./route";
export const route = new Route<Schema>({ value: 0 });

// @filename: importEquals.ts
import Route = require("./route");
export const route = new Route<Route.Schema>({ value: 0 });

// @filename: reexport.ts
export { default } from "./route";
export type { Schema } from "./route";

// @filename: reexportImport.ts
import Route, { Schema } from "./reexport";
export const route = new Route<Schema>({ value: 0 });