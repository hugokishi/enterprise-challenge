export { Repository, DeleteResult, TreeRepository } from 'typeorm'

let connection

export const set = (cnn) => {
  if (connection) {
    throw new Error('Already connected')
  }

  connection = cnn
}

export const init = () => {
  if (!connection) {
    throw new Error('Unable connection to database')
  }

  return connection
}

export default { init, set }
