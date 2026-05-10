import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page does not exist',
  openGraph: {
    title: 'Page not found',
    description: 'This page does not exist',
    url: 'https://notehub.com/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function NotFound() {
  return <h1>404 - Page not found</h1>;
}