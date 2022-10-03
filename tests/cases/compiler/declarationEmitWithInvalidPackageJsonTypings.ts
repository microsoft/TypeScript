// @declaration: true
// @filename: /p1/node_modules/csv-parse/lib/index.d.ts
export function bar(): number;
// @filename: /p1/node_modules/csv-parse/package.json
{
  "main": "./lib",
  "name": "csv-parse",
  "types": [
    "./lib/index.d.ts",
    "./lib/sync.d.ts"
  ],
  "version": "4.8.2"
}
// @filename: /p1/index.ts
export interface MutableRefObject<T> {
    current: T;
}
export function useRef<T>(current: T): MutableRefObject<T> {
    return { current };
}
export const useCsvParser = () => {
    const parserRef = useRef<typeof import("csv-parse")>(null);
    return parserRef;
};
