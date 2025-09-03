//// [tests/cases/conformance/expressions/typeGuards/typeGuardFunctionOfFormThis.ts] ////

//// [typeGuardFunctionOfFormThis.ts]
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

let a: RoyalGuard = new FollowerGuard();
if (a.isLeader()) {
    a.lead();
}
else if (a.isFollower()) {
    a.follow();
}

interface GuardInterface extends RoyalGuard {}

let b: GuardInterface;
if (b.isLeader()) {
    b.lead();
}
else if (b.isFollower()) {
    b.follow();
}

// if (((a.isLeader)())) {
//     a.lead();
// }
// else if (((a).isFollower())) {
//     a.follow();
// }

// if (((a["isLeader"])())) {
//     a.lead();
// }
// else if (((a)["isFollower"]())) {
//     a.follow();
// }

var holder2 = {a};

if (holder2.a.isLeader()) {
    holder2.a;
}
else {
    holder2.a;
}

class ArrowGuard {
    isElite = (): this is ArrowElite => {
        return this instanceof ArrowElite;
    }
    isMedic = (): this is ArrowMedic => {
        return this instanceof ArrowMedic;
    }
}

class ArrowElite extends ArrowGuard {
    defend(): void {}
}

class ArrowMedic extends ArrowGuard {
    heal(): void {}
}

let guard = new ArrowGuard();
if (guard.isElite()) {
    guard.defend();
}
else if (guard.isMedic()) {
    guard.heal();
}

interface Supplies {
    spoiled: boolean;
}

interface Sundries {
    broken: boolean;
}

interface Crate<T> {
    contents: T;
    volume: number;
    isSupplies(): this is Crate<Supplies>;
    isSundries(): this is Crate<Sundries>;
}

let crate: Crate<{}>;

if (crate.isSundries()) {
    crate.contents.broken = true;
}
else if (crate.isSupplies()) {
    crate.contents.spoiled = true;
}

// Matching guards should be assignable

a.isFollower = b.isFollower;
a.isLeader = b.isLeader;

class MimicGuard {
    isLeader(): this is MimicLeader { return this instanceof MimicLeader; };
    isFollower(): this is MimicFollower { return this instanceof MimicFollower; };
}

class MimicLeader extends MimicGuard {
    lead(): void {}
}

class MimicFollower extends MimicGuard {
    follow(): void {}
}

let mimic = new MimicGuard();

a.isLeader = mimic.isLeader;
a.isFollower = mimic.isFollower;

if (mimic.isFollower()) {
    mimic.follow();
    mimic.isFollower = a.isFollower;
}


interface MimicGuardInterface {
    isLeader(): this is LeadGuard;
    isFollower(): this is FollowerGuard;
}


//// [typeGuardFunctionOfFormThis.js]
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
if (a.isLeader()) {
    a.lead();
}
else if (a.isFollower()) {
    a.follow();
}
let b;
if (b.isLeader()) {
    b.lead();
}
else if (b.isFollower()) {
    b.follow();
}
// if (((a.isLeader)())) {
//     a.lead();
// }
// else if (((a).isFollower())) {
//     a.follow();
// }
// if (((a["isLeader"])())) {
//     a.lead();
// }
// else if (((a)["isFollower"]())) {
//     a.follow();
// }
var holder2 = { a };
if (holder2.a.isLeader()) {
    holder2.a;
}
else {
    holder2.a;
}
class ArrowGuard {
    isElite = () => {
        return this instanceof ArrowElite;
    };
    isMedic = () => {
        return this instanceof ArrowMedic;
    };
}
class ArrowElite extends ArrowGuard {
    defend() { }
}
class ArrowMedic extends ArrowGuard {
    heal() { }
}
let guard = new ArrowGuard();
if (guard.isElite()) {
    guard.defend();
}
else if (guard.isMedic()) {
    guard.heal();
}
let crate;
if (crate.isSundries()) {
    crate.contents.broken = true;
}
else if (crate.isSupplies()) {
    crate.contents.spoiled = true;
}
// Matching guards should be assignable
a.isFollower = b.isFollower;
a.isLeader = b.isLeader;
class MimicGuard {
    isLeader() { return this instanceof MimicLeader; }
    ;
    isFollower() { return this instanceof MimicFollower; }
    ;
}
class MimicLeader extends MimicGuard {
    lead() { }
}
class MimicFollower extends MimicGuard {
    follow() { }
}
let mimic = new MimicGuard();
a.isLeader = mimic.isLeader;
a.isFollower = mimic.isFollower;
if (mimic.isFollower()) {
    mimic.follow();
    mimic.isFollower = a.isFollower;
}


//// [typeGuardFunctionOfFormThis.d.ts]
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
declare let a: RoyalGuard;
interface GuardInterface extends RoyalGuard {
}
declare let b: GuardInterface;
declare var holder2: {
    a: RoyalGuard;
};
declare class ArrowGuard {
    isElite: () => this is ArrowElite;
    isMedic: () => this is ArrowMedic;
}
declare class ArrowElite extends ArrowGuard {
    defend(): void;
}
declare class ArrowMedic extends ArrowGuard {
    heal(): void;
}
declare let guard: ArrowGuard;
interface Supplies {
    spoiled: boolean;
}
interface Sundries {
    broken: boolean;
}
interface Crate<T> {
    contents: T;
    volume: number;
    isSupplies(): this is Crate<Supplies>;
    isSundries(): this is Crate<Sundries>;
}
declare let crate: Crate<{}>;
declare class MimicGuard {
    isLeader(): this is MimicLeader;
    isFollower(): this is MimicFollower;
}
declare class MimicLeader extends MimicGuard {
    lead(): void;
}
declare class MimicFollower extends MimicGuard {
    follow(): void;
}
declare let mimic: MimicGuard;
interface MimicGuardInterface {
    isLeader(): this is LeadGuard;
    isFollower(): this is FollowerGuard;
}
