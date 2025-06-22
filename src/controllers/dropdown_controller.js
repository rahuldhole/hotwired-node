import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["menu"];
  static classes = ["hidden"];
  toggle() {
    this.menuTarget.classList.toggle(this.hiddenClass);
  }
  hide(event) {
    if (!this.element.contains(event.target)) {
      this.menuTarget.classList.add(this.hiddenClass);
    }
  }
}
