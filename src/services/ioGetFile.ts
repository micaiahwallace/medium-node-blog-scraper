import { readFile } from 'fs/promises'

export const ioGetFileString = async (file: string): Promise<string> => {
  return readFile(file, { encoding: 'utf8' })
}

export const ioGetFileJson = async (file: string): Promise<any> => {
  return JSON.parse(await ioGetFileString(file))
}