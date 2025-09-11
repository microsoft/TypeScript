// @strict: true
// @noEmit: true

declare function is(...arg: string[]): boolean;
declare class AST_Case {
  constructor(_: { body: any });
}
declare class AST_Default {
  constructor(_: { body: any });
}
declare class AST_Statement {
  children: any[];
}
declare function statement(): AST_Statement;
declare function unexpected(): void;

function switch_body_() {
  var a = [],
    branch,
    cur;

  while (!is("punc", "}")) {
    if (is("keyword", "case")) {
      cur = [];
      branch = new AST_Case({
        body: cur,
      });
      a.push(branch);
    } else if (is("keyword", "default")) {
      cur = [];
      branch = new AST_Default({
        body: cur,
      });
      a.push(branch);
    } else {
      if (!cur) unexpected();
      cur.push(statement());
    }
  }
  return a;
}
