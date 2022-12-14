import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage',
})
export class NoImagePipe implements PipeTransform {
  transform(value: string, defaultImage: string): string {
    return value ? value : defaultImage;
  }
}
