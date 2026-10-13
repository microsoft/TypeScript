// @strict: true
// @lib: es2015,dom
// @noEmit: true

declare const fetchReplacement: (input: string | URL | Request, init?: RequestInit) => Promise<Response>;
const replacement: typeof fetch = fetchReplacement;

declare const input: Parameters<typeof fetch>[0];
fetchReplacement(input);
