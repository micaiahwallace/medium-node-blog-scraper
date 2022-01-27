export const log = (...msg: any[]) => {
  console.log(new Date(), '>', ...msg)
}
