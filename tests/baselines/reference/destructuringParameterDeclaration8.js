//// [destructuringParameterDeclaration8.ts]
// explicit type annotation should cause `method` to have type 'x' | 'y'
// both inside and outside `test`.
function test({
    method = 'z',
    nested: { p = 'c' }
}: {
    method?: 'x' | 'y',
    nested?: { p: 'a' | 'b' }
})
{
    method
    p
}

test({});
test({ method: 'x', nested: { p: 'a' } })
test({ method: 'z', nested: { p: 'b' } })
test({ method: 'one', nested: { p: 'a' } })


//// [destructuringParameterDeclaration8.js]
// explicit type annotation should cause `method` to have type 'x' | 'y'
// both inside and outside `test`.
function test(_a) {
    var _b = _a.method, method = _b === void 0 ? 'z' : _b, _c = _a.nested.p, p = _c === void 0 ? 'c' : _c;
    method;
    p;
}
test({});
test({ method: 'x', nested: { p: 'a' } });
test({ method: 'z', nested: { p: 'b' } });
test({ method: 'one', nested: { p: 'a' } });
