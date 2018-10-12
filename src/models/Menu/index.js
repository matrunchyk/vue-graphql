import MenuRepository from './repository/MenuRepository';
import example from './repository/items/example';

const Menu = new MenuRepository([
  ...example
]);

export default Menu;
