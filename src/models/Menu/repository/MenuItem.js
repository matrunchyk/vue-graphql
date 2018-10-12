import eventBus from '../../../lib/eventBus';
import { getApplication } from '../../../lib/utils';

class MenuItem {
  id = '';
  title = 'Menu Item';
  subtitle = '';
  route;
  href;
  customIcon = false;
  icon = 'home';
  emitter = 'menuClick';

  constructor(options = {}) {
    Object.assign(this, options);
    this.bus = eventBus;
  }

  // Getters
  get boundListeners() {
    return {
      click: event => this.click(event)
    };
  }

  // Methods
  getBoundProps() {
    let { route } = this;
    const { config: { vuex }} = getApplication();

    if (route && route.path) {
      route = Object.assign(route, { params: { key: vuex.getters['route/key'] } });
    }
    const { href } = this;

    return {
      href,
      to: route
    };
  }

  hasCustomIcon() {
    return this.customIcon;
  }

  click(event) {
    this.bus.$emit('toggleLeftDrawer');
    this.bus.$emit(this.emitter, {
      item: this,
      event
    });
  }
}

export default MenuItem;
