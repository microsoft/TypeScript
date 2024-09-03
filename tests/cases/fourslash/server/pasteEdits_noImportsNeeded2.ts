/// <reference path="../fourslash.ts" />

// @Filename: /file1.tsx
//// const jsx = () => {
////     <div>
////         <h>{[||]}</h>
////         <p>[||]</p>
////         <b className="[||]"></b>
////     </div>
//// }

// @Filename: /file2.tsx
//// export const getGreeting = () => "Hello";
//// export const receiveGreetings = () => "Thank you";
//// export const getFarewell = () => "Goodbye";
////
//// const test = () => {
////     <div>
////         <p>{[|getGreeting()|]}</p>
////         <p>{[|receiveGreetings()|]}</p>
////         <p>{[|getFarewell()|]}</p>
////     </div>
//// }

// @Filename: /tsconfig.json
////{ "files": ["file1.tsx", "file2.tsx"] }

const ranges = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [
            `getGreeting()`, `receiveGreetings()`, `getFarewell()`,
        ],
    pasteLocations: [ranges[0], ranges[1], ranges[2]],
    copiedFrom: { file: "file2.tsx", range: [ranges[3], ranges[4], ranges[5]] },
    },
    newFileContents: {
        "/file1.tsx":
`import { getGreeting } from "./file2"

const jsx = () => {
    <div>
        <h>{getGreeting()}</h>
        <p>receiveGreetings()</p>
        <b className="getFarewell()"></b>
    </div>
}`
    }
});
 