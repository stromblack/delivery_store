import { GoogleMap } from '@capacitor/google-maps';
import { useEffect, useRef, useState } from 'react';
import styles from './AddressMap.module.css'
import { Geolocation } from '@capacitor/geolocation';
import { IonButton, IonIcon } from '@ionic/react';
import { locateOutline } from 'ionicons/icons';

const AddressMap = (props) => {
  const mapRef = useRef();
  const [newMap, setMap] = useState(null);
  const [markerId, setMaker] = useState(null);
  useEffect(() => {
    const printCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
    
      // console.log('Current position:', coordinates);
      return new Promise(resolve => resolve(coordinates.coords));
    };
    
    printCurrentPosition().then(coords => createMap(coords));
  },[]);
  
  const createMap = async (coords) => {
    if (!mapRef.current) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const Map = await GoogleMap.create({
      id: 'my-address-map',
      element: mapRef.current,
      apiKey: 'AIzaSyD1vPsskUEtx0xFLNcm7jbtzeHYU4gCVTc',
      config: {
        center: {
          lat: coords.latitude,
          lng: coords.longitude,
        },
        zoom: 16,
        disableDefaultUI: true
      }
    });
    Map.setOnMarkerDragEndListener((event) => {
      moveMarker(event);
    })
    const Marker = await Map.addMarker({
      coordinate: {
            lat: coords.latitude,
            lng: coords.longitude
      },
      title: 'current_location',
      draggable: true
    });  
    setMap(Map);
    setMaker(Marker);
    updateCoord(coords);
  }
  const moveMarker = (event) => {
    // console.log('--> move marker', event);
    updateCoord(event);
  }
  const addMarker = async (coords) => {
      const marker = await newMap.addMarker({
        coordinate: {
              lat: coords.latitude,
              lng: coords.longitude
        },
        title: 'current_location',
        draggable: true
      });
      setMaker(marker);
      updateCoord(coords);
      await newMap.setCamera({
        coordinate: {
            lat: coords.latitude,
            lng: coords.longitude
        }
      });
  }
  const updateCoord = (coord) => {
    props.handleCallback('MAP', `${coord.latitude},${coord.longitude}`)
  }
  const getLocalLocation = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    // console.log(coordinates.coords, markerId, newMap);
    await newMap.removeMarker(markerId);
    addMarker(coordinates.coords);
  }
  return (
    <div className={styles.AddressWrapper}>
        <capacitor-google-map ref={mapRef} style={{
        display: 'inline-block',
        width: "100%",
        height: '30rem'
      }}></capacitor-google-map>
      <IonButton className={styles.ButtonOverlay} onClick={() => getLocalLocation()}>
          <IonIcon icon={locateOutline}></IonIcon>
      </IonButton>
    </div>
    
  )
}

export default AddressMap;