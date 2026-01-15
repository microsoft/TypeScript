function fn(x = () => this, y = x()) {

    // should be 4
    return y;

}

fn.call(4); // Should be 4
