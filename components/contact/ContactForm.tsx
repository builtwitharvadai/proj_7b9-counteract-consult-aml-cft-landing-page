'use client';

import { FormEvent, useState } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

type ButtonState = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm(): JSX.Element {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [buttonState, setButtonState] = useState<ButtonState>('idle');
  const [formMessage, setFormMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [disabled, setDisabled] = useState(false);

  function validate(form: HTMLFormElement): FieldErrors {
    const next: FieldErrors = {};
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim();

    if (!name) next.name = 'Please enter your name.';
    if (!email) next.email = 'Please enter your email address.';
    else if (!EMAIL_REGEX.test(email)) next.email = 'Please enter a valid email address.';
    if (!message) next.message = 'Please enter a message.';

    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setFormMessage(null);

    if (Object.keys(nextErrors).length > 0) {
      setFormMessage({
        type: 'error',
        text: 'Please fix the highlighted fields and try again.',
      });
      return;
    }

    setButtonState('loading');
    setDisabled(true);

    try {
      const response = await fetch(form.action, {
        method: form.method || 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.status >= 200 && response.status < 300) {
        setButtonState('success');
        setFormMessage({
          type: 'success',
          text: 'Thank you! Your message has been sent successfully.',
        });
        window.setTimeout(() => {
          form.reset();
          setButtonState('idle');
          setDisabled(false);
          setFormMessage(null);
        }, 3000);
      } else {
        throw new Error(`Submission failed with status ${response.status}`);
      }
    } catch {
      setButtonState('error');
      setDisabled(false);
      setFormMessage({
        type: 'error',
        text: 'Something went wrong. Please try again or email us directly.',
      });
      window.setTimeout(() => {
        setButtonState('idle');
        setFormMessage(null);
      }, 3000);
    }
  }

  const buttonLabel =
    buttonState === 'loading'
      ? 'Sending...'
      : buttonState === 'success'
        ? 'Sent!'
        : buttonState === 'error'
          ? 'Failed - Retry'
          : 'Send Message';

  return (
    <form
      id="contact-form"
      className="contact-form"
      action="https://formspree.io/f/YOUR_FORM_ID"
      method="POST"
      aria-labelledby="contact-heading"
      noValidate
      onSubmit={onSubmit}
    >
      <div className="form-group">
        <label htmlFor="name">
          Name <span aria-label="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          aria-required="true"
          autoComplete="name"
          aria-invalid={errors.name ? 'true' : 'false'}
          disabled={disabled}
        />
        {errors.name ? (
          <span className="field-error" role="alert">
            {errors.name}
          </span>
        ) : null}
      </div>
      <div className="form-group">
        <label htmlFor="email">
          Email <span aria-label="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          aria-required="true"
          autoComplete="email"
          inputMode="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          disabled={disabled}
        />
        {errors.email ? (
          <span className="field-error" role="alert">
            {errors.email}
          </span>
        ) : null}
      </div>
      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          autoComplete="organization"
          disabled={disabled}
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">
          Message <span aria-label="required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-required="true"
          aria-invalid={errors.message ? 'true' : 'false'}
          disabled={disabled}
        />
        {errors.message ? (
          <span className="field-error" role="alert">
            {errors.message}
          </span>
        ) : null}
      </div>
      <button
        type="submit"
        className={`submit-btn${buttonState !== 'idle' ? ` ${buttonState}` : ''}${
          buttonState === 'loading' ? ' skeleton' : ''
        }`}
        disabled={disabled}
        aria-busy={buttonState === 'loading'}
      >
        <span className="btn-text">{buttonLabel}</span>
      </button>
      <div
        id="form-message"
        className={`form-message${formMessage ? ` ${formMessage.type} visible` : ''}`}
        role="status"
        aria-live="polite"
      >
        {formMessage?.text ?? ''}
      </div>
    </form>
  );
}
