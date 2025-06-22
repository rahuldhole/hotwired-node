import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["count"];
  static values = { count: Number };
  initialize() {
    this.countValue = 0;
  }
  increment() {
    this.countValue++;
  }
  decrement() {
    this.countValue--;
  }
  countValueChanged() {
    this.countTarget.textContent = this.countValue;
  }
}
