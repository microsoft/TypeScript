// @noEmit: true

// Regression test for https://github.com/microsoft/TypeScript/issues/64116
declare function createComponent<Props extends {}, Events extends {}>(
    render: { props: Props, events: Events }
): typeof Component<Events>;

declare class Component<Events extends {} = Record<string, any>> {
    $on<K extends keyof Events>(event: K, handler: (e: Events[K]) => void): void;
}

const B = createComponent({
    props: {},
    events: { foo: "", foo2: "2" }
});

new B().$on("foo", e => {});
new B().$on("foo3", e => {});

class C extends B {}

new C().$on("foo", e => {});
new C().$on("foo3", e => {});
