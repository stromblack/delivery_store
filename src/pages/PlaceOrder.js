
import { IonButton, IonButtons, IonHeader, IonIcon, IonPage, IonToolbar, IonContent, IonFooter, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg } from '@ionic/react'
import { DistanceMatrixService, useJsApiLoader } from '@react-google-maps/api'
import { chevronBackOutline } from 'ionicons/icons'
import { useState } from 'react'
import { AddressStore } from '../data/AddressStore'
import { CartStore } from '../data/CartStore'
import { GOOGLE_API_KEY } from '../data/Location'
import { ProductStore } from '../data/ProductStore'
import styles from './PlaceOrder.module.css'

const PlaceOrder = () => {

    const [deliveryDate, setDeliveryDate] = useState(new Date().toLocaleDateString());
    const [orderID, setOrderID] = useState('000001');
    const shopCart = CartStore.useState(s => s.product_ids);
    const products = ProductStore.useState(s => s.products);
    const address = AddressStore.useState(s => s.address_list);
    const [LocationOrigin, setOrigin] = useState('13.759371554829372, 100.4814038593201');
    const [LocationDestination, setDestination] = useState('13.685567312333031, 100.56731376527524');
    useState(() => {
        const delivery_place = address.filter(x => x.current === true).shift();
        // console.log(shopCart, delivery_place);
    }, []);
    const JsonText = (data) => {
        return JSON.stringify(data);
    }
    const distanceMatrix = () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { isLoaded, loadError } = useJsApiLoader({
            googleMapsApiKey: GOOGLE_API_KEY
        })
        const requestDistance = () => {
            return <DistanceMatrixService 
                options={{
                    destinations: [LocationDestination],
                    origins: [LocationOrigin],
                    travelMode: "DRIVING",
                }}
                callback={(res) => console.log(res)} />
        }
        return isLoaded ? requestDistance() : <div>cannot be load right now</div>
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
                            {distanceMatrix()}
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