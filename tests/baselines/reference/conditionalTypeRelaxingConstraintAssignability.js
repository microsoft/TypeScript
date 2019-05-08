//// [conditionalTypeRelaxingConstraintAssignability.ts]
export type ElChildren =
  | ElChildren.Void
  | ElChildren.Text;
export namespace ElChildren {
  export type Void = undefined;
  export type Text = string;
}

type Relax<C extends ElChildren> = C extends ElChildren.Text ? ElChildren.Text : C;

export class Elem<
  C extends ElChildren,
  > {
  constructor(
    private children_: Relax<C>,
  ) {
  }
}

new Elem(undefined as ElChildren.Void);
new Elem('' as ElChildren.Text);
new Elem('' as ElChildren.Void | ElChildren.Text); // error
new Elem('' as ElChildren); // error

//// [conditionalTypeRelaxingConstraintAssignability.js]
"use strict";
exports.__esModule = true;
var Elem = /** @class */ (function () {
    function Elem(children_) {
        this.children_ = children_;
    }
    return Elem;
}());
exports.Elem = Elem;
new Elem(undefined);
new Elem('');
new Elem(''); // error
new Elem(''); // error
