declare global {
  interface Window {
    dataLayer: Record<string, any>[]
  }
}

// Custom types declarations
declare var myString: string

// Astro types, not necessary if you already have a `tsconfig.json`
/// <reference path="../.astro/types.d.ts" />

export {}
