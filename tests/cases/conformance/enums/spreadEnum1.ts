// @declaration: true

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