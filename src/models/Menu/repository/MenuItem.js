import eventBus from '../../../lib/eventBus';
import ConfigurationException from '../../Exceptions/ConfigurationException';

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

    if (typeof this.vue !== 'object') {
      throw new ConfigurationException(`Vue instance must be VueComponent.
      Make sure that BaseModel.vue contains your local vue instance.`);
    }

    if (typeof this.vue.$store !== 'object') {
      throw new ConfigurationException(`It seems like vuex is not installed.
      Make sure that you have installed vuex and configured.`);
    }

    const { vue: { $store }} = this;

    if (route && route.path) {
      route = Object.assign(route, { params: { key: $store.getters['route/key'] } });
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
