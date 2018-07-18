import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'numFormat'})
export class NumFormat implements PipeTransform {
  transform(num:string): string {
    return Number(num) > 10 ? num+'' : '0'+num;
  }
}
