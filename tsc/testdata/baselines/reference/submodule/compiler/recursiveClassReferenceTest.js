//// [tests/cases/compiler/recursiveClassReferenceTest.ts] ////

//// [recursiveClassReferenceTest.ts]
// Scenario 1: Test reqursive function call with "this" parameter
// Scenario 2: Test recursive function call with cast and "this" parameter



declare module Sample.Thing {

	export interface IWidget {
		getDomNode(): any;
		destroy();
		gar(runner:(widget:Sample.Thing.IWidget)=>any):any;
	}

	export interface ICodeThing {
  
  		getDomNode(): Element;
		
		addWidget(widgetId:string, widget:IWidget);

		
		focus(); 
		
		//addWidget(widget: Sample.Thing.Widgets.IWidget);
	}

	export interface IAction {
		run(Thing:ICodeThing):boolean;
		getId():string;
	}	
}

module Sample.Actions.Thing.Find {
	export class StartFindAction implements Sample.Thing.IAction {
		
		public getId() { return "yo"; }
		
		public run(Thing:Sample.Thing.ICodeThing):boolean {

			return true;
		}
	}
}

module Sample.Thing.Widgets {
	export class FindWidget implements Sample.Thing.IWidget {

		public gar(runner:(widget:Sample.Thing.IWidget)=>any) { if (true) {return runner(this);}}
			
		private domNode:any = null;
		constructor(private codeThing: Sample.Thing.ICodeThing) {
		    // scenario 1
		    codeThing.addWidget("addWidget", this);
		}
		
		public getDomNode() {
			return domNode;
		}
		
		public destroy() {

		}

	}
}

interface IMode { getInitialState(): IState;} 
class AbstractMode implements IMode { public getInitialState(): IState { return null;} }

interface IState {}

interface Window {
    opener: Window;
}
declare var self: Window;

module Sample.Thing.Languages.PlainText {
	
	export class State implements IState {		
        constructor(private mode: IMode) { }
		public clone():IState {
			return this;
		}

		public equals(other:IState):boolean {
			return this === other;
		}
		
		public getMode(): IMode { return mode; }
	}
	
	export class Mode extends AbstractMode {

		// scenario 2
		public getInitialState(): IState {
			return new State(self);
		}


	}
}



//// [recursiveClassReferenceTest.js]
var Sample;
(function (Sample) {
    let Actions;
    (function (Actions) {
        let Thing;
        (function (Thing_1) {
            let Find;
            (function (Find) {
                class StartFindAction {
                    getId() { return "yo"; }
                    run(Thing) {
                        return true;
                    }
                }
                Find.StartFindAction = StartFindAction;
            })(Find = Thing_1.Find || (Thing_1.Find = {}));
        })(Thing = Actions.Thing || (Actions.Thing = {}));
    })(Actions = Sample.Actions || (Sample.Actions = {}));
})(Sample || (Sample = {}));
(function (Sample) {
    let Thing;
    (function (Thing) {
        let Widgets;
        (function (Widgets) {
            class FindWidget {
                codeThing;
                gar(runner) { if (true) {
                    return runner(this);
                } }
                domNode = null;
                constructor(codeThing) {
                    this.codeThing = codeThing;
                    // scenario 1
                    codeThing.addWidget("addWidget", this);
                }
                getDomNode() {
                    return domNode;
                }
                destroy() {
                }
            }
            Widgets.FindWidget = FindWidget;
        })(Widgets = Thing.Widgets || (Thing.Widgets = {}));
    })(Thing = Sample.Thing || (Sample.Thing = {}));
})(Sample || (Sample = {}));
class AbstractMode {
    getInitialState() { return null; }
}
(function (Sample) {
    let Thing;
    (function (Thing) {
        let Languages;
        (function (Languages) {
            let PlainText;
            (function (PlainText) {
                class State {
                    mode;
                    constructor(mode) {
                        this.mode = mode;
                    }
                    clone() {
                        return this;
                    }
                    equals(other) {
                        return this === other;
                    }
                    getMode() { return mode; }
                }
                PlainText.State = State;
                class Mode extends AbstractMode {
                    // scenario 2
                    getInitialState() {
                        return new State(self);
                    }
                }
                PlainText.Mode = Mode;
            })(PlainText = Languages.PlainText || (Languages.PlainText = {}));
        })(Languages = Thing.Languages || (Thing.Languages = {}));
    })(Thing = Sample.Thing || (Sample.Thing = {}));
})(Sample || (Sample = {}));
//# sourceMappingURL=recursiveClassReferenceTest.js.map