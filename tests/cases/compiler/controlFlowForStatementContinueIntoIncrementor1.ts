// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/60945

{
  let iNext;
  for (
    let i = 0;
    i < 10;
    i = iNext // error
  ) {
    if (i == 5) {
      iNext = "bad";
      continue;
    }
    iNext = i + 1;
  }
}

{
  let iNext: string | number = "";
  for (
    let i = 0;
    i < 10;
    i = iNext // error
  ) {
    if (i == 5) {
      iNext = "bad";
      continue;
    }
    iNext = i + 1;
  }
}
