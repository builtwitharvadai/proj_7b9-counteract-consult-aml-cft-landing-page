'use client';

import { useEffect, useRef, useState } from 'react';

import { TEAM_MEMBERS } from '../../data/team-members';
import type { TeamMember } from '../../types/team';
import { TeamMemberCard } from './TeamMemberCard';

export interface TeamGridProps {
  members?: ReadonlyArray<TeamMember>;
  className?: string;
}

interface AnimatedGridItemProps {
  member: TeamMember;
  index: number;
}

function AnimatedGridItem({ member, index }: AnimatedGridItemProps): JSX.Element {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    if (
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined'
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const delay = index * 100;

  return (
    <div
      ref={wrapperRef}
      className={
        visible
          ? 'team-card-item team-card-item--visible'
          : 'team-card-item'
      }
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition:
          'opacity 600ms ease-out, transform 600ms ease-out',
        transitionDelay: `${delay}ms`,
      }}
    >
      <TeamMemberCard member={member} animationDelayMs={delay} />
    </div>
  );
}

export function TeamGrid({
  members = TEAM_MEMBERS,
  className,
}: TeamGridProps): JSX.Element {
  const wrapperClass = ['w-full', className].filter(Boolean).join(' ');

  return (
    <div
      className={wrapperClass}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
      }}
      role="list"
      aria-label="CounterAct team members"
    >
      {members.map((member, index) => (
        <div key={member.id} role="listitem">
          <AnimatedGridItem member={member} index={index} />
        </div>
      ))}
    </div>
  );
}

export default TeamGrid;
