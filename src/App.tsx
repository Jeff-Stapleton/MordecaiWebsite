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
import {
  progressStatusReviewedOn,
  type DetailedFeatureStage,
  type MechanicSupport,
} from './data/systemProgress'
import { systemBySlug, systems } from './data/systems'

type Theme = 'diorama' | 'high-contrast'

function systemPath(slug: string) {
  return `/${slug}`
}

const detailedStatus: Record<
  DetailedFeatureStage,
  { label: string; shortLabel: string; mark: string }
> = {
  playtest: {
    label: 'Verified in playtest',
    shortLabel: 'Playtest',
    mark: '✓',
  },
  implemented: {
    label: 'Implemented—not playtest verified',
    shortLabel: 'Implemented',
    mark: '◆',
  },
  recovery: {
    label: 'Implemented—recovery needed',
    shortLabel: 'Recovery',
    mark: '!',
  },
  planned: {
    label: 'Designed / planned',
    shortLabel: 'Planned',
    mark: '○',
  },
  uncertain: {
    label: 'Source state uncertain',
    shortLabel: 'Uncertain',
    mark: '?',
  },
}

const mechanicSupportLabel: Record<MechanicSupport, string> = {
  playtest: 'Playtest evidence',
  implemented: 'Implemented profile',
  designed: 'Designed mechanic',
  example: 'Design example',
  unspecified: 'Not yet specified',
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

  const detailedFeatures = system.progress.categories.flatMap(
    (category) => category.details ?? [],
  )
  const playtestCount = detailedFeatures.filter(
    (feature) => feature.stage === 'playtest',
  ).length

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
            <dl className="progress-totals" aria-label="Named feature totals">
              <div>
                <dt>Named features tracked</dt>
                <dd>{detailedFeatures.length}</dd>
              </div>
              <div>
                <dt>Verified in playtest</dt>
                <dd>{playtestCount}</dd>
              </div>
            </dl>
          </header>

          <div className="progress-key">
            <p>
              <strong>Status reviewed {progressStatusReviewedOn}.</strong>{' '}
              Counts use the named entries inside each section—not the broad
              overview—so totals are not doubled. Expand a section for its
              evidence-backed inventory and known limits.
            </p>
            <ul aria-label="Feature status key">
              {(
                Object.entries(detailedStatus) as [
                  DetailedFeatureStage,
                  (typeof detailedStatus)[DetailedFeatureStage],
                ][]
              ).map(([stage, status]) => (
                <li key={stage}>
                  <span
                    className={`feature-status feature-status--${stage}`}
                    aria-hidden="true"
                  >
                    {status.mark}
                  </span>
                  {status.shortLabel}
                </li>
              ))}
            </ul>
          </div>

          <div className="progress-category-list">
            {system.progress.categories.map((category, categoryIndex) => {
              const details = category.details ?? []
              const statusCounts = details.reduce<
                Partial<Record<DetailedFeatureStage, number>>
              >((counts, feature) => {
                counts[feature.stage] = (counts[feature.stage] ?? 0) + 1
                return counts
              }, {})

              return (
                <details className="progress-category" key={category.title}>
                  <summary className="progress-category__summary">
                    <span className="progress-category__index">
                      {String(categoryIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="progress-category__overview">
                      <span className="progress-category__title-row">
                        <h3>{category.title}</h3>
                        <span className="progress-category__count">
                          {details.length} named features
                        </span>
                      </span>
                      <span className="progress-category__description">
                        {category.summary}
                      </span>
                      <span
                        className="overview-feature-list"
                        aria-label="Section overview"
                      >
                        {category.features.map((feature) => (
                          <span
                            className={`overview-feature overview-feature--${feature.stage}`}
                            key={feature.title}
                          >
                            <span aria-hidden="true">
                              {feature.stage === 'shipped' ? '✓' : '○'}
                            </span>
                            {feature.title}
                          </span>
                        ))}
                      </span>
                      <span
                        className="progress-category__status-counts"
                        aria-label="Named feature status summary"
                      >
                        {(
                          Object.entries(detailedStatus) as [
                            DetailedFeatureStage,
                            (typeof detailedStatus)[DetailedFeatureStage],
                          ][]
                        ).map(([stage, status]) =>
                          statusCounts[stage] ? (
                            <span
                              className={`status-count status-count--${stage}`}
                              key={stage}
                            >
                              {statusCounts[stage]} {status.shortLabel}
                            </span>
                          ) : null,
                        )}
                      </span>
                    </span>
                    <span className="progress-category__toggle">
                      <span className="progress-category__toggle-label">
                        <span className="when-closed">Expand details</span>
                        <span className="when-open">Collapse details</span>
                      </span>
                      <span className="progress-category__chevron" aria-hidden="true">
                        ↓
                      </span>
                    </span>
                  </summary>
                  <div className="progress-category__details">
                    <div className="progress-category__details-heading">
                      <span className="section-label">Named feature inventory</span>
                      <p>
                        Each status belongs to this specific feature. It does not
                        inherit the status of its parent system.
                      </p>
                    </div>
                    <ul className="feature-list">
                      {details.map((feature) => {
                        const status = detailedStatus[feature.stage]
                        const featureSummary = (
                          <>
                            <div className="feature-item__heading">
                              <div>
                                {feature.group && (
                                  <span className="feature-item__group">
                                    {feature.group}
                                  </span>
                                )}
                                <h4>{feature.title}</h4>
                              </div>
                              <span className="feature-item__label">
                                {status.label}
                              </span>
                            </div>
                            <p>{feature.description}</p>
                            <p className="feature-item__evidence">
                              <strong>Why this status:</strong>{' '}
                              {feature.evidence}
                            </p>
                          </>
                        )

                        return (
                          <li
                            className={`feature-item feature-item--${feature.stage}`}
                            key={feature.id}
                          >
                            <span
                              className={`feature-status feature-status--${feature.stage}`}
                              aria-hidden="true"
                            >
                              {status.mark}
                            </span>
                            {feature.mechanics ? (
                              <details className="feature-mechanics">
                                <summary className="feature-mechanics__summary">
                                  <span className="feature-mechanics__overview">
                                    {featureSummary}
                                  </span>
                                  <span className="feature-mechanics__toggle">
                                    <span className="feature-mechanics__closed">
                                      Explore mechanics
                                    </span>
                                    <span className="feature-mechanics__open">
                                      Hide mechanics
                                    </span>
                                    <span
                                      className="feature-mechanics__chevron"
                                      aria-hidden="true"
                                    >
                                      ↓
                                    </span>
                                  </span>
                                </summary>
                                <div className="feature-mechanics__panel">
                                  <p className="feature-mechanics__intro">
                                    {feature.mechanics.summary}
                                  </p>
                                  <div className="mechanic-groups">
                                    {feature.mechanics.groups.map((group) => (
                                      <section
                                        className="mechanic-group"
                                        key={group.title}
                                      >
                                        <header>
                                          <h5>{group.title}</h5>
                                          {group.summary && <p>{group.summary}</p>}
                                        </header>
                                        <ol className="mechanic-list">
                                          {group.items.map((mechanic, index) => (
                                            <li
                                              className={`mechanic-item mechanic-item--${mechanic.support}${
                                                mechanic.milestone
                                                  ? ' mechanic-item--milestone'
                                                  : ''
                                              }`}
                                              key={`${mechanic.label}-${index}`}
                                            >
                                              <div>
                                                <strong>{mechanic.label}</strong>
                                                <span>
                                                  {
                                                    mechanicSupportLabel[
                                                      mechanic.support
                                                    ]
                                                  }
                                                </span>
                                              </div>
                                              <p>{mechanic.description}</p>
                                            </li>
                                          ))}
                                        </ol>
                                      </section>
                                    ))}
                                  </div>
                                  <p className="feature-mechanics__sources">
                                    <strong>Maintainer sources:</strong>{' '}
                                    {feature.mechanics.sources.join(' · ')}
                                  </p>
                                </div>
                              </details>
                            ) : (
                              <div>{featureSummary}</div>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </details>
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
