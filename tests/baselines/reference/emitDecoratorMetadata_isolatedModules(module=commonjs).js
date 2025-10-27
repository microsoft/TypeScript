//// [tests/cases/compiler/emitDecoratorMetadata_isolatedModules.ts] ////

//// [type1.ts]
interface T1 {}
export type { T1 }

//// [type2.ts]
export interface T2 {}

//// [class3.ts]
export class C3 {}

//// [index.ts]
import { T1 } from "./type1";
import * as t1 from "./type1";
import type { T2 } from "./type2";
import { C3 } from "./class3";
declare var EventListener: any;

class HelloWorld {
  @EventListener('1')
  handleEvent1(event: T1) {} // Error
  
  @EventListener('2')
  handleEvent2(event: T2) {} // Ok

  @EventListener('1')
  p1!: T1; // Error

  @EventListener('1')
  p1_ns!: t1.T1; // Ok

  @EventListener('2')
  p2!: T2; // Ok

  @EventListener('3')
  handleEvent3(event: C3): T1 { return undefined! } // Ok, Error
}


//// [type1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [type2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [class3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C3 = void 0;
class C3 {
}
exports.C3 = C3;
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const t1 = __importStar(require("./type1"));
const class3_1 = require("./class3");
let HelloWorld = (() => {
    class HelloWorld {
        handleEvent1(event) { } // Error
        handleEvent2(event) { } // Ok
        handleEvent3(event) { return undefined; } // Ok, Error
    }
    __decorate([
        EventListener('1'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], HelloWorld.prototype, "handleEvent1", null);
    __decorate([
        EventListener('2'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], HelloWorld.prototype, "handleEvent2", null);
    __decorate([
        EventListener('1'),
        __metadata("design:type", Object)
    ], HelloWorld.prototype, "p1", void 0);
    __decorate([
        EventListener('1'),
        __metadata("design:type", Object)
    ], HelloWorld.prototype, "p1_ns", void 0);
    __decorate([
        EventListener('2'),
        __metadata("design:type", Object)
    ], HelloWorld.prototype, "p2", void 0);
    __decorate([
        EventListener('3'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [class3_1.C3]),
        __metadata("design:returntype", Object)
    ], HelloWorld.prototype, "handleEvent3", null);
    return HelloWorld;
})();
