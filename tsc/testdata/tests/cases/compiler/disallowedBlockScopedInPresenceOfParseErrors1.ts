// @strict: true
// @target: esnext
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/61734

function f1() {
  if (1 > 0)
    const e = 3;
    console.log(e);
  }
}

function f2() {
  if (1 > 0)
    let e = 3;
    console.log(e);
  }
}

declare const resource: Disposable

function f3() {
  if (1 > 0)
    using e = resource;
    console.log(e);
  }
}

declare const asyncResource: AsyncDisposable

async function f4() {
  if (1 > 0)
    await using e = asyncResource;
    console.log(e);
  }
}
