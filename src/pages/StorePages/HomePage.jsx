import { ImageSlider } from "../../cmps/store/ImageSlider";
import Lego from "../../assets/img/categories/lego.jpg"
import Until20 from "../../assets/img/categories/until20.png"
import Until30 from "../../assets/img/categories/until30.webp"
import GiftCard from "../../assets/img/categories/1-gift-card.png"
import New from "../../assets/img/categories/2-new.png"
import Sale from "../../assets/img/categories/3-sale.png"
import Giraffe from "../../assets/img/categories/4-giraffe.png"
import PowerCard from "../../assets/img/categories/5-power-card-black.png"
import FindGift from "../../assets/img/categories/6-find-gift.png"

export function HomePage() {
  return (
    <section className="home-page">
      <div className="image-slider">
        <ImageSlider />
      </div>
      <div className="category-card-wrapper">
        <div className="category-card">
          <img src={Until20} alt="" />
          <h4>Products until $5</h4>
        </div>
        <div className="category-card">
          <img src={Until30} alt="" />
          <h4>Board games until $10</h4>
        </div>
        <div className="category-card">
          <img src={Lego} alt="" />
          <h4>Lego kits</h4>
        </div>
      </div>
      <div className="category-links-wrapper flex space-between">
        <div className="category-card">
          <img src={FindGift} alt="" />
          <h4>Find Gift</h4>
        </div>
        <div className="category-card">
          <img src={Sale} alt="" />
          <h4>Sale</h4>
        </div>
        <div className="category-card">
          <img src={New} alt="" />
          <h4>New Products</h4>
        </div>
        <div className="category-card">
          <img src={Giraffe} alt="" />
          <h4>Best Seller</h4>
        </div>
        <div className="category-card">
          <img src={PowerCard} alt="" />
          <h4>Join the Club</h4>
        </div>
        <div className="category-card">
          <img src={GiftCard} alt="" />
          <h4>Gift Card</h4>
        </div>
      </div>
      <div className="popular-product-slider">
        {/* <ProductSlider type={'popular'}> */}
      </div>
      <div className="until50-product-slider">
        {/* <ProductSlider type={'popular'}> */}
      </div>
    </section>
  )
}
