// @noImplicitOverride: true
// @filename: file1.ts
// @ts-noImplicitOverride
export class A {
    method() {}
}
export class B extends A {
    method() {}
}
export class C extends A {
    override method() {}
}

// @filename: file2.ts
// @ts-noImplicitOverride true
export class A {
    method() {}
}
export class B extends A {
    method() {}
}
export class C extends A {
    override method() {}
}

// @filename: file3.ts
// @ts-noImplicitOverride false
export class A {
    method() {}
}
export class B extends A {
    method() {}
}
export class C extends A {
    override method() {}
}

// @filename: file4.ts
export class A {
    method() {}
}
export class B extends A {
    method() {}
}
export class C extends A {
    override method() {}
}