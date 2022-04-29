interface IResultCallback extends Function {
    x: number;
}

function fn(cb: IResultCallback) { }

fn((a, b) => true);
fn(function (a, b) { return true; })
