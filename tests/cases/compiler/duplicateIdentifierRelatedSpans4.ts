// @pretty: true
// @filename: file1.ts
interface TopLevel {
    duplicate1: () => string;
    duplicate2: () => string;
    duplicate3: () => string;
    duplicate4: () => string;
    duplicate5: () => string;
    duplicate6: () => string;
    duplicate7: () => string;
    duplicate8: () => string;
}
// @filename: file2.ts
interface TopLevel {
    duplicate1(): number;
    duplicate2(): number;
    duplicate3(): number;
    duplicate4(): number;
    duplicate5(): number;
    duplicate6(): number;
    duplicate7(): number;
    duplicate8(): number;
}
