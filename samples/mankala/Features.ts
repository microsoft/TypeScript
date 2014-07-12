///<reference path="Driver.ts"/>

module Mankala {
    export class Features {
        public turnContinues = false;
        public seedStoredCount = 0;
        public capturedCount = 0;
        public spaceCaptured = NoSpace;

        public clear() {
            this.turnContinues = false;
            this.seedStoredCount = 0;
            this.capturedCount = 0;
            this.spaceCaptured = NoSpace;
        }

        public toString() {
            var stringBuilder = "";
            if (this.turnContinues) {
                stringBuilder += " turn continues,";
            }
            stringBuilder += " stores " + this.seedStoredCount;
            if (this.capturedCount > 0) {
                stringBuilder += " captures " + this.capturedCount + " from space " + this.spaceCaptured;
            }
            return stringBuilder;
        }
    }
}
