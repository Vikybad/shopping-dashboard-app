// src/components/SnackbarManager.js
import React, { useState } from 'react';
import SnackbarAlert from './SnackbarAlert';

const SnackbarManager = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    autoHideDuration: 6000,
    redirectToPath: ''
  });

  const showSnackbar = ({ message, severity = 'success', autoHideDuration = 6000, redirectToPath = '' }) => {
    setSnackbar({
      open: true,
      message,
      severity,
      autoHideDuration,
      redirectToPath
    });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      {children(showSnackbar)}
      <SnackbarAlert
        open={snackbar.open}
        onClose={handleClose}
        message={snackbar.message}
        severity={snackbar.severity}
        autoHideDuration={snackbar.autoHideDuration}
        redirectToPath={snackbar.redirectToPath}
      />
    </>
  );
};

export default SnackbarManager;
