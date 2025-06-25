// Main Application Module
class PortfolioApp {
  constructor() {
    this.modules = {}
    this.init()
  }

  init() {
    this.initializeModules()
    this.bindGlobalEvents()
    this.showLoadingComplete()
  }

  initializeModules() {
    // All modules are initialized in their respective files
    console.log("Portfolio application initialized")
  }

  bindGlobalEvents() {
    // Global keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      // Toggle theme with Ctrl/Cmd + D
      if ((e.ctrlKey || e.metaKey) && e.key === "d") {
        e.preventDefault()
        const themeToggle = document.getElementById("themeToggle")
        if (themeToggle) {
          themeToggle.click()
        }
      }
    })

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          const headerHeight = document.getElementById("header").offsetHeight
          const targetPosition = target.offsetTop - headerHeight

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  }

  showLoadingComplete() {
    // Add a class to body when everything is loaded
    window.addEventListener("load", () => {
      document.body.classList.add("loaded")
    })
  }

  // Utility methods
  static debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  static throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PortfolioApp()
})

// Add some additional CSS for loading state
const additionalStyles = `
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    /* Improve focus styles for accessibility */
    *:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--bg-secondary);
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--primary-color);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: var(--secondary-color);
    }
`

// Inject additional styles
const styleSheet = document.createElement("style")
styleSheet.textContent = additionalStyles
document.head.appendChild(styleSheet)
