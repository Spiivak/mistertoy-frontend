// const { useEffect, useState } = React
// const { useParams, useNavigate, Link } = ReactRouterDOM
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect, useState } from "react"
import { toyService } from "../../services/toy.service.js"
import { showErrorMsg } from "../../services/event-bus.service.js"
import { useNavigate, useParams } from "react-router-dom"
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { ReviewAdd } from '../../cmps/review/ReviewAdd.jsx';
import { ReviewPreview } from '../../cmps/review/ReviewPreview.jsx';
import { loadReviews } from '../../store/actions/review.actions.js';
import { useSelector } from 'react-redux';
// import { Box, Tab, Tabs, Typography } from '@mui/material';

export function ToyDetails() {
    const reviews = useSelector((storeState) => storeState.reviewModule.reviews);
    console.log('ToyDetails  reviews:', reviews)
    
    const [toy, setToy] = useState(null)
    const [amount, setAmount] = useState(1)
    const { toyId } = useParams()
    const navigate = useNavigate()
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        loadToy()
        onLoadReviews()
    }, [toyId])

    const handleAmountChange = (diff) => {
        if (amount === 100) return
        const newAmount = amount + diff;
        setAmount(Math.max(0, newAmount)); // Ensure the amount is not less than 0
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };


    const handleAddToCart = () => {
        // Implement logic to add the item to the cart with the specified amount
        // You can use an action, context, or any state management method for this
        console.log(`Added ${amount} ${toy.name} to cart`);
    }

    async function loadToy() {
        try {
            const toyToGet = await toyService.getById(toyId)
            setToy(toyToGet)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/catalog')
        }
    }

    async function onLoadReviews () {
        try {
          return await loadReviews()
        } catch (error) {
          setIsLoading(false)
          console.error('Error loading reviews:', error);
    
        }
      }
    

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details flex">
            {/* IMG PREVIEW */}
            <section className="toy-image-slider">
                <img src={toy.img}></img>
            </section>

            {/* TOY INFO */}
            <section className="toy-information">
                <h1>{toy.name}</h1>
                <div>
                <span>Amount</span>
                <div className="amount-section flex align-center">
                    <div className="amount-increase">
                        <button className="btn-increase" onClick={() => handleAmountChange(1)}>+</button>
                        <span>{amount}</span>
                        <button className="btn-decrease" onClick={() => handleAmountChange(-1)} disabled={amount === 1}>
                            -
                        </button>
                    </div>
                    <h4>Price: ${parseFloat((toy.price * amount).toFixed(2))}</h4>
                </div>
                </div>
                <div className="toy-details-actions flex gap16 align-center">
                    <button className="btn-ctn medium-primary" onClick={() => handleAmountChange()}>Add to cart</button>

                    <button className="btn-icon small-transparent"><FavoriteBorderIcon /></button>
                </div>
            </section>
            <section className="review-container">
            <ReviewAdd/>
            <ReviewPreview />
            </section>
            <section className="information">
                <div className="product-delivery">
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="Toy Information Tabs">
                        <Tab label="Delivery and Supply" />
                        <Tab label="Product Description" />
                    </Tabs>

                    <TabPanel value={tabValue} index={1}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum esse odio iure repudiandae id iusto libero sit aliquam facilis aperiam.</p>
                        <ul className='clean-list'>
                            <li>Product Code: 118290</li>
                            <li>Age Range: 3-10 years</li>
                            <li>Brand: STEFI</li>
                        </ul>
                    </TabPanel>
                    <TabPanel value={tabValue} index={0}>
                        <ul className='flex column gap16'>
                            <li>
                                Delivery within 5 business days: ₪30. (Except for exceptions*).
                            </li>
                            <li>
                                *Exceptional products will be charged an additional delivery fee of ₪100 per unit:
                                Products larger than the dimensions of 40X80X60 cm, products weighing between 15-45 kg, multimedia consoles
                            </li>
                            <li>
                                Express same-day delivery: ₪39
                                According to the delivery policy.
                                Delivery Policy.
                            </li>
                            <li>
                                Free self-collection from network branches, within 2 business days - according to the shipping policy.
                                For the list of branches.
                            </li>
                        </ul>
                    </TabPanel>
                </div>
            </section>
        </section>
    );
}

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && (
                <Box p={3}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}
