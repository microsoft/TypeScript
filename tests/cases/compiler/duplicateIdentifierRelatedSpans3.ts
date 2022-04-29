// @pretty: true
// @filename: file1.ts
interface TopLevel {
    duplicate1: () => string;
    duplicate2: () => string;
    duplicate3: () => string;
}
// @filename: file2.ts
interface TopLevel {
    duplicate1(): number;
    duplicate2(): number;
    duplicate3(): number;
}
