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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // These work examples as expected
        get().then((response) => {
            // body is never
            const body = response.data;
        });
        get().then(({ data }) => {
            // data is never
        });
        const response = yield get();
        // body is never
        const body = response.data;
        // data is never
        const { data } = yield get();
        // The following did not work as expected.
        // shouldBeNever should be never, but was any
        const { data: shouldBeNever } = yield get();
    });
}
