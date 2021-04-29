// @strict: true

// Repro from #35804

interface ITreeItem {    
  Parent?: this;
}

type NodeWithId = ITreeItem & { Id?: number };

function getMaxId(items: NodeWithId[]) {
}

const nodes = [] as ITreeItem[];
getMaxId(nodes);


// Repro from #42715
export interface Donkey {
    donkey: string;
}

interface Diddy {
    diddy: string;
    children?: Diddy[] | Donkey;
}

interface Cranky {
    cranky: string;
    children: Diddy;
}

type Dandy = Diddy & {
    children: (Diddy & { funky?: string })[];
};
type X = Dandy["children"]
var x: X

const mainView: Dandy = {
    diddy: "",
    children: [
        {
            diddy: "",
            funky: "Empty" // <- Incorrect error
        }
    ],
};
// Legal
const p = mainView.children[0].funky
