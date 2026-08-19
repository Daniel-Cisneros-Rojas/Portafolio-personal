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
import { UI_TEXT } from '../config/ui'

type HeroVariant = 'primary' | 'secondary' | 'github' | 'linkedin'

type HeroLink = {
  href: string
  label: string
  variant: HeroVariant
  external: boolean
}

function SocialIcon({ kind }: { kind: 'github' | 'linkedin' }) {
  if (kind === 'github') {
    return (
      <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="social-icon">
        <path d="M12 2C6.477 2 2 6.582 2 12.253c0 4.53 2.865 8.372 6.839 9.726.5.093.682-.217.682-.482 0-.236-.008-.861-.014-1.69-2.782.609-3.369-1.343-3.369-1.343-.455-1.165-1.112-1.475-1.112-1.475-.91-.626.069-.614.069-.614 1.006.072 1.536 1.038 1.536 1.038.894 1.54 2.342 1.095 2.914.838.091-.651.35-1.094.636-1.345-2.221-.255-4.557-1.118-4.557-4.976 0-1.1.39-1.997 1.03-2.696-.103-.255-.447-1.283.098-2.673 0 0 .842-.272 2.757 1.033A9.52 9.52 0 0 1 12 6.8c.852.004 1.71.116 2.513.34 1.913-1.305 2.753-1.033 2.753-1.033.547 1.39.202 2.418.099 2.673.642.699 1.028 1.596 1.028 2.696 0 3.867-2.338 4.718-4.567 4.968.359.31.678.92.678 1.853 0 1.338-.012 2.416-.012 2.748 0 .269.179.583.689.484A10.25 10.25 0 0 0 22 12.253C22 6.582 17.523 2 12 2Z" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="social-icon">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" fill="currentColor" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export function HomePage() {
  const [expandedProjects, setExpandedProjects] = useState(false)

  const heroLinkEntries: HeroLink[] = [
    { ...UI_TEXT.hero.actions.cvSpanish, external: true },
    { ...UI_TEXT.hero.actions.cvEnglish, external: true },
    { href: personal.github, label: UI_TEXT.hero.actions.githubLabel, variant: 'github', external: true },
    { href: personal.linkedin, label: UI_TEXT.hero.actions.linkedinLabel, variant: 'linkedin', external: true },
  ]
  const heroLinks = heroLinkEntries.filter((link) => Boolean(link.href))

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <span className="brand-mark">DC</span>
          <span className="brand-name">{personal.name}</span>
        </div>

        <nav aria-label={UI_TEXT.navigation.ariaLabel} className="main-nav">
          {UI_TEXT.navigation.links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
      </header>

      <section className="hero-section" id="home">
        <div className="hero-copy">
          <p className="eyebrow">{UI_TEXT.hero.eyebrow}</p>
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

      <Section id="skills" eyebrow={UI_TEXT.sections.skills.eyebrow} title={UI_TEXT.sections.skills.title}>
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

      <Section id="projects" eyebrow={UI_TEXT.sections.projects.eyebrow} title={UI_TEXT.sections.projects.title}>
        <div className="project-grid" id="project-grid">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className={`project-card${!expandedProjects && index >= 6 ? ' project-card-hidden' : ''}`}
            >
              <div className="project-image-wrap">
                <img src={project.images[0]?.src || resolveAssetPath(UI_TEXT.projects.placeholderImagePath)} alt={project.name} />
              </div>
              <div className="project-body">
                <h3>{project.name}</h3>
                <p>{project.shortDescription}</p>
                <div className="technology-list">
                  {project.technologies.slice(0, 4).map((technology) => (
                    <TechnologyBadge key={`${project.slug}-${technology.name}`} name={technology.name} />
                  ))}
                </div>
                <div className="project-card-actions">
                  <ButtonLink href={`/projects/${project.slug}`} variant="secondary">{UI_TEXT.projects.viewProject}</ButtonLink>
                  {project.repository ? (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noreferrer"
                      className="github-link"
                      aria-label={UI_TEXT.projects.githubRepositoryAriaLabel(project.name)}
                      title={UI_TEXT.projects.githubRepositoryTitle(project.name)}
                    >
                      <SocialIcon kind="github" />
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
        {projects.length > 6 ? (
          <div className="project-toggle-row">
            <button
              type="button"
              onClick={() => setExpandedProjects((prev) => !prev)}
              className="expand-button"
              aria-expanded={expandedProjects}
              aria-controls="project-grid"
            >
              <span className="expand-icon" aria-hidden="true">{expandedProjects ? '↑' : '→'}</span>
              <span>{expandedProjects ? UI_TEXT.projects.showLess : UI_TEXT.projects.showMore}</span>
            </button>
          </div>
        ) : null}
      </Section>

      <Section id="experience" eyebrow={UI_TEXT.sections.experience.eyebrow} title={UI_TEXT.sections.experience.title}>
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

      <Section id="education" eyebrow={UI_TEXT.sections.education.eyebrow} title={UI_TEXT.sections.education.title}>
        <div className="info-list">
          {education.map((entry) => (
            <article key={`${entry.degree}-${entry.institution}`} className="info-card education-card">
              <div className="education-card-content">
                <h3>{entry.degree}</h3>
                <p>{entry.institution}</p>
                <p>{entry.period}</p>
                <p>{entry.area}</p>
              </div>
              {entry.logo ? <img className="education-logo" src={entry.logo} alt={entry.institution} /> : null}
            </article>
          ))}
        </div>
      </Section>

      <Section id="courses" eyebrow={UI_TEXT.sections.courses.eyebrow} title={UI_TEXT.sections.courses.title}>
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
                    <span>{UI_TEXT.courses.verification}</span>
                  </a>
                ) : null}
              </article>
            ))}
        </div>
      </Section>

      <Section id="achievements" eyebrow={UI_TEXT.sections.achievements.eyebrow} title={UI_TEXT.sections.achievements.title}>
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

      <Section id="contact" eyebrow={UI_TEXT.sections.contact.eyebrow} title={UI_TEXT.sections.contact.title}>
        <div className="contact-panel">
          <p className="contact-intro">{UI_TEXT.contact.intro}</p>
          <div className="contact-links-grid">
            <div className="contact-column">
              {personal.email ? (
                <CopyableContact
                  href={`mailto:${personal.email}`}
                  icon={<MailIcon />}
                  label={UI_TEXT.contact.email}
                  displayValue={personal.email}
                  copyValue={personal.email}
                />
              ) : null}
              {personal.phone ? (
                <CopyableContact
                  href={`tel:${personal.phone}`}
                  icon={<PhoneIcon />}
                  label={UI_TEXT.contact.phone}
                  displayValue={personal.phone}
                  copyValue={personal.phone}
                />
              ) : null}
            </div>
            {personal.github ? (
              <a href={personal.github} target="_blank" rel="noreferrer" className="contact-brand-link github-brand">
                <SocialIcon kind="github" />
                <span>GitHub</span>
              </a>
            ) : null}
            {personal.linkedin ? (
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="contact-brand-link linkedin-brand">
                <SocialIcon kind="linkedin" />
                <span>LinkedIn</span>
              </a>
            ) : null}
          </div>
        </div>
      </Section>
    </main>
  )
}
