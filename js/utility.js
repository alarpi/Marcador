export function formatNumber(number) {
  return number < 10 ? "0" + number : number;
}

export function downloadResults(localValues, fileName) {
  let anchor = document.createElement("a");
  anchor.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(localValues)
  );
  anchor.setAttribute("download", fileName);
  anchor.click();
}

export function reproduceSound(fileSource) {
  new Audio(fileSource).play();
}

export function getCurrentTime() {
  let date = new Date();
  return (
    formatNumber(date.getDate()) +
    "-" +
    formatNumber(date.getMonth() + 1) +
    "-" +
    date.getFullYear() +
    "_" +
    formatNumber(date.getHours()) +
    "_" +
    formatNumber(date.getMinutes()) +
    "_" +
    formatNumber(date.getSeconds())
  );
}
