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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var Events;
(function (Events) {
    var EventEmitter = (function () {
        function EventEmitter() {
        }
        EventEmitter.prototype.addListener = function (type, listener) {
        };
        __names(EventEmitter.prototype, ["addListener"]);
        return EventEmitter;
    }());
    Events.EventEmitter = EventEmitter;
})(Events || (Events = {}));
var Consumer;
(function (Consumer) {
    var EventEmitterConsummer = (function () {
        function EventEmitterConsummer(emitter) {
            this.emitter = emitter;
        }
        EventEmitterConsummer.prototype.register = function () {
            var _this = this;
            this.emitter.addListener('change', function (e) {
                _this.changed();
            });
        };
        EventEmitterConsummer.prototype.changed = function () {
        };
        __names(EventEmitterConsummer.prototype, ["register", "changed"]);
        return EventEmitterConsummer;
    }());
})(Consumer || (Consumer = {}));
