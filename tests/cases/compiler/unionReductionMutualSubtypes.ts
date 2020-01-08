// @strict: true

// Repro from #35414

interface ReturnVal {
    something(): void;
}

const k: ReturnVal = { something() { } }

declare const val: ReturnVal;
function run(options: { something?(b?: string): void }) {
    const something = options.something ?? val.something;
    something('');
}
