// @module: nodenext
// @target: esnext
// @moduleResolution: nodenext
// @filename: ./a.json
{ "key": "value" }

// @filename: ./b.ts
declare global {
    interface ImportAttributes {
        type: "json"
    }
}

export type Test1 = typeof import("./a.json", {
  with: {
    type: "json"
  },
});

export type Test2 = typeof import("./a.json", {
  with: {
    type: "json",
  }
});

export type Test3 = typeof import("./a.json", {
  with: {
    type: "json"
  },,
});

export type Test4 = typeof import("./a.json", {
  with: {
    type: "json",,
  }
});
