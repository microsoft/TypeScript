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
class Foo {
    #field = 1;
    #method() { }
    static #staticField = 2;
    static #staticMethod() { }
    check(v) {
        #field in v; // expect Foo's 'field' WeakMap
        #method in v; // expect Foo's 'instances' WeakSet
        #staticField in v; // expect Foo's constructor
        #staticMethod in v; // expect Foo's constructor
    }
    precedence(v) {
        // '==' and '||' have lower precedence than 'in'
        // 'in'  naturally has same precedence as 'in'
        // '<<' has higher precedence than 'in'
        v == #field in v || v; // Good precedence: (v == (#field in v)) || v
        v << #field in v << v; // Good precedence (SyntaxError): (v << #field) in (v << v)
        v << #field in v == v; // Good precedence (SyntaxError): ((v << #field) in v) == v
        v == #field in v in v; // Good precedence: v == ((#field in v) in v)
        #field in v && #field in v; // Good precedence: (#field in v) && (#field in v)
    }
    invalidLHS(v) {
        'prop' in v;
        10;
        #field in v;
        10;
    }
}
class Bar {
    #field = 1;
    check(v) {
        #field in v; // expect Bar's 'field' WeakMap
    }
}
function syntaxError(v) {
    return #field in v; // expect `return in v` so runtime will have a syntax error
}
export {};
