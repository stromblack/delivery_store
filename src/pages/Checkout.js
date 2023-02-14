import { IonPage, IonHeader, IonToolbar, IonContent, IonFooter, IonButtons,IonButton, IonIcon, IonTitle, IonCardSubtitle } from "@ionic/react";
import { chevronBackOutline, checkmarkSharp } from "ionicons/icons";
import { useState } from "react";

import styles from "./Checkout.module.css";

const Checkout = () => {

    const [total, setTotal] = useState(0);

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
                <div
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    }}>
                    under construction, please wait patiently
                </div>
            </IonContent>
            <IonFooter className={ styles.checkoutFooter }>
                    <div className={ styles.checkoutOrder }>
                        <IonCardSubtitle>
                            { total.toLocaleString(0, {maximumFractionDigits:2}) }
                        </IonCardSubtitle>
                        <IonButton color="tertiary" routerLink="/order/placeorder">
                            <IonIcon icon={checkmarkSharp} />&nbsp;Place Order
                        </IonButton>
                    </div>
            </IonFooter>
        </IonPage>
    )
}

export default Checkout