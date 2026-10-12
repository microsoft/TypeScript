//// [tests/cases/compiler/declarationEmitExportAssignmentWithTypeExports.ts] ////

//// [route.d.ts]
export type Schema = { value: number };
declare class Route<T> {
    private parts;
    protected typeHints: unknown;
    readonly schema: T;
    constructor(schema: T);
}
export = Route;

//// [defaultImport.ts]
import Route, { Schema } from "./route";
export const route = new Route<Schema>({ value: 0 });
export const constructor = Route;
export function createRoute() {
    return new Route({ value: "" });
}

//// [namedDefaultImport.ts]
import { default as Route, Schema } from "./route";
export const route = new Route<Schema>({ value: 0 });

//// [importEquals.ts]
import Route = require("./route");
export const route = new Route<Route.Schema>({ value: 0 });

//// [reexport.ts]
export { default } from "./route";
export type { Schema } from "./route";

//// [reexportImport.ts]
import Route, { Schema } from "./reexport";
export const route = new Route<Schema>({ value: 0 });



//// [defaultImport.d.ts]
import Route, { Schema } from "./route";
export declare const route: Route<Schema>;
export declare const constructor: typeof Route;
export declare function createRoute(): Route<{
    value: string;
}>;
//// [namedDefaultImport.d.ts]
import { default as Route, Schema } from "./route";
export declare const route: Route<Schema>;
//// [importEquals.d.ts]
import Route = require("./route");
export declare const route: Route<Route.Schema>;
//// [reexport.d.ts]
export { default } from "./route";
export type { Schema } from "./route";
//// [reexportImport.d.ts]
import Route, { Schema } from "./reexport";
export declare const route: Route<Schema>;
