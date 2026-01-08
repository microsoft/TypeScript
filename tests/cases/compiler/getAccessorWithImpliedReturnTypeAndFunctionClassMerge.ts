declare function _<T>(value: Array<T>): _<T>;
declare function _<T>(value: T): _<T>;

declare namespace _ {
    export function each<T>(
        //list: List<T>,
        //iterator: ListIterator<T, void>,
        context?: any): void;

    interface ListIterator<T, TResult> {
        (value: T, index: number, list: T[]): TResult;
    }
}

declare class _<T> {
    each(iterator: _.ListIterator<T, void>, context?: any): void;
}

namespace MyModule { 
    export class MyClass {
        public get myGetter() {
            var obj:any = {};
            
            return obj;
        }
    }
}