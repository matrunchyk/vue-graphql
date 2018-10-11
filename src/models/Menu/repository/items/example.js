import Item from '../Item';

export default [
  new Item({
    id: 'exampleItem1',
    title: 'Example 1',
    subtitle: 'This is example 1',
    route: { name: 'example1' },
    icon: 'home'
  }),
  new Item({
    id: 'exampleItem2',
    title: 'Example 2',
    subtitle: 'This is example 2',
    route: { name: 'example2' },
    icon: 'home'
  })
];
