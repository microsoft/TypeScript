//// [tests/cases/compiler/inheritedConstructorPropertyContextualType.ts] ////

//// [inheritedConstructorPropertyContextualType.ts]
interface State {
    version: 2
}
declare class Base<S> {
    state: S
}
class Assignment extends Base<State> {
    constructor() {
        super()
        this.state = { version: 2 }
    }
}

//// [inheritedConstructorPropertyContextualType.js]
class Assignment extends Base {
    constructor() {
        super();
        this.state = { version: 2 };
    }
}
