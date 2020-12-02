//// [fatArrowSelf.ts]
module Events {
    export interface ListenerCallback {
        (value:any):void;
    }
    export class EventEmitter {
         public addListener(type:string, listener:ListenerCallback) {
         }
    }
}

module Consumer {
    class EventEmitterConsummer {
        constructor (private emitter: Events.EventEmitter) { }

        private register() {
            this.emitter.addListener('change', (e) => {
                this.changed();
            });
        }      

        private changed() {
        }
    }
}

//// [fatArrowSelf.js]
var Events;
(function (Events) {
    var EventEmitter = /** @class */ (function () {
        function EventEmitter() {
        }
        EventEmitter.prototype.addListener = function (type, listener) {
        };
        return EventEmitter;
    }());
    Events.EventEmitter = EventEmitter;
})(Events || (Events = {}));
var Consumer;
(function (Consumer) {
    var EventEmitterConsummer = /** @class */ (function () {
        function EventEmitterConsummer(emitter) {
            this.emitter = emitter;
        }
        var EventEmitterConsummer_prototype = EventEmitterConsummer.prototype;
        EventEmitterConsummer_prototype.register = function () {
            var _this = this;
            this.emitter.addListener('change', function (e) {
                _this.changed();
            });
        };
        EventEmitterConsummer_prototype.changed = function () {
        };
        return EventEmitterConsummer;
    }());
})(Consumer || (Consumer = {}));
