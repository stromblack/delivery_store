
import axios from 'axios';
const GOOGLE_API_KEY = 'AIzaSyD1vPsskUEtx0xFLNcm7jbtzeHYU4gCVTc';
const callMatrixApi = async (origins, destinations) => {
    await axios.request('https://maps.googleapis.com/maps/api/distancematrix/json', {
        params: {
            'key': GOOGLE_API_KEY,
            'origins': origins,
            'destinations': destinations
        },
        
    }).then(resp => {
        return JSON.stringify(resp);
    }).catch(err => {
        console.error(err);
        return '';
    })
}
const getDistance = (destination) => {
    let origins = [
        '13.675145759038335, 100.49958590986687|13.743855288103255, 100.54662112747756|13.78487128085951, 100.4312646818657'
    ];
    return "";
}
export {
    GOOGLE_API_KEY
}