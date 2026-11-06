import { useEffect, useState } from 'react'
import {
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom'
import { progressStatusReviewedOn } from './data/systemProgress'
import { systemBySlug, systems } from './data/systems'

type Theme = 'diorama' | 'high-contrast'

function systemPath(slug: string) {
  return `/${slug}`
}

function TallyMark({ decorative = false }: { decorative?: boolean }) {
  return (
    <span
      className="tally-mark"
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : 'Five tally marks'}
    >
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  )
}

function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: Theme
  onToggle: () => void
}) {
  const isHighContrast = theme === 'high-contrast'

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-pressed={isHighContrast}
      onClick={onToggle}
    >
      <span className="theme-toggle__swatch" aria-hidden="true" />
      <span>{isHighContrast ? 'Diorama theme' : 'High contrast'}</span>
    </button>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

function SiteShell() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = window.localStorage.getItem('mordecai-theme')
    return savedTheme === 'high-contrast' ? 'high-contrast' : 'diorama'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('mordecai-theme', theme)
  }, [theme])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-bar">
          <Link className="wordmark" to="/" aria-label="Project Mordecai home">
            <TallyMark decorative />
            <span>
              <small>Project</small>
              Mordecai
            </span>
          </Link>
          <nav className="primary-nav" aria-label="Core systems">
            {systems.map((system) => (
              <NavLink
                key={system.slug}
                to={systemPath(system.slug)}
                className={({ isActive }) => (isActive ? 'is-active' : undefined)}
              >
                {system.navLabel}
              </NavLink>
            ))}
          </nav>
          <ThemeToggle
            theme={theme}
            onToggle={() =>
              setTheme((current) =>
                current === 'diorama' ? 'high-contrast' : 'diorama',
              )
            }
          />
        </div>
      </header>

      <main id="main">
        <ScrollToTop />
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <span className="footer-kicker">In development</span>
            <strong>Project Mordecai</strong>
          </div>
          <p>
            An in-development fixed-diorama action RPG.
            <br />
            Site content reflects the current design brief.
          </p>
          <Link to="/">Return home</Link>
        </div>
      </footer>
    </div>
  )
}

function HeroDiorama() {
  return (
    <div className="hero-diorama" aria-hidden="true">
      <div className="diorama-sun" />
      <div className="diorama-cloud diorama-cloud--one" />
      <div className="diorama-cloud diorama-cloud--two" />
      <div className="diorama-island">
        <span className="tree tree--one" />
        <span className="tree tree--two" />
        <span className="tower" />
        <span className="path" />
      </div>
      <div className="hero-ticket">
        <span>Current record</span>
        <strong>Everything counts.</strong>
        <small>Nothing lasts.</small>
      </div>
    </div>
  )
}

function LandingPage() {
  return (
    <>
      <section className="hero">
        <div className="hero__content page-frame">
          <div className="hero__copy">
            <span className="eyebrow">
              <TallyMark decorative />
              Fixed-diorama action RPG
            </span>
            <h1>Master the fight. Decide what lasts.</h1>
            <p className="hero__lead">
              Project Mordecai is a twin-stick action RPG where player skill is
              intended to clear the game at level 1—and attributes, granular
              skills, feats, and curated loot make every build your own.
            </p>
            <div className="hero__actions" aria-label="Project Mordecai links">
              <a
                className="button button--primary"
                href="https://mordecai-game-builds.t3.tigrisfiles.io/playtest/ProjectMordecai-Windows-latest.zip"
              >
                Download game
                <span>Windows playtest</span>
              </a>
              <a className="button button--secondary" href="#systems">
                Explore systems
                <span>Design brief</span>
              </a>
            </div>
            <p className="playtest-note">
              <strong>Windows playtest · ~1.6 GB · In development.</strong>{' '}
              Download the zip, unzip it, and run the game.
            </p>
          </div>
          <HeroDiorama />
        </div>
      </section>

      <section className="statement section">
        <div className="page-frame statement__grid">
          <div>
            <span className="section-label">The world</span>
            <h2>Impermanence vs Control</h2>
          </div>
          <p>
            Cross six compact biomes shaped by ages of Automation and
            Necromancy. Learn what their machines preserve, what their rulers
            refuse to release, and what acceptance might make possible.
          </p>
        </div>
      </section>

      <section className="pillars section">
        <div className="page-frame">
          <div className="section-heading">
            <div>
              <span className="section-label">The expedition record</span>
              <h2>Skill first. Identity earned.</h2>
            </div>
            <p>Current pillars from the Project Mordecai design brief.</p>
          </div>
          <div className="pillar-grid">
            <article className="tin-card">
              <span className="card-number">01</span>
              <h3>Practice becomes mastery</h3>
              <p>
                Skills rank to 20 and unlock techniques at milestone ranks.
                Feats arrive through gameplay achievements.
              </p>
            </article>
            <article className="tin-card">
              <span className="card-number">02</span>
              <h3>Finds, not chores</h3>
              <p>
                Curated loot creates build identity. Unlimited carry and
                auto-stored materials remove bag-management busywork.
              </p>
            </article>
            <article className="tin-card">
              <span className="card-number">03</span>
              <h3>The village makes ready</h3>
              <p>
                Services and infrastructure turn expedition spoils into
                preparation—not a traditional crafting recipe grid.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="systems-index section" id="systems">
        <div className="page-frame">
          <div className="section-heading">
            <div>
              <span className="section-label">Core systems</span>
              <h2>Read the current field notes</h2>
            </div>
            <p>Six connected systems. One deliberate journey.</p>
          </div>
          <div className="system-card-grid">
            {systems.map((system, index) => (
              <Link
                className="system-card"
                to={systemPath(system.slug)}
                key={system.slug}
                style={{ '--card-accent': system.accent } as React.CSSProperties}
              >
                <span className="system-card__index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="system-card__rule" />
                <h3>{system.title}</h3>
                <p>{system.oneLiner}</p>
                <span className="system-card__link">Open system record →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function SystemPage() {
  const { slug = '' } = useParams()
  const system = systemBySlug.get(slug)

  if (!system) {
    return <NotFoundPage />
  }

  const features = system.progress.categories.flatMap(
    (category) => category.features,
  )
  const shippedCount = features.filter(
    (feature) => feature.stage === 'shipped',
  ).length
  const plannedCount = features.length - shippedCount

  return (
    <article
      className="system-page"
      style={{ '--page-accent': system.accent } as React.CSSProperties}
    >
      <header className="system-hero">
        <div className="page-frame system-hero__inner">
          <div className="system-hero__copy">
            <Link className="back-link" to="/#systems">
              ← All systems
            </Link>
            <span className="eyebrow">{system.eyebrow}</span>
            <h1>{system.title}</h1>
            <p>{system.oneLiner}</p>
            <ul className="highlight-list" aria-label="System highlights">
              {system.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
          <div className="system-seal" aria-hidden="true">
            <TallyMark decorative />
            <span>{system.navLabel}</span>
          </div>
        </div>
      </header>

      <div className="page-frame system-content">
        <section className="progress-overview" aria-labelledby="progress-title">
          <header className="progress-overview__header">
            <div>
              <span className="section-label">Development record</span>
              <h2 id="progress-title">What is playable—and what comes next</h2>
              <p>{system.progress.intro}</p>
            </div>
            <dl className="progress-totals" aria-label="Feature totals">
              <div>
                <dt>Shipped / in playtest</dt>
                <dd>{shippedCount}</dd>
              </div>
              <div>
                <dt>Designed / planned</dt>
                <dd>{plannedCount}</dd>
              </div>
            </dl>
          </header>

          <div className="progress-key">
            <p>
              <strong>Status reviewed {progressStatusReviewedOn}.</strong>{' '}
              Shipped items are implemented in the current build; descriptions
              call out known limits. Planned items remain visible so progress is
              easy to follow.
            </p>
            <ul aria-label="Feature status key">
              <li>
                <span
                  className="feature-status feature-status--shipped"
                  aria-hidden="true"
                >
                  ✓
                </span>
                Shipped / in playtest
              </li>
              <li>
                <span
                  className="feature-status feature-status--planned"
                  aria-hidden="true"
                >
                  ○
                </span>
                Designed / planned
              </li>
            </ul>
          </div>

          <div className="progress-category-list">
            {system.progress.categories.map((category, categoryIndex) => {
              const categoryShipped = category.features.filter(
                (feature) => feature.stage === 'shipped',
              ).length

              return (
                <section className="progress-category" key={category.title}>
                  <header className="progress-category__header">
                    <span className="progress-category__index">
                      {String(categoryIndex + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3>{category.title}</h3>
                      <p>{category.summary}</p>
                    </div>
                    <span className="progress-category__count">
                      {categoryShipped}/{category.features.length} shipped
                    </span>
                  </header>
                  <ul className="feature-list">
                    {category.features.map((feature) => {
                      const isShipped = feature.stage === 'shipped'
                      const statusLabel = isShipped
                        ? 'Shipped / in playtest'
                        : 'Designed / planned'

                      return (
                        <li
                          className={`feature-item feature-item--${feature.stage}`}
                          key={feature.title}
                        >
                          <span
                            className={`feature-status feature-status--${feature.stage}`}
                            aria-hidden="true"
                          >
                            {isShipped ? '✓' : '○'}
                          </span>
                          <div>
                            <div className="feature-item__heading">
                              <h4>{feature.title}</h4>
                              <span className="feature-item__label">
                                {statusLabel}
                              </span>
                            </div>
                            <p>{feature.description}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              )
            })}
          </div>
        </section>

        <section className="system-brief" aria-labelledby="brief-title">
          <div className="system-brief__heading">
            <span className="section-label">Design direction</span>
            <h2 id="brief-title">The larger promise</h2>
            <p>
              These field notes preserve the system’s intended shape while the
              development record above tracks what is real today.
            </p>
          </div>
          <div className="detail-grid">
            {system.sections.map((section, index) => (
              <section className="detail-card" key={section.title}>
                <span className="detail-card__index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{section.title}</h3>
                <p>{section.body}</p>
                {section.items && (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </section>
        <nav className="next-system" aria-label="Continue through core systems">
          <span>Continue the record</span>
          {(() => {
            const currentIndex = systems.findIndex(
              (entry) => entry.slug === system.slug,
            )
            const next = systems[(currentIndex + 1) % systems.length]
            return (
              <Link to={systemPath(next.slug)}>
                {next.title}
                <span aria-hidden="true">→</span>
              </Link>
            )
          })()}
        </nav>
      </div>
    </article>
  )
}

function NotFoundPage() {
  return (
    <section className="not-found page-frame">
      <span className="eyebrow">Record not found</span>
      <h1>This tally came up empty.</h1>
      <p>The requested page is not part of the current expedition record.</p>
      <Link className="button button--primary" to="/">
        Return home
      </Link>
    </section>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteShell />}>
        <Route index element={<LandingPage />} />
        <Route path=":slug" element={<SystemPage />} />
        <Route path="systems/:slug" element={<SystemPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
