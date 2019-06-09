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

// Repro from #31833

type Foo1 = {
  type: 'foo1';
  extra: number;
};

type Foo2 = {
  type: 'foo2';
  extra: string;
};

type Both = Foo1 | Foo2;

type FooTypes = Both['type'];

export type FooFromType<T extends FooTypes, O extends Both = Both> = O extends { type: T } ? O : never;

type FooExtraFromType<T extends FooTypes> = FooFromType<T>['extra'];

function fnWithFooExtra<T extends FooTypes>(type: T, extra: FooExtraFromType<T>) { }

type FnType = <T extends FooTypes>(type: T, extra: FooExtraFromType<T>) => void;

const fn: FnType = fnWithFooExtra;
