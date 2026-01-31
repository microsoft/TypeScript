//// [tests/cases/compiler/instantiatedReturnTypeContravariance.ts] ////

//// [instantiatedReturnTypeContravariance.ts]
interface B<T> {

name: string;

x(): T;

}
 
class c {

foo(): B<void> {

return null;

}

}
 
class d extends c {

foo(): B<number> {

return null;

}

}

 


//// [instantiatedReturnTypeContravariance.js]
class c {
    foo() {
        return null;
    }
}
class d extends c {
    foo() {
        return null;
    }
}
