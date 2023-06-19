// @strict: true
// @target: esnext

declare const str1: string;
declare const pattern1: `foo${string}`;
declare const pattern2: `foobar${string}`;
declare const samepattern1: `foo${string}`;

const obj1 = {
  [pattern1]: true,
};

const obj2 = {
  [pattern1]: true,
  [str1]: 100,
};

const obj3 = {
  [str1]: 100,
  [pattern1]: true,
};

const obj4 = {
  [pattern1]: true,
  [pattern2]: "hello",
};

const obj5 = {
  [pattern2]: "hello",
  [pattern1]: true,
};

const obj6 = {
  [pattern1]: true,
  [pattern2]: "hello",
  other: 100,
};

const obj7 = {
  [pattern1]: true,
  [pattern2]: "hello",
  fooooooooo: 100,
};

const obj8 = {
  [pattern1]: true,
  [pattern2]: "hello",
  foobarrrrr: 100,
};

const obj9 = {
  [pattern1]: true,
  [samepattern1]: "hello",
};

const obj10 = {
  [pattern1]: true,
} as const;

const obj11 = {
  [pattern1]: 100,
  ...obj9,
};

const obj12 = {
  ...obj9,
  [pattern1]: 100,
};

const obj13 = {
  [pattern1]: 100,
  ...{
    [pattern2]: "hello",
  },
};

const obj14 = {
  [pattern1]: 100,
  ...{
    [pattern1]: true,
    [pattern2]: "hello",
    foobarrrrr: [1, 2, 3],
  },
};

// repro from https://github.com/microsoft/TypeScript/issues/46309

interface IDocument_46309 {
  name: string;
  [added_: `added_${string}`]: number[] | undefined;
}

const tech1_46309 = {
  uuid: "70b26275-5096-4e4b-9d50-3c965c9e5073",
};

const doc_46309: IDocument_46309 = {
  name: "",
  [`added_${tech1_46309.uuid}`]: [19700101],
};

const doc2_46309: IDocument_46309 = {
  name: "",
  [`added_${tech1_46309.uuid}` as const]: [19700101],
};
