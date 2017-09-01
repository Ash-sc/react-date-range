'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _commonFn = require('./commonFn');

var _commonFn2 = _interopRequireDefault(_commonFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarSelect = function (_React$Component) {
  _inherits(CalendarSelect, _React$Component);

  function CalendarSelect() {
    _classCallCheck(this, CalendarSelect);

    return _possibleConstructorReturn(this, (CalendarSelect.__proto__ || Object.getPrototypeOf(CalendarSelect)).apply(this, arguments));
  }

  _createClass(CalendarSelect, [{
    key: 'isDateEnable',


    // constructor(props) {
    //   super(props);
    // }

    // 日期是否可用
    value: function isDateEnable(date) {
      var _props = this.props,
          minDate = _props.minDate,
          maxDate = _props.maxDate;

      return date >= minDate && date <= maxDate;
    }

    // 选择日期

  }, {
    key: 'selectTime',
    value: function selectTime(date) {
      if (this.isDateEnable(date)) {
        this.props.selectTime(date);
      }
    }

    // 日期鼠标悬停

  }, {
    key: 'mouseEnterTime',
    value: function mouseEnterTime(date, e) {
      if (this.isDateEnable(date)) {
        this.props.mouseEnterTime(date);
      } else {
        e.target.classList.add('disable');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          calendarMonth = _props2.calendarMonth,
          calendarChange = _props2.calendarChange,
          className = _props2.className,
          isSelected = _props2.isSelected,
          lang = _props2.lang;

      var weekdays = lang === 'zh-cn' ? ['日', '一', '二', '三', '四', '五', '六'] : ['Sun', 'Mon', 'Tus', 'Wes', 'Thu', 'Fri', 'Sat'];
      var isCurrentMonth = calendarMonth === _commonFn2.default.ym();
      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'div',
          { className: 'header-section' },
          _react2.default.createElement('span', {
            className: 'prev-year fa fa-backward',
            onClick: function onClick() {
              return calendarChange(-1, 'year');
            }
          }),
          _react2.default.createElement('span', {
            className: 'prev-month fa fa-caret-left',
            onClick: function onClick() {
              return calendarChange(-1, 'month');
            }
          }),
          _react2.default.createElement('span', {
            className: 'next-month fa fa-caret-right',
            onClick: function onClick() {
              return calendarChange(1, 'month');
            }
          }),
          _react2.default.createElement('span', {
            className: 'next-year fa fa-forward',
            onClick: function onClick() {
              return calendarChange(1, 'year');
            }
          }),
          _react2.default.createElement(
            'span',
            { className: 'year-selector' },
            _react2.default.createElement(
              'span',
              { className: 'current' },
              calendarMonth.split('-')[0],
              lang === 'zh-cn' && '年'
            )
          ),
          _react2.default.createElement(
            'span',
            { className: 'month-selector' },
            _react2.default.createElement(
              'span',
              { className: 'current' },
              calendarMonth.split('-')[1],
              lang === 'zh-cn' && '月'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'calender-section' },
          weekdays.map(function (day, key) {
            return _react2.default.createElement(
              'div',
              {
                key: key,
                className: 'date-weekday'
              },
              day
            );
          }),
          _commonFn2.default.calendarArray(calendarMonth).map(function (item, key) {
            return _react2.default.createElement(
              'div',
              {
                key: key,
                className: 'date-item ' + isSelected(item) + ' ' + (item.indexOf(calendarMonth) !== 0 ? 'not-current-month' : '') + ' ' + (isCurrentMonth && _commonFn2.default.ymd() === item ? 'current-day' : ''),
                onClick: function onClick() {
                  return _this2.selectTime(item);
                },
                onMouseEnter: function onMouseEnter(e) {
                  return _this2.mouseEnterTime(item, e);
                }
              },
              item.split('-')[2]
            );
          })
        )
      );
    }
  }]);

  return CalendarSelect;
}(_react2.default.Component);

exports.default = CalendarSelect;
//# sourceMappingURL=calendarSelect.js.map