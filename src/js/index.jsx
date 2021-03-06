import React from 'react';
import moment from 'moment';
import CommonFn from './commonFn';
import min from 'lodash/min';
import max from 'lodash/max';
import CalendarSelect from './calendarSelect';
import 'font-awesome/css/font-awesome.css';
import '../assets/style/main.css';

export default class DateRange extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      format: props.format || 'x', // 日期格式
      minDate: CommonFn.ymd(props.minDate || '1900-01-01'),
      maxDate: CommonFn.ymd(props.maxDate || '2200-01-01'),
      startMonth: CommonFn.ym(props.startDate), // 默认开始月份
      endMonth: props.endDate && !props.sync ? CommonFn.ym(props.endDate)
        : moment(props.startDate || undefined).add(1, 'months').format('YYYY-MM'), // 默认结束月份
      showCalendar: false, // 是否显示日历
      startDate: props.startDate ? CommonFn.ymd(props.startDate)
        : '', // 默认开始时间
      endDate: props.endDate ? CommonFn.ymd(props.endDate)
        : '', // 默认结束时间
      hoverTime: '', // 鼠标悬停的日期
      isSelecting: '', //选择状态位：'', 'startDate', 'endDate'
      placeholder: props.placeholder || 'YYYY-MM-DD',
      lang: props.lang === 'zh-cn' ? 'zh-cn' : 'en',
      sync: props.sync || false, // 左右两个月份是否同步
    };

    this.dateCallback = this.dateCallback.bind(this);
  }

  // 显示、隐藏日历
  dateSectionDisplay(type) {
    const { startMonth, endMonth, showCalendar } = this.state;
    if (showCalendar !== (type === 'show')) {
      // 处理开始结束月份显示顺序
      if (startMonth > endMonth) {
        this.setState({
          startMonth: endMonth,
          endMonth: startMonth,
        });
      } else if (startMonth === endMonth) {
        this.setState({
          endMonth: moment(endMonth).add(1, 'month').format('YYYY-MM'),
        });
      }

      this.setState({
        showCalendar: type === 'show',
        isSelecting: type === 'show' ? 'startDate' : '',
      });
    }
  }

  // 修改日历显示的年月
  calendarChange(type, unit, section) {
    if (!this.state.sync) {
      const name = `${section}Month`;
      this.setState({
        [name]: moment(this.state[name]).add(type, unit).format('YYYY-MM'),
      });
    } else {
      this.setState({
        startMonth: moment(this.state.startMonth).add(type, unit).format('YYYY-MM'),
        endMonth: moment(this.state.endMonth).add(type, unit).format('YYYY-MM'),
      });
    }
  }

  // 点击日历日期，选择时间
  selectTime(time) {
    if (this.state.isSelecting === 'startDate') {
      this.setState({
        startDate: time,
        endDate: time,
        isSelecting: 'endDate',
        hoverTime: time,
      }, this.dateCallback);
    } else if (this.state.isSelecting === 'endDate') {
      let { startDate, endDate } = this.state;
      if (startDate > time) {
        endDate = startDate;
        startDate = time;
      } else {
        endDate = time;
      }
      this.setState({
        startDate,
        endDate,
        isSelecting: '',
        showCalendar: false,
      }, this.dateCallback);
    }
  }

  // 鼠标悬停日期，选中区域
  mouseEnterTime(time) {
    if (this.state.isSelecting === 'endDate') {
      this.setState({ hoverTime: time });
    }
  }

  // 日期是否被选中
  isSelected(date) {
    const { startDate, endDate, hoverTime } = this.state;
    const timeArr = [startDate, endDate];
    if (hoverTime) timeArr.push(hoverTime);
    if (date > min(timeArr) && date < max(timeArr)) {
      return 'selected';
    } else if (date === min(timeArr) || date === max(timeArr)) {
      return 'start-or-end-selected';
    }
    return '';
  }

  // 选择时间时，鼠标移出日历区域
  calendarMouseLeave() {
    if (this.state.isSelecting === 'endDate') {
      this.setState({ hoverTime: '' });
    }
  }

  // 回调组件外部方法，传出修改
  dateCallback() {
    const { changeStartDate, changeEndDate } = this.props;
    const { startDate, endDate, format } = this.state;
    if (changeStartDate) {
      changeStartDate(moment(startDate).format(format));
    }
    if (changeEndDate) {
      changeEndDate(
        moment(endDate)
          .set({
            hour: 23,
            minute: 59,
            second: 59,
            millisecond: 999,
          })
          .format(format)
      );
    }
  }

  render() {
    const {
      minDate,
      maxDate,
      startMonth,
      endMonth,
      startDate,
      endDate,
      showCalendar,
      placeholder,
      lang,
      sync,
    } = this.state;

    return (
      <div className="date-range-body">
        <div
          className="input-section"
          onClick={() => this.dateSectionDisplay('show')}
        >
          <input type="text" className="start-time" value={startDate} placeholder={placeholder} />
          <span className="clip-span">——</span>
          <input type="text" className="end-time" value={endDate} placeholder={placeholder} />
        </div>

        <div
          className={`date-section ${showCalendar && 'date-section-show'}`}
          onMouseLeave={() => this.calendarMouseLeave()}
        >
          <CalendarSelect
            className="date-start-section"
            calendarMonth={startMonth}
            minDate={minDate}
            maxDate={maxDate}
            lang={lang}
            sync={sync && 'start'}
            showCalendar={showCalendar}
            isSelected={item => this.isSelected(item)}
            selectTime={item => this.selectTime(item)}
            mouseEnterTime={item => this.mouseEnterTime(item)}
            calendarChange={(type, unit) => this.calendarChange(type, unit, 'start')}
          />
          <CalendarSelect
            className="date-end-section"
            calendarMonth={endMonth}
            minDate={minDate}
            maxDate={maxDate}
            lang={lang}
            sync={sync && 'end'}
            showCalendar={showCalendar}
            isSelected={item => this.isSelected(item)}
            selectTime={item => this.selectTime(item)}
            mouseEnterTime={item => this.mouseEnterTime(item)}
            calendarChange={(type, unit) => this.calendarChange(type, unit, 'end')}
          />
        </div>
        {showCalendar &&
        <div className="bg-for-close" onClick={() => this.dateSectionDisplay('hide')} />
        }
      </div>
    );
  }
}
