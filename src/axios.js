import axios from "axios";

const instance = axios.create({
  // API Cloud Function URL
  baseURL:
    'https://us-central1-clones-25409.cloudfunctions.net/api'
  // 'http://localhost:5001/clones-25409/us-central1/api'
})

export default instance;