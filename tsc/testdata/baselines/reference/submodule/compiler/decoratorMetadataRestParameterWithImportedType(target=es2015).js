//// [tests/cases/compiler/decoratorMetadataRestParameterWithImportedType.ts] ////

//// [aux.ts]
export class SomeClass {
    field: string;
}

//// [aux1.ts]
export class SomeClass1 {
    field: string;
}

//// [aux2.ts]
export class SomeClass2 {
    field: string;
}
//// [main.ts]
import { SomeClass } from './aux';
import { SomeClass1 } from './aux1';

function annotation(): ClassDecorator {
    return (target: any): void => { };
}

function annotation1(): MethodDecorator {
    return (target: any): void => { };
}

@annotation()
export class ClassA {
    array: SomeClass[];

    constructor(...init: SomeClass[]) {
        this.array = init;
    }

    @annotation1()
    foo(... args: SomeClass1[]) {
    }
}

//// [aux.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SomeClass = void 0;
class SomeClass {
    field;
}
exports.SomeClass = SomeClass;
//// [aux1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SomeClass1 = void 0;
class SomeClass1 {
    field;
}
exports.SomeClass1 = SomeClass1;
//// [aux2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SomeClass2 = void 0;
class SomeClass2 {
    field;
}
exports.SomeClass2 = SomeClass2;
//// [main.js]
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
exports.ClassA = void 0;
const aux_1 = require("./aux");
const aux1_1 = require("./aux1");
function annotation() {
    return (target) => { };
}
function annotation1() {
    return (target) => { };
}
let ClassA = class ClassA {
    array;
    constructor(...init) {
        this.array = init;
    }
    foo(...args) {
    }
};
exports.ClassA = ClassA;
__decorate([
    annotation1(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [aux1_1.SomeClass1]),
    __metadata("design:returntype", void 0)
], ClassA.prototype, "foo", null);
exports.ClassA = ClassA = __decorate([
    annotation(),
    __metadata("design:paramtypes", [aux_1.SomeClass])
], ClassA);
