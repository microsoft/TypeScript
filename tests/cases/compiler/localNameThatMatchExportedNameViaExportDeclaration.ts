// @module: amd

export { my }

var my: any;

my += my;

function doSome1(my: any) {
    my = +my;
    return my;
}

function doSome2() {
    const internal = (my: any) => {
        my = +my;
        return my;
    };
    return internal("1");
}
