
function foo([x, y, z] ?: [string, number, boolean]);
function foo(...rest: any[]) {

}

foo(["", 0, false]);

foo([false, 0, ""]);