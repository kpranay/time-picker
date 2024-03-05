import { NgModule } from '@angular/core';
import { TimePickerComponent } from './time-picker.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [TimePickerComponent],
  imports: [
    FormsModule
  ],
  exports: [TimePickerComponent]
})
export class TimePickerModule { }
