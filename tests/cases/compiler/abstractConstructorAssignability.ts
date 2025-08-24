type ConcreteConstructor = new () => void;
type AbstractConstructor = abstract new () => void;

declare let concreteConstructor: ConcreteConstructor;
declare let abstractConstructor: AbstractConstructor;

concreteConstructor = abstractConstructor; // should error
abstractConstructor = concreteConstructor; // should work

class ConcreteClass {}
abstract class AbstractClass {}

declare let concreteClass: typeof ConcreteClass
declare let abstractClass: typeof AbstractClass

concreteClass = abstractClass; // should error
abstractClass = concreteClass; // should work
