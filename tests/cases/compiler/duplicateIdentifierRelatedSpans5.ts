// @pretty: true
// @filename: file1.ts
declare global {
    interface TopLevel {
        duplicate1: () => string;
        duplicate2: () => string;
        duplicate3: () => string;
    }
}
export {}
// @filename: file2.ts
import "./file1";
declare global {
    interface TopLevel {
        duplicate1(): number;
        duplicate2(): number;
        duplicate3(): number;
    }
}
export {}
