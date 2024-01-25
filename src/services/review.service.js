import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'


export const reviewService = {
  add,
  query,
  remove
}

async function query() {
  const reviews = await httpService.get(`review`);
  return reviews
}

async function remove(reviewId) {
  await httpService.delete(`review/${reviewId}`)
}

async function add({txt, rate, byUserId, aboutToyId}) {
  const addedReview = await httpService.post(`review`, { txt, rate, byUserId, aboutToyId })
  return addedReview
  // const aboutUser = await userService.getById(aboutUserId)

  // const reviewToAdd = {
  //   txt,
  //   byUser: userService.getLoggedinUser(),
  //   aboutUser: {
  //     _id: aboutUser._id,
  //     fullname: aboutUser.fullname,
  //     imgUrl: aboutUser.imgUrl
  //   }
  // }

  // reviewToAdd.byUser.score += 10
  // await userService.update(reviewToAdd.byUser)
  // const addedReview = await storageService.post('review', reviewToAdd)
  // return addedReview
}