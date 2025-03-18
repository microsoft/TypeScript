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
<View>
    <ListView refreshControl={<RefreshControl onRefresh= refreshing=/>} dataSource={this.state.ds} renderRow=>
    </ListView>
</View>;
