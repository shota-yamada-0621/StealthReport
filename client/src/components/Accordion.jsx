import Accordion from 'react-bootstrap/Accordion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './static/AccordionPage.css';

function AccordionPage() {

  const formatDate = (dateString) => {
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  
    const dateObj = new Date(dateString);
    const month = months[dateObj.getMonth()];
    const date = dateObj.getDate();
    const day = weekdays[dateObj.getDay()];
  
    return `${month}${date}日(${day})`;
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const renderAccordionItems = () => {
    const sortedData = [...data].sort((a, b) => new Date(b.select_date) - new Date(a.select_date));
    const limitedData = sortedData.slice(0, 5);
    return limitedData.map((item, index) => (
      <Accordion.Item eventKey={index} key={index}>
        <Accordion.Header>{formatDate(item.select_date)}</Accordion.Header>
        <Accordion.Body>{item.impressions}</Accordion.Body>
      </Accordion.Item>
    ));
  };

  return (
    <Accordion defaultActiveKey="0" className='accordion'>
      {renderAccordionItems()}
    </Accordion>
  );
}

export default AccordionPage;
