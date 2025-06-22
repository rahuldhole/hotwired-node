import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["input", "error"];
  validate() {
    const value = this.inputTarget.value;
    this.errorTarget.textContent = value.length < 3 ? "Input must be at least 3 characters" : "";
  }
}
