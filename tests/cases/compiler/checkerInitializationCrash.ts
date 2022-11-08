// @module: esnext
// @moduleResolution: node
// @esModuleInterop: true

// @Filename: /node_modules/@fullcalendar/react/index.d.ts
import * as react from 'react';
declare global {
  namespace FullCalendarVDom {
    export import VNode = react.ReactNode;
  }
}

export default class FullCalendar {
}

// @Filename: /node_modules/@fullcalendar/core/index.d.ts
import * as preact from 'preact';
declare global {
  namespace FullCalendarVDom {
    type VNode = preact.VNode<any>;
  }
}

export type EventInput = any;

// @Filename: /node_modules/@types/react/index.d.ts
export = React;
export as namespace React;
declare namespace React {
    type ReactNode = any;
    function useMemo<T>(factory: () => T, deps: undefined): T;
}

// @Filename: /node_modules/preact/index.d.ts
export as namespace preact;
export interface VNode<P = {}> {}

// @Filename: /index.tsx
import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/core";
