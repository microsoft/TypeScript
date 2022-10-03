// @skipLibCheck: true
// @lib: es6,dom,dom.iterable
// @target: es6

for (const element of document.getElementsByTagName("a")) {
    element.href;
}