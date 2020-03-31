//// [intersectionNotAssignableToConstituents.ts]
class A { private x: unknown }
class B { private x: unknown }

function f1(node: A | B) {
  if (node instanceof A || node instanceof A) {
    node;  // A
  }
  else {
    node;  // B
  }
  node;  // A | B
}

function f2(a: A, b: B, c: A & B) {
  a = b;  // Error
  b = a;  // Error
  a = c;  // Error (conflicting private fields)
  b = c;  // Error (conflicting private fields)
}

// Repro from #37659

abstract class ViewNode { }
abstract class ViewRefNode extends ViewNode { }
abstract class ViewRefFileNode extends ViewRefNode { }

class CommitFileNode extends ViewRefFileNode {
  private _id: any;
}

class ResultsFileNode extends ViewRefFileNode {
  private _id: any;
}

class StashFileNode extends CommitFileNode { 
  private _id2: any;
}

class StatusFileNode extends ViewNode {
  private _id: any;
}

class Foo {
  private async foo(node: CommitFileNode | ResultsFileNode | StashFileNode) {
		if (
			!(node instanceof CommitFileNode) &&
			!(node instanceof StashFileNode) &&
			!(node instanceof ResultsFileNode)
		) {
			return;
		}

		await this.bar(node);
	}

  private async bar(node: CommitFileNode | ResultsFileNode | StashFileNode | StatusFileNode, options?: {}) {
    return Promise.resolve(undefined);
  }
}


//// [intersectionNotAssignableToConstituents.js]
"use strict";
class A {
}
class B {
}
function f1(node) {
    if (node instanceof A || node instanceof A) {
        node; // A
    }
    else {
        node; // B
    }
    node; // A | B
}
function f2(a, b, c) {
    a = b; // Error
    b = a; // Error
    a = c; // Error (conflicting private fields)
    b = c; // Error (conflicting private fields)
}
// Repro from #37659
class ViewNode {
}
class ViewRefNode extends ViewNode {
}
class ViewRefFileNode extends ViewRefNode {
}
class CommitFileNode extends ViewRefFileNode {
}
class ResultsFileNode extends ViewRefFileNode {
}
class StashFileNode extends CommitFileNode {
}
class StatusFileNode extends ViewNode {
}
class Foo {
    async foo(node) {
        if (!(node instanceof CommitFileNode) &&
            !(node instanceof StashFileNode) &&
            !(node instanceof ResultsFileNode)) {
            return;
        }
        await this.bar(node);
    }
    async bar(node, options) {
        return Promise.resolve(undefined);
    }
}
