export default function toMinutes(seconds) {
  return `${
    Math.floor(seconds / 3600) ? Math.floor(seconds / 3600) + ":" : ""
  }${Math.floor((seconds % 3600) / 60) < 10 ? "0" : ""}${Math.floor(
    (seconds % 3600) / 60
  )}:${seconds % 60 < 10 ? "0" : ""}${seconds % 60}`;
}
