// @strict: true

// Issue #52813

class Bar<T> {
    num!: number;
    Value = callme(this).num;
    Field: number = callme(this).num;
}
declare function callme(x: Bar<any>): Bar<any>;
declare function callme(x: object): string;