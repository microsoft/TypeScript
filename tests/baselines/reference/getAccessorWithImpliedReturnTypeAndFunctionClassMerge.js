//// [getAccessorWithImpliedReturnTypeAndFunctionClassMerge.ts]
declare function _<T>(value: Array<T>): _<T>;
declare function _<T>(value: T): _<T>;

declare module _ {
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

module MyModule { 
    export class MyClass {
        public get myGetter() {
            var obj:any = {};
            
            return obj;
        }
    }
}

//// [getAccessorWithImpliedReturnTypeAndFunctionClassMerge.js]
var MyModule;
(function (MyModule) {
    var MyClass = /** @class */ (function () {
        function MyClass() {
        }
        Object.defineProperty(MyClass.prototype, "myGetter", {
            get: function () {
                var obj = {};
                return obj;
            },
            enumerable: false,
            configurable: true
        });
        return MyClass;
    }());
    MyModule.MyClass = MyClass;
})(MyModule || (MyModule = {}));
