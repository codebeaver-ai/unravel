import '@testing-library/jest-dom';
import Questions from '../Questions';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Questions Component', () => {
  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn()
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  it('should display available modes when there is no previous session', () => {
    // Mock localStorage to simulate no previous session
    vi.spyOn(localStorage, 'getItem').mockReturnValue(null);

    render(<Questions />);

    // Check if the "Choose a mode" heading is displayed
    const modeHeading = screen.getByText('Choose a mode');
    expect(modeHeading).toBeInTheDocument();

    // Check if some of the available modes are displayed
    const unravelMode = screen.getByText('Play Unravel');
    expect(unravelMode).toBeInTheDocument();

    const firstDateMode = screen.getByText('Play First Date pack');
    expect(firstDateMode).toBeInTheDocument();

    // Verify that the "Resume session" button is not present
    const resumeButton = screen.queryByText('Resume session');
    expect(resumeButton).not.toBeInTheDocument();
  });

  it('should display resume session option when there is a previous session', () => {
    // Mock localStorage to simulate a previous session
    vi.spyOn(localStorage, 'getItem').mockImplementation((key) => {
      if (key === 'mode') return JSON.stringify([]);
      if (key === 'questionsCounter') return '0';
      return null;
    });

    render(<Questions />);

    // Check if the "Resume your last session" heading is displayed
    const resumeHeading = screen.getByText('Resume your last session');
    expect(resumeHeading).toBeInTheDocument();

    // Check if the "Resume session" button is present
    const resumeButton = screen.getByText('Resume session');
    expect(resumeButton).toBeInTheDocument();

    // Verify that the "Choose a mode" heading is still present
    const modeHeading = screen.getByText('Choose a mode');
    expect(modeHeading).toBeInTheDocument();
  });
});