export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'Billing',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Bill',
      url: '/bill/form',
      icon: 'icon-pencil',
    },
    {
      name: 'Report',
      url: '/bill/report',
      icon: 'icon-chart',
    },
    {
      name: 'Menu',
      url: '/menu/form',
      icon: 'icon-chart',
    }
  ],
};
