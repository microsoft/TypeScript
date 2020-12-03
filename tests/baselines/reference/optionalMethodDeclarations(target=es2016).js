//// [optionalMethodDeclarations.ts]
// https://github.com/microsoft/TypeScript/issues/34952#issuecomment-552025027
class C {
    // ? should be removed in emit
    method?() {}
}

//// [optionalMethodDeclarations.js]
// https://github.com/microsoft/TypeScript/issues/34952#issuecomment-552025027
class C {
    // ? should be removed in emit
    method() { }
}
