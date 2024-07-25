// @strict: true

type ConstructorOptions<Data> =
    & ComponentOptionsProperties<Data>
    & ThisType<Instance<Data>>;

interface ComponentOptionsProperties<Data> {
    data: Data;
    render(): unknown;
}

interface Instance<Data> {
    get<K extends keyof Data>(name: K): unknown;
}

declare var Moon: {
    <Data>(options?: ConstructorOptions<Data>): Instance<Data>;
};

const r2 = Moon({
    data: { msg: "" },
    render() {
        const h = (x: unknown) => x;
        return h(this.get("msg"));
    },
});
