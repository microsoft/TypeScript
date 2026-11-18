//// [tests/cases/compiler/promiseAllArrayAssertionOverlap.ts] ////

//// [promiseAllArrayAssertionOverlap.ts]
interface Row {
    [name: string]: any;
}
interface Entity {
    id: number;
}
declare const result: Promise<Row | null>;

export async function load() {
    return (await Promise.all([result, result])) as Entity[];
}


//// [promiseAllArrayAssertionOverlap.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function load() {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield Promise.all([result, result]));
    });
}
