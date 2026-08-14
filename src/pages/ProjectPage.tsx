import { Link, useParams } from 'react-router-dom'
import { projectBySlug } from '../content/projects'
import { TechnologyBadge } from '../components/skills/TechnologyBadge'
import { resolveAssetPath } from '../services/assetResolver'

function GitHubProjectIcon() {
  return (
    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="social-icon">
      <path d="M12 2C6.477 2 2 6.582 2 12.253c0 4.53 2.865 8.372 6.839 9.726.5.093.682-.217.682-.482 0-.236-.008-.861-.014-1.69-2.782.609-3.369-1.343-3.369-1.343-.455-1.165-1.112-1.475-1.112-1.475-.91-.626.069-.614.069-.614 1.006.072 1.536 1.038 1.536 1.038.894 1.54 2.342 1.095 2.914.838.091-.651.35-1.094.636-1.345-2.221-.255-4.557-1.118-4.557-4.976 0-1.1.39-1.997 1.03-2.696-.103-.255-.447-1.283.098-2.673 0 0 .842-.272 2.757 1.033A9.52 9.52 0 0 1 12 6.8c.852.004 1.71.116 2.513.34 1.913-1.305 2.753-1.033 2.753-1.033.547 1.39.202 2.418.099 2.673.642.699 1.028 1.596 1.028 2.696 0 3.867-2.338 4.718-4.567 4.968.359.31.678.92.678 1.853 0 1.338-.012 2.416-.012 2.748 0 .269.179.583.689.484A10.25 10.25 0 0 0 22 12.253C22 6.582 17.523 2 12 2Z" fill="currentColor" />
    </svg>
  )
}

export function ProjectPage() {
  const { slug } = useParams()
  const project = slug ? projectBySlug[slug] : undefined

  if (!project) {
    return (
      <main className="page-shell narrow">
        <h1>Proyecto no encontrado</h1>
        <Link to="/">Volver al inicio</Link>
      </main>
    )
  }

  const coverImage = project.images.length > 0 ? project.images[0].src : '/images/projects/placeholder.png'

  return (
    <main className="page-shell narrow">
      <Link to="/" className="back-link">← Volver</Link>
      <header className="project-header">
        <h1>{project.name}</h1>
        <div className="project-tags">
          {project.category.map((category) => (
            <span key={`${project.slug}-${category}`} className="badge">{category}</span>
          ))}
        </div>
      </header>

      <img src={resolveAssetPath(coverImage)} alt={project.name} className="project-cover" />

      {project.shortDescription ? (
        <section>
          <h2>Resumen</h2>
          <p>{project.shortDescription}</p>
        </section>
      ) : null}

      {project.description ? (
        <section>
          <h2>Descripción</h2>
          <p>{project.description}</p>
        </section>
      ) : null}

      {project.features.length > 0 ? (
        <section>
          <h2>Características</h2>
          <ul>
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.architecture ? (
        <section>
          <h2>Arquitectura</h2>
          <p>{project.architecture}</p>
        </section>
      ) : null}

      {project.sections && project.sections.length > 0 ? (
        <section>
          {project.sections.map((section) => (
            <div key={`${project.slug}-${section.heading}`}>
              <h2>{section.heading}</h2>
              <p>{section.content}</p>
            </div>
          ))}
        </section>
      ) : null}

      {project.technologies.length > 0 ? (
        <section>
          <h2>Tecnologías</h2>
          <div className="technology-list">
            {project.technologies.map((technology) => (
              <TechnologyBadge key={`${project.slug}-${technology.name}`} name={technology.name} />
            ))}
          </div>
        </section>
      ) : null}

      {project.repository ? (
        <section>
          <h2>Repositorio</h2>
          <a className="button-link github" href={project.repository} target="_blank" rel="noreferrer">
            <GitHubProjectIcon />
            <span>Ver repositorio</span>
          </a>
        </section>
      ) : null}

      {project.demo ? (
        <section>
          <h2>Demo</h2>
          <a href={project.demo} target="_blank" rel="noreferrer">{project.demo}</a>
        </section>
      ) : null}

      {project.video ? (
        <section>
          <h2>Video</h2>
          <a href={project.video} target="_blank" rel="noreferrer">{project.video}</a>
        </section>
      ) : null}

      {project.credentials && project.credentials.length > 0 ? (
        <section>
          <h2>Credenciales</h2>
          <ul>
            {project.credentials.map((credential) => (
              <li key={credential}><a href={credential} target="_blank" rel="noreferrer">{credential}</a></li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.images.length > 1 ? (
        <section>
          <h2>Imágenes</h2>
          <div className="gallery-grid">
            {project.images.slice(1).map((image) => (
              <img key={`${project.slug}-${image.src}`} src={resolveAssetPath(image.src)} alt={image.alt ?? `${project.name} detalle`} className="gallery-image" />
            ))}
          </div>
        </section>
      ) : null}

    </main>
  )
}
