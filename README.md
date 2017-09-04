# date-range-for-react
A date range component for react.

## install:
```
npm i date-range-for-react
```
## Usage
```
...
import DatePicker from 'date-range-for-react';
...
render() {
  return (
    <DatePicker
      startDate={this.state.startDate}
      endDate={this.state.endDate}
      changeStartDate={date => this.setState({ startDate: date })}
      changeEndDate={date => this.setState({ endDate: date })}
    />
  );
}
```

## Demo:
demo with sync   
![demo-with-sync](https://raw.githubusercontent.com/Ash-sc/react-date-range/dev/example/demo-with-sync.gif)
   
   
demo with async   
![demo-with-async](https://raw.githubusercontent.com/Ash-sc/react-date-range/dev/example/demo-with-async.gif)

## API Reference

* **Properties:**
  * `startDate` - date string representing the start date.
    * **Optional**
    * **Type:** `string`
    * **Example:** `"2017-08-31", "1504251766036", `
  * `endDate` - date string representing the end date.
    * **Optional**
    * **Type:** `string`
    * **Example:** `same as above` `
  * `minDate` - date string representing the min date can be chosen.
    * **Optional**
    * **Type:** `string`
    * **Example:** `same as above`
  * `maxDate` - date string representing the max date can be chosen.
    * **Optional**
    * **Type:** `string`
    * **Example:** `same as above`
  * `changeStartDate` - start date callback function.
      * **Optional**
      * **Type:** `function`
      * **Callback Arguments:**
      * `date` - date string representing the selected value.
              * **Type:** `String`
              * **Example:** `"2017-08-11", "1504251766036"` dependence on the `format` value
  * `changeEndDate` - end date callback function.
      * **Optional**
      * **Type:** `function`
      * **Callback Arguments:**
      * `date` - date string representing the selected value.
              * **Type:** `String`
              * **Example:** `"2017-08-11", "1504251766036"` dependence on the `format` value
  * `format` - format of date callback.
      * **Optional**
      * **Default** `"x"`
      * **Type:** `string`
      * **Example:** `"x", "X", "YYYY-MM-DD"` Same with format option in [moment.js](https://momentjs.com/docs/#/displaying/format/)
  * `placeholder` - placeholder of start date and end date input.
      * **Optional**
      * **Default** `"YYYY-MM-DD"`
      * **Type:** `string`
      * **Example:** `"年-月-日"`
  * `lang` - language.
      * **Optional**
      * **Default** `"en"`
      * **Type:** `string`
      * **value:** `"en" or "zh-cn"`
  * `sync` - sync two calender selector.
      * **Optional**
      * **Default** `false`
      * **Type:** `boolean`
      * **value:** `false、true`
        
        


## PS:
If you got an error such as:
```
ERROR in ./~/font-awesome/fonts/fontawesome-webfont.woff2?v=4.4.0
...
You may need an appropriate loader to handle this file type
```
just change your webpack config as blow:
```
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?\S*)?$/,
        loader: 'url?limit=100000&name=[name].[ext]',
      }
```