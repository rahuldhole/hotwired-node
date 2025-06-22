import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    count: Number,
  }
  static targets = ['count']

  connect() {
    this.update()
  }

  increment() {
    this.countValue++
    this.update()
  }

  decrement() {
    this.countValue--
    this.update()
  }

  update() {
    this.countTarget.textContent = this.countValue
  }
}
