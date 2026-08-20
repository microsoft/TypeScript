// @skipLibCheck: true
// @lib: es6,webworker,webworker.iterable
// @target: es6

for (const [key, entry] of new FormData()) {
    entry;
}
