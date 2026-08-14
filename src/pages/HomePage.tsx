import { useState } from 'react'
import { ButtonLink } from '../components/common/ButtonLink'
import { CopyableContact } from '../components/common/CopyableContact'
import { Section } from '../components/common/Section'
import { TechnologyBadge } from '../components/skills/TechnologyBadge'
import { achievements } from '../content/achievements'
import { courses } from '../content/courses'
import { education } from '../content/education'
import { experience } from '../content/experience'
import { personal } from '../content/personal'
import { profileSummary } from '../content/profile'
import { projects } from '../content/projects'
import { skills } from '../content/skills'
import { resolveAssetPath } from '../services/assetResolver'

function SocialIcon({ kind }: { kind: 'github' | 'linkedin' }) {
  if (kind === 'github') {
    return (
      <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="social-icon">
        <path d="M12 2C6.477 2 2 6.582 2 12.253c0 4.53 2.865 8.372 6.839 9.726.5.093.682-.217.682-.482 0-.236-.008-.861-.014-1.69-2.782.609-3.369-1.343-3.369-1.343-.455-1.165-1.112-1.475-1.112-1.475-.91-.626.069-.614.069-.614 1.006.072 1.536 1.038 1.536 1.038.894 1.54 2.342 1.095 2.914.838.091-.651.35-1.094.636-1.345-2.221-.255-4.557-1.118-4.557-4.976 0-1.1.39-1.997 1.03-2.696-.103-.255-.447-1.283.098-2.673 0 0 .842-.272 2.757 1.033A9.52 9.52 0 0 1 12 6.8c.852.004 1.71.116 2.513.34 1.913-1.305 2.753-1.033 2.753-1.033.547 1.39.202 2.418.099 2.673.642.699 1.028 1.596 1.028 2.696 0 3.867-2.338 4.718-4.567 4.968.359.31.678.92.678 1.853 0 1.338-.012 2.416-.012 2.748 0 .269.179.583.689.484A10.25 10.25 0 0 0 22 12.253C22 6.582 17.523 2 12 2Z" fill="currentColor"/>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="social-icon">
      <path d="M6.94 8.5A2.5 2.5 0 1 1 6.94 3.5a2.5 2.5 0 0 1 0 5Zm-2.02 1.8h4.04V20H4.92V10.3Zm7.26 0h3.88v1.3h.06c.54-.99 1.86-2.03 3.82-2.03 4.08 0 4.83 2.68 4.83 6.16V20h-4.04v-18.7c0-1.8-.03-4.12-2.52-4.12-2.52 0-2.9 1.97-2.9 3.98V20h-4.05V10.3Z" fill="currentColor"/>
    </svg>
  )
}

export function HomePage() {
  const [expandedProjects, setExpandedProjects] = useState(false)

  const heroLinks: Array<{
    href: string
    label: string
    variant: 'primary' | 'secondary' | 'github' | 'linkedin'
    external: boolean
  }> = [
    { href: '/cv/Daniel_Cisneros_Rojas_CV_Resume_ESP.pdf', label: 'Ver CV en español', variant: 'primary', external: true },
    { href: '/cv/Daniel_Cisneros_Rojas_CV_Resume_ENG.pdf', label: 'View CV in English', variant: 'secondary', external: true },
    { href: personal.github, label: 'GitHub', variant: 'github', external: true },
    { href: personal.linkedin, label: 'LinkedIn', variant: 'linkedin', external: true },
  ].filter((link): link is { href: string; label: string; variant: 'primary' | 'secondary' | 'github' | 'linkedin'; external: boolean } => Boolean(link.href))

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <span className="brand-mark">DC</span>
          <span className="brand-name">Daniel Cisneros</span>
        </div>

        <nav aria-label="Navegación principal" className="main-nav">
          <a href="#projects">Proyectos</a>
          <a href="#experience">Experiencia</a>
          <a href="#education">Educación</a>
          <a href="#contact">Contacto</a>
        </nav>
      </header>

      <section className="hero-section" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Desarrollador de software</p>
          <h1>{personal.name}</h1>
          <p className="headline">{personal.title}</p>
          <p className="lead">{profileSummary}</p>

          <div className="hero-actions">
            {heroLinks.map((link) => (
              <ButtonLink key={link.label} href={link.href} variant={link.variant} external={link.external}>
                {link.variant === 'github' ? (
                  <>
                    <SocialIcon kind="github" />
                    <span>{link.label}</span>
                  </>
                ) : link.variant === 'linkedin' ? (
                  <>
                    <SocialIcon kind="linkedin" />
                    <span>{link.label}</span>
                  </>
                ) : (
                  link.label
                )}
              </ButtonLink>
            ))}
          </div>
        </div>

        <div className="hero-card">
          <img src={resolveAssetPath(personal.photo)} alt={personal.name} />
        </div>
      </section>

      <Section id="skills" eyebrow="Skills" title="Tecnologías y competencias">
        <div className="skills-groups">
          {skills.map((group) => (
            <div key={group.title} className="skill-group">
              <h3>{group.title}</h3>
              <div className="technology-list">
                {group.items.map((skill) => (
                  <TechnologyBadge key={`${group.title}-${skill.name}`} name={skill.name} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="projects" eyebrow="Proyectos" title="Proyectos destacados">
        <div className="project-grid">
          {projects.slice(0, 6).map((project) => (
            <article key={project.slug} className="project-card">
              <div className="project-image-wrap">
                <img src={project.images[0]?.src || resolveAssetPath('/images/projects/placeholder.png')} alt={project.name} />
              </div>
              <div className="project-body">
                <h3>{project.name}</h3>
                <p>{project.shortDescription}</p>
                <div className="technology-list">
                  {project.technologies.slice(0, 4).map((technology) => (
                    <TechnologyBadge key={`${project.slug}-${technology.name}`} name={technology.name} />
                  ))}
                </div>
                <ButtonLink href={`/projects/${project.slug}`} variant="secondary">Ver proyecto</ButtonLink>
              </div>
            </article>
          ))}
          {!expandedProjects && projects.length > 6 && (
            <article className="project-card project-card-expand">
              <button
                onClick={() => setExpandedProjects(true)}
                className="expand-button"
                aria-label="Ver más proyectos"
              >
                <span className="expand-icon" aria-hidden="true">→</span>
                <span>Ver más</span>
              </button>
            </article>
          )}
        </div>
        {expandedProjects && projects.length > 6 && (
          <div className="project-grid">
            {projects.slice(6).map((project) => (
              <article key={project.slug} className="project-card">
                <div className="project-image-wrap">
                  <img src={project.images[0]?.src || resolveAssetPath('/images/projects/placeholder.png')} alt={project.name} />
                </div>
                <div className="project-body">
                  <h3>{project.name}</h3>
                  <p>{project.shortDescription}</p>
                  <div className="technology-list">
                    {project.technologies.slice(0, 4).map((technology) => (
                      <TechnologyBadge key={`${project.slug}-${technology.name}`} name={technology.name} />
                    ))}
                  </div>
                  <ButtonLink href={`/projects/${project.slug}`} variant="secondary">Ver proyecto</ButtonLink>
                </div>
              </article>
            ))}
            <article className="project-card project-card-collapse">
              <button
                onClick={() => setExpandedProjects(false)}
                className="collapse-button"
                aria-label="Ver menos proyectos"
              >
                <span className="collapse-icon" aria-hidden="true">↑</span>
                <span>Ver menos</span>
              </button>
            </article>
          </div>
        )}
      </Section>

      <Section id="experience" eyebrow="Experiencia" title="Trayectoria profesional">
        <div className="timeline">
          {experience.map((entry) => (
            <article key={`${entry.company}-${entry.role}`} className="timeline-item">
              {entry.logo ? (
                <div className="timeline-item-logo">
                  <img src={entry.logo} alt={entry.company} />
                </div>
              ) : null}
              <div className="timeline-item-content">
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
              </div>
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
          {courses
            .filter((course) => course.title || course.institution || course.type || course.badge || course.credential || course.verification)
            .map((course) => (
              <article key={`${course.title}-${course.institution}`} className="course-card">
                {course.badge ? <img src={resolveAssetPath(course.badge)} alt={course.title || course.institution} /> : null}
                <h3>{course.title}</h3>
                <p>{course.institution}</p>
                <p>{course.type}</p>
                {course.verification ? (
                  <a className="course-verification" href={course.verification} target="_blank" rel="noreferrer">
                    <span className="verification-icon" aria-hidden="true">✓</span>
                    <span>Verificación</span>
                  </a>
                ) : null}
              </article>
            ))}
        </div>
      </Section>

      <Section id="achievements" eyebrow="Logros" title="Participaciones y reconocimientos">
        <div className="achievement-grid">
          {achievements.map((achievement) => (
            <article key={`${achievement.title}-${achievement.year ?? 'sin-año'}`} className="achievement-item">
              <h3>{achievement.title}</h3>
              <p>{achievement.detailLabel}</p>
              <span>{achievement.year}</span>
            </article>
          ))}
        </div>
      </Section>

      <Section id="contact" eyebrow="Contacto" title="Hablemos">
        <div className="contact-list">
          {personal.email ? (
            <CopyableContact
              href={`mailto:${personal.email}`}
              icon={<span>✉</span>}
              label="Email"
              displayValue={personal.email}
              copyValue={personal.email}
            />
          ) : null}
          {personal.phone ? (
            <CopyableContact
              href={`tel:${personal.phone}`}
              icon={<span>☎</span>}
              label="Teléfono"
              displayValue={personal.phone}
              copyValue={personal.phone}
            />
          ) : null}
          {personal.linkedin ? (
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className="contact-item social-contact linkedin-contact">
              <span className="contact-icon" aria-hidden="true"><SocialIcon kind="linkedin" /></span>
              <span>
                <strong>LinkedIn</strong>
                <small>{personal.linkedin.replace('https://', '').replace('http://', '')}</small>
              </span>
            </a>
          ) : null}
          {personal.github ? (
            <a href={personal.github} target="_blank" rel="noreferrer" className="contact-item social-contact github-contact">
              <span className="contact-icon" aria-hidden="true"><SocialIcon kind="github" /></span>
              <span>
                <strong>GitHub</strong>
                <small>{personal.github.replace('https://', '').replace('http://', '')}</small>
              </span>
            </a>
          ) : null}
        </div>
      </Section>
    </main>
  )
}
