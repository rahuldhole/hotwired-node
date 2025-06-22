import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["output"];
  show(message) {
    this.outputTarget.textContent = message;
  }
}
