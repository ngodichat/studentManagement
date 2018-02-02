/**
 * Created By : Sangwin Gawande (http://sangw.in)
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return '+84'+ value.substr(1);
  }

}

/**
 * Created By : Sangwin Gawande (http://sangw.in)
 */