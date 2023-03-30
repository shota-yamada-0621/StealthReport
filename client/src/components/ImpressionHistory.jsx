import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import axios from 'axios';


function ImpressionHistory() {

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

  const sortedData = [...data].sort((a, b) => new Date(b.select_date) - new Date(a.select_date));

  const renderborderedHover = () => {
    return sortedData.map((item, index) => (
      <tbody key={index}>
        <tr>
          <td>{formatDate(item.select_date)}</td>
          <td>{item.study_content}</td>
          <td>{item.impressions}</td>
          <td>
              <span>
                {item.ai_check === 'yes' ? 'AIで作成' : '自身で作成'}
              </span>
          </td>
          <td>
            <Link to={`/details/${item.id}`} className="btn btn-primary">詳細</Link>
          </td>
        </tr>
      </tbody>
    ));
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <div className="container-fluid">
          <a className="navbar-brand text-blue" href="/">StealthReport</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active text-blue" aria-current="page" to={'/'}>トップページ</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-blue" to={'/form'}>日報作成</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-blue" to={'/Impression'}>所感履歴</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <br></br>
      <h2>作成した日報一覧</h2>
      <br></br>
      <Table striped bordered hover>
        <colgroup>
            <col style={{ width: '15%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>日付</th>
            <th>勉強した内容</th>
            <th>所感</th>
            <th>AI or self</th>
            <th>詳細</th>
          </tr>
        </thead>
        <style>
          {`
            th:nth-child(2) {
              width: 200px;
            }
          `}
        </style>
        {renderborderedHover()}
      </Table>
    </div>
  );
}

export default ImpressionHistory;
