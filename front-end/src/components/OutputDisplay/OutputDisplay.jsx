import './OutputDisplay.css';

/**
 * OutputDisplay component — renders streamed AI response as sanitized HTML.
 * @param {Object} props
 * @param {string} props.content - Sanitized HTML content
 * @param {string|null} props.error - Error message
 * @param {boolean} props.isLoading - Whether content is being streamed
 * @param {boolean} props.isVisible - Whether to show the output section
 */
export default function OutputDisplay({ content, error, isLoading, isVisible }) {
  const hasContent = content || error;
  const shouldShow = isVisible && hasContent;

  return (
    <section className="output-section" id="output-section">
      <div
        id="output-container"
        className={`output-container ${shouldShow ? 'visible' : ''}`}
      >
        {error ? (
          <div className="output-error" id="output-error">
            <span className="error-icon" aria-hidden="true">✦</span>
            <p>{error}</p>
          </div>
        ) : (
          <div
            id="output-content"
            className={`output-content ${isLoading ? 'streaming' : ''}`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    </section>
  );
}
