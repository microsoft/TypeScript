// @strict: true
// @lib: esnext
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59145

function resolve1(id: string | undefined) {
  const isBundled = id?.includes("_bundled");
  if (isBundled) {
    const str: string = id;
  }
}

function resolve2(id: string | undefined) {
  if (id?.includes("_bundled")) {
    const str: string = id;
  }
}
