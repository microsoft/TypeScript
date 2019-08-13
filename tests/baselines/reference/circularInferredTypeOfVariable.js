//// [circularInferredTypeOfVariable.ts]
// Repro from #14428

(async () => {
    function foo(p: string[]): string[] {
        return [];
    }

    function bar(p: string[]): string[] {
        return [];
    }

    let a1: string[] | undefined = [];

    while (true) {
        let a2 = foo(a1!);
        a1 = await bar(a2);
    }
});

//// [circularInferredTypeOfVariable.js]
// Repro from #14428
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(() => __awaiter(this, void 0, void 0, function* () {
    function foo(p) {
        return [];
    }
    function bar(p) {
        return [];
    }
    let a1 = [];
    while (true) {
        let a2 = foo(a1);
        a1 = yield bar(a2);
    }
}));
