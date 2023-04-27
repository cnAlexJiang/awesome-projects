// Alert message using AutoAnimate
 

import React, { useState, useRef } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function demo2() {
  const [parent] = useAutoAnimate(/* optional config */);

  const [showButton, setShowButton] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const nodeRef = useRef(null);

  return (
    <div style={{ paddingTop: '2rem' }}>
      {showButton && (
        <Button
          onClick={() => setShowMessage(true)}
          size="lg"
        >
          显示动画
        </Button>
      )}
      <div ref={parent}>
        {showMessage && (
          <Alert
            ref={nodeRef}
            variant="primary"
            dismissible
            onClose={() => setShowMessage(false)}
          >
            <Alert.Heading>
              Animated alert message
            </Alert.Heading>
            <p>
              This alert message is being transitioned in
              and out of the DOM.
            </p>
            <Button
              variant="primary"
              onClick={() => setShowMessage(false)}
            >
              Close
            </Button>
          </Alert>
        )}
      </div>
    </div>
  );
}
 