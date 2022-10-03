interface I1 {
    const: new (options?, element?) => any;
}


var i: I1;


i.const.prototype.prop = "yo";
