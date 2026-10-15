//// [tests/cases/compiler/declarationEmitMergedExportAlias.ts] ////

//// [route.d.ts]
export class Route<T> {
    private parts;
    readonly schema: T;
    constructor(schema: T);
}

//// [reexport.ts]
export { Route as Factory } from "./route";
export declare namespace Factory {
    export type Schema = { value: number };
}

//// [index.ts]
import { Factory } from "./reexport";
export const route = new Factory<Factory.Schema>({ value: 0 });
export const constructor = Factory;



//// [reexport.d.ts]
export { Route as Factory } from "./route";
export declare namespace Factory {
    type Schema = {
        value: number;
    };
}
//// [index.d.ts]
import { Factory } from "./reexport";
export declare const route: Factory<Factory.Schema>;
export declare const constructor: typeof Factory;
