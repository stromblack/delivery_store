import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import Address from "../components/Address";
import styles from './SelectAddress.module.css';
const SelectAddress = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton color="dark" routerLink="/order/checkout" routerDirection="back">
                            <IonIcon color="dark" icon={chevronBackOutline} />Checkout &nbsp;
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Address showonly={false} />
                <IonButton expand="block" routerLink="/order/address/add">Add new address</IonButton>
                {/* <div
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    }}>
                    under construction, please wait patiently
                </div> */}
            </IonContent>
        </IonPage>
    )
}

export default SelectAddress;