//// [tests/cases/compiler/baseTypeOrderChecking.ts] ////

//// [baseTypeOrderChecking.ts]
var someVariable: Class4<Class2>;

 

class Class1

{

}

 

class Class2 extends Class1

{

}

 

class Class3<T>

{

               public memberVariable: Class2;

}

 

class Class4<T> extends Class3<T>

{

}


//// [baseTypeOrderChecking.js]
var someVariable;
class Class1 {
}
class Class2 extends Class1 {
}
class Class3 {
    memberVariable;
}
class Class4 extends Class3 {
}
