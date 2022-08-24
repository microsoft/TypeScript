// @strictNullChecks: true
// @strictPropertyInitialization: true
// @filename: file1.ts
// @ts-strictPropertyInitialization
export class A {
    prop: string;
    constructor() {}
}

// @filename: file2.ts
// @ts-strictPropertyInitialization true
export class A {
    prop: string;
    constructor() {}
}

// @filename: file3.ts
// @ts-strictPropertyInitialization false
export class A {
    prop: string;
    constructor() {}
}

// @filename: file4.ts
export class A {
    prop: string;
    constructor() {}
}
