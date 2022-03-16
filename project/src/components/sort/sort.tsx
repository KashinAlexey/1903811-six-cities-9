import {useState} from 'react';
import { SortType } from '../../sort';

type SortProps = {
  onSortChange: (type: string) => void;
}

function Sort(props: SortProps): JSX.Element {
  const {onSortChange} = props;
  const [isOpen, setIsOpen] = useState(true);

  const sortOpenHandle = () => {
    setIsOpen(!isOpen);
  };

  const sortChangeHandler = (type: string) => {
    sortOpenHandle();
    onSortChange(type);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={sortOpenHandle} className="places__sorting-type" tabIndex={0}>
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? '' : 'places__options--opened'}`} >
        <li onClick={() => sortChangeHandler(SortType.default)} className="places__option places__option--active" tabIndex={0}>Popular</li>
        <li onClick={() => sortChangeHandler(SortType.priceHi)}  className="places__option" tabIndex={0}>Price: low to high</li>
        <li onClick={() => sortChangeHandler(SortType.priceLow)} className="places__option" tabIndex={0}>Price: high to low</li>
        <li onClick={() => sortChangeHandler(SortType.ratingHi)} className="places__option" tabIndex={0}>Top rated first</li>
      </ul>
    </form>);
}

export default Sort;
