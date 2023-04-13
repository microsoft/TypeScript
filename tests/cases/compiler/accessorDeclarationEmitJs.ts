// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @filename: /a.js
export const t1 = {
    p: 'value',
    get getter() {
        return 'value';
    },
}

export const t2 = {
    v: 'value',
    set setter(v) {},
}

export const t3 = {
    p: 'value',
    get value() {
        return 'value';
    },
    set value(v) {},
}
