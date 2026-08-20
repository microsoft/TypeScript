// @target: es2020
// @module: commonjs, esnext
// @strict: true
// @experimentalDecorators: true
// @emitDecoratorMetadata: true

// @filename: observable.d.ts
export declare class Observable<T> {}

// @filename: index.ts
import { Observable } from './observable';

function whatever(a: any, b: any) {}

class Test {
    @whatever
    declare prop: Observable<string>;
}
