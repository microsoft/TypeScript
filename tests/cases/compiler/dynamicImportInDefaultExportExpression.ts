// @target: es2015
// @module: commonjs
// @skipLibCheck: true
// @lib: es6
export default {
    getInstance: function () {
        return import('./foo2');
    }
}