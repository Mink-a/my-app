// i18n.config.ts

export const locales = ['en', 'mya'] as const;
export type Locale = (typeof locales)[number];
