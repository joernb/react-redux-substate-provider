# react-redux-substate-provider [![Build Status](https://travis-ci.org/joernb/react-redux-substate-provider.svg?branch=master)](https://travis-ci.org/joernb/react-redux-substate-provider)

A React Context Provider that makes connected components access a substate.

Connected components are created using a `mapStateToProps` function. This function has access to the global state, which makes it dependent on the structure of the global state and weakens isolation.

This library contains a React Context Provider, that makes nested components access just a substate instead of the global state.

## Usage

Install:
```sh
npm install react-redux-substate-provider
```

Wrap a component with the `SubStateProvider` and provide a selector function, which selects the substate:
```jsx
import { SubStateProvider } from "react-redux-substate-provider";

<SubStateProvider selector={state => state.mysubstate}>
  <ConnectedSubComponent />
</SubStateProvider>
```

Now you can expect the state passed into `mapStateToProps` to be the substate:
```js
export const ConnectedSubComponent = connect(
  mysubstate => mysubstate.foo,
  dispatch => ({})
)(SubComponent);
```

The Provider can be nested multiple times:
```jsx
<SubStateProvider selector={state => state.foo}>
  <SubStateProvider selector={foo => foo.bar}>
    <ConnectedSubComponent />
  </SubStateProvider>
</SubStateProvider>
```

## License

MIT
