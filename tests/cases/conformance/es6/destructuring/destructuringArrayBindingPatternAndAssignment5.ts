// @noImplicitAny: true

// To be inferred as `number`
function f1() {
    const [a1, b1 = a1] = [1];
    const [a2, b2 = 1 + a2] = [1];
    const [a3, b3 = (() => 1 + a3)()] = [1];
    const [a4, b4 = (() => (() => 1 + a4)() + 1)()] = [1];
}

// To be inferred as `string`
function f2() {
    const [a1, b1 = a1] = ['hi'];
    const [a2, b2 = [a2, '!'].join()] = ['hi'];
    const [a3, b3 = (() => [a3, '!'].join())()] = ['hi'];
    const [a4, b4 = (() => (() => [a4, '!'].join())() + '!')()] = ['hi'];
}

// To be inferred as `string | number`
function f3() {
    const [a1, b1 = a1] = ['hi', 1];
    const [a2, b2 = [a2, '!'].join()] = ['hi', 1];
    const [a3, b3 = (() => [a3, '!'].join())()] = ['hi', 1];
    const [a4, b4 = (() => (() => [a4, '!'].join())() + '!')()] = ['hi', 1];
}
