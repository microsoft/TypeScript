class Leg {}

class Foo<t> extends Leg {
    t = {} as t

    // should allow this access since t was declared as a property on Foo
    foo = this.t 
}