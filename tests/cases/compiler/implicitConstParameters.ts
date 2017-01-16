// @strictNullChecks: true

function doSomething(cb: () => void) {
    cb();
}

function fn(x: number | string) {
  if (typeof x === 'number') {
      doSomething(() => x.toFixed());
  }
}

function f1(x: string | undefined) {
    if (!x) {
        return;
    }
    doSomething(() => x.length);
}

function f2(x: string | undefined) {
    if (x) {
        doSomething(() => {
            doSomething(() => x.length);
        });
    }
}

function f3(x: string | undefined) {
    inner();
    function inner() {
        if (x) {
            doSomething(() => x.length);
        }
    }
}

function f4(x: string | undefined) {
    x = "abc";  // causes x to be considered non-const
    if (x) {
        doSomething(() => x.length);
    }
}

function f5(x: string | undefined) {
    if (x) {
        doSomething(() => x.length);
    }
    x = "abc";  // causes x to be considered non-const
}


function f6(x: string | undefined) {
    const y = x || "";
    if (x) {
        doSomething(() => y.length);
    }
}