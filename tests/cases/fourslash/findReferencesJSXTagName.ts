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

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups(ranges, [{ definition: "const SubmissionComp: (submission: any) => any", ranges: [r2, r0, r1] }]);
