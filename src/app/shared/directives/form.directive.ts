import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { markAllControlsAsTouched } from "../utils/helper";

@Directive({
  selector: "[hydraForm]",
})
export class FormDirective {
  @Input() form: FormGroup;
  @Output() submitForm = new EventEmitter<any>();

  @HostListener("click") onClick() {
    this.checkForm();
  }

  @HostListener("document:keydown", ["$event"]) onKeydownHandler(
    event: KeyboardEvent
  ) {
    if (event.keyCode === 13) {
      this.checkForm();
    }
  }

  checkForm(): void {
    markAllControlsAsTouched(this.form);

    if (this.form.valid) {
      this.submitForm.next();
    }
  }
}
