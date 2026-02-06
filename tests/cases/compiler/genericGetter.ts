// @target: es2015
class C<T> {
    data: T;
    get x(): T {
        return this.data;
    }
}

var c = new C<number>();
var r: string = c.x;