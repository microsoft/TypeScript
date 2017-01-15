//// [overrideKeywordEs6.ts]

class Base {
    async getMeaningOfLife1(): Promise<number> { return Promise.resolve(42); }
    async getMeaningOfLife2(): Promise<number> { return Promise.reject(42); }
}

// The expected order of modifiers:
//
// [public | protected | private] [abstract | override] [static] [readonly | async] [get | set] identifier
//
class RejectWhenAsyncPrecedesOverrideModifier extends Base { async override getMeaningOfLife1(): Promise<number> { return Promise.reject(42); }; }
class AcceptWhenOverridePrecedesAsyncModifier extends Base { override async getMeaningOfLife2(): Promise<number> { return Promise.resolve(42); }; }


//// [overrideKeywordEs6.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Base {
    getMeaningOfLife1() {
        return __awaiter(this, void 0, void 0, function* () { return Promise.resolve(42); });
    }
    getMeaningOfLife2() {
        return __awaiter(this, void 0, void 0, function* () { return Promise.reject(42); });
    }
}
// The expected order of modifiers:
//
// [public | protected | private] [abstract | override] [static] [readonly | async] [get | set] identifier
//
class RejectWhenAsyncPrecedesOverrideModifier extends Base {
    getMeaningOfLife1() {
        return __awaiter(this, void 0, void 0, function* () { return Promise.reject(42); });
    }
    ;
}
class AcceptWhenOverridePrecedesAsyncModifier extends Base {
    getMeaningOfLife2() {
        return __awaiter(this, void 0, void 0, function* () { return Promise.resolve(42); });
    }
    ;
}


//// [overrideKeywordEs6.d.ts]
declare class Base {
    getMeaningOfLife1(): Promise<number>;
    getMeaningOfLife2(): Promise<number>;
}
declare class RejectWhenAsyncPrecedesOverrideModifier extends Base {
    override getMeaningOfLife1(): Promise<number>;
}
declare class AcceptWhenOverridePrecedesAsyncModifier extends Base {
    override getMeaningOfLife2(): Promise<number>;
}
