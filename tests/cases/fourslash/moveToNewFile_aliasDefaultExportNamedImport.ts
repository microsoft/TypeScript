/// <reference path='fourslash.ts' />

// @Filename: /node_modules/use-react/index.d.ts
///// export { default as useLatest } from './useLatest';

// @Filename: /node_modules/use-react/index.d.ts
//// declare const useLatest: <T>(value: T) => {
////     readonly current: T;
//// };
//// export default useLatest;
//// 

// @Filename: /test.ts
//// import { useLatest } from 'react-use';
//// 
//// [|export function useUseLatest(data: string) {
////     return useLatest(data);
//// }|]

verify.moveToNewFile({
    newFileContents: {
        "/test.ts":
`
`,

        "/useUseLatest.ts":
`import { useLatest } from 'react-use';


export function useUseLatest(data: string) {
    return useLatest(data);
}
`,
    },
});