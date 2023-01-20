export function generateProgressPercentage(total: number, done: number) {
  return Math.floor((done / total) * 100);
}