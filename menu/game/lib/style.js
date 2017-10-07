let style;

// this is a wrapped function
(function() {
  // the letiables declared here will not be scoped anywhere and will only be accessible in this wrapped function
  let defaultColor = 'white',
    highlightColor = '#FEFFD5';

  style = {
    navitem: {
      base: {
        font: '30pt TheMinion',
        align: 'left',
        srokeThickness: 4
      },
      default: {
        fill: defaultColor,
        stroke: 'rgba(0,0,0,0)'
      },
      inverse: {
        fill: 'black',
        stroke: 'black'
      },
      hover: {
        fill: highlightColor,
        stroke: 'rgba(200,200,200,0.5)'
      }
    }
  };

  for (let key in style.navitem) {
    if (key !== 'base') {
      Object.assign(style.navitem[key], style.navitem.base);
    }
  }
})();

// the trailing () triggers the function call immediately
