//// [checkGrammarStaticMemberName_es6.ts]

class static_property {
    static length = 1;
    static name = 1;
    static arguments = 1;
    static caller = 1;
    static foo = {
        ["length"]: 1,
        ["name"]: 1,
        ["arguments"]: 1,
        ["caller"]: 1,
    };
}

class static_method {
    static length() { return 1; }
    static name() { return 1; }
    static arguments() { return 1; }
    static caller() { return 1; }
}


//// [checkGrammarStaticMemberName_es6.js]
class static_property {
}
static_property.length = 1;
static_property.name = 1;
static_property.arguments = 1;
static_property.caller = 1;
static_property.foo = {
    ["length"]: 1,
    ["name"]: 1,
    ["arguments"]: 1,
    ["caller"]: 1,
};
class static_method {
    static length() { return 1; }
    static name() { return 1; }
    static arguments() { return 1; }
    static caller() { return 1; }
}
