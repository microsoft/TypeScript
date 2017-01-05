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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RoyalGuard = (function () {
    function RoyalGuard() {
    }
    RoyalGuard.prototype.isLeader = function () {
        return this instanceof LeadGuard;
    };
    RoyalGuard.prototype.isFollower = function () {
        return this instanceof FollowerGuard;
    };
    return RoyalGuard;
}());
var LeadGuard = (function (_super) {
    __extends(LeadGuard, _super);
    function LeadGuard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LeadGuard.prototype.lead = function () { };
    ;
    return LeadGuard;
}(RoyalGuard));
var FollowerGuard = (function (_super) {
    __extends(FollowerGuard, _super);
    function FollowerGuard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FollowerGuard.prototype.follow = function () { };
    ;
    return FollowerGuard;
}(RoyalGuard));
var a = new FollowerGuard();
var b = new LeadGuard();
// Mismatched guards shouldn't be assignable
b.isFollower = b.isLeader;
b.isLeader = b.isFollower;
a.isFollower = a.isLeader;
a.isLeader = a.isFollower;
function invalidGuard(c) {
    return false;
}
var c;
if (invalidGuard(c)) {
    c;
}
else {
    c;
}
var holder = { invalidGuard: invalidGuard };
if (holder.invalidGuard(c)) {
    c;
    holder;
}
else {
    c;
    holder;
}
var detached = a.isFollower;
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
    invalidGuard: (c: any) => this is number;
};
declare let detached: () => this is FollowerGuard;
