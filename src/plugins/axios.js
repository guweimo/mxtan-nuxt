import axios from 'axios'

const options = {}

// if (process.server) {
options.baseURL = `https://api.guweimo.com/`
// }

const service = axios.create(options)

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return error
  }
)

export default service
