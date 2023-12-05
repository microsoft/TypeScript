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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./eventList"), exports);
//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var t = p012;
//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
