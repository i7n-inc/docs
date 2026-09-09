import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import PlatformCard from '@site/src/components/PlatformCard';
import NotifyOptIn from '@site/src/components/NotifyOptIn';
import {capture} from '@site/src/lib/posthog';
import {detectPlatform, platforms, useManifest} from '@site/src/lib/manifest';
import styles from './downloads.module.css';

export default function Downloads(): React.JSX.Element {
  const {manifest, pinnedVersion} = useManifest();
  const [detectedPlatform, setDetectedPlatform] = useState<string>();

  useEffect(() => {
    setDetectedPlatform(detectPlatform());
    capture('downloads_page_view', {version: manifest.version, referrer: document.referrer});
  }, []);

  return (
    <Layout title="Downloads" description="Download ATX for macOS and Linux.">
      <main className="container margin-vert--xl">
        <section className={styles.hero}>
          <p className={styles.eyebrow}>ATX CLI</p>
          <h1>Download ATX</h1>
          <p>Choose your platform and get from download to your first review without a gate.</p>
          {pinnedVersion && <p className={styles.pinned}>Showing pinned release <strong>{manifest.version}</strong>.</p>}
        </section>

        <section className={styles.grid} aria-label="ATX downloads">
          {platforms.map((platform) => (
            <PlatformCard
              key={`${platform.os}-${platform.arch}`}
              platform={platform}
              manifest={manifest}
              isDetected={detectedPlatform === `${platform.os}-${platform.arch}`}
            />
          ))}
        </section>

        <section className={styles.next} aria-labelledby="next-heading">
          <h2 id="next-heading">What’s next?</h2>
          <p>After installing, <a href="/quickstart">configure ATX, run <code>atx project init</code>, and complete your first review.</a></p>
        </section>

        <NotifyOptIn />
      </main>
    </Layout>
  );
}
