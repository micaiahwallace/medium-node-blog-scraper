import { writeFile } from 'fs/promises'

export const ioWriteFileJson = async (
  file: string,
  data: any
): Promise<void> => {
  await writeFile(file, JSON.stringify(data, null, '\t'))
}
