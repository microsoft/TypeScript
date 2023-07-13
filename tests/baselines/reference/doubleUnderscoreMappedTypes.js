//// [tests/cases/compiler/doubleUnderscoreMappedTypes.ts] ////

//// [doubleUnderscoreMappedTypes.ts]
interface Properties {
    property1: string;
    __property2: string;
}

// As expected, I can make an object satisfying this interface
const ok: Properties = {
    property1: "",
    __property2: ""
};

// As expected, "__property2" is indeed a key of the type
type Keys = keyof Properties;
const k: Keys = "__property2"; // ok

// This should be valid
type Property2Type = Properties["__property2"];

// And should work with partial
const partial: Partial<Properties> = {
    property1: "",
    __property2: ""
};


//// [doubleUnderscoreMappedTypes.js]
// As expected, I can make an object satisfying this interface
var ok = {
    property1: "",
    __property2: ""
};
var k = "__property2"; // ok
// And should work with partial
var partial = {
    property1: "",
    __property2: ""
};
