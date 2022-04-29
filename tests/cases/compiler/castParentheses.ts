class a {
    static b: any;
}

var b = (<any>a);
var b = (<any>a).b;
var b = (<any>a.b).c;
var b = (<any>a.b()).c;
var b = (<any>new a);
var b = (<any>new a.b);
var b = (<any>new a).b 