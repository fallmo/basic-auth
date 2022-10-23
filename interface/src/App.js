import React, { useState } from 'react';
import { Alert, AlertActionCloseButton } from '@patternfly/react-core';
import './App.css';

export default function App() {
  const [isShowing, setShowing] = useState(true);

  return (
    <div className="app-container">
      {isShowing && (
        <div className="notification-container">
          <Alert
            variant="success"
            title="Setup Complete"
            actionClose={<AlertActionCloseButton onClose={() => setShowing(false)} />}
          >
            You have successfully launched your patternfly starter project.
          </Alert>
        </div>
      )}
    </div>
  );
}
