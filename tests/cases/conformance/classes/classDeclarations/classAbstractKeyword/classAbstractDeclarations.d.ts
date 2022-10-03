declare abstract class A {
    abstract constructor() {}
}

declare abstract class AA {
    abstract foo();
}

declare abstract class BB extends AA {}

declare class CC extends AA {}

declare class DD extends BB {}

declare abstract class EE extends BB {}

declare class FF extends CC {}

declare abstract class GG extends CC {}

declare abstract class AAA {}

declare abstract class BBB extends AAA {}

declare class CCC extends AAA {}