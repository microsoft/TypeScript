//// [tests/cases/compiler/recursiveExcessPropertyChecks.ts] ////

//// [recursiveExcessPropertyChecks.ts]
// Repro from #35804

interface ITreeItem {    
  Parent?: this;
}

type NodeWithId = ITreeItem & { Id?: number };

function getMaxId(items: NodeWithId[]) {
}

const nodes = [] as ITreeItem[];
getMaxId(nodes);


//// [recursiveExcessPropertyChecks.js]
"use strict";
// Repro from #35804
function getMaxId(items) {
}
var nodes = [];
getMaxId(nodes);
