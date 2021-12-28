const t = window.TrelloPowerUp.iframe();

showStatistics = function() {
  return t.modal({
    title: 'Requirement Change Analysis',
    url: './requirementChangeAnalysis.html',
    fullscreen: true
  })
}