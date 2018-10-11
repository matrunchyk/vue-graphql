import Repository from 'Models/Menu/repository/Repository';
import example from './repository/items/example';

const Menu = new Repository([
  ...example
]);

export default Menu;
