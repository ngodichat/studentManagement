import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (args !== undefined && args != null && args !== "") {
      return value.filter(
        data => (data.first_name + " " + data.sur_middle_name + " " + data.class).toLocaleLowerCase().indexOf(args.toLowerCase()) > -1
      );
    }
    return value;
  }
}
