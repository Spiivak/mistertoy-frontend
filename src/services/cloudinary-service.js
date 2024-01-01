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



const uploadImg = async (ev) => {
  const CLOUD_NAME = 'donnezwy9'
  const UPLOAD_PRESET = 'evfo7s5e'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const FORM_DATA = new FormData()

  FORM_DATA.append('file', ev.target.files[0])
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)


  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: FORM_DATA,
    })
    const elImg = document.createElement('img')
    const { url } = await res.json()
    elImg.src = url
    document.body.appendChild(elImg)
  } catch (error) {
    console.error(error)
  }
}