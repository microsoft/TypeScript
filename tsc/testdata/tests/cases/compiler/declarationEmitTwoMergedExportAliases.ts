// @declaration: true
// @emitDeclarationOnly: true
// @module: commonjs, nodenext, preserve

// @filename: a.ts
class Route<T> {
    private parts = 0;
    readonly schema: T;
    constructor(schema: T) { this.schema = schema; }
}
export { Route };
export function create() { return new Route({ value: 0, enabled: true }); }

// @filename: b.ts
export { Route } from "./a";
export declare namespace Route {
    export type Schema = { value: number };
}

// @filename: c.ts
export { Route as Factory } from "./b";
export declare namespace Factory {
    export type Options = { enabled: boolean };
}

// @filename: index.ts
import { Factory } from "./c";
import { create } from "./a";
export const route = new Factory<Factory.Schema & Factory.Options>({ value: 0, enabled: true });
export const created = create();
export const constructor = Factory;
export type Config = Factory.Schema & Factory.Options;