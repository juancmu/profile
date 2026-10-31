import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { QUESTIONS as INITIAL_QUESTIONS } from './gispQuestions';

const TOTAL = INITIAL_QUESTIONS.length;
const EXAM_SECONDS = 4 * 3600;

function shuffleQuestionsWithinDomains(questions) {
  const domainsOrder = [];
  const domainMap = {};

  questions.forEach(q => {
    if (!domainMap[q.domain]) {
      domainMap[q.domain] = [];
      domainsOrder.push(q.domain);
    }
    domainMap[q.domain].push(q);
  });

  const shuffled = [];
  domainsOrder.forEach(domain => {
    const qs = [...domainMap[domain]];
    for (let i = qs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [qs[i], qs[j]] = [qs[j], qs[i]];
    }
    shuffled.push(...qs);
  });

  return shuffled;
}

export default function GispTestPage() {
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [examState, setExamState] = useState('start'); // start, exam, results
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(TOTAL).fill(null));
  const [flagged, setFlagged] = useState(Array(TOTAL).fill(false));
  const [secondsRemaining, setSecondsRemaining] = useState(EXAM_SECONDS);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timerInterval = null;
    if (examState === 'exam' && !isReviewMode && !isPaused && secondsRemaining > 0) {
      timerInterval = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            setExamState('results');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [examState, isReviewMode, isPaused, secondsRemaining]);

  const startExam = () => {
    setQuestions(shuffleQuestionsWithinDomains(INITIAL_QUESTIONS));
    setExamState('exam');
    setCurrentQ(0);
    setUserAnswers(Array(TOTAL).fill(null));
    setFlagged(Array(TOTAL).fill(false));
    setSecondsRemaining(EXAM_SECONDS);
    setIsReviewMode(false);
    setIsPaused(false);
  };

  const submitExam = () => {
    setExamState('results');
    setIsPaused(false);
  };

  const selectAnswer = (optIdx) => {
    if (examState !== 'exam' || isReviewMode) return;
    const newAnswers = [...userAnswers];
    newAnswers[currentQ] = optIdx;
    setUserAnswers(newAnswers);
  };

  const toggleFlag = () => {
    const newFlagged = [...flagged];
    newFlagged[currentQ] = !newFlagged[currentQ];
    setFlagged(newFlagged);
  };

  const navigate = (dir) => {
    const next = currentQ + dir;
    if (next < 0) return;
    if (next >= TOTAL) {
      if (!isReviewMode) submitExam();
      return;
    }
    setCurrentQ(next);
  };

  const reviewExam = () => {
    setExamState('exam');
    setIsReviewMode(true);
    setCurrentQ(0);
  };

  const resetExam = () => {
    startExam();
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const answeredCount = userAnswers.filter(a => a !== null).length;
  const flaggedCount = flagged.filter(Boolean).length;
  const progressPct = (answeredCount / TOTAL) * 100;

  const q = questions[currentQ];

  const getNavBtnClass = (i) => {
    let classes = 'q-btn';
    const answered = userAnswers[i] !== null;
    if (examState === 'results' || isReviewMode || answered) {
      classes += userAnswers[i] === questions[i].answer ? ' correct' : ' wrong';
    } else if (i === currentQ) {
      classes += flagged[i] ? ' flagged' : ' active';
    } else if (flagged[i]) {
      classes += ' flagged';
    }
    return classes;
  };

  const getOptionClass = (j) => {
    let classes = 'option';
    const answered = userAnswers[currentQ] !== null;
    if (isReviewMode || answered) {
      classes += ' disabled';
      if (j === q.answer) classes += ' correct';
      else if (userAnswers[currentQ] === j) classes += ' wrong';
    } else {
      if (userAnswers[currentQ] === j) classes += ' selected';
    }
    return classes;
  };

  const getTimerStyles = () => {
    if (secondsRemaining < 600) return { color: 'var(--red)', borderColor: 'var(--red)' };
    if (secondsRemaining < 1800) return { color: '#f0883e' };
    return {};
  };

  let correctCount = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) correctCount++;
  });
  const scorePct = Math.round((correctCount / TOTAL) * 100);
  const pass = scorePct >= 70;
  
  const timeUsed = EXAM_SECONDS - secondsRemaining;

  const domainStats = {};
  questions.forEach((q, i) => {
    if (!domainStats[q.domainLabel]) domainStats[q.domainLabel] = { correct: 0, total: 0 };
    domainStats[q.domainLabel].total++;
    if (userAnswers[i] === q.answer) domainStats[q.domainLabel].correct++;
  });

  const domainColors = {
    'Cartography': 'var(--purple)',
    'Spatial Analysis': 'var(--teal)',
    'Data Management': 'var(--amber)',
    'GIS Design': 'var(--accent)',
    'Programming': '#f78166',
    'Ethics & Law': '#79c0ff'
  };

  return (
    <div className="gisp-mock-exam-container">
      <div className="header">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          GISP <span>Mock Exam</span>
        </Link>
        <div className="header-meta">
          {examState === 'exam' && !isReviewMode && (
            <button 
              className="btn btn-ghost" 
              style={{ padding: '6px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
              onClick={() => setIsPaused(prev => !prev)}
            >
              {isPaused ? '▶ Resume' : '⏸ Pause'}
            </button>
          )}
          <div className="timer-box" style={{ borderColor: getTimerStyles().borderColor }}>
            <div className="dot" style={{ background: getTimerStyles().borderColor || 'var(--amber)' }}></div>
            <span id="timer" style={{ color: getTimerStyles().color }}>{formatTime(secondsRemaining)}</span>
          </div>
          <div className="progress-label" id="header-progress">{answeredCount} / {TOTAL}</div>
        </div>
      </div>

      {isPaused && examState === 'exam' && (
        <div className="pause-overlay">
          <div className="pause-modal">
            <h2>Exam Paused</h2>
            <p>Your progress is saved and the timer has been paused. You can resume whenever you are ready to continue.</p>
            <button className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '14px' }} onClick={() => setIsPaused(false)}>
              Resume Exam
            </button>
          </div>
        </div>
      )}

      {examState === 'start' && (
        <div id="start-screen" style={{ padding: '3rem 2rem' }}>
          <div className="start-screen">
            <h1>GISP Certification</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '.5rem', fontFamily: "'Syne',sans-serif", letterSpacing: '.05em' }}>
              Geographic Information Systems Professional
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              This full-length practice exam mirrors the GISP certification with {TOTAL} questions across all six knowledge domains. You have 4 hours to complete it. A score of 70% or higher is required to pass.
            </p>
            <div className="info-cards">
              <div className="info-card">
                <div className="info-card-val">{TOTAL}</div>
                <div className="info-card-label">Questions</div>
              </div>
              <div className="info-card">
                <div className="info-card-val">4:00</div>
                <div className="info-card-label">Hours</div>
              </div>
              <div className="info-card">
                <div className="info-card-val">70%</div>
                <div className="info-card-label">Pass Score</div>
              </div>
            </div>
            <div className="domain-tags">
              <span className="domain-tag">Cartography & Visualization</span>
              <span className="domain-tag">Spatial Analysis</span>
              <span className="domain-tag">Data Management</span>
              <span className="domain-tag">GIS Design & Implementation</span>
              <span className="domain-tag">Programming & Automation</span>
              <span className="domain-tag">GIS Ethics & Law</span>
            </div>
            <button className="btn btn-primary" style={{ fontSize: '16px', padding: '12px 36px' }} onClick={startExam}>
              Begin Exam
            </button>
          </div>
        </div>
      )}

      {(examState === 'exam') && (
        <div id="exam-area" className="layout">
          <aside className="sidebar">
            <div className="sidebar-section">
              <div className="sidebar-title">Navigator</div>
              <div className="q-grid">
                {questions.map((_, i) => (
                  <button 
                    key={i} 
                    className={getNavBtnClass(i)} 
                    onClick={() => setCurrentQ(i)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <div className="legend">
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: 'var(--accent)', opacity: .5 }}></div>Current
                </div>
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: 'var(--green)', opacity: .5 }}></div>Correct
                </div>
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: 'var(--red)', opacity: .5 }}></div>Incorrect
                </div>
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: 'var(--amber)', opacity: .5 }}></div>Flagged
                </div>
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: 'var(--border)' }}></div>Unanswered
                </div>
              </div>
            </div>
            <div className="sidebar-section">
              <div className="sidebar-title">Progress</div>
              <div className="stat-row">
                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Answered</span>
                <span className="stat-val">{answeredCount}</span>
              </div>
              <div className="stat-row">
                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Flagged</span>
                <span className="stat-val" style={{ color: 'var(--amber)' }}>{flaggedCount}</span>
              </div>
              <div className="stat-row">
                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Remaining</span>
                <span className="stat-val">{TOTAL - answeredCount}</span>
              </div>
            </div>
            {!isReviewMode && (
              <button className="btn btn-danger" style={{ width: '100%' }} onClick={submitExam}>Submit Exam</button>
            )}
          </aside>

          <div className="main-content-area" style={{ display: 'flex', gap: '2rem', minWidth: 0 }}>
            <main style={{ flex: 1, minWidth: 0 }}>
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width: `${progressPct}%` }}></div>
              </div>

              <div className="question-card active">
                <div className="q-header">
                  <div className="q-meta">
                    <span className="q-number">Q{q.id} / {TOTAL}</span>
                    <span className={`q-domain domain-${q.domain}`}>{q.domainLabel}</span>
                  </div>
                  <button 
                    className={`flag-btn ${flagged[currentQ] ? 'flagged' : ''}`} 
                    onClick={toggleFlag}
                  >
                    &#9873; Flag
                  </button>
                </div>
                <div className="q-text">{q.text}</div>
                <div className="options">
                  {q.options.map((opt, j) => (
                    <div 
                      key={j} 
                      className={getOptionClass(j)} 
                      onClick={() => selectAnswer(j)}
                    >
                      <div className="option-letter">{['A', 'B', 'C', 'D'][j]}</div>
                      <div className="option-text">{opt}</div>
                    </div>
                  ))}
                </div>
                
                {(isReviewMode || userAnswers[currentQ] !== null) && (
                  <div className="explanation" style={{ display: 'block' }}>
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>

              <div className="controls">
                <button className="btn btn-ghost" disabled={currentQ === 0} onClick={() => navigate(-1)}>
                  &#8592; Previous
                </button>
                
                {isReviewMode ? (
                  <>
                    <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontFamily: "'IBM Plex Mono',monospace" }}>Review Mode</span>
                    <button className="btn btn-primary" disabled={currentQ === TOTAL - 1} onClick={() => navigate(1)}>
                      Next &#8594;
                    </button>
                  </>
                ) : (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className={`btn btn-ghost ${flagged[currentQ] ? 'flagged' : ''}`} onClick={toggleFlag}>
                      &#9873; Flag
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate(1)}>
                      {currentQ === TOTAL - 1 ? 'Submit \u2192' : 'Next \u2192'}
                    </button>
                  </div>
                )}
              </div>
            </main>
            
            {(isReviewMode || userAnswers[currentQ] !== null) && (
              <aside className="explanation-image-side" style={{ width: '350px', flexShrink: 0 }}>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem', height: '100%', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  {q.image ? (
                    <>
                      <img src={q.image} alt="Explanation Visual" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px', flex: 1, minHeight: 0 }} />
                      <a href={q.image} target="_blank" rel="noreferrer" style={{ fontSize: '11px', color: 'var(--accent)', wordBreak: 'break-all', textAlign: 'center', textDecoration: 'none', background: 'var(--surface2)', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--border)', width: '100%' }}>
                        {q.image.length > 60 ? q.image.substring(0, 57) + '...' : q.image}
                      </a>
                    </>
                  ) : (
                    <div style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
                      <span style={{ fontSize: '32px', display: 'block', marginBottom: '10px' }}>&#128247;</span>
                      No visual reference available
                    </div>
                  )}
                </div>
              </aside>
            )}
          </div>
        </div>
      )}

      {examState === 'results' && (
        <div id="results-area" style={{ padding: '2rem' }}>
          <div className="results-screen active">
            <div className={`score-circle ${pass ? 'pass' : 'fail'}`}>
              <div className="score-pct">{scorePct}%</div>
              <div className="score-label">Score</div>
            </div>
            <div className="results-title">
              {pass ? '\u2713 Exam Passed' : '\u2717 Exam Not Passed'}
            </div>
            <div className="results-sub">
              {pass
                ? 'Congratulations! You met the 70% passing score requirement for GISP certification.'
                : 'You did not reach the 70% passing score. Review weak areas and try again.'}
            </div>
            
            <div className="results-grid">
              <div className="result-stat">
                <div className="result-stat-val">{correctCount}</div>
                <div className="result-stat-label">Correct</div>
              </div>
              <div className="result-stat">
                <div className="result-stat-val">{TOTAL - correctCount}</div>
                <div className="result-stat-label">Wrong</div>
              </div>
              <div className="result-stat">
                <div className="result-stat-val">{scorePct}%</div>
                <div className="result-stat-label">Score %</div>
              </div>
              <div className="result-stat">
                <div className="result-stat-val">{formatTime(timeUsed)}</div>
                <div className="result-stat-label">Time Used</div>
              </div>
            </div>
            
            <div className="domain-breakdown">
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '.75rem' }}>
                Score by Domain
              </div>
              {Object.entries(domainStats).map(([name, data]) => {
                const p = Math.round((data.correct / data.total) * 100);
                const color = domainColors[name] || 'var(--accent)';
                return (
                  <div className="domain-row" key={name}>
                    <span style={{ width: '120px', color: 'var(--text-muted)', fontSize: '12px', flexShrink: 0 }}>{name}</span>
                    <div className="domain-bar-wrap">
                      <div className="domain-bar" style={{ width: p + "%", background: color }}></div>
                    </div>
                    <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '12px', minWidth: '60px', textAlign: 'right', color: 'var(--text)' }}>
                      {data.correct}/{data.total} ({p}%)
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="btn btn-ghost" onClick={reviewExam}>Review Answers</button>
              <button className="btn btn-primary" onClick={resetExam}>Take Again</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gisp-mock-exam-container {
            --bg: #0d1117;
            --surface: #161b22;
            --surface2: #1c2333;
            --border: #30363d;
            --border2: #21262d;
            --text: #e6edf3;
            --text-muted: #8b949e;
            --accent: #58a6ff;
            --accent-dim: #1f3a5f;
            --green: #3fb950;
            --green-dim: #12261e;
            --red: #f85149;
            --red-dim: #2d1015;
            --amber: #e3b341;
            --amber-dim: #2e1f07;
            --purple: #bc8cff;
            --purple-dim: #2a1f4a;
            --teal: #39d353;
            
            background: var(--bg);
            color: var(--text);
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 15px;
            line-height: 1.6;
            min-height: 100vh;
        }

        .gisp-mock-exam-container * {
            box-sizing: border-box;
        }

        .gisp-mock-exam-container .header {
            background: var(--surface);
            border-bottom: 1px solid var(--border);
            padding: 0 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 60px;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .gisp-mock-exam-container .logo {
            font-family: 'Syne', sans-serif;
            font-size: 18px;
            font-weight: 700;
            letter-spacing: .05em;
            color: var(--accent);
        }

        .gisp-mock-exam-container .logo span {
            color: var(--text-muted);
            font-weight: 400;
        }

        .gisp-mock-exam-container .header-meta {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .gisp-mock-exam-container .timer-box {
            background: var(--surface2);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 6px 14px;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 15px;
            font-weight: 500;
            color: var(--amber);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .gisp-mock-exam-container .timer-box .dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: var(--amber);
            animation: pulse 1s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1 }
            50% { opacity: .3 }
        }

        .gisp-mock-exam-container .progress-label {
            font-size: 13px;
            color: var(--text-muted);
            font-family: 'IBM Plex Mono', monospace;
        }

        .gisp-mock-exam-container .layout {
            display: grid;
            grid-template-columns: 260px 1fr;
            gap: 2rem;
            max-width: 1300px;
            margin: 0 auto;
            padding: 2rem;
        }

        .gisp-mock-exam-container .sidebar {
            position: sticky;
            top: 80px;
            height: fit-content;
            max-height: calc(100vh - 100px);
            overflow-y: auto;
        }

        .gisp-mock-exam-container .sidebar-section {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 1.25rem;
            margin-bottom: 1rem;
        }

        .gisp-mock-exam-container .sidebar-title {
            font-family: 'Syne', sans-serif;
            font-size: 11px;
            letter-spacing: .12em;
            text-transform: uppercase;
            color: var(--text-muted);
            margin-bottom: 1rem;
        }

        .gisp-mock-exam-container .q-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 5px;
        }

        .gisp-mock-exam-container .q-btn {
            width: 100%;
            aspect-ratio: 1;
            border-radius: 5px;
            border: 1px solid var(--border);
            background: var(--surface2);
            color: var(--text-muted);
            font-family: 'IBM Plex Mono', monospace;
            font-size: 10px;
            cursor: pointer;
            transition: all .15s;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
        }

        .gisp-mock-exam-container .q-btn:hover {
            border-color: var(--accent);
            color: var(--accent);
        }

        .gisp-mock-exam-container .q-btn.active {
            background: var(--accent-dim);
            border-color: var(--accent);
            color: var(--accent);
        }

        .gisp-mock-exam-container .q-btn.answered {
            background: var(--green-dim);
            border-color: var(--green);
            color: var(--green);
        }

        .gisp-mock-exam-container .q-btn.flagged {
            background: var(--amber-dim);
            border-color: var(--amber);
            color: var(--amber);
        }

        .gisp-mock-exam-container .q-btn.correct {
            background: var(--green-dim);
            border-color: var(--green);
            color: var(--green);
        }

        .gisp-mock-exam-container .q-btn.wrong {
            background: var(--red-dim);
            border-color: var(--red);
            color: var(--red);
        }

        .gisp-mock-exam-container .legend {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin-top: 1rem;
        }

        .gisp-mock-exam-container .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            color: var(--text-muted);
        }

        .gisp-mock-exam-container .legend-dot {
            width: 10px;
            height: 10px;
            border-radius: 3px;
            flex-shrink: 0;
        }

        .gisp-mock-exam-container .stat-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 6px 0;
            border-bottom: 1px solid var(--border2);
            font-size: 13px;
        }

        .gisp-mock-exam-container .stat-row:last-child {
            border-bottom: none;
        }

        .gisp-mock-exam-container .stat-val {
            font-family: 'IBM Plex Mono', monospace;
            font-weight: 500;
            color: var(--text);
        }

        .gisp-mock-exam-container .question-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 1.5rem;
            display: none;
        }

        .gisp-mock-exam-container .question-card.active {
            display: block;
        }

        .gisp-mock-exam-container .q-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            margin-bottom: 1.5rem;
            gap: 1rem;
        }

        .gisp-mock-exam-container .q-meta {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
        }

        .gisp-mock-exam-container .q-number {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 12px;
            color: var(--text-muted);
            background: var(--surface2);
            border: 1px solid var(--border);
            border-radius: 6px;
            padding: 3px 10px;
        }

        .gisp-mock-exam-container .q-domain {
            font-size: 11px;
            letter-spacing: .08em;
            text-transform: uppercase;
            padding: 3px 10px;
            border-radius: 6px;
            border: 1px solid;
        }

        .gisp-mock-exam-container .domain-cartography {
            color: var(--purple);
            border-color: var(--purple-dim);
            background: var(--purple-dim);
        }

        .gisp-mock-exam-container .domain-spatial-analysis {
            color: var(--teal);
            border-color: #12261e;
            background: #12261e;
        }

        .gisp-mock-exam-container .domain-data-management {
            color: var(--amber);
            border-color: var(--amber-dim);
            background: var(--amber-dim);
        }

        .gisp-mock-exam-container .domain-gis-design {
            color: var(--accent);
            border-color: var(--accent-dim);
            background: var(--accent-dim);
        }

        .gisp-mock-exam-container .domain-programming {
            color: #f78166;
            border-color: #2d1b15;
            background: #2d1b15;
        }

        .gisp-mock-exam-container .domain-ethics {
            color: #79c0ff;
            border-color: #0d2137;
            background: #0d2137;
        }

        .gisp-mock-exam-container .flag-btn {
            background: none;
            border: 1px solid var(--border);
            border-radius: 8px;
            color: var(--text-muted);
            cursor: pointer;
            padding: 6px 12px;
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all .15s;
            white-space: nowrap;
        }

        .gisp-mock-exam-container .flag-btn:hover,
        .gisp-mock-exam-container .flag-btn.flagged {
            border-color: var(--amber);
            color: var(--amber);
            background: var(--amber-dim);
        }

        .gisp-mock-exam-container .q-text {
            font-size: 16px;
            line-height: 1.7;
            color: var(--text);
            margin-bottom: 2rem;
        }

        .gisp-mock-exam-container .options {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .gisp-mock-exam-container .option {
            display: flex;
            align-items: flex-start;
            gap: 14px;
            padding: 14px 16px;
            border: 1px solid var(--border);
            border-radius: 10px;
            cursor: pointer;
            transition: all .15s;
            background: var(--surface2);
            user-select: none;
        }

        .gisp-mock-exam-container .option:hover {
            border-color: var(--accent);
        }

        .gisp-mock-exam-container .option.selected {
            border-color: var(--accent);
            background: var(--accent-dim);
        }

        .gisp-mock-exam-container .option.correct {
            border-color: var(--green);
            background: var(--green-dim);
        }

        .gisp-mock-exam-container .option.wrong {
            border-color: var(--red);
            background: var(--red-dim);
        }

        .gisp-mock-exam-container .option.disabled {
            cursor: default;
            pointer-events: none;
        }

        .gisp-mock-exam-container .option-letter {
            width: 28px;
            height: 28px;
            border-radius: 6px;
            border: 1px solid var(--border);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 12px;
            font-weight: 500;
            flex-shrink: 0;
            color: var(--text-muted);
            background: var(--surface);
            transition: all .15s;
        }

        .gisp-mock-exam-container .option.selected .option-letter {
            background: var(--accent);
            border-color: var(--accent);
            color: #fff;
        }

        .gisp-mock-exam-container .option.correct .option-letter {
            background: var(--green);
            border-color: var(--green);
            color: #fff;
        }

        .gisp-mock-exam-container .option.wrong .option-letter {
            background: var(--red);
            border-color: var(--red);
            color: #fff;
        }

        .gisp-mock-exam-container .option-text {
            font-size: 14px;
            line-height: 1.5;
            padding-top: 4px;
        }

        .gisp-mock-exam-container .explanation {
            margin-top: 1.5rem;
            padding: 1rem 1.25rem;
            background: var(--surface2);
            border: 1px solid var(--border);
            border-left: 3px solid var(--accent);
            border-radius: 0 8px 8px 0;
            font-size: 13px;
            color: var(--text-muted);
        }

        .gisp-mock-exam-container .explanation strong {
            color: var(--accent);
        }

        .gisp-mock-exam-container .controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.25rem 2rem;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
        }

        .gisp-mock-exam-container .btn {
            padding: 9px 20px;
            border-radius: 8px;
            border: 1px solid;
            font-size: 14px;
            font-family: 'IBM Plex Sans', sans-serif;
            cursor: pointer;
            transition: all .15s;
            font-weight: 500;
        }

        .gisp-mock-exam-container .btn-ghost {
            background: none;
            border-color: var(--border);
            color: var(--text-muted);
        }

        .gisp-mock-exam-container .btn-ghost:hover {
            border-color: var(--text-muted);
            color: var(--text);
        }

        .gisp-mock-exam-container .btn-primary {
            background: var(--accent-dim);
            border-color: var(--accent);
            color: var(--accent);
        }

        .gisp-mock-exam-container .btn-primary:hover {
            background: var(--accent);
            color: #fff;
        }

        .gisp-mock-exam-container .btn-danger {
            background: var(--red-dim);
            border-color: var(--red);
            color: var(--red);
        }

        .gisp-mock-exam-container .btn-danger:hover {
            background: var(--red);
            color: #fff;
        }

        .gisp-mock-exam-container .btn[disabled] {
            opacity: 0.5;
            pointer-events: none;
        }

        .gisp-mock-exam-container .progress-bar-wrap {
            height: 3px;
            background: var(--border);
            border-radius: 2px;
            margin-bottom: 2rem;
            overflow: hidden;
        }

        .gisp-mock-exam-container .progress-bar-fill {
            height: 100%;
            background: var(--accent);
            border-radius: 2px;
            transition: width .3s;
        }

        .gisp-mock-exam-container .results-screen {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 3rem;
            text-align: center;
            max-width: 700px;
            margin: 0 auto;
        }

        .gisp-mock-exam-container .score-circle {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            margin: 0 auto 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            border: 3px solid;
        }

        .gisp-mock-exam-container .score-circle.pass {
            border-color: var(--green);
            background: var(--green-dim);
        }

        .gisp-mock-exam-container .score-circle.fail {
            border-color: var(--red);
            background: var(--red-dim);
        }

        .gisp-mock-exam-container .score-pct {
            font-family: 'Syne', sans-serif;
            font-size: 36px;
            font-weight: 700;
            line-height: 1;
        }

        .gisp-mock-exam-container .score-circle.pass .score-pct {
            color: var(--green);
        }

        .gisp-mock-exam-container .score-circle.fail .score-pct {
            color: var(--red);
        }

        .gisp-mock-exam-container .score-label {
            font-size: 11px;
            letter-spacing: .1em;
            text-transform: uppercase;
            color: var(--text-muted);
            margin-top: 4px;
        }

        .gisp-mock-exam-container .results-title {
            font-family: 'Syne', sans-serif;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: .5rem;
        }

        .gisp-mock-exam-container .results-sub {
            color: var(--text-muted);
            margin-bottom: 2rem;
            font-size: 14px;
        }

        .gisp-mock-exam-container .results-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin-bottom: 2rem;
        }

        .gisp-mock-exam-container .result-stat {
            background: var(--surface2);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 1rem;
            text-align: center;
        }

        .gisp-mock-exam-container .result-stat-val {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 22px;
            font-weight: 500;
            color: var(--text);
            margin-bottom: 4px;
        }

        .gisp-mock-exam-container .result-stat-label {
            font-size: 11px;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: .08em;
        }

        .gisp-mock-exam-container .domain-breakdown {
            text-align: left;
            margin-bottom: 2rem;
        }

        .gisp-mock-exam-container .domain-row {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 0;
            border-bottom: 1px solid var(--border2);
            font-size: 13px;
        }

        .gisp-mock-exam-container .domain-row:last-child {
            border-bottom: none;
        }

        .gisp-mock-exam-container .domain-bar-wrap {
            flex: 1;
            height: 6px;
            background: var(--border);
            border-radius: 3px;
            overflow: hidden;
        }

        .gisp-mock-exam-container .domain-bar {
            height: 100%;
            border-radius: 3px;
            transition: width .5s;
        }

        .gisp-mock-exam-container .start-screen {
            max-width: 620px;
            margin: 0 auto;
            text-align: center;
            padding: 3rem 2rem;
        }

        .gisp-mock-exam-container .start-screen h1 {
            font-family: 'Syne', sans-serif;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: .75rem;
        }

        .gisp-mock-exam-container .info-cards {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-bottom: 2rem;
        }

        .gisp-mock-exam-container .info-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 1rem;
        }

        .gisp-mock-exam-container .info-card-val {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 20px;
            font-weight: 500;
            color: var(--accent);
            margin-bottom: 4px;
        }

        .gisp-mock-exam-container .info-card-label {
            font-size: 12px;
            color: var(--text-muted);
        }

        .gisp-mock-exam-container .domain-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            justify-content: center;
            margin-bottom: 2rem;
        }

        .gisp-mock-exam-container .domain-tag {
            font-size: 11px;
            padding: 4px 12px;
            border-radius: 20px;
            border: 1px solid var(--border);
            color: var(--text-muted);
        }

        .gisp-mock-exam-container .pause-overlay {
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(13, 17, 23, 0.95);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999;
        }

        .gisp-mock-exam-container .pause-modal {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 3rem 2rem;
            text-align: center;
            max-width: 420px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            animation: modalFadeIn 0.3s ease-out;
        }

        @keyframes modalFadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }

        .gisp-mock-exam-container .pause-modal h2 {
            font-family: 'Syne', sans-serif;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--accent);
        }

        .gisp-mock-exam-container .pause-modal p {
            color: var(--text-muted);
            margin-bottom: 2rem;
            font-size: 14px;
            line-height: 1.5;
        }

        @media(max-width:900px) {
            .gisp-mock-exam-container .layout {
                grid-template-columns: 1fr;
            }

            .gisp-mock-exam-container .sidebar {
                position: static;
            }

            .gisp-mock-exam-container .results-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
      `}</style>
    </div>
  );
}
