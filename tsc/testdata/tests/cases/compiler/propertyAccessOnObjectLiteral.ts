// @target: es2015
// @strict: false
class A { }

(<A>{}).toString();

(() => {
    (<A>{}).toString();
})();
