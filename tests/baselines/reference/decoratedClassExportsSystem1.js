//// [a.ts]

declare function forwardRef(x: any): any;
declare var Something: any;
@Something({ v: () => Testing123 })
export class Testing123 {
    static prop0: string;
    static prop1 = Testing123.prop0;
}

//// [a.js]
System.register([], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var Testing123, Testing123_1;
    return {
        setters: [],
        execute: function () {
            Testing123 = Testing123_1 = class Testing123 {
            };
            Testing123.prop1 = Testing123_1.prop0;
            Testing123 = Testing123_1 = __decorate([
                Something({ v: () => Testing123_1 }),
                __metadata("design:paramtypes", [])
            ], Testing123);
            exports_1("Testing123", Testing123);
        }
    };
});
