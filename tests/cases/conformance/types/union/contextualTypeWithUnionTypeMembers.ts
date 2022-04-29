//When used as a contextual type, a union type U has those members that are present in any of 
// its constituent types, with types that are unions of the respective members in the constituent types. 
interface I1<T> {
    commonMethodType(a: string): string;
    commonPropertyType: string;
    commonMethodWithTypeParameter(a: T): T;

    methodOnlyInI1(a: string): string;
    propertyOnlyInI1: string;
}
interface I2<T> {
    commonMethodType(a: string): string;
    commonPropertyType: string;
    commonMethodWithTypeParameter(a: T): T;

    methodOnlyInI2(a: string): string;
    propertyOnlyInI2: string;
}

// Let S be the set of types in U that has a property P.
// If S is not empty, U has a property P of a union type of the types of P from each type in S.
var i1: I1<number>;
var i2: I2<number>;
var i1Ori2: I1<number> | I2<number> = i1;
var i1Ori2: I1<number> | I2<number> = i2;
var i1Ori2: I1<number> | I2<number> = { // Like i1
    commonPropertyType: "hello",
    commonMethodType: a=> a,
    commonMethodWithTypeParameter: a => a,

    methodOnlyInI1: a => a,
    propertyOnlyInI1: "Hello",
};
var i1Ori2: I1<number> | I2<number> = { // Like i2
    commonPropertyType: "hello",
    commonMethodType: a=> a,
    commonMethodWithTypeParameter: a => a,

    methodOnlyInI2: a => a,
    propertyOnlyInI2: "Hello",
};
var i1Ori2: I1<number> | I2<number> = { // Like i1 and i2 both
    commonPropertyType: "hello",
    commonMethodType: a=> a,
    commonMethodWithTypeParameter: a => a,
    methodOnlyInI1: a => a,
    propertyOnlyInI1: "Hello",
    methodOnlyInI2: a => a,
    propertyOnlyInI2: "Hello",
};

var arrayI1OrI2: Array<I1<number> | I2<number>> = [i1, i2, { // Like i1
        commonPropertyType: "hello",
        commonMethodType: a=> a,
        commonMethodWithTypeParameter: a => a,

        methodOnlyInI1: a => a,
        propertyOnlyInI1: "Hello",
    },
    { // Like i2
        commonPropertyType: "hello",
        commonMethodType: a=> a,
        commonMethodWithTypeParameter: a => a,

        methodOnlyInI2: a => a,
        propertyOnlyInI2: "Hello",
    }, { // Like i1 and i2 both
        commonPropertyType: "hello",
        commonMethodType: a=> a,
        commonMethodWithTypeParameter: a => a,
        methodOnlyInI1: a => a,
        propertyOnlyInI1: "Hello",
        methodOnlyInI2: a => a,
        propertyOnlyInI2: "Hello",
    }];

interface I11 {
    commonMethodDifferentReturnType(a: string, b: number): string;
    commonPropertyDifferentType: string;
}
interface I21 {
    commonMethodDifferentReturnType(a: string, b: number): number;
    commonPropertyDifferentType: number;
}
var i11: I11;
var i21: I21;
var i11Ori21: I11 | I21 = i11;
var i11Ori21: I11 | I21 = i21;
var i11Ori21: I11 | I21 = { 
    // Like i1
    commonMethodDifferentReturnType: (a, b) => {
        var z = a.charAt(b);
        return z;  
    },
    commonPropertyDifferentType: "hello",  
};
var i11Ori21: I11 | I21 = { 
    // Like i2
    commonMethodDifferentReturnType: (a, b) => {
        var z = a.charCodeAt(b);
        return z;
    },
    commonPropertyDifferentType: 10,
};
var arrayOrI11OrI21: Array<I11 | I21> = [i11, i21, i11 || i21, { 
        // Like i1
        commonMethodDifferentReturnType: (a, b) => {
            var z = a.charAt(b);
            return z;
        },
        commonPropertyDifferentType: "hello",
    }, { 
        // Like i2
        commonMethodDifferentReturnType: (a, b) => {
            var z = a.charCodeAt(b);
            return z;
        },
        commonPropertyDifferentType: 10,
    }];