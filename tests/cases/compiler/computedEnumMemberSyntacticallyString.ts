// @isolatedModules: true,false
// @noTypesAndSymbols: true
// @target: esnext

const BAR = 2..toFixed(0);

enum Foo {
    A = `${BAR}`,
    B = "2" + BAR,
    C = (`${BAR}`),

    F = BAR,
    G = 2 + BAR,

    H = A,
    I = H + BAR,
    J = H
}
