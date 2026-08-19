import React, { useState } from 'react';
import styles from './Contact.module.css';

export interface ContactProps {
  heading?: string;
  submitLabel?: string;
  onSubmit?: (values: { name: string; email: string; message: string }) => void;
}

export function Contact({
  heading = 'Get in touch',
  submitLabel = 'Send message',
  onSubmit,
}: ContactProps): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit({ name, email, message });
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={`${styles.section} bg-matrix-black`}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <span
            className={`${styles.eyebrow} bg-brand-blue/15 border-brand-blue text-brand-blue`}
          >
            Contact
          </span>
          <h2
            id="contact-heading"
            className={`${styles.title} font-heading text-white`}
          >
            {heading}
          </h2>
        </header>

        <form
          className={`${styles.form} border-brand-blue`}
          onSubmit={handleSubmit}
          noValidate
        >
          <label className={styles.field}>
            <span className={`${styles.label} text-brand-blue`}>Name</span>
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={`${styles.input} border-brand-blue focus:border-brand-blue-light`}
            />
          </label>

          <label className={styles.field}>
            <span className={`${styles.label} text-brand-blue`}>Email</span>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={`${styles.input} border-brand-blue focus:border-brand-blue-light`}
            />
          </label>

          <label className={styles.field}>
            <span className={`${styles.label} text-brand-blue`}>Message</span>
            <textarea
              name="message"
              required
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className={`${styles.textarea} border-brand-blue focus:border-brand-blue-light`}
            />
          </label>

          <button
            type="submit"
            className={`${styles.submit} bg-brand-blue hover:bg-brand-blue-dark focus-visible:ring-brand-blue-light text-white border-brand-blue`}
          >
            {submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
