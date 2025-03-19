//// [tests/cases/compiler/implicitAnyGetAndSetAccessorWithAnyReturnType.ts] ////

//// [implicitAnyGetAndSetAccessorWithAnyReturnType.ts]
// these should be errors
class GetAndSet {
    getAndSet = null;             // error at "getAndSet"
    public get haveGetAndSet() {  // this should not be an error
        return this.getAndSet;
    }
    
    // this shouldn't be an error
    public set haveGetAndSet(value) {  // error at "value"
        this.getAndSet = value;
    }
}

class SetterOnly {
    public set haveOnlySet(newXValue) {  // error at "haveOnlySet, newXValue"
    }
}

class GetterOnly {
    public get haveOnlyGet() {  // error at "haveOnlyGet"
        return null;
    }
}

//// [implicitAnyGetAndSetAccessorWithAnyReturnType.js]
// these should be errors
class GetAndSet {
    getAndSet = null; // error at "getAndSet"
    get haveGetAndSet() {
        return this.getAndSet;
    }
    // this shouldn't be an error
    set haveGetAndSet(value) {
        this.getAndSet = value;
    }
}
class SetterOnly {
    set haveOnlySet(newXValue) {
    }
}
class GetterOnly {
    get haveOnlyGet() {
        return null;
    }
}
