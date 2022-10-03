module M {
    var x: asdf;
    var y = x + asdf;
    var z = <asdf>x; // should be an error
    if (asdf) {
    }
    else if (qwerty) {
    }

    try {
    }
    catch (asdf) { // no error
    }

    switch (asdf) {
        case qwerty:
            break;
        default:
            break;
    }

    var a = () => asdf;
    var b = (asdf) => { return qwerty };

    module N {
        var x = 1;
    }
    import c = N;
    import d = asdf;
}