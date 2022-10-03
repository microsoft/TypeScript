//// [objectLiteralWithGetAccessorInsideFunction.ts]
function bar() {
    var x = {
        get _extraOccluded() {
            var occluded = 0;
            return occluded;
        },
    }
}

//// [objectLiteralWithGetAccessorInsideFunction.js]
function bar() {
    var x = {
        get _extraOccluded() {
            var occluded = 0;
            return occluded;
        }
    };
}
