import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["input"];
  static outlets = ["display"];
  send() {
    this.displayOutlet.show(this.inputTarget.value);
  }
}
