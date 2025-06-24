export function hasTitleAndBody(title: string, body: string): boolean {
  return title.trim() !== "" && body.trim() !== "";
}
