import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'name2avatar'})
export class Name2AvatarPipe implements PipeTransform {
  transform(name: string): string {
    const reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g;
    return name ? String(name).replace(reg, '')[0].toLocaleUpperCase()
      + String(name).replace(reg, '')[1].toLocaleUpperCase() : '';
  }
}
