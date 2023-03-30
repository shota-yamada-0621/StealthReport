import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';




function ImpressionDetails() {

  const history = useHistory()
  const formatDate = (dateString) => {
    const months = [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ];
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

    const dateObj = new Date(dateString);
    const month = months[dateObj.getMonth()];
    const date = dateObj.getDate();
    const day = weekdays[dateObj.getDay()];

    return `${month}${date}日(${day})`;
  };

  const [impression, setImpression] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/detail/${id}/`)
      .then((response) => {
        setImpression(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleDelete = useCallback(() => {
    axios
      .delete(`http://localhost:8000/api/delete/${id}/`)
      .then(() => {
        console.log('削除が完了しました。');
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // 削除後はトップページへリダイレクトする
        history.push('/impression');
      });
  }, [history, id]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/detail/${id}/`)
      .then((response) => {
        setImpression(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

    const handleEdit = () => {
      axios
      .patch(`http://localhost:8000/api/update/${id}/`)
      .then(() => {
      })
      .catch((error) => {
        console.log(error);
      });}

  return (
    <div style={{ backgroundColor: '#C2D4F2', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '45rem', margin: 'auto' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#000080', textAlign: 'center' }}>日報詳細</h2>
        <Card style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 0 20px rgba(0,0,0,0.3)' }}>
          <ListGroup variant="flush">
            <ListGroupItem style={{ fontSize: '1.5rem' }}>
              <strong style={{ color: '#3078F2' }}>日付:</strong> {formatDate(impression.select_date)}
            </ListGroupItem>
            <ListGroupItem style={{ fontSize: '1.5rem' }}>
              <strong style={{ color: '#3078F2' }}>勉強した内容:</strong> {impression.study_content}
            </ListGroupItem>
            <ListGroupItem style={{ fontSize: '1.5rem' }}>
              <strong style={{ color: '#3078F2' }}>社内ミーティング:</strong> {impression.meeting_check ==='yes' ? (
                <span>
                <strong style={{ color: '#FFA500' }}>あり</strong>
              </span>
            ) : (
              <span>
                <strong style={{ color: '#0077B6' }}>なし</strong>
              </span>
            )
              }
            </ListGroupItem>
            <ListGroupItem style={{ fontSize: '1.5rem' }}>
              <strong style={{ color: '#3078F2' }}>プログラミングレッスン:</strong> {impression.lessen_check === 'yes'? (
                <span>
                <strong style={{ color: '#FFA500' }}>あり</strong>
              </span>
            ) : (
              <span>
                <strong style={{ color: '#0077B6' }}>なし</strong>
              </span>
            )}
            </ListGroupItem>
            <ListGroupItem style={{ fontSize: '1.5rem' }}>
              <strong style={{ color: '#3078F2' }}>所感:</strong> {impression.impressions}
            </ListGroupItem>
            <ListGroupItem style={{ fontSize: '1.5rem' }}>
                    <strong style={{ color: '#3078F2' }}>AI or self:</strong> {impression.ai_check === 'yes' ? (
                    <span>
                      <strong style={{ color: '#FFA500' }}>AIで作成</strong>
                    </span>
                  ) : (
                    <span>
                      <strong style={{ color: '#0077B6' }}>自身で作成</strong>
                    </span>
                  )}
            </ListGroupItem>
          </ListGroup>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <Link to={'/Impression'}>
              <Button variant="primary" style={{ backgroundColor: '#007bff', border: 'none', fontSize: '1.5rem' }}>
                戻る
              </Button>
            </Link>
            <Link to={`/edit/${id}/`} style={{marginLeft: '1rem'}}>
              <Button variant="warning" style={{ backgroundColor: '#ffc107', border: 'none', fontSize: '1.5rem' }} onclick ={handleEdit}>
                編集
              </Button>
            </Link>
              <Button variant="danger" style={{ backgroundColor: '#dc3545', border: 'none', marginLeft: '1rem', fontSize: '1.5rem' }} onClick={handleDelete}>
                削除
              </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ImpressionDetails;
