//// [tests/cases/compiler/multipleInferenceContexts.ts] ////

//// [multipleInferenceContexts.ts]
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


//// [multipleInferenceContexts.js]
"use strict";
var r2 = Moon({
    data: { msg: "" },
    render: function () {
        var h = function (x) { return x; };
        return h(this.get("msg"));
    },
});
