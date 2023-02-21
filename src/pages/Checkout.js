import { IonPage, IonHeader, IonToolbar, IonContent, IonFooter, IonButtons,IonButton, IonIcon, IonTitle, IonCardSubtitle, IonGrid, IonRow, IonCol, IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/react";
import { chevronBackOutline, checkmarkSharp, location } from "ionicons/icons";
import { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import { CartStore } from "../data/CartStore";
import { ProductStore } from "../data/ProductStore";

import styles from "./Checkout.module.css";
import Address from "../components/Address";

const Checkout = () => {

    const [total, setTotal] = useState(0);
    const [ cartProducts, setCartProducts ] = useState([]);
    const shopCart = CartStore.useState(s => s.product_ids);
    const products = ProductStore.useState(s => s.products);
    useEffect(() => {

        const getCartProducts = () => {

            setCartProducts([]);
            setTotal(0);

            shopCart.forEach(product => {

                var favouriteParts = product.split("/");
                var categorySlug = favouriteParts[0];
                var productID = favouriteParts[1];
                
                const tempCategory = products.filter(p => p.slug === categorySlug)[0];
                const tempProduct = tempCategory.products.filter(p => parseInt(p.id) === parseInt(productID))[0];

                const tempCartProduct = {

                    category: tempCategory,
                    product: tempProduct
                };

                setTotal(prevTotal => prevTotal + parseInt(tempProduct.price.replace("£", "")));
                setCartProducts(prevSearchResults => [ ...prevSearchResults, tempCartProduct ]);
            });
        }

        getCartProducts();
    }, [ shopCart ]);
    return (
        <IonPage id="checkout-page">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton color="dark" routerLink="/cart" routerDirection="back">
                            <IonIcon color="dark" icon={chevronBackOutline} />&nbsp;Carts
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Checkout</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid>
                    <IonRow className="ion-text-center ion-margin-top">
                        <IonCol size="12">
                            <Address showonly={true} />
                        </IonCol>
                        <IonCol size="12">
                            <IonList>
                                {
                                    cartProducts && cartProducts.map((product, index) => {
                                        return <CartItem key={index} product={product} index={index} />
                                    })
                                }
                            </IonList>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
            <IonFooter className={ styles.checkoutFooter }>
                    <div className={ styles.checkoutOrder }>
                        <IonCardSubtitle>
                            { total.toLocaleString(0, {maximumFractionDigits:2}) }
                        </IonCardSubtitle>
                        <IonButton color="tertiary" routerLink="/order/placeorder" disabled={cartProducts.length > 0 ? false : true}>
                            <IonIcon icon={checkmarkSharp} />&nbsp;Place Order
                        </IonButton>
                    </div>
            </IonFooter>
        </IonPage>
    )
}

export default Checkout