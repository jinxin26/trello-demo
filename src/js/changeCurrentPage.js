const t = window.TrelloPowerUp.iframe();

window.showStatistics = function showStatistics() {
  return t.modal({
    title: 'Requirement Change Analysis',
    url: './requirementChangeAnalysis.html',
    fullscreen: true
  });
};