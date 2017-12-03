// @declaration: true
// @noImplicitOverride: false
// @target: es6

class AsyncBase {
    async toStringAsync(): Promise<string> { return Promise.resolve(''); }
}

// The expected order of modifiers:
//
// [public | protected | private] [abstract | override] [static] [readonly | async] [get | set] identifier
//
class RejectWhenAsyncPrecedesOverrideModifier extends AsyncBase {
    async override toStringAsync(): Promise<string> { return Promise.resolve(''); }
}
class AcceptWhenOverridePrecedesAsyncModifier extends AsyncBase {
    override async toStringAsync(): Promise<string> { return Promise.resolve(''); }
}
