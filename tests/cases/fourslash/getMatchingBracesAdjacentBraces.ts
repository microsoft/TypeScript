////function f[|<T>|][|(x: T)|][|{
////    return x;
////}|]

// If there is an adjacent opening and closing brace,
// then only the opening brace should get highlighted.
test.ranges().forEach(range => {
    verify.matchingBracePositionInCurrentFile(range.start, range.end - 1);
});