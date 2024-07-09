//@noUnusedLocals:true
//@noUnusedParameters:true

class A<Dummy> {
    public x: Dummy;
}

var x: {
    new <T, U, K>(a: T): A<U>;
}