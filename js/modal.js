// Modal Management Module
class ModalManager {
  constructor() {
    this.modal = document.getElementById("projectModal")
    this.modalBody = document.getElementById("modalBody")
    this.modalClose = document.getElementById("modalClose")
    this.projectCards = document.querySelectorAll(".project-card")

    this.projectData = {
      1: {
        title: "E-commerce платформа",
        description:
          "Повнофункціональний інтернет-магазин з адмін-панеллю, системою оплати, управлінням товарами та замовленнями.",
        technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
        features: [
          "Каталог товарів з фільтрацією та пошуком",
          "Кошик та система замовлень",
          "Інтеграція з платіжними системами",
          "Адмін-панель для управління",
          "Responsive дизайн",
        ],
        github: "https://github.com/ivan-ivanenko/ecommerce-platform",
        demo: "https://ecommerce-demo.example.com",
      },
      2: {
        title: "Корпоративний сайт",
        description: "Сучасний корпоративний сайт з CMS системою для управління контентом та SEO оптимізацією.",
        technologies: ["Next.js", "TypeScript", "Strapi", "PostgreSQL"],
        features: [
          "CMS для управління контентом",
          "SEO оптимізація",
          "Багатомовність",
          "Блог система",
          "Контактні форми",
        ],
        github: "https://github.com/ivan-ivanenko/corporate-website",
        demo: "https://corporate-demo.example.com",
      },
      3: {
        title: "Мобільний додаток",
        description: "React Native додаток для управління завданнями з синхронізацією між пристроями.",
        technologies: ["React Native", "Firebase", "Redux", "AsyncStorage"],
        features: [
          "Створення та управління завданнями",
          "Синхронізація між пристроями",
          "Push-сповіщення",
          "Офлайн режим",
          "Темна тема",
        ],
        github: "https://github.com/ivan-ivanenko/task-manager-app",
        demo: "https://play.google.com/store/apps/details?id=com.taskmanager",
      },
      4: {
        title: "Веб-додаток аналітики",
        description: "Dashboard для аналізу даних з інтерактивними графіками та звітами в реальному часі.",
        technologies: ["Vue.js", "D3.js", "Express", "Socket.io", "Chart.js"],
        features: [
          "Інтерактивні графіки та діаграми",
          "Реальний час оновлення",
          "Експорт звітів",
          "Фільтрація та сортування",
          "Користувацькі дашборди",
        ],
        github: "https://github.com/ivan-ivanenko/analytics-dashboard",
        demo: "https://analytics-demo.example.com",
      },
    }

    this.init()
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    // Open modal on project card click
    this.projectCards.forEach((card) => {
      card.addEventListener("click", () => {
        const projectId = card.getAttribute("data-project")
        this.openModal(projectId)
      })
    })

    // Close modal events
    this.modalClose.addEventListener("click", () => {
      this.closeModal()
    })

    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal()
      }
    })

    // Close modal on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("show")) {
        this.closeModal()
      }
    })
  }

  openModal(projectId) {
    const project = this.projectData[projectId]
    if (!project) return

    this.modalBody.innerHTML = this.generateModalContent(project)
    this.modal.classList.add("show")
    document.body.style.overflow = "hidden"
  }

  closeModal() {
    this.modal.classList.remove("show")
    document.body.style.overflow = ""
  }

  generateModalContent(project) {
    return `
            <div class="modal-project">
                <h2 class="modal-project__title">${project.title}</h2>
                <p class="modal-project__description">${project.description}</p>
                
                <div class="modal-project__section">
                    <h3>Технології:</h3>
                    <div class="modal-project__tech">
                        ${project.technologies.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
                    </div>
                </div>
                
                <div class="modal-project__section">
                    <h3>Основні функції:</h3>
                    <ul class="modal-project__features">
                        ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
                    </ul>
                </div>
                
                <div class="modal-project__links">
                    <a href="${project.github}" target="_blank" class="modal-project__link">
                        GitHub
                    </a>
                    <a href="${project.demo}" target="_blank" class="modal-project__link modal-project__link--primary">
                        Демо
                    </a>
                </div>
            </div>
            
            <style>
                .modal-project__title {
                    font-size: var(--font-size-2xl);
                    margin-bottom: var(--spacing-md);
                    color: var(--text-primary);
                }
                
                .modal-project__description {
                    color: var(--text-secondary);
                    margin-bottom: var(--spacing-lg);
                    line-height: 1.6;
                }
                
                .modal-project__section {
                    margin-bottom: var(--spacing-lg);
                }
                
                .modal-project__section h3 {
                    font-size: var(--font-size-lg);
                    margin-bottom: var(--spacing-sm);
                    color: var(--text-primary);
                }
                
                .modal-project__tech {
                    display: flex;
                    flex-wrap: wrap;
                    gap: var(--spacing-xs);
                }
                
                .tech-tag {
                    background-color: var(--primary-color);
                    color: white;
                    padding: 4px var(--spacing-xs);
                    border-radius: 4px;
                    font-size: var(--font-size-sm);
                    font-weight: 500;
                }
                
                .modal-project__features {
                    list-style: none;
                    padding: 0;
                }
                
                .modal-project__features li {
                    padding: var(--spacing-xs) 0;
                    color: var(--text-secondary);
                    position: relative;
                    padding-left: var(--spacing-md);
                }
                
                .modal-project__features li::before {
                    content: '✓';
                    position: absolute;
                    left: 0;
                    color: var(--primary-color);
                    font-weight: bold;
                }
                
                .modal-project__links {
                    display: flex;
                    gap: var(--spacing-md);
                    margin-top: var(--spacing-xl);
                }
                
                .modal-project__link {
                    padding: var(--spacing-sm) var(--spacing-lg);
                    border: 1px solid var(--border-color);
                    border-radius: 6px;
                    text-decoration: none;
                    color: var(--text-primary);
                    transition: var(--transition);
                    font-weight: 500;
                }
                
                .modal-project__link:hover {
                    background-color: var(--bg-secondary);
                }
                
                .modal-project__link--primary {
                    background-color: var(--primary-color);
                    color: white;
                    border-color: var(--primary-color);
                }
                
                .modal-project__link--primary:hover {
                    background-color: var(--secondary-color);
                }
            </style>
        `
  }
}

// Initialize modal manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ModalManager()
})
