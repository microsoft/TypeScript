//// [elaborationForPossiblyCallableTypeStillReferencesArgumentAtTopLevel.ts]
declare var ohno: new () => number;
declare function ff(t: number): void;
ff(ohno)

//// [elaborationForPossiblyCallableTypeStillReferencesArgumentAtTopLevel.js]
ff(ohno);
