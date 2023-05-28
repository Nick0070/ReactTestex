
import React from 'react';
import Kosm from '../img/kosm.gif';
import { observer } from 'mobx-react-lite';
import TextField from '@mui/material/TextField';
import { applySnapshot } from 'mobx-state-tree';
import { BaseInfo, Skills } from '../moduls/Skills';



const LeftBox = observer(({model}) => {
  const [ skills ] = React.useState(model);

  const fileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.type === 'application/json') {
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');

        reader.onload = (event) => {
          const target = event.target;
          const result = target?.result;
          applySnapshot(skills, JSON.parse(result));
        };
      } else {
        alert('Нужен формат файла JSON');
      }
    }
  };


  return   (

      <>  
        <div className='box'>
          <div className='img'>
            <img className='img2' src={Kosm} />
          </div>
          <div className='text'>
            <div>
              HP: {skills[BaseInfo.MIN_HP]}/{skills[BaseInfo.MAX_HP]}
            </div>
          </div>
        </div>


        <div className='box2'>
          <div className='save'>
              <div className='textfield'>
                <TextField
                  color='primary'
                  label='Имя'
                  variant='standard'
                  value={skills.name}
                  onChange={(event) => skills.updateUsername(event.target.value)}
                />
              </div>

              <div className='btn'>
                <button className='btn_save'onClick={() => skills.exportData()} > Сохранить </button>
              </div>
              
          </div>
        </div>


        <div className='box3'>
          <div className='save'>
            <div className='inputfile'>
              <input className='textinput' type='file' onChange={fileChange} />
            </div>
          </div>
        </div>
     </>
  );
});

export default LeftBox;
