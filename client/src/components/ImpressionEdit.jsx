import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';


function ImpressionEdit() {

  const { id } = useParams();
  const history = useHistory();

  const [impression, setImpression] = useState({
    select_date: '',
    study_content: '',
    meeting_check: '',
    lessen_check: '',
    impressions: '',
  });

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setImpression((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(`http://localhost:8000/api/update/${id}/`, impression)
      .then(() => {
        console.log('更新が完了しました。');
        history.push(`/details/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleMeetingYesClick = () => {
    setImpression({
      ...impression,
      meeting_check: 'yes'
    });
  };
  
  const handleMeetingNoClick = () => {
    setImpression({
      ...impression,
      meeting_check: 'no'
    });
  };
  const handleLessenYesClick = () => {
    setImpression({
      ...impression,
      lessen_check: 'yes'
    });
  };
  
  const handleLessenNoClick = () => {
    setImpression({
      ...impression,
      lessen_check: 'no'
    });
  };

return (
  <div style={{ backgroundColor: '#C2D4F2', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div style={{ width: '50rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#3078F2', textAlign: 'center' }}>日報編集画面</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="study_content">
          <Form.Label style={{ fontSize: '1.5rem', color: '#007bff' }}>勉強した内容</Form.Label>
          <Form.Control type="text" name="study_content" value={impression.study_content} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group controlId="meeting_check">
          <Form.Label style={{ fontSize: '1.5rem', color: '#007bff' }}>社内ミーティングはありましたか？</Form.Label>
          <div>
                <Button
                  variant={impression.meeting_check === 'yes' ? 'btn btn-primary' : 'btn btn-outline-primary'}
                  onClick={handleMeetingYesClick}>
                  はい
                </Button>{' '}
                <Button
                  variant={impression.meeting_check === 'no' ? 'btn btn-primary' : 'btn btn-outline-primary'}
                  onClick={handleMeetingNoClick}>
                  いいえ
                </Button>
              </div>
        </Form.Group>
        <Form.Group controlId="lessen_check">
          <Form.Label style={{ fontSize: '1.5rem', color: '#007bff' }}>プログラミングレッスンはありましたか？</Form.Label>
          <div>
                <Button
                  variant={impression.lessen_check === 'yes' ? 'btn btn-primary' : 'btn btn-outline-primary'}
                  onClick={handleLessenYesClick}>
                  はい
                </Button>{' '}
                <Button
                  variant={impression.lessen_check === 'no' ? 'btn btn-primary' : 'btn btn-outline-primary'}
                  onClick={handleLessenNoClick}>
                  いいえ
                </Button>
              </div>
        </Form.Group>
        <Form.Group controlId="impressions">
          <Form.Label style={{ fontSize: '1.5rem', color: '#007bff' }}>所感</Form.Label>
          <Form.Control as="textarea" rows={3} name="impressions" value={impression.impressions} onChange={handleInputChange} />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ backgroundColor: '#007bff', border: 'none', color: '#fff', borderRadius: '10px', padding: '10px 20px', fontSize: '1.2rem', marginTop: '2rem' }}>更新</Button>
      </Form>
    </div>
  </div>
);
}

export default ImpressionEdit;
