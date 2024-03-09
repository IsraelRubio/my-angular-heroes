import { Directive, ElementRef, HostListener } from '@angular/core'

@Directive({
  selector: '[appUppercase]',
  standalone: true,
})
export class UppercaseDirective {
  constructor(private _elementRef: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange() {
    const initialValue = String(this._elementRef.nativeElement.value ?? '')
    this._elementRef.nativeElement.value = initialValue.toUpperCase()
  }
}
