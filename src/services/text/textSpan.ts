///<reference path='references.ts' />

module TypeScript {
    export interface ISpan {
        start(): number;
        end(): number;
    }

    export class TextSpan implements ISpan {
        private _start: number;
        private _length: number;

        /**
         * Creates a TextSpan instance beginning with the position Start and having the Length
         * specified with length.
         */
        constructor(start: number, length: number) {
            if (start < 0) {
                Errors.argument("start");
            }

            if (length < 0) {
                Errors.argument("length");
            }

            this._start = start;
            this._length = length;
        }

        public start(): number {
            return this._start;
        }

        public length(): number {
            return this._length;
        }

        public end(): number {
            return this._start + this._length;
        }

        public isEmpty(): boolean {
            return this._length === 0;
        }

        /**
         * Determines whether the position lies within the span. Returns true if the position is greater than or equal to Start and strictly less 
         * than End, otherwise false.
         * @param position The position to check.
         */
        public containsPosition(position: number): boolean {
            return position >= this._start && position < this.end();
        }

        /**
         * Determines whether span falls completely within this span. Returns true if the specified span falls completely within this span, otherwise false.
         * @param span The span to check.
         */
        public containsTextSpan(span: TextSpan): boolean {
            return span._start >= this._start && span.end() <= this.end();
        }

        /**
         * Determines whether the given span overlaps this span. Two spans are considered to overlap 
         * if they have positions in common and neither is empty. Empty spans do not overlap with any 
         * other span. Returns true if the spans overlap, false otherwise.
         * @param span The span to check.
         */
        public overlapsWith(span: TextSpan): boolean {
            var overlapStart = Math.max(this._start, span._start);
            var overlapEnd = Math.min(this.end(), span.end());

            return overlapStart < overlapEnd;
        }

        /**
         * Returns the overlap with the given span, or null if there is no overlap.
         * @param span The span to check.
         */
        public overlap(span: TextSpan): TextSpan {
            var overlapStart = Math.max(this._start, span._start);
            var overlapEnd = Math.min(this.end(), span.end());

            if (overlapStart < overlapEnd) {
                return TextSpan.fromBounds(overlapStart, overlapEnd);
            }

            return null;
        }

        /**
         * Determines whether span intersects this span. Two spans are considered to 
         * intersect if they have positions in common or the end of one span 
         * coincides with the start of the other span. Returns true if the spans intersect, false otherwise.
         * @param The span to check.
         */
        public intersectsWithTextSpan(span: TextSpan): boolean {
            return span._start <= this.end() && span.end() >= this._start;
        }

        public intersectsWith(start: number, length: number): boolean {
            var end = start + length;
            return start <= this.end() && end >= this._start;
        }

        /**
         * Determines whether the given position intersects this span. 
         * A position is considered to intersect if it is between the start and
         * end positions (inclusive) of this span. Returns true if the position intersects, false otherwise.
         * @param position The position to check.
         */
        public intersectsWithPosition(position: number): boolean {
            return position <= this.end() && position >= this._start;
        }

        /**
         * Returns the intersection with the given span, or null if there is no intersection.
         * @param span The span to check.
         */
        public intersection(span: TextSpan): TextSpan {
            var intersectStart = Math.max(this._start, span._start);
            var intersectEnd = Math.min(this.end(), span.end());

            if (intersectStart <= intersectEnd) {
                return TextSpan.fromBounds(intersectStart, intersectEnd);
            }

            return null;
        }

        /**
         * Creates a new TextSpan from the given start and end positions
         * as opposed to a position and length.
         */
        public static fromBounds(start: number, end: number): TextSpan {
            Debug.assert(start >= 0);
            Debug.assert(end - start >= 0);
            return new TextSpan(start, end - start);
        }
    }
}