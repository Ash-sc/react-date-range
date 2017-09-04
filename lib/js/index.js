'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _commonFn = require('./commonFn');

var _commonFn2 = _interopRequireDefault(_commonFn);

var _min = require('lodash/min');

var _min2 = _interopRequireDefault(_min);

var _max = require('lodash/max');

var _max2 = _interopRequireDefault(_max);

var _calendarSelect = require('./calendarSelect');

var _calendarSelect2 = _interopRequireDefault(_calendarSelect);

require('font-awesome/css/font-awesome.css');

require('../assets/style/main.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateRange = function (_React$Component) {
  _inherits(DateRange, _React$Component);

  function DateRange(props) {
    _classCallCheck(this, DateRange);

    var _this = _possibleConstructorReturn(this, (DateRange.__proto__ || Object.getPrototypeOf(DateRange)).call(this, props));

    _this.state = {
      format: props.format || 'x', // 日期格式
      minDate: _commonFn2.default.ymd(props.minDate || '1900-01-01'),
      maxDate: _commonFn2.default.ymd(props.maxDate || '2200-01-01'),
      startMonth: _commonFn2.default.ym(props.startDate), // 默认开始月份
      endMonth: props.endDate && !props.sync ? _commonFn2.default.ym(props.endDate) : (0, _moment2.default)(props.startDate || undefined).add(1, 'months').format('YYYY-MM'), // 默认结束月份
      showCalendar: false, // 是否显示日历
      startDate: props.startDate ? _commonFn2.default.ymd(props.startDate) : '', // 默认开始时间
      endDate: props.endDate ? _commonFn2.default.ymd(props.endDate) : '', // 默认结束时间
      hoverTime: '', // 鼠标悬停的日期
      isSelecting: '', //选择状态位：'', 'startDate', 'endDate'
      placeholder: props.placeholder || 'YYYY-MM-DD',
      lang: props.lang === 'zh-cn' ? 'zh-cn' : 'en',
      sync: props.sync || false // 左右两个月份是否同步
    };

    _this.dateCallback = _this.dateCallback.bind(_this);
    return _this;
  }

  // 显示、隐藏日历


  _createClass(DateRange, [{
    key: 'dateSectionDisplay',
    value: function dateSectionDisplay(type) {
      var _state = this.state,
          startMonth = _state.startMonth,
          endMonth = _state.endMonth,
          showCalendar = _state.showCalendar;

      if (showCalendar !== (type === 'show')) {
        // 处理开始结束月份显示顺序
        if (startMonth > endMonth) {
          this.setState({
            startMonth: endMonth,
            endMonth: startMonth
          });
        } else if (startMonth === endMonth) {
          this.setState({
            endMonth: (0, _moment2.default)(endMonth).add(1, 'month').format('YYYY-MM')
          });
        }

        this.setState({
          showCalendar: type === 'show',
          isSelecting: type === 'show' ? 'startDate' : ''
        });
      }
    }

    // 修改日历显示的年月

  }, {
    key: 'calendarChange',
    value: function calendarChange(type, unit, section) {
      if (!this.state.sync) {
        var name = section + 'Month';
        this.setState(_defineProperty({}, name, (0, _moment2.default)(this.state[name]).add(type, unit).format('YYYY-MM')));
      } else {
        this.setState({
          startMonth: (0, _moment2.default)(this.state.startMonth).add(type, unit).format('YYYY-MM'),
          endMonth: (0, _moment2.default)(this.state.endMonth).add(type, unit).format('YYYY-MM')
        });
      }
    }

    // 点击日历日期，选择时间

  }, {
    key: 'selectTime',
    value: function selectTime(time) {
      if (this.state.isSelecting === 'startDate') {
        this.setState({
          startDate: time,
          endDate: time,
          isSelecting: 'endDate',
          hoverTime: time
        }, this.dateCallback);
      } else if (this.state.isSelecting === 'endDate') {
        var _state2 = this.state,
            startDate = _state2.startDate,
            endDate = _state2.endDate;

        if (startDate > time) {
          endDate = startDate;
          startDate = time;
        } else {
          endDate = time;
        }
        this.setState({
          startDate: startDate,
          endDate: endDate,
          isSelecting: '',
          showCalendar: false
        }, this.dateCallback);
      }
    }

    // 鼠标悬停日期，选中区域

  }, {
    key: 'mouseEnterTime',
    value: function mouseEnterTime(time) {
      if (this.state.isSelecting === 'endDate') {
        this.setState({ hoverTime: time });
      }
    }

    // 日期是否被选中

  }, {
    key: 'isSelected',
    value: function isSelected(date) {
      var _state3 = this.state,
          startDate = _state3.startDate,
          endDate = _state3.endDate,
          hoverTime = _state3.hoverTime;

      var timeArr = [startDate, endDate];
      if (hoverTime) timeArr.push(hoverTime);
      if (date > (0, _min2.default)(timeArr) && date < (0, _max2.default)(timeArr)) {
        return 'selected';
      } else if (date === (0, _min2.default)(timeArr) || date === (0, _max2.default)(timeArr)) {
        return 'start-or-end-selected';
      }
      return '';
    }

    // 选择时间时，鼠标移出日历区域

  }, {
    key: 'calendarMouseLeave',
    value: function calendarMouseLeave() {
      if (this.state.isSelecting === 'endDate') {
        this.setState({ hoverTime: '' });
      }
    }

    // 回调组件外部方法，传出修改

  }, {
    key: 'dateCallback',
    value: function dateCallback() {
      var _props = this.props,
          changeStartDate = _props.changeStartDate,
          changeEndDate = _props.changeEndDate;
      var _state4 = this.state,
          startDate = _state4.startDate,
          endDate = _state4.endDate,
          format = _state4.format;

      if (changeStartDate) {
        changeStartDate((0, _moment2.default)(startDate).format(format));
      }
      if (changeEndDate) {
        changeEndDate((0, _moment2.default)(endDate).set({
          hour: 23,
          minute: 59,
          second: 59,
          millisecond: 999
        }).format(format));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state5 = this.state,
          minDate = _state5.minDate,
          maxDate = _state5.maxDate,
          startMonth = _state5.startMonth,
          endMonth = _state5.endMonth,
          startDate = _state5.startDate,
          endDate = _state5.endDate,
          showCalendar = _state5.showCalendar,
          placeholder = _state5.placeholder,
          lang = _state5.lang,
          sync = _state5.sync;


      return _react2.default.createElement(
        'div',
        { className: 'date-range-body' },
        _react2.default.createElement(
          'div',
          {
            className: 'input-section',
            onClick: function onClick() {
              return _this2.dateSectionDisplay('show');
            }
          },
          _react2.default.createElement('input', { type: 'text', className: 'start-time', value: startDate, placeholder: placeholder }),
          _react2.default.createElement(
            'span',
            { className: 'clip-span' },
            '\u2014\u2014'
          ),
          _react2.default.createElement('input', { type: 'text', className: 'end-time', value: endDate, placeholder: placeholder })
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'date-section ' + (showCalendar && 'date-section-show'),
            onMouseLeave: function onMouseLeave() {
              return _this2.calendarMouseLeave();
            }
          },
          _react2.default.createElement(_calendarSelect2.default, {
            className: 'date-start-section',
            calendarMonth: startMonth,
            minDate: minDate,
            maxDate: maxDate,
            lang: lang,
            sync: sync && 'start',
            showCalendar: showCalendar,
            isSelected: function isSelected(item) {
              return _this2.isSelected(item);
            },
            selectTime: function selectTime(item) {
              return _this2.selectTime(item);
            },
            mouseEnterTime: function mouseEnterTime(item) {
              return _this2.mouseEnterTime(item);
            },
            calendarChange: function calendarChange(type, unit) {
              return _this2.calendarChange(type, unit, 'start');
            }
          }),
          _react2.default.createElement(_calendarSelect2.default, {
            className: 'date-end-section',
            calendarMonth: endMonth,
            minDate: minDate,
            maxDate: maxDate,
            lang: lang,
            sync: sync && 'end',
            showCalendar: showCalendar,
            isSelected: function isSelected(item) {
              return _this2.isSelected(item);
            },
            selectTime: function selectTime(item) {
              return _this2.selectTime(item);
            },
            mouseEnterTime: function mouseEnterTime(item) {
              return _this2.mouseEnterTime(item);
            },
            calendarChange: function calendarChange(type, unit) {
              return _this2.calendarChange(type, unit, 'end');
            }
          })
        ),
        showCalendar && _react2.default.createElement('div', { className: 'bg-for-close', onClick: function onClick() {
            return _this2.dateSectionDisplay('hide');
          } })
      );
    }
  }]);

  return DateRange;
}(_react2.default.Component);

exports.default = DateRange;
//# sourceMappingURL=index.js.map