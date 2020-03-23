/// <reference path='fourslash.ts'/>

// @Filename: index.tsx
////[|import { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}SubmissionComp|] } from "./RedditSubmission"|]
////function displaySubreddit(subreddit: string) {
////    let components = submissions
////        .map((value, index) => [|<[|{| "contextRangeIndex": 2 |}SubmissionComp|] key={ index } elementPosition= { index } {...value.data} />|]);
////}

// @Filename: RedditSubmission.ts
////export const [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}SubmissionComp|] = (submission: SubmissionProps) =>
////    <div style|]={{ fontFamily: "sans-serif" }}></div>;

const [r0Def, r0, r1Def, r1, r2Def, r2] = test.ranges();
const imports = { definition: "(alias) const SubmissionComp: (submission: any) => any\nimport SubmissionComp", ranges: [r0, r1] };
const def = { definition: "const SubmissionComp: (submission: any) => any", ranges: [r2] };
verify.referenceGroups([r0, r1], [imports, def]);
verify.referenceGroups(r2, [def, imports]);
