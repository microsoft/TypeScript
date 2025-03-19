//// [tests/cases/compiler/indexedAccessRelation.ts] ////

//// [indexedAccessRelation.ts]
// Repro from #14723

class Component<S> {
    setState<K extends keyof S>(state: Pick<S, K>) {}
}

export interface State<T> {
    a?: T;
}

class Foo {}

class Comp<T extends Foo, S> extends Component<S & State<T>>
{
    foo(a: T) {
        this.setState({ a: a });
    }
}


//// [indexedAccessRelation.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Repro from #14723
class Component {
    setState(state) { }
}
class Foo {
}
class Comp extends Component {
    foo(a) {
        this.setState({ a: a });
    }
}
