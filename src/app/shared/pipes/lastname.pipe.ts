import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastname'
})
export class LastnamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
