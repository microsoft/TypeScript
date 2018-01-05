// @allowJs: true
// @outDir: ./built
// @filename: library.d.ts
export class Foo<T = {}, U = {}> {
    props: T;
    state: U;
    constructor(props: T, state: U);
}

// @filename: component.js
import { Foo } from "./library";
export class MyFoo extends Foo {
    member;
}

// @filename: typed_component.ts
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