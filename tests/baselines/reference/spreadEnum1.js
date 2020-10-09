//// [spreadEnum1.ts]
enum BasicEvents {
    Start = "Start",
    Finish = "Finish"
}

enum AdvEvents {
    ...BasicEvents,
    Pause = "Pause",
    Resume = "Resume"
}

declare let basic: BasicEvents;

declare let adv: AdvEvents;

adv = basic;

basic = BasicEvents.Start;
basic = BasicEvents.Finish;

adv = AdvEvents.Start;
adv = AdvEvents.Finish;
adv = AdvEvents.Pause;
adv = AdvEvents.Resume;

adv = BasicEvents.Start;
adv = BasicEvents.Finish;

//// [spreadEnum1.js]
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var BasicEvents;
(function (BasicEvents) {
    BasicEvents["Start"] = "Start";
    BasicEvents["Finish"] = "Finish";
})(BasicEvents || (BasicEvents = {}));
var AdvEvents;
(function (AdvEvents) {
    __assign(AdvEvents, BasicEvents);
    AdvEvents["Pause"] = "Pause";
    AdvEvents["Resume"] = "Resume";
})(AdvEvents || (AdvEvents = {}));
adv = basic;
basic = BasicEvents.Start;
basic = BasicEvents.Finish;
adv = AdvEvents.Start;
adv = AdvEvents.Finish;
adv = AdvEvents.Pause;
adv = AdvEvents.Resume;
adv = BasicEvents.Start;
adv = BasicEvents.Finish;


//// [spreadEnum1.d.ts]
declare enum BasicEvents {
    Start = "Start",
    Finish = "Finish"
}
declare enum AdvEvents {
    ...BasicEvents,
    Pause = "Pause",
    Resume = "Resume"
}
declare let basic: BasicEvents;
declare let adv: AdvEvents;
