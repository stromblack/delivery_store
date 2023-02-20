import { IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent,IonIcon, IonLabel, IonText, IonRadioGroup, IonRadio, IonButton } from "@ionic/react";
import { useState, useEffect, useRef } from "react";
import { AddressStore, selectAddress } from '../data/AddressStore';
import { location } from "ionicons/icons";
import styles from "./address.module.css";
const Address = (props) => {
    const address = AddressStore.useState(s => s.address_list);
    const [ addressList, setAddress ] = useState([]);
    const radioRef = useRef();
    useEffect(() => {
        const getAddress = () => {
            setAddress([]);    
            let tmpAddress = [];
            let defaultSelected = -1;
            address.forEach((address, index) => {
                // check has props showonly get only current address
                if (props.showonly === true) {
                    if (address.current === true) {
                        defaultSelected = index;
                        tmpAddress.push(address);
                    }
                } else {
                    if (address.current === true) {
                        defaultSelected = index;
                    }
                    tmpAddress.push(address);
                }
            });
            // set into state
            setAddress(tmpAddress);
            // default select
            if (props.showonly === false && tmpAddress.length > 1) handleSelectAddress(defaultSelected); 
            else if (props.showonly === false && tmpAddress.length === 1) handleSelectAddress(0);
        };
        getAddress();
    }, [address, props.showonly]);
    const handleSelectAddress = (index) => {
        // console.log('--> select address', index)
        selectAddress(index);
        radioRef.current.value = index.toString();
    }
    return (
        <IonCard className={`ion-text-left ${styles.addressCard}`}>
            <IonCardHeader className={styles.addressCardTitle}>
                <IonCardTitle>
                    <IonText>ที่อยู่สำหรับการจัดส่ง&nbsp;<IonIcon icon={location} /></IonText>
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonList>
                    { 
                        addressList.length === 0 && props.showonly === true && 
                        <IonButton routerLink="/order/address">Select Address</IonButton>
                    }
                    <IonRadioGroup allowEmptySelection={true} ref={radioRef}>
                    {
                        addressList && addressList.map((address, index) => {
                            return <IonItem key={index} onClick={props.showonly === false ? () => handleSelectAddress(index) : undefined}
                                className={styles.addressItem} button={props.showonly} detail={props.showonly} routerLink="/order/address">
                                { props.showonly === false &&
                                    <IonRadio slot="start" value={index.toString()}></IonRadio>
                                }
                                <div className="ion-text-start">
                                    <h2>{address.name_address} | {address.phone_address}</h2>
                                    {address.detail_address}
                                </div>
                            </IonItem>
                        })
                    }
                    </IonRadioGroup>
                </IonList>
            </IonCardContent>
        </IonCard>
    )
}

export default Address;