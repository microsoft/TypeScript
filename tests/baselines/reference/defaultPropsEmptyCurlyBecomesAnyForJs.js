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
import { Foo } from "./library";
export class MyFoo extends Foo {
}
//// [typed_component.js]
import { MyFoo } from "./component";
export class TypedFoo extends MyFoo {
    constructor() {
        super({ x: "string", y: 42 }, { value: undefined });
        this.props.x;
        this.props.y;
        this.state.value;
        this.member;
    }
}
