declare class Box<T> {
    value: T;
}


declare const maybeBox: unknown;

maybeBox instanceof Box; // OK

maybeBox instanceof Box<number>; // error
maybeBox instanceof (Box<number>); // error
maybeBox instanceof ((Box<number>)); // error

Box<number> instanceof Object; // OK
(Box<number>) instanceof Object; // OK
((Box<number>)) instanceof Object; // OK
