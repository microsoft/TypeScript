//// [objectLitGetterSetter.ts]
            var obj = {};
            Object.defineProperty(obj, "accProperty", <PropertyDescriptor>({
                get: function () {
                    eval("public = 1;");
                    return 11;
                },
                set: function (v) {
                }
            }))


//// [objectLitGetterSetter.js]
var obj = {};
Object.defineProperty(obj, "accProperty", ({
    get: function () {
        eval("public = 1;");
        return 11;
    },
    set: function (v) {
    }
}));
