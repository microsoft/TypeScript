// @filename: index.ts
export * from './eventList';

// @filename: test.ts
import { EventList } from "./eventList";

declare const p012: "p0" | "p1" | "p2"
const t: keyof EventList = p012

// @filename: eventList.ts
export interface EventList {
    p0: [];
}

// @filename: foo.ts
declare module './index' {
    interface EventList {
        p1: []
    }
}
export {};


// @filename: bar.ts
declare module './index' {
    interface EventList {
        p2: []
    }
}
export {};
