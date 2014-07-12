///<reference path="Driver.ts"/>

module Mankala {
    export class Rectangle {

        constructor (public x: number, public y: number,
                           public width: number, public height: number) { }

        public square() {
            var len = this.width;
            var adj = 0;
            if (len > this.height) {
                len = this.height;
                adj = (this.width - len) / 2;
                return new Square(this.x + adj, this.y, len);
            } else {
                adj = (this.height - len) / 2;
                return new Square(this.x, this.y + adj, len);
            }
        }

        public inner(factor: number) {
            var iw = factor * this.width;
            var ih = factor * this.height;
            var ix = this.x + ((this.width - iw) / 2);
            var iy = this.y + ((this.height - ih) / 2);
            return (new Rectangle(ix, iy, iw, ih));
        }

        public proportionalSplitHoriz(...proportionalWidths: number[]) {
            var totalPropWidth = 0;
            var i:number;

            for (i = 0; i < proportionalWidths.length; i++) {
                totalPropWidth += proportionalWidths[i];
            }

            var totalWidth = 0;
            var widths: number[] = [];
            for (i = 0; i < proportionalWidths.length; i++) {
                widths[i] = (proportionalWidths[i] / totalPropWidth) * this.width;
                totalWidth += widths[i];
            }

            var extraWidth = this.width - totalWidth;
            /* Add back round-off error equally to all rectangles */
            i = 0;
            while (extraWidth > 0) {
                widths[i]++;
                extraWidth--;
                if ((++i) == widths.length) {
                    i = 0;
                }
            }
            var rects: Rectangle[] = [];
            var curX = this.x;
            for (i = 0; i < widths.length; i++) {
                rects[i] = new Rectangle(curX, this.y, widths[i], this.height);
                curX += widths[i];
            }
            return rects;
        }

        private proportionalSplitVert(...proportionalHeights: number[]): Rectangle[]{
            var totalPropHeight = 0;
            var i: number;

            for (i = 0; i < proportionalHeights.length; i++) {
                totalPropHeight += proportionalHeights[i];
            }

            var totalHeight = 0;
            var heights: number[] = [];
            for (i = 0; i < proportionalHeights.length; i++) {
                heights[i] = (proportionalHeights[i] / totalPropHeight) * this.height;
                totalHeight += heights[i];
            }

            var extraHeight = this.height - totalHeight;
            /* Add back round-off error equally to all rectangles */
            i = 0;
            while (extraHeight > 0) {
                heights[i]++;
                extraHeight--;
                if ((++i) == heights.length) {
                    i = 0;
                }
            }
            var rects: Rectangle[] = [];
            var curY = this.y;
            for (i = 0; i < heights.length; i++) {
                rects[i] = new Rectangle(this.x, curY, this.width, heights[i]);
                curY += heights[i];
            }
            return rects;
        }

        public subDivideHoriz(n: number) {
            var rects: Rectangle[] = [];

            var tileWidth = this.width / n;
            var rem = this.width % n;
            var tileX = this.x;
            for (var i = 0; i < n; i++) {
                rects[i] = new Rectangle(tileX, this.y, tileWidth, this.height);
                if (rem > 0) {
                    rects[i].width++;
                    rem--;
                }
                tileX += rects[i].width;
            }
            return rects;
        }

        public subDivideVert(n: number) {
            var rects: Rectangle[] = [];
            var tileHeight = this.height / n;
            var rem = this.height % n;
            var tileY = this.y;
            for (var i = 0; i < n; i++) {
                rects[i] = new Rectangle(this.x, tileY, this.width, tileHeight);
                if (rem > 0) {
                    rects[i].height++;
                    rem--;
                }
                tileY += rects[i].height;
            }
            return rects;
        }
    }

    export class Square extends Rectangle {
        len: number;

        constructor(x: number, y: number, len: number) {
            super(x, y, len, len);
            this.len = len;
        }
    }
}