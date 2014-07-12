/// <reference path="jquery.d.ts" />

module Parallax {
    export class ParallaxContainer {
        private content: HTMLElement;
        private perspective: number;
        private surface: ParallaxSurface[];

        /**
        *   Creates a Container for a Parallax
        *   
        *   @param {HTMLElement} scrollableContent The container that will be parallaxed
        *   @param {perspective} perspective The ratio of how much back content should be scroleld relative to forward content. For example, if this value is 0.5, and there are 2 surfaces, 
        *                                    the front-most surface would be scrolled normally, and the surface behind it would be scrolled half as much.
        */
        constructor(scrollableContent: HTMLElement,
            perspective: number) {
            this.perspective = perspective;
            this.surface = [];
            this.content = scrollableContent;

            $(scrollableContent).scroll((event: JQueryEventObject) => {
                this.onContainerScroll(event);
            });
        }

        private onContainerScroll(e: JQueryEventObject): void {
            var currentScrollPos = $(this.content).scrollTop();
            var currentParallax = 1;
            for (var i = 0; i < this.surface.length; i++) {
                var surface = this.surface[i];
                var offset = -(currentScrollPos * currentParallax);
                surface.currentY = offset;
                currentParallax *= this.perspective;
            }
        }

        addSurface(surface: ParallaxSurface): void {
            this.surface.push(surface);
        }
    }

    export class ParallaxSurface {
        private content: HTMLElement;

        constructor(surfaceContents: HTMLElement) {
            this.content = surfaceContents;
        }

        get currentY(): number {
            return -$(this.content).css('margin-top');
        }

        set currentY(value: number) {
            $(this.content).css({ marginTop: value });
        }
    }
}
