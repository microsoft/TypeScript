interface IFoo<T> {
    x: T;
}

interface Array<T> extends IFoo<T> { }

var arr: string[] = [];
var y: number = arr.x;