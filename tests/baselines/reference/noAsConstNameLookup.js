//// [tests/cases/compiler/noAsConstNameLookup.ts] ////

//// [noAsConstNameLookup.ts]
// Repros from #44292

type Store = { a: 123 }
export type Cleaner = <W extends Store>(runner: FeatureRunner<W>) => Promise<any>

export class FeatureRunner<W extends Store> {
    private readonly cleaners: Cleaner[] = []

    async runFeature(): Promise<any> {
        const objectWhichShouldBeConst = {
            flags: {},
            settings: {},
        } as const;
        return objectWhichShouldBeConst
    }

    async run(): Promise<any> {
        const result = {}
        this.cleaners.forEach(c => c(this))
        return result
    }
}

export class C<T> {
    f(): void {
        let one = 1 as const;
    }
}
new C<string>().f();


//// [noAsConstNameLookup.js]
// Repros from #44292
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class FeatureRunner {
    constructor() {
        this.cleaners = [];
    }
    runFeature() {
        return __awaiter(this, void 0, void 0, function* () {
            const objectWhichShouldBeConst = {
                flags: {},
                settings: {},
            };
            return objectWhichShouldBeConst;
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {};
            this.cleaners.forEach(c => c(this));
            return result;
        });
    }
}
export class C {
    f() {
        let one = 1;
    }
}
new C().f();
