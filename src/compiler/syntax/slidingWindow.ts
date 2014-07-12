///<reference path='references.ts' />

module TypeScript {
    export interface ISlidingWindowSource {
        // Asks the source to copy items starting at sourceIndex into the window at 'destinationIndex'
        // with up to 'spaceAvailable' items.  The actual number of items fetched should be given as 
        // the return value.
        fetchMoreItems(argument: any, sourceIndex: number, window: any[], destinationIndex: number, spaceAvailable: number): number;
    }

    export class SlidingWindow {

        // The number of valid items in window.
        public windowCount: number = 0;

        // The *absolute* index in the *full* array of items the *window* array starts at.  i.e.
        // if there were 100 items, and window contains tokens [70, 80), then this value would be
        // 70.
        public windowAbsoluteStartIndex: number = 0;

        // The index in the window array that we're at. i.e. if there 100 items and 
        // window contains tokens [70, 80), and we're on item 75, then this value would be '5'.
        // Note: it is not absolute.  It is relative to the start of the window.
        public currentRelativeItemIndex: number = 0;

        // The number of pinned points there are.  As long as there is at least one  pinned point, we 
        // will not advance the start of the window array past the item marked by that pin point.
        private _pinCount: number = 0;

        // If there are any outstanding rewind points, this is index in the full array of items
        // that the first rewind point points to.  If this is not -1, then we will not shift the
        // start of the items array past this point.
        private firstPinnedAbsoluteIndex: number = -1;

        constructor(// Underlying source that we retrieve items from.
                    private source: ISlidingWindowSource,
                    // A window of items that has been read in from the underlying source.
                    public window: any[],
                    // The default value to return when there are no more items left in the window.
                    private defaultValue: any,
                    // The length of the source we're reading from if we know it up front.  -1 if we do not.
                    private sourceLength = -1) {
        }

        // The last legal index of the window (exclusive).
        private windowAbsoluteEndIndex(): number {
            return this.windowAbsoluteStartIndex + this.windowCount;
        }

        private addMoreItemsToWindow(argument: any): boolean {
            if (this.sourceLength >= 0 && this.absoluteIndex() >= this.sourceLength) {
                return false;
            }

            // First, make room for the new items if we're out of room.
            if (this.windowCount >= this.window.length) {
                this.tryShiftOrGrowWindow();
            }

            var spaceAvailable = this.window.length - this.windowCount;
            var amountFetched = this.source.fetchMoreItems(argument, this.windowAbsoluteEndIndex(), this.window, this.windowCount, spaceAvailable);

            // Assert disabled because it is actually expensive enugh to affect perf.

            this.windowCount += amountFetched;
            return amountFetched > 0;
        }

        private tryShiftOrGrowWindow(): void {
            // We want to shift if our current item is past the halfway point of the current item window.
            var currentIndexIsPastWindowHalfwayPoint = this.currentRelativeItemIndex > (this.window.length >>> 1);

            // However, we can only shift if we have no outstanding rewind points.  Or, if we have an 
            // outstanding rewind point, that it points to some point after the start of the window.
            var isAllowedToShift =
                this.firstPinnedAbsoluteIndex === -1 ||
                this.firstPinnedAbsoluteIndex > this.windowAbsoluteStartIndex;

            if (currentIndexIsPastWindowHalfwayPoint && isAllowedToShift) {
                // Figure out where we're going to start shifting from. If we have no oustanding rewind 
                // points, then we'll start shifting over all the items starting from the current 
                // token we're point out.  Otherwise, we'll shift starting from the first item that 
                // the rewind point is pointing at.
                // 
                // We'll call that point 'N' from now on. 
                var shiftStartIndex = this.firstPinnedAbsoluteIndex === -1
                    ? this.currentRelativeItemIndex
                    : this.firstPinnedAbsoluteIndex - this.windowAbsoluteStartIndex;

                // We have to shift the number of elements between the start index and the number of 
                // items in the window.
                var shiftCount = this.windowCount - shiftStartIndex;

                // Debug.assert(shiftStartIndex > 0);
                if (shiftCount > 0) {
                    ArrayUtilities.copy(this.window, shiftStartIndex, this.window, 0, shiftCount);
                }

                // The window has now moved over to the right by N.
                this.windowAbsoluteStartIndex += shiftStartIndex;

                // The number of valid items in the window has now decreased by N.
                this.windowCount -= shiftStartIndex;

                // The current item now starts further to the left in the window.
                this.currentRelativeItemIndex -= shiftStartIndex;
            }
            else {
                // Grow the exisitng array.
                // this.window[this.window.length * 2 - 1] = this.defaultValue;
                ArrayUtilities.grow(this.window, this.window.length * 2, this.defaultValue);
            }
        }

        public absoluteIndex(): number {
            return this.windowAbsoluteStartIndex + this.currentRelativeItemIndex;
        }

        public isAtEndOfSource(): boolean {
            return this.absoluteIndex() >= this.sourceLength;
        }

        public getAndPinAbsoluteIndex(): number {
            // Find the absolute index of this pin point.  i.e. it's the index as if we had an 
            // array containing *all* tokens.  
            var absoluteIndex = this.absoluteIndex();
            var pinCount = this._pinCount++;
            if (pinCount === 0) {
                // If this is the first pinned point, then store off this index.  We will ensure that
                // we never shift the window past this point.
                this.firstPinnedAbsoluteIndex = absoluteIndex;
            }

            return absoluteIndex;
        }

        public releaseAndUnpinAbsoluteIndex(absoluteIndex: number) {
            this._pinCount--;
            if (this._pinCount === 0) {
                // If we just released the last outstanding pin, then we no longer need to 'fix' the 
                // token window so it can't move forward.  Set the index to -1 so that we can shift 
                // things over the next time we read past the end of the array.
                this.firstPinnedAbsoluteIndex = -1;
            }
        }

        public rewindToPinnedIndex(absoluteIndex: number): void {
            // The rewind point shows which absolute item we want to rewind to.  Get the relative 
            // index in the actual array that we want to point to.
            var relativeIndex = absoluteIndex - this.windowAbsoluteStartIndex;

            // Make sure we haven't screwed anything up.
            // Debug.assert(relativeIndex >= 0 && relativeIndex < this.windowCount);

            // Set ourselves back to that point.
            this.currentRelativeItemIndex = relativeIndex;
        }

        public currentItem(argument: any): any {
            if (this.currentRelativeItemIndex >= this.windowCount) {
                if (!this.addMoreItemsToWindow(argument)) {
                    return this.defaultValue;
                }
            }

            return this.window[this.currentRelativeItemIndex];
        }

        public peekItemN(n: number): any {
            // Assert disabled because it is actually expensive enugh to affect perf.
            // Debug.assert(n >= 0);
            while (this.currentRelativeItemIndex + n >= this.windowCount) {
                if (!this.addMoreItemsToWindow(/*argument:*/ null)) {
                    return this.defaultValue;
                }
            }

            return this.window[this.currentRelativeItemIndex + n];
        }

        public moveToNextItem(): void {
            this.currentRelativeItemIndex++;
        }

        public disgardAllItemsFromCurrentIndexOnwards(): void {
            // By setting the window count to the current relative offset, we are effectively making
            // any items we added to the window from the current offset onwards unusable.  When we
            // try to get the next item, we'll be forced to refetch them from the underlying source.
            this.windowCount = this.currentRelativeItemIndex;
        }

        public setAbsoluteIndex(absoluteIndex: number): void {
            if (this.absoluteIndex() === absoluteIndex) {
                // Nothing to do if we're setting hte absolute index to where we current are.
                return;
            }

            if (this._pinCount > 0) {
                // If we have any active pins, then the caller better be setting the index somewhere
                // inside our active window.
                // Debug.assert(absoluteIndex >= this.windowAbsoluteStartIndex && absoluteIndex < this.windowAbsoluteEndIndex());
            }

            if (absoluteIndex >= this.windowAbsoluteStartIndex && absoluteIndex < this.windowAbsoluteEndIndex()) {
                // The caller is setting the index to some place inside our current window.  This is 
                // easy to handle (and should be the common case).
                this.currentRelativeItemIndex = (absoluteIndex - this.windowAbsoluteStartIndex);
            }
            else {
                // The caller is setting the index to a place not in the window.  Just throw away 
                // everything we've got.

                // First, set the window start to that index.
                this.windowAbsoluteStartIndex = absoluteIndex;

                // Now, set the count to 0.  So we'll be forced to fetch more items.
                this.windowCount = 0;

                // And set us back to the start of the window.
                this.currentRelativeItemIndex = 0;
            }
        }

        public pinCount(): number {
            return this._pinCount;
        }
    }
}