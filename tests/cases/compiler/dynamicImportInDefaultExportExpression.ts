// @skipLibCheck: true
// @lib: es6
export default {
    getInstance: function () {
        return import('./foo2');
    }
}