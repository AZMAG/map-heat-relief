import React from 'react';
import { useDataStore } from '../../Stores/DataContext';
import { observer } from 'mobx-react-lite';

function LastUpdated() {
  const store = useDataStore();

  let maxUpdatedDate = new Date('01/01/2000');
  store.points.forEach((point) => {
    if (point.Date_Updated) {
      const testDate = new Date(point.Date_Updated);
      if (testDate > maxUpdatedDate) {
        maxUpdatedDate = testDate;
      }
    }
  });

  const yyyy = maxUpdatedDate.getFullYear();
  const mm = String(maxUpdatedDate.getMonth() + 1).padStart(2, '0');
  const dd = String(maxUpdatedDate.getDate() + 1).padStart(2, '0');

  return (
    <>
      {maxUpdatedDate && (
        <span className="ml-2 last-updated">
          {' '}
          Last Updated:{' '}
          <b>
            {mm}/{dd}/{yyyy}
          </b>
        </span>
      )}
    </>
  );
}

export default observer(LastUpdated);
