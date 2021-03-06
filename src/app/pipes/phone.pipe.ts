/**
 * Created By : Pham Nguyen Binh
 */

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "phone"
})
export class PhonePipe implements PipeTransform {
  transform(value: string, args?: any): any {
    if (value !== undefined && value != null && value.startsWith("+84")) {
      return "0" + value.substr(3);
    }
    return value;
  }
}

/**
 * Created By : Pham Nguyen Binh
 */
