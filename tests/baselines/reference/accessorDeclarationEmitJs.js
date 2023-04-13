//// [a.js]
export const object = {
    property: 'value',
    get getter() {
        return 'value';
    },
}




//// [a.d.ts]
export namespace object {
    let property: string;
    let getter: string;
}
