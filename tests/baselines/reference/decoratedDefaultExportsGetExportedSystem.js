//// [decoratedDefaultExportsGetExportedSystem.ts]

var decorator: ClassDecorator;

@decorator
export default class Foo {}


//// [decoratedDefaultExportsGetExportedSystem.js]
System.register([], function(exports_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var decorator, Foo;
    return {
        setters:[],
        execute: function() {
            let Foo = class {
            };
            Foo = __decorate([
                decorator
            ], Foo);
            exports_1("default", Foo);
        }
    }
});
