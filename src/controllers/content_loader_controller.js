import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["output"];
  async load() {
    this.outputTarget.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const data = await response.json();
      this.outputTarget.textContent = data.title;
    } catch (error) {
      this.outputTarget.textContent = 'Error loading content';
    }
  }
}
