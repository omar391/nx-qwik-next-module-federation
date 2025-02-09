import * as React from 'react';
import dynamic from 'next/dynamic';
import NxWelcome from './nx-welcome';

// Dynamically import router components to avoid SSG issues
const RouterProvider = dynamic(
  () => import('react-router-dom').then((mod) => ({ 
    default: ({ children }: { children: React.ReactNode }) => {
      const { BrowserRouter } = mod;
      return <BrowserRouter>{children}</BrowserRouter>;
    }
  })),
  { ssr: false }
);

const Navigation = dynamic(
  () => import('react-router-dom').then((mod) => ({ 
    default: () => {
      const { Link, Routes, Route } = mod;
      const Remote1 = React.lazy(() => import('remote1/Module'));
      const Remote2 = React.lazy(() => import('remote2/Module'));

      return (
        <>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/remote1">Remote1</Link>
            </li>
            <li>
              <Link to="/remote2">Remote2</Link>
            </li>
          </ul>
          <Routes>
            <Route path="/" element={<NxWelcome title="shell" />} />
            <Route path="/remote1" element={
              <React.Suspense fallback={<div>Loading Remote 1...</div>}>
                <Remote1 />
              </React.Suspense>
            } />
            <Route path="/remote2" element={
              <React.Suspense fallback={<div>Loading Remote 2...</div>}>
                <Remote2 />
              </React.Suspense>
            } />
          </Routes>
        </>
      );
    }
  })),
  { ssr: false }
);

export function App() {
  return (
    <RouterProvider>
      <Navigation />
    </RouterProvider>
  );
}

// Enable static generation
export const getStaticProps = async () => {
  return {
    props: {},
  };
};

export default App;
