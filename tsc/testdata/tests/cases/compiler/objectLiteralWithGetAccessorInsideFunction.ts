// @target: es2015
function bar() {
    var x = {
        get _extraOccluded() {
            var occluded = 0;
            return occluded;
        },
    }
}