//// [tests/cases/compiler/metadataOfClassFromModule.ts] ////

//// [metadataOfClassFromModule.ts]
module MyModule {

    export function inject(target: any, key: string): void { }

    export class Leg { }

    export class Person {
        @inject leftLeg: Leg;
    }

}

//// [metadataOfClassFromModule.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MyModule;
(function (MyModule) {
    function inject(target, key) { }
    MyModule.inject = inject;
    var Leg = /** @class */ (function () {
        function Leg() {
        }
        return Leg;
    }());
    MyModule.Leg = Leg;
    var Person = /** @class */ (function () {
        function Person() {
        }
        __decorate([
            inject,
            __metadata("design:type", Leg)
        ], Person.prototype, "leftLeg", void 0);
        return Person;
    }());
    MyModule.Person = Person;
})(MyModule || (MyModule = {}));
