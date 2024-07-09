function foo(q: string, b: number) {
    return true ? (q ? true : false) : (b = q.length, function() { });
};
