/// <reference path="fourslash.ts" />

//// let [|a|] = { b: [|1|] };
//// [|a.b|] += 1;
//// [|a.b|] -= 1;
//// [|a.b|] *= 1;
//// [|a.b|] /= 1;
//// [|a.b|] **= 1;
//// [|a.b|] %= 1;
//// [|a.b|] = 2;
//// [|a.b|] &&= 1;
//// [|a.b|] ||= 1;
//// [|a.b|] ??= 1;
//// [|a.b|] |= 1;
//// [|a.b|] &= 1;
//// [|a.b|] ^= 1;
//// [|a.b|]++;
//// [|a.b|]--;
//// ++[|a.b|];
//// --[|a.b|];
//// /*a*/

const [varRange, propertyAssigmentRange, ...ranges] = test.ranges();

// Type system ╮(╯▽╰)╭
const variableDecl: FourSlashInterface.VerifyInlineValues = {
    type: ts.InlineValueType.VariableLookup,
    range: varRange,
    variableName: 'a'
};

const propertyAssigmentDecl: FourSlashInterface.VerifyInlineValues = {
    type: ts.InlineValueType.EvaluatableExpression,
    range: propertyAssigmentRange,
    expression: '1'
};

const declRanges: FourSlashInterface.VerifyInlineValues[] = ranges.map(range => ({
    type: ts.InlineValueType.EvaluatableExpression,
    range,
    expression: 'a.b'
}));

verify.getInlineValues({
    position: test.markerByName('a').position,
    expected: [
        variableDecl,
        propertyAssigmentDecl,
        ...declRanges
    ]
});
