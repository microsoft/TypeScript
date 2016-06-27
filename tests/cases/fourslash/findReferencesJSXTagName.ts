/// <reference path='fourslash.ts'/>

// @Filename: index.tsx
////import { [|SubmissionComp|] } from "./RedditSubmission"
////function displaySubreddit(subreddit: string) {
////    let components = submissions
////        .map((value, index) => <[|SubmissionComp|] key={ index } elementPosition= { index } {...value.data} />);
////}

// @Filename: RedditSubmission.ts
////export const [|SubmissionComp|] = (submission: SubmissionProps) =>
////    <div style={{ fontFamily: "sans-serif" }}></div>;

verify.rangesReferenceEachOther();
