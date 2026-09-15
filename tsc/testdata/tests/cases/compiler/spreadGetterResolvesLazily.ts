// @strict: true
// @noEmit: true

// A spread copy of a getter takes its type from the getter on demand, so a getter
// that refers back to the spread result is well-founded, as it already is without
// the spread.
const direct = {
    get self() {
        return direct;
    },
};

const source = {
    get self() {
        return spread;
    },
};
const spread = { ...source };

const directSelf: typeof direct = direct.self.self;
const spreadSelf: typeof spread = spread.self.self;
const wrongDirect: number = direct.self;
const wrongSpread: number = spread.self;
spread.self = spread;
direct.self = direct;

export {};
