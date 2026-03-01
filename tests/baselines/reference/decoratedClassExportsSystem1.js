//// [tests/cases/conformance/decorators/class/decoratedClassExportsSystem1.ts] ////

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
    var Testing123_1, Testing123;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Testing123 = Testing123_1 = class Testing123 {
            };
            exports_1("Testing123", Testing123);
            Testing123.prop1 = Testing123_1.prop0;
            exports_1("Testing123", Testing123 = Testing123_1 = __decorate([
                Something({ v: () => Testing123 })
            ], Testing123));
        }
    };
});
