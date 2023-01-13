export function popupSnack() {
  const x = document.getElementById(`snackbar`);
  x.className = `show`;
  setTimeout(() => { x.className = x.className.replace(`show`, ``); }, 3000);
}
export function riskLevel_color(p_score) {
  switch (true) {
    case p_score <= 1:
      return `riskLevel_low bkClExclude1`;
    case p_score <= 3 &&
         p_score >= 1:
      return `riskLevel_medium bkClExclude1`;
    case p_score <= 5 &&
      p_score >= 4:
      return `riskLevel_high bkClExclude1`;
    default:
      return `riskLevel_low bkClExclude1`;
  }
}
export function riskLevel_text(p_score) {
  switch (true) {
    case p_score <= 1:
      return `Low`;
    case p_score <= 3 &&
      p_score >= 1:
      return `Medium`;
    case p_score <= 5 &&
      p_score >= 4:
      return `High`;
    default:
      return `Low`;
  }
}
export function sum(obj) {
  let objSum = 0;
  for (const el in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, el)) {
      objSum += parseFloat(obj[el]);
    }
  }
  return objSum;
}
