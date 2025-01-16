// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/58494

function fn<T>(arg: T): T {
    return arg;
}

const a = '1';
const b = a + ' 2';
const c = `${b} 3`;
const d = `${b} 3` as const;

fn(`${b} 3`);
