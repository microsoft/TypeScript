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

// adv = basic;

// basic = BasicEvents.Start;
// basic = BasicEvents.Finish;

adv = AdvEvents.Start;
adv = AdvEvents.Finish;
adv = AdvEvents.Pause;
adv = AdvEvents.Resume;

adv = BasicEvents.Start;
adv = BasicEvents.Finish;

//// [spreadEnum1.js]
var BasicEvents;
(function (BasicEvents) {
    BasicEvents["Start"] = "Start";
    BasicEvents["Finish"] = "Finish";
})(BasicEvents || (BasicEvents = {}));
var AdvEvents;
(function (AdvEvents) {
    AdvEvents[AdvEvents["BasicEvents"] = void 0] = "BasicEvents";
    AdvEvents["Pause"] = "Pause";
    AdvEvents["Resume"] = "Resume";
})(AdvEvents || (AdvEvents = {}));
// adv = basic;
// basic = BasicEvents.Start;
// basic = BasicEvents.Finish;
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
