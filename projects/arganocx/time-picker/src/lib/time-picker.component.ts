import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';
import * as moment_ from 'moment';
const moment = moment_;

@Component({
  selector: 'lib-time-picker',
  templateUrl: './time-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TimePickerComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: TimePickerComponent,
    },
  ]
})
export class TimePickerComponent implements OnInit, ControlValueAccessor, Validator {

  
  time: any = null;
  @Input() label = '';
  @Input() timeFormat = 'hh:mm A';
  // @Input() asMatComp = true;
  @Input() disabled = false;

  onChange: any = () => {};
  onTouch: any = () => {};

  constructor() {}
  writeValue(obj: any): void {
    this.time = obj;
    this.onChange(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
  onValueChange() {
    this.writeValue(this.time);
  }
  parseTheValue() {
    this.onTouch();
    const parsedValue = this.parseTime(this.time ? this.time : '');
    if (parsedValue) {
      this.writeValue(parsedValue.format(this.timeFormat));
    }
  }
  validate(control: AbstractControl): ValidationErrors | null {
    const isValid = this.parseTime(this.time ? this.time : '');
    if (!!this.time && !isValid) {
      return {
        invalidTime: {
          value: control.value,
        },
      };
    }
    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {}

  parseTime(time: String): moment.Moment | null {
    let amPm = 'a';
    let hours: number;
    let minutes: number;
    if (time) {
      let timeTemp = time.toLowerCase();
      timeTemp = timeTemp.replace(/:|\s/g, '');

      /**
       * extract a/am/p/pm to amPm variable and remove it from timeTemp
       */
      if (timeTemp.endsWith('a') || timeTemp.endsWith('p')) {
        amPm = timeTemp.slice(-1);
        timeTemp = timeTemp.slice(0, -1);
      } else if (timeTemp.endsWith('am') || timeTemp.endsWith('pm')) {
        amPm = timeTemp.slice(-2).charAt(0);
        timeTemp = timeTemp.slice(0, -2);
      }

      try {
        if (timeTemp.length == 2 || timeTemp.length == 1) {
          hours = +timeTemp;
          minutes = 0;
        } else if (timeTemp.length > 2) {
          minutes = +timeTemp.slice(-2);
          timeTemp = timeTemp.slice(0, -2);
          hours = +timeTemp;
        } else {
          return null;
        }

        // convert hours to 24 hours format if its in 12hours format
        if (hours < 12 && hours >= 1 && amPm === 'p') {
          hours = hours + 12;
        } else if (hours === 12 && amPm === 'a') {
          hours = hours - 12;
        }
      } catch (error) {
        console.log('inside catch', error);
        return null;
      }
      const momentTime = moment({ hours: hours, minutes: minutes });
      // console.log('input:', time, 'hours:', hours, 'minutes:', minutes, 'momentTime:', momentTime.format('hh:mm A'));
      if (momentTime.isValid()) {
        return momentTime;
      }
    }
    return null;
  }

}
