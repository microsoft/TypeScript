interface Opacity {
    readonly opacity: number;
    getStratum(id: string): { opacity: number };
}

interface Layer {
    readonly layer: string;
    getStratum(id: string): { layer: string };
}

function hasOpacity(x: any): x is Opacity {
    return 'opacity' in x;
}

function hasLayer(x: any): x is Layer {
    return 'layer' in x;
}

const foo = {};
if (hasOpacity(foo) && hasLayer(foo)) {
    foo.getStratum('user').opacity = 0.5;
    foo.getStratum('user').layer = 'test';
}
