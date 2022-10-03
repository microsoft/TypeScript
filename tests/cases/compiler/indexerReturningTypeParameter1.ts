interface f {
    groupBy<T>(): { [key: string]: T[]; };
}
var a: f;
var r = a.groupBy();

class c {
    groupBy<T>(): { [key: string]: T[]; } {
        return null;
    }
}
var a2: c;
var r2 = a2.groupBy();