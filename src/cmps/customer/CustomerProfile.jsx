import SummarizeIcon from '@mui/icons-material/Summarize';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';

export function CustomerProfile() {
  return (
    <section className="customer-profile">
      <div className="profile-header flex space-between">
        <button className='btn-icon small-transparent'><ArrowBackIcon /></button>
        <h4>My Profile</h4>
        <button className='btn-icon small-transparent'><MoreVertIcon /></button>
      </div>
      <div className="profile-card flex column align-center">
        <img src="" alt="Customer Image" />
        <span>Customer Name</span>
        <button><EditIcon /></button>
      </div>
      <div className="quick-actions flex space-between">
        <button className="btn-ctn medium-primary my-orders flex column align-center">
          <SummarizeIcon />
          My Orders
        </button>
        <button className="btn-ctn medium-primary my-orders flex column align-center">
          <FavoriteIcon />
          Wishlist
        </button>
        <button className="btn-ctn medium-primary my-orders flex column align-center">
          <NotificationsIcon />
          Notifications
        </button>      </div>
      <div className="actions">
        {/* <div className="my-orders"></div> */}

      </div>
    </section>
  )
}
