// Form Management Module
class FormManager {
  constructor() {
    this.form = document.getElementById("contactForm")
    this.successMessage = document.getElementById("successMessage")
    this.formData = this.loadFormData()

    this.init()
  }

  init() {
    this.bindEvents()
    this.populateForm()
  }

  bindEvents() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleSubmit()
    })

    // Save form data on input
    const inputs = this.form.querySelectorAll("input, textarea")
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this.saveFormData()
      })
    })
  }

  handleSubmit() {
    if (this.validateForm()) {
      this.submitForm()
    }
  }

  validateForm() {
    let isValid = true
    const formData = new FormData(this.form)

    // Clear previous errors
    this.clearErrors()

    // Validate name
    const name = formData.get("name").trim()
    if (!name) {
      this.showError("nameError", "Ім'я є обов'язковим полем")
      isValid = false
    } else if (name.length < 2) {
      this.showError("nameError", "Ім'я повинно містити принаймні 2 символи")
      isValid = false
    }

    // Validate email
    const email = formData.get("email").trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      this.showError("emailError", "Email є обов'язковим полем")
      isValid = false
    } else if (!emailRegex.test(email)) {
      this.showError("emailError", "Введіть коректний email")
      isValid = false
    }

    // Validate message
    const message = formData.get("message").trim()
    if (!message) {
      this.showError("messageError", "Повідомлення є обов'язковим полем")
      isValid = false
    } else if (message.length < 10) {
      this.showError("messageError", "Повідомлення повинно містити принаймні 10 символів")
      isValid = false
    }

    return isValid
  }

  showError(elementId, message) {
    const errorElement = document.getElementById(elementId)
    errorElement.textContent = message
  }

  clearErrors() {
    const errorElements = this.form.querySelectorAll(".error-message")
    errorElements.forEach((element) => {
      element.textContent = ""
    })
  }

  submitForm() {
    // Simulate form submission
    const submitButton = this.form.querySelector(".contact__submit")
    const originalText = submitButton.textContent

    submitButton.textContent = "Надсилання..."
    submitButton.disabled = true

    setTimeout(() => {
      this.showSuccessMessage()
      this.clearForm()
      this.clearFormData()

      submitButton.textContent = originalText
      submitButton.disabled = false
    }, 2000)
  }

  showSuccessMessage() {
    this.successMessage.classList.add("show")

    setTimeout(() => {
      this.successMessage.classList.remove("show")
    }, 5000)
  }

  clearForm() {
    this.form.reset()
  }

  saveFormData() {
    const formData = new FormData(this.form)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    }

    localStorage.setItem("contactFormData", JSON.stringify(data))
  }

  loadFormData() {
    const savedData = localStorage.getItem("contactFormData")
    return savedData ? JSON.parse(savedData) : {}
  }

  populateForm() {
    if (this.formData.name) {
      document.getElementById("name").value = this.formData.name
    }
    if (this.formData.email) {
      document.getElementById("email").value = this.formData.email
    }
    if (this.formData.message) {
      document.getElementById("message").value = this.formData.message
    }
  }

  clearFormData() {
    localStorage.removeItem("contactFormData")
  }
}

// Initialize form manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new FormManager()
})
