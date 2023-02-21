import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonButton, IonIcon, IonList, IonItem, IonLabel, IonInput, IonTextarea, IonText } from '@ionic/react'
import { chevronBackOutline } from 'ionicons/icons'
import { useState } from 'react'
import { addToAddress } from '../data/AddressStore'
import { useHistory } from 'react-router-dom';
import styles from './AddAddress.module.css'
import AddressMap from '../components/AddressMap';

const AddAddress = () => {
    const tags = {
        NAME: 'name_address',
        DETAIL: 'detail_address',
        PHONE: 'phone_address'
    };
    const [nameAddress, setNameAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [phoneAddress, setPhoneAddress] = useState('');
    const [coordAddress, setCoordAddress] = useState('');
    const history = useHistory();
    const handleUpdate = (target,value) => {
        // console.log(value);
        if (target === tags.NAME) {
            setNameAddress(value);
        } else if (target === tags.DETAIL) {
            setDetailAddress(value);
        } else if (target === tags.PHONE) {
            setPhoneAddress(value);
        } else {
            setCoordAddress(value);
        }
    }
    const hanldeAddAddress = () => {
        let obj = {
            'name_address': nameAddress,
            'detail_address': detailAddress,
            'phone_address': phoneAddress,
            'coord_address': coordAddress
        }
        addToAddress(obj);
        history.go(-1);
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton color="dark" routerLink="/order/address" routerDirection="back">
                            <IonIcon color="dark" icon={chevronBackOutline} />Address &nbsp;
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <AddressMap handleCallback={handleUpdate} />
                <IonText style={{'padding': '12px'}}>{coordAddress}</IonText>
                <IonList>
                    <IonItem counter={true} counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}>
                        {nameAddress} {detailAddress} {phoneAddress}
                        <IonLabel position="stacked">Name</IonLabel>
                        <IonInput maxlength={60} placeholder="Enter name" onIonChange={(e) => handleUpdate(tags.NAME,e.target.value)}></IonInput>
                    </IonItem>

                    <IonItem counter={true} counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}>
                        <IonLabel position="stacked">Address</IonLabel>
                        <IonTextarea maxlength={255} placeholder="Enter your address" onIonChange={(e) => handleUpdate(tags.DETAIL, e.target.value)}></IonTextarea>
                    </IonItem>
                    <IonItem counter={true} counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}>
                        <IonLabel position="stacked">Telephone</IonLabel>
                        <IonInput maxlength={10} type="tel" placeholder="0981234567" onIonChange={(e) => handleUpdate(tags.PHONE, e.target.value)}></IonInput>
                    </IonItem>
                </IonList>
                <IonButton expand="block" onClick={() => hanldeAddAddress()}>Add</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default AddAddress;