import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

export interface CTAButtonBaseProps {
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
}

export interface CTAButtonAsButtonProps
  extends CTAButtonBaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'aria-label'> {
  href?: undefined;
}

export interface CTAButtonAsLinkProps
  extends CTAButtonBaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'aria-label' | 'href'> {
  href: string;
}

export type CTAButtonProps = CTAButtonAsButtonProps | CTAButtonAsLinkProps;

const BASE_CLASSES =
  'btn-primary cta-button inline-flex items-center justify-center gap-2 ' +
  'px-6 py-3 rounded-md font-semibold uppercase tracking-wide ' +
  'bg-[#2C3EF8] text-white border-2 border-[#2C3EF8] ' +
  'transition-colors duration-200 ' +
  'hover:bg-[#2332C6] hover:border-[#2332C6] hover:text-white ' +
  'focus:bg-[#2332C6] focus:border-[#2332C6] focus:text-white ' +
  'focus:outline focus:outline-[3px] focus:outline-[#FFD700] focus:outline-offset-2 ' +
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#FFD700] focus-visible:outline-offset-2 ' +
  'active:bg-[#1B27A3] active:border-[#1B27A3] ' +
  'disabled:bg-[#8892E6] disabled:border-[#8892E6] disabled:cursor-not-allowed';

export function CTAButton(props: CTAButtonProps): JSX.Element {
  const {
    children,
    ariaLabel = 'Get Started',
    className,
    ...rest
  } = props;

  const combinedClassName = className ? `${BASE_CLASSES} ${className}` : BASE_CLASSES;

  if ('href' in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={combinedClassName}
        {...anchorRest}
      >
        {children}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={buttonRest.type ?? 'button'}
      aria-label={ariaLabel}
      className={combinedClassName}
      {...buttonRest}
    >
      {children}
    </button>
  );
}

export default CTAButton;
