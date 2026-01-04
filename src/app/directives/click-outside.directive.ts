import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  public onClick(event: MouseEvent | TouchEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    
    // Check if the click target is part of a MatDialog
    const isMatDialogClick = (event.target as HTMLElement)?.closest('.mat-mdc-dialog-container') !== null;
    
    if (!clickedInside && !isMatDialogClick) {
      this.clickOutside.emit();
    }
  }
}
