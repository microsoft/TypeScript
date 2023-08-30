//// [tests/cases/compiler/jsxAttributeWithoutExpressionReact.tsx] ////

//// [jsxAttributeWithoutExpressionReact.tsx]
declare var React: any;
<View>
    <ListView refreshControl={
        <RefreshControl onRefresh={} refreshing={} />
    } dataSource={this.state.ds} renderRow={}>
    </ListView>
</View>


//// [jsxAttributeWithoutExpressionReact.js]
React.createElement(View, null,
    React.createElement(ListView, { refreshControl: React.createElement(RefreshControl, { onRefresh: true, refreshing: true }), dataSource: this.state.ds, renderRow: true }));
