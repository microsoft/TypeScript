//// [tests/cases/compiler/superAccessProtectedInstanceProperty.ts] ////

//// [superAccessProtectedInstanceProperty.ts]
// https://github.com/microsoft/TypeScript/issues/55883

export abstract class YaddaBase {
    protected roots = "hi";
}

export class DerivedYadda extends YaddaBase {
    public get rootTests() {
        return super.roots;
    }
}


//// [superAccessProtectedInstanceProperty.js]
// https://github.com/microsoft/TypeScript/issues/55883
export class YaddaBase {
    roots = "hi";
}
export class DerivedYadda extends YaddaBase {
    get rootTests() {
        return super.roots;
    }
}
