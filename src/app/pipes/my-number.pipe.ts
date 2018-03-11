import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "myNumber"
})
export class MyNumberPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    if (value && value !== undefined) {
      let valueStr = value.toString();
      if (valueStr.indexOf(".") != -1) return value;
      const numberGroups = valueStr.startsWith("-")
        ? (valueStr.length - 1) / 3
        : valueStr.length / 3;
      // console.log(numberGroups);
      for (let i = 1; i < numberGroups; i++) {
        const pos = 4 * i - 1;
        valueStr = [
          valueStr.slice(0, valueStr.length - pos),
          ".",
          valueStr.slice(valueStr.length - pos)
        ].join("");
        // console.log(valueStr);
      }
      return valueStr;
    }
    return "0";
  }
}
