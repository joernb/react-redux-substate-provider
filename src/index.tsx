import * as React from "react";
import { Provider, ReactReduxContext } from 'react-redux';
import { Store } from "redux";

type SubStateSelector = <State, SubState>(state: State) => SubState;

const subStore = (store: Store, subStateSelector: SubStateSelector): Store =>
  ({
    ...store,
    getState: () => subStateSelector(store.getState())
  });

interface Props {
  selector: SubStateSelector;
  children?: React.ReactNode;
}

/**
 * Makes nested, connected components operate on a sub state of the store's state.
 * The sub state is defined by the `selector` prop.
 * Wrapped connected components will receive the sub state as input to mapStateToProps.
 */
export const SubStateProvider = (props: Props) =>
  <ReactReduxContext.Consumer>
    {
      (context: { store: Store }) =>
        <Provider store={subStore(context.store, props.selector)}>
          {props.children}
        </Provider>
    }
  </ReactReduxContext.Consumer>;
