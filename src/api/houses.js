const BASE_URL = 'https://api.intern.d-tt.nl/api/houses'
const API_KEY = import.meta.env.VITE_HOUSES_API_KEY //an API key from Signup page,

export async function getHouses() {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'X-Api-Key': API_KEY,
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('API response:', text)
      throw new Error('API error')
    }

    return response.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}


export async function getHouse(id) {
  try {
    const response = await fetch(BASE_URL + "/" + id, {
      method: 'GET',
      headers: {
        'X-Api-Key': API_KEY,
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('API response:', text)
      throw new Error('API error')
    }

    return response.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}