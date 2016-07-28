// @filename: a.d.ts
export = ns;

export as namespace ns;

declare namespace ns {
  export var x: number;
  export interface IFoo { }
}

// @filename: b.d.ts
declare namespace ns.something {
  export var p: ns.IFoo;
}
