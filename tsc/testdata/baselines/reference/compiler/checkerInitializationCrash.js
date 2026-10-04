//// [tests/cases/compiler/checkerInitializationCrash.ts] ////

//// [index.d.ts]
import * as react from 'react';
declare global {
  namespace FullCalendarVDom {
    export import VNode = react.ReactNode;
  }
}

export default class FullCalendar {
}

//// [index.d.ts]
import * as preact from 'preact';
declare global {
  namespace FullCalendarVDom {
    type VNode = preact.VNode<any>;
  }
}

export type EventInput = any;

//// [index.d.ts]
export = React;
export as namespace React;
declare namespace React {
    type ReactNode = any;
    function useMemo<T>(factory: () => T, deps: undefined): T;
}

//// [index.d.ts]
export as namespace preact;
export interface VNode<P = {}> {}

//// [index.tsx]
import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/core";


//// [index.js]
export {};
