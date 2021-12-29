const t = window.TrelloPowerUp.iframe();

showStatistics = () => {
  return t.modal({
    title: 'Requirement Change Analysis',
    url: './requirementChangeAnalysis.html'
  });
};

showVersionRecord = () => {
  return t.modal({
    title: 'Version Record',
    url: './requirementChangeAnalysis.html'
  })
}