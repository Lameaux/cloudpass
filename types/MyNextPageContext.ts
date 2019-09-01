import { NextPageContext } from 'next';
import { Store } from 'redux';

export default interface MyNextPageContext extends NextPageContext {
    isServer: boolean,
    store: Store
}