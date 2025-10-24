//// [tests/cases/conformance/types/typeRelationships/subtypesAndSuperTypes/subtypingWithGenericCallSignaturesWithOptionalParameters.ts] ////

//// [subtypingWithGenericCallSignaturesWithOptionalParameters.ts]
// call signatures in derived types must have the same or fewer optional parameters as the base type

module ClassTypeParam {
    interface Base<T> {
        a: () => T;
        a2: (x?: T) => T;
        a3: (x: T) => T;
        a4: (x: T, y?: T) => T;
        a5: (x?: T, y?: T) => T;
    }

    interface I1<T> extends Base<T> {
        a: () => T; // ok, same T of required params
    }

    interface I2<T> extends Base<T> {
        a: (x?: T) => T; // ok, same T of required params
    }

    interface I3<T> extends Base<T> {
        a: (x: T) => T; // error, too many required params
    }


    interface I4<T> extends Base<T> {
        a2: () => T; // ok, same T of required params
    }

    interface I5<T> extends Base<T> {
        a2: (x?: T) => T; // ok, same T of required params
    }

    interface I6<T> extends Base<T> {
        a2: (x: T) => T; // ok, same number of params
    }


    interface I7<T> extends Base<T> {
        a3: () => T; // ok, fewer required params
    }

    interface I8<T> extends Base<T> {
        a3: (x?: T) => T; // ok, fewer required params
    }

    interface I9<T> extends Base<T> {
        a3: (x: T) => T; // ok, same T of required params
    }

    interface I10<T> extends Base<T> {
        a3: (x: T, y: T) => T;  // error, too many required params
    }


    interface I11<T> extends Base<T> {
        a4: () => T; // ok, fewer required params
    }

    interface I12<T> extends Base<T> {
        a4: (x?: T, y?: T) => T; // ok, fewer required params
    }

    interface I13<T> extends Base<T> {
        a4: (x: T) => T; // ok, same T of required params
    }

    interface I14<T> extends Base<T> {
        a4: (x: T, y: T) => T;  // ok, same number of params
    }


    interface I15<T> extends Base<T> {
        a5: () => T; // ok, fewer required params
    }

    interface I16<T> extends Base<T> {
        a5: (x?: T, y?: T) => T; // ok, fewer required params
    }

    interface I17<T> extends Base<T> {
        a5: (x: T) => T; // ok, all present params match
    }

    interface I18<T> extends Base<T> {
        a5: (x: T, y: T) => T;  // ok, same number of params
    }
}

module GenericSignaturesInvalid {

    // all of these are errors
    interface Base2 {
        a: <T>() => T;
        a2: <T>(x?: T) => T;
        a3: <T>(x: T) => T;
        a4: <T>(x: T, y?: T) => T;
        a5: <T>(x?: T, y?: T) => T;
    }

    interface I1<T> extends Base2 {
        a: () => T; 
    }

    interface I2<T> extends Base2 {
        a: (x?: T) => T;
    }

    interface I3<T> extends Base2 {
        a: (x: T) => T; 
    }


    interface I4<T> extends Base2 {
        a2: () => T; 
    }

    interface I5<T> extends Base2 {
        a2: (x?: T) => T
    }

    interface I6<T> extends Base2 {
        a2: (x: T) => T;
    }


    interface I7<T> extends Base2 {
        a3: () => T;
    }

    interface I8<T> extends Base2 {
        a3: (x?: T) => T; 
    }

    interface I9<T> extends Base2 {
        a3: (x: T) => T; 
    }

    interface I10<T> extends Base2 {
        a3: (x: T, y: T) => T;  
    }


    interface I11<T> extends Base2 {
        a4: () => T; 
    }

    interface I12<T> extends Base2 {
        a4: (x?: T, y?: T) => T; 
    }

    interface I13<T> extends Base2 {
        a4: (x: T) => T; 
    }

    interface I14<T> extends Base2 {
        a4: (x: T, y: T) => T; 
    }


    interface I15<T> extends Base2 {
        a5: () => T; 
    }

    interface I16<T> extends Base2 {
        a5: (x?: T, y?: T) => T; 
    }

    interface I17<T> extends Base2 {
        a5: (x: T) => T;
    }

    interface I18<T> extends Base2 {
        a5: (x: T, y: T) => T; 
    }
}

module GenericSignaturesValid {

    interface Base2 {
        a: <T>() => T;
        a2: <T>(x?: T) => T;
        a3: <T>(x: T) => T;
        a4: <T>(x: T, y?: T) => T;
        a5: <T>(x?: T, y?: T) => T;
    }

    // BUG 833350
    interface I1 extends Base2 {
        a: <T>() => T; // ok, same number of required params
    }

    interface I2 extends Base2 {
        a: <T>(x?: T) => T; // error, not identical and contextual signature instatiation can't make inference from T to T
    }

    interface I3 extends Base2 {
        a: <T>(x: T) => T; // error, not identical and contextual signature instatiation can't make inference from T to T
    }


    interface I4 extends Base2 {
        a2: <T>() => T; // error, not identical and contextual signature instatiation can't make inference from T to T
    }

    interface I5 extends Base2 {
        a2: <T>(x?: T) => T; // ok, identical
    }

    interface I6 extends Base2 {
        a2: <T>(x: T) => T; // ok, same number of params
    }


    interface I7 extends Base2 {
        a3: <T>() => T; // error, no inferences for T so {} not assignable to {} in return type
    }

    interface I8 extends Base2 {
        a3: <T>(x?: T) => T; // ok, fewer required params
    }

    interface I9 extends Base2 {
        a3: <T>(x: T) => T; // ok, identical, same number of required params
    }

    interface I10 extends Base2 {
        a3: <T>(x: T, y: T) => T;  // error, too many required params
    }


    interface I11 extends Base2 {
        a4: <T>() => T; // error, not identical and contextual signature instatiation can't make inference from T to T
    }

    interface I12 extends Base2 {
        a4: <T>(x?: T, y?: T) => T; // ok, fewer required params
    }

    interface I13 extends Base2 {
        a4: <T>(x: T) => T; // ok, same T of required params
    }

    interface I14 extends Base2 {
        a4: <T>(x: T, y: T) => T;  // error, too many required params
    }


    interface I15 extends Base2 {
        a5: <T>() => T; // error, not identical and contextual signature instatiation can't make inference from T to T
    }

    interface I16 extends Base2 {
        a5: <T>(x?: T, y?: T) => T; // ok, fewer required params
    }

    interface I17 extends Base2 {
        a5: <T>(x: T) => T; // ok, all present params match
    }

    interface I18 extends Base2 {
        a5: <T>(x: T, y: T) => T;  // ok, same number of params
    }
}

//// [subtypingWithGenericCallSignaturesWithOptionalParameters.js]
// call signatures in derived types must have the same or fewer optional parameters as the base type
