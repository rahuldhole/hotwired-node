import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["dialog"];
  static classes = ["hidden", "transition"];
  open() {
    this.dialogTarget.classList.remove(this.hiddenClass);
    this.dialogTarget.classList.add(this.transitionClass);
  }
  close() {
    this.dialogTarget.classList.add(this.hiddenClass);
    this.dialogTarget.classList.remove(this.transitionClass);
  }
}
