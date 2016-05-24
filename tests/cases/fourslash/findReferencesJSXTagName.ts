/// <reference path='fourslash.ts'/>

// @Filename: index.tsx
////import { /*1*/SubmissionComp } from "./RedditSubmission"
////function displaySubreddit(subreddit: string) {
////    let components = submissions
////        .map((value, index) => </*2*/SubmissionComp key={ index } elementPosition= { index } {...value.data} />);
////}

// @Filename: RedditSubmission.ts
////export const /*3*/SubmissionComp = (submission: SubmissionProps) =>
////    <div style={{ fontFamily: "sans-serif" }}></div>;


goTo.marker("1");
verify.referencesCountIs(3);

goTo.marker("2");
verify.referencesCountIs(3);

goTo.marker("3");
verify.referencesCountIs(3);