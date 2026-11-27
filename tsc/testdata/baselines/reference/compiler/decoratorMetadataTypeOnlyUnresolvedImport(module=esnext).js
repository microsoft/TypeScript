//// [tests/cases/compiler/decoratorMetadataTypeOnlyUnresolvedImport.ts] ////

//// [decoratorMetadataTypeOnlyUnresolvedImport.ts]
import type Foo from "./missing-default";
import { type Bar } from "./missing-named";
import type { default as Baz } from "./missing-default-specifier";

function dec(_target: unknown, _key: unknown) {}

class C {
    @dec a!: Foo;
    @dec b!: Bar;
    @dec c!: Baz;
}

const x = Foo;
const y = Bar;
const z = Baz;


//// [decoratorMetadataTypeOnlyUnresolvedImport.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function dec(_target, _key) { }
class C {
}
__decorate([
    dec,
    __metadata("design:type", Object)
], C.prototype, "a", void 0);
__decorate([
    dec,
    __metadata("design:type", Object)
], C.prototype, "b", void 0);
__decorate([
    dec,
    __metadata("design:type", Object)
], C.prototype, "c", void 0);
const x = Foo;
const y = Bar;
const z = Baz;
export {};
