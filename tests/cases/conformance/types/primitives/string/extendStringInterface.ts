interface String {
    doStuff(): string;
    doOtherStuff<T>(x:T): T;
}

var x = '';
var a: string = x.doStuff();
var b: string = x.doOtherStuff('hm');
var c: string = x['doStuff']();
var d: string = x['doOtherStuff']('hm');