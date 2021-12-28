const t = window.TrelloPowerUp.iframe();

showStatistics = () => {
  return t.popup({
    title: 'Requirement Change Analysis',
    url: './requirementChangeAnalysis.html'
  });
};