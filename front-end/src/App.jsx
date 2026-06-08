import { useState, useCallback } from 'react';
import Header from './components/Header/Header';
import GiftForm from './components/GiftForm/GiftForm';
import LampButton from './components/LampButton/LampButton';
import OutputDisplay from './components/OutputDisplay/OutputDisplay';
import './App.css';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [streamedContent, setStreamedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [error, setError] = useState(null);

  const requestGifts = useCallback( async (prompt) => {
    if (!prompt.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      setStreamedContent('');

      const response = await fetch(`http://localhost:3000/api/gen-gift?userPrompt=${encodeURIComponent(prompt)}`)

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setStreamedContent(data.safeHTML);
      setIsCompact(true);
    } catch (error) {
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }

  }, []);

  const handleSubmit = useCallback((value) => {
    requestGifts(value);
    setInputValue('');
  }, [requestGifts]);

  const handleLampClick = useCallback(() => {
    if (!inputValue.trim()) return;
    handleSubmit(inputValue);
  }, [inputValue, handleSubmit]);

  const isOutputVisible = isLoading || !!streamedContent || !!error;

  return (
    <div className="app-container" id="app-container">
      <Header />

      <main className="main-content" id="main-content">
        <div className="gift-input-row">
          <GiftForm
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          <LampButton
            isLoading={isLoading}
            isCompact={isCompact}
            onClick={handleLampClick}
          />
        </div>

        <OutputDisplay
          content={streamedContent}
          error={error}
          isLoading={isLoading}
          isVisible={isOutputVisible}
        />
      </main>
    </div>
  );
}

