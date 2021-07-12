import React, { useState, useEffect } from 'react';
import { getLegendImageByHydrationActivity } from '../Data/data';
import { Button } from 'react-bootstrap';

export default function FilterButtons({
  setCooling,
  setHydration,
  setDonation,
  cooling,
  hydration,
  donation,
}) {
  const [coolingImg, setCoolingImg] = useState(null);
  const [hydrationImg, setHydrationImg] = useState(null);
  const [donationImg, setDonationImg] = useState(null);
  useEffect(() => {
    (async () => {
      const tempCoolingImg = await getLegendImageByHydrationActivity(
        'Cooling_Center'
      );
      setCoolingImg(tempCoolingImg);

      const tempHydrationImg = await getLegendImageByHydrationActivity(
        'Hydration_Station'
      );
      setHydrationImg(tempHydrationImg);

      const tempDonationImg = await getLegendImageByHydrationActivity(
        'Collection/Donation Site'
      );
      setDonationImg(tempDonationImg);
    })();
  }, []);

  return (
    <div>
      <Button
        onClick={(e) => setCooling(!cooling)}
        size="sm"
        variant={cooling ? 'primary' : 'outline-primary'}
        className="mr-1"
      >
        {coolingImg ? <img src={coolingImg} alt="Cooling" /> : ''}
        Cooling
      </Button>
      <Button
        onClick={(e) => setHydration(!hydration)}
        variant={hydration ? 'primary' : 'outline-primary'}
        size="sm"
        className="mr-1"
      >
        {hydrationImg ? <img src={hydrationImg} alt="Hydration" /> : ''}
        Hydration
      </Button>
      <Button
        onClick={(e) => setDonation(!donation)}
        variant={donation ? 'primary' : 'outline-primary'}
        size="sm"
        className="mr-1"
      >
        {donationImg ? <img src={donationImg} alt="Donation" /> : ''}
        Donation
      </Button>
    </div>
  );
}
