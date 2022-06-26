// @noEmit: true

// repro #49585

const { value } = (() => ({
  value: "",
  ...(true ? {} : {}),
}))();