/**
 * Created By : Sangwin Gawande (http://sangw.in)
 */

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "phone"
})
export class PhonePipe implements PipeTransform {
  transform(value: string, args?: any): any {
    if (value.startsWith("+84")) {
      return "0" + value.substr(3);
    }
    return value;
  }
}

/**
 * Created By : Sangwin Gawande (http://sangw.in)
 */
