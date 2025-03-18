//// [tests/cases/compiler/decoratorMetadataElidedImportOnDeclare.ts] ////

//// [observable.d.ts]
export declare class Observable<T> {}

//// [index.ts]
import { Observable } from './observable';

function whatever(a: any, b: any) {}

class Test {
    @whatever
    declare prop: Observable<string>;
}


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function whatever(a, b) { }
class Test {
}
