import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdditionalContentExample from './AdditionalContent';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory } from 'react-router-dom';
import { Blocks } from  'react-loader-spinner'
import FormModal from './FormModal';


function MyForm() {

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const history = useHistory()

  const [formState, setFormState] = useState({
    study_content: '',
    meeting_check: '',
    lessen_check: '',
    impressions: '',
    report_direction: '',
    select_date: new Date(),
    ai_check:'',
  });

  const handleChange = (e) => {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:8000/api/create/', formState, {
        });
        console.log(response.data);
        setIsModalOpen(true);
        history.push('/');
      } catch (error) {
        console.log(formState);
        console.error(error);
      } finally {
        setIsLoading(false); 
      }
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
      history.push('/');
    }

  const handleYesClick = () => {
    setFormState({
      ...formState,
      ai_check: 'yes'
    });
  };
  
  const handleNoClick = () => {
    setFormState({
      ...formState,
      ai_check: 'no'
    });
  };
  const handleMeetingYesClick = () => {
    setFormState({
      ...formState,
      meeting_check: 'yes'
    });
  };
  
  const handleMeetingNoClick = () => {
    setFormState({
      ...formState,
      meeting_check: 'no'
    });
  };
  const handleLessenYesClick = () => {
    setFormState({
      ...formState,
      lessen_check: 'yes'
    });
  };
  
  const handleLessenNoClick = () => {
    setFormState({
      ...formState,
      lessen_check: 'no'
    });
  };


  return (
    <>


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
      <AdditionalContentExample></AdditionalContentExample>
      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
          <br></br>
            <Form.Group>
              <Form.Label style={{fontSize: '20px', color: '#007bff'}}>日付</Form.Label>
                  <br />
              <DatePicker
                name="select_date"
                selected={formState.select_date}
                onChange={(date) =>
                  setFormState({
                    ...formState,
                    select_date: date,
                  })
                }
                dateFormat="yyyy/MM/dd"
                maxDate={new Date()}
                                    />
            </Form.Group>
            <br></br>
            <Form.Group>
              <Form.Label className='text-primary'>今日行った作業</Form.Label>
              <Form.Control type="text" name="study_content" value={formState.study_content} onChange={handleChange} placeholder="今日学んだことを入力してください"/>
            </Form.Group>
            <br></br>
            <Form.Group>
              <Form.Label className='text-primary'>社内ミーティングはありましたか？</Form.Label>
              <div>
                <Button
                  variant={formState.meeting_check === 'yes' ? 'btn btn-primary' : 'btn btn-outline-primary'}
                  onClick={handleMeetingYesClick}>
                  はい
                </Button>{' '}
                <Button
                  variant={formState.meeting_check === 'no' ? 'btn btn-primary' : 'btn btn-outline-primary'}
                  onClick={handleMeetingNoClick}>
                  いいえ
                </Button>
              </div>
              </Form.Group>
            <br></br>
            <Form.Group>
              <Form.Label className='text-primary'>プログラミングレッスンはありましたか？</Form.Label>
              <div>
                <Button
                  variant={formState.lessen_check === 'yes' ? 'btn btn-primary' : 'btn btn-outline-primary'}
                  onClick={handleLessenYesClick}>
                  はい
                </Button>{' '}
                <Button
                  variant={formState.lessen_check === 'no' ? 'btn btn-primary' : 'btn btn-outline-primary'}
                  onClick={handleLessenNoClick}>
                  いいえ
                </Button>
              </div>
            </Form.Group>
            <br></br>
            <Form.Group>
              <Form.Label className='text-primary'>AIに所感を書かせますか？</Form.Label>
              <div>
                <Button
                  variant={formState.ai_check === 'yes' ? 'btn btn-primary' : 'btn btn-outline-primary'}
                  onClick={handleYesClick}>
                  はい
                </Button>{' '}
                <Button
                  variant={formState.ai_check === 'no' ? 'btn btn-primary' : 'btn btn-outline-primary'}
                  onClick={handleNoClick}>
                  いいえ
                </Button>
              </div>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <br></br>
            <Form.Group>
              <Form.Label className='text-primary'>本日の振り返りをお願いします。大雑把でもかまいません。</Form.Label>
              <Form.Control type="text" name="report_direction" value={formState.report_direction} onChange={handleChange} placeholder="例:「まあまあできた」"/>
            </Form.Group>
            <br></br>
            <Form.Group>
              <Form.Label className='text-primary'>所感(AIに書かせる場合は書かなくていいです)</Form.Label>
              <Form.Control as="textarea" rows={5} name="impressions" value={formState.impressions} onChange={handleChange} placeholder="今日の所感を教えて下さい"/>
            </Form.Group>
            <br></br>
            <Button variant="primary" type="submit">
              日報を作成する
            </Button>
            { isLoading ? (
                <>
                  <Blocks
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                  />
                  <div style={{ marginLeft: '10px' }}>※日報を書いています</div>
                </>
              ) : null}
                        {isModalOpen && (
            <FormModal onClose={handleCloseModal}>
              日報の作成が完了しました。トップページに戻ります。
            </FormModal>)}
          </div>
        </div>
        <br></br>
      </Form>
    </>
  );
  }

export default MyForm;
