import { Link, useParams } from 'react-router-dom'
import { projectBySlug } from '../data/project-registry'
import { TechnologyBadge } from '../components/skills/TechnologyBadge'

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

      <img src={project.images[0] || '/images/projects/placeholder.png'} alt={project.name} className="project-cover" />

      <section>
        <h2>Descripción</h2>
        <p>{project.description}</p>
      </section>

      <section>
        <h2>Características</h2>
        <ul>
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Tecnologías</h2>
        <div className="technology-list">
          {project.technologyNames.map((technology) => (
            <TechnologyBadge key={`${project.slug}-${technology}`} name={technology} />
          ))}
        </div>
      </section>

      {project.repository ? (
        <section>
          <h2>Repositorio</h2>
          <a href={project.repository} target="_blank" rel="noreferrer">{project.repository}</a>
        </section>
      ) : null}

      {project.images.length > 1 ? (
        <section>
          <h2>Imágenes</h2>
          <div className="gallery-grid">
            {project.images.slice(1).map((image) => (
              <img key={image} src={image} alt={`${project.name} detalle`} className="gallery-image" />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}
