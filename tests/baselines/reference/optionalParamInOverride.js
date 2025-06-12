//// [tests/cases/compiler/optionalParamInOverride.ts] ////

//// [optionalParamInOverride.ts]
class Z {
    public func(): void { }
}
class Y extends Z {
    public func(value?: any): void { }
}


//// [optionalParamInOverride.js]
class Z {
    func() { }
}
class Y extends Z {
    func(value) { }
}
