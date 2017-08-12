//// [declFilePrivateMethodOverloads.ts]
interface IContext {
    someMethod();
}
class c1 {
    private _forEachBindingContext(bindingContext: IContext, fn: (bindingContext: IContext) => void);
    private _forEachBindingContext(bindingContextArray: Array<IContext>, fn: (bindingContext: IContext) => void);
    private _forEachBindingContext(context, fn: (bindingContext: IContext) => void): void {
        // Function here
    }

    private overloadWithArityDifference(bindingContext: IContext);
    private overloadWithArityDifference(bindingContextArray: Array<IContext>, fn: (bindingContext: IContext) => void);
    private overloadWithArityDifference(context): void {
        // Function here
    }
}
declare class c2 {
    private overload1(context, fn);

    private overload2(context);
    private overload2(context, fn);
}

//// [declFilePrivateMethodOverloads.js]
var c1 = (function () {
    function c1() {
    }
    var proto_1 = c1.prototype;
    proto_1._forEachBindingContext = function (context, fn) {
        // Function here
    };
    proto_1.overloadWithArityDifference = function (context) {
        // Function here
    };
    return c1;
}());


//// [declFilePrivateMethodOverloads.d.ts]
interface IContext {
    someMethod(): any;
}
declare class c1 {
    private _forEachBindingContext(bindingContext, fn);
    private _forEachBindingContext(bindingContextArray, fn);
    private overloadWithArityDifference(bindingContext);
    private overloadWithArityDifference(bindingContextArray, fn);
}
declare class c2 {
    private overload1(context, fn);
    private overload2(context);
    private overload2(context, fn);
}
