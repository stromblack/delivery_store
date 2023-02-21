import { IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent,IonIcon, IonItemSliding,IonItemOptions, IonItemOption , IonText, IonRadioGroup, IonRadio, IonButton } from "@ionic/react";
import { useState, useEffect, useRef } from "react";
import { AddressStore, removeFromAddress, selectAddress } from '../data/AddressStore';
import { location, trash, pencilOutline } from "ionicons/icons";
import styles from "./address.module.css";
import { useHistory } from 'react-router-dom';
const Address = (props) => {
    const address = AddressStore.useState(s => s.address_list);
    const [ addressList, setAddress ] = useState([]);
    const radioRef = useRef();
    const history = useHistory();
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
    const handleRemove = (index) => {
        removeFromAddress(index);
    }
    const handleEdit = (index) => {
        history.push("/order/address/add?address=" + index);
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
                                return <IonItemSliding key={index}>
                                    <IonItem onClick={props.showonly === false ? () => handleSelectAddress(index) : undefined}
                                        className={styles.addressItem} button={props.showonly} detail={props.showonly} routerLink="/order/address">
                                        { props.showonly === false &&
                                            <IonRadio slot="start" value={index.toString()}></IonRadio>
                                        }
                                        <div className="ion-text-start">
                                            <h2>{address.name_address} | {address.phone_address}</h2>
                                            {address.detail_address}
                                        </div>
                                    </IonItem>
                                    <IonItemOptions>
                                        <IonItemOption onClick={() => handleEdit(index)}>
                                            <IonIcon slot="icon-only" icon={pencilOutline}></IonIcon>
                                        </IonItemOption>
                                        <IonItemOption color="danger" onClick={() => handleRemove(index)}>
                                            <IonIcon slot="icon-only" icon={trash}></IonIcon>
                                        </IonItemOption>
                                    </IonItemOptions>
                                </IonItemSliding>
                            })
                        }
                        </IonRadioGroup>
                </IonList>
            </IonCardContent>
        </IonCard>
    )
}

export default Address;