module ts {
    export class TextSpan {
        private _start: number;
        private _length: number;

        /**
         * Creates a TextSpan instance beginning with the position Start and having the Length
         * specified with length.
         */
        constructor(start: number, length: number) {
            Debug.assert(start >= 0, "start");
            Debug.assert(length >= 0, "length");

            this._start = start;
            this._length = length;
        }

        public toJSON(key: any): any {
            return { start: this._start, length: this._length };
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
         * Returns the overlap with the given span, or undefined if there is no overlap.
         * @param span The span to check.
         */
        public overlap(span: TextSpan): TextSpan {
            var overlapStart = Math.max(this._start, span._start);
            var overlapEnd = Math.min(this.end(), span.end());

            if (overlapStart < overlapEnd) {
                return TextSpan.fromBounds(overlapStart, overlapEnd);
            }

            return undefined;
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
         * Returns the intersection with the given span, or undefined if there is no intersection.
         * @param span The span to check.
         */
        public intersection(span: TextSpan): TextSpan {
            var intersectStart = Math.max(this._start, span._start);
            var intersectEnd = Math.min(this.end(), span.end());

            if (intersectStart <= intersectEnd) {
                return TextSpan.fromBounds(intersectStart, intersectEnd);
            }

            return undefined;
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

    export class TextChangeRange {
        public static unchanged = new TextChangeRange(new TextSpan(0, 0), 0);

        private _span: TextSpan;
        private _newLength: number;

        /**
         * Initializes a new instance of TextChangeRange.
         */
        constructor(span: TextSpan, newLength: number) {
            Debug.assert(newLength >= 0, "newLength");

            this._span = span;
            this._newLength = newLength;
        }

        /**
         * The span of text before the edit which is being changed
         */
        public span(): TextSpan {
            return this._span;
        }

        /**
         * Width of the span after the edit.  A 0 here would represent a delete
         */
        public newLength(): number {
            return this._newLength;
        }

        public newSpan(): TextSpan {
            return new TextSpan(this.span().start(), this.newLength());
        }

        public isUnchanged(): boolean {
            return this.span().isEmpty() && this.newLength() === 0;
        }

        /**
         * Called to merge all the changes that occurred across several versions of a script snapshot 
         * into a single change.  i.e. if a user keeps making successive edits to a script we will
         * have a text change from V1 to V2, V2 to V3, ..., Vn.  
         * 
         * This function will then merge those changes into a single change range valid between V1 and
         * Vn.
         */
        public static collapseChangesAcrossMultipleVersions(changes: TextChangeRange[]): TextChangeRange {
            if (changes.length === 0) {
                return TextChangeRange.unchanged;
            }

            if (changes.length === 1) {
                return changes[0];
            }

            // We change from talking about { { oldStart, oldLength }, newLength } to { oldStart, oldEnd, newEnd }
            // as it makes things much easier to reason about.
            var change0 = changes[0];

            var oldStartN = change0.span().start();
            var oldEndN = change0.span().end();
            var newEndN = oldStartN + change0.newLength();

            for (var i = 1; i < changes.length; i++) {
                var nextChange = changes[i];

                // Consider the following case:
                // i.e. two edits.  The first represents the text change range { { 10, 50 }, 30 }.  i.e. The span starting
                // at 10, with length 50 is reduced to length 30.  The second represents the text change range { { 30, 30 }, 40 }.
                // i.e. the span starting at 30 with length 30 is increased to length 40.
                //
                //      0         10        20        30        40        50        60        70        80        90        100
                //      -------------------------------------------------------------------------------------------------------
                //                |                                                 /                                          
                //                |                                            /----                                           
                //  T1            |                                       /----                                                
                //                |                                  /----                                                     
                //                |                             /----                                                          
                //      -------------------------------------------------------------------------------------------------------
                //                                     |                            \                                          
                //                                     |                               \                                       
                //   T2                                |                                 \                                     
                //                                     |                                   \                                   
                //                                     |                                      \                                
                //      -------------------------------------------------------------------------------------------------------
                //
                // Merging these turns out to not be too difficult.  First, determining the new start of the change is trivial
                // it's just the min of the old and new starts.  i.e.:
                //
                //      0         10        20        30        40        50        60        70        80        90        100
                //      ------------------------------------------------------------*------------------------------------------
                //                |                                                 /                                          
                //                |                                            /----                                           
                //  T1            |                                       /----                                                
                //                |                                  /----                                                     
                //                |                             /----                                                          
                //      ----------------------------------------$-------------------$------------------------------------------
                //                .                    |                            \                                          
                //                .                    |                               \                                       
                //   T2           .                    |                                 \                                     
                //                .                    |                                   \                                   
                //                .                    |                                      \                                
                //      ----------------------------------------------------------------------*--------------------------------
                //
                // (Note the dots represent the newly inferrred start.
                // Determining the new and old end is also pretty simple.  Basically it boils down to paying attention to the
                // absolute positions at the asterixes, and the relative change between the dollar signs. Basically, we see
                // which if the two $'s precedes the other, and we move that one forward until they line up.  in this case that
                // means:
                //
                //      0         10        20        30        40        50        60        70        80        90        100
                //      --------------------------------------------------------------------------------*----------------------
                //                |                                                                     /                      
                //                |                                                                /----                       
                //  T1            |                                                           /----                            
                //                |                                                      /----                                 
                //                |                                                 /----                                      
                //      ------------------------------------------------------------$------------------------------------------
                //                .                    |                            \                                          
                //                .                    |                               \                                       
                //   T2           .                    |                                 \                                     
                //                .                    |                                   \                                   
                //                .                    |                                      \                                
                //      ----------------------------------------------------------------------*--------------------------------
                //
                // In other words (in this case), we're recognizing that the second edit happened after where the first edit
                // ended with a delta of 20 characters (60 - 40).  Thus, if we go back in time to where the first edit started
                // that's the same as if we started at char 80 instead of 60.  
                //
                // As it so happens, the same logic applies if the second edit precedes the first edit.  In that case rahter
                // than pusing the first edit forward to match the second, we'll push the second edit forward to match the
                // first.
                //
                // In this case that means we have { oldStart: 10, oldEnd: 80, newEnd: 70 } or, in TextChangeRange
                // semantics: { { start: 10, length: 70 }, newLength: 60 }
                //
                // The math then works out as follows.
                // If we have { oldStart1, oldEnd1, newEnd1 } and { oldStart2, oldEnd2, newEnd2 } then we can compute the 
                // final result like so:
                //
                // {
                //      oldStart3: Min(oldStart1, oldStart2),
                //      oldEnd3  : Max(oldEnd1, oldEnd1 + (oldEnd2 - newEnd1)),
                //      newEnd3  : Max(newEnd2, newEnd2 + (newEnd1 - oldEnd2))
                // }

                var oldStart1 = oldStartN;
                var oldEnd1 = oldEndN;
                var newEnd1 = newEndN;

                var oldStart2 = nextChange.span().start();
                var oldEnd2 = nextChange.span().end();
                var newEnd2 = oldStart2 + nextChange.newLength();

                oldStartN = Math.min(oldStart1, oldStart2);
                oldEndN = Math.max(oldEnd1, oldEnd1 + (oldEnd2 - newEnd1));
                newEndN = Math.max(newEnd2, newEnd2 + (newEnd1 - oldEnd2));
            }

            return new TextChangeRange(TextSpan.fromBounds(oldStartN, oldEndN), /*newLength: */newEndN - oldStartN);
        }
    }
}