'use strict';

module.exports = {
  'rules': {
    'quotes': [2, 'single'],
    'no-nested-ternary': [1],
    'max-statements': [1]
  },
  'globals': {
    'describe': false,
    'it': false,
    'beforeEach': false
  },
  'extends': 'defaults/configurations/walmart/es6-node'
};
