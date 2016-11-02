interface State {
    name: string;
    length: number;
    foo?: number;
}

function setState<T>(state: T, updates: partial T) {} 

function update(s: partial State) { }

update({ name: "bob" });
update({ length: 10 });
update({ flarp: 5 });
update({ name: 100 });
update({ foo: 34 });
update({ foo: 'oops' });

const state: State = <any>null;
setState(state, { name: "bob" });
setState(state, { length: 10 });
setState(state, { flarp: 5 });
setState(state, { name: 100 });
setState(state, { foo: 34 });
setState(state, { foo: 'oops' });
