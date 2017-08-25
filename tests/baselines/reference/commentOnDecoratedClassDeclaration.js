//// [commentOnDecoratedClassDeclaration.ts]
declare function decorator(x: string): any;

/**
 * Leading trivia
 */
@decorator("hello")
class Remote { }

/**
 * Floating Comment
 */

@decorator("hi")
class AnotherRomote {
    constructor() {}
}

//// [commentOnDecoratedClassDeclaration.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Leading trivia
 */
var Remote = /** @class */ (function () {
    function Remote() {
    }
    Remote = __decorate([
        decorator("hello")
    ], Remote);
    return Remote;
}());
/**
 * Floating Comment
 */
var AnotherRomote = /** @class */ (function () {
    function AnotherRomote() {
    }
    AnotherRomote = __decorate([
        decorator("hi")
    ], AnotherRomote);
    return AnotherRomote;
}());
