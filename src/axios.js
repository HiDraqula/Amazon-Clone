import axios from "axios";

const instance = axios.create({
  baseURL: 'https://us-central1-clones-25409.cloudfunctions.net/api'
  //'http://localhost:5001/clones-25409/us-central1/api'  // API Cloud Function URL
})

export default instance;