import React from 'react';
import { render } from 'react-dom';

import '../src/assets/style/main.scss';
import DateRange from '../src/js/index';
import './index.html';

render(
  <div className="root-bg">
    <DateRange />
  </div>,
  document.getElementById('app')
);

