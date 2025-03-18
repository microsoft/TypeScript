//// [tests/cases/compiler/decoratorMetadataElidedImport.ts] ////

//// [observable.d.ts]
export declare class Observable<T> {}

//// [index.ts]
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


//// [index.js]
function whatever(a, b, c) { }
class Test {
    foo(arg1, arg2) {
        return null;
    }
}
export {};
