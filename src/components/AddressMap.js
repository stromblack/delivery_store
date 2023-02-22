import { GoogleMap } from '@capacitor/google-maps';
import React from 'react';
import styles from './AddressMap.module.css'
import { Geolocation } from '@capacitor/geolocation';
import { IonButton, IonIcon } from '@ionic/react';
import { locateOutline } from 'ionicons/icons';
import { GOOGLE_API_KEY } from '../data/Location';

class AddressMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMap: null,
      markerId: '',
    }
    this.mapRef = React.createRef();
    this.createMap = this.createMap.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.updateCoord = this.updateCoord.bind(this);
    this.getLocalLocation = this.getLocalLocation.bind(this);
  }
  componentDidMount() {
    const printCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition(); 
      // console.log('Current position:', coordinates);
      return new Promise(resolve => resolve(coordinates.coords));
    };
    printCurrentPosition().then(coord => this.createMap(coord));
  }
  componentWillUnmount () {

  }
  createMap = async (coords) => {
    if (!this.mapRef.current) return;
    // console.log(this.props);
    if (this.props.mode === 'edit' && this.props.coord.length > 0) {
      coords = this.ConvertToLatlng(this.props.coord);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const Map = await GoogleMap.create({
      id: 'my-address-map',
      element: this.mapRef.current,
      apiKey: GOOGLE_API_KEY,
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
      this.moveMarker(event);
    })
    const Marker = await Map.addMarker({
      coordinate: {
            lat: coords.latitude,
            lng: coords.longitude
      },
      title: 'current_location',
      draggable: true
    });
    this.setState({
      newMap: Map,
      markerId: Marker
    })  
    if (this.props.mode === 'add')
    {
      this.updateCoord(coords);
    }
  }
  ConvertToLatlng = (strcoord) => {
    let strArr = strcoord.split(',');
    let lat = +strArr[0];
    let lng = +strArr[1];
    return {
      latitude: lat,
      longitude: lng
    }
  }  
  moveMarker = (event) => {
    // console.log('--> move marker', event);
    this.updateCoord(event);
  }
  addMarker = async (coords) => {
      const marker = await this.state.newMap.addMarker({
        coordinate: {
              lat: coords.latitude,
              lng: coords.longitude
        },
        title: 'current_location',
        draggable: true
      });
      this.setState({
        markerId: marker,
      });
      this.updateCoord(coords);
      await this.state.newMap.setCamera({
        coordinate: {
            lat: coords.latitude,
            lng: coords.longitude
        }
      });
  }
  updateCoord = (coord) => {
    // console.log('updateCoord');
    this.props.handleCallback('MAP', `${coord.latitude},${coord.longitude}`)
  }
  getLocalLocation = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    // console.log(coordinates.coords, markerId, newMap);
    await this.state.newMap.removeMarker(this.state.markerId);
    this.addMarker(coordinates.coords);
  }
  render () {
    return (
      <div className={styles.AddressWrapper}>
        <capacitor-google-map ref={this.mapRef} style={{
        display: 'inline-block',
        width: "100%",
        height: '30rem'
      }}></capacitor-google-map>
      <IonButton className={styles.ButtonOverlay} onClick={() => this.getLocalLocation()}>
          <IonIcon icon={locateOutline}></IonIcon>
      </IonButton>
    </div>
    )
  }
} 

export default AddressMap;

// const aAddressMap = (props) => {
//   const mapRef = useRef();
//   const [newMap, setMap] = useState(null);
//   const [markerId, setMaker] = useState(null);
//   useEffect(() => {
//     const printCurrentPosition = async () => {
//       const coordinates = await Geolocation.getCurrentPosition();
    
//       // console.log('Current position:', coordinates);
//       return new Promise(resolve => resolve(coordinates.coords));
//     };
//     printCurrentPosition().then(coord => createMap(coord));
//   }, []);
//   const ConvertToLatlng = (strcoord) => {
//     let strArr = strcoord.split(',');
//     let lat = +strArr[0];
//     let lng = +strArr[1];
//     return {
//       latitude: lat,
//       longitude: lng
//     }
//   }  
//   const createMap = async (coords) => {
//     if (!mapRef.current) return;
//     console.log(props);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     const Map = await GoogleMap.create({
//       id: 'my-address-map',
//       element: mapRef.current,
//       apiKey: 'AIzaSyD1vPsskUEtx0xFLNcm7jbtzeHYU4gCVTc',
//       config: {
//         center: {
//           lat: coords.latitude,
//           lng: coords.longitude,
//         },
//         zoom: 16,
//         disableDefaultUI: true
//       }
//     });
//     Map.setOnMarkerDragEndListener((event) => {
//       moveMarker(event);
//     })
//     const Marker = await Map.addMarker({
//       coordinate: {
//             lat: coords.latitude,
//             lng: coords.longitude
//       },
//       title: 'current_location',
//       draggable: true
//     });  
//     setMap(Map);
//     setMaker(Marker);
//     // updateCoord(coords);
//   }
//   const moveMarker = (event) => {
//     // console.log('--> move marker', event);
//     updateCoord(event);
//   }
//   const addMarker = async (coords) => {
//       const marker = await newMap.addMarker({
//         coordinate: {
//               lat: coords.latitude,
//               lng: coords.longitude
//         },
//         title: 'current_location',
//         draggable: true
//       });
//       setMaker(marker);
//       updateCoord(coords);
//       await newMap.setCamera({
//         coordinate: {
//             lat: coords.latitude,
//             lng: coords.longitude
//         }
//       });
//   }
//   const updateCoord = (coord) => {
//     console.log('updateCoord');
//     props.handleCallback('MAP', `${coord.latitude},${coord.longitude}`)
//   }
//   const getLocalLocation = async () => {
//     const coordinates = await Geolocation.getCurrentPosition();
//     // console.log(coordinates.coords, markerId, newMap);
//     await newMap.removeMarker(markerId);
//     addMarker(coordinates.coords);
//   }
//   return (
    
    
//   )
// }