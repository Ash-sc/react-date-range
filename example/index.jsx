import React from 'react';
import { render } from 'react-dom';

import DateRange from '../src/js/index';
import './index.html';

render(
  <div className="root-bg">
    <div className="zh-cn-input">
      <DateRange
        lang="zh-cn"
        placeholder="年-月-日"
      />
    </div>
    <div className="en-input">
      <DateRange />
    </div>
  </div>,
  document.getElementById('app')
);

