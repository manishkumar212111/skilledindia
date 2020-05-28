'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {hydrate} from 'react-dom'
import AppRoutes from './si/AppRoutes';

window.onload = () => {
  hydrate(<AppRoutes />, document.getElementById('main'));
};
