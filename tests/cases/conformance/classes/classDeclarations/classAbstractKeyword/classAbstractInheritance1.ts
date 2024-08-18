abstract class A {}

abstract class B extends A {}

class C extends A {}

abstract class AA {
    abstract foo();
}

abstract class BB extends AA {}

class CC extends AA {}

class DD extends BB {}

abstract class EE extends BB {}

class FF extends CC {}

abstract class GG extends CC {}