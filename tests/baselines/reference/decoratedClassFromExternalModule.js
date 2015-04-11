//// [tests/cases/conformance/decorators/class/decoratedClassFromExternalModule.ts] ////

//// [decorated.ts]
function decorate() { }

@decorate
export default class Decorated { }

//// [undecorated.ts]
import Decorated from 'decorated';

//// [decorated.js]
var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
function decorate() { }
let Decorated = class {
};
Object.defineProperty(Decorated, "name", { value: "Decorated", configurable: true });
Decorated = __decorate([
    decorate
], Decorated);
export default Decorated;
//// [undecorated.js]
