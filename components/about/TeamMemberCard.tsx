'use client';

import { useCallback, useState, type KeyboardEvent } from 'react';

import { OptimizedImage } from '../ui/OptimizedImage';
import type { TeamMember } from '../../types/team';

export interface TeamMemberCardProps {
  member: TeamMember;
  className?: string;
  animationDelayMs?: number;
}

const cx = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ');

export function TeamMemberCard({
  member,
  className,
  animationDelayMs,
}: TeamMemberCardProps): JSX.Element {
  const [flipped, setFlipped] = useState<boolean>(false);

  const toggleFlip = useCallback((): void => {
    setFlipped((prev) => !prev);
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>): void => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleFlip();
      }
    },
    [toggleFlip],
  );

  return (
    <div
      className={cx(
        'group relative h-[420px] w-full select-none outline-none',
        'transition-transform duration-300 ease-out sm:hover:scale-[1.02]',
        'focus-visible:ring-2 focus-visible:ring-cyber-green focus-visible:ring-offset-2 focus-visible:ring-offset-matrix-black',
        className,
      )}
      style={{
        perspective: '1000px',
        animationDelay:
          animationDelayMs !== undefined ? `${animationDelayMs}ms` : undefined,
      }}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`View ${member.name} bio`}
      onClick={toggleFlip}
      onKeyDown={onKeyDown}
    >
      <div
        className="relative h-full w-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden bg-matrix-black/80 pixel-border border-cyber-green/60"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div className="relative w-full">
            <OptimizedImage
              src={member.photo}
              alt={`Portrait of ${member.name}, ${member.title}`}
              aspectRatio="1:1"
              pixelBorder={false}
              wrapperClassName="w-full"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2 p-4">
            <h3 className="font-mono text-lg leading-tight text-cyber-green">
              {member.name}
            </h3>
            <p className="font-mono text-xs uppercase tracking-widest text-matrix-gray">
              {member.title}
            </p>
            <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {member.expertise.slice(0, 3).map((tag) => (
                <li
                  key={tag}
                  className="pixel-border border-cyber-green/60 bg-cyber-green/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-cyber-green"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden bg-matrix-black pixel-border border-cyber-green"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex h-full flex-col gap-3 p-5">
            <div>
              <h3 className="font-mono text-base leading-tight text-cyber-green">
                {member.name}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-widest text-matrix-gray">
                {member.title}
              </p>
            </div>
            <p className="overflow-y-auto text-xs leading-relaxed text-gray-200">
              {member.bio}
            </p>
            <div className="mt-auto flex flex-col gap-2">
              <ul className="flex flex-wrap gap-1.5">
                {member.expertise.map((tag) => (
                  <li
                    key={tag}
                    className="pixel-border border-cyber-green/70 bg-cyber-green/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-cyber-green"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              {member.linkedIn && (
                <a
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="font-mono text-[11px] uppercase tracking-widest text-cyber-green underline underline-offset-4 hover:text-white"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamMemberCard;
