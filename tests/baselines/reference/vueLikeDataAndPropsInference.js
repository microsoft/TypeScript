//// [tests/cases/compiler/vueLikeDataAndPropsInference.ts] ////

//// [vueLikeDataAndPropsInference.ts]
interface Instance {
    _instanceBrand: never
}

type DataDef<Data, Props> = (this: Readonly<Props> & Instance) => Data

type PropsDefinition<T> = {
    [K in keyof T]: T[K]
}

interface Options<
    Data = ((this: Instance) => object),
    PropsDef = {}
    > {
    data?: Data
    props?: PropsDef
    watch?: Record<string, WatchHandler<any>>
}

type WatchHandler<T> = (val: T, oldVal: T) => void;

type ThisTypedOptions<Data, Props> =
    Options<DataDef<Data, Props>, PropsDefinition<Props>> &
    ThisType<Data & Readonly<Props> & Instance>

declare function test<Data, Props>(fn: ThisTypedOptions<Data, Props>): void;
declare function test(fn: Options): void;

test({
    props: {
        foo: ''
    },

    data(): { bar: boolean } {
        return {
            bar: true
        }
    },

    watch: {
        foo(newVal: string, oldVal: string): void {
            this.bar = false
        }
    }
})

//// [vueLikeDataAndPropsInference.js]
test({
    props: {
        foo: ''
    },
    data: function () {
        return {
            bar: true
        };
    },
    watch: {
        foo: function (newVal, oldVal) {
            this.bar = false;
        }
    }
});
