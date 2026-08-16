# Contenido y Recursos del Portafolio

Este directorio contiene la información fuente, recursos visuales, documentos y
Skills utilizados para construir el portafolio profesional de Daniel Cisneros
Rojas.

El contenido está separado de la lógica de la aplicación para facilitar su
mantenimiento y permitir que el portafolio evolucione sin modificar
innecesariamente el código.

---

## Estructura

```text
docs/
├── cv/
│   ├── Daniel_Cisneros_Rojas_CV_Resume_ESP.pdf
│   └── Daniel_Cisneros_Rojas_CV_Resume_ENG.pdf
│
├── images/
│   ├── courses/
│   ├── projects/
│   └── ...
│
├── projects/
│   ├── proyecto-1.md
│   ├── proyecto-2.md
│   └── ...
│
├── skills/
│   ├── design-system/
│   │   └── SKILL.md
│   ├── content-integrity/
│   │   └── SKILL.md
│   ├── ui-ux/
│   │   └── SKILL.md
│   ├── responsive-design/
│   │   └── SKILL.md
│   ├── accessibility/
│   │   └── SKILL.md
│   ├── react-development/
│   │   └── SKILL.md
│   └── technology-icons/
│       └── SKILL.md
│
├── personal.md
├── profile.md
├── experience.md
├── education.md
├── courses.md
├── achievements.md
└── skills.md
````

---

# Contenido

Los archivos Markdown representan la fuente principal y oficial del contenido
mostrado en el portafolio.

## Información Personal

* `personal.md` — Información personal, contacto y enlaces profesionales.
* `profile.md` — Perfil profesional.
* `experience.md` — Experiencia profesional.
* `education.md` — Formación académica.
* `courses.md` — Formación complementaria y credenciales.
* `achievements.md` — Logros y participaciones.
* `skills.md` — Tecnologías, herramientas y competencias técnicas.

## Proyectos

Los proyectos se encuentran en:

`docs/projects/`

Cada proyecto debe tener su propio archivo Markdown.

Los archivos pueden incluir:

* Nombre.
* Categoría.
* Tecnologías.
* Descripción corta.
* Descripción.
* Características.
* Arquitectura.
* Repositorio.
* Video.
* Imágenes.

No combinar todos los proyectos en un único archivo.

---

# Imágenes

Los recursos visuales se encuentran en:

`docs/images/`

Las imágenes deben organizarse según su propósito, por ejemplo:

```text
docs/images/
├── courses/
├── projects/
└── ...
```

Las rutas utilizadas dentro de los archivos Markdown deben respetarse.

No duplicar imágenes innecesariamente ni crear rutas alternativas.

Las imágenes pueden tener diferentes dimensiones y proporciones. La interfaz
debe adaptarlas mediante CSS manteniendo su proporción, evitando deformaciones
y conservando una presentación visual consistente.

Las imágenes de proyectos deben utilizarse exclusivamente para el proyecto al
que pertenecen, salvo que el contenido indique explícitamente lo contrario.

---

# Currículums

Los CV oficiales se encuentran en:

`docs/cv/`

### Español

`docs/cv/Daniel_Cisneros_Rojas_CV_Resume_ESP.pdf`

### Inglés

`docs/cv/Daniel_Cisneros_Rojas_CV_Resume_ENG.pdf`

La interfaz debe proporcionar acceso diferenciado:

* `Ver CV en español`
* `View CV in English`

Los PDFs deben utilizarse directamente y no modificarse desde la aplicación.

---

# Prioridad de Proyectos

La prioridad determina únicamente el protagonismo visual dentro del
portafolio.

## Proyectos Destacados

1. Plataforma de Reciclaje Inteligente
2. HanziPlay&Learn
3. Backend .NET con Clean Architecture
4. Sistema de Visualización 3D y Detección de Colisiones
5. Organizador de Horarios FCC
6. Sistema de Detección de Intrusos

## Proyectos Adicionales

7. Sistema de Reseñas y Notificaciones
8. Breakout Game
9. Space Game
10. Sistema de Préstamos Bibliotecarios

Los proyectos destacados deben recibir mayor protagonismo en la página
principal. Los proyectos adicionales deben permanecer accesibles.

---

# Tecnologías e Iconos

Las tecnologías deben mostrarse mediante logos reconocibles obtenidos mediante
una librería especializada o API.

La resolución debe seguir el sistema definido en:

`docs/skills/technology-icons/SKILL.md`

Los iconos:

* Deben corresponder únicamente a tecnologías declaradas en cada proyecto.
* No deben inventarse ni inferirse.
* Deben conservar, cuando sea apropiado, los colores característicos de cada
  tecnología.
* Deben mostrar también el nombre de la tecnología.
* Deben mantener proporciones y tamaños consistentes.
* Deben contar con fallback cuando un icono no esté disponible.

No almacenar imágenes individuales de tecnologías cuando puedan obtenerse
mediante el sistema de iconos utilizado.

---

# Skills

Las Skills contienen instrucciones especializadas para los agentes de IA y
deben consultarse durante el desarrollo.

No forman parte del contenido visible del portafolio.

## Orden de aplicación

### 1. Design System

`docs/skills/design-system/SKILL.md`

Define:

* Paleta Gossamer.
* Tipografía Titillium Web.
* Tokens y reglas visuales.

### 2. Content Integrity

`docs/skills/content-integrity/SKILL.md`

Define las reglas para preservar la fidelidad del contenido y evitar
información inventada o alterada.

### 3. UI/UX

`docs/skills/ui-ux/SKILL.md`

Define criterios de interfaz, jerarquía visual, experiencia de usuario,
animaciones y transiciones.

### 4. Responsive Design

`docs/skills/responsive-design/SKILL.md`

Define el comportamiento responsive para desktop, tablet y mobile.

### 5. Accessibility

`docs/skills/accessibility/SKILL.md`

Define las prácticas de accesibilidad de la aplicación.

### 6. React Development

`docs/skills/react-development/SKILL.md`

Define las prácticas de desarrollo con React, Vite y TypeScript.

### 7. Technology Icons

`docs/skills/technology-icons/SKILL.md`

Define la resolución, presentación, identidad visual y fallback de los iconos
tecnológicos.

---

# Prioridad de las Skills

Cuando varias Skills afecten una misma decisión, aplicar las reglas de forma
complementaria y evitar duplicar implementaciones.

Priorizar especialmente:

1. Integridad del contenido.
2. Accesibilidad.
3. Design System.
4. UI/UX.
5. Responsive Design.
6. React Development.
7. Technology Icons.

Las Skills deben utilizarse como reglas de desarrollo y no como contenido que
deba mostrarse al usuario final.

---

# Reglas Generales

* Los archivos Markdown son la fuente principal del contenido.
* No inventar información.
* No modificar información para completar campos faltantes.
* No asumir tecnologías.
* No inventar enlaces, métricas, funcionalidades o credenciales.
* Respetar las rutas existentes de imágenes y documentos.
* No duplicar recursos innecesariamente.
* Mantener separación entre contenido, lógica y presentación.
* Mantener el portafolio responsive.
* Priorizar accesibilidad y rendimiento.
* Mantener una identidad visual consistente.
* Evitar saturación visual y exceso de información.
* Evitar efectos o animaciones que parezcan generados artificialmente.
* Priorizar una apariencia de producto profesional real.
* Mantener el código preparado para producción y fácil de mantener.

---

# Aplicación

El portafolio está desarrollado con:

* React.
* Vite.
* TypeScript.

El proyecto está destinado a producción y será desplegado mediante Netlify.

Las decisiones de implementación deben mantener compatibilidad con este
entorno y seguir las prácticas definidas en las Skills correspondientes.

````

### Un cambio importante respecto a tu README anterior

Yo **sí eliminaría del README de `docs/` toda la especificación detallada de UI, accesibilidad, React, responsive, etc.** porque ahora esas responsabilidades pertenecen a las Skills.

La división queda mucho más profesional:

```text
docs/
│
├── *.md                    ← QUÉ debe mostrar el portafolio
│
├── projects/               ← CONTENIDO de proyectos
│
├── images/                 ← RECURSOS visuales
│
├── cv/                     ← DOCUMENTOS oficiales
│
├──icono.png                ←  icono del sitio
│
└── skills/                 ← CÓMO debe construirlo el agente
