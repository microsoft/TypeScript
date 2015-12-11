/// <reference path="fourslash.ts" />

//// class RoyalGuard {
////     isLeader(): this is LeadGuard {
////         return this instanceof LeadGuard;
////     }
////     isFollower(): this is FollowerGuard {
////         return this instanceof FollowerGuard;
////     }
//// }
////
//// class LeadGuard extends RoyalGuard {
////     lead(): void {};
//// }
////
//// class FollowerGuard extends RoyalGuard {
////     follow(): void {};
//// }
////
//// let a: RoyalGuard = new FollowerGuard();
//// if (a.is/*1*/Leader()) {
////     a./*2*/;
//// }
//// else if (a.is/*3*/Follower()) {
////     a./*4*/;
//// }
////
//// interface GuardInterface {
////    isLeader(): this is LeadGuard;
////    isFollower(): this is FollowerGuard;
//// }
////
//// let b: GuardInterface;
//// if (b.is/*5*/Leader()) {
////     b./*6*/;
//// }
//// else if (b.is/*7*/Follower()) {
////     b./*8*/;
//// }
////
//// if (((a.isLeader)())) {
////     a./*9*/;
//// }
//// else if (((a).isFollower())) {
////     a./*10*/;
//// }
////
//// if (((a["isLeader"])())) {
////     a./*11*/;
//// }
//// else if (((a)["isFollower"]())) {
////     a./*12*/;
//// }
////
//// let leader/*13*/Status = a.isLeader();
//// function isLeaderGuard(g: RoyalGuard) {
////    return g.isLeader();
//// }
//// let checked/*14*/LeaderStatus = isLeader/*15*/Guard(a);


goTo.marker("1");
verify.quickInfoIs("(method) RoyalGuard.isLeader(): this is LeadGuard");
goTo.marker("3");
verify.quickInfoIs("(method) RoyalGuard.isFollower(): this is FollowerGuard");

goTo.marker("5");
verify.quickInfoIs("(method) GuardInterface.isLeader(): this is LeadGuard");
goTo.marker("7");
verify.quickInfoIs("(method) GuardInterface.isFollower(): this is FollowerGuard");

goTo.marker("13");
verify.quickInfoIs("let leaderStatus: boolean");
goTo.marker("14");
verify.quickInfoIs("let checkedLeaderStatus: boolean");
goTo.marker("15");
verify.quickInfoIs("function isLeaderGuard(g: RoyalGuard): boolean");