declare function wrapper(x: any);
wrapper((array: [any]) => {
    [this.test, this.test1, this.test2] = array;  // even though there is a compiler error, we should still emit lexical capture for "this"
});