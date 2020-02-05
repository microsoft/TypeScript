//// [limitRecursionInIntersectionsWithThisProperties.ts]
// 35804

interface ITreeItem {    
  Parent?: this;
}

type NodeWithId = ITreeItem & { Id?: number };

function getMaxId(items: NodeWithId[]) {
}

const nodes = [] as ITreeItem[];
getMaxId(nodes);


//// [limitRecursionInIntersectionsWithThisProperties.js]
// 35804
function getMaxId(items) {
}
var nodes = [];
getMaxId(nodes);
