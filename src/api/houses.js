/**
 * Base API URL from environment variables
 * @constant {string}
 */
const API_URL = import.meta.env.VITE_API_URL

/**
 * API key from environment variables
 * Used for authentication in request headers
 * @constant {string}
 */
const API_KEY = import.meta.env.VITE_HOUSES_API_KEY

/**
 * Fetch all houses from the API
 *
 * @async
 * @function getHouses
 * @returns {Promise<Object[]>} List of houses
 * @throws {Error} If the API request fails
 */
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

/**
 * Fetch a single house by ID
 *
 * @async
 * @function getHouse
 * @param {number} id - House ID
 * @returns {Promise<Object>} House data
 * @throws {Error} If the API request fails
 */
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

/**
 * Create a new house
 *
 * @async
 * @function postHouse
 * @param {FormData} formdata - Form data containing house information
 * @returns {Promise<Object>} Created house data
 * @throws {Error} If the API request fails
 */
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

/**
 * Edit an existing house
 *
 * @async
 * @function editHouse
 * @param {FormData} formdata - Form data containing updated house information
 * @param {number} id - House ID
 * @returns {Promise<boolean>} Returns true if update was successful
 * @throws {Error} If the API request fails
 */
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

/**
 * Delete a house by ID
 *
 * @async
 * @function deleteHouse
 * @param {number} id - House ID
 * @returns {Promise<boolean>} Returns true if deletion was successful
 * @throws {Error} If the API request fails
 */
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

/**
 * Upload an image for a specific house
 *
 * @async
 * @function uploadImg
 * @param {FormData} formatImg - Form data containing the image file
 * @param {number} id - House ID
 * @returns {Promise<boolean>} Returns true if upload was successful
 * @throws {Error} If the API request fails
 */
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
