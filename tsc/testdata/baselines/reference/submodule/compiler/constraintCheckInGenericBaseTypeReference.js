//// [tests/cases/compiler/constraintCheckInGenericBaseTypeReference.ts] ////

//// [constraintCheckInGenericBaseTypeReference.ts]
// No errors
class Constraint {
    public method() { }
}
class GenericBase<T extends Constraint> {
    public items: any;
}
class Derived extends GenericBase<TypeArg> {

}
class TypeArg {
    public method() {
        Container.People.items;
    }
}

class Container {
    public static People: Derived
}

//// [constraintCheckInGenericBaseTypeReference.js]
// No errors
class Constraint {
    method() { }
}
class GenericBase {
    items;
}
class Derived extends GenericBase {
}
class TypeArg {
    method() {
        Container.People.items;
    }
}
class Container {
    static People;
}
