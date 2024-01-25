// function uplopadImg(ev) {
//   const CLOUD_NAME = 'donnezwy9'
//   const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

//   const formData = new FormData()
//   formData.append('file', ev.target.files[0])

//   formData.append('upload_preset', 'insert2')

//   return fetch(UPLOAD_URL, {
//     method: 'POST',
//     body: formData,
//   })
//   .then((res) => res.json())
//   .then(res => {
//     const elImg = document.createElement('img')
//     elImg.src = res.url
//     document.body.appendChild(elImg)
//   })
//   .catch(err => console.error(err))
// }

export const uploadService = {
  uploadImg
}

async function uploadImg(ev) {
  const CLOUD_NAME = "donnezwy9"
  const UPLOAD_PRESET = "evfo7s5e"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  try {
    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('file', ev.target.files[0])

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    })
    const imgUrl = await res.json()
    return imgUrl
  } catch (err) {
    console.error('Failed to upload', err)
    throw err
  }
}