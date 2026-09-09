import posthog from 'posthog-js';
import siteConfig from '@generated/docusaurus.config';

const {posthogKey: key, posthogHost} = siteConfig.customFields as {
  posthogKey?: string;
  posthogHost?: string;
};

if (typeof window !== 'undefined' && key) {
  posthog.init(key, {
    api_host: posthogHost || 'https://us.i.posthog.com',
    // This is the current PostHog setting; posthog-js's type has not caught up yet.
    person_profiles: 'identified_or_anonymous' as never,
    cookie_domain: '.iteration.sh',
    capture_pageview: false,
    capture_pageleave: true,
  } as never);
}

export function capture(event: string, properties?: Record<string, unknown>, options?: Record<string, unknown>) {
  if (key) posthog.capture(event, properties, options);
}
