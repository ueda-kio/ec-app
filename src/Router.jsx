import React from 'react';
import { Route, Switch } from 'react-router';
import Auth from './Auth';
import {
    SignUp,
    SignIn,
    Reset,
    ProductEdit,
    ProductList,
    ProductDetail
} from './templates';

const Router = () => {
    return (
        <Switch>
            <Route exact path={'/signup'} component={SignUp} />
            <Route exact path={'/signin'} component={SignIn} />
            <Route exact path={'/signin/reset'} component={Reset} />

            <Auth>
                {/* `:〇〇`は変数として扱われる */}
                <Route exact path={'(/)?'} component={ProductList} />
                <Route exact path={'/product/:id'} component={ProductDetail} />
                <Route path={'/product/edit(/:id)?'} component={ProductEdit} />
            </Auth>
        </Switch>
    );
};

export default Router;