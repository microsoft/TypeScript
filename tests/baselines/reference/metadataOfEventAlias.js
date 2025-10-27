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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SomeClass = void 0;
function Input(target, key) { }
class SomeClass {
}
exports.SomeClass = SomeClass;
__decorate([
    Input,
    __metadata("design:type", Object)
], SomeClass.prototype, "event", void 0);
