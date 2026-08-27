import './LampButton.css';

/**
 * LampButton component — the magic lamp submit button.
 * Three visual states: default, compact (after first submission), loading.
 * @param {Object} props
 * @param {boolean} props.isLoading - Lamp rubbing animation
 * @param {boolean} props.isCompact - Shrunk state after results shown
 * @param {function} props.onClick - Click handler (triggers form submit)
 */
export default function LampButton({ isLoading, isCompact, onClick }) {
  const stateClass = isLoading
    ? 'loading'
    : isCompact
      ? 'compact'
      : '';

  const buttonText = isLoading
    ? 'Summoning...'
    : 'Rub the Lamp';

  return (
    <div className="lamp-container">
      <button
        type="button"
        id="lamp-button"
        className={`lamp-btn ${stateClass}`}
        onClick={onClick}
        disabled={isLoading}
        aria-label="Rub the Lamp"
      >
        {/* Golden smoke particles (CSS-only) */}
        <span className="lamp-particles" aria-hidden="true">
          <span className="particle particle--1" />
          <span className="particle particle--2" />
          <span className="particle particle--3" />
          <span className="particle particle--4" />
          <span className="particle particle--5" />
        </span>

        <span className="lamp-icon">
          <img
            src="/assets/lamp.svg"
            alt="Magic Lamp"
            className="lamp-icon-img"
          />
        </span>
        <span className="lamp-text">{buttonText}</span>
      </button>
    </div>
  );
}
