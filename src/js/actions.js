import axios from 'axios';

const postDescription = (info) => {
  t.card('id','desc').then(res => {
    console.log('id', res);
    info.cardId = res.id;
    info.descriptions = res.desc;
    axios.post("http://localhost:8086/description", info).then(res => console.log('this is post info', res));
  });
}

export default {postDescription};