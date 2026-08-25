// @strict: true
// @noEmit: true

type Candidate = { mode: "a"; output: unknown } | { mode: "b" };

export function run(): never {
    let lastCandidate: Candidate | null = null;
    while (true) {
        const candidate: Candidate = {
            mode: "a",
            output: lastCandidate,
        } as const;
        lastCandidate = candidate;
    }
}
