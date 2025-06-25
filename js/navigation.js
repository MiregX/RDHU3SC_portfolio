// Navigation Module
class Navigation {
  constructor() {
    this.header = document.getElementById("header")
    this.nav = document.getElementById("nav")
    this.mobileMenuToggle = document.getElementById("mobileMenuToggle")
    this.navLinks = document.querySelectorAll(".nav__link")
    this.scrollToTopBtn = document.getElementById("scrollToTop")

    this.init()
  }

  init() {
    this.bindEvents()
    this.updateActiveLink()
  }

  bindEvents() {
    // Mobile menu toggle
    this.mobileMenuToggle.addEventListener("click", () => {
      this.toggleMobileMenu()
    })

    // Close mobile menu when clicking on links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href").substring(1)
        this.scrollToSection(targetId)
        this.closeMobileMenu()
      })
    })

    // Scroll events
    window.addEventListener("scroll", () => {
      this.handleScroll()
      this.updateActiveLink()
    })

    // Scroll to top button
    this.scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.nav.contains(e.target) && !this.mobileMenuToggle.contains(e.target)) {
        this.closeMobileMenu()
      }
    })
  }

  toggleMobileMenu() {
    this.nav.classList.toggle("active")
    this.mobileMenuToggle.classList.toggle("active")
  }

  closeMobileMenu() {
    this.nav.classList.remove("active")
    this.mobileMenuToggle.classList.remove("active")
  }

  handleScroll() {
    // Add scrolled class to header
    if (window.scrollY > 50) {
      this.header.classList.add("scrolled")
    } else {
      this.header.classList.remove("scrolled")
    }

    // Show/hide scroll to top button
    if (window.scrollY > 300) {
      this.scrollToTopBtn.style.display = "block"
    } else {
      this.scrollToTopBtn.style.display = "none"
    }
  }

  updateActiveLink() {
    const sections = document.querySelectorAll("section[id]")
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        this.navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId)
    if (section) {
      const headerHeight = this.header.offsetHeight
      const sectionTop = section.offsetTop - headerHeight

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      })
    }
  }
}

// Global function for scroll to section (used by hero button)
function scrollToSection(sectionId) {
  const navigation = new Navigation()
  navigation.scrollToSection(sectionId)
}

// Initialize navigation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Navigation()
})
