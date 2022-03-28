import { useRef } from 'react';
import { useEffect } from 'react';
import { Icon } from 'leaflet';
import { Marker } from 'leaflet';
import useMap from '../../hooks/useMap';
import { City } from '../../types/offer';
import { Offers } from '../../types/offer';
import { URL_MARKER_DEFAULT } from '../../const';
import { URL_MARKER_CURRENT } from '../../const';
import 'leaflet/dist/leaflet.css';
import { ICON_SIZE } from '../../const';
import { ICON_ANCHER } from '../../const';

type MapProps = {
  offers: Offers;
  city: City,
  selectedOfferId?: number;
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
  const {offers, selectedOfferId, className, city} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            selectedOfferId !== undefined && offer.id === selectedOfferId
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
      });
    }
  }, [map, offers, selectedOfferId]);

  return <section className={className} ref={mapRef}></section>;
}

export default Map;
