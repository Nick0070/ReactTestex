import React from 'react';
import { Skills } from '../moduls/Skills';
import { observer } from 'mobx-react-lite';
import Button from '@mui/material/Button';

const SkillsBox = observer(({model}) => {
  const [ skills ] = React.useState(model);

  return skills.list.map((item) => (
    <>
      <div className='skil'>
        <div className='level2'>{item.name}</div>
          <div className='count2'>{skills[item.key]}</div>
            <div className='up'>
                     <Button 
                            className='plus' 
                            variant="outlined" size="small" 
                            disabled={skills.isDisable(item.key)}
                            onClick={()=>skills.addSkill(item.key)}
                        >
                            +
                        </Button>
            </div>
      </div>

      <div>
        {item.child.map((item2) => (
          <div className='skil'>
            <div className='level3'>{item2.name}</div>
            <div className='count3'>{skills[item2.key]}</div>
            <div className='up'>
                <Button 
                    className='plus' 
                    variant="outlined" size="small" 
                    disabled={skills.isDisable(item2.key)}
                    onClick={()=>skills.addSkill(item2.key)}
                >
                    +
                </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  ));
});

export default SkillsBox;
