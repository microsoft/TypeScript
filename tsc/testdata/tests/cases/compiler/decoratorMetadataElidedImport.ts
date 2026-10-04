// @target: es2020
// @module: commonjs, esnext
// @strict: true
// @experimentalDecorators: true
// @emitDecoratorMetadata: true

// @filename: observable.d.ts
export declare class Observable<T> {}

// @filename: index.ts
import { Observable } from './observable';

function whatever(a: any, b: any, c: any) {}

class Test {
    foo(
        @whatever arg1: string,
        @whatever arg2: number
    ): Observable<string> {
        return null!;
    }
}
