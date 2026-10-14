//// [tests/cases/compiler/declarationEmitTwoMergedExportAliases.ts] ////

//// [a.ts]
class Route<T> {
    private parts = 0;
    readonly schema: T;
    constructor(schema: T) { this.schema = schema; }
}
export { Route };
export function create() { return new Route({ value: 0, enabled: true }); }

//// [b.ts]
export { Route } from "./a";
export declare namespace Route {
    export type Schema = { value: number };
}

//// [c.ts]
export { Route as Factory } from "./b";
export declare namespace Factory {
    export type Options = { enabled: boolean };
}

//// [index.ts]
import { Factory } from "./c";
import { create } from "./a";
export const route = new Factory<Factory.Schema & Factory.Options>({ value: 0, enabled: true });
export const created = create();
export const constructor = Factory;
export type Config = Factory.Schema & Factory.Options;



//// [a.d.ts]
declare class Route<T> {
    private parts;
    readonly schema: T;
    constructor(schema: T);
}
export { Route };
export declare function create(): Route<{
    value: number;
    enabled: boolean;
}>;
//// [b.d.ts]
export { Route } from "./a";
export declare namespace Route {
    type Schema = {
        value: number;
    };
}
//// [c.d.ts]
export { Route as Factory } from "./b";
export declare namespace Factory {
    type Options = {
        enabled: boolean;
    };
}
//// [index.d.ts]
import { Factory } from "./c";
export declare const route: Factory<Factory.Schema & Factory.Options>;
export declare const created: Factory<{
    value: number;
    enabled: boolean;
}>;
export declare const constructor: typeof Factory;
export type Config = Factory.Schema & Factory.Options;
