////function f[|<T>|][|(x: T)|][|{
////    return x;
////}|]

// If there is an adjacent opening and closing brace,
// then only the opening brace should get highlighted.
for (const range of test.ranges()) {
    verify.matchingBracePositionInCurrentFile(range.pos, range.end - 1);
}
