// Animations Module
class AnimationManager {
  constructor() {
    this.animatedElements = document.querySelectorAll(".animate-on-scroll")
    this.observer = null

    this.init()
  }

  init() {
    this.createObserver()
    this.observeElements()
  }

  createObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated")
          this.observer.unobserve(entry.target)
        }
      })
    }, options)
  }

  observeElements() {
    this.animatedElements.forEach((element) => {
      this.observer.observe(element)
    })
  }

  // Method to animate elements with delay
  animateWithDelay(elements, delay = 100) {
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("animated")
      }, index * delay)
    })
  }
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new AnimationManager()
})
