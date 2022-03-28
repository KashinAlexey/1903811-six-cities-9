import { Cities } from '../../types/offer';
import { City } from '../../types/offer';
import { MouseEvent } from 'react';
import { memo } from 'react';
import { Link } from 'react-router-dom';

type LocationsListProps = {
  cities: Cities;
  onListItemHover: (listItemName: string) => void;
  selectedCity: City | undefined;
};

function LocationsList(props: LocationsListProps): JSX.Element {
  const {cities, onListItemHover, selectedCity} = props;

  const listItemHoverHandler = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    onListItemHover(event.currentTarget.innerText);
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city, index) => {
          const keyValue = `${index}-${city.name}`;
          return (
            <li
              className="locations__item"
              key={keyValue}
              onClick={listItemHoverHandler}
            >
              <Link to="/" className={`locations__item-link tabs__item ${city.name === selectedCity?.name ? 'tabs__item--active' : ''}`}>
                <span>{city.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default memo(LocationsList, (prevProps, nextProps) => prevProps.selectedCity === nextProps.selectedCity);
