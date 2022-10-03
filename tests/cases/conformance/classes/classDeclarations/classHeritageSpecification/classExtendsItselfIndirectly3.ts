// @Filename: classExtendsItselfIndirectly_file1.ts
class C extends E { foo: string; } // error

// @Filename: classExtendsItselfIndirectly_file2.ts
class D extends C { bar: string; }

// @Filename: classExtendsItselfIndirectly_file3.ts
class E extends D { baz: number; }

// @Filename: classExtendsItselfIndirectly_file4.ts
class C2<T> extends E2<T> { foo: T; } // error

// @Filename: classExtendsItselfIndirectly_file5.ts
class D2<T> extends C2<T> { bar: T; }

// @Filename: classExtendsItselfIndirectly_file6.ts
class E2<T> extends D2<T> { baz: T; }