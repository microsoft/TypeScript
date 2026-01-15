interface IResultCallback extends Function { }

function fn(cb: IResultCallback) { }

fn((a, b) => true);
fn(function (a, b) { return true; })

