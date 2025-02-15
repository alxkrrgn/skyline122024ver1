// src/utils.js
export const injectScript = (projectId, scriptId) => {
  if (document.getElementById(scriptId)) {
    console.warn('Clarity script is already injected.');
    return;
  }

  const script = document.createElement('script');
  script.id = scriptId;
  script.type = 'text/javascript';
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${projectId}`;
  script.onload = () => console.log('Clarity script loaded successfully.');
  document.head.appendChild(script);
};
