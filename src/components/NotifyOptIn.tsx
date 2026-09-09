import React, {FormEvent, useState} from 'react';
import {capture} from '@site/src/lib/posthog';
import styles from '@site/src/pages/downloads.module.css';

const endpoint = 'https://script.google.com/macros/s/AKfycbxHUnPoGBpdK-av5VYVGZav4LZMZy9PNnxHGISjbblY6zVjK3qo0gDKrecC3fkAai58rA/exec';

export default function NotifyOptIn() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
          email,
          source: 'downloads-updates-optin',
          submittedAt: new Date().toISOString(),
        }),
      });
      setStatus('success');
      capture('downloads_updates_optin_submit', {ok: true});
    } catch {
      setStatus('error');
      capture('downloads_updates_optin_submit', {ok: false});
    }
  }

  return (
    <section className={styles.optIn} aria-labelledby="updates-heading">
      <h2 id="updates-heading">Notify me about new versions</h2>
      <p>Get a short email when a new ATX binary is available.</p>
      <form onSubmit={submit} className={styles.form}>
        <label className="sr-only" htmlFor="downloads-email">Email address</label>
        <input id="downloads-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required />
        <button className="button button--secondary" type="submit">Notify me</button>
      </form>
      {status === 'success' && <p className={styles.success}>Thanks — we’ll keep you posted.</p>}
      {status === 'error' && <p className={styles.error}>We couldn’t save that address. Please try again.</p>}
    </section>
  );
}
