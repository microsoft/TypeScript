//// [tests/cases/compiler/objectRestSpread.ts] ////

//// [objectRestSpread.ts]
let obj = {};

({...obj});
let {
    prop = { ...obj },
    more = { ...obj } = { ...obj },
    ['' + 'other']: other = { ...obj },
    yetAnother: {nested: { ['nested' + 'prop']: nestedProp = { ...obj }, ...nestedRest } = { ...obj }} = { ...obj },
    fn = async function*() {},
    ...props
} = {} as any;

({
    prop = { ...obj },
    ['' + 'other']: other = { ...obj },
    ...props
} = {} as any)

function test({
    prop = { ...obj },
    ...props
}) {}

//// [objectRestSpread.js]
let obj = {};
({ ...obj });
let { prop = { ...obj }, more = { ...obj } = { ...obj }, ['' + 'other']: other = { ...obj }, yetAnother: { nested: { ['nested' + 'prop']: nestedProp = { ...obj }, ...nestedRest } = { ...obj } } = { ...obj }, fn = async function* () { }, ...props } = {};
({
    prop = { ...obj },
    ['' + 'other']: other = { ...obj },
    ...props
} = {});
function test({ prop = { ...obj }, ...props }) { }
