// @target: esnext
// @useDefineForClassFields: false

// @filename: file1.ts
// https://github.com/microsoft/TypeScript/issues/51528
class C1 {
    static accessor x = 0;
}

// @filename: file2.ts
class C2 {
    static accessor #x = 0;
}

// @filename: file3.ts
class C3 {
    static accessor #x = 0;
    accessor #y = 0;
}

// @filename: file3.ts
class C3 {
    accessor x = 0;
}

// @filename: file4.ts
class C4 {
    accessor #x = 0;
}

// @filename: file5.ts
class C5 {
    x = 0;
    accessor #x = 1;
}

// @filename: file6.ts
class C6 {
    accessor #x = 0;
    x = 1;
}
