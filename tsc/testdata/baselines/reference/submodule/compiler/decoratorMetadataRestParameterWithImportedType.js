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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassA = void 0;
function annotation() {
    return (target) => { };
}
function annotation1() {
    return (target) => { };
}
@annotation()
class ClassA {
    array;
    constructor(...init) {
        this.array = init;
    }
    @annotation1()
    foo(...args) {
    }
}
exports.ClassA = ClassA;
