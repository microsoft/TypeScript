// @filename: first.ts
declare class P<R> {
    constructor(callback: (resolve: (value: R) => void) => void);
}

// @filename: second.ts
interface P<R> { }
new P<string>(r => { r('foo') });
