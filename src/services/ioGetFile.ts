import { readFile } from 'fs/promises'

export const ioGetFileString = async (file: string): Promise<string> => {
  try {
    return readFile(file, { encoding: 'utf8' })
  } catch (e) {
    return ''
  }
}

export const ioGetFileJsonArray = async (file: string): Promise<any[]> => {
  try {
    return JSON.parse(await ioGetFileString(file))
  } catch (e) {
    return []
  }
}
