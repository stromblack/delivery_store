
import { IonButton, IonButtons, IonHeader, IonIcon, IonPage, IonToolbar, IonContent, IonFooter, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg } from '@ionic/react'
import { chevronBackOutline } from 'ionicons/icons'
import { useState } from 'react'
import { AddressStore } from '../data/AddressStore'
import { CartStore } from '../data/CartStore'
import { ProductStore } from '../data/ProductStore'
import styles from './PlaceOrder.module.css'

const PlaceOrder = () => {

    const [deliveryDate, setDeliveryDate] = useState(new Date().toLocaleDateString());
    const [orderID, setOrderID] = useState('000001');
    const shopCart = CartStore.useState(s => s.product_ids);
    const products = ProductStore.useState(s => s.products);
    const address = AddressStore.useState(s => s.address_list);
    useState(() => {
        console.log(shopCart);
        console.log(address.filter(x => x.current === true));
    }, [address]);
    const JsonText = (data) => {
        return JSON.stringify(data);
    }
    return (
        <IonPage id="placeorder-page">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton color="dark" routerLink="/order/checkout" routerDirection='back'>
                            <IonIcon color="dark" icon={chevronBackOutline} />&nbsp;Checkout
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={true}>
                <div
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    }}>
                    <IonCard>
                        <IonCardHeader>
                        <IonImg alt="checkmark place order" src="/images/checkmark.png" />
                            <IonCardTitle>
                                Your order was placed successfully!
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            Your order will be delivered by { deliveryDate } <br />
                            Order ID: { orderID } <br />
                            Thank you for choosing Siam Orange!
                            <JsonText data={address} />
                            <JsonText data={shopCart} />
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
            <IonFooter className={ styles.placeorderFooter }>
                <div className={ styles.trackOrder }>
                    <IonButton color="primary" expand="block">
                        TRACK ORDER
                    </IonButton>
                </div>
            </IonFooter>
        </IonPage>
    )
}

export default PlaceOrder