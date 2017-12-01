/// <reference path='fourslash.ts'/>

// @Filename: index.tsx
////import { [|{| "isWriteAccess": true, "isDefinition": true |}SubmissionComp|] } from "./RedditSubmission"
////function displaySubreddit(subreddit: string) {
////    let components = submissions
////        .map((value, index) => <[|SubmissionComp|] key={ index } elementPosition= { index } {...value.data} />);
////}

// @Filename: RedditSubmission.ts
////export const [|{| "isWriteAccess": true, "isDefinition": true |}SubmissionComp|] = (submission: SubmissionProps) =>
////    <div style={{ fontFamily: "sans-serif" }}></div>;

const [r0, r1, r2] = test.ranges();
const imports = { definition: "import SubmissionComp", ranges: [r0, r1] };
const def = { definition: "const SubmissionComp: (submission: any) => any", ranges: [r2] };
verify.referenceGroups([r0, r1], [imports, def]);
verify.referenceGroups(r2, [def, imports]);
