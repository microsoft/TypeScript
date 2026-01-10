interface Animal { x }
interface Giraffe extends Animal { y }
interface Elephant extends Animal { y2 }

declare var f2: <T extends Animal>(x: T, y: T) => void;

declare var g2: (g: Giraffe, e: Elephant) => void;
g2 = f2; // error because Giraffe and Elephant are disjoint types

declare var h2: (g1: Giraffe, g2: Giraffe) => void;
h2 = f2; // valid because Giraffe satisfies the constraint. It is safe in the traditional contravariant fashion.