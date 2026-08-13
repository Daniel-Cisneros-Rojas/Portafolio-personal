import { ButtonLink } from '../components/common/ButtonLink'
import { Section } from '../components/common/Section'
import { TechnologyBadge } from '../components/skills/TechnologyBadge'
import { achievements, courses, education, experiences, personalProfile, profileSummary } from '../data/portfolio'
import { projects } from '../data/project-registry'

export function HomePage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <span className="brand-mark">DC</span>
          <span className="brand-name">Daniel Cisneros</span>
        </div>

        <nav aria-label="Navegación principal" className="main-nav">
          <a href="#about">Perfil</a>
          <a href="#projects">Proyectos</a>
          <a href="#experience">Experiencia</a>
          <a href="#education">Educación</a>
          <a href="#contact">Contacto</a>
        </nav>
      </header>

      <section className="hero-section" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Desarrollador de software</p>
          <h1>{personalProfile.name}</h1>
          <p className="headline">{personalProfile.title}</p>
          <p className="lead">{profileSummary}</p>

          <div className="hero-actions">
            <ButtonLink href="/cv/Daniel_Cisneros_Rojas_CV_Resume_ESP.pdf" variant="primary" external>
              Ver CV en español
            </ButtonLink>
            <ButtonLink href="/cv/Daniel_Cisneros_Rojas_CV_Resume_ENG.pdf" variant="secondary" external>
              View CV in English
            </ButtonLink>
          </div>
        </div>

        <div className="hero-card">
          <img src={personalProfile.photo} alt={personalProfile.name} />
        </div>
      </section>

      <Section id="about" eyebrow="Perfil" title="Sobre mí">
        <p className="section-text">{profileSummary}</p>
      </Section>

      <Section id="projects" eyebrow="Proyectos" title="Proyectos destacados">
        <div className="project-grid">
          {projects.slice(0, 6).map((project) => (
            <article key={project.slug} className="project-card">
              <div className="project-image-wrap">
                <img src={project.images[0] || '/images/projects/placeholder.png'} alt={project.name} />
              </div>
              <div className="project-body">
                <h3>{project.name}</h3>
                <p>{project.shortDescription}</p>
                <div className="technology-list">
                  {project.technologyNames.slice(0, 4).map((technology) => (
                    <TechnologyBadge key={`${project.slug}-${technology}`} name={technology} />
                  ))}
                </div>
                <ButtonLink href={`/projects/${project.slug}`} variant="secondary">Ver proyecto</ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="experience" eyebrow="Experiencia" title="Trayectoria profesional">
        <div className="timeline">
          {experiences.map((entry) => (
            <article key={`${entry.company}-${entry.role}`} className="timeline-item">
              <div className="timeline-header">
                <h3>{entry.role}</h3>
                <span>{entry.period}</span>
              </div>
              <p className="timeline-company">{entry.company}</p>
              <ul>
                {entry.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section id="education" eyebrow="Formación" title="Educación">
        <div className="info-list">
          {education.map((entry) => (
            <article key={`${entry.degree}-${entry.institution}`} className="info-card">
              <h3>{entry.degree}</h3>
              <p>{entry.institution}</p>
              <p>{entry.period}</p>
              <p>{entry.area}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="courses" eyebrow="Cursos" title="Formación complementaria">
        <div className="course-grid">
          {courses.map((course) => (
            <article key={`${course.title}-${course.institution}`} className="course-card">
              <img src={course.badge} alt={course.title} />
              <h3>{course.title}</h3>
              <p>{course.institution}</p>
              <p>{course.type}</p>
              {course.credential ? (
                <a href={course.credential} target="_blank" rel="noreferrer">Credencial</a>
              ) : null}
            </article>
          ))}
        </div>
      </Section>

      <Section id="achievements" eyebrow="Logros" title="Participaciones y reconocimientos">
        <div className="achievement-grid">
          {achievements.map((achievement) => (
            <article key={`${achievement.title}-${achievement.year}`} className="achievement-item">
              <h3>{achievement.title}</h3>
              <p>{achievement.detailLabel}</p>
              <span>{achievement.year}</span>
            </article>
          ))}
        </div>
      </Section>

      <Section id="contact" eyebrow="Contacto" title="Hablemos">
        <div className="contact-list">
          <a href={`mailto:${personalProfile.email}`}>{personalProfile.email}</a>
          <a href={`tel:${personalProfile.phone}`}>{personalProfile.phone}</a>
          <a href={personalProfile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={personalProfile.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </Section>
    </main>
  )
}
