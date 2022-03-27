import { useState } from 'react';
import { SortType } from '../../sort';

type SortProps = {
  onSortChange: (type: string) => void;
}

function Sort(props: SortProps): JSX.Element {
  const {onSortChange} = props;
  const [isOpen, setisOpen] = useState(true);
  const [sortType, setSortType] = useState(SortType.default);

  const sortOpenHandle = () => {
    setisOpen(!isOpen);
  };

  const sortChangeHandler = (type: string) => {
    setSortType(type);
    sortOpenHandle();
    onSortChange(type);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={sortOpenHandle} className="places__sorting-type" tabIndex={0}>
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? '' : 'places__options--opened'}`} >
        <li onClick={() => sortChangeHandler(SortType.default)} className="places__option places__option--active" tabIndex={0}>{SortType.default}</li>
        <li onClick={() => sortChangeHandler(SortType.priceHi)}  className="places__option" tabIndex={0}>{SortType.priceHi}</li>
        <li onClick={() => sortChangeHandler(SortType.priceLow)} className="places__option" tabIndex={0}>{SortType.priceLow}</li>
        <li onClick={() => sortChangeHandler(SortType.ratingHi)} className="places__option" tabIndex={0}>{SortType.ratingHi}</li>
      </ul>
    </form>);
}

export default Sort;
