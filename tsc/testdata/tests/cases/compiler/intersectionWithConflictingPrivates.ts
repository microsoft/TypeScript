// @strict: true
// @target: esnext
// @useDefineForClassFields: false

class A { private x: unknown; y?: string; }
class B { private x: unknown; y?: string; }

declare let ab: A & B;
ab.y = 'hello';
ab = {};

function f1(node: A | B) {
  if (node instanceof A || node instanceof A) {
    node;  // A
  }
  else {
    node;  // B
  }
  node;  // A | B
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
