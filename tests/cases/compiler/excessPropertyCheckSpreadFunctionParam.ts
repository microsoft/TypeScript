// @strict: true
// @noemit: true

type Params = {
    a?: any;
    b?: any;
}
  
function f(params: Params) {
    return;
}

const objWithAllowedKeys = { a: 2 }
const objWithForbiddenKeys = { c: 2 }
const objWithNoKeys = {}
const a = 2;
const c = 2;

f({ ...objWithAllowedKeys })
f({ ...objWithForbiddenKeys })
f({ ...objWithAllowedKeys, ...objWithForbiddenKeys })

f({ ...{ a: 2 }, ...{ c: 2 } })
f({ ...{ a: 2, c: 2 } })
f({ ...{ c: 2 }, ...{ b: 2 } })

f({ ...{ a: 2 }, ...objWithForbiddenKeys })

f({ ...{ c: 2 }, ...objWithAllowedKeys })
f({ ...{ c: 2 }, ...objWithForbiddenKeys })
f({ ...{ c: 2 }, ...objWithNoKeys })

f({ ...{...{ c: 2 }, ...objWithNoKeys } })

f({ a, ...{ c: 2 } })
f({ a, ...{ c } })
f({ ...{ c }, ...objWithAllowedKeys })




