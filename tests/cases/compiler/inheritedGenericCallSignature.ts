
interface I1<T> {

    (a: T): T;

}


interface Object {}

 

interface I2<T> extends I1<T[]> {

    b: T;

}

 

var x: I2<Date>;

 

var y = x(undefined);

y.length;  // should not error
