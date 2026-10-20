// @strict: true
// @target: es2015

function initialize(result: IteratorResult<object, void>) {
    if (result.value == null) {
        result.value = {};
    }
}
