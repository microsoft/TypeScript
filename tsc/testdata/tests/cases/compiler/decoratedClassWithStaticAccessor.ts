// @filename: a.ts
declare function d(target: any): any;

@d
export class C {
  static get value() { return 1; }
}
