// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59902

const example = <T extends string>() => {
  type SomeOptional = { [key in T]?: 1 };

  type AllRequired = { [key in keyof SomeOptional]-?: 1 };

  type RequiredValues = AllRequired[keyof AllRequired];

  const x: RequiredValues = undefined; // error

  return x;
};
