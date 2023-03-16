import axios from 'axios'

async function verifyLogin (parameters) {
  console.log('Parameters:', parameters)
  const prefix = 'https://api.propapp.dev'
  // 'http://127.0.0.1:5000'
  // 'https://api.propapp.dev' // 'http://127.0.0.1:80'
  try {
    const url = new URL(`${prefix}/verify-login`)
    const params = {
      username: parameters.username,
      password: parameters.password
    }
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, value)
    }
    const res = await axios.get(url, config)
    console.log('RESULT of verify login:', res)
    return res
  } catch (error) {
    console.log(error)
  }
};
export default verifyLogin
