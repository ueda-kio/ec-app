import React from 'react';
import { Route, Switch } from 'react-router';
import Auth from './Auth';
import { SignUp, SignIn, Reset, ProductEdit, ProductList } from './templates';

const Router = () => {
    return (
        <Switch>
            <Route exact path={'/signup'} component={SignUp} />
            <Route exact path={'/signin'} component={SignIn} />
            <Route exact path={'/signin/reset'} component={Reset} />

            <Auth>
                <Route exact path={'(/)?'} component={ProductList} />
                <Route path={'/product/edit(/:id)?'} component={ProductEdit} />
            </Auth>
        </Switch>
    );
};

export default Router;