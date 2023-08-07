//// [tests/cases/compiler/narrowingByBooleanDiscriminantStrictNullChecksFalse.ts] ////

//// [narrowingByBooleanDiscriminantStrictNullChecksFalse.ts]
// https://github.com/microsoft/TypeScript/issues/10564

type Result = { success: true } | { success: false; error: string };

function handleError3(res: Result) {
  if (res.success) {
    return;
  }

  res.error;
}


//// [narrowingByBooleanDiscriminantStrictNullChecksFalse.js]
// https://github.com/microsoft/TypeScript/issues/10564
function handleError3(res) {
    if (res.success) {
        return;
    }
    res.error;
}
