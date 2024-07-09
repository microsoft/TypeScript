module my.data.foo {
    export function buz() { }
}
module my.data {
    function data(my) {
        foo.buz();
    }
}