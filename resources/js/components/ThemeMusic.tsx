import { useCallback, useEffect, useRef, useState } from 'react';

type ThemeMusicProps = {
    theme: 'light' | 'dark';
};

type PlaybackStatus =
    | 'off'
    | 'loading'
    | 'playing'
    | 'blocked'
    | 'error';

const preferenceKey = 'portfolio-music';

export default function ThemeMusic({ theme }: ThemeMusicProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const wantsMusic = useRef(true);
    const preferenceLoaded = useRef(false);
    const operation = useRef(0);

    const [status, setStatus] =
        useState<PlaybackStatus>('loading');

    const [message, setMessage] = useState('');

    const startPlayback = useCallback(() => {
        const audio = audioRef.current;

        if (!audio || !wantsMusic.current) return;

        const currentOperation = ++operation.current;

        setStatus('loading');
        setMessage('');

        void audio.play().then(() => {
            if (currentOperation !== operation.current) return;

            setStatus('playing');
        }).catch((error: unknown) => {
            if (currentOperation !== operation.current) return;

            if (
                error instanceof DOMException &&
                error.name === 'NotAllowedError'
            ) {
                // Keep the intention to play.
                // Retry during a visitor interaction.
                setStatus('blocked');
                return;
            }

            wantsMusic.current = false;
            setStatus('error');

            setMessage(
                'Audio could not load. Check the files in public/audio.',
            );
        });
    }, []);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) return;

        if (!preferenceLoaded.current) {
            try {
                wantsMusic.current =
                    localStorage.getItem(preferenceKey) !== 'off';
            } catch {
                // Default to enabled when storage is unavailable.
            }

            preferenceLoaded.current = true;
        }

        operation.current += 1;
        audio.pause();

        audio.volume = 0.18;
        audio.src =
            theme === 'light'
                ? '/audio/sunny.mp3'
                : '/audio/rainy.mp3';

        audio.load();

        if (wantsMusic.current) {
            startPlayback();
        } else {
            setStatus('off');
        }

        function handleInteraction(event: Event) {
            if (!event.isTrusted || !wantsMusic.current) return;

            // The music button manages its own playback.
            if (
                event.target instanceof Element &&
                event.target.closest('[data-music-controls]')
            ) {
                return;
            }

            if (
                event instanceof KeyboardEvent &&
                event.key !== 'Enter' &&
                event.key !== ' '
            ) {
                return;
            }

            if (audio?.paused) {
                startPlayback();
            }
        }

        document.addEventListener('click', handleInteraction);
        document.addEventListener('keydown', handleInteraction);

        return () => {
            operation.current += 1;
            audio.pause();

            document.removeEventListener(
                'click',
                handleInteraction,
            );

            document.removeEventListener(
                'keydown',
                handleInteraction,
            );
        };
    }, [theme, startPlayback]);

    function toggleMusic() {
        const audio = audioRef.current;

        if (!audio) return;

        const shouldStop =
            wantsMusic.current &&
            (status === 'playing' || status === 'loading');

        if (shouldStop) {
            wantsMusic.current = false;
            operation.current += 1;

            audio.pause();

            setStatus('off');
            setMessage('');

            try {
                localStorage.setItem(preferenceKey, 'off');
            } catch {
                // Playback controls still work without storage.
            }

            return;
        }

        wantsMusic.current = true;

        try {
            localStorage.setItem(preferenceKey, 'on');
        } catch {
            // Playback controls still work without storage.
        }

        startPlayback();
    }

    const buttonText =
        status === 'playing'
            ? 'Music on'
            : status === 'loading'
                ? 'Starting'
                : status === 'blocked'
                    ? 'Start music'
                    : 'Music off';

    return (
        <div className="theme-music" data-music-controls>
            <audio
                ref={audioRef}
                loop
                preload="none"
                aria-hidden="true"
            />

            <button
                type="button"
                className="theme-button music-button"
                onClick={toggleMusic}
                aria-pressed={status === 'playing'}
                aria-label={
                    status === 'playing' || status === 'loading'
                        ? 'Turn background music off'
                        : 'Play background music'
                }
            >
                <span aria-hidden="true">♫</span>

                <span className="music-label">
                    {buttonText}
                </span>
            </button>

            <span className="music-message" role="status">
                {message}
            </span>
        </div>
    );
}