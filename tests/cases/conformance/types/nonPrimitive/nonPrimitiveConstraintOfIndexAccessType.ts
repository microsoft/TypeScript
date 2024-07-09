// @strict: true
// test for #15371
function f<T extends object, P extends keyof T>(s: string, tp: T[P]): void {
    tp = s;
}
function g<T extends null, P extends keyof T>(s: string, tp: T[P]): void {
    tp = s;
}
function h<T extends undefined, P extends keyof T>(s: string, tp: T[P]): void {
    tp = s;
}
function i<T extends void, P extends keyof T>(s: string, tp: T[P]): void {
    tp = s;
}
function j<T extends never, P extends keyof T>(s: string, tp: T[P]): void {
    tp = s;
}
function k<T extends number, P extends keyof T>(s: string, tp: T[P]): void {
    tp = s;
}
function o<T extends string, P extends keyof T>(s: string, tp: T[P]): void {
    tp = s;
}
function l<T extends {}, P extends keyof T>(s: string, tp: T[P]): void {
    tp = s;
}
function m<T extends { a: number }, P extends keyof T>(s: string, tp: T[P]): void {
    tp = s;
}
function n<T extends { [s: string]: number }, P extends keyof T>(s: string, tp: T[P]): void {
    tp = s;
}
