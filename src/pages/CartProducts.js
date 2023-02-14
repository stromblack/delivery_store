import { IonAvatar,IonGrid, IonBadge, IonButton, IonButtons, IonCardSubtitle, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonNote, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { cart, checkmarkSharp, chevronBackOutline, trashOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { CartStore, removeFromCart } from "../data/CartStore";
import { ProductStore } from "../data/ProductStore";

import styles from "./CartProducts.module.css";

const CartProducts = () => {

    const cartRef = useRef();
    const cartListRef = useRef(null);
    const products = ProductStore.useState(s => s.products);
    const shopCart = CartStore.useState(s => s.product_ids);
    const [ cartProducts, setCartProducts ] = useState([]);
    const [ amountLoaded, setAmountLoaded ] = useState(6);

    const [ total, setTotal ] = useState(0);

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

    const fetchMore = async (e) => {

		//	Increment the amount loaded by 6 for the next iteration
		setAmountLoaded(prevAmount => (prevAmount + 6));
		e.target.complete();
	}

    const removeProductFromCart = async (index) => {
        cartListRef.current.closeSlidingItems();
        removeFromCart(index);
    }

    return (

        <IonPage id="category-page" className={ styles.categoryPage }>
            <IonHeader>
				<IonToolbar>
                    <IonButtons slot="start">
                        <IonButton color="dark" routerLink="/" routerDirection="back">
                            <IonIcon color="dark" icon={ chevronBackOutline } />&nbsp;Categories
                        </IonButton>
                    </IonButtons>
					<IonTitle>Cart</IonTitle>

                    <IonButtons slot="end">
                        <IonBadge color="dark">
                            { shopCart.length }
                        </IonBadge>
						<IonButton color="dark" routerLink="/cart">
							<IonIcon ref={ cartRef } className="animate__animated" icon={ cart } />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			
			<IonContent fullscreen scrollY={true}>
                <IonGrid>
                    <IonRow className="ion-text-center ion-margin-top">
                        <IonCol size="12">
                            <IonNote>{ cartProducts && cartProducts.length } { (cartProducts.length > 1 || cartProducts.length === 0) ? " products" : " product" } found</IonNote>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                    <IonList ref={cartListRef}>
                        { cartProducts && cartProducts.map((product, index) => {
                            return (
                            <IonItemSliding key={ index } className={ styles.cartSlider }>
                                <IonItem lines="none" detail={ false } className={ styles.cartItem }>

                                    <IonAvatar>
                                        <IonImg src={ product.product.image } />
                                    </IonAvatar>
                                    <IonLabel className="ion-padding-start ion-text-wrap">
                                        <p>{ product.category.name }</p>
                                        <h4>{ product.product.name }</h4>
                                    </IonLabel>

                                    <div className={ styles.cartActions }>
                                        <IonBadge color="dark">{ product.product.price }</IonBadge>
                                    </div>
                                </IonItem>
                                <IonItemOptions side="end">
                                    <IonItemOption color="danger" style={{ paddingLeft: "1rem", paddingRight: "1rem" }} onClick={ () => removeProductFromCart(index) }>
                                        <IonIcon icon={ trashOutline } />
                                    </IonItemOption>
                                </IonItemOptions>
                            </IonItemSliding>
                            );
                        })}
                    </IonList>
            </IonContent>

            <IonFooter className={ styles.cartFooter }>
                <div className={ styles.cartCheckout }>
                    <IonCardSubtitle>{ total.toLocaleString(0, {maximumFractionDigits:2}) }</IonCardSubtitle>

                    <IonButton color="dark" routerLink="/order/checkout">
                        <IonIcon icon={ checkmarkSharp } />&nbsp;Checkout
                    </IonButton>
                </div>
            </IonFooter>
        </IonPage>
    );
}

export default CartProducts;