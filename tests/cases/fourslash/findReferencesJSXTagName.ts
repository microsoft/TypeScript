/// <reference path='fourslash.ts'/>

// @Filename: index.tsx
////import { /*1*/SubmissionComp } from "./RedditSubmission"
////function displaySubreddit(subreddit: string) {
////    let components = submissions
////        .map((value, index) => <SubmissionComp key={ index } elementPosition= { index } {...value.data} />);
////}

// @Filename: RedditSubmission.ts
////export const /*2*/SubmissionComp = (submission: SubmissionProps) =>
////    <div style={{ fontFamily: "sans-serif" }}></div>;

verify.baselineFindAllReferences('1', '2')
