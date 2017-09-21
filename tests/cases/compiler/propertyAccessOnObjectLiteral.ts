class A { }

(<A>{}).toString();

(() => {
    (<A>{}).toString();
})();
