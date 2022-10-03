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