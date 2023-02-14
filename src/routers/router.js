import { Redirect, Route } from 'react-router-dom';

import Home from '../pages/Home';
import CategoryProducts from '../pages/CategoryProducts';
import Product from '../pages/Product';
import FavouriteProducts from '../pages/FavouriteProducts';
import CartProducts from '../pages/CartProducts';
import Profile from '../pages/Profile';
import Checkout from '../pages/Checkout';

const RouterApp = () => {
    return (
        <>
            <Route path="/" exact={true} render={() => <Redirect to="/home" />} />
            <Route path="/home" exact={true} render={() => <Home />} />
            <Route path="/favourites" exact render={() => <FavouriteProducts />} />
            <Route path="/cart" exact render={() => <CartProducts />} />
            <Route path="/cart/checkout" exact render={() => <Checkout />} />
            <Route path="/category/:slug" exact render={() => <CategoryProducts />} />
            <Route path="/category/:slug/:id" exact render={() => <Product />} />
            <Route path="/profile" exact render={() => <Profile />} />
        </>
    )
}

export default RouterApp;