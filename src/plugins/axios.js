import axios from 'axios'

const options = {}

if (process.server) {
  options.baseURL = `htpps://api.guweimo.comg/`
}

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
