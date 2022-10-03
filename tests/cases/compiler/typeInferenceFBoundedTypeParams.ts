// Example from #6037

function fold<a, r>(values: a[], result: r, fold: (result: r, value: a) => r): r {
    for (let value of values) {
        result = fold(result, value);
    }
    return result;
}

function append<a, b extends a>(values: a[], value: b): a[] {
    values.push(value);
    return values;
}

fold(
    [1, 2, 3],
    [] as [string, string][],
    (result, value) => append(
        result,
        ["", ""]
    )
);
