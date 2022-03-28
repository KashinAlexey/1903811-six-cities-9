import { memo } from 'react';

type LoadingScreenProps = {
  isDataLoaded: boolean,
}

function LoadingScreen(props: LoadingScreenProps): JSX.Element {
  const {isDataLoaded} = props;

  return (
    <p>{isDataLoaded ? 'Loading ...': ''}</p>
  );
}

export default memo(LoadingScreen, (prevProps, nextProps) => prevProps.isDataLoaded === nextProps.isDataLoaded);
