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
