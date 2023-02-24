// @strict: true

declare let aNumber: number;
declare let aNumberWrapper: Number;

function a() {
    aNumber = aNumberWrapper;
}

function b() {
    aNumberWrapper = aNumber;
}
