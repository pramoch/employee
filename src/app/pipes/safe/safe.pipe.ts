import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(
    private sanitizer: DomSanitizer
  ) {}

  transform(value: string, ...args: unknown[]): SafeUrl {
    // https://stackoverflow.com/questions/37927657/img-unsafe-value-used-in-a-resource-url-context
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
