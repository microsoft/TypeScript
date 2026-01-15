declare var x: any;
declare function isFunction(x): x is Function;
declare function isObject(x): x is Object;
declare function isAnything(x): x is {};
declare function isError(x): x is Error;
declare function isDate(x): x is Date;


if (isFunction(x)) { // 'any' is not narrowed when target type is 'Function'
    x();
    x(1, 2, 3);
    x("hello!");
    x.prop;
}

if (isObject(x)) { // 'any' is not narrowed when target type is 'Object'
    x.method();
    x();
}

if (isAnything(x)) { // 'any' is narrowed to types other than 'Function'/'Object' (including {})
    x.method();
    x();
}

if (isError(x)) { 
    x.message;
    x.mesage;
}

if (isDate(x)) {
    x.getDate();
    x.getHuors();
}
