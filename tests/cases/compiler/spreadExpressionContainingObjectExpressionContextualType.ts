// @noEmit: true

// repro #49585

const { value } = (() => ({
  value: "",
  ...(true ? {} : {}),
}))();

// repro 49684#discussion_r920545763

const { value2 } = {
  value2: "",
  ...(() => true ? {} : {})(),
};
