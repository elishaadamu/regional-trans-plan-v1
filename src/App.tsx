import { useState, useEffect, useRef } from 'react'
import './App.css'

interface TimelineItemData {
  id: number;
  title: string;
  period: string;
  subtext?: string;
  completed: boolean;
  phaseText: string;
  progress: number; // percentage filled (12.5% to 100%)
  category: string;
}

// Custom SVGs as functional components for high resolution and styleability
const GroupIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="timeline-icon-svg">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const MapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="timeline-icon-svg">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
    <path d="M12 8c-1.5 0-2.5 1-2.5 2.5C9.5 12.5 12 15 12 15s2.5-2.5 2.5-4.5C14.5 9 13.5 8 12 8z" fill="currentColor" fillOpacity="0.2" />
  </svg>
)

const MeetingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="timeline-icon-svg">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <rect x="15" y="4" width="7" height="9" rx="1" strokeWidth="2" />
    <path d="M18 7h2" />
    <path d="M18 10h2" />
  </svg>
)

const TrendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="timeline-icon-svg">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
    <path d="M22 2l-6 6" />
    <polyline points="22 6 22 2 18 2" />
  </svg>
)

const DocumentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="timeline-icon-svg">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)

const CommentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="timeline-icon-svg">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 10h.01M12 10h.01M16 10h.01" />
  </svg>
)

const DraftReviewIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="timeline-icon-svg">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M19 8l2 2 4-4" />
  </svg>
)

const AdoptIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="timeline-icon-svg">
    <circle cx="12" cy="8" r="7" fill="currentColor" fillOpacity="0.1" />
    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
    <circle cx="12" cy="8" r="6" />
  </svg>
)

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="completed-check-svg">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const timelineData: TimelineItemData[] = [
  {
    id: 1,
    title: 'RTP Focus Groups Begin',
    period: 'April 2026 through July 2026',
    completed: true,
    phaseText: 'PHASE ONE',
    progress: 12.5,
    category: 'Community Engagement'
  },
  {
    id: 2,
    title: 'Public Survey & Interactive Comment Map Launch',
    period: 'May 2026 through July 2026',
    completed: true,
    phaseText: 'PHASE TWO',
    progress: 25.0,
    category: 'Digital Reach'
  },
  {
    id: 3,
    title: 'Public Involvement Meeting #1: Existing Conditions',
    period: 'June 2026',
    subtext: 'Two date & time options offered',
    completed: true,
    phaseText: 'PHASE THREE',
    progress: 37.5,
    category: 'Public Forum'
  },
  {
    id: 4,
    title: 'Public Involvement Meeting #2: Future Conditions',
    period: 'October 2026',
    subtext: 'Two date & time options offered',
    completed: false,
    phaseText: 'PHASE FOUR',
    progress: 50.0,
    category: 'Future Planning'
  },
  {
    id: 5,
    title: 'Draft Plan Released',
    period: 'January 2027',
    completed: false,
    phaseText: 'PHASE FIVE',
    progress: 62.5,
    category: 'Documentation'
  },
  {
    id: 6,
    title: 'Public Comment Period on Draft Plan Opens',
    period: 'January 2027',
    completed: false,
    phaseText: 'PHASE SIX',
    progress: 75.0,
    category: 'Legislation & Feedback'
  },
  {
    id: 7,
    title: 'Public Involvement Meeting #3: Draft Plan',
    period: 'January 2027',
    subtext: 'Two date & time options offered',
    completed: false,
    phaseText: 'PHASE SEVEN',
    progress: 87.5,
    category: 'Public Forum'
  },
  {
    id: 8,
    title: 'Final Plan Adoption',
    period: 'April 2027',
    completed: false,
    phaseText: 'PHASE EIGHT',
    progress: 100.0,
    category: 'Adoption & Rollout'
  }
]

function ProgressCircle({ percentage, label, completed, active }: { percentage: number; label: string; completed: boolean; active: boolean }) {
  const radius = 32
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className={`timeline-progress-circle-wrapper ${active ? 'active' : ''} ${completed ? 'completed' : 'upcoming'}`}>
      <svg width="80" height="80" className="progress-svg" aria-label={`Progress indicator: ${percentage}% completed`}>
        {/* Track */}
        <circle cx="40" cy="40" r={radius} className="progress-track" strokeWidth="2.5" fill="none" />
        {/* Fill */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          className="progress-bar"
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
        />
      </svg>
      <div className="progress-label-overlay">
        <span className="overlay-phase">{label.split(' ')[0]}</span>
        <span className="overlay-num">{label.split(' ')[1]}</span>
      </div>
      {completed && (
        <div className="completed-badge-icon" title="Phase Completed">
          <CheckIcon />
        </div>
      )}
    </div>
  )
}

function TimelineItem({
  item,
  index,
  isHovered,
  onHover
}: {
  item: TimelineItemData
  index: number
  isHovered: boolean
  onHover: (id: number | null) => void
}) {
  const [inView, setInView] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [])

  const isLeft = index % 2 === 0

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'Community Engagement': return <GroupIcon />
      case 'Digital Reach': return <MapIcon />
      case 'Public Forum': return <MeetingIcon />
      case 'Future Planning': return <TrendIcon />
      case 'Documentation': return <DocumentIcon />
      case 'Legislation & Feedback': return <CommentIcon />
      case 'Draft Review Meeting': return <DraftReviewIcon />
      case 'Adoption & Rollout': return <AdoptIcon />
      default: return <MeetingIcon />
    }
  }

  return (
    <div
      ref={elementRef}
      className={`timeline-row ${isLeft ? 'row-left' : 'row-right'} ${inView ? 'in-view' : ''} ${
        item.completed ? 'status-completed' : 'status-upcoming'
      } ${isHovered ? 'row-hovered' : ''}`}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      id={`timeline-row-${item.id}`}
    >
      {/* Content Block */}
      <div className="timeline-content-card">
        <div className="card-icon-container">
          {getIcon(item.category)}
        </div>
        <div className="card-header">
          <span className="card-category">{item.category}</span>
          {item.completed ? (
            <span className="status-pill pill-completed">Completed</span>
          ) : (
            <span className="status-pill pill-upcoming">Upcoming</span>
          )}
        </div>
        <h3 className="card-title">{item.title}</h3>
        <p className="card-period">{item.period}</p>
        {item.subtext && <p className="card-subtext">{item.subtext}</p>}
      </div>

      {/* Connection elements */}
      <div className="timeline-connector-line">
        <div className="dotted-line-inner"></div>
      </div>

      {/* Central Progress Circle */}
      <div className="timeline-center-node">
        <ProgressCircle
          percentage={item.progress}
          label={`${item.phaseText.split(' ')[0]} ${item.phaseText.split(' ')[1]}`}
          completed={item.completed}
          active={isHovered}
        />
      </div>

      {/* Spacer block (for desktop layout grid alignment) */}
      <div className="timeline-spacer-block"></div>
    </div>
  )
}

function App() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="app-container">
      {/* Premium Navigation Header */}
      <header className="site-header">
        <div className="header-inner">
          <div className="logo-section">
            <span className="logo-dot"></span>
            <span className="logo-text">Plan 2050</span>
          </div>
          <nav className="header-nav">
            <a href="#timeline-section" className="nav-link active">Plan Timeline</a>
          </nav>
        </div>
      </header>

      {/* Timeline Interactive Section */}
      <section id="timeline-section" className="timeline-section">
        <div className="section-header">
          <h2 className="section-title">Timeline</h2>
          <p className="section-subtitle">
            Timeline of the Regional Transportation Plan. Hover over nodes or cards to highlight correlations.
          </p>
        </div>

        <div className="timeline-container">
          {/* Main vertical path line */}
          <div className="timeline-backbone">
            <div className="timeline-backbone-progress" style={{
              height: hoveredId 
                ? `${(hoveredId / 8) * 100}%` 
                : '37.5%' // default line fill representing 3 completed stages (3/8 = 37.5%)
            }}></div>
          </div>

          <div className="timeline-grid">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                isHovered={hoveredId === item.id}
                onHover={setHoveredId}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
