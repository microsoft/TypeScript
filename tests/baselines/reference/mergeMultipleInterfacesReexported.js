//// [tests/cases/compiler/mergeMultipleInterfacesReexported.ts] ////

//// [index.ts]
export * from './eventList';

//// [test.ts]
import { EventList } from "./eventList";

declare const p012: "p0" | "p1" | "p2"
const t: keyof EventList = p012

//// [eventList.ts]
export interface EventList {
    p0: [];
}

//// [foo.ts]
declare module './index' {
    interface EventList {
        p1: []
    }
}
export {};


//// [bar.ts]
declare module './index' {
    interface EventList {
        p2: []
    }
}
export {};


//// [eventList.js]
export {};
//// [index.js]
export * from './eventList';
//// [test.js]
const t = p012;
export {};
//// [foo.js]
export {};
//// [bar.js]
export {};
