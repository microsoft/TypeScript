// https://github.com/microsoft/TypeScript/issues/41700

enum EnumA {
    A = 'A',
    B = 'B',
}

// A second enum with at least one key also in EnumA
enum EnumB {
    B = 'B',
    C = 'C',
}

type Mapped = {
    [k in EnumA|EnumB]: string;
};

// Should work
const partial: Partial<Mapped> = {
    [EnumA.B]: 'value',
};
