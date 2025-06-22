import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["bar"];
  update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    this.barTarget.style.width = `${progress}%`;
  }
}
