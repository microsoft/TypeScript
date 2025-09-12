package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestThisPredicateFunctionQuickInfo(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class RoyalGuard {
    isLeader(): this is LeadGuard {
        return this instanceof LeadGuard;
    }
    isFollower(): this is FollowerGuard {
        return this instanceof FollowerGuard;
    }
}

class LeadGuard extends RoyalGuard {
    lead(): void {};
}

class FollowerGuard extends RoyalGuard {
    follow(): void {};
}

let a: RoyalGuard = new FollowerGuard();
if (a.is/*1*/Leader()) {
    a./*2*/;
}
else if (a.is/*3*/Follower()) {
    a./*4*/;
}

interface GuardInterface {
   isLeader(): this is LeadGuard;
   isFollower(): this is FollowerGuard;
}

let b: GuardInterface;
if (b.is/*5*/Leader()) {
    b./*6*/;
}
else if (b.is/*7*/Follower()) {
    b./*8*/;
}

if (((a.isLeader)())) {
    a./*9*/;
}
else if (((a).isFollower())) {
    a./*10*/;
}

if (((a["isLeader"])())) {
    a./*11*/;
}
else if (((a)["isFollower"]())) {
    a./*12*/;
}

let leader/*13*/Status = a.isLeader();
function isLeaderGuard(g: RoyalGuard) {
   return g.isLeader();
}
let checked/*14*/LeaderStatus = isLeader/*15*/Guard(a);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(method) RoyalGuard.isLeader(): this is LeadGuard", "")
	f.VerifyQuickInfoAt(t, "3", "(method) RoyalGuard.isFollower(): this is FollowerGuard", "")
	f.VerifyQuickInfoAt(t, "5", "(method) GuardInterface.isLeader(): this is LeadGuard", "")
	f.VerifyQuickInfoAt(t, "7", "(method) GuardInterface.isFollower(): this is FollowerGuard", "")
	f.VerifyQuickInfoAt(t, "13", "let leaderStatus: boolean", "")
	f.VerifyQuickInfoAt(t, "14", "let checkedLeaderStatus: boolean", "")
	f.VerifyQuickInfoAt(t, "15", "function isLeaderGuard(g: RoyalGuard): g is LeadGuard", "")
}
