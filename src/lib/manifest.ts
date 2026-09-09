import {useEffect, useState} from 'react';
import fallbackManifest from '@site/src/generated/manifest.json';

export type Platform = {
  os: 'darwin' | 'linux';
  arch: 'amd64' | 'arm64';
  label: string;
};

export type ReleaseManifest = {
  version: string;
  released_at: string;
  checksums: Record<string, string>;
};

export const platforms: Platform[] = [
  {os: 'darwin', arch: 'arm64', label: 'macOS · Apple Silicon'},
  {os: 'darwin', arch: 'amd64', label: 'macOS · Intel'},
  {os: 'linux', arch: 'arm64', label: 'Linux · ARM64'},
  {os: 'linux', arch: 'amd64', label: 'Linux · x86_64'},
];

export const manifestSnapshot = fallbackManifest as ReleaseManifest;
const releasesBase = 'https://github.com/i7n-inc/atx-releases/releases';

export function manifestUrl(version?: string): string {
  return version
    ? `${releasesBase}/download/${encodeURIComponent(version)}/version.json`
    : `${releasesBase}/latest/download/version.json`;
}

export function releaseUrl(version: string): string {
  return `${releasesBase}/tag/${encodeURIComponent(version)}`;
}

export function binaryUrl(version: string, platform: Platform): string {
  return `${releasesBase}/download/${encodeURIComponent(version)}/atx-${encodeURIComponent(version)}-${platform.os}-${platform.arch}`;
}

export function useManifest(): {manifest: ReleaseManifest; pinnedVersion?: string} {
  const [manifest, setManifest] = useState(manifestSnapshot);
  const [pinnedVersion, setPinnedVersion] = useState<string>();

  useEffect(() => {
    const version = new URLSearchParams(window.location.search).get('version')?.trim() || undefined;
    setPinnedVersion(version);
    fetch(manifestUrl(version))
      .then((response) => {
        if (!response.ok) throw new Error(`Manifest request failed: ${response.status}`);
        return response.json() as Promise<ReleaseManifest>;
      })
      .then((nextManifest) => {
        if (nextManifest.version && nextManifest.released_at && nextManifest.checksums) setManifest(nextManifest);
      })
      .catch(() => {
        // The server-rendered build snapshot remains usable offline or on a failed request.
      });
  }, []);

  return {manifest, pinnedVersion};
}

export function detectPlatform(): string | undefined {
  if (typeof navigator === 'undefined') return undefined;
  const agentData = (navigator as Navigator & {userAgentData?: {platform?: string}}).userAgentData;
  const source = `${agentData?.platform ?? ''} ${navigator.userAgent} ${navigator.platform}`.toLowerCase();
  const os = /mac|darwin/.test(source) ? 'darwin' : /linux/.test(source) ? 'linux' : undefined;
  const arch = /arm|aarch64/.test(source) ? 'arm64' : /x86_64|x64|win64|amd64/.test(source) ? 'amd64' : undefined;
  return os && arch ? `${os}-${arch}` : undefined;
}
