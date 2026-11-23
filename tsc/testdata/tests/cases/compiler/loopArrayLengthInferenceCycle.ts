// @strict: true

function tokenize() {
    let state: { matches: string[]; groups: string[][] } | null = null;
    while (true) {
        let matches: string[] | null = null;
        let action: string[] | null = null;
        if (state) {
            const groupEntry = state.groups[0];
            action = groupEntry;
        }
        matches = [];
        if (action) {
            if (matches.length !== action.length) throw new Error();
            state = { matches, groups: [] };
        }
    }
}
