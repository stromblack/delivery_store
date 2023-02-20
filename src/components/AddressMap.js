import { GoogleMap } from '@capacitor/google-maps';
import { useEffect, useRef } from 'react';
import styles from './AddressMap.module.css'
import { Geolocation } from '@capacitor/geolocation';

const AddressMap = () => {
  const mapRef = useRef();

 
  useEffect(() => {
    const printCurrentPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition();
      
        console.log('Current position:', coordinates);
        return new Promise(resolve => resolve(coordinates.coords));
    };
    const createMap = async (coords) => {
        if (!mapRef.current) return;
        console.log('createMap', coords)
        await GoogleMap.create({
          id: 'my-address-map',
          element: mapRef.current,
          apiKey: process.env.REACT_APP_YOUR_API_KEY_HERE,
          config: {
            center: {
              lat: coords.latitude,
              lng: coords.longitude,
            },
            zoom: 12
          }
        })
      }
    printCurrentPosition().then(coords => createMap(coords));
  },[])
  return (
    <div className={styles.AddressWrapper}>
      <capacitor-google-map ref={mapRef} style={{
        display: 'inline-block',
        width: "100%",
        height: '30rem'
      }}></capacitor-google-map>
    </div>
  )
}

export default AddressMap;