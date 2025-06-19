//// [tests/cases/compiler/defaultPropsEmptyCurlyBecomesAnyForJs.ts] ////

//// [library.d.ts]
export class Foo<T = {}, U = {}> {
    props: T;
    state: U;
    constructor(props: T, state: U);
}

//// [component.js]
import { Foo } from "./library";
export class MyFoo extends Foo {
    member;
}

//// [typed_component.ts]
import { MyFoo } from "./component";
export class TypedFoo extends MyFoo {
    constructor() {
        super({x: "string", y: 42}, { value: undefined });
        this.props.x;
        this.props.y;
        this.state.value;
        this.member;
    }
}

//// [component.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyFoo = void 0;
const library_1 = require("./library");
class MyFoo extends library_1.Foo {
    member;
}
exports.MyFoo = MyFoo;
//// [typed_component.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedFoo = void 0;
const component_1 = require("./component");
class TypedFoo extends component_1.MyFoo {
    constructor() {
        super({ x: "string", y: 42 }, { value: undefined });
        this.props.x;
        this.props.y;
        this.state.value;
        this.member;
    }
}
exports.TypedFoo = TypedFoo;
