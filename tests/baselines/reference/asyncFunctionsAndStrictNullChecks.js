//// [asyncFunctionsAndStrictNullChecks.ts]
declare namespace Windows.Foundation {
    interface IPromise<TResult> {
        then<U>(success?: (value: TResult) => IPromise<U>, error?: (error: any) => IPromise<U>, progress?: (progress: any) => void): IPromise<U>;
        then<U>(success?: (value: TResult) => IPromise<U>, error?: (error: any) => U, progress?: (progress: any) => void): IPromise<U>;
        then<U>(success?: (value: TResult) => U, error?: (error: any) => IPromise<U>, progress?: (progress: any) => void): IPromise<U>;
        then<U>(success?: (value: TResult) => U, error?: (error: any) => U, progress?: (progress: any) => void): IPromise<U>;
        done<U>(success?: (value: TResult) => any, error?: (error: any) => any, progress?: (progress: any) => void): void;

        cancel(): void;
    }
}

async function sample(promise: Windows.Foundation.IPromise<number>) {
    var number = await promise;
}


declare function resolve1<T>(value: T): Promise<T>;
declare function resolve2<T>(value: T): Windows.Foundation.IPromise<T>;

async function sample2(x?: number) {
    let x1 = await resolve1(x);
    let x2 = await resolve2(x);
}


//// [asyncFunctionsAndStrictNullChecks.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function sample(promise) {
    return __awaiter(this, void 0, void 0, function* () {
        var number = yield promise;
    });
}
function sample2(x) {
    return __awaiter(this, void 0, void 0, function* () {
        let x1 = yield resolve1(x);
        let x2 = yield resolve2(x);
    });
}
