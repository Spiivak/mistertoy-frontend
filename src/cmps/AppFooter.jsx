import React, { useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function AppFooter() {
  const [expanded, setExpanded] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded((prevExpanded) =>
      isExpanded
        ? [...prevExpanded, panel]
        : prevExpanded.filter((item) => item !== panel)
    );
  };

  const links = [
    {
      title: 'My Account',
      items: ['PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder'],
    },
    {
      title: 'Support',
      items: ['PlaceHolder', 'PlaceHolder'],
    },
    {
      title: 'Licence',
      items: ['PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder'],
    },
    {
      title: 'About',
      items: ['PlaceHolder', 'PlaceHolder'],
    },
    {
      title: 'Rolling',
      items: ['PlaceHolder', 'PlaceHolder', 'PlaceHolder'],
    },
    {
      title: 'Community Games',
      items: ['PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder'],
    },
    {
      title: 'Best Sellers',
      items: ['PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder'],
    },
  ];

  return (
    <footer className="app-footer">
      <div className="links">
        {links.map((section, index) => (
          <Accordion
            key={index}
            expanded={expanded.includes(`panel${index}`)}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
            >
              <Typography>{section.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <div className="social text-center">
        <h4>Follow us...</h4>
        <div className="social-buttons flex justify-center">
          <button className="btn-icon small-transparent">
            <FacebookIcon />
          </button>
          <button className="btn-icon small-transparent">
            <InstagramIcon />
          </button>
          <button className="btn-icon small-transparent">
            <YouTubeIcon />
          </button>
        </div>
      </div>
      <div className="credits  text-center">
        <span>Created By <Link to="/">Eden Spivak</Link></span>
      </div>
    </footer>
  );
}
