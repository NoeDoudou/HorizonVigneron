import React, { Suspense } from 'react';

// Lazy load the component
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function YourComponent() {
  return (
    <div>
      <h1>Welcome to the Vineyard Booking</h1>
      {/* Use Suspense to wrap the lazy-loaded component */}
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

export default YourComponent;