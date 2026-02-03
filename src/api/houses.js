const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_HOUSES_API_KEY //an API key from Signup page,

export async function getHouses() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'X-Api-Key': API_KEY,
        Accept: 'application/json',
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
    const response = await fetch(API_URL + '/' + id, {
      method: 'GET',
      headers: {
        'X-Api-Key': API_KEY,
        Accept: 'application/json',
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

export async function postHouse(formdata) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'X-Api-Key': API_KEY,
      },
      body: formdata,
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

export async function editHouse(formdata, id) {
  try {
    const response = await fetch(API_URL + '/' + id, {
      method: 'POST',
      headers: {
        'X-Api-Key': API_KEY,
      },
      body: formdata,
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('API response:', text)
      throw new Error('API error')
    }

    return true
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export async function deleteHouse(id) {
  try {
    const response = await fetch(API_URL + '/' + id, {
      method: 'DELETE',
      headers: {
        'X-Api-Key': API_KEY,
      },
    })
    if (!response.ok) {
      const text = await response.text()
      console.error('API response:', text)
      throw new Error('API error')
    }

    return true
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export async function uploadImg(formatImg, id) {
  try {
    const response = await fetch(API_URL + '/' + id + '/upload', {
      method: 'POST',
      headers: { 'X-Api-Key': API_KEY },
      body: formatImg,
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('API response:', text)
      throw new Error('API error')
    }

    return true
  } catch (error) {
    console.log('Fetch error:', error)
    throw error
  }
}
