module Alpha {
    export var x = 100;
}

module Beta {
    import p = Alpha.x;
}


var x = Alpha.x