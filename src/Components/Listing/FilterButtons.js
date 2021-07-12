import { Button } from 'react-bootstrap';

import hydrationLogo from '../../images/hydration.png';
import coolingLogo from '../../images/cooling.png';
import donationLogo from '../../images/donation.png';

export default function FilterButtons({
  setCooling,
  setHydration,
  setDonation,
  cooling,
  hydration,
  donation,
}) {
  return (
    <div>
      <Button
        onClick={(e) => setCooling(!cooling)}
        size="sm"
        variant={cooling ? 'primary' : 'outline-primary'}
        className="mr-1"
      >
        <img src={coolingLogo} alt="Cooling" />
        Cooling
      </Button>
      <Button
        onClick={(e) => setHydration(!hydration)}
        variant={hydration ? 'primary' : 'outline-primary'}
        size="sm"
        className="mr-1"
      >
        <img src={hydrationLogo} alt="Hydration" />
        Hydration
      </Button>
      <Button
        onClick={(e) => setDonation(!donation)}
        variant={donation ? 'primary' : 'outline-primary'}
        size="sm"
        className="mr-1"
      >
        <img src={donationLogo} alt="Donation" />
        Donation
      </Button>
    </div>
  );
}
