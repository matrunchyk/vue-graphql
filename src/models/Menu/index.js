import Repository from './repository/Repository';
import example from './repository/items/example';

const Menu = new Repository([
  ...example
]);

export default Menu;
