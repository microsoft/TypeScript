//// [tests/cases/compiler/reachabilityChecks4.ts] ////

//// [reachabilityChecks4.ts]
function foo(x, y) {
    switch (x) {
        case 1:
        case 2:
            return 1;
        case 3:
            if (y) {
                return 2;
            }
        case 4:
            return 3;
    }
}

declare function noop(): void;
declare function fail(): never;

function f1(x: 0 | 1 | 2) {
    switch (x) {
        case 0:
            fail();
        case 1:
            noop();
        case 2:
            return;
    }
}

// Repro from #34021

type Behavior = 'SLIDE' | 'SLIDE_OUT'
type Direction = 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM'

interface Transition {
  behavior: Behavior
  direction: Direction
}

function f2(transition: Transition): any {
    switch (transition.behavior) {
        case 'SLIDE':
            switch (transition.direction) {
                case 'LEFT':
                    return []
                case 'RIGHT':
                    return []
                case 'TOP':
                    return []
                case 'BOTTOM':
                    return []
            }
        case 'SLIDE_OUT':
            switch (transition.direction) {
                case 'LEFT':
                    return []
                case 'RIGHT':
                    return []
                case 'TOP':
                    return []
                case 'BOTTOM':
                    return []
            }
    }
}


//// [reachabilityChecks4.js]
function foo(x, y) {
    switch (x) {
        case 1:
        case 2:
            return 1;
        case 3:
            if (y) {
                return 2;
            }
        case 4:
            return 3;
    }
}
function f1(x) {
    switch (x) {
        case 0:
            fail();
        case 1:
            noop();
        case 2:
            return;
    }
}
function f2(transition) {
    switch (transition.behavior) {
        case 'SLIDE':
            switch (transition.direction) {
                case 'LEFT':
                    return [];
                case 'RIGHT':
                    return [];
                case 'TOP':
                    return [];
                case 'BOTTOM':
                    return [];
            }
        case 'SLIDE_OUT':
            switch (transition.direction) {
                case 'LEFT':
                    return [];
                case 'RIGHT':
                    return [];
                case 'TOP':
                    return [];
                case 'BOTTOM':
                    return [];
            }
    }
}
