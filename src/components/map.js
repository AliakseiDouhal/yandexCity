import React, { Component } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const mapState = { center: [55.76, 37.64], zoom: 2 };

class MapView extends Component {
    render () {
        return(
            <YMaps >
                <Map width={'100%'} height={350} className="my-map" state={mapState}>
                    {this.props.cities.map((city, i) =>
                        <Placemark  key={i} geometry={city}/>
                    )}
                </Map>
            </YMaps>
        )
    }
}

export default MapView;
