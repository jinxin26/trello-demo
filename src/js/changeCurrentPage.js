const t = window.TrelloPowerUp.iframe();

showStatistics = () => {
  return t.modal({
    title: 'Requirement Change Analysis',
    url: './requirementChangeAnalysis.html',
    fullscreen: true
  });
};

showVersionRecord = () => {
  return t.modal({
    title: 'Version Record',
    url: './requirementChangeAnalysis.html',
    fullscreen: true
  })
}