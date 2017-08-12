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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var c1 = (function () {
    function c1() {
    }
    c1.prototype._forEachBindingContext = function (context, fn) {
        // Function here
    };
    c1.prototype.overloadWithArityDifference = function (context) {
        // Function here
    };
    __names(c1.prototype, ["_forEachBindingContext", "overloadWithArityDifference"]);
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
