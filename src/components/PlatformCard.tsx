import React from 'react';
import type {Platform, ReleaseManifest} from '@site/src/lib/manifest';
import {binaryUrl, releaseUrl} from '@site/src/lib/manifest';
import {capture} from '@site/src/lib/posthog';
import styles from '@site/src/pages/downloads.module.css';

type Props = {
  platform: Platform;
  manifest: ReleaseManifest;
  isDetected: boolean;
};

export default function PlatformCard({platform, manifest, isDetected}: Props) {
  const checksum = manifest.checksums[`${platform.os}-${platform.arch}`];
  const binary = binaryUrl(manifest.version, platform);
  const install = `curl -fsSL ${binary} -o atx\nchmod +x atx\nsudo mv atx /usr/local/bin/`;
  const releaseDate = new Date(manifest.released_at).toISOString().slice(0, 10);

  return (
    <article className={`${styles.card} ${isDetected ? styles.detected : ''}`}>
      <div className={styles.cardHeading}>
        <h2>{platform.label}</h2>
        {isDetected && <span className={styles.badge}>Your platform</span>}
      </div>
      <p className={styles.release}>ATX {manifest.version} · Released {releaseDate}</p>
      <a
        className="button button--primary button--block"
        href={binary}
        onClick={() => capture('downloads_page_binary_click', {
          os: platform.os,
          arch: platform.arch,
          version: manifest.version,
          referrer: document.referrer,
        }, {send_instantly: true})}>
        Download ATX
      </a>
      <h3>Install</h3>
      <pre className={styles.code}><code>{install}</code></pre>
      <p className={styles.checksum}><strong>SHA-256:</strong> <code>{checksum?.slice(0, 12)}</code></p>
      <pre className={styles.code}><code>{`echo "${checksum}  atx" | sha256sum -c`}</code></pre>
      <a href={releaseUrl(manifest.version)}>View GitHub release</a>
    </article>
  );
}
