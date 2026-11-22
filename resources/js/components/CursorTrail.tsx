import { useEffect, useRef } from 'react';

export default function CursorTrail() {
    const trailRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        );

        const finePointer = window.matchMedia(
            '(hover: hover) and (pointer: fine)',
        );

        let particleIndex = 0;
        let lastTime = 0;

        function clearParticles() {
            const particles = trailRef.current?.children;

            if (!particles) return;

            Array.from(particles).forEach((particle) => {
                particle.getAnimations().forEach((animation) => {
                    animation.cancel();
                });
            });
        }

        function handlePointerMove(event: PointerEvent) {
            if (
                reducedMotion.matches ||
                !finePointer.matches ||
                event.pointerType !== 'mouse'
            ) {
                return;
            }

            // Limit particle creation without updating React state.
            if (event.timeStamp - lastTime < 35) return;

            lastTime = event.timeStamp;

            const particles = trailRef.current?.children;

            if (!particles?.length) return;

            const particle = particles.item(
                particleIndex % particles.length,
            ) as HTMLElement | null;

            particleIndex += 1;

            if (!particle) return;

            particle.getAnimations().forEach((animation) => {
                animation.cancel();
            });

            particle.style.left = `${event.clientX}px`;
            particle.style.top = `${event.clientY}px`;

            particle.animate(
                [
                    {
                        opacity: 0.65,
                        transform: 'translate(-50%, -50%) scale(1)',
                    },
                    {
                        opacity: 0,
                        transform: 'translate(-50%, 18px) scale(0.15)',
                    },
                ],
                {
                    duration: 650,
                    easing: 'ease-out',
                    fill: 'forwards',
                },
            );
        }

        window.addEventListener('pointermove', handlePointerMove, {
            passive: true,
        });

        window.addEventListener('blur', clearParticles);
        document.addEventListener('pointerleave', clearParticles);
        reducedMotion.addEventListener('change', clearParticles);
        finePointer.addEventListener('change', clearParticles);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);

            window.removeEventListener('blur', clearParticles);
            document.removeEventListener('pointerleave', clearParticles);

            reducedMotion.removeEventListener('change', clearParticles);

            finePointer.removeEventListener('change', clearParticles);

            clearParticles();
        };
    }, []);

    return (
        <div ref={trailRef} className="cursor-trail" aria-hidden="true">
            {Array.from({ length: 16 }, (_, index) => (
                <span key={index} className="cursor-particle" />
            ))}
        </div>
    );
}
