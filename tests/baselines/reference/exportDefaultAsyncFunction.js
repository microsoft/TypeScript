//// [exportDefaultAsyncFunction.ts]
export default async function foo(): Promise<void> {}
foo();


//// [exportDefaultAsyncFunction.js]
const __awaiter = (this && this.__awaiter) || ((thisArg, _arguments, P, generator) => {
    return new (P || (P = Promise))((resolve, reject) => {
        const fulfilled = value => { try { step(generator.next(value)); } catch (e) { reject(e); } }
        const rejected = value => { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        const step = result => { result.done ? resolve(result.value) : new P(resolve => { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
});
export default function foo() {
    return __awaiter(this, void 0, void 0, function* () { });
}
foo();
