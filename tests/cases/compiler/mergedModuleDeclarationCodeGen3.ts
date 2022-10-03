module my.data {
    export function buz() { }
}
module my.data.foo {
    function data(my, foo) {
        buz();
    }
}