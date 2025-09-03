//// [tests/cases/conformance/expressions/typeGuards/typeGuardFunctionOfFormThisErrors.ts] ////

//// [typeGuardFunctionOfFormThisErrors.ts]
class RoyalGuard {
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

interface GuardInterface extends RoyalGuard {}
let a: RoyalGuard = new FollowerGuard();
let b: GuardInterface = new LeadGuard();

// Mismatched guards shouldn't be assignable
b.isFollower = b.isLeader;
b.isLeader = b.isFollower;

a.isFollower = a.isLeader;
a.isLeader = a.isFollower;

function invalidGuard(c: any): this is number {
    return false;
}

let c: number | number[];
if (invalidGuard(c)) {
    c;
}
else {
    c;
}

let holder = {invalidGuard};

if (holder.invalidGuard(c)) {
    c;
    holder;
}
else {
    c;
    holder;
}

let detached = a.isFollower;

if (detached()) {
    a.follow();
}
else {
    a.lead();
}

//// [typeGuardFunctionOfFormThisErrors.js]
class RoyalGuard {
    isLeader() {
        return this instanceof LeadGuard;
    }
    isFollower() {
        return this instanceof FollowerGuard;
    }
}
class LeadGuard extends RoyalGuard {
    lead() { }
    ;
}
class FollowerGuard extends RoyalGuard {
    follow() { }
    ;
}
let a = new FollowerGuard();
let b = new LeadGuard();
// Mismatched guards shouldn't be assignable
b.isFollower = b.isLeader;
b.isLeader = b.isFollower;
a.isFollower = a.isLeader;
a.isLeader = a.isFollower;
function invalidGuard(c) {
    return false;
}
let c;
if (invalidGuard(c)) {
    c;
}
else {
    c;
}
let holder = { invalidGuard };
if (holder.invalidGuard(c)) {
    c;
    holder;
}
else {
    c;
    holder;
}
let detached = a.isFollower;
if (detached()) {
    a.follow();
}
else {
    a.lead();
}


//// [typeGuardFunctionOfFormThisErrors.d.ts]
declare class RoyalGuard {
    isLeader(): this is LeadGuard;
    isFollower(): this is FollowerGuard;
}
declare class LeadGuard extends RoyalGuard {
    lead(): void;
}
declare class FollowerGuard extends RoyalGuard {
    follow(): void;
}
interface GuardInterface extends RoyalGuard {
}
declare let a: RoyalGuard;
declare let b: GuardInterface;
declare function invalidGuard(c: any): this is number;
declare let c: number | number[];
declare let holder: {
    invalidGuard: typeof invalidGuard;
};
declare let detached: () => this is FollowerGuard;
