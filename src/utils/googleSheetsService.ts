
// This utility connects the form to Google Sheets using the Sheets API

export const submitToGoogleSheets = async (formData: {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}) => {
  // This is the Google Sheets API endpoint for form submissions
  // The script URL must be deployed as a Google Apps Script Web App
  const sheetsApiUrl = "https://script.google.com/macros/s/AKfycbwwiGOo_GTsInYtvNV3CfRXJLr2W2wRVRzQO9GVHhA-mcDtvXv0okhEt7q56atT5eFV/exec";

  try {
    // Format timestamp in local timezone
    const timestamp = new Date().toLocaleString();

    // Prepare data for the sheet
    const dataToSubmit = {
      timestamp,
      ...formData
    };

    console.log("Enviando datos a Google Sheets:", dataToSubmit);

    // Convert data to URLSearchParams
    const params = new URLSearchParams();
    Object.entries(dataToSubmit).forEach(([key, value]) => {
      params.append(key, value as string);
    });

    // Use JSONP approach by creating a script element
    // This is one of the most reliable ways to bypass CORS for GET requests
    return new Promise((resolve, reject) => {
      // Create a unique callback name
      const callbackName = 'googleSheetsCallback_' + Math.random().toString(36).substring(2, 15);
      
      // Add the callback to window
      (window as any)[callbackName] = (response: any) => {
        // Clean up
        delete (window as any)[callbackName];
        document.body.removeChild(script);
        
        // Handle response
        if (response && response.result === 'success') {
          resolve({ success: true });
        } else {
          reject({ 
            success: false, 
            error: response?.error || 'Unknown error occurred' 
          });
        }
      };
      
      // Create script element
      const script = document.createElement('script');
      script.src = `${sheetsApiUrl}?${params.toString()}&callback=${callbackName}`;
      script.onerror = () => {
        // Clean up
        delete (window as any)[callbackName];
        document.body.removeChild(script);
        
        reject({ 
          success: false, 
          error: 'Failed to connect to Google Sheets API' 
        });
      };
      
      // Add script to body
      document.body.appendChild(script);
      
      // Set timeout to prevent hanging
      setTimeout(() => {
        if ((window as any)[callbackName]) {
          delete (window as any)[callbackName];
          document.body.removeChild(script);
          reject({ 
            success: false, 
            error: 'Request timed out' 
          });
        }
      }, 10000); // 10 seconds timeout
    });
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
};
