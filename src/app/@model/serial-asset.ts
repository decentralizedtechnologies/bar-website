export class SerialAsset {

  description = ''
  images: Array<string> = []

  constructor(data) {
    Object.assign(this, data)
  }
}
