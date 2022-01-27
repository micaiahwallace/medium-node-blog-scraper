import moment from 'moment'

export const formatDate = (
  date: string,
  format: string = 'MMM DD, YYYY HH:mm:ss'
): string => {
  return moment(date).format(format)
}
