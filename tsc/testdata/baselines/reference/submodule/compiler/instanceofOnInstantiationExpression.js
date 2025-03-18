//// [tests/cases/compiler/instanceofOnInstantiationExpression.ts] ////

//// [instanceofOnInstantiationExpression.ts]
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


//// [instanceofOnInstantiationExpression.js]
maybeBox instanceof Box;
maybeBox instanceof Box;
maybeBox instanceof (Box);
maybeBox instanceof ((Box));
Box instanceof Object;
(Box) instanceof Object;
((Box)) instanceof Object;
