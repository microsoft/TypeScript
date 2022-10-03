// @strict: true

// Repros from #23771

const myNull: null = null;
const objWithValMaybeNull: { val: number | null } = { val: 1 };
const addOne = function (num: number) {
    return num + 1;
}

if (objWithValMaybeNull.val !== null)
    addOne(objWithValMaybeNull.val);
if (objWithValMaybeNull.val !== myNull)
    addOne(objWithValMaybeNull.val);

if (objWithValMaybeNull.val === null)
    addOne(objWithValMaybeNull.val);    // Error
if (objWithValMaybeNull.val === myNull)
    addOne(objWithValMaybeNull.val);    // Error

function f(x: number | null) {
    if(x === myNull) {
        const s: string = x;  // Error
    }
}
