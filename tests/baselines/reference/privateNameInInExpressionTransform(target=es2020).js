//// [privateNameInInExpressionTransform.ts]
class Foo {
    #field = 1;
    #method() {}
    static #staticField= 2;
    static #staticMethod() {}

    check(v: any) {
        #field in v; // expect Foo's 'field' WeakMap
        #method in v; // expect Foo's 'instances' WeakSet
        #staticField in v; // expect Foo's constructor
        #staticMethod in v; // expect Foo's constructor
    }
    precedence(v: any) {
        // '==' and '||' have lower precedence than 'in'
        // 'in'  naturally has same precedence as 'in'
        // '<<' has higher precedence than 'in'

        v == #field in v || v; // Good precedence: (v == (#field in v)) || v

        v << #field in v << v; // Good precedence (SyntaxError): (v << #field) in (v << v)

        v << #field in v == v; // Good precedence (SyntaxError): ((v << #field) in v) == v

        v == #field in v in v; // Good precedence: v == ((#field in v) in v)

        #field in v && #field in v; // Good precedence: (#field in v) && (#field in v)
    }
    invalidLHS(v: any) {
        'prop' in v = 10;
        #field in v = 10;
    }
}

class Bar {
    #field = 1;
    check(v: any) {
        #field in v; // expect Bar's 'field' WeakMap
    }
}

function syntaxError(v: Foo) {
    return #field in v; // expect `return in v` so runtime will have a syntax error
}

export { }


//// [privateNameInInExpressionTransform.js]
var __classPrivateFieldIn = (this && this.__classPrivateFieldIn) || function(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
};
var _Foo_instances, _a, _Foo_field, _Foo_method, _Foo_staticField, _Foo_staticMethod, _Bar_field;
class Foo {
    constructor() {
        _Foo_instances.add(this);
        _Foo_field.set(this, 1);
    }
    check(v) {
        __classPrivateFieldIn(_Foo_field, v); // expect Foo's 'field' WeakMap
        __classPrivateFieldIn(_Foo_instances, v); // expect Foo's 'instances' WeakSet
        __classPrivateFieldIn(_a, v); // expect Foo's constructor
        __classPrivateFieldIn(_a, v); // expect Foo's constructor
    }
    precedence(v) {
        // '==' and '||' have lower precedence than 'in'
        // 'in'  naturally has same precedence as 'in'
        // '<<' has higher precedence than 'in'
        v == __classPrivateFieldIn(_Foo_field, v) || v; // Good precedence: (v == (#field in v)) || v
        v <<  in v << v; // Good precedence (SyntaxError): (v << #field) in (v << v)
        v <<  in v == v; // Good precedence (SyntaxError): ((v << #field) in v) == v
        v == __classPrivateFieldIn(_Foo_field, v) in v; // Good precedence: v == ((#field in v) in v)
        __classPrivateFieldIn(_Foo_field, v) && __classPrivateFieldIn(_Foo_field, v); // Good precedence: (#field in v) && (#field in v)
    }
    invalidLHS(v) {
        'prop' in v;
        10;
        __classPrivateFieldIn(_Foo_field, v);
        10;
    }
}
_a = Foo, _Foo_field = new WeakMap(), _Foo_instances = new WeakSet(), _Foo_method = function _Foo_method() { }, _Foo_staticMethod = function _Foo_staticMethod() { };
_Foo_staticField = { value: 2 };
class Bar {
    constructor() {
        _Bar_field.set(this, 1);
    }
    check(v) {
        __classPrivateFieldIn(_Bar_field, v); // expect Bar's 'field' WeakMap
    }
}
_Bar_field = new WeakMap();
function syntaxError(v) {
    return  in v; // expect `return in v` so runtime will have a syntax error
}
export {};
