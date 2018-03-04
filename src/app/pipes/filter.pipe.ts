import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (args !== undefined && args != null && args !== "") {
      // console.log("FILTERING DATA");
      // console.log(value[0].filter_data);
      return value.filter(
        data => (data.filter_data).toLocaleLowerCase().indexOf(args.toLowerCase()) > -1
      );
    }
    return value;
  }
}
