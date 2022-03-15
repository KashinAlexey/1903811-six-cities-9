import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/useMap';
//import {City, Offer, Offers} from '../../types/offer';
import {Offer, Offers} from '../../types/offer';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import 'leaflet/dist/leaflet.css';
import {ICON_SIZE, ICON_ANCHER} from '../../const';
import { store } from '../../store';

// type MapProps = {
//   selectedCity: City;
//   offers: Offers;
//   selectedOffer?: Offer | undefined;
//   className: string;
// };

type MapProps = {
  offers: Offers;
  selectedOffer?: Offer | undefined;
  className: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [ICON_SIZE, ICON_SIZE],
  iconAnchor: [ICON_ANCHER, ICON_SIZE],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [ICON_SIZE, ICON_SIZE],
  iconAnchor: [ICON_ANCHER, ICON_SIZE],
});

function Map(props: MapProps): JSX.Element {
  //const {selectedCity, offers, selectedOffer, className} = props;
  const {offers, selectedOffer, className} = props;

  const mapRef = useRef(null);
  //const map = useMap(mapRef, selectedCity);
  const map = useMap(mapRef, store.getState().city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            selectedOffer !== undefined && offer.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
      });
    }
  }, [map, offers, selectedOffer]);

  return <section className={className} ref={mapRef}></section>;
}

export default Map;
