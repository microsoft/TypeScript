//// [tests/cases/compiler/getSetEnumerable.ts] ////

//// [getSetEnumerable.ts]
class GetSetEnumerableClassGet {
    get prop() { return true;}
}

class GetSetEnumerableClassSet {
    set prop(value: boolean) { }
}

class GetSetEnumerableClassGetSet {
    get prop() { return true;}
    set prop(value: boolean) { }
}

const GetSetEnumerableObjectGet = {
    get prop() { return true; }
};

const GetSetEnumerableObjectSet = {
    set prop(value: boolean) { }
};

const GetSetEnumerableObjectGetSet = {
    get prop() { return true; },
    set prop(value: boolean) { }
};


//// [getSetEnumerable.js]
class GetSetEnumerableClassGet {
    get prop() { return true; }
}
class GetSetEnumerableClassSet {
    set prop(value) { }
}
class GetSetEnumerableClassGetSet {
    get prop() { return true; }
    set prop(value) { }
}
const GetSetEnumerableObjectGet = {
    get prop() { return true; }
};
const GetSetEnumerableObjectSet = {
    set prop(value) { }
};
const GetSetEnumerableObjectGetSet = {
    get prop() { return true; },
    set prop(value) { }
};
