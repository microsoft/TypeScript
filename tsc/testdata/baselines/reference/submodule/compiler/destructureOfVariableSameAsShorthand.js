//// [tests/cases/compiler/destructureOfVariableSameAsShorthand.ts] ////

//// [destructureOfVariableSameAsShorthand.ts]
// https://github.com/microsoft/TypeScript/issues/38969
interface AxiosResponse<T = never> {
    data: T;
}

declare function get<T = never, R = AxiosResponse<T>>(): Promise<R>;

async function main() {
    // These work examples as expected
    get().then((response) => {
        // body is never
        const body = response.data;
    })
    get().then(({ data }) => {
        // data is never
    })
    const response = await get()
    // body is never
    const body = response.data;
    // data is never
    const { data } = await get<never>();

    // The following did not work as expected.
    // shouldBeNever should be never, but was any
    const { data: shouldBeNever } = await get();
}

//// [destructureOfVariableSameAsShorthand.js]
async function main() {
    get().then((response) => {
        const body = response.data;
    });
    get().then(({ data }) => {
    });
    const response = await get();
    const body = response.data;
    const { data } = await get();
    const { data: shouldBeNever } = await get();
}
