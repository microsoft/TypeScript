///<reference path='references.ts' />

var global: any = <any>Function("return this").call(null);

module TypeScript {
    module Clock {
        export var now: () => number;
        export var resolution: number;

        declare module WScript {
            export function InitializeProjection(): void;
        }

        declare module TestUtilities {
            export function QueryPerformanceCounter(): number;
            export function QueryPerformanceFrequency(): number;
        }

        if (typeof WScript !== "undefined" && typeof global['WScript'].InitializeProjection !== "undefined") {
            // Running in JSHost.
            global['WScript'].InitializeProjection();

            now = function () {
                return TestUtilities.QueryPerformanceCounter();
            };

            resolution = TestUtilities.QueryPerformanceFrequency();
        }
         else {
            now = function () {
                return Date.now();
            };

            resolution = 1000;
        }
    }

    export class Timer {
        public startTime: number;
        public time = 0;

        public start() {
            this.time = 0;
            this.startTime = Clock.now();
        }

        public end() {
            // Set time to MS.
            this.time = (Clock.now() - this.startTime);
        }
    }
}