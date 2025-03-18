//// [tests/cases/compiler/metadataOfEventAlias.ts] ////

//// [event.ts]
export interface Event { title: string };

//// [test.ts]
import { Event } from './event';
function Input(target: any, key: string): void { }
export class SomeClass {
    @Input event: Event;
}

//// [event.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SomeClass = void 0;
function Input(target, key) { }
class SomeClass {
    @Input
    event;
}
exports.SomeClass = SomeClass;
