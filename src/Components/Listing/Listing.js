import { ListGroup } from 'react-bootstrap';
import ListItem from './ListItem';

export default function Listing({ filteredItems }) {
  return (
    <>
      <ListGroup>
        {filteredItems.map((item) => (
          <ListItem item={item} key={item.globalid} />
        ))}
      </ListGroup>
    </>
  );
}
