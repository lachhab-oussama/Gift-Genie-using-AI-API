import { useRef, useEffect, useCallback } from 'react';
import './GiftForm.css';

/**
 * GiftForm component — controlled textarea with auto-resize.
 * @param {Object} props
 * @param {string} props.value - Current textarea value
 * @param {function} props.onChange - Value change handler
 * @param {function} props.onSubmit - Form submission handler
 * @param {boolean} props.isLoading - Whether a request is in progress
 */
export default function GiftForm({ value, onChange, onSubmit, isLoading }) {
  const textareaRef = useRef(null);

  // Auto-resize textarea to fit content
  const autoResize = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  // Resize on value change
  useEffect(() => {
    autoResize();
  }, [value, autoResize]);

  // Reset height when loading starts (textarea gets cleared)
  useEffect(() => {
    if (isLoading && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value);
  };

  return (
    <form id="gift-form" className="gift-form" onSubmit={handleSubmit}>
      <div className="input-section">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            id="user-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g., My friend who loves hiphop music has a birthday coming up in 3 days. 40-60 bucks budget. I live in..."
            disabled={isLoading}
            rows={1}
          />
          <div className="input-glow" />
        </div>
      </div>
    </form>
  );
}
