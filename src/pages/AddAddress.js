import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonButton, IonIcon, IonList, IonItem, IonLabel, IonInput, IonTextarea, IonText } from '@ionic/react'
import { chevronBackOutline } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { addToAddress, AddressStore, editAddress } from '../data/AddressStore'
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
    const [mode, setMode] = useState('add');
    const [addressID, setAddressID] = useState(null);
    const history = useHistory();
    const address = AddressStore.useState(s => s.address_list);
    useEffect(() => {
        // console.log(history.location.search);
        if (history.location.search !== '') {
            let val = history.location.search.substring(history.location.search.indexOf('=') + 1)
            // console.log('address-edit', val);
            setAddressID(val);
            setMode('edit');
            initValue(val);
        }
    }, []);
    const initValue = (val) => {
        address.forEach((row, index) => {
            // console.log('found edit',index, val);
            if (index == val) {
                setNameAddress(row.name_address);
                setDetailAddress(row.detail_address);
                setPhoneAddress(row.phone_address);
                setCoordAddress(row.coord_address);
            }
        })
    }
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
        if (mode === 'add') {
            let obj = {
                'name_address': nameAddress,
                'detail_address': detailAddress,
                'phone_address': phoneAddress,
                'coord_address': coordAddress
            }
            addToAddress(obj);
        } else {
            let obj = {
                'name_address': nameAddress,
                'detail_address': detailAddress,
                'phone_address': phoneAddress,
                'coord_address': coordAddress
            }
            editAddress(obj, addressID);
        }
        
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
                <AddressMap handleCallback={handleUpdate} coord={coordAddress} mode={mode} />
                <IonText style={{'padding': '12px'}}>{coordAddress}</IonText>
                <IonList>
                    <IonItem counter={true} counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}>

                        <IonLabel position="stacked">Name</IonLabel>
                        <IonInput maxlength={60} placeholder="Enter name" value={nameAddress}  onIonChange={(e) => handleUpdate(tags.NAME,e.target.value)}></IonInput>
                    </IonItem>

                    <IonItem counter={true} counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}>
                        <IonLabel position="stacked">Address</IonLabel>
                        <IonTextarea maxlength={255} value={detailAddress} placeholder="Enter your address" onIonChange={(e) => handleUpdate(tags.DETAIL, e.target.value)}></IonTextarea>
                    </IonItem>
                    <IonItem counter={true} counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}>
                        <IonLabel position="stacked">Telephone</IonLabel>
                        <IonInput maxlength={10} type="tel" value={phoneAddress} placeholder="0981234567" onIonChange={(e) => handleUpdate(tags.PHONE, e.target.value)}></IonInput>
                    </IonItem>
                </IonList>
                <IonButton expand="block" onClick={() => hanldeAddAddress()}>
                    { mode === 'add' && <IonLabel>ADD</IonLabel> }
                    { mode === 'edit' && <IonLabel>EDIT</IonLabel> }
                </IonButton>
            </IonContent>
        </IonPage>
    )
}

export default AddAddress;