import React from 'react';
import { render } from 'react-dom';

import DateRange from '../src/js/index';
import '../src/assets/style/main.scss';
import './index.html';

render(
  <div className="root-bg">
    <DateRange />
  </div>,
  document.getElementById('app')
);

