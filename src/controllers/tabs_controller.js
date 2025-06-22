import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["tab", "panel"];
  static classes = ["activeTab", "hidden"];
  switch(event) {
    const index = event.currentTarget.dataset.index;
    this.tabTargets.forEach((tab, i) => {
      tab.classList.toggle(this.activeTabClass, i == index);
      this.panelTargets[i].classList.toggle(this.hiddenClass, i != index);
    });
  }
}
