function raw(arr: TemplateStringsArray, ...args: unknown[]) {
  return arr.raw;
}

raw`\x`;
raw`\x0`;
raw`\u11`;
raw`\u{}`;
raw`\0123`;

`\x`;
`\x0`;
`\u11`;
`\u{}`;
`\0123`;

raw`${0}\x`;
raw`${0}\x0`;
raw`${0}\u11`;
raw`${0}\u{}`;
raw`${0}\0123`;

`${0}\x`;
`${0}\x0`;
`${0}\u11`;
`${0}\u{}`;
`${0}\0123`;
