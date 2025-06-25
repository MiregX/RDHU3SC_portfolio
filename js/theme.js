// Theme Management Module
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("themeToggle")
    this.currentTheme = localStorage.getItem("theme") || "light"

    this.init()
  }

  init() {
    this.setTheme(this.currentTheme)
    this.bindEvents()
  }

  bindEvents() {
    this.themeToggle.addEventListener("click", () => {
      this.toggleTheme()
    })
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
    this.currentTheme = theme
    localStorage.setItem("theme", theme)

    // Update toggle icon
    const icon = this.themeToggle.querySelector(".theme-toggle__icon")
    icon.textContent = theme === "dark" ? "☀️" : "🌙"
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light"
    this.setTheme(newTheme)
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager()
})
