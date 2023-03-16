import axios from 'axios'

async function saveProperties (userId, parameters) {
  const prefix = 'https://api.propapp.dev'
  // 'http://127.0.0.1:5000'
  // 'https://api.propapp.dev'
  try {
    const url = new URL(`${prefix}/saved-properties`)
    const body = {
      userId,
      selected_ids: parameters
    }
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post(url, body, config)
    console.log('res:', res)
    return res
  } catch (error) {
    console.log(error)
  }
};
export default saveProperties
