// @declaration: true
// @noImplicitOverride: false
// @target: es6

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
