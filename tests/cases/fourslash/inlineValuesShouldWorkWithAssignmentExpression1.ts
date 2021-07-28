/// <reference path="fourslash.ts" />

//// let [|a|] = 1;
//// [|a|] += 1;
//// [|a|] -= 1;
//// [|a|] *= 1;
//// [|a|] /= 1;
//// [|a|] **= 1;
//// [|a|] %= 1;
//// [|a|] = 2;
//// [|a|] &&= 1;
//// [|a|] ||= 1;
//// [|a|] ??= 1;
//// [|a|] |= 1;
//// [|a|] &= 1;
//// [|a|] ^= 1;
//// [|a|]++;
//// [|a|]--;
//// ++[|a|];
//// --[|a|];
//// /*a*/

const ranges = test.ranges();

verify.getInlineValues({
    position: test.markerByName('a').position,
    expected: ranges.map(range => ({
        type: ts.InlineValueType.VariableLookup,
        range,
        variableName: 'a'
    }))
});
