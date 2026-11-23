//// [tests/cases/compiler/declarationEmitDefaultImportPrivateClass.ts] ////

//// [route.d.ts]
export type Schema = unknown;
declare class Route {
    private parts;
}
export = Route;

//// [index.ts]
import Route from "./route";
export const route = new Route();



//// [index.d.ts]
import Route from "./route";
export declare const route: Route;
